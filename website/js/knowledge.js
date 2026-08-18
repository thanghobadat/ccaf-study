/**
 * CCAF Learning Hub - Knowledge Base Logic
 * Quản lý hiển thị, tìm kiếm, lọc Domain và tiến độ học tập 44+ Concepts
 * Hỗ trợ tối ưu Responsive Mobile & Mobile TOC Drawer
 */

let activeDomain = 'ALL';
let searchQuery = '';
let completedConcepts = new Set();
let bookmarkedConcepts = new Set();
let showBookmarkedOnly = false;

// Khởi tạo
document.addEventListener('DOMContentLoaded', () => {
  loadProgress();
  initTheme();
  initUserStats();
  renderDomainFilters();
  renderSidebar();
  renderKnowledgeList();
  setupEventListeners();
  setupScrollSpy();
  setupMobileDrawer();
  setupBackToTop();
  setupSearchClear();
});

// Load tiến độ từ localStorage
function loadProgress() {
  try {
    const savedCompleted = localStorage.getItem('ccaf_completed_concepts');
    if (savedCompleted) {
      completedConcepts = new Set(JSON.parse(savedCompleted));
    }
    const savedBookmarks = localStorage.getItem('ccaf_bookmarked_concepts');
    if (savedBookmarks) {
      bookmarkedConcepts = new Set(JSON.parse(savedBookmarks));
    }
  } catch (e) {
    console.error('Error loading progress:', e);
  }
}

// Lưu tiến độ vào localStorage
function saveProgress() {
  try {
    localStorage.setItem('ccaf_completed_concepts', JSON.stringify(Array.from(completedConcepts)));
    localStorage.setItem('ccaf_bookmarked_concepts', JSON.stringify(Array.from(bookmarkedConcepts)));
    updateStats();
  } catch (e) {
    console.error('Error saving progress:', e);
  }
}

// Đánh dấu hoàn thành concept
function toggleComplete(id, event) {
  if (event) event.stopPropagation();
  if (completedConcepts.has(id)) {
    completedConcepts.delete(id);
  } else {
    completedConcepts.add(id);
    addXP(10);
  }
  saveProgress();
  renderSidebar();
  renderKnowledgeList();
}

// Đánh dấu bookmark
function toggleBookmark(id, event) {
  if (event) event.stopPropagation();
  if (bookmarkedConcepts.has(id)) {
    bookmarkedConcepts.delete(id);
  } else {
    bookmarkedConcepts.add(id);
  }
  saveProgress();
  renderSidebar();
  renderKnowledgeList();
}

// Thêm XP người dùng
function addXP(points) {
  let xp = parseInt(localStorage.getItem('ccaf_user_xp') || '0', 10);
  xp += points;
  localStorage.setItem('ccaf_user_xp', xp.toString());
  initUserStats();
}

// Render các nút lọc Domain
function renderDomainFilters() {
  const container = document.getElementById('domain-filter-tabs');
  if (!container) return;

  const domains = [
    { id: 'ALL', label: `🌟 Tất Cả (${CCAF_KNOWLEDGE_DATA.length})`, count: CCAF_KNOWLEDGE_DATA.length },
    { id: 'D1', label: '🏛️ D1: Agent Architecture', count: CCAF_KNOWLEDGE_DATA.filter(c => c.domain === 'D1').length },
    { id: 'D2', label: '🔧 D2: Tool Design & MCP', count: CCAF_KNOWLEDGE_DATA.filter(c => c.domain === 'D2').length },
    { id: 'D3', label: '⚙️ D3: Claude Code & Workflows', count: CCAF_KNOWLEDGE_DATA.filter(c => c.domain === 'D3').length },
    { id: 'D4', label: '✍️ D4: Prompt & JSON Schema', count: CCAF_KNOWLEDGE_DATA.filter(c => c.domain === 'D4').length },
    { id: 'D5', label: '🛡️ D5: Context & Reliability', count: CCAF_KNOWLEDGE_DATA.filter(c => c.domain === 'D5').length },
  ];

  container.innerHTML = domains.map(d => `
    <button class="filter-tab-btn ${activeDomain === d.id ? 'active' : ''}" data-domain="${d.id}">
      ${d.label} <span class="tab-badge">${d.count}</span>
    </button>
  `).join('');

  container.querySelectorAll('.filter-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeDomain = btn.dataset.domain;
      container.querySelectorAll('.filter-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSidebar();
      renderKnowledgeList();
    });
  });
}

