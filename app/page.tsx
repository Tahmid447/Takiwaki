"use client";

import React, { useEffect, useMemo, useRef } from "react";

type Lesson = {
  id: number;
  date: string;
  count: number;
  note: string;
};

const lessonData: Lesson[] = [
  { id: 1, date: "2024-10-14", count: 1, note: "" },
  { id: 2, date: "2024-10-18", count: 1, note: "" },
  { id: 3, date: "2024-10-19", count: 1, note: "" },
  { id: 4, date: "2024-10-22", count: 1, note: "" },
  { id: 5, date: "2024-10-23", count: 1, note: "" },
  { id: 6, date: "2024-10-25", count: 1, note: "" },
  { id: 7, date: "2024-10-27", count: 1, note: "" },
  { id: 8, date: "2024-11-05", count: 1, note: "" },
  { id: 9, date: "2024-11-07", count: 1, note: "" },
  { id: 10, date: "2024-11-13", count: 1, note: "" },
  { id: 11, date: "2024-11-18", count: 1, note: "" },
  { id: 12, date: "2024-11-24", count: 1, note: "" },
  { id: 13, date: "2024-11-25", count: 1, note: "" },
  { id: 14, date: "2024-11-26", count: 1, note: "" },
  { id: 15, date: "2024-11-29", count: 1, note: "" },
  { id: 16, date: "2024-12-01", count: 1, note: "" },
  { id: 17, date: "2024-12-02", count: 1, note: "" },
  { id: 18, date: "2024-12-09", count: 1, note: "" },
  { id: 19, date: "2024-12-13", count: 1, note: "" },
  { id: 20, date: "2024-12-14", count: 1, note: "" },
  { id: 21, date: "2024-12-15", count: 1, note: "" },
  { id: 22, date: "2024-12-21", count: 0.5, note: "ハーフレッスン" },
  { id: 23, date: "2025-01-08", count: 1, note: "" },
  { id: 24, date: "2025-01-18", count: 1, note: "" },
  { id: 25, date: "2025-01-25", count: 1, note: "" },
  { id: 26, date: "2025-01-26", count: 1, note: "" },
  { id: 27, date: "2025-01-28", count: 1, note: "" },
  { id: 28, date: "2025-01-31", count: 1, note: "" },
  { id: 29, date: "2025-02-01", count: 1, note: "" },
  { id: 30, date: "2025-02-03", count: 1, note: "" },
  { id: 31, date: "2025-02-04", count: 1, note: "" },
  { id: 32, date: "2025-02-05", count: 1, note: "" },
  { id: 33, date: "2025-02-07", count: 1, note: "" },
  { id: 34, date: "2025-02-08", count: 1, note: "" },
  { id: 35, date: "2025-02-09", count: 1, note: "" },
  { id: 36, date: "2025-02-10", count: 1, note: "" },
  { id: 37, date: "2025-02-11", count: 1, note: "" },
  { id: 38, date: "2025-02-12", count: 1, note: "" },
  { id: 39, date: "2025-02-13", count: 1, note: "" },
  { id: 40, date: "2025-02-15", count: 1, note: "" },
  { id: 41, date: "2025-02-16", count: 1, note: "" },
  { id: 42, date: "2025-02-18", count: 1, note: "" },
  { id: 43, date: "2025-02-22", count: 0.5, note: "ハーフレッスン" },
  { id: 44, date: "2025-02-24", count: 0.5, note: "ハーフレッスン" }
];

