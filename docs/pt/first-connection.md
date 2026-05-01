# Primeira Ligação

Liga-te a um talkgroup BrandMeister e faz a tua primeira transmissão.

Esta página assume que já concluíste a [Instalação](./installation). O VoxDMR está a correr, o ecrã de configuração inicial desapareceu e a interface principal está visível.

## Do que precisas

- **DMR ID** (numérico, 7 dígitos). Emitido em [radioid.net](https://radioid.net).
- **Hotspot security password**: no teu perfil [BrandMeister SelfCare](https://brandmeister.network/), em _Hotspot security password_. **Não é a password da tua conta BrandMeister.** É uma string separada que defines no SelfCare e que é partilhada por todos os teus hotspots e clientes.
- **Um servidor master BrandMeister**: normalmente o regional mais próximo (por exemplo `master.brandmeister.network` ou um master específico do país, como `2682.master.brandmeister.network`).

## Configurar a ligação

Abre as **Definições** (ícone da engrenagem) e muda para o separador **Connection**.

| Campo | O que indicar |
|---|---|
| **Master** | Escolhe da lista (é preenchida com os masters BrandMeister ativos, atualizados em tempo real ao arranque). Se o teu não estiver listado, escolhe **Custom** e escreve-o manualmente. |
| **Port** | Por omissão `54006`. Não alterar a menos que o master use uma porta diferente. |
| **DMR ID** | O teu ID de 7 dígitos do radioid.net. |
| **Password** | A tua hotspot security password. |
| **Auto-connect** | Desligado por agora. Liga depois de tudo funcionar. |

Fecha as Definições. As alterações são guardadas automaticamente.

## Escolhe o talkgroup inicial

O VoxDMR não tem um campo "talkgroup por omissão" nas definições. Em vez disso, o talkgroup que tiveres selecionado quando a app guarda a configuração passa a ser aquele a que ela adere no próximo arranque.

Para a primeira ligação, escreve `9990` no seletor de talkgroups na janela principal e clica no resultado **Parrot**. O Parrot devolve o teu áudio em eco para confirmares que a ida e volta funciona.

## Ligar

Clica em **Connect** na janela principal. O indicador de estado na barra de título (e na barra inferior) percorre estes estados:

1. **Disconnected**: ainda nada.
2. **Connecting…**: handshake TCP/UDP com o master.
3. **Authenticating…**: o VoxDMR apresenta o teu DMR ID + password.
4. **Connected**: autenticação aceite; a subscrever o talkgroup selecionado.
5. **Ready**: talkgroup subscrito; podes transmitir e receber.

Se ficar parado em **Authenticating…** e voltar a Disconnected, a password está errada. Consulta [Resolução de problemas](./troubleshooting).

## Primeira transmissão

Com **9990 (Parrot)** como talkgroup ativo:

1. Mantém **Espaço** premido (a tecla PTT por omissão).
2. A barra inferior mostra `>>> PTT DOWN, Transmitting` e um cronómetro de TX.
3. Diz uma frase curta de teste, "Teste, aqui _o teu indicativo_, teste de parrot".
4. Larga o Espaço.
5. Após cerca de um segundo, o Parrot devolve o teu áudio em eco. Deves ouvir-te no dispositivo de saída.

Se te ouves, estás no ar. Se não, vê [Resolução de problemas](./troubleshooting). As causas mais comuns são permissões do microfone, dispositivo de áudio errado, ou ganho de TX a zero.

> A tecla PTT é configurável em **Settings → Interface**. Se o Espaço entrar em conflito com outra janela, ou preferires uma tecla de função, muda-a aí.

## Receber áudio

Enquanto estás ligado, qualquer tráfego no teu talkgroup ativo é reproduzido automaticamente no dispositivo de saída. O **painel RX** mostra, da transmissão ativa:

- **Source ID** (DMR ID da estação a transmitir)
- **Callsign** (quando registado)
- **Talker alias** (string de nome enviada em direto, quando suportado)
- **Group ID** (o talkgroup onde está o tráfego)

Quando a transmissão termina, vê-se brevemente `RX end` na barra inferior.

## Mudar de talkgroup

O **seletor de talkgroups** na janela principal permite mudar o talkgroup que estás a ouvir:

- **Pesquisa** por nome ou número.
- **Estrela** um talkgroup para o adicionar aos favoritos.
- **Clica** num talkgroup para mudar.

A mudança é instantânea. O VoxDMR envia uma atualização de subscrição ao master e começa a receber o tráfego do novo talkgroup.

Alguns talkgroups populares para experimentar depois de o Parrot funcionar:

| ID | Nome | Atividade |
|---|---|---|
| 91 | Worldwide | Sempre com tráfego |
| 92 | Europe | Regional |
| 235 | UK | Nacional |
| 268 | Portugal | Nacional |
| 269 | Switzerland | Nacional |
| 9990 | Parrot | Teste em eco (apenas o teu áudio) |

## Quando funcionar

Volta a Settings → Connection e ativa **Auto-connect**. A partir daí, o VoxDMR liga-se automaticamente ao arranque sem cliques adicionais.

## Próximos passos

- [PTT Modes](./ptt-modes). Mudar a tecla PTT, alternar entre push-to-talk e toggle.
- [Audio Settings](./audio-settings). Escolher dispositivos de microfone e saída, ajustar ganho.
- [Talkgroups](./talkgroups). Gerir favoritos e a base de dados de talkgroups.
