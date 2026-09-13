# Informationen zu Bosch/Buderus Wärmepumpen

Link zur Github Page: https://bosch-buderus-wp.github.io

![Bosch Compress 5800/6800i & Buderus Logatherm WLW176/186i](/assets/images/Banner.png)

Informationssammlung zu den Wärmepumpen **Bosch Compress 5800/6800i** & **Buderus Logatherm WLW176/186i**.

Es handelt sich hier um eine private Seite.
Die Informationen wurden nicht vom Hersteller der Wärmepumpen überprüft und es wird keine Garantie auf Korrektheit und Vollständigkeit übernommen.

Die Informationen stammen größtenteils aus Foren wie:

- [Haustechnikdialog: Optimierung WP-Einstellungen Buderus WLW186i](https://www.haustechnikdialog.de/Forum/t/270919/Optimierung-WP-Einstellungen-Buderus-WLW186i)
- [Facebook: Bosch Wärmepumpe](https://www.facebook.com/groups/392520056537438)
- [Facebook: Bosch/Buderus Wärmepumpen – Fragen, Tipps & Lösungen](https://www.facebook.com/groups/1268145341752618)

Ich hoffe, die Informationen sind für den ein oder anderen hilfreich - dann gerne einen ⭐ hinterlassen.
Bei Anregungen oder Korrekturen, würde ich mich über einen [Pull Request](https://github.com/bosch-buderus-wp/bosch-buderus-wp.github.io/pulls) oder ein [Issue](https://github.com/bosch-buderus-wp/bosch-buderus-wp.github.io/issues) zur weiteren Diskussion freuen.

## Automatische englische Übersetzung

Die GitHub Action `Translate website` übersetzt geänderte Markdown-Dateien mit der OpenAI Responses API und legt die generierten englischen Dateien unter `/en/` in einem Pull Request ab. Erst nach Prüfung und Merge des Pull Requests werden sie veröffentlicht und verlinkt.

Einrichtung:

1. Im GitHub-Repository unter `Settings → Secrets and variables → Actions` ein Repository-Secret `OPENAI_API_KEY` anlegen.
2. Optional eine Repository-Variable `OPENAI_TRANSLATION_MODEL` setzen. Ohne Variable wird das Modell aus `translation/config.json` verwendet.
3. Unter `Settings → Actions → General → Workflow permissions` erlauben, dass GitHub Actions Pull Requests erstellen darf.
4. Die Action einmal manuell mit `Translate all configured files again` starten. Danach läuft sie bei passenden Änderungen automatisch und aktualisiert den offenen Übersetzungs-PR.

Falls die Organisation die automatische PR-Erstellung verbietet, beendet die Action den Lauf trotzdem erfolgreich und zeigt in der Job-Zusammenfassung einen Link zum manuellen Erstellen des Pull Requests an.

Das Glossar liegt in `translation/glossary.yml`. Ein lokaler Lauf ohne API-Aufruf ist mit `node scripts/translate-content.mjs --dry-run` möglich.
Änderungen an den Übersetzungsskripten allein erzeugen keine neuen Übersetzungen. Wenn eine Änderung bewusst alle Texte neu übersetzen soll, `promptVersion` in `translation/config.json` erhöhen oder die Action manuell mit `Translate all configured files again` starten.
