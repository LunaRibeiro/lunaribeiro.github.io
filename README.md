# Portfólio — Luna Ribeiro, desenvolvedora web

Site estático (HTML, CSS e JavaScript puro), pronto para o GitHub Pages.

## Estrutura

```
index.html          → conteúdo da página
css/style.css       → visual (cores no topo do arquivo, em :root)
js/main.js          → projetos, menu, checklist, Inox e formulário
assets/             → imagens e favicon
```

## Antes de publicar

1. Em `js/main.js`, troque `WHATSAPP = '55SEUNUMERO'` pelo seu número com DDI e DDD, só números (ex.: `5545999998888`).
2. Para adicionar projetos, copie um bloco `{ ... }` dentro de `PROJETOS` em `js/main.js` e coloque a imagem na pasta `assets/`.

## Publicar no GitHub Pages

1. Crie um repositório chamado **`SEU-USUARIO.github.io`** (troque pelo seu usuário do GitHub). Esse nome faz o site abrir direto em `https://SEU-USUARIO.github.io`.
2. Envie todos os arquivos desta pasta para o repositório (pelo botão **Add file → Upload files** ou com `git push`). O `index.html` precisa ficar na raiz.
3. Vá em **Settings → Pages**, em *Source* escolha **Deploy from a branch**, selecione a branch `main` e a pasta `/ (root)`, e salve.
4. Em alguns minutos o site estará no ar. Coloque o link na bio do Instagram!

## Testar no computador

Abra o `index.html` no navegador, ou rode na pasta:

```
python -m http.server
```

e acesse `http://localhost:8000`.
