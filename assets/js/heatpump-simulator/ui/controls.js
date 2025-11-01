// UI controls: builds sliders/selects and emits onChange with state updates
// Exposes window.HeatpumpControls = { initControls }
(function () {
  const CLASSNAMES = {
    ROW: "sim-ctrl-row",
    VALUE: "sim-ctrl-value",
  };

  function initControls(containerSel, initialState, onChange) {
    const container = d3.select(containerSel);
    container.html("");
    container.classed("sim-controls", true);

    // Model selector
    const modelRow = container.append("div").attr("class", CLASSNAMES.ROW);
    modelRow.append("label").text("Modell").attr("for", "ctrl_hpModel");
    const modelSelect = modelRow.append("select").attr("id", "ctrl_hpModel");
    Object.keys(window.HeatpumpEngine.CAP_MODELS_W35).forEach((name) => {
      modelSelect.append("option").attr("value", name).text(name);
    });
    modelSelect.property("value", initialState.hpModel);
    modelSelect.on("change", function () {
      initialState.hpModel = this.value;
      onChange({ hpModel: this.value });
    });

    const ctrlConfig = [
      {
        key: "stdOutdoorTempC",
        label: "Normaußentemperatur",
        type: "range",
        min: -15,
        max: -5,
        step: 0.1,
        fmt: (v) => `${v.toFixed(1)} °C`,
      },
      {
        key: "flowTempAt20C",
        label: "Vorlauftemperatur bei 20°C",
        type: "range",
        min: 20,
        max: 30,
        step: 1,
        fmt: (v) => `${v.toFixed(1)} °C`,
      },
      {
        key: "flowTempAtStdOutdoorC",
        label: "Vorlauftemperatur bei NAT",
        type: "range",
        min: 25,
        max: 60,
        step: 1,
        fmt: (v) => `${v.toFixed(1)} °C`,
      },
      {
        key: "buildingHeatLoadAtStdKw",
        label: "Gebäudeheizlast bei NAT",
        type: "range",
        min: 2,
        max: 15,
        step: 0.1,
        fmt: (v) => `${v.toFixed(1)} kW`,
      },
      {
        key: "heatingLimitC",
        label: "Heizgrenze",
        type: "range",
        min: 10,
        max: 20,
        step: 1,
        fmt: (v) => `${v.toFixed(0)} °C`,
      },
      {
        key: "primarySpreadK",
        label: "Spreizung des Primärkreises TC3-TC0",
        type: "range",
        min: 3,
        max: 8,
        step: 0.1,
        fmt: (v) => `${v.toFixed(1)} K`,
      },
      {
        key: "heatingPumpPressureMbar",
        label: "Solldruck der Heizkreispumpe PC1",
        type: "range",
        min: 150,
        max: 750,
        step: 10,
        fmt: (v) => `${v.toFixed(0)} mbar`,
      },
      {
        key: "heatingFlowAt150mbarLph",
        label: "Durchflussmenge PC1 bei 150 mbar",
        type: "range",
        min: 300,
        max: 1000,
        step: 10,
        fmt: (v) => `${v.toFixed(0)} l/h`,
      },
      {
        key: "ambientTempC",
        label: "Aktuelle Außentemperatur",
        type: "range",
        min: -15,
        max: 20,
        step: 0.5,
        fmt: (v) => `${v.toFixed(1)} °C`,
      },
    ];

    ctrlConfig.forEach((cfg) => {
      const row = container.append("div").attr("class", CLASSNAMES.ROW);
      row.append("label").text(cfg.label).attr("for", `ctrl_${cfg.key}`);
      const valueLabel = row.append("span").attr("class", CLASSNAMES.VALUE);
      const input = row
        .append("input")
        .attr("id", `ctrl_${cfg.key}`)
        .attr("type", cfg.type)
        .attr("min", cfg.min)
        .attr("max", cfg.max)
        .attr("step", cfg.step)
        .property("value", initialState[cfg.key] ?? 0);

      const updateDisplay = () => {
        const v = parseFloat(input.property("value"));
        initialState[cfg.key] = v;
        valueLabel.text(cfg.fmt(v));
        onChange({ [cfg.key]: v });
      };
      input.on("input", updateDisplay);
      updateDisplay();
    });
  }

  window.HeatpumpControls = { initControls };
})();
