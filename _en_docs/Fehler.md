---
title: "Common Operating Errors"
headline: "Troubleshooting"
excerpt: "Errors of the Bosch CS5800/6800i and Buderus WLW176/186i with explanations and solutions"
permalink: /en/docs/fehler/
toc: true
sidebar:
  nav: "en_docs"
lang: en
translation_url: /docs/fehler/
translation_generated: true
---

Users often report errors that occur during operation.
Typical errors are listed on this page.

## 5161, 5162, and 5184: No Pressure Build-up After Power Failure

In older software versions of the outdoor unit, the 4-way valve VR4 may remain in the center position after a power failure.
This causes an unintended pressure equalization in the refrigerant circuit, and the compressor cannot build up a sufficient pressure difference.

Possible messages include:

- **5184** (Installer info): No pressure build-up during compressor operation. If the message is triggered more than twice within three hours, **5161** follows and heat pump operation is blocked.
- **5161** (Customer alarm): No pressure build-up during compressor operation.
- **5162** (Installer info): Pressure difference between the high- and low-pressure sides too low for the switching operation of the 4-way valve. Bosch also specifies a VR4 stuck in the center position as a possible cause for this.

Bosch/Buderus integrated a bug fix for this behavior after a power failure in [9.12.0 / 9.7.0](/en/docs/sw-versionen/#9120--970). If 5161, 5162, or 5184 occur immediately after a power failure, the software version of the outdoor unit should therefore be checked first. If an older version is installed, the specialist company should be asked about an update before a hardware defect is assumed.
Sometimes the jammed 4-way valve becomes unstuck if the system is disconnected from the power supply several times for a few minutes.

Source: [Bosch service manual](https://bosch-ch-de.boschhc-documents.com/download/file/file/6721872875.pdf)

## Temperature Sensor TA4 at the Condensate Pan

In units with an **FD code below 578** (manufactured before October 2025), the temperature sensor TA4 is originally located at the rear of the condensate pan.
It can come loose when the rear panel is removed or, under certain weather conditions, become enclosed by insulating ice.
The resulting incorrect temperature value frequently triggers error **5160**.
If the sensor signal is invalid, **5107** is also possible.

Since FD 578, TA4 has been mounted with an improved metal bracket on the left side of the condensate pan.
The new TA4 assembly requires at least software version 9.12.

Source: [Bosch service manual](https://bosch-ch-de.boschhc-documents.com/download/file/file/6721872875.pdf)

<figure class="half">
  <a href="https://i.ibb.co/7xrC8kRS/ODU-Innen-Links.jpg">
  <img src="https://i.ibb.co/7xrC8kRS/ODU-Innen-Links.jpg"></a>

  <a href="https://i.ibb.co/Y46JwZ47/ODU-Innen-Rechts.jpg">
  <img src="https://i.ibb.co/Y46JwZ47/ODU-Innen-Rechts.jpg"></a>
</figure>

## Rattling Fan

A loose cap or hub cover on the fan can cause clicking or rattling noises.
In this case, customer service can replace the cap without necessarily having to replace the complete fan.

[![Fan cap](https://i.ibb.co/d0QPKjRt/ODU-Innen-Vorne.jpg)](https://i.ibb.co/d0QPKjRt/ODU-Innen-Vorne.jpg)

## EPP Air Guide at the Evaporator

On some outdoor units, the EPP rigid foam air guide in the lower area of the evaporator was cut or the gap increased as part of a customer service visit.
This is intended to prevent condensate and ice from accumulating on the foam, allowing them to drain more effectively toward the condensate pan.
In customer service reports, the measure is documented, for example, as “EPP gap dimensions increased.”

There are currently no generally published factory instructions or clear FD limit known for this rework.
It should therefore not be carried out independently. If noticeable ice formation or obstructed condensate drainage occurs, it should be coordinated with Bosch/Buderus customer service.

## Temperature Limiter FE3 on the Compressor

The thermal protection or temperature limiter FE3 is located on top of the compressor and is commonly referred to as a **Klixon**.
Bosch/Buderus considers the original version in units with an **FD code below 638** (manufactured before February 2026) to be unreliable.
It can cause false alarms **5130** or **5131**, even though a resistance measurement initially still indicates continuity.

For affected units, Bosch provides for proactive replacement with the improved version.
The spare part is the **Sensata 1NT11L temperature limiter**.
After replacement, the cover of the switch box should be marked with “FE3 ✓”.

Source: [Bosch service manual](https://bosch-ch-de.boschhc-documents.com/download/file/file/6721872875.pdf)
