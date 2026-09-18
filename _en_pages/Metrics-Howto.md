---
title: "Set up Bosch/Buderus heat pump metrics: Upload, API and comparison"
headline: "Guide to heat pump metrics"
excerpt: "Step-by-step guide for uploading measured values from Bosch CS5800/6800i and Buderus WLW176/186i and comparing them with other systems."
permalink: /en/metrics/howto/
toc: true
toc_sticky: true
layout: single
read_time: false
author_profile: false
share: false
comments: false
sidebar:
  nav: "en_metrics"
lang: en
translation_url: /metrics/howto
translation_generated: true
---

This guide explains how to provide measured values from your Bosch or Buderus heat pump for the metrics platform and compare real performance factors with other systems. The aim is to make reliable real-world data for operation, efficiency, and optimization visible.

This project is intended to help all of us find the optimal operating conditions for our heat pumps while also taking away the fear of switching to a heat pump for people interested in heat pumps by allowing them to view real data.
Therefore, please enter **only verified, accurate data**.

This is not a commercial project, and the current solution operates within the scope of free services that are subject to performance limitations.
Therefore, please use the platform in a resource-efficient manner:

{: .notice--danger}

- **Please do not log in and out excessively often!**
- **Upload your measured values no more than once per hour!**
- **Do not access the API with resource-intensive scripts!**

Thank you! 💚

## Overview of the analyses

The **annual overview** shows all months of the selected year.
The bar height is calculated from the average of all monthly values selected in the table.

The **monthly overview** shows all days of the selected month.
The bar height is calculated from the average of all daily values selected in the table.

The **daily overview** shows all hours of the selected day.
The bar height is calculated from the average of all hourly values selected in the table.

The data is determined as follows:

- **Hourly values** can be uploaded directly from ems-esp or Home Assistant every hour
- **Daily values** are calculated automatically from the hourly values
- **Monthly values** are either calculated automatically from the hourly values or can be entered manually (for those who do not have ems-esp)

## Guides

### Enter monthly values manually

You can enter the monthly values manually under [My system](/en/metrics/#/my-account) &rarr; `Maintain monthly values` for each month starting in January 2025.
This allows you to see your system in the annual overview.
Would you also like to see your system in the monthly overview or daily overview?
Then you must provide the measured values hourly.
The following sections explain how this can be done either using ems-esp or Home Assistant.

### Transfer measured values directly from ems-esp

Would you like to transfer your measured values automatically every hour?
You can configure this using the scheduler in your ems-esp gateway.
Unfortunately, this does not work with the following ems-esp hardware:

- ESP32-C3 Mini 4MB no psram
- ESP32 4MB no psram
- ESP32 16M no psram
- ESP32-S2 4MB with psram

However, if you use Home Assistant, follow the guide in the next section.

For other hardware, create a new schedule and set:

- Trigger: `Timer`
- Active: `Yes`
- Timer: `01:00` (once per hour)
- Command: `{"url":"https://heatpump-metrics-proxy.vercel.app/api/proxy"}`
- Value:

```
{"api_key":".......","heating_id":"......","thermal_energy_kwh":boiler/nrgtotal,"electrical_energy_kwh":boiler/metertotal,"thermal_energy_heating_kwh":boiler/nrgheat,"electrical_energy_heating_kwh":boiler/meterheat,"outdoor_temperature_c":boiler/outdoortemp,"flow_temperature_c":boiler/curflowtemp}
```

where you replace `....` after `api_key` with your API key and `....` after `heating_id` with your system ID.
You can find the API key and system ID under [My system](/en/metrics/#/my-account).

[![ems-esp configuration for hourly upload of measured values](https://i.ibb.co/C3L5SXcj/emsesp-Metrikenupload.png){:width="400px"}](https://i.ibb.co/C3L5SXcj/emsesp-Metrikenupload.png)

Please do not upload the data more than once per hour in order to avoid generating unnecessarily large amounts of data in the database.

### Transfer measured values from Home Assistant

To transfer measured values from Home Assistant every hour, add the following configuration to `configuration.yaml`.
Since ems-esp supports different entity ID formats in MQTT Discovery, the configurations adapted for the different versions are provided below.

You can find your version in the ems-esp interface under `Settings` &rarr; `MQTT` &rarr; `MQTT-Discovery` &rarr; `Entity ID format`. Select the tab matching your version:

{% include tabs id="home-assistant-tabs" %}

{% include tab id="v3.6" title="Single instance, MQTT names (v3.5 and v3.6)" %}

{% raw %}

```yaml
rest_command:
  send_heatpump_metrics:
    url: "https://heatpump-metrics-proxy.vercel.app/api/proxy"
    method: POST
    headers:
      Content-Type: "application/json"
    payload: >
      {
        "api_key": ".......",
        "heating_id": ".......",
        "thermal_energy_kwh": "{{ states('sensor.boiler_nrgtotal') }}",
        "electrical_energy_kwh": "{{ states('sensor.boiler_metertotal') }}",
        "thermal_energy_heating_kwh": "{{ states('sensor.boiler_nrgheat') }}",
        "electrical_energy_heating_kwh": "{{ states('sensor.boiler_meterheat') }}",
        "outdoor_temperature_c": "{{ states('sensor.boiler_outdoortemp') }}",
        "flow_temperature_c": "{{ states('sensor.boiler_curflowtemp') }}"
      }
```

{% endraw %}

{% include endtab %}
{% include tab id="v3.4" title="Single instance, long name (v3.4)" %}

{% raw %}

```yaml
rest_command:
  send_heatpump_metrics:
    url: "https://heatpump-metrics-proxy.vercel.app/api/proxy"
    method: POST
    headers:
      Content-Type: "application/json"
    payload: >
      {
        "api_key": ".......",
        "heating_id": ".......",
        "thermal_energy_kwh": "{{ states('sensor.boiler_total_energy') }}",
        "electrical_energy_kwh": "{{ states('sensor.boiler_meter_total') }}",
        "thermal_energy_heating_kwh": "{{ states('sensor.boiler_energy_heating') }}",
        "electrical_energy_heating_kwh": "{{ states('sensor.boiler_meter_heating') }}",
        "outdoor_temperature_c": "{{ states('sensor.boiler_outside_temperature') }}",
        "flow_temperature_c": "{{ states('sensor.boiler_current_flow_temperature') }}"
      }
```

{% endraw %}

{% include endtab %}
{% include endtabs %}

Do not forget to replace the `.......` with your API key and system ID.
You can find the API key and system ID under [My system](/en/metrics/#/my-account).

You must then restart Home Assistant (or reload RESTful Commands, if possible) to apply the changes.
To transfer the measured values hourly, you also need an automation, which you can find in Home Assistant under `Settings` &rarr; `Automations & Scenes` &rarr; `Create Automation`.
Select `Create new automation` in the dialog window and `Add a trigger`.
Then select `Time pattern` and enter any number between 0 and 59 for the minutes, leaving the other fields empty.
Please choose any number so that not all users upload their measured values at the same time.
You must then select `Add an action` and `Perform action`.
In the `Action` field, enter or select `rest_command.send_heatpump_metrics`.
You can save your automation by clicking `Save`.

If you use the YAML editor, the automation should look as follows:

```yaml
alias: Send Heatpump Metrics
description: ""
triggers:
  - trigger: time_pattern
    minutes: "13"
conditions: []
actions:
  - action: rest_command.send_heatpump_metrics
    data: {}
mode: single
```
