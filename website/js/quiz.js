/* CCAF Learning Hub - Interactive Quiz Engine with Detailed History Review Modal */

let currentQuestions = [];
let quizAnswers = {}; // questionId -> selectedIndex
let quizTimer = null;
let secondsRemaining = 20 * 60;
let isQuizSubmitted = false;
let activeQuizDomain = 'CUSTOM';
let currentQuizLang = 'VI';

function selectAllDomains(selectState) {
  document.querySelectorAll('.quiz-domain-cb').forEach(cb => {
    cb.checked = selectState;
  });
}

function startCustom10QuestionQuiz() {
  const checkedDoms = Array.from(document.querySelectorAll('.quiz-domain-cb:checked')).map(cb => cb.value);

  if (checkedDoms.length === 0) {
    AppStore.showToast("⚠️ Vui lòng tích chọn ít nhất 1 Domain để làm đề thi!");
    return;
  }

  // Filter questions belonging to checked domains
  let pool = QUIZ_DATA.filter(q => checkedDoms.includes(q.domain));

  if (pool.length === 0) {
    AppStore.showToast("⚠️ Không tìm thấy câu hỏi cho Domain đã chọn!");
    return;
  }

  // Shuffle pool
  pool.sort(() => Math.random() - 0.5);

  // Pick up to 10 questions
  currentQuestions = pool.slice(0, 10);
  activeQuizDomain = checkedDoms.join(', ');

  isQuizSubmitted = false;
  quizAnswers = {};
  secondsRemaining = 20 * 60; // 20 mins for 10 questions

  document.getElementById('quiz-setup-box').style.display = 'none';
  document.getElementById('quiz-active-box').style.display = 'block';

  startTimer();
  renderQuizQuestions();
}

function startQuiz(mode = 'FULL', domainFilter = 'ALL') {
  isQuizSubmitted = false;
  quizAnswers = {};
  activeQuizDomain = domainFilter;

  if (domainFilter === 'ALL') {
    currentQuestions = [...QUIZ_DATA];
    if (mode === 'FULL') {
      currentQuestions.sort(() => Math.random() - 0.5);
      currentQuestions = currentQuestions.slice(0, 60); // Official 60 questions
      secondsRemaining = 120 * 60; // 120 mins
    }
  } else {
    currentQuestions = QUIZ_DATA.filter(q => q.domain === domainFilter);
    secondsRemaining = 30 * 60;
  }

  document.getElementById('quiz-setup-box').style.display = 'none';
  document.getElementById('quiz-active-box').style.display = 'block';

  startTimer();
  renderQuizQuestions();
}

function toggleQuizLanguage(lang) {
  currentQuizLang = lang;
  AppStore.setLang(lang);
  renderQuizQuestions();
}

function startTimer() {
  if (quizTimer) clearInterval(quizTimer);
  const timerEl = document.getElementById('quiz-timer-display');

  quizTimer = setInterval(() => {
    secondsRemaining--;
    if (secondsRemaining <= 0) {
      clearInterval(quizTimer);
      submitQuiz();
      AppStore.showToast("⏰ Đã hết thời gian làm bài!");
    } else {
      const mins = Math.floor(secondsRemaining / 60);
      const secs = secondsRemaining % 60;
      if (timerEl) {
        timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      }
    }
  }, 1000);
}

