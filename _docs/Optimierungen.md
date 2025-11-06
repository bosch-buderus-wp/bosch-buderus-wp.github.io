---
title: Optimierungen
excerpt: Optimierungen für Bosch CS5800/6800i und Buderus WLW176/186i Wärmepumpen, um die Effizienz zu steigern
permalink: /docs/optimierungen/
toc: true
---

Für den effizienten Betrieb und eine lange Lebensdauer der Wärmepumpe gibt es einige Optimierungen, die man selbst vornehmen kann.
Diese Optimierungen sind abhängig von den lokalen Gegebenheiten und persönlichen Vorlieben und unterscheiden sich daher von Wärmepumpe zu Wärmepumpe.
Nachfolgend sind einige dieser Optimierungen - von einfach bis etwas komplexer - aufgeführt.

Für einen effizienten Betrieb gilt grundsätzlich:

{: .notice--info}
**Je geringer die Temperatur(-differenz), desto geringer der Energieverbrauch!**

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

[![Durchschnittstemperatur je Tageszeit in 2023](/assets/images/Durchschnittstemperatur2023.svg)](/assets/images/Durchschnittstemperatur2023.svg)

Dazu kann man die [_Auto_ Modusauswahl](/docs/einstellungen#warmwasseraufbereitung) mit beispielsweise 4 Zeitprogrammen und 2 Modi nutzen:

- 13-17 Uhr = bevorzugte Zeit &rarr; Eco
  - _Starttemperatur_: 41 °C
  - _Stopptemperatur_: 48 °C
- 17-21 Uhr = akzeptable Zeit &rarr; Eco+
  - _Starttemperatur_: 33 °C
  - _Stopptemperatur_: 40 °C
- 21-8 Uhr = inakzeptable Zeit &rarr; Aus
- 8-13 Uhr = akzeptable Zeit &rarr; Eco+
  - _Starttemperatur_: 33 °C
  - _Stopptemperatur_: 40 °C

In diesem Beispiel wird zwischen 13-17 Uhr das Warmwasser aufbereitet, wenn dessen Temperatur unter 41 °C gefallen ist.
Falls sie in den Stunden zuvor oder danach unter die Schwelle von 33 °C fällt, wird in den noch akzeptablen Vormittag- oder Abendstunden aufgeheizt.
In der Nacht wird nicht aufgeheizt.

Die obigen Einstellungen funktionieren nur gut, wenn ihr dem Warmwasserspeicher an üblichen Tagen etwa 7-14 °C entnehmt.
Dann sollte an diesen üblichen Tagen die Warmwasseraufbereitung in die bevorzugte Zeit fallen.
Liegt euer täglicher Verbrauch jedoch höher, so solltet ihr die Eco-Stopptemperatur entsprechend nach oben verschieben.
Liegt euer täglicher Verbrauch niedriger, so solltet ihr die Eco-Stopptemperatur so anpassen, dass die Warmwasseraufbereitung auf jeden zweiten Mittag fällt.
Überprüfen könnt ihr die aktuelle Warmwassertemperatur entweder am Startbildschirm des lokalen Bedienelements, in der [App](/docs/app/) oder über ein [Smarthome-System](/docs/smarthome/).
An dieser Stelle möchte ich nochmals eindringlich darauf hinweisen, dass ihr bei derart niedrigen Wassertemperaturen entweder eine wöchentliche thermische Desinfektion oder einen Wasseraustausch aller Leitungen innerhalb weniger Tage sicherstellen müsst [[bwp](https://www.waermepumpe.de/presse/news/details/kein-erhoehtes-legionellenrisiko-bei-waermepumpen/)].

Auch für Besitzer von Photovoltaik-Anlagen und im Sinne der Energiewende kann die oben beschriebene Einstellung sinnvoll sein, denn in der Regel ist der höchste PV-Ertrag in Deutschland gegen 13 Uhr zu erwarten (siehe [energy-charts.de](https://energy-charts.info/charts/power_heatmaps/chart.htm?l=de&c=DE&year=2024&solar=1)).
Wer eine PV-Anlage besitzt, kann noch einen Schritt weiter gehen und die Warmwasseraufbereitung mit PV-Überschuss optimieren.
Dafür kommt der in den oben genannten Einstellungen nicht genutzte Komfortmodus zum Einsatz.
Weitere Details zur Realisierung könnt ihr beispielsweise der Anleitung für [evcc](https://bosch-buderus-wp.github.io/docs/smarthome/evcc) entnehmen.

## Warmwasserzirkulation

Steht Wasser länger in der Leitung kühlt es ab.
Um beim Aufdrehen der Dusche oder des Wasserhahns gleich mit warmem Wasser begrüßt zu werden, wurden früher in vielen Häusern so genannte Zirkulationsleitungen verbaut.
Mit Hilfe dieser zusätzlichen Leitung wird warmes Wasser aus dem Warmwasserspeicher, der sich oft im Heizungskeller befindet, in die anderen Stockwerke zirkuliert.
Somit verschwendet man weniger Wasser, das unnötig in den Abfluss laufen würde, bis endlich warmes Wasser den Wasserhahn oder die Dusche erreicht.
Klingt erst einmal sinnvoll, um sparsam mit der kostbaren Ressource Wasser umzugehen.

Problem daran ist jedoch, dass durch die Zirkulation des warmen Wassers durch die Leitungen im kälteren Mauerwerk Wärmeenergie verloren geht.
Im Winter könnte man argumentieren, dass damit zusätzlich das Haus mitgeheizt wird und somit keine Energie verloren geht.
Da das Brauchwasser jedoch in der Regel eine höhere Temperatur als das Heizungswasser hat und dadurch mehr elektrische Energie nötig war, um es zu erzeugen, verschenkt man damit einiges an Potenzial.

[![Alexa Routine: Bedarfsgesteuerte Warmwasserzirkulation](/assets/images/Optimierungen-AlexaRoutineZirkulation.png){:width="200px"}](/assets/images/Optimierungen-AlexaRoutineZirkulation.png)
{: .align-right}

Eine logische Schlussfolgerung wäre die Zirkulationspumpe einfach abzustellen.
Aufgrund der Gefahr von Legionellen ist dies aber keine gute Idee.
Eine erste Optimierung ist die Laufzeit der Zirkulationspumpe in den Einstellungen der Wärmepumpe zu reduzieren.
Alternativ kann man sich die Zirkulationspumpe an eine eigene Steckdose legen lassen.
Dann nutzt man einen programmierbaren Zwischenstecker, z.B. von Shelly, der zu Bedarfszeiten, z.B. morgens und abends, die Zirkulation für 5 Minuten aktiviert.
Damit spart man Wasser und gleichzeitig reduziert man den Energieverlust der Zirkulation auf ein Minimum.

Wer möchte, kann noch einen Schritt weitergehen und den Zwischenstecker bei Warmwasserbedarf mit einem Shelly-Button oder einer Amazon Alexa Routine einschalten.
Dann drückt man einfach den Button oder sagt "Alexa, duschen" um die Zirkulationspumpe für 5 Minuten zu starten.

## Taktverhalten

Mit Hilfe der eingestellten [Heizkurve](/docs/einstellungen/#heizkurve) bestimmt die Wärmepumpe die nötige Sollvorlauftemperatur für die aktuelle/gedämpfte Außentemperatur.
Optimal wäre, wenn die reale Vorlauftemperatur im Heizkreis (T0) immer genau der Sollvorlauftemperatur folgen würde.
Vor allem in der Übergangszeit mit verhältnismäßig hohen Außentemperaturen ist dies aber nicht immer möglich, da die [Modulation](/docs/technischer-aufbau/#modulation) die Leistung nicht beliebig weit runterregeln kann.
Je nach Modell liegt die Grenze zwischen 12% und 25% der Maximalleistung.
Wird dann immer noch zu viel Wärme produziert, schaltet die Wärmepumpe ab.
Die Abschaltung erfolgt, wenn die gemessene Vorlauftemperatur die Sollvorlauftemperatur um 4 K überschreitet.
Fällt die gemessene Vorlauftemperatur um etwa 2 K unter die Sollvorlauftemperatur startet die Wärmepumpe erneut.

Im nachfolgenden Diagramm sieht man, dass um 10:32 Uhr die gemessene Vorlauftemperatur T0 die Sollvorlauftemperatur um 4 K überschreitet.
Die Wärmepumpe geht aus.
Daraufhin sinkt die gemessene Vorlauftemperatur ab bis um 12:22 Uhr die gemessene Vorlauftemperatur ca. 2 K unter der Sollvorlauftemperatur liegt.
Die Wärmepumpe startet wieder.

[![An- & Abschaltverhalten](https://i.ibb.co/xqg0vJtp/An-Abschaltregelung.png)](https://i.ibb.co/xqg0vJtp/An-Abschaltregelung.png)

Dieses Taktverhalten lässt sich in der Übergangszeit nicht verhindern.
Jedoch sollte es nicht zu häufig auftreten, denn der Kompressor muss nach dem Start erst auf Betriebsmodus gebracht werden, was die Effizienz reduziert und jeder unnötige Start erhöht den Verschleiß.
Die Anzahl der Kompressorstarts kann man entweder auf dem Bedienfeld im Servicemenü unter `Info` &rarr; `Wärmepumpe` &rarr; `Statistik` oder in der App abrufen.
Dort seht ihr auch die Kompressor-Betriebsstunden und wenn ihr die beiden Werte dividiert, erhaltet ihr die durchschnittliche Länge eines Taktes.
Bei mir sind das aktuell 4,8 Stunden pro Takt.
Ist euer Wert sehr klein, z.B. kleiner 1, dann könnt ihr folgende Optimierungen probieren:

1. Minimale Vorlauftemperatur setzen:
   Durch das Setzen der minimalen Vorlauftemperatur im Servicemenü unter `Anlageneinstellungen` &rarr; `Heizung/Kühlung` &rarr; `Heizkreis 1` &rarr; `Heizen` &rarr; `Minimale Vorlauftemperatur` stellt ihr sicher, dass auch bei höheren Außentemperaturen die Sollvorlauftemperatur nicht unter den eingestellten Wert fällt.
   Würde die minimale Vorlauftemperatur auf 28 °C stehen, würde die gelbe Linie im Bild oben um 10:30 Uhr nicht weiter absinken.
   Dadurch würde die Abschaltgrenze nicht erreicht und die Wärmepumpe würde weiterlaufen.
   Das hat aber natürlich zur Folge, dass die Raumtemperatur steigt und ihr unnötig Strom verbraucht.
2. Alternativ oder zusätzlich könnt ihr daher auch versuchen, das Takten zu akzeptieren, aber die Anzahl der Takte zu reduzieren, indem ihr die [Raumtemperatur-Nachtabsenkung](/docs/einstellungen/#raumtemperatur) nutzt.
   Damit könnt ihr für mehrere Stunden die Raumtemperatur stark reduzieren, was die Wärmepumpe vermutlich zum Ausschalten zwingt.
   Danach ist die Vorlauftemperatur wahrscheinlich stark gesunken und die Wärmepumpe braucht mehrere Arbeitsstunden ohne Takte, um die Sollvorlauftemperatur wieder zu erreichen.
   Durch die schwankenden Raumtemperaturen könnte das Verhalten Komforteinbußen mit sich bringen.

Am besten ist es natürlich, wenn ihr bereits beim Kauf der Wärmepumpe darauf achtet, dass sie nicht überdimensioniert ist, damit die Modulation auch in der Übergangszeit weitestgehend ausreicht.

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
   Beobachten Sie die Temperatur dieses Raumes mindestens einen Tag lang und justieren ggf. nach.
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
Das Erreichen der Spreizung wird über den Volumenstrom der drehzahlgesteuerten Primärkreispumpe (PC0) geregelt.
Ist die Spreizung zu niedrig, reduziert PC0 den Volumenstrom, damit das Wasser im Wärmetauscher mehr Wärme aufnehmen kann und die Spreizung steigt.
Ist die Spreizung zu hoch, erhöht PC0 den Volumenstrom.

Im Heizkreis hingegen wird der Differenzdruck eingestellt.
Die Spreizung ergibt sich aus der Wärmeabgabe der Heizkörper bzw. Fußbodenheizung und kann daher nicht eingestellt werden.
Der eingestellte Differenzdruck sorgt für einen konstanten Volumenstrom im Heizkreis.
Das gilt natürlich nur, wenn die Ventilstellung an den Heizkörpern bzw. der Fußbodenheizung unverändert bleibt.
Ändert das Thermostat die Ventilstellung, dann ändert sich der Widerstand und, um den konstanten Differenzdruck sicherzustellen, muss PC1 den Volumenstrom anpassen.
Für bessere Effizienz und Stabilität sollten die Thermostate daher immer möglichst weit offen sein und der Durchfluss, wie unter [Heizkurve und Thermischer Abgleich](#heizkurve-und-thermischer-abgleich) beschrieben, am Ventilunterteil bzw. Durchflussregler fest eingestellt werden.

Standardmäßig ist bei der Bosch CS 5800/6800i und Buderus WLW 176/186 die Spreizung des Primärkreises auf 4,5 K bei Fußbodenheizung und 7,5 K bei Heizkörpern und ein Differenzdruck von 250 mbar hinterlegt.

Wenn nun

1. der Primärkreis einen höheren Volumenstrom aufweist als der Heizkreis abnehmen kann - dann zieht der Primärkreis warmes Wasser wieder direkt in den Rücklauf und die Wärmepumpe geht aus - oder
2. der Primärkreis einen niedrigeren Volumenstrom aufbringt als der Heizkreis abnimmt - dann befördert der Heizkreis kälteres Wasser aus seinem Rücklauf direkt wieder in seinen Vorlauf.
   Dadurch würde die Temperatur im Heizkreis sinken.
   Die Regelung der Wärmepumpe sorgt aber dafür, dass die Vorlauftemperatur (T0) im Heizkreis der Sollvorlauftemperatur aus der Heizkurve folgt.
   Das erreicht die Regelung, in dem sie die Vorlauftemperatur im Primärkreis (TC3) erhöht.
   Dafür bedarf es mehr Leistung und folglich sinkt die Effizienz.

### Interaktiver Simulator der Kreisläufe

Mit dem folgenden Simulator kannst du die drei Kreisläufe (Kältekreis, Primärkreis und Heizkreis) anschaulich nachvollziehen.

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

<!-- prettier-ignore -->
*[Spreizung]: Differenz zwischen Vor- und Rücklauf
