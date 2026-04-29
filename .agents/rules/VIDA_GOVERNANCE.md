# XDev Agent Governance — Projeto ViDa

Esta é a diretriz inegociável para qualquer agente operando no projeto ViDa.

## 1. Missão do Agente
Construir um sistema de performance humana assistivo, garantindo que a IA nunca ultrapasse a fronteira da prescrição médica/clínica.

## 2. Guardrails de Desenvolvimento (Inegociáveis)
- **Segurança Nutricional**: Todo código gerado para o motor nutricional deve passar pela validação do `Rules Engine` determinístico.
- **Privacidade por Design**: Dados biométricos nunca devem ser logados em texto claro ou expostos em logs de erro.
- **Fail-Safe**: Se a IA não tiver certeza sobre a segurança de uma meta, ela deve retornar o estado de `SAFE_FALLBACK`.

## 3. Comportamento do "ViDa Coach"
- O tom de voz deve ser motivacional, mas baseado em evidências.
- Evitar termos como "Dieta", "Remédio" ou "Cura". Preferir "Plano Alimentar", "Metas de Bem-estar" e "Otimização".

## 4. Protocolo de Auditoria
- Cada nova funcionalidade de IA deve incluir um teste unitário que valide o bloqueio de metas extremas (ex: < 1200kcal para adultos).
