# Alertas

O VoxDMR pode avisar-te quando uma estação que te interessa aparece no ar — e, no Android, dizer em voz alta o que está a acontecer, para acompanhares o rádio sem olhar para ele. Ambos chegaram na [v0.16.0](./changelog).

## Estações seguidas

Segue uma estação e o VoxDMR alerta-te quando ela aparece no teu talkgroup, ou te faz uma chamada privada. O som toca por cima da chamada, por isso dá para subir o volume ou pegar no rádio enquanto a estação ainda está a falar.

### Como as estações são reconhecidas

- Segue por **indicativo ou DMR ID**. Seguir um indicativo traz **todos os DMR IDs** que a base de dados local de DMR IDs lhe conhece — hotspots incluídos, por isso a estação é reconhecida venha por um repetidor, um hotspot ou outro terminal.
- Um indicativo que a base de dados não conhece também pode ser seguido: o VoxDMR pergunta uma vez, e depois reconhece-o **pelo indicativo** assim que a pesquisa do chamador chega durante a chamada.
- A tua própria transmissão devolvida pela rede nunca alerta.

### Onde seguir

- Escreve um indicativo ou DMR ID na lista de estações seguidas nas Definições, **ou** abre qualquer chamada no registo QSO e toca em **Seguir** nos detalhes.
- Os chamadores seguidos levam uma **★** no registo QSO.
- A lista viaja numa [cópia de segurança das definições](./server-profiles).

### Definições do alerta

- **Período de silêncio** — depois de um alerta, a mesma estação só volta a alertar quando passar este tempo (por omissão **10 min**), para que um contacto longo não alerte a cada passagem. Põe **Desligado** para alertar em todas as chamadas.
- **Incluir deteções do scan** — alerta também quando uma estação seguida é ouvida noutro talkgroup através do [scan](./talkgroups) ou de um talkgroup estático. Desligado, só alertam o teu talkgroup selecionado e as chamadas privadas para ti.

:::desktop

### No desktop

Abre **Definições → Alertas**. Adiciona estações no topo, e escolhe como és avisado em **Alerta**:

- **Som** — um toque curto, por cima da chamada.
- **Notificação** — uma notificação do sistema ("CT1ABC está no ar", com o nome e o talkgroup). Aparece mesmo com o VoxDMR em segundo plano, não faz som próprio, e um alerta mais recente da mesma estação substitui o anterior.
- **Som e notificação** (por omissão), ou **Desligado** para manter a lista sem alertas.

:::

:::mobile

### No Android

Abre **Definições → Alertas** ("Estações seguidas, som e vibração"). Em **Alerta**:

- **Som** — um toque curto, por cima da chamada. Silenciar o áudio recebido cala o som, mas não a vibração.
- **Vibrar** — em dispositivos sem motor de vibração, é usado o som.
- **Som e vibração** (por omissão), ou **Desligado**.

O modo silencioso é respeitado — um rádio silenciado não toca.

:::

:::mobile

## Anúncios falados

**Definições → Alertas → Anúncios falados** usa a voz de síntese de fala do dispositivo para dizer o que mudou, para poderes deixar o rádio no bolso ou no tablier. Nada é dito por cima de uma chamada recebida nem enquanto transmites, e os anúncios tocam no volume de multimédia, como o áudio recebido.

Quatro interruptores, cada um por si:

- **Grupo ao mudar** — diz o número e o nome do talkgroup quando o mudas com o botão rotativo ou com as teclas seguinte/anterior. Ao rodar depressa, só diz aquele onde paras.
- **Quem acabou de falar** — quando uma chamada recebida termina, soletra o indicativo da estação no alfabeto fonético ("Última estação: Charlie Tango One Alpha Bravo Charlie"). Espera que a chamada acabe para nunca tapar a voz da estação, e não repete a mesma estação durante 30 segundos.
- **Scan para num grupo** — diz em que talkgroup o [scan](./talkgroups) encontrou atividade, quando a chamada encontrada termina.
- **Ligação perdida e restabelecida** — diz quando a ligação ao servidor cai e quando volta. Uma queda que recupera antes de haver tempo para dizer algo fica em silêncio.

Os anúncios precisam de um motor de síntese de fala com uma voz inglesa instalada; a definição avisa se o dispositivo não tiver nenhum.

:::

## Próximos passos

- [Talkgroups](./talkgroups) — favoritos e o scan de talkgroups, em que o **Incluir deteções do scan** assenta.
- [Definições de áudio](./audio-settings) — os bips de chamadas recebidas, se quiseres ouvir o início e o fim de todas as chamadas, não só das seguidas.
