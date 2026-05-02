# Registo de Alterações

Notas de versão do VoxDMR. Cada página de release no GitHub tem a lista completa de commits e os binários assinados; isto é o resumo humano.

## v0.9.0

_Lançada em maio de 2026._

Adiciona **auto-atualização integrada**. O VoxDMR passa a verificar novas versões no arranque e a pedido, e pode instalá-las sem sair da app — sem ida ao browser, sem installer para procurar.

- **Aviso no arranque.** Quando há um build mais recente, o VoxDMR abre um modal com a versão, um link *What's new* e três escolhas: **Atualizar agora**, **Saltar esta versão** (silenciada para sempre) ou **Lembrar mais tarde** (24 h de cooldown).
- **Verificação manual.** Definições → Sobre tem um botão **Check for updates**. O resultado — *A verificar…*, *Estás na última versão*, *Atualização disponível* ou erro — aparece em texto pequeno por baixo do botão, para não teres de desviar o olhar.
- **Instalação atómica e verificada.** O binário é descarregado com barra de progresso e botão de cancelar, verificado por SHA-256 contra o ficheiro `SHA256SUMS` da release, e trocado atomicamente — seguro em Windows, mesmo com o `.exe` em execução. Um checksum errado aborta e nunca sobrepõe o build atual.
- **Estado pós-instalação claro.** Quando a instalação termina, ficas com um clique de **Reiniciar agora**, ou podes continuar a trabalhar e apanhar o build novo no próximo arranque. Se fechaste o modal a meio do fluxo, a linha de estado do rodapé confirma a instalação a verde para o resultado não passar despercebido.
- **Rodapé-como-toast.** Mensagens transitórias do auto-update partilham o slot de estado à direita no rodapé durante ~5 segundos, em vez de empurrarem o resto da UI para baixo.

Apenas canal estável — pre-releases ficam de fora. A verificação fala com um repositório público fixo (`jcalado/voxdmr-site`); zero telemetria, zero analítica, zero registo. O `config.toml` ganha uma secção `[updates]` que guarda versões saltadas e o timestamp do *Remind me later*; configurações antigas sem ela assumem os defaults documentados.

## v0.8.0

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
