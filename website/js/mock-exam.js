let currentPracticeSubMode = 'DOMAIN'; // 'DOMAIN' or 'TERM'
let mockExamQuestions = [];
let mockExamAnswers = {};
let mockExamFlags = new Set();
let currentExamIndex = 0;
let currentMockExamLabel = '';
let isMockSubmitted = false;
let mockSecondsRemaining = 0;
let mockExamTimer = null;

window.switchPracticeSubMode = function(mode) {
  currentPracticeSubMode = mode;
  const domainTab = document.getElementById('tab-practice-domain');
  const termTab = document.getElementById('tab-practice-term');
  const domainBox = document.getElementById('practice-domain-box');
  const termBox = document.getElementById('practice-term-box');

  if (mode === 'DOMAIN') {
    if (domainTab) domainTab.className = 'btn btn-primary';
    if (termTab) termTab.className = 'btn btn-secondary';
    if (domainBox) domainBox.style.display = 'block';
    if (termBox) termBox.style.display = 'none';
  } else {
    if (domainTab) domainTab.className = 'btn btn-secondary';
    if (termTab) termTab.className = 'btn btn-primary';
    if (domainBox) domainBox.style.display = 'none';
    if (termBox) termBox.style.display = 'block';
    window.renderPracticeTermsGrid();
  }
};

window.toggleMockDomains = function(selectState) {
  document.querySelectorAll('.mock-domain-cb').forEach(cb => {
    cb.checked = selectState;
  });
};

window.toggleMockTerms = function(selectState) {
  document.querySelectorAll('.mock-term-cb').forEach(cb => {
    cb.checked = selectState;
  });
};

const TERM_KEYWORDS_MAP = {
  'term-d1-prerequisite-gate': ['prerequisite gate', 'prerequisite check', 'deterministic prerequisite', 'cổng kiểm soát điều kiện tiên quyết', 'tiên quyết'],
  'term-d1-sdk-hooks': ['pretooluse', 'posttooluse', 'sdk hook', 'lifecycle hook', 'interceptor hook'],
  'term-d1-coordinator-worker': ['coordinator-worker', 'coordinator worker', 'sub-agent delegation', 'agent công nhân'],
  'term-d1-state-recovery': ['state recovery', 'turn limit', 'session recovery', 'phục hồi trạng thái'],
  'term-d1-hitl-escalation': ['human-in-the-loop', 'hitl', 'escalation hook', 'can thiệp con người'],
  'term-d1-idempotency-gate': ['idempotency gate', 'idempotent', 'non-idempotent', 'đẳng quản'],
  'term-d1-asymmetric-retry': ['asymmetric retry', 'exponential backoff', 'thử lại bất đối xứng'],
  'term-d1-state-machine': ['state machine', 'stop_reason', 'máy trạng thái'],
  'term-d1-rollback-checkpoint': ['rollback', 'transaction checkpoint', 'khôi phục điểm kiểm soát'],
  'term-d2-granular-tool': ['granular tool', 'single-purpose tool', 'công cụ đơn chức năng'],
  'term-d2-resilient-schema': ['resilient schema', 'resilient tool schema', 'input validation', 'schema kiên cường'],
  'term-d2-mcp-transport': ['mcp transport', 'stdio', 'sse transport', 'giao thức stdio'],
  'term-d2-tool-error-feedback': ['tool error handling', 'structured error response', 'phản hồi lỗi cấu trúc'],
  'term-d2-tool-choice': ['tool_choice', 'tool choice', 'hạn chế chọn công cụ'],
  'term-d2-tool-poisoning': ['tool poisoning', 'prompt injection', 'nhiễm độc công cụ'],
  'term-d3-cli-permissions': ['dangerously-skip-permissions', 'cli permission', 'cờ quyền cli'],
  'term-d3-claude-md-hierarchy': ['claude.md', 'hierarchy', 'hệ thống claude.md'],
  'term-d3-glob-grep-navigation': ['glob tool', 'grep tool', 'glob before view', 'định vị tập tin'],
  'term-d3-cicd-pipeline': ['ci/cd', 'github actions', 'pr review', 'tự động hóa pr'],
  'term-d3-headless-mode': ['headless mode', 'non-interactive', 'chế độ không giao diện'],
  'term-d4-structured-output': ['structured output', 'json schema', 'đầu ra cấu trúc'],
  'term-d4-temperature-control': ['temperature = 0', 'temperature', 'kiểm soát nhiệt độ'],
  'term-d4-few-shot-prompting': ['few-shot', 'exemplar', 'ví dụ mẫu'],
  'term-d4-cot-thinking': ['chain-of-thought', '<thinking>', 'tư duy từng bước'],
  'term-d4-xml-boundaries': ['xml tag', 'xml boundaries', '<context>', 'thẻ xml'],
  'term-d4-conditional-directives': ['conditional directive', 'system prompt instruction', 'chỉ thị điều kiện'],
  'term-d5-lost-in-the-middle': ['lost-in-the-middle', 'lost in the middle', 'attention dilution', 'lạc ở giữa'],
  'term-d5-prompt-caching': ['prompt caching', 'ephemeral cache', 'bộ nhớ đệm câu lệnh'],
  'term-d5-message-batches': ['message batches', 'batches api', 'xử lý theo lô'],
  'term-d5-context-pruning': ['context pruning', 'sliding window', 'cắt tỉa bối cảnh'],
  'term-d5-state-summarization': ['summarization compaction', 'state compaction', 'nén tóm tắt']
};

