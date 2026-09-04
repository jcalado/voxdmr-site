# Registo de Alterações

Notas de versão do VoxDMR. Cada página de release no GitHub tem a lista completa de commits e os binários assinados; isto é o resumo humano.

## v0.15.0

::platforms[desktop mobile]

_Lançada em setembro de 2026. Desktop + Android._

Transmissão com as mãos livres, redução de ruído neural no microfone, tema claro, um
assistente de primeira utilização e um modo de condução que transforma um rádio PoC num
painel de instrumentos.

- **VOX — transmitir ao falar.** Ativa-o e a tua voz liga o rádio; o botão de falar tem
  sempre prioridade e o temporizador de corte é sempre aplicado. Está deliberadamente fora
  do caminho: no Android, *Definições → Premir para falar → Avançado: VOX* só abre com um
  toque longo de cinco segundos na primeira vez (nos rádios sem ecrã tátil, manter o OK do
  D-pad também serve); no desktop, cinco cliques no mesmo cabeçalho.
  ⚠️ **Não uses o VOX para ligar outro rádio ou um repetidor à BrandMeister** — as ligações
  não vigiadas violam os termos da BrandMeister e são motivo para banir o teu ID DMR.
  Vê [Modos de PTT](./ptt-modes).
- **Redução de ruído neural na transmissão.** Uma pequena rede neural limpa o microfone
  antes de o codec DMR o ver, com um cursor de intensidade. O codec envia um *modelo* da tua
  voz e não o som em si, por isso o ruído de fundo corrompe-o nos artefactos que as pessoas
  atribuem ao DMR — limpar a entrada ajuda muito mais do que limpar a saída. Cerca de +3 a
  +4 dB em carro, zumbido, vozes de fundo e chiado. **Desligada por predefinição, e vale a
  pena deixá-la desligada num sítio silencioso.** Vê [Definições de áudio](./audio-settings).
- **Tema claro.** Escuro, claro ou seguir o sistema, nas duas plataformas. O escuro continua
  a ser a predefinição e está exatamente como estava; a escolha sobrevive a um reinício e
  entra na cópia de segurança das definições.
- **Assistente de primeira utilização.** Um primeiro arranque guiado nas duas plataformas —
  rede, conta, teste de microfone, vocoder — em vez de um ecrã de definições vazio. Os nomes
  dos talkgroups passam a ser por rede, por isso um talkgroup da FreeDMR já não mostra um
  nome da BrandMeister.
- **Bips para chamadas recebidas, e tons de PTT separados.** Um bip agudo curto quando
  alguém começa a transmitir no teu talkgroup e um grave quando pára, para ouvires o canal
  ficar ocupado sem olhar para o ecrã. A definição única de "tons de PTT" passa a ser duas —
  início e fim — para poderes ficar só com o bip de fim. Vê
  [Definições de áudio](./audio-settings).
- **O modo de condução parece um rádio (rádios PoC).** Nos rádios de painel pequeno como o
  Hytera P50, o modo de condução passa a desenhar uma face de instrumentos: uma barra de
  legendas, uma placa de estado, um medidor de nível segmentado com retenção de pico, uma
  barra de tempo limite enquanto transmites e teclas de canal de arestas vivas. Nos
  telemóveis e tablets nada muda. Vê [Modo de condução](./car-mode).
- **Cartão de chamada no ecrã principal (rádios PoC Hytera).** Nos rádios com o lançador
  Onego, o ecrã principal mostra o talkgroup, quem está a falar e um cronómetro da chamada, e
  o VoxDMR aparece no seletor de cartões do lançador. Vê [Rádios](../radios).
- **LED de estado (rádios Hytera).** O LED de notificação do rádio segue a sessão: verde
  numa chamada a entrar, vermelho enquanto transmites, um piscar laranja lento com a procura
  armada, e ainda indicações opcionais de queda e de ligação ativa. Cinco interruptores
  independentes em Ecrã e energia.
- **Captação de microfone mais limpa (Android).** O VoxDMR pede ao Android o microfone menos
  processado que conseguir e desliga o supressor de ruído, o AGC e o cancelador de eco do
  fabricante na sessão de captação — antes disso, em muitos telemóveis, esses corriam por
  cima do nivelamento do próprio VoxDMR.
