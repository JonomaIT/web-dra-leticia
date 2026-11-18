# DESIGN.md: Dra. Letícia Penin

Design system do site draleticiapenin.com.br. Toda página ou componente novo segue este arquivo;
um agente que mexe na interface lê este arquivo primeiro. Os valores estão em
`site/css/tokens.css`, que é a fonte da verdade. O guia visual completo está em
`docs/styleguide.html`.

## 1. Tema visual

- Um consultório odontológico acolhedor e premium, em tons de marrom, creme e dourado, com
  fotografia real da doutora e do consultório.
- Claro, com muito respiro, cantos arredondados e sombras suaves.
- Títulos em Poppins, texto em DM Sans.

## 2. Cores

Os componentes usam só os tokens semânticos, nunca a paleta direto.

| Token | Valor | Uso |
|---|---|---|
| `--text` | `#473835` | texto principal |
| `--text-muted` | `#6b5750` | texto secundário |
| `--text-on-dark` | `#f3eec8` | texto sobre `--surface-dark` |
| `--surface` | `#fffdf3` | fundo da página |
| `--surface-soft` | `#f3eec8` | seções alternadas |
| `--surface-tint` | `#efe6c2` | destaques |
| `--surface-dark` | `#2f2522` | rodapé, faixas escuras |
| `--border` | `#e6dab6` | divisórias, bordas de cards |
| `--brand` | `#473835` | logo, títulos |
| `--accent` / `--accent-soft` | `#b0894a` / `#e0cf9a` | detalhes dourados, foco |
| `--whatsapp` | `#1a7f45` | botões de WhatsApp (verde escurecido para contraste AA) |
| `--star` | `#f5b50a` | estrelas de avaliação |

`theme-color` é `#473835`.

## 3. Tipografia

- **Títulos:** Poppins 600/700. **Texto:** DM Sans 400/500/700. Todas locais, licença OFL, com
  `font-display: swap`; as duas usadas na primeira tela são pré-carregadas.
- **Escala:** `--text-xs` 0.8rem a `--text-3xl` (clamp até 3.2rem).
- **Ritmo:** títulos com `--leading-tight` 1.15 e `--tracking-tight`; texto com
  `--leading-normal` 1.65; eyebrows com `--tracking-wide`.
- **Textos:** português do Brasil, em tom próximo e profissional. Números em formato brasileiro
  ("5,0").

## 4. Componentes

- **Botões:** `.btn--primary` agenda pelo WhatsApp e é a ação principal; `.btn--secondary` leva
  para âncoras do site. Têm altura mínima de 44 px e texto com verbo ("Agendar consulta").
- **WhatsApp flutuante:** fixo no canto inferior direito, sempre com `aria-label`.
- **Cards de serviço e depoimentos:** fundo claro, borda `--border`, cantos `--radius-md` ou
  `--radius-lg` e sombras suaves da escala `--shadow-*`.
- **Carrossel de depoimentos:** com setas, pontos e botão de pausar a troca automática. Para com
  o mouse em cima ou com foco dentro, e não troca sozinho com movimento reduzido.
- **Ícones:** a fonte IcoMoon (`icon-*`), sempre com `aria-hidden="true"`.

## 5. Layout

- Escala de espaço de 4 px (`--space-1` a `--space-14`), com `--section-space` fluido entre seções.
- Conteúdo com até `--content-max` 1140px e `--gutter` 1.5rem.
- Cabeçalho fixo de `--header-height` 4.5rem; `scroll-padding-top` igual, para âncoras e foco não
  ficarem embaixo dele.

## 6. Profundidade e movimento

- Sombras `--shadow-sm`, `--shadow-md` e `--shadow-lg`, todas em marrom translúcido, nunca em preto.
- Durações `--duration-fast` 150ms, `--duration` 250ms e `--duration-slow` 650ms (entrada das
  seções), com `--ease`.
- Com `prefers-reduced-motion`, tudo aparece sem animação, o vídeo não toca sozinho e o carrossel
  não troca sozinho.
- Tudo que se mexe por mais de 5 segundos pode ser pausado: o vídeo tem controles e o carrossel
  tem botão de pausa.

## 7. Pode e não pode

Pode:
- Fotos reais da doutora e do consultório, com `width`, `height` e `alt` descritivo.
- `touch-action: manipulation` nos controles, `overscroll-behavior: contain` no menu do celular.

Não pode:
- Inventar depoimentos, notas, números ou fotos de banco como se fossem do consultório.
- Usar preto puro ou cinza frio: os neutros são marrons e cremes.
- Bloquear o zoom ou usar `<div>` clicável no lugar de `<button>` ou `<a>`.
- Publicar dado pessoal de paciente.

## 8. Responsivo

- Mobile primeiro. Menu em tela cheia abaixo de 992px.
- Alvos de toque com pelo menos 44 px. Imagens com `srcset` em WebP e JPEG de reserva.

## 9. Guia de prompt

> Siga o DESIGN.md: só tokens semânticos, Poppins nos títulos e DM Sans no texto, marrom, creme e
> dourado, fotos reais, ação principal pelo WhatsApp, movimento reduzido respeitado. Depois revise
> o resultado com as Web Interface Guidelines (vercel-labs/web-interface-guidelines) e corrija o
> que elas apontarem.
