# UI/UX Design Specification — ViDa

Este documento define a identidade visual e os tokens de design para garantir uma experiência "Premium State-of-the-Art".

## 1. Estética Central: "Glassmorphism & Neon Bio-Tech"
O design deve misturar elementos de transparência (vidro), profundidade e cores vibrantes que remetam à alta tecnologia e saúde.

## 2. Paleta de Cores (Tokens)
- **Primary (Vibrant Green)**: `hsl(142, 70%, 50%)` — Energia e Saúde.
- **Secondary (Deep Blue/Black)**: `hsl(222, 47%, 11%)` — Fundo Profundo (Dark Mode Default).
- **Accent (Electric Cyan)**: `hsl(199, 89%, 48%)` — Cardio e Fluidez.
- **Danger (Coral Red)**: `hsl(0, 84%, 60%)` — Alertas e Limites Críticos.
- **Glass**: `hsla(0, 0%, 100%, 0.05)` com `backdrop-filter: blur(12px)`.

## 3. Tipografia
- **Font-Family**: `Inter` (Sans-serif) ou `Outfit` para títulos.
- **Hierarchy**:
  - `Display`: 48px, Bold, Tracking -2%.
  - `Body`: 16px, Regular, Leading 1.6.

## 4. Componentes Chave
- **Health Ring**: Visualização circular de progresso (Macros/Cardio) com gradientes neon.
- **Activity Feed**: Cards com bordas arredondadas (24px) e sombra interna sutil.
- **Live Mode Dashboard**: UI simplificada e de alto contraste para uso durante o treino.

## 5. Micro-interações
- **Hover States**: Efeito de brilho (glow) sutil nos botões.
- **Transitions**: Ease-in-out de 300ms para mudanças de estado da dashboard.
- **Loading**: Esqueleto (Skeleton) com animação de pulsação suave.

## 6. Framework
- **Tailwind CSS v4** utilizando variáveis CSS-first.
- **Radix UI** para acessibilidade nos componentes primitivos.
