import React, { useEffect, useState } from "react";
import api from "../api";

const trophyColors = ["#FFD700", "#C0C0C0", "#CD7F32"]; // Gold, Silver, Bronze
const trophyEmojis = ["🥇", "🥈", "🥉"];

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    api
      .get("/analytics/leaderboard")
      .then((res) => {
        setLeaders(res.data.leaderboard || []);
      })
      .catch(() => setLeaders([]));
  }, []);

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 20,
        boxShadow: "0 8px 32px rgba(10,102,194,0.10)",
        padding: "40px 32px 32px 32px",
        maxWidth: 520,
        margin: "48px auto",
        border: "1.5px solid #e0e7ff",
      }}
    >
      <h2
        style={{
          color: "#0A66C2",
          fontWeight: 900,
          marginBottom: 32,
          letterSpacing: 1,
          textAlign: "center",
          fontSize: 32,
        }}
      >
        🏆 Volunteer Leaderboard
      </h2>
      <ol style={{ paddingLeft: 0, listStyle: "none", margin: 0 }}>
        {leaders.length === 0 && (
          <li style={{ textAlign: "center", color: "#6b7280", fontSize: 18 }}>
            No data yet.
          </li>
        )}
        {leaders.map((v, i) => (
          <li
            key={v._id}
            style={{
              display: "flex",
              alignItems: "center",
              background: i < 3 ? trophyColors[i] + "18" : "#f8fafc",
              borderRadius: 14,
              marginBottom: 18,
              padding: "18px 28px",
              boxShadow:
                i < 3 ? `0 2px 12px ${trophyColors[i]}33` : "0 1px 4px #e5e7eb",
              fontWeight: i < 3 ? 800 : 500,
              fontSize: i === 0 ? 22 : 18,
              color: "#232946",
              border:
                i < 3 ? `2px solid ${trophyColors[i]}` : "1px solid #e0e7ff",
              transition: "box-shadow 0.2s",
            }}
          >
            <span style={{ width: 32, textAlign: "center", marginRight: 18 }}>
              {i < 3 ? (
                <span
                  style={{
                    fontSize: 30,
                    color: trophyColors[i],
                    filter: "drop-shadow(0 2px 4px #0001)",
                  }}
                  title={["Gold", "Silver", "Bronze"][i]}
                >
                  {trophyEmojis[i]}
                </span>
              ) : (
                <span style={{ fontWeight: 700, color: "#b0b3b8" }}>
                  {i + 1}
                </span>
              )}
            </span>
            <span style={{ flex: 1, fontWeight: 700, fontSize: 18 }}>
              {v.name}
              <span
                style={{
                  color: "#0A66C2",
                  fontWeight: 600,
                  marginLeft: 10,
                  fontSize: 15,
                  background: "#e0e7ff",
                  borderRadius: 8,
                  padding: "2px 10px",
                }}
              >
                {v.eventsCount} {v.eventsCount === 1 ? "event" : "events"}
              </span>
            </span>
            <span
              style={{
                background: "#f0fdfa",
                borderRadius: 8,
                padding: "4px 14px",
                fontSize: 15,
                color: "#0A66C2",
                marginLeft: 12,
                fontFamily: "monospace",
                letterSpacing: 0.5,
              }}
            >
              {v.email}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;
