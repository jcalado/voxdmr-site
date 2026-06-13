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

Clica num favorito para o ativares. O favorito selecionado mostra uma tira de ações à direita:

- **📌 Pin** — move este favorito para o topo da lista.
- **🔓 / 🔒 Lock** — alterna a flag de **private call** (vê abaixo).
- **🗑 Trash** — remove dos favoritos.

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

**Desktop:** quando tens um destino privado ativo, clica no ícone **🔓 lock** na tira de ações para o guardar como favorito de chamada privada. O ícone passa a 🔒 e a linha ganha o sufixo `(private)`. Ou, na secção DMR ID, clica em **Use {id} as Private call** em vez de *Talkgroup*.

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

> **Só BrandMeister.** A feed live é um serviço da BrandMeister. Quando o perfil ativo está numa rede Homebrew (TGIF, FreeDMR, ADN…) os pontos ficam cinzentos. Em Homebrew, a feed de atividade não existe; sabes quem está a falar quando ouves a estação. Volta a um perfil BrandMeister e os pontos voltam a funcionar.

Podes desativar os pontos por completo em **Definições → Interface → Live BrandMeister activity dots** (desktop) se preferires não ter o tráfego de rede — é puramente informativo, não é necessário para RX, TX ou subscrição.

O estado amarelo expira 30 segundos após a última atualização, por isso se um evento Stop se perder, o ponto limpa-se sozinho.

> A feed live é só de leitura e não autenticada, por isso não precisa de configuração extra. Se a tua rede bloqueia `api.brandmeister.network`, os pontos ficam cinzentos mas tudo o resto (RX, TX, subscrição) continua a funcionar.

## Mudar durante uma transmissão

Se carregares no PTT e depois escolheres outro talkgroup, o VoxDMR termina a tua transmissão no TG antigo antes de subscrever o novo. Não vais transmitir acidentalmente no grupo errado.

## Onde os favoritos e aliases são guardados

Os favoritos e aliases por perfil ficam dentro da secção de cada perfil no `config.toml` no desktop, e dentro do blob de configuração por perfil no Android. Acompanham-te quando mudas de perfil, mas não são partilhados entre perfis. Vê [Perfis de Servidor](./server-profiles).

## Próximos passos

- [Perfis de Servidor](./server-profiles) — mantém várias redes lado a lado.
- [Modos PTT](./ptt-modes) — push-to-talk vs toggle, mudar a tecla PTT.
- [Definições de Áudio](./audio-settings) — dispositivos de entrada/saída, ganho, medidores.
- [Resolução de Problemas](./troubleshooting) — problemas de ligação, áudio e firmware.
