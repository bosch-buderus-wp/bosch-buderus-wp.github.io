---
title: "Software versions, firmware and statuses"
headline: "Software versions"
excerpt: "Overview of software versions and firmware statuses of the Bosch CS5800/6800i and Buderus WLW176/186i heat pumps."
permalink: /en/docs/sw-versionen/
toc: true
sidebar:
  nav: "en_docs"
lang: en
translation_url: /docs/sw-versionen/
translation_generated: true
---

The Bosch CS5800/6800i and Buderus WLW176/186i heat pumps receive new software versions for the indoor unit, outdoor unit and control panel at irregular intervals.
Unfortunately, a new software version cannot be installed over the air.
An update can only be performed on site by customer service.

The currently installed software version can be retrieved in the service menu under _Info &rarr; System components_.

[![Software version of the outdoor unit](/assets/images/SW-Versionen-Außeneinheit.jpg)](/assets/images/SW-Versionen-Außeneinheit.jpg)

## 5.27

{: .notice}
<i class="fa-solid fa-fan" style="color: #646464;"></i> Outdoor unit: 23.03.03-5.27 \
<i class="fa-solid fa-mobile-button fa-rotate-180" style="color: #646464;"></i> Indoor unit: 23.03.03-5.27 \
<i class="fa-solid fa-tv" style="color: #646464;"></i> Control panel: N47.07

<i class="fa-solid fa-calendar-days" style="color: #646464;"></i> March 2023

No further information known

## 5.35

{: .notice}
<i class="fa-solid fa-fan" style="color: #646464;"></i> Outdoor unit: 23.08.08-5.35 \
<i class="fa-solid fa-mobile-button fa-rotate-180" style="color: #646464;"></i> Indoor unit: 23.08.08-5.35 \
<i class="fa-solid fa-tv" style="color: #646464;"></i> Control panel: N47.07

<i class="fa-solid fa-calendar-days" style="color: #646464;"></i> August 2023

No further information known

## 7.10.0

{: .notice}
<i class="fa-solid fa-fan" style="color: #646464;"></i> Outdoor unit: 7.10.0 \
<i class="fa-solid fa-mobile-button fa-rotate-180" style="color: #646464;"></i> Indoor unit: 7.10.0 \
<i class="fa-solid fa-tv" style="color: #646464;"></i> Control panel: N47.09

Improvements:

- **EEBus**:
  From this version onward, §14a EnWG is supported via EEBus.
  However, Buderus MX400 or Bosch K 40 RF is essential for this.

## 9.6.0 / 9.6.1

{: .notice}
<i class="fa-solid fa-fan" style="color: #646464;"></i> Outdoor unit: 9.6.0 \
<i class="fa-solid fa-mobile-button fa-rotate-180" style="color: #646464;"></i> Indoor unit: 9.6.1 \
<i class="fa-solid fa-tv" style="color: #646464;"></i> Control panel: N47.10

<i class="fa-solid fa-calendar-days" style="color: #646464;"></i> August 2024

Improvements:

- **Electricity consumption estimate**:
  The heat pump does not measure electricity consumption but estimates it based on the current operating state.
  The estimate was very inaccurate in previous software versions.
  Especially at low modulation, the estimated value was at least 10% above the actual value, and consequently a much too low performance factor was calculated.
  The estimate has been significantly improved in this version.
  The deviation is generally less than 5%, and therefore the calculated performance factor is now also quite accurate.
- **Compressor heater**:
  The compressor heater (crankcase heater) brings the cooled-down compressor to operating temperature in standby mode.
  In previous software versions, the compressor heater was activated automatically when the compressor temperature (TR1) minus the outdoor air inlet temperature (TL2) fell below 20 K.
  This often resulted in unnecessarily many warm-up phases and unnecessarily high electricity consumption.
  In this version, the limit has been lowered to 6 K, which reduces the unnecessary warm-up phases and therefore also electricity consumption.

## 9.10.0 / 9.7.0

{: .notice}
<i class="fa-solid fa-fan" style="color: #646464;"></i> Outdoor unit: 9.10.0 \
<i class="fa-solid fa-mobile-button fa-rotate-180" style="color: #646464;"></i> Indoor unit: 9.7.0 \
<i class="fa-solid fa-tv" style="color: #646464;"></i> Control panel: N47.10

<i class="fa-solid fa-calendar-days" style="color: #646464;"></i> December 2024

Improvements:

- **Defrosting**:
  Compared to previous versions, the heat pump now defrosts somewhat earlier, but for a shorter duration.
  This means that the evaporator no longer becomes as heavily iced up, and the performance factor is slightly improved.

## 9.12.0 / 9.7.0

{: .notice}
<i class="fa-solid fa-fan" style="color: #646464;"></i> Outdoor unit: 9.12.0 \
<i class="fa-solid fa-mobile-button fa-rotate-180" style="color: #646464;"></i> Indoor unit: 9.7.0 \
<i class="fa-solid fa-tv" style="color: #646464;"></i> Control panel: N47.12

Improvements:

- **4-way valve after power failure**:
  In older versions of the outdoor unit, the 4-way valve VR4 could remain in the central position after a power failure. The resulting unintended pressure equalization can lead to messages [5184, 5161 or 5162](/en/docs/fehler/#5161-5162-und-5184-kein-druckaufbau-nach-stromausfall).

## 9.15.0 / 12.11.1

{: .notice}
<i class="fa-solid fa-fan" style="color: #646464;"></i> Outdoor unit: 9.15.0 \
<i class="fa-solid fa-mobile-button fa-rotate-180" style="color: #646464;"></i> Indoor unit: 12.11.1 \
<i class="fa-solid fa-tv" style="color: #646464;"></i> Control panel: N47.11

<i class="fa-solid fa-calendar-days" style="color: #646464;"></i> October 2025

Improvements:

- Current **thermal output** can be retrieved as an entity via [ems-esp](/en/docs/smarthome/).
  From this version onward, for your smart home you no longer need to calculate the thermal output via the derivation of the energy, but can directly use [boiler/hppower](/en/docs/smarthome/entities#leistung).
- **Temperature difference for DHW** can be reduced to 4K (previously 6K, benefit: delay for increasing efficiency)
- **Inputs** have received extensive configuration options for SG Ready, PV, EMS, ...
- **Fan on the compressor** (PL3 blower) can be displayed on the device and created/read as individual entities via [ems-esp](/en/docs/smarthome/)
- **Bypass query** added
- Number of stages for the **heating program** increased from 2 to 4

## 9.17.2 / 12.17.1

{: .notice}
<i class="fa-solid fa-fan" style="color: #646464;"></i> Outdoor unit: 9.17.2 \
<i class="fa-solid fa-mobile-button fa-rotate-180" style="color: #646464;"></i> Indoor unit: 12.17.1 \
<i class="fa-solid fa-tv" style="color: #646464;"></i> Control panel: N47.12

<i class="fa-solid fa-calendar-days" style="color: #646464;"></i> July 2026

Changes not yet known
