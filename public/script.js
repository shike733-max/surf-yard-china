const categoryMap = {
  全部: ["全部"],
  冲浪板: ["全部", "长板", "短板", "鱼板", "软板"],
  陆地冲浪板: ["全部", "陆冲板", "桥架", "轮子"],
  配件: ["全部", "fin", "冲浪板蜡", "冲浪板包"],
  冲浪湿衣: ["全部", "湿衣", "冲浪裤", "女生比基尼"],
};

const mainCategories = Object.keys(categoryMap);
const postCategories = mainCategories.filter((category) => category !== "全部");
const fallbackPhoto =
  "https://images.unsplash.com/photo-1528150177508-7cc0c36cda5c?auto=format&fit=crop&w=1200&q=80";

let listings = [
  {
    id: crypto.randomUUID(),
    title: "JS Monsta Box 5'10 进阶短板",
    category: "冲浪板",
    subtype: "短板",
    city: "深圳",
    price: 2600,
    size: "5'10 x 19 1/4",
    condition: "轻微使用痕迹",
    seller: "阿泽",
    contact: "WeChat: aze_surf",
    trade: true,
    photo: "https://images.unsplash.com/photo-1455729552865-3658a5d39692?auto=format&fit=crop&w=1200&q=85",
    description: "大鹏和惠州浪点常用板，板底干净，尾部有一次专业补伤，送一套FCS尾舵。",
  },
  {
    id: crypto.randomUUID(),
    title: "9'2 单鳍长板 鼻乘友好",
    category: "冲浪板",
    subtype: "长板",
    city: "三亚",
    price: 4200,
    size: "9'2 x 22 7/8",
    condition: "正常使用痕迹",
    seller: "Lina",
    contact: "电话: 138-0000-5199",
    trade: false,
    photo: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=85",
    description: "后海店内自用板，适合小浪日和练习走板。可约后海当面验板。",
  },
  {
    id: crypto.randomUUID(),
    title: "Retro Fish 5'6 双鳍鱼板",
    category: "冲浪板",
    subtype: "鱼板",
    city: "厦门",
    price: 3100,
    size: "5'6 x 20 3/4",
    condition: "几乎全新",
    seller: "岛外老陈",
    contact: "WeChat: fishxiamen",
    trade: true,
    photo: "https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?auto=format&fit=crop&w=1200&q=85",
    description: "只下水三次，浮力足，适合厦门冬天小浪。接受同价位中长板交换。",
  },
  {
    id: crypto.randomUUID(),
    title: "8'0 软顶教学板",
    category: "冲浪板",
    subtype: "软板",
    city: "青岛",
    price: 980,
    size: "8'0",
    condition: "正常使用痕迹",
    seller: "北岸冲浪",
    contact: "shop@northsurf.cn",
    trade: false,
    photo: "https://images.unsplash.com/photo-1528150177508-7cc0c36cda5c?auto=format&fit=crop&w=1200&q=85",
    description: "教学换新出清，板面无进水，适合入门练习或亲子体验。",
  },
  {
    id: crypto.randomUUID(),
    title: "SmoothStar 32.5 城市陆冲板",
    category: "陆地冲浪板",
    subtype: "陆冲板",
    city: "杭州",
    price: 1280,
    size: "32.5寸",
    condition: "轻微使用痕迹",
    seller: "小羊",
    contact: "WeChat: landflow",
    trade: true,
    photo: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=1200&q=85",
    description: "练泵浪和转向很好用，桥位正常，无裂纹。可换Carver或YOW。",
  },
  {
    id: crypto.randomUUID(),
    title: "FCS II Performer fin 套装",
    category: "配件",
    subtype: "fin",
    city: "广州",
    price: 420,
    size: "Medium",
    condition: "几乎全新",
    seller: "Kiki",
    contact: "WeChat: kiki_wave",
    trade: false,
    photo: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=85",
    description: "只用过一次，适合多数短板和鱼板，广州可自提。",
  },
  {
    id: crypto.randomUUID(),
    title: "Ocean & Earth 冲浪板包",
    category: "配件",
    subtype: "冲浪板包",
    city: "上海",
    price: 560,
    size: "6'0",
    condition: "正常使用痕迹",
    seller: "江湾SUP",
    contact: "WeChat: sup_sh",
    trade: false,
    photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
    description: "短途旅行板包，拉链顺滑，内侧无破损，可放短板和鱼板。",
  },
  {
    id: crypto.randomUUID(),
    title: "Billabong 3/2mm 女款湿衣",
    category: "冲浪湿衣",
    subtype: "湿衣",
    city: "万宁",
    price: 690,
    size: "S",
    condition: "轻微使用痕迹",
    seller: "Momo",
    contact: "WeChat: momo_surf",
    trade: true,
    photo: "https://images.unsplash.com/photo-1541417904950-b855846fe074?auto=format&fit=crop&w=1200&q=85",
    description: "春秋下水刚好，领口和袖口状态良好，接受同尺码女生比基尼交换。",
  },
  {
    id: crypto.randomUUID(),
    title: "Roxy 女生比基尼套装",
    category: "冲浪湿衣",
    subtype: "女生比基尼",
    city: "三亚",
    price: 260,
    size: "M",
    condition: "几乎全新",
    seller: "Nana",
    contact: "WeChat: nana_wave",
    trade: false,
    photo: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=85",
    description: "运动型剪裁，适合冲浪和桨板，只穿过一次。",
  },
];

