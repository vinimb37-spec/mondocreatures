# Briefing Mondo Creatures — passar pro próximo Claude

Cole o conteúdo abaixo (a partir do "---") como primeira mensagem na nova conversa do Claude. Ele vai entender exatamente onde estamos.

---

## Contexto do projeto

Estou construindo o site **mondocreatures.com** — um universo sci-fi fantasy de criaturas originais, com foco em vídeo vertical (futuramente gerado via Luma AI / Runway). Domínio comprado na GoDaddy, ainda não apontado.

**Stack escolhida:**
- Astro 6.2.2 (SSG, sem TypeScript) — estrutura HTML/CSS/JS pura
- GitHub: `github.com/vinimb37-spec/mondocreatures` (público, branch `main`)
- Cloudflare Workers + Static Assets (não Pages — caímos no fluxo unificado deles)
- VS Code + PowerShell no Windows

**Pasta local:** `C:\MondoCreaturesSite\mondocreatures`

## O que já está feito

1. Projeto Astro criado, repo Git inicializado, sample files removidos.
2. Site one-pager montado em **inglês**, visual sci-fi escuro (cyan/magenta), com:
   - `BaseLayout.astro` (SEO completo: title, description, canonical, OG, Twitter, JSON-LD WebSite + Organization, robots, theme-color)
   - `Hero.astro` (kicker pulsando, "MONDO CREATURES" gigante com gradiente, tagline, fundo animado em CSS puro com orbs/grid/vignette — sem JS)
   - `About.astro` ("// The Multiverse" + título "Original species, reimagined for the future of digital storytelling." + 3 pilares)
   - `Creatures.astro` (grid 9:11 com 6 cards mostrando só algarismo romano I–VI e badge LOCKED — codenames removidos pra preservar mistério)
   - `Footer.astro` (wordmark, tagline, sociais YouTube + X com URLs reais, copyright, versão)
   - `index.astro` que compõe tudo
3. `public/robots.txt`, `public/favicon.svg` (gradiente cyan/magenta), `public/_headers` (cuidado: `_headers` é específico do Pages, talvez não seja honrado pelo Workers — precisa verificar)
4. `astro.config.mjs` com `site: 'https://mondocreatures.com'` e integração `@astrojs/sitemap`
5. `wrangler.jsonc` na raiz apontando `assets.directory = ./dist` (necessário pro fluxo Workers)
6. Pushei pro GitHub (auth via `gh auth login` que ficou guardado — `git push` agora funciona sem prompt)
7. **Site live em `https://mondocreatures.vini-mb37.workers.dev`** ✅
8. Auto-deploy configurado: cada `git push` na `main` dispara build automático em ~2 min

## Configuração do projeto na Cloudflare

- Conta: `vini.mb37@gmail.com`
- Worker name: `mondocreatures`
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Production branch: `main`
- `workers_dev: true` (default, queremos ligado por enquanto)
- `preview_urls: true` (default, gera URL de preview por commit)

## Onde paramos

Acabei de editar `Footer.astro` mudando "v0.1 · pre-launch" pra "v0.2 · live" como teste do auto-deploy. **Ainda não commitei nem pushei.** Próximos comandos no PowerShell:

```powershell
cd C:\MondoCreaturesSite\mondocreatures
git add .
git commit -m "chore: bump to v0.2"
git push
```

Aí abrir `dash.cloudflare.com → Workers & Pages → mondocreatures` e ver o deploy rodar.

## O que falta (em ordem de prioridade)

1. **Conectar `mondocreatures.com`** ao Worker. Duas opções: (A) deixar nameservers na GoDaddy e adicionar registros DNS apontando pro Worker, ou (B) trocar nameservers da GoDaddy pelos da Cloudflare (recomendado — libera Web Analytics, Page Rules pro 301 www→apex, etc.).
2. **Configurar redirect 301 de `www.mondocreatures.com` pra apex** (`mondocreatures.com`) — pra ter uma URL canônica única pro Google.
3. **Criar `public/og-image.jpg`** (1200×630, ~150KB) — sem isso, links compartilhados em redes sociais ficam feios.
4. **Criar `public/apple-touch-icon.png`** (180×180).
5. **Verificar se `public/_headers` está sendo honrado pelo Worker.** Se não, migrar os headers de segurança (HSTS, X-Frame-Options, Referrer-Policy) pro `wrangler.jsonc` ou criar um Worker function que adicione headers.
6. **Pós-launch SEO:** verificar domínio no Google Search Console, submeter `https://mondocreatures.com/sitemap-index.xml`, ativar Cloudflare Web Analytics.
7. **Quando os primeiros vídeos do Luma/Runway estiverem prontos:** trocar o fundo CSS animado do Hero por `<video autoplay muted loop playsinline>`. Vídeos > 25MB usar Cloudflare R2 ou Stream.
8. **Form "Notify me"** foi removido — quando ativar, opções: Web3Forms (grátis), Formspree, ou Worker próprio com KV.

## Estilo de comunicação

Sou leigo em desenvolvimento web. Prefiro **um passo de cada vez, comandos prontos pra colar**, e sempre que existir uma ferramenta que agilize o trabalho (tipo Comet, Claude for Chrome, Wrangler CLI, GitHub Desktop, GitHub CLI), me sugira. Português BR. Sem enrolação, mas sem pular detalhes que possam quebrar coisa importante de SEO ou segurança.

## Cuidados específicos

- Já temos um problema documentado: o dashboard da Cloudflare entrou em **loop OAuth com GitHub** durante a configuração. Foi resolvido tentando o "toggle de Repository access" no GitHub e clicando "Connect GitHub" de novo no Cloudflare. Se reaparecer, plano B é janela anônima, plano C é Wrangler CLI direto do PowerShell.
- Aviso amarelo no log de deploy sobre `workers_dev` e `preview_urls` — é informativo, não é erro. Vamos ajustar quando o domínio próprio estiver no ar.
- Path com espaço não usar (eu já evitei: `C:\MondoCreaturesSite\mondocreatures`).

---