// Lọc danh sách concept
function getFilteredConcepts() {
  return CCAF_KNOWLEDGE_DATA.filter(item => {
    if (activeDomain !== 'ALL' && item.domain !== activeDomain) {
      return false;
    }
    if (showBookmarkedOnly && !bookmarkedConcepts.has(item.id)) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDef = item.definition.toLowerCase().includes(q);
      const matchMech = item.mechanism.toLowerCase().includes(q);
      const matchExample = item.easyExample.toLowerCase().includes(q);
      const matchDomain = item.domainTitle.toLowerCase().includes(q);
      return matchTitle || matchDef || matchMech || matchExample || matchDomain;
    }
    return true;
  });
}

// Helper tạo HTML cây mục lục
function buildTocHtml(filtered) {
  if (filtered.length === 0) {
    return `<div style="color: var(--text-muted); font-size: 0.85rem; padding: 0.75rem 0.5rem; text-align: center;">Không có mục phù hợp với bộ lọc.</div>`;
  }

  const grouped = {};
  filtered.forEach(item => {
    if (!grouped[item.domain]) {
      grouped[item.domain] = {
        title: item.domainTitle,
        icon: item.domainIcon,
        items: []
      };
    }
    grouped[item.domain].items.push(item);
  });

  let html = '';
  for (const [dom, data] of Object.entries(grouped)) {
    html += `
      <div class="toc-domain-group">
        <div class="toc-domain-header">${data.icon} ${dom}: ${data.title}</div>
        <div class="toc-items">
          ${data.items.map(item => {
            const isDone = completedConcepts.has(item.id);
            const isBookmark = bookmarkedConcepts.has(item.id);
            return `
              <a href="#${item.id}" class="toc-item ${isDone ? 'completed' : ''}" data-target="${item.id}">
                <span class="toc-status-icon">${isDone ? '✅' : '⚪'}</span>
                <span class="toc-text">${item.index}. ${item.title}</span>
                ${isBookmark ? '<span class="toc-star">⭐</span>' : ''}
              </a>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }
  return html;
}

// Helper gắn sự kiện click cho các link TOC
function attachTocListeners(container) {
  if (!container) return;
  container.querySelectorAll('.toc-item').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);
      
      // Đóng Mobile Drawer nếu đang mở
      closeMobileDrawer();

      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        targetEl.classList.add('highlight-glow');
        setTimeout(() => targetEl.classList.remove('highlight-glow'), 2200);
      }
    });
  });
}

// Render Sidebar Mục Lục (cả Desktop lẫn Mobile Drawer)
function renderSidebar() {
  const desktopSidebarNav = document.getElementById('sidebar-toc-list');
  const mobileSidebarNav = document.getElementById('mobile-toc-list');
  const filtered = getFilteredConcepts();
  const tocHtml = buildTocHtml(filtered);

  // Cập nhật số đếm tiêu đề
  const desktopCountEl = document.getElementById('sidebar-total-count');
  if (desktopCountEl) desktopCountEl.innerText = `${filtered.length} Mục`;

  const drawerCountEl = document.getElementById('drawer-total-count');
  if (drawerCountEl) drawerCountEl.innerText = `${filtered.length} Mục`;

  if (desktopSidebarNav) {
    desktopSidebarNav.innerHTML = tocHtml;
    attachTocListeners(desktopSidebarNav);
  }

  if (mobileSidebarNav) {
    mobileSidebarNav.innerHTML = tocHtml;
    attachTocListeners(mobileSidebarNav);
  }
}

