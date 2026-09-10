---
title: "Bosch/Buderus Heat Pump Simulator: Understanding Heating Curve, Temperatures, and Behavior"
headline: "Heat Pump Simulator"
excerpt: "Interactive simulator for Bosch CS5800/6800i and Buderus WLW176/186i to better understand the heating curve, temperatures, and system behavior."
permalink: /en/en/simulator
toc: false
read_time: false
author_profile: false
share: false
comments: false
lang: en
translation_url: /en/simulator
translation_generated: true
---


With the following simulator, you can clearly understand how the heat pump works.

Attention: The simulator is only a first, very simplified attempt to simulate the heat pump processes and certainly still contains some errors.
If you have specific suggestions for improvement, feel free to create a [pull request](https://github.com/bosch-buderus-wp/bosch-buderus-wp.github.io/pulls).

<div id="heatpump-simulator"></div>

<link rel="stylesheet" href="{{ '/assets/css/heatpump-simulator.css' | relative_url }}">
<script src="https://cdn.jsdelivr.net/npm/d3@7.9.0/dist/d3.min.js"></script>
<script src="/assets/js/heatpump-simulator/engine/compute.js"></script>
<script src="/assets/js/heatpump-simulator/ui/controls.js"></script>
<script src="/assets/js/heatpump-simulator/ui/heating-curve.js"></script>
<script src="/assets/js/heatpump-simulator/ui/diagram.js"></script>
<script src="/assets/js/heatpump-simulator/ui/share.js"></script>
<script src="/assets/js/heatpump-simulator/heatpump-simulator.js"></script>

How does the simulator work?

1. Determining the **target flow temperature** of the heating circuit based on the heating curve
2. Determining the **building heating load** at the current outdoor temperature
3. Determining the **flow rate** in the primary circuit based on the primary-circuit temperature difference and the building heating load
4. Determining the **flow temperature** in the primary circuit based on the temperature difference and buffer mixing
5. Determining the **COP** of the refrigeration circuit using the Carnot cycle based on flow temperature and outdoor temperature
6. Determining the **electrical power requirement** based on the building heating load and COP—supplemented by the base load for pumps, electronics, ...
7. Determining the **modulation** based on the current and maximum electrical power requirements
