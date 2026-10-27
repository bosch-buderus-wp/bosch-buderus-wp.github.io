---
title: "Connect a heat pump to evcc for surplus PV power"
headline: "evcc"
excerpt: "Instructions for integrating Bosch CS5800/6800i and Buderus WLW176/186i into evcc to use surplus PV power or a dynamic electricity tariff."
permalink: /en/docs/smarthome/evcc/
toc: true
smarthome_access: [ems-esp-api]
sidebar:
  nav: "en_docs"
lang: en
translation_url: /docs/smarthome/evcc
translation_generated: true
---

{% include smarthome-access.html %}

Owners of a PV system, a battery and/or a dynamic electricity tariff who are interested in energy-efficient control of their Bosch CS5800/6800i or Buderus WLW176/186i should take a look at [_evcc_](https://evcc.io).
_evcc_ was originally designed for charging electric vehicles with surplus PV power.
For some time now, however, _evcc_ has also supported [heat pumps](https://docs.evcc.io/docs/devices/heating#bosch-bosch-sg-ready) via _EMS-ESP_.

[![evcc increases domestic hot water temperature to 55°C with surplus PV power](https://i.ibb.co/215bQRLN/evcc.png)](https://i.ibb.co/215bQRLN/evcc.png)

The integration works via the SG Ready interface of the heat pump.
The standardised SG Ready interface provides 4 functions:

1. Utility lockout period (Ext1=1 / Ext4=0)
2. **Normal operation** (Ext1=0 / Ext4=0): normal operation
3. **Boost operation** (Ext1=0 / Ext4=1): increase of the room temperature setpoint and/or the domestic hot water setpoint, depending on what was configured under `System settings` &rarr; `Photovoltaic system`.
4. Forced boost operation (Ext1=1 / Ext4=1)

The SG Ready functions are actually implemented using corresponding control lines.
To control the heat pump via _evcc_, you do not need control lines, but instead use a trick that is described in more detail [here](https://bbqkees-electronics.nl/2024/10/03/using-the-smart-grid-sg-and-photovoltaic-pv-function-of-your-heat-pump-with-the-ems-gateways/).
The idea is to invert _External input 4_ with `curl -d '{ "value" : "1xxxxxxxxxxx" }' https://ems-esp/api/boiler/hpin4opt` in order to activate _Increased operation_.

## Setup

To make the `System settings` &rarr; `Photovoltaic system` menu visible on the heat pump's control panel, you must activate `System settings` &rarr; `Heat pump` &rarr; `External input` &rarr; `External input 4` &rarr; `Photovoltaic system`.

You can then configure the following settings under `System settings` &rarr; `Photovoltaic system`:

- `Increase desired temperature when heating`: when _evcc_ signals PV surplus to the heat pump, the room temperature setpoint is increased by the configured value
- `Increased domestic hot water comfort`: with PV surplus, the domestic hot water is heated to the stop temperature of the [_Comfort_](/en/docs/settings/#modi) operating mode.
- `Reduce desired temperature when cooling`: with PV surplus, the room temperature setpoint is reduced by the configured value
- `Cooling only with PV energy`: cooling operation is activated only when there is PV surplus
- `Max. power for compressor`: limits the compressor to the configured power when there is PV surplus

After installing _evcc_, you must add the following entries to `evcc.yaml`.
_ems-esp_ is added similarly to a wallbox as a `charger`, i.e. a controllable consumer:

```yaml
chargers:
  - name: wp
    type: template
    template: emsesp
    host: 192.168.178.70
    token: <token>
    tempsource: "warmwater"
```

For the token, it is best to create a new user in the [_ems-esp_ user management](http://ems-esp/settings/security/users).
Press the key symbol to obtain the token.

To make the heat pump appear on the _evcc_ start screen, you must also add the heat pump under _loadpoints_.

```yaml
loadpoints:
  - title: Heat pump
    charger: wp
```

## Usage

A tile for your heat pump should now appear in the _evcc_ interface.
Before you begin, open the settings by clicking the settings icon in the top right.
There you can configure the following settings:

[![EVCC heat pump configuration dialog](https://i.ibb.co/mFvmf6XS/evcc-config.png){:width="400px"}](https://i.ibb.co/mFvmf6XS/evcc-config.png)
{: .align-right}

- `Günstiges Netzladen`: If you have a dynamic electricity tariff, you can set the electricity price below which you want to allow _Verstärkter Betrieb_ by clicking on the bar or selecting an option from the dropdown menu.
  In the screenshot, _Verstärkter Betrieb_ is automatically activated when the electricity price falls below 21.7 ct/kWh.
- `PV-Überschuss`: With this controller, you can start _Verstärkter Betrieb_ even when the minimum charging current (0.7 kW in the example) is only partially available.
  For example, with an 800 W plug-in solar system, you may only sporadically achieve a surplus of 700 W.
  If you set the PV share to 80%, _Verstärkter Betrieb_ is activated at 560 W.
- `Batterie Boost`: If Batterie Boost is activated, the battery is also used during _Verstärkter Betrieb_ up to the configured SoC limit.
- `Min. Temperatur`: If a minimum temperature is configured, _Verstärkter Betrieb_ also starts without a PV surplus when the current domestic hot water temperature falls below this value.
- `Phasen`: Defines the maximum charging current (probably irrelevant for a heat pump)
- `Min. Ladestrom`: The minimum charging current defines the minimum output of the heat pump.
  If the PV surplus rises above this value, _Verstärkter Betrieb_ is activated.
  I set this to 1 A (0.7 kW) because my heat pump usually draws only around 300–400 W during the transitional period.

When you close the configuration dialog again, you can choose one of these 3 modes:

- `Normal`: Normal operation – no use of the PV surplus
- `Smart`: In the event of a PV surplus, _Enhanced operation_ is signaled to the heat pump – as defined in the configuration dialog
- `Boost`: _Enhanced operation_ is signaled to the heat pump immediately

Please note that _Boosted operation_ does not mean that the heat pump immediately starts heating or producing domestic hot water.
Only the target flow temperature ([thermostat/targetflowtemp](/en/docs/smarthome/entities/#messwerte) in EMS-ESP) is increased by the configured value, and the start and stop temperatures of the comfort mode for domestic hot water production are set for the duration of _Boosted operation_.
The heat pump then uses the known logic to decide whether it should heat or produce domestic hot water.

<!-- prettier-ignore -->
*[SoC]: State of Charge / state of charge