// Render Danh Sách Thẻ Kiến Thức
function renderKnowledgeList() {
  const container = document.getElementById('knowledge-cards-container');
  if (!container) return;

  const filtered = getFilteredConcepts();
  updateStats();

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state-box">
        <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
        <h3>Không tìm thấy kiến thức phù hợp</h3>
        <p style="color: var(--text-secondary); margin-top: 0.5rem;">Hãy thử xóa bộ lọc hoặc tìm kiếm bằng từ khóa khác.</p>
        <button class="btn btn-outline" style="margin-top: 1rem;" onclick="resetFilters()">🔄 Đặt lại bộ lọc</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const isDone = completedConcepts.has(item.id);
    const isBookmark = bookmarkedConcepts.has(item.id);

    return `
      <article class="concept-card ${isDone ? 'card-completed' : ''}" id="${item.id}">
        
        <!-- Header Card -->
        <div class="concept-header">
          <div class="concept-title-wrap">
            <div class="concept-meta">
              <span class="badge ${item.domainBadge}">${item.domainIcon} ${item.domain}: ${item.domainTitle}</span>
              <span class="badge" style="background: rgba(255,255,255,0.06); color: var(--text-muted);">#${item.index}</span>
            </div>
            <h2 class="concept-title">${item.title}</h2>
          </div>
          <div class="concept-actions">
            <button class="btn-icon-action ${isBookmark ? 'active' : ''}" title="Lưu bookmark" onclick="toggleBookmark('${item.id}', event)">
              ${isBookmark ? '⭐' : '☆'}
            </button>
            <button class="btn-check-action ${isDone ? 'active' : ''}" title="Đánh dấu đã hiểu" onclick="toggleComplete('${item.id}', event)">
              ${isDone ? '✅ Đã hiểu' : '⚪ Chưa học'}
            </button>
          </div>
        </div>

        <!-- Definition Box -->
        <div class="concept-section definition-section">
          <div class="section-label">📌 Định Nghĩa Cốt Lõi</div>
          <p class="definition-text">${formatMarkdownText(item.definition)}</p>
        </div>

        <!-- Real-world Analogy Highlight Box -->
        <div class="concept-section analogy-section">
          <div class="analogy-header">
            <span class="analogy-icon">💡</span>
            <span class="analogy-title">Ví Dụ Đời Thường Dễ Hiểu (Real-World Analogy)</span>
          </div>
          <div class="analogy-body">
            <p>${formatMarkdownText(item.easyExample)}</p>
          </div>
        </div>

        <!-- Mechanism -->
        ${item.mechanism ? `
          <div class="concept-section">
            <div class="section-label">⚙️ Cơ Chế Kỹ Thuật & Luồng Hoạt Động</div>
            <div class="markdown-block">${formatListMarkdown(item.mechanism)}</div>
          </div>
        ` : ''}

        <!-- When to Use & When NOT to Use Grid -->
        ${(item.whenToUse || item.whenNotToUse) ? `
          <div class="decision-grid">
            ${item.whenToUse ? `
              <div class="decision-box decision-yes">
                <div class="decision-title">✅ Khi Nào NÊN Dùng</div>
                <div class="decision-content">${formatMarkdownText(item.whenToUse)}</div>
              </div>
            ` : ''}
            ${item.whenNotToUse ? `
              <div class="decision-box decision-no">
                <div class="decision-title">❌ Khi Nào KHÔNG Dùng</div>
                <div class="decision-content">${formatMarkdownText(item.whenNotToUse)}</div>
              </div>
            ` : ''}
          </div>
        ` : ''}

        <!-- Anti-patterns in Exam -->
        ${item.antiPatterns ? `
          <div class="concept-section antipattern-section">
            <div class="section-label" style="color: #f87171;">🚫 Bẫy Thi & Anti-Patterns Thường Gặp</div>
            <div class="antipattern-body">${formatListMarkdown(item.antiPatterns)}</div>
          </div>
        ` : ''}

        <!-- Distinction -->
        ${item.distinction ? `
          <div class="concept-section distinction-section">
            <div class="section-label">⚖️ Phân Biệt Với Khái Niệm Tương Tự</div>
            <div class="distinction-body">${formatListMarkdown(item.distinction)}</div>
          </div>
        ` : ''}

        <!-- Code / Syntax Example -->
        ${item.codeExample ? `
          <div class="concept-section code-section">
            <div class="code-header">
              <span class="code-label">📝 Syntax / Code Minh Họa</span>
              <button class="btn-copy-code" onclick="copyCode(this, '${item.id}-code')">📋 Sao chép</button>
            </div>
            <pre class="code-block"><code id="${item.id}-code">${escapeHtml(item.codeExample)}</code></pre>
          </div>
        ` : ''}

      </article>
    `;
  }).join('');
}

