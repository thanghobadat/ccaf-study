/* CCAF Learning Hub - Raw Docs & Copy Logic */

document.addEventListener('DOMContentLoaded', () => {
  initRawDocsApp();
});

function initRawDocsApp() {
  const container = document.getElementById('docs-container');
  const jumpNav = document.getElementById('doc-jump-nav');
  const copyAllBtn = document.getElementById('copy-all-btn');
  const searchInput = document.getElementById('doc-search-input');

  if (!window.RAW_DOCS_DATA || window.RAW_DOCS_DATA.length === 0) {
    if (container) {
      container.innerHTML = `<div class="error-msg">⚠️ Không tìm thấy dữ liệu RAW DOCS. Vui lòng kiểm tra file js/data/raw-docs-data.js.</div>`;
    }
    return;
  }

  // Render quick jump nav buttons
  renderJumpNav(jumpNav, window.RAW_DOCS_DATA);

  // Render all document cards
  renderDocCards(container, window.RAW_DOCS_DATA);

  // Bind Copy All Button
  if (copyAllBtn) {
    copyAllBtn.addEventListener('click', () => {
      copyAllDocuments();
    });
  }

  // Bind Search Filter
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterDocuments(e.target.value.trim().toLowerCase());
    });
  }
}

function renderJumpNav(navEl, docs) {
  if (!navEl) return;
  navEl.innerHTML = '';

  docs.forEach(doc => {
    const btn = document.createElement('button');
    btn.className = 'jump-nav-btn';
    btn.innerHTML = `📄 ${doc.filename}`;
    btn.addEventListener('click', () => {
      const targetCard = document.getElementById(`card-${doc.id}`);
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        highlightCard(targetCard);
      }
    });
    navEl.appendChild(btn);
  });
}

function renderDocCards(container, docs) {
  if (!container) return;
  container.innerHTML = '';

  docs.forEach((doc, idx) => {
    const card = document.createElement('div');
    card.className = 'doc-card';
    card.id = `card-${doc.id}`;

    const formattedSize = (doc.sizeBytes / 1024).toFixed(1) + ' KB';

    card.innerHTML = `
      <div class="doc-card-header">
        <div class="doc-card-title-group">
          <span class="doc-badge">#${idx + 1}</span>
          <h2 class="doc-title">${escapeHtml(doc.filename)}</h2>
          <span class="doc-path-tag">${escapeHtml(doc.path)}</span>
          <span class="doc-meta-badge">📏 ${doc.lineCount.toLocaleString()} dòng</span>
          <span class="doc-meta-badge">💾 ${formattedSize}</span>
        </div>
        <div class="doc-card-actions">
          <button class="btn btn-primary btn-copy" onclick="copySingleDoc('${doc.id}')">
            📋 Copy Nội Dung
          </button>
          <button class="btn btn-secondary" onclick="toggleDocCollapse('${doc.id}')">
            👁️ <span id="toggle-text-${doc.id}">Thu gọn</span>
          </button>
          <button class="btn btn-secondary" onclick="downloadSingleDoc('${doc.id}')">
            ⬇️ Tải file
          </button>
        </div>
      </div>
      <div class="doc-body" id="body-${doc.id}">
        <textarea class="doc-textarea" id="textarea-${doc.id}" readonly spellcheck="false">${escapeHtml(doc.content)}</textarea>
      </div>
    `;

    container.appendChild(card);
  });
}

function copySingleDoc(docId) {
  const doc = window.RAW_DOCS_DATA.find(d => d.id === docId);
  if (!doc) return;

  const textarea = document.getElementById(`textarea-${docId}`);
  if (textarea) {
    textarea.select();
    textarea.setSelectionRange(0, 99999999);
  }

  navigator.clipboard.writeText(doc.content).then(() => {
    showToast(`✅ Đã copy thành công **${doc.filename}** (${doc.content.length.toLocaleString()} ký tự)!`);
  }).catch(err => {
    showToast(`❌ Copy thất bại: ${err}`, 'error');
  });
}

function copyAllDocuments() {
  if (!window.RAW_DOCS_DATA) return;

  const combinedText = window.RAW_DOCS_DATA.map(doc => {
    return `================================================================================\nFILE: ${doc.filename}\nPATH: ${doc.path}\n================================================================================\n\n${doc.content}\n\n`;
  }).join("\n\n");

  navigator.clipboard.writeText(combinedText).then(() => {
    showToast(`🎉 Đã copy TẤT CẢ 6 TÀI LIỆU (${combinedText.length.toLocaleString()} ký tự) vào Clipboard!`);
  }).catch(err => {
    showToast(`❌ Copy tất cả thất bại: ${err}`, 'error');
  });
}

function toggleDocCollapse(docId) {
  const body = document.getElementById(`body-${docId}`);
  const toggleText = document.getElementById(`toggle-text-${docId}`);
  if (!body) return;

  if (body.style.display === 'none') {
    body.style.display = 'block';
    if (toggleText) toggleText.textContent = 'Thu gọn';
  } else {
    body.style.display = 'none';
    if (toggleText) toggleText.textContent = 'Mở rộng';
  }
}

function downloadSingleDoc(docId) {
  const doc = window.RAW_DOCS_DATA.find(d => d.id === docId);
  if (!doc) return;

  const blob = new Blob([doc.content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = doc.filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(`⬇️ Đang tải về file **${doc.filename}**`);
}

function filterDocuments(keyword) {
  if (!window.RAW_DOCS_DATA) return;

  window.RAW_DOCS_DATA.forEach(doc => {
    const card = document.getElementById(`card-${doc.id}`);
    if (!card) return;

    if (!keyword) {
      card.style.display = 'block';
      return;
    }

    const matchTitle = doc.filename.toLowerCase().includes(keyword);
    const matchPath = doc.path.toLowerCase().includes(keyword);
    const matchContent = doc.content.toLowerCase().includes(keyword);

    if (matchTitle || matchPath || matchContent) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

function highlightCard(cardEl) {
  cardEl.classList.add('card-highlight');
  setTimeout(() => {
    cardEl.classList.remove('card-highlight');
  }, 2000);
}

function showToast(message, type = 'success') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast-item toast-${type}`;
  toast.innerHTML = message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 3500);
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
