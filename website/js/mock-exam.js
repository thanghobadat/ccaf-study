/* CCAF Learning Hub - Proctored Official Mock Exam Engine (Global Scope & Zero-Duplicate Filter) */

let mockExamQuestions = [];
let mockExamAnswers = {}; // qId -> selectedIndex
let mockExamFlags = new Set(); // qId set
let mockExamTimer = null;
let mockSecondsRemaining = 120 * 60; // 120 mins
let isMockSubmitted = false;
let currentExamIndex = 0;
let currentMockExamLabel = 'OFFICIAL_MOCK_60Q';

window.toggleMockDomains = function(selectState) {
  document.querySelectorAll('.mock-domain-cb').forEach(cb => {
    cb.checked = selectState;
  });
};

window.startCustomPracticeExam = function() {
  const checkedDoms = Array.from(document.querySelectorAll('.mock-domain-cb:checked')).map(cb => cb.value);
  const countInput = document.getElementById('practice-count-input');
  let qCount = parseInt(countInput ? countInput.value : '10', 10);

  if (isNaN(qCount) || qCount < 1) qCount = 10;

  if (checkedDoms.length === 0) {
    AppStore.showToast("⚠️ Vui lòng tích chọn ít nhất 1 Domain để ôn tập!");
    return;
  }

  if (typeof MOCK_EXAM_QUESTION_POOL === 'undefined') {
    AppStore.showToast("⚠️ Chưa tải được bộ đề thi mô phỏng!");
    return;
  }

  // Filter questions belonging to checked domains
  let pool = MOCK_EXAM_QUESTION_POOL.filter(q => checkedDoms.includes(q.domain));

  if (pool.length === 0) {
    AppStore.showToast("⚠️ Không tìm thấy câu hỏi cho Domain đã chọn!");
    return;
  }

  // Shuffle pool with zero-duplicate guarantee
  pool.sort(() => Math.random() - 0.5);
  
  // Pick unique questions by ID & text
  const picked = [];
  const pickedIds = new Set();
  const pickedTexts = new Set();
  for (const q of pool) {
    const cleanText = q.question.replace(/^\[.*?\]\s*/, '');
    if (!pickedIds.has(q.id) && !pickedTexts.has(cleanText)) {
      pickedIds.add(q.id);
      pickedTexts.add(cleanText);
      picked.push(q);
      if (picked.length >= qCount) break;
    }
  }

  mockExamQuestions = picked;
  currentMockExamLabel = `PRACTICE_${checkedDoms.join('_')}_${mockExamQuestions.length}Q`;
  isMockSubmitted = false;
  mockExamAnswers = {};
  mockExamFlags.clear();
  currentExamIndex = 0;

  mockSecondsRemaining = Math.max(5 * 60, Math.round(mockExamQuestions.length * 1.5 * 60));

  document.getElementById('mock-setup-card').style.display = 'none';
  document.getElementById('mock-arena-box').style.display = 'block';

  startMockTimer();
  renderQuestionGrid();
  renderCurrentQuestion();
};

