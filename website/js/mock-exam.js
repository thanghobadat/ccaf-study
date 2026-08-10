/* CCAF Learning Hub - Proctored Official Mock Exam Engine (2 Modes: Custom Practice & Official 60Q) */

let mockExamQuestions = [];
let mockExamAnswers = {}; // qId -> selectedIndex
let mockExamFlags = new Set(); // qId set
let mockExamTimer = null;
let mockSecondsRemaining = 120 * 60; // 120 mins
let isMockSubmitted = false;
let currentExamIndex = 0;
let currentMockExamLabel = 'OFFICIAL_MOCK_60Q';

function toggleMockDomains(selectState) {
  document.querySelectorAll('.mock-domain-cb').forEach(cb => {
    cb.checked = selectState;
  });
}

function startCustomPracticeExam() {
  const checkedDoms = Array.from(document.querySelectorAll('.mock-domain-cb:checked')).map(cb => cb.value);
  const countInput = document.getElementById('practice-count-input');
  let qCount = parseInt(countInput ? countInput.value : '10', 10);

  if (isNaN(qCount) || qCount < 1) qCount = 10;

  if (checkedDoms.length === 0) {
    AppStore.showToast("⚠️ Vui lòng tích chọn ít nhất 1 Domain để ôn tập!");
    return;
  }

  // Filter questions belonging to checked domains
  let pool = MOCK_EXAM_QUESTION_POOL.filter(q => checkedDoms.includes(q.domain));

  if (pool.length === 0) {
    AppStore.showToast("⚠️ Không tìm thấy câu hỏi cho Domain đã chọn!");
    return;
  }

  // Shuffle pool
  pool.sort(() => Math.random() - 0.5);
  mockExamQuestions = pool.slice(0, Math.min(qCount, pool.length));

  currentMockExamLabel = `PRACTICE_${checkedDoms.join('_')}_${mockExamQuestions.length}Q`;
  isMockSubmitted = false;
  mockExamAnswers = {};
  mockExamFlags.clear();
  currentExamIndex = 0;

  // 1.5 mins per question for practice
  mockSecondsRemaining = Math.max(5 * 60, Math.round(mockExamQuestions.length * 1.5 * 60));

  document.getElementById('mock-setup-card').style.display = 'none';
  document.getElementById('mock-arena-box').style.display = 'block';

  startMockTimer();
  renderQuestionGrid();
  renderCurrentQuestion();
}

function startOfficialMockExam() {
  isMockSubmitted = false;
  mockExamAnswers = {};
  mockExamFlags.clear();
  mockSecondsRemaining = 120 * 60;
  currentExamIndex = 0;
  currentMockExamLabel = 'OFFICIAL_MOCK_60Q';

  // Draw exactly 60 questions matching official domain weight distribution
  const d1Pool = MOCK_EXAM_QUESTION_POOL.filter(q => q.domain === 'D1').sort(() => Math.random() - 0.5).slice(0, 16);
  const d2Pool = MOCK_EXAM_QUESTION_POOL.filter(q => q.domain === 'D2').sort(() => Math.random() - 0.5).slice(0, 11);
  const d3Pool = MOCK_EXAM_QUESTION_POOL.filter(q => q.domain === 'D3').sort(() => Math.random() - 0.5).slice(0, 12);
  const d4Pool = MOCK_EXAM_QUESTION_POOL.filter(q => q.domain === 'D4').sort(() => Math.random() - 0.5).slice(0, 12);
  const d5Pool = MOCK_EXAM_QUESTION_POOL.filter(q => q.domain === 'D5').sort(() => Math.random() - 0.5).slice(0, 9);

  mockExamQuestions = [...d1Pool, ...d2Pool, ...d3Pool, ...d4Pool, ...d5Pool].sort(() => Math.random() - 0.5);

  document.getElementById('mock-setup-card').style.display = 'none';
  document.getElementById('mock-arena-box').style.display = 'block';

  startMockTimer();
  renderQuestionGrid();
  renderCurrentQuestion();
}

