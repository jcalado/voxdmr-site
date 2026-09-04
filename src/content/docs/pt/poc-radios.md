# Rádios PoC

Um rádio PoC (*Push-to-talk over Cellular*) é um telemóvel Android num corpo de rádio: um botão
PTT verdadeiro debaixo do polegar, um altifalante frontal, normalmente um botão rotativo ou
basculante de canais, e muitas vezes um ecrã pequeno sem toque. O VoxDMR instala-se neles como
qualquer outra aplicação Android, e adapta-se quando reconhece o hardware.

Tudo nesta página é **exclusivo do Android** — nada se aplica à versão desktop.

> Queres saber se o *teu* rádio funciona? A [lista de compatibilidade](/pt/radios) tem os
> resultados dos testes por modelo, dicas e transferências dos enablers. Esta página explica o
> que esperar de um rádio PoC em geral.

## O que se adapta automaticamente

Não configuras nada disto — a aplicação ajusta-se sozinha.

**Disposição compacta.** Nos ecrãs pequenos e de baixa densidade que estes rádios usam, o
VoxDMR passa a uma disposição mais apertada, com áreas de toque maiores, e abre os pop-ups em
ecrã inteiro para caberem. Os telemóveis normais não são afetados, mesmo os pequenos.

**Navegação por D-pad.** A maioria dos rádios PoC não tem ecrã tátil. A aplicação corre em modo
de navegação direcional, por isso o D-pad move o foco entre controlos e ajusta os *sliders* em
vez de passar por cima deles.

## O que tens de verificar: 32 bits

Muitos rádios PoC têm **processadores só de 32 bits**. A versão normal para Android não
instala neles de todo — precisas do APK de 32 bits em separado.

:::important

Se a Play Store diz que o teu aparelho não é compatível, ou se a aplicação se recusa a
instalar, é quase sempre por isto. Vai buscar o APK de 32 bits a [Instalação](/pt/docs/installation).

:::

## Pôr o botão PTT a funcionar

O botão PTT de um rádio PoC nem sempre chega às aplicações como um botão normal chegaria. Qual
destes casos se aplica depende do rádio — confirma o teu modelo na
[lista de compatibilidade](/pt/radios).

**Funciona sem mais nada.** Em muitos rádios o VoxDMR recebe o botão PTT diretamente. Atribui-o
no ecrã [Modos PTT](/pt/docs/ptt-modes) e está feito.

**Precisa de uma aplicação enabler.** Alguns rádios só entregam o botão PTT a uma aplicação
companheira. Onde é preciso uma, a lista de compatibilidade tem a ligação para esse modelo.
Instala-a, e o VoxDMR passa a receber o botão a partir dela.

**Só funciona em primeiro plano.** Nalguns rádios o botão só chega ao VoxDMR enquanto ele está
no ecrã. Outros entregam-no faças o que fizeres, por isso o PTT continua a funcionar com o
VoxDMR em segundo plano. A lista de compatibilidade regista quais.

**Deixa de funcionar com o ecrã bloqueado.** Nalguns rádios um bloqueio de ecrã seguro impede
os botões físicos de chegarem às aplicações, e o PTT fica morto sempre que o rádio bloqueia. O
VoxDMR inclui um serviço de acessibilidade opcional que mantém as teclas atribuídas a funcionar
com o rádio bloqueado — ativa-o nas definições de acessibilidade do Android. Sem ele, tudo
continua a funcionar com o ecrã desbloqueado.

> Se o teu PTT por vezes regista como duplo toque, é provável que tenhas o suporte do próprio
> rádio *e* uma aplicação enabler a reencaminhar o mesmo botão. O VoxDMR filtra a maioria das
> duplicações, mas a solução limpa é remover uma das duas.

## Botões rotativos e basculantes de canais

Um passo do botão percorre os teus favoritos, pela ordem em que os arrumaste no ecrã
[Talkgroups](/pt/docs/talkgroups) — assim mudas de talkgroup sem olhar para o rádio.

- **Botões rotativos** avançam um favorito por cada clique, e uma rotação rápida anda tantos
  quantos deste.
- **Basculantes de canal** (botões de cima/baixo em vez de um rotativo) fazem o mesmo. Nalguns
  rádios precisam da aplicação enabler, tal como o botão PTT.
- **Microfones-altifalante Bluetooth** com botões de canal também funcionam.

Nem todos os botões são alcançáveis — alguns estão ligados à aplicação do próprio fabricante e
nunca chegam ao VoxDMR. A lista de compatibilidade regista isto por modelo.

## Acessórios PTT por Bluetooth

Os microfones-altifalante com botão PTT, como o Inrico B01, funcionam como PTT remoto do
VoxDMR. O botão de PTT, os de canal e o de SOS são todos reconhecidos.

Emparelha primeiro o acessório nas **definições de Bluetooth do Android**. O VoxDMR encontra-o
sozinho na lista de emparelhados — não há nada a selecionar dentro da aplicação.

:::important

Emparelha o acessório *antes* de iniciares uma sessão. O VoxDMR procura acessórios emparelhados
quando liga, por isso um que emparelhes a meio da sessão só é reconhecido quando voltares a
ligar.

:::

## Rádios com suporte de hardware adicional

Alguns rádios expõem hardware a que as aplicações Android normais não conseguem chegar — LEDs
de estado, integração com o launcher, teclas de função físicas. Onde o VoxDMR consegue usar
esse hardware, usa:

- **Hytera** — LED de estado, cartão de chamada no ecrã principal, tecla de função direita, e
  teclas de volume que controlam o áudio que estás mesmo a ouvir. Vê
  [Hytera P50](/pt/docs/hytera-p50).

Estes extras são reconhecidos por modelo. Num rádio que o VoxDMR não reconheça simplesmente não
aparecem, e mais nada é afetado — não há risco nenhum em instalar num rádio não testado.

## Próximos passos

- [Hytera P50](/pt/docs/hytera-p50) — o rádio com melhor suporte, documentado por inteiro.
- [Lista de compatibilidade](/pt/radios) — resultados dos testes por modelo e transferências
  dos enablers.
- [Modos PTT](/pt/docs/ptt-modes) — atribuir teclas e escolher entre manter premido ou alternar.
- [Modo Carro](/pt/docs/car-mode) — o ecrã de condução, com uma variante adaptada ao teclado
  para rádios de painel pequeno.
