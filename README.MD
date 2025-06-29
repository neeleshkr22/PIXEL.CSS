# 🎨 pixel.css

![Badge](https://img.shields.io/badge/built_with-Next.js-blue?style=for-the-badge)
![Badge](https://img.shields.io/badge/tech_stack-React%2C%20TypeScript%2C%20Tailwind-orange?style=for-the-badge)
![Badge](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

> **pixel.css** is a powerful web application that converts any image into pixel art using **pure HTML and CSS**. It transforms photos into retro-style pixel visuals by rendering each pixel as a `div` — fully customizable and entirely client-side.

---

## 🚀 Live Demo

👉 [Click here to try it now](https://your-live-link.com)

---

## ✨ Features

- ✅ **Up to 512x512 grid resolution**
- 🎚️ **Adjustable pixel size (1px - 10px)**
- 🎨 **Optional color quantization** for palette reduction
- ⚡ **Real-time CSS rendering**
- 📋 **Copy or Download HTML + CSS**
- 🔐 **100% client-side image processing**

---

## 🧱 Tech Stack

- **Next.js 15 (App Router)**
- **React 18 + TypeScript**
- **Tailwind CSS** for styling
- **shadcn/ui** for component design
- **Lucide React** icons
- **Canvas + ImageData API** for processing

---

## 🧠 How It Works

1. Image uploaded → Converted to Base64 using FileReader
2. Drawn on a Canvas with smoothing disabled
3. Pixel color data extracted using `getImageData()`
4. HTML `div`s generated for every pixel with inline styles
5. CSS generated to style layout and pixels

---

## 📸 Screenshots

<!-- Optionally insert screenshots or previews -->

---

## 📦 Installation

```bash
git clone https://github.com/neeleshkr22/pixel.css.git
cd pixel.css
yarn install
yarn dev
```

Visit: [http://localhost:3000](http://localhost:3000)



## 🖼 Example Output

```html
<div class="css-image">
  <div class="pixel" style="left: 4px; top: 8px; background-color: #ff0000;"></div>
</div>
```
```css
.css-image .pixel {
  position: absolute;
  width: 4px;
  height: 4px;
  background-color: red;
}
```



## 👨‍💻 Author

**Neelesh Kumar Rana**  
[LinkedIn](https://linkedin.com/in/your-profile) | [Twitter](https://twitter.com/yourhandle) | [Portfolio](https://yourportfolio.com)

---

## 🙌 Contributions

Pull requests are welcome! If you'd like to improve this project, just fork and PR.

---

