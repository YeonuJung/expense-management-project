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
  BarController
);

const groupByMonth = (data: Data[]) => {
  const acc: {
    "2023-01": number;
    "2023-02": number;
    "2023-03": number;
    "2023-04": number;
    "2023-05": number;
    "2023-06": number;
    "2023-07": number;
    "2023-08": number;
    "2023-09": number;
    "2023-10": number;
    "2023-11": number;
    "2023-12": number;
  } = {
    "2023-01": 0,
    "2023-02": 0,
    "2023-03": 0,
    "2023-04": 0,
    "2023-05": 0,
    "2023-06": 0,
    "2023-07": 0,
    "2023-08": 0,
    "2023-09": 0,
    "2023-10": 0,
    "2023-11": 0,
    "2023-12": 0,
  };

  return data.reduce((acc, item) => {
    const month: string = moment(item.date).format("YYYY-MM");
    acc[month as (keyof typeof acc)] += item.price ;
    return acc;
  }, acc);
};

//   const monthlyExpenditures : { [key: string]: number }  = groupByMonth(data);
//   console.log(monthlyExpenditures);

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

const ChartData = {
  labels,
  datasets: [
    {
      type: "line" as const,
      label: "소비내역 피크",
      borderColor: "#10B981",
      borderWidth: 2.5,
      fill: false,
      data: [
        650000, 590000, 800000, 810000, 560000, 550000, 400000, 300000, 0,
        100000, 50000, 100000,
      ],
    },
    {
      type: "bar" as const,
      label: "월별 소비내역",
      backgroundColor: "#5048e5",
      data: [
        650000, 590000, 800000, 810000, 560000, 550000, 400000, 300000, 0,
        100000, 50000, 100000,
      ],
      borderColor: "white",
      borderWidth: 2,
    },
  ],
};
const options = {
  scales: {
    y: {
      beginAtZero: true,
      min: 0,
      max: 1200000,
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
function MontlyChart() {
  return <Chart type="bar" data={ChartData} options={options} />;
}

export default MontlyChart;
