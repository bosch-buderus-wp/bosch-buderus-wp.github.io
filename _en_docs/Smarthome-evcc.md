---
title: "Connect heat pump to evcc for PV surplus"
headline: "evcc"
excerpt: "Instructions for integrating Bosch CS5800/6800i and Buderus WLW176/186i into evcc for PV surplus utilisation and SG Ready-like automation."
permalink: /en/en/en/docs/smarthome/evcc
toc: true
sidebar:
  nav: "en_docs"
lang: en
translation_url: /en/en/docs/smarthome/evcc
translation_generated: true
---


Owners of a PV system, a battery and/or a dynamic electricity tariff who are interested in energy-efficient control of their Bosch CS5800/6800i or Buderus WLW176/186i should take a look at [_evcc_](https://evcc.io).
_evcc_ was originally designed for charging electric vehicles using PV surplus.
Recently, however, _evcc_ has also been testing [heat pumps](https://docs.evcc.io/docs/devices/heating#bosch-bosch-sg-ready) and now also supports Bosch/Buderus heat pumps via _ems-esp_.

[![evcc increases domestic hot water temperature to 50°C with PV surplus](https://i.ibb.co/bMx5RJLj/EVCC.png)](https://i.ibb.co/bMx5RJLj/EVCC.png)

The integration works via the SG Ready interface of the heat pump.
The standardised SG Ready interface provides 4 functions:

1. Utility lockout period (Ext1=1 / Ext4=0): not yet supported by _evcc_
2. Normal operation (Ext1=0 / Ext4=0): normal operation
3. Increased operation (Ext1=0 / Ext4=1): increases the room temperature setpoint and/or the domestic hot water setpoint, depending on what was configured under `System settings` &rarr; `Photovoltaic system`.
4. Forced increased operation (Ext1=1 / Ext4=1): not yet supported by _evcc_

The SG Ready functions are actually implemented using corresponding control lines.
To control the heat pump via _evcc_, you do not need control lines, but instead use a trick that is described in more detail [here](https://bbqkees-electronics.nl/2024/10/03/using-the-smart-grid-sg-and-photovoltaic-pv-function-of-your-heat-pump-with-the-ems-gateways/).
The idea is to invert _External input 4_ with `curl -d '{ "value" : "1xxxxxxxxxxx" }' https://ems-esp/api/boiler/hpin4opt` in order to activate _Increased operation_.

## Setup

To make the `System settings` &rarr; `Photovoltaic system` menu visible on the heat pump's control panel, you must activate `System settings` &rarr; `Heat pump` &rarr; `External input` &rarr; `External input 4` &rarr; `Photovoltaic system`.

You can then configure the following settings under `System settings` &rarr; `Photovoltaic system`:

- `Increase desired temperature when heating`: when _evcc_ signals PV surplus to the heat pump, the room temperature setpoint is increased by the configured value
- `Increased domestic hot water comfort`: with PV surplus, the domestic hot water is heated to the stop temperature of the [_Comfort_](/en/docs/einstellungen/#modi) operating mode.
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

In the _evcc_ interface, you should now see a display similar to the following:

The charging setting has the following meaning:

- `Off`: Normal operation – no use of PV surplus
- `PV` and `Min+PV`: When there is PV surplus, the heat pump is signalled _Increased operation_
- `Fast`: The heat pump is immediately signalled _Increased operation_
