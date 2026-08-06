/* CCAF Learning Hub - 67 Core Principles Module Logic with Interactive Anti-Pattern Filter */

let activeDomainFilter = 'ALL';
let showAntiPatternsOnly = false;

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
        <a href="quiz.html?domain=${activeDomainFilter}" class="btn btn-primary" style="font-size: 0.9rem;">
          🎯 Chuyển Sang Luyện Quiz Của ${activeDomainFilter} (Bước 3/3) →
        </a>
      </div>
    ` : ''}

    ${filtered.map(p => {
      const isCompleted = completedIds.includes(p.id);

      return `
        <div class="card principle-card ${isCompleted ? 'completed-card' : ''} ${showAntiPatternsOnly ? 'antipattern-highlight' : ''}" id="principle-${p.id}">
          
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="badge badge-${p.domain.toLowerCase()}">#${p.id} • ${p.domain}</span>
              <span style="font-size: 0.8rem; color: var(--text-muted);">${p.domainTitle}</span>
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

          <h3 style="font-size: 1.15rem; margin-bottom: 0.4rem; color: var(--text-primary);">${p.titleVI}</h3>
          <div style="font-size: 0.88rem; color: var(--accent-purple); font-style: italic; margin-bottom: 0.75rem;">🇬🇧 EN: ${p.title}</div>

          <p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 1rem;">
            ${p.bodyVI}
          </p>

          <details style="margin-bottom: 1rem; font-size: 0.88rem; color: var(--text-muted); background: var(--bg-tertiary); padding: 0.75rem; border-radius: var(--radius-md);">
            <summary style="cursor: pointer; font-weight: 600;">Xem văn bản Tiếng Anh gốc (đề thi)</summary>
            <p style="margin-top: 0.5rem; line-height: 1.5; color: var(--text-secondary);">${p.body}</p>
          </details>

          ${(!showAntiPatternsOnly && p.antiPattern) ? `
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
