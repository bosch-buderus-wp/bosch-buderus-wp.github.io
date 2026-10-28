---
title: "Integrating a heat pump into OpenHAB with EMS-ESP"
headline: "OpenHAB"
excerpt: "Integrating Bosch CS5800/6800i and Buderus WLW176/186i into OpenHAB via EMS-ESP and MQTT: Things, Items with units, and a sitemap for measured values and performance factors."
permalink: /en/docs/smarthome/openhab/
toc: true
smarthome_access: [ems-esp-mqtt]
sidebar:
  nav: "en_docs"
lang: en
translation_url: /docs/smarthome/openhab
translation_generated: true
---

{% include smarthome-access.html %}

OpenHAB is an open-source smart home solution that brings together a wide range of smart home systems and protocols on a single platform.  
The Java-based solution enables central control and the creation of flexible automation rules for devices from various brands.  
With [OpenHABian](https://www.openhab.org/docs/installation/openhabian.html), OpenHAB can be installed quickly and easily on a Raspberry Pi.

## Requirements

- A configured EMS-ESP gateway with an enabled [MQTT connection](/en/docs/smarthome/ems-esp/#mqtt).
- An MQTT broker, such as Mosquitto, that both EMS-ESP and OpenHAB can reach.
- The [MQTT binding](https://www.openhab.org/addons/bindings/mqtt/) and the [JSONPath transformation](https://www.openhab.org/addons/transformations/jsonpath/) in OpenHAB.

With an installation using [OpenHABian](https://www.openhab.org/docs/installation/openhabian.html), you can install Mosquitto via `sudo openhabian-config` under _Optional Components_.
The following configuration uses a manually defined MQTT Thing; MQTT Discovery is not required for this.

The examples assume the entity ID format `Single instance, MQTT names (3.5)` in the MQTT settings of EMS-ESP.  
If you use a different entity ID format or more heating circuits, adjust the topics and JSON paths accordingly.

## MQTT Thing and Channels

Save the following configuration as `things/mqtt.things` in the OpenHAB configuration directory.
Replace the broker address `192.168.178.20` with your own address.
If your broker requires authentication, add `username="<username>"` and `password="<password>"` to the bridge.
If the broker is already configured in OpenHAB, use its Thing UID instead of `mqtt:broker:myMQTTBroker` and only adopt the heat pump Thing.

`availabilityTopic` uses `ems-esp/status` to show whether the gateway is online.
Each channel reads an MQTT topic via `stateTopic` and extracts the desired value using `transformationPattern`.
Since the examples do not define a `commandTopic`, they are exclusively used for reading values.

<details markdown="1">
<summary>things/mqtt.things</summary>

```java
Bridge mqtt:broker:myMQTTBroker "MQTT broker" [
    host="192.168.178.20",
    port=1883,
    clientID="openhab-emsesp"
]

Thing mqtt:topic:emsesp "Heat pump" (mqtt:broker:myMQTTBroker) [
    availabilityTopic="ems-esp/status",
    payloadAvailable="online",
    payloadNotAvailable="offline"
] {
    Channels:
        Type number : TxFails "EMS transmission errors" [stateTopic="ems-esp/heartbeat", transformationPattern="JSONPATH:$.txfails"]
        Type number : NrgTotal "Thermal energy" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.nrgtotal", unit="kWh"]
        Type number : NrgWwTotal "Thermal energy DHW" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.dhw.nrg", unit="kWh"]
        Type number : NrgHeatingTotal "Thermal energy heating" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.nrgheat", unit="kWh"]
        Type number : MeterTotal "Electrical energy" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.metertotal", unit="kWh"]
        Type number : PowerCons "Electrical power" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.hpcurrpower", unit="W"]
        Type number : NrgConsHeatingTotal "Electrical energy heating" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.meterheat", unit="kWh"]
        Type number : NrgConsWarmWaterTotal "Electrical energy DHW" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.dhw.meter", unit="kWh"]
        Type number : Modulation "Modulation" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.curburnpow"]
        Type number : OutdoorTemp "Outdoor temperature" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.outdoortemp", unit="°C"]
        Type number : SelectedFlowTemp "Planned flow temperature" [stateTopic="ems-esp/thermostat_data", transformationPattern="JSONPATH:$.hc1.targetflowtemp", unit="°C"]
        Type number : CurrFlowTemp "Flow temperature" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.curflowtemp", unit="°C"]
        Type number : ReturnTemp "Return temperature" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.rettemp", unit="°C"]
        Type number : CarrierReturn "TC0" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.hptc0", unit="°C"]
        Type number : CarrierForward "TC1" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.hptc1", unit="°C"]
        Type number : CondenserTemp "TC3" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.hptc3", unit="°C"]
        Type number : CompressorTemp "TR1" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.hptr1", unit="°C"]
        Type number : CondenserReturnTemp "TR3" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.hptr3", unit="°C"]
        Type number : EvaporatorTemp "TR5" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.hptr5", unit="°C"]
        Type number : EvaporatorReturnTemp "TR4" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.hptr4", unit="°C"]
        Type number : AirInletTemp "Air inlet TL2" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.hptl2", unit="°C"]
        Type number : CurrWarmWaterTemp "DHW temperature" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.dhw.curtemp", unit="°C"]
        Type number : RoomSetpointTemp "Room setpoint temperature" [stateTopic="ems-esp/thermostat_data", transformationPattern="JSONPATH:$.hc1.seltemp", unit="°C"]
        Type string : HeatingActive "Heating active" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.heatingactive"]
        Type string : WarmWaterActive "DHW active" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.tapwateractive"]
        Type string : EmergencyOps "Emergency operation" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.emergencyops"]
        Type string : WarmWaterMode "DHW mode" [stateTopic="ems-esp/thermostat_data", transformationPattern="JSONPATH:$.dhw.mode"]
        Type number : PC0Flow "PC0 flow rate" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.pc0flow", unit="l/h"]
        Type number : PC1Flow "PC1 flow rate" [stateTopic="ems-esp/boiler_data", transformationPattern="JSONPATH:$.pc1flow", unit="l/h"]
}
```

</details>

## Items and Units

Save the following items as `items/heating.items`.
The channel IDs must match the names in the MQTT Thing.
Use `Number:Energy` with `kWh` for energy meters, `Number:Power` with `W` for electrical power, and `Number:Temperature` with `°C` for temperatures.
The type `Number:VolumetricFlowRate` with `l/h` is intended for flow rates.
For details, see the [OpenHAB documentation on units](https://www.openhab.org/docs/concepts/units-of-measurement.html).

<details markdown="1">
<summary>items/heating.items</summary>

```java
Number                     HP_TxFails                   "EMS transmission errors [%.0f]" {channel="mqtt:topic:emsesp:TxFails"}
Number:Energy              HP_NrgTotal                  "Thermal energy [%.1f kWh]" {channel="mqtt:topic:emsesp:NrgTotal", unit="kWh"}
Number:Energy              HP_NrgWwTotal                "Thermal energy DHW [%.1f kWh]" {channel="mqtt:topic:emsesp:NrgWwTotal", unit="kWh"}
Number:Energy              HP_NrgHeatingTotal           "Thermal energy heating [%.1f kWh]" {channel="mqtt:topic:emsesp:NrgHeatingTotal", unit="kWh"}
Number:Energy              HP_MeterTotal                "Electrical energy [%.1f kWh]" {channel="mqtt:topic:emsesp:MeterTotal", unit="kWh"}
Number:Power               HP_PowerCons                 "Electrical power [%.0f W]" {channel="mqtt:topic:emsesp:PowerCons", unit="W"}
Number:Energy              HP_NrgConsHeatingTotal       "Electrical energy heating [%.1f kWh]" {channel="mqtt:topic:emsesp:NrgConsHeatingTotal", unit="kWh"}
Number:Energy              HP_NrgConsWarmWaterTotal     "Electrical energy DHW [%.1f kWh]" {channel="mqtt:topic:emsesp:NrgConsWarmWaterTotal", unit="kWh"}
Number                     HP_Modulation                "Modulation [%.1f %%]" {channel="mqtt:topic:emsesp:Modulation"}
Number:Temperature         HP_OutdoorTemp               "Outdoor temperature [%.1f °C]" {channel="mqtt:topic:emsesp:OutdoorTemp", unit="°C"}
Number:Temperature         HP_SelectFlowTemp            "Planned flow temperature [%.1f °C]" {channel="mqtt:topic:emsesp:SelectedFlowTemp", unit="°C"}
Number:Temperature         HP_CurrFlowTemp              "Flow temperature [%.1f °C]" {channel="mqtt:topic:emsesp:CurrFlowTemp", unit="°C"}
Number:Temperature         HP_ReturnTemp                "Return temperature [%.1f °C]" {channel="mqtt:topic:emsesp:ReturnTemp", unit="°C"}
Number:Temperature         HP_CarrierReturn             "TC0 [%.1f °C]" {channel="mqtt:topic:emsesp:CarrierReturn", unit="°C"}
Number:Temperature         HP_CarrierForward            "TC1 [%.1f °C]" {channel="mqtt:topic:emsesp:CarrierForward", unit="°C"}
Number:Temperature         HP_CondenserTemp             "TC3 [%.1f °C]" {channel="mqtt:topic:emsesp:CondenserTemp", unit="°C"}
Number:Temperature         HP_CompressorTemp            "TR1 [%.1f °C]" {channel="mqtt:topic:emsesp:CompressorTemp", unit="°C"}
Number:Temperature         HP_CondenserReturnTemp       "TR3 [%.1f °C]" {channel="mqtt:topic:emsesp:CondenserReturnTemp", unit="°C"}
Number:Temperature         HP_EvaporatorTemp            "TR5 [%.1f °C]" {channel="mqtt:topic:emsesp:EvaporatorTemp", unit="°C"}
Number:Temperature         HP_EvaporatorReturnTemp      "TR4 [%.1f °C]" {channel="mqtt:topic:emsesp:EvaporatorReturnTemp", unit="°C"}
Number:Temperature         HP_AirInletTemp              "Air inlet TL2 [%.1f °C]" {channel="mqtt:topic:emsesp:AirInletTemp", unit="°C"}
Number:Temperature         HP_CurrWarmWaterTemp         "DHW temperature [%.1f °C]" {channel="mqtt:topic:emsesp:CurrWarmWaterTemp", unit="°C"}
Number:Temperature         HP_RoomSetpointTemp          "Room setpoint temperature [%.1f °C]" {channel="mqtt:topic:emsesp:RoomSetpointTemp", unit="°C"}
String                     HP_HeatingActive             "Heating active [%s]" {channel="mqtt:topic:emsesp:HeatingActive"}
String                     HP_WarmWaterActive           "Domestic hot water production [%s]" {channel="mqtt:topic:emsesp:WarmWaterActive"}
String                     HP_WarmWaterMode             "Domestic hot water mode [%s]" {channel="mqtt:topic:emsesp:WarmWaterMode"}
String                     HP_EmergencyOps              "Emergency operation [%s]" {channel="mqtt:topic:emsesp:EmergencyOps"}
Number:VolumetricFlowRate  HP_PC0Flow                   "PC0 flow rate [%.0f l/h]" {channel="mqtt:topic:emsesp:PC0Flow", unit="l/h"}
Number:VolumetricFlowRate  HP_PC1Flow                   "PC1 flow rate [%.0f l/h]" {channel="mqtt:topic:emsesp:PC1Flow", unit="l/h"}

Number                     HP_AZTotal                   "Total performance factor [%.2f]"
Number                     HP_AZHeating                 "Heating performance factor [%.2f]"
Number                     HP_AZWarmWater               "Domestic hot water performance factor [%.2f]"
```

</details>

The status values remain `String` items and display the text supplied by EMS-ESP, such as `on` or `off`.
The modulation is a number; `%%` in the display text represents the percent sign.

## Calculate performance factors

The performance factor is the quotient of the heat energy generated and the electrical energy used.
For example, `10,000 kWh / 2,500 kWh` results in a performance factor of `4.00`.
For the three areas, we use these meter pairs:

| Area       | Thermal energy       | Electrical energy          | Calculated item  |
| ---------- | -------------------- | -------------------------- | ---------------- |
| Total      | `HP_NrgTotal`        | `HP_MeterTotal`            | `HP_AZTotal`     |
| Heating    | `HP_NrgHeatingTotal` | `HP_NrgConsHeatingTotal`   | `HP_AZHeating`   |
| Domestic hot water | `HP_NrgWwTotal`      | `HP_NrgConsWarmWaterTotal` | `HP_AZWarmWater` |

The three performance factor items are already included in the example above for `items/heating.items` and have no channel binding.
The energy items continue to serve as the basis for calculation.
The performance factors refer to the total runtime recorded by the meters.
For the performance factor of a specific day, month, or year, you would instead need to use the energy differences for that period.

Save the following [Rules DSL rule](https://www.openhab.org/docs/configuration/rules-dsl.html) as `rules/heating.rules`.
It recalculates the performance factors when the rule is started or loaded and when any of the six energy items changes.
Both energy values are converted to `kWh` before division.
If measurement values are missing or electrical energy consumption is `0`, the relevant performance factor item is set to `UNDEF`.

<details markdown="1">
<summary>rules/heating.rules</summary>

```java
import org.openhab.core.library.types.QuantityType

rule "Calculate the heat pump's performance factor"
when
    Item HP_NrgTotal changed or
    Item HP_MeterTotal changed or
    Item HP_NrgHeatingTotal changed or
    Item HP_NrgConsHeatingTotal changed or
    Item HP_NrgWwTotal changed or
    Item HP_NrgConsWarmWaterTotal changed
then
    // Total: First convert the energy meters to the same unit.
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

// Heating: first convert the energy meters to the same unit.
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

// Domestic hot water: first convert energy meters to the same unit.
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

## Sitemap for the Heating System

Save the example as `sitemaps/heating.sitemap`.
OpenHAB uses the `.sitemap` extension for this text-based interface.
If you already have a sitemap, you can add the outer `Frame` to its `sitemap` block.
The [sitemap documentation](https://www.openhab.org/docs/ui/sitemaps.html) describes the available elements.

<details markdown="1">
<summary>sitemaps/heating.sitemap</summary>

```java
sitemap heating label="Heating" {
    Frame label="Heat pump" {
        Text item=HP_CurrWarmWaterTemp label="Domestic hot water temperature [%.1f °C]" icon="temperature" {
            Frame label="Temperatures and operation" {
                Text item=HP_RoomSetpointTemp
                Text item=HP_SelectFlowTemp
                Text item=HP_CurrFlowTemp
                Text item=HP_ReturnTemp
                Text item=HP_Modulation label="Modulation [%s %%]"
                Text item=HP_AirInletTemp label="Heat pump outdoor temperature [%.1f °C]"
                Text item=HP_PowerCons label="Power consumption [%.0f W]"
                Text item=HP_PC0Flow
                Text item=HP_PC1Flow
                Text item=HP_HeatingActive
                Text item=HP_WarmWaterActive
                Text item=HP_EmergencyOps
                Text item=HP_WarmWaterMode
            }
            Frame label="Performance factors" {
                Text item=HP_AZTotal
                Text item=HP_AZHeating
                Text item=HP_AZWarmWater
            }
        }
    }
}
```

</details>

The domestic hot water temperature entry opens a detail page with operating values and the three performance factors.
