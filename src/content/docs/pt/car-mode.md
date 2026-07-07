# Modo Carro

O modo carro é um ecrã inteiro, grande e de leitura imediata, pensado para conduzir. Tudo está dimensionado para se ler num relance e transmitir com um único toque, para que se mantenha num talkgroup sem tirar os olhos da estrada.

> **Apenas Android.** O modo carro é uma funcionalidade Android — não há equivalente no computador. Fica em **Definições → Modo carro**.

## O ecrã de condução

O modo carro substitui o ecrã PTT normal por um único mostrador grande:

- **O indicativo grande** de quem está a falar, a preencher a largura do ecrã.
- **O número do talkgroup, sem mais nada**, para o grupo em que está — só o número, grande, sem enfeites.
- **Estado com código de cores.** O ecrã tem três estados que se leem num relance:
  - **Inativo** — um `Ouvindo…` cinzento esbatido, com o último indicativo ouvido e uma etiqueta aproximada de "há quanto tempo".
  - **A receber** — um cartão de destaque quente `A receber` com o indicativo recebido aceso.
  - **A transmitir** — uma pílula vermelha `NO AR` com o seu cronómetro de TX.

A disposição mantém cada elemento num espaço fixo, por isso o indicativo grande nunca salta quando o estado muda.

Em ecrãs maiores (não compactos), uma **barra de favoritos** lateral permite trocar de talkgroup com um toque (ou com o D-pad); em telemóveis compactos os favoritos ficam na gaveta de navegação. Se a [procura](./talkgroups) estiver ativa, um selo de procura com código de cores mostra o seu estado — toque nele para sair da procura. Veja [Talkgroups](./talkgroups) para saber como a procura funciona.

## Entrar e sair do modo carro

Há várias formas de entrar, todas opcionais:

- **Botão de acesso** — ative isto para adicionar um atalho **Modo carro** ao ecrã PTT (e à gaveta de navegação). Desligado por omissão.
- **Tecla do modo carro** — associe uma tecla de hardware; premi-la abre o modo carro, premi-la de novo fecha-o. Prático para um botão no volante ou nos auscultadores. Sem associação por omissão.
- **Abrir ao carregar** — entra automaticamente quando o telemóvel começa a carregar, por exemplo ao encaixá-lo num suporte de carro. Desligado por omissão.
- **Abrir por Bluetooth** — entra automaticamente quando um dispositivo emparelhado à escolha se liga, e sai quando se desliga. Escolha os dispositivos de ativação na mesma definição. Requer permissão de Bluetooth. Desligado por omissão.
- **Abrir ao iniciar** — entra sempre no modo carro quando a aplicação abre. Desligado por omissão.

Para sair, use o gesto/botão **Voltar** do sistema, ou o mesmo mecanismo por que entrou (premir de novo a tecla, ou desligar o dispositivo Bluetooth).

## Tocar para PTT

Com **Tocar para PTT** ativo (predefinição), todo o ecrã é o botão PTT — toque ou mantenha premido em qualquer ponto para transmitir, seguindo o seu [modo PTT](./ptt-modes) habitual (push-to-talk ou alternar). É a forma mais fácil de transmitir sem procurar um botão pequeno enquanto conduz.

Desligue-o se preferir transmitir apenas com um botão de hardware associado — uma tecla PTT física num telemóvel robusto, ou uns auscultadores — para que um toque acidental não transmita. A sua tecla PTT de hardware associada funciona no modo carro em qualquer dos casos.

## Manter o ecrã ligado

Duas definições de ecrã opcionais ajudam com o telemóvel montado:

- **Manter ecrã ligado** mantém o ecrã aceso enquanto o modo carro está aberto, para não escurecer a meio de um QSO. Sobrepõe-se à definição geral de manter o ecrã ligado e reverte ao sair do modo carro. Desligado por omissão.
- **Brilho máximo** força o ecrã ao brilho máximo no modo carro, para leitura à luz do dia. Desligado por omissão.

## Indicativos desatualizados

Quando o modo carro está inativo, continua a mostrar o último indicativo que ouviu, com uma etiqueta aproximada de "há" (por exemplo, `há 12s`). Se entretanto mudou para um talkgroup **diferente**, esse indicativo desatualizado é etiquetado com o grupo em que foi realmente ouvido — por exemplo, `há 12s @ 91` — para que uma identidade antiga não seja confundida com atividade atual no talkgroup que está agora a vigiar. Enquanto continuar no mesmo talkgroup, nada de extra é mostrado.

## Definições → Modo carro

Todas as definições do modo carro ficam em **Definições → Modo carro** (Arranque, entrada automática, Bluetooth):

| Definição | O que faz | Predefinição |
|---|---|---|
| **Botão de acesso** | Adiciona um atalho do modo carro ao ecrã PTT | Desligado |
| **Tocar para PTT** | Tocar no ecrã para transmitir | Ligado |
| **Tecla do modo carro** | Tecla de hardware que entra / sai do modo carro | Sem associação |
| **Brilho máximo** | Força o ecrã ao brilho máximo | Desligado |
| **Manter ecrã ligado** | Mantém o ecrã ligado enquanto o modo carro está aberto | Desligado |
| **Abrir ao carregar** | Entra automaticamente quando o telemóvel começa a carregar | Desligado |
| **Abrir ao iniciar** | Entra no modo carro sempre que a aplicação abre | Desligado |
| **Abrir por Bluetooth** | Entra automaticamente quando um dispositivo à escolha se liga | Desligado |
| **Dispositivos de ativação** | O(s) dispositivo(s) Bluetooth que ativam o modo carro | Nenhum |

## Próximos passos

- [Modos PTT](./ptt-modes). Push-to-talk vs. alternar, teclas de hardware e ocultar o botão no ecrã.
- [Talkgroups](./talkgroups). Favoritos, chamadas privadas e procura.
- [Resolução de Problemas](./troubleshooting). Quando o PTT ou as teclas de hardware não se portam bem.
