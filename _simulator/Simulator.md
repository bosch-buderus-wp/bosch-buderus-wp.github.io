---
title: Wärmepumpen Simulator
excerpt: Simulator für Bosch CS5800/6800i und Buderus WLW176/186 Wärmepumpen
permalink: /simulator
toc: false
---

Mit dem folgenden Simulator kannst du die Funktionsweise der Wärmepumpe anschaulich nachvollziehen.

Achtung: Der Simulator ist nur ein erster, sehr vereinfachter Versuch, die Abläufe der Wärmepumpe zu simulieren, und hat mit Sicherheit noch einige Fehler.
Falls du konkrete Verbesserungsvorschläge hast, erstelle gerne einen [Pull-Request](https://github.com/bosch-buderus-wp/bosch-buderus-wp.github.io/pulls).

<div id="heatpump-simulator"></div>

<link rel="stylesheet" href="{{ '/assets/css/heatpump-simulator.css' | relative_url }}">
<script src="https://cdn.jsdelivr.net/npm/d3@7.9.0/dist/d3.min.js"></script>
<script src="/assets/js/heatpump-simulator/engine/compute.js"></script>
<script src="/assets/js/heatpump-simulator/ui/controls.js"></script>
<script src="/assets/js/heatpump-simulator/ui/diagram.js"></script>
<script src="/assets/js/heatpump-simulator/heatpump-simulator.js"></script>