let siteContent = {
  hero: {
    title: "二手冲浪装备，直接找到合适的人。",
    description: "冲浪板、陆地冲浪板、fin、板蜡、板包和湿衣集中交易。按城市、价格、品类筛选，直接联系卖家。",
  },
};

let activeCategory = "全部";
let activeSubtype = "全部";
let saved = new Set();
let cardObserverRef = null;

const boardGrid = document.querySelector("#boardGrid");
const categoryTabs = document.querySelector("#categoryTabs");
const subtypeTabs = document.querySelector("#subtypeTabs");
const cityFilter = document.querySelector("#cityFilter");
const priceFilter = document.querySelector("#priceFilter");
const tradeFilter = document.querySelector("#tradeFilter");
const searchInput = document.querySelector("#searchInput");
const marketSearchInput = document.querySelector("#marketSearchInput");
const clearSearchBtn = document.querySelector("#clearSearchBtn");
const searchResultCount = document.querySelector("#searchResultCount");
const resultMeta = document.querySelector("#resultMeta");
const emptyState = document.querySelector("#emptyState");
const detailDialog = document.querySelector("#detailDialog");
const detailContent = document.querySelector("#detailContent");
const postDialog = document.querySelector("#postDialog");
const postForm = document.querySelector("#postForm");
const postCategory = document.querySelector("#postCategory");
const postSubtype = document.querySelector("#postSubtype");
const toast = document.querySelector("#toast");

function money(value) {
  return `¥${Number(value).toLocaleString("zh-CN")}`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function applyHeroBackground(url) {
  document.querySelector(".hero").style.backgroundImage =
    `linear-gradient(90deg, rgba(9, 26, 32, 0.78) 0%, rgba(9, 26, 32, 0.54) 48%, rgba(9, 26, 32, 0.18) 100%), url("${url}")`;
  localStorage.setItem("surfYardHeroImage", url);
}

function restoreHeroBackground() {
  const savedHero = localStorage.getItem("surfYardHeroImage");
  if (savedHero) {
    applyHeroBackground(savedHero);
  }
}

function renderSiteContent() {
  const heroTitle = document.querySelector(".hero-copy h1");
  const heroDescription = document.querySelector(".hero-copy p");
  if (heroTitle && siteContent.hero?.title) heroTitle.textContent = siteContent.hero.title;
  if (heroDescription && siteContent.hero?.description) heroDescription.textContent = siteContent.hero.description;
}

async function loadSiteContent() {
  try {
    const response = await fetch("/api/content", { cache: "no-store" });
    if (!response.ok) return;
    const content = await response.json();
    siteContent = {
      ...siteContent,
      ...content,
      hero: { ...siteContent.hero, ...(content.hero || {}) },
    };
    if (Array.isArray(content.listings) && content.listings.length) {
      listings = content.listings.map((item) => ({
        id: item.id || crypto.randomUUID(),
        trade: Boolean(item.trade),
        ...item,
      }));
    }
  } catch {
    // Static preview still works without the content API.
  }
}

function initMotion() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealTargets = document.querySelectorAll(".hero-copy, .controls, .market-layout");
  const cards = document.querySelectorAll(".board-card");
  const images = document.querySelectorAll(".photo img");

  images.forEach((image) => {
    if (image.complete) {
      image.classList.add("loaded");
    } else {
      image.addEventListener("load", () => image.classList.add("loaded"), { once: true });
    }
  });

  if (reduceMotion) {
    revealTargets.forEach((element) => element.classList.add("is-visible"));
    cards.forEach((card) => card.classList.add("is-visible"));
    return;
  }

  document.documentElement.classList.add("motion-ready");
  revealTargets.forEach((element) => element.classList.add("motion-reveal"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
  );

  revealTargets.forEach((element) => revealObserver.observe(element));

  cardObserverRef = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          cardObserverRef.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );

  cards.forEach((card, index) => {
    card.style.setProperty("--stagger", index % 8);
    cardObserverRef.observe(card);
  });

  const hero = document.querySelector(".hero");
  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (ticking || !hero) return;
      ticking = true;
      requestAnimationFrame(() => {
        const offset = Math.min(window.scrollY * 0.04, 18);
        hero.style.backgroundPosition = `center calc(48% + ${offset}px)`;
        ticking = false;
      });
    },
    { passive: true },
  );
}

