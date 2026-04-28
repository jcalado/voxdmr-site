# Instalação

Instale o VoxLink no seu dispositivo Android.

## Requisitos

- Android 8.0 (Oreo) ou superior
- Ligação à internet (Wi-Fi ou dados móveis)
- Dados de ligação ao refletor fornecidos pelo seu clube ou administrador: nome do host, porta, número do talkgroup e chave de autenticação

## Instalar pela Google Play

1. Abra o [**VoxLink na Google Play**](https://play.google.com/store/apps/details?id=com.jcalado.voxlink).
2. Toque em **Instalar**.

## Instalar o APK manualmente

Se recebeu um ficheiro APK diretamente (por exemplo, de uma versão beta ou da sua associação):

1. Ative **Instalar apps desconhecidos** para o seu gestor de ficheiros ou browser: **Definições > Aplicações > Acesso especial > Instalar apps desconhecidos**.
2. Abra o ficheiro APK no seu dispositivo e toque em **Instalar**.

Para instalar via ADB:

```bash
adb install VoxLink.apk
```

> Instalações manuais não recebem atualizações da Play Store — consulte a sua fonte para novas versões.

## Permissões

**Microfone** — Necessário para transmitir. O Android solicita na primeira utilização — toque em **Permitir**.

Se recusou acidentalmente: **Definições > Aplicações > VoxLink > Permissões > Microfone > Permitir**.

**Notificações** (Android 13+) — Permite ao VoxLink mostrar uma notificação persistente de estado enquanto está ligado.

**Bluetooth** (Android 12+) — Necessário ao encaminhar áudio para um dispositivo Bluetooth. O VoxLink solicita quando seleciona pela primeira vez uma saída Bluetooth.