- **Correções.** O microfone do auricular Bluetooth volta a funcionar (não enviava nada), e
  nos rádios Hytera as teclas de volume mexem no volume que estás mesmo a ouvir. O tom de PTT
  já não entra no início da tua transmissão. No desktop, fechar a última janela já não deixa
  o processo a correr. As listas de definições no Android libertam a barra de navegação, os
  botões de informação já não prendem o foco do D-pad nos rádios compactos, e a aplicação
  passa a visar o Android 16. Um alias de locutor enviado em texto de 16 bits já não se
  transforma em caracteres chineses a meio da chamada.
  Vê [Resolução de problemas](./troubleshooting).

## v0.14.0

::platforms[desktop mobile]

_Lançada em julho de 2026. Desktop + Android._

Áudio recebido mais alto, um registo de QSOs com localizações e ligações ao QRZ, cópias de
segurança que incluem as tuas definições, e um vocoder muito mais rápido.

- **Áudio recebido mais alto.** O nivelamento automático aponta mais alto, para o áudio
  recebido soar como um rádio e não como um sussurro, e uma nova opção
  **Reforço de RX (+6 dB)** acrescenta mais para ambientes ruidosos.
  ⚠️ **Vens da 0.13.x no desktop?** Liga a caixa do AGC de RX uma vez — a tua configuração
  gravada tem-na desligada. Vê [Definições de áudio](./audio-settings).
- **Guardar tudo.** As cópias de segurança passam a incluir todas as definições da
  aplicação, não só os perfis. Desktop: **Guardar tudo…**; Android: **Definições → Cópia de
  segurança e restauro**. Vê [Perfis de servidor](./server-profiles).
- **O registo de QSOs cresceu.** Os indicativos passam a ligar para o **QRZ.com**, e a
  cidade, o distrito/estado, o país e as bandeiras estão disponíveis como colunas. No
  desktop as colunas redimensionam-se e as linhas abrem uma vista de detalhe.
- **Acessórios de PTT Bluetooth (Android).** Acessórios de PTT externos como o Inrico B01
  passam a funcionar, com carregar-para-falar a sério, e o microfone Bluetooth ganha o seu
  próprio cursor de nível. Vê [Modos de PTT](./ptt-modes).
- **Um vocoder muito mais rápido.** A codificação de transmissão é várias vezes mais rápida,
  resolvendo o áudio de TX entrecortado nos telemóveis mais lentos. A qualidade do áudio não
  muda.
- **Põe-no com o aspeto que quiseres.** Um novo ecrã Interface em ambas as plataformas:
  cores para o cartão de chamada, o distintivo de talkgroup e o botão de PTT, mais controlo
  do tamanho do texto.
- **Ligações `voxdmr://` (desktop).** Clicar numa ligação `voxdmr://tg/91` abre o VoxDMR
  diretamente nesse talkgroup.
- **Um ficheiro de firmware em vez de dois.** A configuração inicial é uma transferência
  mais pequena. As instalações existentes não são afetadas. Vê [Instalação](./installation).
- **A lista de servidores Homebrew atualiza-se sozinha.** Um botão **Atualizar** vai buscar
  o diretório de servidores da comunidade sem esperar por uma atualização da aplicação. Vê
  [Perfis de servidor](./server-profiles).
- **Definições mais claras (Android).** Etiquetas em linguagem simples, com os detalhes
  atrás de um **(i)** tocável. As definições do Modo condução estão agrupadas, e um atalho
  para a otimização de bateria passa a estar em Ecrã e energia.
- **Correções.** A latência de receção já não vai subindo quanto mais tempo ouves, e o
  medidor de RX acompanha o que estás mesmo a ouvir. O scan é limpo corretamente ao
  desligar e mantém-se acessível durante uma chamada. Nos rádios PoC, o botão rotativo dos
  LEX salta um favorito por retenção e o balancim de canal do Motorola ION funciona. Vê
  [Rádios](../radios).

## v0.13.2

::platforms[desktop mobile]

_Lançada em julho de 2026. Desktop + Android._

Uma pequena versão de correções e afinações em ambas as plataformas.

- **A notificação de scan segue o talkgroup ativo (Android).** Durante o scan, a notificação
  de reprodução passa a mostrar o talkgroup que estás mesmo a ouvir, em vez do conjunto
  armado. Vê [Talkgroups](./talkgroups).
