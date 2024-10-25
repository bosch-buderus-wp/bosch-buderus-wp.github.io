---
title: Smarthome
permalink: /docs/smarthome/
toc: true
---

# EMS-ESP

Die Bosch/Buderus Wärmepumpen bieten leider keine offizielle Schnittstelle an, um Messwerte abzurufen oder Einstellungen vorzunehmen.

Glücklicherweise gibt es das open-source Projekt [ems-esp](https://emsesp.org).
Wer die Hardware nicht selbst basteln möchte, kann bereits mit ems-esp geflashte Hardware von [BBQKees](https://bbqkees-electronics.nl/?lang=de) beziehen.

Nachdem man die Hardware an die Servicebuchse der Inneneinheit angesteckt hat und das WLAN konfiguriert hat, kann man Daten über die Weboberfläche oder eine REST API auslesen.
Wenn man zuhause einen MQTT Broker hat, kann ems-esp die Messwerte auch dort publizieren.
Smarthome Systeme wie Home Assistant oder OpenHAB können die Daten dann vom MQTT Broker konsumieren.

## Messwerte

### Übersicht aller 154 Boiler-Messwerte

| Entitätsname                                | Wert              | Einheit | Schreibbar | Wertebereich                                                                  |
| ------------------------------------------- | ----------------- | ------- | ---------- | ----------------------------------------------------------------------------- |
| reset                                       |                   |         | yes        | - \| maintenance \| error                                                     |
| force heating off                           | off               |         | yes        | off \| on                                                                     |
| heating active                              | off               |         | no         |                                                                               |
| tapwater active                             | off               |         | no         |                                                                               |
| selected flow temperature                   | 0                 | C       | yes        | 0, 90                                                                         |
| heating pump modulation                     | 0                 |         | no         |                                                                               |
| outside temperature                         | 15.9              | C       | no         |                                                                               |
| current flow temperature                    | 22.4              | C       | no         |                                                                               |
| return temperature                          | 22.6              | C       | no         |                                                                               |
| system pressure                             | 1.6               | bar     | no         |                                                                               |
| low loss header                             | 0                 | C       | no         |                                                                               |
| heating activated                           | on                |         | yes        | off \| on                                                                     |
| heating temperature                         | 75                | C       | yes        | 0, 90                                                                         |
| heating pump                                | off               |         | no         |                                                                               |
| burner selected max power                   | 0                 |         | yes        | 0, 254                                                                        |
| burner current power                        | 0                 |         | no         |                                                                               |
| burner starts                               | 0                 |         | no         |                                                                               |
| total burner operating time                 | 0                 | minutes | no         |                                                                               |
| burner stage 2 operating time               | 0                 | minutes | no         |                                                                               |
| total heat operating time                   | 0                 | minutes | no         |                                                                               |
| burner starts heating                       | 0                 |         | no         |                                                                               |
| total UBA operating time                    | 216,898           | minutes | no         |                                                                               |
| emergency operation                         | off               |         | yes        | off \| on                                                                     |
| emergency temperature                       | 0                 | C       | yes        | 0, 70                                                                         |
| total energy                                | 1,641             | kWh     | no         |                                                                               |
| dhw energy                                  | 838               | kWh     | no         |                                                                               |
| energy heating                              | 803               | kWh     | no         |                                                                               |
| meter total                                 | 507               | kWh     | no         |                                                                               |
| meter compressor                            | 507               | kWh     | no         |                                                                               |
| meter e-heater                              | 0                 | kWh     | no         |                                                                               |
| meter heating                               | 287               | kWh     | no         |                                                                               |
| heatpump total uptime                       | 263,644           | minutes | no         |                                                                               |
| total operating time heat                   | 39,354            | minutes | no         |                                                                               |
| operating time compressor heating           | 26,474            | minutes | no         |                                                                               |
| operating time compressor cooling           | 0                 | minutes | no         |                                                                               |
| dhw operating time compressor               | 12,879            | minutes | no         |                                                                               |
| operating time compressor pool              | 0                 | minutes | no         |                                                                               |
| total compressor control starts             | 240               |         | no         |                                                                               |
| heating control starts                      | 101               |         | no         |                                                                               |
| cooling control starts                      | 0                 |         | no         |                                                                               |
| dhw control starts2                         | 139               |         | no         |                                                                               |
| pool control starts                         | 0                 |         | no         |                                                                               |
| total energy consumption                    | 507               | kWh     | no         |                                                                               |
| total energy consumption compressor         | 507               | kWh     | no         |                                                                               |
| energy consumption compressor heating       | 287               | kWh     | no         |                                                                               |
| dhw energy consumption compressor           | 219               | kWh     | no         |                                                                               |
| energy consumption compressor cooling       | 0                 | kWh     | no         |                                                                               |
| total aux elec. heater energy consumption   | 0                 | kWh     | no         |                                                                               |
| aux elec. heater energy consumption heating | 0                 | kWh     | no         |                                                                               |
| dhw aux elec. heater energy consumption     | 0                 | kWh     | no         |                                                                               |
| aux elec. heater energy consumption pool    | 0                 | kWh     | no         |                                                                               |
| total energy supplied                       | 1,641             | kWh     | no         |                                                                               |
| total energy supplied heating               | 803               | kWh     | no         |                                                                               |
| dhw total energy warm supplied              | 838               | kWh     | no         |                                                                               |
| total energy supplied cooling               | 0                 | kWh     | no         |                                                                               |
| compressor power output                     | 0                 | kW      | no         |                                                                               |
| compressor max power                        | 0                 |         | yes        | 0, 100                                                                        |
| set differential pressure                   | 5                 | mbar    | yes        | 150, 750                                                                      |
| hp compressor                               | off               |         | no         |                                                                               |
| compressor activity                         | none              |         | no         |                                                                               |
| brine pump speed                            | 0                 |         | no         |                                                                               |
| switch valve                                | off               |         | no         |                                                                               |
| compressor speed                            | 0                 |         | no         |                                                                               |
| circulation pump speed                      | 0                 |         | no         |                                                                               |
| brine in/evaporator                         | 0                 | C       | no         |                                                                               |
| brine out/condenser                         | 0                 | C       | no         |                                                                               |
| heat carrier return (TC0)                   | 22.6              | C       | no         |                                                                               |
| heat carrier forward (TC1)                  | 22.4              | C       | no         |                                                                               |
| condenser temperature (TC3)                 | 22.6              | C       | no         |                                                                               |
| compressor temperature (TR1)                | 38.1              | C       | no         |                                                                               |
| refrigerant temperature liquid side (TR3)   | 28.6              | C       | no         |                                                                               |
| evaporator inlet temperature (TR4)          | 26.9              | C       | no         |                                                                               |
| compressor inlet temperature (TR5)          | 26.4              | C       | no         |                                                                               |
| compressor outlet temperature (TR6)         | 29.2              | C       | no         |                                                                               |
| refrigerant temperature gas side (TR7)      | 0                 | C       | no         |                                                                               |
| air inlet temperature (TL2)                 | 15.3              | C       | no         |                                                                               |
| low pressure side temperature (PL1)         | 15.5              | C       | no         |                                                                               |
| high pressure side temperature (PH1)        | 15.6              | C       | no         |                                                                               |
| drain pan temp (TA4)                        | 13.9              | C       | no         |                                                                               |
| reservoir temp (TW1)                        | 47.1              | C       | no         |                                                                               |
| 4-way valve (VR4)                           | cooling & defrost |         | no         |                                                                               |
| input 1 options                             | 000000000000000   |         | yes        |                                                                               |
| input 2 options                             | 000000000000000   |         | yes        | inv [evu1, evu2, evu3, comp, aux, cool, heat, dhw, pv]                        |
| input 3 options                             | 100000000000000   |         | yes        | inv [evu1, evu2, evu3, comp, aux, cool, heat, dhw, pv]                        |
| input 4 options                             | 000000000000      |         | yes        | inv [comp, aux, cool, heat, dhw, pv]                                          |
| heat limit compressor                       | 0 kW              |         | yes        | 0 kW \| 2 kW \| 3 kW \| 4 kW \| 6 kW \| 9 kW                                  |
| heat limit heating                          | 3 kW              |         | yes        | 0 kW \| 2 kW \| 3 kW \| 4 kW \| 6 kW \| 9 kW                                  |
| dhw heat limit                              | 3 kW              |         | yes        | 0 kW \| 2 kW \| 3 kW \| 4 kW \| 6 kW \| 9 kW                                  |
| manual defrost                              | on                |         | yes        | off \| on                                                                     |
| cooling only with PV                        | off               |         | yes        | off \| on                                                                     |
| aux heater only                             | off               |         | yes        | off \| on                                                                     |
| disable aux heater                          | on                |         | yes        | off \| on                                                                     |
| aux heater status                           | off               |         | no         |                                                                               |
| aux heater on delay                         | 300               | Kmin    | yes        | 10, 1000                                                                      |
| aux heater max limit                        | 2                 | K       | yes        | 0, 10                                                                         |
| aux heater limit start                      | 2                 | K       | yes        | 0, 10                                                                         |
| aux heater mode                             | eco               |         | yes        | eco \| comfort                                                                |
| on/off hyst heat                            | 0                 | Kmin    | yes        | 0, 1500                                                                       |
| on/off hyst cool                            | 0                 | Kmin    | yes        | 0, 1500                                                                       |
| on/off hyst pool                            | 1,125             | Kmin    | yes        | 50, 1500                                                                      |
| silent mode                                 | auto              |         | yes        | off \| auto \| on                                                             |
| silent mode from                            | 1,320             | minutes | yes        | 0, 3810                                                                       |
| silent mode to                              | 360               | minutes | yes        | 0, 3810                                                                       |
| min outside temp for silent mode            | -10               | C       | yes        | -126, 126                                                                     |
| outside temp parallel mode                  | -7                | C       | yes        | -126, 126                                                                     |
| aux heater mixing valve                     | 0                 |         | no         |                                                                               |
| temp diff TC3/TC0 heat                      | 4.5               | K       | yes        | 2, 10                                                                         |
| temp diff TC3/TC0 cool                      | 3                 | K       | yes        | 2, 10                                                                         |
| valve/pump cooling                          | off               |         | yes        | off \| on                                                                     |
| heating cable                               | off               |         | yes        | off \| on                                                                     |
| VC0 valve                                   | off               |         | yes        | off \| on                                                                     |
| primary heatpump                            | off               |         | yes        | off \| on                                                                     |
| primary heatpump modulation                 | 0                 |         | yes        | 0, 100                                                                        |
| 3-way valve                                 | off               |         | yes        | off \| on                                                                     |
| el. heater step 1                           | off               |         | yes        | off \| on                                                                     |
| el. heater step 2                           | off               |         | yes        | off \| on                                                                     |
| el. heater step 3                           | off               |         | yes        | off \| on                                                                     |
| condensate reservoir heating (EA0)          | off               |         | no         |                                                                               |
| primary heatpump mode                       | auto              |         | yes        | auto \| continuous                                                            |
| dhw alternating operation                   | on                |         | yes        | off \| on                                                                     |
| dhw prioritize heating during dhw           | 30                | minutes | yes        | 20, 120                                                                       |
| dhw prioritize dhw during heating           | 120               | minutes | yes        | 30, 120                                                                       |
| dhw eco+ switch off                         | 0                 | C       | yes        | 0, 63                                                                         |
| dhw comfort diff                            | 7                 | K       | yes        | 6, 12                                                                         |
| dhw eco diff                                | 7                 | K       | yes        | 6, 12                                                                         |
| dhw eco+ diff                               | 7                 | K       | yes        | 6, 12                                                                         |
| dhw circulation pump available during dhw   | off               |         | yes        | off \| on                                                                     |
| dhw set temperature                         | 41                | C       | no         |                                                                               |
| dhw selected temperature                    | 45                | C       | yes        | 0, 254                                                                        |
| dhw selected lower temperature              | 41                | C       | yes        | 0, 254                                                                        |
| dhw selected eco+ temperature               | 33                | C       | yes        | 0, 254                                                                        |
| dhw single charge temperature               | 60                | C       | yes        | 0, 254                                                                        |
| dhw comfort mode                            | high comfort      |         | yes        | high comfort \| eco                                                           |
| dhw flow temperature offset                 | 0                 | C       | yes        | 0, 100                                                                        |
| dhw charge optimization                     | off               |         | yes        | off \| on                                                                     |
| dhw maximum temperature                     | 0                 | C       | yes        | 0, 80                                                                         |
| dhw circulation pump available              | off               |         | yes        | off \| on                                                                     |
| dhw hysteresis on temperature               | 0                 | C       | yes        | -126, 126                                                                     |
| dhw hysteresis off temperature              | 0                 | C       | yes        | -126, 126                                                                     |
| dhw disinfection temperature                | 70                | C       | yes        | 60, 80                                                                        |
| dhw circulation pump mode                   | 3x3min            |         | yes        | off \| 1x3min \| 2x3min \| 3x3min \| 4x3min \| 5x3min \| 6x3min \| continuous |
| dhw circulation active                      | off               |         | yes        | off \| on                                                                     |
| dhw current intern temperature              | 47                | C       | no         |                                                                               |
| dhw current extern temperature              | 47                | C       | no         |                                                                               |
| dhw current tap water flow                  | 0                 | lmin    | no         |                                                                               |
| dhw activated                               | on                |         | yes        | off \| on                                                                     |
| dhw one time charging                       | off               |         | yes        | off \| on                                                                     |
| dhw disinfecting                            | off               |         | yes        | off \| on                                                                     |
| dhw charging                                | off               |         | no         |                                                                               |
| dhw recharging                              | off               |         | no         |                                                                               |
| dhw temperature ok                          | off               |         | no         |                                                                               |
| dhw 3-way valve active                      | off               |         | no         |                                                                               |
| dhw starts                                  | 0                 |         | no         |                                                                               |
| dhw active time                             | 0                 | minutes | no         |                                                                               |

### Übersicht aller 63 Thermostat-Messwerte

| Entitätsname                                | Wert                | Einheit | Schreibbar | Wertebereich                                                                 |
| ------------------------------------------- | ------------------- | ------- | ---------- | ---------------------------------------------------------------------------- |
| date/time                                   | 18.09.2024 20:15    |         | yes        | NTP \| dd.mm.yyyy-hh:mm:ss-day(0-6)-dst(0/1)                                 |
| internal temperature offset                 | 0                   | C       | yes        | -12, 12                                                                      |
| floor drying                                | off                 |         | no         |                                                                              |
| damped outdoor temperature                  | 18.3                | C       | no         |                                                                              |
| floor drying temperature                    | 0                   | C       | no         |                                                                              |
| building type                               | medium              |         | yes        | light \| medium \| heavy                                                     |
| minimal external temperature                | -10                 | C       | yes        | -126, 126                                                                    |
| damping outdoor temperature                 | on                  |         | yes        | off \| on                                                                    |
| dhw mode                                    | own prog            |         | yes        | off \| normal \| comfort \| auto \| own prog \| eco                          |
| dhw circulation pump mode                   | on                  |         | yes        | off \| on \| auto \| own prog                                                |
| dhw charge duration                         | 180                 | minutes | yes        | 0, 3810                                                                      |
| dhw charge                                  | off                 |         | yes        | off \| on                                                                    |
| dhw circuit 1 extra                         | 0                   | C       | no         |                                                                              |
| dhw disinfecting                            | off                 |         | yes        | off \| on                                                                    |
| dhw disinfection day                        | tu                  |         | yes        | mo \| tu \| we \| th \| fr \| sa \| su \| all                                |
| dhw disinfection time                       | 120                 | minutes | yes        | 0, 1431                                                                      |
| energy cost ratio                           | 0                   |         | yes        | 0, 20                                                                        |
| enable raise dhw                            | off                 |         | yes        | off \| on                                                                    |
| raise heating with PV                       | 2                   | K       | yes        | 0, 5                                                                         |
| lower cooling with PV                       | 0                   | K       | yes        | -5, 0                                                                        |
| hc1 selected room temperature               | 0                   | C       | yes        | 0, 30                                                                        |
| hc1 mqtt discovery current room temperature | selTemp             |         | no         |                                                                              |
| hc1 mode                                    | off                 |         | yes        | off \| manual \| auto                                                        |
| hc1 mode type                               | eco                 |         | no         |                                                                              |
| hc1 eco temperature                         | 19                  | C       | yes        | 0, 127                                                                       |
| hc1 manual temperature                      | 0                   | C       | yes        | 0, 127                                                                       |
| hc1 comfort temperature                     | 21                  | C       | yes        | 0, 127                                                                       |
| hc1 summer temperature                      | 18                  | C       | yes        | 10, 30                                                                       |
| hc1 design temperature                      | 38                  | C       | yes        | 0, 254                                                                       |
| hc1 offset temperature                      | 0                   | C       | yes        | -126, 126                                                                    |
| hc1 min flow temperature                    | 25                  | C       | yes        | 0, 254                                                                       |
| hc1 max flow temperature                    | 40                  | C       | yes        | 0, 254                                                                       |
| hc1 room influence                          | 0                   | C       | yes        | 0, 254                                                                       |
| hc1 room influence factor                   | 0                   |         | yes        | 0, 25                                                                        |
| hc1 current room influence                  | 0                   | C       | no         |                                                                              |
| hc1 nofrost mode                            | outdoor             |         | yes        | room \| outdoor \| room outdoor                                              |
| hc1 nofrost temperature                     | 5                   | C       | yes        | -126, 126                                                                    |
| hc1 target flow temperature                 | 0                   | C       | no         |                                                                              |
| hc1 heating type                            | floor               |         | yes        | off \| radiator \| convector \| floor                                        |
| hc1 heatpump operating mode                 | auto                |         | yes        | off \| auto \| heating \| cooling                                            |
| hc1 heatpump operating state                | off                 |         | no         |                                                                              |
| hc1 control mode                            | weather compensated |         | yes        | weather compensated \| outside basepoint \| n/a \| room \| power \| constant |
| hc1 program                                 | prog 1              |         | yes        | prog 1 \| prog 2                                                             |
| hc1 temporary set temperature automode      | -1                  | C       | yes        | -1, 30                                                                       |
| hc1 temporary set temperature from remote   | 26                  | C       | no         |                                                                              |
| hc1 fast heatup                             | 0                   |         | yes        | 0, 100                                                                       |
| hc1 switch-on optimization                  | off                 |         | yes        | off \| on                                                                    |
| hc1 reduce mode                             | reduce              |         | yes        | outdoor \| room \| reduce                                                    |
| hc1 no reduce below temperature             | -31                 | C       | yes        | -126, 126                                                                    |
| hc1 off/reduce switch temperature           | 0                   | C       | yes        | -126, 126                                                                    |
| hc1 dhw priority                            | off                 |         | yes        | off \| on                                                                    |
| hc1 cooling                                 | off                 |         | yes        | off \| on                                                                    |
| hc1 cooling                                 | off                 |         | no         |                                                                              |
| hc1 HP Mode                                 | heating             |         | yes        | heating \| cooling \| heating&cooling                                        |
| hc1 dew point offset                        | 3                   | K       | yes        | 2, 10                                                                        |
| hc1 room temp difference                    | 1                   | K       | yes        | 0, 254                                                                       |
| hc1 HP min. flow temp.                      | 10                  | C       | yes        | 0, 254                                                                       |
| hc1 control device                          | RC310               |         | yes        | RC310 \| RC200 \| RC100 \| RC100H \| TC100                                   |
| hc1 heat-on delay                           | 3                   | hours   | yes        | 1, 48                                                                        |
| hc1 heat-off delay                          | 3                   | hours   | yes        | 1, 48                                                                        |
| hc1 instant start                           | 4                   | K       | yes        | 1, 10                                                                        |
| hc1 boost mode                              | off                 |         | yes        | off \| on                                                                    |
| hc1 boost time                              | 1                   | hours   | yes        | 0, 254                                                                       |
