/* CCAF Learning Hub - 67 Core Principles Practice Module Logic (Global Scope & Auto-Advance) */

let practiceQuestions = [];
let practiceAnswers = {}; // qId -> selectedIndex
let practiceFlags = new Set();
let practiceTimer = null;
let practiceSecondsRemaining = 30 * 60;
let isPracticeSubmitted = false;
let currentPracticeIndex = 0;
let currentPracticeDomainFilter = 'ALL';
let autoAdvanceTimeout = null;

window.filterPrincipleChecklistByDomain = function(dom) {
  currentPracticeDomainFilter = dom;
  document.querySelectorAll('.domain-filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.domain === dom);
  });

  const cards = document.querySelectorAll('.principle-cb-card');
  cards.forEach(card => {
    const cardDom = card.dataset.domain;
    if (dom === 'ALL' || cardDom === dom) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
};

window.selectAllPrinciples = function(selectState) {
  const cards = document.querySelectorAll('.principle-cb-card');
  cards.forEach(card => {
    if (card.style.display !== 'none') {
      const cb = card.querySelector('.principle-cb');
      if (cb) cb.checked = selectState;
    }
  });
};

window.setPresetCount = function(count) {
  const countInput = document.getElementById('practice-count-input');
  if (countInput) countInput.value = count;
  
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.classList.toggle('btn-primary', parseInt(btn.dataset.count, 10) === count);
    btn.classList.toggle('btn-secondary', parseInt(btn.dataset.count, 10) !== count);
  });
};

