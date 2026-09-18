---
title: "Software versions, firmware and releases"
headline: "Software versions"
excerpt: "Overview of software versions and firmware releases for Bosch CS5800/6800i and Buderus WLW176/186i heat pumps."
permalink: /en/docs/software-versions/
toc: true
sidebar:
  nav: "en_docs"
lang: en
translation_url: /docs/sw-versionen/
translation_generated: true
---

The Bosch CS5800/6800i and Buderus WLW176/186i heat pumps receive new software versions for the indoor unit, outdoor unit and control panel at irregular intervals.
Unfortunately, a new software version cannot be installed Over-the-Air.
An update can only be carried out on site by customer service.

The currently installed software version can be retrieved in the service menu under _Info &rarr; System components_.

[![Software version of the outdoor unit](/assets/images/SW-Versionen-Außeneinheit.jpg)](/assets/images/SW-Versionen-Außeneinheit.jpg)

## 5.27

{: .notice}
<i class="fa-solid fa-fan" style="color: #646464;"></i> Outdoor unit: 23.03.03-5.27 \
<i class="fa-solid fa-mobile-button fa-rotate-180" style="color: #646464;"></i> Indoor unit: 23.03.03-5.27 \
<i class="fa-solid fa-tv" style="color: #646464;"></i> Control panel: 47.07

<i class="fa-solid fa-calendar-days" style="color: #646464;"></i> March 2023

No further information known

## 5.35

{: .notice}
<i class="fa-solid fa-fan" style="color: #646464;"></i> Outdoor unit: 23.08.08-5.35 \
<i class="fa-solid fa-mobile-button fa-rotate-180" style="color: #646464;"></i> Indoor unit: 23.08.08-5.35 \
<i class="fa-solid fa-tv" style="color: #646464;"></i> Control panel: 47.07

<i class="fa-solid fa-calendar-days" style="color: #646464;"></i> August 2023

No further information known

## 7.10.0

{: .notice}
<i class="fa-solid fa-fan" style="color: #646464;"></i> Outdoor unit: 7.10.0 \
<i class="fa-solid fa-mobile-button fa-rotate-180" style="color: #646464;"></i> Indoor unit: 7.10.0 \
<i class="fa-solid fa-tv" style="color: #646464;"></i> Control panel: 47.09

Improvements:

- **EEBus**:
  From this version onward, §14a EnWG is supported via EEBus.
  However, Buderus MX400 or Bosch K 40 RF is absolutely required for this.

## 9.6.0 / 9.6.1

{: .notice}
<i class="fa-solid fa-fan" style="color: #646464;"></i> Outdoor unit: 9.6.0 \
<i class="fa-solid fa-mobile-button fa-rotate-180" style="color: #646464;"></i> Indoor unit: 9.6.1 \
<i class="fa-solid fa-tv" style="color: #646464;"></i> Control panel: 47.10

<i class="fa-solid fa-calendar-days" style="color: #646464;"></i> August 2024

Improvements:

- **Power consumption estimate**:
  The heat pump does not measure power consumption; it estimates it based on the current operating state.
  The estimate was very inaccurate in previous software versions.
  Especially at low modulation, the estimated value was at least 10% above the actual value, and therefore a much too low performance factor was calculated.
  In this version, the estimate was significantly improved.
  The deviation is generally less than 5%, and therefore the calculated performance factor is now also quite accurate.
- **Compressor heater**:
  The compressor heater (crankcase heater) brings the cooled compressor to operating temperature in standby mode.
  In previous software versions, the compressor heater was activated automatically when the compressor temperature (TR1) minus the outdoor air inlet temperature (TL2) fell below 20 K.
  This often led to unnecessarily many warm-up phases and unnecessarily high power consumption.
  In this version, the limit was lowered to 6 K, which reduces the unnecessary warm-up phases and therefore also the power consumption.

## 9.10.0 / 9.7.0

{: .notice}
<i class="fa-solid fa-fan" style="color: #646464;"></i> Outdoor unit: 9.10.0 \
<i class="fa-solid fa-mobile-button fa-rotate-180" style="color: #646464;"></i> Indoor unit: 9.7.0 \
<i class="fa-solid fa-tv" style="color: #646464;"></i> Control panel: 47.10

<i class="fa-solid fa-calendar-days" style="color: #646464;"></i> December 2024

Improvements:

- **Defrosting**:
  Compared with previous versions, the heat pump now defrosts somewhat earlier, but for a shorter duration.
  This prevents the evaporator from icing up as heavily and slightly improves the performance factor.

## 9.12.0 / 9.7.0

{: .notice}
<i class="fa-solid fa-fan" style="color: #646464;"></i> Outdoor unit: 9.12.0 \
<i class="fa-solid fa-mobile-button fa-rotate-180" style="color: #646464;"></i> Indoor unit: 9.7.0 \
<i class="fa-solid fa-tv" style="color: #646464;"></i> Control panel: 47.12

Improvements:

- **4-way valve after a power failure**:
  In older versions of the outdoor unit, the 4-way valve VR4 could remain in the center position after a power failure. The resulting unintended pressure equalization can lead to messages [5184, 5161 or 5162](/en/docs/troubleshooting/#5161-5162-und-5184-kein-druckaufbau-nach-stromausfall).

## 9.15.0 / 12.11.1

{: .notice}
<i class="fa-solid fa-fan" style="color: #646464;"></i> Outdoor unit: 9.15.0 \
<i class="fa-solid fa-mobile-button fa-rotate-180" style="color: #646464;"></i> Indoor unit: 12.11.1 \
<i class="fa-solid fa-tv" style="color: #646464;"></i> Control panel: 47.12

<i class="fa-solid fa-calendar-days" style="color: #646464;"></i> October 2025

Improvements:

- Current **thermal output** available as an entity via [ems-esp](/en/docs/smarthome/).
  From this version onward, you no longer need to calculate the heat output for your smart home by deriving it from the energy; instead, you can directly use [boiler/hppower](/en/docs/smarthome/entities/#leistung).
- **Temperature difference during DHW** can be reduced to 4K (previously 6K, benefit: delay for increased efficiency)
- **Inputs** received extensive configuration options for SG-Ready, PV, EMS, ...
- **Fan on the compressor** (PL3 fan) can be displayed on the device and created/read as individual entities via [ems-esp](/en/docs/smarthome/)
- **Bypass query** added
- Number of stages in the **heating program** increased from 2 to 4

## 9.16.0 / 12.11.1

{: .notice}
<i class="fa-solid fa-fan" style="color: #646464;"></i> Outdoor unit: 9.16.0 \
<i class="fa-solid fa-mobile-button fa-rotate-180" style="color: #646464;"></i> Indoor unit: 12.11.1 \
<i class="fa-solid fa-tv" style="color: #646464;"></i> Control panel: 47.12

<i class="fa-solid fa-calendar-days" style="color: #646464;"></i> May 2026

Changes not yet known

## 9.17.2 / 12.17.1

{: .notice}
<i class="fa-solid fa-fan" style="color: #646464;"></i> Outdoor unit: 9.17.2 \
<i class="fa-solid fa-mobile-button fa-rotate-180" style="color: #646464;"></i> Indoor unit: 12.17.1 \
<i class="fa-solid fa-tv" style="color: #646464;"></i> Control panel: 47.12

<i class="fa-solid fa-calendar-days" style="color: #646464;"></i> July 2026

Changes not yet known
