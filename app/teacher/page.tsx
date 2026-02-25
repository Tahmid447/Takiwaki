"use client";

import React from "react";

export default function TeacherPage() {
  return (
    <main className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Teacher Portal</h1>
      <p className="text-gray-600">
        This page will become your secure teacher control panel, where you can:
      </p>
      <ul className="list-disc list-inside text-gray-600 space-y-1">
        <li>Log in with your own username and password.</li>
        <li>Create and manage students (like Takiwaki and others).</li>
        <li>Set total lessons purchased per student.</li>
        <li>Record full or half lessons with dates and notes.</li>
        <li>Automatically update each student&apos;s dashboard view.</li>
      </ul>
      <p className="text-gray-600">
        The next step is to connect this page to Supabase (database and
        authentication). I&apos;ve added the project structure and Supabase
        client so we can wire it up as soon as you create a Supabase project
        and add the environment variables in Vercel.
      </p>
      <p className="text-gray-600">
        For now, your public dashboard remains available at the root URL, and
        this page is just a placeholder at <code>/teacher</code>.
      </p>
    </main>
  );
}

