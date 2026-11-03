# Cesinha Futevôlei

Site one-page de divulgação do professor Cesinha (@cesinhafutevolei_) — Salvador/BA.

## Rodar

```bash
npm install
npm run dev
```

Build de produção: `npm run build` · preview: `npm run preview`

## Trocar cores

Edite as variáveis em `src/index.css` (`:root`). Paleta alinhada ao Instagram (🖤💛):

| Token | Hex atual | Uso |
| --- | --- | --- |
| `--ocean` | `#0A0A0A` | preto de marca / fundos escuros |
| `--ocean-light` | `#1A1A1A` | variação do preto |
| `--sun` | `#F8C72D` | amarelo de marca / CTAs |
| `--sun-hot` | `#E0A800` | hover |
| `--sand` | `#F7F7F5` | fundos claros |
| `--ink` | `#0A0A0A` | texto em fundo claro |

## Trocar fotos

1. Coloque WebP/AVIF em `public/images/` (ex.: `hero.webp`, `about.webp`, `gallery-01.webp`…).
2. Passe `src="/images/hero.webp"` nos `PhotoBlock` em:
   - `src/sections/Hero.tsx`
   - `src/sections/About.tsx`
   - `src/sections/Gallery.tsx`
3. Atualize `public/og-image.svg` (ou troque por PNG/JPG e aponte no `index.html`).

## Links

Tudo em `src/config/links.ts` (agendamento Arevo, WhatsApp, Instagram, maps).

## Conteúdo / placeholders

Textos e números em `src/config/content.ts`. Procure por `{{...}}` no projeto.

### TODO — conteúdo pendente

- [ ] `{{TEXTO_SOBRE}}` — biografia real do Cesinha
- [ ] `{{CREDIBILIDADE_EXTRA}}` — título, títulos, conquistas
- [ ] `{{ANOS_EXPERIENCIA}}` / `{{TURMAS_ATIVAS}}` — números reais da faixa do hero
- [ ] `{{ENDERECO}}` / `{{ENDERECO_RESUMO}}` — endereço completo da Arena Beach Stella
- [ ] `{{HORARIOS}}` — grade de dias/horários
- [ ] `{{LINK_MAPS}}` — URL do Google Maps
- [ ] `{{LAT}}` / `{{LNG}}` — no schema do `index.html`
- [ ] `{{DEPOIMENTO_1..3}}` / `{{NOME_ALUNO_N}}` — depoimentos reais
- [ ] Fotos reais (hero, sobre, galeria) — hoje são blocos `TODO: foto real`
- [ ] Domínio canônico em `index.html`, `robots.txt` e `sitemap.xml`
- [ ] Favicon/PNG de alta resolução se necessário

## Stack

Vite · React · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger · @fontsource (Bebas Neue + DM Sans)