window.startOfficialMockExam = function() {
  if (typeof MOCK_EXAM_QUESTION_POOL === 'undefined') {
    AppStore.showToast("⚠️ Chưa tải được bộ đề thi mô phỏng!");
    return;
  }

  isMockSubmitted = false;
  mockExamAnswers = {};
  mockExamFlags.clear();
  mockSecondsRemaining = 120 * 60;
  currentExamIndex = 0;
  currentMockExamLabel = 'OFFICIAL_MOCK_60Q';

  // Draw 60 UNIQUE questions matching official domain weight distribution (D1: 16Q, D2: 11Q, D3: 12Q, D4: 12Q, D5: 9Q)
  const drawUniqueDomain = (domCode, count) => {
    const subPool = MOCK_EXAM_QUESTION_POOL.filter(q => q.domain === domCode).sort(() => Math.random() - 0.5);
    const picked = [];
    const pickedIds = new Set();
    const pickedTexts = new Set();
    for (const q of subPool) {
      const cleanText = q.question.replace(/^\[.*?\]\s*/, '');
      if (!pickedIds.has(q.id) && !pickedTexts.has(cleanText)) {
        pickedIds.add(q.id);
        pickedTexts.add(cleanText);
        picked.push(q);
        if (picked.length >= count) break;
      }
    }
    return picked;
  };

  const d1Pool = drawUniqueDomain('D1', 16);
  const d2Pool = drawUniqueDomain('D2', 11);
  const d3Pool = drawUniqueDomain('D3', 12);
  const d4Pool = drawUniqueDomain('D4', 12);
  const d5Pool = drawUniqueDomain('D5', 9);

  mockExamQuestions = [...d1Pool, ...d2Pool, ...d3Pool, ...d4Pool, ...d5Pool].sort(() => Math.random() - 0.5);

  document.getElementById('mock-setup-card').style.display = 'none';
  document.getElementById('mock-arena-box').style.display = 'block';

  startMockTimer();
  renderQuestionGrid();
  renderCurrentQuestion();
};

function startMockTimer() {
  if (mockExamTimer) clearInterval(mockExamTimer);
  const timerEl = document.getElementById('mock-timer-val');

  mockExamTimer = setInterval(() => {
    mockSecondsRemaining--;
    if (mockSecondsRemaining <= 0) {
      clearInterval(mockExamTimer);
      window.submitMockExam();
      AppStore.showToast("⏰ Đã hết thời gian thi!");
    } else {
      const hours = Math.floor(mockSecondsRemaining / 3600);
      const mins = Math.floor((mockSecondsRemaining % 3600) / 60);
      const secs = mockSecondsRemaining % 60;
      if (timerEl) {
        timerEl.textContent = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      }
    }
  }, 1000);
}

function renderQuestionGrid() {
  const gridEl = document.getElementById('question-nav-grid');
  if (!gridEl) return;

  gridEl.innerHTML = mockExamQuestions.map((q, idx) => {
    const isAnswered = mockExamAnswers[q.id] !== undefined;
    const isFlagged = mockExamFlags.has(q.id);
    const isActive = idx === currentExamIndex;

    let btnClass = 'grid-nav-btn';
    if (isActive) btnClass += ' active-nav';
    if (isFlagged) btnClass += ' flagged-nav';
    else if (isAnswered) btnClass += ' answered-nav';

    return `
      <button type="button" class="${btnClass}" onclick="window.jumpToQuestion(${idx})" title="Câu ${idx + 1} (${q.domain})">
        ${idx + 1}
      </button>
    `;
  }).join('');

  const answeredCount = Object.keys(mockExamAnswers).length;
  const flaggedCount = mockExamFlags.size;
  const statsEl = document.getElementById('grid-stats-text');
  if (statsEl) {
    statsEl.textContent = `Đã làm: ${answeredCount}/${mockExamQuestions.length} | Cắm cờ: ${flaggedCount}`;
  }
}

window.jumpToQuestion = function(idx) {
  idx = parseInt(idx, 10);
  if (isNaN(idx) || idx < 0 || idx >= mockExamQuestions.length) return;
  currentExamIndex = idx;
  renderQuestionGrid();
  renderCurrentQuestion();
};

