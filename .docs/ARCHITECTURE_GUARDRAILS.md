# Architecture Guardrails — Projeto ViDa

Este documento define as restrições arquiteturais **INNEGOCIÁVEIS** para garantir a integridade, segurança e escalabilidade do ViDa.

## 1. Segurança e Privacidade (PII)
- **PII Isolation**: Dados biométricos (peso, gordura corporal) devem ser tratados como dados sensíveis (LGPD).
- **Encryption**: Criptografia AES-256 para dados em repouso no banco de dados.
- **Anonymization**: Logs de IA não devem conter nomes ou e-mails de usuários; usar apenas IDs internos.

## 2. Motor de Regras (Rules Engine)
- **Determinism Over Generative**: Nenhuma recomendação calórica ou de macronutrientes pode ser baseada exclusivamente em IA. O motor determinístico TypeScript tem autoridade final.
- **Fail-Safe Mode**: Se o Rules Engine falhar ou receber dados inconsistentes, o sistema deve entrar em `MAINTENANCE_MODE` ou `SAFE_RECOVERY` em vez de sugerir dados incorretos.

## 3. Integridade de Dados
- **Atomic Transactions**: Todas as operações de log de treino/nutrição devem ser atômicas.
- **Idempotency**: Webhooks de integração (ex: Strava, Apple Health) devem implementar chaves de idempotência para evitar duplicidade de gastos calóricos.

## 4. Orquestração de IA
- **Human-in-the-Loop (R3/R4)**: Alterações estruturais no perfil de saúde do usuário sugeridas pela IA exigem confirmação explícita do usuário.
- **Audit Trail**: Toda sugestão generativa deve ser rastreável a uma versão específica do prompt e do modelo no `AIAuditLog`.

## 5. Frontend & UX
- **Performance Budget**: Tempo de carregamento da página inicial < 1.5s (LCP).
- **Accessibility**: Conformidade mínima WCAG 2.1 AA.
- **Adaptive UI**: A interface deve refletir o estado do usuário (Treino vs Descanso) sem recarregamentos manuais (use React Server Components + Streaming).
