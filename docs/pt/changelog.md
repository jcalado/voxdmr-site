# Registo de Alterações

Notas de versão do VoxDMR. Cada página de release no GitHub tem a lista completa de commits e os binários assinados; isto é o resumo humano.

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

- macOS ainda não é um alvo de release. Builds a partir do código-fonte funcionam mas não são testadas em CI.
- O binário de Windows ainda não está assinado digitalmente. O SmartScreen pede confirmação no primeiro arranque. Clica em **Mais informações** → **Executar mesmo assim**.
- Os downloads HTTPS (firmware, diretório de masters) não respeitam as definições de proxy do sistema. Usa o caminho de ficheiros manuais ou corre a partir de uma rede sem proxy.

Vê a [página de release](https://github.com/jcalado/dmr-input/releases/tag/v0.7.0) para binários e SHA-256, e o [guia de instalação](./installation) para começar.
