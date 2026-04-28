# Registo de Alterações

## 1.2.0

### Novidades

- **Reprodução de ficheiros de áudio** — transmita um ficheiro de áudio pré-gravado pelo ar a partir do ecrã PTT. Toque no botão de reprodução de ficheiro junto ao botão PTT para escolher um ficheiro; um cartão de progresso acompanha a reprodução. Desativado em modo VOX e enquanto outra estação está a falar. A monitorização local reproduz o ficheiro no altifalante enquanto transmite.
- Entrada **Talkgroups** no menu do servidor ativo — vá directamente para a gestão de presets sem abrir o formulário de edição
- Configuração opcional de presets de talkgroup logo após adicionar um novo servidor
- Percorra presets directamente no ecrã PTT com novos botões ‹ / › (quando o servidor tem dois ou mais presets)
- Monitorize um talkgroup arbitrário a partir do seletor com **Monitorizar outro TG…**, sem precisar de preset
- Opção **Monitorizar por omissão** por preset no ecrã de presets de talkgroup — fixe talkgroups específicos para serem sempre monitorizados ao ligar
- Links profundos / códigos QR `voxlink://` que pré-preenchem o formulário de novo servidor (`voxlink://host:port/?name=&user=&pass=&tg=`)
- Seletor de saída de áudio em tempo real nas Definições que lista os dispositivos efectivamente disponíveis (altifalante interno, auriculares com fios, auriculares Bluetooth emparelhados, etc.) em vez de um enum fixo
- Reencaminhamento automático: com **Saída de áudio** em **Auto**, ligar ou remover um auricular / dispositivo Bluetooth muda a rota em tempo real e mostra um aviso caso o dispositivo escolhido desapareça

### Alterado

- O cabeçalho do ecrã PTT agora mostra o **nome** do servidor (com o host como fallback) em vez do hostname puro
- As linhas de dispositivo de saída e fonte de entrada nas Definições passam a mostrar o nome do dispositivo/fonte por baixo da etiqueta para que nomes longos não quebrem desajeitadamente

### Corrigido

- As snackbars dos ecrãs Servidores e Gravações já se descartam automaticamente quando há um serviço de acessibilidade Android activo (antes ficavam permanentemente no ecrã, e as gravações eliminadas pela snackbar nunca eram apagadas do disco)
- O aviso "Ligação esgotada" deixa de permanecer no ecrã PTT após uma reconexão automática bem-sucedida
- O refletor já não tenta reconectar em ciclo após um erro de protocolo como **Acesso negado**

## 1.1.0

### Novidades

- Ecrã de boas-vindas para ajudar a começar no primeiro arranque
- Ligação automática agora funciona — liga automaticamente ao último servidor ao abrir a app
- Opção para fechar completamente a app ao pressionar voltar (Definições > Ligação > Sair ao fechar)
- Vibração extra de aviso quando o timeout de transmissão atinge 5 segundos

### Corrigido

- Crash ao fechar o diálogo de importação de servidor
- Menu do seletor de cores cortado em ecrãs mais pequenos
- Traduções em português melhoradas
- Títulos dos ecrãs agora alinham consistentemente em todos os separadores

## 1.0.0 — Primeiro lançamento!

Um cliente push-to-talk para refletores SvxLink de rádio amador.

- Push-to-talk com modos de manter, trincar e VOX
- Áudio Opus de alta qualidade com jitter buffer adaptativo
- Múltiplos perfis de servidor com importação/exportação JSON
- Lista de nós em tempo real com indicativo, nome e localização
- Seleção e monitorização de talkgroups
- Medição de níveis de áudio TX/RX
- Temporizador de timeout configurável com aviso por vibração
- Gravação e reprodução de conversas
