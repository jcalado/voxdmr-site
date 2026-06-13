# Definições de Áudio

As definições de áudio do VoxDMR estão em **Definições → Audio** no desktop, e na secção **Audio** do separador **Definições** no Android. Dois deslizadores de ganho, mais alguns extras específicos da plataforma. Os indicadores de nível na janela principal (desktop) ou no ecrã PTT (Android) são como afinas os ganhos na prática.

## Diferenças entre plataformas

| | Desktop | Android |
|---|---|---|
| Seletor de dispositivo entrada/saída | Sim — escolhes endpoints exatos do SO | Não — usa o encaminhamento de áudio do Android (altifalante / auricular / headset / BT) |
| Intervalo RX gain | 1× – 32× (predefinição 4×) | 1× – 10× (predefinição 4×) |
| Intervalo TX gain | 0,1× – 4,0× (predefinição 0,5×) | 0,1× – 4,0× (predefinição 0,5×) |
| RX AGC (Auto level) | Sim | Sim |
| Monitor mic level off-air | Sim | Não — medidores sempre ativos enquanto o ecrã está ligado |

:::desktop

## Dispositivo de entrada

O microfone ou entrada de linha de onde o VoxDMR captura. O seletor lista todos os dispositivos de entrada que o sistema operativo expõe. Em Linux são PulseAudio / PipeWire / ALSA; em Windows, endpoints WASAPI em modo partilhado.

O VoxDMR memoriza o dispositivo pelo nome. Se trocares de auscultadores, o seletor atualiza e o VoxDMR volta a selecionar o dispositivo guardado pelo nome no arranque seguinte (com recurso ao predefinido do sistema se já não existir).

> A captura é fixa em 48 kHz mono internamente. O vocoder precisa de 8 kHz; o VoxDMR faz resampling em tempo real. Não precisas de configurar nada de especial no sistema operativo.

:::

:::desktop

## Dispositivo de saída

Onde o áudio recebido é reproduzido. Tem a mesma forma que o seletor de entrada. Auscultadores fortemente recomendados num cliente desktop para evitar realimentação quando estás ao lado do microfone.

:::

:::mobile

## Encaminhamento

O Android trata do encaminhamento de entrada e saída por ti — o VoxDMR captura do microfone ativo no momento (interno, headset com fios, headset BT) e reproduz na saída ativa (altifalante, auricular, headset). Liga um headset com fios ou emparelha um dispositivo BT e o Android muda automaticamente; o VoxDMR segue.

Não há um seletor de dispositivo dentro da app no Android. Se quiseres forçar a reprodução para o auricular em vez do altifalante, usa o seletor de saída de média do Android (no ecrã de bloqueio / quick-settings).

:::

## RX gain

Multiplicador linear aplicado ao áudio recebido descodificado antes de chegar ao dispositivo de saída. Intervalo **1× a 32×** (predefinição **4×**).

Se a outra estação soa baixa, sobe. Se distorce, baixa. O RX gain é puramente local: não afeta o que a rede te envia, só o quão alto o ouves.

## TX gain

Multiplicador linear aplicado ao sinal do microfone antes de entrar no codificador AMBE+2. Intervalo **0,1× a 4,0×** em passos de 0,1 (predefinição **0,5×**).

Acertar o TX gain é a tarefa de áudio mais comum para utilizadores novos. As ferramentas para o afinar:

1. Liga **Monitor mic level off-air** (em baixo).
2. Fala ao nível normal para o microfone, enquanto observas o medidor **TX** na barra inferior da janela principal.
3. Ajusta o TX gain até os picos caírem na zona **amarela** com toques ocasionais no vermelho mas sem fazer clip.

Se o indicador **CLIP** à direita do medidor TX ficar vermelho fixo, os teus picos estão a saturar o codificador e as outras estações vão ouvir distorção. Baixa o TX gain até o CLIP deixar de disparar, depois clica em CLIP para limpar.

## Monitor mic level off-air

Desligado por omissão. Quando ligado, o medidor TX está sempre ativo, mostrando o nível do microfone mesmo quando não estás a transmitir. Útil para afinar o TX gain sem teres de transmitir num talkgroup real.

Desliga depois de afinares, caso contrário o medidor é uma distração constante.

## Os indicadores de nível

Tanto o medidor **TX** (microfone, topo) como o **RX** (receção, baixo) na janela principal são barras LED de 24 segmentos:

- **Intervalo**: -48 dBFS à esquerda e 0 dBFS à direita (2 dB por segmento).
- **Zonas de cor**: verde até -16 dBFS, amarelo de -16 a -6, vermelho acima de -6.
- **Marcador de pico**: uma linha branca fina que salta para o pico e decai lentamente, para veres picos momentâneos depois de a barra cair.
- **Leitura numérica**: dBFS à direita da barra.
- **Indicador CLIP** (só TX): fica vermelho fixo quando a entrada passa -0,087 dBFS (escala digital cheia). Clica para limpar.

Aponta para **verde com algum amarelo** em fala normal. Amarelo constante com toques no vermelho nas sílabas mais fortes é o ponto ideal para o codificador AMBE+2. Vermelho constante ou qualquer clipping significa que estás demasiado alto.

## Próximos passos

- [PTT Modes](./ptt-modes). Push-to-talk vs toggle, mudar a tecla PTT.
- [Talkgroups](./talkgroups). Favoritos e o indicador de atividade.
- [Troubleshooting](./troubleshooting). Problemas de áudio comuns e soluções.
