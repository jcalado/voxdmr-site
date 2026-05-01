# Instalação

O VoxDMR é distribuído como um único binário autocontido. Sem instalador, sem gestor de pacotes, sem serviços de sistema. Transferir, verificar, executar.

## Requisitos

- **DMR ID**: obtém um em [radioid.net](https://radioid.net) se ainda não tiveres. É gratuito e requer uma licença válida de radioamador.
- **Password de hotspot BrandMeister**: a tua chave de segurança DMR na conta [BrandMeister SelfCare](https://brandmeister.network/). (O BrandMeister chama-lhe "hotspot security password"; a aplicação chama-lhe simplesmente _password_.)
- **Linux:** suporte ALSA (`libasound2` em Debian/Ubuntu/Mint; `alsa-lib` em Arch; já incluído na maioria das distros).
- **Windows:** Windows 10 1809 ou posterior (x64). Todas as outras dependências estão estaticamente ligadas.

## Início rápido

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

1. Abre a [página da versão mais recente](https://github.com/jcalado/voxdmr-site/releases/latest).
2. Transfere `VoxDMR-windows-x86_64.exe`.
3. Opcional mas recomendado: transfere também `SHA256SUMS` e verifica no PowerShell:
   ```powershell
   $expected = (Get-Content SHA256SUMS | Select-String 'VoxDMR-windows-x86_64.exe').ToString().Split(' ')[0]
   $actual = (Get-FileHash .\VoxDMR-windows-x86_64.exe -Algorithm SHA256).Hash.ToLower()
   if ($expected -eq $actual) { "OK" } else { "MISMATCH" }
   ```
4. Faz duplo clique em `VoxDMR-windows-x86_64.exe` para iniciar.

Na primeira execução, o Windows SmartScreen pode avisar que a aplicação é de um "editor desconhecido". O VoxDMR ainda não está assinado digitalmente. Clica em **Mais informações** → **Executar mesmo assim** para continuar.

## Primeira execução: configuração do firmware

Da primeira vez que abres o VoxDMR, surge um ecrã de configuração único, porque o vocoder AMBE+2 precisa do firmware do MD-380 para codificar e descodificar áudio. O firmware **não vem incluído no binário**: por motivos legais, o VoxDMR transfere-o diretamente de fontes terceiras para a tua máquina, sem nunca passar pelos nossos servidores.

Tens duas opções:

**Transferência automática** (recomendado). Clica em **Download (≈2 MB)**. O VoxDMR vai buscar:
- `D002.032.bin` (994 KB) ao [md380.org](https://md380.org/firmware/orig/TYT-Tytera-MD-380-FW-v232.zip), desempacotado do formato de update OEM.
- `d02032-core.img` (128 KB) ao [projeto md380_vocoder_dynarmic upstream no GitHub](https://github.com/nostar/md380_vocoder_dynarmic).

Ambas as transferências são verificadas com SHA-256 antes de serem gravadas em disco. Demora uns segundos numa ligação típica.

**Escolher ficheiros existentes**: se a tua máquina não conseguir aceder aos URLs (proxy corporativo, sem ligação, firewall restritiva), clica em **Choose existing files…** e seleciona `D002.032.bin` e `d02032-core.img` de algum sítio no disco. São copiados para a diretoria de dados e verificados via SHA da mesma forma.

Quando a configuração termina, a interface principal carrega e o firmware é carregado em todas as execuções seguintes.

## Onde o VoxDMR guarda os ficheiros

O VoxDMR segue as convenções do sistema operativo para configuração, dados e logs:

| Tipo | Linux | Windows | macOS¹ |
|---|---|---|---|
| Firmware | `~/.local/share/voxdmr/firmware/` | `%APPDATA%\voxdmr\firmware\` | `~/Library/Application Support/voxdmr/firmware/` |
| Configuração | `~/.config/voxdmr/` | `%APPDATA%\voxdmr\` | `~/Library/Application Support/voxdmr/` |
| Logs | `~/.local/state/voxdmr/logs/` | `%LOCALAPPDATA%\voxdmr\logs\` | `~/Library/Logs/voxdmr/` |

¹ macOS não é atualmente um alvo de release. Os caminhos estão listados para referência futura.

Para definir uma localização alternativa do firmware (útil para empacotadores ou instalações em sandbox), define `VOXDMR_FIRMWARE_DIR` antes de iniciar:

```bash
VOXDMR_FIRMWARE_DIR=/opt/voxdmr/firmware ./VoxDMR-linux-x86_64
```

A app também procura em `<dir-do-executável>/firmware/`. Coloca os ficheiros do firmware ao lado do binário para uma instalação totalmente portátil (pen USB, pacote arquivado, etc.).

## Atualizar

O VoxDMR não atualiza automaticamente. Para atualizar:

1. Transfere o novo binário da [página de releases](https://github.com/jcalado/voxdmr-site/releases/latest).
2. Substitui o binário antigo.
3. Inicia. A tua configuração, talkgroups favoritos e firmware são preservados entre atualizações.

## Desinstalar

O VoxDMR é um único binário sem instalador. Basta apagar o binário para remover a aplicação. Para remover também a configuração, firmware e logs, apaga as três diretorias listadas acima.
