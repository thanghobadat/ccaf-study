const SESSION_STORAGE_KEY = 'ccaf_active_exam_session';

let currentPracticeSubMode = 'DOMAIN'; // 'DOMAIN' or 'CONCEPT'
let currentConceptFilterDomain = 'ALL';
const conceptQuestionsCache = new Map();
let mockExamQuestions = [];
let mockExamAnswers = {};
let mockExamFlags = new Set();
let currentExamIndex = 0;
let currentMockExamLabel = '';
let isMockSubmitted = false;
let isInstantFeedbackMode = false;
let revealedQuestions = new Set();
let mockSecondsRemaining = 0;
let mockExamTimer = null;

window.saveActiveExamSession = function() {
  if (typeof localStorage === 'undefined' || isMockSubmitted || !mockExamQuestions || mockExamQuestions.length === 0) return;
  try {
    const sessionData = {
      questions: mockExamQuestions,
      answers: mockExamAnswers,
      flags: Array.from(mockExamFlags),
      currentIndex: currentExamIndex,
      label: currentMockExamLabel,
      isInstant: isInstantFeedbackMode,
      revealed: Array.from(revealedQuestions),
      secondsRemaining: mockSecondsRemaining,
      timestamp: Date.now()
    };
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));
  } catch (e) {
    console.warn("Could not save active exam session to localStorage:", e);
  }
};

window.clearActiveExamSession = function() {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  } catch (e) {
    console.warn("Could not clear active exam session from localStorage:", e);
  }
};

window.restoreActiveExamSession = function() {
  if (typeof localStorage === 'undefined') return false;
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return false;

    const session = JSON.parse(raw);
    if (!session || !session.questions || !Array.isArray(session.questions) || session.questions.length === 0) {
      window.clearActiveExamSession();
      return false;
    }

    mockExamQuestions = session.questions;
    mockExamAnswers = session.answers || {};
    mockExamFlags = new Set(session.flags || []);
    currentExamIndex = (typeof session.currentIndex === 'number' && session.currentIndex >= 0 && session.currentIndex < mockExamQuestions.length)
      ? session.currentIndex
      : 0;
    currentMockExamLabel = session.label || '';
    isInstantFeedbackMode = (session.isInstant === true);
    revealedQuestions = new Set(session.revealed || []);
    isMockSubmitted = false;

    // Time calculation for timer mode
    if (!isInstantFeedbackMode) {
      const elapsed = Math.floor((Date.now() - (session.timestamp || Date.now())) / 1000);
      mockSecondsRemaining = Math.max(0, (session.secondsRemaining || 0) - elapsed);
    } else {
      mockSecondsRemaining = 0;
    }

    const setupCard = document.getElementById('mock-setup-card');
    const arenaBox = document.getElementById('mock-arena-box');

    if (setupCard) setupCard.style.display = 'none';
    if (arenaBox) arenaBox.style.display = 'block';

    updateHeaderBarState();
    startMockTimer();
    renderQuestionGrid();
    renderCurrentQuestion();

    if (typeof AppStore !== 'undefined' && AppStore.showToast) {
      const curLang = AppStore.getLang();
      AppStore.showToast(curLang === 'EN' ? "🔄 Resumed your active practice session!" : "🔄 Đã khôi phục bài làm dở của bạn!");
    }

    return true;
  } catch (e) {
    console.error("Error restoring active exam session:", e);
    window.clearActiveExamSession();
    return false;
  }
};

window.addEventListener('beforeunload', () => {
  window.saveActiveExamSession();
});

window.startInstantPracticeExam = function() {
  window.startCustomPracticeExam(true);
};

window.filterConceptsByDomain = function(domain) {
  currentConceptFilterDomain = domain;
  const chips = ['all', 'd1', 'd2', 'd3', 'd4', 'd5'];
  chips.forEach(c => {
    const btn = document.getElementById(`chip-concept-${c}`);
    if (btn) {
      if (c.toUpperCase() === domain.toUpperCase() || (c === 'all' && domain === 'ALL')) {
        btn.className = 'btn btn-primary';
      } else {
        btn.className = 'btn btn-secondary';
      }
    }
  });
  window.renderPracticeConceptsGrid();
};

