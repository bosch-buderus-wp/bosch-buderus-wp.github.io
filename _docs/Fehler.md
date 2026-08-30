---
title: "Häufige Fehler im Betrieb"
headline: "Fehlerbehebung"
excerpt: "Fehler der Bosch CS5800/6800i und Buderus WLW176/186i mit Erklärungen und Lösungen"
permalink: /docs/fehler/
toc: true
---

Nutzer berichten mir oft von Fehlern, die während des Betriebs auftauchen.
Typische Fehler sind auf dieser Seite aufgeführt.

## 5161, 5162 und 5184: Kein Druckaufbau nach Stromausfall

Bei älteren Softwareversionen der Außeneinheit kann das 4-Wege-Ventil VR4 nach einem Stromausfall in Mittelstellung verbleiben.
Dadurch kommt es zu einem unbeabsichtigten Druckausgleich im Kältekreis und der Kompressor kann keine ausreichende Druckdifferenz aufbauen.

Mögliche Meldungen sind:

- **5184** (Installer-Info): Kein Druckaufbau während des Kompressorbetriebs. Wird die Meldung innerhalb von drei Stunden mehr als zweimal ausgelöst, folgt **5161** und der Wärmepumpenbetrieb wird gesperrt.
- **5161** (Kunden-Alarm): Kein Druckaufbau während des Kompressorbetriebs.
- **5162** (Installer-Info): Druckdifferenz zwischen Hoch- und Niederdruckseite zu gering für den Schaltvorgang des 4-Wege-Ventils. Auch hierfür nennt Bosch ein in Mittelstellung klemmendes VR4 als mögliche Ursache.

Bosch/Buderus hat für dieses Verhalten nach einem Stromausfall einen Bugfix in [9.12.0 / 9.7.0](/docs/sw-versionen/#9120--970) integriert. Treten 5161, 5162 oder 5184 unmittelbar nach einem Stromausfall auf, sollte deshalb zuerst der Softwarestand der Außeneinheit geprüft und bei einer älteren Version der Fachbetrieb auf ein Update angesprochen werden, bevor ein Hardwaredefekt angenommen wird.
Manchmal löst sich das verklemmte 4-Wege-Ventil, wenn man die Anlage merhmals für einige Miunten vom Strom trennt. 

Quelle: [Bosch-Servicehandbuch](https://bosch-ch-de.boschhc-documents.com/download/file/file/6721872875.pdf)

## Temperaturfühler TA4 an der Kondensatwanne

Bei Geräten mit **FD-Code kleiner 578** (hergestellt vor Oktober 2025) sitzt der Temperaturfühler TA4 ursprünglich an der Rückseite der Kondensatwanne.
Dort kann er sich beim Abnehmen der Rückwand lösen oder unter bestimmten Wetterbedingungen von isolierendem Eis umschlossen werden.
Der daraus entstehende falsche Temperaturwert löst häufig den Fehler **5160** aus.
Bei einem ungültigen Sensorsignal ist auch **5107** möglich.

Seit FD 578 wird TA4 mit einer verbesserten Metallhalterung auf der linken Seite der Kondensatwanne montiert.
Die neue TA4-Baugruppe setzt mindestens Softwareversion 9.12 voraus.

Quelle: [Bosch-Servicehandbuch](https://bosch-ch-de.boschhc-documents.com/download/file/file/6721872875.pdf)

<figure class="half">
  <a href="https://i.ibb.co/7xrC8kRS/ODU-Innen-Links.jpg">
  <img src="https://i.ibb.co/7xrC8kRS/ODU-Innen-Links.jpg"></a>

  <a href="https://i.ibb.co/Y46JwZ47/ODU-Innen-Rechts.jpg">
  <img src="https://i.ibb.co/Y46JwZ47/ODU-Innen-Rechts.jpg"></a>
</figure>

## Klapperndes Gebläse

Eine lockere Kappe beziehungsweise Nabenabdeckung am Gebläse kann klackernde oder ratternde Geräusche verursachen.
In diesem Fall kann der Kundendienst die Kappe austauschen, ohne dass zwingend das komplette Gebläse ersetzt werden muss.

[![Lüfterkappe](https://i.ibb.co/d0QPKjRt/ODU-Innen-Vorne.jpg)](https://i.ibb.co/d0QPKjRt/ODU-Innen-Vorne.jpg)

## EPP-Luftführung am Verdampfer

Bei einigen Außengeräten wurde im Rahmen eines Kundendiensteinsatzes die Luftführung aus EPP-Hartschaum im unteren Bereich des Verdampfers zugeschnitten beziehungsweise das Spaltmaß vergrößert.
Dadurch sollen sich Tauwasser und Eis nicht auf dem Schaumstoff stauen, sondern besser in Richtung Kondensatwanne ablaufen.
In Kundendienstberichten wird die Maßnahme beispielsweise als „EPP-Spaltmaße vergrößert“ dokumentiert.

Für diese Nacharbeit sind derzeit keine allgemein veröffentlichte Werksanweisung und keine eindeutige FD-Grenze bekannt.
Sie sollte daher nicht eigenständig durchgeführt, sondern bei auffälliger Eisbildung oder behindertem Tauwasserablauf mit dem Bosch/Buderus-Kundendienst abgestimmt werden.

## Temperaturbegrenzer FE3 am Kompressor

Der Thermoschutz beziehungsweise Temperaturbegrenzer FE3 sitzt oben am Kompressor und wird umgangssprachlich häufig als **Klixon** bezeichnet.
Bosch/Buderus stuft die ursprüngliche Ausführung in Geräten mit **FD-Code kleiner 638** (hergestellt vor Februar 2026) als unzuverlässig ein.
Sie kann die Fehlalarme **5130** oder **5131** verursachen, obwohl eine Widerstandsmessung zunächst noch Durchgang zeigt.

Bosch sieht für betroffene Geräte den proaktiven Austausch gegen die verbesserte Ausführung vor.
Das Ersatzteil ist der **Temperaturbegrenzer Sensata 1NT11L**.
Nach dem Austausch soll die Abdeckung des Schaltkastens mit „FE3 ✓“ gekennzeichnet werden.

Quelle: [Bosch-Servicehandbuch](https://bosch-ch-de.boschhc-documents.com/download/file/file/6721872875.pdf)