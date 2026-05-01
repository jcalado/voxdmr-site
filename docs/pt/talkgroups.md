# Talkgroups

O seletor de talkgroups na janela principal é onde passas a maior parte do tempo no VoxDMR. Esta página cobre como selecionar um talkgroup, construir a tua lista de favoritos, o indicador de atividade ao vivo e as chamadas privadas.

## O seletor

O seletor tem três controlos empilhados, de cima para baixo:

1. **Campo de pesquisa**: `Search talkgroups or enter ID…`
2. Caixa **Private call**.
3. **Corpo da lista**, que mostra os teus favoritos por omissão e os resultados correspondentes quando escreves.

A lista atualiza enquanto escreves. Não há botão de "aplicar" em lado nenhum. Clicas numa linha e o VoxDMR envia imediatamente uma atualização de subscrição ao master.

## Selecionar um talkgroup

Há quatro formas de pôr um talkgroup no ar:

**Pelos favoritos.** Clica em qualquer linha da lista de favoritos. A linha fica azul e esse talkgroup passa a ativo.

**Por um resultado de pesquisa.** Começa a escrever no campo de pesquisa. Os resultados que correspondem por nome ou ID aparecem sob um cabeçalho **More results** (limitado a 8 linhas). Clica num para mudar.

**Por ID exato.** Escreve um ID numérico e prime **Enter**. Se o ID não estiver na base de dados, o VoxDMR usa-o como TG personalizado na mesma. Útil para talkgroups regionais ou privados que não estejam na lista incluída.

**Pelo teclado.** Com o campo de pesquisa vazio, **↑ / ↓** destacam um favorito e **Enter** ativa-o. Rápido para saltar entre dois TGs sem largar o teclado.

## Marcar um talkgroup como favorito

Quando pesquisas e o resultado que queres ainda não é um favorito, a secção **More results** mostra-o com um botão **★** ao lado do nome. Clica na estrela para o guardar. O TG sai dos resultados de pesquisa e entra na tua lista de favoritos.

Se o talkgroup que queres não estiver na base de dados incluída (um personalizado ou regional), seleciona-o primeiro escrevendo o ID e premindo Enter; assim que for o TG ativo, podes marcá-lo como favorito da mesma forma.

## Gerir favoritos

Clica num favorito para o tornar ativo. O favorito selecionado mostra uma pequena tira de ações à direita:

- **📌 Pin**: move este favorito para o topo da lista.
- **🔓 / 🔒 Lock**: alterna a flag de **chamada privada** para este favorito. Trancado = destino de chamada privada (ver abaixo).
- **🗑 Trash**: remove este favorito da lista.

Para **reordenar**, mantém o botão esquerdo do rato premido sobre um favorito e arrasta-o para cima ou para baixo. Larga na linha onde o queres. A nova ordem é guardada automaticamente.

Atalhos de teclado sobre o favorito destacado:

| Tecla | Ação |
|---|---|
| **↑ / ↓** | Move o destaque para cima ou para baixo |
| **Enter** | Ativa (subscreve) o TG destacado |
| **Alt + ↑ / ↓** | Reordena para cima ou para baixo |
| **Delete** | Remove dos favoritos |
| **Esc** | Cancela um arrastar em curso |

Os favoritos persistem entre arranques no `config.toml` (na tua [diretoria de configuração](./installation)).

## O indicador de atividade

Cada linha de favorito tem um ponto colorido na borda esquerda. Diz-te o que se está a passar nesse talkgroup com um relance:

| Ponto | Significado |
|---|---|
| 🟢 **Verde** | Talkgroup ativo. O que estás a ouvir e onde o teu PTT vai transmitir. |
| 🟡 **Âmbar** | Atividade ao vivo nos **últimos 30 segundos**. Alguém está a falar ou acabou de falar. A linha também mostra o emissor, por exemplo `← G4ABC John`. |
| ⚫ **Cinza** | Inativo. Sem tráfego recente. |

A feed de atividade vem da stream "last-heard" ao vivo da BrandMeister sobre WebSocket. Não tens de estar sintonizado num TG para veres o ponto ficar âmbar. Olha para a lista, vê onde está a ação, clica para entrar.

O estado âmbar expira 30 segundos depois da última atualização, por isso, se um evento de Stop se perder, o ponto limpa-se sozinho na mesma.

> A feed é apenas de leitura e sem autenticação, por isso não é preciso configurar nada. Se a tua rede bloquear `api.brandmeister.network`, os pontos ficam cinza mas tudo o resto (RX, TX, subscrições) continua a funcionar.

## Chamadas privadas

Alguns IDs DMR são utilizadores individuais ou nós fixos em vez de grupos. Chamar um deles é uma **chamada privada** em termos DMR. Endereçada a um único ID, não distribuída por um grupo.

Há duas formas de fazer uma chamada privada:

**Ad-hoc**: escreve o ID de destino, ativa **Private call** e clica. A transmissão seguinte é encaminhada como chamada privada. A flag mantém-se até a desativares.

**Guardada como favorito**: quando tens um destino privado ativo, clica no ícone **🔓 cadeado** na tira de ações para o guardar como favorito de chamada privada. O ícone passa a 🔒 e a etiqueta da linha ganha o sufixo `(private)`. Daí em diante, escolher esse favorito ativa automaticamente a flag de chamada privada.

O indicador de atividade é suprimido para favoritos de chamada privada. A BrandMeister continua a publicar eventos para esses IDs, mas o ponto seria enganador (verias o tráfego de outras pessoas para esse ID, não o teu), por isso o VoxDMR mantém-no cinza.

## Mudar enquanto transmites

Se premires o PTT e depois clicares num talkgroup diferente, o VoxDMR termina a transmissão no TG antigo antes de subscrever o novo. Não chegas a transmitir por engano no grupo errado.

## Onde os favoritos ficam guardados

Os IDs dos favoritos e a flag de chamada privada fazem parte do `config.toml` na [diretoria de configuração](./installation). Editar o ficheiro à mão é suportado mas raramente necessário. O seletor na app cobre tudo.

## Próximos passos

- [PTT Modes](./ptt-modes). Push-to-talk vs toggle, e mudar a tecla PTT.
- [Audio Settings](./audio-settings). Dispositivos de entrada/saída, ganho, indicador de nível.
- [Troubleshooting](./troubleshooting). Problemas de ligação, áudio e firmware.
