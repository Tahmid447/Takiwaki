## Takiwaki Lesson Progress Dashboard

This is a simple static dashboard for visualizing lesson progress using plain HTML, Tailwind CSS (from CDN), and Chart.js (from CDN).  
It is designed to be deployed on Vercel and updated easily via GitHub.

---

### How to view locally

- Open `index.html` directly in your browser (double-click it or drag it into a browser window).
- No build step or server is required.

---

### How the data works

All lesson data lives in `index.html` inside the JavaScript block:

- The individual lessons are defined in the `lessonData` array:

```js
const lessonData = [
  { id: 1, date: "2024-10-14", count: 1, note: "" },
  // ...
];
```

- `count: 1` means a full lesson, `count: 0.5` means a half lesson.

- The total purchased lessons are controlled with:

```js
const totalPurchasedLessons = 50;
```

From these values, the dashboard **automatically calculates**:

- Total completed lessons
- Remaining lessons
- Completion rate (percentage)
- Date range shown under the main title (from the earliest to latest lesson date)

You only need to:

- Add new entries to `lessonData` for new lessons.
- Update `totalPurchasedLessons` if you sell more lessons (e.g. 60 instead of 50).

Everything else will update automatically on refresh.

---

### Updating the dashboard (with Git + GitHub)

Typical update flow:

1. Edit `index.html` (usually just `lessonData` and `totalPurchasedLessons`).
2. In your terminal, from this folder:

```bash
git add index.html
git commit -m "Update lesson data"
git push
```

3. Vercel will automatically deploy the new version.

You can also edit `index.html` directly in the GitHub web UI and save; Vercel will redeploy from there as well.

---

### Deployment on Vercel (summary)

- This repo is connected to Vercel as a static site.
- The entrypoint is `index.html` in the repo root.
- Every push to the main branch triggers a new deployment.

