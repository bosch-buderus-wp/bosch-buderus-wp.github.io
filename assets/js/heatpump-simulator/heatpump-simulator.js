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
  if (
    !window.HeatpumpControls ||
    !window.HeatpumpDiagram ||
    !window.HeatpumpShare
  ) {
    console.error("UI modules not found (Controls/Diagram/Share)");
    return;
  }

  function init(selector = "#heatpump-simulator") {
    function applyParamsFromUrl(target) {
      if (typeof window === "undefined") return;
      const params = new URLSearchParams(window.location.search);
      const defaults =
        (window.HeatpumpEngine && window.HeatpumpEngine.DEFAULTS) || {};

      // Validate and set hpModel if provided and valid
      const hpModel = params.get("hpModel");
      if (
        hpModel &&
        window.HeatpumpEngine?.CAP_MODELS_W35 &&
        Object.prototype.hasOwnProperty.call(
          window.HeatpumpEngine.CAP_MODELS_W35,
          hpModel
        )
      ) {
        target.hpModel = hpModel;
      }

      // Generic decode based on DEFAULTS types
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

    // Controls stay above the diagram
    const controlsDiv = container.append("div").attr("class", "sim-controls");

    // Insert collapsible Heating Curve panel between controls and diagram (optional module)
    const curveWrap = container.append("div").attr("class", "sim-curve-wrap");
    const curveApi =
      window.HeatpumpHeatingCurve &&
      typeof window.HeatpumpHeatingCurve.initPanel === "function"
        ? window.HeatpumpHeatingCurve.initPanel(curveWrap.node())
        : { render: () => {} };

    const diagram = window.HeatpumpDiagram.initDiagram(selector);

    // Initialize Share UI via separate module; it will attach into the diagram wrapper
    // Actual initialization delayed until state is available

    const state = { ...window.HeatpumpEngine.DEFAULTS };
    // Apply optional URL overrides
    applyParamsFromUrl(state);

    // Share URL builder (kept here; Share UI will call via getter)
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

    // Initialize Share UI now that we have state and builder
    const shareApi = window.HeatpumpShare.initShare(selector, () =>
      buildShareUrl(state)
    );

    const recomputeAndRender = () => {
      // Refresh share tooltip
      if (shareApi && typeof shareApi.update === "function") {
        shareApi.update();
      }
      // Update curve panel from current inputs
      if (curveApi && typeof curveApi.render === "function") {
        curveApi.render(state);
      }
      const outputs = window.HeatpumpEngine.computeState(state);
      diagram.render(outputs);
    };

    window.HeatpumpControls.initControls(controlsDiv.node(), state, (patch) => {
      Object.assign(state, patch);
      recomputeAndRender();
    });

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
