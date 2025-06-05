import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const AnalyticsChart = ({ events }) => {
  const data = {
    labels: events.map(e => e.title),
    datasets: [
      {
        label: "Volunteers Registered",
        data: events.map(e => e.registeredVolunteers ? e.registeredVolunteers.length : 0),
        backgroundColor: "#0A66C2",
      },
    ],
  };

  return (
    <div style={{ background: "#fff", borderRadius: 10, boxShadow: "0 2px 8px rgba(10,102,194,0.08)", padding: 24, marginBottom: 32 }}>
      <h3 style={{ color: "#0A66C2", marginBottom: 16 }}>Event Popularity</h3>
      <Bar data={data} options={{ responsive: true, plugins: { legend: { display: false } } }} />
    </div>
  );
};

export default AnalyticsChart;