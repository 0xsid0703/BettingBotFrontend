/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { getRaceHorseScores } from "../../apis";
import { getDateString } from "../../utils";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  cornerRadius: 10,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      beginAtZero: true,
      ticks: {
        color: "#667085",
      },
      border: {
        color: "#667085",
      },
    },
    y: {
      grid: {
        display: true,
        color: "#98A2B3",
        offset: false,
      },
      border: {
        dash: [5, 5],
        color: "#667085",
        offset: 5
      },
      ticks: {
        color: "#667085",
      },
    },
  },
};

const PredictScoreChart = ({ startDate, venue, number }) => {
  const [show, setShow] = useState(false);
  const hiddenClass = show ? "" : "hidden";
  const [scores, setScores] = useState ()
  const [labels, setLabels] = useState ()
  const [data, setData] = useState ()

  const initialize = useCallback(async() => {
    if (startDate === undefined) return
    
    if (number > 0 && venue !== "") {
        try {
            const resp = await getRaceHorseScores(getDateString(startDate), venue, number)
            console.log (resp, "LLL")
            setScores (resp)
        } catch (e) {
            console.log (e)
        }
    }
}, [startDate, venue, number])

    useEffect(() => {
        initialize ()
    }, [initialize])

    useEffect (() => {
        if (!scores || (scores && Object.keys(scores).length == 0)) return
        const tmpLabels = Object.keys(scores)
        setLabels (tmpLabels)
        const tmpData = {
            labels: tmpLabels,
            datasets: [
            {
                label: "",
                data: Object.keys(scores).map((horseName) => (scores[horseName]).toFixed(2)),
                borderWidth: 0,
                backgroundColor: "#2E90FA",
                borderRadius: 10,
                borderOffset: 50
            },
            ],
        };
        console.log (tmpData, ">>>>>")
        setData (tmpData)
    }, [scores])
    
  
    return (
        <div className="p-6 bg-pink-1 w-full border rounded-[10px] border-grey-2">
            <div className="mb-6">
                <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="chart-dropdown-button"
                type="button"
                onClick={() => setShow(!show)}
                >
                Form Score{" "}
                <svg
                    className="w-2 h-2 mr-3 ml-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                    />
                </svg>
                </button>
                <div
                id="dropdown"
                className={
                    `absolute z-10 ${hiddenClass} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 w-[200px] mt-2`
                }
                >
                <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                >
                    <li>
                    <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        Dashboard
                    </a>
                    </li>
                    <li>
                    <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        Settings
                    </a>
                    </li>
                    <li>
                    <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        Earnings
                    </a>
                    </li>
                    <li>
                    <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        Sign out
                    </a>
                    </li>
                </ul>
                </div>
            </div>
            {
                data &&
                <Bar options={options} data={data} />
            }
            {
                !data &&
                <div className="h-[450px]">
                <Skeleton
                    baseColor="#EAECF0"
                    style={{ height: "100%" }}
                    highlightColor="#D9D9D9"
                />
                </div>
            }
        </div>
    );
};

export default PredictScoreChart;
