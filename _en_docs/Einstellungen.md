---
title: "Settings: Heating curve, domestic hot water, auxiliary heater, ..."
headline: "Settings: Heating curve, domestic hot water, auxiliary heater, ..."
excerpt: "Overview of settings for Bosch CS5800/6800i and Buderus WLW176/186i with heating curve, room temperature, domestic hot water, cooling, and important menu items."
permalink: /en/docs/einstellungen/
toc: true
sidebar:
  nav: "en_docs"
lang: en
translation_url: /docs/einstellungen/
translation_generated: true
---

The Bosch CS 5800/6800i and Buderus WLW176/186i offer a wide range of settings. This page shows the most important menu items relating to the heating curve, room temperature, domestic hot water, and other parameters relevant to efficiency and comfort.

Many settings can be configured in the service menu.
To access the service menu, press and hold the Service button (3 lines at the top left of the display) for at least 5 seconds.
Some settings can also be adjusted directly on the control unit's start screen.
Most settings from the start screen can also be found in the [app](/en/docs/app/).

The following section briefly explains the most important settings, though by no means all of them.

## Room temperature

Use `Startbildschirm` &rarr; `Wunschtemperatur` to set the desired temperature you want to achieve in the heated rooms.
Without a connected room thermometer from the heat pump accessories, the set room temperature does not necessarily correspond to the actual room temperature.
This is not particularly significant from a technical perspective.
However, if you still want to align the two values, you can set a correction value under `Anlageneinstellungen` &rarr; `Heizung/Kühlung` &rarr; `Heizkreis 1` &rarr; `Heizen` &rarr; `Raumtemperatur-Offset`.

For the most constant possible low power output, a constant room temperature is preferable.
This can be achieved by selecting `Manuell` under `Startbildschirm` &rarr; `Wunschtemperatur`.
However, if you prefer to use a nighttime setback of the room temperature, you can do so by selecting `Auto`.
And if you do not want to rely on automatic summer/winter changeover, you can select `Aus` during the summer months.
This switches off the heating.
Domestic hot water production remains possible.

## Heating curve

When it gets colder outside, the heating system must provide more power to keep the rooms at the desired temperature.
For this purpose, it increases the flow temperature of the heating water.
The extent of this increase is determined by the heating curve.

[![Heating curve endpoint setting](/assets/images/Einstellung-Heizkurvenendpunkt.jpg)](/assets/images/Einstellung-Heizkurvenendpunkt.jpg)

### Control mode

The control mode defines the basis on which the target flow temperature is determined and can be set under
`Anlageneinstellungen` &rarr; `Heizung/Kühlung` &rarr; `Heizkreis 1` &rarr; `Heizen` &rarr; `Regelungsart`:

- `Außentemperatur geführt`: the heating curve is defined exclusively by the flow temperature at the minimum outdoor temperature (far right at -14 °C in the image above)
- `Außentemperatur mit Fußpunkt`: additionally allows the flow temperature at an outdoor temperature of 20 °C to be set, the so-called base point (far left in the image above)
- `Einzelraumgeführt`: the actual room temperature is also taken into account if a room thermostat from the heat pump accessories is connected

### Outdoor temperature damping

For all settings relating to the outdoor temperature, it should be noted that this does not affect the interior of the building at the same time.
When it gets colder outside, it takes some time for the cold to affect the rooms.
This inertia is set using the building damping under `Anlageneinstellungen` &rarr; `Heizung/Kühlung` &rarr; `Anlageneinstellungen` &rarr; `Dämpfung Gebäudeart` and results in the so-called _damped outdoor temperature_.
The "heavier" the building, the more slowly changes in outdoor temperature take effect, as shown in the following diagrams for `mittlere` and `leichte` building types:

[![Outdoor temperature & damped outdoor temperature for building type=Medium](/assets/images/Einstellung-GebäudeartMittel.png)](/assets/images/Einstellung-GebäudeartMittel.png)
[![Outdoor temperature & damped outdoor temperature for building type=Light](/assets/images/Einstellung-GebäudeartLeicht.png)](/assets/images/Einstellung-GebäudeartLeicht.png)

