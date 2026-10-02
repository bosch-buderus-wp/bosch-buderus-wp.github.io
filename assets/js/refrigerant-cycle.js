(() => {
  'use strict';

  const svgNamespace = 'http://www.w3.org/2000/svg';
  const blue = [50, 133, 181];
  const superheated = [93, 151, 161];
  const orange = [219, 150, 62];
  const red = [215, 91, 81];
  const clamp = value => Math.max(0, Math.min(1, value));
  const mix = (from, to, amount) => `rgb(${from.map((value, index) => Math.round(value + (to[index] - value) * clamp(amount))).join(',')})`;

  // Direction is relative to the SVG path. The compressor always pumps forward.
  // Spacing encodes pressure symbolically, not density or a measured mass flow.
  const tracksFor = mode => {
    const heating = mode === 'heating';
    return {
      suction: { direction: 1, kind: 'vapour', pressure: 'low' },
      compression: { direction: 1, kind: 'compression', pressure: 'transition' },
      discharge: { direction: 1, kind: 'hot', pressure: 'high' },
      'valve-hot': { direction: 1, kind: 'hot', pressure: 'high' },
      'valve-cold': { direction: 1, kind: 'vapour', pressure: 'low' },
      'air-top': { direction: heating ? -1 : 1, kind: heating ? 'vapour' : 'hot', pressure: heating ? 'low' : 'high' },
      'water-top': { direction: heating ? 1 : -1, kind: heating ? 'hot' : 'vapour', pressure: heating ? 'high' : 'low' },
      'air-exchanger': { direction: heating ? -1 : 1, kind: heating ? 'evaporation' : 'condensation', pressure: heating ? 'low' : 'high' },
      'water-exchanger': { direction: heating ? 1 : -1, kind: heating ? 'condensation' : 'evaporation', pressure: heating ? 'high' : 'low' },
      'air-bottom': { direction: heating ? -1 : 1, kind: heating ? 'mixture' : 'liquid', pressure: heating ? 'low' : 'high' },
      expansion: { direction: heating ? -1 : 1, kind: 'expansion', pressure: 'transition' },
      'water-bottom': { direction: heating ? -1 : 1, kind: heating ? 'liquid' : 'mixture', pressure: heating ? 'high' : 'low' },
    };
  };

  const appearance = (kind, progress) => {
    switch (kind) {
      case 'hot': return { colour: mix(red, red, 0), vapour: 1 };
      case 'liquid': return { colour: mix(orange, orange, 0), vapour: 0 };
      case 'mixture': return { colour: mix(blue, blue, 0), vapour: 0.35 };
      case 'compression': return { colour: mix(superheated, red, progress), vapour: 1 };
      case 'expansion': return { colour: mix(orange, blue, progress), vapour: 0.35 * progress };
      // First cool the superheated gas, then condense, then subcool the liquid.
      case 'condensation': return { colour: mix(red, orange, progress / 0.3), vapour: 1 - clamp((progress - 0.2) / 0.65) };
      // Nearly constant temperature during evaporation; the last portion is superheating.
      case 'evaporation': return { colour: mix(blue, superheated, clamp((progress - 0.85) / 0.15)), vapour: 0.35 + 0.65 * clamp(progress / 0.85) };
      default: return { colour: mix(superheated, superheated, 0), vapour: 1 };
    }
  };

  document.querySelectorAll('[data-refrigerant-cycle]').forEach(root => {
    const texts = JSON.parse(root.querySelector('[data-cycle-text]').textContent);
    const explanationPanel = root.querySelector('.rcc-explanation');
    let particleLayer;
    const components = [...root.querySelectorAll('[data-component]')];
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const smallScreen = window.matchMedia('(max-width: 600px)');
    let mode = 'heating';
    let selected = null;
    let selectedButton = null;
    let visible = false;
    let frame = null;
    let lastTimestamp = null;
    let elapsed = 0;
    let tracks = [];

    const setText = (selector, value) => { root.querySelectorAll(selector).forEach(element => { element.textContent = value; }); };
    const closeExplanation = (restoreFocus = false) => {
      explanationPanel.hidden = true;
      components.forEach(button => button.setAttribute('aria-expanded', 'false'));
      selected = null;
      if (restoreFocus && selectedButton) {
        const layout = root.querySelector(`[data-layout="${smallScreen.matches ? 'mobile' : 'wide'}"]`);
        layout.querySelector(`[data-component="${selectedButton.dataset.component}"]`).focus();
      }
    };
    const explain = (component, button, toggle = false) => {
      if (toggle && selected === component && !explanationPanel.hidden) {
        closeExplanation();
        return;
      }
      selected = component;
      if (button) selectedButton = button;
      const explanation = texts[`${mode}_steps`][component];
      components.forEach(button => button.setAttribute('aria-expanded', String(button.dataset.component === component)));
      setText('[data-explanation-title]', explanation.title);
      setText('[data-explanation-text]', explanation.text);
      setText('[data-explanation-state]', explanation.state);
      explanationPanel.hidden = false;
    };

    // Include the label and info icon in the interactive outline in either language.
    const fitComponentOutlines = () => {
      components.forEach(component => {
        const hit = component.querySelector('.rcc-hit');
        const bounds = [...component.children]
          .filter(child => child !== hit)
          .map(child => child.getBBox());
        const left = Math.min(...bounds.map(box => box.x)) - 5;
        const top = Math.min(...bounds.map(box => box.y)) - 5;
        const right = Math.max(...bounds.map(box => box.x + box.width)) + 5;
        const bottom = Math.max(...bounds.map(box => box.y + box.height)) + 5;
        hit.setAttribute('x', left);
        hit.setAttribute('y', top);
        hit.setAttribute('width', right - left);
        hit.setAttribute('height', bottom - top);
      });
    };

    const createTracks = () => {
      const configuration = tracksFor(mode);
      const layout = root.querySelector(`[data-layout="${smallScreen.matches ? 'mobile' : 'wide'}"]`);
      particleLayer = layout.querySelector('[data-particles]');
      root.querySelectorAll('[data-particles]').forEach(layer => layer.replaceChildren());
      particleLayer.replaceChildren();
      tracks = [...layout.querySelectorAll('[data-track]')].map(path => {
        const config = configuration[path.dataset.track];
        const length = path.getTotalLength();
        const spacing = config.pressure === 'high' ? 15 : config.pressure === 'low' ? 34 : 24;
        const count = Math.max(2, Math.round(length / spacing));
        const particles = Array.from({ length: count }, (_, index) => {
          const circle = document.createElementNS(svgNamespace, 'circle');
          circle.setAttribute('r', '4');
          circle.setAttribute('stroke-width', '2');
          particleLayer.append(circle);
          return { circle, seed: ((index + 1) * 0.61803398875) % 1 };
        });
        return { path, ...config, length, particles, count };
      });
    };

    const paint = () => {
      tracks.forEach(track => {
        track.particles.forEach(({ circle, seed }, index) => {
          let progress = (index / track.count + elapsed * 0.55 / track.count) % 1;
          // Compress the visual spacing towards the outlet; expand it after throttling.
          if (track.kind === 'compression') progress = 1 - Math.pow(1 - progress, 1.5);
          if (track.kind === 'expansion') progress = Math.pow(progress, 1.5);
          const distance = (track.direction === 1 ? progress : 1 - progress) * track.length;
          const point = track.path.getPointAtLength(distance);
          const { colour, vapour } = appearance(track.kind, progress);
          circle.setAttribute('cx', point.x.toFixed(2));
          circle.setAttribute('cy', point.y.toFixed(2));
          circle.setAttribute('stroke', colour);
          circle.setAttribute('fill', colour);
          circle.setAttribute('fill-opacity', String(vapour === 1 ? 0 : vapour === 0 ? 1 : 1 - clamp((vapour - seed) * 12 + 0.5)));
        });
      });
    };

    const tick = timestamp => {
      if (lastTimestamp !== null) elapsed += Math.min((timestamp - lastTimestamp) / 1000, 0.05);
      lastTimestamp = timestamp;
      paint();
      frame = window.requestAnimationFrame(tick);
    };
    const updateRunning = () => {
      const running = !motionPreference.matches && visible && !document.hidden;
      root.dataset.running = String(running);
      if (running && frame === null) frame = window.requestAnimationFrame(tick);
      if (!running && frame !== null) {
        window.cancelAnimationFrame(frame);
        frame = null;
        lastTimestamp = null;
      }
    };
    const setMode = nextMode => {
      mode = nextMode;
      elapsed = 0;
      const heating = mode === 'heating';
      root.dataset.mode = mode;
      root.querySelectorAll('[data-mode-button]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.modeButton === mode)));
      const airRole = heating ? texts.evaporator : texts.condenser;
      const waterRole = heating ? texts.condenser : texts.evaporator;
      setText('[data-air-role]', airRole);
      setText('[data-water-role]', waterRole);
      root.querySelectorAll('[data-component="air"]').forEach(button => button.setAttribute('aria-label', `${airRole}: ${texts.info}`));
      root.querySelectorAll('[data-component="water"]').forEach(button => button.setAttribute('aria-label', `${waterRole}: ${texts.info}`));
      const setEnergy = (selector, lines) => root.querySelectorAll(selector).forEach(label => {
        [...label.children].forEach((line, index) => { line.textContent = lines[index]; });
      });
      setEnergy('[data-air-energy]', texts[heating ? 'air_energy_lines' : 'air_defrost_energy_lines']);
      setEnergy('[data-water-energy]', texts[heating ? 'water_energy_lines' : 'water_defrost_energy_lines']);
      root.querySelectorAll('[data-heating-d]').forEach(path => path.setAttribute('d', path.getAttribute(heating ? 'data-heating-d' : 'data-defrost-d')));
      fitComponentOutlines();
      createTracks();
      paint();
      if (selected) explain(selected);
    };

    components.forEach(button => {
      button.setAttribute('role', 'button');
      button.setAttribute('tabindex', '0');
      button.setAttribute('aria-expanded', 'false');
      button.addEventListener('click', () => explain(button.dataset.component, button, true));
      button.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          explain(button.dataset.component, button, true);
        }
      });
    });
    root.querySelectorAll('[data-mode-button]').forEach(button => button.addEventListener('click', () => setMode(button.dataset.modeButton)));
    motionPreference.addEventListener('change', updateRunning);
    root.querySelector('[data-close]').addEventListener('click', () => closeExplanation(true));
    root.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        closeExplanation(true);
        root.querySelector('.rcc-guide').open = false;
      }
    });
    smallScreen.addEventListener('change', () => { fitComponentOutlines(); createTracks(); paint(); });
    document.fonts.ready.then(fitComponentOutlines);
    document.addEventListener('visibilitychange', updateRunning);

    setMode('heating');
    root.querySelectorAll('.rcc-static-particles').forEach(layer => layer.remove());
    root.querySelector('.rcc-controls').hidden = false;
    root.classList.add('rcc-ready');
    updateRunning();
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting;
        updateRunning();
      }, { threshold: 0 }).observe(root);
    } else {
      visible = true;
      updateRunning();
    }
  });
})();
