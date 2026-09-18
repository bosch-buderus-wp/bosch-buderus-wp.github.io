---
title: "EMS-ESP Entities at a Glance"
headline: "EMS-ESP Entities"
excerpt: "Overview of the entities that can be read via EMS-ESP for Bosch CS5800/6800i and Buderus WLW176/186i."
permalink: /en/docs/smarthome/entities
toc: true
sidebar:
  nav: "en_docs"
lang: en
translation_url: /docs/smarthome/entities
translation_generated: true
---

Version 3.7.1 of [ems-esp](https://emsesp.org/) provides 166 entities for the boiler and 71 for the control unit.
This page provides an explanation of all entities, insofar as they are known.
If anyone has further information/corrections, feel free to add them.
The _RW_ (Read-Write) column indicates whether the entity is read-only or can also be written.
Some entities are only available for the Bosch CS5800/6800i and Buderus WLW176/186i.
These are marked accordingly in the description.

## Energy values

IDs containing _"total"_ are the sum of the values for

- heating (_"heat"_),
- cooling (_"cool"_) and
- domestic hot water (module=_"dhw"_).

IDs containing _"comp"_ refer to the heat pump, while _"eheat"_ and _"auxelecheat"_ refer to the auxiliary heater.

### With two decimal places

_"nrg..."_: generated thermal energy (heat)\
_"meter..."_: consumed electrical energy (electricity consumption)

The following entities are only available for the Bosch CS5800/6800i and Buderus WLW176/186i.

| ID                                                 | Name               | Module        | Type | Unit    | RW  | Description                                                                                                                                             |
| -------------------------------------------------- | ------------------ | ------------- | ---- | ------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [nrgtotal](http://ems-esp/api/boiler/nrgtotal)     | Total energy       | boiler        | 🔢  | kWh     |     | Total **generated** thermal energy for **heating, cooling and domestic hot water** - more precise version of _nrgsupptotal_                              |
| [nrgheat](http://ems-esp/api/boiler/nrgheat)       | Heating energy     | boiler        | 🔢  | kWh     |     | Total **generated** thermal energy for **heating** - more precise version of _nrgsuppheating_                                                             |
| [nrg](http://ems-esp/api/boiler/nrg)               | DHW energy         | boiler<br>dhw | 🔢  | kWh     |     | Total **generated** thermal energy for **domestic hot water** - more precise version of _nrgsupp_                                                         |
| [nrgcool](http://ems-esp/api/boiler/nrgcool)       | Cooling energy     | boiler        | 🔢  | kWh     |     | Total **generated** energy for **cooling** - more precise version of _nrgsuppcooling_                                                                     |
| [metertotal](http://ems-esp/api/boiler/metertotal) | Total consumption  | boiler        | 🔢  | kWh     |     | Total **consumed** electrical energy of the **heat pump and auxiliary heater** for **heating, cooling and domestic hot water** - more precise version of _nrgconstotal_ |
| [metercomp](http://ems-esp/api/boiler/metercomp)   | Compressor consumption | boiler      | 🔢  | kWh     |     | Total **consumed** electrical energy of the **heat pump** for **heating, cooling and domestic hot water** - more precise version of _nrgconscomptotal_ |
| [metereheat](http://ems-esp/api/boiler/metereheat) | Electric heater consumption | boiler | 🔢  | kWh     |     | Total **consumed** electrical energy of the **auxiliary heater** - more precise version of _auxelecheatnrgconstotal_ |
| [meterheat](http://ems-esp/api/boiler/meterheat)   | Heating consumption | boiler        | 🔢  | kWh     |     | Total **consumed** electrical energy for **heating**                                                                                                    |
| [meter](http://ems-esp/api/boiler/meter)           | DHW consumption   | boiler<br>dhw | 🔢  | kWh     |     | Total **consumed** electrical energy for **domestic hot water**                                                                                          |
| [metercool](http://ems-esp/api/boiler/metercool)   | Cooling consumption | boiler       | 🔢  | kWh     |     | Total **consumed** electrical energy for **cooling**                                                                                                     |

### Without decimal places

_"nrgsupp..."_: generated thermal energy (heat)\
_"nrgcons..."_: consumed electrical energy (electricity consumption)\
_"nrgconscomp..."_: consumed electrical energy of the heat pump\
_"auxelecheatnrgcons..."_: consumed electrical energy of the electric auxiliary heater

| ID                                                                               | Name                                      | Module        | Type | Unit    | RW  | Description                                                                                                          |
| -------------------------------------------------------------------------------- | ----------------------------------------- | ------------- | ---- | ------- | --- | --------------------------------------------------------------------------------------------------------------------- |
| [nrgsupptotal](http://ems-esp/api/boiler/nrgsupptotal)                           | total energy output                       | boiler        | 🔢  | kWh     |     | Total **generated** thermal energy for **heating, cooling and domestic hot water**                                   |
| [nrgsuppheating](http://ems-esp/api/boiler/nrgsuppheating)                       | total energy output heating               | boiler        | 🔢  | kWh     |     | Total **generated** thermal energy for **heating**                                                                   |
| [nrgsupp](http://ems-esp/api/boiler/nrgsupp)                                     | DHW total heat energy output              | boiler<br>dhw | 🔢  | kWh     |     | Total **generated** thermal energy for **domestic hot water**                                                        |
| [nrgsuppcooling](http://ems-esp/api/boiler/nrgsuppcooling)                       | total energy output cooling               | boiler        | 🔢  | kWh     |     | Total **generated** energy for **cooling**                                                                            |
| [nrgsupppool](http://ems-esp/api/boiler/nrgsupppool)                             | total energy output pool                  | boiler        | 🔢  | kWh     |     | -- probably not relevant --                                                                                           |
| [nrgconstotal](http://ems-esp/api/boiler/nrgconstotal)                           | Total energy consumption                  | boiler        | 🔢  | kWh     |     | Total **consumed** electrical energy of the **heat pump and auxiliary heater** for **heating, cooling and domestic hot water** |
| [nrgconscomptotal](http://ems-esp/api/boiler/nrgconscomptotal)                   | Total energy consumption compressor       | boiler        | 🔢  | kWh     |     | Total **consumed** electrical energy of the **heat pump** for **heating, cooling and domestic hot water**              |
| [nrgconscompheating](http://ems-esp/api/boiler/nrgconscompheating)               | Energy consumption compressor heating     | boiler        | 🔢  | kWh     |     | Total **consumed** electrical energy of the **heat pump** for **heating**                                      |
| [nrgconscomp](http://ems-esp/api/boiler/nrgconscomp)                             | DHW energy consumption compressor         | boiler<br>dhw | 🔢  | kWh     |     | Total **consumed** electrical energy of the **heat pump** for **domestic hot water**                                   |
| [nrgconscompcooling](http://ems-esp/api/boiler/nrgconscompcooling)               | Energy consumption compressor cooling     | boiler        | 🔢  | kWh     |     | Total **consumed** electrical energy of the **heat pump** for **cooling**                                      |
| [nrgconscomppool](http://ems-esp/api/boiler/nrgconscomppool)                     | Energy consumption compressor pool        | boiler        | 🔢  | kWh     |     | -- probably not relevant --                                                                                       |
| [auxelecheatnrgconstotal](http://ems-esp/api/boiler/auxelecheatnrgconstotal)     | Energy consumption electric auxiliary heating | boiler        | 🔢  | kWh     |     | Total **consumed** electrical energy of the **auxiliary heater** for **heating and domestic hot water**                        |
| [auxelecheatnrgconsheating](http://ems-esp/api/boiler/auxelecheatnrgconsheating) | Energy consumption electric auxiliary heating heating | boiler | 🔢  | kWh     |     | Total **consumed** electrical energy of the **auxiliary heater** for **heating**                                       |
| [auxelecheatnrgcons](http://ems-esp/api/boiler/auxelecheatnrgcons)               | DHW energy consumption electric auxiliary heating | boiler<br>dhw | 🔢  | kWh     |     | Total **consumed** electrical energy of the **auxiliary heater** for **domestic hot water**                                    |
| [auxelecheatnrgconspool](http://ems-esp/api/boiler/auxelecheatnrgconspool)       | Energy consumption electric auxiliary heating pool | boiler | 🔢  | kWh     |     | -- probably not relevant --                                                                                       |

### Power

| ID                                                   | Name                    | Module | Type | Unit | RW  | Description                                                                                                                  |
| ---------------------------------------------------- | ----------------------- | ------ | ---- | ---- | --- | ----------------------------------------------------------------------------------------------------------------------------- |
| [hppower](http://ems-esp/api/boiler/hppower)         | Compressor power        | boiler | 🔢  | kW   |     | From version [12.11.1/9.15.0](/en/docs/sw-versionen/#12111--9150): Current thermal power output of the heat pump, e.g. 3.1 kW |
| [hpcurrpower](http://ems-esp/api/boiler/hpcurrpower) | current compressor power | boiler | 🔢  | W    |     | Current power consumption of the heat pump, e.g. 298 W                                                                         |

## Temperatures

### Heat pump & heating

#### Measured values

| ID                                                                   | Name                               | Module            | Type | Unit | RW  | Description                                                                                                            |
| -------------------------------------------------------------------- | ---------------------------------- | ----------------- | ---- | ---- | --- | ----------------------------------------------------------------------------------------------------------------------- |
| [outdoortemp](http://ems-esp/api/boiler/outdoortemp)                 | Outdoor temperature                | boiler            | 🔢  | °C   |     | Outdoor temperature measured by outdoor thermometer                                                                      |
| [dampedoutdoortemp](http://ems-esp/api/thermostat/dampedoutdoortemp) | Damped outdoor temperature         | thermostat        | 🔢  | °C   |     | [Damped outdoor temperature](/en/docs/settings/#d%C3%A4mpfung-der-au%C3%9Fentemperatur) - see also _damping_         |
| [curflowtemp](http://ems-esp/api/boiler/curflowtemp)                 | Current flow temperature           | boiler            | 🔢  | °C   |     | Flow temperature after buffer tank (T0)                                                                                  |
| [rettemp](http://ems-esp/api/boiler/rettemp)                         | Return temperature                 | boiler            | 🔢  | °C   |     | Return temperature of the primary circuit when leaving the indoor unit - identical to _hptc0_                             |
| [hptc0](http://ems-esp/api/boiler/hptc0)                             | Refrigerant return (TC0)           | boiler            | 🔢  | °C   |     | Return temperature of the primary circuit when leaving the indoor unit                                                    |
| [hptc1](http://ems-esp/api/boiler/hptc1)                             | Refrigerant flow (TC1)             | boiler            | 🔢  | °C   |     | Flow temperature of the primary circuit when entering the indoor unit                                                   |
| [hptc3](http://ems-esp/api/boiler/hptc3)                             | Condenser temperature (TC3)        | boiler            | 🔢  | °C   |     | Temperature of the refrigerant when entering the condenser                                                           |
| [hptr1](http://ems-esp/api/boiler/hptr1)                             | Compressor temperature (TR1)       | boiler            | 🔢  | °C   |     | Temperature of the refrigerant in the compressor                                                                               |
| [hptr3](http://ems-esp/api/boiler/hptr3)                             | Refrigerant (liquid) (TR3)         | boiler            | 🔢  | °C   |     | Temperature of the refrigerant when leaving the condenser                                                            |
| [hptr4](http://ems-esp/api/boiler/hptr4)                             | Evaporator inlet (TR4)             | boiler            | 🔢  | °C   |     | Temperature of the refrigerant after the expansion valve                                                                  |
| [hptr5](http://ems-esp/api/boiler/hptr5)                             | Compressor inlet (TR5)             | boiler            | 🔢  | °C   |     | Suction gas temperature                                                                                                      |
| [hptr6](http://ems-esp/api/boiler/hptr6)                             | Compressor outlet (TR6)            | boiler            | 🔢  | °C   |     | Hot gas temperature                                                                                                      |
| [hptl2](http://ems-esp/api/boiler/hptl2)                             | Outdoor air inlet temperature (TL2) | boiler           | 🔢  | °C   |     | Air temperature at evaporator inlet                                                                                     |
| [hppl1](http://ems-esp/api/boiler/hppl1)                             | Low-pressure temperature (PL1)     | boiler            | 🔢  | °C   |     | Low-pressure temperature - identical to _hptr4_                                                                            |
| [hpph1](http://ems-esp/api/boiler/hpph1)                             | High-pressure temperature (PH1)    | boiler            | 🔢  | °C   |     | High-pressure temperature - identical to _curflowtemp_                                                                        |
| [hpta4](http://ems-esp/api/boiler/hpta4)                             | Condensate tray (TA4)             | boiler            | 🔢  | °C   |     | Temperature at the condensate tray                                                                                        |
| [targetflowtemp](http://ems-esp/api/thermostat/targetflowtemp)       | HC1 calculated flow temperature   | thermostat<br>hc1 | 🔢  | °C   |     | Target flow temperature determined by the system (with PV surplus _targetflowtemp_ = _selflowtemp_ + _pvraiseheat_) |

#### Settings

| ID                                                       | Name                                                               | Module            | Type | Unit | RW  | Description                                                                                          |
| -------------------------------------------------------- | ------------------------------------------------------------------ | ----------------- | ---- | ---- | --- | ----------------------------------------------------------------------------------------------------- |
| [selflowtemp](http://ems-esp/api/boiler/selflowtemp)     | Selected flow temperature                                         | boiler            | 🔢  | °C   | ✔   | Target flow temperature without increase by energy manager/PV                                           |
| [heatingtemp](http://ems-esp/api/boiler/heatingtemp)     | Heating temperature                                               | boiler            | 🔢  | °C   | ✔   | Maximum possible flow temperature, e.g. 75°C for CS6800i                                             |
| [maxflowtemp](http://ems-esp/api/thermostat/maxflowtemp) | HC1 max. flow temperature                                         | thermostat<br>hc1 | 🔢  | °C   | ✔   | Maximum flow temperature in HC1                                                                     |
| [minflowtemp](http://ems-esp/api/thermostat/minflowtemp) | HC1 min. flow temperature                                         | thermostat<br>hc1 | 🔢  | °C   | ✔   | Minimum flow temperature in HC1                                                                     |
| [offsettemp](http://ems-esp/api/thermostat/offsettemp)   | HC1 temperature increase                                           | thermostat<br>hc1 | 🔢  | °C   | ✔   | Value by which the flow temperature in HC1 should be manually increased                               |
| [designtemp](http://ems-esp/api/thermostat/designtemp)   | HC1 design temperature                                             | thermostat<br>hc1 | 🔢  | °C   | ✔   | [Flow temperature at the design outdoor temperature](/en/docs/settings/#vorlauftemperatur-nat)                            |
| [baseflowtemp](http://ems-esp/api/thermostat/baseflowtemp)   | HC1 base point temperature                                           | thermostat<br>hc1 | 🔢  | °C   | ✔   | Flow temperature at the base point                            |
| [minexttemp](http://ems-esp/api/thermostat/minexttemp)   | Min. outdoor temperature                                           | thermostat        | 🔢  | °C   | ✔   | [Standard outdoor temperature](/en/docs/settings/#normaußentemperatur)                                       |
| [summertemp](http://ems-esp/api/thermostat/summertemp)   | HC1 summer temperature                                               | thermostat<br>hc1 | 🔢  | °C   | ✔   | [Heating limit](/en/docs/settings/#heizgrenze)                                                         |
| [tempdiffheat](http://ems-esp/api/boiler/tempdiffheat)   | Temp. difference TC3/TC0 heating                                  | boiler            | 🔢  | K    | ✔   | Target temperature difference between the flow and return of the primary circuit during heating                           |
| [tempdiffcool](http://ems-esp/api/boiler/tempdiffcool)   | Temp. difference TC3/TC0 cooling                                  | boiler            | 🔢  | K    | ✔   | Target temperature difference between the flow and return of the primary circuit during cooling                           |
| [seltemp](http://ems-esp/api/thermostat/seltemp)         | HC1 selected [room temperature](/en/docs/settings/#raumtemperatur) | thermostat<br>hc1 | 🔢 | °C | ✔ | Desired [room temperature](/en/docs/settings/#raumtemperatur) |
| [manualtemp](http://ems-esp/api/thermostat/manualtemp)   | HC1 manual temperature                                            | thermostat<br>hc1 | 🔢  | °C   | ✔   | Manually set room temperature - identical to _seltemp_ when _mode=Manuell_                      |
| [intoffset](http://ems-esp/api/thermostat/intoffset)     | Internal temperature correction                                      | thermostat        | 🔢  | °C   | ✔   | [Room temperature offset](/en/docs/settings/#raumtemperatur) by which _seltemp_ should be corrected |

### Domestic hot water

#### Measured values

| ID                                             | Name                            | Module        | Type | Unit | RW  | Description                                                                                                                            |
| ---------------------------------------------- | ------------------------------- | ------------- | ---- | ---- | --- | --------------------------------------------------------------------------------------------------------------------------------------- |
| [settemp](http://ems-esp/api/boiler/settemp)   | DHW target temperature          | boiler<br>dhw | 🔢  | °C   |     | Current stop temperature in the currently active domestic hot water mode                                                                              |
| [curtemp2](http://ems-esp/api/boiler/curtemp2) | DHW current external temperature | boiler<br>dhw | 🔢  | °C   |     | Currently measured domestic hot water temperature in the domestic hot water tank - identical to _hptw1_                                                     |
| [hptw1](http://ems-esp/api/boiler/hptw1)       | DHW reservoir (TW1)             | boiler        | 🔢  | °C   |     | Currently measured domestic hot water temperature in the domestic hot water tank (lower measuring point) - identical to _curtemp2_                              |
| [curtemp](http://ems-esp/api/boiler/curtemp)   | DHW current internal temperature | boiler<br>dhw | 🔢 | °C | | Currently measured domestic hot water temperature in the domestic hot water tank (upper optional measuring point), if installed; otherwise identical to _hptw1_ |

#### Settings

See also [domestic hot water settings](/en/docs/settings/#warmwasserbereitung).
The entities for the differential and stop temperatures are only available for the Bosch CS5800/6800i and Buderus WLW176/186i.

| ID                                                             | Name                              | Module        | Type | Unit | RW  | Description                                                                                                               |
| -------------------------------------------------------------- | --------------------------------- | ------------- | ---- | ---- | --- | -------------------------------------------------------------------------------------------------------------------------- |
| [comfdiff](http://ems-esp/api/boiler/comfdiff)                 | DHW comfort differential temp.    | boiler<br>dhw | 🔢  | K    | ✔   | [Charging delta](/en/docs/settings/#warmwasserbereitung) in Comfort mode, by which the flow temperature is increased       |
| [ecodiff](http://ems-esp/api/boiler/ecodiff)                   | DHW ECO differential temp.        | boiler<br>dhw | 🔢  | K    | ✔   | [Charging delta](/en/docs/settings/#warmwasserbereitung) in Eco mode, by which the flow temperature is increased           |
| [ecoplusdiff](http://ems-esp/api/boiler/ecoplusdiff)           | DHW ECO+ differential temp.       | boiler<br>dhw | 🔢  | K    | ✔   | [Charging delta](/en/docs/settings/#warmwasserbereitung) in Eco+ mode, by which the flow temperature is increased          |
| [comfstop](http://ems-esp/api/boiler/comfstop)                 | DHW comfort stop temp.            | boiler<br>dhw | 🔢  | °C   | ✔   | [Stop temperature](/en/docs/settings/#warmwasserbereitung) in Comfort mode, at which domestic hot water production ends  |
| [ecostop](http://ems-esp/api/boiler/ecostop)                   | DHW ECO stop temp.                | boiler<br>dhw | 🔢  | °C   | ✔   | [Stop temperature](/en/docs/settings/#warmwasserbereitung) in Eco mode, at which domestic hot water production ends      |
| [ecoplusstop](http://ems-esp/api/boiler/ecoplusstop)           | DHW ECO+ stop temp.               | boiler<br>dhw | 🔢  | °C   | ✔   | [Stop temperature](/en/docs/settings/#warmwasserbereitung) in Eco+ mode, at which domestic hot water production ends     |
| [seltempsingle](http://ems-esp/api/boiler/seltempsingle)       | DHW one-time charging temperature | boiler<br>dhw | 🔢 | °C | ✔ | [Stop temperature](/en/docs/settings/#warmwasserbereitung) for extra DHW |
| [disinfectiontemp](http://ems-esp/api/boiler/disinfectiontemp) | DHW disinfection temperature       | boiler<br>dhw | 🔢  | °C   | ✔   | [Stop temperature](/en/docs/settings/#warmwasserbereitung) for domestic hot water disinfection                                 |
| [seltemp](http://ems-esp/api/boiler/seltemp)                   | DHW selected temperature           | boiler<br>dhw | 🔢  | °C   | ✔   | [Start temperature](/en/docs/settings/#warmwasserbereitung) in Comfort mode, at which domestic hot water production begins |
| [seltemplow](http://ems-esp/api/boiler/seltemplow)             | DHW selected lower temperature    | boiler<br>dhw | 🔢  | °C   | ✔   | [Start temperature](/en/docs/settings/#warmwasserbereitung) in Eco mode, at which domestic hot water production begins     |
| [tempecoplus](http://ems-esp/api/boiler/tempecoplus)           | DHW selected ECO+ temperature   | boiler<br>dhw | 🔢  | °C   | ✔   | [Start temperature](/en/docs/settings/#warmwasserbereitung) in Eco+ mode, at which domestic hot water production begins   |

WLW 196i provides stop temperatures under the following entities:

| ID                                                 | Name                       | Module        | Type | Unit | RW  | Description                                                                                                                             |
| -------------------------------------------------- | -------------------------- | ------------- | ---- | ---- | --- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [comfoff](http://ems-esp/api/boiler/comfoff)       | DHW comfort switch-off temp. | boiler<br>dhw | 🔢 | °C | ✔ | [Stop temperature](/en/docs/settings/#warmwasserbereitung) in Comfort mode, at which domestic hot water production ends<br>Only WLW196i |
| [ecooff](http://ems-esp/api/boiler/ecooff)         | DHW ECO switch-off temp.     | boiler<br>dhw | 🔢 | °C | ✔ | [Stop temperature](/en/docs/settings/#warmwasserbereitung) in Eco mode, at which domestic hot water production ends<br>Only WLW196i |
| [ecoplusoff](http://ems-esp/api/boiler/ecoplusoff) | DHW ECO+ switch-off temp.    | boiler<br>dhw | 🔢 | °C | ✔ | [Stop temperature](/en/docs/settings/#warmwasserbereitung) in Eco+ mode, at which domestic hot water production ends<br>Only WLW196i |

## Pumps

The entities for PC0 and PC1 are only available for the Bosch CS5800/6800i and Buderus WLW176/186i.

| ID                                                         | Name                            | Module        | Type | Unit | RW  | Description                                                                                       |
| ---------------------------------------------------------- | ------------------------------- | ------------- | ---- | ---- | --- | -------------------------------------------------------------------------------------------------- |
| [heatingpump](http://ems-esp/api/boiler/heatingpump)       | Heating pump                    | boiler        | ☑   |      |     | ON when the primary circuit pump PC0 is running                                                             |
| [hpcircspd](http://ems-esp/api/boiler/hpcircspd)           | Circulation pump speed          | boiler        | 🔢  | %    |     | Current modulation of the primary circuit pump PC0 - identical to _heatingpumpmod_                       |
| [heatingpumpmod](http://ems-esp/api/boiler/heatingpumpmod) | Heating pump modulation         | boiler        | 🔢  | %    |     | Percentage power of the primary circuit pump PC0                                                      |
| [pc0flow](http://ems-esp/api/boiler/pc0flow)               | PC0 flow                        | boiler        | 🔢  | l/h  |     | Flow volume/flow rate of the primary circuit pump PC0 (unfortunately no value at lower power ) |
| [pc1flow](http://ems-esp/api/boiler/pc1flow)               | PC1 flow                        | boiler        | 🔢  | l/h  |     | Flow volume/flow rate of the heating circuit pump PC1                                                |
| [pc1on](http://ems-esp/api/boiler/pc1on)                   | PC1                             | boiler        | ☑   |      |     | ON when the heating circuit pump PC1 is running                                                               |
| [hpsetdiffpress](http://ems-esp/api/boiler/hpsetdiffpress) | Pump target pressure             | boiler        | 🔢  | mbar | ✔   | Target pressure of the heating circuit pump PC1                                                                   |
| [circpump](http://ems-esp/api/boiler/circpump)             | DHW circulation pump present    | boiler<br>dhw | ☑  |      | ✔   | ON when the DHW circulation pump is to be controlled by the system                              |
| [circmode](http://ems-esp/api/boiler/circmode)             | DHW circulation pump mode       | boiler<br>dhw | enum |    | ✔   | Setting for operating frequency, e.g. 3x3 min per hour                                              |
| [circ](http://ems-esp/api/boiler/circ)                     | DHW circulation active          | boiler<br>dhw | ☑  |      | ✔   | ON when the DHW circulation pump is currently running                                                      |

## Status

| ID                                                                 | Name                         | Module            | Type | Unit | RW | Description                                                                                                  |
| ------------------------------------------------------------------ | ---------------------------- | ----------------- | ---- | ---- | -- | ------------------------------------------------------------------------------------------------------------- |
| [heatingactive](http://ems-esp/api/boiler/heatingactive)           | Heating active               | boiler            | ☑   |      |    | ON when the system is currently in heating mode                                                                  |
| [tapwateractive](http://ems-esp/api/boiler/tapwateractive)         | Domestic hot water active    | boiler            | ☑   |      |    | ON when the system is currently in domestic hot water mode                                                            |
| [curburnpow](http://ems-esp/api/boiler/curburnpow)                 | Current burner power        | boiler            | 🔢  | %    |    | Current modulation (relative power) of the compressor - identical to _hpcompspd_                            |
| [hpcompspd](http://ems-esp/api/boiler/hpcompspd)                   | Compressor speed           | boiler            | 🔢  | %    |    | Current modulation (relative power) of the compressor                                                       |
| [hpcompon](http://ems-esp/api/boiler/hpcompon)                     | Heat pump compressor       | boiler            | ☑   |      |    | ON when the compressor is currently running                                                                           |
| [hpactivity](http://ems-esp/api/boiler/hpactivity)                 | Compressor activity        | boiler            | enum |     |    | Current compressor activity: "none", "heating", "cooling", "domestic hot water", "pool", "unknown", "defrosting" |
| [hp4way](http://ems-esp/api/boiler/hp4way)                         | 4-way valve (VR4)          | boiler            | enum |     |    | Current position of the 4-way valve in the refrigerant circuit: "cooling & defrosting" or "heating & domestic hot water"             |
| [hpea0](http://ems-esp/api/boiler/hpea0)                           | Heating condensate tray (EA0) | boiler          | ☑   |      |    | ON when the condensate tray heater is currently active                                                           |
| [syspress](http://ems-esp/api/boiler/syspress)                     | System pressure             | boiler            | 🔢  | bar  |    | Water pressure in the heating circuit<br>Only CS5800/6800i & WLW176/186i                                                    |
| [charging](http://ems-esp/api/boiler/charging)                     | DHW charging                | boiler<br>dhw    | ☑   |      |    | ON during domestic hot water operation, otherwise OFF                                                                       |
| [3wayvalve](http://ems-esp/api/boiler/3wayvalve)                   | DHW 3-way valve active      | boiler<br>dhw    | ☑   |      |    | ON during domestic hot water operation, otherwise OFF - identical to RWem _hp3way_                                          |
| [auxheaterlevel](http://ems-esp/api/boiler/auxheaterlevel)         | Auxiliary heater            | boiler            | 🔢  | %    |    | Current relative power of the auxiliary heater                                                                      |
| [hpoperatingstate](http://ems-esp/api/thermostat/hpoperatingstate) | HC1 heat pump operating state | thermostat<br>hc1 | enum |   |    | Selected operating state (e.g. through automatic summer/winter changeover): "heating"\|"off"\|"cooling"           |

## Settings

| ID                                                             | Name                            | Module            | Type | Unit | RW | Description                                                                                                                                                         |
| -------------------------------------------------------------- | ------------------------------- | ----------------- | ---- | ---- | -- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [heatingactivated](http://ems-esp/api/boiler/heatingactivated) | Heating operation enabled       | boiler            | ☑   |      | ✔  | ON when the system is to be used for heating operation                                                                                                           |
| [activated](http://ems-esp/api/boiler/activated)               | DHW enabled                    | boiler<br>dhw    | ☑   |      | ✔  | ON when the system is to be used for domestic hot water production                                                                                                       |
| [alternatingop](http://ems-esp/api/boiler/alternatingop)       | DHW alternating operation     | boiler<br>dhw    | ☑   |      | ✔  | ON when heating operation can be interrupted for domestic hot water operation and vice versa                                                                             |
| [altopprioheat](http://ems-esp/api/boiler/altopprioheat)       | DHW heating preferred over DHW | boiler<br>dhw    | 🔢  | minutes | ✔ | Max. duration in domestic hot water operation before switching to heating operation                                                                                               |
| [altopprio](http://ems-esp/api/boiler/altopprio)               | DHW preferred over heating    | boiler<br>dhw    | 🔢  | minutes | ✔ | Max. duration in heating operation before switching to domestic hot water operation                                                                                               |
| [hp3way](http://ems-esp/api/boiler/hp3way)                     | 3-way valve                  | boiler            | ☑   |      | ✔  | Position of the 3-way valve: ON during domestic hot water operation, otherwise OFF (identical to _3wayvalve_ but writable)                                                       |
| [datetime](http://ems-esp/api/thermostat/datetime)             | Date/time                    | thermostat        | 🔠  |      | ✔  | Current date and time                                                                                                                                          |
| [damping](http://ems-esp/api/thermostat/damping)               | Outdoor temperature damping  | thermostat        | ☑   |      | ✔  | ON when outdoor temperature should be [damped](/en/docs/settings/#d%C3%A4mpfung-der-au%C3%9Fentemperatur) - inertia adjustable via _building_                   |
| [building](http://ems-esp/api/thermostat/building)             | Building type                | thermostat        | enum |    | ✔  | Strength of [outdoor temperature damping](/en/docs/settings/#d%C3%A4mpfung-der-au%C3%9Fentemperatur): ["light"\| "medium"\|"heavy"] - enabled/disabled via _damping_ |
| [mode](http://ems-esp/api/thermostat/mode)                     | HC1 operating mode           | thermostat<br>hc1 | enum | | ✔ | [Room temperature mode](/en/docs/settings/#raumtemperatur): ["off"\|"manual"\|"auto"] |
| [heatingtype](http://ems-esp/api/thermostat/heatingtype)       | HC1 heating type             | thermostat<br>hc1 | enum | | ✔ | Type of heating: ["off"\|"radiator"\|"convector"\|"underfloor"] |
| [hpmode](http://ems-esp/api/thermostat/hpmode)                 | HC1 heat pump mode           | thermostat<br>hc1 | enum | | ✔ | Permitted operating states: ["heating"\|"cooling"\|"heating & cooling"] |
| [heatondelay](http://ems-esp/api/thermostat/heatondelay)       | HC1 heating switch-on delay | thermostat<br>hc1 | 🔢 | hours | ✔ | [Heating operation delay](/en/docs/settings/#heizgrenze) of the automatic summer/winter changeover |
| [heatoffdelay](http://ems-esp/api/thermostat/heatoffdelay)     | HC1 heating switch-off delay | thermostat<br>hc1 | 🔢 | hours | ✔ | [Summer operation delay](/en/docs/settings/#heizgrenze) of the automatic summer/winter changeover |
| [instantstart](http://ems-esp/api/thermostat/instantstart)     | HC1 instant start             | thermostat<br>hc1 | 🔢 | K | ✔ | [Temperature difference for instant start](/en/docs/settings/#heizgrenze) of the automatic summer/winter changeover |

### Photovoltaics

| ID                                                       | Name                       | Module     | Type | Unit | RW | Description                                                                          |
| -------------------------------------------------------- | -------------------------- | ---------- | ---- | ---- | -- | ------------------------------------------------------------------------------------- |
| [pvraiseheat](http://ems-esp/api/thermostat/pvraiseheat) | Increase heating with PV   | thermostat | 🔢 | K | ✔ | Increase of [room temperature](/en/docs/settings/#raumtemperatur) with PV surplus |
| [pvlowercool](http://ems-esp/api/thermostat/pvlowercool) | Decrease cooling with PV  | thermostat | 🔢 | K | ✔ | Decrease of [room temperature](/en/docs/settings/#raumtemperatur) with PV surplus |
| [pvmaxcomp](http://ems-esp/api/boiler/pvmaxcomp)         | PV max. compressor power   | boiler     | 🔢 | kW | ✔ | Max. compressor power with PV surplus |
| [pvcooling](http://ems-esp/api/boiler/pvcooling)         | Cooling only with PV       | boiler     | ☑ | | ✔ | Cooling operation is activated only with PV surplus |
| [pvenabledhw](http://ems-esp/api/thermostat/pvenabledhw) | enable DHW increase        | thermostat | ☑ | | ✔ | Increase of DHW temperature with PV surplus |

### Electric auxiliary heater

| ID                                                         | Name                          | Module        | Type | Unit | RW | Description                                                                                                                                                  |
| ---------------------------------------------------------- | ----------------------------- | ------------- | ---- | ---- | -- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [maxheatcomp](http://ems-esp/api/boiler/maxheatcomp)       | Electric backup heater limit with compressor | boiler | enum | | ✔ | [Max. power of the auxiliary heater with compressor](/en/docs/settings/#begrenzung-mit-kompressor) [0kW\|3kW\|6kW\|9kW] |
| [maxheatheat](http://ems-esp/api/boiler/maxheatheat)       | Electric backup heater power limit | boiler | enum | | ✔ | [Max. power of the auxiliary heater without compressor](/en/docs/settings/#begrenzung-ohne-kompressor) [0kW\|3kW\|6kW\|9kW] |
| [maxheat](http://ems-esp/api/boiler/maxheat)               | DHW electric backup heater limit for DHW | boiler<br>dhw | enum | | ✔ | [Max. power of the auxiliary heater during domestic hot water operation](https://bosch-buderus-wp.github.io/en/docs/settings/#begrenzung-im-ww-betrieb) [0kW\|3kW\|6kW\|9kW] |
| [elheatstep1](http://ems-esp/api/boiler/elheatstep1)       | Electric heater stage 1 | boiler | ☑ | | ✔ | ON when the first stage (3kW) of the electric auxiliary heater is currently running |
| [elheatstep2](http://ems-esp/api/boiler/elheatstep2)       | Electric heater stage 2 | boiler | ☑ | | ✔ | ON when the first stage (6kW) of the electric auxiliary heater is currently running |
| [elheatstep3](http://ems-esp/api/boiler/elheatstep3)       | Electric heater stage 3 | boiler | ☑ | | ✔ | ON when the first stage (9kW) of the electric auxiliary heater is currently running |
| [auxheateronly](http://ems-esp/api/boiler/auxheateronly)   | Auxiliary heater only | boiler | ☑ | | ✔ | ON when heating and domestic hot water operation are carried out exclusively via the auxiliary heater |
| [auxheateroff](http://ems-esp/api/boiler/auxheateroff)     | Disable auxiliary heater | boiler | ☑ | | ✔ | ON when the [auxiliary heater is disabled](/en/docs/settings/#zuheizersperre) |
| [auxheaterdelay](http://ems-esp/api/boiler/auxheaterdelay) | Auxiliary heater delayed start | boiler | 🔢 | K\*min | ✔ | [Delay](/en/docs/settings/#verz%C3%B6gerung-heizung) as the product of falling below the target temperature and duration until the auxiliary heater is switched on |
| [auxmaxlimit](http://ems-esp/api/boiler/auxmaxlimit)       | Auxiliary heater max. limit | boiler | 🔢 | K | ✔ | Temperature difference below the max. flow temperature at which the auxiliary heater is locked |
| [tempparmode](http://ems-esp/api/boiler/tempparmode)       | Electric backup heater parallel operation | boiler | 🔢 | °C | ✔ | [Bivalent point](/en/docs/settings/#bivalpkt-parallelbetr), from which the auxiliary heater is switched on/off |

### Silent mode

| ID                                                       | Name                                 | Module | Type | Unit | RW | Description                                                                      |
| -------------------------------------------------------- | ------------------------------------ | ------ | ---- | ---- | -- | --------------------------------------------------------------------------------- |
| [silentmode](http://ems-esp/api/boiler/silentmode)       | Silent mode                          | boiler | enum | | ✔ | Silent mode: ["off"\|"auto"\|"on"] |
| [mintempsilent](http://ems-esp/api/boiler/mintempsilent) | Minimum outdoor temperature silent mode | boiler | 🔢 | °C | ✔ | Min. temperature from which silent mode is disabled in the Auto setting |

## Statistics

### Operating times

The system can be in heating mode, cooling mode, domestic hot water mode or standby.

| ID                                                               | Name                           | Module        | Type | Unit | RW | Description                                                                              |
| ---------------------------------------------------------------- | ------------------------------ | ------------- | ---- | ---- | -- | ----------------------------------------------------------------------------------------- |
| [ubauptime](http://ems-esp/api/boiler/ubauptime)                 | Total system operating time    | boiler        | 🔢  | minutes | | ??? |
| [uptimetotal](http://ems-esp/api/boiler/uptimetotal)             | Total heat pump operating time | boiler        | 🔢  | minutes | | Total operating time of the system, including standby |
| [uptimecontrol](http://ems-esp/api/boiler/uptimecontrol)         | Total heating operating time   | boiler        | 🔢  | minutes | | Total operating time of the system in **heating, cooling or domestic hot water operation** (without standby) |
| [uptimecompheating](http://ems-esp/api/boiler/uptimecompheating) | Compressor operating time heating | boiler | 🔢 | minutes | | Total operating time of the system in **heating operation** (without standby) |
| [uptimecompcooling](http://ems-esp/api/boiler/uptimecompcooling) | Compressor operating time cooling | boiler | 🔢 | minutes | | Total operating time of the system in **cooling operation** (without standby) |
| [uptimecomp](http://ems-esp/api/boiler/uptimecomp)               | DHW compressor operating time | boiler<br>dhw | 🔢 | minutes | | Total operating time of the system in **domestic hot water operation** (without standby) |
| [uptimecomppool](http://ems-esp/api/boiler/uptimecomppool)       | Compressor operating time pool | boiler | 🔢 | minutes | | -- probably not relevant -- |

### Compressor starts

| ID                                                           | Name                   | Module | Type | Unit | RW | Description |
| ------------------------------------------------------------ | ---------------------- | ------ | ---- | ---- | -- | ----------- |
| [totalcompstarts](http://ems-esp/api/boiler/totalcompstarts) | Total compressor starts | boiler | 🔢 | | | Total number of compressor starts |
| [heatingstarts](http://ems-esp/api/boiler/heatingstarts)     | Heating control starts | boiler | 🔢 | | | Number of compressor starts for heating operation |
| [coolingstarts](http://ems-esp/api/boiler/coolingstarts)     | Cooling control starts | boiler | 🔢 | | | Number of compressor starts for cooling operation |
| [startshp](http://ems-esp/api/boiler/startshp)               | DHW heat pump starts | boiler<br>dhw | 🔢 | | | Number of compressor starts for domestic hot water operation |
| [poolstarts](http://ems-esp/api/boiler/poolstarts)           | Pool control starts | boiler | 🔢 | | | -- probably not relevant -- |

## Inputs

| Input 1 | Input 4 | Result |
| ------- | ------- | ------ |
| ON | OFF | Utility lockout period |
| OFF | OFF | Normal operation |
| OFF | ON | Enhanced operation |
| ON | ON | Forced enhanced operation |

| ID                                             | Name                  | Module | Type | Unit | RW | Description |
| ---------------------------------------------- | --------------------- | ------ | ---- | ---- | -- | ----------- |
| [hpin1](http://ems-esp/api/boiler/hpin1)       | Input 1 status        | boiler | ☑ | | | ON or OFF |
| [hpin1opt](http://ems-esp/api/boiler/hpin1opt) | Input 1 setting       | boiler | 🔠 | | ✔ | |
| [hpin2](http://ems-esp/api/boiler/hpin2)       | Input 2 status        | boiler | ☑ | | | ON or OFF |
| [hpin2opt](http://ems-esp/api/boiler/hpin2opt) | Input 2 setting       | boiler | 🔠 | | ✔ | |
| [hpin3](http://ems-esp/api/boiler/hpin3)       | Input 3 status        | boiler | ☑ | | | ON or OFF |
| [hpin3opt](http://ems-esp/api/boiler/hpin3opt) | Input 3 setting       | boiler | 🔠 | | ✔ | |
| [hpin4](http://ems-esp/api/boiler/hpin4)       | Input 4 status        | boiler | ☑ | | | ON or OFF |
| [hpin4opt](http://ems-esp/api/boiler/hpin4opt) | Input 4 setting       | boiler | 🔠 | | ✔ | |

See also [Using the Smart Grid (SG) and Photovoltaic (PV) function of your heat pump with the EMS Gateways](https://bbqkees-electronics.nl/2024/10/03/using-the-smart-grid-sg-and-photovoltaic-pv-function-of-your-heat-pump-with-the-ems-gateways/)

## Commands

| ID                                                     | Name               | Module | Type | Unit | RW | Description |
| ------------------------------------------------------ | ------------------ | ------ | ---- | ---- | -- | ----------- |
| [reset](http://ems-esp/api/boiler/reset)               | Reset              | boiler | enum | | ✔ | ? |
| [heatingoff](http://ems-esp/api/boiler/heatingoff)     | Switch heating off | boiler | ☑ | | ✔ | ? |
| [shutdown](http://ems-esp/api/boiler/shutdown)         | Switch off         | boiler | enum | | ✔ | ? |
| [mandefrost](http://ems-esp/api/boiler/mandefrost)     | Manual defrosting  | boiler | ☑ | | ✔ | Defrost cycle is started |
| [disinfecting](http://ems-esp/api/boiler/disinfecting) | DHW disinfection  | boiler<br>dhw | ☑ | | ✔ | Domestic hot water disinfection is started |
| [onetime](http://ems-esp/api/boiler/onetime)           | DHW one-time charging | boiler<br>dhw | ☑ | | ✔ | Extra DHW is started |

## Other

<details markdown="1">
<summary>Additional entities whose meaning is currently unclear</summary>
Boiler:

| ID                                                                 | Name                                     | Module         | Type | Unit | RW | Description |
| ------------------------------------------------------------------ | ---------------------------------------- | -------------- | ---- | ---- | -- | ----------- |
| [boiltemp](http://ems-esp/api/boiler/boiltemp)                     | Boiler temperature                         | boiler         | 🔢   | °C      |     | ---          |
| [pumpmode](http://ems-esp/api/boiler/pumpmode)                     | Boiler pump mode                        | boiler         | enum |         | ✔   | ---          |
| [pumpmodmax](http://ems-esp/api/boiler/pumpmodmax)                 | Maximum boiler pump power            | boiler         | 🔢   | %       | ✔   | Always 0      |
| [pumpmodmin](http://ems-esp/api/boiler/pumpmodmin)                 | Minimum boiler pump power            | boiler         | 🔢   | %       | ✔   | Always 0      |
| [pumpcharacter](http://ems-esp/api/boiler/pumpcharacter)           | Boiler pump characteristic           | boiler         | enum |         | ✔   | ---          |
| [pumpdelay](http://ems-esp/api/boiler/pumpdelay)                   | Pump run-on time                       | boiler         | 🔢   | minutes | ✔   | ---          |
| [pumpontemp](http://ems-esp/api/boiler/pumpontemp)                 | Pump logic temperature                    | boiler         | 🔢   | °C      | ✔   | ---          |
| [switchtemp](http://ems-esp/api/boiler/switchtemp)                 | Mixer switch temperature                  | boiler         | 🔢   | °C      |     |
| [selburnpow](http://ems-esp/api/boiler/selburnpow)                 | Set maximum burner power    | boiler         | 🔢   | %       | ✔   | Always 0      |
| [burnstarts](http://ems-esp/api/boiler/burnstarts)                 | Burner starts                            | boiler         | 🔢   |         |     | Always 0      |
| [burnworkmin](http://ems-esp/api/boiler/burnworkmin)               | Burner operating time                          | boiler         | 🔢   | minutes |     | Always 0      |
| [burn2workmin](http://ems-esp/api/boiler/burn2workmin)             | Burner operating time stage 2                  | boiler         | 🔢   | minutes |     | Always 0      |
| [heatworkmin](http://ems-esp/api/boiler/heatworkmin)               | Heating operating time                             | boiler         | 🔢   | minutes |     | Always 0      |
| [heatstarts](http://ems-esp/api/boiler/heatstarts)                 | Burner starts heating                     | boiler         | 🔢   |         |     | Always 0      |
| [lastcode](http://ems-esp/api/boiler/lastcode)                     | Last error                           | boiler         | 🔠   |         |     | ---          |
| [servicecode](http://ems-esp/api/boiler/servicecode)               | Status message                            | boiler         | 🔠   |         |     | ---          |
| [servicecodenumber](http://ems-esp/api/boiler/servicecodenumber)   | Status message number                     | boiler         | 🔢   |         |     | ---          |
| [maintenancemessage](http://ems-esp/api/boiler/maitnenancemessage) | Maintenance message                          | boiler         | 🔠   |         |     | ---          |
| [maintenance](http://ems-esp/api/boiler/maintenance)               | Maintenance schedule                             | boiler         | enum |         | ✔   | ---          |
| [maintenancetime](http://ems-esp/api/boiler/maintenancetime)       | Maintenance in                               | boiler         | 🔢   | hours | ✔   | ---          |
| [maintenancedate](http://ems-esp/api/boiler/maintenancedate)       | Maintenance date                            | boiler         | 🔠   |         | ✔   | ---          |
| [emergencyops](http://ems-esp/api/boiler/emergencyops)             | Emergency operation                               | boiler         | ☑    |         | ✔   | ?            |
| [emergencytemp](http://ems-esp/api/boiler/emergencytemp)           | Emergency temperature                        | boiler         | 🔢   | °C      | ✔   | ?            |
| [hpmaxpower](http://ems-esp/api/boiler/hpmaxpower)                 | max. compressor power                  | boiler         | 🔢   | %       | ✔   | ---          |
| [powerreduction](http://ems-esp/api/boiler/powerreduction)         | Power reduction                    | boiler         | 🔢   | %       | ✔   | ---          |
| [hpbrinepumpspd](http://ems-esp/api/boiler/hpbrinepumpspd)         | Brine pump speed                       | boiler         | 🔢   | %       |     |
| [hpbrinein](http://ems-esp/api/boiler/hpbrinein)                   | Brine in/evaporator                       | boiler         | 🔢   | °C      |     |
| [hpbrineout](http://ems-esp/api/boiler/hpbrineout)                 | Brine out/condenser                     | boiler         | 🔢   | °C      |     |
| [poolsettemp](http://ems-esp/api/boiler/poolsettemp)               | Pool target temperature                  | boiler         | 🔢   | °C      | ✔   |
| [auxlimitstart](http://ems-esp/api/boiler/auxlimitstart)           | Auxiliary heater limit start                | boiler         | 🔢   | K       | ✔   |
| [auxheatrmode](http://ems-esp/api/boiler/auxheatrmode)             | Auxiliary heating mode                      | boiler         | enum |         | ✔   |
| [hphystheat](http://ems-esp/api/boiler/hphystheat)                 | Heating switching hysteresis                   | boiler         | 🔢   | K\*min  | ✔   | ---          |
| [hphystcool](http://ems-esp/api/boiler/hphystcool)                 | Cooling switching hysteresis                   | boiler         | 🔢   | K\*min  | ✔   | ---          |
| [hphystpool](http://ems-esp/api/boiler/hphystpool)                 | Pool switching hysteresis                     | boiler         | 🔢   | K\*min  | ✔   | ---          |
| [silentfrom](http://ems-esp/api/boiler/silentfrom)                 | Silent mode start                        | boiler         | 🔢   | minutes | ✔   | ---          |
| [silentto](http://ems-esp/api/boiler/silentto)                     | Silent mode end                         | boiler         | 🔢   | minutes | ✔   | ---          |
| [auxheatmix](http://ems-esp/api/boiler/auxheatmix)                 | Auxiliary heater mixing valve                 | boiler         | 🔢   | %       |     |
| [vpcooling](http://ems-esp/api/boiler/vpcooling)                   | Valve/pump for cooling                  | boiler         | ☑    |         | ✔   |
| [heatcable](http://ems-esp/api/boiler/heatcable)                   | Heating cable                                 | boiler         | ☑    |         | ✔   |
| [vc0valve](http://ems-esp/api/boiler/vc0valve)                     | VC0 valve                               | boiler         | ☑    |         | ✔   |
| [primepump](http://ems-esp/api/boiler/primepump)                   | Main pump                               | boiler         | ☑    |         | ✔   | Always OFF    |
| [primepumpmod](http://ems-esp/api/boiler/primepumpmod)             | Main pump modulation                    | boiler         | 🔢   | %       | ✔   | Always 0      |
| [hppumpmode](http://ems-esp/api/boiler/hppumpmode)                 | primary heat pump mode                | boiler         | enum |         | ✔   | ---          |
| [fan](http://ems-esp/api/boiler/fan)                               | Fan                                   | boiler         | 🔢   | %       | ✔   | ---          |
| [hppowerlimit](http://ems-esp/api/boiler/hppowerlimit)             | Power limit                          | boiler         | 🔢   | W       | ✔   | ---          |
| [pc1rate](http://ems-esp/api/boiler/pc1rate)                       | PC1 rate                                 | boiler         | 🔢   | %       |     | Always 0%     |
| [hptr7](http://ems-esp/api/boiler/hptr7)                           | Refrigerant (gaseous) (TR7)            | boiler         | 🔢   | °C      |     |
| [hpcircpump](http://ems-esp/api/boiler/hpcircpump)                 | DHW circulation possible during DHW production | boiler<br>dhw  | ☑    |         | ✔   | ---          |
| [tapactivated](http://ems-esp/api/boiler/tapactivated)             | DHW instantaneous water heater active              | boiler<br>dhw  | ☑    |         | ✔   | ---          |
| [seltempoff](http://ems-esp/api/boiler/seltempoff)                 | DHW selected temperature when OFF       | boiler<br>dhw  | 🔢   | °C      |     | ---          |
| [solartemp](http://ems-esp/api/boiler/solartemp)                   | DHW solar boiler temperature                | boiler<br>dhw  | 🔢   | °C      |     | ---          |
| [type](http://ems-esp/api/boiler/type)                             | DHW type                                  | boiler<br>dhw  | enum |         |     | ---          |
| [comfort](http://ems-esp/api/boiler/comfort)                       | DHW comfort                              | boiler<br>dhw  | enum |         | ✔   | ---          |
| [comfort1](http://ems-esp/api/boiler/comfort1)                     | DHW comfort mode                        | boiler<br>dhw  | enum |         | ✔   | ?            |
| [flowtempoffset](http://ems-esp/api/boiler/flowtempoffset)         | DHW flow temperature increase           | boiler<br>dhw  | 🔢   | °C      | ✔   | ?            |
| [chargeoptimization](http://ems-esp/api/boiler/chargeoptimization) | DHW charging optimization                   | boiler<br>dhw  | ☑    |         | ✔   | ---          |
| [maxpower](http://ems-esp/api/boiler/maxpower)                     | DHW max. power                        | boiler<br>dhw  | 🔢   | %       | ✔   | ---          |
| [maxtemp](http://ems-esp/api/boiler/maxtemp)                       | DHW maximum temperature                  | boiler<br>dhw  | 🔢   | °C      | ✔   | ---          |
| [chargetype](http://ems-esp/api/boiler/chargetype)                 | DHW tank charging type                   | boiler<br>dhw  | enum |         |     | ---          |
| [hyston](http://ems-esp/api/boiler/hyston)                         | DHW switch-on temperature difference         | boiler<br>dhw  | 🔢   | °C      | ✔   | ?            |
| [hystoff](http://ems-esp/api/boiler/hystoff)                       | DHW switch-off temperature difference         | boiler<br>dhw  | 🔢   | °C      | ✔   | ?            |
| [curflow](http://ems-esp/api/boiler/curflow)                       | DHW current flow rate                 | boiler<br>dhw  | 🔢   | l/min   |     | Always 0      |
| [storagetemp1](http://ems-esp/api/boiler/storagetemp1)             | DHW internal tank temperature           | boiler<br>dhw  | 🔢   | °C      |     | ---          |
| [storagetemp2](http://ems-esp/api/boiler/storagetemp2)             | DHW external tank temperature           | boiler<br> dhw | 🔢   | °C      |     | ---          |
| [recharging](http://ems-esp/api/boiler/recharging)                 | DHW reheating                            | boiler<br>dhw  | ☑    |         |     | ?            |
| [tempok](http://ems-esp/api/boiler/tempok)                         | DHW temperature OK                        | boiler<br>dhw  | ☑    |         |     | ?            |
| [active](http://ems-esp/api/boiler/active)                         | DHW active                                | boiler<br>dhw  | ☑    |         |     |
| [mixertemp](http://ems-esp/api/boiler/mixertemp)                   | DHW mixer temperature                    | boiler<br>dhw  | 🔢   | °C      |     | ---          |
| [cylmiddletemp](http://ems-esp/api/boiler/cylmiddletemp)           | DHW tank middle temperature             | boiler<br>dhw  | 🔢   | °C      |     | ---          |
| [starts](http://ems-esp/api/boiler/starts)                         | DHW number of starts                        | boiler<br>dhw  | 🔢   |         |     | Always 0      |
| [workm](http://ems-esp/api/boiler/workm)                           | DHW active time                          | boiler<br>dhw  | 🔢   | minutes |     | Always 0      |
| [hpswitchvalve](http://ems-esp/api/boiler/hpswitchvalve)           | Switching valve                             | boiler         | ☑    |         |     | Always OFF    |
| [headertemp](http://ems-esp/api/boiler/headertemp)                 | Hydraulic separator                             | boiler         | 🔢   | °C      |     | Always 0      |

Thermostat:

| ID                                                                         | Name                                        | Module            | Type | Unit | RW | Description |
| -------------------------------------------------------------------------- | ------------------------------------------- | ----------------- | ---- | ---- | -- | ----------- |
| [errorcode](http://ems-esp/api/thermostat/errorcode)                       | Error code                                  | thermostat        | 🔠   |         |     |
| [lastcode](http://ems-esp/api/thermostat/lastcode)                         | Last error                              | thermostat        | 🔠   |         |     |
| [floordry](http://ems-esp/api/thermostat/floordry)                         | Screed drying                            | thermostat        | enum |         |     |
| [floordrytemp](http://ems-esp/api/thermostat/floordrytemp)                 | Screed drying temperature                 | thermostat        | 🔢   | °C      |     |
| [hybridstrategy](http://ems-esp/api/thermostat/hybridstrategy)             | Hybrid control strategy                  | thermostat        | enum |         | ✔   |
| [switchovertemp](http://ems-esp/api/thermostat/switchovertemp)             | Outdoor temperature for changeover             | thermostat        | 🔢   | °C      | ✔   |
| [energycostratio](http://ems-esp/api/thermostat/energycostratio)           | Energy/cost ratio                   | thermostat        | 🔢   |         | ✔   |
| [fossilefactor](http://ems-esp/api/thermostat/fossilefactor)               | Fossil energy factor                        | thermostat        | 🔢   |         | ✔   |
| [electricfactor](http://ems-esp/api/thermostat/electricfactor)             | Electric energy factor                    | thermostat        | 🔢   |         | ✔   |
| [delayboiler](http://ems-esp/api/thermostat/delayboiler)                   | Delay option                          | thermostat        | 🔢   | minutes | ✔   |
| [tempdiffboiler](http://ems-esp/api/thermostat/tempdiffboiler)             | Temperature difference option                   | thermostat        | 🔢   | °C      | ✔   |
| [currtemp](http://ems-esp/api/thermostat/currtemp)                         | HC1 current room temperature                 | thermostat<br>hc1 | 🔢   | °C      |     |
| [haclimate](http://ems-esp/api/thermostat/haclimate)                       | HC1 Discovery current room temperature       | thermostat<br>hc1 | enum |         |     |
| [modetype](http://ems-esp/api/thermostat/modetype)                         | HC1 mode type                                | thermostat<br>hc1 | enum |         |     |
| [ecotemp](http://ems-esp/api/thermostat/ecotemp)                           | HC1 eco temperature                          | thermostat<br>hc1 | 🔢   | °C      | ✔   |
| [comforttemp](http://ems-esp/api/thermostat/comforttemp)                   | HC1 comfort temperature                       | thermostat<br>hc1 | 🔢   | °C      | ✔   |
| [roominfluence](http://ems-esp/api/thermostat/roominfluence)               | HC1 room influence                            | thermostat<br>hc1 | 🔢   | °C      | ✔   |
| [roominflfactor](http://ems-esp/api/thermostat/roominflfactor)             | HC1 room influence factor                      | thermostat<br>hc1 | 🔢   |         | ✔   |
| [curroominfl](http://ems-esp/api/thermostat/curroominfl)                   | HC1 current room influence                  | thermostat<br>hc1 | 🔢   | °C      |     |
| [nofrostmode](http://ems-esp/api/thermostat/nofrostmode)                   | HC1 frost protection mode                        | thermostat<br>hc1 | enum |         | ✔   |
| [nofrosttemp](http://ems-esp/api/thermostat/nofrosttemp)                   | HC1 frost protection temperature                   | thermostat<br>hc1 | 🔢   | °C      | ✔   |
| [summersetmode](http://ems-esp/api/thermostat/summersetmode)               | HC1 summer operation setting               | thermostat<br>hc1 | enum |         | ✔   |
| [hpoperatingmode](http://ems-esp/api/thermostat/hpoperatingmode)           | HC1 heat pump operating mode                        | thermostat<br>hc1 | enum |         | ✔   |
| [summermode](http://ems-esp/api/thermostat/summermode)                     | HC1 summer operation                           | thermostat<br>hc1 | enum |         |     |
| [controlmode](http://ems-esp/api/thermostat/controlmode)                   | HC1 control mode                             | thermostat<br>hc1 | enum |         | ✔   |
| [program](http://ems-esp/api/thermostat/program)                           | HC1 program                                | thermostat<br>hc1 | enum |         | ✔   |
| [tempautotemp](http://ems-esp/api/thermostat/tempautotemp)                 | HC1 temporary target temperature automatic mode | thermostat<br>hc1 | 🔢 | °C | ✔ |
| [remoteseltemp](http://ems-esp/api/thermostat/remoteseltemp)               | HC1 temporary target temperature remote         | thermostat<br>hc1 | 🔢   | °C      | ✔   |
| [fastheatup](http://ems-esp/api/thermostat/fastheatup)                     | HC1 rapid heating                     | thermostat<br>hc1 | 🔢   | %       | ✔   |
| [switchonoptimization](http://ems-esp/api/thermostat/switchonoptimization) | HC1 switch-on optimization                    | thermostat<br>hc1 | ☑    |         | ✔   |
| [reducemode](http://ems-esp/api/thermostat/reducemode)                     | HC1 setback mode                             | thermostat<br>hc1 | enum |         | ✔   |
| [noreducetemp](http://ems-esp/api/thermostat/noreducetemp)                 | HC1 continuous heating below                       | thermostat<br>hc1 | 🔢   | °C      | ✔   |
| [reducetemp](http://ems-esp/api/thermostat/reducetemp)                     | HC1 setback mode below                       | thermostat<br>hc1 | 🔢   | °C      | ✔   |
| [dhwprio](http://ems-esp/api/thermostat/dhwprio)                           | HC1 DHW priority                              | thermostat<br>hc1 | ☑    |         | ✔   |
| [hpcooling](http://ems-esp/api/thermostat/hpcooling)                       | HC1 heat pump cooling                               | thermostat<br>hc1 | ☑    |         | ✔   |
| [coolingon](http://ems-esp/api/thermostat/coolingon)                       | HC1 cooling on                              | thermostat<br>hc1 | ☑    |         |     |
| [dewoffset](http://ems-esp/api/thermostat/dewoffset)                       | HC1 dew point difference                       | thermostat<br>hc1 | 🔢   | K       | ✔   |
| [roomtempdiff](http://ems-esp/api/thermostat/roomtempdiff)                 | HC1 room temperature difference                 | thermostat<br>hc1 | 🔢   | K       | ✔   |
| [hpminflowtemp](http://ems-esp/api/thermostat/hpminflowtemp)               | HC1 heat pump minimum flow temperature           | thermostat<br>hc1 | 🔢   | °C      | ✔   |
| [control](http://ems-esp/api/thermostat/control)                           | HC1 remote control                           | thermostat<br>hc1 | enum |         | ✔   |
| [remotetemp](http://ems-esp/api/thermostat/remotetemp)                     | HC1 remote room temperature                   | thermostat<br>hc1 | 🔢   | °C      | ✔   |
| [remotehum](http://ems-esp/api/thermostat/remotehum)                       | HC1 remote room humidity                      | thermostat<br>hc1 | 🔢   | %       | ✔   |
| [boost](http://ems-esp/api/thermostat/boost)                               | HC1 boost                                   | thermostat<br>hc1 | ☑    |         | ✔   |
| [boosttime](http://ems-esp/api/thermostat/boosttime)                       | HC1 boost duration                             | thermostat<br>hc1 | 🔢   | hours   | ✔   |
| [coolstart](http://ems-esp/api/thermostat/coolstart)                       | HC1 cooling from                          | thermostat<br>hc1 | 🔢   | °C      | ✔   |
| [coolondelay](http://ems-esp/api/thermostat/coolondelay)                   | HC1 cooling switch-on delay             | thermostat<br>hc1 | 🔢   | hours   | ✔   |
| [cooloffdelay](http://ems-esp/api/thermostat/cooloffdelay)                 | HC1 cooling switch-off delay             | thermostat<br>hc1 | 🔢   | hours   | ✔   |
| [switchprogmode](http://ems-esp/api/thermostat/switchprogmode)             | HC1 switching program mode                     | thermostat<br>hc1 | enum |         | ✔   |
| [settemp](http://ems-esp/api/thermostat/settemp)                           | DHW target temperature                          | thermostat<br>dhw | 🔢   | °C      | ✔   |
| [settemplow](http://ems-esp/api/thermostat/settemplow)                     | DHW lower target temperature                   | thermostat<br>dhw | 🔢   | °C      | ✔   |
| [circmode](http://ems-esp/api/thermostat/circmode)                         | DHW circulation pump mode                 | thermostat<br>dhw | enum |         | ✔   |
| [chargeduration](http://ems-esp/api/thermostat/chargeduration)             | DHW charging duration                               | thermostat<br>dhw | 🔢   | minutes | ✔   |
| [charge](http://ems-esp/api/thermostat/charge)                             | DHW charging                                   | thermostat<br>dhw | ☑    |         | ✔   |
| [extra](http://ems-esp/api/thermostat/extra)                               | DHW extra                                   | thermostat<br>dhw | 🔢   | °C      |     |
| [disinfecting](http://ems-esp/api/thermostat/disinfecting)                 | DHW disinfection                           | thermostat<br>dhw | ☑    |         | ✔   |
| [disinfectday](http://ems-esp/api/thermostat/disinfectday)                 | DHW disinfection day                        | thermostat<br>dhw | enum |         | ✔   |
| [disinfecttime](http://ems-esp/api/thermostat/disinfecttime)               | DHW disinfection time                       | thermostat<br>dhw | 🔢   | minutes | ✔   |
| [dailyheating](http://ems-esp/api/thermostat/dailyheating)                 | DHW daily heating                          | thermostat<br>dhw | ☑    |         | ✔   |
| [dailyheattime](http://ems-esp/api/thermostat/dailyheattime)               | DHW daily heating time                       | thermostat<br>dhw | 🔢   | minutes | ✔   |

</details>

## Reading entities

The list of all entities can be read from ems-esp by opening the following URL: [http://ems-esp/api/boiler/entities](http://ems-esp/api/boiler/entities) or [http://ems-esp/api/thermostat/entities](http://ems-esp/api/thermostat/entities).
You can also have them created directly as a Markdown table using `curl` and `jq`:

```
curl 'http://ems-esp/api/boiler/entities' | jq -r '[
  "| ID | Name | Module | Type | Unit | RW |",
  "|----|------|------------|-----|---------|------------|",
  (to_entries[] | "| [" + .value.name + "](http://ems-esp/api/boiler/" + .value.name + ") | " + .value.fullname + " | " + .value.circuit + " | " + .value.type + " | " + .value.uom + " | " + (if .value.writeable then "X" else "" end) + " |")
] | join("\n")'
```

Alternatively, you can read the entities in Home Assistant.
To do this, simply open [http://homeassistant.local:8123/developer-tools/template](http://homeassistant.local:8123/developer-tools/template) and replace the contents of the template editor with the following expression:

```
{% raw %}
{% for state in states %}{% if 'boiler' in state.entity_id %}
| {{- state.entity_id -}} | {{- state.name -}}|{% endif %}{% endfor %}
{% endraw %}
```

In Home Assistant, `dhw` is replaced with `ww`.

## Legend

🔢 Data type: Number \
🔠 Data type: String \
☑ Data type: Boolean
