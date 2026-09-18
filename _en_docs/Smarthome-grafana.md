---
title: "Visualizing a Heat Pump in Grafana with InfluxDB"
headline: "Grafana"
excerpt: "Guide to visualizing measurement values from Bosch CS5800/6800i and Buderus WLW176/186i in Grafana via InfluxDB and EMS-ESP."
permalink: /en/docs/smarthome/grafana
toc: true
sidebar:
  nav: "en_docs"
lang: en
translation_url: /docs/smarthome/grafana
translation_generated: true
---

![Grafana Logo](https://i.ibb.co/mCShBCws/grafana-logo.png)

[Grafana](https://grafana.com) is a web application that can be used to display data graphically.
A wide variety of chart types are available, such as line, pie, and bar charts.
Data can be integrated via a large number of data sources, so-called Data Sources.
Two of them, namely direct HTTP requests via [Infinity](https://grafana.com/grafana/plugins/yesoreyeram-infinity-datasource/) and time series via [InfluxDB](https://www.influxdata.com/), are used in the dashboards below.

## Live dashboard directly from ems-esp

If you just want to take a look at the current measurement values and energy consumption and do not have a smart home system with a database, simply use the [Grafana installer](https://grafana.com/docs/grafana/latest/setup-grafana/installation/), which is available for Windows, Linux, and MacOS, and install Grafana on your computer.

Then you also need the Infinity Datasource.
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
  The dips in thermal power with a negative performance factor are [defrost cycles](https://bosch-buderus-wp.github.io/en/docs/technischer-aufbau/#abtauvorgang).
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
This allows you to check how often and at what time of day your domestic hot water is heated (see also [Optimizations](/en/docs/optimierungen/#tageszeit)).
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
