---
title: Smarthome Entitäten
excerpt: Liste aller Entitäten der Bosch CS5800/6800i und Buderus WLW176/186 Wärmepumpe, die über EMS-ESP auslesbar sind
permalink: /docs/smarthome/entities
toc: true
---

Die Version 3.7.1 von [ems-esp](https://emsesp.org/) liefert 166 Entitäten für den Boiler und 71 für das Bedienelement.
Auf dieser Seite findet ihr eine Erklärung aller Entitäten, soweit sie bekannt sind.
Falls jemand noch weitere Informationen/Korrekturen hat, gerne hinzufügen.
Die Spalte _RW_ (Read-Write) zeigt an, ob die Entität nur lesbar oder auch schreibbar ist.

## Energiewerte

IDs, die _"total"_ enthalten, sind die Summe aus den Werten für

- Heizung (_"heat"_),
- Kühlung (_"cool"_) sowie
- Warmwasser (Modul=_"dhw"_).

IDs, die _"comp"_ enthalten, beziehen sich auf die Wärmepumpe, _"eheat"_ und _"auxelecheat"_ auf den Zuheizer.

### Mit 2 Nachkommastellen

IDs, die mit _"nrg"_ oder _"nrgsupp"_ beginnen, beziehen sich auf die erzeugte thermische Energie (Wärme).
IDs, die mit _"meter"_ beginnen, beziehen sich auf die eingesetzte elektrische Energie (Stromverbrauch).

| ID                                                 | Name               | Modul         | Typ | Einheit | RW  | Beschreibung                                                                                                                                                |
| -------------------------------------------------- | ------------------ | ------------- | --- | ------- | --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [nrgtotal](http://ems-esp/api/boiler/nrgtotal)     | Gesamtenergie      | boiler        | 🔢  | kWh     |     | Insgesamt **erzeugte** Wärmeenergie für **Heizung, Kühlung und Warmwasser** - genauere Version von _nrgsupptotal_                                           |
| [nrg](http://ems-esp/api/boiler/nrg)               | WWK Energie        | boiler<br>dhw | 🔢  | kWh     |     | Insgesamt **erzeugte** Wärmeenergie für **Warmwasser** - genauere Version von _nrgsupp_                                                                     |
| [nrgheat](http://ems-esp/api/boiler/nrgheat)       | Energie Heizen     | boiler        | 🔢  | kWh     |     | Insgesamt **erzeugte** Wärmeenergie für **Heizung** - genauere Version von _nrgsuppheating_                                                                 |
| [nrgcool](http://ems-esp/api/boiler/nrgcool)       | Energie Kühlen     | boiler        | 🔢  | kWh     |     | Insgesamt **erzeugte** Energie für **Kühlung** - genauere Version von _nrgsuppcooling_                                                                      |
| [metertotal](http://ems-esp/api/boiler/metertotal) | Gesamtmessung      | boiler        | 🔢  | kWh     |     | Insgesamt **eingesetzte** elektrische Energie der **Wärmepumpe und Zuheizer** für **Heizung, Kühlung und Warmwasser** - genauere Version von _nrgconstotal_ |
| [metercomp](http://ems-esp/api/boiler/metercomp)   | Messung Kompressor | boiler        | 🔢  | kWh     |     | Insgesamt **eingesetzte** elektrische Energie der **Wärmepumpe** - genauere Version von _nrgconstotal_                                                      |
| [metereheat](http://ems-esp/api/boiler/metereheat) | Messung E-Heizer   | boiler        | 🔢  | kWh     |     | Insgesamt **eingesetzte** elektrische Energie des **Zuheizers** - genauere Version von _auxelecheatnrgconstotal_                                            |
| [meterheat](http://ems-esp/api/boiler/meterheat)   | Messung Heizen     | boiler        | 🔢  | kWh     |     | Insgesamt **eingesetzte** elektrische Energie für **Heizung**                                                                                               |
| [metercool](http://ems-esp/api/boiler/metercool)   | Messung Kühlen     | boiler        | 🔢  | kWh     |     | Insgesamt **eingesetzte** elektrische Energie für **Kühlung**                                                                                               |
| [meter](http://ems-esp/api/boiler/meter)           | WWK Messung        | boiler<br>dhw | 🔢  | kWh     |     | Insgesamt **eingesetzte** elektrische Energie für **Warmwasser**                                                                                            |

### Ohne Nachkommastellen

IDs, die mit _"nrgcons"_ beginnen, beziehen sich auf die eingesetzte elektrische Energie (Stromverbrauch).
IDs, die mit _"nrgconscomp"_ beginnen, beziehen sich auf eingesetzte elektrische Energie der Wärmepumpe.
IDs, die mit _"auxelecheatnrgcons"_ beginnen, beziehen sich auf die eingesetzte elektrische Energie des elektrischen Zuheizers.
IDs, die mit _"nrgsupp"_ beginnen, beziehen sich auf die erzeugte thermische Energie (Wärme).

| ID                                                                               | Name                                      | Modul         | Typ | Einheit | RW  | Beschreibung                                                                                             |
| -------------------------------------------------------------------------------- | ----------------------------------------- | ------------- | --- | ------- | --- | -------------------------------------------------------------------------------------------------------- |
| [nrgsupptotal](http://ems-esp/api/boiler/nrgsupptotal)                           | gesamte Energieabgabe                     | boiler        | 🔢  | kWh     |     | Insgesamt **erzeugte** Wärmeenergie für **Heizung, Kühlung und Warmwasser**                              |
| [nrgsuppheating](http://ems-esp/api/boiler/nrgsuppheating)                       | gesamte Energieabgabe heizen              | boiler        | 🔢  | kWh     |     | Insgesamt **erzeugte** Wärmeenergie für **Heizung**                                                      |
| [nrgsupp](http://ems-esp/api/boiler/nrgsupp)                                     | WWK gesamte Energieabgabe Wärme           | boiler<br>dhw | 🔢  | kWh     |     | Insgesamt **erzeugte** Wärmeenergie für **Warmwasser**                                                   |
| [nrgsuppcooling](http://ems-esp/api/boiler/nrgsuppcooling)                       | gesamte Energieabgabe kühlen              | boiler        | 🔢  | kWh     |     | Insgesamt **erzeugte** Wärmeenergie für **Kühlung**                                                      |
| [nrgsupppool](http://ems-esp/api/boiler/nrgsupppool)                             | gesamte Energieabgabe Pool                | boiler        | 🔢  | kWh     |     | -- vermutlich nicht relevant --                                                                          |
| [nrgconstotal](http://ems-esp/api/boiler/nrgconstotal)                           | Gesamtenergieverbrauch                    | boiler        | 🔢  | kWh     |     | Insgesamt **eingesetzte** elektrische Energie für **Heizung und Warmwasser**                             |
| [nrgconscomptotal](http://ems-esp/api/boiler/nrgconscomptotal)                   | Gesamtenergieverbrauch Kompressor         | boiler        | 🔢  | kWh     |     | Insgesamt **eingesetzte** elektrische Energie der **Wärmepumpe** für **Heizung, Kühlung und Warmwasser** |
| [nrgconscompheating](http://ems-esp/api/boiler/nrgconscompheating)               | Energieverbrauch Kompressor heizen        | boiler        | 🔢  | kWh     |     | Insgesamt **eingesetzte** elektrische Energie der **Wärmepumpe** für **Heizung**                         |
| [nrgconscomp](http://ems-esp/api/boiler/nrgconscomp)                             | WWK Energieverbrauch Kompressor           | boiler<br>dhw | 🔢  | kWh     |     | Insgesamt **eingesetzte** elektrische Energie der **Wärmepumpe** für **Warmwasser**                      |
| [nrgconscompcooling](http://ems-esp/api/boiler/nrgconscompcooling)               | Energieverbrauch Kompressor kühlen        | boiler        | 🔢  | kWh     |     | Insgesamt **eingesetzte** elektrische Energie der **Wärmepumpe** für **Kühlung**                         |
| [nrgconscomppool](http://ems-esp/api/boiler/nrgconscomppool)                     | Energieverbrauch Kompressor Pool          | boiler        | 🔢  | kWh     |     | -- vermutlich nicht relevant --                                                                          |
| [auxelecheatnrgconstotal](http://ems-esp/api/boiler/auxelecheatnrgconstotal)     | Energieverbrauch el. Zusatzheizung        | boiler        | 🔢  | kWh     |     | Insgesamt **eingesetzte** elektrische Energie des **Zuheizers** für **Heizung und Warmwasser**           |
| [auxelecheatnrgconsheating](http://ems-esp/api/boiler/auxelecheatnrgconsheating) | Energieverbrauch el. Zusatzheizung Heizen | boiler        | 🔢  | kWh     |     | Insgesamt **eingesetzte** elektrische Energie des **Zuheizers** für **Heizung**                          |
| [auxelecheatnrgcons](http://ems-esp/api/boiler/auxelecheatnrgcons)               | WWK Energieverbrauch el. Zusatzheizung    | boiler<br>dhw | 🔢  | kWh     |     | Insgesamt **eingesetzte** elektrische Energie des **Zuheizers** für **Warmwasser**                       |
| [auxelecheatnrgconspool](http://ems-esp/api/boiler/auxelecheatnrgconspool)       | Energieverbrauch el. Zusatzheizung Pool   | boiler        | 🔢  | kWh     |     | -- vermutlich nicht relevant --                                                                          |

### Leistung

| ID                                                   | Name                    | Modul  | Typ | Einheit | RW  | Beschreibung                                                                                             |
| ---------------------------------------------------- | ----------------------- | ------ | --- | ------- | --- | -------------------------------------------------------------------------------------------------------- |
| [hppower](http://ems-esp/api/boiler/hppower)         | Kompressorleistung      | boiler | 🔢  | kW      |     | Aktuelle Leistungsaufnahme der Wärmepumpe mit einer Nachkommastelle, z.B. 0,3 kW (Achtung: sehr ungenau) |
| [hpcurrpower](http://ems-esp/api/boiler/hpcurrpower) | akt. Kompressorleistung | boiler | 🔢  | W       |     | Aktuelle Leistungsaufnahme der Wärmepumpe, z.B. 298 W                                                    |

## Temperaturen

### Wärmepumpe & Heizung

#### Messwerte

| ID                                                                   | Name                               | Modul             | Typ | Einheit | RW  | Beschreibung                                                                                                            |
| -------------------------------------------------------------------- | ---------------------------------- | ----------------- | --- | ------- | --- | ----------------------------------------------------------------------------------------------------------------------- |
| [outdoortemp](http://ems-esp/api/boiler/outdoortemp)                 | Außentemperatur                    | boiler            | 🔢  | °C      |     | Außentemperatur gemessen durch Außenthermometer                                                                         |
| [dampedoutdoortemp](http://ems-esp/api/thermostat/dampedoutdoortemp) | Gedämpfte Außentemperatur          | thermostat        | 🔢  | °C      |     | [Gedämpfte Außentemperatur](/docs/einstellungen/#d%C3%A4mpfung-der-au%C3%9Fentemperatur) - siehe auch _damping_         |
| [curflowtemp](http://ems-esp/api/boiler/curflowtemp)                 | Aktuelle Vorlauftemperatur         | boiler            | 🔢  | °C      |     | Vorlauftemperatur nach Pufferspeicher (T0)                                                                              |
| [rettemp](http://ems-esp/api/boiler/rettemp)                         | Rücklauftemperatur                 | boiler            | 🔢  | °C      |     | Rücklauftemperatur des Primärkreises beim Verlassen der Inneneinheit - identisch zu _hptc0_                             |
| [hptc0](http://ems-esp/api/boiler/hptc0)                             | Kältemittelrücklauf (TC0)          | boiler            | 🔢  | °C      |     | Rücklauftemperatur des Primärkreises beim Verlassen der Inneneinheit                                                    |
| [hptc1](http://ems-esp/api/boiler/hptc1)                             | Kältemittelvorlauf (TC1)           | boiler            | 🔢  | °C      |     | Vorlauftemperatur des Primärkreises beim Eintritt in die Inneneinheit                                                   |
| [hptc3](http://ems-esp/api/boiler/hptc3)                             | Kondensatortemperatur (TC3)        | boiler            | 🔢  | °C      |     | Temperatur des Kältemittels beim Eintritt in den Verflüssiger                                                           |
| [hptr1](http://ems-esp/api/boiler/hptr1)                             | Kompressortemperatur (TR1)         | boiler            | 🔢  | °C      |     | Temperatur des Kältemittels im Kompressor                                                                               |
| [hptr3](http://ems-esp/api/boiler/hptr3)                             | Kältemittel (flüssig) (TR3)        | boiler            | 🔢  | °C      |     | Temperatur des Kältemittels beim Verlassen des Verflüssigers                                                            |
| [hptr4](http://ems-esp/api/boiler/hptr4)                             | Verdampfereingang (TR4)            | boiler            | 🔢  | °C      |     | Temperatur des Kältemittels nach dem Expansionsventils                                                                  |
| [hptr5](http://ems-esp/api/boiler/hptr5)                             | Kompressoreingang (TR5)            | boiler            | 🔢  | °C      |     | Temperatur Sauggas                                                                                                      |
| [hptr6](http://ems-esp/api/boiler/hptr6)                             | Kompressorausgang (TR6)            | boiler            | 🔢  | °C      |     | Temperatur Heißgas                                                                                                      |
| [hptl2](http://ems-esp/api/boiler/hptl2)                             | Außenlufteintrittstemperatur (TL2) | boiler            | 🔢  | °C      |     | Lufttemperatur am Verdampfereingang                                                                                     |
| [hppl1](http://ems-esp/api/boiler/hppl1)                             | Niederdrucktemperatur (PL1)        | boiler            | 🔢  | °C      |     | Niederdrucktemperatur - identisch zu _hptr4_                                                                            |
| [hpph1](http://ems-esp/api/boiler/hpph1)                             | Hochdrucktemperatur (PH1)          | boiler            | 🔢  | °C      |     | Hochdrucktemperatur - identisch zu _curflowtemp_                                                                        |
| [hpta4](http://ems-esp/api/boiler/hpta4)                             | Kondensatorwanne (TA4)             | boiler            | 🔢  | °C      |     | Temperatur an der Kondensatwanne                                                                                        |
| [targetflowtemp](http://ems-esp/api/thermostat/targetflowtemp)       | HK1 berechnete Vorlauftemperatur   | thermostat<br>hc1 | 🔢  | °C      |     | Die von der Anlage bestimmte Sollvorlauftemperatur (bei PV-Überschuss _targetflowtemp_ = _selflowtemp_ + _pvraiseheat_) |

#### Einstellungen

| ID                                                       | Name                          | Modul             | Typ | Einheit | RW  | Beschreibung                                                                     |
| -------------------------------------------------------- | ----------------------------- | ----------------- | --- | ------- | --- | -------------------------------------------------------------------------------- |
| [selflowtemp](http://ems-esp/api/boiler/selflowtemp)     | Gewählte Vorlauftemperatur    | boiler            | 🔢  | °C      | ✔   | Sollvorlauftemperatur ohne Anhebung durch Energiemanager/PV                      |
| [heatingtemp](http://ems-esp/api/boiler/heatingtemp)     | Heiztemperatur                | boiler            | 🔢  | °C      | ✔   | Maximaler mögliche Vorlauftemperatur, z.B. 75°C bei CS6800i                      |
| [tempdiffheat](http://ems-esp/api/boiler/tempdiffheat)   | Temp.diff. TC3/TC0 Heizen     | boiler            | 🔢  | K       | ✔   | Solltemperaturdifferenz zw. Vor- und Rücklauf des Primärkreises beim Heizen      |
| [tempdiffcool](http://ems-esp/api/boiler/tempdiffcool)   | Temp.diff. TC3/TC0 Kühlen     | boiler            | 🔢  | K       | ✔   | Solltemperaturdifferenz zw. Vor- und Rücklauf des Primärkreises beim Kühlen      |
| [intoffset](http://ems-esp/api/thermostat/intoffset)     | Korrektur interner Temperatur | thermostat        | 🔢  | °C      | ✔   | Temperaturdifferenz, um die die Raumsolltemperatur korrigiert werden soll        |
| [minexttemp](http://ems-esp/api/thermostat/minexttemp)   | Min. Außentemperatur          | thermostat        | 🔢  | °C      | ✔   | [Normaußentemperatur](/docs/einstellungen/#normaußentemperatur)                  |
| [summertemp](http://ems-esp/api/thermostat/summertemp)   | HK1 Sommertemperatur          | thermostat<br>hc1 | 🔢  | °C      | ✔   | [Heizgrenze](/docs/einstellungen/#heizgrenze)                                    |
| [designtemp](http://ems-esp/api/thermostat/designtemp)   | HK1 Auslegungstemperatur      | thermostat<br>hc1 | 🔢  | °C      | ✔   | [Vorlauftemperatur an der NAT](/docs/einstellungen/#vorlauftemperatur-nat)       |
| [offsettemp](http://ems-esp/api/thermostat/offsettemp)   | HK1 Temperaturanhebung        | thermostat<br>hc1 | 🔢  | °C      | ✔   | Wert, um den die Vorlauftemperatur manuell angehoben werden kann                 |
| [seltemp](http://ems-esp/api/thermostat/seltemp)         | HK1 gewählte Raumtemperatur   | thermostat<br>hc1 | 🔢  | °C      | ✔   | Gewünschte Raumtemperatur                                                        |
| [manualtemp](http://ems-esp/api/thermostat/manualtemp)   | HK1 manuelle Temperatur       | thermostat<br>hc1 | 🔢  | °C      | ✔   | Manuell eingestellte Raumtemperatur - identisch zu _seltemp_ wenn _mode=Manuell_ |
| [minflowtemp](http://ems-esp/api/thermostat/minflowtemp) | HK1 min. Vorlauftemperatur    | thermostat<br>hc1 | 🔢  | °C      | ✔   | Minimale Vorlauftemperatur                                                       |
| [maxflowtemp](http://ems-esp/api/thermostat/maxflowtemp) | HK1 max. Vorlauftemperatur    | thermostat<br>hc1 | 🔢  | °C      | ✔   | Maximale Vorlauftemperatur                                                       |

### Warmwasser

#### Messwerte

| ID                                             | Name                            | Modul         | Typ | Einheit | RW  | Beschreibung                                                                                  |
| ---------------------------------------------- | ------------------------------- | ------------- | --- | ------- | --- | --------------------------------------------------------------------------------------------- |
| [settemp](http://ems-esp/api/boiler/settemp)   | WWK Solltemperatur              | boiler<br>dhw | 🔢  | °C      |     | Aktuelle Stopptemperatur im gerade aktiven Warmwassermodus                                    |
| [curtemp](http://ems-esp/api/boiler/curtemp)   | WWK aktuelle interne Temperatur | boiler<br>dhw | 🔢  | °C      |     | Aktuell gemessene Warmwassertemperatur im Warmwasserspeicher (oberer Messpunkt, wenn verbaut) |
| [curtemp2](http://ems-esp/api/boiler/curtemp2) | WWK aktuelle externe Temperatur | boiler<br>dhw | 🔢  | °C      |     | Aktuell gemessene Warmwassertemperatur im Warmwasserspeicher                                  |
| [hptw1](http://ems-esp/api/boiler/hptw1)       | DHW Reservoir (TW1)             | boiler        | 🔢  | °C      |     | Aktuell gemessene Warmwassertemperatur im Warmwasserspeicher (unterer Messpunkt)              |

#### Einstellungen

Siehe auch [Warmwassereinstellungen](/docs/einstellungen/#warmwasseraufbereitung)

| ID                                                             | Name                              | Modul         | Typ | Einheit | RW  | Beschreibung                                                                      |
| -------------------------------------------------------------- | --------------------------------- | ------------- | --- | ------- | --- | --------------------------------------------------------------------------------- |
| [comfdiff](http://ems-esp/api/boiler/comfdiff)                 | WWK Komfort Differenztemp.        | boiler<br>dhw | 🔢  | K       | ✔   | Ladedelta im Komfort Modus, mit dem die Vorlauftemperatur angehoben wird          |
| [ecodiff](http://ems-esp/api/boiler/ecodiff)                   | WWK ECO Differenztemp.            | boiler<br>dhw | 🔢  | K       | ✔   | Ladedelta im Eco Modus, mit dem die Vorlauftemperatur angehoben wird              |
| [ecoplusdiff](http://ems-esp/api/boiler/ecoplusdiff)           | WWK ECO+ Differenztemp.           | boiler<br>dhw | 🔢  | K       | ✔   | Ladedelta im Eco+ Modus, mit dem die Vorlauftemperatur angehoben wird             |
| [comfstop](http://ems-esp/api/boiler/comfstop)                 | WWK Komfort Stopptemp.            | boiler<br>dhw | 🔢  | °C      | ✔   | Stopptemperatur im Komfort Modus, an der die Warmwasseraufbereitung beendet wird  |
| [ecostop](http://ems-esp/api/boiler/ecostop)                   | WWK ECO Stopptemp.                | boiler<br>dhw | 🔢  | °C      | ✔   | Stopptemperatur im Eco Modus, an der die Warmwasseraufbereitung beendet wird      |
| [ecoplusstop](http://ems-esp/api/boiler/ecoplusstop)           | WWK ECO+ Stopptemp.               | boiler<br>dhw | 🔢  | °C      | ✔   | Stopptemperatur im Eco+ Modus, an der die Warmwasseraufbereitung beendet wird     |
| [seltempsingle](http://ems-esp/api/boiler/seltempsingle)       | WWK Einmalladungstemperatur       | boiler<br>dhw | 🔢  | °C      | ✔   | Stopptemperatur für Extra-WW                                                      |
| [disinfectiontemp](http://ems-esp/api/boiler/disinfectiontemp) | WWK Desinfektionstemperatur       | boiler<br>dhw | 🔢  | °C      | ✔   | Stopptemperatur für die Warmwasserdesinfektion                                    |
| [seltemp](http://ems-esp/api/boiler/seltemp)                   | WWK gewählte Temperatur           | boiler<br>dhw | 🔢  | °C      | ✔   | Starttemperatur im Komfort Modus, an der die Warmwasseraufbereitung begonnen wird |
| [seltemplow](http://ems-esp/api/boiler/seltemplow)             | WWK ausgewählte untere Temperatur | boiler<br>dhw | 🔢  | °C      | ✔   | Starttemperatur im Eco Modus, an der die Warmwasseraufbereitung begonnen wird     |
| [tempecoplus](http://ems-esp/api/boiler/tempecoplus)           | WWK ausgewählte ECO+ Temperatur   | boiler<br>dhw | 🔢  | °C      | ✔   | Starttemperatur im Eco+ Modus, bei der die Warmwasseraufbereitung begonnen wird   |

## Pumpen

| ID                                                         | Name                            | Modul         | Typ  | Einheit | RW  | Beschreibung                                                                                       |
| ---------------------------------------------------------- | ------------------------------- | ------------- | ---- | ------- | --- | -------------------------------------------------------------------------------------------------- |
| [heatingpump](http://ems-esp/api/boiler/heatingpump)       | Heizungspumpe                   | boiler        | ☑    |         |     | AN wenn die Primärkreispumpe PC0 läuft                                                             |
| [hpcircspd](http://ems-esp/api/boiler/hpcircspd)           | Zirkulationspumpendrehzahl      | boiler        | 🔢   | %       |     | Aktuelle Modulation der Primärkreispumpe PC0 - identisch zu _heatingpumpmod_                       |
| [heatingpumpmod](http://ems-esp/api/boiler/heatingpumpmod) | Modulation Heizungspumpe        | boiler        | 🔢   | %       |     | Prozentuale Leistung der Primärkreispumpe PC0                                                      |
| [pc0flow](http://ems-esp/api/boiler/pc0flow)               | Durchfluss PC0                  | boiler        | 🔢   | l/h     |     | Durchflussmenge/Volumenstrom der Primärkreispumpe PC0 (leider kein Wert bei niedrigerer Leistung ) |
| [pc1flow](http://ems-esp/api/boiler/pc1flow)               | Durchfluss PC1                  | boiler        | 🔢   | l/h     |     | Durchflussmenge/Volumenstrom der Heizkreispumpe PC1                                                |
| [pc1on](http://ems-esp/api/boiler/pc1on)                   | PC1                             | boiler        | ☑    |         |     | AN wenn die Heizkreispumpe PC1 läuft                                                               |
| [hpsetdiffpress](http://ems-esp/api/boiler/hpsetdiffpress) | Pumpensolldruck                 | boiler        | 🔢   | mbar    | ✔   | Solldruck der Heizkreispumpe PC1                                                                   |
| [circpump](http://ems-esp/api/boiler/circpump)             | WWK Zirkulationspumpe vorhanden | boiler<br>dhw | ☑    |         | ✔   | AN wenn die WW-Zikulationspumpe über die Anlage gesteuert werden soll                              |
| [circmode](http://ems-esp/api/boiler/circmode)             | WWK Zirkulationspumpenmodus     | boiler<br>dhw | enum |         | ✔   | Einstellung der Laufhäufigkeit, z.B. 3x3min je Stunde                                              |
| [circ](http://ems-esp/api/boiler/circ)                     | WWK Zirkulation aktiv           | boiler<br>dhw | ☑    |         | ✔   | AN wenn die WW-Zirkulationspumpe gerade läuft                                                      |

## Status

| ID                                                                 | Name                         | Modul             | Typ  | Einheit | RW  | Beschreibung                                                                                                  |
| ------------------------------------------------------------------ | ---------------------------- | ----------------- | ---- | ------- | --- | ------------------------------------------------------------------------------------------------------------- |
| [heatingactive](http://ems-esp/api/boiler/heatingactive)           | Heizen aktiv                 | boiler            | ☑    |         |     | AN wenn die Anlage gerade im Heizbetrieb ist                                                                  |
| [tapwateractive](http://ems-esp/api/boiler/tapwateractive)         | Warmwasser aktiv             | boiler            | ☑    |         |     | AN wenn die Anlage gerade im Warmwasserbetrieb ist                                                            |
| [curburnpow](http://ems-esp/api/boiler/curburnpow)                 | Aktuelle Brennerleistung     | boiler            | 🔢   | %       |     | Aktuelle Modulation (relative Leistung) des Kompressors - identisch zu _hpcompspd_                            |
| [hpcompspd](http://ems-esp/api/boiler/hpcompspd)                   | Kompressordrehzahl           | boiler            | 🔢   | %       |     | Aktuelle Modulation (relative Leistung) des Kompressors                                                       |
| [hpcompon](http://ems-esp/api/boiler/hpcompon)                     | WP Kompressor                | boiler            | ☑    |         |     | AN wenn der Kompressor gerade läuft                                                                           |
| [hpactivity](http://ems-esp/api/boiler/hpactivity)                 | Kompressoraktivität          | boiler            | enum |         |     | Aktuelle Aktivität des Kompressors: "keine", "Heizen", "Kühlen", "Warmwasser", "Pool", "Unbekannt", "Abtauen" |
| [hp4way](http://ems-esp/api/boiler/hp4way)                         | 4-Wege-Ventil (VR4)          | boiler            | enum |         |     | Aktuelle Stellung des 4-Wege-Ventils im Kältekreis: "Kühlen & Abtauen" oder "Heizen & Warmwasser"             |
| [hpea0](http://ems-esp/api/boiler/hpea0)                           | Heizung Kondensatwanne (EA0) | boiler            | ☑    |         |     | AN wenn die Kondensatwannenheizung gerade aktiv ist                                                           |
| [syspress](http://ems-esp/api/boiler/syspress)                     | Systemdruck                  | boiler            | 🔢   | bar     |     | Wasserdruck im Heizkreis                                                                                      |
| [charging](http://ems-esp/api/boiler/charging)                     | WWK Laden                    | boiler<br>dhw     | ☑    |         |     | AN bei Warmwasserbetrieb, ansonsten AUS                                                                       |
| [3wayvalve](http://ems-esp/api/boiler/3wayvalve)                   | WWK 3-Wege-Ventil aktiv      | boiler<br>dhw     | ☑    |         |     | AN bei Warmwasserbetrieb, ansonsten AUS - identisch zu RWem _hp3way_                                          |
| [auxheaterstatus](http://ems-esp/api/boiler/auxheaterstatus)       | Zusatzheizerstatus           | boiler            | 🔢   | %       |     | Aktuelle relative Leistung des Zuheizers                                                                      |
| [hpoperatingstate](http://ems-esp/api/thermostat/hpoperatingstate) | HK1 WP Betriebszustand       | thermostat<br>hc1 | enum |         |     | Ausgewählter Betriebszustand (z.B. durch auto. Sommer/Winterumschaltung): "Heizen"\|"aus"\|"Kühlen"           |

## Einstellungen

| ID                                                             | Name                            | Modul             | Typ  | Einheit | RW  | Beschreibung                                                                                                                                                         |
| -------------------------------------------------------------- | ------------------------------- | ----------------- | ---- | ------- | --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [heatingactivated](http://ems-esp/api/boiler/heatingactivated) | Heizbetrieb aktiviert           | boiler            | ☑    |         | ✔   | AN wenn die Anlage für den Heizbetrieb genutzt werden soll                                                                                                           |
| [activated](http://ems-esp/api/boiler/activated)               | WWK aktiviert                   | boiler<br>dhw     | ☑    |         | ✔   | AN wenn die Anlage für Warmwasseraufbereitung genutzt werden soll                                                                                                    |
| [alternatingop](http://ems-esp/api/boiler/alternatingop)       | WWK Wechselbetrieb              | boiler<br>dhw     | ☑    |         | ✔   | AN wenn der Heizbetrieb für den Warmwasserbetrieb unterbrochen werden kann und umgekehrt                                                                             |
| [altopprioheat](http://ems-esp/api/boiler/altopprioheat)       | WWK Heizen bevorzugt vor WW     | boiler<br>dhw     | 🔢   | Minuten | ✔   | Max. Dauer im Warmwasserbetrieb bis in den Heizbetrieb gewechselt wird                                                                                               |
| [altopprio](http://ems-esp/api/boiler/altopprio)               | WWK bevorzugt vor Heizen        | boiler<br>dhw     | 🔢   | Minuten | ✔   | Max. Dauer im Heizbetrieb bis in den Warmwasserbetrieb gewechselt wird                                                                                               |
| [hp3way](http://ems-esp/api/boiler/hp3way)                     | 3-Wege-Ventil                   | boiler            | ☑    |         | ✔   | Stellung des 3-Wege-Ventils: AN bei Warmwasserbetrieb, ansonsten AUS (identisch zu _3wayvalve_ aber schreibar)                                                       |
| [datetime](http://ems-esp/api/thermostat/datetime)             | Datum/Zeit                      | thermostat        | 🔠   |         | ✔   | Aktuelles Datum und Uhrzeit                                                                                                                                          |
| [damping](http://ems-esp/api/thermostat/damping)               | Dämpfung der Außentemperatur    | thermostat        | ☑    |         | ✔   | AN wenn Außentemperatur [gedämpft](/docs/einstellungen/#d%C3%A4mpfung-der-au%C3%9Fentemperatur) werden soll - Trägheit über _building_ einstellbar                   |
| [building](http://ems-esp/api/thermostat/building)             | Gebäudetyp                      | thermostat        | enum |         | ✔   | Stärke der [Außentemperaturdämpfung](/docs/einstellungen/#d%C3%A4mpfung-der-au%C3%9Fentemperatur): ["Leicht"\| "Mittel"\|"Schwer"] - (De-)aktivierung über _damping_ |
| [mode](http://ems-esp/api/thermostat/mode)                     | HK1 Betriebsart                 | thermostat<br>hc1 | enum |         | ✔   | [Raumtemperatur-Modus](/docs/einstellungen/#raumtemperatur): ["aus"\|"Manuell"\|"auto"]                                                                              |
| [heatingtype](http://ems-esp/api/thermostat/heatingtype)       | HK1 Heizungstyp                 | thermostat<br>hc1 | enum |         | ✔   | Art der Beheizung: ["aus"\|"Heizkörper"\|"Konvektor"\|"Fussboden"]                                                                                                   |
| [hpmode](http://ems-esp/api/thermostat/hpmode)                 | HK1 WP-Modus                    | thermostat<br>hc1 | enum |         | ✔   | Erlaubte Betriebszustände: ["Heizen"\|"Kühlen"\|"Heizen & Kühlen"]                                                                                                   |
| [heatondelay](http://ems-esp/api/thermostat/heatondelay)       | HK1 Einschaltverzögerung Heizen | thermostat<br>hc1 | 🔢   | Stunden | ✔   | [Heizbetriebsverzögerung](/docs/einstellungen/#heizgrenze) der auto. Sommer/Winter-Umschaltung                                                                       |
| [heatoffdelay](http://ems-esp/api/thermostat/heatoffdelay)     | HK1 Ausschaltverzögerung Heizen | thermostat<br>hc1 | 🔢   | Stunden | ✔   | [Sommerbetriebsverzögerung](/docs/einstellungen/#heizgrenze) der auto. Sommer/Winter-Umschaltung                                                                     |
| [instantstart](http://ems-esp/api/thermostat/instantstart)     | HK1 Sofortstart                 | thermostat<br>hc1 | 🔢   | K       | ✔   | [Temp-Differenz für den Sofortstart](/docs/einstellungen/#heizgrenze) der auto. Sommer/Winter-Umschaltung                                                            |

### Photovoltaik

| ID                                                       | Name                       | Modul      | Typ | Einheit | RW  | Beschreibung                                     |
| -------------------------------------------------------- | -------------------------- | ---------- | --- | ------- | --- | ------------------------------------------------ |
| [pvraiseheat](http://ems-esp/api/thermostat/pvraiseheat) | Anhebung Heizen mit PV     | thermostat | 🔢  | K       | ✔   | Anhebung der Raumtemperatur bei PV-Überschuss    |
| [pvlowercool](http://ems-esp/api/thermostat/pvlowercool) | Absenkung Kühlen mit PV    | thermostat | 🔢  | K       | ✔   | Absenkung der Raumtemperatur bei PV-Überschuss   |
| [pvmaxcomp](http://ems-esp/api/boiler/pvmaxcomp)         | PV max. Kompressorleistung | boiler     | 🔢  | kW      | ✔   | Max. Kompressorleistung bei PV-Überschuss        |
| [pvcooling](http://ems-esp/api/boiler/pvcooling)         | Kühlen nur mit PV          | boiler     | ☑   |         | ✔   | Kühlbetrieb wird nur bei PV-Überschuss aktiviert |
| [pvenabledhw](http://ems-esp/api/thermostat/pvenabledhw) | aktiviere WW-Anhebung      | thermostat | ☑   |         | ✔   | Anhebung der WW-Temperatur bei PV-Überschuss     |

### Elektrischer Zuheizer

| ID                                                         | Name                          | Modul         | Typ  | Einheit | RW  | Beschreibung                                                                                                                                                  |
| ---------------------------------------------------------- | ----------------------------- | ------------- | ---- | ------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [maxheatcomp](http://ems-esp/api/boiler/mayheatcomp)       | Heizstab Limit mit Kompressor | boiler        | enum |         | ✔   | [Max. Leistung des Zuheizers mit Kompressor](/docs/einstellungen/#begrenzung-mit-kompressor) [0kW\|3kW\|6kW\|9kW]                                             |
| [maxheatheat](http://ems-esp/api/boiler/maxheatheat)       | Heizstab Limit Leistung       | boiler        | enum |         | ✔   | [Max. Leistung des Zuheizers ohne Kompressor](/docs/einstellungen/#begrenzung-ohne-kompressor) [0kW\|3kW\|6kW\|9kW]                                           |
| [maxheat](http://ems-esp/api/boiler/maxheat)               | WWK Heizstab Limit für WW     | boiler<br>dhw | enum |         | ✔   | [Max. Leistung des Zuheizers im Warmwasserbetrieb](https://bosch-buderus-wp.github.io/docs/einstellungen/#begrenzung-im-ww-betrieb) [0kW\|3kW\|6kW\|9kW]      |
| [elheatstep1](http://ems-esp/api/boiler/elheatstep1)       | El. Heizer Stufe 1            | boiler        | ☑    |         | ✔   | AN wenn die erste Stufe (3kW) des elektischen Zuheizers aktuell läuft                                                                                         |
| [elheatstep2](http://ems-esp/api/boiler/elheatstep2)       | El. Heizer Stufe 2            | boiler        | ☑    |         | ✔   | AN wenn die erste Stufe (6kW) des elektischen Zuheizers aktuell läuft                                                                                         |
| [elheatstep3](http://ems-esp/api/boiler/elheatstep3)       | El. Heizer Stufe 3            | boiler        | ☑    |         | ✔   | AN wenn die erste Stufe (9kW) des elektischen Zuheizers aktuell läuft                                                                                         |
| [auxheateronly](http://ems-esp/api/boiler/auxheateronly)   | nur Zusatzheizer              | boiler        | ☑    |         | ✔   | AN wenn Heiz- und Warmwasserbetrieb ausschließlich über den Zuheizer erfolgt                                                                                  |
| [auxheateroff](http://ems-esp/api/boiler/auxheateroff)     | Zusatzheizer deaktivieren     | boiler        | ☑    |         | ✔   | AN wenn der [Zuheizer deaktiviert](/docs/einstellungen/#zuheizersperre) ist                                                                                   |
| [auxheaterdelay](http://ems-esp/api/boiler/auxheaterdelay) | Zusatzheizer verzögert ein    | boiler        | 🔢   | K\*min  | ✔   | [Verzögerung](/docs/einstellungen/#verz%C3%B6gerung-heizung) als Produkt aus Unterschreitung der Solltemperatur und Dauer, bis der Zuheizer zugeschaltet wird |
| [auxmaxlimit](http://ems-esp/api/boiler/auxmaxlimit)       | Zusatzheizer max. Grenze      | boiler        | 🔢   | K       | ✔   | Temperaturdifferenz unterhalb der max. Vorlauftemperatur, ab der der Zuheizer gesperrt wird                                                                   |
| [tempparmode](http://ems-esp/api/boiler/tempparmode)       | Heizstab Parallelbetrieb      | boiler        | 🔢   | °C      | ✔   | [Bivalenzpunkt](/docs/einstellungen/#bivalpkt-parallelbetr), ab der der Zuheizer zu-/abgeschaltet wird                                                        |

### Silentmode

| ID                                                       | Name                                 | Modul  | Typ  | Einheit | RW  | Beschreibung                                                                      |
| -------------------------------------------------------- | ------------------------------------ | ------ | ---- | ------- | --- | --------------------------------------------------------------------------------- |
| [silentmode](http://ems-esp/api/boiler/silentmode)       | Silentmodus                          | boiler | enum |         | ✔   | Silentmodus: ["aus"\|"auto"\|"an"]                                                |
| [mintempsilent](http://ems-esp/api/boiler/mintempsilent) | Minimale Außentemperatur Silentmodus | boiler | 🔢   | °C      | ✔   | Min. Temperatur, ab der der Silentmodus in der Auto-Einstellung abgeschaltet wird |

## Statistiken

### Betriebszeiten

Die Anlage kann im Heizbetrieb, im Kühlbetrieb, im Warmwasserbetrieb oder im Standby sein.

| ID                                                               | Name                           | Modul         | Typ | Einheit | RW  | Beschreibung                                                                              |
| ---------------------------------------------------------------- | ------------------------------ | ------------- | --- | ------- | --- | ----------------------------------------------------------------------------------------- |
| [ubauptime](http://ems-esp/api/boiler/ubauptime)                 | Anlagengesamtlaufzeit          | boiler        | 🔢  | Minuten |     | ???                                                                                       |
| [uptimetotal](http://ems-esp/api/boiler/uptimetotal)             | Gesamtbetriebszeit Wärmepumpe  | boiler        | 🔢  | Minuten |     | Gesamte Laufzeit der Anlage, inkl. Standby                                                |
| [uptimecontrol](http://ems-esp/api/boiler/uptimecontrol)         | Gesamtbetriebszeit Heizen      | boiler        | 🔢  | Minuten |     | Gesamte Betriebszeit der Anlage im **Heiz-, Kühl- oder Warmwasserbetrieb** (ohne Standby) |
| [uptimecompheating](http://ems-esp/api/boiler/uptimecompheating) | Betriebszeit Kompressor heizen | boiler        | 🔢  | Minuten |     | Gesamte Betriebszeit der Anlage im **Heizbetrieb** (ohne Standby)                         |
| [uptimecompcooling](http://ems-esp/api/boiler/uptimecompcooling) | Betriebszeit Kompressor kühlen | boiler        | 🔢  | Minuten |     | Gesamte Betriebszeit der Anlage im **Kühlbetrieb** (ohne Standby)                         |
| [uptimecomp](http://ems-esp/api/boiler/uptimecomp)               | WWK Betriebszeit Kompressor    | boiler<br>dhw | 🔢  | Minuten |     | Gesamte Betriebszeit der Anlage im **Warmwasserbetrieb** (ohne Standby)                   |
| [uptimecomppool](http://ems-esp/api/boiler/uptimecomppool)       | Betriebszeit Kompressor Pool   | boiler        | 🔢  | Minuten |     | -- vermutlich nicht relevant --                                                           |

### Kompressorstarts

| ID                                                           | Name                      | Modul         | Typ | Einheit | RW  | Beschreibung                                      |
| ------------------------------------------------------------ | ------------------------- | ------------- | --- | ------- | --- | ------------------------------------------------- |
| [totalcompstarts](http://ems-esp/api/boiler/totalcompstarts) | Gesamtkompressorstarts    | boiler        | 🔢  |         |     | Gesamte Anzahl der Kompressorstarts               |
| [heatingstarts](http://ems-esp/api/boiler/heatingstarts)     | Heizungsregelungstarts    | boiler        | 🔢  |         |     | Anzahl der Kompressorstarts für Heizbetrieb       |
| [coolingstarts](http://ems-esp/api/boiler/coolingstarts)     | Kühlregelungstarts        | boiler        | 🔢  |         |     | Anzahl der Kompressorstarts für Kühlbetrieb       |
| [starts2](http://ems-esp/api/boiler/starts2)                 | WWK Anzahl Starts Kreis 2 | boiler<br>dhw | 🔢  |         |     | Anzahl der Kompressorstarts für Warmwasserbetrieb |
| [poolstarts](http://ems-esp/api/boiler/poolstarts)           | Poolsteuerungstarts       | boiler        | 🔢  |         |     | -- vermutlich nicht relevant --                   |

## Eingänge

| Eingang 1 | Eingang 4 | Resultat                       |
| --------- | --------- | ------------------------------ |
| AN        | AUS       | EVU Sperrzeit                  |
| AUS       | AUS       | Normalbetrieb                  |
| AUS       | AN        | Verstärkter Betrieb            |
| AN        | AN        | Erzwungener verstärker Betrieb |

| ID                                             | Name                  | Modul  | Typ | Einheit | RW  | Beschreibung |
| ---------------------------------------------- | --------------------- | ------ | --- | ------- | --- | ------------ |
| [hpin1](http://ems-esp/api/boiler/hpin1)       | Status Eingang 1      | boiler | ☑   |         |     | AN oder AUS  |
| [hpin1opt](http://ems-esp/api/boiler/hpin1opt) | Einstellung Eingang 1 | boiler | 🔠  |         | ✔   |
| [hpin2](http://ems-esp/api/boiler/hpin2)       | Status Eingang 2      | boiler | ☑   |         |     | AN oder AUS  |
| [hpin2opt](http://ems-esp/api/boiler/hpin2opt) | Einstellung Eingang 2 | boiler | 🔠  |         | ✔   |
| [hpin3](http://ems-esp/api/boiler/hpin3)       | Status Eingang 3      | boiler | ☑   |         |     | AN oder AUS  |
| [hpin3opt](http://ems-esp/api/boiler/hpin3opt) | Einstellung Eingang 3 | boiler | 🔠  |         | ✔   |
| [hpin4](http://ems-esp/api/boiler/hpin4)       | Status Eingang 4      | boiler | ☑   |         |     | AN oder AUS  |
| [hpin4opt](http://ems-esp/api/boiler/hpin4opt) | Einstellung Eingang 4 | boiler | 🔠  |         | ✔   |

Siehe auch [Using the Smart Grid (SG) and Photovoltaic (PV) function of your heat pump with the EMS Gateways](https://bbqkees-electronics.nl/2024/10/03/using-the-smart-grid-sg-and-photovoltaic-pv-function-of-your-heat-pump-with-the-ems-gateways/)

## Kommandos

| ID                                                     | Name               | Modul         | Typ  | Einheit | RW  | Beschreibung                           |
| ------------------------------------------------------ | ------------------ | ------------- | ---- | ------- | --- | -------------------------------------- |
| [reset](http://ems-esp/api/boiler/reset)               | Reset              | boiler        | enum |         | ✔   | ?                                      |
| [heatingoff](http://ems-esp/api/boiler/heatingoff)     | Heizen abschalten  | boiler        | ☑    |         | ✔   | ?                                      |
| [shutdown](http://ems-esp/api/boiler/shutdown)         | Abschalten         | boiler        | enum |         | ✔   | ?                                      |
| [mandefrost](http://ems-esp/api/boiler/mandefrost)     | Manuelle Enteisung | boiler        | ☑    |         | ✔   | Abtauung wird gestartet                |
| [disinfecting](http://ems-esp/api/boiler/disinfecting) | WWK Desinfizieren  | boiler<br>dhw | ☑    |         | ✔   | Warmwwasserdesinfektion wird gestartet |
| [onetime](http://ems-esp/api/boiler/onetime)           | WWK Einmalladung   | boiler<br>dhw | ☑    |         | ✔   | Extra-WW wird gestartet                |

## Andere

<details>
  <summary>Weitere Entiäten, deren Bedeutung aktuell noch unklar ist</summary>
{% capture entities_boiler %}

| ID                                                                 | Name                                     | Modul          | Typ  | Einheit | RW  | Beschreibung |
| ------------------------------------------------------------------ | ---------------------------------------- | -------------- | ---- | ------- | --- | ------------ |
| [boiltemp](http://ems-esp/api/boiler/boiltemp)                     | Kesseltemperatur                         | boiler         | 🔢   | °C      |     | ---          |
| [pumpmode](http://ems-esp/api/boiler/pumpmode)                     | Kesselpumpenmodus                        | boiler         | enum |         | ✔   | ---          |
| [pumpmodmax](http://ems-esp/api/boiler/pumpmodmax)                 | Maximale Kesselpumpenleistung            | boiler         | 🔢   | %       | ✔   | Immer 0      |
| [pumpmodmin](http://ems-esp/api/boiler/pumpmodmin)                 | Minimale Kesselpumpenleistung            | boiler         | 🔢   | %       | ✔   | Immer 0      |
| [pumpcharacter](http://ems-esp/api/boiler/pumpcharacter)           | Charakteristik der Kesselpumpe           | boiler         | enum |         | ✔   | ---          |
| [pumpdelay](http://ems-esp/api/boiler/pumpdelay)                   | Pumpennachlaufzeit                       | boiler         | 🔢   | Minuten | ✔   | ---          |
| [pumpontemp](http://ems-esp/api/boiler/pumpontemp)                 | Pumpenlogiktemperatur                    | boiler         | 🔢   | °C      | ✔   | ---          |
| [switchtemp](http://ems-esp/api/boiler/switchtemp)                 | Mischerschalttemperatur                  | boiler         | 🔢   | °C      |     |
| [selburnpow](http://ems-esp/api/boiler/selburnpow)                 | Eingestellte maximale Brennerleistung    | boiler         | 🔢   | %       | ✔   | Immer 0      |
| [burnstarts](http://ems-esp/api/boiler/burnstarts)                 | Brennerstarts                            | boiler         | 🔢   |         |     | Immer 0      |
| [burnworkmin](http://ems-esp/api/boiler/burnworkmin)               | Brennerlaufzeit                          | boiler         | 🔢   | Minuten |     | Immer 0      |
| [burn2workmin](http://ems-esp/api/boiler/burn2workmin)             | Brennerlaufzeit Stufe 2                  | boiler         | 🔢   | Minuten |     | Immer 0      |
| [heatworkmin](http://ems-esp/api/boiler/heatworkmin)               | Heizlaufzeit                             | boiler         | 🔢   | Minuten |     | Immer 0      |
| [heatstarts](http://ems-esp/api/boiler/heatstarts)                 | Brennerstarts Heizen                     | boiler         | 🔢   |         |     | Immer 0      |
| [lastcode](http://ems-esp/api/boiler/lastcode)                     | Letzter Fehler                           | boiler         | 🔠   |         |     | ---          |
| [servicecode](http://ems-esp/api/boiler/servicecode)               | Statusmeldung                            | boiler         | 🔠   |         |     | ---          |
| [servicecodenumber](http://ems-esp/api/boiler/servicecodenumber)   | Statusmeldungsnummer                     | boiler         | 🔢   |         |     | ---          |
| [maintenancemessage](http://ems-esp/api/boiler/maitnenancemessage) | Wartungsmeldung                          | boiler         | 🔠   |         |     | ---          |
| [maintenance](http://ems-esp/api/boiler/maintenance)               | Wartungsplan                             | boiler         | enum |         | ✔   | ---          |
| [maintenancetime](http://ems-esp/api/boiler/maintenancetime)       | Wartung in                               | boiler         | 🔢   | Stunden | ✔   | ---          |
| [maintenancedate](http://ems-esp/api/boiler/maintenancedate)       | Wartungsdatum                            | boiler         | 🔠   |         | ✔   | ---          |
| [emergencyops](http://ems-esp/api/boiler/emergencyops)             | Notbetrieb                               | boiler         | ☑    |         | ✔   | ?            |
| [emergencytemp](http://ems-esp/api/boiler/emergencytemp)           | Notfalltemperatur                        | boiler         | 🔢   | °C      | ✔   | ?            |
| [hpmaxpower](http://ems-esp/api/boiler/hpmaxpower)                 | max. Kompressorleistung                  | boiler         | 🔢   | %       | ✔   | ---          |
| [powerreduction](http://ems-esp/api/boiler/powerreduction)         | Leistungsverringerung                    | boiler         | 🔢   | %       | ✔   | ---          |
| [hpbrinepumpspd](http://ems-esp/api/boiler/hpbrinepumpspd)         | Solepumpendrehzahl                       | boiler         | 🔢   | %       |     |
| [hpbrinein](http://ems-esp/api/boiler/hpbrinein)                   | Sole in/Verdampfer                       | boiler         | 🔢   | °C      |     |
| [hpbrineout](http://ems-esp/api/boiler/hpbrineout)                 | Sole aus/Kondensator                     | boiler         | 🔢   | °C      |     |
| [poolsettemp](http://ems-esp/api/boiler/poolsettemp)               | Sollwert Pooltemperatur                  | boiler         | 🔢   | °C      | ✔   |
| [auxlimitstart](http://ems-esp/api/boiler/auxlimitstart)           | Zusatzheizer Grenze Start                | boiler         | 🔢   | K       | ✔   |
| [auxheatrmode](http://ems-esp/api/boiler/auxheatrmode)             | Zusatzheizungsmodus                      | boiler         | enum |         | ✔   |
| [hphystheat](http://ems-esp/api/boiler/hphystheat)                 | Schalthysterese Heizen                   | boiler         | 🔢   | K\*min  | ✔   | ---          |
| [hphystcool](http://ems-esp/api/boiler/hphystcool)                 | Schalthysterese Kühlen                   | boiler         | 🔢   | K\*min  | ✔   | ---          |
| [hphystpool](http://ems-esp/api/boiler/hphystpool)                 | Schalthysterese Pool                     | boiler         | 🔢   | K\*min  | ✔   | ---          |
| [silentfrom](http://ems-esp/api/boiler/silentfrom)                 | Silentmodus Start                        | boiler         | 🔢   | Minuten | ✔   | ---          |
| [silentto](http://ems-esp/api/boiler/silentto)                     | Silentmodus Ende                         | boiler         | 🔢   | Minuten | ✔   | ---          |
| [auxheatmix](http://ems-esp/api/boiler/auxheatmix)                 | Mischventil Zusatzheizer                 | boiler         | 🔢   | %       |     |
| [vpcooling](http://ems-esp/api/boiler/vpcooling)                   | Ventil/Pumpe für Kühlen                  | boiler         | ☑    |         | ✔   |
| [heatcable](http://ems-esp/api/boiler/heatcable)                   | Heizband                                 | boiler         | ☑    |         | ✔   |
| [vc0valve](http://ems-esp/api/boiler/vc0valve)                     | VC0 Ventil                               | boiler         | ☑    |         | ✔   |
| [primepump](http://ems-esp/api/boiler/primepump)                   | Hauptpumpe                               | boiler         | ☑    |         | ✔   | Immer AUS    |
| [primepumpmod](http://ems-esp/api/boiler/primepumpmod)             | Modulation Hauptpumpe                    | boiler         | 🔢   | %       | ✔   | Immer 0      |
| [hppumpmode](http://ems-esp/api/boiler/hppumpmode)                 | primärer Wärmepumpenmodus                | boiler         | enum |         | ✔   | ---          |
| [fan](http://ems-esp/api/boiler/fan)                               | Lüfter                                   | boiler         | 🔢   | %       | ✔   | ---          |
| [hppowerlimit](http://ems-esp/api/boiler/hppowerlimit)             | Leistungsgrenze                          | boiler         | 🔢   | W       | ✔   | ---          |
| [pc1rate](http://ems-esp/api/boiler/pc1rate)                       | PC1 Rate                                 | boiler         | 🔢   | %       |     | Immer 0%     |
| [hptr7](http://ems-esp/api/boiler/hptr7)                           | Kältemittel (gasförmig) (TR7)            | boiler         | 🔢   | °C      |     |
| [comfoff](http://ems-esp/api/boiler/comfoff)                       | WWK Komfort Ausschalttemp.               | boiler<br>dhw  | 🔢   | °C      | ✔   | ---          |
| [ecooff](http://ems-esp/api/boiler/ecooff)                         | WWK ECO Ausschalttemp.                   | boiler<br>dhw  | 🔢   | °C      | ✔   | ---          |
| [ecoplusoff](http://ems-esp/api/boiler/ecoplusoff)                 | WWK ECO+ Ausschalttemp.                  | boiler<br>dhw  | 🔢   | °C      | ✔   | Immer 0      |
| [hpcircpump](http://ems-esp/api/boiler/hpcircpump)                 | WWK Zirkulation möglich bei WW-Bereitung | boiler<br>dhw  | ☑    |         | ✔   | ---          |
| [tapactivated](http://ems-esp/api/boiler/tapactivated)             | WWK Durchlauferhitzer aktiv              | boiler<br>dhw  | ☑    |         | ✔   | ---          |
| [seltempoff](http://ems-esp/api/boiler/seltempoff)                 | WWK ausgewählte Temperatur bei AUS       | boiler<br>dhw  | 🔢   | °C      |     | ---          |
| [solartemp](http://ems-esp/api/boiler/solartemp)                   | WWK Solarkesseltemperatur                | boiler<br>dhw  | 🔢   | °C      |     | ---          |
| [type](http://ems-esp/api/boiler/type)                             | WWK Typ                                  | boiler<br>dhw  | enum |         |     | ---          |
| [comfort](http://ems-esp/api/boiler/comfort)                       | WWK Komfort                              | boiler<br>dhw  | enum |         | ✔   | ---          |
| [comfort1](http://ems-esp/api/boiler/comfort1)                     | WWK Komfort-Modus                        | boiler<br>dhw  | enum |         | ✔   | ?            |
| [flowtempoffset](http://ems-esp/api/boiler/flowtempoffset)         | WWK Anhebung Vorlauftemperatur           | boiler<br>dhw  | 🔢   | °C      | ✔   | ?            |
| [chargeoptimization](http://ems-esp/api/boiler/chargeoptimization) | WWK Ladungsoptimierung                   | boiler<br>dhw  | ☑    |         | ✔   | ---          |
| [maxpower](http://ems-esp/api/boiler/maxpower)                     | WWK max. Leistung                        | boiler<br>dhw  | 🔢   | %       | ✔   | ---          |
| [maxtemp](http://ems-esp/api/boiler/maxtemp)                       | WWK maximale Temperatur                  | boiler<br>dhw  | 🔢   | °C      | ✔   | ---          |
| [chargetype](http://ems-esp/api/boiler/chargetype)                 | WWK Speicherladungstyp                   | boiler<br>dhw  | enum |         |     | ---          |
| [hyston](http://ems-esp/api/boiler/hyston)                         | WWK Einschalttemperaturdifferenz         | boiler<br>dhw  | 🔢   | °C      | ✔   | ?            |
| [hystoff](http://ems-esp/api/boiler/hystoff)                       | WWK Ausschalttemperaturdifferenz         | boiler<br>dhw  | 🔢   | °C      | ✔   | ?            |
| [curflow](http://ems-esp/api/boiler/curflow)                       | WWK aktueller Durchfluss                 | boiler<br>dhw  | 🔢   | l/min   |     | Immer 0      |
| [storagetemp1](http://ems-esp/api/boiler/storagetemp1)             | WWK interne Speichertemperatur           | boiler<br>dhw  | 🔢   | °C      |     | ---          |
| [storagetemp2](http://ems-esp/api/boiler/storagetemp2)             | WWK externe Speichertemperatur           | boiler<br> dhw | 🔢   | °C      |     | ---          |
| [recharging](http://ems-esp/api/boiler/recharging)                 | WWK Nachladen                            | boiler<br>dhw  | ☑    |         |     | ?            |
| [tempok](http://ems-esp/api/boiler/tempok)                         | WWK Temperatur ok                        | boiler<br>dhw  | ☑    |         |     | ?            |
| [active](http://ems-esp/api/boiler/active)                         | WWK aktiv                                | boiler<br>dhw  | ☑    |         |     |
| [mixertemp](http://ems-esp/api/boiler/mixertemp)                   | WWK Mischertemperatur                    | boiler<br>dhw  | 🔢   | °C      |     | ---          |
| [cylmiddletemp](http://ems-esp/api/boiler/cylmiddletemp)           | WWK Speichertemperatur Mitte             | boiler<br>dhw  | 🔢   | °C      |     | ---          |
| [starts](http://ems-esp/api/boiler/starts)                         | WWK Anzahl Starts                        | boiler<br>dhw  | 🔢   |         |     | Immer 0      |
| [workm](http://ems-esp/api/boiler/workm)                           | WWK aktive Zeit                          | boiler<br>dhw  | 🔢   | Minuten |     | Immer 0      |
| [hpswitchvalve](http://ems-esp/api/boiler/hpswitchvalve)           | Schaltventil                             | boiler         | ☑    |         |     | Immer AUS    |
| [headertemp](http://ems-esp/api/boiler/headertemp)                 | Hydr. Weiche                             | boiler         | 🔢   | °C      |     | Immer 0      |

{% endcapture %}
{{ entities_boiler | markdownify }}

</details>

## Thermostat

<details>
  <summary>Weitere Entiäten, deren Bedeutung aktuell noch unklar ist</summary>
{% capture entities_thermostat %}

| ID                                                                         | Name                                        | Modul             | Typ  | Einheit | RW  | Beschreibung |
| -------------------------------------------------------------------------- | ------------------------------------------- | ----------------- | ---- | ------- | --- | ------------ |
| [errorcode](http://ems-esp/api/thermostat/errorcode)                       | Fehlercode                                  | thermostat        | 🔠   |         |     |
| [lastcode](http://ems-esp/api/thermostat/lastcode)                         | Letzter Fehler                              | thermostat        | 🔠   |         |     |
| [floordry](http://ems-esp/api/thermostat/floordry)                         | Estrichtrocknung                            | thermostat        | enum |         |     |
| [floordrytemp](http://ems-esp/api/thermostat/floordrytemp)                 | Estrichtrocknungstemperatur                 | thermostat        | 🔢   | °C      |     |
| [hybridstrategy](http://ems-esp/api/thermostat/hybridstrategy)             | Hybrid-Steuerungsstrategie                  | thermostat        | enum |         | ✔   |
| [switchovertemp](http://ems-esp/api/thermostat/switchovertemp)             | Außentemperatur für Umschaltung             | thermostat        | 🔢   | °C      | ✔   |
| [energycostratio](http://ems-esp/api/thermostat/energycostratio)           | Energie-/Kostenverhältnis                   | thermostat        | 🔢   |         | ✔   |
| [fossilefactor](http://ems-esp/api/thermostat/fossilefactor)               | Energiefaktor Fossil                        | thermostat        | 🔢   |         | ✔   |
| [electricfactor](http://ems-esp/api/thermostat/electricfactor)             | Energiefaktor elektrisch                    | thermostat        | 🔢   |         | ✔   |
| [delayboiler](http://ems-esp/api/thermostat/delayboiler)                   | Verzögerungsoption                          | thermostat        | 🔢   | Minuten | ✔   |
| [tempdiffboiler](http://ems-esp/api/thermostat/tempdiffboiler)             | Temperaturdifferenzoption                   | thermostat        | 🔢   | °C      | ✔   |
| [currtemp](http://ems-esp/api/thermostat/currtemp)                         | HK1 aktuelle Raumtemperatur                 | thermostat<br>hc1 | 🔢   | °C      |     |
| [haclimate](http://ems-esp/api/thermostat/haclimate)                       | HK1 Discovery aktuelle Raumtemperatur       | thermostat<br>hc1 | enum |         |     |
| [modetype](http://ems-esp/api/thermostat/modetype)                         | HK1 Modustyp                                | thermostat<br>hc1 | enum |         |     |
| [ecotemp](http://ems-esp/api/thermostat/ecotemp)                           | HK1 eco Temperatur                          | thermostat<br>hc1 | 🔢   | °C      | ✔   |
| [comforttemp](http://ems-esp/api/thermostat/comforttemp)                   | HK1 Komforttemperatur                       | thermostat<br>hc1 | 🔢   | °C      | ✔   |
| [roominfluence](http://ems-esp/api/thermostat/roominfluence)               | HK1 Raumeinfluss                            | thermostat<br>hc1 | 🔢   | °C      | ✔   |
| [roominflfactor](http://ems-esp/api/thermostat/roominflfactor)             | HK1 Raumeinflussfaktor                      | thermostat<br>hc1 | 🔢   |         | ✔   |
| [curroominfl](http://ems-esp/api/thermostat/curroominfl)                   | HK1 aktueller Raumeinfluss                  | thermostat<br>hc1 | 🔢   | °C      |     |
| [nofrostmode](http://ems-esp/api/thermostat/nofrostmode)                   | HK1 Frostschutzmodus                        | thermostat<br>hc1 | enum |         | ✔   |
| [nofrosttemp](http://ems-esp/api/thermostat/nofrosttemp)                   | HK1 Frostschutztemperatur                   | thermostat<br>hc1 | 🔢   | °C      | ✔   |
| [summersetmode](http://ems-esp/api/thermostat/summersetmode)               | HK1 Einstellung Sommerbetrieb               | thermostat<br>hc1 | enum |         | ✔   |
| [hpoperatingmode](http://ems-esp/api/thermostat/hpoperatingmode)           | HK1 WP Betriebsmodus                        | thermostat<br>hc1 | enum |         | ✔   |
| [summermode](http://ems-esp/api/thermostat/summermode)                     | HK1 Sommerbetrieb                           | thermostat<br>hc1 | enum |         |     |
| [controlmode](http://ems-esp/api/thermostat/controlmode)                   | HK1 Steuermodus                             | thermostat<br>hc1 | enum |         | ✔   |
| [program](http://ems-esp/api/thermostat/program)                           | HK1 Programm                                | thermostat<br>hc1 | enum |         | ✔   |
| [tempautotemp](http://ems-esp/api/thermostat/tempautotemp)                 | HK1 temporäre Solltemperatur Automatikmodus | thermostat<br>hc1 | 🔢   | °C      | ✔   |
| [remoteseltemp](http://ems-esp/api/thermostat/remoteseltemp)               | HK1 temporäre Solltemperatur Remote         | thermostat<br>hc1 | 🔢   | °C      | ✔   |
| [fastheatup](http://ems-esp/api/thermostat/fastheatup)                     | HK1 schnelles Aufheizen                     | thermostat<br>hc1 | 🔢   | %       | ✔   |
| [switchonoptimization](http://ems-esp/api/thermostat/switchonoptimization) | HK1 Einschaltoptimierung                    | thermostat<br>hc1 | ☑    |         | ✔   |
| [reducemode](http://ems-esp/api/thermostat/reducemode)                     | HK1 Absenkmodus                             | thermostat<br>hc1 | enum |         | ✔   |
| [noreducetemp](http://ems-esp/api/thermostat/noreducetemp)                 | HK1 Durchheizen unter                       | thermostat<br>hc1 | 🔢   | °C      | ✔   |
| [reducetemp](http://ems-esp/api/thermostat/reducetemp)                     | HK1 Absenkmodus unter                       | thermostat<br>hc1 | 🔢   | °C      | ✔   |
| [dhwprio](http://ems-esp/api/thermostat/dhwprio)                           | HK1 WW-Vorrang                              | thermostat<br>hc1 | ☑    |         | ✔   |
| [hpcooling](http://ems-esp/api/thermostat/hpcooling)                       | HK1 WP Kühlen                               | thermostat<br>hc1 | ☑    |         | ✔   |
| [coolingon](http://ems-esp/api/thermostat/coolingon)                       | HK1 Kühlung an                              | thermostat<br>hc1 | ☑    |         |     |
| [dewoffset](http://ems-esp/api/thermostat/dewoffset)                       | HK1 Taupunktdifferenz                       | thermostat<br>hc1 | 🔢   | K       | ✔   |
| [roomtempdiff](http://ems-esp/api/thermostat/roomtempdiff)                 | HK1 Raumtemperaturdifferenz                 | thermostat<br>hc1 | 🔢   | K       | ✔   |
| [hpminflowtemp](http://ems-esp/api/thermostat/hpminflowtemp)               | HK1 WP minimale Vorlauftemperatur           | thermostat<br>hc1 | 🔢   | °C      | ✔   |
| [control](http://ems-esp/api/thermostat/control)                           | HK1 Fernsteuerung                           | thermostat<br>hc1 | enum |         | ✔   |
| [remotetemp](http://ems-esp/api/thermostat/remotetemp)                     | HK1 Raumtemperatur Remote                   | thermostat<br>hc1 | 🔢   | °C      | ✔   |
| [remotehum](http://ems-esp/api/thermostat/remotehum)                       | HK1 Raumfeuchte Remote                      | thermostat<br>hc1 | 🔢   | %       | ✔   |
| [boost](http://ems-esp/api/thermostat/boost)                               | HK1 Boost                                   | thermostat<br>hc1 | ☑    |         | ✔   |
| [boosttime](http://ems-esp/api/thermostat/boosttime)                       | HK1 Boost-Dauer                             | thermostat<br>hc1 | 🔢   | Stunden | ✔   |
| [coolstart](http://ems-esp/api/thermostat/coolstart)                       | HK1 Kühlbetrieb ab                          | thermostat<br>hc1 | 🔢   | °C      | ✔   |
| [coolondelay](http://ems-esp/api/thermostat/coolondelay)                   | HK1 Einschaltverzögerung Kühlen             | thermostat<br>hc1 | 🔢   | Stunden | ✔   |
| [cooloffdelay](http://ems-esp/api/thermostat/cooloffdelay)                 | HK1 Ausschaltverzögerung Kühlen             | thermostat<br>hc1 | 🔢   | Stunden | ✔   |
| [switchprogmode](http://ems-esp/api/thermostat/switchprogmode)             | HK1 Schaltprogrammmodus                     | thermostat<br>hc1 | enum |         | ✔   |
| [settemp](http://ems-esp/api/thermostat/settemp)                           | WWK Solltemperatur                          | thermostat<br>dhw | 🔢   | °C      | ✔   |
| [settemplow](http://ems-esp/api/thermostat/settemplow)                     | WWK untere Solltemperatur                   | thermostat<br>dhw | 🔢   | °C      | ✔   |
| [circmode](http://ems-esp/api/thermostat/circmode)                         | WWK Zirkulationspumpenmodus                 | thermostat<br>dhw | enum |         | ✔   |
| [chargeduration](http://ems-esp/api/thermostat/chargeduration)             | WWK Ladedauer                               | thermostat<br>dhw | 🔢   | Minuten | ✔   |
| [charge](http://ems-esp/api/thermostat/charge)                             | WWK Laden                                   | thermostat<br>dhw | ☑    |         | ✔   |
| [extra](http://ems-esp/api/thermostat/extra)                               | WWK Extra                                   | thermostat<br>dhw | 🔢   | °C      |     |
| [disinfecting](http://ems-esp/api/thermostat/disinfecting)                 | WWK Desinfizieren                           | thermostat<br>dhw | ☑    |         | ✔   |
| [disinfectday](http://ems-esp/api/thermostat/disinfectday)                 | WWK Desinfektionstag                        | thermostat<br>dhw | enum |         | ✔   |
| [disinfecttime](http://ems-esp/api/thermostat/disinfecttime)               | WWK Desinfektionszeit                       | thermostat<br>dhw | 🔢   | Minuten | ✔   |
| [dailyheating](http://ems-esp/api/thermostat/dailyheating)                 | WWK täglich Heizen                          | thermostat<br>dhw | ☑    |         | ✔   |
| [dailyheattime](http://ems-esp/api/thermostat/dailyheattime)               | WWK tägliche Heizzeit                       | thermostat<br>dhw | 🔢   | Minuten | ✔   |

{% endcapture %}
{{ entities_thermostat | markdownify }}

## Entitäten auslesen

Die Liste aller Entitäten kann durch Öffnen folgender URL aus ems-esp ausgelesen werden: [http://ems-esp/api/boiler/entities](http://ems-esp/api/boiler/entities) bzw. [http://ems-esp/api/thermostat/entities](http://ems-esp/api/thermostat/entities).
Ihr könnt sie auch direkt mit `curl`und `jq` als Markdown Tabelle erstellen lassen:

```
curl 'http://ems-esp/api/boiler/entities' | jq -r '[
  "| ID | Name | Modul | Typ | Einheit | RW |",
  "|----|------|------------|-----|---------|------------|",
  (to_entries[] | "| [" + .value.name + "](http://ems-esp/api/boiler/" + .value.name + ") | " + .value.fullname + " | " + .value.circuit + " | " + .value.type + " | " + .value.uom + " | " + (if .value.writeable then "X" else "" end) + " |")
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

## Legende

🔢 Datentyp: Number

🔠 Datentyp: String

☑ Datentyp: Boolean