- **Divulgação de acessibilidade (Android).** O ecrã Sobre passa a apresentar a divulgação
  de acessibilidade.
- **Corrigida a atualização da base de dados de DMR IDs no Windows (desktop).** Atualizar a
  base de dados de DMR IDs offline já não falha no Windows com "os error 5" (acesso negado).
  Vê [Talkgroups](./talkgroups).
- **Texto do Sobre alargado (desktop).** O texto do ecrã Sobre passa a descrever o VoxDMR
  para além da BrandMeister, refletindo o suporte a outras redes DMR.

Não houve alterações a configuração, caminhos ou semântica de protocolo.

## v0.13.1

::platforms[desktop mobile]

_Lançada em julho de 2026. Desktop + Android._

Uma versão de correção de bugs para as redes Homebrew ("Others").

- **Encaminhamento de áudio no Homebrew.** Corrigido o encaminhamento de áudio nas redes
  Homebrew ("Others"), para que as transmissões passem agora corretamente entre masters na
  rede — ADN, TGIF, FreeDMR e semelhantes. Afeta o desktop e o Android. Vê
  [Perfis de servidor](./server-profiles).

Não houve alterações a configuração, caminhos ou semântica de protocolo.

## v0.13.0

::platforms[desktop mobile]

_Lançada em julho de 2026. Desktop + Android._

Um grande seguimento da v0.12.0: o VoxDMR passa a vigiar um conjunto inteiro de talkgroups
ao mesmo tempo, resolve indicativos offline, conduz a partir de um ecrã de condução
de leitura rápida, e ganhou um registo de atividade a sério — além de uma vaga de suporte
a hardware de rádios PoC e definições de desktop que finalmente igualam as do Android.

- **Scan de talkgroups.** Marca qualquer um dos teus favoritos para scan, arma-o, e o
  VoxDMR vigia-os todos ao mesmo tempo — trava no primeiro talkgroup que fica ativo,
  reproduz-no, aguarda um instante para apanhar uma resposta e depois retoma
  (o primeiro a chegar ganha). O teu próprio DMR ID é sempre vigiado e tem prioridade.
  Carregar no PTT durante a janela de espera fixa esse talkgroup; também podes parar o scan
  a meio de uma chamada para ficar naquela que estás a ouvir. O tempo de espera é um slider
  (**0–30 s, por omissão 4 s**). Vê [Talkgroups](./talkgroups).
- **Recebe sempre as chamadas privadas.** O VoxDMR passa a subscrever permanentemente o teu
  próprio DMR ID em paralelo com o talkgroup selecionado, por isso uma chamada privada
  dirigida a ti já não é descartada enquanto ouves um grupo. Automático, sem definição.
- **Base de dados de DMR IDs offline.** Uma cópia opcional e descarregável da base de dados
  de utilizadores da radioid.net, para que os DMR IDs sejam resolvidos em indicativos de
  imediato e offline. Opt-in — descarrega, atualiza ou apaga em **Definições → DMR IDs** no
  desktop ou no ecrã **Base de dados de DMR IDs** no Android. As pesquisas recorrem à API da
  radioid.net quando um ID não está local.
- **Modo condução (Android).** Um modo de condução em ecrã inteiro, grande e de leitura
  rápida: indicativo de RX em grande, estados de cor inativo → RX → TX, tocar para PTT, e
  entrada automática ao carregar, num dispositivo Bluetooth escolhido, no arranque da app ou
  através de uma tecla de hardware associada. Em **Definições → Modo condução**.
- **Tons de permissão de fala no PTT.** Uma definição opcional (**desligada por omissão**)
  que toca um beep ascendente quando carregas no PTT e um beep descendente quando largas —
  sintetizados localmente, nunca enviados para o ar. Desktop: **Definições → Áudio →
  Transmit**; Android: **Definições → Push-to-talk**. No Android, o aviso do time-out (TOT)
  também passa a apitar.
- **Homebrew, reformulado.** O protocolo **Others** cresceu: a antiga lista de três
  servidores é substituída pelo diretório comunitário `DMR_Hosts.txt` do Pi-Star (~1200
  entradas agrupadas e pesquisáveis, com preenchimento de palavra-passe e uma nota
  *Account required*), o formato de hash de login passa a **Auto** por omissão, e os perfis
  ganham talkgroups estáticos, um ESSID/peer ID, um timeslot por omissão e uma identidade de
  dashboard editável. Passas mesmo a *ouvir* os teus talkgroups estáticos ao estilo de scanner,
  e o TX/RX entre masters funciona. Vê [Perfis de servidor](./server-profiles).
