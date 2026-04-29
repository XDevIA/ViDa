# PRD — WEBAPP ViDa (Versão 1.1 - Auditada)

**Data**: 2026-04-28
**Status**: Aprovado para Technical Spec A2 (Bloqueado para Implementação)
**Orquestrador**: Xdan (XDev OS)
**Visão**: Sistema de wellness assistivo, auditável e governado por IA, focado em segurança nutricional e consistência fitness.

---

## 1. Objetivo e Posicionamento
O **ViDa** é uma plataforma de planejamento e acompanhamento fitness que atua como assistente educativo. O sistema **não prescreve** dietas ou treinos clínicos, mas organiza metas de bem-estar baseadas em parâmetros configuráveis, integrando alimentação, esforço físico e recuperação.

## 2. Arquitetura de Decisão Assistiva
Para garantir a segurança, o sistema opera em camadas:
1. **Safety Screening (M0)**: Triagem inicial de riscos.
2. **Rules Engine**: Motor determinístico para cálculos basais (Harris-Benedict/Mifflin-St Jeor).
3. **IA Coach (ViDa Engine)**: Camada generativa que traduz dados em linguagem natural e sugere ajustes dentro de faixas seguras.
4. **Validation Layer**: Guardrails que bloqueiam respostas fora das diretrizes de saúde.

---

## 3. Estrutura de Módulos

### M0: Health Safety Screening (Obrigatório)
Antes de qualquer plano, o usuário deve declarar:
- Idade (Bloqueio para menores sem supervisão).
- Condições clínicas (Diabetes, Hipertensão, Doença Renal, etc).
- Histórico de transtornos alimentares.
- Gestação/Lactação.
- **Flag de Risco**: Se detectado risco clínico, o sistema bloqueia recomendações e exige validação profissional.

### M1: Bio-Data & Metas Bio-Adaptativas
- Cálculo de TMB e Massa Magra (baseado em BF% ou estimativa visual monitorada).
- Ajuste de Macros: Proteína (g/kg), Carbos (ajustados por carga de treino) e Gorduras.
- **Déficit Seguro**: Limite de 15-20% de déficit sobre o GCD (Gasto Calórico Diário).

### M2: Nutrição e Suplementação Educativa
- O sistema identifica lacunas e sugere **fontes alimentares primeiro**.
- Suplementação é tratada como info-educativa, sem doses terapêuticas ou promessas de resultado clínico.

### M4: Treino Inteligente (Avançado)
- Gestão de Volume Semanal por grupo muscular.
- Progressão de carga e monitoramento de RPE/RIR (Percepção de Esforço).
- Protocolos de **Deload** automáticos sugeridos pela IA após ciclos de fadiga acumulada.

---

## 4. Governança e Guardrails de IA

### Bloqueios de Segurança (Fail-Safe)
- Impedir metas calóricas abaixo da Taxa Metabólica Basal (TMB).
- Bloquear recomendações de jejum agressivo ou restrição extrema.
- Proibir sugestão de substâncias de risco (estimulantes agressivos, diuréticos, etc).

### Score ViDa (Métrica Positiva)
- O Score (0-100) deve ser **educativo e motivacional**, nunca punitivo.
- Composição: Aderência Nutricional (30%), Treino (25%), Cardio (20%), Hidratação (15%), Recuperação/Consistência (10%).

---

## 5. Privacidade e LGPD (Health-Grade)
- **Dados Sensíveis**: Criptografia em repouso e em trânsito para dados de saúde/biometria.
- **Consentimento**: Opt-in explícito para processamento de dados por IA.
- **Direitos**: Funcionalidades de exportação e exclusão total de dados (Direito ao Esquecimento).
- **Isolação**: Separação lógica entre dados cadastrais e dados de evolução física.

---

## 6. Auditabilidade
Todo plano ou ajuste sugerido pela IA deve gerar um log técnico contendo:
- Versão do Prompt e Modelo.
- Inputs do Rules Engine.
- Guardrails aplicados.
- Raciocínio da recomendação.

---

## 8. Módulos Experimentais (State-of-the-Art)

Estes módulos colocam o ViDa na vanguarda tecnológica de 2026:

### M5: Digital Twin Fisiológico (Gêmeo Digital)
O sistema constrói um modelo matemático que evolui com o usuário:
- **Calibração Metabólica**: A IA compara a perda/ganho de peso real com o teórico e ajusta as fórmulas de TMB para a biologia específica do indivíduo.
- **Simulação de Resultados**: Permite ao usuário simular: "Se eu mantiver esta constância, como estarei em 6 meses?".

### M6: Interface Generativa e Adaptativa (Context-Aware UI)
A experiência do usuário muda conforme o contexto:
- **Modo Performance**: Durante o horário de treino, a UI foca em cronômetros, cargas e progressão.
- **Modo Recuperação**: No pós-treino ou à noite, foca em hidratação, sono e nutrição reparadora.
- **Micro-ajustes de UI**: IA reorganiza os cards do dashboard baseada na prioridade do dia (ex: Foco em Proteína se o usuário estiver abaixo da meta).

### M7: Análise Preditiva de Fadiga e Lesão
Prevenção proativa baseada em dados:
- **Trend Analysis**: Monitora a relação entre volume de treino, intensidade (RPE) e ingestão calórica/proteica.
- **Early Warning System**: Alerta sobre risco de overtraining ou estagnação antes que ocorram, sugerindo ajustes de carga ou dias extras de descanso.

---

## 9. Próximos Passos (Workflow XDev)
1. **A2 (Technical Spec)**: Definição do Rules Engine, Schema de Banco e Lógica do Digital Twin.
2. **A2.1 (Privacy Design)**: Governança LGPD para dados biométricos de alta fidelidade.
3. **A3 (Architecture)**: Setup da infraestrutura para processamento assíncrono de IA Preditiva.
4. **B1 (Prototipação)**: Design do Dashboard Adaptativo.
