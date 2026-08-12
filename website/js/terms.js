/* CCAF Learning Hub - Terms Hub Logic (Render, Filter, Real-time Search & Modal View) */

let currentDomainFilter = 'ALL';
let currentSearchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  renderTermsGrid();
  setupEventListeners();
  updateHeroStats();
});

function updateHeroStats() {
  if (typeof TERMS_DATA === 'undefined') return;
  
  const totalCountEl = document.getElementById('stat-total-terms');
  if (totalCountEl) totalCountEl.textContent = TERMS_DATA.length;

  const domainCounts = { D1: 0, D2: 0, D3: 0, D4: 0, D5: 0 };
  TERMS_DATA.forEach(t => {
    if (domainCounts[t.domain] !== undefined) {
      domainCounts[t.domain]++;
    }
  });

  Object.keys(domainCounts).forEach(d => {
    const el = document.getElementById(`stat-count-${d.toLowerCase()}`);
    if (el) el.textContent = domainCounts[d];
  });
}

function renderTermsGrid() {
  const container = document.getElementById('terms-grid-container');
  if (!container) return;

  if (typeof TERMS_DATA === 'undefined') {
    container.innerHTML = '<div class="callout callout-warning">⚠️ Chưa tải được dữ liệu thuật ngữ!</div>';
    return;
  }

  let filtered = TERMS_DATA.filter(term => {
    const matchDomain = currentDomainFilter === 'ALL' || term.domain === currentDomainFilter;
    
    const query = currentSearchQuery.toLowerCase().trim();
    const matchSearch = !query || 
      term.nameEN.toLowerCase().includes(query) ||
      term.nameVI.toLowerCase().includes(query) ||
      term.explanation.toLowerCase().includes(query) ||
      (term.applicationCases && term.applicationCases.some(c => c.toLowerCase().includes(query))) ||
      (term.contrast && term.contrast.toLowerCase().includes(query));

    return matchDomain && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: var(--bg-secondary); border-radius: 16px; border: 1px dashed var(--border-color);">
        <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
        <h3 style="font-size: 1.25rem; color: var(--text-primary); margin-bottom: 0.5rem;">Không tìm thấy thuật ngữ phù hợp</h3>
        <p style="color: var(--text-secondary); font-size: 0.95rem;">Thử thay đổi từ khóa tìm kiếm hoặc chọn bộ lọc Domain khác.</p>
        <button class="btn btn-secondary" style="margin-top: 1rem;" onclick="window.resetTermsFilter()">🔄 Đặt lại bộ lọc</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((term, index) => {
    const domClass = `badge-${term.domain.toLowerCase()}`;
    
    return `
      <div class="card term-card" style="padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between; border-radius: 14px; position: relative; transition: all 0.25s ease;" data-id="${term.id}">
        <div>
          <!-- Header Bar with DOMAIN FIRST -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              <span class="badge ${domClass}" style="font-weight: 800; font-size: 0.85rem; padding: 0.35rem 0.75rem;">
                📌 [${term.domain}] ${term.domainTitle.split(':')[0]}
              </span>
              <span class="badge" style="background: rgba(139, 92, 246, 0.15); color: var(--accent-purple); border: 1px solid rgba(139, 92, 246, 0.3); font-size: 0.75rem;">
                ⚡ ${term.type}
              </span>
            </div>

            <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: var(--accent-emerald); border: 1px solid rgba(16, 185, 129, 0.3); font-size: 0.78rem; font-weight: 700;">
              📊 ${term.frequency}
            </span>
          </div>

          <!-- Term Titles -->
          <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.25rem; line-height: 1.4;">
            ${term.nameEN}
          </h3>
          <h4 style="font-size: 0.92rem; font-weight: 600; color: var(--accent-cyan); margin-bottom: 1rem;">
            🇻🇳 ${term.nameVI}
          </h4>

          <!-- Explanation -->
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.25rem;">
            ${term.explanation}
          </p>

          <!-- Application Cases -->
          <div style="background: var(--bg-tertiary); border-radius: 10px; padding: 1rem; border-left: 3px solid var(--accent-purple); margin-bottom: 1.25rem;">
            <strong style="font-size: 0.85rem; color: var(--text-primary); display: block; margin-bottom: 0.5rem;">
              🚀 Trường hợp áp dụng thực tế (General Application Cases):
            </strong>
            <ul style="margin: 0; padding-left: 1.2rem; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.55;">
              ${term.applicationCases.map(c => `<li style="margin-bottom: 0.35rem;">${c}</li>`).join('')}
            </ul>
          </div>
        </div>

        <!-- Exam Tip Footer -->
        <div style="padding-top: 0.85rem; border-top: 1px dashed var(--border-color); font-size: 0.82rem; color: var(--accent-amber); display: flex; align-items: flex-start; gap: 0.4rem;">
          <span>⚡</span>
          <span><strong>Mẹo CCAF:</strong> ${term.examTip}</span>
        </div>
      </div>
    `;
  }).join('');
}

function setupEventListeners() {
  // Domain Filter Buttons
  document.querySelectorAll('.terms-domain-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.terms-domain-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentDomainFilter = btn.dataset.domain;
      renderTermsGrid();
    });
  });

  // Search Input
  const searchInput = document.getElementById('terms-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value;
      renderTermsGrid();
    });
  }
}

window.resetTermsFilter = function() {
  currentDomainFilter = 'ALL';
  currentSearchQuery = '';
  const searchInput = document.getElementById('terms-search-input');
  if (searchInput) searchInput.value = '';

  document.querySelectorAll('.terms-domain-btn').forEach(b => {
    if (b.dataset.domain === 'ALL') b.classList.add('active');
    else b.classList.remove('active');
  });

  renderTermsGrid();
};
