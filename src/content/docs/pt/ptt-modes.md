# Modos PTT

O PTT no VoxDMR é um gatilho por software. Há uma tecla (ou botão de hardware), um botão no ecrã, e uma definição que controla como qualquer um deles se comporta. Esta página cobre os dois modos PTT e como mudar o gatilho para outra tecla.

## Os dois modos

**Desktop:** abre **Definições → PTT**. O seletor **PTT mode** tem duas opções.

**Android:** abre o separador **Definições**. Na secção **Session**, o segmented button **PTT mode** tem duas opções.

**Push to talk** (predefinição). Mantém a tecla premida (ou mantém o botão no ecrã) para transmitir. Larga para parar. O comportamento clássico de rádio. É o que queres se o PTT é memória muscular e não queres pensar no estado.

**Toggle / Tap**: toca uma vez na tecla para começar a transmitir, toca outra vez para parar. Útil para anúncios longos, check-ins em redes, ou qualquer situação em que manter a tecla seja desconfortável.

Podes mudar de modo a meio de uma transmissão. O estado de TX em si não muda — só como as pressões seguintes são interpretadas.

:::desktop

## A tecla PTT

Por omissão, a barra de **Espaço** dispara o PTT. Podes mudá-la para quase qualquer tecla.

Para mudar:

1. Abre **Definições → PTT**.
2. Em **PTT key**, clica no botão que mostra a tecla atual (por exemplo `Space    Change`).
3. O botão passa a `Press a key… (Esc to cancel)`.
4. Prime a tecla que queres como novo PTT.
5. O botão atualiza para mostrar a nova etiqueta. Pronto. A associação é guardada.

Se mudares de ideias durante a captura, prime **Esc** ou clica no botão outra vez para cancelar.

### O que podes associar

- Qualquer **letra ou número** (A-Z, 0-9).
- Qualquer **tecla de função** (F1-F12).
- A maioria das **teclas nomeadas**: Space, Tab, Enter, Insert, Home, End, PageUp, PageDown, as setas, etc.
- Símbolos, `,`, `.`, `;`, `[`, `]`, etc.

### O que não podes associar

O VoxDMR recusa associar o PTT a uma tecla **modificadora pura**:

- Shift, Ctrl, Alt, AltGr, Meta / Super / Hyper
- Caps Lock, Num Lock, Scroll Lock

Os modificadores são usados pelo SO e outras apps para atalhos; se o PTT estivesse associado a Ctrl, transmitirias sempre que copiasses alguma coisa. Se premires uma tecla modificadora durante a captura, o VoxDMR ignora-a.

> **Combinações** com modificadores (por exemplo Ctrl+F1) também não são suportadas. Apenas teclas únicas. Se precisas de uma tecla difícil de premir por engano, F8 / F12 / Insert são escolhas comuns que não entram em conflito com mais nada.

### Talkgroups e scan

O separador **PTT** tem mais três teclas opcionais, todas **sem associação por omissão**:

- **Tecla próximo grupo** — passa o talkgroup ativo para o favorito seguinte.
- **Tecla grupo anterior** — passa para o favorito anterior.
- **Tecla alternar scan** — arma ou desarma o [scan de talkgroups](./talkgroups).

Associa cada uma da mesma forma que a tecla PTT: clica em **Definir** e prime a tecla que queres (**Esc** para cancelar). Tal como a tecla PTT, estas só disparam enquanto a **janela principal tiver foco do teclado** — o VoxDMR nunca captura uma hotkey global, por isso não fazem nada enquanto outra app estiver em foco.

:::

:::mobile

## Teclas de hardware

Os telemóveis Android não têm barra de espaço, mas a maioria tem **teclas de volume**, e muitos headsets ou comandos BT expõem botões extra. Podes associar qualquer um deles ao PTT.

1. Abre o separador **Definições**.
2. Vai à secção **Hardware**.
3. Toca em **Hardware key binding**. O botão entra em modo de captura — prime a tecla que queres usar.
4. Toca novamente para limpar a associação.

O toggle **Hide on-screen button** por baixo está sempre disponível — liga-o se preferires depender só do botão de hardware e recuperar o espaço do ecrã. Se o ocultares sem uma tecla PTT associada, o VoxDMR avisa primeiro com uma confirmação **Sem forma de transmitir**, porque ficarias sem forma de transmitir até reativares o botão ou associares uma tecla.

Botões de headsets Bluetooth, teclas de volume, teclas PTT dedicadas em telemóveis rugged — tudo funciona desde que o Android entregue o evento à app em primeiro plano. Alguns launchers e serviços de acessibilidade intercetam as teclas de volume para uso próprio; se a associação não disparar o PTT, tenta outra tecla.

