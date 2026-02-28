---
title: "Bosch/Buderus Wärmepumpen-Simulator: Heizkurve, Temperaturen und Verhalten verstehen"
headline: "Wärmepumpen Simulator"
excerpt: "Interaktiver Simulator für Bosch CS5800/6800i und Buderus WLW176/186i, um Heizkurve, Temperaturen und das Anlagenverhalten besser zu verstehen."
permalink: /simulator
toc: false
read_time: false
author_profile: false
share: false
comments: false
---

Mit dem folgenden Simulator kannst du die Funktionsweise der Wärmepumpe anschaulich nachvollziehen.

Achtung: Der Simulator ist nur ein erster, sehr vereinfachter Versuch, die Abläufe der Wärmepumpe zu simulieren, und hat mit Sicherheit noch einige Fehler.
Falls du konkrete Verbesserungsvorschläge hast, erstelle gerne einen [Pull-Request](https://github.com/bosch-buderus-wp/bosch-buderus-wp.github.io/pulls).

<div id="heatpump-simulator"></div>

<link rel="stylesheet" href="{{ '/assets/css/heatpump-simulator.css' | relative_url }}">
<script src="https://cdn.jsdelivr.net/npm/d3@7.9.0/dist/d3.min.js"></script>
<script src="/assets/js/heatpump-simulator/engine/compute.js"></script>
<script src="/assets/js/heatpump-simulator/ui/controls.js"></script>
<script src="/assets/js/heatpump-simulator/ui/heating-curve.js"></script>
<script src="/assets/js/heatpump-simulator/ui/diagram.js"></script>
<script src="/assets/js/heatpump-simulator/ui/share.js"></script>
<script src="/assets/js/heatpump-simulator/heatpump-simulator.js"></script>

Wie funktioniert der Simulator?

1. Bestimmung der **Sollvorlauftemperatur** des Heizkreises anhand der Heizkurve
2. Bestimmung der **Gebäudeheizlast** zur aktuellen Außentemperatur
3. Bestimmung des **Volumenstroms** im Primärkreis anhand der Primärkreisspeizung und der Gebäudeheizlast
4. Bestimmung der **Vorlauftemperatur** im Primärkreis anhand Spreizung und Pufferdurchmischung
5. Bestimmung des **COP** des Kältekreises mit Carnot-Prozess anhand Vorlauftemperatur und Außentemperatur
6. Bestimmung des **elektrischen Leistungsbedarfs** anhand Gebäudeheizlast und COP - ergänzt um Grundlast für Pumpen, Elektronik, ...
7. Bestimmung der **Modulation** anhand des aktuellen und maximalen elektrischen Leistungsbedarfs
