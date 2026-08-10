/* CCAF Learning Hub - 67 Core Principles Module Logic (English-First & Interactive Keyword Glossary) */

let activeDomainFilter = 'ALL';
let showAntiPatternsOnly = false;

// Keyword Highlight Engine with Interactive Click Handler
function highlightKeywordsEN(text) {
  if (!text) return '';

  let highlighted = text;

  // Code & Tool Badges (purple badges)
  const codeBadges = [
    '--dangerously-skip-permissions', 'allowedTools', 'PreToolUse', 'PostToolUse',
    'GlobTool', 'GrepTool', 'FileReadTool', 'FileEditTool', 'FileWriteTool', 'BashTool',
    'stop_reason', 'max_tokens', 'end_turn', 'tool_choice', 'tool_result', 'tool_use',
    'CLAUDE.md', '~/.claude/CLAUDE.md', 'Message Batches API', 'Messages API', 'JSON Schema',
    'Glob', 'Grep', 'View', 'Task'
  ];

  codeBadges.forEach(kw => {
    const escKw = kw.replace(/[-[\]{}()*+?|<>\\]/g, '\\$&');
    const regex = new RegExp(`\\b(${escKw})\\b`, 'g');
    highlighted = highlighted.replace(regex, `<code class="kw-badge" onclick="window.showKeywordDetail('$1')" title="Click xem giải thích từ khóa">$1</code>`);
  });

  // Architectural Concepts (amber marks)
  const concepts = [
    'Coordinator-workers', 'Orchestrator-workers', 'Coordinator-Worker', 'Orchestrator-Workers',
    'Prompt chaining', 'Routing', 'Context Isolation', 'Context Window', 'Context Pruning',
    'Lost-in-the-middle', 'Lost-in-the-Middle', 'Scratchpad', 'Preserving Provenance',
    'State Manifest', 'Human-in-the-Loop', 'Exponential Backoff', 'Permission Error',
    'Chain-of-Thought', '<thinking>', 'few-shot', 'Few-Shot'
  ];

  concepts.forEach(kw => {
    const escKw = kw.replace(/[-[\]{}()*+?|<>\\]/g, '\\$&');
    const regex = new RegExp(`\\b(${escKw})\\b`, 'g');
    highlighted = highlighted.replace(regex, `<mark class="kw-highlight" onclick="window.showKeywordDetail('$1')" title="Click xem giải thích từ khóa">$1</mark>`);
  });

  return highlighted;
}

window.showKeywordDetail = function(kw) {
  if (typeof KEYWORD_GLOSSARY_DATA === 'undefined') return;

  // Find matching keyword in dictionary
  let entry = KEYWORD_GLOSSARY_DATA[kw];
  if (!entry) {
    // Fallback search case-insensitive
    const lowerKw = kw.toLowerCase();
    const foundKey = Object.keys(KEYWORD_GLOSSARY_DATA).find(k => k.toLowerCase() === lowerKw);
    if (foundKey) entry = KEYWORD_GLOSSARY_DATA[foundKey];
  }

  if (!entry) {
    AppStore.showToast(`📌 Thuật ngữ '${kw}' đại diện cho một khái niệm kỹ thuật trọng tâm trong bài thi CCAF.`);
    return;
  }

  const modalEl = document.getElementById('keyword-explain-modal');
  if (!modalEl) return;

  document.getElementById('kw-modal-title').textContent = entry.name;
  document.getElementById('kw-modal-category').textContent = entry.category;
  document.getElementById('kw-modal-desc-en').textContent = entry.descEN;
  document.getElementById('kw-modal-desc-vi').textContent = entry.descVI;
  document.getElementById('kw-modal-example').textContent = entry.example || 'N/A';
  document.getElementById('kw-modal-gotcha').textContent = entry.examGotcha;
  document.getElementById('kw-modal-tip').textContent = entry.tip;

  modalEl.classList.add('active');
  modalEl.style.display = 'flex';
};

window.closeKeywordModal = function() {
  const modalEl = document.getElementById('keyword-explain-modal');
  if (modalEl) {
    modalEl.classList.remove('active');
    modalEl.style.display = 'none';
  }
};

