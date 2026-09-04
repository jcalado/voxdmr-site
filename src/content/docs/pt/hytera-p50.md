# Hytera P50

O P50 é o **rádio PoC com melhor suporte** no VoxDMR. É o rádio contra o qual as
funcionalidades PoC são desenvolvidas e testadas, por isso tem uma integração com o hardware
que nenhum outro modelo tem de momento.

Tudo aqui é **exclusivo do Android**. Verificado no firmware `V1.2.05.004.01`.

## O rádio

| Propriedade | Valor |
|---|---|
| Versão do Android | 12 |
| Processador | **só 32 bits** |
| Ecrã | 240×320, baixa densidade, sem toque |

:::important

O P50 é um **rádio de 32 bits**. A versão normal para Android não instala nele — precisas do
APK de 32 bits em [Instalação](/pt/docs/installation).

:::

Como o ecrã não tem toque, toda a aplicação é conduzida a partir do teclado e do D-pad. O
VoxDMR passa automaticamente à sua disposição compacta.

## LED de estado

O VoxDMR controla o LED de estado do rádio, para conseguires ver o que se passa sem acender o
ecrã — útil com o rádio no cinto.

:::important

O LED precisa da **permissão de notificações**. Se a negares, o LED simplesmente nunca acende, e
não há erro nenhum a dizer-te porquê. Se o teu LED não faz nada, confirma que as notificações
estão permitidas para o VoxDMR nas definições do Android.

:::

### O que as cores significam

O LED mostra um estado de cada vez, distinguidos pela cor e pelo ritmo:

| Estado | Indicação |
|---|---|
| A transmitir | Vermelho, fixo |
| A receber | Verde, fixo |
| Sem sinal | Vermelho, três piscadelas rápidas a cada 10 s |
| A fazer scan | Laranja, uma piscadela lenta a cada 5 s |
| Ligado, inativo | Verde, três piscadelas rápidas a cada 10 s |

A receção e o ligado-inativo partilham o verde, mas nunca acontecem ao mesmo tempo e o ritmo
distingue-os: a receber é fixo, ligado é uma piscadela tripla.

### Qual o estado que ganha

Só um estado pode aparecer, por isso quando vários são verdadeiros ao mesmo tempo são
ordenados:

**A transmitir → a receber → sem sinal → a fazer scan → ligado.**

Na prática isto quer dizer que transmitir aparece sempre, mesmo que alguém comece a falar
enquanto estás a transmitir; e que alguém a falar ganha sempre ao "scan armado", por isso nunca
perdes atividade só porque o LED estava ocupado a falar-te do scan.

Cada estado tem o seu próprio interruptor nas definições. Desligar um faz cair para o seguinte
em vez de apagar o LED — se desligares a indicação de receção, o LED continua a mostrar o scan
ou o ligado por baixo dela.

## Cartão de chamada no ecrã principal

O launcher do P50 tem um cartão de chamada no ecrã principal. Enquanto há uma sessão a decorrer,
o VoxDMR mantém-no atualizado, para que o ecrã principal do rádio mostre o que o VoxDMR está a
fazer sem abrires a aplicação.

O cartão é limpo sempre que a sessão termina, por isso não fica ali a mostrar uma chamada que já
acabou.

## Tecla de função direita

Depois de o cartão estar ativado, o launcher etiqueta a **tecla de função direita** como "PoC",
e carregar nela abre o VoxDMR. É a forma mais rápida de voltar à aplicação a partir do ecrã
principal.

## Teclas de volume

No P50, as teclas de volume não se comportam como num telemóvel: premidas dentro de uma
aplicação normal, mexem num volume que não é o que estás a ouvir. Carregas em volume mais, o
cursor mexe-se no ecrã, e o áudio não fica mais alto.

O VoxDMR trata das teclas de volume ele próprio, para que mudem o áudio que consegues mesmo
ouvir — altifalante ou auricular Bluetooth, conforme o que estiver em uso.

> Se atribuíste uma tecla de volume como tecla de PTT ou de canal, essa atribuição ganha — a
> tecla faz o que lhe pediste e não mexe no volume.

## PTT com o rádio bloqueado

Com um bloqueio de ecrã seguro definido, o P50 impede os botões físicos de chegarem às
aplicações em execução, por isso o PTT ficaria morto sempre que o rádio bloqueasse.

O VoxDMR inclui um serviço de acessibilidade opcional que mantém as teclas de PTT e de canal
atribuídas a funcionar com o rádio bloqueado. Ativa-o nas definições de acessibilidade do
Android. É opcional — sem ele, tudo continua a funcionar com o ecrã desbloqueado.

## Outros rádios Hytera

:::important

Só o P50 foi testado. Outros rádios PoC da Hytera, como o PNC370 e o PNC550, podem apanhar
alguns destes extras ou nenhum — ainda não sabemos. Em qualquer dos casos nada se estraga: as
funcionalidades que não se aplicam simplesmente não aparecem, e o rádio funciona como um
aparelho Android normal.

Se tens um, [a lista de compatibilidade](/pt/radios) explica como reportar o que encontrares.

:::

## Próximos passos

- [Rádios PoC](/pt/docs/poc-radios) — PTT, botões de canal e acessórios Bluetooth em qualquer
  rádio PoC.
- [Lista de compatibilidade](/pt/radios) — como se saem os outros modelos.
- [Resolução de Problemas](/pt/docs/troubleshooting) — se o PTT, o áudio ou o LED não se
  portarem bem.
