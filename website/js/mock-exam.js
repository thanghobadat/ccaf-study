const SESSION_STORAGE_KEY = 'ccaf_active_exam_session';

let currentPracticeSubMode = 'DOMAIN'; // 'DOMAIN' or 'CONCEPT'
let currentConceptFilterDomain = 'ALL';
const conceptQuestionsCache = new Map();
let mockExamQuestions = [];
let mockExamAnswers = {};
let mockExamFlags = {}; // key: qKey -> 'SURE' | 'SPLIT' | 'PARTIAL' | 'BLIND'
let mockExamReviewFlags = {}; // key: qKey -> boolean (true: Cần xem lại dù đúng hay sai, đè lên cờ khác)
let currentExamIndex = 0;
let currentMockExamLabel = '';
let isMockSubmitted = false;
let isInstantFeedbackMode = false;
let revealedQuestions = new Set();
let mockSecondsRemaining = 0;
let mockExamTimer = null;

function isMultiQuestion(q) {
  return Boolean(q && (q.multiple === true || (Array.isArray(q.correct) && q.correct.length > 1)));
}

function isAnswerCorrect(q, userAnswer) {
  if (!q || userAnswer === undefined || userAnswer === null) return false;
  if (isMultiQuestion(q)) {
    if (!Array.isArray(userAnswer) || userAnswer.length !== q.correct.length) return false;
    const sortedUser = [...userAnswer].sort((a, b) => a - b);
    const sortedCorrect = [...q.correct].sort((a, b) => a - b);
    return sortedUser.every((val, idx) => val === sortedCorrect[idx]);
  }
  return userAnswer === q.correct;
}

window.getActiveExamQuestions = function() {
  return mockExamQuestions;
};

