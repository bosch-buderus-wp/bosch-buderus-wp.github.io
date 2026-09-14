---
title: "Integrating a heat pump into Home Assistant with EMS-ESP"
headline: "Home Assistant"
excerpt: "Step-by-step guide for integrating Bosch CS5800/6800i and Buderus WLW176/186i into Home Assistant with EMS-ESP."
permalink: /en/docs/smarthome/ha
toc: true
sidebar:
  nav: "en_docs"
lang: en
translation_url: /docs/smarthome/ha
translation_generated: true
---

This guide assumes that you have already installed [ems-esp](/en/docs/smarthome/).

### Integrating ems-esp

After successfully [installing](https://www.home-assistant.io/installation) Home Assistant, you will see the following onboarding screen.

[![Home Assistant onboarding screen](/assets/images/HA-Onboarding.png)](/assets/images/HA-Onboarding.png)

Clicking _CREATE MY SMART HOME_ prompts you to create a user account and select an address.
In the next step, you can provide Home Assistant with optional telemetry data.
In the final step, devices that Home Assistant was able to identify on the home network during installation are displayed—for example, Fritzbox and Smart Plugs from Shelly.

Home Assistant cannot identify _ems-esp_ directly.
You can quickly change this by selecting _Add Integration_ under _Settings &rarr; Devices & Services_.
Enter _MQTT_ in the provider search.

[![Home Assistant: MQTT integration](/assets/images/HA-MQTT.png)](/assets/images/HA-MQTT.png)

A dialog then opens where you can install the _official Mosquitto Mqtt Broker add-on_.
Once the MQTT integration has been successfully set up, you will see an overview of all devices identified via MQTT Discovery:

- ems-esp Boiler = heat pump
- ems-esp = gateway module
- ems-esp Thermostat = thermostat

After confirmation, you return to the overview, where all available entities are now displayed.

[![Home Assistant: overview](/assets/images/HA-Overview.png)](/assets/images/HA-Overview.png)

A more detailed installation guide can also be found directly at [ems-esp](https://bbqkees-electronics.nl/wiki-archive/gateway/home-assistant-configuration.html).

### Visualizing measurement history

And then you can get started with the first measurements!
To better understand how the heat pump works and monitor its efficiency, it makes sense to have some measurements displayed graphically.
By clicking [_History_](https://my.home-assistant.io/redirect/history/) in the menu on the left, you can _Select entities_ whose history you want to view.
The following measurements are displayed in the history:

- _Boiler Selected Flow Temperature_: the desired flow temperature resulting from the [configured heating curve](/docs/einstellungen#heizkurve) and the outdoor temperature.
  In the example shown, the outdoor temperature was -2..-4 °C and the target flow temperature was 32..35 °C.
- _Boiler Current Flow Temperature_: the actual flow temperature, which, as shown in the diagram, oscillates around the selected flow temperature.
  The downward deviations are [defrost cycles](/en/docs/technischer-aufbau/#abtauvorgang), as the humidity was approximately 90%.

[![History of measurements](/assets/images/HA-History_FlowTemp.png)](/assets/images/HA-History_FlowTemp.png)

[![Open this history directly in Home Assistant](https://my.home-assistant.io/badges/history.svg "Open this history directly in Home Assistant")](http://homeassistant.local:8123/history?entity_id=sensor.boiler_curflowtemp%2Cnumber.boiler_selflowtemp)

### Performance factor/COP with helper entities

The performance factor, sometimes also referred to as COP, provides particularly interesting insight into the system's efficiency.
The performance factor is not directly available via _ems-esp_, but it can be set up easily.
The performance factor is the quotient of the thermal power output _Q_ and the electrical power consumption _P_.
For the calculation, you need 3 [helper entities](https://my.home-assistant.io/redirect/helpers/):

<figure class="third">
  <a href="/assets/images/HA-Helper_PowerTotal.png">
  <img src="/assets/images/HA-Helper_PowerTotal.png" alt="Helper entity for current thermal power output"></a>
  <a href="/assets/images/HA-Helper_PowerConsTotal.png">
  <img src="/assets/images/HA-Helper_PowerConsTotal.png" alt="Helper entity for current electrical power consumption"></a>
  <a href="/assets/images/HA-Helper_Arbeitszahl.png">
  <img src="/assets/images/HA-Helper_Arbeitszahl.png" alt="Helper entity for current performance factor"></a>
</figure>

1. **Thermal power output** as a _Derivative sensor_ of the thermal energy
   - Type: Helper &rarr; Derivative sensor
   - Name: _boiler_powertotal_
   - Input sensor: _ems-esp Boiler Total Energy_
   - Precision: _2_ decimals
   - Time window: at least _10 minutes_ to smooth out measurement inaccuracies somewhat
   - Time unit: _Hours_
2. **Electrical power consumption** as a _Derivative sensor_ of the electrical energy
   - Type: Helper &rarr; Derivative sensor
   - Name: _boiler_powerconstotal_
   - Input sensor: _ems-esp Boiler Total Measurement_
   - Precision: _2_ decimals
   - Time window: at least _10 minutes_ to smooth out measurement inaccuracies somewhat
   - Time unit: _Hours_
3. **Performance factor** as a _Template for a sensor_
   - Type: Helper &rarr; Template &rarr; Template for a sensor
   - Name: _boiler_az_
   - State template:
     {% raw %}
     ```jinja
     {% set q = states('sensor.boiler_powertotal') | float %}
     {% set p = states('sensor.boiler_powerconstotal') | float %}
     {% if q >= 0 and p > 0 %}
     {{ (q / p) | round(2) }}
     {% else %}
       0
     {% endif %}
     ```
     {% endraw %}
   - Device class: _Power factor_
   - Device: _ems-esp Boiler_

As described above for the flow temperature, you can also view the 3 new helper entities over any freely selectable period in the history:

[![History of measurements](/assets/images/HA-History_Arbeitszahl.png)](/assets/images/HA-History_Arbeitszahl.png)

[![Open this history directly in Home Assistant](https://my.home-assistant.io/badges/history.svg "Open this history directly in Home Assistant")](http://homeassistant.local:8123/history?entity_id=sensor.boiler_powerconstotal%2Csensor.boiler_powertotal%2Csensor.boiler_az)

The diagram shows the 3 helper entities at an outdoor temperature of -5 °C.
The electrical power consumption fluctuates between 530 W and 1600 W.
With the help of ambient heat, this produces between 2000 W and 4700 W.
The performance factor is approximately 3 during normal operation and drops sharply when the defrost cycle starts, as thermal energy is "lost" for defrosting.

You probably do not just want to see the current performance factor, but also evaluate it over the entire operating time of your heat pump.
To do this, simply create another helper entity for the **seasonal performance factor**:

- Type: Helper &rarr; Template &rarr; Template for a sensor
- Name: _boiler_jaz_
- State template:
  {% raw %}
  ```jinja
  {% set q = states('sensor.boiler_nrgsupptotal') | float %}
  {% set p = states('sensor.boiler_nrgconstotal') | float %}
  {% if q >= 0 and p > 0 %}
  {{ (q / p) | round(2) }}
  {% else %}
    0
  {% endif %}
  ```
  {% endraw %}
- Device class: _Power factor_
- Device: _ems-esp Boiler_

### Fixing errors with the derivative sensor

As long as the heat pump is running and _ems-esp Boiler Total Energy_ therefore changes over time, the helper entities work as expected.
However, when the heat pump is switched off, _ems-esp Boiler Total Energy_ no longer changes.
In this case, you would expect the derivative sensor _boiler_powertotal_ created above to output 0 kW for the power output and the performance factor calculated from it to be 0.
However, Home Assistant does not forward any updates when the value remains unchanged.
Unfortunately, this means that the derivative sensor is not updated and its value therefore never reaches 0 kW, causing the performance factor to increase incorrectly.

This can be remedied by forcing an update (_force_update_) using the following automation.
To do this, open _Settings &rarr; Automations & Scenes_, then select _CREATE AUTOMATION_ and _Create new automation_ in the bottom right.
Then click the three dots in the top right, select _Edit in YAML_, and insert the following configuration into the text field:

{% raw %}

```yaml
alias: "WP MQTT: Set force_update on boiler_nrgtotal if missing"
description: >-
  This automation adds 'force_update: true' to the discovery message of
  'boiler_nrgtotal' when the flag is missing or false, preserving all other
  content.
triggers:
  - topic: homeassistant/sensor/ems-esp/boiler_nrgtotal/config
    trigger: mqtt
conditions:
  - condition: template
    value_template: >
      {% set payload = trigger.payload | from_json %} {{ not
      payload.get('force_update', False) }}
    enabled: true
    alias: Only if force_update flag is false or missing entirely
actions:
  - data:
      topic: homeassistant/sensor/ems-esp/boiler_nrgtotal/config
      payload: >
        {% set payload = trigger.payload | from_json %}{{ dict(payload,
        force_update=true) | to_json }}
      retain: false
    action: mqtt.publish
    enabled: true
mode: single
```

{% endraw %}

After _saving_, _force_update_ is automatically activated for _boiler_nrgtotal_, and both the helper entity for the power output and the performance factor work as expected—even when the heat pump is switched off.

### Heat pump dashboard

To have all relevant measurements available at a glance, the next step is to create a dashboard.
A simple dashboard for the heat pump could look like this:

[![Simple Home Assistant dashboard](/assets/images/HA-SimpleDashboard.png)](/assets/images/HA-SimpleDashboard.png)

You can find the configuration for this dashboard here: [https://github.com/bosch-buderus-wp/home-assistant/blob/main/dashboards/simple-dashboard.yaml](https://github.com/bosch-buderus-wp/home-assistant/blob/main/dashboards/simple-dashboard.yaml).
To use the configuration, simply create a new dashboard in the dashboard overview:

[![Show dashboard overview](https://my.home-assistant.io/badges/lovelace_dashboards.svg "Show dashboard overview")](https://my.home-assistant.io/redirect/lovelace_dashboards/)

Then click the pencil icon in the top right, followed by the three dots and then _Raw configuration editor_.
You can paste the configuration there, save it, and use the dashboard directly.

More details will follow shortly.
