# Tech Stack & Code Standards — Projeto ViDa

## 1. Stack Tecnológico
- **Framework**: Next.js 16 (App Router).
- **Frontend**: React 19, TypeScript, Tailwind CSS v4.
- **Backend**: Next.js Server Actions + API Routes.
- **Database**: PostgreSQL + Prisma ORM.
- **AI**: Vercel AI SDK (ou similar) integrado com GPT-4o/Gemini.

## 2. Padrões de Código
- **Componentização**: Seguir o padrão de `src/features` para isolar lógica de Nutrição, Treino e Cardio.
- **Server-First**: Priorizar Server Components para segurança e performance.
- **Types**: Todos os modelos de dados devem ser tipados em `src/shared/types`.

## 3. Fluxo de Trabalho do Agente
1. Ler o `PROJECT_STATUS.md` antes de qualquer tarefa.
2. Executar `snyk_code_scan` após grandes alterações.
3. Atualizar o `walkthrough.md` ao finalizar uma sub-fase.
