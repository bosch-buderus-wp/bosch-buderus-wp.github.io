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
  if (!window.HeatpumpControls || !window.HeatpumpDiagram) {
    console.error("UI modules not found");
    return;
  }

  function init(selector = "#heatpump-simulator") {
    const container = d3.select(selector);
    if (container.empty()) {
      console.warn("Sim container not found");
      return;
    }

    container.html("");
    container.classed("heatpump-sim", true);

    const controlsDiv = container.append("div").attr("class", "sim-controls");
    const diagram = window.HeatpumpDiagram.initDiagram(selector);

    const state = { ...window.HeatpumpEngine.DEFAULTS };

    const recomputeAndRender = () => {
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
