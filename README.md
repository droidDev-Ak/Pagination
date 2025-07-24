# 🧩 PrimeReact DataTable Task Submission

## ✅ Features Implemented

This project fulfills all the required conditions mentioned in the assignment:

---

### 1️⃣ **No Global Storage of All Rows**

- ❌ Does **NOT** store all rows across pages in any array or state.
- ✅ Each page hit fetches fresh data directly from the API.
- ✅ Avoids memory overload by not caching all rows.

---

### 2️⃣ **API Call on Every Page Visit**

- 🔁 The API is called **every time** a user navigates to a page, even if the same page was visited before.
- ✅ Ensures **fresh data fetch** and avoids relying on local state or memory.

---

### 3️⃣ **Row Selection/Deselection Persistence**

- ✅ Row selection/deselection persists **across page navigation**.
- ✅ If a user selects/unselects rows on page 2, moves to page 3, and comes back — the changes are still there.
- 💾 The persistence is done using an internal state (`selectedProducts`) **without storing entire row data**, just by tracking selected IDs.

---

## 🔧 Tech Stack

- ⚛️ React
- 🌿 PrimeReact (`DataTable`, `Paginator`, `InputSwitch`, `Button`)
- 🌀 TypeScript
- 🎨 Tailwind CSS

---

## 📂 Folder Structure
```yaml
.
├── public/
├── src/
│   ├── assets/
│   ├── Api.js             # JS version of API
│   ├── Api.ts             # TS version of API fetch logic
│   ├── App.tsx            # Main application layout
│   ├── index.css          # Tailwind + custom styles
│   ├── main.tsx           # Entry point
│   ├── Table.tsx          # Final working table component (with pagination + persist)
│   ├── Table.sample.tsx   # Older sample version
│   ├── Table.sample2.tsx  # Another version for testing
│   └── vite-env.d.ts
├── index.html
├── vite.config.ts
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── eslint.config.js
└── README.md         

---

## 📸 Screenshots (Optional)

_Add screenshots if required showing:_
- Selection persistence across pages
- API calls on each page visit (can be shown via console or network tab)

---

## 👨‍💻 Developer Info

> 🧑‍💻 **Submitted by:** Akash Kumar  
> 📧 Email: official.akash203@gmail.com
> 🔗 GitHub: https://github.com/droidDev-Ak  
> 🌐 Portfolio: https://portfolio-new-one-orpin.vercel.app

---