### Heating limit

Naturally, it does not make sense to operate the heating system at summer outdoor temperatures.
Use `Anlageneinstellungen` &rarr; `Heizung/Kühlung` &rarr; `Heizkreis 1` &rarr; `So/Wi Umschaltung` &rarr; `Heizbetrieb bis` or `Startbildschirm` &rarr; `Wunschtemperatur` &rarr; `Mehr...` &rarr; `Heizen aus ab` to set the temperature limit at which the heating period should begin, e.g. 15°C.

It should be noted that the changeover does not take place immediately when the temperature limit is reached, in order to prevent constant switching on and off at outdoor temperatures around the limit.
For this purpose, a delay for the transition from winter to summer and from summer to winter can be specified under the following menu items:

- `Anlageneinstellungen` &rarr; `Heizung/Kühlung` &rarr; `Heizkreis 1` &rarr; `So/Wi Umschaltung` &rarr; `Sommerbetriebsverzög.` if the limit temperature has been exceeded for the set period, the heating is switched off
- `Anlageneinstellungen` &rarr; `Heizung/Kühlung` &rarr; `Heizkreis 1` &rarr; `So/Wi Umschaltung` &rarr; `Heizbetriebsverzög.` if the limit temperature has been undershot for the set period, the heating is switched on

To also account for a sudden drop in temperature, a temperature difference in kelvins or °C can be set under
`Anlageneinstellungen` &rarr; `Heizung/Kühlung` &rarr; `Heizkreis 1` &rarr; `So/Wi Umschaltung` &rarr; `Temp-Diff. Sofortstart`, at which the heat pump starts immediately.

### Standard outdoor temperature

`Anlageneinstellungen` &rarr; `Heizung/Kühlung` &rarr; `Anlageneinstellungen` &rarr; `Min.Außentemperatur`

