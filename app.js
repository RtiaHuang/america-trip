// ── 路由 ──────────────────────────────────────────────────────────────────────

function navigate() {
  const hash = location.hash;
  const pageId = (!hash || hash === '#' || hash === '#/') ? 'home' : hash.replace('#/', '');

  document.querySelectorAll('.page').forEach(p => {
    p.hidden = (p.dataset.page !== pageId);
  });

  // 控制天際線背景顯示/隱藏
  const skylineBg = document.querySelector('.skyline-bg');
  if (skylineBg) {
    skylineBg.style.display = (pageId === 'home') ? 'block' : 'none';
  }

  if (pageId === 'home') {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
    // 內頁用自己的 scroll container，重設到頂部
    const innerPage = document.querySelector(`.page[data-page="${pageId}"] .inner-page`);
    if (innerPage) innerPage.scrollTop = 0;
  }
}

// ── 事件委派 ──────────────────────────────────────────────────────────────────

const ROUTED_SECTIONS = ['flight', 'customs', 'emergency', 'prep', 'packing', 'translate', 'itinerary'];

document.getElementById('app').addEventListener('click', e => {
  // 方塊按鈕 → 有對應頁面的就跳轉
  const card = e.target.closest('[data-section]');
  if (card) {
    const section = card.dataset.section;
    if (ROUTED_SECTIONS.includes(section)) {
      location.hash = '/' + section;
    }
    return;
  }

  // 返回按鈕
  const back = e.target.closest('[data-back]');
  if (back) {
    location.hash = '/';
    return;
  }

  // 時間軸卡片展開/收合（accordion 風格）
  const timelineHeader = e.target.closest('.timeline-header');
  if (timelineHeader) {
    const timelineCard = timelineHeader.closest('.timeline-card');
    if (!timelineCard) return;

    const isExpanded = timelineCard.dataset.expanded === 'true';

    // 關閉所有其他的時間軸卡片
    document.querySelectorAll('.timeline-card').forEach(card => {
      if (card.dataset.expanded === 'true' && card !== timelineCard) {
        card.dataset.expanded = 'false';
      }
    });

    // 切換當前卡片
    timelineCard.dataset.expanded = String(!isExpanded);
    return;
  }

  // 手風琴展開/收合
  const accordionBtn = e.target.closest('.accordion-btn');
  if (accordionBtn) {
    const accordion = accordionBtn.closest('.accordion');
    const accordionId = accordionBtn.dataset.accordion;
    const content = accordion.querySelector('.accordion-content');
    const isExpanded = accordion.dataset.expanded === 'true';

    accordion.dataset.expanded = !isExpanded;
    if (content) {
      content.hidden = isExpanded;
    }
    return;
  }

  // 複選框選中
  const checkbox = e.target.closest('.checklist-check');
  if (checkbox) {
    saveChecklistState();
    return;
  }
});

// ── 行李清單 localStorage ──────────────────────────────────────────────────

function loadChecklistState() {
  const saved = localStorage.getItem('packing-list');
  if (!saved) return;

  const checked = JSON.parse(saved);
  document.querySelectorAll('.checklist-check').forEach((checkbox, idx) => {
    if (checked.includes(idx)) {
      checkbox.checked = true;
    }
  });
}

function saveChecklistState() {
  const checked = [];
  document.querySelectorAll('.checklist-check').forEach((checkbox, idx) => {
    if (checkbox.checked) {
      checked.push(idx);
    }
  });
  localStorage.setItem('packing-list', JSON.stringify(checked));
}

// ── 初始化 ────────────────────────────────────────────────────────────────────

window.addEventListener('hashchange', navigate);
navigate();
loadChecklistState();
