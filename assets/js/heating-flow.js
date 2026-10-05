(() => {
  'use strict';

  const heatW = 1000;
  const roomTempC = 20;
  const waterWhPerLiterK = 1.163;
  // At 45/35 °C and a room temperature of 20 °C: LMTD = (25 − 15) / ln(25 / 15).
  const meanOverTempK = 10 / Math.log(25 / 15);

  function temperatures(flowLitersPerHour) {
    const spreadK = heatW / (waterWhPerLiterK * flowLitersPerHour);
    // Solve LMTD = spread / ln((flow − room) / (return − room)).
    const returnTempC = roomTempC + spreadK / Math.expm1(spreadK / meanOverTempK);
    return { flowTempC: returnTempC + spreadK, returnTempC, spreadK };
  }

  const x = flow => 55 + (flow - 50) / 250 * 380;
  const y = temp => 118 - (temp - 40) * 10;

  document.querySelectorAll('[data-heating-flow]').forEach(section => {
    const texts = JSON.parse(section.querySelector('[data-heating-flow-text]').textContent);
    const number = new Intl.NumberFormat(texts.locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    const formatText = (template, values) => template.replace(/\{(\w+)\}/g, (_, key) => values[key]);
    const slider = section.querySelector('input[type="range"]');
    const output = section.querySelector('output');
    const description = section.querySelector('#hfl-diagram-desc');
    const flowLabel = section.querySelector('[data-flow-temp]');
    const returnLabel = section.querySelector('[data-return-temp]');
    const spreadLabel = section.querySelector('[data-spread]');
    const marker = section.querySelector('[data-marker]');
    const markerLine = section.querySelector('[data-marker-line]');
    const explanation = section.querySelector('[data-flow-explanation]');
    const points = [];
    for (let flow = 50; flow <= 300; flow += 2) {
      points.push(`${points.length ? 'L' : 'M'}${x(flow).toFixed(2)} ${y(temperatures(flow).flowTempC).toFixed(2)}`);
    }
    section.querySelector('[data-curve]').setAttribute('d', points.join(' '));

    function update() {
      const flow = Number(slider.value);
      const state = temperatures(flow);
      const flowText = `${number.format(state.flowTempC)} °C`;
      const returnText = `${number.format(state.returnTempC)} °C`;
      const spreadText = `${number.format(state.spreadK)} K`;
      output.textContent = `${flow} l/h`;
      flowLabel.textContent = flowText;
      returnLabel.textContent = returnText;
      spreadLabel.textContent = spreadText;
      const values = { flow, flowTemp: flowText, returnTemp: returnText, spread: spreadText };
      slider.setAttribute('aria-valuetext', formatText(texts.flow_aria, values));
      description.textContent = formatText(texts.live_description, values);
      marker.setAttribute('cx', x(flow));
      marker.setAttribute('cy', y(state.flowTempC));
      markerLine.setAttribute('d', `M${x(flow)} ${y(state.flowTempC)} V128`);
      section.style.setProperty('--hfl-duration', `${(2.5 * 86 / flow).toFixed(3)}s`);
      explanation.textContent = formatText(texts.live_explanation, values);
    }

    slider.addEventListener('input', update);
    update();
    section.querySelector('[data-flow-control]').hidden = false;
    section.querySelector('[data-flow-chart]').hidden = false;
    section.classList.add('hfl-ready');
  });
})();