window.saveActiveExamSession = function() {
  if (typeof localStorage === 'undefined' || isMockSubmitted || !mockExamQuestions || mockExamQuestions.length === 0) return;
  try {
    const sessionData = {
      questions: mockExamQuestions,
      answers: mockExamAnswers,
      flags: mockExamFlags,
      reviewFlags: mockExamReviewFlags,
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
    if (session.flags) {
      if (Array.isArray(session.flags)) {
        mockExamFlags = {};
        session.flags.forEach(f => { mockExamFlags[f] = 'SPLIT'; });
      } else if (typeof session.flags === 'object') {
        mockExamFlags = {};
        Object.entries(session.flags).forEach(([k, v]) => {
          if (v === 'UNSURE') mockExamFlags[k] = 'SPLIT';
          else if (v === 'GUESS') mockExamFlags[k] = 'BLIND';
          else mockExamFlags[k] = v;
        });
      } else {
        mockExamFlags = {};
      }
    } else {
      mockExamFlags = {};
    }
    mockExamReviewFlags = (session.reviewFlags && typeof session.reviewFlags === 'object') ? session.reviewFlags : {};
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
// Backward compatibility alias
window.toggleMockTerms = window.toggleMockConcepts;

let currentPracticeDataset = 'V2'; // 'V1', 'V2', 'BOTH'

window.getPracticeQuestionPool = function(datasetCode = currentPracticeDataset) {
  const v1 = (typeof window !== 'undefined' && window.MOCK_EXAM_POOL_V1) || (typeof MOCK_EXAM_POOL_V1 !== 'undefined' ? MOCK_EXAM_POOL_V1 : []);
  const v2 = (typeof window !== 'undefined' && (window.MOCK_EXAM_POOL_MERGED || window.MOCK_EXAM_POOL_V2)) || (typeof MOCK_EXAM_POOL_MERGED !== 'undefined' ? MOCK_EXAM_POOL_MERGED : []);
  const fallback = v2.length ? v2 : ((typeof window !== 'undefined' && window.MOCK_EXAM_QUESTION_POOL) || (typeof MOCK_EXAM_QUESTION_POOL !== 'undefined' ? MOCK_EXAM_QUESTION_POOL : []));

  if (datasetCode === 'V1') {
    return v1.length ? v1 : fallback;
  }
  if (datasetCode === 'V2') {
    return v2.length ? v2 : fallback;
  }
  if (datasetCode === 'BOTH') {
    if (v1.length && v2.length) {
      return [...v2, ...v1];
    }
    return v2.length ? v2 : (v1.length ? v1 : fallback);
  }
  return v2.length ? v2 : (v1.length ? v1 : fallback);
};

window.updateDomainCheckboxLabels = function() {
  const pool = window.getPracticeQuestionPool();
  const counts = { D1: 0, D2: 0, D3: 0, D4: 0, D5: 0 };
  for (const q of pool) {
    if (counts[q.domain] !== undefined) {
      counts[q.domain]++;
    }
  }

  const domainTitles = {
    D1: 'Architecture',
    D2: 'Tool/MCP',
    D3: 'Workflows',
    D4: 'Prompting',
    D5: 'Context'
  };

  ['D1', 'D2', 'D3', 'D4', 'D5'].forEach(dom => {
    const el = document.getElementById(`domain-lbl-${dom.toLowerCase()}`);
    if (el) {
      el.innerHTML = `<strong>${dom} (${counts[dom]} câu)</strong> ${domainTitles[dom]}`;
    }
  });

  const badgeEl = document.getElementById('practice-pool-badge');
  if (badgeEl) {
    badgeEl.textContent = `${pool.length.toLocaleString()} câu`;
  }
};

window.switchPracticeDataset = function(datasetCode) {
  if (!['V1', 'V2', 'BOTH'].includes(datasetCode)) datasetCode = 'V2';
  currentPracticeDataset = datasetCode;

  // Update button active styles
  const btnV1 = document.getElementById('btn-dataset-v1');
  const btnV2 = document.getElementById('btn-dataset-v2');
  const btnBoth = document.getElementById('btn-dataset-both');

  if (btnV1) btnV1.className = (datasetCode === 'V1') ? 'btn btn-primary dataset-choice-btn' : 'btn btn-secondary dataset-choice-btn';
  if (btnV2) btnV2.className = (datasetCode === 'V2') ? 'btn btn-primary dataset-choice-btn' : 'btn btn-secondary dataset-choice-btn';
  if (btnBoth) btnBoth.className = (datasetCode === 'BOTH') ? 'btn btn-primary dataset-choice-btn' : 'btn btn-secondary dataset-choice-btn';

  // Update domain checkbox labels
  window.updateDomainCheckboxLabels();

  // Clear concept question cache & re-render concept grid
  conceptQuestionsCache.clear();
  window.renderPracticeConceptsGrid();

  if (typeof AppStore !== 'undefined' && AppStore.showToast) {
    const names = {
      'V1': 'Bộ 1: Nền Tảng (644 câu)',
      'V2': 'Bộ 2: Đề Thi Thực Chiến (533 câu)',
      'BOTH': 'Kết hợp cả 2 bộ (1,177 câu hỏi)'
    };
    AppStore.showToast(`📚 Đã chuyển nguồn sang: ${names[datasetCode]}`);
  }
};

let currentOfficialDataset = 'V2'; // 'V1', 'V2', 'BOTH'

window.switchOfficialDataset = function(datasetCode) {
  if (!['V1', 'V2', 'BOTH'].includes(datasetCode)) datasetCode = 'V2';
  currentOfficialDataset = datasetCode;

  // Update button active styles
  const btnV1 = document.getElementById('btn-official-dataset-v1');
  const btnV2 = document.getElementById('btn-official-dataset-v2');
  const btnBoth = document.getElementById('btn-official-dataset-both');

  if (btnV1) btnV1.className = (datasetCode === 'V1') ? 'btn btn-primary dataset-choice-btn' : 'btn btn-secondary dataset-choice-btn';
  if (btnV2) btnV2.className = (datasetCode === 'V2') ? 'btn btn-primary dataset-choice-btn' : 'btn btn-secondary dataset-choice-btn';
  if (btnBoth) btnBoth.className = (datasetCode === 'BOTH') ? 'btn btn-primary dataset-choice-btn' : 'btn btn-secondary dataset-choice-btn';

  const pool = window.getPracticeQuestionPool(currentOfficialDataset);
  const badgeEl = document.getElementById('official-pool-badge');
  if (badgeEl) {
    badgeEl.textContent = `${pool.length.toLocaleString()} câu`;
  }

  const startBtn = document.getElementById('btn-start-official-mock');
  if (startBtn) {
    const curLang = typeof AppStore !== 'undefined' ? AppStore.getLang() : 'VI';
    const tag = datasetCode === 'V1' ? 'Bộ 1' : (datasetCode === 'V2' ? 'Bộ 2' : 'Kết Hợp');
    startBtn.innerHTML = curLang === 'EN'
      ? `🏆 START 60Q MOCK EXAM (${tag} - 120 MINS) →`
      : `🏆 BẮT ĐẦU THI THẬT 60 CÂU (${tag} - 120 PHÚT) →`;
  }

  if (typeof AppStore !== 'undefined' && AppStore.showToast) {
    const names = {
      'V1': 'Bộ 1: Nền Tảng (644 câu)',
      'V2': 'Bộ 2: Đề Thi Thực Chiến (533 câu)',
      'BOTH': 'Kết hợp cả 2 bộ (1,177 câu hỏi)'
    };
    AppStore.showToast(`🏆 Nguồn thi thật: ${names[datasetCode]}`);
  }
};

window.getMatchingQuestionsForConceptId = function(conceptId) {
  const currentPool = window.getPracticeQuestionPool();
  if (!currentPool || currentPool.length === 0) return [];

  const cacheKey = `${currentPracticeDataset}_${conceptId}`;
  if (conceptQuestionsCache.has(cacheKey)) {
    return conceptQuestionsCache.get(cacheKey);
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
  for (const q of currentPool) {
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
    const domainPool = currentPool.filter(q => q.domain === cDom);
    const existingIds = new Set(pool.map(q => q.id));
    for (const dq of domainPool) {
      if (!existingIds.has(dq.id)) {
        pool.push(dq);
        if (pool.length >= 10) break;
      }
    }
  }

  conceptQuestionsCache.set(cacheKey, pool);
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

  const currentPool = window.getPracticeQuestionPool();
  if (!currentPool || currentPool.length === 0) {
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
    modeLabel = `${currentPracticeDataset}_CONCEPTS_${uniqueIds.length}C`;
  } else {
    const checkedDoms = Array.from(document.querySelectorAll('.mock-domain-cb:checked')).map(cb => cb.value);
    if (checkedDoms.length === 0) {
      AppStore.showToast("⚠️ Vui lòng tích chọn ít nhất 1 Domain để ôn tập!");
      return;
    }
    pool = currentPool.filter(q => checkedDoms.includes(q.domain));
    modeLabel = `${currentPracticeDataset}_DOMAINS_${checkedDoms.join('_')}`;
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
  mockExamFlags = {};
  mockExamReviewFlags = {};
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
  const officialPool = window.getPracticeQuestionPool(currentOfficialDataset);
  if (!officialPool || officialPool.length === 0) {
    if (typeof AppStore !== 'undefined' && AppStore.showToast) {
      AppStore.showToast("⚠️ Chưa tải được bộ đề thi mô phỏng!");
    }
    return;
  }

  isMockSubmitted = false;
  isInstantFeedbackMode = false;
  revealedQuestions.clear();
  mockExamAnswers = {};
  mockExamFlags = {};
  mockExamReviewFlags = {};
  mockSecondsRemaining = 120 * 60;
  currentExamIndex = 0;
  currentMockExamLabel = `OFFICIAL_MOCK_60Q_${currentOfficialDataset}`;
  updateHeaderBarState();

  // Draw 60 UNIQUE questions matching official domain weight distribution (D1: 16Q, D2: 11Q, D3: 12Q, D4: 12Q, D5: 9Q)
  const drawUniqueDomain = (domCode, count) => {
    const subPool = officialPool.filter(q => q.domain === domCode).sort(() => Math.random() - 0.5);
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

  let sureCount = 0;
  let splitCount = 0;
  let partialCount = 0;
  let blindCount = 0;
  let reviewCount = 0;
  Object.values(mockExamFlags).forEach(flag => {
    if (flag === 'SURE') sureCount++;
    else if (flag === 'SPLIT' || flag === 'UNSURE') splitCount++;
    else if (flag === 'PARTIAL') partialCount++;
    else if (flag === 'BLIND' || flag === 'GUESS') blindCount++;
  });

  mockExamQuestions.forEach(q => {
    const qKey = q.uniqueId || q.id;
    if (mockExamReviewFlags[qKey]) reviewCount++;
  });

  if (legendEl) {
    legendEl.innerHTML = `
      <span class="flag-count-badge badge-review" title="${curLang === 'EN' ? 'Review Later (Overrides other flags)' : 'Đánh dấu câu này cần xem lại dù đúng hay sai (Đè lên tất cả cờ khác)'}">
        🚩 ${curLang === 'EN' ? 'Review' : 'Cần xem lại'}: <strong>${reviewCount}</strong>
      </span>
      <span class="flag-count-badge badge-sure" title="${curLang === 'EN' ? 'Sure / High Confidence' : '1. Chắc chắn đúng'}">
        🟢 ${curLang === 'EN' ? 'Sure' : 'Chắc đúng'}: <strong>${sureCount}</strong>
      </span>
      <span class="flag-count-badge badge-split" title="${curLang === 'EN' ? 'Understand question, torn between 2-3 options' : '2. Hiểu đề nhưng thấy có 2 hoặc 3 câu đúng, chọn 1 câu nhưng còn phân vân'}">
        🟡 ${curLang === 'EN' ? 'Split' : 'Phân vân 2-3 câu'}: <strong>${splitCount}</strong>
      </span>
      <span class="flag-count-badge badge-partial" title="${curLang === 'EN' ? 'Partially understand, guessed most plausible' : '3. Hiểu 1 ít câu hỏi và câu trả lời, chọn đại 1 đáp án cho là đúng nhất'}">
        🟠 ${curLang === 'EN' ? 'Partial' : 'Hiểu 1 ít'}: <strong>${partialCount}</strong>
      </span>
      <span class="flag-count-badge badge-blind" title="${curLang === 'EN' ? 'No clue, pure blind guess' : '4. Không hiểu gì cả, chọn đại'}">
        🟣 ${curLang === 'EN' ? 'Blind' : 'Không hiểu gì'}: <strong>${blindCount}</strong>
      </span>
    `;
  }

  let correctCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;

  gridEl.innerHTML = mockExamQuestions.map((q, idx) => {
    const qKey = q.uniqueId || q.id;
    const userAnswer = mockExamAnswers[qKey];
    const isAnswered = isMultiQuestion(q)
      ? (Array.isArray(userAnswer) && userAnswer.length > 0)
      : (userAnswer !== undefined && userAnswer !== null);
    const flagType = mockExamFlags[qKey] || null;
    const isActive = idx === currentExamIndex;
    const isQuestionRevealed = isMockSubmitted || (isInstantFeedbackMode && revealedQuestions.has(qKey));

    let btnClass = 'grid-nav-btn';
    if (isActive) btnClass += ' active-nav';

    if (isQuestionRevealed) {
      if (isAnswerCorrect(q, userAnswer)) {
        btnClass += ' correct-nav';
        correctCount++;
      } else if (isAnswered) {
        btnClass += ' wrong-nav';
        wrongCount++;
      } else {
        btnClass += ' unanswered-submitted-nav';
        unansweredCount++;
      }
    } else {
      if (isAnswered) btnClass += ' answered-nav';
    }

    const isReview = Boolean(mockExamReviewFlags[qKey]);
    const reviewBadgeHtml = isReview ? '<span class="grid-nav-review-badge">🚩</span>' : '';
    const reviewTitle = isReview ? (curLang === 'EN' ? ' [🚩 Review Required]' : ' [🚩 Cần xem lại]') : '';

    let confidenceBadgeHtml = '';
    let confTitle = '';
    if (flagType === 'SURE') {
      confidenceBadgeHtml = '<span class="grid-nav-flag-badge flag-sure">🟢</span>';
      confTitle = curLang === 'EN' ? ' [🟢 Sure]' : ' [🟢 1. Chắc chắn đúng]';
    } else if (flagType === 'SPLIT' || flagType === 'UNSURE') {
      confidenceBadgeHtml = '<span class="grid-nav-flag-badge flag-split">🟡</span>';
      confTitle = curLang === 'EN' ? ' [🟡 Split Options]' : ' [🟡 2. Hiểu đề, phân vân 2-3 câu]';
    } else if (flagType === 'PARTIAL') {
      confidenceBadgeHtml = '<span class="grid-nav-flag-badge flag-partial">🟠</span>';
      confTitle = curLang === 'EN' ? ' [🟠 Partial Understanding]' : ' [🟠 3. Hiểu 1 ít, chọn đại]';
    } else if (flagType === 'BLIND' || flagType === 'GUESS') {
      confidenceBadgeHtml = '<span class="grid-nav-flag-badge flag-blind">🟣</span>';
      confTitle = curLang === 'EN' ? ' [🟣 Blind Guess]' : ' [🟣 4. Không hiểu gì cả, chọn đại]';
    }

    return `
      <button type="button" class="${btnClass}" onclick="window.jumpToQuestion(${idx})" title="Câu ${idx + 1} (${q.domain})${confTitle}${reviewTitle}">
        ${reviewBadgeHtml}
        ${confidenceBadgeHtml}
        ${idx + 1}
      </button>
    `;
  }).join('');

  const answeredCount = mockExamQuestions.filter(q => {
    const k = q.uniqueId || q.id;
    const ans = mockExamAnswers[k];
    return isMultiQuestion(q) ? (Array.isArray(ans) && ans.length > 0) : (ans !== undefined && ans !== null);
  }).length;
  const statsEl = document.getElementById('grid-stats-text');
  if (statsEl) {
    const flagSummary = `🚩 ${reviewCount} | 🟢 ${sureCount} | 🟡 ${splitCount} | 🟠 ${partialCount} | 🟣 ${blindCount}`;
    if (isMockSubmitted || isInstantFeedbackMode) {
      statsEl.textContent = curLang === 'EN' 
        ? `Correct: ${correctCount}/${mockExamQuestions.length} | Incorrect: ${wrongCount} | Skipped: ${unansweredCount} | ${flagSummary}`
        : `Đúng: ${correctCount}/${mockExamQuestions.length} | Sai: ${wrongCount} | Chưa làm: ${unansweredCount} | ${flagSummary}`;
    } else {
      statsEl.textContent = curLang === 'EN' 
        ? `Answered: ${answeredCount}/${mockExamQuestions.length} | ${flagSummary}`
        : `Đã làm: ${answeredCount}/${mockExamQuestions.length} | ${flagSummary}`;
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
  const currentFlag = mockExamFlags[qKey] || null;
  const isMulti = isMultiQuestion(q);

  const multiBadge = isMulti
    ? `<span class="badge" style="background: rgba(139, 92, 246, 0.2); color: var(--accent-purple); border: 1px solid var(--accent-purple); font-weight: 700; font-size: 0.78rem;">🎯 ${currentLang === 'EN' ? `Select ${q.correct.length} options` : `Chọn ${q.correct.length} đáp án`}</span>`
    : '';

  const isQuestionRevealed = isMockSubmitted || (isInstantFeedbackMode && revealedQuestions.has(qKey));

  const multiNotice = isMulti
    ? `<div style="font-size: 0.88rem; color: var(--accent-purple); margin-bottom: 0.85rem; font-weight: 600; display: flex; align-items: center; gap: 0.4rem; padding: 0.5rem 0.75rem; background: rgba(139, 92, 246, 0.08); border-radius: 8px; border-left: 3px solid var(--accent-purple);">
        <span>ℹ️</span>
        <span>${currentLang === 'EN' ? `This question requires selecting exactly ${q.correct.length} options.` : `Câu hỏi này yêu cầu chọn đúng ${q.correct.length} đáp án.`}</span>
      </div>`
    : '';

  const selectedList = isMulti ? (Array.isArray(isSelected) ? isSelected : []) : [];
  const selectedCount = selectedList.length;
  const targetCount = isMulti ? q.correct.length : 1;
  const isReadyToConfirm = selectedCount > 0;

  const confirmBtnHtml = (isMulti && isInstantFeedbackMode && !isQuestionRevealed) ? `
    <div style="display: flex; justify-content: flex-end; margin-bottom: 1.5rem;">
      <button type="button" class="btn btn-primary" style="padding: 0.65rem 1.25rem; font-weight: 700; font-size: 0.92rem; display: flex; align-items: center; gap: 0.5rem; ${isReadyToConfirm ? '' : 'opacity: 0.6;'}" onclick="window.confirmMultiInstant('${qKey}')" ${isReadyToConfirm ? '' : 'disabled'}>
        <span>✓</span>
        <span>${currentLang === 'EN' ? `Confirm Answer (${selectedCount}/${targetCount})` : `Xác Nhận Đáp Án (${selectedCount}/${targetCount})`}</span>
      </button>
    </div>
  ` : '';

  const allCorrect = isAnswerCorrect(q, isSelected);

  qContainer.innerHTML = `
    <div class="card" style="padding: 2rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
          <span class="badge badge-purple" style="font-size: 0.85rem; font-weight: 700; padding: 0.35rem 0.75rem;">${currentLang === 'EN' ? `Question ${currentExamIndex + 1} / ${mockExamQuestions.length}` : `Câu ${currentExamIndex + 1} / ${mockExamQuestions.length}`}</span>
          ${isInstantFeedbackMode ? '<span class="badge badge-d2" style="background: rgba(6, 182, 212, 0.2); color: var(--accent-cyan); font-size: 0.75rem;">⚡ Instant Feedback</span>' : ''}
          ${multiBadge}
        </div>
        
        <div class="flag-btn-group">
          <button type="button" class="flag-choice-btn ${currentFlag === 'SURE' ? 'active-sure' : ''}" onclick="window.setQuestionConfidenceFlag('SURE')" title="${currentLang === 'EN' ? 'Sure / High Confidence' : '1. Chắc chắn đúng'}">
            <span>🟢</span>
            <span>${currentLang === 'EN' ? 'Sure' : 'Chắc đúng'}</span>
          </button>
          <button type="button" class="flag-choice-btn ${(currentFlag === 'SPLIT' || currentFlag === 'UNSURE') ? 'active-split' : ''}" onclick="window.setQuestionConfidenceFlag('SPLIT')" title="${currentLang === 'EN' ? 'Understand question, torn between 2-3 options' : '2. Hiểu đề nhưng thấy có 2 hoặc 3 câu đúng, chọn 1 câu nhưng còn phân vân'}">
            <span>🟡</span>
            <span>${currentLang === 'EN' ? 'Split 2-3' : 'Phân vân 2-3 câu'}</span>
          </button>
          <button type="button" class="flag-choice-btn ${currentFlag === 'PARTIAL' ? 'active-partial' : ''}" onclick="window.setQuestionConfidenceFlag('PARTIAL')" title="${currentLang === 'EN' ? 'Partially understand, guessed most plausible' : '3. Hiểu 1 ít câu hỏi và câu trả lời, chọn đại 1 đáp án cho là đúng nhất'}">
            <span>🟠</span>
            <span>${currentLang === 'EN' ? 'Partial' : 'Hiểu 1 ít'}</span>
          </button>
          <button type="button" class="flag-choice-btn ${(currentFlag === 'BLIND' || currentFlag === 'GUESS') ? 'active-blind' : ''}" onclick="window.setQuestionConfidenceFlag('BLIND')" title="${currentLang === 'EN' ? 'No clue, pure blind guess' : '4. Không hiểu gì cả, chọn đại'}">
            <span>🟣</span>
            <span>${currentLang === 'EN' ? 'Blind' : 'Không hiểu gì'}</span>
          </button>

          <span class="flag-divider"></span>

          <button type="button" class="flag-choice-btn flag-review-btn ${mockExamReviewFlags[qKey] ? 'active-review' : ''}" onclick="window.toggleQuestionReviewFlag()" title="${currentLang === 'EN' ? 'Mark this question for review (Overrides other flags)' : 'Đánh dấu câu này cần xem lại dù đúng hay sai (Đè lên tất cả cờ khác)'}">
            <span>🚩</span>
            <span>${currentLang === 'EN' ? 'Review' : 'Cần xem lại'}</span>
          </button>
        </div>
      </div>

      <h2 style="font-size: 1.15rem; line-height: 1.6; margin-bottom: 1.5rem; color: var(--text-primary);">${qText}</h2>

      ${multiNotice}

      <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-bottom: ${isMulti && isInstantFeedbackMode && !isQuestionRevealed ? '1rem' : '2rem'};">
        ${optsText.map((opt, oIdx) => {
          let optClass = 'quiz-option';
          const isOptSelected = isMulti 
            ? (Array.isArray(isSelected) && isSelected.includes(oIdx))
            : (isSelected === oIdx);

          if (isOptSelected) optClass += ' selected';

          const isOptCorrect = Array.isArray(q.correct) ? q.correct.includes(oIdx) : (oIdx === q.correct);

          if (isQuestionRevealed) {
            if (isOptCorrect) optClass += ' correct-option';
            else if (isOptSelected) optClass += ' wrong-option';
          }

          let cardBg = 'var(--bg-tertiary)';
          let cardBorder = '1px solid var(--border-color)';
          let cardShadow = '0 2px 4px rgba(0,0,0,0.1)';
          let cardColor = 'var(--text-primary)';

          if (isOptSelected) {
            cardBg = 'rgba(139, 92, 246, 0.18)';
            cardBorder = '2px solid var(--accent-purple)';
            cardShadow = '0 0 14px rgba(139, 92, 246, 0.35)';
          }

          if (isQuestionRevealed) {
            if (isOptCorrect) {
              cardBg = 'rgba(16, 185, 129, 0.18)';
              cardBorder = '2px solid var(--accent-emerald)';
              cardColor = 'var(--accent-emerald)';
            } else if (isOptSelected) {
              cardBg = 'rgba(244, 63, 94, 0.18)';
              cardBorder = '2px solid var(--accent-rose)';
              cardColor = 'var(--accent-rose)';
            }
          }

          const inputType = isMulti ? 'checkbox' : 'radio';
          const cardStyle = `display: flex !important; align-items: center !important; gap: 0.85rem !important; background: ${cardBg} !important; border: ${cardBorder} !important; padding: 1rem 1.25rem !important; border-radius: 12px !important; cursor: pointer !important; font-size: 0.95rem !important; color: ${cardColor} !important; margin-bottom: 0.75rem !important; box-shadow: ${cardShadow} !important; transition: all 0.2s ease !important;`;

          return `
            <div class="${optClass}" role="${isMulti ? 'checkbox' : 'radio'}" aria-checked="${isOptSelected}" style="${cardStyle}" onclick="window.selectOption('${qKey}', ${oIdx})">
              <input type="${inputType}" name="mock_q_${qKey}" ${isOptSelected ? 'checked' : ''} style="transform: scale(1.25); cursor: pointer; accent-color: var(--accent-purple); margin-right: 0.5rem; pointer-events: none;">
              <span>${opt}</span>
            </div>
          `;
        }).join('')}
      </div>

      ${confirmBtnHtml}

      ${isQuestionRevealed ? `
        <div class="callout ${allCorrect ? '' : 'callout-warning'}" style="margin-top: 1.5rem; background: var(--bg-secondary); border-radius: 12px; padding: 1.25rem;">
          <div class="callout-title" style="font-size: 1.05rem; font-weight: 800; margin-bottom: 0.75rem; color: ${allCorrect ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">
            ${allCorrect
              ? (currentLang === 'EN' ? '✅ CORRECT ANSWER (+10 XP)' : '✅ ĐÁP ÁN CHÍNH XÁC (+10 XP)')
              : (currentLang === 'EN' ? '❌ INCORRECT (+2 XP)' : '❌ CHƯA CHÍNH XÁC (+2 XP)')}
          </div>

          ${q.rationale ? `
            <div style="margin-bottom: 1rem; padding: 0.75rem 1rem; background: rgba(139, 92, 246, 0.1); border-left: 4px solid var(--accent-purple); border-radius: 6px; font-size: 0.9rem;">
              <strong>💡 Rationale:</strong> ${q.rationale}
            </div>
          ` : ''}

          <div style="font-size: 0.92rem; line-height: 1.6; white-space: pre-line; margin-bottom: 1rem;">${q.explanation}</div>

          ${(q.optionExplanations && q.optionExplanations.length > 0) ? `
            <div style="margin-top: 1rem; padding: 0.75rem 1rem; background: rgba(0, 0, 0, 0.15); border-radius: 8px; font-size: 0.88rem;">
              <strong style="display: block; margin-bottom: 0.5rem; color: var(--text-primary);">📋 ${currentLang === 'EN' ? 'Option-by-Option Breakdown:' : 'Phân tích chi tiết từng phương án:'}</strong>
              <div style="display: flex; flex-direction: column; gap: 0.4rem;">
                ${q.optionExplanations.map(exp => `<div>${exp}</div>`).join('')}
              </div>
            </div>
          ` : ''}

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
  const q = mockExamQuestions.find(item => (item.uniqueId || item.id) === qId);
  if (!q) return;

  oIdx = parseInt(oIdx, 10);
  const isMulti = isMultiQuestion(q);

  if (isMulti) {
    if (isInstantFeedbackMode && revealedQuestions.has(qId)) return;
    let cur = mockExamAnswers[qId];
    if (!Array.isArray(cur)) cur = [];
    cur = cur.map(x => parseInt(x, 10));
    if (cur.includes(oIdx)) {
      cur = cur.filter(x => x !== oIdx);
    } else {
      cur = [...cur, oIdx].sort((a, b) => a - b);
    }
    if (cur.length === 0) {
      delete mockExamAnswers[qId];
    } else {
      mockExamAnswers[qId] = cur;
    }
  } else {
    const isFirstTimeReveal = isInstantFeedbackMode && !revealedQuestions.has(qId);
    mockExamAnswers[qId] = oIdx;

    if (isInstantFeedbackMode) {
      revealedQuestions.add(qId);

      if (q && isFirstTimeReveal) {
        if (isAnswerCorrect(q, oIdx)) {
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
  }

  renderQuestionGrid();
  renderCurrentQuestion();
  window.saveActiveExamSession();
};

window.confirmMultiInstant = function(qId) {
  if (isMockSubmitted || !isInstantFeedbackMode || revealedQuestions.has(qId)) return;
  const q = mockExamQuestions.find(item => (item.uniqueId || item.id) === qId);
  if (!q) return;

  const curAns = mockExamAnswers[qId] || [];
  if (curAns.length === 0) {
    if (typeof AppStore !== 'undefined') {
      const curLang = AppStore.getLang();
      AppStore.showToast(curLang === 'EN' ? "⚠️ Please select at least one option!" : "⚠️ Vui lòng chọn ít nhất một đáp án!");
    }
    return;
  }

  revealedQuestions.add(qId);
  const isCorrect = isAnswerCorrect(q, curAns);
  if (typeof AppStore !== 'undefined') {
    if (isCorrect) {
      AppStore.addXP(10);
      AppStore.showToast("✅ Chính xác toàn bộ! +10 XP");
    } else {
      AppStore.addXP(2);
      AppStore.showToast("❌ Chưa chính xác! +2 XP thử sức");
    }
  }

  renderQuestionGrid();
  renderCurrentQuestion();
  window.saveActiveExamSession();
};

window.setQuestionConfidenceFlag = function(flagType) {
  const q = mockExamQuestions[currentExamIndex];
  if (!q) return;

  const qKey = q.uniqueId || q.id;
  if (mockExamFlags[qKey] === flagType) {
    delete mockExamFlags[qKey]; // Toggle off if already selected
  } else {
    mockExamFlags[qKey] = flagType;
  }
  renderQuestionGrid();
  renderCurrentQuestion();
  window.saveActiveExamSession();
};

window.toggleQuestionReviewFlag = function() {
  const q = mockExamQuestions[currentExamIndex];
  if (!q) return;

  const qKey = q.uniqueId || q.id;
  if (mockExamReviewFlags[qKey]) {
    delete mockExamReviewFlags[qKey];
  } else {
    mockExamReviewFlags[qKey] = true;
  }
  renderQuestionGrid();
  renderCurrentQuestion();
  window.saveActiveExamSession();
};

window.toggleFlagCurrentQuestion = function() {
  window.setQuestionConfidenceFlag('SPLIT');
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
  mockExamFlags = {};
  mockExamReviewFlags = {};
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

  mockExamQuestions.forEach(q => {
    domainTotals[q.domain] = (domainTotals[q.domain] || 0) + 1;
    const qKey = q.uniqueId || q.id;
    if (isAnswerCorrect(q, mockExamAnswers[qKey])) {
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

    // Render Domain Scores Breakdown (only keep domain scores: D: X/Y câu)
    const breakContainer = document.getElementById('mock-domain-breakdown');
    if (breakContainer) {
      breakContainer.innerHTML = Object.keys(domainTotals).map(dom => {
        const dScore = domainScores[dom] || 0;
        const dTot = domainTotals[dom] || 0;
        const dPct = dTot > 0 ? Math.round((dScore / dTot) * 100) : 0;
        return `
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem; padding: 0.4rem 0; border-bottom: 1px solid rgba(255,255,255,0.06);">
            <span><strong style="color: var(--text-primary);">${dom}:</strong> ${dScore}/${dTot} câu</span>
            <strong style="color: ${dPct >= 72 ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">${dPct}%</strong>
          </div>
        `;
      }).join('');
    }

    // Render Confidence Flag Breakdown Report
    const flagContainer = document.getElementById('mock-flag-breakdown');
    if (flagContainer) {
      const curLang = typeof AppStore !== 'undefined' ? AppStore.getLang() : 'VI';
      const flagStats = {
        SURE: { 
          total: 0, 
          correct: 0, 
          label: curLang === 'EN' ? 'Sure / High Confidence' : 'Chắc chắn đúng', 
          icon: '🟢', 
          color: '#10b981' 
        },
        SPLIT: { 
          total: 0, 
          correct: 0, 
          label: curLang === 'EN' ? 'Understand question, torn between 2-3 options' : 'Hiểu đề nhưng thấy có 2 hoặc 3 câu đúng, chọn 1 câu nhưng còn phân vân', 
          icon: '🟡', 
          color: '#f59e0b' 
        },
        PARTIAL: { 
          total: 0, 
          correct: 0, 
          label: curLang === 'EN' ? 'Partially understand, guessed most plausible' : 'Hiểu 1 ít câu hỏi và câu trả lời, chọn đại 1 đáp án cho là đúng nhất', 
          icon: '🟠', 
          color: '#f97316' 
        },
        BLIND: { 
          total: 0, 
          correct: 0, 
          label: curLang === 'EN' ? 'No clue, pure blind guess' : 'Không hiểu gì cả, chọn đại', 
          icon: '🟣', 
          color: '#a855f7' 
        },
        NONE: { 
          total: 0, 
          correct: 0, 
          label: curLang === 'EN' ? 'No Flag' : 'Không cắm cờ', 
          icon: '⚪', 
          color: 'var(--text-muted)' 
        }
      };

      mockExamQuestions.forEach(q => {
        const qKey = q.uniqueId || q.id;
        let f = mockExamFlags[qKey] || 'NONE';
        if (f === 'UNSURE') f = 'SPLIT';
        if (f === 'GUESS') f = 'BLIND';
        if (flagStats[f]) {
          flagStats[f].total++;
          if (isAnswerCorrect(q, mockExamAnswers[qKey])) {
            flagStats[f].correct++;
          }
        }
      });

      const displayKeys = ['SURE', 'SPLIT', 'PARTIAL', 'BLIND'];
      if (flagStats.NONE.total > 0) displayKeys.push('NONE');

      let reviewCount = 0;
      let reviewCorrectCount = 0;
      mockExamQuestions.forEach(q => {
        const qKey = q.uniqueId || q.id;
        if (mockExamReviewFlags[qKey]) {
          reviewCount++;
          if (isAnswerCorrect(q, mockExamAnswers[qKey])) {
            reviewCorrectCount++;
          }
        }
      });

      let reviewHtml = '';
      if (reviewCount > 0) {
        reviewHtml = `
          <div style="margin-top: 0.75rem; padding: 0.55rem 0.85rem; background: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.35); border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
            <span style="display: flex; align-items: center; gap: 0.45rem; color: #ef4444; font-weight: 700;">
              <span>🚩</span>
              <span>${curLang === 'EN' ? 'Marked for Review (Right or Wrong):' : 'Câu cần xem lại (dù đúng hay sai):'}</span>
            </span>
            <strong style="color: #ef4444; font-size: 0.95rem;">${reviewCount} câu <span style="color: var(--text-muted); font-size: 0.8rem; font-weight: normal; margin-left: 0.35rem;">(${curLang === 'EN' ? `${reviewCorrectCount} correct` : `đúng ${reviewCorrectCount}/${reviewCount}`})</span></strong>
          </div>
        `;
      }

      flagContainer.innerHTML = displayKeys.map(k => {
        const item = flagStats[k];
        const pct = item.total > 0 ? Math.round((item.correct / item.total) * 100) : 0;
        return `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.45rem 0; border-bottom: 1px solid rgba(139, 92, 246, 0.15);">
            <span style="display: flex; align-items: center; gap: 0.45rem;">
              <span>${item.icon}</span>
              <span style="color: var(--text-primary); font-weight: 600;">${item.label}:</span>
            </span>
            <span>
              <strong style="color: ${item.color}; font-size: 0.95rem;">${item.correct}/${item.total} câu</strong>
              ${item.total > 0 ? `<span style="color: var(--text-muted); font-size: 0.8rem; margin-left: 0.4rem;">(${pct}%)</span>` : ''}
            </span>
          </div>
        `;
      }).join('') + reviewHtml;
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
  mockExamFlags = {};
  mockExamReviewFlags = {};
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
        if (isAnswerCorrect(q, mockExamAnswers[qKey])) totalScore++;
      });
      const pct = mockExamQuestions.length > 0 ? Math.round((totalScore / mockExamQuestions.length) * 100) : 0;
      refreshReportModalState(totalScore, pct >= 72);
    }
  }
});

window.startTopicSpecificPracticeExam = function(topics = ['3.2', '3.3', '3.5', '3.6'], isInstant = true) {
  if (typeof MOCK_EXAM_QUESTION_POOL === 'undefined') {
    if (typeof AppStore !== 'undefined' && AppStore.showToast) {
      AppStore.showToast("⚠️ Chưa tải được bộ đề thi mô phỏng!");
    }
    return;
  }

  isInstantFeedbackMode = (isInstant === true);
  
  // Filter questions matching any of the topics in taskStatement or id
  const targetTopics = Array.isArray(topics) ? topics : topics.split(/[\,\s]+/).filter(Boolean);
  
  const matched = MOCK_EXAM_QUESTION_POOL.filter(q => {
    const ts = (q.taskStatement || '').toLowerCase();
    const qId = (q.id || '').toLowerCase();
    return targetTopics.some(t => {
      const lowerT = t.toLowerCase().trim();
      return ts.includes(lowerT) || qId.includes(lowerT) || qId.includes(`-${lowerT}-`);
    });
  });

  if (matched.length === 0) {
    if (typeof AppStore !== 'undefined' && AppStore.showToast) {
      AppStore.showToast("⚠️ Không tìm thấy câu hỏi phù hợp cho chủ đề: " + targetTopics.join(', '));
    }
    return;
  }

  // Deduplicate base pool by question text & id
  const basePool = [];
  const baseIds = new Set();
  const baseTexts = new Set();
  for (const q of matched) {
    const cleanText = q.question.replace(/^\[.*?\]\s*/, '');
    if (!baseIds.has(q.id) && !baseTexts.has(cleanText)) {
      baseIds.add(q.id);
      baseTexts.add(cleanText);
      basePool.push(q);
    }
  }

  // Shuffle questions
  const shuffled = [...basePool].sort(() => Math.random() - 0.5);

  mockExamQuestions = shuffled.map((item, idx) => ({
    ...item,
    uniqueId: `${item.id}_topic_${idx}`
  }));

  const modePrefix = isInstantFeedbackMode ? 'INSTANT_TOPICS' : 'TOPICS';
  currentMockExamLabel = `${modePrefix}_${targetTopics.join('_')}_${mockExamQuestions.length}Q`;
  isMockSubmitted = false;
  revealedQuestions.clear();
  mockExamAnswers = {};
  mockExamFlags = {};
  mockExamReviewFlags = {};
  currentExamIndex = 0;
  updateHeaderBarState();

  mockSecondsRemaining = Math.max(5 * 60, Math.round(mockExamQuestions.length * 2 * 60));

  const setupCard = document.getElementById('mock-setup-card');
  const arenaBox = document.getElementById('mock-arena-box');
  if (setupCard) setupCard.style.display = 'none';
  if (arenaBox) arenaBox.style.display = 'block';

  startMockTimer();
  renderQuestionGrid();
  renderCurrentQuestion();
  window.saveActiveExamSession();

  if (typeof AppStore !== 'undefined' && AppStore.showToast) {
    const curLang = AppStore.getLang();
    AppStore.showToast(curLang === 'EN' 
      ? `🎯 Loaded ${mockExamQuestions.length} questions for topics ${targetTopics.join(', ')}!` 
      : `🎯 Đã nạp ${mockExamQuestions.length} câu hỏi cho các chuyên đề: ${targetTopics.join(', ')}!`);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  let autoStarted = false;

  // Check URL query parameters for topic filtering or instant mode
  if (typeof window !== 'undefined' && window.location && window.location.search) {
    const urlParams = new URLSearchParams(window.location.search);
    const topicsParam = urlParams.get('topics') || urlParams.get('subtopics');
    const isInstant = urlParams.get('mode') === 'instant' || urlParams.get('instant') === 'true' || urlParams.get('instant') === '1';

    if (topicsParam) {
      const topicList = topicsParam.split(',').map(s => s.trim()).filter(Boolean);
      window.clearActiveExamSession();
      window.startTopicSpecificPracticeExam(topicList, isInstant);
      autoStarted = true;
    } else if (urlParams.get('q')) {
      const qParam = urlParams.get('q');
      const pool = (typeof window.getPracticeQuestionPool === 'function') 
        ? (window.getPracticeQuestionPool('V2') || window.getPracticeQuestionPool('V1') || [])
        : [];
      const foundQ = pool.find(item => item.id === qParam);
      if (foundQ) {
        window.clearActiveExamSession();
        mockExamQuestions = [{ ...foundQ, uniqueId: `${foundQ.id}_url_0` }];
        mockExamAnswers = {};
        mockExamFlags = {};
        mockExamReviewFlags = {};
        currentExamIndex = 0;
        isMockSubmitted = false;
        isInstantFeedbackMode = (urlParams.get('instant') !== 'false');
        revealedQuestions.clear();
        currentMockExamLabel = `DIRECT_${foundQ.id}`;
        document.getElementById('mock-setup-card').style.display = 'none';
        document.getElementById('mock-arena-box').style.display = 'block';
        startMockTimer();
        renderQuestionGrid();
        renderCurrentQuestion();
        autoStarted = true;
      }
    } else {
      const targetDomain = urlParams.get('domain');
      if (targetDomain && ['D1', 'D2', 'D3', 'D4', 'D5'].includes(targetDomain.toUpperCase())) {
        document.querySelectorAll('.mock-domain-cb').forEach(cb => {
          cb.checked = (cb.value.toUpperCase() === targetDomain.toUpperCase());
        });
      }
    }
  }

  if (!autoStarted) {
    window.restoreActiveExamSession();
  }

  window.updateDomainCheckboxLabels();
  window.renderPracticeTermsGrid();
  window.switchOfficialDataset(currentOfficialDataset);
  window.renderMockHistoryTable();
});