- **Registo de atividade.** O desktop e o Android convergem num único registo de eventos
  (ligação, scan, TX/RX, perfil, backup, firmware, eventos da base de dados de DMR IDs) com um
  interruptor **Verbose** (desligado por omissão) e copiar/partilhar para relatórios de bugs.
  O desktop ganha um cartão **Event Log** no ecrã (Definições → Connection); o registo de QSOs
  ganha um seletor de colunas Hora / Indicativo / Nome / Talkgroup nas duas plataformas.
- **Mais rádios PoC e com teclado (Android).** PTT de hardware no ecrã bloqueado e em segundo
  plano (através de um serviço de acessibilidade, para o Hytera P50 e semelhantes), ciclo de
  talkgroups pelo botão rotativo (Meig P50/P60), associação por scanCode para botões GPIO de
  keycode 0 (Motorola LEX L11e), uma opção de microfone via auricular Bluetooth, uma tecla de
  alternar menu, acordar-ao-carregar e arranque-no-boot para o modo Always-on. Vê [Rádios](../radios).
- **Paridade no desktop.** As definições de push-to-talk passam para um separador **PTT**
  dedicado (com teclas associáveis de talkgroup seguinte/anterior e de alternar scan), e o
  desktop ganha o slider de tempo de espera do scan, os interruptores de medidor de nível/dB e
  o seletor de colunas do registo de QSOs, para igualar o Android.
- **Níveis de áudio manuais por omissão.** O auto-nivelador de RX/TX introduzido na v0.12.0
  passa a estar **desligado** por omissão numa instalação nova, e o interruptor de AGC de TX
  foi removido por completo — o slider de TX é agora sempre um ganho manual de microfone
  (2 dB/passo, 7 = 0 dB, ±12 dB), com o limitador suave ainda aplicado. O AGC de RX continua
  disponível como opt-in. Vê [Definições de áudio](./audio-settings).
- **Fiabilidade.** A reconexão automática restaura sempre o teu último talkgroup (o botão
  rotativo de hardware já não fica morto depois de uma reconexão), e os DMR IDs de BrandMeister
  (Rewind) estão limitados a 7 dígitos no editor de perfis.

O `config.toml` (desktop) e as definições do Android ganham o scan (`scan_talkgroups`,
`scan_hang_secs` — por omissão 4, `scan_toggle_key`/`next_tg_key`/`prev_tg_key`),
`ptt_tones_enabled` (desligado), `log_verbose` (desligado), os interruptores `qso_col_*`, os
campos de Homebrew, e — no Android — as chaves `car_mode_*`. `rx_agc` e `tx_agc` passam a estar
**desligadas** por omissão (vê a nota sob a v0.12.0). A base de dados de DMR IDs offline é um
ficheiro descarregado, não uma chave de configuração. As crates de desktop são
`voxdmr 0.13.0` / `voxdmr-core 0.2.0`.

## v0.12.0

::platforms[desktop mobile]

_Lançada em junho de 2026. Desktop (agora incl. macOS) + Android._

A maior versão até agora: o VoxDMR aguenta as quedas de ligação sozinho, o macOS ganha o seu primeiro build oficial, o motor de áudio nivela-se sozinho, transmitir respeita uma chamada em curso, os teus perfis são portáteis, e os rádios com teclado/PoC ganham navegação completa por D-pad.