function startMockTimer() {
  if (mockExamTimer) clearInterval(mockExamTimer);
  const timerEl = document.getElementById('mock-timer-val');

  mockExamTimer = setInterval(() => {
    mockSecondsRemaining--;
    if (mockSecondsRemaining <= 0) {
      clearInterval(mockExamTimer);
      submitMockExam();
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
      <button class="${btnClass}" onclick="jumpToQuestion(${idx})" title="Câu ${idx + 1} (${q.domain})">
        ${idx + 1}
      </button>
    `;
  }).join('');

  // Update Stats Counter
  const answeredCount = Object.keys(mockExamAnswers).length;
  const flaggedCount = mockExamFlags.size;
  const statsEl = document.getElementById('grid-stats-text');
  if (statsEl) {
    statsEl.textContent = `Đã làm: ${answeredCount}/${mockExamQuestions.length} | Cắm cờ: ${flaggedCount}`;
  }
}

function jumpToQuestion(idx) {
  if (idx < 0 || idx >= mockExamQuestions.length) return;
  currentExamIndex = idx;
  renderQuestionGrid();
  renderCurrentQuestion();
}

function renderCurrentQuestion() {
  const qContainer = document.getElementById('current-question-container');
  if (!qContainer) return;

  const q = mockExamQuestions[currentExamIndex];
  const currentLang = AppStore.getLang();

  const qText = (currentLang === 'EN' && q.questionEN) ? q.questionEN : q.question;
  const optsText = (currentLang === 'EN' && q.optionsEN) ? q.optionsEN : q.options;

  const isSelected = mockExamAnswers[q.id];
  const isFlagged = mockExamFlags.has(q.id);

  qContainer.innerHTML = `
    <div class="card" style="padding: 2rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
        <span class="badge badge-${q.domain.toLowerCase()}">Câu ${currentExamIndex + 1} / ${mockExamQuestions.length} • ${q.domain}</span>
        
        <button class="btn btn-secondary" style="font-size: 0.82rem; ${isFlagged ? 'background: rgba(245, 158, 11, 0.2); border-color: var(--accent-amber); color: var(--accent-amber);' : ''}" onclick="toggleFlagCurrentQuestion()">
          ${isFlagged ? '🚩 Đã Cắm Cờ Bỏ Qua' : '🏁 Cắm Cờ Xem Lại (Flag)'}
        </button>
      </div>

      <h2 style="font-size: 1.2rem; line-height: 1.6; margin-bottom: 1.5rem; color: var(--text-primary);">${qText}</h2>

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
            <label style="${cardStyle}" class="${optClass}" onclick="selectMockOption(${q.id}, ${oIdx})">
              <input type="radio" name="mock_q_${q.id}" ${isSelected === oIdx ? 'checked' : ''} style="width: 20px !important; height: 20px !important; min-width: 20px !important; accent-color: var(--accent-purple) !important; cursor: pointer !important; pointer-events: none !important; margin: 0 !important;">
              <span style="line-height: 1.55; color: inherit;">${opt}</span>
            </label>
          `;
        }).join('')}
      </div>

      ${isMockSubmitted ? `
        <div class="callout ${isSelected === q.correct ? '' : 'callout-warning'}" style="margin-top: 1.5rem;">
          <div class="callout-title">
            ${isSelected === q.correct ? '✅ ĐÚNG CHUẨN KIẾN TRÚC' : '❌ CHƯA CHÍNH XÁC (XEM GIẢI THÍCH)'}
          </div>
          <div style="font-size: 0.95rem; line-height: 1.6;">${q.explanation}</div>
        </div>
      ` : ''}

      <!-- Bottom Nav Buttons -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; padding-top: 1.25rem; border-top: 1px solid var(--border-color);">
        <button class="btn btn-secondary" onclick="jumpToQuestion(${currentExamIndex - 1})" ${currentExamIndex === 0 ? 'disabled style="opacity:0.5;"' : ''}>
          ← Câu Trước
        </button>

        <button class="btn btn-primary" onclick="jumpToQuestion(${currentExamIndex + 1})" ${currentExamIndex === mockExamQuestions.length - 1 ? 'disabled style="opacity:0.5;"' : ''}>
          Câu Tiếp Theo →
        </button>
      </div>
    </div>
  `;
}

function selectMockOption(qId, oIdx) {
  if (isMockSubmitted) return;
  mockExamAnswers[qId] = oIdx;
  renderQuestionGrid();
  renderCurrentQuestion();
}

function toggleFlagCurrentQuestion() {
  const q = mockExamQuestions[currentExamIndex];
  if (mockExamFlags.has(q.id)) {
    mockExamFlags.delete(q.id);
  } else {
    mockExamFlags.add(q.id);
  }
  renderQuestionGrid();
  renderCurrentQuestion();
}

function submitMockExam() {
  if (isMockSubmitted) return;
  isMockSubmitted = true;
  if (mockExamTimer) clearInterval(mockExamTimer);

  const domainStats = {
    D1: { correct: 0, total: 0 },
    D2: { correct: 0, total: 0 },
    D3: { correct: 0, total: 0 },
    D4: { correct: 0, total: 0 },
    D5: { correct: 0, total: 0 }
  };

  let totalCorrect = 0;

  mockExamQuestions.forEach(q => {
    if (!domainStats[q.domain]) domainStats[q.domain] = { correct: 0, total: 0 };
    domainStats[q.domain].total++;

    if (mockExamAnswers[q.id] === q.correct) {
      domainStats[q.domain].correct++;
      totalCorrect++;
    }
  });

  const percentage = Math.round((totalCorrect / mockExamQuestions.length) * 100);
  const scaledScore = Math.round((totalCorrect / mockExamQuestions.length) * 1000);
  const isPass = percentage >= 72;

  AppStore.saveQuizResult(currentMockExamLabel, totalCorrect, mockExamQuestions.length, mockExamQuestions, mockExamAnswers);

  const reportBox = document.getElementById('mock-score-report-modal');
  const reportContent = document.getElementById('mock-report-content');

  if (reportBox && reportContent) {
    reportContent.innerHTML = `
      <div style="text-align: center; margin-bottom: 2rem;">
        <div style="font-size: 4rem; font-weight: 900; color: ${isPass ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">
          ${scaledScore} <span style="font-size: 1.5rem; color: var(--text-muted);">/ 1000</span>
        </div>
        <h2 style="font-size: 2rem; color: ${isPass ? 'var(--accent-emerald)' : 'var(--accent-rose)'}; margin-bottom: 0.5rem;">
          ${isPass ? '🎉 CHÚC MỪNG! BẠN ĐÃ PASS LƯỢT THI MÔ PHỎNG!' : '💪 BẠN CẦN THÊM ĐIỂM ÔN TẬP (CẦN >= 720)'}
        </h2>
        <p style="color: var(--text-secondary);">
          Số câu đúng: <strong>${totalCorrect} / ${mockExamQuestions.length} câu</strong> (${percentage}%). Ngưỡng đỗ Pass là 720/1000 điểm.
        </p>
      </div>

      <h3 style="font-size: 1.1rem; margin-bottom: 1rem; color: var(--accent-purple);">📊 BẢNG PHÂN TÍCH ĐIỂM SỐ THEO TỪNG DOMAIN:</h3>
      <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-bottom: 2rem;">
        ${Object.keys(domainStats).filter(k => domainStats[k].total > 0).map(dKey => {
          const st = domainStats[dKey];
          const pct = Math.round((st.correct / st.total) * 100);
          return `
            <div style="background: var(--bg-tertiary); padding: 1rem; border-radius: var(--radius-md);">
              <div style="display: flex; justify-content: space-between; font-weight: 600; margin-bottom: 0.4rem;">
                <span><span class="badge badge-${dKey.toLowerCase()}">${dKey}</span> ${dKey === 'D1' ? 'Agent Architecture (27%)' : dKey === 'D2' ? 'Tool & MCP (18%)' : dKey === 'D3' ? 'Claude Code Workflows (20%)' : dKey === 'D4' ? 'Prompt Engineering (20%)' : 'Context Management (15%)'}</span>
                <span style="color: ${pct >= 72 ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">${st.correct}/${st.total} câu (${pct}%)</span>
              </div>
              <div style="width: 100%; height: 8px; background: var(--border-color); border-radius: 4px; overflow: hidden;">
                <div style="width: ${pct}%; height: 100%; background: ${pct >= 72 ? 'var(--accent-emerald)' : 'var(--accent-rose)'};"></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div style="display: flex; justify-content: center; gap: 1rem;">
        <button class="btn btn-secondary" onclick="closeMockReportModal()">👁️ Xem Lại Đáp Án Chi Tiết ${mockExamQuestions.length} Câu</button>
        <button class="btn btn-primary" onclick="location.reload()">🔄 Thi Bài Mới</button>
      </div>
    `;
    reportBox.style.display = 'flex';
  }

  renderQuestionGrid();
  renderCurrentQuestion();
  renderMockHistoryTable();
}

function closeMockReportModal() {
  const modal = document.getElementById('mock-score-report-modal');
  if (modal) modal.style.display = 'none';
}

function renderMockHistoryTable() {
  const container = document.getElementById('mock-history-table-container');
  if (!container) return;

  const results = AppStore.getQuizResults();

  if (results.length === 0) {
    container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 1.5rem;">Chưa có lịch sử thi mô phỏng nào. Hãy thử làm bài đầu tiên!</div>`;
    return;
  }

  container.innerHTML = `
    <table class="history-table">
      <thead>
        <tr>
          <th>Thời gian</th>
          <th>Chế độ / Domain</th>
          <th>Số câu đúng</th>
          <th>Tỷ lệ %</th>
          <th>Trạng thái</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        ${results.map(r => `
          <tr>
            <td>${r.date || 'Gần đây'}</td>
            <td><span class="badge badge-d1">${r.domains || 'Practice'}</span></td>
            <td><strong>${r.score} / ${r.total}</strong></td>
            <td style="font-weight: 700; color: ${r.percentage >= 72 ? 'var(--accent-emerald)' : 'var(--accent-rose)'}">${r.percentage}%</td>
            <td>
              <span style="padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: 700; font-size: 0.8rem; background: ${r.percentage >= 72 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)'}; color: ${r.percentage >= 72 ? 'var(--accent-emerald)' : 'var(--accent-rose)'}">
                ${r.percentage >= 72 ? '✓ PASS' : '❌ FAIL'}
              </span>
            </td>
            <td>
              <button class="btn btn-secondary" style="font-size: 0.75rem; padding: 0.25rem 0.6rem;" onclick="viewMockHistoryDetail(${r.id})">
                👁️ Xem Chi Tiết
              </button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function viewMockHistoryDetail(attemptId) {
  const results = AppStore.getQuizResults();
  const attempt = results.find(r => r.id === attemptId);

  if (!attempt || !attempt.questions || attempt.questions.length === 0) {
    AppStore.showToast("⚠️ Lượt thi cũ này không lưu chi tiết các câu hỏi.");
    return;
  }

  const modal = document.getElementById('mock-history-detail-modal');
  const modalContent = document.getElementById('mock-detail-modal-content');
  const modalTitle = document.getElementById('mock-detail-modal-title');

  if (!modal || !modalContent) return;

  if (modalTitle) {
    modalTitle.innerHTML = `👁️ Chi Tiết Lượt Thi (${attempt.date}) — Kết Quả: ${attempt.score}/${attempt.total} (${attempt.percentage}%)`;
  }

  const currentLang = AppStore.getLang();

  modalContent.innerHTML = attempt.questions.map((q, idx) => {
    const userSelected = attempt.userAnswers ? attempt.userAnswers[q.id] : undefined;
    const qText = (currentLang === 'EN' && q.questionEN) ? q.questionEN : q.question;
    const optsText = (currentLang === 'EN' && q.optionsEN) ? q.optionsEN : q.options;

    return `
      <div class="card" style="margin-bottom: 1.25rem; padding: 1.25rem; background: var(--bg-tertiary);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <span class="badge badge-${q.domain.toLowerCase()}">Câu ${idx + 1} • ${q.domain}</span>
          <span style="font-size: 0.8rem; font-weight: 700; color: ${userSelected === q.correct ? 'var(--accent-emerald)' : 'var(--accent-rose)'}">
            ${userSelected === q.correct ? '✓ Chọn Đúng' : '❌ Chọn Sai'}
          </span>
        </div>

        <h4 style="font-size: 1rem; line-height: 1.5; margin-bottom: 0.85rem;">${qText}</h4>

        <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 0.85rem;">
          ${optsText.map((opt, oIdx) => {
            let style = 'padding: 0.6rem 0.8rem; border-radius: 6px; font-size: 0.9rem; border: 1px solid var(--border-color);';
            
            if (oIdx === q.correct) {
              style += ' background: rgba(16, 185, 129, 0.2); border-color: var(--accent-emerald); color: #fff; font-weight: 600;';
            } else if (userSelected === oIdx && userSelected !== q.correct) {
              style += ' background: rgba(244, 63, 94, 0.2); border-color: var(--accent-rose); color: #fff;';
            } else {
              style += ' background: var(--bg-card);';
            }

            return `
              <div style="${style}">
                ${opt} ${oIdx === q.correct ? ' ✓ (Đáp án đúng)' : (userSelected === oIdx ? ' ✖ (Bạn đã chọn)' : '')}
              </div>
            `;
          }).join('')}
        </div>

        <div style="background: var(--bg-card); padding: 0.75rem 1rem; border-radius: 6px; font-size: 0.88rem; border-left: 3px solid var(--accent-purple);">
          <strong style="color: var(--accent-purple); display: block; margin-bottom: 0.2rem;">💡 Giải thích chi tiết:</strong>
          ${q.explanation}
        </div>
      </div>
    `;
  }).join('');

  modal.style.display = 'flex';
}

function closeMockHistoryDetailModal() {
  const modal = document.getElementById('mock-history-detail-modal');
  if (modal) modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = `
    .grid-nav-btn {
      width: 40px; height: 40px;
      border-radius: 6px;
      border: 1px solid var(--border-color);
      background: var(--bg-tertiary);
      color: var(--text-primary);
      font-weight: 700;
      font-size: 0.85rem;
      cursor: pointer;
      transition: var(--transition);
    }
    .grid-nav-btn:hover { background: var(--bg-card-hover); border-color: var(--accent-purple); }
    .grid-nav-btn.active-nav { border: 2px solid var(--accent-purple); box-shadow: 0 0 10px var(--accent-purple-glow); }
    .grid-nav-btn.answered-nav { background: rgba(16, 185, 129, 0.2); border-color: var(--accent-emerald); }
    .grid-nav-btn.flagged-nav { background: rgba(245, 158, 11, 0.25); border-color: var(--accent-amber); color: var(--accent-amber); }
  `;
  document.head.appendChild(style);

  renderMockHistoryTable();

  window.addEventListener('ccaf_lang_changed', () => {
    if (document.getElementById('mock-arena-box').style.display !== 'none') {
      renderCurrentQuestion();
    }
  });
});
