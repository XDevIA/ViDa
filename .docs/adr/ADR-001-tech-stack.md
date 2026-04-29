# ADR-001: Technical Stack Selection

## Status
Aprovado

## Contexto
O projeto ViDa exige alta performance, segurança de tipos para cálculos biométricos e uma interface fluida que se adapte ao contexto do usuário (treino vs. descanso).

## Decisão
Utilizaremos a seguinte stack tecnológica:
- **Framework**: Next.js 16 (App Router) para SSR e performance otimizada.
- **Linguagem**: TypeScript em modo estrito para garantir precisão nos cálculos do Rules Engine.
- **ORM**: Prisma para modelagem segura do banco de dados (Gêmeo Digital).
- **Styling**: Tailwind CSS v4 para uma interface moderna e rápida.

## Consequências
- **Positivas**: Facilidade de manutenção, forte ecossistema de ferramentas, segurança contra erros de cálculo via tipos.
- **Negativas**: Curva de aprendizado inicial para as novas features do Next.js 16 e Tailwind v4.