- **Reconexão automática.** Quando a ligação cai de forma inesperada — um timeout, um erro do lado do servidor ou uma mudança de rede (Wi-Fi ↔ dados móveis) — o VoxDMR volta a ligar-se sozinho com backoff exponencial (~2 s a crescer até um teto de ~60 s, com jitter, tentativas ilimitadas) e re-subscreve o teu último talkgroup, para regressares onde estavas. Só pára numa desconexão deliberada ou numa falha de autenticação. Ligada por defeito; alterna em **Definições → Connection** no desktop ou **Definições** no Android. Partilhada pelos dois frontends. Vê [Reconexão automática](./auto-reconnect).
- **Build de desktop para macOS.** O macOS é agora um alvo de release — uma `.app` nativa para Apple Silicon (arm64) distribuída num `.dmg`, com um pedido de permissão de microfone na app no primeiro arranque e reprodução de receção CoreAudio sem cortes. Isto resolve a limitação "o macOS ainda não é um alvo de release" anotada na v0.7.0. Macs Intel ainda não têm build.
- **Áudio que se nivela sozinho.** Um auto-nivelador sempre ativo passa a atuar nos caminhos de transmissão e receção — um AGC com gate de ruído adaptativo e limitador suave — para que um microfone demasiado alto deixe de saturar o vocoder e as estações fracas subam para um nível consistente. Os sliders de nível de TX/RX ajustam o alvo para cima ou para baixo (±dB) em vez de funcionarem como ganho bruto. Preferes definir os níveis tu mesmo? Cada direção tem um **interruptor de AGC** que passa a um ganho manual simples _(alterado na v0.13.0 — o nivelador passa a estar desligado por omissão e o interruptor de TX foi removido; vê a entrada da v0.13.0 acima)_. Vê [Definições de áudio](./audio-settings).
- **Bloqueio de canal ocupado (half-duplex).** Carregar no PTT enquanto entra uma chamada já não corta o áudio recebido. A transmissão fica retida até o canal ficar livre, com o aviso *"A receber — aguarde para transmitir"* — a etiqueta normal de half-duplex, tanto no desktop como no Android.
- **Cópia de segurança e restauro de perfis.** Exporta os teus perfis de servidor para um ficheiro e volta a importá-los, com resolução conflito a conflito e uma opção para incluir (ou não) as palavras-passe. O formato é partilhado entre desktop e Android, por isso os perfis movem-se livremente entre os dois. Vê [Perfis de servidor](./server-profiles).
- **Favoritos por perfil.** Os favoritos de talkgroup passam a estar associados ao perfil ativo (os teus favoritos globais são migrados automaticamente), por isso cada rede mantém a sua própria lista.
- **Pensado para rádios com teclado e PoC (Android).** Navegação completa por D-pad com um anel de foco visível em todos os controlos, um modo deslocar/selecionar para listas longas, um debounce do botão rotativo de ciclo de TG (um clique = um favorito), uma opção "Ocultar barra de estado" e umas definições em modo drill-down pesquisável — para o VoxDMR ser totalmente utilizável sem ecrã tátil.
- **Interface renovada.** Um ecrã de ligação redesenhado funde a tua identidade num único cartão principal com troca rápida de perfis e nomes de servidor amigáveis; o seletor de talkgroups move a chamada privada para um menu por linha; e o registo de QSOs fixa-se na chamada mais recente com uma coluna de origem mais larga.
- **Identidade reportada às redes.** O VoxDMR passa a reportar aos masters DMR uma string de versão consciente da plataforma e arquitetura (ex.: `VoxDMR 0.12.0 (android32)` ou `(linux)`), com o URL do projeto a apontar para voxdmr.com.

O `config.toml` (desktop) e as definições do Android ganham as flags `auto_reconnect`, `rx_agc` e `tx_agc`. `auto_reconnect` fica ligada por defeito; `rx_agc` e `tx_agc` saíram ligadas por defeito na v0.12.0 mas **agora ficam desligadas por defeito a partir da v0.13.0** (e `tx_agc` já não tem qualquer efeito). Configurações antigas sem elas assumem esses valores. Nada mais mudou na configuração, caminhos ou semântica de protocolo.

## v0.10.0

::platforms[desktop mobile]

_Lançada em maio de 2026. Desktop + Android._

A grande mudança: o VoxDMR já não é só BrandMeister, nem está limitado a um único servidor. Podes configurar tantos perfis quantos quiseres, cada um preso à sua rede e credenciais, e mudar entre eles com um toque.

