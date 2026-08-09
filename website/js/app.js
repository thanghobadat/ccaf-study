/* CCAF Learning Hub - Core Application Logic & State Management with Exam History Details */

const AppStore = {
  KEYS: {
    STREAK: 'ccaf_streak',
    XP: 'ccaf_xp',
    COMPLETED_CHAPTERS: 'ccaf_completed_chapters',
    COMPLETED_PRINCIPLES: 'ccaf_completed_principles',
    PLAN_PROGRESS: 'ccaf_plan_progress',
    QUIZ_RESULTS: 'ccaf_quiz_results',
    THEME: 'ccaf_theme',
    LANG: 'ccaf_lang'
  },

  // State Getters
  getStreak() {
    return parseInt(localStorage.getItem(this.KEYS.STREAK) || '1', 10);
  },

  getXP() {
    return parseInt(localStorage.getItem(this.KEYS.XP) || '0', 10);
  },

  getCompletedChapters() {
    try {
      return JSON.parse(localStorage.getItem(this.KEYS.COMPLETED_CHAPTERS) || '[]');
    } catch (e) {
      return [];
    }
  },

  getCompletedPrinciples() {
    try {
      return JSON.parse(localStorage.getItem(this.KEYS.COMPLETED_PRINCIPLES) || '[]');
    } catch (e) {
      return [];
    }
  },

  getPlanProgress() {
    try {
      return JSON.parse(localStorage.getItem(this.KEYS.PLAN_PROGRESS) || '{}');
    } catch (e) {
      return {};
    }
  },

  getQuizResults() {
    try {
      return JSON.parse(localStorage.getItem(this.KEYS.QUIZ_RESULTS) || '[]');
    } catch (e) {
      return [];
    }
  },

  getTheme() {
    return localStorage.getItem(this.KEYS.THEME) || 'dark';
  },

  getLang() {
    return localStorage.getItem(this.KEYS.LANG) || 'VI';
  },

  // State Setters & Modifiers
  addXP(amount, reason = '') {
    const current = this.getXP();
    const next = current + amount;
    localStorage.setItem(this.KEYS.XP, next.toString());
    this.updateUserStatsUI();
    if (reason) {
      this.showToast(`+${amount} XP: ${reason}`);
    }
  },

  setLang(lang) {
    localStorage.setItem(this.KEYS.LANG, lang);
    this.updateUserStatsUI();
    this.showToast(`Đã đổi ngôn ngữ toàn hệ thống sang: ${lang === 'EN' ? '🇬🇧 Tiếng Anh (English)' : '🇻🇳 Tiếng Việt'}`);
    window.dispatchEvent(new CustomEvent('ccaf_lang_changed', { detail: { lang } }));
  },

  markChapterComplete(chapterId) {
    const list = this.getCompletedChapters();
    if (!list.includes(chapterId)) {
      list.push(chapterId);
      localStorage.setItem(this.KEYS.COMPLETED_CHAPTERS, JSON.stringify(list));
      this.addXP(50, `Hoàn thành Bài giảng Chương ${chapterId}`);
    }
  },

  togglePrincipleComplete(principleId) {
    const list = this.getCompletedPrinciples();
    const idx = list.indexOf(principleId);
    if (idx >= 0) {
      list.splice(idx, 1);
    } else {
      list.push(principleId);
      this.addXP(10, `Ghi nhớ Nguyên tắc #${principleId}`);
    }
    localStorage.setItem(this.KEYS.COMPLETED_PRINCIPLES, JSON.stringify(list));
    this.updateUserStatsUI();
  },

  saveQuizResult(domainsLabel, score, total, questions = [], userAnswers = {}) {
    const results = this.getQuizResults();
    const percentage = Math.round((score / total) * 100);
    const isPass = percentage >= 75;

    const now = new Date();
    const dateStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} ${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;

    results.unshift({
      id: Date.now(),
      domains: domainsLabel,
      score,
      total,
      percentage,
      pass: isPass,
      date: dateStr,
      questions,
      userAnswers
    });

    localStorage.setItem(this.KEYS.QUIZ_RESULTS, JSON.stringify(results));

    if (isPass) {
      this.addXP(100, `Thi đỗ Quiz ${domainsLabel} (${percentage}%)`);
    } else {
      this.addXP(20, `Nỗ lực thi thử Quiz ${domainsLabel}`);
    }
  },

  toggleTheme() {
    const current = this.getTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(this.KEYS.THEME, next);
    document.documentElement.setAttribute('data-theme', next);
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) btn.textContent = next === 'dark' ? '🌙' : '☀️';
  },

  // UI Helpers
  updateUserStatsUI() {
    const streakEl = document.getElementById('user-streak-val');
    const xpEl = document.getElementById('user-xp-val');
    if (streakEl) streakEl.textContent = this.getStreak();
    if (xpEl) xpEl.textContent = this.getXP();

    // Render Global Header Language Switcher if present
    const statusContainer = document.querySelector('.user-status');
    if (statusContainer && !document.getElementById('global-lang-switcher')) {
      const switcherHtml = `
        <div id="global-lang-switcher" class="lang-switcher-bar">
          <button class="lang-btn ${this.getLang() === 'VI' ? 'active' : ''}" onclick="AppStore.setLang('VI')">🇻🇳 VI</button>
          <button class="lang-btn ${this.getLang() === 'EN' ? 'active' : ''}" onclick="AppStore.setLang('EN')">🇬🇧 EN</button>
        </div>
      `;
      statusContainer.insertAdjacentHTML('afterbegin', switcherHtml);
    } else if (document.getElementById('global-lang-switcher')) {
      const curLang = this.getLang();
      document.querySelectorAll('#global-lang-switcher .lang-btn').forEach(btn => {
        btn.classList.toggle('active', (curLang === 'EN' && btn.textContent.includes('EN')) || (curLang === 'VI' && btn.textContent.includes('VI')));
      });
    }
  },

  showToast(message) {
    let toast = document.getElementById('app-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'app-toast';
      toast.className = 'toast-notification';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  },

  init() {
    const theme = this.getTheme();
    document.documentElement.setAttribute('data-theme', theme);
    
    document.addEventListener('DOMContentLoaded', () => {
      this.updateUserStatsUI();
      const themeBtn = document.getElementById('theme-toggle-btn');
      if (themeBtn) {
        themeBtn.textContent = theme === 'dark' ? '🌙' : '☀️';
        themeBtn.addEventListener('click', () => this.toggleTheme());
      }
    });
  }
};

AppStore.init();
