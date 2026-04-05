---
title: Matthias Bosch CS6800i AW
excerpt: Erfahrungsbericht zur Bosch CS6800i AW Wärmepumpe in DHH mit Fußbodenheizung - COP, JAZ, Auslegung, ...
permalink: /xps/matthias/
toc: true
author:
  name: "Matthias"
  links:
    - label: "BlueSky"
      icon: "fa-brands fa-bluesky"
      url: "https://bsky.app/profile/mroeckl.bsky.social"
    - label: "Website"
      icon: "fas fa-fw fa-link"
      url: "https://blog.roeckls.de"
---

[![Inneneinheit + Außeneinheit](/assets/images/Erfahrungen-Matthias-WP.png)](/assets/images/Erfahrungen-Matthias-WP.png)

Wir haben seit März 2024 die Bosch Compress CS6800i AW 12 MB mit der AW 4 OR-S Außeneinheit und sind bisher sehr zufrieden.
Die Außeneinheit ist extrem leise, das Haus und das Warmwasser erreicht die gewünschte Temperatur und der Preis war absolut fair.
Kompetente Heizungsfachbetriebe sind im nahen Umkreis und kümmern sich zeitnah, wenn etwas nicht funktioniert.
Und auch Bosch ist erreichbar und hat bereits zwei Softwareaktualisierung zur Fehlerbehebung durchgeführt.
Wir würden die Anlage daher guten Gewissens weiterempfehlen.

## Gebäude

- Doppelhaushälfte
- Baujahr: 1998
- Beheizte Fläche: ca. 110 m<sup>2</sup>
- Art: Fußbodenheizung + Warmwasserbereitung
- Täglicher Warmwasserverbrauch: ca. 150l
- Heizgrenztemperatur: 15 °C
- Normaußentemperatur (NAT): -13,6 °C
- Heizlast: 4,7 kW
- Früherer Gasverbrauch: 13.000-15.500 kWh/Jahr

[![Gebäudekennlinie, Min/Max Heizleistung und Dichtefunktion der Außentemperatur](/assets/images/Erfahrungen-Matthias-HeizlastGebäudekennlinieATDichte.png)](/assets/images/Erfahrungen-Matthias-HeizlastGebäudekennlinieATDichte.png)

## Wärmepumpe

### Heizungsanlage

- Inneneinheit: Bosch Compress CS6800i AW 12 MB
  - Software Version: 12.11.1 (zuvor 9.6.1 und 23.08.08-5.35)
- Außeneinheit: AW 4 OR-S
  - Software Version: 9.15.0 (zuvor 9.6.0 und 23.08.08-5.35)
- Warmwasserspeicher: WH 290 Stora Warmwasserspeicher (277 l)

### Auslegungskennzahlen

