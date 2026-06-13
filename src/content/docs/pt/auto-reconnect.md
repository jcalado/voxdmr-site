# Reconexão automática

Mantém a tua sessão viva quando a ligação cai ou a rede muda, sem mexeres na app.

**A reconexão automática está ligada por predefinição.** Quando o VoxDMR perde a ligação de forma inesperada, volta a ligar-se sozinho e re-subscreve o talkgroup onde estavas — não precisas de tocar em **Connect** outra vez.

## O que faz

Com a reconexão automática ligada, o VoxDMR vigia a ligação e intervém sempre que ela cai por um motivo que não pediste:

- **A ligação cai** — um timeout, um erro do lado do servidor, ou o link a ficar em silêncio.
- **A rede muda** — passagem entre Wi-Fi e dados móveis, ou mudança entre redes Wi-Fi (no Android isto é detetado e força uma reconexão imediata em vez de esperar por um timeout).

Quando isso acontece, o VoxDMR:

1. Tenta de novo com **backoff exponencial** — começa em ~2 segundos e cresce até um teto de ~60 segundos entre tentativas, com um pouco de jitter aleatório para as tentativas não caírem todas ao mesmo tempo. Continua a tentar indefinidamente.
2. **Volta a autenticar** com o perfil ativo e **re-subscreve o último talkgroup**, para regressares exatamente onde estavas.
3. Mostra o progresso no indicador de estado enquanto trabalha — *Reconnecting… (attempt N)* no Android, *Connecting* no desktop.

## Quando deixa de tentar

A reconexão automática só desiste em dois casos:

- **Desligas de propósito** — tocar/clicar em **Disconnect** termina a sessão de vez; não volta a ligar-se nas tuas costas.
- **A autenticação falha** — se o servidor rejeita as credenciais (palavra-passe ou formato de hash errados), o VoxDMR pára em vez de martelar o servidor com uma palavra-passe que já sabe estar errada. Corrige as credenciais e liga de novo. Vê [Resolução de problemas](./troubleshooting).

Tudo o resto — Wi-Fi instável, timeouts de NAT, um soluço do servidor, um túnel por uma zona morta — é tratado como recuperável e repetido.

:::desktop

Abre **Settings** (o ícone de engrenagem) e vai ao separador **Connection**. No cartão **CONNECTION** encontras a opção **Auto-reconnect**, logo abaixo de **Auto-connect on launch**. Liga para ativar, desliga para desativar. A mudança tem efeito imediato.

Com ela desligada, uma queda inesperada deixa-te em **Disconnected** e voltas a ligar manualmente.

:::

:::mobile

Abre **Settings** e procura a opção **Auto-reconnect** (ícone de setas circulares), descrita como *Reconnect automatically when the connection drops or the network changes*. Está ligada por predefinição; desliga para desativar.

No Android, a reconexão automática também reage a **mudanças de rede** — a passagem de Wi-Fi para dados móveis (ou vice-versa) despoleta uma reconexão rápida em vez de esperar que a ligação antiga expire. Se usares o VoxDMR com a notificação persistente (modo em segundo plano), a sessão é mantida viva durante o backoff para não perderes tráfego enquanto a ligação é restabelecida.

> Se o VoxDMR estiver a ser terminado em segundo plano e vires ciclos repetidos de desligar-e-voltar-a-ligar associados ao ecrã desligado, isso é um problema de otimização de bateria, não a reconexão automática a fazer o seu trabalho — vê [Resolução de problemas → Desliga-se de poucos em poucos minutos](./troubleshooting#desliga-se-de-poucos-em-poucos-minutos).

:::

## Próximos passos

- [Primeira ligação](./first-connection) — entra num talkgroup e faz a tua primeira transmissão.
- [Perfis de servidor](./server-profiles) — mantém várias configurações de rede e alterna com um toque.
- [Resolução de problemas](./troubleshooting) — falhas de autenticação, timeouts de NAT e problemas de fecho em segundo plano.
