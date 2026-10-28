---
title: "Wärmepumpe in OpenHAB einbinden mit EMS-ESP"
headline: "OpenHAB"
excerpt: "Bosch CS5800/6800i und Buderus WLW176/186i über EMS-ESP und MQTT in OpenHAB einbinden: Things, Items mit Einheiten und eine Sitemap für Messwerte und Arbeitszahlen."
permalink: /docs/smarthome/openhab
toc: true
smarthome_access: [ems-esp-mqtt]
---

{% include smarthome-access.html %}

OpenHAB ist eine open-source Smarthome Lösung, die unterschiedlichste Smarthome Systeme und Protokolle auf einer einzigen Plattform zusammenbringt.
Die Java-basierte Lösung ermöglicht eine zentrale Steuerung sowie das Erstellen flexibler Automatisierungsregeln für Geräte verschiedenster Marken.
Mit [OpenHABian](https://www.openhab.org/docs/installation/openhabian.html) lässt sich OpenHAB schnell und einfach auf einem Raspberry Pi installieren.

## Voraussetzungen

- Ein eingerichtetes EMS-ESP-Gateway mit aktivierter [MQTT-Verbindung](/docs/smarthome/ems-esp/#mqtt).
- Ein MQTT-Broker, zum Beispiel Mosquitto, den sowohl EMS-ESP als auch OpenHAB erreichen können.
- Das [MQTT Binding](https://www.openhab.org/addons/bindings/mqtt/) und die [JSONPath-Transformation](https://www.openhab.org/addons/transformations/jsonpath/) in OpenHAB.

Bei einer Installation mit [OpenHABian](https://www.openhab.org/docs/installation/openhabian.html) könnt ihr Mosquitto über `sudo openhabian-config` unter _Optional Components_ installieren.
Die folgende Konfiguration verwendet ein manuell definiertes MQTT-Thing; MQTT Discovery ist dafür nicht erforderlich.

Die Beispiele setzen das Entitäts-ID-Format `Einzelinstanz, MQTT-Namen (3.5)` in den Einstellungen den MQTT-Einstellungen von EMS-ESP voraus.
Falls ihr ein anderes Entitäts-ID-Format oder mehr Heizkreis verwendet, passt die Topics und JSON-Pfade entsprechend an.

## MQTT-Thing und Channels

Speichert die folgende Konfiguration als `things/mqtt.things` im OpenHAB-Konfigurationsverzeichnis.
Ersetzt die Broker-Adresse `192.168.178.20` durch eure eigene Adresse.
Falls euer Broker eine Anmeldung verlangt, ergänzt in der Bridge `username="<benutzername>"` und `password="<passwort>"`.
Wenn der Broker bereits in OpenHAB eingerichtet ist, verwendet dessen Thing-UID anstelle von `mqtt:broker:myMQTTBroker` und übernehmt nur das Wärmepumpen-Thing.

`availabilityTopic` zeigt anhand von `ems-esp/status`, ob das Gateway online ist.
Jeder Channel liest über `stateTopic` ein MQTT-Topic und extrahiert mit `transformationPattern` den gewünschten Wert.
Da die Beispiele kein `commandTopic` definieren, dienen sie ausschließlich zum Auslesen.

<details markdown="1">
<summary>things/mqtt.things</summary>

```java
Bridge mqtt:broker:myMQTTBroker "MQTT-Broker" [
    host="192.168.178.20",
    port=1883,
    clientID="openhab-emsesp"
]

Thing mqtt:topic:emsesp "Wärmepumpe" (mqtt:broker:myMQTTBroker) [
    availabilityTopic="ems-esp/status",
    payloadAvailable="online",
    payloadNotAvailable="offline"
] {
    Channels:
        Type number : TxFails "EMS-Sendefehler" [stateTopic="ems-esp/heartbeat", transformationPattern="JSONPATH:$.txfails"]
        Type number : NrgTotal "Wärmeenergie" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.nrgtotal", unit="kWh"]
        Type number : NrgWwTotal "Wärmeenergie WW" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.dhw.nrg", unit="kWh"]
        Type number : NrgHeatingTotal "Wärmeenergie Heizung" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.nrgheat", unit="kWh"]
        Type number : MeterTotal "Elektr. Energie" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.metertotal", unit="kWh"]
        Type number : PowerCons "Elektr. Leistung" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.hpcurrpower", unit="W"]
        Type number : NrgConsHeatingTotal "Elektr. Energie Heizung" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.meterheat", unit="kWh"]
        Type number : NrgConsWarmWaterTotal "Elektr. Energie WW" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.dhw.meter", unit="kWh"]
        Type number : Modulation "Modulation" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.curburnpow"]
        Type number : OutdoorTemp "Außentemperatur" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.outdoortemp", unit="°C"]
        Type number : SelectedFlowTemp "Geplanter Vorlauf" [stateTopic="ems-esp/thermostat_data", transformationPattern="JSONPATH:$.hc1.targetflowtemp", unit="°C"]
        Type number : CurrFlowTemp "Vorlauf" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.curflowtemp", unit="°C"]
        Type number : ReturnTemp "Rücklauf" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.rettemp", unit="°C"]
        Type number : CarrierReturn "TC0" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.hptc0", unit="°C"]
        Type number : CarrierForward "TC1" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.hptc1", unit="°C"]
        Type number : CondenserTemp "TC3" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.hptc3", unit="°C"]
        Type number : CompressorTemp "TR1" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.hptr1", unit="°C"]
        Type number : CondenserReturnTemp "TR3" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.hptr3", unit="°C"]
        Type number : EvaporatorTemp "TR5" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.hptr5", unit="°C"]
        Type number : EvaporatorReturnTemp "TR4" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.hptr4", unit="°C"]
        Type number : AirInletTemp "Lufteintritt TL2" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.hptl2", unit="°C"]
        Type number : CurrWarmWaterTemp "WW-Temperatur" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.dhw.curtemp", unit="°C"]
        Type number : RoomSetpointTemp "Raumsolltemperatur" [stateTopic="ems-esp/thermostat_data", transformationPattern="JSONPATH:$.hc1.seltemp", unit="°C"]
        Type string : HeatingActive "Heizung aktiv" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.heatingactive"]
        Type string : WarmWaterActive "Warmwasser aktiv" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.tapwateractive"]
        Type string : EmergencyOps "Notbetrieb" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.emergencyops"]
        Type string : WarmWaterMode "Warmwassermodus" [stateTopic="ems-esp/thermostat_data", transformationPattern="JSONPATH:$.dhw.mode"]
        Type number : PC0Flow "PC0 Volumenstrom" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.pc0flow", unit="l/h"]
        Type number : PC1Flow "PC1 Volumenstrom" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.pc1flow", unit="l/h"]
}
```

</details>

## Items und Einheiten

Speichert die folgenden Items als `items/heating.items`.
Die Channel-IDs müssen zu den Namen im MQTT-Thing passen.
Energiezähler verwenden `Number:Energy` mit `kWh`, die elektrische Leistung `Number:Power` mit `W` und Temperaturen `Number:Temperature` mit `°C`.
Für die Volumenströme ist der Typ `Number:VolumetricFlowRate` mit `l/h` vorgesehen.
Einzelheiten erklärt die [OpenHAB-Dokumentation zu Einheiten](https://www.openhab.org/docs/concepts/units-of-measurement.html).

<details markdown="1">
<summary>items/heating.items</summary>

```java
Number                     HP_TxFails                   "EMS-Sendefehler [%.0f]" {channel="mqtt:topic:emsesp:TxFails"}
Number:Energy              HP_NrgTotal                  "Wärmeenergie [%.1f kWh]" {channel="mqtt:topic:emsesp:NrgTotal", unit="kWh"}
Number:Energy              HP_NrgWwTotal                "Wärmeenergie WW [%.1f kWh]" {channel="mqtt:topic:emsesp:NrgWwTotal", unit="kWh"}
Number:Energy              HP_NrgHeatingTotal           "Wärmeenergie Heizung [%.1f kWh]" {channel="mqtt:topic:emsesp:NrgHeatingTotal", unit="kWh"}
Number:Energy              HP_MeterTotal                "Elektr. Energie [%.1f kWh]" {channel="mqtt:topic:emsesp:MeterTotal", unit="kWh"}
Number:Power               HP_PowerCons                 "Elektr. Leistung [%.0f W]" {channel="mqtt:topic:emsesp:PowerCons", unit="W"}
Number:Energy              HP_NrgConsHeatingTotal       "Elektr. Energie Heizung [%.1f kWh]" {channel="mqtt:topic:emsesp:NrgConsHeatingTotal", unit="kWh"}
Number:Energy              HP_NrgConsWarmWaterTotal     "Elektr. Energie WW [%.1f kWh]" {channel="mqtt:topic:emsesp:NrgConsWarmWaterTotal", unit="kWh"}
Number                     HP_Modulation                "Modulation [%.1f %%]" {channel="mqtt:topic:emsesp:Modulation"}
Number:Temperature         HP_OutdoorTemp               "Außentemperatur [%.1f °C]" {channel="mqtt:topic:emsesp:OutdoorTemp", unit="°C"}
Number:Temperature         HP_SelectFlowTemp            "Geplanter Vorlauf [%.1f °C]" {channel="mqtt:topic:emsesp:SelectedFlowTemp", unit="°C"}
Number:Temperature         HP_CurrFlowTemp              "Vorlauf [%.1f °C]" {channel="mqtt:topic:emsesp:CurrFlowTemp", unit="°C"}
Number:Temperature         HP_ReturnTemp                "Rücklauf [%.1f °C]" {channel="mqtt:topic:emsesp:ReturnTemp", unit="°C"}
Number:Temperature         HP_CarrierReturn             "TC0 [%.1f °C]" {channel="mqtt:topic:emsesp:CarrierReturn", unit="°C"}
Number:Temperature         HP_CarrierForward            "TC1 [%.1f °C]" {channel="mqtt:topic:emsesp:CarrierForward", unit="°C"}
Number:Temperature         HP_CondenserTemp             "TC3 [%.1f °C]" {channel="mqtt:topic:emsesp:CondenserTemp", unit="°C"}
Number:Temperature         HP_CompressorTemp            "TR1 [%.1f °C]" {channel="mqtt:topic:emsesp:CompressorTemp", unit="°C"}
Number:Temperature         HP_CondenserReturnTemp       "TR3 [%.1f °C]" {channel="mqtt:topic:emsesp:CondenserReturnTemp", unit="°C"}
Number:Temperature         HP_EvaporatorTemp            "TR5 [%.1f °C]" {channel="mqtt:topic:emsesp:EvaporatorTemp", unit="°C"}
Number:Temperature         HP_EvaporatorReturnTemp      "TR4 [%.1f °C]" {channel="mqtt:topic:emsesp:EvaporatorReturnTemp", unit="°C"}
Number:Temperature         HP_AirInletTemp              "Lufteintritt TL2 [%.1f °C]" {channel="mqtt:topic:emsesp:AirInletTemp", unit="°C"}
Number:Temperature         HP_CurrWarmWaterTemp         "WW-Temperatur [%.1f °C]" {channel="mqtt:topic:emsesp:CurrWarmWaterTemp", unit="°C"}
Number:Temperature         HP_RoomSetpointTemp          "Raumsolltemperatur [%.1f °C]" {channel="mqtt:topic:emsesp:RoomSetpointTemp", unit="°C"}
String                     HP_HeatingActive             "Heizungbetrieb [%s]" {channel="mqtt:topic:emsesp:HeatingActive"}
String                     HP_WarmWaterActive           "Warmwasserbereitung [%s]" {channel="mqtt:topic:emsesp:WarmWaterActive"}
String                     HP_WarmWaterMode             "Warmwassermodus [%s]" {channel="mqtt:topic:emsesp:WarmWaterMode"}
String                     HP_EmergencyOps              "Notbetrieb [%s]" {channel="mqtt:topic:emsesp:EmergencyOps"}
Number:VolumetricFlowRate  HP_PC0Flow                   "PC0 Volumenstrom [%.0f l/h]" {channel="mqtt:topic:emsesp:PC0Flow", unit="l/h"}
Number:VolumetricFlowRate  HP_PC1Flow                   "PC1 Volumenstrom [%.0f l/h]" {channel="mqtt:topic:emsesp:PC1Flow", unit="l/h"}

Number                     HP_AZTotal                   "Arbeitszahl gesamt [%.2f]"
Number                     HP_AZHeating                 "Arbeitszahl Heizung [%.2f]"
Number                     HP_AZWarmWater               "Arbeitszahl Warmwasser [%.2f]"
```

</details>

Die Statuswerte bleiben `String`-Items und zeigen die von EMS-ESP gelieferten Texte, beispielsweise `on` oder `off`.
Die Modulation ist eine Zahl; `%%` im Anzeigetext stellt das Prozentzeichen dar.

## Arbeitszahlen berechnen

Die Arbeitszahl ist der Quotient aus erzeugter Wärmeenergie und eingesetzter elektrischer Energie.
Beispielsweise ergeben `10.000 kWh / 2.500 kWh` eine Arbeitszahl von `4,00`.
Für die drei Bereiche verwenden wir diese Zählerpaare:

| Bereich    | Wärmeenergie         | Elektrische Energie        | Berechnetes Item |
| ---------- | -------------------- | -------------------------- | ---------------- |
| Gesamt     | `HP_NrgTotal`        | `HP_MeterTotal`            | `HP_AZTotal`     |
| Heizung    | `HP_NrgHeatingTotal` | `HP_NrgConsHeatingTotal`   | `HP_AZHeating`   |
| Warmwasser | `HP_NrgWwTotal`      | `HP_NrgConsWarmWaterTotal` | `HP_AZWarmWater` |

Die drei Arbeitszahl-Items sind im obigen Beispiel für `items/heating.items` bereits enthalten und haben keine Channel-Bindung.
Die Energie-Items dienen weiterhin als Berechnungsgrundlage.
Die Arbeitszahlen beziehen sich auf die gesamte in den Zählern erfasste Laufzeit.
Für die Arbeitszahl eines bestimmten Tages, Monats oder Jahres müsstet ihr stattdessen die Energiedifferenzen dieses Zeitraums verwenden.

Speichert die folgende [Rules-DSL-Regel](https://www.openhab.org/docs/configuration/rules-dsl.html) als `rules/heating.rules`.
Sie berechnet die Arbeitszahlen beim Start beziehungsweise Laden der Regel und bei Änderungen der sechs Energie-Items neu.
Beide Energiewerte werden vor der Division in `kWh` umgerechnet.
Bei fehlenden Messwerten oder einem elektrischen Energieeinsatz von `0` wird das betreffende Arbeitszahl-Item auf `UNDEF` gesetzt.

<details markdown="1">
<summary>rules/heating.rules</summary>

```java
import org.openhab.core.library.types.QuantityType

rule "Arbeitszahlen der Waermepumpe berechnen"
when
    Item HP_NrgTotal changed or
    Item HP_MeterTotal changed or
    Item HP_NrgHeatingTotal changed or
    Item HP_NrgConsHeatingTotal changed or
    Item HP_NrgWwTotal changed or
    Item HP_NrgConsWarmWaterTotal changed
then
    // Gesamt: Energiezähler zuerst auf dieselbe Einheit bringen.
    val waermeGesamt = HP_NrgTotal.state
    val stromGesamt = HP_MeterTotal.state
    if (waermeGesamt instanceof QuantityType && stromGesamt instanceof QuantityType) {
        val q = (waermeGesamt as QuantityType<?>).toUnit("kWh").doubleValue
        val p = (stromGesamt as QuantityType<?>).toUnit("kWh").doubleValue
        if (q >= 0 && p > 0) {
            HP_AZTotal.postUpdate(q / p)
        } else {
            HP_AZTotal.postUpdate(UNDEF)
        }
    } else {
        HP_AZTotal.postUpdate(UNDEF)
    }

    // Heizen: Energiezähler zuerst auf dieselbe Einheit bringen.
    val waermeHeizen = HP_NrgHeatingTotal.state
    val stromHeizen = HP_NrgConsHeatingTotal.state
    if (waermeHeizen instanceof QuantityType && stromHeizen instanceof QuantityType) {
        val q = (waermeHeizen as QuantityType<?>).toUnit("kWh").doubleValue
        val p = (stromHeizen as QuantityType<?>).toUnit("kWh").doubleValue
        if (q >= 0 && p > 0) {
            HP_AZHeating.postUpdate(q / p)
        } else {
            HP_AZHeating.postUpdate(UNDEF)
        }
    } else {
        HP_AZHeating.postUpdate(UNDEF)
    }

    // Warmwasser: Energiezähler zuerst auf dieselbe Einheit bringen.
    val waermeWarmwasser = HP_NrgWwTotal.state
    val stromWarmwasser = HP_NrgConsWarmWaterTotal.state
    if (waermeWarmwasser instanceof QuantityType && stromWarmwasser instanceof QuantityType) {
        val q = (waermeWarmwasser as QuantityType<?>).toUnit("kWh").doubleValue
        val p = (stromWarmwasser as QuantityType<?>).toUnit("kWh").doubleValue
        if (q >= 0 && p > 0) {
            HP_AZWarmWater.postUpdate(q / p)
        } else {
            HP_AZWarmWater.postUpdate(UNDEF)
        }
    } else {
        HP_AZWarmWater.postUpdate(UNDEF)
    }
end
```

</details>

## Sitemap für die Heizung

Speichert das Beispiel als `sitemaps/heating.sitemap`.
OpenHAB verwendet für diese textbasierte Oberfläche die Endung `.sitemap`.
Wenn ihr bereits eine Sitemap habt, könnt ihr den äußeren `Frame` in deren `sitemap`-Block übernehmen.
Die [Sitemap-Dokumentation](https://www.openhab.org/docs/ui/sitemaps.html) beschreibt die verfügbaren Elemente.

<details markdown="1">
<summary>sitemaps/heating.sitemap</summary>

```java
sitemap heating label="Heizung" {
    Frame label="Wärmepumpe" {
        Text item=HP_CurrWarmWaterTemp label="Warmwassertemperatur [%.1f °C]" icon="temperature" {
            Frame label="Temperaturen und Betrieb" {
                Text item=HP_RoomSetpointTemp
                Text item=HP_SelectFlowTemp
                Text item=HP_CurrFlowTemp
                Text item=HP_ReturnTemp
                Text item=HP_Modulation label="Modulation [%s %%]"
                Text item=HP_AirInletTemp label="WP-Außentemperatur [%.1f °C]"
                Text item=HP_PowerCons label="Leistungsaufnahme [%.0f W]"
                Text item=HP_PC0Flow
                Text item=HP_PC1Flow
                Text item=HP_HeatingActive
                Text item=HP_WarmWaterActive
                Text item=HP_EmergencyOps
                Text item=HP_WarmWaterMode
            }
            Frame label="Arbeitszahlen" {
                Text item=HP_AZTotal
                Text item=HP_AZHeating
                Text item=HP_AZWarmWater
            }
        }
    }
}
```

</details>

Der Eintrag für die Warmwassertemperatur öffnet eine Detailseite mit Betriebswerten und den drei Arbeitszahlen.
