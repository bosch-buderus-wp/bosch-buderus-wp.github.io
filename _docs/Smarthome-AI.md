---
title: Wärmepumpe in Gen-AI Anwendungen nutzen
excerpt: Anleitung, um Bosch CS5800/6800i und Buderus WLW176/186 Wärmepumpen in Large Language Models (LLM), u.a. in Anthropic Claude, zu nutzen.
permalink: /docs/smarthome/ai
toc: true
---

{% include video id="QTeLufsVr88" provider="youtube" %}

Nutzt du bereits Gen-AI Anwendung wie [Anthropic Claude](https://claude.ai/)?
Dann könnte der [EMS-ESP MCP-Server](https://github.com/bosch-buderus-wp/emsesp-mcp-server) für dich interessant sein.
Der MCP-Server ermöglicht dem Large-Language-Model (LLM) auf eure Wärmepumpe zuzugreifen, um Fragen wie diese zu beantworten:

- Wie warm ist unser Brauchwasser gerade?
- Wie effizient wird Brauchwasser erzeugt?
- Wie viel Leistung bezieht meine Wärmepumpe im Moment?

Neben diesen einfachen Abfragen von Entitäten, können auch komplexere Anfragen wie:

- Zeige mir alle Warmwassereinstellungen (Start, Stop & Ladedelta) für die verschiedenen Betriebsmodi (Komfort, Eco, Eco+, Einmalladung & Desinfektion) als Tabelle!
- Stelle die Heizkurve in einem Diagramm dar ...

[![Heizkurve mit Claude Desktop visualisieren](https://i.ibb.co/0jzTstC7/Claude-Heatcurve.png)](https://i.ibb.co/0jzTstC7/Claude-Heatcurve.png)

Um euch die Schreibarbeit zu verkürzen, sind die letzten beiden Anfragen bereits als _Prompts_ hinterlegt.
In Claude Desktop findet ihr hinterlegte Prompts durch Drücken auf das `+`.

## Installation

Die einfachste Installation bietet Claude Desktop - auch in der kostenlosen Version.
Dazu ladet ihr euch diese [DXT Desktop Extension](https://github.com/bosch-buderus-wp/emsesp-mcp-server/releases/latest/download/emsesp-mcp-server.dxt) herunter.
Dann öffnet ihr in Claude Desktop die Einstellungen, klickt auf `Extensions` und zieht die heruntergeladene DXT-Datei in das Fenster.
Dann auf `Install` klicken und in der Konfiguration die URL, unter der euer [EMS-ESP](/docs/smarthome/) Gateway im lokalen Netzwerk erreichbar ist, eintragen.
Und schon kann's losgehen!

In vielen anderen Gen-AI Anwendungen, wie z.B. Github Copilot, müsst ihr folgende Konfiguration in den Einstellungen hinzufügen:

```
"emsesp": {
  "type": "stdio",
  "command": "npx",
  "args": [
    "-y",
    "github:bosch-buderus-wp/emsesp-mcp-server"
  ],
  "env": {
    "EMS_ESP_URL": "http://ems-esp.local"
  }
}
```

## Technische Details

{: .notice--info}
_Was ist ein MCP-Server?_

MCP steht für das [Model-Context-Protocol](https://modelcontextprotocol.io/) und wurde von Anthropic im November 2024 veröffentlicht, um Large-Language Models (LLMs) mit Kontextinformationen anreichern zu können.
In diesem Fall sind der Kontext die Entitäten der Wärmepumpe.
Auf die Anfrage wie _"Wie warm ist das Brauchwasser gerade"_ ruft das LLM die Entität [hptw1](https://bosch-buderus-wp.github.io/docs/smarthome/entities#messwerte-1) ab und erstellt eine entsprechende Antwort in Textform.
Das LLM kann aber nicht nur triviale Anfragen wie diese beantworten.
Auf die Anfrage _"Wie effizient wird Brauchwasser erzeugt?"_ dividiert das LLM die Entität [dhw.nrg](https://bosch-buderus-wp.github.io/docs/smarthome/entities#mit-2-nachkommastellen) durch [dhw.meter](https://bosch-buderus-wp.github.io/docs/smarthome/entities#mit-2-nachkommastellen) und liefert somit den COP/AZ zurück.

{: .notice--info}
_Kann das LLM ohne mein Zutun auf meine Wärmepumpe zugreifen und welche Daten werden dem LLM zur Verfügung gestellt?_

Wenn das LLM auf eure Wärmepumpe via EMS-ESP zugreifen möchte, erscheint in der Gen-AI Anwendung eine Erlaubnisanfrage.
Ihr könnt dann selbst entscheiden, ob ihr die Anfrage einmalig oder für immer erlauben wollt.
Ich empfehle euch zumindest Steuerungszugriffe nicht dauerhaft zu erlauben.

Nur wenn ihr die Erlaubnisanfrage bestätigt, werden Daten an das LLM des Anbieters übertragen.
Bei den Daten handelt es sich um ausgewählte Entitäten eurer Wärmepumpe.
Es werden keine weiteren Daten, also auch keinen personenbezogenen Daten, übertragen.

```mermaid
architecture-beta
    group cloud(cloud)[Cloud]
    service llm(cloud)[LLM] in cloud

    group home(server)[Zuhause]
    service hp(disk)[Waermepumpe] in home
    service emsesp(server)[EMS ESP] in home
    group notebook(server)[Euer Computer] in home
    service app(server)[GenAI Anwendung] in notebook
    service mcp(server)[MCP Server] in notebook

    llm:T -- B:app
    app:R -- L:mcp
    mcp:R -- L:emsesp
    emsesp:R -- L:hp
```

{: .notice--info}
_Welche anderen Gen-AI Applikation kann ich nutzen?_

Hier findest du eine Übersicht aller Gen-AI Anwendungen, die MCP unterstützen: [MCP Clients](https://modelcontextprotocol.io/clients).
Der MCP-Server für EMS-ESP sollte mit allen MCP Clients, die _Tools_ unterstützen, kompatibel sein. Falls nicht, macht gerne ein [Issue](https://github.com/bosch-buderus-wp/emsesp-mcp-server/issues) auf.
