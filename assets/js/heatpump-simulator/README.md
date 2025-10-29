# Heatpump Simulator (Modular UI Wrapper)

This directory contains the modular heat pump simulator composed of five parts:

1. Engine (`engine/compute.js`) — Pure physics/model function `computeState(DEFAULTS) -> outputs`
2. Controls (`ui/controls.js`) — Renders inputs and updates state via a callback
3. Heating Curve (`ui/heating-curve.js`) — Optional collapsible chart showing heating curve, building heat load, model-specific capacity
4. Diagram (`ui/diagram.js`) — Renders the SVG visualization from engine outputs
5. Share (`ui/share.js`) — Provides a share button and popup to copy a permalink for the current simulator state

The entry point `heatpump-simulator.js` orchestrates these modules. It does not contain physics or SVG code.

## System being simulated (context)

- Monoblock air/water heat pump (Bosch CS5800/6800i, Buderus WLW176/186i). The refrigeration circuit remains inside the outdoor unit.
- Primary circuit (PC0 pump) carries heat to the indoor buffer and is controlled by a fixed spread (e.g., 3.5 K).
- Heating circuit (PC1 pump) is hydraulically decoupled via the buffer and is controlled by constant differential pressure (e.g., 150 mbar).
- If primary mass flow (m_p) differs from heating mass flow (m_h), the buffer mixes flow/return accordingly (acts as a hydraulic softener).

## Heating curve and building load (high level)

- The user sets two points for the heating curve: target flow at standard outdoor temperature and at 20°C. The engine computes the supply setpoint `T0` from ambient temperature via linear interpolation with clamping.
- Building heat load scales with ambient temperature. Heating-side deltaT derives from: `Q_load = m_h * c_p * ΔT`.

## Data flow at runtime

- State is initialized from `Engine.DEFAULTS`.
- Controls mutate state via a patch callback (Object.assign).
- After each change: `Engine.computeState(state)` is called, and `Diagram.render(outputs)` updates the visualization.

## Engine outputs (see `engine/compute.js` for exact names and units)

- `inputs`: echo of normalized inputs used
- `flows`: `{ primaryMassFlow, heatingMassFlow }`
- `heat`: `{ heatingPowerW, electricalPowerW, buildingLoadW, COP }`
- `derived`: `{ modulation }`
- `temps`: `{ primaryFlowTempC, primaryReturnTempC (alias primaryReturnInC), heatingFlowTempC (T0), heatingReturnTempC, evapTempC, condTempC, compOutTempC, suctionTempC }`

## UI modules

- `ui/controls.js` creates labeled sliders/selects for model, ambient, curve points, building load, spreads, pump pressure and calibration.
- `ui/diagram.js` draws the outdoor/indoor units, buffer and loop arrows; labels include TR1, TC3, TC0, T0, RL. Some labels contain SVG tooltips that explain live calculations.
- `ui/heating-curve.js` adds a collapsible panel between controls and diagram, showing the linear heating curve based on `stdOutdoorTempC`, `flowTempAt20C`, `flowTempAtStdOutdoorC`, the DIN 12831 building heat load scaled from `buildingHeatLoadAtStdKw`, and the selected model’s capacity using `HeatpumpEngine.capacityAt(Ta, Tflow, hpModel)`.

## Extending for developers and LLMs

- Add a new input: extend `Engine.DEFAULTS`, expose it in `ui/controls.js`, and ensure `computeState` consumes it. The render pipeline (`recomputeAndRender`) needs no change.
- Add a new output/label: compute in `engine/compute.js` and render in `ui/diagram.js`. Keep physics pure and DOM-free.
- Naming guidance: prefer descriptive, unit-suffixed keys (`…TempC`, `…MassFlow`). Maintain backward-compatible aliases if renaming model fields.
- Invariants to keep: `T_flow >= T_return` in each loop; non-negative powers; `0 <= modulation <= 1`.

## Controls overview

- Model: 4 kW, 5 kW or 7 kW
- Ambient Temperature (°C)
- Standard Outdoor Temperature (°C)
- Flow Temperature at 20°C (°C)
- Flow Temperature at Standard Outdoor Temperature (°C)
- Building Heating Load at Standard Outdoor Temperature (kW)
- Spread of Primary Circuit TC3–TC0 (K)
- Differential Pressure of PC1 (mbar)
- Flow volume of PC1 at 150 mbar (l/h)

## Usage

- Include d3 plus the modules in this order: `engine/compute.js`, `ui/controls.js`, `ui/heating-curve.js` (optional), `ui/diagram.js`, `ui/share.js`, then `heatpump-simulator.js`.
- Add a container div with `id="heatpump-simulator"` or call `window.initHeatpumpSimulator('#your-id')`.