- **Protocolo Homebrew (MMDVM_HBP)** ao lado do já existente Rewind. Isto traz **TGIF Network, FreeDMR, ADN.systems** e qualquer outra rede DMR baseada em MMDVM para o VoxDMR. O caminho TX/RX é o mesmo — o tráfego Homebrew é codificado com o mesmo vocoder AMBE+2 e aparece no mesmo cartão de chamada.
- **Lista curada de servidores Homebrew.** Quando escolhes o protocolo **Others**, o picker oferece TGIF Network, FreeDMR United Kingdom e ADN Portugal (2681) à partida, mais uma opção *Custom server…* para tudo o que não esteja listado. A lista vem incluída no binário; faz PR no GitHub para adicionar mais.
- **Toggle de formato de hash** para servidores Homebrew personalizados — **Raw** (a convenção HBlink/MMDVMHost usada por todas as grandes redes) ou **Hex ASCII**, para a rara rede que ainda usa o formato antigo. As entradas curadas vão para Raw por defeito.
- **Perfis de Servidor.** Definições → Connection ganhou um cartão **PROFILES**. Cada perfil junta label, DMR ID, indicativo, protocolo, servidor, password, e os seus próprios favoritos + aliases de talkgroup. Mudar de perfil desliga, troca a configuração toda e volta a ligar.
- **Aliases de talkgroup por perfil.** Clique direito num TG (ou toque longo no Android) para lhe dar um nome personalizado que substitui o da base de dados. O alias é por perfil — os teus perfis BrandMeister e TGIF podem rotular o `91` de formas diferentes. Volta automaticamente ao nome oficial quando não há alias.
- **Picker de TG seccionado.** O picker no ecrã principal agora agrupa em **DMR ID** (quando escreves um ID numérico), **Favourites** e **Results**. Os cabeçalhos só aparecem quando têm linhas. A secção DMR ID expõe tanto *Use as talkgroup* como *Use as private call*, tornando IDs personalizados cidadãos de primeira.
- **App Android.** Toda a pilha de protocolos/perfis vem também no cliente Android — mesmo core Rust, UI Flutter em Material 3, pickers de servidor em bottom sheet, toque longo para renomear. Já disponível na [Google Play](https://play.google.com/store/apps/details?id=com.jcalado.voxdmr).
- **Localização.** Definições, assistente de configuração, modais, toasts e os labels da vista principal foram extraídos para um catálogo de strings. Inglês e Português (Portugal) já estão disponíveis; o seletor de idioma fica em Definições → Interface no desktop e em Definições → Acerca no Android.

Migração da configuração: ficheiros `config.toml` existentes são migrados para um único perfil chamado "Default" com o protocolo Rewind — o teu DMR ID, password, master, favoritos e aliases mantêm-se intactos.

## v0.9.0

::platforms[desktop]

_Lançada em maio de 2026._

Adiciona **auto-atualização integrada**. O VoxDMR passa a verificar novas versões no arranque e a pedido, e pode instalá-las sem sair da app — sem ida ao browser, sem installer para procurar.

- **Aviso no arranque.** Quando há um build mais recente, o VoxDMR abre um modal com a versão, um link *What's new* e três escolhas: **Atualizar agora**, **Saltar esta versão** (silenciada para sempre) ou **Lembrar mais tarde** (24 h de cooldown).
- **Verificação manual.** Definições → Sobre tem um botão **Check for updates**. O resultado — *A verificar…*, *Estás na última versão*, *Atualização disponível* ou erro — aparece em texto pequeno por baixo do botão, para não teres de desviar o olhar.
- **Instalação atómica e verificada.** O binário é descarregado com barra de progresso e botão de cancelar, verificado por SHA-256 contra o ficheiro `SHA256SUMS` da release, e trocado atomicamente — seguro em Windows, mesmo com o `.exe` em execução. Um checksum errado aborta e nunca sobrepõe o build atual.
- **Estado pós-instalação claro.** Quando a instalação termina, ficas com um clique de **Reiniciar agora**, ou podes continuar a trabalhar e apanhar o build novo no próximo arranque. Se fechaste o modal a meio do fluxo, a linha de estado do rodapé confirma a instalação a verde para o resultado não passar despercebido.
- **Rodapé-como-toast.** Mensagens transitórias do auto-update partilham o slot de estado à direita no rodapé durante ~5 segundos, em vez de empurrarem o resto da UI para baixo.

Apenas canal estável — pre-releases ficam de fora. A verificação fala com um repositório público fixo (`jcalado/voxdmr-site`); zero telemetria, zero analítica, zero registo. O `config.toml` ganha uma secção `[updates]` que guarda versões saltadas e o timestamp do *Remind me later*; configurações antigas sem ela assumem os defaults documentados.

## v0.8.0

::platforms[desktop]

_Lançada em maio de 2026._

Adiciona um **Time-Out Timer (TOT)** para que um PTT preso ou uma transmissão muito longa não monopolize um talkgroup — comportamento clássico de rádio, agora disponível do lado do cliente.

- **Quatro modos:** Off, Warn only, Warn then cutoff (por omissão), Hard cutoff. Configurável em Definições → Interface.
- **Aviso visual + sonoro.** O cronómetro de TX por baixo do botão PTT muda de cor (cinza → âmbar → vermelho); um beep curto toca no dispositivo de áudio local no momento do aviso e novamente no cutoff. O sidetone nunca vai para a rede.
- **Defaults sensatos.** 180 s de duração, 15 s de antecedência para o aviso, ambas as superfícies de aviso ligadas. Duração limitada a 190 s — valores acima seriam silenciosamente cortados pelo próprio forwarding cutoff da BrandMeister.
- **Libertação automática no cutoff.** Atingir a duração faz uma libertação limpa do PTT por ti; volta a carregar para continuar a falar.

Polimento de UX adjacente:

- O cartão de estado no topo agora muda para **A transmitir → TG …** a vermelho enquanto estás keyed up, em vez de continuar a mostrar **Inativo**.
- A janela de definições abre 150 px mais alta e o painel da direita faz scroll quando o conteúdo transborda, para que separadores que crescem (Interface em particular) continuem usáveis em ecrãs mais pequenos.

O `config.toml` ganha uma nova secção `[tot]`; configurações antigas que não a tenham assumem os defaults documentados. Nenhuma variável de ambiente, caminho ou semântica de protocolo mudou.

## v0.7.0 (primeira versão pública)

::platforms[desktop]

_Lançada em abril de 2026. Linux x86_64 + Windows x86_64._

A primeira build do VoxDMR distribuída como binário descarregável. Tudo antes disto foi interno e nunca foi anunciado.

O que inclui:

- **Cliente DMR BrandMeister** com RX e TX completos sobre o protocolo Rewind. Autentica-te com o teu DMR ID e uma hotspot security password, subscreve talkgroups, transmite e recebe voz AMBE+2.
- **Carregamento de firmware em runtime.** O firmware do MD-380 que o vocoder AMBE+2 precisa é descarregado de fontes terceiras no primeiro arranque (ou fornecido manualmente para máquinas offline). O binário em si não contém bytes de firmware, e é isso que torna possível distribuí-lo. Verificado por SHA-256 antes de ser aceite.
- **Indicador ao vivo de atividade de talkgroup.** Os favoritos mostram um ponto colorido alimentado pela feed WebSocket de last-heard da BrandMeister: verde = ativo, âmbar = tráfego recente com o indicativo do emissor, cinza = inativo. TTL de 30 segundos.
- **PTT configurável.** Modos push-to-talk ou toggle. Barra de Espaço por omissão; muda para quase qualquer tecla única.
- **Indicadores de áudio.** Medidores TX e RX em estilo LED de 24 segmentos com pico mantido, zonas de cor (verde / amarelo / vermelho) e um indicador CLIP com tranca.
- **Seletor de talkgroups.** Pesquisa a base de dados BrandMeister incluída por nome ou ID, guarda favoritos, arrasta para reordenar, marca destinos de chamada privada. Aceita IDs personalizados via Enter.
- **Diretório de masters ao vivo.** As definições de ligação puxam a lista atual de masters BrandMeister no arranque, com fallback embutido se a API estiver inalcançável.
- **Multiplataforma.** Linux nativo (ALSA / PipeWire / PulseAudio via cpal) e Windows (WASAPI). Um único binário por plataforma; sem instalador, sem serviços de sistema.

Limitações conhecidas:

- macOS ainda não é um alvo de release.
- O binário de Windows ainda não está assinado digitalmente. O SmartScreen pede confirmação no primeiro arranque. Clica em **Mais informações** → **Executar mesmo assim**.
- Os downloads HTTPS (firmware, diretório de masters) não respeitam as definições de proxy do sistema. Usa o caminho de ficheiros manuais ou corre a partir de uma rede sem proxy.

Vê a [página de release](https://github.com/jcalado/voxdmr-site/releases/tag/v0.7.0) para binários e SHA-256, e o [guia de instalação](./installation) para começar.
