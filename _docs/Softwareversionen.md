---
title: Softwareversionen
excerpt: Software Versionen der Bosch CS5800/6800i und Buderus WLW176/186 Wärmepumpen
permalink: /docs/sw-versionen/
toc: true
---

Die Bosch CS5800/6800i und Buderus WLW176/186 Wärmepumpen erhalten in unregelmäßigen Abständen neue Softwareversionen für die Inneneinheit, die Außeneinheit und das Bedienfeld.
Leider kann eine neue Softwareversion nicht Over-the-Air installiert werden.
Eine Aktualisierung kann nur durch den Kundendienst vor Ort erfolgen.

Die aktuell installierte Softwareversion kann im Servicemenü unter _Info &rarr; Systemkomponenten_ abgerufen werden.

[![Softwareversion der Außeneinheit](/assets/images/SW-Versionen-Außeneinheit.jpg)](/assets/images/SW-Versionen-Außeneinheit.jpg)

## 23.03.03-5.27 / N47.07

Keine weiteren Informationen bekannt

## 23.08.08-5.35 / N47.07

Keine weiteren Informationen bekannt

## 7.10.0

Keine weiteren Informationen bekannt

## 9.6.0/9.6.1 / N47.10

Release: ca. August 2024

Verbesserungen:

- **Stromverbrauchsschätzung**:
  Die Wärmepumpe misst den Stromverbrauch nicht, sondern schätzt ihn anhand des aktuellen Betriebszustands.
  Die Schätzung war in vorigen Softwareversionen sehr ungenau.
  Vor allem bei niedriger Modulation lag der geschätzte Wert mind. 10% über dem realen Wert und somit wurde eine viel zu niedrige Arbeitszahl berechnet.
  In dieser Version wurde die Abschätzung wesentlich verbessert.
  Die Abweichung ist in der Regel kleiner 5% und somit ist auch die berechnete Arbeitszahl nun recht exakt.
- **Kompressorheizung**:
  Die Kompressorheizung bringt den abgekühlten Kompressor im Standby auf Betriebstemperatur.
  In vorigen Softwareversionen wurde die Kompressorheizung automatisch aktiviert, wenn die Kompressortemperatur (TR1) abzüglich der Außenlufteintrittstemperatur (TL2) unter 20 K fiel.
  Das führte oft zu unnötig vielen Aufwärmphasen und einem unnötig hohen Stromverbrauch.
  In dieser Version wurde die Grenze auf 6 K abgesenkt, was die unnötigen Aufwärmphasen und somit auch den Stromverbrauch reduziert.

## 9.7.0/9.10.0 / N47.10

Release: Dezember 2024

Verbesserungen:

- **Abtauen**:
  Im Vergleich zu vorigen Versionen taut die Wärmepumpe nun etwas früher, aber dafür kürzer ab.
  Damit vereist der Verdampfer nicht mehr so stark und die Arbeitszahl wird leicht verbessert.

## 12.11.1/9.15.0 / N47.11

Release: ca. Oktober 2025
