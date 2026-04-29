# UI/UX Design Specification — ViDa (Magna Lava Edition)

Este documento define a identidade visual e os tokens de design para garantir uma experiência "Premium State-of-the-Art" baseada no tema **Magna Lava**.

## 1. Estética Central: "Magna Lava"
O design deve evocar a força e a fluidez da lava vulcânica. O contraste entre o preto obsidiana e o laranja incandescente cria uma atmosfera de alta performance e intensidade.

## 2. Paleta de Cores (Tokens Magna Lava)
- **Primary (Lava Orange)**: `hsl(18, 100%, 50%)` — Calor e Intensidade.
- **Secondary (Volcanic Black)**: `hsl(0, 0%, 4%)` — Fundo Profundo e Sólido.
- **Accent (Magma Yellow)**: `hsl(45, 100%, 50%)` — Alertas de progresso e destaque.
- **Muted (Ash Gray)**: `hsl(0, 0%, 20%)` — Bordas e elementos secundários.
- **Glass (Molten Glass)**: `hsla(18, 100%, 10%, 0.4)` com `backdrop-filter: blur(16px)` e `border: 1px solid hsla(18, 100%, 50%, 0.2)`.

## 3. Tipografia
- **Font-Family**: `Outfit` para títulos (geométrico e moderno) e `Inter` para leitura.
- **Hierarchy**:
  - `Display`: 48px, Black (900), Tracking -3%, text-shadow: `0 0 20px hsla(18, 100%, 50%, 0.4)`.
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
