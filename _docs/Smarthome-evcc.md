---
title: evcc
excerpt: Anleitung, um Bosch CS5800/6800i und Buderus WLW176/186 Wärmepumpen in evcc einzubinden
permalink: /docs/smarthome/evcc
toc: true
---

Besitzer einer PV-Anlage, einer Batterie und/oder eines dynamischen Stromtarifs, die Interesse an einer energieeffizienten Steuerung ihre Bosch CS5800/6800i oder Buderus WLW176/186 haben, sollten sich [_evcc_](https://evcc.io) anschauen.
_evcc_ wurde ursprünglich für PV-Überschussladen von Elektrofahrzeugen konzipiert.
Seit kurzem erprobt _evcc_ aber auch [Wärmepumpen](https://docs.evcc.io/docs/devices/heating#bosch-bosch-sg-ready) und unterstützt jetzt auch Bosch/Buderus Wärmepumpen über _ems-esp_.

[![evcc erhöht Warmwassertemperatur auf 50°C bei PV-Überschuss](https://i.ibb.co/bMx5RJLj/EVCC.png)](https://i.ibb.co/bMx5RJLj/EVCC.png)

Die Integration funktioniert über die SG Ready Schnittstelle der Wärmepumpe.
Die standardisierte SG Ready Schnittstelle bietet 4 Funktionen:

1. EVU-Sperrzeit (Ext1=1 / Ext4=0): wird bisher von _evcc_ noch nicht unterstützt
2. Normalbetrieb (Ext1=0 / Ext4=0): normaler Betrieb
3. Verstärkter Betrieb (Ext1=0 / Ext4=1): Erhöhung des Raumtemperatur-Sollwerts und/oder des Warmwasser-Sollwerts je nachdem was unter `Anlageneinstellungen` &rarr; `Photovoltaikanlage` konfiguriert wurde.
4. Erzwungener verstärkter Betrieb (Ext1=1 / Ext4=1): wird bisher von _evcc_ noch nicht unterstützt

Eigentlich werden die SG Ready Funktionen über entsprechende Steuerleitungen realisiert.
Für die Ansteuerung über _evcc_ braucht man keine Steuerleitungen, sondern bedient sich eines Tricks, der [hier](https://bbqkees-electronics.nl/2024/10/03/using-the-smart-grid-sg-and-photovoltaic-pv-function-of-your-heat-pump-with-the-ems-gateways/) genauer beschrieben ist.
Die Idee dahinter ist den _Externen Eingang 4_ mit `curl -d '{ "value" : "1xxxxxxxxxxx" }' https://ems-esp/api/boiler/hpin4opt` zu invertieren, um so den _Verstärken Betrieb_ zu aktivieren.

## Einrichtung

Um das Menü `Anlageneinstellungen` &rarr; `Photovoltaikanlage` im Bedienfeld der Wärmepumpe sichtbar zu machen, müsst ihr `Anlageneinstellungen` &rarr; `Wärmepumpe` &rarr; `Externer Eingang` &rarr; `Externer Eingang 4` &rarr; `Photovoltaikanlage` aktivieren.

Daraufhin könnt ihr folgende Einstellungen unter `Anlageneinstellungen` &rarr; `Photovoltaikanlage` vornehmen:

- `Erhöhung der Wunschtemp. beim Heizen`: signalisiert _evcc_ der Wärmepumpe einen PV-Überschuss so wird der Raumtemperatur-Sollwert um die Anzahl an Kelvin (°C) erhöht
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

Mehr Details folgen in Kürze.
