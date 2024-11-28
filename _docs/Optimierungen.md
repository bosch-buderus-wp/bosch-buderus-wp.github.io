---
title: Optimierungen
permalink: /docs/optimierungen/
toc: true
---

Für den effizienten Betrieb und eine lange Lebensdauer der Wärmepumpe gibt es einige Optimierungen, die man selbst vornehmen kann.
Diese Optimierungen sind abhängig von den lokalen Gegebenheiten und persönlichen Vorlieben und unterscheiden sich daher von Wärmepumpe zu Wärmepumpe.
Nachfolgend sind einige dieser Optimierungen - von einfach bis etwas komplexer - aufgeführt.

Für einen effizienten Betrieb gilt grundsätzlich: **Je geringer die Temperatur(-differenz), desto geringer der Energieverbrauch!**

Grobe Faustregel: jedes zusätzliche Grad erhöht den Energieverbrauch um ca. 2,5% [[Quelle](https://www.heizungsdiscount24.de/pdf/Junkers-Bosch-Compress-CS7000iAW-3-13-kW-Planungsunterlage.pdf)]

## Warmwasseraufbereitung

10-20% des jährlichen Energiebedarfs der Wärmepumpe wird für die Warmwasseraufbereitung verwendet.
Daher können Optimierung auch hier einen beträchtlichen Anteil beitragen.

### Temperatur

Wenn möglich sollte man versuchen, die Warmwassertemperatur möglichst niedrig einzustellen.
Das hat den weiteren Vorteil, dass mit niedrigerer Temperatur auch weniger Mineralsalze auskristallisieren und so weniger Kalkablagerungen entstehen, die zusätzlich die Effizienz beeinträchtigen.
Demgegenüber steigt die Legionellengefahr, wenn das Wasser nicht ausreichend erhitzt wird.
Eine regelmäßige Umwälzung oder thermische Desinfektion kann hier Abhilfe schaffen [[bwp](https://www.waermepumpe.de/presse/news/details/kein-erhoehtes-legionellenrisiko-bei-waermepumpen/)].

Die Warmwassertemperatur kann man mit der _Stopptemperatur_ festlegen. Siehe auch [Einstellungen zur Warmwasseraufbereitung](/docs/einstellungen#warmwasseraufbereitung).

### Ladedelta

Eine weitere Einstellung bei der Warmwasseraufbereitung ist das _Ladedelta_.
Das _Ladedelta_ definiert, wie hoch die Vorlauftemperatur gegenüber der Warmwassertemperatur angehoben wird (siehe [Einstellungen zur Warmwasseraufbereitung](/docs/einstellungen#warmwasseraufbereitung)).
Je höher das _Ladedelta_, desto schneller wird das Warmwasser aufgeheizt.
Das bedeutet aber auch, dass bei einer Stopptemperatur von 48 °C und einem _Ladedelta_ von 12 K, die Vorlauftemperatur am Ende auf 60 °C angehoben wird.
Reduziert man die Ladetemperatur hingegen auf 6 K, so muss am Ende lediglich auf 54 °C aufgeheizt werden, aber natürlich dauert die Warmwasseraufbereitung entsprechend länger.

### Tageszeit

Mit steigender Außentemperatur kann die Wärmepumpe mehr Energie aus der Umgebungsluft gewinnen.
Wie man im nachfolgenden Diagramm sieht, ist die durchschnittliche Außentemperatur in Deutschland am frühen Nachmittag am höchsten (Daten von [energy-charts.de](https://www.energy-charts.info/charts/climate_hours/chart.htm?l=de&c=DE&source=air_temperature&legendItems=fhy9f&interval=year&year=2023)).
Es ist daher sinnvoll, die Warmwasseraufbereitung auf den frühen Nachmittag zwischen 13 und 15 Uhr zu legen.

![Durchschnittstemperatur je Tageszeit in 2023](/assets/images/Durchschnittstemperatur2023.svg)

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

## Heizkurve und Thermischer Abgleich

Nun gehen wir vom Warmwasser zur Optimierung der Heizung.
Wie beim Warmwasser ist es essentiell, dass die Vorlauftemperatur gerade so niedrig ist, dass die Räume gerade noch so warm werden wie nötig.
Dabei sollen nicht die Einzelraumregelungen (ERR) durch Takten, d.h. durch ständiges Öffnen und Schließen des Wasserzulaufs, die Raumtemperatur regeln - ähnlich wie bei einem Auto, das ständig auf Maximalgeschwindigkeit beschleunigt und dann wieder zum Stillstand abgebremst wird, anstatt mit einer konstanten Geschwindigkeit zu fahren.
Ziel ist es daher, dass die Räume ununterbrochen mit der minimal notwendigen Wassertemperatur versorgt werden.
Und so braucht die Wärmepumpe nur auf die minimale Vorlauftemperatur aufheizen, die gerade notwendig ist, um alle Räume auf Wohlfühltemperatur zu erwärmen.

Die Einstellung dieser minimalen Vorlauftemperatur und die Feinjustierung des Durchflusses wird durch den so genannten thermischen Abgleich erzielt.
Die folgende 4-Schritt-Anleitung für den thermischen Abgleich stammt von [Energiewende.eu](https://energiewende.eu/der-hydraulische-und-thermische-abgleich/):

1. Beginnen Sie mit dem am schlechtesten beheizten Raum des Gebäudes.
   Dies ist Ihr "Leitraum".
   Öffnen Sie das Ventilunterteil maximal und ändern Sie dann die Heizkurve, bis dieser Raum perfekt temperiert ist.
2. Typischerweise werden die anderen Räume dann zu warm sein.
   Gehen Sie in jenen Raum, der am stärksten überhitzt ist und drehen das Ventilunterteil der Heizkörper dort etwas ein.
   Beobachten sie die Temperatur dieses Raumes mindestens einen Tag lang und justieren ggf. nach.
   Je nach Qualität Ihrer Gebäudehülle kann es bis zu 3 Tage dauern, dass sich die Temperatur eingeschwungen hat.
3. Wenn dieser Raum perfekt geheizt wird, gehen Sie zurück in den Leitraum.
   Da Sie die Gesamtmenge reduziert haben, wird der Leitraum wahrscheinlich zu warm geworden sein.
   Passen Sie die Heizkurve an, bis dieser Raum wieder korrekt temperiert ist.
4. Ermitteln Sie, welcher Raum nun am stärksten überhitzt ist (dies ist u.U. derselbe wie zuvor oder ein anderer).
   Drehen Sie dort das Ventilunterteil etwas ein und justieren dessen Temperatur über einige Tage nach.
   Wiederholen Sie die Schritte 3 und 4 so lange, bis alle Räume die perfekte Temperatur haben.

Das Vorgehen sollte an einem kalten Tag mit Minustemperaturen und geringer Sonneneinstrahlung vorgenommen werden.
Für die Anpassung der Heizkurve in Schritt 3 reduziert man dann die [Vorlauftemperatur an der Normaußentemperatur (NAT)](/docs/einstellungen/#vorlauftemperatur-nat).
Hierbei ist noch zu bemerken, dass es keinen Sinn macht, wenn sich die Solltemperaturen in benachbarten Räumen stark unterscheiden.
Einige wenige Grad Unterschied sind in Ordnung, aber wenn die Unterschiede zu groß sind, werden die kalten Räume einfach durch die warmen Räume mitgeheizt und man braucht wiederrum eine höhere Vorlauftemperatur im wärmeren Raum.

Bevor man die Heizkurve an der NAT justiert, sollte man noch die [Heizgrenztemperatur](/docs/einstellungen/#heizgrenze) einstellen.
Dazu einfach im Herbst bei Außentemperaturen um die 15°C prüfen, ab welcher Temperatur man im Haus die Wohlfühlgrenze verlässt.
Das ist natürlich individuell unterschiedlich.
Um unnötiges Takten zu verhindern, ist eine niedrigere Heizgrenztemperatur vorzuziehen.

## Abgleich der Volumenströme

Um den Abgleich der Volumenströme zwischen [Primär-](/docs/technischer-aufbau#primärkreis) und [Heizkreis](/docs/technischer-aufbau#heizkreis) zu verstehen, muss man Regelung der Kreise etwas genauer betrachten.
Im Primärkreis wird als Zielgröße die Temperaturdifferenz _dT_ zwischen Vorlauf (TC3) und Rücklauf (TC0), die so genannte Spreizung, eingestellt.
Das Erreichen der Spreizung wird über den Volumenstrom der drehzahlgesteuerten Pumpe (PC0) geregelt.
Ist die Spreizung zu niedrig, reduziert PC0 den Volumenstrom, damit das Wasser im Verflüssiger mehr Wärme aufnehmen kann und die Spreizung steigt.
Ist die Spreizung zu hoch, erhöht PC0 den Volumenstrom.

Im Heizkreis hingegen wird der Differenzdruck eingestellt und die Spreizung ergibt sich aus der Wärmeabnahme der Heizkörper bzw. Fußbodenheizung.
Bei gleichbleibendem Differenzdruck nimmt das Haus immer gleich viel Energie ab und die Spreizung bleibt auf nahezu dem selben Wert.
Leichte Veränderungen ergeben sich bei niedrigerer Außentemperatur durch die steigende Vorlauftemperatur.
Diese Veränderung kann aber vernachlässigt werden.

Wenn nun

1. der Primärkreis einen höheren Volumenstrom aufweist als der Heizkreis abnehmen kann - dann zieht der Primärkreis warmes Wasser wieder direkt in den Rücklauf und die Wärmepumpe geht aus - oder
2. der Primärkreis einen niedrigeren Volumenstrom aufbringt als der Heizkreis abnimmt - dann befördert der Heizkreis kälteres Wasser aus seinem Rücklauf direkt wieder in seinen Vorlauf (T0 > TC1).

Standardmäßig ist bei der Bosch CS 5800/6800i und Buderus WLW 176/186 die Spreizung des Primärkreises auf 4,5 K bei Fußbodenheizung und 7,5 K bei Heizkörpern und ein Differenzdruck von 250 mbar hinterlegt.

Grundsätzlich ist eine niedrigere Spreizung effizienter, denn um beispielsweise eine mittlere Temperatur von 30 °C zu erreichen, muss die Spreizung bei 4 K den Vorlauf auf 32 °C erwärmt werden.
Bei einer Spreizung von 8 K müsste der Vorlauf auf 34 °C erwärmen.