// Cập nhật thanh thống kê tiến độ
function updateStats() {
  const total = CCAF_KNOWLEDGE_DATA.length;
  const doneCount = completedConcepts.size;
  const percent = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  const countEl = document.getElementById('stat-completed-count');
  if (countEl) countEl.innerText = `${doneCount}/${total}`;

  const percentEl = document.getElementById('stat-percent-val');
  if (percentEl) percentEl.innerText = `(${percent}%)`;

  const barEl = document.getElementById('progress-bar-fill');
  if (barEl) barEl.style.width = `${percent}%`;

  const bookmarkBtn = document.getElementById('toggle-bookmark-filter-btn');
  if (bookmarkBtn) {
    bookmarkBtn.innerText = showBookmarkedOnly ? `⭐ Xem tất cả (${total})` : `⭐ Đã lưu (${bookmarkedConcepts.size})`;
    bookmarkBtn.classList.toggle('active', showBookmarkedOnly);
  }

  // Cập nhật badge trên nút Mobile FAB
  const fabBadgeEl = document.getElementById('mobile-toc-fab-badge');
  if (fabBadgeEl) {
    fabBadgeEl.innerText = `${doneCount}/${total}`;
  }
}

// Reset filters
function resetFilters() {
  activeDomain = 'ALL';
  searchQuery = '';
  showBookmarkedOnly = false;
  const searchInput = document.getElementById('knowledge-search-input');
  if (searchInput) searchInput.value = '';
  const clearBtn = document.getElementById('knowledge-search-clear-btn');
  if (clearBtn) clearBtn.classList.remove('visible');
  renderDomainFilters();
  renderSidebar();
  renderKnowledgeList();
}

// Setup các sự kiện
function setupEventListeners() {
  const searchInput = document.getElementById('knowledge-search-input');
  const clearBtn = document.getElementById('knowledge-search-clear-btn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (clearBtn) {
        clearBtn.classList.toggle('visible', searchQuery.trim().length > 0);
      }
      renderSidebar();
      renderKnowledgeList();
    });
  }

  const bookmarkToggleBtn = document.getElementById('toggle-bookmark-filter-btn');
  if (bookmarkToggleBtn) {
    bookmarkToggleBtn.addEventListener('click', () => {
      showBookmarkedOnly = !showBookmarkedOnly;
      renderSidebar();
      renderKnowledgeList();
    });
  }

  const expandAllBtn = document.getElementById('btn-expand-all');
  if (expandAllBtn) {
    expandAllBtn.addEventListener('click', () => {
      document.querySelectorAll('.concept-card').forEach(card => card.classList.remove('collapsed'));
    });
  }

  const collapseAllBtn = document.getElementById('btn-collapse-all');
  if (collapseAllBtn) {
    collapseAllBtn.addEventListener('click', () => {
      document.querySelectorAll('.concept-card').forEach(card => card.classList.add('collapsed'));
    });
  }
}

// Setup Mobile TOC Drawer
function setupMobileDrawer() {
  const fabBtn = document.getElementById('mobile-toc-fab');
  const closeBtn = document.getElementById('mobile-toc-close-btn');
  const backdrop = document.getElementById('mobile-toc-backdrop');

  if (fabBtn) {
    fabBtn.addEventListener('click', openMobileDrawer);
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMobileDrawer);
  }
  if (backdrop) {
    backdrop.addEventListener('click', closeMobileDrawer);
  }

  // Đóng khi nhấn phím Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileDrawer();
    }
  });
}

