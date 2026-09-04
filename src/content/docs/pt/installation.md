# Instalação

O VoxDMR corre em Android, Linux e Windows. Escolhe a tua plataforma abaixo.

## Requisitos

- **DMR ID**: obtém um em [radioid.net](https://radioid.net) se ainda não tiveres. Gratuito, requer licença válida de radioamador.
- **Versão do Android** (apenas Android): Android 7.0 (Nougat) ou mais recente — API nível 24+.
- **Uma password de rede**:
  - Para a **BrandMeister**: a tua hotspot security password em [BrandMeister SelfCare](https://brandmeister.network/), no campo _Hotspot security password_. **Não é a password da tua conta BrandMeister** — é uma string separada que defines tu próprio no SelfCare.
  - Para a **FreeDMR**: a password pública documentada (`passw0rd` no hotspot oficial do Reino Unido).
  - Para **TGIF / ADN / outras redes Homebrew**: o que o operador publicar. Muitas redes baseadas em MMDVM aceitam qualquer password, já que identificam-te pelo DMR ID.

:::mobile

A versão Android do VoxDMR está publicada na Google Play.

1. Abre a [página do VoxDMR na Play Store](https://play.google.com/store/apps/details?id=com.jcalado.voxdmr).
2. Toca em **Instalar**.
3. Abre a app.

O primeiro arranque abre o [assistente de configuração](#primeiro-arranque-o-assistente-de-configuração) — firmware do vocoder, indicativo e DMR ID, uma rede, talkgroups e um teste de microfone, por esta ordem.

Uma coisa que o assistente não cobre:

- **Otimização de bateria**: em alguns dispositivos (Xiaomi, Samsung, OnePlus, Huawei) o Android pode fechar a app agressivamente em segundo plano. Abre **Definições → Background** na app para conceder *Ignorar otimização de bateria* e, onde estiver disponível, *Autostart*.

### Rádios PoC e dispositivos de 32 bits

Muitos rádios PoC (push-to-talk over cellular) não trazem a Google Play Store e a maioria corre uma versão **de 32 bits** do Android, mais antiga, que a versão da Play não consegue instalar. Para esses casos, o VoxDMR publica também um APK autónomo no GitHub Releases.

Se vais instalar num rádio PoC (ou em qualquer dispositivo Android de 32 bits), faz sideload da versão fora da Play Store:

1. No rádio, abre a [página da última release](https://github.com/jcalado/voxdmr-site/releases/latest).
2. Descarrega o **APK de 32 bits (`armeabi-v7a`)**. A maioria dos rádios PoC é de 32 bits, por isso, se tiveres dúvidas, escolhe este — a versão de 64 bits (`arm64-v8a`) não instala num dispositivo de 32 bits.
3. Quando o Android pedir, permite instalações a partir do teu navegador ou gestor de ficheiros (**Definições → Apps → Acesso especial → Instalar apps desconhecidas**).
4. Abre o APK descarregado e toca em **Instalar**, depois abre a app.

O primeiro arranque funciona exatamente como na instalação pela Play Store acima: o mesmo [assistente de configuração](#primeiro-arranque-o-assistente-de-configuração), feito para ser conduzido tanto com D-pad como por toque.

### Onde o Android guarda dados

Os dados da app ficam no diretório privado padrão do Android. Desinstalar a app remove configuração, firmware e logs.

:::

:::desktop

A versão desktop é distribuída como um único binário autocontido. Sem instalador, sem gestor de pacotes, sem serviços de sistema. Transferir, verificar, executar.

### Requisitos por plataforma

- **Linux:** suporte ALSA (`libasound2` em Debian/Ubuntu/Mint; `alsa-lib` em Arch; já incluído na maioria das distros).
- **Windows:** Windows 10 1809 ou posterior (x64). Todas as outras dependências estão estaticamente ligadas.

### Linux (x86_64)

```bash
# Transferir
curl -LO https://github.com/jcalado/voxdmr-site/releases/latest/download/VoxDMR-linux-x86_64
curl -LO https://github.com/jcalado/voxdmr-site/releases/latest/download/SHA256SUMS

# Verificar
sha256sum -c SHA256SUMS --ignore-missing

# Executar
chmod +x VoxDMR-linux-x86_64
./VoxDMR-linux-x86_64
```

### Windows (x86_64)

1. Abre a [página da última release](https://github.com/jcalado/voxdmr-site/releases/latest).
2. Transfere `VoxDMR-windows-x86_64.exe`.
3. Opcional mas recomendado: transfere também `SHA256SUMS` e verifica no PowerShell:
   ```powershell
   $expected = (Get-Content SHA256SUMS | Select-String 'VoxDMR-windows-x86_64.exe').ToString().Split(' ')[0]
   $actual = (Get-FileHash .\VoxDMR-windows-x86_64.exe -Algorithm SHA256).Hash.ToLower()
   if ($expected -eq $actual) { "OK" } else { "MISMATCH" }
   ```
4. Faz duplo-clique em `VoxDMR-windows-x86_64.exe` para abrir.

Na primeira execução, o Windows SmartScreen pode avisar que a app é de um "publicador desconhecido". O VoxDMR ainda não está assinado digitalmente. Clica em **Mais informações** → **Executar mesmo assim** para continuar.

### Onde o VoxDMR Desktop guarda dados

O VoxDMR segue as convenções do sistema operativo para configuração, dados e logs:

| Tipo | Linux | Windows | macOS¹ |
|---|---|---|---|
| Firmware | `~/.local/share/voxdmr/firmware/` | `%APPDATA%\voxdmr\firmware\` | `~/Library/Application Support/voxdmr/firmware/` |
| Configuração | `~/.config/voxdmr/` | `%APPDATA%\voxdmr\` | `~/Library/Application Support/voxdmr/` |
| Logs | `~/.local/state/voxdmr/logs/` | `%LOCALAPPDATA%\voxdmr\logs\` | `~/Library/Logs/voxdmr/` |

¹ macOS ainda não é um alvo de release. Os caminhos estão listados para referência futura.

Para sobrepor a localização do firmware (e.g. para empacotadores ou instalações em sandbox), define `VOXDMR_FIRMWARE_DIR` antes de arrancar:

```bash
VOXDMR_FIRMWARE_DIR=/opt/voxdmr/firmware ./VoxDMR-linux-x86_64
```

A app também procura em `<exe-dir>/firmware/`. Coloca os ficheiros de firmware ao lado do binário para uma instalação totalmente portátil (pen USB, bundle arquivado, etc.).

### Atualizar

Builds recentes do desktop incluem **atualização automática dentro da app** — no arranque (e em Definições → Acerca → Procurar atualizações), o VoxDMR oferece-se para transferir e substituir o binário de forma atómica, verificado por SHA-256 em todo o caminho. Também podes continuar a atualizar manualmente: transfere o novo binário da [página de releases](https://github.com/jcalado/voxdmr-site/releases/latest), substitui o antigo e abre. Configuração, favoritos, perfis, aliases e firmware mantêm-se entre atualizações.

### Desinstalar

O VoxDMR Desktop é um único binário sem instalador. Apaga o binário para remover a app. Para também remover configuração, firmware e logs, apaga os três diretórios listados acima.

:::

## Primeiro arranque: o assistente de configuração

Na primeira vez que o VoxDMR arranca sem perfil guardado, abre uma configuração guiada em vez de te deixar num ecrã de definições vazio. Percorre-o uma vez e ficas com um perfil guardado, os teus talkgroups fixados, o teste de eco do Papagaio pronto, o microfone verificado e — se tiveres introduzido uma palavra-passe — uma ligação ativa.

Nada do que escolhes aqui é permanente; está tudo nas Definições depois.

:::mobile

No máximo sete passos numerados, entre um ecrã de boas-vindas e um resumo. Dois deles são condicionais — o passo **Vocoder** só aparece se o firmware ainda não estiver instalado, e o passo da conta apenas para redes que precisem de uma — por isso uma segunda passagem na FreeDMR são cinco.

:::

:::desktop

No máximo cinco passos numerados, terminando num resumo. O passo **Vocoder** só aparece se o firmware ainda não estiver instalado, por isso uma segunda passagem são quatro.

:::

### Vocoder — a instalação única do firmware

O VoxDMR precisa do firmware MD-380 para codificar e descodificar áudio DMR: é o vocoder AMBE+2. Não vem **incluído na app** — por razões legais o VoxDMR obtém-no diretamente de fontes terceiras para o teu dispositivo e nunca faz passar os bytes por nós. Seja qual for o caminho, é verificado por SHA-256 antes de ser escrito no disco.

:::mobile

![Passo 1 de 7 do assistente de configuração do VoxDMR para Android, "Vocoder": um cartão ESTADO com "Não instalado", um botão vermelho Descarregar, um botão "Escolher um ficheiro…" e uma nota a oferecer extrair o firmware de um zip TYT que já tenhas](/screenshots/android-onboarding-vocoder.webp)

:::

Duas formas de o fazer:

- **Descarregar** (recomendado) obtém o arquivo do firmware de [md380.org](https://md380.org/firmware/orig/TYT-Tytera-MD-380-FW-v232.zip) — cerca de 2 MB na rede — e desembrulha-o num único `D002.032.bin` de 994 KB. Alguns segundos numa ligação normal.
- **O seletor de ficheiros** ao lado é a saída de emergência quando a máquina não consegue alcançar esse URL (proxy corporativo, sem rede, firewall restritiva). Aceita o zip do firmware TYT, o `.bin` embrulhado do fabricante, ou um `D002.032.bin` já desembrulhado; não filtra por extensão, porque as pessoas renomeiam transferências, por isso o VoxDMR analisa o conteúdo e percebe qual dos três lhe deste.

:::mobile

Os botões dizem **Descarregar** e **Escolher um ficheiro…**, e o cartão de estado passa por **Não instalado** → uma barra de progresso → **Instalado e verificado**.

:::

:::desktop

Os botões dizem **Download (≈2 MB)** e **Choose existing files…**, e o cartão passa por **Not installed** → uma barra de progresso → **Ready**, *RX/TX audio good to go*.

![Passo 1 de 5 do assistente de configuração do VoxDMR para computador, "Vocoder": um cartão FIRMWARE com "Not installed", o URL de origem md380.org/firmware/orig/…v232.zip indicado como obtido diretamente para a tua máquina, e os botões "Download (≈2 MB)" e "Choose existing files…" por cima de uma nota de que sem ele o VoxDMR não consegue enviar nem receber áudio](/screenshots/desktop-onboarding-vocoder.webp)

:::

O passo pode ser ignorado de propósito: um primeiro arranque sem rede, ou um servidor em baixo, não pode ser um beco sem saída. Ignora-o e o assistente continua, o resumo final avisa-te que o áudio não vai funcionar, e podes instalar o firmware depois em **Definições → Firmware**. A transferência também sobrevive ao passo — começa-a, carrega em Continuar, e continua a correr enquanto preenches o resto.

> **A atualizar da v0.13.x ou anterior?** A configuração costumava obter um segundo ficheiro, `d02032-core.img`. Desde a v0.14.0 **já não é descarregado nem necessário**. Uma cópia existente no disco continua a funcionar, por isso nada quebra numa atualização — só não precisas dela numa instalação de raiz. Vê o [changelog](./changelog).

### A tua estação — indicativo e DMR ID

As duas coisas que todas as redes precisam de saber sobre ti, num só ecrã.

:::mobile

![O passo "A sua estação" do assistente de configuração do VoxDMR para Android com o campo Indicativo a mostrar CT7BLE sob um visto verde "Indicativo válido", o campo DMR ID a mostrar 2680513 sob um visto verde "Portugal — a partir do seu DMR ID", e uma nota a apontar para radioid.net](/screenshots/android-onboarding-station.webp)

:::

:::desktop

![O passo "Your station" do assistente de configuração do VoxDMR para computador: os campos Callsign e DMR ID lado a lado com CT7BLE e 2680513, com uma nota verde "Valid callsign" por baixo de um e uma bandeira de Portugal junto a "Portugal — from your DMR ID" por baixo do outro](/screenshots/desktop-onboarding-station.webp)

:::

A validação do indicativo é propositadamente permissiva — apanha gralhas, não indicativos invulgares, e a verificação que conta é a da própria rede. O DMR ID é validado apenas pelo comprimento (mínimo de quatro dígitos); quando o prefixo do país é um que o VoxDMR reconhece, o campo confirma-o (*Portugal — a partir do seu DMR ID*). Um país não reconhecido é informativo e nunca bloqueia.

O teu DMR ID faz aqui mais trabalho do que parece. É o prefixo do país que ordena a lista de servidores e semeia as sugestões de talkgroups mais à frente, por isso se voltares atrás para corrigir uma gralha, tudo o que vem a seguir é recalculado.

Ainda sem ID? A [radioid.net](https://radioid.net) emite-os gratuitamente mediante a tua licença.

### Rede, e qual servidor

Onde a tua estação se liga: BrandMeister, TGIF, ADN Systems, FreeDMR, ou um master personalizado — qualquer servidor compatível com Homebrew/MMDVM que seja teu.

:::mobile

![O passo "Rede" do assistente de configuração do VoxDMR para Android: BrandMeister selecionado a vermelho no topo de uma lista com TGIF Network, ADN Systems, FreeDMR e Custom master por baixo, cada um com uma descrição de uma linha, e uma linha "Master sugerido: 2682 · PT" por baixo](/screenshots/android-onboarding-network.webp)

:::

O assistente nunca nomeia o protocolo. A rede que escolhes é que o decide — Rewind para a BrandMeister, Homebrew para as restantes — e não há aqui nenhuma decisão útil a tomar. Escolhe a BrandMeister e o master sugerido para o teu país aparece de imediato, por ser uma consulta a uma lista incorporada e não um pedido à rede.

:::mobile

O servidor é o passo seguinte, e o do teu país já vem selecionado.

![O passo "Servidor master" do assistente de configuração do VoxDMR para Android: uma lista com o cabeçalho "SERVIDORES — SUGERIDOS PRIMEIRO" com 2682 · PT selecionado e marcado "o seu país", depois 2322 · AT, 2061 · BE, 2841 · BG, 2282 · CH e 2302 · CZ marcados "por perto", por cima de um botão "Mostrar todos os 40 servidores"](/screenshots/android-onboarding-server.webp)

:::

:::desktop

A lista de servidores fica no mesmo passo, numa segunda coluna ao lado da escolha da rede, com o do teu país já selecionado.

![O passo "Network" do assistente de configuração do VoxDMR para computador: uma coluna de redes à esquerda com a BrandMeister selecionada e marcada "Suggested", e ao lado uma lista "Servers — suggested first" com PT — 2682.master.brandmeister.network marcado "your country" por cima de AT, BE, BG, CH e CZ marcados "nearby", e depois "Show all 40 servers"](/screenshots/desktop-onboarding-network.webp)

:::

A lista é ordenada primeiro pelo país, depois pela mesma região, depois o resto, e é limitada às primeiras seis linhas até pedires as restantes — a lista completa da BrandMeister são 40 masters, e num rádio de teclado cada linha a mais é mais uma tecla. Escolher um **master personalizado** troca a lista por campos de host, porta e palavra-passe.

ESSID, timeslot e talkgroups estáticos não estão aqui. Vivem nas definições do perfil, depois da configuração.

### Talkgroups, e o teste de eco

:::mobile

![O passo "Talkgroups" do assistente de configuração do VoxDMR para Android: um cartão TESTE DE ECO com "Papagaio · PC 9990" assinalado e descrito como "Chamada privada — o seu áudio é reproduzido de volta", depois uma lista TALKGROUPS com Portugal TG 268 assinalado e VoxDMR TG 26820, Worldwide TG 91, Europe TG 92 e North America TG 93 por assinalar, a indicar "1 selecionado"](/screenshots/android-onboarding-talkgroups.webp)

:::

:::desktop

![O passo "Talkgroups" do assistente de configuração do VoxDMR para computador: um cartão "Echo test" com o Parrot assinalado e descrito como chamada privada, e depois uma lista de talkgroups com 268 · Portugal assinalado e 26820 · VoxDMR, 91 · Worldwide, 92 · Europe e 93 · North America por assinalar, a indicar "1 selected"](/screenshots/desktop-onboarding-talkgroups.webp)

:::

Os talkgroups que assinalares ficam fixados como favoritos para acesso rápido — as sugestões vêm do país do teu DMR ID e da rede que escolheste, e o talkgroup nacional é assinalado por ti na primeira vez que chegas ao passo. Desmarca-o e fica desmarcado; o assistente não volta a assinalar algo que limpaste de propósito.

**O Papagaio fica no seu próprio cartão, por cima dos talkgroups, porque não é um.** O 9990 é endereçado como *chamada privada*, não como chamada de grupo. Arrumá-lo com os talkgroups é precisamente o erro que produz o primeiro "porque é que não me ouço" — por isso o assistente separa os dois, e guarda o Papagaio nos favoritos privados do perfil. Deixa-o assinalado: é assim que provas que a cadeia toda funciona, no fim.

O Papagaio sozinho chega para continuar. Podes ouvir-te antes de teres escolhido alguém com quem falar.

### Ligar a conta da rede

Aparece para redes que precisam de conta própria — BrandMeister e TGIF. As que não precisam (ADN, FreeDMR, um master personalizado) saltam-no.

:::mobile

![O passo "Ligar BrandMeister" do assistente de configuração do VoxDMR para Android: uma receita numerada de três passos — criar conta em brandmeister.network, definir uma hotspot security password em SelfCare → Security, colá-la abaixo — por cima de um campo "Hotspot security password", um aviso de que "Sem ela o master rejeita a ligação", e um botão "Abrir brandmeister.network"](/screenshots/android-onboarding-account.webp)

:::

:::desktop

![O passo "Link BrandMeister" do assistente de configuração do VoxDMR para computador: uma receita numerada de três passos, um botão "Open brandmeister.network" ao lado de "How to get your BrandMeister password", e um campo "Hotspot security password" sob uma nota de que sem ela o master rejeita a ligação](/screenshots/desktop-onboarding-credentials.webp)

:::

Uma ligação Homebrew ou Rewind falha sem uma palavra-passe por estação que tens de criar no site da própria rede, e nada na app o pode fazer por ti. Deixar as pessoas a descobrir isso a partir de uma ligação falhada é a maior causa de falhas no primeiro arranque, por isso o assistente indica o caminho exato — para a BrandMeister, *SelfCare → Security → hotspot security password* — e abre o site diretamente.

**Esta não é a palavra-passe da tua conta BrandMeister.** É uma string separada que defines tu próprio no SelfCare.

O passo pode ser ignorado. Ignora-o e ficas na mesma com um perfil guardado — só não consegue ligar-se até adicionares a palavra-passe nas Definições.

### Teste de microfone

:::mobile

Fica em último, e pede a permissão de microfone assim que chegas — bastante menos alarmante aqui do que na primeira vez que carregas no PTT a meio de um QSO.

![O passo "Teste de microfone" do assistente de configuração do VoxDMR para Android: um aviso verde "Acesso ao microfone concedido", um medidor de NÍVEL com um botão "Testar microfone", e uma linha a indicar que a filtragem TX na banda de voz (300 Hz – 3,4 kHz) está ativa e é recomendada para o codec AMBE](/screenshots/android-onboarding-mic.webp)

**Testar microfone** grava dois segundos e classifica o nível como *bom*, *demasiado baixo* ou *demasiado alto*. Recusar a permissão nunca te bloqueia — resolve-se depois nas definições do sistema, e ficares preso num assistente por causa disso seria pior.

:::

:::desktop

O nível do microfone é uma barra ao vivo no ecrã final em vez de um passo próprio, junto com um seletor de dispositivo de entrada.

:::

O áudio DMR só soa bem se o codificador receber um sinal limpo — o codec AMBE transmite um *modelo* da tua voz em vez do som em si, por isso um sinal de entrada mau degrada-o muito mais do que degradaria em FM. A filtragem TX na banda de voz (300 Hz – 3,4 kHz) está ativa por omissão e vale a pena deixá-la assim. Vê [Definições de áudio](./audio-settings).

### Estação pronta

:::mobile

![O ecrã final "Estação pronta" do assistente de configuração do VoxDMR para Android no caminho feliz: um visto verde por cima de "ON THE AIR", uma tabela RESUMO DA ESTAÇÃO com Indicativo CT7BLE, DMR ID 2680513, Rede BrandMeister, Servidor Master PT e Estado LIGADO a verde, e um botão vermelho "Testar o Papagaio" descrito como chamada privada para 9990](/screenshots/android-onboarding-done-connected.webp)

:::

:::desktop

![O ecrã final do assistente de configuração do VoxDMR para computador, com o título "Station saved": um cartão de resumo com NOT CONNECTED e "Configured — add your password in Settings to connect", uma tabela com CT7BLE, 2680513, BrandMeister e 2682.master.brandmeister.network, uma barra Mic level com um seletor Input device em System Default e "-48 dB · too quiet", e uma oferta de base de dados de indicativos](/screenshots/desktop-onboarding-done.webp)

No computador o título diz **Station ready** quando liga e **Station saved** quando não, e o nível do microfone e o seletor de entrada ficam neste ecrã em vez de num passo próprio.

:::

O último ecrã resume o que ficou realmente configurado — indicativo, DMR ID, rede, servidor, e se a estação está ligada. Mostra apenas factos medidos; não há leitura de intensidade de sinal, porque um cliente de rede não tem nenhuma.

Há três formas de terminar, e todas são um fim legítimo:

| Estado | O que aconteceu | O que fazer |
|---|---|---|
| **LIGADO** | Perfil guardado, sessão iniciada, em espera no teu talkgroup. | Carrega em **Testar o Papagaio** e diz alguma coisa. Ouvires-te de volta prova a cadeia toda — microfone, vocoder, rede e saída de áudio. |
| **NÃO LIGADO**, "adicione a palavra-passe nas Definições" | Perfil guardado. Ignoraste a palavra-passe, por isso não foi tentada nenhuma ligação em vez de se disparar uma que só podia falhar. | Adiciona a palavra-passe nas Definições, ou usa **Voltar ao passo da palavra-passe**. |
| **NÃO LIGADO**, com um erro | Perfil guardado, a ligação foi rejeitada ou expirou. | O erro indica a causa — uma ligação rejeitada é quase sempre a palavra-passe. Vê [Resolução de problemas](./troubleshooting). |

:::mobile

Ignora a palavra-passe e o mesmo ecrã comunica-o, com o caminho de volta:

![O ecrã "Estação pronta" no estado não ligado: uma tabela RESUMO DA ESTAÇÃO com Estado NÃO LIGADO a âmbar, um aviso "Configurado — adicione a palavra-passe nas Definições para ligar", e um botão "Voltar ao passo da palavra-passe" por cima de "Ir para o rádio"](/screenshots/android-onboarding-done.webp)

:::

O ecrã final oferece também a **base de dados de indicativos**. Sem ela, os indicativos são consultados online em cada chamada; instalá-la (dezenas de MB, descarregados em segundo plano) resolve-os instantaneamente e sem rede.

### Voltar a executá-lo

Ambas as plataformas mantêm o assistente em **Definições → Sobre → Executar assistente de configuração**.

Uma nova passagem **adiciona um novo perfil e torna-o ativo** — nunca edita nem substitui o que já tens, por isso voltar a percorrê-lo não pode estragar uma configuração que funciona.

:::desktop

No computador, a nova passagem começa pré-preenchida a partir do perfil ativo.

:::

:::mobile

No Android, a nova passagem começa vazia.

:::

## Próximos passos

- [Primeira Ligação](./first-connection) — configura o teu DMR ID, escolhe uma rede e transmite pela primeira vez.
- [Perfis de Servidor](./server-profiles) — mantém várias configurações de rede (BrandMeister, TGIF, FreeDMR…) lado a lado e troca entre elas.
