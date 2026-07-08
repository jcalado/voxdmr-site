# Perfis de Servidor

O VoxDMR pode guardar tantas configurações de rede quantas precisares — uma por rede, por shack, por papel, o que fizer sentido. Um **perfil** junta:

- Um **label** (o teu nome para ele)
- Um **DMR ID** (para diferentes IDs ou membros da família partilharem a mesma instalação)
- Um **protocolo** (BrandMeister via Rewind, ou qualquer rede MMDVM/Homebrew)
- Um **servidor** (hostname + porto do master, escolhido de um diretório de rede ou introduzido à mão)
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

![VoxDMR no computador, Definições → Connection: um cartão PROFILES a listar os perfis guardados (cada um com um rádio, label, DMR ID, protocolo e linha de servidor, além de Edit e Delete), por cima do cartão de estado CONNECTION e de um registo de eventos](/screenshots/desktop-server-profiles.webp)

### Adicionar um perfil

Clica em **+ Add profile** abaixo da lista. Aparece um formulário inline com:

- **Label** — o teu nome curto para este perfil.
- **DMR ID** — o ID que este perfil usa. Perfis BrandMeister (Rewind) estão limitados a 7 dígitos (máx. `9999999`); perfis Others (Homebrew) aceitam qualquer comprimento.
- **Password** — a password de rede deste perfil.
- **Callsign** — opcional, usado pelas redes Homebrew.

![O formulário Add profile do VoxDMR no computador com o protocolo Others selecionado: campos Label, DMR ID, Password e Callsign, os botões BrandMeister/Others, um dropdown de servidor e os campos inline ESSID, Static talkgroups, Location, URL e Default timeslot por cima de uma secção Advanced recolhida](/screenshots/desktop-profile-form.webp)

Sob o cabeçalho **Server**, dois botões permitem-te escolher o protocolo:

- **BrandMeister** — protocolo Rewind. O picker em baixo torna-se o diretório de masters da BrandMeister (puxado em tempo real).
- **Others** — protocolo Homebrew. O picker passa a ser o **diretório de servidores Homebrew**: a lista comunitária Pi-Star `DMR_Hosts.txt` (~1200 masters, agrupados por rede e pesquisáveis). Escolher um preenche host, porto e formato de hash, e pré-preenche a password quando a rede publica uma partilhada. As redes que exigem registo prévio ficam marcadas com *Account required*. Os masters BrandMeister são excluídos — pertencem a um perfil BrandMeister. Uma opção *Custom server…* permite introduzir um à mão.

![O dropdown do diretório de servidores Homebrew aberto no formulário de perfil do VoxDMR no computador: entradas agrupadas por rede (ADN Systems — FD ADN 2021 Greece, 2061 Belgium, 2081 France-Francophonie…), cada uma com o respetivo endereço host:port](/screenshots/desktop-server-directory.webp)

Para **Custom server…**, aparecem dois campos extra:

- **Host** — hostname ou IP do master.
- **Port** — masters Homebrew costumam usar `62031`.

