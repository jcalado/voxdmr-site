# Modos PTT

O PTT no VoxDMR é um gatilho por software. Há uma tecla no teclado, um botão no ecrã, e uma definição que controla como qualquer um deles se comporta. Esta página cobre os dois modos PTT e como mudar o gatilho para outra tecla.

## Os dois modos

Abre **Settings → Interface**. A lista pendente **PTT mode** tem duas opções:

**Push to talk** (predefinição). Mantém a tecla premida (ou mantém o botão no ecrã) para transmitir. Larga para parar. O comportamento clássico de rádio. É o que queres se o PTT é memória muscular e não queres pensar no estado.

**Toggle**: toca uma vez na tecla para começar a transmitir, toca outra vez para parar. Útil para anúncios longos, check-ins em redes, ou qualquer situação em que manter a tecla seja desconfortável.

Podes mudar de modo a meio de uma transmissão. O estado de TX em si não muda. Só como as pressões seguintes são interpretadas.

## A tecla PTT

Por omissão, a barra de **Espaço** dispara o PTT. Podes mudá-la para quase qualquer tecla.

Para mudar:

1. Abre **Settings → Interface**.
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

## O botão no ecrã

O botão **TX** vermelho grande na janela principal faz exatamente o que a tecla PTT faz, no modo em que estiveres. Também respeita o modo:

- **Push to talk**: prime e mantém o botão do rato sobre TX para transmitir; larga para parar.
- **Toggle**: clica em TX uma vez para começar, clica outra vez para parar.

Útil se não puderes ou não quiseres usar o teclado. Está desativado até estares ligado e subscrito a um talkgroup; passa o rato por cima quando está cinzento para ver a explicação.

## Como sabes que estás a transmitir

Enquanto estás a transmitir, três coisas mudam:

- O botão **TX** na janela principal fica vermelho fixo.
- A barra inferior mostra `TX HH:MM:SS` a contar. A duração da tua transmissão.
- O indicador de nível TX fica ativo.

Quando inativo, a barra inferior mostra uma dica, `HOLD SPACE` no modo push-to-talk ou `TAP SPACE` no modo toggle (com a tecla que tiveres realmente associado).

## Foco da janela

A tecla PTT do VoxDMR só funciona quando a **janela principal tem foco do teclado**. Se estás a escrever noutra app e premes a tecla PTT aí, o VoxDMR não vê. Clica primeiro na janela do VoxDMR.

(O VoxDMR não captura uma hotkey global. É uma decisão deliberada. Entraria em conflito com gestores de atalhos de ambiente de trabalho e exigiria permissões extra do SO.)

## Casos limite

**Mudar de modo durante a transmissão.** Permitido. A TX atual continua; só a próxima tecla segue as regras do novo modo.

**Desligar durante a transmissão (modo toggle).** A TX para automaticamente quando desligas ou perdes a subscrição, mesmo que tenhas ativado o toggle. Não tens de te lembrar de tocar na tecla para desligar.

**A tecla ficar presa.** Se o SO engolir o evento de soltar (por exemplo, fizeste Alt-Tab a meio de uma pressão em modo push-to-talk), tocar mais uma vez na tecla PTT deve resolver. Se não, clica no botão TX no ecrã para soltar.

## Próximos passos

- [Audio Settings](./audio-settings). Escolher dispositivos de microfone e saída, afinar TX gain.
- [Talkgroups](./talkgroups). Favoritos, o indicador de atividade e chamadas privadas.
- [Troubleshooting](./troubleshooting). Quando o PTT ou áudio não se comportam.
