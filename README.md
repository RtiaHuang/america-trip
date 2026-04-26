# Let's go to America 🇺🇸

媽媽和阿姨專屬的美國旅行手冊。可加到手機主畫面當 App 使用，支援離線瀏覽。

---

## 旅程資訊

- **行程**：台北 → 芝加哥 → 聖路易
- **對象**：媽媽和阿姨
- **製作**：Rita
---

## 本機測試

```bash
cd america-trip
python3 -m http.server 8000
```

瀏覽器開啟 `http://localhost:8000`

> 注意：Service Worker 需要透過 HTTP server 才能正常運作，不能直接開 index.html 檔案。

---

## 部署到 GitHub Pages

1. 在 GitHub 建立新 repo（例如 `america-trip`）
2. 把這個資料夾 push 上去：
   ```bash
   git init
   git add .
   git commit -m "init"
   git remote add origin https://github.com/你的帳號/america-trip.git
   git push -u origin main
   ```
3. 進入 repo 的 **Settings → Pages**，Source 選 `main` branch，Save
4. 幾分鐘後網址會出現在頁面上（格式：`https://你的帳號.github.io/america-trip/`）

---

## 設計系統參考

### 配色

| 變數名 | 色碼 | 用途 |
|---|---|---|
| `--bg-base` | `#FAFAF7` | 主背景（暖白米色） |
| `--bg-card` | `#FFFFFF` | 卡片白 |
| `--bg-soft` | `#F5F0E8` | 圖示底色（柔和米色） |
| `--ink` | `#1C1C1E` | 主文字（沉穩深灰） |
| `--ink-mute` | `#8E8E93` | 次要文字 |
| `--ink-disable` | `#C7C7CC` | 禁用文字、箭頭 |
| `--accent-orange` | `#D85A2C` | 赭橘，主強調 / 緊急 |
| `--accent-green` | `#7B9A6E` | 仙人掌綠，行前 / 行程 |
| `--accent-yellow` | `#E8C547` | 蛋黃，天氣 |
| `--accent-warm` | `#E89B3A` | 暖橘，行李 |
| `--accent-blue` | `#9CB5C4` | 水藍，翻譯 |

### 字級

| 變數名 | 大小 | 用途建議 |
|---|---|---|
| `--fs-xs` | 11px | 標籤、角標 |
| `--fs-sm` | 13px | 輔助說明 |
| `--fs-base` | 15px | 內文 |
| `--fs-lg` | 18px | 小標題 |
| `--fs-xl` | 22px | 標題 |
| `--fs-display` | 30px | 主頁大標 |

---

## 檔案結構

```
america-trip/
├── index.html          主頁
├── styles.css          全域樣式（CSS 變數系統）
├── app.js              主程式
├── manifest.json       PWA 設定
├── service-worker.js   離線快取
├── README.md           本說明文件
├── data/               資料（JSON 等）
└── assets/             圖片資源
    ├── skyline.png     城市天際線
    ├── icon-192.png    App 圖示（待放）
    └── icon-512.png    App 圖示大圖（待放）
```
