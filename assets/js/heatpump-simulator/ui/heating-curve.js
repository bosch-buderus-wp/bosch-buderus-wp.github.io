// Heating Curve & Building Load panel (collapsible)
// Exposes window.HeatpumpHeatingCurve = { initPanel }
(function () {
  if (typeof d3 === "undefined") {
    console.error("d3 not found for HeatpumpHeatingCurve");
    return;
  }

  // Configuration constants (extracted from magic numbers)
  const CONFIG = {
    WIDTH: 900,
    HEIGHT: 260,
    MARGIN: { top: 24, right: 56, bottom: 40, left: 50 },
    FLOW_MIN: 15,
    FLOW_MAX: 60,
    X_EXTRA_MIN: -20,
    X_MAX: 22,
    X_TICKS: 8,
    Y_LEFT_TICKS: 6,
    Y_RIGHT_TICKS: 6,
    SAMPLE_POINTS: 64,
    HOVER_TOL_PX: 7,
    TIP_PAD_PX: 12,
    LEGEND_SPACING: 200,
    RIGHT_AXIS_STEP: 0.5,

    COLORS: {
      CURVE: "#1565c0",
      LOAD: "#2e7d32",
      CAP: "#ef6c00",
      MOD: "#808080",
      COP: "#00838f",
      BV_FILL: "#8e24aa",
      BV_STROKE: "#4a148c",
      VLINE: "#222",
    },
  };

  function clamp(x, a, b) {
    return Math.max(a, Math.min(b, x));
  }
  function flowTargetCurve(Ta, stdOutdoorTempC, flowAt20C, flowAtStdC) {
    const x0 = stdOutdoorTempC;
    const y0 = flowAtStdC;
    const x1 = 20;
    const y1 = flowAt20C;
    const t = (Ta - x0) / Math.max(1e-6, x1 - x0);
    const y = y0 + t * (y1 - y0);
    return clamp(y, 15, 60);
  }

  function buildingLoadKw(Ta, stdOutdoorTempC, designKw) {
    const theta_i = 20; // indoor reference (consistent with engine)
    const denom = Math.max(1, theta_i - stdOutdoorTempC);
    const frac = (theta_i - Ta) / denom;
    return Math.max(0, frac) * Math.max(0, designKw);
  }

  function initPanel(containerSel) {
    const container = d3.select(containerSel);
    if (container.empty()) {
      console.warn("HeatingCurve container not found");
      return { render: () => {} };
    }

    // Collapsible wrapper using <details>
    const panel = container.append("details").attr("class", "sim-curve-panel"); // collapsed by default

    const summary = panel
      .append("summary")
      .attr("class", "sim-curve-summary")
      .text("Heizkurve & Gebäudeheizlast");

    const body = panel.append("div").attr("class", "sim-curve-body");

    // SVG setup
    const width = CONFIG.WIDTH;
    const height = CONFIG.HEIGHT;
    const margin = CONFIG.MARGIN;
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    const svg = body
      .append("svg")
      .attr("class", "sim-curve-svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const gGrid = g.append("g").attr("class", "grid");
    const gAxes = g.append("g").attr("class", "axes");
    const gLines = g.append("g").attr("class", "lines");
    const gLegend = g
      .append("g")
      .attr("class", "legend")
      .attr("transform", `translate(0, -8)`);

    // Overlay for interaction
    const gOverlay = g.append("g").attr("class", "overlay");
    const vLine = gOverlay
      .append("line")
      .attr("class", "hover-line")
      .attr("y1", 0)
      .attr("y2", 0) // set after innerH known
      .style("opacity", 0);

    const overlayRect = gOverlay.append("rect").attr("class", "hover-capture");

    // HTML tooltip
    const tip = d3
      .select("body")
      .append("div")
      .attr("class", "sim-curve-tooltip");

    // Hide tooltip and focus line when the panel is collapsed
    panel.on("toggle", function () {
      const isOpen = this.open;
      if (!isOpen) {
        tip.style("opacity", 0);
        vLine.style("opacity", 0);
      }
    });

    const curveColor = CONFIG.COLORS.CURVE;
    const loadColor = CONFIG.COLORS.LOAD;
    const capColor = CONFIG.COLORS.CAP;
    const modColor = CONFIG.COLORS.MOD;
    const copColor = CONFIG.COLORS.COP;

    const lineCurve = d3
      .line()
      .x((d) => x(d.Ta))
      .y((d) => yLeft(d.flowC))
      .curve(d3.curveMonotoneX);

    const lineLoad = d3
      .line()
      .x((d) => x(d.Ta))
      .y((d) => yRight(d.loadKw))
      .curve(d3.curveMonotoneX);

    const lineCap = d3
      .line()
      .x((d) => x(d.Ta))
      .y((d) => yRight(d.capKw))
      .curve(d3.curveMonotoneX);

    const lineCop = d3
      .line()
      .defined((d) => {
        // Hide COP segments that exceed the current right-axis max (post-render domain)
        const ymax =
          yRight && typeof yRight.domain === "function"
            ? yRight.domain()[1]
            : Infinity;
        return d.cop <= ymax;
      })
      .x((d) => x(d.Ta))
      .y((d) => yRight(d.cop))
      .curve(d3.curveMonotoneX);
    // Scales (declared here, domains set during render)
    let x = d3.scaleLinear();
    let yLeft = d3.scaleLinear(); // °C
    let yRight = d3.scaleLinear(); // kW

    // Balance point (Bivalenzpunkt) holder
    let bivalencePt = null;
    // Axes
    const xAxisG = gAxes
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${innerH})`);
    const yLeftAxisG = gAxes.append("g").attr("class", "y axis left");
    const yRightAxisG = gAxes
      .append("g")
      .attr("class", "y axis right")
      .attr("transform", `translate(${innerW}, 0)`);

    // Labels
    g.append("text")
      .attr("class", "axis-title")
      .attr("x", innerW / 2)
      .attr("y", innerH + 34)
      .attr("text-anchor", "middle")
      .text("Außentemperatur (°C)");

    g.append("text")
      .attr("class", "axis-title")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerH / 2)
      .attr("y", -36)
      .attr("text-anchor", "middle")
      .text("Vorlauftemperatur (°C)");

    g.append("text")
      .attr("class", "axis-title")
      .attr("transform", `translate(${innerW + 36}, ${innerH / 2}) rotate(90)`)
      .attr("text-anchor", "middle")
      .text("Leistung / Last (kW) / COP");

    // Legend
    const legendItems = [
      { label: "Heizkurve (Sollvorlauftemp.)", color: curveColor },
      { label: "Gebäudeheizlast", color: loadColor },
      { label: "Max. Wärmepumpenleistung", color: capColor },
      { label: "Optimaler COP", color: copColor },
    ];
    const legend = gLegend
      .selectAll("g")
      .data(legendItems)
      .enter()
      .append("g")
      .attr(
        "transform",
        (d, i) => `translate(${i * CONFIG.LEGEND_SPACING}, 0)`
      );
    legend
      .append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 28)
      .attr("y2", 0)
      .attr("stroke", (d) => d.color)
      .attr("stroke-width", 3);
    legend
      .append("text")
      .attr("x", 34)
      .attr("y", 4)
      .attr("class", "legend-label")
      .text((d) => d.label);

    // Lines groups
    const curvePath = gLines
      .append("path")
      .attr("class", "curve-line")
      .attr("stroke", curveColor)
      .attr("fill", "none")
      .attr("stroke-width", 2);
    const loadPath = gLines
      .append("path")
      .attr("class", "load-line")
      .attr("stroke", loadColor)
      .attr("fill", "none")
      .attr("stroke-width", 2);
    const capPath = gLines
      .append("path")
      .attr("class", "cap-line")
      .attr("stroke", capColor)
      .attr("fill", "none")
      .attr("stroke-width", 2);
    const copPath = gLines
      .append("path")
      .attr("class", "cop-line")
      .attr("stroke", copColor)
      .attr("fill", "none")
      .attr("stroke-width", 2);

    const bvGroup = gLines.append("g").attr("class", "bivalence-group");
    const bvDot = bvGroup
      .append("circle")
      .attr("class", "bivalence-dot")
      .attr("r", 3.5)
      .attr("fill", CONFIG.COLORS.BV_FILL)
      .attr("stroke", CONFIG.COLORS.BV_STROKE)
      .attr("stroke-width", 1.5)
      .style("opacity", 0);
    // Gridlines (x only for readability)
    const gridXG = gGrid.append("g").attr("class", "grid-x");
    const gridYG = gGrid.append("g").attr("class", "grid-y");

    function render(state) {
      if (!state) return;
      const stdOutdoorTempC = +state.stdOutdoorTempC;
      const flowAt20C = +state.flowTempAt20C;
      const flowAtStdC = +state.flowTempAtStdOutdoorC;
      const designKw = +state.buildingHeatLoadAtStdKw;

      // Domain: show a bit wider than configured range
      const xMin = Math.min(CONFIG.X_EXTRA_MIN, stdOutdoorTempC - 5);
      const xMax = CONFIG.X_MAX;
      x = d3.scaleLinear().domain([xMin, xMax]).range([0, innerW]);
      yLeft = d3
        .scaleLinear()
        .domain([CONFIG.FLOW_MIN, CONFIG.FLOW_MAX])
        .nice()
        .range([innerH, 0]);

      // Sample points
      const N = CONFIG.SAMPLE_POINTS;
      const data = [];
      let maxKw = Math.max(0.5, designKw);
      let maxRight = Math.max(7, maxKw);
      const capAt = (Ta, Tf) => {
        try {
          if (
            window.HeatpumpEngine &&
            typeof window.HeatpumpEngine.capacityAt === "function"
          ) {
            return Math.max(
              0,
              window.HeatpumpEngine.capacityAt(Ta, Tf, state.hpModel)
            );
          }
        } catch (e) {}
        return 0;
      };
      for (let i = 0; i < N; i++) {
        const Ta = xMin + (i / (N - 1)) * (xMax - xMin);
        const flowC = flowTargetCurve(
          Ta,
          stdOutdoorTempC,
          flowAt20C,
          flowAtStdC
        );
        const loadKw = buildingLoadKw(Ta, stdOutdoorTempC, designKw);
        const capKw = capAt(Ta, flowC);
        maxKw = Math.max(maxKw, loadKw, capKw);
        const cop =
          window.HeatpumpEngine &&
          typeof window.HeatpumpEngine.estimateCOP === "function"
            ? window.HeatpumpEngine.estimateCOP(flowC, Ta)
            : 0;
        data.push({ Ta, flowC, loadKw, capKw, cop });
      }
      // Find crossing of load and capacity to mark Bivalenzpunkt
      bivalencePt = null;
      for (let i = 0; i < data.length - 1; i++) {
        const a = data[i],
          b = data[i + 1];
        const fa = a.capKw - a.loadKw;
        const fb = b.capKw - b.loadKw;
        if (fa === 0) {
          bivalencePt = { Ta: a.Ta, kW: a.capKw };
          break;
        }
        if ((fa < 0 && fb > 0) || (fa > 0 && fb < 0)) {
          const t = Math.abs(fa) / (Math.abs(fa) + Math.abs(fb));
          const Ta_cross = a.Ta + t * (b.Ta - a.Ta);
          const kW_cross = a.capKw + t * (b.capKw - a.capKw);
          bivalencePt = { Ta: Ta_cross, kW: kW_cross };
          break;
        }
      }
      // yRight domain must accommodate both load/capacity (and bivalence y)
      if (bivalencePt) maxKw = Math.max(maxKw, bivalencePt.kW);
      const yRightMax = Math.max(
        1,
        Math.ceil(
          Math.max(0.1, Math.max(maxKw, maxRight)) / CONFIG.RIGHT_AXIS_STEP
        ) * CONFIG.RIGHT_AXIS_STEP
      );
      yRight = d3
        .scaleLinear()
        .domain([0, yRightMax])
        .nice()
        .range([innerH, 0]);

      // Axes
      const xAxis = d3
        .axisBottom(x)
        .ticks(CONFIG.X_TICKS)
        .tickFormat((v) => `${v}°`);
      const yLAxis = d3.axisLeft(yLeft).ticks(CONFIG.Y_LEFT_TICKS);
      const yRAxis = d3.axisRight(yRight).ticks(CONFIG.Y_RIGHT_TICKS);

      xAxisG.call(xAxis);
      yLeftAxisG.call(yLAxis);
      yRightAxisG.call(yRAxis);

      // Grid
      gridXG
        .attr("transform", `translate(0, ${innerH})`)
        .call(
          d3
            .axisBottom(x)
            .ticks(CONFIG.X_TICKS)
            .tickSize(-innerH)
            .tickFormat("")
        );
      gridYG.call(
        d3
          .axisLeft(yLeft)
          .ticks(CONFIG.Y_LEFT_TICKS)
          .tickSize(-innerW)
          .tickFormat("")
      );

      // Lines
      curvePath.datum(data).attr("d", lineCurve);
      loadPath.datum(data).attr("d", lineLoad);
      capPath.datum(data).attr("d", lineCap);
      copPath.datum(data).attr("d", lineCop);

      // Draw/update bivalence point (dot only; label removed per request)
      if (bivalencePt) {
        bvDot
          .attr("cx", x(bivalencePt.Ta))
          .attr("cy", yRight(bivalencePt.kW))
          .style("opacity", 1);
      } else {
        bvDot.style("opacity", 0);
      }

      // Interaction overlay sizing and handlers
      overlayRect
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", innerW)
        .attr("height", innerH);
      vLine.attr("y2", innerH);

      function fmt(v, d = 1) {
        return Number(v).toFixed(d).replace(".", ",");
      }

      function computeAtTa(Ta) {
        const flowC = flowTargetCurve(
          Ta,
          stdOutdoorTempC,
          flowAt20C,
          flowAtStdC
        );
        const loadKw = buildingLoadKw(Ta, stdOutdoorTempC, designKw);
        let capKw = 0;
        try {
          if (
            window.HeatpumpEngine &&
            typeof window.HeatpumpEngine.capacityAt === "function"
          ) {
            capKw = Math.max(
              0,
              window.HeatpumpEngine.capacityAt(Ta, flowC, state.hpModel)
            );
          }
        } catch (e) {}
        const cop =
          window.HeatpumpEngine &&
          typeof window.HeatpumpEngine.estimateCOP === "function"
            ? window.HeatpumpEngine.estimateCOP(flowC, Ta)
            : 0;
        return { Ta, flowC, loadKw, capKw, cop };
      }

      function renderTip(e, pxt, py) {
        const Ta = x.invert(pxt);
        const clampedTa = Math.max(x.domain()[0], Math.min(x.domain()[1], Ta));
        const d = computeAtTa(clampedTa);
        vLine
          .attr("x1", x(clampedTa))
          .attr("x2", x(clampedTa))
          .style("opacity", 1);

        // Detect proximity to anchor dots (in pixels)
        const dist = (ax, ay, bx, by) => Math.hypot(ax - bx, ay - by);
        const pxStd = x(stdOutdoorTempC),
          pyStd = yLeft(flowAtStdC);
        const pxFoot = x(20),
          pyFoot = yLeft(flowAt20C);
        const tol = CONFIG.HOVER_TOL_PX; // px radius to count as "over the dot"
        const isStd = dist(pxt, py, pxStd, pyStd) <= tol;
        const isFoot = dist(pxt, py, pxFoot, pyFoot) <= tol;
        const badges = [];
        if (isStd) badges.push("Normaußentemperatur");
        if (isFoot) badges.push("Fußpunkt (20°C)");
        if (bivalencePt) {
          const pxBv = x(bivalencePt.Ta);
          const pyBv = yRight(bivalencePt.kW);
          if (dist(pxt, py, pxBv, pyBv) <= tol) badges.push("Bivalenzpunkt");
        }
        const badgeHtml = badges.length
          ? `<div style=\"margin-top:4px;color:#555\"><i>${badges.join(
              " · "
            )}</i></div>`
          : "";

        const html = `
          <div class="tip-row"><div><b>Außentemperatur:</b></div><div class="tip-val">${fmt(
            d.Ta,
            1
          )}°C</div></div>
          <div class="tip-row"><div><span style=\"color:${curveColor}\"><b>Vorlauftemperatur:</b></span></div><div class="tip-val">${fmt(
          d.flowC,
          1
        )}°C</div></div>
          <div class="tip-row"><div><span style=\"color:${loadColor}\"><b>Gebäudeheizlast:</b></span></div><div class="tip-val">${fmt(
          d.loadKw,
          2
        )} kW</div></div>
                  <div class="tip-row"><div><span style=\"color:${capColor}\"><b>Max. WP-Leistung:</b></span></div><div class="tip-val">${fmt(
          d.capKw,
          2
        )} kW</div></div>
          <div class="tip-row"><div><span style=\"color:${modColor}\"><b>Modulation:</b></span></div><div class="tip-val">${fmt(
          d.capKw > 0 ? (d.loadKw / d.capKw) * 100 : 0,
          0
        )} %</div></div>
          <div class="tip-row"><div><span style=\"color:${copColor}\"><b>Optimaler COP:</b></span></div><div class="tip-val">${fmt(
          d.cop,
          2
        )}</div></div>
          ${badgeHtml}
        `;
        tip.html(html).style("opacity", 1);
        const pad = 12;
        const vw = Math.max(
          document.documentElement.clientWidth || 0,
          window.innerWidth || 0
        );
        const vh = Math.max(
          document.documentElement.clientHeight || 0,
          window.innerHeight || 0
        );
        // Position inside the SVG container (absolute positioning relative to page scroll offset)
        const svgBox = svg.node().getBoundingClientRect();
        let tx = svgBox.left + window.scrollX + margin.left + pxt + pad;
        let ty = svgBox.top + window.scrollY + margin.top + py + pad;
        // Keep inside SVG bounds
        const bbox = tip.node().getBoundingClientRect();
        const maxX =
          svgBox.left +
          window.scrollX +
          margin.left +
          innerW -
          bbox.width -
          pad;
        const maxY =
          svgBox.top + window.scrollY + margin.top + innerH - bbox.height - pad;
        const minX = svgBox.left + window.scrollX + margin.left + pad;
        const minY = svgBox.top + window.scrollY + margin.top + pad;
        tx = Math.max(minX, Math.min(maxX, tx));
        ty = Math.max(minY, Math.min(maxY, ty));
        tip.style("left", `${tx}px`).style("top", `${ty}px`);
      }

      overlayRect
        .on("mouseenter", function (e) {
          vLine.style("opacity", 1);
          tip.style("opacity", 1);
        })
        .on("mousemove", function (e) {
          const m = d3.pointer(e, this);
          renderTip(e, m[0], m[1]);
        })
        .on("mouseleave", function () {
          // When leaving the plot area, snap to the currently configured ambient temperature
          try {
            const TaCur = +state.ambientTempC;
            const xt = x(TaCur);
            const yt = yLeft(
              flowTargetCurve(TaCur, stdOutdoorTempC, flowAt20C, flowAtStdC)
            );
            const svgBox = svg.node().getBoundingClientRect();
            // Render tip with no DOM event; provide fallback positioning near the reference line
            renderTip(
              null,
              x(TaCur),
              yLeft(
                flowTargetCurve(TaCur, stdOutdoorTempC, flowAt20C, flowAtStdC)
              )
            );
            // Place tooltip near the line within the SVG bounds (absolute, scroll-aware)
            const pad = CONFIG.TIP_PAD_PX;
            let tx =
              svgBox.left +
              window.scrollX +
              margin.left +
              Math.max(0, Math.min(innerW, xt)) +
              pad;
            let ty =
              svgBox.top +
              window.scrollY +
              margin.top +
              Math.max(0, Math.min(innerH, yt)) +
              pad;
            const bbox = tip.node().getBoundingClientRect();
            const maxX =
              svgBox.left +
              window.scrollX +
              margin.left +
              innerW -
              bbox.width -
              pad;
            const maxY =
              svgBox.top +
              window.scrollY +
              margin.top +
              innerH -
              bbox.height -
              pad;
            const minX = svgBox.left + window.scrollX + margin.left + pad;
            const minY = svgBox.top + window.scrollY + margin.top + pad;
            tx = Math.max(minX, Math.min(maxX, tx));
            ty = Math.max(minY, Math.min(maxY, ty));
            tip
              .style("left", `${tx}px`)
              .style("top", `${ty}px`)
              .style("opacity", 1);
            vLine.style("opacity", 1);
          } catch (e) {
            vLine.style("opacity", 0);
            tip.style("opacity", 0);
          }
        });

      // Mark anchor points
      const anchors = [
        { Ta: stdOutdoorTempC, flowC: flowAtStdC },
        { Ta: 20, flowC: flowAt20C },
      ];
      const anchorSel = gLines
        .selectAll("circle.anchor")
        .data(anchors, (d) => d.Ta);
      anchorSel
        .enter()
        .append("circle")
        .attr("class", "anchor")
        .attr("r", 3.5)
        .attr("fill", curveColor)
        .merge(anchorSel)
        .attr("cx", (d) => x(d.Ta))
        .attr("cy", (d) => yLeft(d.flowC));
      anchorSel.exit().remove();

      // Show focus line and tooltip only when panel is open
      if (panel.property("open")) {
        try {
          const TaCur = +state.ambientTempC;
          renderTip(
            null,
            x(TaCur),
            yLeft(
              flowTargetCurve(TaCur, stdOutdoorTempC, flowAt20C, flowAtStdC)
            )
          );
          vLine.style("opacity", 1);
          tip.style("opacity", 1);
        } catch (e) {
          // ignore
        }
      } else {
        vLine.style("opacity", 0);
        tip.style("opacity", 0);
      }
    }

    // Styles moved to assets/css/heatpump-simulator.css

    // Render once in collapsed state too so it has content when opened
    // Expose minimal API; also publish hover state so parent can query
    return { render };
  }

  window.HeatpumpHeatingCurve = { initPanel };
})();
