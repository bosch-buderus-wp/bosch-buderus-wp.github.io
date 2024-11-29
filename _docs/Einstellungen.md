---
title: Einstellungen
excerpt: Einstellungsübersicht für Bosch CS5800/6800i und Buderus WLW176/186 Wärmepumpen, inkl. Heizkurve, Warmwasseraufbereitung, ...
permalink: /docs/einstellungen/
toc: true
---

Die Bosch CS 5800/6800i und Buderus WLW176/186 erlaubt eine Vielzahl an Einstellungen. Die meisten davon kann man im Servicemenü konfigurieren.
Um ins Servicemenü zu gelangen, muss man mindestens 5 Sekunden die Service-Taste (3 Striche oben links im Display) drücken.

Nachfolgend sind die wichtigsten, aber weitaus nicht alle, Einstellungen kurz erklärt.

## Heizkurve

[![Endpunkteinstellung der Heizkurve](/assets/images/Einstellung-Heizkurvenendpunkt.jpg)](/assets/images/Einstellung-Heizkurvenendpunkt.jpg)

Um die Heizkurve der Wärmepumpe einzustellen, sind folgende Menüpunkte relevant:

### Heizgrenze

_Anlageneinstellungen &rarr; Heizung/Kühlung &rarr; Heizkreis&nbsp;1 &rarr; So/Wi Umschaltung &rarr; Heizbetrieb&nbsp;bis_

Hier wird die Temperaturgrenze eingestellt, ab der die Heizperiode beginnen soll, z.B. 15°C.
Hier ist zu beachten, dass die Umschaltung nicht direkt nach der gemessenen Temperatur des Außenthermometers erfolgt, sondern nach der gedämpften Außentemperatur.
Die Stärke der Dämpfung ergibt sich aus der Einstellung _Anlageneinstellungen &rarr; Heizung/Kühlung &rarr; Anlageneinstellungen &rarr; Dämpfung&nbsp;Gebäudeart_.
Je "schwerer" das Gebäude, desto träger wirken Außentemperaturveränderungen.

### Normaußentemperatur

_Anlageneinstellungen &rarr; Heizung/Kühlung &rarr; Anlageneinstellungen &rarr; Min.Außentemperatur_

Hier stellt man die Normaußentemperatur (NAT) ein, also die tiefste Temperatur, sie sich 10 Mal innerhalb von 20 Jahren über einen Zeitraum von mindestens zwei aufeinanderfolgenden Tagen gehalten hat. Die Normaußentemperatur kann beim [Bundesverband Wärmepumpe (BWP)](https://www.waermepumpe.de/normen-technik/klimakarte/) nachgeschlagen werden.

### Vorlauftemperatur (NAT)

_Anlageneinstellungen &rarr; Heizung/Kühlung &rarr; Heizkreis&nbsp;1 &rarr; Heizen &rarr; Heizkurve_

Mit Druck auf den Endpunkt wird dieser ausgewählt. Daraufhin kann man mit den Pfeiltasten die notwendige Vorlauftemperatur an der NAT einstellen.

Zusätzlich zu diesen Werten kann man auch den Fuß- und Komfortpunkt definieren, falls die einfache Heizkurve nicht ausreichen sollte.

## Warmwasseraufbereitung

Die Warmwasseraufbereitung kann wahlweise durch diese 3 Modi erfolgen:

- Komfort
- Eco
- Eco+

Zusätzlich gibt es den Modus _Extra-Warmwasser_, der auf Anforderung für 1..48 Stunden versucht, das Warmwasser auf die Stopptemperatur aufzuheizen.

Für jeden Modus können folgende Werte individuell unter _Anlageneinstellungen &rarr; Warmwasser_ eingestellt werden:

- _Starttemperatur_: bei Unterschreitung dieser Temperaturgrenze startet die Warmwasseraufbereitung
- _Stopptemperatur_: bei Erreichen dieser Temperaturgrenze wird die Warmwasseraufbereitung beendet
- _Ladedelta_: der Vorlauf wird um diesen Wert zur Warmwasseraufbereitung angehoben - je höher das Ladedelta desto schneller erfolgt die Aufheizung

Nachfolgendes Diagramm zeigt Vorlauftemperatur und Warmwassertemperatur für Starttemperatur=40°C, Stopptemperatur=48°C und Ladedelta=7K:

[![Warmwassertemperatur & Vorlauftemperatur](/assets/images/Einstellung-Warmwasseraufbereitung.png)](/assets/images/Einstellung-Warmwasseraufbereitung.png)

### Modi

| Modus    | Min. Starttemperatur | Max. Stopptemperatur | Ladedelta |
| :------- | :------------------- | :------------------- | :-------- |
| Komfort  | 40 °C                | 65 °C                | 6..18 K   |
| Eco      | 35 °C                | 60 °C                | 6..18 K   |
| Eco+     | 30 °C                | 55 °C                | 6..15 K   |
| Extra-WW |                      | 50..70 °C            |           |

### Modusauswahl

Die Auswahl des Modus für die Warmwasseraufbereitung kann wie folgt gewählt werden:

- _Aus_: keine Warmwasseraufbereitung
- _Manuell_: ein Modus wird manuell gewählt
- _Auto_: der entsprechende Modus wird anhand der aktuellen Tageszeit automatisch ausgewählt.
  Dazu muss eingestellt werden, welches Program zu welcher Tageszeit aktiv sein soll.

[![Zeitprogramm am UI-800](/assets/images/UI800-Zeitprogramm.jpg)](/assets/images/UI800-Zeitprogramm.jpg)
