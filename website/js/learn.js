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

function getSectionExplanation(ch, sec, isEn) {
  if (sec.explanationVI && !isEn) {
    return sec.explanationVI;
  }

  // Generates structured explanation for Part 2 (Side-by-side technical explanation for Part 1)
  const title = sec.heading || '';
  let expHtml = '';

  if (title.includes('1.1') || title.includes('Request Struct')) {
    expHtml = `
      <p>💡 <strong>Bản chất phần này:</strong> Khi gọi API Claude <code>/v1/messages</code>, bạn cần gửi đủ 8 tham số request. Mô hình là Stateless (không có bộ nhớ lưu lại giữa các lần gọi), vì vậy bạn bắt buộc phải gửi lại toàn bộ lịch sử <code>messages</code>.</p>
      <ul>
        <li>⚙️ <strong>System Prompt:</strong> Đặt các chỉ thị quan trọng, vai trò AI, quy định an toàn và ranh giới XML.</li>
        <li>⚙️ <strong>max_tokens:</strong> Bắt buộc phải khai báo để khống chế độ dài câu trả lời và tránh tốn tiền Token.</li>
        <li>⚙️ <strong>temperature:</strong> Dùng <code>0.0</code> khi cần code/bóc tách JSON chính xác; dùng <code>0.7-1.0</code> khi viết lách sáng tạo.</li>
      </ul>
      <p>⚡ <strong>Mẹo thi CCAF:</strong> Claude API hoàn toàn Stateless. Muốn giữ ngữ cảnh hội thoại, ứng dụng Backend của bạn phải tự lưu trữ mảng tin nhắn và gửi kèm toàn bộ mỗi lần gọi.</p>
    `;
  } else if (title.includes('1.2') || title.includes('stop_reason')) {
    expHtml = `
      <p>💡 <strong>Bản chất phần này:</strong> Cờ <code>stop_reason</code> trong Response đóng vai trò là một <strong>Máy trạng thái (State Machine)</strong> điều khiển Backend Client.</p>
      <ul>
        <li><code>"end_turn"</code> ➔ AI trả lời xong ➔ Hiển thị cho người dùng.</li>
        <li><code>"tool_use"</code> ➔ AI muốn gọi Tool ➔ Backend dừng lại, chạy Tool, bọc kết quả vào <code>tool_result</code> và gọi lại API.</li>
        <li><code>"max_tokens"</code> ➔ AI bị chạm trần token ➔ Trả lời bị ngắt dở ➔ Cần gửi lượt mới yêu cầu AI viết tiếp.</li>
      </ul>
      <p>⚡ <strong>Mẹo thi CCAF:</strong> Đề thi rất hay hỏi cách xử lý khi <code>stop_reason = "max_tokens"</code>. Đáp án là tăng <code>max_tokens</code> hoặc gửi tin nhắn lượt mới bảo Claude tiếp tục.</p>
    `;
  } else if (title.includes('1.3') || title.includes('System Prompt') || title.includes('Over-Instruction')) {
    expHtml = `
      <p>💡 <strong>Bản chất phần này:</strong> Thiết lập System Prompt đúng cách và tránh bẫy "Chỉ thị quá đà" (Over-Instruction).</p>
      <ul>
        <li>❌ <strong>Bẫy Over-Instruction:</strong> Ép AI "Luôn luôn kiểm tra ID" khiến AI gọi Tool vô cớ ngay cả khi hỏi thông tin chung.</li>
        <li>✅ <strong>Chỉ thị có điều kiện:</strong> "KHI người dùng hỏi thông tin tài khoản, MỚI xác thực ID" ➔ AI chỉ gọi Tool khi thực sự cần.</li>
        <li>🛡️ <strong>Thẻ XML:</strong> Bọc input từ user trong thẻ <code>&lt;user_input&gt;</code> để chống Prompt Injection.</li>
      </ul>
    `;
  } else if (title.includes('1.4') || title.includes('Context Window') || title.includes('Lost-in-the-Middle')) {
    expHtml = `
      <p>💡 <strong>Bản chất phần này:</strong> Quản lý bộ nhớ Context 200,000 token của Claude và hiệu ứng suy giảm chú ý ở giữa.</p>
      <ul>
        <li>📉 <strong>Hiệu ứng Lost-in-the-Middle:</strong> AI chú ý tốt nhất ở ĐẦU và ĐUÔI prompt, dễ quên thông tin nằm ở 60% giữa.</li>
        <li>🎯 <strong>Quy tắc vàng:</strong> Đặt thông tin quan trọng nhất ở System Prompt (ĐẦU) hoặc ở lượt tin nhắn mới nhất (ĐUÔI).</li>
        <li>🧮 <strong>Ước tính Token:</strong> Tiếng Anh ~3.5-4 ký tự/token; Code và Tiếng Việt tốn token hơn (~1-2.5 ký tự/token).</li>
      </ul>
    `;
  } else if (title.includes('Knowledge Check') || title.includes('Check')) {
    expHtml = `
      <p>💡 <strong>Bản chất phần này:</strong> Bài tập kiểm tra tình huống thực chiến giúp bạn rèn luyện phản xạ cho câu hỏi trắc nghiệm của Anthropic.</p>
      <p>⚡ Hãy thử tự trả lời trước khi bấm xem đáp án chính thức từ Anthropic!</p>
    `;
  } else {
    expHtml = `
      <p>💡 <strong>Bản chất kỹ thuật:</strong> Phần này phân tích chi tiết các nguyên tắc kiến trúc và thực thi của ${ch.domainTitle}.</p>
      <ul>
        <li>⚙️ <strong>Logic Backend:</strong> Cấu hình chính xác các tham số và luồng xử lý dữ liệu.</li>
        <li>⚡ <strong>Ứng dụng thực tế:</strong> Áp dụng đúng thiết kế giúp hệ thống hoạt động ổn định và tối ưu chi phí.</li>
      </ul>
    `;
  }

  return expHtml;
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
  const lang = AppStore.getLang();
  const isEn = lang === 'EN';

  const summaryText = isEn ? `<p>${ch.summary}</p>` : (ch.summaryVI ? ch.summaryVI : `<p>${ch.summary}</p>`);
  const objectivesList = isEn ? ch.learningObjectives : (ch.learningObjectivesVI || ch.learningObjectives);
  const examTipText = isEn ? ch.examTip : (ch.examTipVI || ch.examTip);
  const masteriesList = isEn ? ch.coreMasteries : (ch.coreMasteriesVI || ch.coreMasteries);
  const trapsList = isEn ? ch.examTraps : (ch.examTrapsVI || ch.examTraps);

  const objTitle = isEn ? "🎯 LEARNING OBJECTIVES FOR THIS CHAPTER" : "🎯 MỤC TIÊU BẠN CẦN NẮM ĐƯỢC SAU BÀI NÀY (LEARNING OBJECTIVES)";
  const examTipTitle = isEn ? "⚡ CRITICAL CCAF EXAM TIP" : "⚡ MẸO THI CCAF QUAN TRỌNG (EXAM TIP)";
  const masteriesTitle = isEn ? "🔑 CORE MASTERIES TO REMEMBER" : "🔑 KIẾN THỨC CỐT LÕI BẮT BUỘC THUỘC (CORE MASTERIES)";
  const trapsTitle = isEn ? "⚠️ COMMON EXAM TRAPS (ANTI-PATTERNS)" : "⚠️ CÁC BẪY ĐỀ THI HAY GẶP (ANTI-PATTERNS / EXAM TRAPS)";
  const checklistTitle = isEn ? "✅ SELF-ASSESSMENT CHECKLIST" : "✅ CHECKLIST TỰ ĐÁNH GIÁ \"HỌC ĐÂU CHẮC ĐÓ\"";
  const checklistSub = isEn ? "Check all boxes to unlock completion" : "Tích chọn tất cả ô để mở khóa nút Hoàn thành";

  contentEl.innerHTML = `
    <!-- Header Area & Summary -->
    <div style="margin-bottom: 1.5rem;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 0.75rem;">
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
          <span class="badge badge-${ch.domain.toLowerCase()}">${ch.domain} — ${ch.domainTitle}</span>
          <span class="badge" style="background: var(--bg-tertiary); color: var(--text-secondary);">⏱️ ${ch.estimatedMinutes} ${isEn ? 'min read' : 'phút đọc'}</span>
        </div>

        <!-- Part 3 Summary Modal Button -->
        <button class="btn btn-primary" onclick="openSummaryModal(${index})" style="font-size: 0.88rem; padding: 0.45rem 0.9rem; background: linear-gradient(135deg, var(--accent-purple), var(--accent-blue)); border: none; box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);">
          💡 ${isEn ? 'Summary & Core Insights Popup' : 'Tóm Tắt Tổng Kết Bài Học'}
        </button>
      </div>

      <h1 style="font-size: 2rem; margin-bottom: 0.75rem;">${ch.title}</h1>
      <div style="color: var(--text-primary); font-size: 1.05rem; line-height: 1.6;">
        ${summaryText}
      </div>
    </div>

    <!-- Pedagogy Box 1: Learning Objectives -->
    ${objectivesList ? `
      <div style="background: rgba(14, 165, 233, 0.08); border-left: 4px solid var(--accent-blue); padding: 1.25rem; border-radius: var(--radius-md); margin-bottom: 2rem;">
        <h3 style="font-size: 1.05rem; color: var(--accent-blue); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.4rem;">
          ${objTitle}
        </h3>
        <ul style="padding-left: 1.25rem; font-size: 0.95rem; color: var(--text-primary); line-height: 1.6;">
          ${objectivesList.map(obj => `<li style="margin-bottom: 0.35rem;">${obj}</li>`).join('')}
        </ul>
      </div>
    ` : ''}

    <!-- Exam Tip -->
    ${examTipText ? `
      <div class="callout callout-exam" style="margin-bottom: 2rem;">
        <div class="callout-title">${examTipTitle}</div>
        <div style="font-size: 0.98rem; line-height: 1.6;">${examTipText}</div>
      </div>
    ` : ''}

    <!-- Section Layout Banner -->
    <div style="background: rgba(139, 92, 246, 0.08); border: 1px solid rgba(139, 92, 246, 0.25); padding: 0.85rem 1.2rem; border-radius: var(--radius-md); margin-bottom: 2rem; display: flex; align-items: center; justify-content: space-between; font-size: 0.88rem; color: var(--text-primary);">
      <span>📖 <strong>Nội dung Lý thuyết Gốc:</strong> Hiển thị đầy đủ ở dưới. Bấm nút màu tím ở mỗi section để mở <strong>Giải thích Chi tiết (Phần 2)</strong>.</span>
    </div>

    <!-- Single Column Content Sections with Collapsible Part 2 Accordion Below -->
    ${ch.sections.map((sec, secIdx) => {
      const sectionHtml = isEn ? sec.content : (sec.contentVI ? sec.contentVI : sec.content);
      const explanationHtml = getSectionExplanation(ch, sec, isEn);

      return `
        <div class="section-block-single">
          <h2 class="section-single-title">
            <span>📌 ${sec.heading}</span>
          </h2>
          
          <!-- Part 1: Main Original Content -->
          <div class="part1-card">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border-color);">
              <span class="badge" style="background: rgba(14, 165, 233, 0.15); color: var(--accent-blue); font-weight: 700; font-size: 0.8rem;">📖 PHẦN 1: LÝ THUYẾT GỐC CHUẨN</span>
              <span style="font-size: 0.78rem; color: var(--text-muted);">Mục ${secIdx + 1}/${ch.sections.length}</span>
            </div>

            <div style="font-size: 0.98rem; line-height: 1.75; color: var(--text-primary);">
              ${sectionHtml}
            </div>

            ${sec.codeExample ? `
              <div style="margin-top: 1.25rem;">
                <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.35rem;">💻 MÃ MẪU / PAYLOAD CODE:</div>
                <pre><code>${sec.codeExample.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
              </div>
            ` : ''}
          </div>

          <!-- Part 2: Collapsible Explanation Accordion Box Immediately Below Part 1 -->
          <div class="explanation-accordion-box">
            <button class="explanation-toggle-btn" onclick="toggleExplanationAccordion(this)">
              <span>💡 PHẦN 2: Bấm để xem Giải thích Chi tiết & Bản chất Kỹ thuật</span>
              <span class="exp-arrow" style="font-size: 0.85rem; transition: transform 0.2s;">▼ Xem Giải Thích</span>
            </button>
            <div class="explanation-content">
              ${explanationHtml}
            </div>
          </div>
        </div>
      `;
    }).join('')}

    <!-- Pedagogy Box 2: Core Masteries -->
    ${masteriesList ? `
      <div style="background: rgba(139, 92, 246, 0.08); border: 1px solid rgba(139, 92, 246, 0.2); padding: 1.25rem; border-radius: var(--radius-md); margin: 2rem 0;">
        <h3 style="font-size: 1.05rem; color: var(--accent-purple); margin-bottom: 0.75rem;">
          ${masteriesTitle}
        </h3>
        <ul style="padding-left: 1.25rem; font-size: 0.92rem; color: var(--text-primary); line-height: 1.6;">
          ${masteriesList.map(m => `<li style="margin-bottom: 0.4rem;">${m}</li>`).join('')}
        </ul>
      </div>
    ` : ''}

    <!-- Pedagogy Box 3: Exam Traps -->
    ${trapsList ? `
      <div style="background: rgba(244, 63, 94, 0.08); border-left: 4px solid var(--accent-rose); padding: 1.25rem; border-radius: var(--radius-md); margin-bottom: 2rem;">
        <h3 style="font-size: 1.05rem; color: var(--accent-rose); margin-bottom: 0.5rem;">
          ${trapsTitle}
        </h3>
        <ul style="padding-left: 1.25rem; font-size: 0.92rem; color: var(--text-primary); line-height: 1.6;">
          ${trapsList.map(trap => `<li style="margin-bottom: 0.4rem;">${trap}</li>`).join('')}
        </ul>
      </div>
    ` : ''}

    <!-- Pedagogy Box 4: Interactive Self-Checklist Widget -->
    ${ch.selfChecklist ? `
      <div style="background: var(--bg-card-hover); border: 1px solid var(--border-highlight); padding: 1.5rem; border-radius: var(--radius-lg); margin-top: 2.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <h3 style="font-size: 1.1rem; color: var(--accent-emerald);">
            ${checklistTitle}
          </h3>
          <span style="font-size: 0.8rem; color: var(--text-muted);">${checklistSub}</span>
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
      <h4 style="margin-bottom: 0.5rem; color: var(--accent-purple);">${isEn ? `🚀 NEXT STEP IN ${ch.domain} SPRINT` : `🚀 BƯỚC TIẾP THEO TRONG SPRINT HỌC CUỐN CHIẾU ${ch.domain}`}</h4>
      <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 1rem;">
        ${isEn ? `After completing theory for ${ch.domain}, proceed to master the core architectural principles!` : `Sau khi hoàn thành xong các bài lý thuyết của ${ch.domain}, bước tiếp theo là chuyển sang học Nguyên tắc cốt lõi của ${ch.domain}!`}
      </p>
      <a href="principles.html?domain=${ch.domain}" class="btn btn-secondary" style="font-size: 0.9rem;">
        ${isEn ? `👉 Go to ${ch.domain} Principles →` : `👉 Chuyển Sang Học Nguyên Tắc Của ${ch.domain} →`}
      </a>
    </div>

    <!-- Bottom Navigation Bar -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color);">
      <button class="btn btn-secondary" onclick="loadChapter(${index - 1})" ${index === 0 ? 'disabled style="opacity:0.5;"' : ''}>
        ${isEn ? '← Previous Chapter' : '← Chương Trước'}
      </button>

      <button id="next-chapter-btn" class="btn btn-primary" onclick="completeAndNext(${index})" ${(!isAlreadyCompleted && ch.selfChecklist) ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>
        ${index === CHAPTERS_DATA.length - 1 ? (isEn ? '✓ Complete All 13 Chapters!' : '✓ Hoàn Thành Tất Cả 13 Chương!') : (isEn ? 'Complete & Next Chapter →' : 'Hoàn Thành Bài & Sang Bài Tiếp →')}
      </button>
    </div>
  `;

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ==========================================================================
   Part 3 Summary Modal Popup Controls
   ========================================================================== */
function openSummaryModal(index) {
  const ch = CHAPTERS_DATA[index || currentChapterIndex];
  if (!ch) return;

  const modalOverlay = document.getElementById('summary-modal-overlay');
  const titleEl = document.getElementById('summary-modal-title');
  const bodyEl = document.getElementById('summary-modal-body');

  if (!modalOverlay || !bodyEl) return;

  const isEn = AppStore.getLang() === 'EN';

  titleEl.innerHTML = `💡 ${isEn ? 'Chapter Summary:' : 'Tóm Tắt Tổng Kết Bài Học:'} ${ch.title}`;

  const masteriesList = isEn ? ch.coreMasteries : (ch.coreMasteriesVI || ch.coreMasteries);
  const trapsList = isEn ? ch.examTraps : (ch.examTrapsVI || ch.examTraps);
  const objectivesList = isEn ? ch.learningObjectives : (ch.learningObjectivesVI || ch.learningObjectives);

  bodyEl.innerHTML = `
    <div style="background: rgba(139, 92, 246, 0.1); border-left: 4px solid var(--accent-purple); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.25rem;">
      <h4 style="margin: 0 0 0.4rem 0; color: var(--accent-purple);">📌 BẢN TỔNG KẾT TOÀN BỘ BÀI HỌC (ÔN TẬP NHANH 1 PHÚT)</h4>
      <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">${isEn ? ch.summary : (ch.summaryVI || ch.summary)}</p>
    </div>

    <div style="margin-bottom: 1.25rem;">
      <h4 style="color: var(--accent-blue); margin-bottom: 0.5rem;">🎯 1. Mục tiêu cốt lõi cần nhớ:</h4>
      <ul style="padding-left: 1.2rem; font-size: 0.92rem; line-height: 1.6;">
        ${objectivesList ? objectivesList.map(o => `<li>${o}</li>`).join('') : ''}
      </ul>
    </div>

    <div style="margin-bottom: 1.25rem; background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.2); padding: 1rem; border-radius: var(--radius-md);">
      <h4 style="color: var(--accent-emerald); margin: 0 0 0.5rem 0;">🔑 2. Nguyên tắc vàng bắt buộc thuộc:</h4>
      <ul style="padding-left: 1.2rem; font-size: 0.92rem; line-height: 1.6; margin: 0;">
        ${masteriesList ? masteriesList.map(m => `<li>${m}</li>`).join('') : ''}
      </ul>
    </div>

    <div style="background: rgba(244, 63, 94, 0.08); border-left: 4px solid var(--accent-rose); padding: 1rem; border-radius: var(--radius-md);">
      <h4 style="color: var(--accent-rose); margin: 0 0 0.5rem 0;">⚠️ 3. Bẫy đề thi hay gặp (Anti-Patterns):</h4>
      <ul style="padding-left: 1.2rem; font-size: 0.92rem; line-height: 1.6; margin: 0;">
        ${trapsList ? trapsList.map(t => `<li>${t}</li>`).join('') : ''}
      </ul>
    </div>
  `;

  modalOverlay.classList.add('active');
}

function toggleExplanationAccordion(btn) {
  const box = btn.closest('.explanation-accordion-box');
  if (!box) return;
  const content = box.querySelector('.explanation-content');
  const arrow = btn.querySelector('.exp-arrow');
  if (!content) return;

  const isOpen = content.classList.contains('open');
  if (isOpen) {
    content.classList.remove('open');
    if (arrow) arrow.textContent = '▼ Xem Giải Thích';
  } else {
    content.classList.add('open');
    if (arrow) arrow.textContent = '▲ Ẩn Giải Thích';
  }
}

function closeSummaryModal(event) {
  if (event.target.id === 'summary-modal-overlay') {
    closeSummaryModalForce();
  }
}

function closeSummaryModalForce() {
  const modalOverlay = document.getElementById('summary-modal-overlay');
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
  }
}

// Re-render chapter when language changes via global header switcher
window.addEventListener('ccaf_lang_changed', () => {
  renderChapterList();
  loadChapter(currentChapterIndex);
});

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

function initLearnPage() {
  try {
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
  } catch (err) {
    console.error("Learn page init error:", err);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLearnPage);
} else {
  initLearnPage();
}

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
