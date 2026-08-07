/* CCAF Learning Hub - Learn Module Logic with Domain Filtering & Domain Sprint Workflow */

let currentChapterIndex = 0;
let activeDomain = 'ALL';
let checkedChecklistItems = new Set();

function renderChapterList() {
  const listEl = document.getElementById('chapter-list');
  if (!listEl) return;

  const completedIds = AppStore.getCompletedChapters();

  let chaptersToShow = CHAPTERS_DATA;
  if (activeDomain !== 'ALL') {
    chaptersToShow = CHAPTERS_DATA.filter(ch => ch.domain === activeDomain);
  }

  listEl.innerHTML = chaptersToShow.map((ch) => {
    const realIndex = CHAPTERS_DATA.findIndex(item => item.id === ch.id);
    const isCompleted = completedIds.includes(ch.id);
    const isActive = realIndex === currentChapterIndex;

    return `
      <div class="chapter-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}" onclick="loadChapter(${realIndex})">
        <div style="display:flex; justify-between; align-items: center; margin-bottom: 0.3rem;">
          <span class="badge badge-${ch.domain.toLowerCase()}">${ch.domain}</span>
          <span style="font-size: 0.75rem; color: var(--text-muted);">${ch.estimatedMinutes} phút</span>
        </div>
        <div style="font-weight: 600; font-size: 0.9rem; line-height: 1.3;">${ch.title}</div>
        ${isCompleted ? '<span style="font-size: 0.75rem; color: var(--accent-emerald); font-weight: 600;">✓ Đã học chắc</span>' : ''}
      </div>
    `;
  }).join('');
}

function filterLearnDomain(domain) {
  activeDomain = domain;
  document.querySelectorAll('.domain-filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.domain === domain);
  });

  // Find first chapter of this domain
  if (domain !== 'ALL') {
    const firstCh = CHAPTERS_DATA.find(ch => ch.domain === domain);
    if (firstCh) {
      currentChapterIndex = CHAPTERS_DATA.findIndex(item => item.id === firstCh.id);
    }
  }
  renderChapterList();
  loadChapter(currentChapterIndex);
}

