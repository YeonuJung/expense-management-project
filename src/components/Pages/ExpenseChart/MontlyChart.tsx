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
} from "chart.js";
import { Chart } from "react-chartjs-2";
import moment from "moment";
import { ExpenseRecordForChart } from "../../../types/auth";
import { useMemo } from "react";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

const groupByMonth = (expenseRecord: ExpenseRecordForChart[]) => {
  const acc: {
    "01": number;
    "02": number;
    "03": number;
    "04": number;
    "05": number;
    "06": number;
    "07": number;
    "08": number;
    "09": number;
    "10": number;
    "11": number;
    "12": number;
  } = {
    "01": 0,
    "02": 0,
    "03": 0,
    "04": 0,
    "05": 0,
    "06": 0,
    "07": 0,
    "08": 0,
    "09": 0,
    "10": 0,
    "11": 0,
    "12": 0,
  };
  console.log(expenseRecord);
  return expenseRecord.reduce((acc, data) => {
    const month: string = moment(data.date).format("MM");
    acc[month as keyof typeof acc] += data.price;
    return acc;
  }, acc);
};

const labels: string[] = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

const options = {
  scales: {
    y: {
      beginAtZero: true,
      min: 0,
      max: 1600000,
      ticks: {
        stepSize: 100000,
        callback: function (tickValue: string | number): string {
          return (tickValue as number).toLocaleString("ko-KR") + " 원";
        },
        font: {
          size: 14,
        },
      },
      title: {
        display: true,
        text: "금액",
        font: {
          size: 14,
          weight: "bold" as "bold",
          color: "#6b7280",
        },
        padding: { bottom: 10 },
      },
    },
    x: {
      ticks: {
        font: {
          size: 14,
        },
      },
      title: {
        display: true,
        text: "월별",
        font: {
          size: 14,
          weight: "bold" as "bold",
          color: "#6b7280",
        },
        padding: { top: 10 },
      },
    },
  },
  plugins: {
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
  },
};
interface MontlyChartProps {
  expenseRecord: ExpenseRecordForChart[];
}
function MontlyChart(props: MontlyChartProps) {
  const { expenseRecord } = props;
  
  const monthlyExpenditures: { [key: string]: number } =
    groupByMonth(expenseRecord);
  
  const chartData = useMemo(() => ({
      labels,
      datasets: [
        {
          type: "line" as const,
          label: "지출내역 피크",
          borderColor: "#10B981",
          borderWidth: 2.5,
          fill: false,
          data: Object.keys(monthlyExpenditures)
            .sort()
            .map((key) => monthlyExpenditures[key]),
        },
        {
          type: "bar" as const,
          label: "월별 지출내역",
          backgroundColor: "#5048e5",
          data: Object.keys(monthlyExpenditures)
            .sort()
            .map((key) => monthlyExpenditures[key]),
          borderColor: "white",
          borderWidth: 2,
        },
      ],
  }), [monthlyExpenditures]);

  return <Chart type="bar" data={chartData} options={options} />;
}

export default MontlyChart;