window.showPrincipleDeepExplanation = function(id) {
  id = parseInt(id, 10);

  let entry = (typeof PRINCIPLES_DEEP_DATA !== 'undefined') ? PRINCIPLES_DEEP_DATA[id] : null;

  if (!entry && typeof PRINCIPLES_DATA !== 'undefined') {
    const rawP = PRINCIPLES_DATA.find(p => p.id === id);
    if (rawP) {
      entry = {
        id: rawP.id,
        domain: rawP.domain,
        domainTitle: rawP.domainTitle,
        titleEN: rawP.title,
        titleVI: rawP.titleVI,
        problemScenario: `Giả sử ứng dụng của bạn gặp tình huống thực tế liên quan đến '${rawP.titleVI}'. Khi xây dựng hệ thống Agentic phức tạp, nếu không áp dụng đúng nguyên tắc ${rawP.domainTitle}, hệ thống sẽ gặp các lỗi vận hành đáng tiếc.`,
        antiPatternAnalysis: `❌ SAU LẦM PHỔ BIẾN (ANTI-PATTERN):\n${rawP.antiPattern || 'Không áp dụng đúng nguyên tắc này.'}\n\n👉 Hậu quả: Làm suy giảm độ chính xác của Agent, gây lãng phí bộ nhớ Context Window hoặc bùng nổ chi phí API vô ích.`,
        correctPatternBreakdown: `✅ GIẢI PHÁP KIẾN TRÚC CHUẨN ANTHROPIC:\n${rawP.correctPattern || 'Tuân thủ nguyên tắc thiết kế chuẩn.'}\n\n👉 Chi tiết kỹ thuật: ${rawP.bodyVI}`,
        examMnemonic: `🎯 MẸO LÀM BÀI THI CCAF:\n- Chọn phương án: Tuân thủ pattern '${rawP.correctPattern}'\n- Tránh phương án bẫy: '${rawP.antiPattern}'`
      };
    }
  }

  if (!entry) {
    AppStore.showToast(`📌 Chưa có dữ liệu phân tích cho Nguyên tắc #${id}`);
    return;
  }

  const modalEl = document.getElementById('principle-deep-modal');
  if (!modalEl) {
    console.error('Modal #principle-deep-modal not found');
    return;
  }

  document.getElementById('p-modal-title').textContent = `#${entry.id} • ${entry.domain} (${entry.domainTitle})`;
  document.getElementById('p-modal-subtitle').textContent = `🇬🇧 ${entry.titleEN}`;
  document.getElementById('p-modal-scenario').textContent = entry.problemScenario;
  document.getElementById('p-modal-antipattern').textContent = entry.antiPatternAnalysis;
  document.getElementById('p-modal-correct').textContent = entry.correctPatternBreakdown;
  document.getElementById('p-modal-mnemonic').textContent = entry.examMnemonic;

  const practiceLink = document.getElementById('p-modal-practice-btn');
  if (practiceLink) practiceLink.href = `mock-exam.html`;

  modalEl.classList.add('active');
  modalEl.style.display = 'flex';
};

window.closePrincipleDeepModal = function() {
  const modalEl = document.getElementById('principle-deep-modal');
  if (modalEl) {
    modalEl.classList.remove('active');
    modalEl.style.display = 'none';
  }
};

