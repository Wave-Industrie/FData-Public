# /etc/frank/
Ein Verzeichnis in dem theoretisch etwas sinnvolles liegen könnte, wie Config-Dateien!

Mögliche Unter-Verzeichnise und Dateien:

## cups/install-cups
Darin wurden die angelegten Drucker verwaltet und nach Änderungen einmal ausgeführt.

## zzz-test-dbs/
Das System lebt mit MySQL.
In der Regel wurde nach einen Serverausfall erstmal über den MySQL Extended Check eine Datenbankprüfung angestoßen.
Erst danach erfolgte ein Start der Dienste.

## openvpn/
Falls das System als Gateway Dient, sind hier die OpenVPN Configs zu finden (nein, nicht "/etc/openvpn/" sondern hier).
