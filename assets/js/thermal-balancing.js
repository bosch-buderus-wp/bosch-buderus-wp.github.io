(() => {
  'use strict';

  // Two parallel branches with a small pressure redistribution as the other branch is throttled.
  // A constant emitter conductance and room heat loss give a steady-state teaching model, not a system design calculation.
  const outdoor = 0;
  const emitter = 100;
  const heatLoss = [75, 58];
  const steps = [
    'Die Thermostate halten die Räume auf 20 °C und begrenzen die Wärmeabgabe. Öffne sie, um zu sehen, wie warm die Räume ohne Begrenzung würden.',
    'Die Thermostate sind jetzt ganz geöffnet. Ohne ihre Begrenzung werden die Räume zu warm. Gehe weiter, um den Sollvorlauf anzupassen.',
    'Senke den Sollvorlauf, bis Raum 1 gerade noch 20 °C erreicht. Lasse sein Ventil ganz offen: Er ist der Referenzraum.',
    'Raum 2 ist noch zu warm? Drossle dort die Ventilvoreinstellung, bis auch er etwa 20 °C erreicht. Prüfe anschließend Raum 1 und den Sollvorlauf erneut.',
    'Probiere die Regler frei aus. Gesucht sind etwa 20 °C in beiden Räumen bei möglichst niedrigem Sollvorlauf und offenem Ventil im Referenzraum.'
  ];
  const format = value => new Intl.NumberFormat('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value);

  document.querySelectorAll('[data-thermal-balancing]').forEach(section => {
    const flow = section.querySelector('#tba-flow');
    const valves = [section.querySelector('#tba-valve-1'), section.querySelector('#tba-valve-2')];
    const previous = section.querySelector('[data-previous]');
    const next = section.querySelector('[data-next]');
    let step = 0;

    function update() {
      const supply = Number(flow.value);
      const openings = valves.map(input => Number(input.value) / 100);
      const flows = openings.map((opening, i) => 150 * opening * (1 + 0.15 * (1 - openings[1 - i])));
      const conductances = flows.map(rate => {
        const capacity = 1.163 * rate;
        return capacity * (1 - Math.exp(-emitter / capacity));
      });
      const temperatures = conductances.map((conductance, i) =>
        (conductance * supply + heatLoss[i] * outdoor) / (conductance + heatLoss[i])
      );
      const thermostatOn = step === 0;
      const displayed = temperatures.map(temp => thermostatOn ? Math.min(temp, 20) : temp);
      section.querySelector('[data-value="flow"]').textContent = `${format(supply)} °C`;
      valves.forEach((input, i) => {
        section.querySelector(`[data-value="valve${i + 1}"]`).textContent = Number(input.value) === 100 ? 'offen' : `${input.value} %`;
        input.setAttribute('aria-valuetext', Number(input.value) === 100 ? 'offen' : `${input.value} Prozent der Voreinstellung`);
        section.querySelector(`[data-room-temp="${i}"]`).textContent = `${format(displayed[i])} °C`;
        const limited = thermostatOn && temperatures[i] > 20;
        section.querySelector(`[data-room-status="${i}"]`).textContent = limited ? 'Thermostat begrenzt' : 'Thermostat offen';
        // Arrow opacity illustrates the thermostat's limiting effect, not its measured position or heat output.
        const relativeHeat = limited ? Math.min(1, heatLoss[i] * (20 - outdoor) / (conductances[i] * (supply - 20))) : 1;
        section.querySelector(`[data-heat="${i}"]`).style.opacity = String(0.2 + 0.8 * relativeHeat);
      });
      section.querySelector('[data-step-number]').textContent = step === steps.length - 1 ? 'FREI' : `${step + 1} / ${steps.length - 1}`;
      section.querySelector('[data-step-text]').textContent = steps[step];
      section.querySelector('[data-control="flow"]').classList.toggle('tba-highlight', step === 2);
      section.querySelector('[data-control="valve2"]').classList.toggle('tba-highlight', step === 3);
      previous.disabled = step === 0;
      next.hidden = step === steps.length - 1;
      next.textContent = step === 0 ? 'Thermostate öffnen' : step === steps.length - 2 ? 'Frei ausprobieren' : 'Weiter';
      const result = section.querySelector('[data-result-title]');
      result.hidden = step < 2;
      if (displayed.some(temp => temp < 19.7)) {
        result.textContent = 'Mindestens ein Raum ist zu kalt.';
      } else if (displayed.some(temp => temp > 20.3)) {
        result.textContent = 'Mindestens ein Raum ist zu warm.';
      } else if (openings[0] < 1) {
        result.textContent = 'Beide Räume sind nahe 20 °C; das Ventil im Referenzraum ist noch gedrosselt.';
      } else {
        result.textContent = 'Beide Räume sind nahe 20 °C und das Ventil im Referenzraum ist offen.';
      }
      section.querySelector('#tba-svg-desc').textContent = `Zwei parallel angeschlossene Heizkörper. Raum 1: ${format(displayed[0])} °C. Raum 2: ${format(displayed[1])} °C. Sollvorlauf: ${format(supply)} °C. ${thermostatOn ? 'Thermostate regeln.' : 'Thermostate offen.'}`;
    }
    [flow, ...valves].forEach(input => input.addEventListener('input', update));
    previous.addEventListener('click', () => { step = Math.max(0, step - 1); update(); });
    next.addEventListener('click', () => { step = Math.min(steps.length - 1, step + 1); update(); });
    section.querySelector('[data-reset]').addEventListener('click', () => { step = 0; flow.value = 48; valves.forEach(input => { input.value = 100; }); update(); });
    update();
    section.querySelector('[data-tba-controls]').hidden = false;
    section.querySelector('[data-tba-interactive]').hidden = false;
  });
})();
