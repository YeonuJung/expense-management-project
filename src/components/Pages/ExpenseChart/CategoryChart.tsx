import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  ArcElement,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { useState, useEffect, useMemo, useCallback } from "react";
import moment from "moment";
import { MontlyExpenseRecord } from "../../../types/auth";
import supabase from "../../../api/base";
import { useAuth } from "../../../hooks/useAuth";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  ArcElement
);

const labels: string[] = [
  "식당",
  "카페",
  "쇼핑",
  "문화생활",
  "숙박",
  "교통",
  "기타",
];
const createCenterTextPlugin = (text: string) => {
  return {
    id: "centerText",
    beforeDraw: function (chart: any) {
      if (chart.config.type === "doughnut") {
        const ctx = chart.ctx;
        const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
        const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
        ctx.save();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "36px Spoqa Han Sans";
        ctx.fillStyle = "#10B981";
        ctx.fillText(text, centerX, centerY);
        ctx.restore();
      }
    },
  };
};

function CategoryChart() {
  const [month, setMonth] = useState<string>(
    moment(new Date()).format("YYYY-MM")
  );
  const [priceByCategory, setPriceByCategory] = useState<{
    [key: string]: number;
  }>({});
  const [checkdPriceResult, setCheckdPriceResult] = useState<string>("");
  const session = useAuth();

  const fetchMontlyExpenseRecord = useCallback(async () => {
    const priceByCategory: { [key: string]: number } = {};
    labels.forEach((label) => {
      priceByCategory[label] = 0;
    });
    if (session) {
      const { data } = await supabase
        .from("expenserecord")
        .select("price, date, category")
        .eq("user_id", session.user.id)
        .gte("date", moment(month).startOf("month").format("YYYY-MM-DD"))
        .lte("date", moment(month).endOf("month").format("YYYY-MM-DD"));

      if (data && data.length > 0) {
        data.forEach((record: MontlyExpenseRecord) => {
          if (priceByCategory[record.category]) {
            priceByCategory[record.category] += record.price;
          } else {
            priceByCategory[record.category] = record.price;
          }
        });
      }
    }
    const result = labels.every((label) => priceByCategory[label] === 0)
      ? "지출내역이 없습니다"
      : month;
    setCheckdPriceResult(result);
    setPriceByCategory(priceByCategory);
  }, [session, month]);

  useEffect(() => {
    fetchMontlyExpenseRecord();
  }, [fetchMontlyExpenseRecord]);

  const ChartData = {
    labels,
    datasets: [
      {
        label: "월간 지출내역",
        data: [
          priceByCategory["식당"],
          priceByCategory["카페"],
          priceByCategory["쇼핑"],
          priceByCategory["문화생활"],
          priceByCategory["숙박"],
          priceByCategory["교통"],
          priceByCategory["기타"],
        ],
        backgroundColor: [
          "#d14343",
          "#64B6F7",
          "#FFB020",
          "#5048e5",
          "#10B981",
          "#949cab",
          "#de1ed8",
        ],
        hoverOffset: 15,
      },
    ],
  };
  const options = useMemo(() => {
    return {
      cutout: "50%",
      plugins: {
        legend: {
          labels: {
            font: {
              size: 14,
            },
            padding: 20,
          },
        },
        tooltip: {
          enabled: true,
          intersection: true,
          backgroundColor: "#111827c9",
          titleFont: {
            size: 16,
            weight: "bold" as "bold",
          },
          padding: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,
          },
          bodyFont: {
            size: 14,
          },
          callbacks: {
            label: function (context: any): string {
              let label: string = " " + context.dataset.label;
              if (context.raw !== null && context.raw !== undefined) {
                label += ": " + context.raw.toLocaleString("ko-KR") + " 원";
              } else {
                label += ": 0 원";
              }
              return label;
            },
          },
        },
        centerText: createCenterTextPlugin(checkdPriceResult),
      },
    };
  }, [checkdPriceResult]);

  useEffect(() => {
    const plugin = createCenterTextPlugin(checkdPriceResult);
    ChartJS.register(plugin);

    return () => {
      ChartJS.unregister(plugin);
    };
  }, [checkdPriceResult]);

  const startDate = moment(new Date()).startOf("year").format("YYYY-MM");
  const incresedMonth = [];
  for (let i = 0; i < 12; i++) {
    incresedMonth.push(moment(startDate).add(i, "month").format("YYYY-MM"));
  }
  return (
    <>
      <div className="expenseChart__date-selector-container">
        👉&nbsp;
        <select
          className="expenseChart__date-selector"
          name="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          {incresedMonth.map((date, index) => {
            return (
              <option key={index} value={date}>
                {index + 1}월
              </option>
            );
          })}
        </select>
        &nbsp;👈
      </div>
      <div
        style={{
          width: "100%",
          height: "550px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Chart type="doughnut" data={ChartData} options={options} />
      </div>
    </>
  );
}

export default CategoryChart;