function openMobileDrawer() {
  const drawer = document.getElementById('mobile-toc-drawer');
  const backdrop = document.getElementById('mobile-toc-backdrop');
  if (drawer) drawer.classList.add('open');
  if (backdrop) backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileDrawer() {
  const drawer = document.getElementById('mobile-toc-drawer');
  const backdrop = document.getElementById('mobile-toc-backdrop');
  if (drawer) drawer.classList.remove('open');
  if (backdrop) backdrop.classList.remove('open');
  document.body.style.overflow = '';
}

// Setup Back to Top Floating Button
function setupBackToTop() {
  const topBtn = document.getElementById('back-to-top-fab');
  if (!topBtn) return;

  topBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Setup nút xóa tìm kiếm
function setupSearchClear() {
  const clearBtn = document.getElementById('knowledge-search-clear-btn');
  const searchInput = document.getElementById('knowledge-search-input');
  if (!clearBtn || !searchInput) return;

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    clearBtn.classList.remove('visible');
    searchInput.focus();
    renderSidebar();
    renderKnowledgeList();
  });
}

// Scrollspy cho Sidebar & Hiển thị Back-To-Top
function setupScrollSpy() {
  window.addEventListener('scroll', () => {
    // Hiển thị/ẩn nút Back-to-Top
    const topBtn = document.getElementById('back-to-top-fab');
    if (topBtn) {
      topBtn.classList.toggle('visible', window.scrollY > 280);
    }

    // Scrollspy highlight
    const cards = document.querySelectorAll('.concept-card');
    let currentId = '';
    
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top <= 180 && rect.bottom >= 180) {
        currentId = card.id;
      }
    });

    if (currentId) {
      document.querySelectorAll('.toc-item').forEach(link => {
        link.classList.toggle('active-reading', link.getAttribute('data-target') === currentId);
      });
    }
  }, { passive: true });
}

// Copy Code Helper
function copyCode(btn, codeId) {
  const codeEl = document.getElementById(codeId);
  if (!codeEl) return;
  
  navigator.clipboard.writeText(codeEl.innerText).then(() => {
    const originalText = btn.innerText;
    btn.innerText = '✅ Đã chép!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.innerText = originalText;
      btn.classList.remove('copied');
    }, 2000);
  });
}

// Markdown formatting helpers
function formatMarkdownText(text) {
  if (!text) return '';
  let str = text;
  str = str.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  str = str.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
  str = str.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  str = str.replace(/\n/g, '<br>');
  return str;
}

function formatListMarkdown(text) {
  if (!text) return '';
  const lines = text.split('\n');
  let html = '<ul class="concept-list">';

  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      html += `<li>${formatMarkdownText(trimmed.substring(2))}</li>`;
    } else if (/^\d+\.\s+/.test(trimmed)) {
      html += `<li>${formatMarkdownText(trimmed.replace(/^\d+\.\s+/, ''))}</li>`;
    } else if (trimmed !== '') {
      html += `<p style="margin: 0.35rem 0;">${formatMarkdownText(trimmed)}</p>`;
    }
  });

  html += '</ul>';
  return html;
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// User Stats & Theme Helpers
function initUserStats() {
  const xp = localStorage.getItem('ccaf_user_xp') || '0';
  const streak = localStorage.getItem('ccaf_user_streak') || '1';
  
  const xpEl = document.getElementById('user-xp-val');
  if (xpEl) xpEl.innerText = xp;
  
  const streakEl = document.getElementById('user-streak-val');
  if (streakEl) streakEl.innerText = streak;
}

function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const currentTheme = localStorage.getItem('ccaf_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  if (toggleBtn) {
    toggleBtn.innerText = currentTheme === 'dark' ? '🌙' : '☀️';
    toggleBtn.addEventListener('click', () => {
      const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('ccaf_theme', theme);
      toggleBtn.innerText = theme === 'dark' ? '🌙' : '☀️';
    });
  }
}
