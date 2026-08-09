/* CCAF Learning Hub - Domains Overview Module Logic */

let activeOverviewDomain = 'ALL';

function renderDomainOverviewList() {
  const container = document.getElementById('domains-overview-container');
  if (!container) return;

  const isEn = AppStore.getLang() === 'EN';

  let domainsToShow = DOMAINS_OVERVIEW_DATA;
  if (activeOverviewDomain !== 'ALL') {
    domainsToShow = DOMAINS_OVERVIEW_DATA.filter(d => d.id === activeOverviewDomain);
  }

  container.innerHTML = domainsToShow.map((d) => {
    return `
      <article class="domain-overview-card" id="domain-card-${d.id}">
        <!-- Header -->
        <div class="domain-card-header">
          <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
            <span class="badge badge-${d.badgeColor}">${d.code}</span>
            <h2 style="font-size: 1.4rem; font-weight: 700; color: var(--text-primary); margin: 0;">${isEn ? d.title : d.titleVI}</h2>
          </div>
          <div class="domain-weight-tag">
            🎯 Trọng số đề thi: <strong>${d.weight}</strong>
          </div>
        </div>

        <!-- Description -->
        <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem;">
          ${isEn ? d.description : d.descriptionVI}
        </p>

        <!-- 1. Architectural Core -->
        <div class="domain-section-box" style="background: rgba(139, 92, 246, 0.06); border-left: 4px solid var(--accent-purple);">
          <h3 class="domain-section-title" style="color: var(--accent-purple);">
            📌 1. BẢN CHẤT KIẾN TRÚC CỐT LÕI (ARCHITECTURAL CORE)
          </h3>
          <div style="font-size: 0.96rem; line-height: 1.7; color: var(--text-primary);">
            ${d.architecturalCore}
          </div>
        </div>

        <!-- 2. Specs & Schemas Table -->
        <div class="domain-section-box" style="background: rgba(14, 165, 233, 0.06); border-left: 4px solid var(--accent-blue);">
          <h3 class="domain-section-title" style="color: var(--accent-blue);">
            ⚙️ 2. QUY CHUẨN CẤU TRÚC DỮ LIỆU & CÚ PHÁP (SPECS & SCHEMAS)
          </h3>
          <div style="overflow-x: auto;">
            <table class="decision-matrix" style="margin: 0.5rem 0 0 0;">
              <thead>
                <tr>
                  <th style="width: 30%;">Chủ đề Quy chuẩn</th>
                  <th>Chi tiết Cấu trúc & Kỹ thuật</th>
                </tr>
              </thead>
              <tbody>
                ${d.specsAndSchemas.map(s => `
                  <tr>
                    <td><strong>${s.topic}</strong></td>
                    <td>${s.details}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- 3. Good vs Bad Patterns -->
        <div class="domain-section-box" style="background: rgba(16, 185, 129, 0.06); border-left: 4px solid var(--accent-emerald);">
          <h3 class="domain-section-title" style="color: var(--accent-emerald);">
            ⚡ 3. QUY TẮC VÀNG KIẾN TRÚC (GOOD VS BAD PATTERNS)
          </h3>
          <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 0.75rem;">
            ${d.goodVsBadPatterns.map(p => `
              <div class="comparison-grid" style="margin: 0;">
                <div class="card-good" style="font-size: 0.92rem; line-height: 1.6;">${p.good}</div>
                <div class="card-bad" style="font-size: 0.92rem; line-height: 1.6;">${p.bad}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 4. Common Exam Traps -->
        <div class="domain-section-box" style="background: rgba(244, 63, 94, 0.06); border-left: 4px solid var(--accent-rose);">
          <h3 class="domain-section-title" style="color: var(--accent-rose);">
            ⚠️ 4. CÁC BẪY ĐỀ THI HAY GẶP (COMMON EXAM TRAPS)
          </h3>
          <ul style="padding-left: 1.25rem; font-size: 0.95rem; line-height: 1.65; color: var(--text-primary); margin: 0.5rem 0 0 0;">
            ${d.examTraps.map(t => `<li style="margin-bottom: 0.4rem;">${t}</li>`).join('')}
          </ul>
        </div>

        <!-- 5. Production Archetype & Quick Links -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color); margin-top: 1.5rem;">
          <div style="font-size: 0.9rem; color: var(--accent-purple); font-weight: 600;">
            🛠️ <strong>Mô hình Thực chiến:</strong> ${d.productionArchetype}
          </div>
          
          <div style="display: flex; gap: 0.5rem;">
            <a href="principles.html?domain=${d.id}" class="btn btn-secondary" style="font-size: 0.85rem;">
              💡 67 Nguyên tắc ${d.id} →
            </a>
            <a href="quiz.html?domain=${d.id}" class="btn btn-primary" style="font-size: 0.85rem;">
              🎯 Thi thử ${d.id} →
            </a>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function filterOverviewDomain(domain) {
  activeOverviewDomain = domain;
  document.querySelectorAll('.domain-filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.domain === domain);
  });
  renderDomainOverviewList();
}

document.addEventListener('DOMContentLoaded', () => {
  renderDomainOverviewList();
});