window.getMatchingQuestionsForTermId = function(termId) {
  if (typeof MOCK_EXAM_QUESTION_POOL === 'undefined') return [];
  
  let targetCount = 0;
  let termDomain = '';
  if (typeof TERMS_DATA !== 'undefined') {
    const termObj = TERMS_DATA.find(t => t.id === termId);
    if (termObj) {
      termDomain = termObj.domain;
      const matchNum = (termObj.frequency || '').match(/(\d+)\s*câu/);
      if (matchNum) targetCount = parseInt(matchNum[1], 10);
    }
  }

  const kws = TERM_KEYWORDS_MAP[termId] || [];
  
  const scored = MOCK_EXAM_QUESTION_POOL.map(q => {
    const text = (q.question + ' ' + (q.questionEN||'') + ' ' + (q.explanation||'') + ' ' + (q.taskStatement||'') + ' ' + (q.rationale||'')).toLowerCase();
    let score = 0;
    kws.forEach(kw => {
      if (text.includes(kw)) score += kw.length > 8 ? 3 : 1;
    });
    if (termDomain && q.domain === termDomain) score += 0.5;
    return { q, score };
  }).filter(item => item.score > 0).sort((a, b) => b.score - a.score);

  let pool = scored.map(item => item.q);

  if (targetCount > 0 && pool.length > targetCount) {
    pool = pool.slice(0, targetCount);
  }

  return pool;
};

window.renderPracticeTermsGrid = function() {
  const container = document.getElementById('practice-terms-grid');
  if (!container) return;

  if (typeof TERMS_DATA === 'undefined') {
    container.innerHTML = '<div style="font-size:0.82rem; color:var(--text-muted);">⚠️ Chưa tải được từ điển thuật ngữ.</div>';
    return;
  }

  container.innerHTML = TERMS_DATA.map(t => {
    const matchCount = window.getMatchingQuestionsForTermId(t.id).length;
    return `
      <label class="domain-cb-card" style="padding: 0.45rem 0.6rem; font-size: 0.8rem; cursor: pointer;">
        <input type="checkbox" class="mock-term-cb" value="${t.id}" checked style="transform: scale(1.1); margin-right: 0.35rem;">
        <span><strong style="color: var(--accent-cyan);">${t.domain}</strong> ${t.nameEN} <em style="color: var(--text-muted); font-size: 0.75rem;">(${matchCount} câu)</em></span>
      </label>
    `;
  }).join('');
};

