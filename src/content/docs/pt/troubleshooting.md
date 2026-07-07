# Resolução de Problemas

Um índice curto das coisas mais prováveis de avariarem e como resolvê-las. A linha de log na barra inferior no desktop (e o event log no separador Connection do Android) é o primeiro sítio para olhar — a maior parte das falhas aparece lá. O log completo no desktop está na [diretoria de logs](./installation) (`~/.local/state/voxdmr/logs/` em Linux, `%LOCALAPPDATA%\voxdmr\logs\` em Windows); no Android é acessível em **Definições → Acerca**.

## Ligação

### Pára em "Authenticating…" e volta a Disconnected

O log mostra `Authentication FAILED - check password` (ou `Login NAK` na Homebrew).

Consoante a rede em que o perfil ativo está:

- **BrandMeister.** A hotspot security password está errada, ou estás a usar a password da *conta* BrandMeister por engano. Abre [BrandMeister SelfCare](https://brandmeister.network/) → o teu perfil → **Hotspot security password**. É essa que o VoxDMR quer — as passwords de conta não autenticam contra os masters. Se nunca definiste uma hotspot security password no SelfCare, define-a agora e volta a introduzi-la no perfil.
- **TGIF / FreeDMR / ADN / outra rede Homebrew.** Confirma as credenciais publicadas. A password canónica da FreeDMR é `passw0rd`; a TGIF e a ADN têm as suas próprias. Se a password está certa mas a autenticação continua a falhar, verifica o **Hash format** do perfil. Está por predefinição em **Auto**, que tenta primeiro Raw e volta a tentar Hex ASCII se o login for rejeitado, por isso a maioria das redes funciona logo — mas podes fixá-lo em **Raw** ou **Hex ASCII** à mão nas **Advanced** options do perfil se alguma instalação antiga teimosa precisar.

### Pára em "Connecting…" indefinidamente

O VoxDMR não consegue chegar ao servidor. Causas possíveis:

- **Host ou porta errados.** Os masters BrandMeister usam `54006`; os masters Homebrew costumam usar `62031`. Confirma ambos no editor de perfil e na página de estado do operador.
- **Firewall a bloquear UDP de saída.** Tanto Rewind (BrandMeister) como Homebrew (MMDVM) usam UDP. Firewalls corporativos ou domésticos restritivos por vezes deixam cair UDP. Tenta noutra rede.
- **O servidor está offline.** O picker de masters BrandMeister é ao vivo, mas um master pode cair entre arranques — escolhe outro. Os masters Homebrew em redes como a TGIF, FreeDMR ou ADN têm janelas de manutenção ocasionais; vê a página de estado do operador.

### "Error: Invalid DMR ID"

O campo DMR ID tem de ser um número de 7 dígitos. Sem espaços, sem traços, sem indicativo. Só os dígitos do [radioid.net](https://radioid.net).

### Desliga-se de poucos em poucos minutos

Normalmente é um timeout NAT num router pouco amigável a UDP. Tanto Rewind como Homebrew fazem pings periódicos para manter o mapeamento NAT vivo, mas alguns routers expiram entradas UDP agressivamente. Soluções:

- Usa ligação por cabo se possível.
- Tenta outro master (os regionais tendem a ser mais próximos e fiáveis).
- Alguns routers domésticos têm uma definição "UDP timeout" no NAT/firewall avançado. Aumenta-a se existir.

**No Android**, verifica também **Definições → Background → Ignore battery optimizations** e (em Xiaomi/Samsung/OnePlus/Huawei) a definição de **Autostart** por app. O Android fecha apps em segundo plano agressivamente; se o VoxDMR estiver a ser fechado durante o RX, verás ciclos periódicos de desligar-religar associados ao ecrã apagado.

O VoxDMR volta a ligar-se automaticamente após uma queda (está ligado por predefinição), por isso uma falha breve deve resolver-se sozinha sem qualquer ação — vê [Reconexão automática](./auto-reconnect). Se preferires que fique desligado numa queda, podes desativar a opção lá.

## Áudio

### Não ouves outras estações

Verifica por esta ordem:

1. **Estás mesmo subscrito a um talkgroup?** O indicador de estado tem de ler **Ready**, não só **Connected**. Escolhe um TG no seletor se não estiver.
2. **O dispositivo de saída correto está selecionado?** **Settings → Audio → Output device**. Se os auscultadores estão ligados mas o predefinido do sistema continua a ser as colunas internas, o seletor não troca automaticamente. Escolhe-os explicitamente.
3. **O RX gain é demasiado baixo?** O RX gain é um **slider de −12 a +12 dB** (posição 7 = 0 dB unidade, 2 dB por passo). Sobe-o alguns passos acima da unidade e vê se as estações mais baixas passam a ouvir-se. Se os níveis variam muito entre estações, liga o **RX AGC** (o auto-nivelador) — agora está **desligado por predefinição**, por isso tens de o ativar.
4. **Volume do sistema.** Óbvio, mas fácil de esquecer depois de uma atualização do SO.

### Homebrew: ligado mas não ouves nada

Num perfil **Others** (Homebrew / MMDVM) chegas a **Ready** mas nunca chega áudio, mesmo com a rede claramente ativa. A causa habitual é o **timeslot** errado. O VoxDMR apresenta-se como um hotspot simplex/DMO, por isso os masters são efetivamente **só TS2** — se o **Default timeslot** do perfil estiver em TS1, a tua subscrição cai num slot que o master não está a enviar. Abre as **Advanced options** do perfil e põe o **Default timeslot** em **TS2** (a predefinição). Talkgroups estáticos que nunca tocam têm a mesma solução.

### Outras estações não te ouvem

1. **O microfone está selecionado?** **Settings → Audio → Input device**. Se o seletor está vazio, o SO não está a expor nenhum dispositivo de entrada ao VoxDMR. Verifica as permissões de microfone do SO (ver abaixo).
2. **O TX gain é demasiado baixo?** O TX gain é um **slider de −12 a +12 dB** (posição 7 = 0 dB unidade, 2 dB por passo). Se foi arrastado bem abaixo da unidade e falas baixo, o codificador recebe quase-silêncio. Sobe-o de volta para perto de 0 dB.
3. **Observa o medidor TX.** Liga **Monitor mic level off-air** em **Settings → Audio**. Fala. Se o medidor não se mexer, o microfone não está a ser capturado de todo. Verifica seleção do dispositivo e permissões. Se mexer mas só ficar no verde, sobe o TX gain até os picos chegarem ao amarelo.

### As tuas transmissões soam distorcidas aos outros

O indicador CLIP à direita do medidor TX fica vermelho fixo quando os picos saturam. Baixa o TX gain um passo ou dois de cada vez (2 dB por passo) até o clip deixar de disparar, depois clica em CLIP para limpar a tranca. O TX é sempre ganho manual agora — não há auto-nível de TX para recorrer — por isso ajusta-o à mão. Vê [Definições de Áudio](./audio-settings) para a explicação completa do medidor.

### Permissões de microfone

- **Linux**: a maioria das distros expõe todos os dispositivos de entrada a todas as apps. Se estás num Flatpak ou Snap em sandbox (não é como o VoxDMR é distribuído atualmente), o sandbox precisa de conceder acesso ao áudio.
- **Windows**: abre **Definições → Privacidade e segurança → Microfone**. Confirma que "Permitir que aplicações acedam ao microfone" está ligado, e que o VoxDMR (ou "Aplicações de ambiente de trabalho") tem permissão. Depois de mudar, reinicia o VoxDMR.
- **Android**: a permissão de microfone é pedida na primeira vez que carregas no PTT. Se a negaste, abre as **Definições do Android → Apps → VoxDMR → Permissões → Microfone** e concede-a manualmente. *Microphone permission denied* no snackbar significa que o VoxDMR não conseguiu capturar áudio.

:::mobile

### Auscultadores Bluetooth: sem áudio de RX depois de (re)ligar (Android)

Quando um auscultador Bluetooth liga ou cai a meio da sessão, o Android pode deixar a rota de áudio num estado meio-aberto e o RX fica em silêncio. O VoxDMR volta a encaminhar automaticamente, mas se não recuperar, desliga e liga o auscultador, ou põe a app em segundo plano e reabre-a para forçar uma rota nova.

### O microfone do auscultador Bluetooth não está a ser usado (Android)

Por predefinição o VoxDMR capta do microfone do próprio telemóvel mesmo com um auscultador emparelhado. Para transmitir a partir do microfone do auscultador, liga **Use Bluetooth headset mic** em **Settings → Audio** (*Capture audio from the paired Bluetooth headset (narrowband)*). É áudio SCO de banda estreita, por isso a qualidade de voz é inferior à do microfone do telemóvel — deixa-o desligado a menos que queiras mesmo captação mãos-livres.

:::

## PTT

### Premir a tecla PTT não faz nada

- **A janela principal tem foco?** O VoxDMR não captura uma hotkey global. A janela tem de ter foco do teclado. Clica na barra de título, depois tenta outra vez.
- **A tecla certa está associada?** Verifica em **Settings → PTT**. A barra de Espaço é a predefinição mas pode ter sido mudada.
- **Há algo a engolir a tecla?** Alguns lançadores de jogos e gravadores de ecrã intercetam a barra de Espaço globalmente. Associa o PTT a algo menos comum (F8, F12, Insert). Vê [Modos PTT](./ptt-modes).

:::mobile

### O PTT de hardware pára quando o ecrã bloqueia ou a app vai para segundo plano (Android)

Por predefinição, uma tecla de hardware associada só chega ao VoxDMR enquanto a app está em primeiro plano. Para manter o PTT (e as teclas de canal/scan) a funcionar com o ecrã apagado ou a app em segundo plano, liga o **Lock-screen PTT** em **Settings → Push-to-talk** — ativa um serviço de Acessibilidade que capta as tuas teclas associadas ao nível do sistema. O Android leva-te às definições de Acessibilidade para o conceder; a opção passa então a mostrar *Enabled — PTT works while locked*.

Duas notas de hardware já agora:

- **Botões GPIO que aparecem como `Key (scan N)`.** As teclas laterais de rádios PoC baratos reportam keycode 0, por isso o VoxDMR associa-as por scan code e rotula-as `Key (scan <n>)`. É esperado — associa-as como qualquer outra tecla.
- **Roda de canal rotativa.** Em rádios com roda de canal (p.ex. o Meig P60), rodá-la percorre os teus talkgroups favoritos — sentido horário = seguinte, anti-horário = anterior. Não precisa de associação.

:::

### A TX nunca pára no modo toggle

Ativaste a TX e esqueceste-te de desativar. Toca outra vez na tecla PTT, ou clica no botão TX no ecrã.

Se um evento de tecla foi engolido e a TX parece presa sem forma de desligar, desliga-te do BrandMeister. A TX corta automaticamente quando perdes a subscrição.

## Scan

### O scan nunca fixa num talkgroup

O scan só vigia os favoritos que **marcaste para scan** — armar o scan não faz nada por si só. Marca primeiro os que queres na rotação, depois arma o scan:

:::desktop

Usa o **radar** de cada linha de favorito (na tira de ações que aparece ao passar o rato), depois arma o scan pelo **controlo de radar no cartão de chamada**.

:::

:::mobile

No seletor de talkgroups, usa o **overflow menu → Add to scan** de um favorito, depois arma o scan pelo **controlo de scan no cartão de chamada do PTT**.

:::

Se nunca fixa nada, confirma que pelo menos um talkgroup marcado está mesmo ativo — o scan só consegue fixar num grupo onde alguém está a transmitir. Vê [Talkgroups](./talkgroups) para o guia completo do scan.

### O scan sai de um talkgroup demasiado depressa (ou fica demasiado tempo)

É o **hang time** — quanto tempo o scan fica parado num talkgroup depois de uma chamada terminar antes de retomar, intervalo `0–30 s`, predefinição `4 s` (`0` = retomar de imediato). Sobe-o se o scan avançar antes de a resposta chegar; baixa-o se o scan ficar demasiado tempo num grupo parado.

:::desktop

Define-o no cartão **Scan** em **Settings → Interface**.

:::

:::mobile

Define-o em **Settings → Scan → Hang time**.

:::

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

**O perfil ativo está numa rede Homebrew?** Então isto é esperado — não existe uma feed de atividade ao vivo equivalente para TGIF, FreeDMR, ADN, etc. Os pontos ficam cinzentos por design. Sabes quem está a falar quando ouves a estação. Volta a um perfil BrandMeister e os pontos voltam a funcionar.

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
