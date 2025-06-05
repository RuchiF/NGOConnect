import React, { useEffect, useState } from "react";
import api from "../api";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    api
      .get("/analytics/leaderboard")
      .then((res) => {
        console.log("Leaderboard API response:", res.data);
        setLeaders(res.data.leaderboard || []);
      })
      .catch((err) => {
        console.error("Leaderboard API error:", err);
        setLeaders([]);
      });
  }, []);

  useEffect(() => {
    console.log("Leaders state updated:", leaders);
  }, [leaders]);

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(10,102,194,0.08)",
        padding: 24,
        maxWidth: 400,
        margin: "32px auto",
      }}
    >
      <h3 style={{ color: "#0A66C2", fontWeight: 700, marginBottom: 16 }}>
        🏆 Volunteer Leaderboard
      </h3>
      <ol style={{ paddingLeft: 20 }}>
        {leaders.length === 0 && <li>No data yet.</li>}
        {leaders.map((v, i) => (
          <li key={v._id} style={{ marginBottom: 10 }}>
            <span style={{ fontWeight: 600 }}>{v.name}</span> — {v.eventsCount}{" "}
            events
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;
