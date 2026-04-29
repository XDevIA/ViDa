# Data Flow & State Management — ViDa

Este documento detalha como os dados circulam entre o usuário, o banco de dados e os motores de IA.

## 1. Fluxo de Entrada (User Input)
1. Usuário insere dados (ex: peso ou refeição).
2. **Validation**: O frontend valida o formato (Zod).
3. **Server Action**: O dado é enviado para uma Next.js Server Action.
4. **Rules Engine Sync**: O sistema recalcula as metas diárias instantaneamente.
5. **Persistence**: O dado é salvo no PostgreSQL via Prisma.

## 2. Fluxo de Consulta de IA (Predictive Analysis)
1. O usuário solicita um ajuste ("Aumentar proteína para hipertrofia").
2. **Context Aggregator**: O sistema busca no banco os últimos 7 dias de logs.
3. **Safety Check (M0)**: O sistema verifica se o perfil do usuário permite mudanças agressivas.
4. **LLM Request**: Prompt enviado com o contexto e os limites do Rules Engine.
5. **Post-Validation**: A resposta da IA é validada contra o schema e limites de segurança.
6. **Delivery**: Resposta exibida na UI Adaptativa.

## 3. Sincronização do Gêmeo Digital (Digital Twin)
- O estado do `DigitalTwinState` é atualizado a cada novo `Measurement`.
- **Calibration Loop**: Se o peso real divergir do previsto por mais de 5%, a IA sugere uma re-calibração do `metabolicFactor`.

## 4. Estado do Frontend
- **Server State**: Gerenciado por Next.js Cache e `revalidatePath`.
- **Client State**: Minimalista (usando `useState` para UI components e TanStack Query para dados em tempo real se necessário).