function renderPrincipleChecklist() {
  const container = document.getElementById('principles-checklist-container');
  if (!container || typeof PRINCIPLES_DATA === 'undefined') return;

  const isEn = AppStore.getLang() === 'EN';

  // Check URL query param ?principle=ID
  const urlParams = new URLSearchParams(window.location.search);
  const targetPrincipleId = parseInt(urlParams.get('principle'), 10);

  container.innerHTML = PRINCIPLES_DATA.map(p => {
    const isChecked = targetPrincipleId ? (p.id === targetPrincipleId) : true;
    return `
      <label class="principle-cb-card" data-domain="${p.domain}">
        <input type="checkbox" class="principle-cb" value="${p.id}" ${isChecked ? 'checked' : ''}>
        <div>
          <strong style="color: var(--accent-purple);">#${p.id} (${p.domain})</strong>
          <div style="font-size: 0.85rem; color: var(--text-primary); line-height: 1.3; margin-top: 0.2rem;">
            ${isEn ? p.title : p.titleVI}
          </div>
        </div>
      </label>
    `;
  }).join('');

  if (targetPrincipleId) {
    const targetCard = document.querySelector(`.principle-cb-card input[value="${targetPrincipleId}"]`);
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

window.startPrinciplesPracticeSession = function() {
  const checkedCbs = Array.from(document.querySelectorAll('.principle-cb:checked')).map(cb => parseInt(cb.value, 10));
  const countInput = document.getElementById('practice-count-input');
  let qCount = parseInt(countInput ? countInput.value : '10', 10);

  if (isNaN(qCount) || qCount < 1) qCount = 10;

  if (checkedCbs.length === 0) {
    AppStore.showToast("⚠️ Vui lòng tích chọn ít nhất 1 Nguyên tắc để bắt đầu ôn tập!");
    return;
  }

  // Filter pool questions matching checked principles
  if (typeof PRINCIPLES_PRACTICE_POOL === 'undefined') {
    AppStore.showToast("⚠️ Chưa tải được bộ câu hỏi luyện tập!");
    return;
  }

  let pool = PRINCIPLES_PRACTICE_POOL.filter(q => checkedCbs.includes(q.principleId));

  if (pool.length === 0) {
    AppStore.showToast("⚠️ Không tìm thấy câu hỏi cho các Nguyên tắc đã chọn!");
    return;
  }

  // Random shuffle pool questions
  pool.sort(() => Math.random() - 0.5);

  practiceQuestions = pool.slice(0, Math.min(qCount, pool.length));
  isPracticeSubmitted = false;
  practiceAnswers = {};
  practiceFlags.clear();
  currentPracticeIndex = 0;

  practiceSecondsRemaining = Math.max(5 * 60, Math.round(practiceQuestions.length * 1.5 * 60));

  document.getElementById('practice-setup-box').style.display = 'none';
  document.getElementById('practice-arena-box').style.display = 'block';

  startPracticeTimer();
  renderPracticeQuestionGrid();
  renderCurrentPracticeQuestion();
};

function startPracticeTimer() {
  if (practiceTimer) clearInterval(practiceTimer);
  const timerEl = document.getElementById('practice-timer-display');

  practiceTimer = setInterval(() => {
    practiceSecondsRemaining--;
    if (practiceSecondsRemaining <= 0) {
      clearInterval(practiceTimer);
      window.submitPracticeSession();
      AppStore.showToast("⏰ Đã hết thời gian làm bài!");
    } else {
      const mins = Math.floor(practiceSecondsRemaining / 60);
      const secs = practiceSecondsRemaining % 60;
      if (timerEl) {
        timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      }
    }
  }, 1000);
}

function renderPracticeQuestionGrid() {
  const gridContainer = document.getElementById('practice-question-grid');
  if (!gridContainer) return;

  gridContainer.innerHTML = practiceQuestions.map((q, idx) => {
    let btnClass = 'btn btn-secondary';
    const isAnswered = practiceAnswers[q.id] !== undefined;
    const isFlagged = practiceFlags.has(q.id);
    const isCurrent = idx === currentPracticeIndex;

    if (isAnswered) btnClass = 'btn btn-primary';
    if (isFlagged) btnClass += ' flagged';
    if (isCurrent) btnClass += ' active-q';

    return `
      <button type="button" class="${btnClass}" style="padding: 0.4rem; font-size: 0.8rem; width: 100%; min-height: 36px;" onclick="window.jumpToPracticeQuestion(${idx})">
        ${idx + 1} ${isFlagged ? '🚩' : ''}
      </button>
    `;
  }).join('');

  const statsEl = document.getElementById('practice-stats-display');
  const answeredCount = Object.keys(practiceAnswers).length;
  const flaggedCount = practiceFlags.size;

  if (statsEl) {
    statsEl.textContent = `Đã làm: ${answeredCount}/${practiceQuestions.length} | Cắm cờ: ${flaggedCount}`;
  }
}

window.jumpToPracticeQuestion = function(idx) {
  idx = parseInt(idx, 10);
  if (isNaN(idx) || idx < 0 || idx >= practiceQuestions.length) return;

  if (autoAdvanceTimeout) clearTimeout(autoAdvanceTimeout);

  currentPracticeIndex = idx;
  renderPracticeQuestionGrid();
  renderCurrentPracticeQuestion();
};

function renderCurrentPracticeQuestion() {
  const container = document.getElementById('current-practice-question-container');
  if (!container) return;

  const q = practiceQuestions[currentPracticeIndex];
  if (!q) return;

  const isEn = AppStore.getLang() === 'EN';

  const qText = (isEn && q.questionEN) ? q.questionEN : q.question;
  const optsText = (isEn && q.optionsEN) ? q.optionsEN : q.options;

  const isSelected = practiceAnswers[q.id];
  const isFlagged = practiceFlags.has(q.id);

  container.innerHTML = `
    <div class="card" style="padding: 2rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.5rem;">
        <div>
          <span class="badge badge-${q.domain.toLowerCase()}">Câu ${currentPracticeIndex + 1} / ${practiceQuestions.length} • ${q.domain}</span>
          <span class="badge" style="background: rgba(139, 92, 246, 0.15); color: var(--accent-purple); margin-left: 0.5rem;">
            Nguyên tắc #${q.principleId}
          </span>
        </div>

        <button type="button" class="btn btn-secondary" style="font-size: 0.82rem; ${isFlagged ? 'background: rgba(245, 158, 11, 0.2); border-color: var(--accent-amber); color: var(--accent-amber);' : ''}" onclick="window.toggleFlagCurrentPracticeQuestion()">
          ${isFlagged ? '🚩 Đã Cắm Cờ' : '🏁 Cắm Cờ Xem Lại'}
        </button>
      </div>

      <div style="font-size: 0.85rem; color: var(--accent-purple); font-weight: 700; margin-bottom: 0.5rem;">
        📌 ${isEn ? q.principleTitleEN : q.principleTitle}
      </div>

      <h2 style="font-size: 1.15rem; line-height: 1.6; margin-bottom: 1.5rem; color: var(--text-primary);">${qText}</h2>

      <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-bottom: 2rem;">
        ${optsText.map((opt, oIdx) => {
          let optClass = 'quiz-option';
          if (isSelected === oIdx) optClass += ' selected';

          if (isPracticeSubmitted) {
            if (oIdx === q.correct) optClass += ' correct-option';
            else if (isSelected === oIdx && isSelected !== q.correct) optClass += ' wrong-option';
          }

          return `
            <label class="${optClass}" onclick="window.selectPracticeOption(${q.id}, ${oIdx})">
              <input type="radio" name="practice_q_${q.id}" ${isSelected === oIdx ? 'checked' : ''} style="transform: scale(1.25); cursor: pointer; accent-color: var(--accent-purple); margin-right: 0.5rem; pointer-events: none;">
              <span>${opt}</span>
            </label>
          `;
        }).join('')}
      </div>

      ${isPracticeSubmitted ? `
        <div class="callout ${isSelected === q.correct ? '' : 'callout-warning'}" style="margin-top: 1.5rem;">
          <div class="callout-title">
            ${isSelected === q.correct ? '✅ ĐÚNG NGUYÊN TẮC KIẾN TRÚC' : '❌ CHƯA CHÍNH XÁC (XEM GIẢI THÍCH)'}
          </div>
          <div style="font-size: 0.95rem; line-height: 1.6; margin-bottom: 1rem;">${q.explanation}</div>

          <div style="background: var(--bg-card); border-radius: 8px; padding: 1rem; border: 1px solid var(--border-color); font-size: 0.88rem;">
            <div style="color: var(--accent-emerald); font-weight: 700; margin-bottom: 0.3rem;">🟢 Correct Pattern:</div>
            <div style="color: var(--text-primary); margin-bottom: 0.75rem;">${q.correctPattern}</div>
            <div style="color: var(--accent-rose); font-weight: 700; margin-bottom: 0.3rem;">🔴 Anti-Pattern:</div>
            <div style="color: var(--text-primary);">${q.antiPattern}</div>
          </div>
        </div>
      ` : ''}

      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; padding-top: 1.25rem; border-top: 1px solid var(--border-color);">
        <button type="button" class="btn btn-secondary" onclick="window.jumpToPracticeQuestion(${currentPracticeIndex - 1})" ${currentPracticeIndex === 0 ? 'disabled style="opacity:0.5;"' : ''}>
          ← Câu Trước
        </button>

        <button type="button" class="btn btn-primary" onclick="window.jumpToPracticeQuestion(${currentPracticeIndex + 1})" ${currentPracticeIndex === practiceQuestions.length - 1 ? 'disabled style="opacity:0.5;"' : ''}>
          Câu Tiếp Theo →
        </button>
      </div>
    </div>
  `;
}

window.selectPracticeOption = function(qId, oIdx) {
  if (isPracticeSubmitted) return;
  
  practiceAnswers[qId] = oIdx;
  renderPracticeQuestionGrid();
  renderCurrentPracticeQuestion();

  // Smooth Auto-Advance to next question after 350ms if not submitted and not last question
  if (autoAdvanceTimeout) clearTimeout(autoAdvanceTimeout);
  if (currentPracticeIndex < practiceQuestions.length - 1) {
    autoAdvanceTimeout = setTimeout(() => {
      window.jumpToPracticeQuestion(currentPracticeIndex + 1);
    }, 350);
  }
};

window.toggleFlagCurrentPracticeQuestion = function() {
  const q = practiceQuestions[currentPracticeIndex];
  if (!q) return;

  if (practiceFlags.has(q.id)) {
    practiceFlags.delete(q.id);
  } else {
    practiceFlags.add(q.id);
  }
  renderPracticeQuestionGrid();
  renderCurrentPracticeQuestion();
};

window.submitPracticeSession = function() {
  if (isPracticeSubmitted) return;
  isPracticeSubmitted = true;
  if (practiceTimer) clearInterval(practiceTimer);

  let correctCount = 0;
  practiceQuestions.forEach(q => {
    if (practiceAnswers[q.id] === q.correct) {
      correctCount++;
    }
  });

  const percentage = Math.round((correctCount / practiceQuestions.length) * 100);

  const reportBox = document.getElementById('practice-report-modal');
  if (reportBox) {
    reportBox.style.display = 'flex';
    document.getElementById('practice-report-score').textContent = `${percentage}%`;
    document.getElementById('practice-report-details').textContent = `Bạn đã trả lời đúng ${correctCount} / ${practiceQuestions.length} câu. Ngưỡng đạt là 75%.`;
  }

  renderPracticeQuestionGrid();
  renderCurrentPracticeQuestion();
};

window.closePracticeReportModal = function() {
  const reportBox = document.getElementById('practice-report-modal');
  if (reportBox) reportBox.style.display = 'none';
};

document.addEventListener('DOMContentLoaded', () => {
  renderPrincipleChecklist();
});
