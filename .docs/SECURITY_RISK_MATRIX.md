# Security & Health Risk Matrix — ViDa

Este documento mapeia os riscos operacionais e as estratégias de mitigação do sistema.

## 1. Matriz de Riscos (R1 - R4)

| ID | Risco | Impacto | Nível | Mitigação |
|---|---|---|---|---|
| R-01 | Sugestão de déficit calórico excessivo | Saúde do Usuário | R4 | Bloqueio por hard-limit no Rules Engine. |
| R-02 | Vazamento de dados biométricos PII | Privacidade/Legal | R4 | Criptografia AES-256 e RLS (Row Level Security). |
| R-03 | Falha na sincronização de dados de treino | Experiência/Aderência | R2 | Idempotency keys e retries automáticos. |
| R-04 | IA recomendando substâncias proibidas | Ética/Segurança | R4 | Safety Screening e filtros de palavras-chave. |
| R-05 | Alucinação da IA em cálculos de macros | Precisão Técnica | R3 | Validação obrigatória pós-geração (Post-Check). |

## 2. Protocolo de Incidente
Em caso de detecção de risco R4 (ex: meta perigosa gerada), o sistema deve:
1. Invalidar a sessão de IA.
2. Alertar o administrador/audit log.
3. Exibir uma mensagem de segurança padrão ao usuário direcionando para consulta profissional.

## 3. Compliance
- **LGPD**: Relatório de Impacto à Proteção de Dados (RIPD) deve ser mantido atualizado.
- **Ethics**: A IA deve ser transparente sobre ser um algoritmo e não um humano.