function renderQuizQuestions() {
  const container = document.getElementById('quiz-questions-container');
  if (!container) return;

  const currentLang = AppStore.getLang();

  container.innerHTML = currentQuestions.map((q, idx) => {
    const selectedOpt = quizAnswers[q.id];
    const qText = (currentLang === 'EN' && q.questionEN) ? q.questionEN : q.question;
    const optsText = (currentLang === 'EN' && q.optionsEN) ? q.optionsEN : q.options;

    return `
      <div class="card quiz-card" id="question-card-${q.id}" style="margin-bottom: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <span class="badge badge-${q.domain.toLowerCase()}">Câu ${idx + 1} / ${currentQuestions.length} • ${q.domain}</span>
          <span style="font-size: 0.8rem; color: var(--text-muted);">${q.domainTitle}</span>
        </div>

        <h3 style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 1.25rem;">${qText}</h3>

        <div class="options-group" style="display: flex; flex-direction: column; gap: 0.75rem;">
          ${optsText.map((opt, oIdx) => {
            let optClass = 'quiz-option';
            if (selectedOpt === oIdx) optClass += ' selected';
            
            if (isQuizSubmitted) {
              if (oIdx === q.correct) optClass += ' correct-option';
              else if (selectedOpt === oIdx && selectedOpt !== q.correct) optClass += ' wrong-option';
            }

            return `
              <div class="${optClass}" onclick="selectOption(${q.id}, ${oIdx})">
                ${opt}
              </div>
            `;
          }).join('')}
        </div>

        ${isQuizSubmitted ? `
          <div class="callout ${selectedOpt === q.correct ? '' : 'callout-warning'}" style="margin-top: 1.25rem;">
            <div class="callout-title">
              ${selectedOpt === q.correct ? '✅ ĐÚNG BÀI BẢN' : '❌ CHƯA CHÍNH XÁC (XEM GIẢI THÍCH)'}
            </div>
            <div style="font-size: 0.95rem; line-height: 1.6;">${q.explanation}</div>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
}

function selectOption(qId, oIdx) {
  if (isQuizSubmitted) return;
  quizAnswers[qId] = oIdx;
  renderQuizQuestions();
}

function submitQuiz() {
  if (isQuizSubmitted) return;
  isQuizSubmitted = true;
  if (quizTimer) clearInterval(quizTimer);

  let correctCount = 0;
  currentQuestions.forEach(q => {
    if (quizAnswers[q.id] === q.correct) {
      correctCount++;
    }
  });

  const percentage = Math.round((correctCount / currentQuestions.length) * 100);
  AppStore.saveQuizResult(activeQuizDomain, correctCount, currentQuestions.length, currentQuestions, quizAnswers);

  // Show Summary Result Modal / Box
  const summaryBox = document.getElementById('quiz-result-summary');
  if (summaryBox) {
    summaryBox.style.display = 'block';
    summaryBox.innerHTML = `
      <div style="text-align: center; padding: 2rem;">
        <h2 style="font-size: 2rem; margin-bottom: 0.5rem;">
          ${percentage >= 75 ? `🎉 CHÚC MỪNG! BẠN ĐÃ PASS BÀI QUIZ (${activeQuizDomain})!` : '💪 BẠN CẦN ÔN LẠI THÊM!'}
        </h2>
        <div style="font-size: 3rem; font-weight: 800; color: ${percentage >= 75 ? 'var(--accent-emerald)' : 'var(--accent-rose)'}; margin: 0.5rem 0;">
          ${correctCount} / ${currentQuestions.length} (${percentage}%)
        </div>
        <p style="color: var(--text-secondary); max-width: 550px; margin: 0 auto 1.5rem;">
          ${percentage >= 75 ? `Bạn đã hoàn thành xuất sắc đề thi 10 câu cho Domain: ${activeQuizDomain}.` : 'Ngưỡng Pass là 75%. Hãy xem lại giải thích chi tiết từng câu bên dưới để rút kinh nghiệm.'}
        </p>

        <div style="display: flex; justify-content: center; gap: 1rem;">
          <button class="btn btn-primary" onclick="location.reload()">🔄 Làm Bài Thi Mới</button>
        </div>
      </div>
    `;
  }

  renderQuizQuestions();
  renderQuizHistoryTable();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderQuizHistoryTable() {
  const container = document.getElementById('history-table-container');
  if (!container) return;

  const results = AppStore.getQuizResults();

  if (results.length === 0) {
    container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 1.5rem;">Chưa có lịch sử làm bài thi thử nào. Hãy làm đề 10 câu đầu tiên ngay!</div>`;
    return;
  }

  container.innerHTML = `
    <table class="history-table">
      <thead>
        <tr>
          <th>Thời gian</th>
          <th>Domain đã chọn</th>
          <th>Kết quả</th>
          <th>Tỷ lệ %</th>
          <th>Trạng thái</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        ${results.map(r => `
          <tr>
            <td>${r.date || 'Gần đây'}</td>
            <td><span class="badge badge-d1">${r.domains || 'Custom'}</span></td>
            <td><strong>${r.score} / ${r.total}</strong></td>
            <td style="font-weight: 700; color: ${r.percentage >= 75 ? 'var(--accent-emerald)' : 'var(--accent-rose)'}">${r.percentage}%</td>
            <td>
              <span style="padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: 700; font-size: 0.8rem; background: ${r.percentage >= 75 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)'}; color: ${r.percentage >= 75 ? 'var(--accent-emerald)' : 'var(--accent-rose)'}">
                ${r.percentage >= 75 ? '✓ PASS' : '❌ FAIL'}
              </span>
            </td>
            <td>
              <button class="btn btn-secondary" style="font-size: 0.75rem; padding: 0.25rem 0.6rem;" onclick="viewHistoricalAttemptDetail(${r.id})">
                👁️ Xem Chi Tiết
              </button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function viewHistoricalAttemptDetail(attemptId) {
  const results = AppStore.getQuizResults();
  const attempt = results.find(r => r.id === attemptId);

  if (!attempt || !attempt.questions || attempt.questions.length === 0) {
    AppStore.showToast("⚠️ Bài thi cũ này không lưu chi tiết các câu hỏi.");
    return;
  }

  const modal = document.getElementById('history-detail-modal');
  const modalContent = document.getElementById('modal-attempt-content');
  const modalTitle = document.getElementById('modal-attempt-title');

  if (!modal || !modalContent) return;

  if (modalTitle) {
    modalTitle.innerHTML = `👁️ Chi Tiết Lượt Thi (${attempt.date}) — Ket Qua: ${attempt.score}/${attempt.total} (${attempt.percentage}%)`;
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

function closeHistoryModal() {
  const modal = document.getElementById('history-detail-modal');
  if (modal) modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  // Styles for options
  const style = document.createElement('style');
  style.textContent = `
    .quiz-option {
      padding: 1rem 1.25rem;
      border-radius: var(--radius-md);
      background: var(--bg-tertiary);
      border: 1px solid var(--border-color);
      cursor: pointer;
      font-size: 0.95rem;
      line-height: 1.5;
      transition: var(--transition);
    }
    .quiz-option:hover {
      background: var(--bg-card-hover);
      border-color: var(--accent-purple);
    }
    .quiz-option.selected {
      border-color: var(--accent-purple);
      background: rgba(139, 92, 246, 0.15);
      font-weight: 600;
    }
    .quiz-option.correct-option {
      border-color: var(--accent-emerald) !important;
      background: rgba(16, 185, 129, 0.2) !important;
      color: #fff;
    }
    .quiz-option.wrong-option {
      border-color: var(--accent-rose) !important;
      background: rgba(244, 63, 94, 0.2) !important;
    }
    .lang-toggle-btn {
      padding: 0.35rem 0.75rem;
      border-radius: var(--radius-sm);
      font-size: 0.8rem;
      font-weight: 700;
      background: var(--bg-tertiary);
      border: 1px solid var(--border-color);
      color: var(--text-secondary);
      cursor: pointer;
      transition: var(--transition);
    }
    .lang-toggle-btn.active {
      background: var(--accent-purple);
      color: #fff;
      border-color: var(--accent-purple);
    }
  `;
  document.head.appendChild(style);

  renderQuizHistoryTable();

  // Listen to global language change event
  window.addEventListener('ccaf_lang_changed', () => {
    if (document.getElementById('quiz-active-box').style.display !== 'none') {
      renderQuizQuestions();
    }
  });
});
