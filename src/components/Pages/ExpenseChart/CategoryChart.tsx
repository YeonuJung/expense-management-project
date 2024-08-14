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
import { useState, useEffect, useMemo } from "react";
import { Data } from "../ExpenseList/ExpenseList";
import moment from "moment";

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
          ctx.font = "32px Arial";
          ctx.fillStyle = "#000";
          ctx.fillText(text, centerX, centerY);
          ctx.restore();
        }
      },
    };
  };
  const ChartData = {
    labels,
    datasets: [
      {
        label: "카테고리별 지출내역",
        data: [300000, 500000, 100000, 250000, 200000, 150000, 100000],
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

function CategoryChart() {
  const [month, setMonth] = useState<string>(
    moment(new Date()).format("YYYY-MM")
  );


  const options = useMemo(() =>{
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
            if (context.raw !== null) {
              label += ": " + context.raw.toLocaleString("ko-KR") + " 원";
            }
            return label;
          },
        },
      },
      centerText: createCenterTextPlugin(month),
    },
  }
}, [month]);

  useEffect(() => {
    const plugin = createCenterTextPlugin(month);
    ChartJS.register(plugin);

 
    return () => {
      ChartJS.unregister(plugin);
    };
  }, [month]);

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
          <option value={"2024-01"}>1월</option>
          <option value={"2024-02"}>2월</option>
          <option value={"2024-03"}>3월</option>
          <option value={"2024-04"}>4월</option>
          <option value={"2024-05"}>5월</option>
          <option value={"2024-06"}>6월</option>
          <option value={"2024-07"}>7월</option>
          <option value={"2024-08"}>8월</option>
          <option value={"2024-09"}>9월</option>
          <option value={"2024-10"}>10월</option>
          <option value={"2024-11"}>11월</option>
          <option value={"2024-12"}>12월</option>
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
