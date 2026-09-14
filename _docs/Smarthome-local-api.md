---
title: "Lokale REST API"
headline: "Lokale API"
excerpt: "Lokale API für Bosch CS5800/6800i und Buderus WLW176/186i mit K 40 RF WLAN-Gateway - API-Spezifikation mit cURL- und Codebeispielen."
permalink: /docs/smarthome/local-api
classes: wide
toc: false
---

Seit September 2026 bietet Bosch/Buderus auch eine lokale REST API für die Bosch CS5800/6800i und Buderus WLW176/186i Wärmepumpen an.
Für die lokale API wird ein K40 RF WLAN-Gateway und die Gateway-Firmware `15.00.01` oder höher benötigt.

## Hostname oder IP-Adresse

Zuerst braucht ihr die IP-Adresse des K40 RF Gateways in eurem heimischen WLAN.
Am einfachsten findet ihr die IP-Adresse in der Geräteliste eures Routers.
Um den Beispielcode aus der API-Vorschau unten zu nutzen, tragt den **Hostnamen oder die IP-Adresse** ein, also beispielsweise `gateway.local`, `K40RF-1acabc` oder `192.168.1.42` - ohne `https://`, Port oder abschließenden Punkt.

## Authentifizierung

[![Position von Login und Pass auf dem Aufkleber des K 40 RF](https://i.ibb.co/pjPZKm9m/K40-RF-Zugangsdaten.jpg){:width="200px"}](https://i.ibb.co/pjPZKm9m/K40-RF-Zugangsdaten.jpg)
{: .align-right}

Um die lokale API nutzen zu können, muss jeder Request mit einem **Access Token** authentifiziert werden.
Zur Austellung des Access Tokens braucht man **Login** und **Pass**.
Diese stehen auf einem Aufkleber entweder auf der Inneneinheit eurer Wärmepumpe, auf dem eingesteckten WLAN-Gateway, vorne auf dem Quick Start Guide oder in der Packung eures WLAN-Gateways.
Falls ihr den Aufkleber nicht mehr findet, scannt den QR-Code auf dem WLAN-Gateway.
Er ist wie folgt aufgebaut: \
`V:1;L:<euer-login>;P:<euer-pass>;MAC:<eure-mac-addresse>;N:<modell-eures-gateways>`

1. Drücke am Gateway die **WLAN- und Wireless-Taste gleichzeitig für eine Sekunde**.
   Die LEDs sollten kurz blau blinken.
2. Ersetze die Variablen `<euer-wärmepumpen-hostname>`, `<login-vom-aufkleber>`, `<pass-vom-aufkleber-ohne-bindestriche>` und `<ein-beliebiger-name-eures-clients>` und führe dann innerhalb von fünf Minuten diesen Befehl aus:

   ```bash
   curl \
     --silent --show-error --fail-with-body \
     --insecure \
     --request POST "https://<euer-wärmepumpen-hostname>:9442/auth/token" \
     --header "Content-Type: application/x-www-form-urlencoded" \
     --data-urlencode "grant_type=password" \
     --data-urlencode "username=<login-vom-aufkleber>" \
     --data-urlencode "password=<pass-vom-aufkleber-ohne-bindestriche>" \
     --data-urlencode "client_name=<ein-beliebiger-name-eures-clients>"
   ```

Die Antwort enthält den benötigten Wert `access_token`.
Gebt unten unter **Auth → Token** diesen Wert ein, ohne das vorangestellte Wort `Bearer`.
Der Token läuft nicht ab und sollte wie ein Passwort sicher aufbewahrt werden.
Bei `412 physical_proximity_unproven` müsst ihr die Tastenkombination erneut drücken und die Anfrage innerhalb von fünf Minuten wiederholen.

Weitere Einzelheiten findet ihr in der [offiziellen K 40 RF API-Anleitung](https://github.com/bosch-home-comfort/api-docs/blob/main/docs/k-40-rf.md).

## API-Referenz

Hier könnt ihr die API-Dokumentation durchsuchen und cURL- oder Codebeispiele für die Endpunkte kopieren.
Öffnet einen Endpunkt und gebt unter **Auth &rarr; Token** euren Access Token (ohne `Bearer`) sowie unter **Server Variables &rarr; gatewayAddress** den Hostnamen oder die IP-Adresse eures K 40 RF Gateways ein.
Die Beispiele aktualisieren sich automatisch.
Direkte Browser-Anfragen bleiben wegen der CORS-Beschränkung des Gateways deaktiviert.
Token und Gateway-Adresse werden lokal in eurem Browser gespeichert.

Die cURL-Beispiele enthalten `--insecure`, weil das Zertifikat des Gateways keinen vertrauenswürdigen Trust-Anchor hat.
Verwendet diese Option nur für euer Gateway im vertrauenswürdigen lokalen Netz.

<iframe
  src="/assets/openapi/k-40-rf-preview.html"
  title="Interaktive K 40 RF Local API Dokumentation"
  style="display: block; width: 100%; height: 85vh; min-height: 640px; border: 1px solid #ddd; border-radius: 4px;"
></iframe>

Die [OpenAPI-Datei](/assets/openapi/k-40-rf.yaml) steht auch einzeln zur Verfügung.