> **Manter ecrã ligado** na mesma secção Hardware mantém o ecrã aceso enquanto o VoxDMR está em primeiro plano — útil para check-ins em redes onde não queres que o ecrã apague a meio.

:::

## O botão no ecrã

O botão **TX** vermelho grande na janela principal faz exatamente o que a tecla PTT faz, no modo em que estiveres. Também respeita o modo:

- **Push to talk**: prime e mantém o botão do rato sobre TX para transmitir; larga para parar.
- **Toggle**: clica em TX uma vez para começar, clica outra vez para parar.

Útil se não puderes ou não quiseres usar o teclado. Está desativado até estares ligado e subscrito a um talkgroup; passa o rato por cima quando está cinzento para ver a explicação.

:::desktop

Também podes ocultar o botão no ecrã no desktop: liga **Ocultar botão PTT no ecrã** em **Definições → Interface**, no cartão **Visualização**.

:::

## Tons de permissão de fala

Bips opcionais ao estilo walkie-talkie: um arpejo ascendente curto quando premes e um descendente quando soltas. Desligados por omissão, por isso nada muda até os ativares. Os tons tocam só localmente — nunca são enviados para o ar.

Com os tons ligados, a transmissão é adiada à volta deles: ao premir, o VoxDMR toca o bip ascendente, espera que termine (~300 ms) e só depois abre a TX; ao soltar, fecha a TX primeiro e depois toca o bip descendente. Soltar *durante* o tom ascendente aborta tudo — a TX nunca abre e nada é transmitido, tal como o tom de permissão de fala de um rádio real. (Com os tons desligados, a transmissão é imediata.) O bip de premir também é suprimido quando o canal está ocupado, já que uma abertura half-duplex seria rejeitada de qualquer forma.

:::desktop

Ativa-os em **Definições → Áudio**, no cartão **Transmissão**: **Tons de PTT (ascendente ao premir, descendente ao soltar)**.

:::

:::mobile

Ativa-os em **Definições → Premir para falar**: o interruptor **Tons de PTT** (*Tocar um bip ascendente ao premir e descendente ao soltar*). O aviso de limite de tempo (TOT) agora também apita.

:::

## Como sabes que estás a transmitir

Enquanto estás a transmitir, três coisas mudam:

- O botão **TX** na janela principal fica vermelho fixo.
- A barra inferior mostra `TX HH:MM:SS` a contar. A duração da tua transmissão.
- O indicador de nível TX fica ativo.

Quando inativo, a barra inferior mostra uma dica, `HOLD SPACE` no modo push-to-talk ou `TAP SPACE` no modo toggle (com a tecla que tiveres realmente associado).

## Foco da janela / app

**Desktop:** a tecla PTT do VoxDMR só funciona quando a **janela principal tem foco do teclado**. Se estás a escrever noutra app e premes a tecla PTT aí, o VoxDMR não vê. Clica primeiro na janela do VoxDMR.

(O VoxDMR não captura uma hotkey global. É uma decisão deliberada — entraria em conflito com gestores de atalhos de ambiente de trabalho e exigiria permissões extra do SO.)

**Android:** a associação de tecla de hardware funciona enquanto o VoxDMR for a app em primeiro plano. Em segundo plano, o Android encaminha os eventos para a app à frente. Para manter o PTT disponível sem desbloquear o telemóvel, deixa o VoxDMR em primeiro plano e liga **Manter ecrã ligado**.

## Casos limite

**Mudar de modo durante a transmissão.** Permitido. A TX atual continua; só a próxima tecla segue as regras do novo modo.

**Desligar durante a transmissão (modo toggle).** A TX para automaticamente quando desligas ou perdes a subscrição, mesmo que tenhas ativado o toggle. Não tens de te lembrar de tocar na tecla para desligar.

**A tecla ficar presa.** Se o SO engolir o evento de soltar (por exemplo, fizeste Alt-Tab a meio de uma pressão em modo push-to-talk), tocar mais uma vez na tecla PTT deve resolver. Se não, clica no botão TX no ecrã para soltar.

:::mobile

**Mudar de talkgroup enquanto transmites (Android).** Bloqueado. Enquanto estás a transmitir, os toques em favoritos e na barra, as teclas de hardware seguinte/anterior, um botão rotativo e o seletor do modo carro são todos ignorados, para que um atalho acidental não possa reencaminhar uma transmissão ao vivo para outro grupo. Larga o PTT primeiro e só depois muda.

:::

## Próximos passos

- [Audio Settings](./audio-settings). Escolher dispositivos de microfone e saída, afinar TX gain.
- [Talkgroups](./talkgroups). Favoritos, o indicador de atividade e chamadas privadas.
- [Troubleshooting](./troubleshooting). Quando o PTT ou áudio não se comportam.
