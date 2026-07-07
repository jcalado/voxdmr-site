# Talkgroups

O picker de talkgroup é onde passas a maior parte do tempo no VoxDMR. Esta página cobre seleção de talkgroup, construção da lista de favoritos, indicador de atividade, chamadas privadas e renomear talkgroups com aliases personalizados.

> **Por perfil.** Favoritos e aliases pertencem ao **perfil ativo**. Mudar para outro perfil carrega a sua própria lista. Vê [Perfis de Servidor](./server-profiles).

:::desktop

### O picker

O picker é o **painel esquerdo** da janela principal. De cima para baixo:

1. **Campo de pesquisa**: `Search talkgroups or enter ID…`. Auto-focado no arranque.
2. **Secções** aparecem como cabeçalhos cinzentos suaves, apenas quando há linhas para mostrar:
   - **DMR ID** — quando escreveste um ID numérico que ainda não está nos favoritos. Dois cartões: *Use {id} as Talkgroup* e *Use {id} as Private call*.
   - **Favourites** — os teus talkgroups guardados, com o indicador de atividade.
   - **Results** — resultados do CSV BrandMeister (só quando estás a pesquisar e ligado à BrandMeister).

Clica numa linha e o VoxDMR envia imediatamente um update de subscrição ao servidor.

### Selecionar um talkgroup

Quatro formas de pôr um talkgroup no ar:

**A partir dos favoritos.** Clica em qualquer linha de favorito.

**A partir de um resultado de pesquisa.** Começa a escrever — resultados por nome ou ID aparecem em **Results**. Clica num para mudar.

**Por ID exato.** Escreve um ID numérico. A secção **DMR ID** aparece com *Use {id} as Talkgroup* (e *Private call*, vê abaixo). Clica no cartão de talkgroup. Funciona para IDs que a base de dados não conhece — TGs regionais ou privados, ou TGs de redes Homebrew que não estão no CSV BrandMeister.

**A partir do teclado.** Com o campo de pesquisa vazio, **↑ / ↓** destaca um favorito e **Enter** ativa-o.

### Marcar um talkgroup como favorito

Cada resultado tem um botão **★** ao lado do nome. Clica para adicionar aos favoritos. A linha desaparece dos resultados e entra na lista de favoritos.

Se o talkgroup não está no CSV (custom, regional ou de outra rede), seleciona-o por ID primeiro; depois de ativo, marca como favorito.

### Gerir favoritos

Clica num favorito para o ativares. **Passa o rato por cima de uma linha de favorito** e uma pequena tira de ações revela-se à direita:

