---
title: Smarthome Entitäten
excerpt: Liste aller Entitäten der Bosch CS5800/6800i und Buderus WLW176/186 Wärmepumpe, die über EMS-ESP auslesbar sind
permalink: /docs/smarthome/entities
toc: true
---

Die Version 3.7.1 von [ems-esp](https://emsesp.org/) liefert 166 Entitäten für den Boiler und 71 für das Bedienelement.
Auf dieser Seite findet ihr eine Erklärung aller Entitäten des Boilers, soweit sie bekannt sind. Die Entitäten des Bedienelements folgen demnächst.
Falls jemand noch weitere Informationen hat, gerne hinzufügen.
Die Spalte _RW_ (Read-Write) zeigt an, ob die Entität RW ist oder nur gelesen werden kann.

## Energiewerte

IDs, die _"total"_ enthalten, sind die Summe aus den Werten für

- Heizung (_"heat"_),
- Kühlung (_"cool"_) sowie
- Warmwasser (Modul=_"dhw"_).

IDs, die _"comp"_ enthalten, beziehen sich auf die Wärmepumpe, _"eheat"_ und _"auxelecheat"_ auf den Zuheizer.

### Mit 2 Nachkommastellen

IDs, die mit _"nrg"_ oder _"nrgsupp"_ beginnen, beziehen sich auf die erzeugte thermische Energie (Wärme).
IDs, die mit _"meter"_ beginnen, beziehen sich auf die eingesetzte elektrische Energie (Stromverbrauch).

| ID         | Name               | Modul | Typ    | Einheit | RW  | Beschreibung                                                                                                                                                |
| ---------- | ------------------ | ----- | ------ | ------- | --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| nrgtotal   | Gesamtenergie      |       | number | kWh     |     | Insgesamt **erzeugte** Wärmeenergie für **Heizung, Kühlung und Warmwasser** - genauere Version von _nrgsupptotal_                                           |
| nrg        | WWK Energie        | dhw   | number | kWh     |     | Insgesamt **erzeugte** Wärmeenergie für **Warmwasser** - genauere Version von _nrgsupp_                                                                     |
| nrgheat    | Energie Heizen     |       | number | kWh     |     | Insgesamt **erzeugte** Wärmeenergie für **Heizung** - genauere Version von _nrgsuppheating_                                                                 |
| nrgcool    | Energie Kühlen     |       | number | kWh     |     | Insgesamt **erzeugte** Energie für **Kühlung** - genauere Version von _nrgsuppcooling_                                                                      |
| metertotal | Gesamtmessung      |       | number | kWh     |     | Insgesamt **eingesetzte** elektrische Energie der **Wärmepumpe und Zuheizer** für **Heizung, Kühlung und Warmwasser** - genauere Version von _nrgconstotal_ |
| metercomp  | Messung Kompressor |       | number | kWh     |     | Insgesamt **eingesetzte** elektrische Energie der **Wärmepumpe** - genauere Version von _nrgconstotal_                                                      |
| metereheat | Messung E-Heizer   |       | number | kWh     |     | Insgesamt **eingesetzte** elektrische Energie des **Zuheizers** - genauere Version von _auxelecheatnrgconstotal_                                            |
| meterheat  | Messung Heizen     |       | number | kWh     |     | Insgesamt **eingesetzte** elektrische Energie für **Heizung**                                                                                               |
| metercool  | Messung Kühlen     |       | number | kWh     |     | Insgesamt **eingesetzte** elektrische Energie für **Kühlung**                                                                                               |
| meter      | WWK Messung        | dhw   | number | kWh     |     | Insgesamt **eingesetzte** elektrische Energie für **Warmwasser**                                                                                            |

### Ohne Nachkommastellen

IDs, die mit _"nrgcons"_ beginnen, beziehen sich auf die eingesetzte elektrische Energie (Stromverbrauch).
IDs, die mit _"nrgconscomp"_ beginnen, beziehen sich auf eingesetzte elektrische Energie der Wärmepumpe.
IDs, die mit _"auxelecheatnrgcons"_ beginnen, beziehen sich auf die eingesetzte elektrische Energie des elektrischen Zuheizers.
IDs, die mit _"nrgsupp"_ beginnen, beziehen sich auf die erzeugte thermische Energie (Wärme).

| ID                        | Name                                      | Modul | Typ    | Einheit | RW  | Beschreibung                                                                                             |
| ------------------------- | ----------------------------------------- | ----- | ------ | ------- | --- | -------------------------------------------------------------------------------------------------------- |
| nrgsupptotal              | gesamte Energieabgabe                     |       | number | kWh     |     | Insgesamt **erzeugte** Wärmeenergie für **Heizung, Kühlung und Warmwasser**                              |
| nrgsuppheating            | gesamte Energieabgabe heizen              |       | number | kWh     |     | Insgesamt **erzeugte** Wärmeenergie für **Heizung**                                                      |
| nrgsupp                   | WWK gesamte Energieabgabe Wärme           | dhw   | number | kWh     |     | Insgesamt **erzeugte** Wärmeenergie für **Warmwasser**                                                   |
| nrgsuppcooling            | gesamte Energieabgabe kühlen              |       | number | kWh     |     | Insgesamt **erzeugte** Wärmeenergie für **Kühlung**                                                      |
| nrgsupppool               | gesamte Energieabgabe Pool                |       | number | kWh     |     | -- vermutlich nicht relevant --                                                                          |
| nrgconstotal              | Gesamtenergieverbrauch                    |       | number | kWh     |     | Insgesamt **eingesetzte** elektrische Energie für **Heizung und Warmwasser**                             |
| nrgconscomptotal          | Gesamtenergieverbrauch Kompressor         |       | number | kWh     |     | Insgesamt **eingesetzte** elektrische Energie der **Wärmepumpe** für **Heizung, Kühlung und Warmwasser** |
| nrgconscompheating        | Energieverbrauch Kompressor heizen        |       | number | kWh     |     | Insgesamt **eingesetzte** elektrische Energie der **Wärmepumpe** für **Heizung**                         |
| nrgconscomp               | WWK Energieverbrauch Kompressor           | dhw   | number | kWh     |     | Insgesamt **eingesetzte** elektrische Energie der **Wärmepumpe** für **Warmwasser**                      |
| nrgconscompcooling        | Energieverbrauch Kompressor kühlen        |       | number | kWh     |     | Insgesamt **eingesetzte** elektrische Energie der **Wärmepumpe** für **Kühlung**                         |
| nrgconscomppool           | Energieverbrauch Kompressor Pool          |       | number | kWh     |     | -- vermutlich nicht relevant --                                                                          |
| auxelecheatnrgconstotal   | Energieverbrauch el. Zusatzheizung        |       | number | kWh     |     | Insgesamt **eingesetzte** elektrische Energie des **Zuheizers** für **Heizung und Warmwasser**           |
| auxelecheatnrgconsheating | Energieverbrauch el. Zusatzheizung Heizen |       | number | kWh     |     | Insgesamt **eingesetzte** elektrische Energie des **Zuheizers** für **Heizung**                          |
| auxelecheatnrgcons        | WWK Energieverbrauch el. Zusatzheizung    | dhw   | number | kWh     |     | Insgesamt **eingesetzte** elektrische Energie des **Zuheizers** für **Warmwasser**                       |
| auxelecheatnrgconspool    | Energieverbrauch el. Zusatzheizung Pool   |       | number | kWh     |     | -- vermutlich nicht relevant --                                                                          |

### Leistung

| ID          | Name                    | Modul | Typ    | Einheit | RW  | Beschreibung                                                                                             |
| ----------- | ----------------------- | ----- | ------ | ------- | --- | -------------------------------------------------------------------------------------------------------- |
| hppower     | Kompressorleistung      |       | number | kW      |     | Aktuelle Leistungsaufnahme der Wärmepumpe mit einer Nachkommastelle, z.B. 0,3 kW (Achtung: sehr ungenau) |
| hpcurrpower | akt. Kompressorleistung |       | number | W       |     | Aktuelle Leistungsaufnahme der Wärmepumpe, z.B. 298 W                                                    |

## Temperaturen

### Wärmepumpe & Heizung

#### Messwerte

| ID          | Name                               | Modul | Typ    | Einheit | RW  | Beschreibung                                                                                |
| ----------- | ---------------------------------- | ----- | ------ | ------- | --- | ------------------------------------------------------------------------------------------- |
| outdoortemp | Außentemperatur                    |       | number | °C      |     | Außentemperatur gemessen durch Außenthermometer                                             |
| curflowtemp | Aktuelle Vorlauftemperatur         |       | number | °C      |     | Vorlauftemperatur nach Pufferspeicher (T0)                                                  |
| rettemp     | Rücklauftemperatur                 |       | number | °C      |     | Rücklauftemperatur des Primärkreises beim Verlassen der Inneneinheit - identisch zu _hptc0_ |
| hptc0       | Kältemittelrücklauf (TC0)          |       | number | °C      |     | Rücklauftemperatur des Primärkreises beim Verlassen der Inneneinheit                        |
| hptc1       | Kältemittelvorlauf (TC1)           |       | number | °C      |     | Vorlauftemperatur des Primärkreises beim Eintritt in die Inneneinheit                       |
| hptc3       | Kondensatortemperatur (TC3)        |       | number | °C      |     | Temperatur des Kältemittels beim Eintritt in den Verflüssiger                               |
| hptr1       | Kompressortemperatur (TR1)         |       | number | °C      |     | Temperatur des Kältemittels im Kompressor                                                   |
| hptr3       | Kältemittel (flüssig) (TR3)        |       | number | °C      |     | Temperatur des Kältemittels beim Verlassen des Verflüssigers                                |
| hptr4       | Verdampfereingang (TR4)            |       | number | °C      |     | Temperatur des Kältemittels nach dem Expansionsventils                                      |
| hptr5       | Kompressoreingang (TR5)            |       | number | °C      |     | Temperatur Sauggas                                                                          |
| hptr6       | Kompressorausgang (TR6)            |       | number | °C      |     | Temperatur Heißgas                                                                          |
| hptl2       | Außenlufteintrittstemperatur (TL2) |       | number | °C      |     | Lufttemperatur am Verdampfereingang                                                         |
| hppl1       | Niederdrucktemperatur (PL1)        |       | number | °C      |     | Niederdrucktemperatur - identisch zu _hptr4_                                                |
| hpph1       | Hochdrucktemperatur (PH1)          |       | number | °C      |     | Hochdrucktemperatur - identisch zu _curflowtemp_                                            |
| hpta4       | Kondensatorwanne (TA4)             |       | number | °C      |     | Temperatur an der Kondensatwanne                                                            |

#### Einstellungen

| ID           | Name                       | Modul | Typ    | Einheit | RW  | Beschreibung                                                            |
| ------------ | -------------------------- | ----- | ------ | ------- | --- | ----------------------------------------------------------------------- |
| selflowtemp  | Gewählte Vorlauftemperatur |       | number | °C      | X   | Die von der Anlage bestimmte Zielvorlauftemperatur                      |
| heatingtemp  | Heiztemperatur             |       | number | °C      | X   | Maximaler mögliche Vorlauftemperatur, z.B. 75°C bei CS6800i             |
| tempdiffheat | Temp.diff. TC3/TC0 Heizen  |       | number | K       | X   | Temperaturdifferenz zw. Vor- und Rücklauf des Primärkreises beim Heizen |
| tempdiffcool | Temp.diff. TC3/TC0 Kühlen  |       | number | K       | X   | Temperaturdifferenz zw. Vor- und Rücklauf des Primärkreises beim Kühlen |

### Warmwasser

#### Messwerte

| ID       | Name                            | Modul | Typ    | Einheit | RW  | Beschreibung                                                                                 |
| -------- | ------------------------------- | ----- | ------ | ------- | --- | -------------------------------------------------------------------------------------------- |
| settemp  | WWK Solltemperatur              | dhw   | number | °C      |     | Aktuelle Stopptemperatur im gerade aktiven Warmwassermodus                                   |
| curtemp  | WWK aktuelle interne Temperatur | dhw   | number | °C      |     | Aktuell gemessene Warmwassertemperatur im Warmwasserspeicher - identisch zu hptw1 & curtemp2 |
| curtemp2 | WWK aktuelle externe Temperatur | dhw   | number | °C      |     | Aktuell gemessene Warmwassertemperatur im Warmwasserspeicher                                 |
| hptw1    | DHW Reservoir (TW1)             |       | number | °C      |     | Aktuell gemessene Warmwassertemperatur im Warmwasserspeicher                                 |

#### Einstellungen

| ID               | Name                              | Modul | Typ    | Einheit | RW  | Beschreibung                                                                      |
| ---------------- | --------------------------------- | ----- | ------ | ------- | --- | --------------------------------------------------------------------------------- |
| comfdiff         | WWK Komfort Differenztemp.        | dhw   | number | K       | X   | Ladedelta im Komfort Modus, mit dem die Vorlauftemperatur angehoben wird          |
| ecodiff          | WWK ECO Differenztemp.            | dhw   | number | K       | X   | Ladedelta im Eco Modus, mit dem die Vorlauftemperatur angehoben wird              |
| ecoplusdiff      | WWK ECO+ Differenztemp.           | dhw   | number | K       | X   | Ladedelta im Eco+ Modus, mit dem die Vorlauftemperatur angehoben wird             |
| comfstop         | WWK Komfort Stopptemp.            | dhw   | number | °C      | X   | Stopptemperatur im Komfort Modus, an der die Warmwasseraufbereitung beendet wird  |
| ecostop          | WWK ECO Stopptemp.                | dhw   | number | °C      | X   | Stopptemperatur im Eco Modus, an der die Warmwasseraufbereitung beendet wird      |
| ecoplusstop      | WWK ECO+ Stopptemp.               | dhw   | number | °C      | X   | Stopptemperatur im Eco+ Modus, an der die Warmwasseraufbereitung beendet wird     |
| seltempsingle    | WWK Einmalladungstemperatur       | dhw   | number | °C      | X   | Stopptemperatur für Extra-WW                                                      |
| disinfectiontemp | WWK Desinfektionstemperatur       | dhw   | number | °C      | X   | Stopptemperatur für die Warmwasserdesinfektion                                    |
| seltemp          | WWK gewählte Temperatur           | dhw   | number | °C      | X   | Starttemperatur im Komfort Modus, an der die Warmwasseraufbereitung begonnen wird |
| seltemplow       | WWK ausgewählte untere Temperatur | dhw   | number | °C      | X   | Starttemperatur im Eco Modus, an der die Warmwasseraufbereitung begonnen wird     |
| tempecoplus      | WWK ausgewählte ECO+ Temperatur   | dhw   | number | °C      | X   | Starttemperatur im Eco+ Modus, bei der die Warmwasseraufbereitung begonnen wird   |

## Pumpen

| ID             | Name                            | Modul | Typ     | Einheit | RW  | Beschreibung                                                                                       |
| -------------- | ------------------------------- | ----- | ------- | ------- | --- | -------------------------------------------------------------------------------------------------- |
| heatingpump    | Heizungspumpe                   |       | boolean |         |     | AN wenn die Primärkreispumpe PC0 läuft                                                             |
| hpcircspd      | Zirkulationspumpendrehzahl      |       | number  | %       |     | Aktuelle Modulation der Primärkreispumpe PC0 - identisch zu _heatingpumpmod_                       |
| heatingpumpmod | Modulation Heizungspumpe        |       | number  | %       |     | Prozentuale Leistung der Primärkreispumpe PC0                                                      |
| pc0flow        | Durchfluss PC0                  |       | number  | l/h     |     | Durchflussmenge/Volumenstrom der Primärkreispumpe PC0 (leider kein Wert bei niedrigerer Leistung ) |
| pc1flow        | Durchfluss PC1                  |       | number  | l/h     |     | Durchflussmenge/Volumenstrom der Heizkreispumpe PC1                                                |
| pc1on          | PC1                             |       | boolean |         |     | AN wenn die Heizkreispumpe PC1 läuft                                                               |
| hpsetdiffpress | Pumpensolldruck                 |       | number  | mbar    | X   | Solldruck der Heizkreispumpe PC1                                                                   |
| circpump       | WWK Zirkulationspumpe vorhanden | dhw   | boolean |         | X   | AN wenn die WW-Zikulationspumpe über die Anlage gesteuert werden soll                              |
| circmode       | WWK Zirkulationspumpenmodus     | dhw   | enum    |         | X   | Einstellung der Laufhäufigkeit, z.B. 3x3min je Stunde                                              |
| circ           | WWK Zirkulation aktiv           | dhw   | boolean |         | X   | AN wenn die WW-Zirkulationspumpe gerade läuft                                                      |
|                |

## Status

| ID              | Name                         | Modul | Typ     | Einheit | RW  | Beschreibung                                                                                                  |
| --------------- | ---------------------------- | ----- | ------- | ------- | --- | ------------------------------------------------------------------------------------------------------------- |
| heatingactive   | Heizen aktiv                 |       | boolean |         |     | AN wenn die Anlage gerade im Heizbetrieb ist                                                                  |
| tapwateractive  | Warmwasser aktiv             |       | boolean |         |     | AN wenn die Anlage gerade im Warmwasserbetrieb ist                                                            |
| curburnpow      | Aktuelle Brennerleistung     |       | number  | %       |     | Aktuelle Modulation (relative Leistung) des Kompressors - identisch zu _hpcompspd_                            |
| hpcompspd       | Kompressordrehzahl           |       | number  | %       |     | Aktuelle Modulation (relative Leistung) des Kompressors                                                       |
| hpcompon        | WP Kompressor                |       | boolean |         |     | AN wenn der Kompressor gerade läuft                                                                           |
| hpactivity      | Kompressoraktivität          |       | enum    |         |     | Aktuelle Aktivität des Kompressors: "keine", "Heizen", "Kühlen", "Warmwasser", "Pool", "Unbekannt", "Abtauen" |
| hp4way          | 4-Wege-Ventil (VR4)          |       | enum    |         |     | Aktuelle Stellung des 4-Wege-Ventils im Kältekreis: "Kühlen & Abtauen" oder "Heizen & Warmwasser"             |
| hpea0           | Heizung Kondensatwanne (EA0) |       | boolean |         |     | AN wenn die Kondensatwannenheizung gerade aktiv ist                                                           |
| syspress        | Systemdruck                  |       | number  | bar     |     | Wasserdruck im Heizkreis                                                                                      |
| charging        | WWK Laden                    | dhw   | boolean |         |     | AN bei Warmwasserbetrieb, ansonsten AUS                                                                       |
| 3wayvalve       | WWK 3-Wege-Ventil aktiv      | dhw   | boolean |         |     | AN bei Warmwasserbetrieb, ansonsten AUS - identisch zu RWem _hp3way_                                          |
| auxheaterstatus | Zusatzheizerstatus           |       | number  | %       |     | Aktuelle relative Leistung des Zuheizers                                                                      |

## Einstellungen

| ID               | Name                        | Modul | Typ     | Einheit | RW  | Beschreibung                                                                                                   |
| ---------------- | --------------------------- | ----- | ------- | ------- | --- | -------------------------------------------------------------------------------------------------------------- |
| heatingactivated | Heizbetrieb aktiviert       |       | boolean |         | X   | AN wenn die Anlage für den Heizbetrieb genutzt werden soll                                                     |
| activated        | WWK aktiviert               | dhw   | boolean |         | X   | AN wenn die Anlage für Warmwasseraufbereitung genutzt werden soll                                              |
| alternatingop    | WWK Wechselbetrieb          | dhw   | boolean |         | X   | AN wenn der Heizbetrieb für den Warmwasserbetrieb unterbrochen werden kann und umgekehrt                       |
| altopprioheat    | WWK Heizen bevorzugt vor WW | dhw   | number  | Minuten | X   | Max. Dauer im Warmwasserbetrieb bis in den Heizbetrieb gewechselt wird                                         |
| altopprio        | WWK bevorzugt vor Heizen    | dhw   | number  | Minuten | X   | Max. Dauer im Heizbetrieb bis in den Warmwasserbetrieb gewechselt wird                                         |
| hp3way           | 3-Wege-Ventil               |       | boolean |         | X   | Stellung des 3-Wege-Ventils: AN bei Warmwasserbetrieb, ansonsten AUS (identisch zu _3wayvalve_ aber schreibar) |

### Elektrischer Zuheizer

| ID             | Name                          | Modul | Typ     | Einheit | RW  | Beschreibung                                                                                                 |
| -------------- | ----------------------------- | ----- | ------- | ------- | --- | ------------------------------------------------------------------------------------------------------------ |
| maxheatcomp    | Heizstab Limit mit Kompressor |       | enum    |         | X   | Max. Leistung des Zuheizers bei Kompressorbetrieb für Heizung [0kW\|3kW\|6kW\|9kW]                           |
| maxheatheat    | Heizstab Limit Leistung       |       | enum    |         | X   | Max. Leistung des Zuheizers ohne Kompressor [0kW\|3kW\|6kW\|9kW]                                             |
| maxheat        | WWK Heizstab Limit für WW     | dhw   | enum    |         | X   | Max. Leistung des Zuheizers im Warmwasserbetrieb [0kW\|3kW\|6kW\|9kW]                                        |
| elheatstep1    | El. Heizer Stufe 1            |       | boolean |         | X   | AN wenn die erste Stufe (3kW) des elektischen Zuheizers aktuell läuft                                        |
| elheatstep2    | El. Heizer Stufe 2            |       | boolean |         | X   | AN wenn die erste Stufe (6kW) des elektischen Zuheizers aktuell läuft                                        |
| elheatstep3    | El. Heizer Stufe 3            |       | boolean |         | X   | AN wenn die erste Stufe (9kW) des elektischen Zuheizers aktuell läuft                                        |
| auxheateronly  | nur Zusatzheizer              |       | boolean |         | X   | AN wenn Heiz- und Warmwasserbetrieb ausschließlich über den Zuheizer erfolgt                                 |
| auxheateroff   | Zusatzheizer deaktivieren     |       | boolean |         | X   | AN wenn der Zuheizer deaktiviert ist                                                                         |
| auxheaterdelay | Zusatzheizer verzögert ein    |       | number  | K\*min  | X   | Verzögerung als Produkt aus Unterschreitung der Solltemperatur und Dauer, bis der Zuheizer zugeschaltet wird |
| auxmaxlimit    | Zusatzheizer max. Grenze      |       | number  | K       | X   | Temperaturdifferenz unterhalb der max. Vorlauftemperatur, ab der der Zuheizer gesperrt wird                  |
| tempparmode    | Heizstab Parallelbetrieb      |       | number  | °C      | X   | Bivalenzpunkt, ab der der Zuheizer zu-/abgeschaltet wird                                                     |

### Silentmode

| ID            | Name                                 | Modul | Typ    | Einheit | RW  | Beschreibung                                                                      |
| ------------- | ------------------------------------ | ----- | ------ | ------- | --- | --------------------------------------------------------------------------------- |
| silentmode    | Silentmodus                          |       | enum   |         | X   | Silentmodus: ["aus"\|"auto"\|"an"]                                                |
| mintempsilent | Minimale Außentemperatur Silentmodus |       | number | °C      | X   | Min. Temperatur, ab der der Silentmodus in der Auto-Einstellung abgeschaltet wird |

## Statistiken

### Betriebszeiten

Die Anlage kann im Heizbetrieb, im Kühlbetrieb, im Warmwasserbetrieb oder im Standby sein.

| ID                | Name                           | Modul | Typ    | Einheit | RW  | Beschreibung                                                                              |
| ----------------- | ------------------------------ | ----- | ------ | ------- | --- | ----------------------------------------------------------------------------------------- |
| ubauptime         | Anlagengesamtlaufzeit          |       | number | Minuten |     | ???                                                                                       |
| uptimetotal       | Gesamtbetriebszeit Wärmepumpe  |       | number | Minuten |     | Gesamte Laufzeit der Anlage, inkl. Standby                                                |
| uptimecontrol     | Gesamtbetriebszeit Heizen      |       | number | Minuten |     | Gesamte Betriebszeit der Anlage im **Heiz-, Kühl- oder Warmwasserbetrieb** (ohne Standby) |
| uptimecompheating | Betriebszeit Kompressor heizen |       | number | Minuten |     | Gesamte Betriebszeit der Anlage im **Heizbetrieb** (ohne Standby)                         |
| uptimecompcooling | Betriebszeit Kompressor kühlen |       | number | Minuten |     | Gesamte Betriebszeit der Anlage im **Kühlbetrieb** (ohne Standby)                         |
| uptimecomp        | WWK Betriebszeit Kompressor    | dhw   | number | Minuten |     | Gesamte Betriebszeit der Anlage im **Warmwasserbetrieb** (ohne Standby)                   |
| uptimecomppool    | Betriebszeit Kompressor Pool   |       | number | Minuten |     | -- vermutlich nicht relevant --                                                           |

### Kompressorstarts

| ID              | Name                      | Modul | Typ    | Einheit | RW  | Beschreibung                                      |
| --------------- | ------------------------- | ----- | ------ | ------- | --- | ------------------------------------------------- |
| totalcompstarts | Gesamtkompressorstarts    |       | number |         |     | Gesamte Anzahl der Kompressorstarts               |
| heatingstarts   | Heizungsregelungstarts    |       | number |         |     | Anzahl der Kompressorstarts für Heizbetrieb       |
| coolingstarts   | Kühlregelungstarts        |       | number |         |     | Anzahl der Kompressorstarts für Kühlbetrieb       |
| starts2         | WWK Anzahl Starts Kreis 2 | dhw   | number |         |     | Anzahl der Kompressorstarts für Warmwasserbetrieb |
| poolstarts      | Poolsteuerungstarts       |       | number |         |     | -- vermutlich nicht relevant --                   |

## Eingänge

| ID       | Name                  | Modul | Typ     | Einheit | RW  | Beschreibung                                        |
| -------- | --------------------- | ----- | ------- | ------- | --- | --------------------------------------------------- |
| hpin1    | Status Eingang 1      |       | boolean |         |     | AN bei EVU-Sperrzeit                                |
| hpin1opt | Einstellung Eingang 1 |       | string  |         | X   |
| hpin2    | Status Eingang 2      |       | boolean |         |     | AN wenn Warmwasserbetrieb oder Heizbetrieb gesperrt |
| hpin2opt | Einstellung Eingang 2 |       | string  |         | X   |
| hpin3    | Status Eingang 3      |       | boolean |         |     | AN wenn Überhitzungsschutz HK1 aktiv                |
| hpin3opt | Einstellung Eingang 3 |       | string  |         | X   |
| hpin4    | Status Eingang 4      |       | boolean |         |     | AN wenn Überschuss der Photovoltaikanlage           |
| hpin4opt | Einstellung Eingang 4 |       | string  |         | X   |

## Kommandos

| ID           | Name               | Modul | Typ     | Einheit | RW  | Beschreibung                           |
| ------------ | ------------------ | ----- | ------- | ------- | --- | -------------------------------------- |
| reset        | Reset              |       | enum    |         | X   | ?                                      |
| heatingoff   | Heizen abschalten  |       | boolean |         | X   | ?                                      |
| shutdown     | Abschalten         |       | enum    |         | X   | ?                                      |
| mandefrost   | Manuelle Enteisung |       | boolean |         | X   | Abtauung wird gestartet                |
| disinfecting | WWK Desinfizieren  | dhw   | boolean |         | X   | Warmwwasserdesinfektion wird gestartet |
| onetime      | WWK Einmalladung   | dhw   | boolean |         | X   | Extra-WW wird gestartet                |

## Andere

<details>
  <summary>Weitere Entiäten, deren Bedeutung aktuell noch unklar ist</summary>
{% capture entities_boiler %}

| ID                 | Name                                     | Modul | Typ     | Einheit | RW  | Beschreibung |
| ------------------ | ---------------------------------------- | ----- | ------- | ------- | --- | ------------ |
| boiltemp           | Kesseltemperatur                         |       | number  | °C      |     | ---          |
| pumpmode           | Kesselpumpenmodus                        |       | enum    |         | X   | ---          |
| pumpmodmax         | Maximale Kesselpumpenleistung            |       | number  | %       | X   | Immer 0      |
| pumpmodmin         | Minimale Kesselpumpenleistung            |       | number  | %       | X   | Immer 0      |
| pumpcharacter      | Charakteristik der Kesselpumpe           |       | enum    |         | X   | ---          |
| pumpdelay          | Pumpennachlaufzeit                       |       | number  | Minuten | X   | ---          |
| pumpontemp         | Pumpenlogiktemperatur                    |       | number  | °C      | X   | ---          |
| switchtemp         | Mischerschalttemperatur                  |       | number  | °C      |     |
| selburnpow         | Eingestellte maximale Brennerleistung    |       | number  | %       | X   | Immer 0      |
| burnstarts         | Brennerstarts                            |       | number  |         |     | Immer 0      |
| burnworkmin        | Brennerlaufzeit                          |       | number  | Minuten |     | Immer 0      |
| burn2workmin       | Brennerlaufzeit Stufe 2                  |       | number  | Minuten |     | Immer 0      |
| heatworkmin        | Heizlaufzeit                             |       | number  | Minuten |     | Immer 0      |
| heatstarts         | Brennerstarts Heizen                     |       | number  |         |     | Immer 0      |
| lastcode           | Letzter Fehler                           |       | string  |         |     | ---          |
| servicecode        | Statusmeldung                            |       | string  |         |     | ---          |
| servicecodenumber  | Statusmeldungsnummer                     |       | number  |         |     | ---          |
| maintenancemessage | Wartungsmeldung                          |       | string  |         |     | ---          |
| maintenance        | Wartungsplan                             |       | enum    |         | X   | ---          |
| maintenancetime    | Wartung in                               |       | number  | Stunden | X   | ---          |
| maintenancedate    | Wartungsdatum                            |       | string  |         | X   | ---          |
| emergencyops       | Notbetrieb                               |       | boolean |         | X   | ?            |
| emergencytemp      | Notfalltemperatur                        |       | number  | °C      | X   | ?            |
| hpmaxpower         | max. Kompressorleistung                  |       | number  | %       | X   | ---          |
| pvmaxcomp          | PV max. Kompressorleistung               |       | number  | kW      | X   | ---          |
| powerreduction     | Leistungsverringerung                    |       | number  | %       | X   | ---          |
| hpbrinepumpspd     | Solepumpendrehzahl                       |       | number  | %       |     |
| hpbrinein          | Sole in/Verdampfer                       |       | number  | °C      |     |
| hpbrineout         | Sole aus/Kondensator                     |       | number  | °C      |     |
| poolsettemp        | Sollwert Pooltemperatur                  |       | number  | °C      | X   |
| pvcooling          | Kühlen nur mit PV                        |       | boolean |         | X   |
| auxlimitstart      | Zusatzheizer Grenze Start                |       | number  | K       | X   |
| auxheatrmode       | Zusatzheizungsmodus                      |       | enum    |         | X   |
| hphystheat         | Schalthysterese Heizen                   |       | number  | K\*min  | X   | ---          |
| hphystcool         | Schalthysterese Kühlen                   |       | number  | K\*min  | X   | ---          |
| hphystpool         | Schalthysterese Pool                     |       | number  | K\*min  | X   | ---          |
| silentfrom         | Silentmodus Start                        |       | number  | Minuten | X   | ---          |
| silentto           | Silentmodus Ende                         |       | number  | Minuten | X   | ---          |
| auxheatmix         | Mischventil Zusatzheizer                 |       | number  | %       |     |
| vpcooling          | Ventil/Pumpe für Kühlen                  |       | boolean |         | X   |
| heatcable          | Heizband                                 |       | boolean |         | X   |
| vc0valve           | VC0 Ventil                               |       | boolean |         | X   |
| primepump          | Hauptpumpe                               |       | boolean |         | X   | Immer AUS    |
| primepumpmod       | Modulation Hauptpumpe                    |       | number  | %       | X   | Immer 0      |
| hppumpmode         | primärer Wärmepumpenmodus                |       | enum    |         | X   | ---          |
| fan                | Lüfter                                   |       | number  | %       | X   | ---          |
| hppowerlimit       | Leistungsgrenze                          |       | number  | W       | X   | ---          |
| pc1rate            | PC1 Rate                                 |       | number  | %       |     | Immer 0%     |
| hptr7              | Kältemittel (gasförmig) (TR7)            |       | number  | °C      |     |
| comfoff            | WWK Komfort Ausschalttemp.               | dhw   | number  | °C      | X   | ---          |
| ecooff             | WWK ECO Ausschalttemp.                   | dhw   | number  | °C      | X   | ---          |
| ecoplusoff         | WWK ECO+ Ausschalttemp.                  | dhw   | number  | °C      | X   | Immer 0      |
| hpcircpump         | WWK Zirkulation möglich bei WW-Bereitung | dhw   | boolean |         | X   | ---          |
| tapactivated       | WWK Durchlauferhitzer aktiv              | dhw   | boolean |         | X   | ---          |
| seltempoff         | WWK ausgewählte Temperatur bei AUS       | dhw   | number  | °C      |     | ---          |
| solartemp          | WWK Solarkesseltemperatur                | dhw   | number  | °C      |     | ---          |
| type               | WWK Typ                                  | dhw   | enum    |         |     | ---          |
| comfort            | WWK Komfort                              | dhw   | enum    |         | X   | ---          |
| comfort1           | WWK Komfort-Modus                        | dhw   | enum    |         | X   | ?            |
| flowtempoffset     | WWK Anhebung Vorlauftemperatur           | dhw   | number  | °C      | X   | ?            |
| chargeoptimization | WWK Ladungsoptimierung                   | dhw   | boolean |         | X   | ---          |
| maxpower           | WWK max. Leistung                        | dhw   | number  | %       | X   | ---          |
| maxtemp            | WWK maximale Temperatur                  | dhw   | number  | °C      | X   | ---          |
| chargetype         | WWK Speicherladungstyp                   | dhw   | enum    |         |     | ---          |
| hyston             | WWK Einschalttemperaturdifferenz         | dhw   | number  | °C      | X   | ?            |
| hystoff            | WWK Ausschalttemperaturdifferenz         | dhw   | number  | °C      | X   | ?            |
| curflow            | WWK aktueller Durchfluss                 | dhw   | number  | l/min   |     | Immer 0      |
| storagetemp1       | WWK interne Speichertemperatur           | dhw   | number  | °C      |     | ---          |
| storagetemp2       | WWK externe Speichertemperatur           | dhw   | number  | °C      |     | ---          |
| recharging         | WWK Nachladen                            | dhw   | boolean |         |     | ?            |
| tempok             | WWK Temperatur ok                        | dhw   | boolean |         |     | ?            |
| active             | WWK aktiv                                | dhw   | boolean |         |     |
| mixertemp          | WWK Mischertemperatur                    | dhw   | number  | °C      |     | ---          |
| cylmiddletemp      | WWK Speichertemperatur Mitte             | dhw   | number  | °C      |     | ---          |
| starts             | WWK Anzahl Starts                        | dhw   | number  |         |     | Immer 0      |
| workm              | WWK aktive Zeit                          | dhw   | number  | Minuten |     | Immer 0      |
| hpswitchvalve      | Schaltventil                             |       | boolean |         |     | Immer AUS    |
| headertemp         | Hydr. Weiche                             |       | number  | °C      |     | Immer 0      |

{% endcapture %}
{{ entities_boiler | markdownify }}

</details>

## Entitäten auslesen

Die Liste aller Entitäten kann durch Öffnen folgender URL aus ems-esp ausgelesen werden: [http://ems-esp/api/boiler/entities](http://ems-esp/api/boiler/entities).
Ihr könnt sie auch direkt mit `curl`und `jq` als Markdown Tabelle erstellen lassen:

```
curl 'http://ems-esp/api/boiler/entities' | jq -r '[
  "| ID | Name | Modul | Typ | Einheit | RW |",
  "|----|------|------------|-----|---------|------------|",
  (to_entries[] | "| " + .value.name + " | " + .value.fullname + " | " + .value.circuit + " | " + .value.type + " | " + .value.uom + " | " + (if .value.writeable then "X" else "" end) + " |")
] | join("\n")'
```

Alternativ könnt ihr in Home Assistant die Entiäten auslesen.
Dazu öffnet ihr einfach [http://homeassistant.local:8123/developer-tools/template](http://homeassistant.local:8123/developer-tools/template) and ersetze den Inhalt des Template-Editors durch folgenden Ausdruck:

```
{% raw %}
{% for state in states %}{% if 'boiler' in state.entity_id %}
| {{- state.entity_id -}} | {{- state.name -}}|{% endif %}{% endfor %}
{% endraw %}
```

In Home Assistant wird das `dhw` durch `ww` ersetzt.