function renderCurrentQuestion() {
  const qContainer = document.getElementById('current-question-container');
  if (!qContainer) return;

  const q = mockExamQuestions[currentExamIndex];
  if (!q) return;

  const currentLang = AppStore.getLang();

  const rawQText = (currentLang === 'EN' && q.questionEN) ? q.questionEN : q.question;
  const qText = rawQText.replace(/^\[.*?\]\s*/, '');
  const optsText = (currentLang === 'EN' && q.optionsEN) ? q.optionsEN : q.options;

  const isSelected = mockExamAnswers[q.id];
  const isFlagged = mockExamFlags.has(q.id);

  qContainer.innerHTML = `
    <div class="card" style="padding: 2rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.5rem;">
        <span class="badge badge-${q.domain.toLowerCase()}">Câu ${currentExamIndex + 1} / ${mockExamQuestions.length} • ${q.domain}</span>
        
        <button type="button" class="btn btn-secondary" style="font-size: 0.82rem; ${isFlagged ? 'background: rgba(245, 158, 11, 0.2); border-color: var(--accent-amber); color: var(--accent-amber);' : ''}" onclick="window.toggleFlagCurrentQuestion()">
          ${isFlagged ? '🚩 Đã Cắm Cờ Bỏ Qua' : '🏁 Cắm Cờ Xem Lại (Flag)'}
        </button>
      </div>

      <h2 style="font-size: 1.15rem; line-height: 1.6; margin-bottom: 1.5rem; color: var(--text-primary);">${qText}</h2>

      <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-bottom: 2rem;">
        ${optsText.map((opt, oIdx) => {
          let optClass = 'quiz-option';
          if (isSelected === oIdx) optClass += ' selected';

          if (isMockSubmitted) {
            if (oIdx === q.correct) optClass += ' correct-option';
            else if (isSelected === oIdx && isSelected !== q.correct) optClass += ' wrong-option';
          }

          let cardBg = 'var(--bg-tertiary)';
          let cardBorder = '1px solid var(--border-color)';
          let cardShadow = '0 2px 4px rgba(0,0,0,0.1)';
          let cardColor = 'var(--text-primary)';

          if (isSelected === oIdx) {
            cardBg = 'rgba(139, 92, 246, 0.18)';
            cardBorder = '2px solid var(--accent-purple)';
            cardShadow = '0 0 14px rgba(139, 92, 246, 0.35)';
          }

          if (isMockSubmitted) {
            if (oIdx === q.correct) {
              cardBg = 'rgba(16, 185, 129, 0.18)';
              cardBorder = '2px solid var(--accent-emerald)';
              cardColor = 'var(--accent-emerald)';
            } else if (isSelected === oIdx && isSelected !== q.correct) {
              cardBg = 'rgba(244, 63, 94, 0.18)';
              cardBorder = '2px solid var(--accent-rose)';
              cardColor = 'var(--accent-rose)';
            }
          }

          const cardStyle = `display: flex !important; align-items: center !important; gap: 0.85rem !important; background: ${cardBg} !important; border: ${cardBorder} !important; padding: 1rem 1.25rem !important; border-radius: 12px !important; cursor: pointer !important; font-size: 0.95rem !important; color: ${cardColor} !important; margin-bottom: 0.75rem !important; box-shadow: ${cardShadow} !important; transition: all 0.2s ease !important;`;

          return `
            <label class="${optClass}" style="${cardStyle}" onclick="window.selectOption(${q.id}, ${oIdx})">
              <input type="radio" name="mock_q_${q.id}" ${isSelected === oIdx ? 'checked' : ''} style="transform: scale(1.25); cursor: pointer; accent-color: var(--accent-purple); margin-right: 0.5rem; pointer-events: none;">
              <span>${opt}</span>
            </label>
          `;
        }).join('')}
      </div>

      ${isMockSubmitted ? `
        <div class="callout ${isSelected === q.correct ? '' : 'callout-warning'}" style="margin-top: 1.5rem;">
          <div class="callout-title">
            ${isSelected === q.correct ? '✅ ĐÁP ÁN CHÍNH XÁC' : '❌ CHƯA CHÍNH XÁC'}
          </div>
          <div style="font-size: 0.95rem; line-height: 1.6;">${q.explanation}</div>
        </div>
      ` : ''}

      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; padding-top: 1.25rem; border-top: 1px solid var(--border-color);">
        <button type="button" class="btn btn-secondary" onclick="window.jumpToQuestion(${currentExamIndex - 1})" ${currentExamIndex === 0 ? 'disabled style="opacity:0.5;"' : ''}>
          ← Câu Trước
        </button>

        <button type="button" class="btn btn-primary" onclick="window.jumpToQuestion(${currentExamIndex + 1})" ${currentExamIndex === mockExamQuestions.length - 1 ? 'disabled style="opacity:0.5;"' : ''}>
          Câu Tiếp Theo →
        </button>
      </div>
    </div>
  `;
}

