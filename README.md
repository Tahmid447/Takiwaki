## Takiwaki Lesson Progress Dashboard

This repository contains a lesson progress dashboard and a growing teacher/student portal, built for deployment on Vercel.

- The **public dashboard** is implemented as a Next.js app (App Router) under the `app/` directory.
- A future **teacher portal** lives at `/teacher` and will be wired to Supabase.

---

### 1. Running locally

Install dependencies (one time):

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

---

### 2. How the dashboard data works (for now)

In the Next.js home page `app/page.tsx`:

- The individual lessons are defined in the `lessonData` array:

```ts
const lessonData: Lesson[] = [
  { id: 1, date: "2024-10-14", count: 1, note: "" },
  // ...
];
```

- `count: 1` means a full lesson, `count: 0.5` means a half lesson.

- The total purchased lessons are controlled with:

```ts
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

### 3. Teacher portal and Supabase (structure)

- `app/teacher/page.tsx` is a placeholder for your secure teacher control panel.
- `lib/supabaseClient.ts` sets up a Supabase client using environment variables:

```ts
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

#### Steps you will take (once ready):

1. Create a Supabase project.
2. Copy the project URL and anon key into Vercel environment variables.
3. Define tables for users, students, and lessons.
4. Extend the teacher portal page to:
   - Log in as teacher.
   - Create/update students.
   - Record lessons for each student.
5. Create student pages (e.g. `/student/[id]`) that read from Supabase instead of hard-coded data.

The codebase is prepared for this expansion; the current placeholder pages render safely even before Supabase is configured.

---

### 4. Updating and deploying

Typical update flow:

1. Edit files in the `app/` directory (or other source files).
2. In your terminal, from this folder:

```bash
git add .
git commit -m "Describe your change"
git push
```

3. Vercel (connected to this GitHub repo) automatically builds and deploys the new version.


