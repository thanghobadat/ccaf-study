/* CCAF Learning Hub - 15 Day Plan Tracker Logic (Structured by Dual-Phase: 10 Days VI + 5 Days EN Intensive) */

const FIFTEEN_DAY_SCHEDULE = [
  // --- PHASE 1: 10 NGÀY HỌC NỀN BẰNG TIẾNG VIỆT (VIETNAMESE FOUNDATION) ---
  { day: 1, phase: "PHASE 1 (10 NGÀY HỌC TIẾNG VIỆT)", domain: "D1", sprint: "Domain 1 (27%)", title: "Lý thuyết D1: Claude Agent SDK (Lead & Subagents)", desc: "Đọc Chương 3 bằng Tiếng Việt. Nắm kiến thức Orchestrator-Worker, Flat Hierarchy và allowedTools.", link: "learn.html?domain=D1&chapter=3" },
  { day: 2, phase: "PHASE 1 (10 NGÀY HỌC TIẾNG VIỆT)", domain: "D1", sprint: "Domain 1 (27%)", title: "Lý thuyết D1: Task Decomposition & Multi-Agent Errors", desc: "Đọc Chương 8 & 10 bằng Tiếng Việt. Phân biệt Chaining, Routing và Orchestrator-Workers. Xử lý lỗi isError: true.", link: "learn.html?domain=D1&chapter=8" },
  { day: 3, phase: "PHASE 1 (10 NGÀY HỌC TIẾNG VIỆT)", domain: "D1", sprint: "Domain 1 (27%)", title: "Lý thuyết & Nguyên tắc D1: Preserving Provenance & 21 Principles", desc: "Đọc Chương 12 + Học trọn bộ 21 Nguyên tắc cốt lõi D1 Tiếng Việt trên trang Principles.", link: "principles.html?domain=D1" },
  { day: 4, phase: "PHASE 1 (10 NGÀY HỌC TIẾNG VIỆT)", domain: "D2", sprint: "Domain 2 (18%)", title: "Lý thuyết D2: Tools, tool_use & MCP Protocol", desc: "Đọc Chương 2 & 4 bằng Tiếng Việt. Nắm 4 bước Tool Loop, tool_choice và chuẩn kết nối MCP.", link: "learn.html?domain=D2&chapter=2" },
  { day: 5, phase: "PHASE 1 (10 NGÀY HỌC TIẾNG VIỆT)", domain: "D2", sprint: "Domain 2 (18%)", title: "Nguyên tắc D2: Trọn bộ 15 Nguyên tắc Tool & MCP", desc: "Học 15 Nguyên tắc D2 Tiếng Việt. Nắm Granular tools và Resilient Catch-All Schema Design.", link: "principles.html?domain=D2" },
  { day: 6, phase: "PHASE 1 (10 NGÀY HỌC TIẾNG VIỆT)", domain: "D3", sprint: "Domain 3 (20%)", title: "Lý thuyết D3: Claude Code CLI, CLAUDE.md & Built-in Tools", desc: "Đọc Chương 5 & 13 bằng Tiếng Việt. Nắm cấu hình CLAUDE.md và công cụ Glob/Grep.", link: "learn.html?domain=D3&chapter=5" },
  { day: 7, phase: "PHASE 1 (10 NGÀY HỌC TIẾNG VIỆT)", domain: "D3", sprint: "Domain 3 (20%)", title: "Nguyên tắc D3: Trọn bộ 16 Nguyên tắc Claude Code", desc: "Học 16 Nguyên tắc D3 Tiếng Việt. Chú ý quy tắc dùng Glob/Grep trước khi đọc file.", link: "principles.html?domain=D3" },
  { day: 8, phase: "PHASE 1 (10 NGÀY HỌC TIẾNG VIỆT)", domain: "D4", sprint: "Domain 4 (20%)", title: "Lý thuyết D4: Claude API & Few-shot Prompting", desc: "Đọc Chương 1 & 6 bằng Tiếng Việt. Hiểu cơ chế Stateless, stop_reason, System Prompt và Few-shot.", link: "learn.html?domain=D4&chapter=1" },
  { day: 9, phase: "PHASE 1 (10 NGÀY HỌC TIẾNG VIỆT)", domain: "D4", sprint: "Domain 4 (20%)", title: "Nguyên tắc D4: Trọn bộ 12 Nguyên tắc Prompt Engineering", desc: "Học 12 Nguyên tắc D4 Tiếng Việt (Explicit Null, String standardization).", link: "principles.html?domain=D4" },
  { day: 10, phase: "PHASE 1 (10 NGÀY HỌC TIẾNG VIỆT)", domain: "D5", sprint: "Domain 5 (15%)", title: "Trọn bộ D5: Batches API, Escalation & Context Pruning", desc: "Đọc Chương 7, 9, 11 + Học 3 Nguyên tắc D5 Tiếng Việt. Nắm Batches API tiết kiệm 50% chi phí!", link: "learn.html?domain=D5&chapter=7" },

  // --- PHASE 2: 5 NGÀY LUYỆN THI TIẾNG ANH 100% (ENGLISH EXAM INTENSIVE) ---
  { day: 11, phase: "PHASE 2 (5 NGÀY LUYỆN THI TIẾNG ANH)", domain: "ALL", sprint: "English Chapters Review", title: "🇬🇧 English Chapters Review: Quét Lại 13 Chương Bằng Tiếng Anh", desc: "Đọc lướt lại 13 bài bằng English Mode để quen với từ vựng kỹ thuật (stateless, allowedTools, stop_reason...).", link: "learn.html" },
  { day: 12, phase: "PHASE 2 (5 NGÀY LUYỆN THI TIẾNG ANH)", domain: "ALL", sprint: "English 67 Principles", title: "🇬🇧 English Principles: Ôn Trọn Bộ 67 Nguyên Tắc Tiếng Anh Gốc", desc: "Học 67 Nguyên tắc ở dạng Tiếng Anh gốc (EN) và thuộc các Anti-patterns bằng thuật ngữ tiếng Anh.", link: "principles.html" },
  { day: 13, phase: "PHASE 2 (5 NGÀY LUYỆN THI TIẾNG ANH)", domain: "ALL", sprint: "English Flashcards", title: "🇬🇧 English Flashcards: Lật Thẻ Phản Xạ Tiếng Anh 100%", desc: "Lật trọn bộ Flashcards Tiếng Anh để tăng tốc độ đọc hiểu từ vựng đề thi thật.", link: "flashcards.html" },
  { day: 14, phase: "PHASE 2 (5 NGÀY LUYỆN THI TIẾNG ANH)", domain: "ALL", sprint: "Full English Mock Exam", title: "🇬🇧 Full English Mock Exam: Thi Thử 77 Câu Tiếng Anh 90 Phút", desc: "Bật công tắc 🇬🇧 EN làm bài thi thử 77 câu đếm giờ 90 phút nguyên bản từ Anthropic. Mục tiêu >= 75%!", link: "quiz.html?lang=EN" },
  { day: 15, phase: "PHASE 2 (5 NGÀY LUYỆN THI TIẾNG ANH)", domain: "ALL", sprint: "Final Readiness", title: "🏆 English Error Review & Sẵn Sàng Thi Đỗ CCAF!", desc: "Rà soát các câu làm sai bằng Tiếng Anh, giữ tâm lý thoải mái và tự tin đi thi thật đỗ chứng chỉ CCAF!", link: "quiz.html?lang=EN" }
];

