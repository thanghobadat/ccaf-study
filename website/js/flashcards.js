/* CCAF Learning Hub - Interactive Flashcards Engine Logic */

let currentCardIndex = 0;
let isFlipped = false;

// Prepare flashcards from principles & key exam concepts
const FLASHCARD_ITEMS = [
  ...PRINCIPLES_DATA.map(p => ({
    id: p.id,
    domain: p.domain,
    front: `[#${p.id} ${p.domain}] ${p.titleVI}`,
    frontEN: p.title,
    back: p.bodyVI,
    antiPattern: p.antiPattern,
    correctPattern: p.correctPattern
  })),
  {
    id: 101,
    domain: "D4",
    front: "Cơ chế hoạt động của Claude API?",
    frontEN: "Claude API statefulness mechanism",
    back: "Claude API là Stateless (không lưu trạng thái). Mỗi lần gọi API phải truyền toàn bộ lịch sử tin nhắn trong mảng `messages`."
  },
  {
    id: 102,
    domain: "D5",
    front: "Message Batches API giúp tiết kiệm bao nhiêu chi phí?",
    frontEN: "Message Batches API cost savings",
    back: "Tiết kiệm 50% chi phí API cho các tác vụ bất đồng bộ không yêu cầu thời gian thực với cam kết SLA trong 24 giờ."
  },
  {
    id: 103,
    domain: "D3",
    front: "Vai trò của file CLAUDE.md trong Claude Code CLI?",
    frontEN: "Role of CLAUDE.md in Claude Code CLI",
    back: "Chứa các quy tắc cấp dự án, hướng dẫn build/test và quy chuẩn lập trình được Claude Code đọc tự động khi khởi chạy."
  }
];

function renderFlashcard() {
  const card = FLASHCARD_ITEMS[currentCardIndex];
  const frontEl = document.getElementById('card-front');
  const backEl = document.getElementById('card-back');
  const countEl = document.getElementById('card-counter');
  const cardInner = document.getElementById('flashcard-inner');

  if (!card) return;

  isFlipped = false;
  if (cardInner) cardInner.classList.remove('flipped');

  if (countEl) countEl.textContent = `Thẻ ${currentCardIndex + 1} / ${FLASHCARD_ITEMS.length}`;

  if (frontEl) {
    frontEl.innerHTML = `
      <div style="margin-bottom: 0.75rem;"><span class="badge badge-${card.domain.toLowerCase()}">${card.domain}</span></div>
      <h2 style="font-size: 1.35rem; margin-bottom: 0.5rem; color: var(--text-primary);">${card.front}</h2>
      ${card.frontEN ? `<p style="font-size: 0.9rem; color: var(--text-muted); font-style: italic;">🇬🇧 ${card.frontEN}</p>` : ''}
      <div style="margin-top: 2rem; font-size: 0.82rem; color: var(--accent-purple); font-weight: 600;">👉 Chạm/Click để lật thẻ xem giải thích</div>
    `;
  }

  if (backEl) {
    backEl.innerHTML = `
      <div style="margin-bottom: 0.75rem;"><span class="badge badge-${card.domain.toLowerCase()}">${card.domain} — NỘI DUNG CỐT LÕI</span></div>
      <p style="font-size: 1rem; line-height: 1.6; color: var(--text-primary); margin-bottom: 1rem;">${card.back}</p>

      ${card.antiPattern ? `
        <div style="background: rgba(244, 63, 94, 0.1); padding: 0.6rem 0.8rem; border-radius: var(--radius-sm); font-size: 0.85rem; color: var(--accent-rose); margin-top: 0.5rem; text-align: left;">
          <strong>❌ Anti-pattern:</strong> ${card.antiPattern}
        </div>
      ` : ''}
    `;
  }
}

function flipCard() {
  const cardInner = document.getElementById('flashcard-inner');
  if (cardInner) {
    isFlipped = !isFlipped;
    cardInner.classList.toggle('flipped', isFlipped);
  }
}

function nextCard(difficulty) {
  AppStore.addXP(10, `Lật thẻ flashcard (${difficulty})`);
  currentCardIndex = (currentCardIndex + 1) % FLASHCARD_ITEMS.length;
  renderFlashcard();
}

function prevCard() {
  currentCardIndex = (currentCardIndex - 1 + FLASHCARD_ITEMS.length) % FLASHCARD_ITEMS.length;
  renderFlashcard();
}

document.addEventListener('DOMContentLoaded', () => {
  renderFlashcard();
});
