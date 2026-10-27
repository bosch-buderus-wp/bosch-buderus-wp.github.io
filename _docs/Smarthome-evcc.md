---
title: "Wärmepumpe mit evcc verbinden für PV-Überschuss"
headline: "evcc"
excerpt: "Anleitung zur Einbindung von Bosch CS5800/6800i und Buderus WLW176/186i in evcc für die Nutzung von PV-Überschuss oder eines dynamischen Stromtarifs."
permalink: /docs/smarthome/evcc
toc: true
smarthome_access: [ems-esp-api]
---

{% include smarthome-access.html %}

Besitzer einer PV-Anlage, einer Batterie und/oder eines dynamischen Stromtarifs, die Interesse an einer energieeffizienten Steuerung ihre Bosch CS5800/6800i oder Buderus WLW176/186i haben, sollten sich [_evcc_](https://evcc.io) anschauen.
_evcc_ wurde ursprünglich für PV-Überschussladen von Elektrofahrzeugen konzipiert.
Seit einiger Zeit unterstützt _evcc_ aber auch [Wärmepumpen](https://docs.evcc.io/docs/devices/heating#bosch-bosch-sg-ready) über _EMS-ESP_.

[![evcc erhöht Warmwassertemperatur auf 55°C bei PV-Überschuss](https://i.ibb.co/215bQRLN/evcc.png)](https://i.ibb.co/215bQRLN/evcc.png)

Die Integration funktioniert über die SG Ready Schnittstelle der Wärmepumpe.
Die standardisierte SG Ready Schnittstelle bietet 4 Funktionen:

1. EVU-Sperrzeit (Ext1=1 / Ext4=0)
2. **Normalbetrieb** (Ext1=0 / Ext4=0): normaler Betrieb
3. **Verstärkter Betrieb** (Ext1=0 / Ext4=1): Erhöhung des Raumtemperatur-Sollwerts und/oder des Warmwasser-Sollwerts je nachdem was unter `Anlageneinstellungen` &rarr; `Photovoltaikanlage` konfiguriert wurde.
4. Erzwungener verstärkter Betrieb (Ext1=1 / Ext4=1)

Eigentlich werden die SG Ready Funktionen über entsprechende Steuerleitungen realisiert.
Für die Ansteuerung über _evcc_ braucht man keine Steuerleitungen, sondern bedient sich eines Tricks, der [hier](https://bbqkees-electronics.nl/2024/10/03/using-the-smart-grid-sg-and-photovoltaic-pv-function-of-your-heat-pump-with-the-ems-gateways/) genauer beschrieben ist.
Die Idee dahinter ist den _Externen Eingang 4_ mit `curl -d '{ "value" : "1xxxxxxxxxxx" }' https://ems-esp/api/boiler/hpin4opt` zu invertieren, um so den _Verstärkten Betrieb_ zu aktivieren.

## Einrichtung

Um das Menü `Anlageneinstellungen` &rarr; `Photovoltaikanlage` im Bedienfeld der Wärmepumpe sichtbar zu machen, müsst ihr `Anlageneinstellungen` &rarr; `Wärmepumpe` &rarr; `Externer Eingang` &rarr; `Externer Eingang 4` &rarr; `Photovoltaikanlage` aktivieren.

Daraufhin könnt ihr folgende Einstellungen unter `Anlageneinstellungen` &rarr; `Photovoltaikanlage` vornehmen:

- `Erhöhung der Wunschtemp. beim Heizen`: signalisiert _evcc_ der Wärmepumpe einen PV-Überschuss so wird der Raumtemperatur-Sollwert um den eingestellten Wert erhöht
- `Erhöhter Warmwasserkomfort`: bei PV-Überschuss wird das Warmwasser auf die Stopptemperatur des Betriebsmodus [_Komfort_](/docs/einstellungen/#modi) aufgeheizt.
- `Absenkung der Wunschtemp. beim Kühlen`: bei PV-Übersschuss wird der Raumtemperatur-Sollwert um den eingestellten Wert abgesenkt
- `Kühlen nur mit PV-Energie`: der Kühlbetrieb wird nur bei PV-Überschuss aktiviert
- `Max. Leistung für Kompressor`: begrenzt den Kompressor auf die eingestellte Leistung bei PV-Überschuss

Nachdem ihr _evcc_ installiert habt, müsst ihr folgende Einträge in die `evcc.yaml` hinzufügen.
_ems-esp_ wird ähnlich wie eine Wallbox als `charger`, also steuerbarer Verbraucher, hinzugefügt:

```yaml
chargers:
  - name: wp
    type: template
    template: emsesp
    host: 192.168.178.70
    token: <token>
    tempsource: "warmwater"
```

Für das Token legt ihr euch am Besten einen neuen Benutzer in den [Nutzermanagement von _ems-esp_](http://ems-esp/settings/security/users) an.
Mit Druck auf das Schlüsselsymbol erhaltet ihr das Token.

Damit die Wärmepumpe auf dem Startbildschirm von _evcc_ erscheint, müsst ihr die Wärmepumpe noch unter _loadpoints_ hinzufügen.

```yaml
loadpoints:
  - title: Wärmepumpe
    charger: wp
```

## Nutzung

In der Oberfläche von _evcc_ sollte nun eine Kachel für eure Wärmepumpe auftauchen.
Bevor ihr loslegt, solltet ihr die Einstellungen über Klick auf das Einstellungssymbol oben rechts öffnen.
Dort könnt ihr folgende Einstellungen vornehmen:

[![EVCC Wärmepumpen Konfigurationsdialog](https://i.ibb.co/mFvmf6XS/evcc-config.png){:width="400px"}](https://i.ibb.co/mFvmf6XS/evcc-config.png)
{: .align-right}

- `Günstiges Netzladen`: Habt ihr einen dynamischen Stromtarif, könnt ihr mit Klick auf den Balken oder Auswahl im Dropdown-Menü den Strompreis setzen, unterhalb dem ihr den _Verstärkten Betrieb_ erlauben wollt.
  Im Screenshot wird automatisch, wenn der Strompreis unter 21,7 ct/kWh sinkt, der _Verstärkte Betrieb_ aktiviert.
- `PV-Überschuss`: Mit diesem Regler könnt ihr auch wenn der minimale Ladestrom (im Beispiel: 0,7 kW) nur teilweise vorhanden ist, den _Verstärkten Betrieb_ starten.
  Beispielsweise mit einem 800 W Balkonkraftwerk erreicht ihr womöglich nur sporadisch einen Überschuss von 700 W.
  Setzt ihr den PV-Anteil auf 80%, so wird der _Verstärkte Betrieb_ bereits bei 560 W aktiviert.
- `Batterie Boost`: Ist der Batterie Boost aktiviert, wird bis zum eingestellten SoC Limit auch die Batterie während des _Verstärkten Betriebs_ genutzt.
- `Min. Temperatur`: Ist eine minimale Temperatur konfiguriert, so startet der _Verstärkte Betrieb_ auch ohne PV-Überschuss, wenn die aktuelle Warmwassertemperatur unter diesen Wert sinkt.
- `Phasen`: Definiert den maximalen Ladestrom (spielt vermutlich bei einer Wärmepumpe keine Rolle)
- `Min. Ladestrom`: Der minimale Ladestrom definiert die minimale Leistung der Wärmepumpe.
  Steigt der PV-Überschuss über diesen Wert, so wird der _Verstärkte Betrieb_ aktiviert.
  Ich habe hier 1 A (0,7 kW) gesetzt, da meine Wärmepumpe in der Übergangszeit meist nur etwa 300-400 W bezieht.

Wenn ihr den Konfigurationsdialog wieder schließt, könnt ihr einen dieser 3 Modi wählen:

- `Normal`: Normalbetrieb - keine Nutzung des PV-Überschusses
- `Smart`: Bei PV-Überschuss wird der Wärmepumpe ein _Verstärkter Betrieb_ signalisiert - so wie im Konfigurationsdialog definiert
- `Boost`: Der Wärmepumpe wird sofort ein _Verstärkter Betrieb_ signalisiert

Beachtet bitte, dass der _Verstärkte Betrieb_ nicht bedeutet, dass die Wärmepumpe sofort beginnt zu heizen oder Warmwasser aufzubereiten.
Es werden nur die Sollvorlauftemperatur ([thermostat/targetflowtemp](/docs/smarthome/entities#messwerte) in EMS-ESP) um den eingestellten Wert angehoben und die Start- und Stopptemperatur des Komfort-Modus der Warmwasserbereitung für den Zeitraum des _Verstärkten Betriebs_ gesetzt.
Die Wärmepumpe entscheidet dann mit der bekannten Logik, ob sie heizen oder Warmwasser bereiten soll.

<!-- prettier-ignore -->
*[SoC]: State of Charge / Ladestand
