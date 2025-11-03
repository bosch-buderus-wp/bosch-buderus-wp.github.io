// Diagram: render simulator SVG from outputs
// Exposes window.HeatpumpDiagram = { initDiagram }
(function () {
  // Constants
  const VIEWBOX = { w: 1000, h: 480 };
  const PRESERVE_ASPECT = "xMidYMid meet";
  const SECONDS_PER_HOUR = 3600;
  const FLOW_CONST = {
    ANIM_SLOWDOWN_S: 5.0,
    MIN_DASH_PX: 8,
    DASH_MULT: 2.5,
    MIN_MODULATION: 0.01,
    COMP_SPIN_BASE_S: 5.0,
    COMP_SPIN_MIN_FACTOR: 0.8,
    COMP_SPIN_SCALE: 6,
  };
  const COMPRESSOR_SPIRAL = { rInner: 4, rOuter: 16, turns: 2.2, points: 180 };

  function injectStylesOnce() {
    // External stylesheet expected at /assets/css/heatpump-simulator.css
    // No inline CSS injection anymore to keep styles centralized.
    const hasExternal = !!document.querySelector(
      'link[href$="/assets/css/heatpump-simulator.css"]'
    );
    if (!hasExternal) {
      // Optional: warn once if stylesheet is missing
      if (!document.getElementById("heatpump-sim-style-warning")) {
        const note = document.createElement("meta");
        note.id = "heatpump-sim-style-warning";
        note.setAttribute(
          "data-warning",
          "Missing /assets/css/heatpump-simulator.css"
        );
        document.head.appendChild(note);
      }
    }
    return;
  }

  // --- Small helpers (formatting, titles, flow scaling) ---
  function setTitle(selection, text) {
    if (!selection || !selection.node) return;
    selection.select("title").remove();
    if (text != null && text !== "") {
      selection.append("title").text(String(text));
    }
  }

  const fmt = {
    deg: (v) => `${Number(v).toFixed(1)} °C`,
    kW: (w) => `${(Number(w) / 1000).toFixed(2)} kW`,
    lph: (kgps) =>
      `${Math.max(0, Number(kgps) * SECONDS_PER_HOUR).toFixed(0)} l/h`,
    percent: (v) => `${Math.round(Number(v) * 100)}%`,
  };

  const widthForMod = (mod) => 6 + 8 * Math.max(0, Number(mod));
  const speedForMod = (mod) => 1 + 6 * Math.max(0, Number(mod));
  const computeSpinDuration = (mod) =>
    FLOW_CONST.COMP_SPIN_BASE_S *
    (FLOW_CONST.COMP_SPIN_MIN_FACTOR /
      (1 + FLOW_CONST.COMP_SPIN_SCALE * Math.max(0, Number(mod))));

  function tempColor(tC) {
    const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
    const v = clamp((tC - 0) / 50, 0, 1);
    const r = Math.round(30 + v * (255 - 30));
    const g = Math.round(120 + v * (80 - 120));
    const b = Math.round(255 + v * (30 - 255));
    return `rgb(${r},${g},${b})`;
  }

  function setFlow(el, color, width, speed, dir) {
    el.style("stroke", color).style("stroke-width", width + "px");
    const dash = Math.max(FLOW_CONST.MIN_DASH_PX, width * FLOW_CONST.DASH_MULT);
    el.attr("stroke-dasharray", `${dash} ${dash}`);
    el.classed("animate-forward", dir >= 0).classed("animate-reverse", dir < 0);
    const dur =
      FLOW_CONST.ANIM_SLOWDOWN_S *
      Math.max(FLOW_CONST.COMP_SPIN_MIN_FACTOR, 8 / Math.max(0.001, speed));
    el.style("animation-duration", `${dur}s`);
  }

  function initDiagram(containerSel) {
    injectStylesOnce();
    const container = d3.select(containerSel);
    container.classed("heatpump-sim", true);
    const wrap = container.append("div").attr("class", "sim-diagram-wrap");
    const svg = wrap
      .append("svg")
      .attr("class", "sim-svg")
      .attr("viewBox", `0 0 ${VIEWBOX.w} ${VIEWBOX.h}`)
      .attr("preserveAspectRatio", PRESERVE_ASPECT);

    const gBg = svg.append("g").attr("class", "layer-bg");
    const gPipes = svg.append("g").attr("class", "layer-pipes");
    const gFlows = svg.append("g").attr("class", "layer-flows");
    const gLabels = svg.append("g").attr("class", "layer-labels");

    const geom = {
      left: 40,
      oduX: 80,
      oduY: 60,
      oduW: 240,
      oduH: 320,
      yFlow: 100,
      yReturn: 340,
      bufferX: 530,
      bufferW: 80,
      bufferY: 130,
      bufferH: 180,
      heatX: 660,
      heatY: 60,
      heatW: 180,
      heatH: 320,
      midY: 220,
    };

    // Background and shapes
    gBg
      .append("rect")
      .attr("x", geom.oduX)
      .attr("y", geom.oduY)
      .attr("width", geom.oduW)
      .attr("height", geom.oduH)
      .attr("rx", 12)
      .attr("class", "odu");
    gPipes
      .append("rect")
      .attr("x", geom.oduX + 10)
      .attr("y", geom.oduY + 40)
      .attr("width", 30)
      .attr("height", geom.oduH - 80)
      .attr("class", "coil evap");
    gPipes
      .append("rect")
      .attr("x", geom.oduX + geom.oduW - 40)
      .attr("y", geom.oduY + 40)
      .attr("width", 30)
      .attr("height", geom.oduH - 80)
      .attr("class", "coil condenser");
    gPipes
      .append("circle")
      .attr("cx", geom.oduX + geom.oduW / 2)
      .attr("cy", geom.oduY + 40)
      .attr("r", 20)
      .attr("class", "compressor");

    const compCenter = { cx: geom.oduX + geom.oduW / 2, cy: geom.oduY + 40 };
    const compSpin = gPipes
      .append("g")
      .attr("class", "comp-spin")
      .attr("transform", `translate(${compCenter.cx},${compCenter.cy})`);
    const buildSpiralPath = (rInner, rOuter, turns, points) => {
      const n = points || COMPRESSOR_SPIRAL.points;
      const tMax = (turns || COMPRESSOR_SPIRAL.turns) * Math.PI * 2;
      const a = rInner || COMPRESSOR_SPIRAL.rInner;
      const b = (rOuter - a) / tMax;
      let d = "";
      for (let i = 0; i <= n; i++) {
        const t = (i / n) * tMax;
        const r = a + b * t;
        const x = r * Math.cos(t);
        const y = r * Math.sin(t);
        d += (i === 0 ? "M" : "L") + x.toFixed(2) + "," + y.toFixed(2) + " ";
      }
      return d.trim();
    };
    compSpin
      .append("g")
      .attr("class", "comp-rotor")
      .append("path")
      .attr("class", "compressor-spiral")
      .attr(
        "d",
        buildSpiralPath(
          COMPRESSOR_SPIRAL.rInner,
          COMPRESSOR_SPIRAL.rOuter,
          COMPRESSOR_SPIRAL.turns,
          COMPRESSOR_SPIRAL.points
        )
      );

    // Flows
    const refrig = {};
    refrig.fromEvapToComp = gFlows
      .append("path")
      .attr(
        "d",
        `M ${geom.oduX + 50} ${geom.oduY + 40} H ${
          geom.oduX + geom.oduW / 2 - 25
        }`
      )
      .attr("class", "flow refrig cold");
    refrig.fromCompToCond = gFlows
      .append("path")
      .attr(
        "d",
        `M ${geom.oduX + geom.oduW / 2 + 20} ${geom.oduY + 40} H ${
          geom.oduX + geom.oduW - 50
        }`
      )
      .attr("class", "flow refrig hot");
    refrig.fromCondBottomToEvapBottom = gFlows
      .append("path")
      .attr(
        "d",
        `M ${geom.oduX + geom.oduW - 50} ${geom.oduY + geom.oduH - 40} H ${
          geom.oduX + 50
        }`
      )
      .attr("class", "flow refrig warm");
    refrig.closeCond = gFlows
      .append("path")
      .attr(
        "d",
        `M ${geom.oduX + geom.oduW - 50} ${geom.oduY + 40} V ${
          geom.oduY + geom.oduH - 40
        }`
      )
      .attr("class", "flow refrig mid");
    refrig.fromEvapUpToComp = gFlows
      .append("path")
      .attr(
        "d",
        `M ${geom.oduX + 50} ${geom.oduY + geom.oduH - 40} V ${geom.oduY + 40}`
      )
      .attr("class", "flow refrig cold");
    const air = gFlows
      .append("path")
      .attr(
        "d",
        `M ${geom.oduX - 60} ${geom.midY - 80} H ${geom.oduX} M ${
          geom.oduX - 60
        } ${geom.midY} H ${geom.oduX} M ${geom.oduX - 60} ${geom.midY + 80} H ${
          geom.oduX
        }`
      )
      .attr("class", "flow air in");

    const prim = {};
    prim.flow = gFlows
      .append("path")
      .attr(
        "d",
        `M ${geom.oduX + geom.oduW} ${geom.yFlow} H ${geom.bufferX} H ${
          geom.bufferX + geom.bufferW / 2
        }`
      )
      .attr("class", "flow primary hot");
    prim.return = gFlows
      .append("path")
      .attr(
        "d",
        `M ${geom.bufferX + geom.bufferW / 2} ${geom.yReturn} H ${
          geom.bufferX
        } H ${geom.oduX + geom.oduW}`
      )
      .attr("class", "flow primary cold");
    prim.loopClose = gFlows
      .append("path")
      .attr("d", `M ${geom.oduX + geom.oduW} ${geom.yFlow} V ${geom.yReturn}`)
      .attr("class", "flow primary mid");

    const buffer = {};
    buffer.body = gPipes
      .append("rect")
      .attr("x", geom.bufferX)
      .attr("y", geom.bufferY)
      .attr("width", geom.bufferW)
      .attr("height", geom.bufferH)
      .attr("rx", 10)
      .attr("class", "buffer");
    buffer.stitch = gFlows
      .append("path")
      .attr(
        "d",
        `M ${geom.bufferX + geom.bufferW / 2} ${geom.yFlow} V ${geom.yReturn}`
      )
      .attr("class", "flow buffer-bypass");

    const heat = {};
    heat.flow = gFlows
      .append("path")
      .attr(
        "d",
        `M ${geom.bufferX + geom.bufferW / 2} ${geom.yFlow} H ${geom.heatX} H ${
          geom.heatX + geom.heatW
        }`
      )
      .attr("class", "flow heating hot");
    heat.return = gFlows
      .append("path")
      .attr(
        "d",
        `M ${geom.heatX + geom.heatW} ${geom.yReturn} H ${
          geom.bufferX + geom.bufferW / 2
        }`
      )
      .attr("class", "flow heating cold");
    heat.loopClose = gFlows
      .append("path")
      .attr("d", `M ${geom.heatX + geom.heatW} ${geom.yFlow} V ${geom.yReturn}`)
      .attr("class", "flow heating mid");

    // Static circuit labels
    gLabels
      .append("text")
      .attr("x", geom.oduX + 80)
      .attr("y", geom.heatY + 170)
      .attr("class", "label label-bold")
      .text("Kältekreis");

    gLabels
      .append("text")
      .attr("x", geom.heatX - 280)
      .attr("y", geom.heatY + 170)
      .attr("class", "label label-bold")
      .text("Primärkreis");

    gLabels
      .append("text")
      .attr("x", geom.heatX + 100)
      .attr("y", geom.heatY + 170)
      .attr("text-anchor", "end")
      .attr("class", "label label-bold")
      .text("Heizkreis");

    // Static component labels
    gLabels
      .append("text")
      .attr("class", "label tag-comp tag-evaporator")
      .attr("text-anchor", "middle")
      .attr(
        "transform",
        `translate(${geom.oduX + 25}, ${geom.oduY + geom.oduH / 2}) rotate(-90)`
      )
      .text("Verdampfer");
    gLabels
      .append("text")
      .attr("class", "label tag-comp tag-condenser")
      .attr("text-anchor", "middle")
      .attr(
        "transform",
        `translate(${geom.oduX + geom.oduW - 25}, ${
          geom.oduY + geom.oduH / 2
        }) rotate(90)`
      )
      .text("Verflüssiger");
    gLabels
      .append("text")
      .attr("class", "label tag-comp tag-buffer")
      .attr("text-anchor", "middle")
      .attr(
        "transform",
        `translate(${geom.bufferX + 20}, ${
          geom.bufferY + geom.bufferH / 2
        }) rotate(-90)`
      )
      .text("Pendel­puffer");

    // Labels
    const labels = {
      ambient: gLabels
        .append("text")
        .attr("x", geom.oduX - 80)
        .attr("y", geom.midY - 20)
        .attr("class", "label tag-ambient"),
      evapin: gLabels
        .append("text")
        .attr("x", geom.oduX + 40)
        .attr("y", geom.oduY + geom.oduH - 20)
        .attr("class", "label tag-evapin")
        .attr("text-anchor", "middle"),
      evap: gLabels
        .append("text")
        .attr("x", geom.oduX + 40)
        .attr("y", geom.oduY + 25)
        .attr("class", "label tag-evap")
        .attr("text-anchor", "middle"),
      compout: gLabels
        .append("text")
        .attr("x", geom.oduX + 90)
        .attr("y", geom.oduY + 80)
        .attr("class", "label tag-compout"),
      pflow: gLabels
        .append("text")
        .attr("x", geom.bufferX - 180)
        .attr("y", geom.bufferY + 20)
        .attr("class", "label tag-pflow"),
      preturn: gLabels
        .append("text")
        .attr("x", geom.bufferX - 120)
        .attr("y", geom.bufferY + geom.bufferH - 20)
        .attr("class", "label tag-preturn"),
      hflow: gLabels
        .append("text")
        .attr("x", geom.bufferX + 80)
        .attr("y", geom.bufferY + 30)
        .attr("class", "label tag-hflow"),
      hreturn: gLabels
        .append("text")
        .attr("x", geom.heatX + 20)
        .attr("y", geom.bufferY + geom.bufferH + 60)
        .attr("class", "label tag-hreturn"),
      hmean: gLabels
        .append("text")
        .attr("x", geom.heatX + geom.heatW + 15)
        .attr("y", geom.heatY + 100)
        .attr("class", "label tag-hmean")
        .attr("text-anchor", "start"),
      // Modulation label above compressor
      mod: gLabels
        .append("text")
        .attr("x", geom.oduX + geom.oduW / 2)
        .attr("y", geom.oduY - 8)
        .attr("class", "label tag-mod")
        .attr("text-anchor", "middle"),
      // Bottom performance metrics line
      metrics: gLabels
        .append("text")
        .attr("x", 500)
        .attr("y", 400)
        .attr("class", "label tag-perf")
        .attr("text-anchor", "middle"),
      // Visual fraction showing COP = Q̇ / P_el
      copfrac: gLabels
        .append("g")
        .attr("class", "cop-frac")
        .attr("transform", "translate(600, 420)"),
    };

    // --- Render helpers ---
    function buildPrimaryFlowTooltip(r) {
      const lines = [
        "Vorlauftemperatur des Primärkreises TC3 gemessen in der Außeneinheit",
      ];
      if (r.flows.primaryMassFlow < r.flows.heatingMassFlow) {
        lines.push(
          "\nTC3 muss über T0 angehoben werden aufgrund der Zumischung des kälteren Rücklaufs durch den Pendelpuffer"
        );
      }
      const cpWh = 1.163; // Wh/(kg·K)
      const QkW = r.heat.heatingPowerW / 1000; // kW
      const m = r.flows.primaryMassFlow; // kg/s
      const dT = Math.max(
        0.001,
        r.temps.primaryFlowTempC - r.temps.primaryReturnTempC
      ); // K
      const mh = m * 3600; // kg/h
      lines.push(`\nVolumenstrom PC0 = Q̇_Heizleistung / (c_p · ΔT_Primär)`);
      lines.push(
        `        = ${QkW.toFixed(2)} kW / (${cpWh} Wh/(l·K) · ${dT.toFixed(
          1
        )} K)`
      );
      lines.push(`        ≈ ${mh.toFixed(0).toString()} l/h`);
      return lines.join("\n");
    }

    function buildPrimaryReturnTooltip(r) {
      const lines = ["Rücklauftemperatur des Primärkreises TC0"];
      if (r.flows.primaryMassFlow > r.flows.heatingMassFlow) {
        lines.push(
          "\nTemperatur ergibt sich aus Mischung der Rücklauftemperatur des Heizkreises und Vorlauftemperatur des Primärkreises durch den Pendelpuffer"
        );
      }
      return lines.join("\n");
    }

    function buildHeatingFlowTooltip(r) {
      const lines = ["Sollvorlauftemperatur T0 aus Heizkurve"];
      if (r.flows.primaryMassFlow < r.flows.heatingMassFlow) {
        lines.push(
          "\nTemperatur ergibt sich aus Mischung der Vorlauftemperatur des Primärkreises und Rücklauftemperatur des Heizkreises durch den Pendelpuffer"
        );
      }
      return lines.join("\n");
    }

    function buildHeatingReturnTooltip(r) {
      const cpWh = 1.163; // Wh/(kg·K) - spezifische Wärmekapazität von Wasser
      const T_flow = r.temps.heatingFlowTempC;
      const m_heating = r.flows.heatingMassFlow; // kg/s
      const mh = m_heating * 3600; // kg/h
      const Q_building = r.heat.buildingLoadW; // W
      const dT_heating = Q_building / Math.max(1e-6, mh * cpWh);
      const T_return = r.temps.heatingReturnTempC;

      const lines = [
        "Rücklauftemperatur (Heizkreis) aus skalierter Gebäudeheizlast und Volumenstrom:\n",
        "ΔT = Q̇_Gebäude / (c_p · ṁ)",
        `        = ${Q_building.toFixed(
          0
        )} W / (${cpWh} Wh/(l·K) · ${mh.toFixed(0)} l/h)`,
        `        ≈ ${dT_heating.toFixed(2)} K`,
        "T_R = T_V - ΔT",
        ` = ${T_flow.toFixed(1)} °C - ${dT_heating.toFixed(2)} K`,
        `= ${T_return.toFixed(1)} °C`,
      ];
      return lines.join("\n");
    }

    function renderLabels(r) {
      // Update modulation label above compressor
      labels.mod.text(`Mod: ${fmt.percent(r.derived.modulation)}`);
      setTitle(
        labels.mod,
        `Kompressor-Modulation: ${fmt.percent(r.derived.modulation)}`
      );

      labels.ambient.text(`${r.inputs.ambientTempC.toFixed(1)} °C`);
      labels.evapin.text(`${r.temps.evapTempC.toFixed(1)} °C`);
      labels.evap.text(`${r.temps.suctionTempC.toFixed(1)} °C`);
      labels.compout.text(`TR1: ${fmt.deg(r.temps.compOutTempC)}`);
      // Tooltip for refrigerant temperature after compressor
      setTitle(labels.compout, "Kältemitteltemperatur nach Kompressor TR1");
      labels.pflow
        .text(
          `TC3: ${fmt.deg(r.temps.primaryFlowTempC)}  | PC0: ${fmt.lph(
            r.flows.primaryMassFlow
          )}`
        )
        .attr("y", geom.yFlow - 30);
      // Tooltip for primary flow (TC3)
      setTitle(labels.pflow, buildPrimaryFlowTooltip(r));
      labels.preturn
        .text(`TC0: ${fmt.deg(r.temps.primaryReturnTempC)}`)
        .attr("y", geom.yReturn + 30);
      // Tooltip for primary return (TC0)
      setTitle(labels.preturn, buildPrimaryReturnTooltip(r));
      labels.hflow.text(
        `T0: ${fmt.deg(r.temps.heatingFlowTempC)}  | PC1: ${fmt.lph(
          r.flows.heatingMassFlow
        )}`
      );
      labels.hflow.attr("y", geom.yFlow - 30);
      // Simplified tooltip for heating flow T0
      setTitle(labels.hflow, buildHeatingFlowTooltip(r));
      labels.hreturn.text(`${fmt.deg(r.temps.heatingReturnTempC)}`);
      // Add live tooltip detailing how T_return is calculated
      setTitle(labels.hreturn, buildHeatingReturnTooltip(r));

      const meanTempStr = `⌀ ${(
        (r.temps.heatingFlowTempC + r.temps.heatingReturnTempC) /
        2
      ).toFixed(1)} °C | `;
      const buildingLoadStr = `${(r.heat.buildingLoadW / 1000).toFixed(2)} kW`;
      const isDeficit = r.heat.buildingLoadW - 100 > r.heat.heatingPowerW;
      labels.hmean.attr("y", (geom.yFlow + geom.yReturn) / 2).text(null);
      labels.hmean.append("tspan").text(meanTempStr);
      labels.hmean
        .append("tspan")
        .attr("class", "hmean-building-load")
        .attr("fill", isDeficit ? "#c62828" : null)
        .attr("font-weight", isDeficit ? "700" : null)
        .text(buildingLoadStr);
      // Tooltip for mean heating temperature and building load
      setTitle(
        labels.hmean,
        "Mittlere Temperatur im Heizkreis und aktuell benötigte Gebäudeheizlast. Die Gebäudeheizlast skaliert mit der Außentemperatur."
      );

      // Bottom metrics now reduced; explanation moved to visual fraction
      labels.metrics.text("");

      // Render visual explanation and numeric fraction: COP = [Q_label]/[P_label] = [Q]/[P] = COP
      const Pel = (r.heat.electricalPowerW / 1000).toFixed(2);
      const Q = (r.heat.heatingPowerW / 1000).toFixed(2);
      const COPv = r.heat.COP.toFixed(2);

      const g = labels.copfrac;
      g.selectAll("*").remove();

      // Layout constants
      const labelFracW = 300; // width for text fraction
      const numFracW = 90; // width for numeric fraction
      const gapEq = 14; // space around '='
      const baseY = 4;

      // 'COP =' on the left
      g.append("text")
        .attr("class", "cop-eq")
        .attr("x", -labelFracW / 2 - 20)
        .attr("y", baseY)
        .attr("text-anchor", "end")
        .text("COP =");

      // Text fraction: Q_label / P_label
      const labelCenter = 0;
      g.append("text")
        .attr("class", "cop-label numerator")
        .attr("text-anchor", "middle")
        .attr("x", labelCenter)
        .attr("y", baseY - 12)
        .text("Erzeugte Wärmeleistung");
      g.append("line")
        .attr("class", "cop-line")
        .attr("x1", labelCenter - labelFracW / 2)
        .attr("x2", labelCenter + labelFracW / 2)
        .attr("y1", baseY - 4)
        .attr("y2", baseY - 4);
      g.append("text")
        .attr("class", "cop-label denominator")
        .attr("text-anchor", "middle")
        .attr("x", labelCenter)
        .attr("y", baseY + 16)
        .text("Eingesetzte elektrische Leistung");

      // '=' between label fraction and numeric fraction
      g.append("text")
        .attr("class", "cop-eq")
        .attr("x", labelCenter + labelFracW / 2 + gapEq)
        .attr("y", baseY)
        .attr("text-anchor", "start")
        .text("=");

      // Numeric fraction centered to the right
      const numCenter =
        labelCenter + labelFracW / 2 + gapEq + 24 + numFracW / 2;
      g.append("text")
        .attr("class", "metric value")
        .attr("text-anchor", "middle")
        .attr("x", numCenter)
        .attr("y", baseY - 10)
        .text(`${Q} kW`);
      g.append("line")
        .attr("class", "cop-line")
        .attr("x1", numCenter - numFracW / 2)
        .attr("x2", numCenter + numFracW / 2)
        .attr("y1", baseY - 4)
        .attr("y2", baseY - 4);
      g.append("text")
        .attr("class", "metric value")
        .attr("text-anchor", "middle")
        .attr("x", numCenter)
        .attr("y", baseY + 16)
        .text(`${Pel} kW`);

      // '=' and COP value to the right
      g.append("text")
        .attr("class", "cop-eq")
        .attr("x", numCenter + numFracW / 2 + gapEq)
        .attr("y", baseY)
        .attr("text-anchor", "start")
        .text("=");
      g.append("text")
        .attr("class", "metric value")
        .attr("x", numCenter + numFracW / 2 + gapEq + 20)
        .attr("y", baseY)
        .attr("text-anchor", "start")
        .text(COPv);

      // Background rounded rectangle around the whole group
      const bbox = g.node().getBBox();
      const padX = 10,
        padY = 8;
      const box = g
        .append("rect")
        .attr("class", "cop-box")
        .attr("x", bbox.x - padX)
        .attr("y", bbox.y - padY)
        .attr("rx", 8)
        .attr("ry", 8)
        .attr("width", bbox.width + 2 * padX)
        .attr("height", bbox.height + 2 * padY);
      if (box.lower) box.lower();

      // Tooltip
      setTitle(
        g,
        `COP = (Erzeugte Wärmeleistung / Eingesetzte elektrische Leistung) = ${Q} kW / ${Pel} kW = ${COPv}`
      );
    }

    function renderFlows(r) {
      const FLOW_WIDTH = { BASE: 4, SCALE: 30 };
      const FLOW_SPEED = { BASE: 1, SCALE: 6 };
      const FLOW_NORM = 0.5;
      const norm = (kgps) => Math.max(0, Math.min(1, kgps / FLOW_NORM));

      const wPrim =
        FLOW_WIDTH.BASE + FLOW_WIDTH.SCALE * norm(r.flows.primaryMassFlow);
      const wHeat =
        FLOW_WIDTH.BASE + FLOW_WIDTH.SCALE * norm(r.flows.heatingMassFlow);
      const sPrim =
        FLOW_SPEED.BASE + FLOW_SPEED.SCALE * norm(r.flows.primaryMassFlow);
      const sHeat =
        FLOW_SPEED.BASE + FLOW_SPEED.SCALE * norm(r.flows.heatingMassFlow);

      // Refrigerant
      setFlow(
        refrig.fromEvapToComp,
        tempColor(r.temps.suctionTempC),
        widthForMod(r.derived.modulation),
        speedForMod(r.derived.modulation),
        +1
      );
      setFlow(
        refrig.fromCompToCond,
        tempColor(r.temps.compOutTempC),
        widthForMod(r.derived.modulation),
        speedForMod(r.derived.modulation),
        +1
      );
      setFlow(
        refrig.fromCondBottomToEvapBottom,
        tempColor((r.temps.primaryReturnTempC + r.temps.primaryFlowTempC) / 2),
        widthForMod(r.derived.modulation),
        speedForMod(r.derived.modulation),
        +1
      );
      const T_ref_mean_right =
        (r.temps.compOutTempC +
          (r.temps.primaryReturnTempC + r.temps.primaryFlowTempC) / 2) /
        2;
      setFlow(
        refrig.closeCond,
        tempColor(T_ref_mean_right),
        widthForMod(r.derived.modulation),
        speedForMod(r.derived.modulation),
        +1
      );
      setFlow(
        refrig.fromEvapUpToComp,
        tempColor(r.temps.evapTempC),
        widthForMod(r.derived.modulation),
        speedForMod(r.derived.modulation),
        +1
      );

      // Air
      setFlow(
        air,
        tempColor(r.inputs.ambientTempC),
        6,
        2 + 3 * Math.max(0, r.derived.modulation),
        +1
      );

      // Primary
      setFlow(prim.flow, tempColor(r.temps.primaryFlowTempC), wPrim, sPrim, +1);
      setFlow(
        prim.return,
        tempColor(r.temps.primaryReturnTempC),
        wPrim,
        sPrim,
        +1
      );
      const T_p_mean =
        (r.temps.primaryFlowTempC + r.temps.primaryReturnTempC) / 2;
      setFlow(prim.loopClose, tempColor(T_p_mean), wPrim, sPrim, -1);

      // Heating
      setFlow(heat.flow, tempColor(r.temps.heatingFlowTempC), wHeat, sHeat, +1);
      setFlow(
        heat.return,
        tempColor(r.temps.heatingReturnTempC),
        wHeat,
        sHeat,
        +1
      );
      const T_h_mean =
        (r.temps.heatingFlowTempC + r.temps.heatingReturnTempC) / 2;
      setFlow(heat.loopClose, tempColor(T_h_mean), wHeat, sHeat, +1);

      // Buffer stitch (bypass) flow between primary and heating circuits
      const mDiff = r.flows.primaryMassFlow - r.flows.heatingMassFlow; // >0: top->bottom, <0: bottom->top
      const wBuf =
        2 +
        36 *
          Math.max(
            0,
            Math.min(
              1,
              Math.abs(mDiff) /
                (r.flows.heatingMassFlow + r.flows.primaryMassFlow + 1e-6)
            )
          );
      const sBuf = 1 + 6 * Math.max(0, Math.min(1, Math.abs(mDiff) / 0.5));
      const dirBuf = mDiff >= 0 ? +1 : -1; // +1 top->bottom, -1 bottom->top
      const colorBuf =
        mDiff >= 0
          ? tempColor(r.temps.primaryFlowTempC)
          : tempColor(r.temps.heatingReturnTempC);
      setFlow(buffer.stitch, colorBuf, wBuf, sBuf, dirBuf);
    }

    function renderCompressor(r) {
      const compRotor = svg.select(".comp-rotor");
      if (r.derived.modulation < FLOW_CONST.MIN_MODULATION)
        compRotor.style("animation", "none");
      else
        compRotor.style(
          "animation",
          `spin ${computeSpinDuration(r.derived.modulation)}s linear infinite`
        );
    }

    function render(outputs) {
      const r = outputs;
      renderLabels(r);
      renderFlows(r);
      renderCompressor(r);
    }

    return { render };
  }

  window.HeatpumpDiagram = { initDiagram };
})();
