---
title: "Wärmepumpe ins Smarthome einbinden: lokale API und EMS-ESP"
headline: "Smarthome"
excerpt: "Lokale K 40 RF API und EMS-ESP im Vergleich: Zugangswege und Anleitungen für Home Assistant, OpenHAB, Grafana, evcc, Benachrichtigungen und AI."
permalink: /docs/smarthome/
toc: true
---

Ihr möchtet eure Bosch CS5800/6800i oder Buderus WLW176/186i ins Smarthome einbinden, Messwerte auswerten oder Abläufe automatisieren?
Dafür gibt es zwei lokale Zugangswege: die **offizielle API des Bosch K 40 RF oder Buderus MX400 WLAN-Gateways** und ein **EMS-ESP-Gateway am EMS-Bus**.
Wählt zuerst den passenden Zugang und danach die Anleitung für eure Anwendung.

## Zugangswege im Vergleich

|               | Lokale API                                                           | EMS-ESP                                                                            |
| ------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Voraussetzung | K 40 RF oder MX400 mit Firmware `15.00.01` oder neuer                | Zusätzliches EMS-ESP-Gateway muss in der Inneneinheit am EMS-Bus angesteckt werden |
| Verbindung    | HTTPS im lokalen Netzwerk                                            | REST API oder MQTT im lokalen Netzwerk, HTTPS Callbacks                            |
| Daten         | Ausgewählte Messwerte, Einstellungen, Statusinformationen und historische Werte | Von EMS-ESP unterstützte Messwerte, Einstellungen und Statusinformationen |
| Operationen   | Nur lesend                                                           | Lesend und optional auch schreibend                                                |
| Einrichtung   | [Zugang und Access Token einrichten](/docs/smarthome/local-api)      | [Gateway einbauen und einrichten](/docs/smarthome/ems-esp/)                        |
| Referenz      | [API-Endpunkte](/docs/smarthome/local-api#api-referenz)              | [EMS-ESP Entitäten](/docs/smarthome/entities)                                      |

Welche Werte verfügbar sind, hängt von eurer Anlage und dem jeweiligen Zugang ab.
EMS-ESP-Entitäten und lokale API-Endpunkte haben unterschiedliche Bezeichnungen und sind nicht direkt austauschbar.

## Anwendungen

Die Tabelle zeigt, welchen Zugang die jeweilige Anleitung auf dieser Website beschreibt.
Für die lokale API sind weitere Anbindungen möglich, benötigen aber eine passende Integration.

| Anwendung                                                | Wofür?                                          | Dokumentierter Zugang   |
| -------------------------------------------------------- | ----------------------------------------------- | ----------------------- |
| [Home Assistant](/docs/smarthome/ha)                     | Messwerte und Automatisierungen                 | EMS-ESP; lokale API oder Cloud über Custom Integrations |
| [OpenHAB](/docs/smarthome/openhab)                       | Messwerte und Automatisierungen                 | EMS-ESP                 |
| [Grafana](/docs/smarthome/grafana)                       | Live-Dashboard und Auswertungen historischer Daten | Lokale API oder EMS-ESP |
| [evcc](/docs/smarthome/evcc)                             | PV-Überschuss für die Wärmepumpe nutzen         | EMS-ESP                 |
| [Benachrichtigungen](/docs/smarthome/benachrichtigungen) | Zustandsänderungen per Push-Nachricht erhalten  | EMS-ESP                 |
| [AI](/docs/smarthome/ai)                                 | Wärmepumpendaten über einen MCP-Server abfragen | EMS-ESP                 |

<script src="{{ '/assets/js/smarthome-legacy-links.js' | relative_url }}" defer></script>