Here you set the standard outdoor temperature (NAT), i.e. the lowest temperature that was maintained 10 times within 20 years for a period of at least two consecutive days. The standard outdoor temperature can be looked up at the [German Heat Pump Association (BWP)](https://www.waermepumpe.de/normen-technik/klimakarte/).

### Flow temperature (NAT)

`Anlageneinstellungen` &rarr; `Heizung/Kühlung` &rarr; `Heizkreis 1` &rarr; `Heizen` &rarr; `Heizkurve`

Press the endpoint to select it. You can then use the arrow keys to set the required flow temperature at the NAT.

In addition to these values, you can also define the base and comfort points if the simple heating curve is not sufficient.

### Heating curve simulator

Here you can check your heating curve values:

<div id="heating-curve-only"></div>
<link rel="stylesheet" href="{{ '/assets/css/heatpump-simulator.css' | relative_url }}">
<script src="https://cdn.jsdelivr.net/npm/d3@7.9.0/dist/d3.min.js"></script>
<script src="/assets/js/heatpump-simulator/engine/compute.js"></script>
<script src="/assets/js/heatpump-simulator/ui/controls.js"></script>
<script src="/assets/js/heatpump-simulator/ui/heating-curve.js"></script>
<script src="/assets/js/heatpump-simulator/heatpump-simulator.js"></script>
<script>
  window.initHeatpumpSimulator("#heating-curve-only", {
    showDiagram: false,
    showCurve: true,
    showShare: false,
    openCurve: true,
    hiddenControls: [
      'primarySpreadK',
      'heatingPumpPressureMbar',
      'heatingFlowAt150mbarLph'
    ]
  });
</script>

<span id="warmwasseraufbereitung"></span><!-- Legacy Anchor -->

## Domestic hot water production

Domestic hot water production can take place in one of these 3 modes:

- Comfort
- Eco
- Eco+

There is also the _Extra domestic hot water_ mode, which attempts to heat the domestic hot water to the stop temperature on request for 1..48 hours.

The following values can be individually set for each mode under `Anlageneinstellungen` &rarr; `Warmwasser`:

- `Starttemperatur`: domestic hot water production starts when this temperature limit is undershot
- `Stopptemperatur`: domestic hot water production ends when this temperature limit is reached
- `Ladedelta`: the flow temperature is increased by this value for domestic hot water production—the higher the charging delta, the faster the heating

The following diagram shows the flow temperature and domestic hot water temperature for Starttemperatur=40°C, Stopptemperatur=48°C and Ladedelta=7K:

[![Domestic hot water temperature & flow temperature](/assets/images/Einstellung-Warmwasseraufbereitung.png)](/assets/images/Einstellung-Warmwasseraufbereitung.png)

### Modes

| Mode     | Min. start temperature | Max. stop temperature | Charging delta |
| :------- | :--------------------- | :-------------------- | :------------- |
| Comfort  | 40 °C                  | 65 °C                 | 6..18 K        |
| Eco      | 35 °C                  | 60 °C                 | 6..18 K        |
| Eco+     | 30 °C                  | 55 °C                 | 6..15 K        |
| Extra-WW |                        | 50..70 °C             |                |

### Mode selection

The mode for domestic hot water production can be selected either in the [app](/en/docs/app/) or on the control panel under `Startbildschirm` &rarr; `Warmwasser`:

- `Aus`: no domestic hot water production
- `Manuell`: a mode is selected manually
- `Auto`: the corresponding mode is selected automatically based on the current time of day.
  This requires setting which program should be active at which time of day.

[![Time program on the UI-800](/assets/images/UI800-Zeitprogramm.jpg)](/assets/images/UI800-Zeitprogramm.jpg)

The time programs for _Auto_ mode can be set either in the [app](/en/docs/app/) under `Warmwasser` &rarr; `Kalender unten rechts` or on the control panel's start screen (not in the service menu) under `Warmwasser` &rarr; `Mehr...>` &rarr; `Zeitprogramm` &rarr; `Bearbeiten`.
In the display above, domestic hot water production is off from 21:00 to 05:00, domestic hot water is heated using Eco+ mode from 05:00 to 13:00 and from 17:00 to 21:00, and domestic hot water is produced using Eco mode from 13:00 to 17:00.

## Electric auxiliary heater

Heat pumps should be dimensioned so that they can cover the building's heat demand down to approximately -5 °C ([Bosch](https://junkers-de-de-b.boschtt-documents.com/download/file/file/6721836891.pdf)).
Below this temperature range, the heat pump is supported by an electric auxiliary heater.
The settings for the electric auxiliary heater can be made under `Anlageneinstellungen` &rarr; `Zuheizer`.

### Auxiliary heater lockout

If `Anlageneinstellungen` &rarr; `Zuheizer` &rarr; `Zuheizersperre` is activated, the electric auxiliary heater is not used for regular heating operation or domestic hot water production, even at low temperatures.
It can still be used for frost protection and defrost cycles despite the auxiliary heater lockout.

### Power limitation

The following settings can be made under `Anlageneinstellungen` &rarr; `Zuheizer` &rarr; `Elektrischer Zuheizer`:

#### Limitation with compressor

Value range: 0kW, 3kW, 6kW, 9kW

This setting defines the maximum power of the electric auxiliary heater to support the heat pump during operation.

#### Limitation without compressor

Value range: 0kW, 3kW, 6kW, 9kW

This can be used to set the maximum power of the electric auxiliary heater when the compressor is not running, for example in emergency operation.

#### Limitation in DHW operation

Value range: 0kW, 3kW, 6kW, 9kW

This setting defines the maximum power of the electric auxiliary heater that may be used for domestic hot water production.

#### Bival.pkt. Parallelbetr.

The aforementioned temperature limit at which the auxiliary heater should support the heat pump, the so-called bivalent point, is specified in this menu item, e.g. -7°C.

### Heating delay

The auxiliary heater is not switched on based on the bivalent point just set. Instead, it is activated based on the failure to reach the target flow temperature, set as a temperature-difference/time-duration product, e.g. 600 K\*min.
In this case, 600 K\*min means that the auxiliary heater is switched on in the following example situations:

- The target flow temperature is undershot by 10 K (°C) for 60 minutes
- The target flow temperature is undershot by 2.5 K (°C) for 4 hours
- The target flow temperature is undershot by 1 K (°C) for 10 hours
