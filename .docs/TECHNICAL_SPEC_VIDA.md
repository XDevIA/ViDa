# Technical Spec — WEBAPP ViDa (Versão 1.0)

Este documento detalha a arquitetura técnica, o modelo de dados e a lógica de orquestração do sistema ViDa.

---

## 1. Tech Stack Recomendado
- **Frontend/Backend**: Next.js 16+ (App Router).
- **Linguagem**: TypeScript (Strict Mode).
- **Banco de Dados**: PostgreSQL (via Supabase ou local).
- **ORM**: Prisma.
- **IA**: OpenAI (GPT-4o/o1) ou Google (Gemini 1.5 Pro) via SDK oficial.
- **Estilização**: Tailwind CSS v4.
- **Estado/Cache**: React Server Components + TanStack Query (para client-side).

---

## 2. Modelo de Dados (Schema Prisma)

```prisma
// Entidades Principais (Resumo)

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  profile       Profile?
  measurements  Measurement[]
  nutritionLogs NutritionLog[]
  workoutLogs   WorkoutLog[]
  cardioLogs    CardioLog[]
  digitalTwin   DigitalTwinState?
  auditLogs     AIAuditLog[]
}

model Profile {
  userId        String    @unique
  age           Int
  gender        String
  height        Float
  activityLevel Float     // Multiplicador (1.2 - 1.9)
  goal          String    // CUTTING, BULKING, MAINTENANCE
  conditions    String[]  // Triagem M0
  isSafetyPass  Boolean   @default(false)
}

model Measurement {
  id            String    @id @default(cuid())
  userId        String
  weight        Float
  bodyFat       Float?
  leanMass      Float?
  createdAt     DateTime  @default(now())
}

model NutritionLog {
  id            String    @id @default(cuid())
  userId        String
  protein       Float
  carbs         Float
  fat           Float
  calories      Float
  water         Float
  createdAt     DateTime  @default(now())
}

model DigitalTwinState {
  userId            String    @unique
  metabolicFactor   Float     @default(1.0) // Fator de calibração real vs teórico
  predictedPlateau  DateTime?
  lastSync          DateTime  @default(now())
}

model AIAuditLog {
  id            String    @id @default(cuid())
  userId        String
  promptVersion String
  rawInput      Json
  rawOutput     String
  guardrailHit  Boolean
  reasoning     String
}
```

---

## 3. Rules Engine (Core Nutricional)

O sistema utilizará fórmulas determinísticas como base inegociável:

### A. Taxa Metabólica Basal (TMB)
- **Fórmula de Mifflin-St Jeor**:
  - Homens: `(10 * peso) + (6.25 * altura) - (5 * idade) + 5`
  - Mulheres: `(10 * peso) + (6.25 * altura) - (5 * idade) - 161`

### B. Gasto Calórico Diário (GCD)
- `TMB * activityLevel` + `Gasto Cardiorespiratório Real (CardioLog)`.

### C. Distribuição de Macronutrientes (Default)
- **Proteína**: 1.8g a 2.2g por kg de Massa Magra (ou peso total se BF% desconhecido).
- **Gordura**: 0.7g a 1.0g por kg.
- **Carboidratos**: Restante calórico, ajustado dinamicamente pelo volume de treino do dia.

---

## 4. Orquestração de IA & Guardrails

### Pipeline de Resposta:
1. **Context Builder**: Coleta dados do `Profile`, `Measurements` recentes e `WorkoutLogs`.
2. **Rules Engine Pre-calc**: Define os limites mínimos e máximos de calorias e macros para o dia.
3. **LLM Generation**: A IA gera a sugestão de plano ou ajuste educativo.
4. **Guardrail Validator**: Um script verifica se a sugestão da IA está dentro de +/- 10% do calculado pelo motor de regras. Se falhar, a resposta é truncada e o log de erro é gerado.

---

## 5. Estratégia de Interface Adaptativa (M6)
- **States**: `RESTING`, `PERFORMANCE`, `CRITICAL_LOW`.
- **Logic**: 
  - Se `now()` está no intervalo de `WorkoutSchedule` -> Ativar `PERFORMANCE_THEME`.
  - Se `NutritionLog.calories < TMB * 0.8` -> Ativar `CRITICAL_LOW_ALERT`.

---

## 6. Próximos Passos (Fase A3)
- Inicialização do repositório Next.js.
- Setup do Prisma e migração inicial.
- Criação dos utilitários do Rules Engine em `/src/lib/rules`.