function prepareDynamicCards() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cards = document.querySelectorAll(".board-card");

  document.querySelectorAll(".photo img").forEach((image) => {
    if (image.complete) {
      image.classList.add("loaded");
    } else {
      image.addEventListener("load", () => image.classList.add("loaded"), { once: true });
    }
  });

  cards.forEach((card, index) => {
    card.style.setProperty("--stagger", index % 8);
    if (reduceMotion) {
      card.classList.add("is-visible");
    } else if (cardObserverRef) {
      cardObserverRef.observe(card);
    }
  });
}

function seedCategories() {
  categoryTabs.innerHTML = mainCategories
    .map(
      (category) =>
        `<button class="chip" type="button" role="tab" aria-selected="${category === activeCategory}" data-category="${category}">${category}</button>`,
    )
    .join("");
}

function seedSubtypes() {
  const subtypes = categoryMap[activeCategory] || ["全部"];
  activeSubtype = subtypes.includes(activeSubtype) ? activeSubtype : "全部";
  subtypeTabs.innerHTML = subtypes
    .map(
      (subtype) =>
        `<button class="tip" type="button" aria-pressed="${subtype === activeSubtype}" data-subtype="${subtype}">${subtype}</button>`,
    )
    .join("");
}

function seedPostForm() {
  postCategory.innerHTML = postCategories.map((category) => `<option>${category}</option>`).join("");
  updatePostSubtypes();
}

function updatePostSubtypes() {
  const subtypes = categoryMap[postCategory.value].filter((subtype) => subtype !== "全部");
  postSubtype.innerHTML = subtypes.map((subtype) => `<option>${subtype}</option>`).join("");
}

function seedCities() {
  const cities = [...new Set(listings.map((item) => item.city))].sort((a, b) => a.localeCompare(b, "zh-CN"));
  cityFilter.innerHTML = `<option value="全部">全部城市</option>${cities
    .map((city) => `<option value="${city}">${city}</option>`)
    .join("")}`;
}

function normalizeSearch(value) {
  return String(value || "")
    .trim()
    .toLocaleLowerCase("zh-CN");
}

function getSearchQuery() {
  return normalizeSearch(marketSearchInput.value || searchInput.value);
}