window.switchPracticeSubMode = function(mode) {
  if (mode === 'TERM') mode = 'CONCEPT';
  currentPracticeSubMode = mode;
  const domainTab = document.getElementById('tab-practice-domain');
  const conceptTab = document.getElementById('tab-practice-concept') || document.getElementById('tab-practice-term');
  const domainBox = document.getElementById('practice-domain-box');
  const conceptBox = document.getElementById('practice-concept-box') || document.getElementById('practice-term-box');

  if (mode === 'DOMAIN') {
    if (domainTab) domainTab.className = 'btn btn-primary';
    if (conceptTab) conceptTab.className = 'btn btn-secondary';
    if (domainBox) domainBox.style.display = 'block';
    if (conceptBox) conceptBox.style.display = 'none';
  } else {
    if (domainTab) domainTab.className = 'btn btn-secondary';
    if (conceptTab) conceptTab.className = 'btn btn-primary';
    if (domainBox) domainBox.style.display = 'none';
    if (conceptBox) conceptBox.style.display = 'block';
    window.renderPracticeConceptsGrid();
  }
};

window.toggleMockDomains = function(selectState) {
  document.querySelectorAll('.mock-domain-cb').forEach(cb => {
    cb.checked = selectState;
  });
};

window.toggleMockConcepts = function(selectState) {
  document.querySelectorAll('.mock-concept-cb').forEach(cb => {
    cb.checked = selectState;
  });
};

// Backward compatibility alias
window.toggleMockTerms = window.toggleMockConcepts;

