# Perfis de Servidor

Guarde múltiplas ligações a refletores e alterne entre elas rapidamente.

![Ecrã de servidores](/docs/servers-screen.webp)

## Adicionar um Perfil

1. Toque no separador **Servidores**, depois em **+**.
2. Introduza o hostname, porta (predefinição `5300`), talkgroup, o seu indicativo e chave de autenticação.
3. Toque em **Guardar**.

A chave de autenticação é fornecida pelo administrador do seu refletor. É sensível a maiúsculas/minúsculas — se a ligação falhar com **Erro de Autenticação**, verifique-a caractere por caractere.

Após guardar, o VoxLink propõe configurar [presets de talkgroup](/docs/talkgroups-nodes#presets-de-talkgroup) para o novo servidor logo de seguida. Ignore se preferir adicioná-los mais tarde — pode sempre voltar ao mesmo ecrã pelo menu do servidor ativo.

## Configuração Rápida por Código QR ou Link

Operadores de refletores podem publicar um link `voxlink://` (frequentemente como código QR) que pré-preenche o formulário de novo servidor. Ao ler ou tocar no link, o VoxLink abre o ecrã **Adicionar servidor** com o host, porta, nome, indicativo, password e talkgroup pré-preenchidos — confirme e toque em **Guardar**.

O formato do link é:

```
voxlink://{host}:{port}/?name={nome}&user={indicativo}&pass={password}&tg={tg}
```

Todos os parâmetros de query são opcionais. Os que ficarem por preencher usam os valores predefinidos do formulário.

## Mudar de Servidor

1. Toque no separador **Servidores**.
2. Toque no perfil ao qual se quer ligar.

O VoxLink desliga-se do servidor atual automaticamente antes de ligar ao novo.

## Importar / Exportar

Partilhe perfis entre dispositivos ou membros do clube como ficheiros JSON.

- **Exportar** — **Definições > Perfis > Exportar** guarda um ficheiro `.json` na sua pasta de Downloads.
- **Importar** — **Definições > Perfis > Importar** e selecione um ficheiro JSON.

> A importação substitui perfis existentes com o mesmo nome. Exporte os seus perfis primeiro se quiser manter uma cópia de segurança.
