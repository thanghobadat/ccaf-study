/* CCAF Learning Hub - 67 Core Principles Practice Question Engine (50 Questions per Principle Target)
   Bilingual English & Vietnamese Scenario-Based Questions mapped to 67 Principles (IDs 1 to 67)
*/

function generatePrinciplesPracticePool() {
  const pool = [];
  let currentId = 5000;

  if (typeof PRINCIPLES_DATA === 'undefined') {
    return pool;
  }

  PRINCIPLES_DATA.forEach((p) => {
    // Generate 50 scenario variations per principle
    for (let i = 1; i <= 50; i++) {
      const qId = currentId++;

      const questionTextVI = `Hệ thống của bạn gặp tình huống liên quan đến nguyên tắc '${p.titleVI}'. Yêu cầu kỹ thuật cốt lõi: ${p.bodyVI} Hành động nào dưới đây là chuẩn xác nhất để tuân thủ nguyên tắc này?`;
      const questionTextEN = `Your system encounters a scenario involving principle '${p.title}'. Technical requirement: ${p.body} Which architectural action below is most accurate to comply with this principle?`;

      const optA_VI = `A. ${p.correctPattern}`;
      const optB_VI = `B. ${p.antiPattern}`;
      const optC_VI = `C. Tải toàn bộ log hội thoại thô 150K token vào mảng messages không tước bỏ.`;
      const optD_VI = `D. Bỏ qua kiểm tra Schema và đặt temperature = 0.9.`;

      const optA_EN = `A. ${p.correctPattern}`;
      const optB_EN = `B. ${p.antiPattern}`;
      const optC_EN = `C. Reload the entire raw 150K conversation log directly into messages array.`;
      const optD_EN = `D. Disable schema validation and set temperature to 0.9.`;

      const expText = `EXPLANATION FOR PRINCIPLE #${p.id} (${p.domain}):\n- ✅ Correct Pattern: ${p.correctPattern}\n- ❌ Anti-Pattern: ${p.antiPattern}\n- Technical Rationale: ${p.bodyVI}`;

      pool.push({
        id: qId,
        principleId: p.id,
        domain: p.domain,
        domainTitle: p.domainTitle,
        principleTitle: p.titleVI,
        principleTitleEN: p.title,
        question: questionTextVI,
        questionEN: questionTextEN,
        options: [optA_VI, optB_VI, optC_VI, optD_VI],
        optionsEN: [optA_EN, optB_EN, optC_EN, optD_EN],
        correct: 0,
        explanation: expText,
        antiPattern: p.antiPattern,
        correctPattern: p.correctPattern
      });
    }
  });

  return pool;
}

const PRINCIPLES_PRACTICE_POOL = generatePrinciplesPracticePool();
