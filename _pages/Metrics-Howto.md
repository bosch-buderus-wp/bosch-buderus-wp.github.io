---
title: "Bosch/Buderus Wärmepumpen-Metriken einrichten: Upload, API und Vergleich"
headline: "Anleitung zu den Wärmepumpen-Metriken"
excerpt: "Schritt-für-Schritt-Anleitung, um Messwerte von Bosch CS5800/6800i und Buderus WLW176/186i hochzuladen und mit anderen Anlagen zu vergleichen."
permalink: /metrics/howto
toc: true
toc_sticky: true
layout: single
read_time: false
author_profile: false
share: false
comments: false
sidebar:
  nav: "metrics"
---

Diese Anleitung zeigt, wie du Messwerte deiner Bosch- oder Buderus-Wärmepumpe für die Metriken-Plattform bereitstellst und reale Arbeitszahlen mit anderen Anlagen vergleichst. Ziel ist es, belastbare Praxisdaten für Betrieb, Effizienz und Optimierung sichtbar zu machen.

Dieses Projekt soll uns allen helfen, die optimalen Betriebsbedingungen für unsere Wärmepumpen zu finden, und gleichzeitig Wärmepumpeninteressierten die Angst vor dem Umstieg nehmen, indem sie reale Daten einsehen können.
Bitte tragt daher ausschließlich **geprüfte, wahre Daten** ein.

Dies ist kein kommerzielles Projekt und die aktuelle Lösung läuft im Rahmen von kostenfreien Angeboten, die Performancebeschränkungen unterliegen.
Daher bitte ich euch, mit der Plattform ressourcenschonend umzugehen:

{: .notice--danger}

- **Loggt euch bitte nicht übermäßig oft ein und aus!**
- **Ladet maximal einmal pro Stunde eure Messwerte hoch!**
- **Greift nicht mit leistungsintensiven Skripten auf die API zu!**

Danke! 💚

## Übersicht der Auswertungen

Die **Jahresübersicht** zeigt alle Monate des ausgewählten Jahres.
Die Balkenhöhe ergibt sich aus dem Durchschnitt aller in der Tabelle ausgewählten Monatswerten.

Die **Monatsübersicht** zeigt alle Tage des ausgewählten Monats.
Die Balkenhöhe ergibt sich aus dem Durchschnitt aller in der Tabelle ausgewählten Tageswerten.

Die **Tagesübersicht** zeigt alle Stunden des ausgewählten Tages.
Die Balkenhöhe ergibt sich aus dem Durchschnitt aller in der Tabelle ausgewählten Stundenwerten.

Und die Daten ergeben sich wie folgt:

- **Stundenwerte** kann man direkt von ems-esp oder Home Assistant stündlich hochladen
- **Tageswerte** werden automatisch aus den Stundenwerten berechnet
- **Monatswerte** werden entweder automatisch aus den Stundenwerten berechnet oder können manuell eingegeben werden (für diejenigen, die kein ems-esp haben)

## Anleitungen

### Monatswerte manuell eingeben

Die Monatswerte kannst du manuell unter [Meine Anlage](/metrics/#/my-account) &rarr; `Monatswerte pflegen` für jeden Monat ab Januar 2025 eingeben.
Damit siehst du deine Anlage in der Jahresübersicht.
Willst du deine Anlage auch in der Monatsübersicht oder Tagesübersicht sehen?
Dann musst du die Messwerte stündlich bereitstellen.
Wie das entweder über ems-esp oder Home Assistant möglich ist, erfährst du in den folgenden Abschnitten.

### Messwerte direkt aus ems-esp übertragen

Willst du deine Messwerte stündlich automatisch übertragen?
Dann kannst du das über den Planer/Scheduler in deinem ems-esp Gateway einstellen.
Für folgende ems-esp Hardware funktioniert das jedoch leider nicht:

- ESP32-C3 Mini 4MB no psram
- ESP32 4MB no psram
- ESP32 16M no psram
- ESP32-S2 4MB with psram

Falls du aber Home Assistant einsetzt, folge der Anleitung im nächsten Abschnitt.

Für andere Hardware lege einen neuen Zeitplan an und setze:

- Trigger: `Timer`
- Aktiv: `Ja`
- Timer: `01:00` (einmal pro Stunde)
- Befehl: `{"url":"https://heatpump-metrics-proxy.vercel.app/api/proxy"}`
- Wert:

```
{"api_key":".......","heating_id":"......","thermal_energy_kwh":boiler/nrgtotal,"electrical_energy_kwh":boiler/metertotal,"thermal_energy_heating_kwh":boiler/nrgheat,"electrical_energy_heating_kwh":boiler/meterheat,"outdoor_temperature_c":boiler/outdoortemp,"flow_temperature_c":boiler/curflowtemp}
```

wobei du `....` nach `api_key`durch deinen API-Key und `....` nach `heating_id` durch deine Anlagen-ID ersetzt.
API-Key und Anlagen-ID findest du unter [Meine Anlage](/metrics/#/my-account).

[![ems-esp Konfiguration zum stündlichen Upload der Messwerte](https://i.ibb.co/C3L5SXcj/emsesp-Metrikenupload.png){:width="400px"}](https://i.ibb.co/C3L5SXcj/emsesp-Metrikenupload.png)

Bitte lade die Daten nicht mehr als einmal pro Stunde hoch, um nicht unnötig viele Daten in der Datenbank zu erzeugen.

### Messwerte aus Home Assistant übertragen

Um stündlich Messwerte aus Home Assistant zu übertragen, füge folgende Konfiguration in `configuration.yaml` ein.
Da ems-esp unterschiedliche Entitäts-ID Formate im MQTT-Discovery unterstützt, findet ihr nachfolgend für die verschiedene Versionen angepasste Konfigurationen.

Eure Version seht ihr auf der ems-esp Oberfläche unter `Einstellungen` &rarr; `MQTT` &rarr; `MQTT-Discovery` &rarr; `Entitäts-ID Format`:

<details markdown="1" open>
<summary>Einzelinstanz, MQTT-Namen (v3.5 und v3.6)</summary>
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
</details>

<details  markdown="1" open>
<summary>Einzelinstanz, Langname (v3.4)</summary>

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

</details>

<details>
<summary>Einzelinstanz, MQTT-Namen (v3.7)</summary>
```yaml
TODO
```
</details>

Nicht vergessen, die `.......` durch deinen API-Key und die Anlagen-ID zu ersetzen.
API-Key und Anlagen-ID findest du unter [Meine Anlage](/metrics/#/my-account).

Dann müsst ihr Home Assistant neu starten (oder falls möglich RESTful Commands neu laden), um die Änderungen zu übernehmen.
Um die Messwerte stündlich zu übertragen, braucht ihr dann noch eine Automation, die ihr unter Home Assistant unter `Einstellungen` &rarr; `Automationen & Szenen` &rarr; `Automation erstellen` findet.
Im Dialogfenster `Neue Automation erstellen` auswählen und einen `Auslöser hinzufügen`.
Dann `Zeitschema` auswählen und bei Minuten eine beliebige Zahl zwischen 0 und 59 eintragen und die anderen Felder leer lassen.
Sucht euch bitte eine beliebige Zahl aus, damit nicht alle Nutzer ihre Messwerte gleichzeitig hochladen.
Dann müsst ihr noch eine `Aktion hinzufügen` und `Aktion ausführen` auswählen.
Im Feld `Aktion` dann `rest_command.send_heatpump_metrics` eingeben oder auswählen.
Mit `Speichern` könnt ihr eure Automation speichern.

Falls ihr den YAML-Editor verwendet, sollte die Automation wie folgt aussehen:

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