window.selectOption = function(qId, oIdx) {
  if (isMockSubmitted) return;
  mockExamAnswers[qId] = oIdx;
  renderQuestionGrid();
  renderCurrentQuestion();
};

window.toggleFlagCurrentQuestion = function() {
  const q = mockExamQuestions[currentExamIndex];
  if (!q) return;

  if (mockExamFlags.has(q.id)) {
    mockExamFlags.delete(q.id);
  } else {
    mockExamFlags.add(q.id);
  }
  renderQuestionGrid();
  renderCurrentQuestion();
};

window.submitMockExam = function() {
  if (isMockSubmitted) return;
  isMockSubmitted = true;
  if (mockExamTimer) clearInterval(mockExamTimer);

  let totalScore = 0;
  const domainScores = { D1: 0, D2: 0, D3: 0, D4: 0, D5: 0 };
  const domainTotals = { D1: 0, D2: 0, D3: 0, D4: 0, D5: 0 };

  mockExamQuestions.forEach(q => {
    domainTotals[q.domain] = (domainTotals[q.domain] || 0) + 1;
    if (mockExamAnswers[q.id] === q.correct) {
      totalScore++;
      domainScores[q.domain] = (domainScores[q.domain] || 0) + 1;
    }
  });

  const percentage = Math.round((totalScore / mockExamQuestions.length) * 100);
  const isPassed = percentage >= 72; // Official Anthropic CCAF Pass Score is 720/1000 (72%)

  // Award XP to AppStore safely
  if (typeof AppStore !== 'undefined') {
    try {
      if (AppStore.addXP) AppStore.addXP(totalScore * 10);
      if (AppStore.recordExamResult) {
        AppStore.recordExamResult({
          date: new Date().toISOString(),
          label: currentMockExamLabel,
          score: percentage,
          passed: isPassed,
          correct: totalScore,
          total: mockExamQuestions.length
        });
      }
    } catch (e) {
      console.warn("AppStore error during submission:", e);
    }
  }

  // Show Report Modal
  const reportModal = document.getElementById('mock-report-modal');
  if (reportModal) {
    reportModal.style.display = 'flex';
    reportModal.classList.add('active');
    
    const scoreEl = document.getElementById('mock-report-score');
    if (scoreEl) scoreEl.textContent = `${percentage}%`;

    const statusEl = document.getElementById('mock-report-status');
    if (statusEl) {
      statusEl.textContent = isPassed ? "🎉 BẠN ĐÃ ĐẠT (PASS)" : "⚠️ CHƯA ĐẠT (FAIL)";
      statusEl.style.color = isPassed ? "var(--accent-emerald)" : "var(--accent-rose)";
    }

    const detailsEl = document.getElementById('mock-report-details');
    if (detailsEl) {
      detailsEl.textContent = `Bạn trả lời đúng ${totalScore}/${mockExamQuestions.length} câu. Ngưỡng đạt CCAF của Anthropic là 72%.`;
    }

    // Render Domain Scores Breakdown
    const breakContainer = document.getElementById('mock-domain-breakdown');
    if (breakContainer) {
      breakContainer.innerHTML = Object.keys(domainTotals).map(dom => {
        const dScore = domainScores[dom] || 0;
        const dTot = domainTotals[dom] || 0;
        const dPct = dTot > 0 ? Math.round((dScore / dTot) * 100) : 0;
        return `
          <div style="display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 0.4rem;">
            <span>${dom}: ${dScore}/${dTot}</span>
            <strong style="color: ${dPct >= 72 ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">${dPct}%</strong>
          </div>
        `;
      }).join('');
    }
    
    // Scroll smooth to top so modal is in full view
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  renderQuestionGrid();
  renderCurrentQuestion();
};

window.closeReportModal = function() {
  const reportModal = document.getElementById('mock-report-modal');
  if (reportModal) {
    reportModal.style.display = 'none';
    reportModal.classList.remove('active');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Setup default state
});
