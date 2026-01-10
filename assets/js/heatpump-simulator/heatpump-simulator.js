/*
  Heatpump Simulator (Modular UI wrapper)
*/
(function () {
  if (typeof d3 === "undefined") {
    console.error("d3 not found");
    return;
  }
  if (!window.HeatpumpEngine) {
    console.error("HeatpumpEngine not found");
    return;
  }
  function init(selector = "#heatpump-simulator", config = {}) {
    const finalConfig = {
      showDiagram: true,
      showCurve: true,
      showShare: true,
      showCOP: false,
      openCurve: false,
      hiddenControls: [],
      ...config,
    };

    // Validation: Only check for modules we actually intend to use
    if (!window.HeatpumpControls) {
      console.error("HeatpumpControls module not found");
      return;
    }
    if (finalConfig.showDiagram && !window.HeatpumpDiagram) {
      console.error(
        "HeatpumpDiagram module not found (required since showDiagram is true)"
      );
      return;
    }
    if (finalConfig.showShare && !window.HeatpumpShare) {
      console.error(
        "HeatpumpShare module not found (required since showShare is true)"
      );
      return;
    }

    function applyParamsFromUrl(target) {
      if (typeof window === "undefined") return;
      const params = new URLSearchParams(window.location.search);
      const defaults =
        (window.HeatpumpEngine && window.HeatpumpEngine.DEFAULTS) || {};

      const hpModel = params.get("hpModel");
      if (
        hpModel &&
        window.HeatpumpEngine?.THERMAL_PROFILES &&
        Object.prototype.hasOwnProperty.call(
          window.HeatpumpEngine.THERMAL_PROFILES,
          hpModel
        )
      ) {
        target.hpModel = hpModel;
      }

      for (const [k, vRaw] of params.entries()) {
        if (!(k in defaults)) continue;
        const def = defaults[k];
        const type = typeof def;
        const v = String(vRaw);
        if (type === "number") {
          const n = parseFloat(v.replace(",", "."));
          if (!Number.isNaN(n) && Number.isFinite(n)) target[k] = n;
        } else if (type === "string") {
          if (k !== "hpModel") target[k] = v;
        }
      }
    }
    const container = d3.select(selector);
    if (container.empty()) {
      console.warn("Sim container not found");
      return;
    }

    container.html("");
    container.classed("heatpump-sim", true);

    const controlsDiv = container.append("div").attr("class", "sim-controls");

    let curveApi = { render: () => {} };
    if (finalConfig.showCurve) {
      const curveWrap = container.append("div").attr("class", "sim-curve-wrap");
      if (
        window.HeatpumpHeatingCurve &&
        typeof window.HeatpumpHeatingCurve.initPanel === "function"
      ) {
        curveApi = window.HeatpumpHeatingCurve.initPanel(curveWrap.node(), {
          open: finalConfig.openCurve,
          showCOP: finalConfig.showCOP,
        });
      }
    }

    let diagram = null;
    if (finalConfig.showDiagram) {
      diagram = window.HeatpumpDiagram.initDiagram(selector);
    }

    const state = { ...window.HeatpumpEngine.DEFAULTS };
    applyParamsFromUrl(state);

    function buildShareUrl(state) {
      if (typeof window === "undefined") return "";
      const base = window.location.origin + "/simulator";
      const p = new URLSearchParams();
      const defaults =
        (window.HeatpumpEngine && window.HeatpumpEngine.DEFAULTS) || {};

      Object.keys(defaults).forEach((k) => {
        const def = defaults[k];
        const cur = state[k];
        if (cur == null) return;
        if (typeof def === "number") {
          p.set(k, String(cur));
        } else if (typeof def === "string") {
          p.set(k, String(cur));
        }
      });

      return `${base}?${p.toString()}`;
    }

    let shareApi = null;
    if (finalConfig.showShare) {
      shareApi = window.HeatpumpShare.initShare(selector, () =>
        buildShareUrl(state)
      );
    }

    const recomputeAndRender = () => {
      if (shareApi && typeof shareApi.update === "function") {
        shareApi.update();
      }
      if (curveApi && typeof curveApi.render === "function") {
        curveApi.render(state);
      }
      const outputs = window.HeatpumpEngine.computeState(state);
      if (diagram && typeof diagram.render === "function") {
        diagram.render(outputs);
      }
    };

    window.HeatpumpControls.initControls(
      controlsDiv.node(),
      state,
      (patch) => {
        Object.assign(state, patch);
        recomputeAndRender();
      },
      finalConfig
    );

    recomputeAndRender();
  }

  window.initHeatpumpSimulator = init;

  // Auto-init if container exists on page
  if (typeof document !== "undefined") {
    const start = () => {
      if (document.querySelector("#heatpump-simulator")) {
        init("#heatpump-simulator");
      }
    };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", start);
    } else {
      start();
    }
  }
})();
