# Perfis de Servidor

O VoxDMR pode guardar tantas configurações de rede quantas precisares — uma por rede, por shack, por papel, o que fizer sentido. Um **perfil** junta:

- Um **label** (o teu nome para ele)
- Um **DMR ID** (para diferentes IDs ou membros da família partilharem a mesma instalação)
- Um **protocolo** (BrandMeister via Rewind, ou qualquer rede MMDVM/Homebrew)
- Um **servidor** (hostname + porto do master, ou entrada curada, ou personalizado)
- Uma **password** específica daquela rede
- Um **indicativo** (opcional, usado pelas redes Homebrew)
- Os seus próprios **favoritos e aliases de talkgroup** (vê [Talkgroups](./talkgroups#renomear-talkgroups))

Mudar de perfil desliga, troca a configuração toda e volta a ligar.

## Porquê vários perfis?

Alguns casos reais:

- **Estás na BrandMeister e na TGIF.** Redes diferentes, passwords diferentes, números de talkgroup diferentes. Mantém um perfil por rede e muda quando quiseres mudar de "QSY".
- **Tens um rig portátil e um rig de casa com IDs diferentes.** Cada perfil tem o seu DMR ID.
- **Estás a testar um master Homebrew.** Um perfil descartável é mais seguro do que reescrever a tua configuração BrandMeister que funciona.
- **Viajas.** Mantém um master regional por país e muda quando atravessas a fronteira.

:::desktop

### Onde estão

**Definições → Connection** tem um cartão **PROFILES** no topo. Cada perfil aparece como uma linha:

```
● Casa          1234567
  BrandMeister · 2682.master.brandmeister.network:54006        Edit  Delete
```

- O **rádio preenchido** (●) marca o perfil ativo.
- Clica em qualquer rádio vazio (○) para mudar para esse perfil.
- **Label**, **DMR ID**, **protocolo** e **linha de servidor** estão todos visíveis num relance.
- **Delete** fica acinzentado no perfil ativo e no único perfil restante (o VoxDMR precisa sempre de pelo menos um).

### Adicionar um perfil

Clica em **+ Add profile** abaixo da lista. Aparece um formulário inline com:

- **Label** — o teu nome curto para este perfil.
- **DMR ID** — o ID de 7 dígitos que este perfil usa.
- **Password** — a password de rede deste perfil.
- **Callsign** — opcional, usado pelas redes Homebrew.

Sob o cabeçalho **Server**, dois botões permitem-te escolher o protocolo:

- **BrandMeister** — protocolo Rewind. O picker em baixo torna-se o diretório de masters da BrandMeister (puxado em tempo real).
- **Others** — protocolo Homebrew. O picker passa a ser a lista curada de servidores Homebrew (TGIF, FreeDMR, ADN Portugal) com uma opção *Custom server…*.

Para **Custom server…**, aparecem três campos extra:

- **Host** — hostname ou IP do master.
- **Port** — masters Homebrew costumam usar `62031`; masters BrandMeister usam `54006`.
- **Hash format** (só na Homebrew) — **Raw** (por defeito) ou **Hex ASCII**. A maioria das redes Homebrew usa Raw; tenta Hex ASCII só se a autenticação continuar a falhar.

Clica em **Save**. O novo perfil aparece na lista.

### Editar um perfil

Clica em **Edit** em qualquer linha para carregar esse perfil no formulário. O campo **Password** mostra o placeholder *Password (leave blank to keep current)* — só preenche se quiseres mudar. Tudo o resto é editável.

### Mudar de perfil

Clica no rádio de qualquer perfil inativo. O VoxDMR:

1. Desliga-se do servidor atual.
2. Carrega o novo perfil (DMR ID, protocolo, servidor, password, indicativo, aliases, favoritos).
3. Se o **Auto-connect** estiver ativo, liga-se ao novo servidor.

O rodapé do ecrã principal reflete o novo servidor.

### Apagar um perfil

Clica em **Delete** em qualquer linha. Não há confirmação — a linha desaparece. **Delete** está desativado no perfil ativo (muda primeiro) e no único perfil restante.

:::

:::mobile

### Onde estão

Toca no separador **Connection** na barra inferior. O cartão **Identity** no topo mostra o label e DMR ID do perfil ativo — ou *Não configurado* se ainda não tens nenhum. Toca para abrir o ecrã **Profiles**.

Cada perfil é uma linha com um rádio, label, DMR ID e menu overflow (⋮).

### Adicionar um perfil

Toca em **+ Add profile** no fim do ecrã Profiles. O formulário abre como modal fullscreen com os mesmos campos do desktop: **Label**, **DMR ID**, **Password**, **Callsign** e uma secção **Server** com o segmented button **BrandMeister** / **Others**.

**BrandMeister**: toca na linha do servidor para abrir a bottom sheet **BrandMeister servers**. Pesquisa por país ou hostname; toca num master para o selecionar.

**Others**: toca na linha do servidor para abrir a bottom sheet **Servers**. Toca numa das entradas curadas (TGIF, FreeDMR, ADN Portugal) para preencher host + porto + formato de hash. Podes editar tudo manualmente em baixo.

O dropdown **Hash Format** (só Homebrew) oferece **Raw (default)** ou **Hex-ASCII**.

Toca em **Save**.

### Mudar de perfil

Toca no rádio de qualquer perfil inativo. Se estiveres ligado, aparece um snackbar — *A mudar para {label}… a reconectar*. O VoxDMR fecha a ligação antiga e abre a nova.

### Apagar um perfil

Toca no menu overflow (⋮) numa linha e escolhe **Delete profile**. Aparece um diálogo de confirmação. O único perfil restante não pode ser apagado.

:::

## Como os perfis são guardados

:::desktop

Os perfis vivem no `config.toml` no diretório de configuração ([caminhos](./installation#onde-o-voxdmr-desktop-guarda-dados)). Cada perfil é uma tabela `[[profiles]]` com todos os seus campos. Os aliases ficam aninhados por perfil como um mapa `talkgroup_aliases`. O perfil ativo é guardado por índice.

Podes editar o ficheiro à mão para alterações em massa (raro; o editor in-app cobre tudo), mas fecha o VoxDMR primeiro para evitar que as tuas alterações sejam sobrescritas.

:::

:::mobile

Os perfis vivem no diretório de dados privado da app. São geridos inteiramente pela UI; não há acesso direto ao ficheiro no Android.

:::

## Mudar a meio de uma transmissão

Se carregares no rádio de outro perfil enquanto estás a transmitir, o VoxDMR termina a transmissão atual primeiro, depois desliga e troca. Não vais acidentalmente transmitir para a rede errada.

## Próximos passos

- [Talkgroups](./talkgroups) — favoritos, indicador de atividade, aliases por perfil.
- [Resolução de Problemas](./troubleshooting) — o que verificar quando um perfil não liga.
