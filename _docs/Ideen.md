---
title: Ideen
excerpt: Ideen für die Optimierung von Bosch CS5800/6800i und Buderus WLW176/186 Wärmepumpen
permalink: /docs/ideen/
toc: true
---

## Dynamische Leistungsanpassung

Wer

- einen dynamischen Stromtarif, z.B. von Tibber,
- eine PV-Anlage und
- einen Heimspeicher

hat, für den könnte folgende Steuerung vielleicht interessant sein:

```mermaid
flowchart LR
    Start@{ shape: circle, label: "Start</br>19°C" }
    Start --> Daytime{9-22 Uhr?}
    Daytime -->|ja| DaytimeP1[+1 K] --> IsRunning
    Daytime -->|nein| IsRunning{WP läuft <br/>gerade?}
    IsRunning -->|ja| IsRunningP1[+1 K] --> SolarSurplus
    IsRunning -->|nein| SolarSurplus{Solar-<br/>überschuss?}
    SolarSurplus -->|ja| SolarSurplusP1[+2 K] --> Stop
    SolarSurplus -->|nein| BatteryEmpty{Batterie<br/>leer?}
    BatteryEmpty -->|nein| Stop
    BatteryEmpty -->|ja| NrgPrice{Strom-</br>preis}
    NrgPrice -->|VERY_CHEAP| NrgPriceVC[+2 K] --> Stop
    NrgPrice -->|CHEAP| NrgPriceC[+1 K] --> Stop
    NrgPrice -->|EXPENSIVE| NrgPriceE[-1 K] --> Stop
    NrgPrice -->|VERY_EXPENSIVE| NrgPriceVE[-2 K] --> Stop
    Stop@{ shape: dbl-circ, label: "Stop" }

```