- **📡 Radar** — adiciona ou remove este favorito da rotação de scan (vê [Procurar talkgroups](#procurar-talkgroups)).
- **✏️ Renomear** — abre o diálogo de renomear (também disponível com o botão direito).
- **🗑 Eliminar** — remove dos favoritos. O primeiro clique arma um **Confirm / Cancel** inline; cancela sozinho se afastares o rato, saíres da lista, ou premires **Esc**.

O **tipo** de um favorito — talkgroup ou chamada privada — fica fixado quando o guardas. Não há toggle de lock/privado na linha; para trocar um favorito guardado entre os dois, elimina-o e volta a adicioná-lo como o tipo que queres (vê [Chamadas privadas](#chamadas-privadas)).

Para **reordenar**, segura o botão esquerdo do rato num favorito e arrasta-o para cima ou para baixo. A nova ordem guarda-se automaticamente.

Atalhos de teclado no favorito destacado:

| Tecla | Ação |
|---|---|
| **↑ / ↓** | Move o destaque |
| **Enter** | Ativa (subscrever) o TG destacado |
| **Alt + ↑ / ↓** | Reordena para cima ou para baixo |
| **Delete** | Remove dos favoritos |
| **Esc** | Cancela um arrasto em curso |

### Renomear talkgroups

Podes dar a qualquer talkgroup um nome personalizado que substitui o da base de dados. O alias é **por perfil** — o teu perfil BrandMeister e o teu perfil TGIF podem dar ao `91` etiquetas diferentes.

**Clica com o botão direito em qualquer favorito ou resultado** e abre-se o modal **Rename talkgroup**:

- O nome **Official** da base de dados é mostrado para referência (ou `—` se desconhecido).
- **Custom name** — escreve o teu alias aqui.
- **Reset** — só fica ativo quando já existe um alias; limpa-o e volta ao nome oficial.
- **Cancel** / **Save**.

O alias é usado em todo o lado onde o TG aparece: lista de favoritos, resultados, rodapé ("TG 91 · World-wide") e cartão de chamada.

Útil para:

- **TGs Homebrew** que não estão no CSV BrandMeister — dá-lhes um nome reconhecível uma vez e nunca mais precisas de procurar.
- **Alcunhas locais** — "Net do café" em vez de `91`, "Pai" em vez de um ID de chamada privada.
- **Shacks multilingues** — renomeia `268` para "Portugal" ou "Portuguesa" consoante o perfil em que estás.

:::

:::mobile

### O picker

O picker de talkgroup no Android é uma **bottom sheet** aberta pelo **badge TG** na barra superior do ecrã PTT (canto superior direito; mostra *No TG* se nenhum estiver selecionado, ou *TG {id}* caso contrário).

Layout:

1. **Campo de pesquisa fixo** no topo — `Search by name or DMR ID…`.
2. **DMR ID** quando escreves só dígitos — dois cartões: *Use {id} as talkgroup* e *Use {id} as private call*, cada um com toggle de estrela.
3. **FAVOURITES** — os teus TGs guardados (só quando a pesquisa está vazia).
4. **ALL TALKGROUPS** / **RESULTS** — linhas do CSV ou resultados de pesquisa.

Toca numa linha para subscrever; a sheet fecha-se e a barra superior atualiza.

### Marcar favoritos

Toca na **★** de qualquer linha para guardar (ou retirar) dos favoritos. A sheet mantém-se aberta para poderes marcar vários sem voltar a abri-la.

### Reordenar favoritos

Os favoritos mantêm a ordem em que os colocaste. Para os reorganizar, abre o **menu de opções (⋮) → Reorder** de uma linha de favorito — a lista entra em modo de reordenação e cada linha ganha uma **pega de arrasto**. Arrasta uma linha pela pega para uma nova posição, ou move a linha agarrada com **Cima / Baixo** e larga-a com **OK** (a dica indica `Up/Down to move · OK to drop`). A nova ordem guarda-se automaticamente.

### Renomear talkgroups

**Toca e segura em qualquer linha de TG** no picker — favorito, resultado de pesquisa, ou um dos cartões *Use {id} as…*. O diálogo **Rename talkgroup {id}** abre:

- *Official: {csv_name}* é mostrado para referência.
- **Custom name**, máximo 48 caracteres.
- **Reset** — limpa o alias e volta ao nome oficial.
- **Cancel** / **Save**.

O alias é "usado em todo o lado onde este ID aparece" — mesmo âmbito do desktop, mesma forma de armazenamento por perfil.

:::

## Chamadas privadas

Alguns DMR IDs são utilizadores individuais ou nós fixos em vez de grupos. Chamar um desses é uma **chamada privada** em termos DMR — dirigida a um único ID, não distribuída por um grupo.

> **Recebes sempre chamadas para o teu próprio ID.** O VoxDMR monitoriza permanentemente o teu próprio DMR ID a par do talkgroup (ou rotação de scan) ativo, por isso uma chamada privada dirigida a ti é sempre recebida — mesmo enquanto ouves um grupo. É automático; não há definição.

**Desktop:** na secção **DMR ID**, escreve o ID e clica em **Use {id} as Private call** em vez de *Talkgroup*. Marca-o com estrela para guardar um favorito de chamada privada — a linha ganha o sufixo `(private)`. O tipo de um favorito fica fixado no momento em que o guardas; não há toggle de lock para transformar um talkgroup guardado numa chamada privada.

**Android:** na secção DMR ID, toca em **Use {id} as private call**. O badge TG na barra superior mostra a flag privada, e (se marcado como favorito) a linha tem um ícone de pessoa e o sufixo `(private)`.

O indicador de atividade (abaixo) é suprimido para favoritos de chamada privada. A BrandMeister continua a publicar eventos para esses IDs, mas o ponto seria enganador (verias o tráfego de *outras pessoas* para esse ID, não o teu), por isso o VoxDMR mantém-no cinzento.

## O indicador de atividade

Cada linha de favorito tem um ponto colorido à esquerda. Diz-te de relance o que está a acontecer naquele talkgroup:

| Ponto | Significado |
|---|---|
| 🟢 **Verde** | Talkgroup ativo. O que estás a ouvir, e para o qual o teu PTT vai transmitir. |
| 🟡 **Amarelo** | Atividade ao vivo nos **últimos 30 segundos**. Alguém está a falar ou acabou de falar. A linha também mostra o falante (e.g. `← G4ABC John`). |
| ⚫ **Cinzento** | Inativo. Sem tráfego recente. |

A feed de atividade vem do stream live de last-heard da BrandMeister via WebSocket. Não precisas de estar sintonizado num TG para o ver acender a amarelo.

> **Resolução de indicativo e nome.** O falante mostrado numa linha amarela (`← G4ABC John`) vem da pesquisa de DMR ID do VoxDMR. Se descarregaste a base de dados offline opcional de DMR ID (**Definições → DMR IDs** no desktop, o ecrã **DMR ID database** no Android), os IDs resolvem-se para indicativos instantaneamente e offline; caso contrário o VoxDMR recorre à API do radioid.net, e um ID que não consiga resolver aparece como o número puro.

> **Só BrandMeister.** A feed live é um serviço da BrandMeister. Quando o perfil ativo está numa rede Homebrew (TGIF, FreeDMR, ADN…) os pontos ficam cinzentos. Em Homebrew, a feed de atividade não existe; sabes quem está a falar quando ouves a estação. Volta a um perfil BrandMeister e os pontos voltam a funcionar.

Podes desativar os pontos por completo em **Definições → Interface → Live BrandMeister activity dots** (desktop) se preferires não ter o tráfego de rede — é puramente informativo, não é necessário para RX, TX ou subscrição.

O estado amarelo expira 30 segundos após a última atualização, por isso se um evento Stop se perder, o ponto limpa-se sozinho.

> A feed live é só de leitura e não autenticada, por isso não precisa de configuração extra. Se a tua rede bloqueia `api.brandmeister.network`, os pontos ficam cinzentos mas tudo o resto (RX, TX, subscrição) continua a funcionar.

## Procurar talkgroups

O scan permite ao VoxDMR vigiar **vários dos teus favoritos ao mesmo tempo** em vez de ficar num só talkgroup. Marca os favoritos que queres na rotação, arma o scan, e a app fixa-se no primeiro que fica ativo, reproduz-no, aguarda brevemente para apanhar a resposta, e depois retoma a vigilância dos restantes.

- **O primeiro a chegar ganha.** Assim que o scan se fixa num talkgroup, uma chamada posterior noutro TG do scan é ignorada até o bloqueio libertar.
- **O teu próprio DMR ID ganha sempre.** O VoxDMR monitoriza permanentemente o teu próprio ID por cima da lista de scan, por isso uma chamada privada para ti interrompe uma chamada de grupo bloqueada.
- **O PTT segue o bloqueio.** Com o scan armado, carregar no PTT transmite para o talkgroup bloqueado (ou o último que ouviste, se o scan estiver inativo).

> **Estado da sessão.** Se o scan está *armado* não é guardado por perfil nesta versão — começa desarmado a cada arranque. As tuas flags de scan por favorito e o tempo de espera são recordados.

### Marcar favoritos para scan

:::desktop

Cada linha de favorito tem um pequeno **toggle de radar** na sua tira de ações de hover, ao lado de renomear e eliminar. Arma e desarma o scan a partir do **controlo de radar no cartão de chamada**. Enquanto procura o ícone respira; fica sólido quando bloqueado ou desligado. O cartão indica `Scanning…` enquanto procura e `Scan ▸ <tg>` quando bloqueado.

:::

:::mobile

Abre o picker de talkgroup e usa o **menu de opções → Add to scan / Remove from scan** de uma linha de favorito; os favoritos marcados mostram um **badge de radar**. Arma e desarma o scan a partir do **controlo de scan no cartão de chamada PTT** (no nav drawer em ecrãs PoC compactos). No modo carro um badge com cores mostra o estado — `Scanning…`, `Scan ▸ <tg>`, ou `Hold ▸ <tg>` durante a janela de espera; toca-lhe para sair do scan.

:::

### Responder e estacionar

- **Responde para fixar.** Carregar no PTT durante a janela de espera compromete-se com esse TG e desliga o scan, por isso o teu QSO fica onde está.
- **Sair e estacionar.** Toca no controlo de scan enquanto uma chamada está a tocar para parar o scan e ficar no talkgroup que estás a ouvir, sem interromper o áudio.

### Tempo de espera do scan

Quanto tempo o scan fica estacionado num talkgroup depois de uma chamada terminar antes de retomar — intervalo **0–30 segundos**, por omissão **4 s** (`0` = retoma imediatamente). Global, não por perfil; recordado entre reconexões.

:::desktop

Define-o no cartão **Scan** em **Definições → Interface**.

:::

:::mobile

Define-o em **Definições → Procurar → Tempo de espera**.

:::

> **Um de cada vez.** Se dois talkgroups do scan estiverem ocupados exatamente no mesmo instante podes ouvir brevemente um pedaço do segundo antes de o bloqueio assentar — os frames Rewind não indicam a que grupo pertencem.

Para as teclas atribuíveis de scan / próximo / anterior talkgroup vê [Modos PTT](./ptt-modes); os talkgroups estáticos de Homebrew tocam ao estilo de scanner pela mesma máquina — vê [Perfis de Servidor](./server-profiles).

## Mudar durante uma transmissão

Se carregares no PTT e depois escolheres outro talkgroup, o VoxDMR termina a tua transmissão no TG antigo antes de subscrever o novo. Não vais transmitir acidentalmente no grupo errado.

:::mobile

No Android, mudar está **totalmente bloqueado enquanto estás a transmitir**: enquanto seguras o PTT o picker fica esbatido e um toque num favorito, uma tecla de hardware de próximo/anterior, ou um detent do botão rotativo não vão reapontar o talkgroup ativo. Nada é enfileirado — larga o PTT e depois muda.

:::

## Onde os favoritos e aliases são guardados

Os favoritos e aliases por perfil ficam dentro da secção de cada perfil no `config.toml` no desktop, e dentro do blob de configuração por perfil no Android. Acompanham-te quando mudas de perfil, mas não são partilhados entre perfis. Vê [Perfis de Servidor](./server-profiles).

## Próximos passos

- [Perfis de Servidor](./server-profiles) — mantém várias redes lado a lado.
- [Modos PTT](./ptt-modes) — push-to-talk vs toggle, mudar a tecla PTT.
- [Definições de Áudio](./audio-settings) — dispositivos de entrada/saída, ganho, medidores.
- [Resolução de Problemas](./troubleshooting) — problemas de ligação, áudio e firmware.