function renderPrinciples() {
  const container = document.getElementById('principles-container');
  if (!container) return;

  const completedIds = AppStore.getCompletedPrinciples();

  let filtered = PRINCIPLES_DATA;
  if (activeDomainFilter !== 'ALL') {
    filtered = filtered.filter(p => p.domain === activeDomainFilter);
  }

  if (showAntiPatternsOnly) {
    filtered = filtered.filter(p => p.antiPattern && p.antiPattern.trim() !== '');
  }

  // Update Statistics Text
  const countEl = document.getElementById('principles-count');
  if (countEl) {
    if (showAntiPatternsOnly) {
      countEl.innerHTML = `<span style="color: var(--accent-rose); font-weight: 700;">⚠️ Đang lọc ${filtered.length} / ${PRINCIPLES_DATA.length} nguyên tắc có Anti-Pattern</span> (${completedIds.length} đã thuộc)`;
    } else {
      countEl.textContent = `Hiển thị ${filtered.length} / ${PRINCIPLES_DATA.length} nguyên tắc (${completedIds.length} đã thuộc)`;
    }
  }

  // Update Anti-Pattern Toggle Button state
  const apBtn = document.getElementById('antipattern-btn');
  if (apBtn) {
    if (showAntiPatternsOnly) {
      apBtn.innerHTML = '✕ Tắt Lọc Anti-Patterns (Hiện Tất Cả 67)';
      apBtn.style.background = 'var(--accent-rose)';
      apBtn.style.color = '#fff';
      apBtn.style.borderColor = 'var(--accent-rose)';
    } else {
      apBtn.innerHTML = '⚠️ Chỉ Hiện Anti-Patterns (Bẫy Sai Lầm)';
      apBtn.style.background = 'var(--bg-tertiary)';
      apBtn.style.color = 'var(--text-primary)';
      apBtn.style.borderColor = 'var(--border-color)';
    }
  }

  if (filtered.length === 0) {
    container.innerHTML = `<div style="text-align: center; padding: 3rem; color: var(--text-muted);">Không tìm thấy nguyên tắc nào phù hợp bộ lọc.</div>`;
    return;
  }

  container.innerHTML = `
    <!-- Domain Sprint Next Step Banner (Top) -->
    ${activeDomainFilter !== 'ALL' ? `
      <div style="background: var(--bg-tertiary); padding: 1.25rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; text-align: center; border: 1px solid var(--border-highlight);">
        <h4 style="margin-bottom: 0.5rem; color: var(--accent-purple);">🚀 BƯỚC 2/3 TRONG SPRINT HỌC CUỐN CHIẾU ${activeDomainFilter}</h4>
        <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 1rem;">
          Bạn đang xem trọn bộ các Nguyên tắc cốt lõi của ${activeDomainFilter}. Sau khi học xong, hãy chuyển sang Luyện Quiz của ${activeDomainFilter}!
        </p>
        <a href="mock-exam.html" class="btn btn-primary" style="font-size: 0.9rem;">
          🏆 Chuyển Sang Thi Mô Phỏng Của ${activeDomainFilter} (Bước 3/3) →
        </a>
      </div>
    ` : ''}

    ${filtered.map(p => {
      const isCompleted = completedIds.includes(p.id);
      const highlightedEN = highlightKeywordsEN(p.body);

      return `
        <div class="card principle-card ${isCompleted ? 'completed-card' : ''} ${showAntiPatternsOnly ? 'antipattern-highlight' : ''}" id="principle-${p.id}">
          
          <!-- Top Header Meta -->
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.85rem;">
            <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
              <span class="badge badge-${p.domain.toLowerCase()}">#${p.id} • ${p.domain}</span>
              
              <button type="button" class="btn btn-secondary" style="font-size: 0.78rem; padding: 0.25rem 0.65rem; background: rgba(139, 92, 246, 0.18); color: var(--accent-purple); border-color: rgba(139, 92, 246, 0.4); font-weight: 700; cursor: pointer;" onclick="window.showPrincipleDeepExplanation(${p.id})">
                💡 Giải Thích Chi Tiết
              </button>

              <span style="font-size: 0.82rem; color: var(--text-muted); font-weight: 600;">${p.domainTitle}</span>
            </div>

            <label style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; font-weight: 600; cursor: pointer; color: ${isCompleted ? 'var(--accent-emerald)' : 'var(--text-muted)'}">
              <input type="checkbox" ${isCompleted ? 'checked' : ''} onchange="togglePrinciple(${p.id})">
              ${isCompleted ? '✓ Đã thuộc' : 'Đánh dấu thuộc'}
            </label>
          </div>

          <!-- Highlighted Anti-Pattern Box at Top when Anti-Pattern mode is ON -->
          ${(showAntiPatternsOnly && p.antiPattern) ? `
            <div style="background: rgba(244, 63, 94, 0.15); border: 2px solid var(--accent-rose); padding: 0.85rem 1rem; border-radius: var(--radius-md); margin-bottom: 1rem;">
              <strong style="color: var(--accent-rose); font-size: 0.95rem; display: block; margin-bottom: 0.3rem;">
                🚨 BẪY SAI LẦM (ANTI-PATTERN):
              </strong>
              <div style="color: var(--text-primary); font-size: 0.95rem; line-height: 1.5;">${p.antiPattern}</div>
              
              <div style="margin-top: 0.6rem; padding-top: 0.6rem; border-top: 1px dashed rgba(244, 63, 94, 0.3); color: var(--accent-emerald); font-size: 0.9rem;">
                <strong>✅ Giải pháp chuẩn:</strong> ${p.correctPattern}
              </div>
            </div>
          ` : ''}

          <!-- PRIMARY ENGLISH TITLE & KEYWORD HIGHLIGHTED BODY -->
          <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.6rem; color: var(--text-primary); line-height: 1.4;">
            🇬🇧 ${p.title}
          </h3>

          <p style="font-size: 0.98rem; line-height: 1.65; color: var(--text-primary); margin-bottom: 1.25rem; background: var(--bg-tertiary); padding: 1rem 1.15rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            ${highlightedEN}
          </p>

          <!-- COLLAPSIBLE VIETNAMESE TRANSLATION -->
          <details style="margin-bottom: 1rem; font-size: 0.9rem; background: var(--bg-card-hover); padding: 0.85rem 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <summary style="cursor: pointer; font-weight: 700; color: var(--accent-purple); user-select: none;">
              🇻🇳 Xem bản dịch Tiếng Việt (Vietnamese Translation)
            </summary>
            
            <div style="margin-top: 0.85rem; padding-top: 0.75rem; border-top: 1px solid var(--border-color);">
              <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.4rem;">
                📌 ${p.titleVI}
              </h4>
              <p style="line-height: 1.6; color: var(--text-secondary); margin-bottom: 0.85rem;">
                ${p.bodyVI}
              </p>

              ${(p.antiPattern) ? `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-top: 0.75rem; font-size: 0.85rem;">
                  <div style="background: rgba(244, 63, 94, 0.08); border-left: 3px solid var(--accent-rose); padding: 0.6rem 0.8rem; border-radius: 4px;">
                    <strong style="color: var(--accent-rose); display: block; margin-bottom: 0.2rem;">❌ Sai lầm (Anti-Pattern):</strong>
                    ${p.antiPattern}
                  </div>

                  <div style="background: rgba(16, 185, 129, 0.08); border-left: 3px solid var(--accent-emerald); padding: 0.6rem 0.8rem; border-radius: 4px;">
                    <strong style="color: var(--accent-emerald); display: block; margin-bottom: 0.2rem;">✅ Giải pháp đúng (Correct Pattern):</strong>
                    ${p.correctPattern}
                  </div>
                </div>
              ` : ''}
            </div>
          </details>

          <!-- Action Button -->
          <div style="margin-top: 1rem; text-align: right;">
            <a href="mock-exam.html" class="btn btn-secondary" style="font-size: 0.85rem; padding: 0.4rem 0.85rem;">
              🏆 Luyện Thi Mô Phỏng (#${p.id}) →
            </a>
          </div>

        </div>
      `;
    }).join('')}
  `;
}

function filterDomain(domain) {
  activeDomainFilter = domain;
  document.querySelectorAll('.domain-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.domain === domain);
  });
  renderPrinciples();
}

function toggleAntiPatternFilter() {
  showAntiPatternsOnly = !showAntiPatternsOnly;
  renderPrinciples();
  if (showAntiPatternsOnly) {
    AppStore.showToast("⚠️ Đã bật chế độ lọc và phóng to các Bẫy Sai Lầm (Anti-Patterns)!");
  } else {
    AppStore.showToast("Đã hiện lại tất cả 67 Nguyên tắc");
  }
}

function togglePrinciple(id) {
  AppStore.togglePrincipleComplete(id);
  renderPrinciples();
}

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const domParam = urlParams.get('domain');
  if (domParam && ['D1', 'D2', 'D3', 'D4', 'D5'].includes(domParam.toUpperCase())) {
    activeDomainFilter = domParam.toUpperCase();
    document.querySelectorAll('.domain-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.domain === activeDomainFilter);
    });
  }
  renderPrinciples();
});

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    window.closeKeywordModal();
    window.closePrincipleDeepModal();
  }
});