const totalPurchasedLessons = 50;

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${date.getMonth() + 1}月${date.getDate()}日`;
};

const formatFullDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
};

export default function HomePage() {
  const {
    totalCompleted,
    remaining,
    completionRate,
    startDate,
    endDate,
    trajectoryData,
    phase1Count,
    phase2Count
  } = useMemo(() => {
    const totalCompletedLessons = lessonData.reduce(
      (sum, item) => sum + item.count,
      0
    );
    const remainingLessons = totalPurchasedLessons - totalCompletedLessons;
    const completionRateCalc = Math.round(
      (totalCompletedLessons / totalPurchasedLessons) * 100
    );

    const sortedByDate = [...lessonData].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    const start = sortedByDate[0]?.date;
    const end = sortedByDate[sortedByDate.length - 1]?.date;

    let cumulative = 0;
    const trajectory = lessonData.map((item) => {
      cumulative += item.count;
      return {
        x: item.date,
        y: cumulative,
        displayDate: formatDate(item.date)
      };
    });

    const phase1Lessons = lessonData.filter(
      (l) => new Date(l.date) < new Date("2025-01-01")
    );
    const phase2Lessons = lessonData.filter(
      (l) => new Date(l.date) >= new Date("2025-01-01")
    );

    const phase1CountCalc = phase1Lessons.reduce(
      (sum, item) => sum + item.count,
      0
    );
    const phase2CountCalc = phase2Lessons.reduce(
      (sum, item) => sum + item.count,
      0
    );

    return {
      totalCompleted: totalCompletedLessons,
      remaining: remainingLessons,
      completionRate: completionRateCalc,
      startDate: start,
      endDate: end,
      trajectoryData: trajectory,
      phase1Count: phase1CountCalc,
      phase2Count: phase2CountCalc
    };
  }, []);

  const comparisonCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const trajectoryCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Lazy access to Chart from global
    const ChartGlobal = (window as any).Chart;
    if (!ChartGlobal) return;

    if (comparisonCanvasRef.current) {
      const ctxComparison = comparisonCanvasRef.current.getContext("2d");
      if (ctxComparison) {
        new ChartGlobal(ctxComparison, {
          type: "bar",
          data: {
            labels: ["前半 (10/14 - 12/31)", "後半 (1/1 - 2/25)"],
            datasets: [
              {
                label: "完了レッスン数",
                data: [phase1Count, phase2Count],
                backgroundColor: ["#E5E5E5", "#CCD5AE"],
                borderColor: ["#D1D1D1", "#B3BD95"],
                borderWidth: 1,
                borderRadius: 8,
                barPercentage: 0.6
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: function (context: any) {
                    return `完了: ${context.raw}回`;
                  }
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                title: { display: true, text: "回数" }
              }
            }
          }
        });
      }
    }

    if (trajectoryCanvasRef.current) {
      const ctxTrajectory = trajectoryCanvasRef.current.getContext("2d");
      if (ctxTrajectory) {
        new ChartGlobal(ctxTrajectory, {
          type: "line",
          data: {
            labels: trajectoryData.map((d) => d.displayDate),
            datasets: [
              {
                label: "累積完了数",
                data: trajectoryData.map((d) => d.y),
                borderColor: "#D4A373",
                backgroundColor: "rgba(212, 163, 115, 0.1)",
                fill: true,
                tension: 0.3,
                pointBackgroundColor: "#fff",
                pointBorderColor: "#D4A373",
                pointRadius: 3,
                pointHoverRadius: 6
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: function (context: any) {
                    return `累計: ${context.raw}回完了`;
                  }
                }
              }
            },
            scales: {
              x: {
                ticks: {
                  maxTicksLimit: 10,
                  autoSkip: true
                }
              },
              y: {
                beginAtZero: true,
                max: 50
              }
            }
          }
        });
      }
    }
  }, [phase1Count, phase2Count, trajectoryData]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="text-center space-y-2 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
          Takiwaki様 レッスン進捗レポート
        </h1>
        <p className="text-gray-500 text-lg">
          {startDate && endDate
            ? `${formatFullDate(startDate)} 〜 ${formatFullDate(endDate)}`
            : "受講期間"}
        </p>
      </header>

      <section className="bg-white p-6 rounded-xl border-l-4 border-[#D4A373] shadow-sm">
        <h2 className="text-xl font-bold mb-3 text-gray-800">
          Takiwakiさんへ：これまでの振り返り
        </h2>
        <p className="leading-relaxed text-gray-600">
          いつもお忙しい中、継続してレッスンをご受講いただき本当にありがとうございます！10月にスタートした全
          {totalPurchasedLessons}
          回のレッスンも、いよいよゴールが見えてきましたね。
          <br />
          <br />
          当初は年内完了を目標にしていましたが、こうしてお互い無理なく、でも確実に前進できている今のペースがとても良い形だと思っています。特に年明け、そして
          <strong className="text-[#D4A373] bg-orange-50 px-1 rounded">
            2月に入ってからの集中力と驚異的なペースアップ
          </strong>
          には本当に驚かされています！
          <br />
          <br />
          ここまでの素晴らしい頑張りを実感していただけるよう、これまでの歩みを分かりやすくまとめました。ぜひ一緒に振り返ってみましょう！
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow card p-6 flex flex-col items-center justify-center text-center">
          <div className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">
            ご購入レッスン数
          </div>
          <div className="text-4xl font-bold text-gray-800">
            {totalPurchasedLessons}
            <span className="text-lg font-normal text-gray-400">回</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow card p-6 flex flex-col items-center justify-center text-center border-b-4 border-[#CCD5AE]">
          <div className="text-[#CCD5AE] text-sm font-bold uppercase tracking-wider mb-1">
            完了済み
          </div>
          <div className="text-5xl font-bold text-gray-800">
            {totalCompleted}
            <span className="text-lg font-normal text-gray-400">回</span>
          </div>
          <div className="text-xs text-gray-400 mt-2">
            達成率 {completionRate}%
          </div>
        </div>

        <div className="bg-[#FDFBF7] rounded-xl shadow card p-6 flex flex-col items-center justify-center text-center">
          <div className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">
            残りレッスン
          </div>
          <div className="text-4xl font-bold text-[#D4A373]">
            {remaining}
            <span className="text-lg font-normal text-gray-400">回</span>
          </div>
          <div className="text-xs text-gray-400 mt-2">ラストスパート！</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow card p-6">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-800">期間別ペース比較</h3>
            <p className="text-sm text-gray-500">
              このセクションでは、学習の前半（年内）と後半（年明け以降）の密度を比較します。
              <br />
              後半、わずか1.5ヶ月で前半2.5ヶ月分と同等のレッスンをこなしており、集中力の高まりがデータに表れています。
            </p>
          </div>
          <div className="relative w-full max-w-[600px] h-[300px] max-h-[350px] mx-auto">
            <canvas ref={comparisonCanvasRef} />
          </div>
          <div className="mt-4 p-3 bg-[#FAFAFA] rounded text-sm text-center">
            <span className="font-bold text-[#CCD5AE]">
              後半の加速が素晴らしいです！
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow card p-6">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-800">
              累積レッスン数（成長の軌跡）
            </h3>
            <p className="text-sm text-gray-500">
              これまでの学習の積み重ねをグラフ化しました。
              <br />
              グラフの傾きが急になっている部分は、集中的に学習された時期を示しています。2月に入ってからの急上昇にご注目ください。
            </p>
          </div>
          <div className="relative w-full max-w-[600px] h-[300px] max-h-[350px] mx-auto">
            <canvas ref={trajectoryCanvasRef} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow card p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-800">受講履歴詳細</h3>
            <p className="text-sm text-gray-500">
              全{" "}
              <span className="font-bold text-[#D4A373]">{totalCompleted}回</span>{" "}
              の詳細な記録です。
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600">
                    No.
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600">
                    日付
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600">
                    カウント
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600">
                    備考
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {lessonData.map((item, index) => {
                  const isHalf = item.count === 0.5;
                  return (
                    <tr
                      key={item.id}
                      className={
                        index % 2 === 0
                          ? "bg-white hover:bg-gray-50"
                          : "bg-[#FAFAFA] hover:bg-gray-50"
                      }
                    >
                      <td className="py-3 px-4 border-b border-gray-100 text-gray-500">
                        {item.id}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-100 font-medium">
                        {formatDate(item.date)}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-100">
                        {isHalf ? (
                          <span className="inline-block px-2 py-1 text-xs font-semibold text-orange-600 bg-orange-100 rounded-full">
                            0.5回
                          </span>
                        ) : (
                          <span className="text-gray-600">1.0回</span>
                        )}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-100 text-gray-400 text-sm">
                        {item.note}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <section className="bg-[#FDFBF7] border-2 border-[#CCD5AE] border-dashed rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">今後のプラン</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          残り
          <span className="font-bold text-[#D4A373] text-xl">
            {remaining}回
          </span>
          です。現在の素晴らしいペースと吸収力を活かし、
          これまでの復習や、より実践的なトピックに挑戦するのもおすすめです。
          <br />
          ご希望の内容があれば、次回のレッスンでお気軽にご相談ください！
        </p>
        <button className="bg-[#4A4A4A] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-gray-700 transition transform hover:-translate-y-1">
          ラストスパート頑張りましょう！
        </button>
      </section>
    </div>
  );
}

