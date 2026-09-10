---
title: "Notifications via EMS-ESP"
headline: "Heat pump notifications"
excerpt: "Instructions for notifications and alarms for Bosch CS5800/6800i and Buderus WLW176/186i with EMS-ESP."
permalink: /en/docs/smarthome/benachrichtigungen
toc: true
sidebar:
  nav: "en_docs"
lang: en
translation_url: /docs/smarthome/benachrichtigungen
translation_generated: true
---

[![Screenshot: Notifications for activity changes](https://i.ibb.co/Mk7fw7Px/ntfy-screenshot.png){:width="300px"}](https://i.ibb.co/Mk7fw7Px/ntfy-screenshot.png)
{: .align-right}

Would you like to be notified when ...

- domestic hot water production starts,
- the outdoor unit starts a defrost cycle,
- the electric backup heater is activated, or
- an error occurs?

But you do not have a smart home system that can send you notifications.
Then simply use the scheduler of your [ems-esp](/en/docs/smarthome/) with [ntfy.sh](https://ntfy.sh/).

_ntfy.sh_ is a free platform without registration requirements that makes it very easy to send notifications, which are then received as push notifications on Android or iOS devices and even as desktop notifications on your computer.

With the help of your ems-esp `Scheduler`, you can trigger a notification for every change to the [entities](/en/docs/smarthome/entities) whose status interests you.

## Setup

To do this, first open the `Custom Entities` menu item in the interface of your ems-esp.
There, create a new entity named `message` with the value type `RAM value`.
The message to be sent is temporarily stored in this entity.

[![Screenshot: Custom entity](https://i.ibb.co/7JF8W9nS/emsesp-ntfy-custom-entity.png)](https://i.ibb.co/7JF8W9nS/emsesp-ntfy-custom-entity.png)

A notification should be sent whenever this message changes.
To do this, select `Scheduler` in the menu and create a new schedule that...

- executes `On change` of `custom/message`
- the command `{"url":"https://ntfy.sh/"}`
- with the value `{"topic":"<RANDOM-CHARACTER-SEQUENCE>","title":"Heat pump","message":custom/message}`.

Use a sufficiently long `<RANDOM-CHARACTER-SEQUENCE>` as the `topic`, because anyone who knows or guesses this sequence can subscribe to your notifications.
Therefore, choose at least 10 characters that do not contain easily guessable words or sequences.

This schedule now sends a notification whenever `custom/message` changes.
The next chapters explain how to populate `custom/message` with relevant state changes.

For this, you still need to download the ntfy app from the [App](https://apps.apple.com/us/app/ntfy/id1625396347)/[Play](https://play.google.com/store/apps/details?id=io.heckel.ntfy) Store and subscribe to the topic using the sequence selected above.

## State changes

### Compressor activity

To be notified about changes in compressor activity (_off, heating, domestic hot water, defrosting, compressor alarm, ..._), for example, create a schedule that...

- executes `On change` of `boiler/hpactivity`
- the command `custom/message`
- with the value `"Activity: boiler/hpactivity"`.

The configuration should then look like this:

[![Configuration in the ems-esp scheduler](https://i.ibb.co/ZpcpFYH1/emsesp-ntfy.png)](https://i.ibb.co/ZpcpFYH1/emsesp-ntfy.png)

### Electric backup heater

Another very interesting state change that you may want to be informed about is the activity of the electric backup heater.
To do this, simply add a schedule that...

- executes `On change` of `boiler/auxheaterlevel`
- the command `custom/message`
- with the value `"Backup heater: boiler/auxheaterlevel %"`.

You will then receive notifications such as `Backup heater: 33 %` when the electric backup heater provides 3 kW of support.