Não podes apontar um perfil **Others** a um master BrandMeister — o VoxDMR recusa-o com *Os masters BrandMeister têm de usar o protocolo BrandMeister.* Usa um perfil BrandMeister para esses. Os perfis Homebrew têm mais alguns campos — um timeslot por defeito, static talkgroups, um ESSID e a identidade do dashboard — com apenas o formato de hash de login guardado numa secção **Advanced** (vê [Campos de perfil Homebrew](#campos-de-perfil-homebrew)).

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

Toca no separador **Connection** na barra inferior. O cartão **Identity** no topo mostra o perfil ativo — ou *Não configurado* se ainda não tens nenhum — e por baixo uma lista **Switch identity** dos teus outros perfis. Toca em qualquer um para mudar para ele sem sair do ecrã.

![O separador Connection no VoxDMR para Android: o perfil ativo num cartão em destaque no topo, com uma lista Switch identity dos restantes perfis guardados por baixo](/screenshots/android-profiles.webp)

Para a lista completa — adicionar, editar ou apagar — toca no cartão **Identity** para abrir o ecrã **Profiles**, onde cada perfil é uma linha com um rádio, label, DMR ID e menu overflow (⋮).

### Adicionar um perfil

Toca em **+ Add profile** no fim do ecrã Profiles. O formulário abre como modal fullscreen com os mesmos campos do desktop: **Label**, **DMR ID**, **Password**, **Callsign** e uma secção **Server** com o segmented button **BrandMeister** / **Others**.

![O formulário Add profile no VoxDMR para Android com o protocolo Others selecionado, mostrando os campos Label, DMR ID, Password, o segmented button BrandMeister/Others, Callsign, ESSID e Default timeslot, além de um botão Pick server](/screenshots/android-profile-form.webp)

**BrandMeister**: toca na linha do servidor para abrir a bottom sheet **BrandMeister servers**. Pesquisa por país ou hostname; toca num master para o selecionar.

**Others**: toca no botão **Pick server** para abrir a bottom sheet **Servers** — o diretório Pi-Star `DMR_Hosts.txt` pesquisável (~1200 masters, agrupados por rede). Toca num para preencher host + porto + formato de hash, com a password pré-preenchida quando a rede publica uma partilhada; as redes que exigem conta primeiro ficam marcadas com *Account required*. Os masters BrandMeister são excluídos. Podes editar os campos manualmente em baixo, ou introduzir um servidor personalizado à mão.

![A bottom sheet Servers no VoxDMR para Android: uma caixa de pesquisa com "Search by name, host or network" por cima do diretório Pi-Star, agrupado sob um cabeçalho "ADN Systems" com entradas como FD ADN 2021 Greece e os respetivos endereços host:port](/screenshots/android-server-directory.webp)

Não podes apontar um perfil **Others** a um master BrandMeister — o VoxDMR recusa-o com *Os masters BrandMeister têm de usar o protocolo BrandMeister.* Os perfis Homebrew têm mais alguns campos — um timeslot por defeito, static talkgroups, um ESSID e a identidade do dashboard — com apenas o formato de hash de login guardado numa secção **Advanced options** (vê [Campos de perfil Homebrew](#campos-de-perfil-homebrew)).

Toca em **Save**.

### Mudar de perfil

Toca no rádio de qualquer perfil inativo. Se estiveres ligado, aparece um snackbar — *A mudar para {label}… a reconectar*. O VoxDMR fecha a ligação antiga e abre a nova.

### Apagar um perfil

Toca no menu overflow (⋮) numa linha e escolhe **Delete profile**. Aparece um diálogo de confirmação. O único perfil restante não pode ser apagado.

:::

## Campos de perfil Homebrew

Quando escolhes **Others**, o formulário do perfil ganha alguns campos extra para redes Homebrew/MMDVM. Aplicam-se apenas a perfis Others — os perfis BrandMeister ignoram-nos — e os valores por defeito servem para a maioria das redes. Todos, exceto o formato de hash, aparecem diretamente no formulário:

- **Default timeslot** — **TS1** ou **TS2** (por defeito **TS2**). O VoxDMR apresenta-se como um hotspot simplex/DMO, portanto os masters são efetivamente só TS2; deixa em TS2 a menos que a rede diga o contrário.
- **Static talkgroups** — separados por vírgulas (ex.: `91, 913`), registados na ligação. O VoxDMR agora também os *reproduz* ao estilo scanner, e carregar no PTT durante o hang de um estático encaminha a tua resposta para lá. (A TGIF não suporta estáticos do lado do servidor.)
- **ESSID (repeater ID)** — dois dígitos opcionais (0–99). O peer ID passa a ser DMR ID × 100 + ESSID, para poderes correr vários hotspots num só DMR ID. Em branco = DMR ID simples.
- **Location** e **URL** — a identidade mostrada no dashboard do master. O teu indicativo é sempre enviado.

Apenas o **formato de hash de login** fica atrás de uma secção:

:::desktop

Expande **Advanced** no fim do formulário do perfil para o **Login hash format** — **Auto (recommended)**, **Raw** ou **Hex-ASCII**. O Auto tenta Raw e depois repete com Hex-ASCII se o login for rejeitado, por isso raramente lhe mexes.

![A secção Advanced expandida do formulário de perfil do VoxDMR no computador, a mostrar o formato de hash como três botões — Auto, Raw e Hex ASCII — com o Auto selecionado](/screenshots/desktop-homebrew-advanced.webp)

:::

:::mobile

Toca em **Advanced options** no fim do formulário para o **Login hash format** — **Auto (recommended)**, **Raw** ou **Hex-ASCII**. O Auto tenta Raw e depois repete com Hex-ASCII se o login for rejeitado, por isso raramente lhe mexes.

![A metade inferior do formulário Add profile no VoxDMR para Android: ESSID, Default timeslot (TS1/TS2), um botão Pick server, Host e Port 62031, Static talkgroups, Location e URL, e depois uma secção Advanced options expandida com o Login hash format em Auto (recommended)](/screenshots/android-homebrew-advanced.webp)

:::

## Como os perfis são guardados

:::desktop

Os perfis vivem no `config.toml` no diretório de configuração ([caminhos](./installation#onde-o-voxdmr-desktop-guarda-dados)). Cada perfil é uma tabela `[[profiles]]` com todos os seus campos. Os aliases ficam aninhados por perfil como um mapa `talkgroup_aliases`. O perfil ativo é guardado por índice.

Podes editar o ficheiro à mão para alterações em massa (raro; o editor in-app cobre tudo), mas fecha o VoxDMR primeiro para evitar que as tuas alterações sejam sobrescritas.

A latitude e longitude para o dashboard Homebrew são só do `config.toml` — não há UI para elas.

:::

:::mobile

Os perfis vivem no diretório de dados privado da app. São geridos inteiramente pela UI; não há acesso direto ao ficheiro no Android.

:::

## Mudar a meio de uma transmissão

Se carregares no rádio de outro perfil enquanto estás a transmitir, o VoxDMR termina a transmissão atual primeiro, depois desliga e troca. Não vais acidentalmente transmitir para a rede errada.

## Próximos passos

- [Talkgroups](./talkgroups) — favoritos, indicador de atividade, aliases por perfil.
- [Resolução de Problemas](./troubleshooting) — o que verificar quando um perfil não liga.
