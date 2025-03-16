---
title: Einstellungen
excerpt: Einstellungsübersicht für Bosch CS5800/6800i und Buderus WLW176/186 Wärmepumpen, inkl. Raumtemperatur, Heizkurve, Warmwasseraufbereitung, ...
permalink: /docs/einstellungen/
toc: true
---

Die Bosch CS 5800/6800i und Buderus WLW176/186 erlaubt eine Vielzahl an Einstellungen. Die meisten davon kann man im Servicemenü konfigurieren.
Um ins Servicemenü zu gelangen, muss man mindestens 5 Sekunden die Service-Taste (3 Striche oben links im Display) drücken.
Einige Einstellungen können auch direkt auf dem Startbildschirm des Bedienelements vorgenommen werden.
Die meisten Einstellungen des Startbildschirm findet man auch in der [App](/docs/app/).

Nachfolgend sind die wichtigsten, aber weitaus nicht alle, Einstellungen kurz erklärt.

## Raumtemperatur

Mit `Startbildschirm` &rarr; `Wunschtemperatur` stellt man die gewünschte Temperatur ein, die man in den beheizten Räumen erzielen möchte.
Ohne ein verbundenes Raumthermometer aus dem Wärmepumpenzubehör, entspricht die eingestellte Raumtemperatur nicht zwangsläufig der tatsächlichen Raumtemperatur.
Dies spielt technisch keine große Rolle.
Wer dennoch die beiden Werte abgleichen möchte, kann dazu unter `Anlageneinstellungen` &rarr; `Heizung Kühlung` &rarr; `Heizkreis 1` &rarr; `Heizen` &rarr; `Raumtemperatur-Offset` einen Korrekturwert einstellen.

Für eine möglichst konstant niedrige Leistungserbringung, ist eine konstante Raumtemperatur vorzuziehen.
Dies erreicht man mit der Auswahl `Manuell` unter `Startbildschirm` &rarr; `Wunschtemperatur`.
Wer jedoch lieber mit einer Nachtabsenkung der Raumtemperatur arbeiten möchte, kann dies mit der Auswahl `Auto` realisieren.
Und wer nicht auf die automatische Sommer-/Winterumstellung setzen möchte, kann in den Sommermonaten die Auswahl `Aus` tätigen.
Damit ist die Heizung ausgeschaltet.
Warmwasseraufbereitung ist weiterhin möglich.

## Heizkurve

Wird es draußen kälter, muss die Heizung mehr Leistung erbringen, um die Räume auf Wunschtemperatur halten zu können.
Dazu erhöht sie die Vorlauftemperatur des Heizungswassers.
Die Stärke dieser Erhöhung wird über die Heizkurve bestimmt.

[![Endpunkteinstellung der Heizkurve](/assets/images/Einstellung-Heizkurvenendpunkt.jpg)](/assets/images/Einstellung-Heizkurvenendpunkt.jpg)

### Regelungsart

Die Regelungsart definiert, auf welcher Basis die Sollvorlauftemperatur bestimmt wird, und kann unter
`Anlageneinstellungen` &rarr; `Heizung/Kühlung` &rarr; `Heizkreis 1` &rarr; `Heizen` &rarr; `Regelungsart` eingestellt werden:

- `Außentemperatur geführt`: die Heizkurve wird ausschließlich über die Vorlauftemperatur an der minimalen Außentemperatur definiert
- `Außentemperatur mit Fußpunkt`: erlaubt zusätzlich die Einstellung der Vorlauftemperatur bei einer Außentemperatur von 20 °C, dem so genannten Fußpunkt
- `Einzelraumgeführt`: hiermit wird die tatsächliche Raumtemperatur hinzugezogen, wenn ein Raumthermostat aus dem Wärmepumpenzubehör verbunden ist

### Dämpfung der Außentemperatur

Für alle Einstellungen, die sich auf die Außentemperatur beziehen, ist zu beachten, dass diese sich nicht zeitgleich auf das Gebäudeinnere auswirkt.
Wird es draußen kälter, dauert es eine Weile bis sich die Kälte auf die Räume auswirkt.
Diese Trägheit wird über die Gebäudedämpfung unter `Anlageneinstellungen` &rarr; `Heizung/Kühlung` &rarr; `Anlageneinstellungen` &rarr; `Dämpfung Gebäudeart` eingestellt und ergibt die so genannte _gedämpfte Außentemperatur_.
Je "schwerer" das Gebäude, desto träger wirken Außentemperaturveränderungen wie man in nachfolgenden Diagrammen für `mittlere` und `leichte` Gebäudeart sieht:

[![Außentemperatur & gedämpfte Außentemperatur für Gebäudeart=Mittel](/assets/images/Einstellung-GebäudeartMittel.png)](/assets/images/Einstellung-GebäudeartMittel.png)
[![Außentemperatur & gedämpfte Außentemperatur für Gebäudeart=Leicht](/assets/images/Einstellung-GebäudeartLeicht.png)](/assets/images/Einstellung-GebäudeartLeicht.png)

### Heizgrenze

Natürlich ist es nicht sinnvoll, die Heizung bei sommerlichen Außentemperaturen zu betreiben.
Mit
`Anlageneinstellungen` &rarr; `Heizung/Kühlung` &rarr; `Heizkreis 1` &rarr; `So/Wi Umschaltung` &rarr; `Heizbetrieb bis`

