---
title: Smarthome
excerpt: Anleitung, um Bosch CS5800/6800i und Buderus WLW176/186i Wärmepumpen in Smarthome Systeme wie Home Assistant oder OpenHAB einzubinden oder mit Grafana Messwerte zu visualisieren
permalink: /docs/smarthome/
toc: true
---

Nachfolgend findet ihr eine Anleitung, wie ihr die Bosch CS5800/6800i oder Buderus WLW176/186i in freie Smarthome-Systeme wie [OpenHAB](/docs/smarthome/openhab) oder [Home Assistant](/docs/smarthome/ha) oder Energiemanagement-Systeme wie [evcc](/docs/smarthome/evcc) integrieren könnt.
Zusätzlich wird beschrieben, wie man die Messwerte in [Grafana](/docs/smarthome/grafana) visualisiert, die Wärmepumpe in [Gen-AI](/docs/smarthome/ai) Anwendungen wie Anthropic Claude einbindet oder einfach nur [Benachrichtigungen](/docs/smarthome/benachrichtigungen) der Wärmepumpe aufs Smartphone bekommt.

## EMS-ESP

Die Bosch/Buderus Wärmepumpen bieten leider keine offizielle Schnittstelle an, um Messwerte abzurufen oder Einstellungen vorzunehmen.

Glücklicherweise gibt es das open-source Projekt [ems-esp](https://emsesp.org).
Wer die Hardware nicht selbst basteln möchte, kann bereits mit _ems-esp_ geflashte Hardware von [BBQKees](https://bbqkees-electronics.nl/?lang=de) beziehen.
Ich habe mich für das [ BBQKees Gateway S3](https://bbqkees-electronics.nl/product/gateway-s3-standard-wifi-ausgabe/?lang=de) entschieden.

### Einbau

Der einfachste Weg, um das _ems-esp_ Gateway mit eurer Wärmepumpe zu verbinden, ist die Servicebuchse.
In meiner Bosch CS 6800i AW 12 MB befindet sich die Servicebuchse auf der linken Seite der Elektronikbox.
Dazu öffnet ihr die vordere Blende der Inneneinheit durch Entfernen der Schraube auf der Oberseite und drückt die beiden Verriegelungsknöpfe.
Um zur Servicebuchse zu gelangen, löst ihr die Schraube oben und klappt die graue Elektronikbox heraus.
Dann verbindet ihr zuerst das Kabel mit dem _ems-esp_ Gateway und im nächsten Schritt steckt ihr das Kabel in die Servicebuchse (genau in dieser Reihenfolge).
Daraufhin könnt ihr alles wieder zusammenbauen und das Kabel links oben durch die kleine Aussparung zwischen Frontblende und Gehäuse führen.

<figure class="half">
  <a href="/assets/images/BBQKees-Gateway-S3.jpg">
    <img src="/assets/images/BBQKees-Gateway-S3.jpg" alt="BBQKees Gateway S3">
  </a>
  <a href="/assets/images/Servicebuchse.jpg">
    <img src="/assets/images/Servicebuchse.jpg" alt="Servicebuchse an der Bosch Compress CS6800i AW 12 MB Inneneinheit">
  </a>
</figure>

Um sporadische Verbindungsprobleme zu vermeiden, solltet ihr ein hochwertiges Verbindungskabel verwenden und das Gateway außerhalb der Inneneinheit aufbewahren.

### Einrichtung

Sobald das Gateway mit eurer Wärmepumpe verbunden ist, startet es automatisch und öffnet ein WLAN mit dem Namen _'ems-esp'_.
Verbindet euch mit eurem Computer oder Smartphone mit diesem WLAN.
Wenn ihr dann die Adresse [http://192.168.4.1](http://192.168.4.1) im Browser öffnet, erscheint die _ems-esp_ Weboberfläche.
Default-Zugangsdaten sind _'admin'_ mit Passwort _'admin'_.

[![Weboberfläche von _ems-esp_](/assets/images/EMS-ESP.png "Weboberfläche ems-esp")](/assets/images/EMS-ESP.png)

Nun müsst ihr noch euer heimisches WLAN unter [Einstellungen &rarr; Netzwerk](http://ems-esp/settings/network/settings) einrichten.
Dann könnt ihr mit eurem Computer/Smartphone wieder zurück ins heimische WLAN wechseln.

Euer _ems-esp_ Gateway sollte nun unter [http://ems-esp](http://ems-esp) oder [http://ems-esp.local](http://ems-esp.local) erreichbar sein.
Die REST API erreicht ihr unter `/api`:

```shell
curl http://ems-esp/api/thermostat/manualtemp
> {"name":"manualtemp","fullname":"HK1 manuelle Temperatur","circuit":"hc1","value":21.5,"type":"number","min":0,"max":127,"uom":"°C","readable":true,"writeable":true,"visible":true}
```

### Entitäten auslesen/setzen

In der Weboberfläche taucht eure Wärmepumpe mit 3 Geräten auf:

- **XCU_THH/CS\*800i, Logatherm WLW\*** (Boiler): die Wärmepumpensteuerung \
  Der Boiler übernimmt die Steuerung aller wichtigen Funktionen der Wärmepumpe und bietet die meisten Entitäten an.
- **HMI800.2/Rego 3000, UI800, Logamatic BC400** (Thermostat): das Bedienfeld an der Inneneinheit \
  Das Thermostat ist im Wesentlichen für die Bestimmung der Vorlauftemperatur und ein paar weiterer Einstellungen verantwortlich.
- **K30RF/WiFi module** (Gateway Module): optionales WiFi-Modul zur Anbindung der Bosch/Buderus App

Die Entitäten, die von den Geräten ausgelesen werden können, sind entweder Messwerte (z.B. Vorlauftemperatur), Statusinformationen (z.B. Warmwasseraufbereitung aktiv), Einstellungen (z.B. gewünschte Raumtemperatur) oder Kommandos (z.B. Desinfektion starten).
In meiner [Entitäten-Übersicht](/docs/smarthome/entities) findet ihr eine Liste mit Erklärungen der wichtigsten Entitäten.

Jetzt könnt ihr auch schon loslegen und über die Weboberfläche die Entitäten einsehen und konfigurieren.
Und über die REST API könnt ihr folgende Erweiterungen anbinden:

- [Benachrichtigungen](/docs/smarthome/benachrichtigungen), um über Zustandsänderungen per Push-Notification auf euer Smartphone informiert zu werden
- Energiemanagement-Systeme wie [evcc](/docs/smarthome/evcc) anbinden
- [Gen-AI](/docs/smarthome/ai) Anwendung wie Anthropic Claude nutzen, um eure Entitäten auszuwerten.

Wie ihr Smarthome-Systeme über MQTT verbindet, erfahrt ihr im nächsten Abschnitt.

## MQTT

Für den Datenaustausch zwischen _ems-esp_ und einem Smarthome-System bietet sich MQTT an.
Dazu braucht man einen MQTT-Broker, wie [Mosquitto](https://mosquitto.org/), der in vielen Smarthome-Systemen bereits als optionale Erweiterung mitgeliefert wird.
In Home Assistant und OpenHAB kann Mosquitto leicht über das entsprechende [Add-on](https://github.com/home-assistant/addons/blob/master/mosquitto/DOCS.md) installiert werden.
Die Kommunikation mit _evcc_ funktioniert über die REST API von _ems-esp_.
Daher braucht ihr für _evcc_ kein MQTT.

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
