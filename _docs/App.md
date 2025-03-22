---
title: HomeCom Easy & MyBuderus App
excerpt: Funktionsumfang der HomeCom Easy & MyBuderus App zur Fernsteuerung und Monitoring von Bosch CS5800/6800i und Buderus WLW176/186 Wärmepumpen
permalink: /docs/app/
toc: true
---

Wer den Bosch Connect-Key oder das Buderus Funkmodul zu seiner Wärmepumpe erworben hat, kann mit der **Bosch HomeCom Easy** oder **Buderus MyBuderus** App:

- Werte überwachen,
- Einstellungen vornehmen und
- Energieverbräuche einsehen.

|         | Bosch                                                                                   | Buderus                                                                                |
| :------ | :-------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------- |
| Android | [HomeCom Easy](https://play.google.com/store/apps/details?id=com.bosch.tt.dashtt&hl=de) | [MyBuderus](https://play.google.com/store/apps/details?id=com.buderus.tt.dashtt&hl=de) |
| iOS     | [HomeCom Easy](https://apps.apple.com/de/app/homecom-easy/id1438634070)                 | [MyBuderus](https://apps.apple.com/de/app/mybuderus/id1509444082)                      |

## Startbildschirm

Vom Startbildschirm gelangt man zu folgenden Funktionen:

- Menü (3 Striche oben links):
  - Geräte
  - Benachrichtigungen
  - Personalisieren
  - Einstellungen
- Energiemonitoring (Symbol oben rechts)
- Aktionen: Anwesenheitsstatus ändern
- Heizkreis:
  - Betriebsart:
    - Aus: Heizung ist aus
    - Manuell: Es wird konstant durchgeheizt
    - Auto: Die Raumsolltemperatur wird anhand der Tageszeit und den Zeitprogrammeinstellungen automatisch gewählt, z.B. um eine Nachtabsenkung zu realisieren
  - Manuelle Raumsolltemperatureinstellung
  - Boost
  - Zeitprogramme für Betriebsart=Auto
- Warmwasser
  - Betriebsart:
    - Aus
    - Eco+
    - Eco
    - Komfort
    - Auto: Der Warmwasseraufbereitungsmodus wird anhand der Tageszeit und den Zeitprogrammeinstellungen automatisch gewählt
  - Extra-Warmwasser
  - Zeitprogramme für Betriebsart=Auto
- Energiemonitoring

<a href="/assets/images/App-Home.jpg"><img src="/assets/images/App-Home.jpg" alt="HomeCom App: Startseite" title="HomeCom App: Startseite" width="24%"></a>
<a href="/assets/images/App-Warmwasser.jpg"><img src="/assets/images/App-Warmwasser.jpg" alt="HomeCom App: Warmwasser Modusauswahl" title="HomeCom App: Warmwasser Modusauswahl" width="24%"></a>
<a href="/assets/images/App-EnergieMonitoring.jpg"><img src="/assets/images/App-EnergieMonitoring.jpg" alt="HomeCom App: Energie Monitoring" title="HomeCom App: Energie Monitoring" width="24%"></a>
<a href="/assets/images/App-Überwachung.jpg"><img src="/assets/images/App-Überwachung.jpg" alt="HomeCom App: Überwachung von Werten" title="HomeCom App: Überwachung von Werten" width="24%"></a>

## Energiemonitoring

Im Energiemonitoring kann man unten zwischen den folgenden 3 Bereichen wählen:

- Erzeugte und verbrauchte Energie:
  - Kreisdiagramme (siehe Bild oben):
    - Erzeugte Energie: Wärmepumpe (=eingesetzte elektrische Energie) vs. Umgebung (=Umweltwärme)
    - Verbrauchte Energie: Zusatzheizer (=elektrischer Zuheizer) vs. Wärmepumpe (=eingesetzte elektrische Energie für Wärmepumpe)
  - Zeiträume: Heute, Diesen Monat, Gesamt
  - Detailansicht
- Effizienz:
  - Säulendiagramm: Verbrauchte Energie vs. Erzeugte Energie pro Kalenderjahr
  - Anteil Zusatzheizer in %
- Statistiken:
  - Gesamtverbrauch:
    - Zusatzheizer: Gesamtenergieverbrauch des elektrischen Zuheizers in kWh
    - Wärmepumpe: Gesamtenergieverbrauch der Wärmepumpe (ohne Zuheizer) in kWh
  - Gesamterzeugung:
    - Wärmepumpe: Gesamtenergieverbrauch der Wärmepumpe + Zuheizer in kWh
    - Umgebung: Zusätzlich gewonnene Wärmeenergie aus der Umgebung in kWh
  - Gesamteffizienz:
    - Verbrauchte Energie: Gesamtenergieverbrauch der Wärmepumpe + Zuheizer in kWh
    - Erzeugte Energie: Gesamte gewonnene Wärmeenergie in kWh
  - Gesamtstarts:
    - Heizung: Kompressorstarts für Heizbetrieb
    - Warmwasser: Kompressorstarts für Warmwasserbetrieb
  - Datenverwaltung:
    - Daten herunterladen: Daten werden als CSV-Datei heruntergeladen

## Kritik

- Werte scheinen nicht immer korrekt zu sein
- App hat lange Ladezeiten (5-10s)
- Alarme bei Fehlfunktionen funktionieren nicht wie erwartet
- Etwas komplizierte Menüführung, z.B. um zur aktuellen Vorlauftemperatur zu gelangen
