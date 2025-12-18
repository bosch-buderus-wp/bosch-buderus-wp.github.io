---
title: Anleitung zu den Wärmepumpen-Metriken
excerpt: Metriken zu Bosch CS5800/6800i und Buderus WLW176/186 Wärmepumpen
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

Dieses Projekt soll uns allen helfen, die optimalen Betriebsbedingungen für unsere Wärmepumpen zu finden, und gleichzeitig Wärmepumpeninteressierten die Angst vor dem Umstieg nehmen, indem sie reale Daten einsehen können.
Bitte tragt daher ausschließlich **geprüfte, wahre Daten** ein.

Dies ist kein kommerzielles Projekt und die aktuelle Lösung läuft im Rahmen von kostenfreien Angeboten, die Performancebeschränkungen unterliegen.
Daher bitte ich euch, mit der Plattform ressourcenschonend umzugehen:

{: .notice--danger}

- **Loggt euch bitte nicht übermäßig oft ein und aus!**
- **Ladet maximal einmal pro Stunde eure Messwerte hoch!**
- **Greift nicht mit leistungsintensiven Skripten auf die API zu!**

Danke! 💚

## Anleitungen

### Monatswerte manuell eingeben

Die Monatswerte kannst du manuell unter [Meine Anlage](/metrics/#/my-account) &rarr; `Monatswerte pflegen` für jeden Monat ab Januar 2025 eingeben.

### Messwerte direkt aus ems-esp übertragen

Willst du deine Messwerte stündlich automatisch übertragen?
Dann kannst du das über den Planer/Scheduler in deinem ems-esp Gateway einstellen.
Lege hierfür einen neuen Zeitplan an und setze:

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

Wenn du stündlich die Daten hochlädst, werden jede Nacht die vorübergehenden Monatswerte automatisch berechnet.