oder

`Startbildschirm` &rarr; `Wunschtemperatur` &rarr; `Mehr...` &rarr; `Heizen aus ab`

wird die Temperaturgrenze eingestellt, ab der die Heizperiode beginnen soll, z.B. 15°C.

Dabei ist zu beachten, dass die Umschaltung nicht sofort bei Erreichen der Temperaturgrenze erfolgt, um ein ständiges Ein- und Ausschalten bei Außentemperaturen um den Grenzwert zu verhindern.
Dafür kann man eine Verzögerung für den Übergang von Winter zu Sommer und Sommer zu Winter unter den folgenden Menüpunkten festlegen:

- `Anlageneinstellungen` &rarr; `Heizung/Kühlung` &rarr; `Heizkreis 1` &rarr; `So/Wi Umschaltung` &rarr; `Sommerbetriebsverzög.` wenn für die eingestellte Zeitdauer, die Grenztemperatur überschritten wurde, wird die Heizung ausgeschaltet
- `Anlageneinstellungen` &rarr; `Heizung/Kühlung` &rarr; `Heizkreis 1` &rarr; `So/Wi Umschaltung` &rarr; `Heizbetriebsverzög.` wenn für die eingestellte Zeitdauer, die Grenztemperatur unterschritten wurde, wird die Heizung eingeschaltet

Um auch einem abrupten Temperatursturz gerecht zu werden, kann unter
`Anlageneinstellungen` &rarr; `Heizung/Kühlung` &rarr; `Heizkreis 1` &rarr; `So/Wi Umschaltung` &rarr; `Temp-Diff. Sofortstart` ein Temperaturunterschied in Kelvin, bzw. °C, eingestellt werden, bei dem die Wärmepumpe sofort startet.

### Normaußentemperatur

`Anlageneinstellungen` &rarr; `Heizung/Kühlung` &rarr; `Anlageneinstellungen` &rarr; `Min.Außentemperatur`

Hier stellt man die Normaußentemperatur (NAT) ein, also die tiefste Temperatur, die sich 10 Mal innerhalb von 20 Jahren über einen Zeitraum von mindestens zwei aufeinanderfolgenden Tagen gehalten hat. Die Normaußentemperatur kann beim [Bundesverband Wärmepumpe (BWP)](https://www.waermepumpe.de/normen-technik/klimakarte/) nachgeschlagen werden.

### Vorlauftemperatur (NAT)

`Anlageneinstellungen` &rarr; `Heizung/Kühlung` &rarr; `Heizkreis 1` &rarr; `Heizen` &rarr; `Heizkurve`

Mit Druck auf den Endpunkt wird dieser ausgewählt. Daraufhin kann man mit den Pfeiltasten die notwendige Vorlauftemperatur an der NAT einstellen.

Zusätzlich zu diesen Werten kann man auch den Fuß- und Komfortpunkt definieren, falls die einfache Heizkurve nicht ausreichen sollte.

## Warmwasseraufbereitung

Die Warmwasseraufbereitung kann wahlweise durch diese 3 Modi erfolgen:

- Komfort
- Eco
- Eco+

Zusätzlich gibt es den Modus _Extra-Warmwasser_, der auf Anforderung für 1..48 Stunden versucht, das Warmwasser auf die Stopptemperatur aufzuheizen.

Für jeden Modus können folgende Werte individuell unter `Anlageneinstellungen` &rarr; `Warmwasser` eingestellt werden:

- `Starttemperatur`: bei Unterschreitung dieser Temperaturgrenze startet die Warmwasseraufbereitung
- `Stopptemperatur`: bei Erreichen dieser Temperaturgrenze wird die Warmwasseraufbereitung beendet
- `Ladedelta`: der Vorlauf wird um diesen Wert zur Warmwasseraufbereitung angehoben - je höher das Ladedelta desto schneller erfolgt die Aufheizung

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

Die Auswahl des Modus für die Warmwasseraufbereitung kann entweder in der [App](/docs/app/) oder auf dem Bedienfeld unter `Startbildschirm` &rarr; `Warmwasser` erfolgen:

- `Aus`: keine Warmwasseraufbereitung
- `Manuell`: ein Modus wird manuell gewählt
- `Auto`: der entsprechende Modus wird anhand der aktuellen Tageszeit automatisch ausgewählt.
  Dazu muss eingestellt werden, welches Program zu welcher Tageszeit aktiv sein soll.

[![Zeitprogramm am UI-800](/assets/images/UI800-Zeitprogramm.jpg)](/assets/images/UI800-Zeitprogramm.jpg)

Die Zeitprogramme für den _Auto_ Modus kann man entweder in der [App](/docs/app/) unter `Warmwasser` &rarr; `Kalender unten rechts` oder auf dem Startbildschirm des Bedienfelds (nicht im Servicemenü) unter `Warmwasser` &rarr; `Mehr...>` &rarr; `Zeitprogramm` &rarr; `Bearbeiten` einstellen.
In obiger Darstellung ist die Warmwasseraufbereitung von 21-8 Uhr aus, von 8-13 und 17-21 Uhr wird das Warmwasser mit dem Eco+ Modus aufgeheizt und von 13-17 Uhr wird das Warmwasser mit dem Eco Modus aufbereitet.
