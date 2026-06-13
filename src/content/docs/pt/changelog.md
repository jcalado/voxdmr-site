# Registo de Alterações

Notas de versão do VoxDMR. Cada página de release no GitHub tem a lista completa de commits e os binários assinados; isto é o resumo humano.

## v0.12.0

::platforms[desktop mobile]

_Lançada em junho de 2026. Desktop (agora incl. macOS) + Android._

Duas grandes mudanças: o VoxDMR aguenta agora as quedas de ligação sozinho, e o macOS ganha o seu primeiro build oficial.

- **Reconexão automática.** Quando a ligação cai de forma inesperada — um timeout, um erro do lado do servidor ou uma mudança de rede (Wi-Fi ↔ dados móveis) — o VoxDMR volta a ligar-se sozinho com backoff exponencial (~2 s a crescer até um teto de ~60 s, com jitter, tentativas ilimitadas) e re-subscreve o teu último talkgroup, para regressares onde estavas. Só pára numa desconexão deliberada ou numa falha de autenticação. Ligada por defeito; alterna em **Definições → Connection** no desktop ou **Definições** no Android. Partilhada pelos dois frontends. Vê [Reconexão automática](./auto-reconnect).
- **Build de desktop para macOS.** O macOS é agora um alvo de release — uma `.app` nativa para Apple Silicon (arm64) distribuída num `.dmg`, com um pedido de permissão de microfone na app no primeiro arranque e reprodução de receção CoreAudio sem cortes. Isto resolve a limitação "o macOS ainda não é um alvo de release" anotada na v0.7.0. Macs Intel ainda não têm build.

O `config.toml` (desktop) e as definições do Android ganham uma flag `auto_reconnect`, ligada por defeito; configurações antigas sem ela assumem esse valor. Nada mais mudou na configuração, caminhos ou semântica de protocolo.

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
