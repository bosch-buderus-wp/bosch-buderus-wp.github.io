---
title: "Integrating a heat pump into a smart home: local API and EMS-ESP"
headline: "Smart home"
excerpt: "Comparison of the local K 40 RF API and EMS-ESP: access methods and instructions for Home Assistant, OpenHAB, Grafana, evcc, notifications, and AI."
permalink: /en/docs/smarthome/
toc: true
sidebar:
  nav: "en_docs"
lang: en
translation_url: /docs/smarthome/
translation_generated: true
---

Would you like to integrate your Bosch CS5800/6800i or Buderus WLW176/186i into your smart home, analyze measurement data, or automate processes?  
There are two local access methods for this: the **official API of the Bosch K 40 RF or Buderus MX400 Wi-Fi gateway** and an **EMS-ESP gateway on the EMS bus**.  
First select the appropriate access method, and then the guide for your application.

## Access methods compared

|               | Local API                                                           | EMS-ESP                                                                            |
| ------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Requirement   | K 40 RF or MX400 with firmware `15.00.01` or newer                  | Additional EMS-ESP gateway must be connected to the EMS bus in the indoor unit   |
| Connection    | HTTPS in the local network                                            | REST API or MQTT in the local network, HTTPS callbacks                            |
| Data          | Selected readings, settings, status information, and historical values | Readings, settings, and status information supported by EMS-ESP                    |
| Operations    | Read-only                                                            | Read-only and optionally write access                                              |
| Setup         | [Set up access and access token](/en/docs/smarthome/local-api/)          | [Install and set up gateway](/en/docs/smarthome/ems-esp/)                            |
| Reference     | [API endpoints](/en/docs/smarthome/local-api/#api-referenz)              | [EMS-ESP entities](/en/docs/smarthome/entities/)                                      |

Which values are available depends on your system and the respective access method.
EMS-ESP entities and local API endpoints use different names and cannot be exchanged directly.

## Applications

The table shows which access method the respective guide on this website describes.  
Other connections are possible for the local API, but require a suitable integration.

| Application                                             | What for?                                         | Documented access       |
| ------------------------------------------------------- | ------------------------------------------------- | ----------------------- |
| [Home Assistant](/en/docs/smarthome/home-assistant/)                    | Measurement values and automations                | EMS-ESP; local API or cloud via Custom Integrations |
| [OpenHAB](/en/docs/smarthome/openhab/)                      | Measurement values and automations                | EMS-ESP                 |
| [Grafana](/en/docs/smarthome/grafana/)                      | Live dashboard and analyses of historical data    | Local API or EMS-ESP |
| [evcc](/en/docs/smarthome/evcc/)                            | Use surplus PV power for the heat pump            | EMS-ESP                 |
| [Notifications](/en/docs/smarthome/notifications/)    | Receive status changes via push notification      | EMS-ESP                 |
| [AI](/en/docs/smarthome/ai/)                                | Query heat pump data via an MCP server            | EMS-ESP                 |

<script src="{{ '/assets/js/smarthome-legacy-links.js' | relative_url }}" defer></script>