function loadChapter(index) {
  if (index < 0 || index >= CHAPTERS_DATA.length) return;
  currentChapterIndex = index;
  checkedChecklistItems.clear();
  renderChapterList();

  const ch = CHAPTERS_DATA[index];
  const contentEl = document.getElementById('chapter-content');
  if (!contentEl) return;

  const isAlreadyCompleted = AppStore.getCompletedChapters().includes(ch.id);

  contentEl.innerHTML = `
    <!-- Header Area & Summary -->
    <div style="margin-bottom: 1.5rem;">
      <div style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
        <span class="badge badge-${ch.domain.toLowerCase()}">${ch.domain} — ${ch.domainTitle}</span>
        <span class="badge" style="background: var(--bg-tertiary); color: var(--text-secondary);">⏱️ ${ch.estimatedMinutes} phút đọc</span>
      </div>
      <h1 style="font-size: 2rem; margin-bottom: 0.75rem;">${ch.title}</h1>
      <p style="color: var(--text-secondary); font-size: 1.05rem; line-height: 1.6;">${ch.summary}</p>
      
      <div class="vi-translation-box" style="margin-top: 0.75rem;">
        <button class="vi-toggle-btn">
          <span>🇻🇳 Xem giải thích & bản dịch Tiếng Việt (Tóm tắt bài học)</span>
          <span class="vi-arrow">▼</span>
        </button>
        <div class="vi-translation-body">
          ${ch.summaryVI ? ch.summaryVI : `<p><strong>Bản dịch Tiếng Việt:</strong> Tóm tắt bài học <em>${ch.title}</em> giúp hệ thống hóa toàn bộ kiến thức kỹ thuật quan trọng của chương.</p>`}
        </div>
      </div>
    </div>

    <!-- Pedagogy Box 1: Learning Objectives -->
    ${ch.learningObjectives ? `
      <div style="background: rgba(14, 165, 233, 0.08); border-left: 4px solid var(--accent-blue); padding: 1.25rem; border-radius: var(--radius-md); margin-bottom: 2rem;">
        <h3 style="font-size: 1.05rem; color: var(--accent-blue); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.4rem;">
          🎯 MỤC TIÊU BẠN CẦN NẮM ĐƯỢC SAU BÀI NÀY (LEARNING OBJECTIVES)
        </h3>
        <ul style="padding-left: 1.25rem; font-size: 0.95rem; color: var(--text-primary); line-height: 1.6;">
          ${ch.learningObjectives.map(obj => `<li style="margin-bottom: 0.35rem;">${obj}</li>`).join('')}
        </ul>
        <div class="vi-translation-box" style="margin-top: 0.85rem;">
          <button class="vi-toggle-btn">
            <span>🇻🇳 Xem giải thích & bản dịch Tiếng Việt (Mục tiêu bài học)</span>
            <span class="vi-arrow">▼</span>
          </button>
          <div class="vi-translation-body">
            <ul style="padding-left: 1.25rem; font-size: 0.92rem; line-height: 1.6;">
              ${(ch.learningObjectivesVI || ch.learningObjectives).map(obj => `<li style="margin-bottom: 0.35rem;">${obj}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    ` : ''}

    <!-- Exam Tip -->
    ${ch.examTip ? `
      <div class="callout callout-exam">
        <div class="callout-title">⚡ MẸO THI CCAF QUAN TRỌNG (EXAM TIP)</div>
        <div>${ch.examTip}</div>
        <div class="vi-translation-box" style="margin-top: 0.85rem;">
          <button class="vi-toggle-btn">
            <span>🇻🇳 Xem giải thích & bản dịch Tiếng Việt (Mẹo thi)</span>
            <span class="vi-arrow">▼</span>
          </button>
          <div class="vi-translation-body">
            <div>${ch.examTipVI || ch.examTip}</div>
          </div>
        </div>
      </div>
    ` : ''}

    <!-- Content Sections -->
    ${ch.sections.map((sec) => `
      <section style="margin: 2.25rem 0;">
        <h2 style="font-size: 1.35rem; margin-bottom: 1rem; color: var(--accent-purple);">${sec.heading}</h2>
        <div style="font-size: 1rem; line-height: 1.7; color: var(--text-primary);">${sec.content}</div>

        ${sec.codeExample ? `
          <pre><code>${sec.codeExample.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        ` : ''}

        <div class="vi-translation-box">
          <button class="vi-toggle-btn">
            <span>🇻🇳 Xem giải thích & bản dịch Tiếng Việt</span>
            <span class="vi-arrow">▼</span>
          </button>
          <div class="vi-translation-body">
            ${sec.contentVI ? sec.contentVI : `<p><strong>Bản dịch Tiếng Việt:</strong> Nội dung chi tiết phần <em>${sec.heading}</em> hướng dẫn phân tích bản chất kỹ thuật theo tiêu chuẩn Anthropic CCAF.</p>`}
          </div>
        </div>
      </section>
    `).join('')}

    <!-- Pedagogy Box 2: Core Masteries -->
    ${ch.coreMasteries ? `
      <div style="background: rgba(139, 92, 246, 0.08); border: 1px solid rgba(139, 92, 246, 0.2); padding: 1.25rem; border-radius: var(--radius-md); margin: 2rem 0;">
        <h3 style="font-size: 1.05rem; color: var(--accent-purple); margin-bottom: 0.75rem;">
          🔑 KIẾN THỨC CỐT LÕI BẮT BUỘC THUỘC (CORE MASTERIES)
        </h3>
        <ul style="padding-left: 1.25rem; font-size: 0.92rem; color: var(--text-primary); line-height: 1.6;">
          ${ch.coreMasteries.map(m => `<li style="margin-bottom: 0.4rem;">${m}</li>`).join('')}
        </ul>
        <div class="vi-translation-box" style="margin-top: 0.85rem;">
          <button class="vi-toggle-btn">
            <span>🇻🇳 Xem giải thích & bản dịch Tiếng Việt (Kiến thức cốt lõi)</span>
            <span class="vi-arrow">▼</span>
          </button>
          <div class="vi-translation-body">
            <ul style="padding-left: 1.25rem; font-size: 0.92rem; line-height: 1.6;">
              ${(ch.coreMasteriesVI || ch.coreMasteries).map(m => `<li style="margin-bottom: 0.4rem;">${m}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    ` : ''}

    <!-- Pedagogy Box 3: Exam Traps -->
    ${ch.examTraps ? `
      <div style="background: rgba(244, 63, 94, 0.08); border-left: 4px solid var(--accent-rose); padding: 1.25rem; border-radius: var(--radius-md); margin-bottom: 2rem;">
        <h3 style="font-size: 1.05rem; color: var(--accent-rose); margin-bottom: 0.5rem;">
          ⚠️ CÁC BẪY ĐỀ THI HAY GẶP (ANTI-PATTERNS / EXAM TRAPS)
        </h3>
        <ul style="padding-left: 1.25rem; font-size: 0.92rem; color: var(--text-primary); line-height: 1.6;">
          ${ch.examTraps.map(trap => `<li style="margin-bottom: 0.4rem;">${trap}</li>`).join('')}
        </ul>
        <div class="vi-translation-box" style="margin-top: 0.85rem;">
          <button class="vi-toggle-btn">
            <span>🇻🇳 Xem giải thích & bản dịch Tiếng Việt (Bẫy đề thi)</span>
            <span class="vi-arrow">▼</span>
          </button>
          <div class="vi-translation-body">
            <ul style="padding-left: 1.25rem; font-size: 0.92rem; line-height: 1.6;">
              ${(ch.examTrapsVI || ch.examTraps).map(trap => `<li style="margin-bottom: 0.4rem;">${trap}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    ` : ''}

    <!-- Pedagogy Box 4: Interactive Self-Checklist Widget -->
    ${ch.selfChecklist ? `
      <div style="background: var(--bg-card-hover); border: 1px solid var(--border-highlight); padding: 1.5rem; border-radius: var(--radius-lg); margin-top: 2.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <h3 style="font-size: 1.1rem; color: var(--accent-emerald);">
            ✅ CHECKLIST TỰ ĐÁNH GIÁ "HỌC ĐÂU CHẮC ĐÓ"
          </h3>
          <span style="font-size: 0.8rem; color: var(--text-muted);">Tích chọn tất cả ô để mở khóa nút Hoàn thành</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          ${ch.selfChecklist.map((item, idx) => `
            <label style="display: flex; align-items: flex-start; gap: 0.6rem; padding: 0.75rem; background: var(--bg-tertiary); border-radius: var(--radius-md); cursor: pointer; font-size: 0.95rem; line-height: 1.5;">
              <input type="checkbox" style="margin-top: 0.2rem; transform: scale(1.2);" onchange="toggleChecklistItem(${idx})" ${isAlreadyCompleted ? 'checked disabled' : ''}>
              <span>${item}</span>
            </label>
          `).join('')}
        </div>
      </div>
    ` : ''}

    <!-- Domain Sprint Next Step Banner -->
    <div style="background: var(--bg-tertiary); padding: 1.25rem; border-radius: var(--radius-md); margin-top: 2.5rem; text-align: center; border: 1px solid var(--border-highlight);">
      <h4 style="margin-bottom: 0.5rem; color: var(--accent-purple);">🚀 BƯỚC TIẾP THEO TRONG SPRINT HỌC CUỐN CHIẾU ${ch.domain}</h4>
      <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 1rem;">
        Sau khi hoàn thành xong các bài lý thuyết của ${ch.domain}, bước tiếp theo là chuyển sang học Nguyên tắc cốt lõi của ${ch.domain}!
      </p>
      <a href="principles.html?domain=${ch.domain}" class="btn btn-secondary" style="font-size: 0.9rem;">
        👉 Chuyển Sang Học Nguyên Tắc Của ${ch.domain} →
      </a>
    </div>

    <!-- Bottom Navigation Bar -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color);">
      <button class="btn btn-secondary" onclick="loadChapter(${index - 1})" ${index === 0 ? 'disabled style="opacity:0.5;"' : ''}>
        ← Chương Trước
      </button>

      <button id="next-chapter-btn" class="btn btn-primary" onclick="completeAndNext(${index})" ${(!isAlreadyCompleted && ch.selfChecklist) ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>
        ${index === CHAPTERS_DATA.length - 1 ? '✓ Hoàn Thành Tất Cả 13 Chương!' : 'Hoàn Thành Bài & Sang Bài Tiếp →'}
      </button>
    </div>
  `;

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleChecklistItem(itemIdx) {
  if (checkedChecklistItems.has(itemIdx)) {
    checkedChecklistItems.delete(itemIdx);
  } else {
    checkedChecklistItems.add(itemIdx);
  }

  const ch = CHAPTERS_DATA[currentChapterIndex];
  const btn = document.getElementById('next-chapter-btn');

  if (ch.selfChecklist && checkedChecklistItems.size === ch.selfChecklist.length) {
    if (btn) {
      btn.disabled = false;
      btn.style.opacity = '1';
      btn.style.cursor = 'pointer';
    }
    AppStore.showToast("🌟 Xuất sắc! Bạn đã tích đủ Checklist và nắm chắc bài học này!");
  } else {
    if (btn) {
      btn.disabled = true;
      btn.style.opacity = '0.5';
      btn.style.cursor = 'not-allowed';
    }
  }
}

function completeAndNext(index) {
  const ch = CHAPTERS_DATA[index];
  AppStore.markChapterComplete(ch.id);
  AppStore.addXP(30, `Thưởng nỗ lực tích xanh 100% Checklist Chương ${ch.id}`);

  if (index < CHAPTERS_DATA.length - 1) {
    loadChapter(index + 1);
  } else {
    AppStore.showToast("🎉 Chúc mừng! Bạn đã đọc xong và nắm chắc 100% toàn bộ 13 Chương Lý Thuyết CCAF!");
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const domParam = urlParams.get('domain');
  if (domParam && ['D1', 'D2', 'D3', 'D4', 'D5'].includes(domParam.toUpperCase())) {
    activeDomain = domParam.toUpperCase();
    const btn = document.querySelector(`.domain-filter-btn[data-domain="${activeDomain}"]`);
    if (btn) btn.classList.add('active');
  }

  const chParam = parseInt(urlParams.get('chapter'), 10);
  if (!isNaN(chParam) && chParam >= 1 && chParam <= CHAPTERS_DATA.length) {
    currentChapterIndex = chParam - 1;
  } else if (activeDomain !== 'ALL') {
    const firstCh = CHAPTERS_DATA.find(ch => ch.domain === activeDomain);
    if (firstCh) {
      currentChapterIndex = CHAPTERS_DATA.findIndex(item => item.id === firstCh.id);
    }
  }

  renderChapterList();
  loadChapter(currentChapterIndex);
});

// Interactive Knowledge Check QA Reveal Handler & VI Translation Toggle Handler
document.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('kc-toggle-btn')) {
    const card = e.target.closest('.knowledge-check');
    if (!card) return;
    const answer = card.querySelector('.kc-answer');
    if (!answer) return;
    
    const isOpen = answer.classList.contains('open');
    if (isOpen) {
      answer.classList.remove('open');
      e.target.textContent = '💡 Bấm để xem giải thích & đáp án chuẩn';
    } else {
      answer.classList.add('open');
      e.target.textContent = '🙈 Ẩn đáp án';
    }
  }

  // Toggle Vietnamese Translation Box
  const viBtn = e.target.closest ? e.target.closest('.vi-toggle-btn') : null;
  if (viBtn) {
    const box = viBtn.closest('.vi-translation-box');
    if (!box) return;
    const body = box.querySelector('.vi-translation-body');
    const arrow = viBtn.querySelector('.vi-arrow');
    if (!body) return;

    const isOpen = body.classList.contains('open');
    if (isOpen) {
      body.classList.remove('open');
      if (arrow) arrow.textContent = '▼';
    } else {
      body.classList.add('open');
      if (arrow) arrow.textContent = '▲';
    }
  }
});
