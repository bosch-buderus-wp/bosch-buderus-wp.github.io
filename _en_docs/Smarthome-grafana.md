---
title: "Visualizing a heat pump in Grafana: local API and EMS-ESP"
headline: "Grafana"
excerpt: "Display live values and historical data from Bosch CS5800/6800i and Buderus WLW176/186i in Grafana: via the local API or EMS-ESP with optional InfluxDB."
permalink: /en/docs/smarthome/grafana/
toc: true
smarthome_access: [local-api, ems-esp]
sidebar:
  nav: "en_docs"
lang: en
translation_url: /docs/smarthome/grafana
translation_generated: true
---

{% include smarthome-access.html %}

[Grafana](https://grafana.com) is a web application that can be used to display data graphically.
A wide variety of chart types are available, such as line, pie, and bar charts.
The data can be integrated via a large number of data sources, known as Data Sources.
The following dashboards use [Infinity](https://grafana.com/grafana/plugins/yesoreyeram-infinity-datasource/) for direct API queries or optionally [InfluxDB](https://www.influxdata.com/) for self-stored time series.

![Grafana Logo](https://i.ibb.co/mCShBCws/grafana-logo.png)

If you just want to take a look at the current measurement values and energy consumption and do not have a smart home system with a database, simply use the [Grafana installer](https://grafana.com/docs/grafana/latest/setup-grafana/installation/), which is available for Windows, Linux, and MacOS, and install Grafana on your computer.

Using the local API, you can evaluate both live values and the historical records provided by the gateway without an additional database.  
EMS-ESP provides a live dashboard and, optionally, further analyses via a separate InfluxDB.

## Live values and history via the local API

{: #lokale-api}

This dashboard directly queries the local API of your K 40 RF or MX400.
For this, you need Grafana with the Infinity data source, a gateway with firmware `15.00.01` or newer, and an access token.
You can find instructions for setting up the token under [Authentication](/en/docs/smarthome/local-api/#authentifizierung).
EMS-ESP and InfluxDB are not required for this dashboard.

[![Grafana dashboard with live values and historical data via the local API](https://raw.githubusercontent.com/bosch-buderus-wp/grafana-dashboards/main/images/grafana-localapi_light.png)](https://raw.githubusercontent.com/bosch-buderus-wp/grafana-dashboards/main/images/grafana-localapi_light.gif)

The dashboard shows:

- current temperatures, flow rate, electrical power and operating states in the system diagram,
- energy input, heat output, performance factors, as well as runtime and starts over the entire operating period,
- energy input, heat output and performance factor for the period selected in Grafana,
- hourly or daily average power, daily energy values for heating and domestic hot water, as well as the domestic hot water temperature profile.

The historical data comes from the gateway’s records.  
Depending on the available history, the analyses use hourly or daily values; the resolution and available period are limited.  
For your own long-term recording with a higher temporal resolution, separate data collection, e.g. with InfluxDB, is still required.

### Set up Infinity data source

Install Grafana and the [Infinity plugin](https://grafana.com/grafana/plugins/yesoreyeram-infinity-datasource/) if not already installed.  
In Grafana, open _Connections → Data sources → Add new data source_ and select _Infinity_.  
Configure the data source as follows; replace `K40RF-0acbbd` in all fields with the hostname or IP address of your gateway:

| Setting                                   | Value                                                                             |
| ----------------------------------------- | --------------------------------------------------------------------------------- |
| Name                                      | `Infinity-BoschBuderus-LocalAPI`                                                 |
| Authentication → Auth type                | `Bearer Token`                                                                   |
| Authentication → Bearer token             | Your `access_token`, without the prefixed word `Bearer`                          |
| URL, Headers, Params → Base URL           | `https://K40RF-0acbbd:9443`                                                      |
| Security → Allowed hosts                  | `https://K40RF-0acbbd:9443`                                                      |
| Network → Skip TLS Verify                 | Enable, as the gateway certificate does not have a trusted trust anchor          |
| Health Check → Enable custom health check | Enable                                                                           |
| Health Check → Health check URL           | `https://K40RF-0acbbd:9443/gateway/brand`                                        |

Save the configuration with _Save & test_.
The data queries are performed from the Grafana server; it must be able to reach the gateway in the local network at the configured address.

### Import dashboard

Select the appropriate configuration:

- Light Theme: [grafana-dashboard-localapi_light.json](https://github.com/bosch-buderus-wp/grafana-dashboards/blob/main/dashboards/grafana-dashboard-localapi_light.json)
- Dark Theme: [grafana-dashboard-localapi_dark.json](https://github.com/bosch-buderus-wp/grafana-dashboards/blob/main/dashboards/grafana-dashboard-localapi_dark.json)

Open _Dashboards → New → Import_ in Grafana and paste the contents of the JSON file or upload the downloaded file.
During the import, select the previously created Infinity data source.
For historical analyses, set the desired time period in the top right of the dashboard.

## Live dashboard directly from ems-esp

If you have ems-esp, you can also use the Infinity Datasource to retrieve live data.
For live data, you only need Grafana and no separate data collection, e.g. via InfluxDB.
To do this, select _Data sources_ under _Connections_ in the Grafana menu.
Clicking _+Add new data source_ lets you add the Infinity Datasource to your Grafana.

This allows the entities to be retrieved and visualized directly via the ems-esp REST interface—without a database:

[![Live Dashboard](https://raw.githubusercontent.com/bosch-buderus-wp/grafana-dashboards/main/images/grafana-emsesp_light.png "Live Dashboard")](https://raw.githubusercontent.com/bosch-buderus-wp/grafana-dashboards/main/images/grafana-emsesp_light.png)

If you want to use this dashboard, you can download the configuration here:

- Light Theme: [grafana-dashboard-emsesp_light.json](https://github.com/bosch-buderus-wp/grafana-dashboards/blob/main/dashboards/grafana-dashboard-emsesp_light.json)
- Dark Theme: [grafana-dashboard-emsesp_dark.json](https://github.com/bosch-buderus-wp/grafana-dashboards/blob/main/dashboards/grafana-dashboard-emsesp_dark.json)

In Grafana, open _Dashboards_, _New_, and _Import_, then insert the contents of the file into the text field.
Then select Infinity as the Datasource, and you should see the dashboard above.
If not, please create an [Issue](https://github.com/bosch-buderus-wp/bosch-buderus-wp.github.io/issues) so that I can correct the guide.

<details>
<summary>Detailed information about the dashboard</summary>
{% capture dashboard-emsesp-details %} \
The live display uses the so-called [Canvas](https://grafana.com/docs/grafana/latest/panels-visualizations/visualizations/canvas/) to visualize the current measurement values at the sensor locations.
Below that, you will see 2 sections.
One for typical key figures and, above it in the detailed view, the raw data on which the key figures were calculated.

Key figures:

- **Performance factor**: The total performance factor is the quotient of the total generated thermal energy (heat energy) and the electrical energy used for this purpose.
  Your performance factor should preferably be greater than 3.
- **Heating performance factor**: Similar to the performance factor above, with the difference that only the energy for heating operation is considered.
  The heating performance factor should also be greater than 3.
- **Domestic hot water performance factor**: As above, but for domestic hot water.
  The domestic hot water performance factor should be greater than 2.
- **⌀ Runtime / starts**: Quotient of the total runtime (excluding standby) and the number of starts.
  This number should be as high as possible, i.e. there should be few cycles.
  If the value is less than one hour, the heat pump may be oversized or the settings may be incorrect.
- **Heating vs. domestic hot water**: Distribution of the generated heat energy between domestic hot water and heating
- **Heat pump vs. auxiliary heater**: Distribution of energy use between the heat pump and the electric auxiliary heater.
It is absolutely fine if the auxiliary heater is used on the few cold days of the year.
However, the auxiliary heater's share should remain in the low single-digit range.
If the share is higher, an incorrect installation or configuration could be the cause.
{% endcapture %}
{{ dashboard-emsesp-details | markdownify }}
</details>

## Historical data with InfluxDB

The following dashboards use data that you have recorded yourself via EMS-ESP in an InfluxDB.
They are independent of the gateway’s limited history but require ongoing data collection.

### Electrical power used vs. heat output

If you also want to analyze historical data, it is preferable to install an InfluxDB, which is already available as an add-on for most smart home systems ([Home Assistant](https://www.home-assistant.io/integrations/influxdb/), [OpenHAB](https://www.openhab.org/addons/persistence/influxdb/)).

[![Electrical and thermal power in Grafana](https://raw.githubusercontent.com/bosch-buderus-wp/grafana-dashboards/main/images/grafana-dashboard-emsesp-influxdb_light.png "Electrical and thermal power in Grafana")](https://raw.githubusercontent.com/bosch-buderus-wp/grafana-dashboards/main/images/grafana-dashboard-emsesp-influxdb_light.png)

Do you have an InfluxDB?
Then download this dashboard configuration:

- Light Theme: [grafana-dashboard-emsesp-influxdb_light.json](https://github.com/bosch-buderus-wp/grafana-dashboards/blob/main/dashboards/grafana-dashboard-emsesp-influxdb_light.json)
- Dark Theme: [grafana-dashboard-emsesp-influxdb_dark.json](https://github.com/bosch-buderus-wp/grafana-dashboards/blob/main/dashboards/grafana-dashboard-emsesp-influxdb_dark.json)

Unfortunately, the various smart home systems use different types of storage.
OpenHAB stores each entity as a Measurement table in the database:

| time                | item     | value |
| ------------------- | -------- | ----- |
| 1711055880009000000 | nrgtotal | 44.81 |
| 1711055940009000000 | nrgtotal | 44.84 |
| 1711056000008000000 | nrgtotal | 44.87 |

The InfluxQL queries in the dashboard above are based on this structure.
If you use a different type of storage, you may need to adjust the queries accordingly.
Each query is named after the ems-esp entity, e.g. `nrgtotal` or `outdoortemp`, and should therefore be easy to identify.

<details>
<summary>Detailed information about the dashboard</summary>
{% capture dashboard-emsesp-influxdb-details %} \
As described above, the dashboard shows energy used/generated, the performance factor, and the ratio between heating and domestic hot water, but this time not over the entire runtime, but for the selected time interval.
This allows you to determine at which outdoor temperature your heat pump cycles, how the performance factor changes, and how often defrost cycles are required.

The following data is displayed in the chart below:

- _Electrical power_: slightly smoothed entity _hpcurrpower_
- _Thermal power_: slightly smoothed derivative of the entity _nrgtotal_.
  The dips in thermal power with a negative performance factor are [defrost cycles](https://bosch-buderus-wp.github.io/en/docs/technical-design/#abtauvorgang).
- _Performance factor_: Quotient of _nrgtotal_ and _hpcurrpower_
- _Modulation_: Entity _curbunpow_
- _Outdoor temperature_: Entity _outdoortemp_
{% endcapture %}
{{ dashboard-emsesp-influxdb-details | markdownify }}
</details>

### Daily energy use & domestic hot water temperature profile

The dashboard above also contains additional visualizations for the selected interval:

[![Daily electrical energy use & domestic hot water temperature profile](https://raw.githubusercontent.com/bosch-buderus-wp/grafana-dashboards/main/images/grafana-dashboard-emsesp-influxdb-additions_light.png "Daily electrical energy use & domestic hot water temperature profile")](https://raw.githubusercontent.com/bosch-buderus-wp/grafana-dashboards/main/images/grafana-dashboard-emsesp-influxdb-additions_light.png)

<details>
<summary>Detailed information about the dashboard</summary>
{% capture dashboard-emsesp-influxdb-details2 %} \
**Daily energy use: heating vs. domestic hot water**

This chart shows the daily energy use for heating operation and domestic hot water production.
The average outdoor temperature for the day is displayed in the background.
This makes it easy to see that more energy is required on colder days.
The legend also lists the average energy used for heating operation (7.69 kWh) and domestic hot water production (1.81 kWh) per day—as well as the average temperature (7.72 °C) in the time interval.

**Domestic hot water temperature profile**

This chart shows the temperature profile over time for the water in the domestic hot water tank.
This allows you to check how often and at what time of day your domestic hot water is heated (see also [Optimizations](/en/docs/optimizations/#tageszeit)).
Under _Thresholds_ in the visualization settings, you can enter your [start temperature](/en/docs/settings/#warmwasserbereitung).
Thresholds are displayed as a horizontal line.
{% endcapture %}
{{ dashboard-emsesp-influxdb-details2 | markdownify }}

</details>

### Sustainability

The _Sustainability_ section in the dashboard addresses the origin of the electrical energy used.
It is based on the assumption that the electricity is obtained exclusively from the grid and not via an own PV system.

The following charts are created using data from [www.greengrid-compass.eu](https://www.greengrid-compass.eu):

[![CO2 emissions & share of renewable energy](https://raw.githubusercontent.com/bosch-buderus-wp/grafana-dashboards/main/images/grafana-dashboard-emsesp-influxdb-sustainability_light.png "CO2 emissions & share of renewable energy")](https://raw.githubusercontent.com/bosch-buderus-wp/grafana-dashboards/main/images/grafana-dashboard-emsesp-influxdb-sustainability_light.png)

To retrieve the data from [www.greengrid-compass.eu](https://www.greengrid-compass.eu), you must create a free API key on [api-portal.eco2grid.com](https://api-portal.eco2grid.com/get-started) and enter it in Grafana under the dashboard settings in the _api_key_ggc_ variable.

<details>
<summary>Detailed information about the dashboard</summary>
{% capture dashboard-emsesp-influxdb-sustainability-details %} \
**Daily CO<sub>2</sub> emissions of the heat pump vs. a hypothetical gas heater**

Grid electricity always consists of a mix of various energy sources.
Some of them cause high CO<sub>2</sub> emissions, while others cause very low emissions.
In this chart, the daily electricity consumption is multiplied by the daily average CO<sub>2</sub> emissions per kWh of grid electricity, and the daily CO<sub>2</sub> emissions of your heat pump are displayed as a bar.
For comparison, the value of a reference heating system, e.g. a gas heater, is displayed.
The CO<sub>2</sub> emissions of the gas heater can be set via the dashboard variable _ref_heating_emissions_.
The default value is 250 gCO<sub>2</sub>eq/kWh.

**Share of renewable energy and daily electrical energy use**

This chart shows the share of renewable energy (solar, wind, hydro, biomass—no nuclear or fossil energy) in the interval.
The daily energy demand is also shown in the background.
Average values for the entire interval can be found in the legend.
In the image above, the share of renewable energy in March 2025 amounted to 50.2%.
On sunny days, the share of renewable energy is usually higher, but the heat pump's energy consumption is lower (see March 22/23), and vice versa.
Consequently, one might conclude that energy demand behaves inversely to the share of renewable energy.
Therefore, the legend also includes another average value for renewable energy—but this time weighted by the heat pump's daily energy use.
In March, it amounted to 47.1%—slightly below the unweighted average, but only a few percentage points away from it.
{% endcapture %}
{{ dashboard-emsesp-influxdb-sustainability-details | markdownify }}

</details>

---

Further visualizations on the efficiency of the heat exchangers and other analyses will soon be available at [https://github.com/bosch-buderus-wp/grafana-dashboards](https://github.com/bosch-buderus-wp/grafana-dashboards/).
