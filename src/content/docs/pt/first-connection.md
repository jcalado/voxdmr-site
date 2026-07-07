# Primeira Ligação

Entra num talkgroup DMR e faz a tua primeira transmissão.

Esta página assume que já terminaste a [Instalação](./installation), o VoxDMR está a correr, a configuração do firmware está feita e a interface principal está visível.

O VoxDMR fala **dois protocolos**, e a configuração depende da rede a que te queres ligar:

- A **BrandMeister** usa o protocolo **Rewind**. O diretório de masters é puxado em tempo real; basta escolheres um master.
- A **TGIF, FreeDMR, ADN.systems e outras redes baseadas em MMDVM** usam o protocolo **Homebrew** (MMDVM_HBP). Não há um diretório central, por isso o VoxDMR traz um diretório pesquisável de servidores da comunidade (a partir da lista de hosts do Pi-Star) e ainda uma opção *Servidor personalizado* para tudo o que não está listado.

Não escolhes um ou outro de uma vez por todas — o VoxDMR suporta **vários perfis**, cada um com o seu protocolo, servidor e credenciais. Adiciona os que quiseres; muda entre eles com um toque.

## O que precisas

- **DMR ID** (numérico). Emitido pelo [radioid.net](https://radioid.net). Os perfis BrandMeister (Rewind) limitam o ID a **7 dígitos**; os perfis **Others** (Homebrew) aceitam qualquer comprimento.
- **Uma password** da rede a que te vais ligar (vê [Instalação → Requisitos](./installation#requisitos) para saber o que cada rede espera).
- **Indicativo** (opcional, mas as redes Homebrew costumam querer um para identificação).

:::desktop

### Configurar a ligação

Abre **Definições** (ícone de engrenagem) e vai ao separador **Connection**. No cartão **PROFILES**, clica em **+ Add profile** para criar um novo perfil. (O formulário expande abaixo da lista.)

Preenche os campos de **Identidade**:

| Campo | O que escrever |
|---|---|
| **Label** | Um nome curto para este perfil ("Casa", "BM móvel", "TGIF", etc.). |
| **DMR ID** | O teu ID de 7 dígitos do radioid.net. |
| **Password** | A password da rede para este perfil. |
| **Callsign** | Opcional. Usado pelas redes Homebrew. |

Em **Server**, escolhe um protocolo — **BrandMeister** ou **Others**:

**BrandMeister** (Rewind):

- O **picker de master** abre com a lista de masters ativos puxada da API da BrandMeister no arranque. Escolhe o mais próximo de ti. Se o teu não estiver listado, escolhe **Custom server…** e escreve o hostname e porto (`54006` por defeito) manualmente.

**Others** (Homebrew):

- O **picker de servidor** abre como um diretório pesquisável de servidores da comunidade. Pesquisa a tua rede, escolhe-a e o host, porto e definições de login são preenchidos automaticamente. Vê [Perfis de Servidor](./server-profiles) para a explicação completa do diretório.
- **Custom server…** abre campos de host/porto. O **hash format** de login fica sob a divulgação **Advanced** e assume por defeito **Auto (recommended)** — deteta o formato certo sozinho, por isso raramente precisas de lhe mexer.

Clica em **Save**. O novo perfil aparece na lista. Clica no rádio respetivo para o tornares ativo.

### Escolher o talkgroup inicial

O VoxDMR não tem um campo "talkgroup por defeito" nas definições. Em vez disso, o talkgroup que estiver selecionado quando a app guardar a configuração é o que ela vai subscrever na próxima ligação.

Para a tua primeira ligação à BrandMeister, escreve `9990` no campo de pesquisa do ecrã principal e clica no resultado **Parrot**. O Parrot devolve-te o áudio para confirmares que o circuito completo funciona. (A maior parte das redes Homebrew tem o seu próprio Parrot — na TGIF é `9990`; na FreeDMR também.)

### Ligar

Clica em **Connect** no separador **Connection** (ou no botão de ligação no rodapé). O indicador de estado passa por estas fases:

1. **Disconnected** — nada a acontecer.
2. **Connecting…** — handshake com o servidor.
3. **Authenticating…** — o VoxDMR está a apresentar o teu DMR ID + password (+ indicativo na Homebrew).
4. **Connected** — autenticação aceite; a subscrever o talkgroup selecionado.
5. **Ready** — talkgroup subscrito; podes transmitir e receber.

Se parares em **Authenticating…** e voltares a Disconnected, a password (ou o formato de hash, na Homebrew) está errada. Vê [Resolução de Problemas](./troubleshooting).

### Faz a tua primeira transmissão

Com **9990 (Parrot)** como talkgroup ativo:

1. Mantém a **barra de espaço** premida (a tecla PTT por defeito).
2. O rodapé mostra `TX HH:MM:SS` e o medidor TX fica ativo.
3. Diz uma frase curta de teste — "Teste, daqui _o teu indicativo_, parrot test".
4. Larga a barra de espaço.
5. Cerca de um segundo depois, o Parrot devolve-te o áudio.

Se te ouviste, estás no ar. Se não, vê [Resolução de Problemas](./troubleshooting).

:::

:::mobile

### Configurar a ligação

Toca no separador **Connection** na barra inferior. No cartão **Identity** no topo, toca na linha (vai dizer *Não configurado* se for o primeiro arranque).

Isto abre o ecrã **Profiles**. Toca em **+ Add profile** no fim.

Preenche os campos de **Identidade** no modal que aparece:

| Campo | O que escrever |
|---|---|
| **Label** | Um nome curto para este perfil. |
| **DMR ID** | O teu ID de 7 dígitos. |
| **Password** | A password da tua rede. |
| **Callsign** | Opcional. As redes Homebrew costumam querer um. |

Em **Server**, toca no controlo segmentado para escolher **BrandMeister** ou **Others**.

**BrandMeister**: toca na linha do servidor para abrir a bottom sheet **BrandMeister servers**. Pesquisa por país ou hostname; toca num master para o selecionar. O porto é `54006` e não precisas de mexer.

**Others**: toca na linha do servidor para abrir a bottom sheet **Servers** — um diretório pesquisável de servidores da comunidade. Pesquisa a tua rede e toca nela; host, porto e definições de login são preenchidos. Podes editar tudo manualmente depois. O **hash format** fica sob **Advanced options** e assume por defeito **Auto (recommended)**.

Toca em **Save**. O novo perfil aparece na lista. Toca no rádio respetivo para o tornares ativo.

### Ligar

De volta ao separador **Connection**, toca em **Connect**. O cartão hero passa pelos mesmos estados que no desktop (Connecting → Authenticating → Connected → Ready).

### Escolher um talkgroup

Muda para o separador **PTT** (canto inferior esquerdo). Toca no **badge TG** na barra superior (vai dizer *No TG* se nenhum estiver selecionado). O picker de talkgroup abre como uma bottom sheet:

- **Escreve um ID numérico** (tenta `9990`). Aparecem dois cartões: *Use 9990 as talkgroup* e *Use 9990 as private call*. Toca no de talkgroup.
- **Ou pesquisa por nome**: escreve "parrot" para o encontrares no CSV BrandMeister. Toca no resultado.

A sheet fecha e o badge TG na barra superior atualiza para `TG 9990`.

### Faz a tua primeira transmissão

Carrega e segura o grande botão vermelho **TX** no fim do ecrã PTT. A dica em baixo diz *Hold to transmit* (ou *Tap to transmit* no modo toggle). O medidor TX fica ativo, o timer começa a contar e o botão fica vermelho mais vivo.

Larga. Cerca de um segundo depois, o Parrot devolve-te o áudio pelo altifalante (ou pela saída áudio que estiveres a usar).

Se não te ouvires, vê [Resolução de Problemas](./troubleshooting).

> Se já tens uma tecla de hardware atribuída (botões de volume, botão do headset, comando BT) nas Definições, podes usá-la em vez do botão no ecrã. Vê [Modos PTT](./ptt-modes).

:::

## Receber áudio

Enquanto estás ligado, qualquer tráfego no talkgroup ativo toca automaticamente na saída de áudio. O **cartão de chamada** (rodapé do desktop / ecrã PTT no Android) mostra:

- **Source ID** — o DMR ID da estação que está a transmitir.
- **Indicativo** (quando registado).
- **Talker alias** — nome em direto enviado pelo ar, quando suportado.
- **Group ID** — o talkgroup onde corre o tráfego.

Quando a transmissão termina, o cartão volta a *Idle*.

> O VoxDMR monitoriza sempre o teu próprio DMR ID em paralelo com o talkgroup selecionado, por isso uma chamada privada dirigida a ti chega mesmo enquanto ouves um grupo. Não há nada a ativar.

## Mudar de talkgroup

O picker de talkgroup (painel esquerdo no desktop, bottom sheet no Android) permite-te mudar de talkgroup. Escreve uma pesquisa, toca/clica num resultado e a subscrição atualiza-se imediatamente. Vê [Talkgroups](./talkgroups) para a explicação completa do picker, incluindo favoritos, indicador de atividade e aliases por perfil.

Queres vigiar vários talkgroups ao mesmo tempo em vez de apenas um? Vê [scan](./talkgroups#scanning-talkgroups).

Alguns talkgroups populares para experimentar depois do Parrot:

| ID | Nome | Atividade |
|---|---|---|
| 91 | Worldwide | Sempre ativo |
| 92 | Europe | Regional |
| 235 | UK | Nacional |
| 268 | Portugal | Nacional |
| 269 | Switzerland | Nacional |
| 9990 | Parrot | Teste de eco (só o teu áudio) |

> Os números de talkgroup são específicos da rede. A lista acima é da BrandMeister; a TGIF e a FreeDMR têm a sua numeração. Os nomes vêm do CSV BrandMeister que acompanha o VoxDMR — em redes Homebrew, o picker mostra os IDs mas não os nomes, a não ser que tenhas atribuído um [alias personalizado](./talkgroups#renomear-talkgroups).

## Quando funcionar

Abre Definições → Connection (ou o cartão Session no Android) e liga **Auto-connect**. A partir daí, o VoxDMR liga-se automaticamente no arranque sem cliques extra.

O VoxDMR também te mantém ligado sozinho após uma queda ou mudança de rede — vê [Reconexão automática](./auto-reconnect). Está ligada por predefinição.

## Próximos passos

- [Perfis de Servidor](./server-profiles) — mantém várias configurações de rede lado a lado e muda com um toque.
- [Talkgroups](./talkgroups) — favoritos, indicador de atividade, aliases por perfil.
- [Modos PTT](./ptt-modes) — push-to-talk vs toggle, mudar a tecla PTT, botões de hardware no Android.
- [Definições de Áudio](./audio-settings) — escolher dispositivos, ajustar ganho.
