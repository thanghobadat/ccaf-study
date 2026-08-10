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

      const questionTextVI = `[Tình huống #${i} • Nguyên tắc #${p.id}] Hệ thống của bạn gặp yêu cầu kỹ thuật liên quan đến '${p.titleVI}'. Bản chất cốt lõi: ${p.bodyVI} Phương án kiến trúc nào dưới đây là chuẩn xác nhất để tuân thủ nguyên tắc này?`;
      const questionTextEN = `[Scenario #${i} • Principle #${p.id}] Your system encounters a technical requirement involving '${p.title}'. Rationale: ${p.body} Which architectural action below is most accurate to comply with this principle?`;

      const correctOptVI = `A. ${p.correctPattern}`;
      const wrongOpt1VI = `B. ${p.antiPattern}`;
      const wrongOpt2VI = `C. Tải toàn bộ log hội thoại thô 150K token vào mảng messages mà không tước bỏ.`;
      const wrongOpt3VI = `D. Bỏ qua kiểm tra Schema và đặt temperature = 0.9.`;

      const correctOptEN = `A. ${p.correctPattern}`;
      const wrongOpt1EN = `B. ${p.antiPattern}`;
      const wrongOpt2EN = `C. Reload the entire raw 150K conversation log directly into messages array.`;
      const wrongOpt3EN = `D. Disable schema validation and set temperature to 0.9.`;

      // Options list
      const rawOptsVI = [correctOptVI, wrongOpt1VI, wrongOpt2VI, wrongOpt3VI];
      const rawOptsEN = [correctOptEN, wrongOpt1EN, wrongOpt2EN, wrongOpt3EN];

      // Shuffle options deterministically or pseudo-randomly based on (p.id + i)
      const shift = (p.id + i) % 4; // 0, 1, 2, 3
      
      const optionsVI = [];
      const optionsEN = [];
      let correctIndex = 0;

      for (let j = 0; j < 4; j++) {
        const targetIdx = (j + shift) % 4;
        if (targetIdx === 0) correctIndex = j;

        const letter = String.fromCharCode(65 + j); // 'A', 'B', 'C', 'D'
        const cleanVI = rawOptsVI[targetIdx].replace(/^[A-D]\.\s*/, '');
        const cleanEN = rawOptsEN[targetIdx].replace(/^[A-D]\.\s*/, '');

        optionsVI.push(`${letter}. ${cleanVI}`);
        optionsEN.push(`${letter}. ${cleanEN}`);
      }

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
        options: optionsVI,
        optionsEN: optionsEN,
        correct: correctIndex,
        explanation: expText,
        antiPattern: p.antiPattern,
        correctPattern: p.correctPattern
      });
    }
  });

  return pool;
}

const PRINCIPLES_PRACTICE_POOL = generatePrinciplesPracticePool();
