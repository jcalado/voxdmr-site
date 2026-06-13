# Instalação

O VoxDMR corre em Android, Linux e Windows. Escolhe a tua plataforma abaixo.

## Requisitos

- **DMR ID**: obtém um em [radioid.net](https://radioid.net) se ainda não tiveres. Gratuito, requer licença válida de radioamador.
- **Versão do Android** (apenas Android): Android 7.0 (Nougat) ou mais recente — API nível 24+.
- **Uma password de rede**:
  - Para a **BrandMeister**: a tua hotspot security password em [BrandMeister SelfCare](https://brandmeister.network/), no campo _Hotspot security password_. **Não é a password da tua conta BrandMeister** — é uma string separada que defines tu próprio no SelfCare.
  - Para a **FreeDMR**: a password pública documentada (`passw0rd` no hotspot oficial do Reino Unido).
  - Para **TGIF / ADN / outras redes Homebrew**: o que o operador publicar. Muitas redes baseadas em MMDVM aceitam qualquer password, já que identificam-te pelo DMR ID.

:::mobile

A versão Android do VoxDMR está publicada na Google Play.

1. Abre a [página do VoxDMR na Play Store](https://play.google.com/store/apps/details?id=com.jcalado.voxdmr).
2. Toca em **Instalar**.
3. Abre a app.

No primeiro arranque:

- O **firmware do vocoder** é descarregado em segundo plano. Aparece um banner no ecrã PTT ("Firmware do vocoder não instalado") com um toque para abrir. Os estados são *A provisionar firmware…* → *A verificar…* → *Firmware pronto*. Tal como na versão desktop, os bytes do firmware vêm de fontes terceiras e são verificados por SHA-256 antes de serem escritos no disco.
- A **permissão de microfone** é pedida na primeira vez que carregas no PTT.
- **Otimização de bateria**: em alguns dispositivos (Xiaomi, Samsung, OnePlus, Huawei) o Android pode fechar a app agressivamente em segundo plano. Abre **Definições → Background** na app para conceder *Ignorar otimização de bateria* e, onde estiver disponível, *Autostart*.

### Rádios PoC e dispositivos de 32 bits

Muitos rádios PoC (push-to-talk over cellular) não trazem a Google Play Store e a maioria corre uma versão **de 32 bits** do Android, mais antiga, que a versão da Play não consegue instalar. Para esses casos, o VoxDMR publica também um APK autónomo no GitHub Releases.

Se vais instalar num rádio PoC (ou em qualquer dispositivo Android de 32 bits), faz sideload da versão fora da Play Store:

1. No rádio, abre a [página da última release](https://github.com/jcalado/voxdmr-site/releases/latest).
2. Descarrega o **APK de 32 bits (`armeabi-v7a`)**. A maioria dos rádios PoC é de 32 bits, por isso, se tiveres dúvidas, escolhe este — a versão de 64 bits (`arm64-v8a`) não instala num dispositivo de 32 bits.
3. Quando o Android pedir, permite instalações a partir do teu navegador ou gestor de ficheiros (**Definições → Apps → Acesso especial → Instalar apps desconhecidas**).
4. Abre o APK descarregado e toca em **Instalar**, depois abre a app.

O primeiro arranque (firmware, microfone, otimização de bateria) funciona exatamente como na instalação pela Play Store acima.

### Onde o Android guarda dados

Os dados da app ficam no diretório privado padrão do Android. Desinstalar a app remove configuração, firmware e logs.

:::

:::desktop

A versão desktop é distribuída como um único binário autocontido. Sem instalador, sem gestor de pacotes, sem serviços de sistema. Transferir, verificar, executar.

### Requisitos por plataforma

- **Linux:** suporte ALSA (`libasound2` em Debian/Ubuntu/Mint; `alsa-lib` em Arch; já incluído na maioria das distros).
- **Windows:** Windows 10 1809 ou posterior (x64). Todas as outras dependências estão estaticamente ligadas.

### Linux (x86_64)

```bash
# Transferir
curl -LO https://github.com/jcalado/voxdmr-site/releases/latest/download/VoxDMR-linux-x86_64
curl -LO https://github.com/jcalado/voxdmr-site/releases/latest/download/SHA256SUMS

# Verificar
sha256sum -c SHA256SUMS --ignore-missing

# Executar
chmod +x VoxDMR-linux-x86_64
./VoxDMR-linux-x86_64
```

### Windows (x86_64)

1. Abre a [página da última release](https://github.com/jcalado/voxdmr-site/releases/latest).
2. Transfere `VoxDMR-windows-x86_64.exe`.
3. Opcional mas recomendado: transfere também `SHA256SUMS` e verifica no PowerShell:
   ```powershell
   $expected = (Get-Content SHA256SUMS | Select-String 'VoxDMR-windows-x86_64.exe').ToString().Split(' ')[0]
   $actual = (Get-FileHash .\VoxDMR-windows-x86_64.exe -Algorithm SHA256).Hash.ToLower()
   if ($expected -eq $actual) { "OK" } else { "MISMATCH" }
   ```
4. Faz duplo-clique em `VoxDMR-windows-x86_64.exe` para abrir.

Na primeira execução, o Windows SmartScreen pode avisar que a app é de um "publicador desconhecido". O VoxDMR ainda não está assinado digitalmente. Clica em **Mais informações** → **Executar mesmo assim** para continuar.

### Configuração inicial do firmware

Na primeira execução do VoxDMR Desktop aparece um cartão de configuração único porque o vocoder AMBE+2 precisa do firmware MD-380 para codificar e descodificar áudio. O firmware **não vem incluído no binário**: por razões legais, o VoxDMR vai buscá-lo diretamente a fontes terceiras para a tua máquina sem nunca passar os bytes através de nós.

Tens duas opções:

**Auto-download** (recomendado). Clica em **Transferir (≈2 MB)**. O VoxDMR vai buscar:
- `D002.032.bin` (994 KB) a [md380.org](https://md380.org/firmware/orig/TYT-Tytera-MD-380-FW-v232.zip), desempacotado do formato OEM.
- `d02032-core.img` (128 KB) ao [projeto md380_vocoder_dynarmic no GitHub](https://github.com/nostar/md380_vocoder_dynarmic).

Ambos são verificados por SHA-256 antes de serem escritos no disco. O processo demora alguns segundos numa ligação normal.

**Escolher ficheiros existentes**: se a tua máquina não conseguir aceder aos URLs (proxy corporativo, offline, firewall restritivo), clica em **Escolher ficheiros existentes…** e seleciona `D002.032.bin` e `d02032-core.img` no disco. São copiados para o diretório de dados e verificados por SHA-256 da mesma forma.

Depois da configuração concluída, o UI principal aparece e o firmware é carregado em todos os arranques seguintes.

### Onde o VoxDMR Desktop guarda dados

O VoxDMR segue as convenções do sistema operativo para configuração, dados e logs:

| Tipo | Linux | Windows | macOS¹ |
|---|---|---|---|
| Firmware | `~/.local/share/voxdmr/firmware/` | `%APPDATA%\voxdmr\firmware\` | `~/Library/Application Support/voxdmr/firmware/` |
| Configuração | `~/.config/voxdmr/` | `%APPDATA%\voxdmr\` | `~/Library/Application Support/voxdmr/` |
| Logs | `~/.local/state/voxdmr/logs/` | `%LOCALAPPDATA%\voxdmr\logs\` | `~/Library/Logs/voxdmr/` |

¹ macOS ainda não é um alvo de release. Os caminhos estão listados para referência futura.

Para sobrepor a localização do firmware (e.g. para empacotadores ou instalações em sandbox), define `VOXDMR_FIRMWARE_DIR` antes de arrancar:

```bash
VOXDMR_FIRMWARE_DIR=/opt/voxdmr/firmware ./VoxDMR-linux-x86_64
```

A app também procura em `<exe-dir>/firmware/`. Coloca os ficheiros de firmware ao lado do binário para uma instalação totalmente portátil (pen USB, bundle arquivado, etc.).

### Atualizar

Builds recentes do desktop incluem **atualização automática dentro da app** — no arranque (e em Definições → Acerca → Procurar atualizações), o VoxDMR oferece-se para transferir e substituir o binário de forma atómica, verificado por SHA-256 em todo o caminho. Também podes continuar a atualizar manualmente: transfere o novo binário da [página de releases](https://github.com/jcalado/voxdmr-site/releases/latest), substitui o antigo e abre. Configuração, favoritos, perfis, aliases e firmware mantêm-se entre atualizações.

### Desinstalar

O VoxDMR Desktop é um único binário sem instalador. Apaga o binário para remover a app. Para também remover configuração, firmware e logs, apaga os três diretórios listados acima.

:::

## Próximos passos

- [Primeira Ligação](./first-connection) — configura o teu DMR ID, escolhe uma rede e transmite pela primeira vez.
- [Perfis de Servidor](./server-profiles) — mantém várias configurações de rede (BrandMeister, TGIF, FreeDMR…) lado a lado e troca entre elas.
