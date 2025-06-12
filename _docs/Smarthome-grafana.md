---
title: Grafana
excerpt: Anleitung, um Bosch CS5800/6800i und Buderus WLW176/186 Wärmepumpen in Grafana über InfluxDB einzubinden
permalink: /docs/smarthome/grafana
toc: true
---

[Grafana](https://grafana.com) ist eine Webanwendung, mit der Daten grafisch dargestellt werden können.
Dazu stehen verschiedenste Diagrammtypen wie z.B. Linien-, Kreis- oder Balkendiagramme zur Auswahl.
Die Daten können über eine Vielzahl an Datenquellen, so genannten Data Sources, eingebunden werden.
Zwei davon, nämlich direkte HTTP-Anfragen über [Infinity](https://grafana.com/grafana/plugins/yesoreyeram-infinity-datasource/) und Zeitreihen über [InfluxDB](https://www.influxdata.com/), werden in den nachfolgenden Dashboards genutzt.
Um die Entitäten von ems-esp in einer InfluxDB zu speichern, kann man die Integration in Home Assistant oder OpenHAB nutzen oder alternativ [Telegraf](https://www.influxdata.com/integration/mqtt-telegraf-consumer/) einsetzen.
Und auch Grafana ist in den meisten Smarthome-Systemen als Add-on verfügbar.

## Live Dashboard direkt von ems-esp

Wenn ihr nur mal einen Blick auf die aktuellen Messwerte und Energieverbräuche werfen wollt und kein Smarthome-System mit Datenbank habt, nutzt einfach den [Grafana-Installer](https://grafana.com/docs/grafana/latest/setup-grafana/installation/), den es sowohl für Windows, Linux und MacOS gibt, und installiert euch Grafana auf eurem Computer.

Dann braucht ihr noch die Infinity Datasource.
Dazu wählt ihr im Grafana-Menü unter _Connections_ den Menüpunkt _Data sources_ aus.
Mit Klick auf _+Add new data source_ lässt sich die Infinity Datasource in euer Grafana hinzufügen.

Damit lassen sich die Entitäten direkt über die REST-Schnittstelle von ems-esp abrufen und visualisieren - ganz ohne Datenbank:

[![Live Dashboard](https://raw.githubusercontent.com/bosch-buderus-wp/grafana-dashboards/main/images/grafana-emsesp_light.png "Live Dashboard")](https://raw.githubusercontent.com/bosch-buderus-wp/grafana-dashboards/main/images/grafana-emsesp_light.png)

Wenn ihr dieses Dashboard bei euch nutzen wollt, könnt ihr euch die Konfiguration hier herunterladen:

- Light Theme: [grafana-dashboard-emsesp_light.json](https://github.com/bosch-buderus-wp/grafana-dashboards/blob/main/dashboards/grafana-dashboard-emsesp_light.json)
- Dark Theme: [grafana-dashboard-emsesp_dark.json](https://github.com/bosch-buderus-wp/grafana-dashboards/blob/main/dashboards/grafana-dashboard-emsesp_dark.json)

In Grafana öffnet ihr dann _Dashboards_, _New_ und _Import_ und dann fügt ihr den Inhalt der Datei in das Textfeld ein.
Dann noch Infinity als Datasource auswählen und schon solltet ihr das obige Dashboard sehen.
Falls nicht, erstellt bitte ein [Issue](https://github.com/bosch-buderus-wp/bosch-buderus-wp.github.io/issues) damit ich die Anleitung korrigieren kann.

<details>
<summary>Detaillierte Infos zum Dashboard</summary>
{% capture dashboard-emsesp-details %}
Die Live-Darstellung nutzt den so genannten [Canvas](https://grafana.com/docs/grafana/latest/panels-visualizations/visualizations/canvas/), um die aktuellen Messwerte an der Stelle der Sensoren zu visualisieren.
Darunter seht ihr 2 Sektionen.
Eine für typische Kennzahlen und darüber in der Detailansicht die Rohdaten, auf deren Basis die Kennzahlen berechnet wurden.

Kennzahlen:
- Arbeitszahl: Die Gesamtarbeitszahl ist der Quotient aus ingesamt erzeugter thermischer Energie (Wärmeenergie) und der dafür eingesetzen elektrischen Energie.
- Arbeitszahl Heizen: Ähnlich wie die obige Arbeitszahl mit dem Unterschied, das nur die Energie, die zum Heizen verwendet wurde, betrachtet wird.
- Arbeitszahl Warmwasser: Wie oben, jedoch für Warmwasser
- ⌀ Laufzeit / Starts: Quotient aus der gesamten Laufzeit (ohne Standby) und der Anzahl der Starts. Diese Zahl sollte möglichst hoch sein, d.h. wenige Takte.
- Heizen vs. Warmwasser: Verteilung der erzeugen Wärmeenergie auf Warmwasser und Heizen
- WP vs. Zuheizer: Verteilung der eingesetzen elektrischen Energie auf Wärmepumpe und elektrischen Zuheizer
{% endcapture %}
{{ dashboard-emsesp-details | markdownify }}
</details>

## Historische Daten mit InfluxDB

Wenn ihr zusätzlich historische Daten auswerten wollt, dann installiert ihr euch vorzugsweise eine InfluxDB, die es bei den meisten Smarthome-Systemen bereits als Add-on gibt ([Home Assistant](https://www.home-assistant.io/integrations/influxdb/), [OpenHAB](https://www.openhab.org/addons/persistence/influxdb/)).

Im nachfolgenden Dashboard kann man den Zeitraum, der in der Sektion _Intervall_ angezeigt werden soll, über die Zeitraumauswahl oben rechts in Grafana festlegen.

[![Elektrische und thermische Leistung in Grafana](https://raw.githubusercontent.com/bosch-buderus-wp/grafana-dashboards/main/images/grafana-dashboard-emsesp-influxdb_light.png "Elektrische und thermische Leistung in Grafana")](https://raw.githubusercontent.com/bosch-buderus-wp/grafana-dashboards/main/images/grafana-dashboard-emsesp-influxdb_light.png)

Wenn ihr das obige Live-Dashboard um die Sektion _Intervall_ erweitern wollt, ladet euch die Konfiguration hier herunterladen:

- Light Theme: [grafana-dashboard-emsesp-influxdb_light.json](https://github.com/bosch-buderus-wp/grafana-dashboards/blob/main/dashboards/grafana-dashboard-emsesp-influxdb_light.json)
- Dark Theme: [grafana-dashboard-emsesp-influxdb_dark.json](https://github.com/bosch-buderus-wp/grafana-dashboards/blob/main/dashboards/grafana-dashboard-emsesp-influxdb_dark.json)

Leider nutzen die verschiedenen Smarthome-Systeme unterschiedliche Arten der Speicherung.
OpenHAB speichert jede Entität als Measurement-Table in der Datenbank:

| time                | item     | value |
| ------------------- | -------- | ----- |
| 1711055880009000000 | nrgtotal | 44.81 |
| 1711055940009000000 | nrgtotal | 44.84 |
| 1711056000008000000 | nrgtotal | 44.87 |

Darauf sind die InfluxQL-Abfragen in obigem Dashboard ausgerichtet.
Falls ihr eine andere Art der Speicherung nutzt, müsst ihr die Abfragen gegebenenfalls anpassen.
Jede Abfrage trägt den Namen der ems-esp Entität, z.B. `nrgtotal` oder `outdoortemp`, und sollte daher leicht identifizierbar sein.

Weitere Visualisierungen findet ihr in Kürze auf [https://github.com/bosch-buderus-wp/grafana-dashboards](https://github.com/bosch-buderus-wp/grafana-dashboards/).