window.getMatchingQuestionsForConceptId = function(conceptId) {
  if (typeof MOCK_EXAM_QUESTION_POOL === 'undefined') return [];
  if (conceptQuestionsCache.has(conceptId)) {
    return conceptQuestionsCache.get(conceptId);
  }

  let conceptObj = null;
  if (typeof CCAF_KNOWLEDGE_DATA !== 'undefined') {
    conceptObj = CCAF_KNOWLEDGE_DATA.find(c => c.id === conceptId);
  }

  if (!conceptObj) return [];

  const cDom = conceptObj.domain;
  const cTitle = conceptObj.title || '';
  
  // Extract clean keywords from title
  const cleanTitle = cTitle.replace(/[\(\)\&\/\,\–\—\-\:\`\']/g, ' ');
  const keywords = cleanTitle.split(/\s+/).map(w => w.toLowerCase()).filter(w => 
    w.length > 2 && !['and', 'the', 'for', 'with', 'pattern', 'architecture', 'trong', 'cốt', 'lõi', 'của', 'khi', 'nào', 'dùng', 'cái'].includes(w)
  );

  const scored = [];
  for (const q of MOCK_EXAM_QUESTION_POOL) {
    if (q.domain !== cDom) continue;
    
    const ts = (q.taskStatement || '').toLowerCase();
    const qText = ((q.question || '') + ' ' + (q.questionEN || '') + ' ' + (q.explanation || '') + ' ' + (q.rationale || '')).toLowerCase();
    
    let score = 0;
    for (const kw of keywords) {
      if (ts.includes(kw)) {
        score += kw.length > 6 ? 4 : 2;
      } else if (qText.includes(kw)) {
        score += 1;
      }
    }

    // Additional relevance bonus for concept sub-index in taskStatement
    if (ts.includes(`concept-${conceptObj.index}`) || ts.includes(`${conceptObj.index}.`)) {
      score += 3;
    }

    if (score > 0) {
      scored.push({ q, score });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  let pool = scored.map(item => item.q);

  // Fallback: If keyword match is sparse, supplement with domain pool
  if (pool.length < 5) {
    const domainPool = MOCK_EXAM_QUESTION_POOL.filter(q => q.domain === cDom);
    const existingIds = new Set(pool.map(q => q.id));
    for (const dq of domainPool) {
      if (!existingIds.has(dq.id)) {
        pool.push(dq);
        if (pool.length >= 10) break;
      }
    }
  }

  conceptQuestionsCache.set(conceptId, pool);
  return pool;
};

// Backward compatibility alias
window.getMatchingQuestionsForTermId = window.getMatchingQuestionsForConceptId;

window.renderPracticeConceptsGrid = function() {
  const container = document.getElementById('practice-concepts-grid') || document.getElementById('practice-terms-grid');
  if (!container) return;

  if (typeof CCAF_KNOWLEDGE_DATA === 'undefined') {
    container.innerHTML = '<div style="font-size:0.82rem; color:var(--text-muted);">⚠️ Chưa tải được bộ dữ liệu 47+ Kiến Thức Cốt Lõi.</div>';
    return;
  }

  let list = CCAF_KNOWLEDGE_DATA;
  if (currentConceptFilterDomain && currentConceptFilterDomain !== 'ALL') {
    list = list.filter(c => c.domain === currentConceptFilterDomain);
  }

  const domainColors = {
    'D1': 'var(--accent-purple)',
    'D2': 'var(--accent-cyan)',
    'D3': 'var(--accent-green)',
    'D4': 'var(--accent-amber)',
    'D5': 'var(--accent-rose)'
  };

  container.innerHTML = list.map(c => {
    const matchCount = window.getMatchingQuestionsForConceptId(c.id).length;
    const domColor = domainColors[c.domain] || 'var(--accent-purple)';
    const idxStr = c.index < 10 ? '0' + c.index : c.index;
    return `
      <label class="domain-cb-card" style="padding: 0.45rem 0.65rem; font-size: 0.8rem; cursor: pointer; display: flex; align-items: center; justify-content: space-between; gap: 0.4rem; transition: background 0.15s ease;">
        <div style="display: flex; align-items: center; gap: 0.45rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1;">
          <input type="checkbox" class="mock-concept-cb mock-term-cb" value="${c.id}" checked style="transform: scale(1.1); margin-right: 0.1rem; flex-shrink: 0;">
          <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="[${c.domain} #${idxStr}] ${c.title}">
            <strong style="color: ${domColor}; font-family: monospace;">[${c.domain} #${idxStr}]</strong> 
            <span>${c.title}</span>
          </span>
        </div>
        <span class="badge" style="font-size: 0.72rem; padding: 0.15rem 0.4rem; flex-shrink: 0; background: var(--bg-card); border: 1px solid var(--border-color); color: var(--text-muted);">${matchCount}Q</span>
      </label>
    `;
  }).join('');
};

// Backward compatibility alias
window.renderPracticeTermsGrid = window.renderPracticeConceptsGrid;

window.startCustomPracticeExam = function(isInstant = false) {
  isInstantFeedbackMode = (isInstant === true);
  const countInput = document.getElementById('practice-count-input');
  let qCount = parseInt(countInput ? countInput.value : '10', 10);

  if (isNaN(qCount) || qCount < 1) qCount = 10;

  if (typeof MOCK_EXAM_QUESTION_POOL === 'undefined') {
    AppStore.showToast("⚠️ Chưa tải được bộ đề thi mô phỏng!");
    return;
  }

  let pool = [];
  let modeLabel = '';

  if (currentPracticeSubMode === 'CONCEPT' || currentPracticeSubMode === 'TERM') {
    const checkedConceptIds = Array.from(document.querySelectorAll('.mock-concept-cb:checked, .mock-term-cb:checked')).map(cb => cb.value);
    const uniqueIds = Array.from(new Set(checkedConceptIds));
    if (uniqueIds.length === 0) {
      AppStore.showToast("⚠️ Vui lòng tích chọn ít nhất 1 Chủ đề Kiến Thức để ôn tập!");
      return;
    }

    const matchedMap = new Map();
    uniqueIds.forEach(cId => {
      const qList = window.getMatchingQuestionsForConceptId(cId);
      qList.forEach(q => {
        if (!matchedMap.has(q.id)) matchedMap.set(q.id, q);
      });
    });

    pool = Array.from(matchedMap.values());
    modeLabel = `CONCEPTS_${uniqueIds.length}C`;
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

  const modePrefix = isInstantFeedbackMode ? 'INSTANT_PRACTICE' : 'PRACTICE';
  currentMockExamLabel = `${modePrefix}_${modeLabel}_${mockExamQuestions.length}Q`;
  isMockSubmitted = false;
  revealedQuestions.clear();
  mockExamAnswers = {};
  mockExamFlags.clear();
  currentExamIndex = 0;
  updateHeaderBarState();

  mockSecondsRemaining = Math.max(5 * 60, Math.round(mockExamQuestions.length * 2 * 60));

  document.getElementById('mock-setup-card').style.display = 'none';
  document.getElementById('mock-arena-box').style.display = 'block';

  startMockTimer();
  renderQuestionGrid();
  renderCurrentQuestion();
  window.saveActiveExamSession();
};

window.startOfficialMockExam = function() {
  if (typeof MOCK_EXAM_QUESTION_POOL === 'undefined') {
    AppStore.showToast("⚠️ Chưa tải được bộ đề thi mô phỏng!");
    return;
  }

  isMockSubmitted = false;
  isInstantFeedbackMode = false;
  revealedQuestions.clear();
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

  mockExamQuestions = [...d1Pool, ...d2Pool, ...d3Pool, ...d4Pool, ...d5Pool].sort(() => Math.random() - 0.5).map((item, idx) => {
    return {
      ...item,
      uniqueId: `${item.id}_official_${idx}`
    };
  });

  document.getElementById('mock-setup-card').style.display = 'none';
  document.getElementById('mock-arena-box').style.display = 'block';

  startMockTimer();
  renderQuestionGrid();
  renderCurrentQuestion();
  window.saveActiveExamSession();
};

function startMockTimer() {
  if (mockExamTimer) clearInterval(mockExamTimer);
  const timerContainer = document.getElementById('mock-timer-container');
  const instantBadge = document.getElementById('mock-instant-badge');
  const timerEl = document.getElementById('mock-timer-val');
  const curLang = typeof AppStore !== 'undefined' ? AppStore.getLang() : 'VI';

  if (isInstantFeedbackMode) {
    if (timerContainer) timerContainer.style.display = 'none';
    if (instantBadge) {
      instantBadge.style.display = 'inline-flex';
      const badgeText = document.getElementById('mock-instant-badge-text');
      if (badgeText) {
        badgeText.textContent = curLang === 'EN' ? 'INSTANT FEEDBACK (NO TIME LIMIT)' : 'ÔN TẬP TỨC THÌ (KHÔNG GIỚI HẠN THỜI GIAN)';
      }
    }
    return;
  }

  // Active timer mode
  if (timerContainer) timerContainer.style.display = 'block';
  if (instantBadge) instantBadge.style.display = 'none';

  if (timerEl) {
    const hours = Math.floor(mockSecondsRemaining / 3600);
    const mins = Math.floor((mockSecondsRemaining % 3600) / 60);
    const secs = mockSecondsRemaining % 60;
    timerEl.textContent = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

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

  const curLang = typeof AppStore !== 'undefined' ? AppStore.getLang() : 'VI';
  const legendEl = document.getElementById('question-grid-legend');

  if (legendEl) {
    if (isMockSubmitted) {
      legendEl.innerHTML = curLang === 'EN' 
        ? '🔵 Active | 🟢 Correct | 🔴 Incorrect | ⚪ Unanswered | 🚩 Flagged'
        : '🔵 Đang xem | 🟢 Câu Đúng | 🔴 Câu Sai | ⚪ Chưa Làm | 🚩 Cắm Cờ';
    } else {
      legendEl.innerHTML = curLang === 'EN'
        ? '🔵 Active | 🟢 Answered | 🟡 Flagged | ⚪ Unanswered'
        : '🔵 Đang xem | 🟢 Đã làm | 🟡 Cắm cờ | ⚪ Chưa làm';
    }
  }

  let correctCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;

  gridEl.innerHTML = mockExamQuestions.map((q, idx) => {
    const qKey = q.uniqueId || q.id;
    const isAnswered = mockExamAnswers[qKey] !== undefined;
    const isFlagged = mockExamFlags.has(qKey);
    const isActive = idx === currentExamIndex;
    const isQuestionRevealed = isMockSubmitted || (isInstantFeedbackMode && revealedQuestions.has(qKey));

    let btnClass = 'grid-nav-btn';
    if (isActive) btnClass += ' active-nav';

    if (isQuestionRevealed) {
      const userAnswer = mockExamAnswers[qKey];
      if (userAnswer === q.correct) {
        btnClass += ' correct-nav';
        correctCount++;
      } else if (userAnswer !== undefined) {
        btnClass += ' wrong-nav';
        wrongCount++;
      } else {
        btnClass += ' unanswered-submitted-nav';
        unansweredCount++;
      }
      if (isFlagged) btnClass += ' flagged-nav-review';
    } else {
      if (isFlagged) btnClass += ' flagged-nav';
      if (isAnswered) btnClass += ' answered-nav';
    }

    const flagBadgeHtml = isFlagged ? '<span class="grid-nav-flag-badge">🚩</span>' : '';

    return `
      <button type="button" class="${btnClass}" onclick="window.jumpToQuestion(${idx})" title="Câu ${idx + 1} (${q.domain})${isFlagged ? ' [🚩 Flagged]' : ''}">
        ${flagBadgeHtml}
        ${idx + 1}
      </button>
    `;
  }).join('');

  const answeredCount = Object.keys(mockExamAnswers).length;
  const flaggedCount = mockExamFlags.size;
  const statsEl = document.getElementById('grid-stats-text');
  if (statsEl) {
    if (isMockSubmitted || isInstantFeedbackMode) {
      statsEl.textContent = curLang === 'EN' 
        ? `Correct: ${correctCount}/${mockExamQuestions.length} | Incorrect: ${wrongCount} | Skipped: ${unansweredCount} | Flagged: ${flaggedCount}`
        : `Đúng: ${correctCount}/${mockExamQuestions.length} | Sai: ${wrongCount} | Chưa làm: ${unansweredCount} | Cắm cờ: ${flaggedCount}`;
    } else {
      statsEl.textContent = curLang === 'EN' 
        ? `Answered: ${answeredCount}/${mockExamQuestions.length} | Flagged: ${flaggedCount}`
        : `Đã làm: ${answeredCount}/${mockExamQuestions.length} | Cắm cờ: ${flaggedCount}`;
    }
  }
}

window.jumpToQuestion = function(idx) {
  idx = parseInt(idx, 10);
  if (isNaN(idx) || idx < 0 || idx >= mockExamQuestions.length) return;
  currentExamIndex = idx;
  renderQuestionGrid();
  renderCurrentQuestion();
  window.saveActiveExamSession();
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

  const isQuestionRevealed = isMockSubmitted || (isInstantFeedbackMode && revealedQuestions.has(qKey));

  qContainer.innerHTML = `
    <div class="card" style="padding: 2rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.5rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
          <span class="badge badge-${q.domain.toLowerCase()}">${currentLang === 'EN' ? `Question ${currentExamIndex + 1} / ${mockExamQuestions.length} • ${q.domain}` : `Câu ${currentExamIndex + 1} / ${mockExamQuestions.length} • ${q.domain}`}</span>
          ${isInstantFeedbackMode ? '<span class="badge badge-d2" style="background: rgba(6, 182, 212, 0.2); color: var(--accent-cyan); font-size: 0.75rem;">⚡ Instant Feedback</span>' : ''}
          ${taskTag}
          ${diffTag}
        </div>
        
        <button type="button" class="btn btn-secondary" style="font-size: 0.82rem; ${isFlagged ? 'background: rgba(245, 158, 11, 0.2); border-color: var(--accent-amber); color: var(--accent-amber);' : ''}" onclick="window.toggleFlagCurrentQuestion()">
          ${isFlagged ? (currentLang === 'EN' ? '🚩 Flagged / Skip' : '🚩 Đã Cắm Cờ Bỏ Qua') : (currentLang === 'EN' ? '🏁 Flag for Review' : '🏁 Cắm Cờ Xem Lại (Flag)')}
        </button>
      </div>

      <h2 style="font-size: 1.15rem; line-height: 1.6; margin-bottom: 1.5rem; color: var(--text-primary);">${qText}</h2>

      <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-bottom: 2rem;">
        ${optsText.map((opt, oIdx) => {
          let optClass = 'quiz-option';
          if (isSelected === oIdx) optClass += ' selected';

          if (isQuestionRevealed) {
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

          if (isQuestionRevealed) {
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

      ${isQuestionRevealed ? `
        <div class="callout ${isSelected === q.correct ? '' : 'callout-warning'}" style="margin-top: 1.5rem; background: var(--bg-secondary); border-radius: 12px; padding: 1.25rem;">
          <div class="callout-title" style="font-size: 1.05rem; font-weight: 800; margin-bottom: 0.75rem; color: ${isSelected === q.correct ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">
            ${isSelected === q.correct ? (currentLang === 'EN' ? '✅ CORRECT ANSWER (+10 XP)' : '✅ ĐÁP ÁN CHÍNH XÁC (+10 XP)') : (currentLang === 'EN' ? '❌ INCORRECT (+2 XP)' : '❌ CHƯA CHÍNH XÁC (+2 XP)')}
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
          ${currentLang === 'EN' ? '← Previous' : '← Câu Trước'}
        </button>

        <button type="button" class="btn btn-primary" onclick="window.jumpToQuestion(${currentExamIndex + 1})" ${currentExamIndex === mockExamQuestions.length - 1 ? 'disabled style="opacity:0.5;"' : ''}>
          ${currentLang === 'EN' ? 'Next →' : 'Câu Tiếp Theo →'}
        </button>
      </div>
    </div>
  `;
}

window.selectOption = function(qId, oIdx) {
  if (isMockSubmitted) return;
  
  const isFirstTimeReveal = isInstantFeedbackMode && !revealedQuestions.has(qId);
  mockExamAnswers[qId] = oIdx;

  if (isInstantFeedbackMode) {
    revealedQuestions.add(qId);
    const q = mockExamQuestions.find(item => (item.uniqueId || item.id) === qId);

    if (q && isFirstTimeReveal) {
      if (oIdx === q.correct) {
        if (typeof AppStore !== 'undefined') {
          AppStore.addXP(10);
          AppStore.showToast("✅ Chính xác! +10 XP");
        }
      } else {
        if (typeof AppStore !== 'undefined') {
          AppStore.addXP(2);
          AppStore.showToast("❌ Chưa chính xác! +2 XP thử sức");
        }
      }
    }
  }

  renderQuestionGrid();
  renderCurrentQuestion();
  window.saveActiveExamSession();
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
  window.saveActiveExamSession();
};

function updateHeaderBarState() {
  const cancelBtn = document.getElementById('btn-cancel-mock');
  const submitBtn = document.getElementById('btn-submit-mock');
  if (!cancelBtn || !submitBtn) return;

  const curLang = typeof AppStore !== 'undefined' ? AppStore.getLang() : 'VI';

  if (isMockSubmitted) {
    cancelBtn.innerHTML = curLang === 'EN' ? '🏠 Return to Selection' : '🏠 Về Trang Chọn Đề';
    cancelBtn.style.borderColor = 'var(--accent-purple)';
    cancelBtn.style.color = 'var(--accent-purple)';

    submitBtn.innerHTML = curLang === 'EN' ? '📊 View Score Report' : '📊 Xem Báo Cáo Score';
    submitBtn.className = 'btn btn-primary';
    submitBtn.onclick = function() { window.openReportModal(); };
  } else {
    cancelBtn.innerHTML = curLang === 'EN' ? '🛑 Cancel Exam' : '🛑 Dừng Thi / Hủy Bài';
    cancelBtn.style.borderColor = 'var(--accent-rose)';
    cancelBtn.style.color = 'var(--accent-rose)';

    submitBtn.innerHTML = curLang === 'EN' ? '✓ Submit & View Results' : '✓ Nộp Bài Thi & Xem Kết Quả';
    submitBtn.className = 'btn btn-success';
    submitBtn.onclick = function() { window.submitMockExam(); };
  }
}

window.openReportModal = function() {
  const reportModal = document.getElementById('mock-report-modal');
  if (reportModal) {
    reportModal.style.display = 'flex';
    if (reportModal.classList) reportModal.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

window.closeReportModal = function() {
  const reportModal = document.getElementById('mock-report-modal');
  if (reportModal) {
    reportModal.style.display = 'none';
    if (reportModal.classList) reportModal.classList.remove('active');
  }
};

function refreshReportModalState(totalScore, isPassed) {
  const statusEl = document.getElementById('mock-report-status');
  const detailsEl = document.getElementById('mock-report-details');
  const curLang = typeof AppStore !== 'undefined' ? AppStore.getLang() : 'VI';

  if (statusEl) {
    if (isPassed) {
      statusEl.style.color = 'var(--accent-emerald)';
      statusEl.textContent = curLang === 'EN' ? '🎉 CONGRATULATIONS! PASSED' : '🎉 CHÚC MỪNG! BẠN ĐÃ ĐẠT (PASS)';
    } else {
      statusEl.style.color = 'var(--accent-rose)';
      statusEl.textContent = curLang === 'EN' ? '❌ FAILED - PRACTICE MORE' : '❌ CHƯA ĐẠT (FAIL) - CẦN ÔN THÊM';
    }
  }

  if (detailsEl) {
    detailsEl.textContent = curLang === 'EN'
      ? `Correct: ${totalScore}/${mockExamQuestions.length} questions. Passing requirement: 72%.`
      : `Trả lời đúng: ${totalScore}/${mockExamQuestions.length} câu. Yêu cầu đỗ: 72%.`;
  }
}

window.cancelMockExam = function() {
  window.clearActiveExamSession();
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
  window.clearActiveExamSession();
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
          total: mockExamQuestions.length,
          questions: mockExamQuestions,
          userAnswers: mockExamAnswers
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

    refreshReportModalState(totalScore, isPassed);

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
  window.renderMockHistoryTable();
};

window.renderMockHistoryTable = function() {
  const container = document.getElementById('mock-history-table-container');
  if (!container || typeof AppStore === 'undefined') return;

  const history = AppStore.getQuizResults();
  const curLang = AppStore.getLang();

  if (!history || history.length === 0) {
    container.innerHTML = `<div style="text-align: center; padding: 1.5rem; color: var(--text-muted); font-size: 0.9rem;">
      ${curLang === 'EN' ? 'No history recorded yet. Complete an exam to view results!' : 'Chưa có lịch sử thi nào được ghi nhận. Hãy bắt đầu một bài thi để lưu lại kết quả!'}
    </div>`;
    return;
  }

  container.innerHTML = `
    <table class="history-table">
      <thead>
        <tr>
          <th>${curLang === 'EN' ? 'Date & Time' : 'Thời gian'}</th>
          <th>${curLang === 'EN' ? 'Exam Mode' : 'Chế độ thi'}</th>
          <th>${curLang === 'EN' ? 'Score' : 'Điểm số'}</th>
          <th>${curLang === 'EN' ? 'Status' : 'Trạng thái'}</th>
          <th>${curLang === 'EN' ? 'Action' : 'Thao tác'}</th>
        </tr>
      </thead>
      <tbody>
        ${history.map(item => {
          const passClass = item.pass ? 'color: var(--accent-emerald); font-weight: bold;' : 'color: var(--accent-rose); font-weight: bold;';
          const passBadge = item.pass ? '✅ PASS' : '❌ FAIL';
          return `
            <tr>
              <td>${item.date}</td>
              <td><code style="color: var(--accent-purple);">${item.domains}</code></td>
              <td><strong>${item.score}/${item.total} (${item.percentage}%)</strong></td>
              <td><span style="${passClass}">${passBadge}</span></td>
              <td>
                ${(item.questions && item.questions.length > 0) ? `
                  <button class="btn btn-secondary" style="padding: 0.25rem 0.5rem; font-size: 0.78rem;" onclick="window.viewMockHistoryDetail(${item.id})">
                    👁️ ${curLang === 'EN' ? 'Review' : 'Xem lại'}
                  </button>
                ` : '<span style="color: var(--text-muted); font-size: 0.78rem;">--</span>'}
              </td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;
};

window.viewMockHistoryDetail = function(historyId) {
  if (typeof AppStore === 'undefined') return;
  const history = AppStore.getQuizResults();
  const item = history.find(h => h.id === historyId);
  if (!item || !item.questions || item.questions.length === 0) {
    AppStore.showToast("⚠️ Không tìm thấy chi tiết bài thi này!");
    return;
  }

  mockExamQuestions = item.questions;
  mockExamAnswers = item.userAnswers || {};
  mockExamFlags.clear();
  currentExamIndex = 0;
  isMockSubmitted = true;
  currentMockExamLabel = item.domains;

  document.getElementById('mock-setup-card').style.display = 'none';
  document.getElementById('mock-arena-box').style.display = 'block';

  if (mockExamTimer) clearInterval(mockExamTimer);
  const timerEl = document.getElementById('mock-timer-val');
  if (timerEl) timerEl.textContent = "REVIEW MODE";

  updateHeaderBarState();
  renderQuestionGrid();
  renderCurrentQuestion();
  window.openReportModal();
};

window.closeMockHistoryDetailModal = function() {
  const modal = document.getElementById('mock-history-detail-modal');
  if (modal) modal.style.display = 'none';
};

window.addEventListener('ccaf_lang_changed', () => {
  window.renderMockHistoryTable();
  const arenaBox = document.getElementById('mock-arena-box');
  if (arenaBox && arenaBox.style.display !== 'none') {
    const instantBadgeText = document.getElementById('mock-instant-badge-text');
    if (instantBadgeText) {
      const curLang = typeof AppStore !== 'undefined' ? AppStore.getLang() : 'VI';
      instantBadgeText.textContent = curLang === 'EN' ? 'INSTANT FEEDBACK (NO TIME LIMIT)' : 'ÔN TẬP TỨC THÌ (KHÔNG GIỚI HẠN THỜI GIAN)';
    }
    updateHeaderBarState();
    renderQuestionGrid();
    renderCurrentQuestion();

    const reportModal = document.getElementById('mock-report-modal');
    if (reportModal && (reportModal.style.display === 'flex' || reportModal.classList.contains('active'))) {
      let totalScore = 0;
      mockExamQuestions.forEach(q => {
        const qKey = q.uniqueId || q.id;
        if (mockExamAnswers[qKey] === q.correct) totalScore++;
      });
      const pct = mockExamQuestions.length > 0 ? Math.round((totalScore / mockExamQuestions.length) * 100) : 0;
      refreshReportModalState(totalScore, pct >= 72);
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const hasRestored = window.restoreActiveExamSession();

  if (!hasRestored) {
    // Check for domain query parameter (e.g. ?domain=D1)
    if (typeof window !== 'undefined' && window.location && window.location.search) {
      const urlParams = new URLSearchParams(window.location.search);
      const targetDomain = urlParams.get('domain');
      if (targetDomain && ['D1', 'D2', 'D3', 'D4', 'D5'].includes(targetDomain.toUpperCase())) {
        document.querySelectorAll('.mock-domain-cb').forEach(cb => {
          cb.checked = (cb.value.toUpperCase() === targetDomain.toUpperCase());
        });
      }
    }
  }

  window.renderPracticeTermsGrid();
  window.renderMockHistoryTable();
});