function renderPlanGrid() {
  const container = document.getElementById('plan-grid-container');
  if (!container) return;

  const progress = AppStore.getPlanProgress();
  let completedDaysCount = 0;

  container.innerHTML = FIFTEEN_DAY_SCHEDULE.map(item => {
    const isDone = !!progress[item.day];
    if (isDone) completedDaysCount++;

    const isPhase2 = item.day >= 11;

    return `
      <div class="card day-plan-card ${isDone ? 'done-card' : ''}" style="${isPhase2 ? 'border-color: var(--accent-purple); background: rgba(139, 92, 246, 0.04);' : ''}">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <span style="font-size: 0.8rem; font-weight: 800; color: ${isPhase2 ? 'var(--accent-purple)' : 'var(--accent-blue)'};">
            NGÀY ${item.day.toString().padStart(2, '0')} • ${item.sprint}
          </span>
          <span class="badge badge-${item.domain.toLowerCase()}">${item.domain}</span>
        </div>

        <h3 style="font-size: 1.05rem; margin-bottom: 0.4rem;">${item.title}</h3>
        <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 1.25rem; line-height: 1.5;">${item.desc}</p>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto;">
          <a href="${item.link}" class="btn ${isPhase2 ? 'btn-primary' : 'btn-secondary'}" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;">
            ${isPhase2 ? '🇬🇧 Vào Luyện EN →' : 'Bắt Đầu Học →'}
          </a>
          
          <label style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; font-weight: 600; cursor: pointer; color: ${isDone ? 'var(--accent-emerald)' : 'var(--text-muted)'}">
            <input type="checkbox" ${isDone ? 'checked' : ''} onchange="toggleDay(${item.day})">
            ${isDone ? '✓ Hoàn thành' : 'Đánh dấu xong'}
          </label>
        </div>
      </div>
    `;
  }).join('');

  // Update progress stats
  const overallPercent = Math.round((completedDaysCount / 15) * 100);
  const percentEl = document.getElementById('plan-percent-text');
  const barEl = document.getElementById('plan-progress-fill');
  
  if (percentEl) percentEl.textContent = `${completedDaysCount} / 15 Ngày (${overallPercent}%)`;
  if (barEl) barEl.style.width = `${overallPercent}%`;
}

function toggleDay(dayNum) {
  const progress = AppStore.getPlanProgress();
  progress[dayNum] = !progress[dayNum];
  localStorage.setItem(AppStore.KEYS.PLAN_PROGRESS, JSON.stringify(progress));

  if (progress[dayNum]) {
    AppStore.addXP(40, `Hoàn thành Ngày ${dayNum} Lộ trình 15 Ngày`);
  }
  renderPlanGrid();
}

document.addEventListener('DOMContentLoaded', () => {
  renderPlanGrid();
});
