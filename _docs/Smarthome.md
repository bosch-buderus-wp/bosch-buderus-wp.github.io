---
title: Smarthome
excerpt: Anleitung, um Bosch CS5800/6800i und Buderus WLW176/186 Wärmepumpen in Smarthome Systeme wie Home Assistant oder OpenHAB einzubinden oder mit Grafana Messwerte zu visualisieren
permalink: /docs/smarthome/
toc: true
---

Nachfolgend findet ihr eine Anleitung, wie ihr die Bosch CS5800/6800i oder Buderus WLW176/186 in freie Smarthome-Systeme wie [OpenHAB](https://www.openhab.org/) oder [Home Assistant](https://www.home-assistant.io/) oder Energiemanagement-Systeme wie [evcc](https://evcc.io) integrieren könnt.
Zusätzlich wird beschrieben, wie man die Messwerte in [Grafana](https://grafana.com) visualisiert.

## EMS-ESP

Die Bosch/Buderus Wärmepumpen bieten leider keine offizielle Schnittstelle an, um Messwerte abzurufen oder Einstellungen vorzunehmen.

Glücklicherweise gibt es das open-source Projekt [ems-esp](https://emsesp.org).
Wer die Hardware nicht selbst basteln möchte, kann bereits mit _ems-esp_ geflashte Hardware von [BBQKees](https://bbqkees-electronics.nl/?lang=de) beziehen.
Ich habe mich für das [ BBQKees Gateway S3](https://bbqkees-electronics.nl/product/gateway-s3-standard-wifi-ausgabe/?lang=de) entschieden.

<figure class="half">
  <a href="/assets/images/BBQKees-Gateway-S3.jpg">
    <img src="/assets/images/BBQKees-Gateway-S3.jpg" alt="BBQKees Gateway S3">
  </a>
  <a href="/assets/images/Servicebuchse.jpg">
    <img src="/assets/images/Servicebuchse.jpg" alt="Servicebuchse an der Bosch Compress CS6800i AW 12 MB Inneneinheit">
  </a>
</figure>

Nachdem man die Hardware an die Servicebuchse der Inneneinheit angesteckt und das WLAN konfiguriert hat, kann man Daten über die Weboberfläche unter [http://ems-esp](http://ems-esp) oder über die REST API auslesen:

```shell
curl http://ems-esp/api/thermostat/manualtemp
> {"name":"manualtemp","fullname":"HK1 manuelle Temperatur","circuit":"hc1","value":21.5,"type":"number","min":0,"max":127,"uom":"°C","readable":true,"writeable":true,"visible":true}
```

[![Weboberfläche von _ems-esp_](/assets/images/EMS-ESP.png "Weboberfläche ems-esp")](/assets/images/EMS-ESP.png)

Leider tritt bei manchen Nutzern sporadisch ein Verbindungsproblem auf, das hoffentlich bald gelöst wird (siehe [
Bosch Heat Pump error: No communication on EMS bus](https://github.com/emsesp/EMS-ESP32/issues/2104)).

### Entitäten

In der Weboberfläche werden direkt alle erkannten Geräte angezeigt:

- **XCU_THH/CS\*800i, Logatherm WLW\*** (Boiler) mit 173 Entitäten
- **HMI800.2/Rego 3000, UI800, Logamatic BC400** (Thermostat) mit 71 Entitäten
- **K30RF/WiFi module** (Gateway Module)

Unter [Smarthome Entitäten](/docs/smarthome/entities) ist eine Liste aller aktuell verfügbaren Entitäten zu finden.

## MQTT

Für den Datenaustausch zwischen _ems-esp_ und einem Smarthome-System bietet sich MQTT an.
Dazu braucht man einen MQTT-Broker, wie [Mosquitto](https://mosquitto.org/), der in vielen Smarthome-Systemen bereits als optionale Erweiterung mitgeliefert wird.
In Home Assistant und OpenHAB kann Mosquitto leicht über das entsprechende [Add-on](https://github.com/home-assistant/addons/blob/master/mosquitto/DOCS.md) installiert werden.
Die Kommunikation mit evcc funktioniert über die REST-API von ems-esp.
Daher braucht ihr für evcc kein MQTT.

```mermaid
flowchart LR
    EMSESP[ems-esp] -->|Publish| MQTT@{ shape: bow-rect, label: "MQTT Broker" }
    HA[Home Assistant /<br/>OpenHAB /<br/>Telegraf] --> |Subscribe| MQTT
    HA -->|Persist| INFLUX[("InfluxDB")]
    GRAFANA[Grafana] -->|Read| INFLUX
```

Damit _ems-esp_ die Messwerte an den MQTT-Broker schickt, müsst ihr dies unter _Settings &rarr; MQTT&nbsp;Settings_ aktivieren und die _Broker Address_, sowie _Username_ und _Password_ hinterlegen.
Außerdem sollte man _Enable MQTT Discovery_ aktivieren, denn sonst muss man alle Entitäten händisch anlegen.

[![ems-esp: MQTT Einstellungen](/assets/images/EMS-ESP-MQTT.png)](/assets/images/EMS-ESP-MQTT.png)

Falls ihr noch keinen MQTT-Broker habt, dann funktioniert die Kommunikation natürlich erst, wenn ihr euer Smarthome mit dem MQTT-Addon installiert habt.
Mehr dazu in den nachfolgenden Abschnitten:

- [Home Assistant](/docs/smarthome/ha)
- [OpenHAB](/docs/smarthome/openhab)
- [Grafana](/docs/smarthome/grafana)
- [evcc](/docs/smarthome/evcc)
