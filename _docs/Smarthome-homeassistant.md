---
title: Home Assistant
excerpt: Anleitung, um Bosch CS5800/6800i und Buderus WLW176/186 Wärmepumpen in Home Assistant einzubinden
permalink: /docs/smarthome/ha
toc: true
---

## Home Assistant

Diese Anleitung setzt voraus, dass ihr bereits [ems-esp](/docs/smarthome/) installiert habt.

### Einbinden von ems-esp

Nach erfolgreicher [Installation](https://www.home-assistant.io/installation) von Home Assistant, erhält man folgenden Onboarding-Screen.

[![Home Assistant Onboarding-Screen](/assets/images/HA-Onboarding.png)](/assets/images/HA-Onboarding.png)

Mit Klick auf _MEIN SMARTHOME ERSTELLEN_ wird man aufgefordert ein Benutzerkonto anzulegen und eine Adresse auszuwählen.
Im nächsten Schritt kann man Home Assistant optionale Telemetriedaten zur Verfügung stellen.
Im letzten Schritt werden Geräte angezeigt, die Home Assistant bereits während der Installation im Heimnetz identifizieren konnte - z.B. Fritzbox und Smart Plugs von Shelly.

Home Assistant kann _ems-esp_ nicht direkt identifizieren.
Dies lässt sich schnell ändern, indem man _Integration hinzufügen_ unter _Einstellungen &rarr; Geräte & Dienste_ auswählt.
In der Anbietersuche gibt man _MQTT_ ein.

[![Home Assistant: MQTT Integration](/assets/images/HA-MQTT.png)](/assets/images/HA-MQTT.png)

Daraufhin öffnet sich ein Dialog, indem man das _offizielle Add-on Mosquitto Mqtt Broker_ installieren kann.
Hat man die MQTT-Integration erfolgreich aufgeschlossen, so erhält man eine Übersicht aller über das MQTT-Discovery identifizierten Geräte:

- ems-esp Boiler = Wärmepumpe
- ems-esp = Gateway Module
- ems-esp Thermostat = Thermostat

Nach Bestätigung gelangt man zurück zur Übersicht, in der nun alle verfügbaren Entitäten dargestellt werden.

[![Home Assistant: Übersicht](/assets/images/HA-Overview.png)](/assets/images/HA-Overview.png)

Ein detailliertere Installationsanleitung kann man auch direkt bei [ems-esp](https://bbqkees-electronics.nl/wiki-archive/gateway/home-assistant-configuration.html) finden.

### Messwerteverlauf visualisieren

Und dann kann es auch schon mit den ersten Messwerten losgehen!
Um die Funktionsweise der Wärmepumpe genauer zu verstehen und die Effizienz zu überwachen, macht es Sinn, sich einige Messwerte grafisch darstellen zu lassen.
Mit Klick auf [_Verlauf_](https://my.home-assistant.io/redirect/history/) im Menü links kann man _Entitäten auswählen_, deren Verlauf man angezeigt bekommen möchte.
Im nachfolgenden Verlauf werden die folgenden Messwerte dargestellt:

- _Boiler Gewählte Vorlauftemperatur_: die gewünschte Vorlauftemperatur, die sich aus der [eingestellten Heizkurve](/docs/einstellungen#heizkurve) und der Außentemperatur ergibt.
  Im dargestellten Beispiel lag die Außentemperatur bei -2..-4 °C und die Sollvorlauftemperatur bei 32..35 °C.
- _Boiler Aktuelle Vorlauftemperatur_: die reale Vorlauftemperatur, die wie im Diagramm zu sehen um die gewählte Vorlauftemperatur schwingt.
  Die Ausreißer nach unten sind [Abtauvorgänge](/docs/technischer-aufbau/#abtauvorgang), da die Luftfeuchtigkeit bei ca. 90% lag.

[![Verlauf von Messwerten](/assets/images/HA-History_FlowTemp.png)](/assets/images/HA-History_FlowTemp.png)

[![Diesen Verlauf direkt in Home Assistant öffnen](https://my.home-assistant.io/badges/history.svg "Diesen Verlauf direkt in Home Assistant öffnen")](http://homeassistant.local:8123/history?entity_id=sensor.boiler_curflowtemp%2Cnumber.boiler_selflowtemp)

### Arbeitszahl/COP mit Helfer-Entitäten

Interessante Einsicht in die Effizienz der Anlage bietet insbesondere die Arbeitszahl, die manchmal auch als COP bezeichnet wird.
Die Arbeitszahl ist nicht direkt über _ems-esp_ verfügbar, kann aber einfach eingerichtet werden.
Die Arbeitszahl ist der Quotient aus thermischen Leistungsabgabe _Q_ und der elektrischen Leistungsaufnahme _P_.
Zur Berechnung benötigt man 3 [Helfer-Entitäten](https://my.home-assistant.io/redirect/helpers/):

<figure class="third">
  <a href="/assets/images/HA-Helper_PowerTotal.png">
  <img src="/assets/images/HA-Helper_PowerTotal.png" alt="Helfer Entität für aktuelle thermische Leistungsabgabe"></a>
  <a href="/assets/images/HA-Helper_PowerConsTotal.png">
  <img src="/assets/images/HA-Helper_PowerConsTotal.png" alt="Helfer Entität für aktuelle elektrische Leistungsaufnahme"></a>
  <a href="/assets/images/HA-Helper_Arbeitszahl.png">
  <img src="/assets/images/HA-Helper_Arbeitszahl.png" alt="Helfer Entität für aktuelle Arbeitszahl"></a>
</figure>

1. **Thermische Leistungsabgabe** als _Ableitungssensor_ der thermischen Energie
   - Art: Helfer &rarr; Ableitungssensor
   - Name: _boiler_powertotal_
   - Eingangssensor: _ems-esp Boiler Gesamtenergie_
   - Genauigkeit: _2_ decimals
   - Zeitfenster: mindestens _10 Minuten_, um die Messungenauigkeit etwas zu glätten
   - Zeiteinheit: _Stunden_
2. **Elektrische Leistungsaufnahme** als _Ableitungssensor_ der elektrischen Energie
   - Art: Helfer &rarr; Ableitungssensor
   - Name: _boiler_powerconstotal_
   - Eingangssensor: _ems-esp Boiler Gesamtmessung_
   - Genauigkeit: _2_ decimals
   - Zeitfenster: mindestens _10 Minuten_, um die Messungenauigkeit etwas zu glätten
   - Zeiteinheit: _Stunden_
3. **Arbeitszahl** als _Template für einen Sensor_
   - Art: Helfer &rarr; Template &rarr; Template für einen Sensor
   - Name: _boiler_az_
   - Zustandstemplate:
     {% raw %}
     ```
     {% set q = states('sensor.boiler_powertotal') | float %}
     {% set p = states('sensor.boiler_powerconstotal') | float %}
     {% if q >= 0 and p > 0 %}
     {{ (q / p) | round(2) }}
     {% else %}
       0
     {% endif %}
     ```
     {% endraw %}
   - Geräteklasse: _Leistungsfaktor_
   - Gerät: _ems-esp Boiler_

Wie bereits oben für den Vorlauf beschrieben, können wir die 3 neuen Helfer-Entitäten auch über einen frei wählbaren Zeitraum im Verlauf betrachten:

[![Verlauf von Messwerten](/assets/images/HA-History_Arbeitszahl.png)](/assets/images/HA-History_Arbeitszahl.png)

[![Diesen Verlauf direkt in Home Assistant öffnen](https://my.home-assistant.io/badges/history.svg "Diesen Verlauf direkt in Home Assistant öffnen")](http://homeassistant.local:8123/history?entity_id=sensor.boiler_powerconstotal%2Csensor.boiler_powertotal%2Csensor.boiler_cop)

Das Diagramm zeigt die 3 Helfer-Entitäten bei -5 °C Außentemperatur.
Die elektrische Leistungsaufnahme schwankt zwischen 530 W und 1600 W.
Mit Hilfe der Umgebungswärme werden daraus zwischen 2000 W und 4700 W gewonnen.
Die Arbeitszahl liegt bei ca. 3 im Normalbetrieb, und fällt stark ab, wenn der Abtauvorgang einsetzt, da thermische Energie zum Abtauen "verloren" geht.

Vermutlich wollt ihr aber nicht nur die aktuelle Arbeitszahl sehen, sondern diese auch über die gesamte Laufzeit eurer Wärmepumpe auswerten.
Dazu legt ihr euch einfach eine weitere Helfer-Entität für die **Jahresarbeitszahl** an:

- Art: Helfer &rarr; Template &rarr; Template für einen Sensor
- Name: _boiler_jaz_
- Zustandstemplate:
  {% raw %}
  ```
  {% set q = states('sensor.boiler_nrgsupptotal') | float %}
  {% set p = states('sensor.boiler_nrgconstotal') | float %}
  {% if q >= 0 and p > 0 %}
  {{ (q / p) | round(2) }}
  {% else %}
    0
  {% endif %}
  ```
  {% endraw %}
- Geräteklasse: _Leistungsfaktor_
- Gerät: _ems-esp Boiler_

### Wärmepumpen Dashboard

Um auf einen Blick alle relevanten Messwerte zu erhalten, empfiehlt es sich im nächsten Schritt ein Dashboard zu erstellen.
Ein einfaches Dashboard für die Wärmepumpte sieht beispielsweise so aus:

[![Einfaches Home Assistant Dashboard](/assets/images/HA-SimpleDashboard.png)](/assets/images/HA-SimpleDashboard.png)

Die Konfiguration für dieses Dashboard findet ihr hier: [https://github.com/bosch-buderus-wp/home-assistant/blob/main/dashboards/simple-dashboard.yaml](https://github.com/bosch-buderus-wp/home-assistant/blob/main/dashboards/simple-dashboard.yaml).
Um die Konfiguration zu übernehmen, erstellt euch einfach ein neues Dashboard in der Dashboard-Übersicht:

[![Dashboard-Übersicht anzeigen](https://my.home-assistant.io/badges/lovelace_dashboards.svg "Dashboard-Übersicht anzeigen")](https://my.home-assistant.io/redirect/lovelace_dashboards/)

und klickt dann oben rechts auf den Stift, dann auf die 3 Punkte und dann auf _Raw-Konfigurationseditor_.
Dort könnt ihr dann die Konfiguration reinkopieren, speichern und das Dashboard direkt nutzen.

Weitere Details folgen in Kürze.
