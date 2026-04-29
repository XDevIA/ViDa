# ADR-002: AI Safety & Rules Engine Priority

## Status
Aprovado

## Contexto
Recomendações nutricionais e de treino geradas puramente por IA podem ser perigosas (dietas extremas, overtraining). É necessário um mecanismo de proteção inegociável.

## Decisão
Implementar um **Rules Engine** determinístico (código puro TypeScript) que define as "fronteiras de segurança" antes de qualquer processamento por IA.
- A IA atua como uma interface de linguagem e coach.
- Todas as saídas da IA devem ser validadas contra as métricas do Rules Engine.
- Se a IA sugerir algo fora de um desvio padrão de 10% do motor de regras, a sugestão é bloqueada.

## Consequências
- **Positivas**: Segurança jurídica e de saúde do usuário; auditabilidade clara de decisões.
- **Negativas**: Leve aumento na latência de resposta devido à etapa de validação.