function getListingSearchText(item) {
  return [
    item.title,
    item.brand,
    item.category,
    item.subtype,
    item.city,
    item.location,
    item.size,
    item.condition,
    item.seller,
    item.description,
    ...(item.tags || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase("zh-CN");
}

function syncSearchInputs(value, source) {
  if (source !== searchInput) searchInput.value = value;
  if (source !== marketSearchInput) marketSearchInput.value = value;
  clearSearchBtn.classList.toggle("visible", Boolean(value.trim()));
}

function getFilteredListings() {
  const query = getSearchQuery();
  const city = cityFilter.value;
  const [min, max] = priceFilter.value === "all" ? [0, Infinity] : priceFilter.value.split("-").map(Number);

  return listings.filter((item) => {
    const text = getListingSearchText(item);
    const categoryMatch = activeCategory === "全部" || item.category === activeCategory;
    const subtypeMatch = activeSubtype === "全部" || item.subtype === activeSubtype;
    const cityMatch = city === "全部" || item.city === city;
    const priceMatch = item.price >= min && item.price <= max;
    const tradeMatch = !tradeFilter.checked || item.trade;
    const searchMatch = !query || text.includes(query);
    return categoryMatch && subtypeMatch && cityMatch && priceMatch && tradeMatch && searchMatch;
  });
}

function renderListings() {
  const filtered = getFilteredListings();
  document.querySelector("#watchCount").textContent = saved.size;
  const query = getSearchQuery();
  const resultText = query ? `找到 ${filtered.length} 件装备` : `找到 ${filtered.length} 件装备`;
  resultMeta.textContent = resultText;
  searchResultCount.textContent = resultText;
  clearSearchBtn.classList.toggle("visible", Boolean(query));
  emptyState.hidden = filtered.length > 0;

  boardGrid.innerHTML = filtered
    .map(
      (item) => `
        <article class="board-card">
          <div class="photo">
            <img src="${item.photo || fallbackPhoto}" alt="${item.title}" loading="lazy" />
            <div class="badge-row">
              <span class="badge">${item.category}</span>
              <span class="badge light">${item.subtype}</span>
              ${item.trade ? '<span class="badge">可交换</span>' : ""}
            </div>
          </div>
          <div class="card-body">
            <div class="price-row">
              <span class="price">${money(item.price)}</span>
              <span>${item.city}</span>
            </div>
            <h3>${item.title}</h3>
            <div class="meta-row">
              <span>${item.size}</span>
              <span>${item.condition}</span>
            </div>
            <p>${item.description}</p>
            <div class="actions">
              <button class="ghost-btn" type="button" data-action="detail" data-id="${item.id}">联系卖家</button>
              <button class="ghost-btn save-btn" type="button" data-action="save" data-id="${item.id}" aria-label="收藏 ${item.title}">${
                saved.has(item.id) ? "♥" : "♡"
              }</button>
            </div>
          </div>
        </article>`,
    )
    .join("");

  prepareDynamicCards();
}

function openDetail(id) {
  const item = listings.find((board) => board.id === id);
  if (!item) return;

  detailContent.innerHTML = `
    <div class="detail-grid">
      <img src="${item.photo || fallbackPhoto}" alt="${item.title}" />
      <div>
        <span class="badge">${item.category}</span>
        <span class="badge light">${item.subtype}</span>
        <h2>${item.title}</h2>
        <p class="price">${money(item.price)}</p>
        <p>${item.description}</p>
        <div class="meta-row">
          <span>${item.city}</span>
          <span>${item.size}</span>
          <span>${item.condition}</span>
        </div>
        <div class="contact-box">
          <strong>卖家：${item.seller}</strong>
          <span>${item.contact}</span>
          <a href="mailto:${item.contact.includes("@") ? item.contact : "hello@surfyard.cn"}?subject=咨询：${encodeURIComponent(
            item.title,
          )}">发送邮件</a>
          <button type="button" data-copy="${item.contact}">复制联系方式</button>
        </div>
      </div>
    </div>`;
  detailDialog.showModal();
}

function readPhoto(file) {
  return new Promise((resolve) => {
    if (!file) {
      resolve(fallbackPhoto);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

categoryTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  activeSubtype = "全部";
  seedCategories();
  seedSubtypes();
  renderListings();
});

subtypeTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-subtype]");
  if (!button) return;
  activeSubtype = button.dataset.subtype;
  seedSubtypes();
  renderListings();
});

boardGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  if (button.dataset.action === "detail") {
    openDetail(button.dataset.id);
  }
  if (button.dataset.action === "save") {
    saved.has(button.dataset.id) ? saved.delete(button.dataset.id) : saved.add(button.dataset.id);
    renderListings();
  }
});

detailContent.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-copy]");
  if (!button) return;
  await navigator.clipboard.writeText(button.dataset.copy);
  showToast("联系方式已复制");
});

document.querySelector("#openPostBtn").addEventListener("click", () => postDialog.showModal());
document.querySelector("#heroPostBtn").addEventListener("click", () => postDialog.showModal());
document.querySelector("#closePostBtn").addEventListener("click", () => postDialog.close());
document.querySelector("#wishlistBtn").addEventListener("click", () => {
  showToast(saved.size ? `你收藏了 ${saved.size} 件商品` : "还没有收藏商品");
});
postCategory.addEventListener("change", updatePostSubtypes);

[cityFilter, priceFilter, tradeFilter].forEach((control) => {
  control.addEventListener("input", renderListings);
  control.addEventListener("change", renderListings);
});

[searchInput, marketSearchInput].forEach((input) => {
  input.addEventListener("input", () => {
    syncSearchInputs(input.value, input);
    renderListings();
  });
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      syncSearchInputs(input.value, input);
      renderListings();
      marketSearchInput.focus();
    }
  });
});

clearSearchBtn.addEventListener("click", () => {
  syncSearchInputs("", null);
  renderListings();
  marketSearchInput.focus();
});

postForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(postForm);
  const photo = await readPhoto(formData.get("photo"));
  listings.unshift({
    id: crypto.randomUUID(),
    title: formData.get("title"),
    category: formData.get("category"),
    subtype: formData.get("subtype"),
    city: formData.get("city"),
    price: Number(formData.get("price")),
    size: formData.get("size"),
    condition: formData.get("condition"),
    seller: formData.get("seller"),
    contact: formData.get("contact"),
    trade: formData.has("trade"),
    photo,
    description: formData.get("description"),
  });
  postForm.reset();
  updatePostSubtypes();
  postDialog.close();
  seedCities();
  renderListings();
  showToast("发布成功，新的商品已在列表顶部");
});

async function boot() {
  await loadSiteContent();
  renderSiteContent();
  seedCategories();
  seedSubtypes();
  seedPostForm();
  seedCities();
  restoreHeroBackground();
  renderListings();
  initMotion();
}

boot();
