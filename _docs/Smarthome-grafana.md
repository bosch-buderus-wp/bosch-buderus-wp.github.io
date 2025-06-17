---
title: Grafana
excerpt: Anleitung, um Bosch CS5800/6800i und Buderus WLW176/186 Wärmepumpen in Grafana über InfluxDB einzubinden
permalink: /docs/smarthome/grafana
toc: true
---

![Grafana Logo](https://i.ibb.co/mCShBCws/grafana-logo.png)

[Grafana](https://grafana.com) ist eine Webanwendung, mit der Daten grafisch dargestellt werden können.
Dazu stehen verschiedenste Diagrammtypen wie z.B. Linien-, Kreis- oder Balkendiagramme zur Auswahl.
Die Daten können über eine Vielzahl an Datenquellen, so genannten Data Sources, eingebunden werden.
Zwei davon, nämlich direkte HTTP-Anfragen über [Infinity](https://grafana.com/grafana/plugins/yesoreyeram-infinity-datasource/) und Zeitreihen über [InfluxDB](https://www.influxdata.com/), werden in den nachfolgenden Dashboards genutzt.

## Live Dashboard direkt von ems-esp

Wenn ihr nur mal einen Blick auf die aktuellen Messwerte und Energieverbräuche werfen wollt und kein Smarthome-System mit Datenbank habt, nutzt einfach den [Grafana-Installer](https://grafana.com/docs/grafana/latest/setup-grafana/installation/), den es sowohl für Windows, Linux und MacOS gibt, und installiert euch Grafana auf eurem Computer.

Dann braucht ihr noch die Infinity Datasource.
Dazu wählt ihr im Grafana-Menü unter _Connections_ den Menüpunkt _Data sources_ aus.
Mit Klick auf _+Add new data source_ lässt sich die Infinity Datasource zu eurem Grafana hinzufügen.

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
{% capture dashboard-emsesp-details %} \
Die Live-Darstellung nutzt den so genannten [Canvas](https://grafana.com/docs/grafana/latest/panels-visualizations/visualizations/canvas/), um die aktuellen Messwerte an der Stelle der Sensoren zu visualisieren.
Darunter seht ihr 2 Sektionen.
Eine für typische Kennzahlen und darüber in der Detailansicht die Rohdaten, auf deren Basis die Kennzahlen berechnet wurden.

Kennzahlen:

- **Arbeitszahl**: Die Gesamtarbeitszahl ist der Quotient aus insgesamt erzeugter thermischer Energie (Wärmeenergie) und der dafür eingesetzen elektrischen Energie.
  Eure Arbeitszahl sollte vorzugsweise größer 3 sein.
- **Arbeitszahl Heizen**: Ähnlich wie die obige Arbeitszahl mit dem Unterschied, dass nur die Energie für den Heizbetrieb betrachtet wird.
  Die Arbeitszahl Heizen sollte ebenfalls größer 3 sein.
- **Arbeitszahl Warmwasser**: Wie oben, jedoch für Warmwasser.
  Die Arbeitszahl Warmwasser sollte größer 2 sein.
- **⌀ Laufzeit / Starts**: Quotient aus der gesamten Laufzeit (ohne Standby) und der Anzahl der Starts.
  Diese Zahl sollte möglichst hoch sein, d.h. wenige Takte.
  Ist der Wert kleiner als eine Stunde, könnte die Wärmepumpe zu groß dimensioniert sein oder die Einstellungen sind fehlerhaft.
- **Heizen vs. Warmwasser**: Verteilung der erzeugen Wärmeenergie auf Warmwasser und Heizen
- **WP vs. Zuheizer**: Verteilung des Energieeinsatzes zwischen Wärmepumpe und elektrischem Zuheizer.
Es ist absolut ok, wenn der Zuheizer in den wenigen kalten Tagen des Jahres zum Einsatz kommt.
Der Anteil des Zuheizers sollte aber im niedrigen einstelligen Bereich bleiben.
Falls der Anteil höher ist, könnte eine fehlerhafte Installation oder Konfiguration die Ursache sein.
{% endcapture %}
{{ dashboard-emsesp-details | markdownify }}
</details>

## Historische Daten mit InfluxDB

### Eingesetzte elektrische Leistung vs. abgegebene Wärmeleistung

Wenn ihr zusätzlich historische Daten auswerten wollt, dann installiert ihr euch vorzugsweise eine InfluxDB, die es bei den meisten Smarthome-Systemen bereits als Add-on gibt ([Home Assistant](https://www.home-assistant.io/integrations/influxdb/), [OpenHAB](https://www.openhab.org/addons/persistence/influxdb/)).

[![Elektrische und thermische Leistung in Grafana](https://raw.githubusercontent.com/bosch-buderus-wp/grafana-dashboards/main/images/grafana-dashboard-emsesp-influxdb_light.png "Elektrische und thermische Leistung in Grafana")](https://raw.githubusercontent.com/bosch-buderus-wp/grafana-dashboards/main/images/grafana-dashboard-emsesp-influxdb_light.png)

Habt ihr eine InfluxDB?
Dann ladet euch diese Dashboard-Konfiguration runter:

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

<details>
<summary>Detaillierte Infos zum Dashboard</summary>
{% capture dashboard-emsesp-influxdb-details %} \
Das Dashboard zeigt wie bereits zuvor beschrieben eingesetzte/erzeugte Energie, Arbeitszahl und Verhältnis zwischen Heizen und Warmwasser, aber diesmal nicht über die gesamte Laufzeit, sondern für das ausgewählte Zeitintervall.
Damit könnt ihr nachvollziehen, bei welcher Außentemperatur eure Wärmepumpe taktet, wie sich die Arbeitszahl verändert und wie oft abgetaut werden muss.

Im nachfolgenden Diagramm werden die Verläufe folgender Daten angezeigt:

- _Elektrische Leistung_: leicht geglättete Entität _hpcurrpower_
- _Thermische Leistung_: leicht geglättete Ableitung der Entität _nrgtotal_.
  Die Einschnitte in der thermischen Leistung mit negativer Arbeitszahl sind [Abtauvorgänge](https://bosch-buderus-wp.github.io/docs/technischer-aufbau/#abtauvorgang).
- _Arbeitszahl_: Quotient aus _nrgtotal_ und _hpcurrpower_
- _Modulation_: Entität _curbunpow_
- _Außentemperatur_: Entität _outdoortemp_
{% endcapture %}
{{ dashboard-emsesp-influxdb-details | markdownify }}
</details>

### Täglicher Energieeinsatz & Warmwassertemperaturprofil

Das obige Dashboard enthält zusätzlich weitere Visualisierungen für das ausgewählte Intervall:

[![Täglicher elektrischer Energieeinsatz & Verlauf der Warmwassertemperatur](https://raw.githubusercontent.com/bosch-buderus-wp/grafana-dashboards/main/images/grafana-dashboard-emsesp-influxdb-additions_light.png "Täglicher elektrischer Energieeinsatz & Verlauf der Warmwassertemperatur")](https://raw.githubusercontent.com/bosch-buderus-wp/grafana-dashboards/main/images/grafana-dashboard-emsesp-influxdb-additions_light.png)

<details>
<summary>Detaillierte Infos zum Dashboard</summary>
{% capture dashboard-emsesp-influxdb-details2 %} \
**Täglicher Energieeinsatz: Heizung vs. Warmwasser**

Dieses Diagramm zeigt den täglichen Energieeinsatz für den Heizbetrieb und die Warmwasseraufbereitung.
Im Hintergrund ist die durchschnittliche Außentemperatur des Tages dargestellt.
So ist leicht ersichtlich, dass an kälteren Tagen mehr Energie benötigt wird.
In der Legende ist zudem die durchschnittlich eingesetzte Energie für den Heizbetrieb (7,69 kWh) und die Warmwasseraufbereitung (1,81 kWh) pro Tag aufgeführt - sowie die Durchschnittstemperatur (7,72 °C) im Zeitintervall.

**Verlauf der Warmwassertemperatur**

In diesem Diagramm wird der zeitliche Verlauf der Wassertemperatur im Brauchwasserspeicher dargestellt.
Damit könnt ihr prüfen, wie oft euer Warmwasser und zu welcher Tageszeit es erwärmt wird (siehe auch [Optimierungen](/docs/optimierungen/#tageszeit)).
Über _Thresholds_ in den Einstellungen der Visualisierung könnt ihr eure [Starttemperatur](/docs/einstellungen/#warmwasseraufbereitung) eintragen.
Thresholds werden als horizontale Linie dargestellt.
{% endcapture %}
{{ dashboard-emsesp-influxdb-details2 | markdownify }}

</details>

### Nachhaltigkeit

Die Sektion _Nachhaltigkeit_ im Dashboard geht auf die Herkunft der eingesetzen elektrischen Energie ein.
Sie basiert auf der Annahme, dass der Strom ausschließlich aus dem Netz bezogen wird und nicht über eine eigene PV-Anlage.

Mit den Daten von [www.greengrid-compass.eu](https://www.greengrid-compass.eu) werden folgende Diagramme erstellt:

[![CO2 Emissionen & Anteil erneuerbarer Energien](https://raw.githubusercontent.com/bosch-buderus-wp/grafana-dashboards/main/images/grafana-dashboard-emsesp-influxdb-sustainability_light.png "CO2 Emissionen & Anteil erneuerbarer Energien")](https://raw.githubusercontent.com/bosch-buderus-wp/grafana-dashboards/main/images/grafana-dashboard-emsesp-influxdb-sustainability_light.png)

Um die Daten von [www.greengrid-compass.eu](https://www.greengrid-compass.eu) abrufen zu können, müsst ihr euch einen kostenlosen API-Key auf [api-portal.eco2grid.com](https://api-portal.eco2grid.com/get-started) erstellen und in Grafana in den Dashboard-Settings in die Variable _api_key_ggc_ eintragen.

<details>
<summary>Detaillierte Infos zum Dashboard</summary>
{% capture dashboard-emsesp-influxdb-sustainability-details %} \
**Tägliche CO<sub>2</sub> Emissionen der Wärmepumpe vs. fiktive Gasheizung**

Netzstrom besteht immer aus einem Mix verschiedenster Energiequellen.
Manche davon verursachen hohe CO<sub>2</sub> Belastungen, andere sehr geringe.
In diesem Diagramm wird der tägliche Strombezug mit den tagesdurchschnittlichen CO<sub>2</sub> Emissionen pro kWh Netzstrom multipliziert und damit die täglichen CO<sub>2</sub> Emissionen deiner Wärmepumpe als Säule dargestellt.
Vergleichsweise wird der Wert einer Referenzheizung, z.B. einer Gasheizung, dargestellt.
Die CO<sub>2</sub> Emissionen der Gasheizung können über die Dashboard-Variable _ref_heating_emissions_ gesetzt werden.
Als Standardwert ist 250 gCO<sub>2</sub>eq/kWh hinterlegt.

**Anteil erneuerbarer Energien und elektrischer Energieeinsatz pro Tag**

In diesem Diagramm wird der Anteil der erneuerbaren Energien (Solar, Wind, Wasser, Biomasse - keine Kern- oder fossile Energien) im Intervall dargestellt.
Im Hintergrund ist zusätzlich der tägliche Energiebedarf abgebildet.
Durchschnittswerte über das gesamte Intervall findest du in der Legende.
Im Bild oben belief sich der Anteil der erneuerbaren Energien im März 2025 auf 50,2%.
An Tagen mit viel Sonne ist der Anteil der erneuerbaren Energien meist höher, jedoch der Energieverbrauch der Wärmepumpe niedriger (siehe 22./23. März) und umgekehrt.
Folglich könnte man den Schluss ziehen, dass sich der Energiebedarf gegensätzlich zum Anteil der erneuerbaren Energien verhält.
Daher ist in der Legende noch ein weiterer Durchschnittswert der erneuerbaren Energien aufgeführt - diesmal jedoch gewichtet mit dem täglichen Energieeinsatz der Wärmepumpe.
Im März belief er sich auf 47,1% - also leicht unter dem ungewichteten Durchschnitt aber auch nur wenige Prozentpunkte davon entfernt.
{% endcapture %}
{{ dashboard-emsesp-influxdb-sustainability-details | markdownify }}

</details>

---

Weitere Visualisierungen zur Effizienz der Wärmetauscher und andere Auswertungen findet ihr in Kürze auf [https://github.com/bosch-buderus-wp/grafana-dashboards](https://github.com/bosch-buderus-wp/grafana-dashboards/).