- Bivalenzpunkt: -8 °C<br/>
  Bei Temperaturen unterhalb von -8 °C unterstützt der elektrische Zuheizer.
  Laut dem [Bosch Auslegungstool](https://bosch-de-heatpump.thernovo.com/home) benötigt der elektrische Zuheizer nur 100 kWh im Jahr (< 1%).
- Taktgrenze: 8 °C<br/>
  Ab 8 °C kann die Wärmepumpe nicht mehr niedriger modulieren und muss daher bis zur Heizgrenztemperatur von 15 °C takten.
- Spitzenleistungsabdeckung an der NAT: 66%<br/>
  Bei -14 °C wird 66 % der Wärme (ca. 2,9 kW von 4,3 kWh) von der Wärmepumpe erzeugt und 33% vom Zuheizer [[Bosch Auslegungstool](https://bosch-de-heatpump.thernovo.com/home)].

### Einstellungen

- Spreizung des Primärkreises (TC3-TC0): 3,5 K
- Differenzdruck PC1: 150 mbar (bei anhaltend kalten Temperaturen erhöhen wir auf 300 mbar)
- Vorlauftemperatur (NAT): 39 °C
- Heizgrenztemperatur: 15 °C

## Effizienz

### Verbrauchswerte

| Wert                            | 1. Jahr         | 2. Jahr         |
| :------------------------------ | :-------------- | :-------------- |
| **Elektr. Energieeinsatz**      | 3.100 kWh       | 3.100 kWh       |
| ↳ Heizung                       | 2.540 kWh (82%) | 2480 kWh (81%)  |
| ↳ Warmwasser                    | 560 kWh (18%)   | 590 kWh (19%)   |
| **Erzeugte thermische Energie** | 10.000 kWh      | 10.100 kWh      |
| ↳ Heizung                       | 8.150 kWh (82%) | 8.110 kWh (80%) |
| ↳ Warmwasser                    | 1.850 kWh (18%) | 1.990 kWh (20%) |
| **Arbeitszahl**                 | 3,2             | 3,3             |
| ↳ Heizung                       | 3,2             | 3,3             |
| ↳ Warmwasser                    | 3,3             | 3,4             |
| **Elektrischer Zuheizer**       | 1,5 kWh         | 20,5 kWh        |
| **Betriebsstunden**             | 4.033 h         | 4.110 h         |
| **Kompressorstarts**            | 727             | 533             |
| ↳ Heizung                       | 524             | 326             |
| ↳ Warmwasser                    | 203             | 207             |

Im ersten beiden Jahren hat unsere Wärmepumpe jeweils ca. 3.100 kWh verbraucht.
Daraus wurden im pro Jahr 10.000 kWh Wärme produziert.
Das ist interessant, da es wesentlich weniger ist als unsere alte, vermutlich sehr ineffiziente Gasheizung benötigte.
Vermutlich ist ein Drittel der Wärme der Gasheizung durch den Kamin verpufft.

In den ersten beiden Jahren ergibt sich daraus eine Jahresarbeitszahl (JAZ) von 3,2 bzw. 3,3.
Ein Grund, warum die Jahresarbeitszahl relativ niedrig ist, könnte auf der Tatsache beruhen, dass wir recht viele Fenster nach Süden haben und sobald die Sonne scheint und es wärmer wird und die Effizienz der Wärmepumpe gute Werte liefern würde, unser Haus durch die Sonne so aufgeheizt wird, dass die Wärmepumpe nicht mehr benötigt wird.
Des Weiteren fällt der Standby-Verbrauch für unsere sehr kleine Wärmepumpe recht stark ins Gewicht.
Bei größeren Anlagen mit höherer Leistung ist dieser Effekt deutlich geringer.

Außerdem zieht die Bosch/Buderus Wärmepumpe im Vergleich zu vielen anderen Herstellern die durch das Abtauen 'verlorene' Energie von der produzierten Energie ab.
Im Diagramm unten sieht man, dass die thermische Leistung negativ ist und dadurch sogar die Arbeitszahl negativ wird.

Zu guter Letzt ist zu beachten, dass die elektrische Energie und somit auch die Arbeitszahl die komplette Peripherie beinhaltet.
Dazu zählen 2 Pumpen, die Steuerung der Innen- und Außeneinheit, sowie Kompressor- und Kondensatwannenheizung.
Beim Verbrauch der Gasheizung wurden diesen Verbraucher nicht berücksichtigt und kämen eigentlich noch on-top.

[![Effizienz bei 4° Außentemperatur](/assets/images/Erfahrungen-Matthias-Effizienz4Grad.png)](/assets/images/Erfahrungen-Matthias-Effizienz4Grad.png)

Im Diagramm sind elektrische und thermische Leistung eines exemplarischen feuchten Wintertages mit einer Außentemperatur von 4 °C dargestellt.
Die Warmwasserbereitung erfolgt zwischen 13-14:15 Uhr.
Die Tagesarbeitszahl (inkl. kompletter Peripherie) lag an diesem Tag bei 3,7.

### Warmwasser

Wir haben unsere Einstellungen so optimiert, dass die [tägliche Warmwasserbereitung](/docs/optimierungen/#warmwasserbereitung) nahezu immer zwischen 13-15 Uhr stattfindet.
Dafür wird etwa 1-2 kWh elektrische Energie eingesetzt - mit einer Arbeitszahl von 2-4 je nach Außentemperatur.

Der Temperaturverlust unseres Warmwasserspeichers liegt in 24 Stunden bei:

- 4,3 K mit Zirkulation (2x5 Minuten)
- 3 K ohne Zirkulation

[![Warmwassertemperaturverlust](/assets/images/Erfahrungen-Matthias-WWTemperaturverlust.png)](/assets/images/Erfahrungen-Matthias-WWTemperaturverlust.png)

### Auslegung

In 365 Tagen lief die Wärmepumpe 4.000 Stunden und der Kompressor musste in dieser Zeit ca. 630-mal starten.
Durchschnittlich ergaben sich somit 1,7 Starts/Tag und ein Kompressorlauf dauerte 6,3 Stunden.
Im Sommer ohne Heizbetrieb gab es jeden Tag einen Start für die Warmwasserbereitung und im Winter war nach der Warmwasserbereitung das System meist noch so aufgeheizt, dass der Kompressor für einige Zeit eine Pause einlegen durfte.
Ein Kompressorstart pro Tag war also fast das ganze Jahr gesetzt.
Die restlichen ca. 300 Kompressorstarts sind auf das Takten in der Übergangszeit zurückzuführen.
Das sind in meinen Augen recht gute Werte und die Wärmepumpe scheint an der Taktgrenze (ca. 8 °C) gut ausgelegt zu sein.

Stellt sich natürlich die Frage, ob die gute Auslegung der Taktgrenze negative Auswirkungen auf den Bivalenzpunkt hatte und womöglich der Zuheizer sehr oft zugeschaltet werden musste.
Das ist nicht der Fall.
Der Zuheizer lief im ersten Jahr genau einmal für etwa 30 Minuten und im zweiten Jahr an den doch recht kalten Tagen mit -12 °C für insgesamt ca. 3 Stunden.

### Einsatz von PV und dynamischem Stromtarif

Es wird immer wieder behauptet, dass Photovoltaiksysteme wenig Energie für Wärmepumpen beisteuern können, da im Winter viel Heizleistung benötigt, aber wenig PV-Energie erzeugt wird.
Wir haben eine 6,9 kWp Ost-Süd-West Anlage mit einem 11,5 kWh Heimspeicher.
Außerdem haben wir einen dynamischen Stromtarif von Tibber mit stündlicher Abrechnung.

Die nachfolgende Tabelle zeigt Verbrauch, Autarkie und Kosten vom 20. März 2024 bis 19. März 2025.

| Monat     | Verbrauch    | Autarkie | PV-Anteil    | Grid-Anteil  | ⌀ Strompreis  | Kosten       |
| --------- | ------------ | -------- | ------------ | ------------ | ------------- | ------------ |
| März      | 85 kWh       | 70%      | 60 kWh       | 26 kWh       | 25 ct/kWh     | 6,38 €       |
| April     | 185 kWh      | 78%      | 144 kWh      | 41 kWh       | 26 ct/kWh     | 10,58 €      |
| Mai       | 51 kWh       | 85%      | 43 kWh       | 8 kWh        | 25 ct/kWh     | 1,91 €       |
| Juni      | 54 kWh       | 92%      | 50 kWh       | 4 kWh        | 27 ct/kWh     | 1,17 €       |
| Juli      | 33 kWh       | 99%      | 33 kWh       | 0 kWh        | 26 ct/kWh     | 0,09 €       |
| August    | 32 kWh       | 99%      | 32 kWh       | 0 kWh        | 31 ct/kWh     | 0,10 €       |
| September | 77 kWh       | 89%      | 69 kWh       | 8 kWh        | 25 ct/kWh     | 2,12 €       |
| Oktober   | 136 kWh      | 68%      | 92 kWh       | 44 kWh       | 26 ct/kWh     | 11,32 €      |
| November  | 437 kWh      | 54%      | 236 kWh      | 201 kWh      | 30 ct/kWh     | 60,31 €      |
| Dezember  | 609 kWh      | 17%      | 104 kWh      | 505 kWh      | 29 ct/kWh     | 146,59 €     |
| Januar    | 645 kWh      | 23%      | 148 kWh      | 497 kWh      | 32 ct/kWh     | 158,93 €     |
| Februar   | 496 kWh      | 39%      | 193 kWh      | 303 kWh      | 36 ct/kWh     | 108,92 €     |
| März      | 217 kWh      | 72%      | 156 kWh      | 61 kWh       | 32 ct/kWh     | 19,44 €      |
| **Summe** | **3057 kWh** |          | **1360 kWh** | **1697 kWh** | **31 ct/kWh** | **527,84 €** |
|           |              |          | **45%**      | **55%**      |               |              |

Somit hat die PV-Anlage etwa 1360 kWh (45%) für den Wärmepumpenbetrieb beigesteuert, was mich äußerst positiv überrascht hat.
Der für die Wärmepumpe bezogene Strom hat mit dynamischem Tarif ca. 530 € gekostet (⌀ 31 ct/kWh).

Im 2. Jahr (20.3.25 - 19.3.26) haben wir uns zusätzlich noch ein E-Auto angeschafft, was den Stromverbrauch erhöhte und somit die Autarkie senkte.
Dennoch wurde die Wärmepumpe zu 40% mit PV-Strom versorgt:

| Monat     | Verbrauch    | Autarkie | PV-Anteil    | Grid-Anteil  | ⌀ Strompreis  | Kosten       |
| --------- | ------------ | -------- | ------------ | ------------ | ------------- | ------------ |
| März      | 85 kWh       | 80%      | 68 kWh       | 17 kWh       | 31 ct/kWh     | 5,27 €       |
| April     | 122 kWh      | 96%      | 117 kWh      | 5 kWh        | 28 ct/kWh     | 1,40 €       |
| Mai       | 87 kWh       | 97%      | 84 kWh       | 3 kWh        | 27 ct/kWh     | 0,81 €       |
| Juni      | 50 kWh       | 98%      | 49 kWh       | 1 kWh        | 28 ct/kWh     | 0,28 €       |
| Juli      | 48 kWh       | 98%      | 47 kWh       | 1 kWh        | 31 ct/kWh     | 0,31 €       |
| August    | 51 kWh       | 98%      | 50 kWh       | 1 kWh        | 29 ct/kWh     | 0,29 €       |
| September | 61 kWh       | 91%      | 56 kWh       | 5 kWh        | 27 ct/kWh     | 1,35 €       |
| Oktober   | 206 kWh      | 62%      | 128 kWh      | 78 kWh       | 26 ct/kWh     | 20,28 €      |
| November  | 414 kWh      | 29%      | 120 kWh      | 294 kWh      | 30 ct/kWh     | 88,20 €      |
| Dezember  | 627 kWh      | 11%      | 69 kWh       | 558 kWh      | 30 ct/kWh     | 167,40 €     |
| Januar    | 748 kWh      | 22%      | 165 kWh      | 583 kWh      | 29 ct/kWh     | 169,07 €     |
| Februar   | 418 kWh      | 34%      | 142 kWh      | 276 kWh      | 28 ct/kWh     | 77,28 €      |
| März      | 183 kWh      | 82%      | 150 kWh      | 33 kWh       | 29 ct/kWh     | 9,57 €       |
| **Summe** | **3100 kWh** |          | **1245 kWh** | **1855 kWh** | **29 ct/kWh** | **541,51 €** |
|           |              |          | **40%**      | **60%**      |               |              |

# Anschlussisolierung

Da es beim Kauf unserer Wärmepumpe noch keine Isolierung für die Anschlüsse der Außeneinheit gab, habe ich mir die Isolierung aus einem Rest Siebdruckplatte, Steinwolle, wasserfesten Holzleim und ein paar Edelstahlschrauben selbst gebastelt.

<figure class="half">
  <a href="/assets/images/Erfahrungen-Matthias-ODUIso1.jpg">
  <img src="/assets/images/Erfahrungen-Matthias-ODUIso1.jpg"></a>

  <a href="/assets/images/Erfahrungen-Matthias-ODUIso2.jpg">
  <img src="/assets/images/Erfahrungen-Matthias-ODUIso2.jpg"></a>

  <a href="/assets/images/Erfahrungen-Matthias-ODUIso3.jpg">
  <img src="/assets/images/Erfahrungen-Matthias-ODUIso3.jpg"></a>

  <a href="/assets/images/Erfahrungen-Matthias-ODUIso4.jpg">
  <img src="/assets/images/Erfahrungen-Matthias-ODUIso4.jpg"></a>
</figure>
