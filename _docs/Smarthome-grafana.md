---
title: Grafana
excerpt: Anleitung, um Bosch CS5800/6800i und Buderus WLW176/186 Wärmepumpen in Grafana über InfluxDB einzubinden
permalink: /docs/smarthome/grafana
toc: false
---

## InfluxDB & Grafana

Wer die Daten lieber mit [Grafana](https://grafana.com) visualisieren möchte, kann die Daten entweder über Home Assistant oder OpenHAB oder alternativ über [Telegraf](https://www.influxdata.com/integration/mqtt-telegraf-consumer/) in eine [InfluxDB](https://www.influxdata.com/) schreiben, auf die dann Grafana zugreift.

[![Elektrische und thermische Leistung zur Außentemperatur in Grafana](/assets/images/GrafanaLeistungZurAT.png)](/assets/images/GrafanaLeistungZurAT.png)

[![Kältekreis, Primärkreis und Heizkreis mit Temperaturen in Grafana](/assets/images/Grafana-Circuits.png)](/assets/images/Grafana-Circuits.png)

Weitere Details folgen in Kürze.
