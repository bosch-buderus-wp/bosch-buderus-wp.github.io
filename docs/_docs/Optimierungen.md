---
title: Optimierungen
permalink: /docs/optimierungen/
toc: true
---

Grundsätzlich gilt: **Je höher die Temperatur, desto höher der Energieverbrauch!**

Grobe Faustregel: jedes zusätzliche Grad erhöht den Energieverbrauch um ca. 2,5% [[Quelle](https://www.heizungsdiscount24.de/pdf/Junkers-Bosch-Compress-CS7000iAW-3-13-kW-Planungsunterlage.pdf)]

# Warmwasseraufbereitung

Die Warmwasseraufbereitung trägt einen Anteil von 10-20% des Energiebedarfs der Wärmepumpe.
Daher können Optimierung auch hier einen beträchtlichen Anteil beitragen.

## Temperatur

Wenn möglich sollte man versuchen, die Warmwassertemperatur möglichst niedrig einzustellen.
Das hat den weiteren Vorteil, dass mit niedrigerer Temperatur auch weniger Mineralsalze auskristallisieren und so weniger Kalkablagerungen entstehen.
Demgegenüber steigt die Legionellengefahr, wenn das Wasser nicht ausreichend erhitzt wird.
Eine regelmäßige Umwälzung oder thermische Desinfektion kann hier Abhilfe schaffen [[bwp](https://www.waermepumpe.de/presse/news/details/kein-erhoehtes-legionellenrisiko-bei-waermepumpen/)].

Die Warmwassertemperatur kann man mit der _Stopptemperatur_ festlegen. Siehe auch [Einstellungen zur Warmwasseraufbereitung](/docs/einstellungen#warmwasseraufbereitung).

## Ladedelta

Eine weitere Einstellung bei der Warmwasseraufbereitung ist das _Ladedelta_.
Das _Ladedelta_ definiert, wie hoch die Vorlauftemperatur gegenüber der Warmwassertemperatur angehoben wird (siehe [Einstellungen zur Warmwasseraufbereitung](/docs/einstellungen#warmwasseraufbereitung)).
Je höher das _Ladedelta_, desto schneller wird das Warmwasser aufgeheizt.
Das bedeutet aber auch, dass bei einer Stopptemperatur von 48 °C und einem _Ladedelta_ von 12 K, die Vorlauftemperatur am Ende auf 60 °C angehoben wird.
Reduziert man die Ladetemperatur hingegen auf 6 K, so muss am Ende lediglich auf 54 °C aufgeheizt werden, aber natürlich dauert die Warmwasseraufbereitung entsprechend länger.

## Tageszeit

Mit steigender Außentemperatur kann die Wärmepumpe mehr Energie aus der Umgebungsluft gewinnen.
Wie man im nachfolgenden Diagramm sieht, ist die durchschnittliche Außentemperatur in Deutschland am frühen Nachmittag am höchsten (Daten von [energy-charts.de](https://www.energy-charts.info/charts/climate_hours/chart.htm?l=de&c=DE&source=air_temperature&legendItems=fhy9f&interval=year&year=2023)).
Es ist daher sinnvoll, die Warmwasseraufbereitung auf den frühen Nachmittag zwischen 13 und 15 Uhr zu legen.

![Durchschnittstemperatur je Tageszeit in 2023](https://github.com/user-attachments/assets/0fa7919e-d0e4-4d99-a220-2ee4c743fb61)

Dazu kann man die [_Auto_ Modusauswahl](/docs/einstellungen#warmwasseraufbereitung) mit beispielsweise 4 Zeitprogrammen und 2 Modi nutzen:

- 13-17 Uhr = bevorzugte Zeit --> Eco
  - _Starttemperatur_: 41 °C
  - _Stopptemperatur_: 48 °C
- 17-21 Uhr = akzeptable Zeit --> Eco+
  - _Starttemperatur_: 36 °C
  - _Stopptemperatur_: 43 °C
- 21-8 Uhr = inakzeptable Zeit --> Aus
- 8-13 Uhr = akzeptable Zeit --> Eco+
  - _Starttemperatur_: 36 °C
  - _Stopptemperatur_: 43 °C

In diesem Beispiel wird zwischen 13-17 Uhr das Warmwasser aufbereitet, wenn dessen Temperatur unter 41 °C gefallen ist.
Falls es in den Stunden zuvor oder danach unter die Schwelle von 36 °C fällt wird in den noch akzeptablen Vormittag- oder Abendstunden aufgeheizt.
In der Nacht wird nicht aufgeheizt.
Die konkreten Temperaturen und Zeiten muss man natürlich individuell anpassen.

# Abgleich der Volumenströme

Um den Abgleich der Volumenströme zwischen Primär- und Heizkreis zu verstehen, muss man Regelung der Kreise etwas genauer betrachten.
Im Primärkreis wird als Zielgröße die Temperaturdifferenz _dT_ zwischen Vor- und Rücklauf, die so genannte Spreizung, eingestellt.
Das Erreichen der Spreizung wird über den Volumenstrom der drehzahlgesteuerten Pumpe (PC0) geregelt.
Ist die Spreizung zu niedrig, reduziert PC0 den Volumenstrom, damit das Wasser im Verflüssiger mehr Wärme aufnehmen kann und die Spreizung steigt.
Ist die Spreizung zu hoch, erhöht PC0 den Volumenstrom.

Im Heizkreis hingegen wird der Differenzdruck eingestellt und die Spreizung ergibt sich aus der Wärmeabnahme der Heizkörper bzw. Fußbodenheizung.
Bei gleichbleibendem Differenzdruck nimmt das Haus immer gleich viel Energie ab und die Spreizung bleibt auf nahezu dem selben Wert.
Leichte Veränderungen ergeben sich bei niedrigerer Außentemperatur durch die steigende Vorlauftemperatur.
Diese Veränderung kann aber vernachlässigt werden.

Standardmäßig ist bei der Bosch CS 5800/6800i und Buderus WLW 176/186 die Spreizung des Primärkreises auf 4,5 K bei Fußbodenheizung und 7,5 K bei Heizkörpern und ein Differenzdruck von 250 mbar hinterlegt.

Grundsätzlich ist eine niedrigere Spreizung effizienter, denn um beispielsweise eine mittlere Temperatur von 30 °C zu erreichen, muss die Spreizung bei 4 K den Vorlauf auf 32 °C erwärmt werden.
Bei einer Spreizung von 8 K müsste der Vorlauf auf 34 °C erwärmen.
