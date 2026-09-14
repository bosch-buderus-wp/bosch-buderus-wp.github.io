---
title: "Using a heat pump in Gen-AI applications"
headline: "Using a heat pump in Gen-AI applications"
excerpt: "Instructions for using data from Bosch CS5800/6800i and Buderus WLW176/186i in Gen-AI and LLM applications such as Claude."
permalink: /en/docs/smarthome/ai
toc: true
sidebar:
  nav: "en_docs"
lang: en
translation_url: /docs/smarthome/ai
translation_generated: true
---

{% include video id="QTeLufsVr88" provider="youtube" %}

Are you already using a Gen-AI application such as [Anthropic Claude](https://claude.ai/)?
Then the [EMS-ESP MCP server](https://github.com/bosch-buderus-wp/emsesp-mcp-server) could be of interest to you.
The MCP server enables the Large Language Model (LLM) to access your heat pump in order to answer questions such as these:

- How warm is our domestic hot water right now?
- How efficiently is domestic hot water being produced?
- How much power is my heat pump consuming at the moment?

In addition to these simple queries for entities, more complex requests are also possible, such as:

- Show me all domestic hot water settings (start, stop & charging delta) for the various operating modes (Comfort, Eco, Eco+, One-time charge & Disinfection) as a table!
- Display the heating curve in a diagram ...

[![Visualizing the heating curve with Claude Desktop](https://i.ibb.co/0jzTstC7/Claude-Heatcurve.png)](https://i.ibb.co/0jzTstC7/Claude-Heatcurve.png)

To save you some writing, the last two requests are already stored as _prompts_.
In Claude Desktop, you can find stored prompts by clicking the `+`.

## Installation

Claude Desktop offers the easiest installation—also in the free version.
To do so, download this [DXT Desktop Extension](https://github.com/bosch-buderus-wp/emsesp-mcp-server/releases/latest/download/emsesp-mcp-server.dxt).
Then open the settings in Claude Desktop, click `Extensions`, and drag the downloaded DXT file into the window.
Then click `Install` and enter the URL under which your [EMS-ESP](/en/docs/smarthome/) gateway can be reached on the local network in the configuration.
And then you are ready to go!

In many other Gen-AI applications, such as Github Copilot, you must add the following configuration in the settings:

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

## Technical details

{: .notice--info}
_What is an MCP server?_

MCP stands for [Model Context Protocol](https://modelcontextprotocol.io/) and was released by Anthropic in November 2024 to provide Large Language Models (LLMs) with contextual information.
In this case, the context consists of the heat pump's entities.
For the request _"How warm is the domestic hot water right now"_, the LLM retrieves the entity [hptw1](https://bosch-buderus-wp.github.io/en/docs/smarthome/entities#messwerte-1) and creates a corresponding response in text form.
However, the LLM can answer not only trivial requests such as this one.
For the request _"How efficiently is domestic hot water being produced?"_, the LLM divides the entity [dhw.nrg](https://bosch-buderus-wp.github.io/en/docs/smarthome/entities#mit-2-nachkommastellen) by [dhw.meter](https://bosch-buderus-wp.github.io/en/docs/smarthome/entities#mit-2-nachkommastellen) and thus returns the COP/performance factor.

{: .notice--info}
_Can the LLM access my heat pump without my involvement, and what data is made available to the LLM?_

When the LLM wants to access your heat pump via EMS-ESP, a permission request appears in the Gen-AI application.
You can then decide for yourself whether you want to allow the request once or permanently.
I recommend that you do not permanently allow control access, at least.

Data is transmitted to the provider's LLM only when you confirm the permission request.
The data consists of selected entities from your heat pump.
No other data, including personal data, is transmitted.

```mermaid
architecture-beta
    group cloud(cloud)[Cloud]
    service llm(cloud)[LLM] in cloud

    group home(server)[Home]
    service hp(disk)[Waermepumpe] in home
    service emsesp(server)[EMS ESP] in home
    group notebook(server)[Your computer] in home
    service app(server)[GenAI application] in notebook
    service mcp(server)[MCP Server] in notebook

    llm:T -- B:app
    app:R -- L:mcp
    mcp:R -- L:emsesp
    emsesp:R -- L:hp
```

{: .notice--info}
_Which other Gen-AI applications can I use?_

Here you will find an overview of all Gen-AI applications that support MCP: [MCP Clients](https://modelcontextprotocol.io/clients).
The MCP server for EMS-ESP should be compatible with all MCP clients that support _Tools_. If not, feel free to open an [issue](https://github.com/bosch-buderus-wp/emsesp-mcp-server/issues).
