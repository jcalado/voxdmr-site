# Resolução de Problemas

Um índice curto das coisas mais prováveis de avariarem e como resolvê-las. A linha de log na barra inferior do VoxDMR é o primeiro sítio para olhar. A maioria das falhas aparece lá. O log de atividade completo está na [diretoria de logs](./installation) (`~/.local/state/voxdmr/logs/` em Linux, `%LOCALAPPDATA%\voxdmr\logs\` em Windows).

## Ligação

### Pára em "Authenticating…" e volta a Disconnected

O log mostra `Authentication FAILED - check password`.

A hotspot security password está errada, ou estás a usar a password da tua conta BrandMeister por engano. Abre [BrandMeister SelfCare](https://brandmeister.network/) → o teu perfil → **Hotspot security password**. É essa que o VoxDMR quer. As passwords de conta não autenticam contra os masters.

Se nunca definiste uma hotspot security password no SelfCare, define-a agora e volta a introduzi-la em **Settings → Connection**.

### Pára em "Connecting…" indefinidamente

O VoxDMR não consegue chegar ao master. Causas possíveis:

- **Host ou porta errados.** A porta por omissão é `54006`. Alguns masters usam outra. Confirma ambos em **Settings → Connection** e na página de estado do master.
- **Firewall a bloquear UDP de saída.** O protocolo Rewind usa UDP. Firewalls corporativas ou domésticas restritivas por vezes deixam cair UDP. Tenta noutra rede.
- **O master está offline.** O seletor de masters é preenchido pela API ao vivo da BrandMeister no arranque, mas um master pode cair entre arranques. Escolhe outro.

### "Error: Invalid DMR ID"

O campo DMR ID tem de ser um número de 7 dígitos. Sem espaços, sem traços, sem indicativo. Só os dígitos do [radioid.net](https://radioid.net).

### Desliga-se de poucos em poucos minutos

Normalmente é um timeout NAT num router pouco amigável a UDP. O protocolo Rewind faz pings periódicos para manter o mapeamento NAT vivo, mas alguns routers expiram entradas UDP agressivamente. Soluções:

- Usa ligação por cabo se possível.
- Tenta outro master (os regionais tendem a ser mais próximos e fiáveis).
- Alguns routers domésticos têm uma definição "UDP timeout" no NAT/firewall avançado. Aumenta-a se existir.

## Áudio

### Não ouves outras estações

Verifica por esta ordem:

1. **Estás mesmo subscrito a um talkgroup?** O indicador de estado tem de ler **Ready**, não só **Connected**. Escolhe um TG no seletor se não estiver.
2. **O dispositivo de saída correto está selecionado?** **Settings → Audio → Output device**. Se os auscultadores estão ligados mas o predefinido do sistema continua a ser as colunas internas, o seletor não troca automaticamente. Escolhe-os explicitamente.
3. **O RX gain é demasiado baixo?** A predefinição é 4×. Sobe para 10× e vê se as estações mais baixas passam a ouvir-se.
4. **Volume do sistema.** Óbvio, mas fácil de esquecer depois de uma atualização do SO.

### Outras estações não te ouvem

1. **O microfone está selecionado?** **Settings → Audio → Input device**. Se o seletor está vazio, o SO não está a expor nenhum dispositivo de entrada ao VoxDMR. Verifica as permissões de microfone do SO (ver abaixo).
2. **O TX gain é diferente de zero?** A predefinição é 0,5×. Se alguém o pôs em 0,1× e falas baixo, o codificador recebe quase-silêncio.
3. **Observa o medidor TX.** Liga **Monitor mic level off-air** em **Settings → Audio**. Fala. Se o medidor não se mexer, o microfone não está a ser capturado de todo. Verifica seleção do dispositivo e permissões. Se mexer mas só ficar no verde, sobe o TX gain até os picos chegarem ao amarelo.

### As tuas transmissões soam distorcidas aos outros

O indicador CLIP à direita do medidor TX fica vermelho fixo quando os picos saturam. Baixa o TX gain em passos de 0,1 até o clip deixar de disparar, depois clica em CLIP para limpar a tranca. Vê [Definições de Áudio](./audio-settings) para a explicação completa do medidor.

### Permissões de microfone

- **Linux**: a maioria das distros expõe todos os dispositivos de entrada a todas as apps. Se estás num Flatpak ou Snap em sandbox (não é como o VoxDMR é distribuído atualmente), o sandbox precisa de conceder acesso ao áudio.
- **Windows**: abre **Definições → Privacidade e segurança → Microfone**. Confirma que "Permitir que aplicações acedam ao microfone" está ligado, e que o VoxDMR (ou "Aplicações de ambiente de trabalho") tem permissão. Depois de mudar, reinicia o VoxDMR.

## PTT

### Premir a tecla PTT não faz nada

- **A janela principal tem foco?** O VoxDMR não captura uma hotkey global. A janela tem de ter foco do teclado. Clica na barra de título, depois tenta outra vez.
- **A tecla certa está associada?** Verifica em **Settings → Interface → PTT key**. A barra de Espaço é a predefinição mas pode ter sido mudada.
- **Há algo a engolir a tecla?** Alguns lançadores de jogos e gravadores de ecrã intercetam a barra de Espaço globalmente. Associa o PTT a algo menos comum (F8, F12, Insert). Vê [Modos PTT](./ptt-modes).

### A TX nunca pára no modo toggle

Ativaste a TX e esqueceste-te de desativar. Toca outra vez na tecla PTT, ou clica no botão TX no ecrã.

Se um evento de tecla foi engolido e a TX parece presa sem forma de desligar, desliga-te do BrandMeister. A TX corta automaticamente quando perdes a subscrição.

## Firmware

### "Firmware not found" ou parado no ecrã de setup

O firmware do vocoder ainda não está instalado, ou o local de instalação não é onde o VoxDMR procura. O ecrã de setup deixa-te resolver isto de duas formas:

- **Download (≈2 MB)**: caminho fácil; funciona em qualquer máquina com acesso à internet a `md380.org` e `raw.githubusercontent.com`.
- **Choose existing files**: para máquinas offline ou redes restritivas. Aponta o VoxDMR para `D002.032.bin` e `d02032-core.img` em disco.

Se tens os ficheiros num local não predefinido, define `VOXDMR_FIRMWARE_DIR` a apontar para a diretoria antes de lançar:

```bash
VOXDMR_FIRMWARE_DIR=/caminho/para/firmware ./VoxDMR-linux-x86_64
```

### "SHA-256 mismatch" / firmware mostra ✗ nas Definições

Um ficheiro de firmware ficou corrompido (download parcial, erro de disco, edição acidental). Abre **Settings → Firmware** e clica em **Reinstall…**. Mesmo fluxo do primeiro arranque: descarregar ou escolher do disco.

### Download automático falha atrás de proxy corporativo

O `ureq` (o cliente HTTPS que o VoxDMR usa) não lê as definições de proxy do sistema. Ou usa o caminho **Choose existing files** com ficheiros descarregados manualmente, ou corre o VoxDMR a partir de uma rede que permita HTTPS direto para os dois hosts de origem.

## Pontos de atividade ficam cinza

A feed ao vivo de last-heard vem de `api.brandmeister.network` por WebSocket. Se a tua rede a bloquear, os pontos na lista de favoritos ficam cinza. Tudo o resto (RX, TX, subscrever, falar) continua a funcionar. A feed de atividade é puramente informativa.

Para verificar se a tua máquina chega ao host:

```bash
curl -I https://api.brandmeister.network/lh/socket.io/
```

Uma resposta `200` ou `400` significa que o host é alcançável. Um timeout significa que está bloqueado a montante.

## Crashes / janela em branco / comportamento estranho da UI

O VoxDMR é construído sobre iced + wgpu. Em combinações raras de drivers GPU, o renderer não inicializa corretamente e ficas com uma janela em branco ou um crash no arranque.

1. Verifica o ficheiro de log (caminho acima) por linhas com `wgpu` ou `panic`.
2. Em Linux, tenta forçar o renderer por software:
   ```bash
   WGPU_BACKEND=gl ./VoxDMR-linux-x86_64
   ```
3. Em Windows, atualiza os drivers da GPU. Drivers antigos do fabricante por vezes incluem uma implementação Vulkan partida.

## Ainda preso?

- Lê o ficheiro de log completo (`~/.local/state/voxdmr/logs/` em Linux, `%LOCALAPPDATA%\voxdmr\logs\` em Windows).
- Abre uma issue no [GitHub](https://github.com/jcalado/voxdmr-site/issues) com o log e uma descrição do que estavas a tentar fazer.
