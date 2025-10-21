---
title: Benachrichtigungen der Wärmepumpe
excerpt: Anleitung, um Benachrichtigungen der Bosch CS5800/6800i und Buderus WLW176/186i Wärmepumpen zu erhalten.
permalink: /docs/smarthome/benachrichtigungen
toc: true
---

[![Screenshot: Benachrichtigungen bei Aktivitätsänderungen](https://i.ibb.co/Mk7fw7Px/ntfy-screenshot.png){:width="300px"}](https://i.ibb.co/Mk7fw7Px/ntfy-screenshot.png)
{: .align-right}

Wollt ihr benachrichtigt werden, wenn ...

- die Warmwasseraufbereitung startet,
- die Außeneinheit abtaut,
- der Heizstab zum Einsatz kommt oder
- ein Fehler auftritt?

Aber ich habt kein Smarthome-System, das euch Benachrichtigungen schicken kann.
Dann nutzt doch einfach den Planer/Scheduler eures [ems-esp](/docs/smarthome/) mit [ntfy.sh](https://ntfy.sh/).

_ntfy.sh_ ist eine kostenlose Plattform ohne Registrierungsplicht, mit der man sehr einfach Benachrichtigungen versenden kann, die dann als Push-Notification auf Android oder iOS Geräten und sogar als Desktop-Benachrichtigung auf eurem Computer empfangen werden.

Mit Hilfe des `Planers` eures ems-esp könnt ihr für jede Änderung der [Entitäten](/docs/smarthome/entities), deren Status euch interessiert, eine Benachrichtigung auslösen.

## Einrichtung

Dazu öffnet ihr auf der Oberfläche eures ems-esp den `Planer` links im Menü.
Im `Planer` erstellt ihr einen Zeitplan, der...

- `Bei Änderung` der `custom/message`
- den Befehl `{"url":"https://ntfy.sh/"}`
- mit dem Wert `{"topic":"<ZUFÄLLIGE-ZEICHENFOLGE>","title":"Wärmepumpe","message":custom/message}` ausführt.

Nehmt eine ausreichend lange `<ZUFÄLLIGE-ZEICHENFOLGE>` als `topic`, denn jeder der diese Zeichenfolge kennt oder errät, kann eure Benachrichtigungen abonnieren.
Also wählt mindestens 10 Zeichen, die keine leicht erratbaren Wörter oder Zeichenfolgen enthalten.

Dieser Zeitplan schickt nun immer eine Benachrichtigung, wenn sich die `custom/message` ändert.

Nun müssen wir noch einen weiteren Zeitplan erstellen, der die `custom/message` befüllt.
Um über Zustandsänderungen der Kompressoraktivität (_aus, Heizen, Warmwasser, Abtauen, Alarmkompressor, ..._) benachrichtigt zu werden, erstellt ihr einen Zeitplan, der...

- `Bei Änderung` der `boiler/hpactivity`
- den Befehl `custom/message`
- mit dem Wert `"Aktivität: boiler/hpactivity"` ausführt.

Die Konfiguration sollte dann so aussehen:

[![Konfiguration im ems-esp Planer](https://i.ibb.co/ZpcpFYH1/emsesp-ntfy.png)](https://i.ibb.co/ZpcpFYH1/emsesp-ntfy.png)

Dann müsst ihr euch noch die ntfy App aus dem [App](https://apps.apple.com/us/app/ntfy/id1625396347)/[Play](https://play.google.com/store/apps/details?id=io.heckel.ntfy) Store laden und das Topic mit der oben gewählten Zeichenfolge abonnieren und schon seid ihr immer auf dem neuesten Stand eurer Kompressoraktivität.

Die Konfiguration für den Heizstab füge ich in Kürze hinzu.