window.startCustomPracticeExam = function() {
  const countInput = document.getElementById('practice-count-input');
  let qCount = parseInt(countInput ? countInput.value : '10', 10);

  if (isNaN(qCount) || qCount < 1) qCount = 10;

  if (typeof MOCK_EXAM_QUESTION_POOL === 'undefined') {
    AppStore.showToast("⚠️ Chưa tải được bộ đề thi mô phỏng!");
    return;
  }

  let pool = [];
  let modeLabel = '';

  if (currentPracticeSubMode === 'TERM') {
    const checkedTermIds = Array.from(document.querySelectorAll('.mock-term-cb:checked')).map(cb => cb.value);
    if (checkedTermIds.length === 0) {
      AppStore.showToast("⚠️ Vui lòng tích chọn ít nhất 1 Thuật ngữ để ôn tập!");
      return;
    }

    const matchedMap = new Map();
    checkedTermIds.forEach(tId => {
      const qList = window.getMatchingQuestionsForTermId(tId);
      qList.forEach(q => {
        if (!matchedMap.has(q.id)) matchedMap.set(q.id, q);
      });
    });

    pool = Array.from(matchedMap.values());
    modeLabel = `TERMS_${checkedTermIds.length}T`;
  } else {
    const checkedDoms = Array.from(document.querySelectorAll('.mock-domain-cb:checked')).map(cb => cb.value);
    if (checkedDoms.length === 0) {
      AppStore.showToast("⚠️ Vui lòng tích chọn ít nhất 1 Domain để ôn tập!");
      return;
    }
    pool = MOCK_EXAM_QUESTION_POOL.filter(q => checkedDoms.includes(q.domain));
    modeLabel = `DOMAINS_${checkedDoms.join('_')}`;
  }

  if (pool.length === 0) {
    AppStore.showToast("⚠️ Không tìm thấy câu hỏi phù hợp cho lựa chọn của bạn!");
    return;
  }

  // Deduplicate base pool by question text & id
  const basePool = [];
  const baseIds = new Set();
  const baseTexts = new Set();
  for (const q of pool) {
    const cleanText = q.question.replace(/^\[.*?\]\s*/, '');
    if (!baseIds.has(q.id) && !baseTexts.has(cleanText)) {
      baseIds.add(q.id);
      baseTexts.add(cleanText);
      basePool.push(q);
    }
  }

  const N = basePool.length;
  const pickedList = [];

  if (qCount <= N) {
    // Standard random pick without duplicates
    const shuffled = [...basePool].sort(() => Math.random() - 0.5);
    for (let i = 0; i < qCount; i++) {
      pickedList.push(shuffled[i]);
    }
  } else {
    // Round-robin repetition: Ensure full rounds sweep through all N base questions before repeating
    const fullRounds = Math.floor(qCount / N);
    const remainder = qCount % N;

    for (let r = 0; r < fullRounds; r++) {
      const roundPool = [...basePool].sort(() => Math.random() - 0.5);
      pickedList.push(...roundPool);
    }

    if (remainder > 0) {
      const remPool = [...basePool].sort(() => Math.random() - 0.5);
      for (let i = 0; i < remainder; i++) {
        pickedList.push(remPool[i]);
      }
    }
  }

  // Assign unique instance IDs to guarantee zero collision in answers/flags
  mockExamQuestions = pickedList.map((item, idx) => {
    return {
      ...item,
      uniqueId: `${item.id}_inst_${idx}`
    };
  });

  currentMockExamLabel = `PRACTICE_${modeLabel}_${mockExamQuestions.length}Q`;
  isMockSubmitted = false;
  mockExamAnswers = {};
  mockExamFlags.clear();
  currentExamIndex = 0;
  updateHeaderBarState();

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
  updateHeaderBarState();

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
    const qKey = q.uniqueId || q.id;
    const isAnswered = mockExamAnswers[qKey] !== undefined;
    const isFlagged = mockExamFlags.has(qKey);
    const isActive = idx === currentExamIndex;

    let btnClass = 'grid-nav-btn';
    if (isActive) btnClass += ' active-nav';
    if (isFlagged) btnClass += ' flagged-nav';
    if (isAnswered) btnClass += ' answered-nav';

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

  const qKey = q.uniqueId || q.id;
  const currentLang = AppStore.getLang();

  const rawQText = (currentLang === 'EN' && q.questionEN) ? q.questionEN : q.question;
  const qText = rawQText.replace(/^\[.*?\]\s*/, '');
  const optsText = (currentLang === 'EN' && q.optionsEN) ? q.optionsEN : q.options;

  const isSelected = mockExamAnswers[qKey];
  const isFlagged = mockExamFlags.has(qKey);

  const taskTag = q.taskStatement ? `<span class="badge badge-d3" style="font-family: monospace; font-size: 0.78rem;">📌 ${q.taskStatement}</span>` : '';
  const diffTag = q.difficulty ? `<span class="badge badge-d2" style="font-size: 0.75rem; text-transform: uppercase;">⚡ ${q.difficulty}</span>` : '';

  qContainer.innerHTML = `
    <div class="card" style="padding: 2rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.5rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
          <span class="badge badge-${q.domain.toLowerCase()}">Câu ${currentExamIndex + 1} / ${mockExamQuestions.length} • ${q.domain}</span>
          ${taskTag}
          ${diffTag}
        </div>
        
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
            <label class="${optClass}" style="${cardStyle}" onclick="window.selectOption('${qKey}', ${oIdx})">
              <input type="radio" name="mock_q_${qKey}" ${isSelected === oIdx ? 'checked' : ''} style="transform: scale(1.25); cursor: pointer; accent-color: var(--accent-purple); margin-right: 0.5rem; pointer-events: none;">
              <span>${opt}</span>
            </label>
          `;
        }).join('')}
      </div>

      ${isMockSubmitted ? `
        <div class="callout ${isSelected === q.correct ? '' : 'callout-warning'}" style="margin-top: 1.5rem; background: var(--bg-secondary); border-radius: 12px; padding: 1.25rem;">
          <div class="callout-title" style="font-size: 1.05rem; font-weight: 800; margin-bottom: 0.75rem; color: ${isSelected === q.correct ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">
            ${isSelected === q.correct ? '✅ ĐÁP ÁN CHÍNH XÁC' : '❌ CHƯA CHÍNH XÁC'}
          </div>

          ${q.rationale ? `
            <div style="margin-bottom: 1rem; padding: 0.75rem 1rem; background: rgba(139, 92, 246, 0.1); border-left: 4px solid var(--accent-purple); border-radius: 6px; font-size: 0.9rem;">
              <strong>💡 Rationale:</strong> ${q.rationale}
            </div>
          ` : ''}

          <div style="font-size: 0.92rem; line-height: 1.6; white-space: pre-line; margin-bottom: 1rem;">${q.explanation}</div>

          ${(q.sources && q.sources.length > 0) ? `
            <div style="margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid var(--border-color); font-size: 0.85rem;">
              <strong style="color: var(--accent-purple);">📚 Official Reference Sources:</strong>
              <ul style="margin: 0.4rem 0 0 1.2rem; padding: 0;">
                ${q.sources.map(s => {
                  let url = s.url || '#';
                  if (url.startsWith && url.startsWith('/')) url = 'https://claudecertificationguide.com' + url;
                  return `<li><a href="${url}" target="_blank" rel="noopener noreferrer" style="color: var(--accent-cyan); text-decoration: underline;">${s.label || url}</a></li>`;
                }).join('')}
              </ul>
            </div>
          ` : ''}
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

  const qKey = q.uniqueId || q.id;
  if (mockExamFlags.has(qKey)) {
    mockExamFlags.delete(qKey);
  } else {
    mockExamFlags.add(qKey);
  }
  renderQuestionGrid();
  renderCurrentQuestion();
};

function updateHeaderBarState() {
  const cancelBtn = document.getElementById('btn-cancel-mock');
  const submitBtn = document.getElementById('btn-submit-mock');
  if (!cancelBtn || !submitBtn) return;

  if (isMockSubmitted) {
    cancelBtn.innerHTML = '🏠 Về Trang Chọn Đề';
    cancelBtn.style.borderColor = 'var(--accent-purple)';
    cancelBtn.style.color = 'var(--accent-purple)';

    submitBtn.innerHTML = '📊 Xem Báo Cáo Score';
    submitBtn.className = 'btn btn-primary';
    submitBtn.onclick = function() { window.openReportModal(); };
  } else {
    cancelBtn.innerHTML = '🛑 Dừng Thi / Hủy Bài';
    cancelBtn.style.borderColor = 'var(--accent-rose)';
    cancelBtn.style.color = 'var(--accent-rose)';

    submitBtn.innerHTML = '✓ Nộp Bài Thi & Xem Kết Quả';
    submitBtn.className = 'btn btn-success';
    submitBtn.onclick = function() { window.submitMockExam(); };
  }
}

window.openReportModal = function() {
  const reportModal = document.getElementById('mock-report-modal');
  if (reportModal) {
    reportModal.style.display = 'flex';
    reportModal.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

window.cancelMockExam = function() {
  if (mockExamTimer) {
    clearInterval(mockExamTimer);
    mockExamTimer = null;
  }
  const wasSubmitted = isMockSubmitted;
  isMockSubmitted = false;
  mockExamAnswers = {};
  mockExamFlags.clear();
  mockExamQuestions = [];
  currentExamIndex = 0;
  updateHeaderBarState();

  const arenaBox = document.getElementById('mock-arena-box');
  const setupCard = document.getElementById('mock-setup-card');

  if (arenaBox) arenaBox.style.display = 'none';
  if (setupCard) setupCard.style.display = 'block';

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (typeof AppStore !== 'undefined' && AppStore.showToast) {
    if (wasSubmitted) {
      AppStore.showToast("🏠 Đã quay lại màn hình chọn đề!");
    } else {
      AppStore.showToast("🛑 Đã hủy lượt làm bài và quay lại màn hình chọn đề!");
    }
  }
};

window.submitMockExam = function() {
  if (isMockSubmitted) return;
  isMockSubmitted = true;
  if (mockExamTimer) clearInterval(mockExamTimer);
  updateHeaderBarState();

  let totalScore = 0;
  const domainScores = { D1: 0, D2: 0, D3: 0, D4: 0, D5: 0 };
  const domainTotals = { D1: 0, D2: 0, D3: 0, D4: 0, D5: 0 };

  const subtopicStats = {}; // ts -> { total: 0, correct: 0 }

  mockExamQuestions.forEach(q => {
    domainTotals[q.domain] = (domainTotals[q.domain] || 0) + 1;
    const ts = q.taskStatement || 'General';
    if (!subtopicStats[ts]) subtopicStats[ts] = { total: 0, correct: 0 };
    subtopicStats[ts].total++;

    const qKey = q.uniqueId || q.id;
    if (mockExamAnswers[qKey] === q.correct) {
      totalScore++;
      domainScores[q.domain] = (domainScores[q.domain] || 0) + 1;
      subtopicStats[ts].correct++;
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
    if (reportModal.classList) reportModal.classList.add('active');
    
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

    // Render Subtopic Weakness Breakdown Report
    const subtopicContainer = document.getElementById('mock-subtopic-breakdown');
    if (subtopicContainer) {
      const sortedSubtopics = Object.keys(subtopicStats).map(ts => {
        const item = subtopicStats[ts];
        const pct = Math.round((item.correct / item.total) * 100);
        return { ts, correct: item.correct, total: item.total, pct };
      }).sort((a, b) => a.pct - b.pct);

      subtopicContainer.innerHTML = sortedSubtopics.map(item => {
        const color = item.pct >= 75 ? 'var(--accent-emerald)' : item.pct >= 50 ? 'var(--accent-amber)' : 'var(--accent-rose)';
        const icon = item.pct >= 75 ? '✅' : item.pct >= 50 ? '⚠️' : '❌';
        return `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.35rem 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
            <span>${icon} <code style="color: var(--text-primary); font-size: 0.78rem;">${item.ts}</code></span>
            <strong style="color: ${color};">${item.correct}/${item.total} (${item.pct}%)</strong>
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
  window.renderPracticeTermsGrid();
});
