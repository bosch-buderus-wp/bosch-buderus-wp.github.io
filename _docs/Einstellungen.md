---
title: Einstellungen
permalink: /docs/einstellungen/
toc: true
---

# Warmwasseraufbereitung

Die Warmwasseraufbereitung kann wahlweise durch diese 3 Modi erfolgen:

- Komfort
- Eco
- Eco+

Zusätzlich gibt es den Modus _Extra-Warmwasser_, der auf Anforderung für 1..48 Stunden versucht, das Warmwasser auf die Stopptemperatur aufzuheizen.

Für jeden Modus können folgende Werte individuell eingestellt werden:

- _Starttemperatur_: bei Unterschreitung dieser Temperaturgrenze startet die Warmwasseraufbereitung
- _Stopptemperatur_: bei Erreichen dieser Temperaturgrenze wird die Warmwasseraufbereitung beendet
- _Ladedelta_: der Vorlauf wird um diesen Wert zur Warmwasseraufbereitung angehoben - je höher das Ladedelta desto schneller erfolgt die Aufheizung

Nachfolgendes Diagramm zeigt Vorlauftemperatur und Warmwassertemperatur für Starttemperatur=41°C, Stopptemperatur=48°C und Ladedelta=7K:
<img src="https://github.com/user-attachments/assets/b7eccc12-bf33-4b04-afd9-ef04b1fa0648" width="90%" alt="Warmwassertemperatur & Vorlauftemperatur"></img>

## Modi

### Komfort

Einstellbare Wertebereiche:

- Ladedelta: 6..18 K
- Min. Starttemperatur: 45 °C
- Max. Stopptemperatur: 65 °C

In der Standardeinstellung wird dieser Modus mit hoher Spreizung und hoher Zieltemperatur vorkonfiguriert.

### Eco

Einstellbare Wertebereiche:

- Ladedelta: 6..18 K
- Min. Starttemperatur: 35 °C
- Max. Stopptemperatur: 48 °C

### Eco+

Einstellbare Wertebereiche:

- Ladedelta: 6..15 K
- Min. Starttemperatur: 30 °C
- Max. Stopptemperatur: 55 °C

### Extra-Warmwasser

- Stopptemperatur: 50..70 °C

## Modusauswahl

Die Auswahl des Modus für die Warmwasseraufbereitung kann wie folgt gewählt werden:

- _Aus_: keine Warmwasseraufbereitung
- _Manuell_: ein Modus wird manuell gewählt
- _Auto_: der entsprechende Modus wird anhand der aktuellen Tageszeit automatisch ausgewählt.
  Dazu muss eingestellt werden, welches Program zu welcher Tageszeit aktiv sein soll.
