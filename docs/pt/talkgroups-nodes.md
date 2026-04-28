# Talkgroups e Nós

![Ecrã de nós](/docs/nodes-screen.webp)

## Talkgroups

Um talkgroup é um canal lógico no refletor. Estações no mesmo talkgroup podem ouvir-se mutuamente; estações em talkgroups diferentes não.

### Definir um Talkgroup

O talkgroup é configurado por perfil de servidor (ver [Perfis de Servidor](/docs/server-profiles)). Quando o VoxLink liga, junta-se automaticamente ao talkgroup configurado.

### Mudar de Talkgroup Durante uma Sessão

1. Abra o separador **PTT** ou o ecrã principal de ligação.
2. Toque no **seletor de Talkgroup** (mostra o número do talkgroup atual).
3. Selecione um novo talkgroup da lista fornecida pelo refletor.
4. O VoxLink muda imediatamente — sem necessidade de reconexão.

> Confirme o novo talkgroup com uma chamada curta antes de transmitir uma mensagem longa. Alguns talkgroups estão ligados a repetidores ou outras redes e o tráfego pode ser retransmitido amplamente.

### Presets de Talkgroup

Cada perfil de servidor pode ter uma lista de **presets** — talkgroups guardados com etiquetas personalizadas.

Aceda ao ecrã de presets por uma de duas vias:

- Pelo menu do servidor ativo no separador **Servidores** → **Talkgroups**, ou
- Pelo formulário de edição do servidor → **Presets de Talkgroup**.

A partir desse ecrã pode:

- **Adicionar** um preset com um número de talkgroup e etiqueta (ex.: `1` → "Local", `2` → "ARES")
- **Reordenar** presets arrastando-os
- **Editar ou eliminar** presets existentes
- **Ativar o ícone de auscultadores** num preset para monitorizar esse talkgroup por omissão sempre que se ligar a este servidor

Quando toca no seletor de talkgroup no ecrã PTT, os seus presets aparecem como uma lista de seleção rápida com as suas etiquetas. Pode também introduzir um número de talkgroup manualmente.

### Navegar Pelos Presets

Quando o servidor ativo tem dois ou mais presets, o ecrã PTT mostra botões **‹** e **›** dos dois lados da etiqueta de talkgroup. Toque-os para percorrer os presets (com retorno ao início) sem abrir o seletor.

### Monitorização

O VoxLink pode **monitorizar** talkgroups adicionais enquanto permanece no seu principal. O áudio dos talkgroups monitorizados reproduz juntamente com o seu TG principal — ouve tudo sem mudar.

Há três formas de monitorizar um talkgroup:

1. **Por omissão num preset** — No ecrã de presets, toque no ícone de auscultadores de qualquer preset. Esse talkgroup é monitorizado sempre que se liga ao servidor.
2. **A partir do seletor** — Toque no seletor de talkgroup no ecrã PTT e ative o ícone de auscultadores junto a qualquer preset. As alterações persistem como o valor por omissão do preset.
3. **Monitorizar um TG arbitrário** — No seletor, toque em **Monitorizar outro TG…**, escreva um número e confirme. O TG é adicionado como canal monitorizado para este servidor (sem necessidade de preset). Ative novamente o ícone de auscultadores depois para deixar de monitorizar.

Os talkgroups monitorizados aparecem no ecrã PTT abaixo do indicador do talkgroup principal. Transmite apenas no seu talkgroup principal — a monitorização é apenas de receção.

> A monitorização é útil para manter um ouvido numa rede ou canal de emergência enquanto trabalha num talkgroup diferente.

---

## Nós Ligados

O separador **Estações** lista todos os nós atualmente ligados ao seu talkgroup no refletor. Cada entrada mostra o identificador do nó conforme reportado pelo servidor.

A lista atualiza em tempo real à medida que nós ligam e desligam. Uma lista vazia significa que é a única estação ligada a esse talkgroup.

Nós inativos (ligados mas não recentemente ativos) são agrupados numa secção **Inativos** recolhível no fundo da lista.

---

## Operador Ativo

Enquanto uma estação transmite, o VoxLink mostra a seguinte informação acima do medidor RX no ecrã **PTT**:

| Campo | Exemplo |
|---|---|
| Indicativo | `CT2GNH-M` |
| Nome | `Paulo` |
| Localização | `Aveiro, Portugal` |

Esta informação é transmitida pelo refletor e proveniente dos detalhes de registo da estação transmissora. Nem todos os refletores preenchem todos os campos — alguns podem mostrar apenas o indicativo.
