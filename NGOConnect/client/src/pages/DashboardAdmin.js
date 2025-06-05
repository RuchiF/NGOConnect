import React, { useEffect, useState } from "react";
import api from "../api";

const DashboardAdmin = () => {
  const [pendingNgos, setPendingNgos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const fetchPendingNgos = async () => {
    try {
      const res = await api.get("/admin/pending-ngos");
      setPendingNgos(res.data.ngos || []);
    } catch (err) {
      setPendingNgos([]);
    }
  };

  useEffect(() => {
    fetchPendingNgos();
    // eslint-disable-next-line
  }, []);

  const handleAction = async (ngoId, action) => {
    setLoading(true);
    setMsg("");
    setError("");
    try {
      await api.post(`/admin/${action}-ngo/${ngoId}`);
      setMsg(
        `NGO ${action === "approve" ? "approved" : "rejected"} successfully!`
      );
      fetchPendingNgos();
    } catch (err) {
      setError(err?.response?.data?.message || "Action failed. Try again.");
    }
    setLoading(false);
  };

  // Styles
  const pageStyle = {
    minHeight: "100vh",
    height: "100vh",
    background: "#f3f6f9",
    padding: "0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden", // Prevent vertical scrolling
  };

  const cardStyle = {
    background: "#fff",
    borderRadius: 14,
    boxShadow: "0 4px 24px rgba(10,102,194,0.08)",
    padding: "40px 32px 32px 32px",
    width: "100%",
    maxWidth: 600,
    marginTop: 48,
    maxHeight: "calc(100vh - 96px)",
    overflow: "hidden", // Add scroll only inside the card if needed
  };

  const ngoCardStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#f3f6f9",
    borderRadius: 10,
    boxShadow: "0 2px 8px rgba(10,102,194,0.06)",
    padding: "18px 22px",
    marginBottom: 18,
  };

  const btnPrimary = {
    background: "#0a66c2",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "10px 22px",
    fontWeight: 700,
    fontSize: "1rem",
    marginRight: 10,
    cursor: loading ? "not-allowed" : "pointer",
    opacity: loading ? 0.7 : 1,
    transition: "background 0.2s",
    boxShadow: "0 1px 4px rgba(10,102,194,0.08)",
  };

  const btnDanger = {
    background: "#d32f2f",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "10px 22px",
    fontWeight: 700,
    fontSize: "1rem",
    cursor: loading ? "not-allowed" : "pointer",
    opacity: loading ? 0.7 : 1,
    transition: "background 0.2s",
    boxShadow: "0 1px 4px rgba(211,47,47,0.08)",
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2
          style={{
            fontSize: "2rem",
            color: "#0a66c2",
            fontWeight: 800,
            marginBottom: 24,
            letterSpacing: "-1px",
          }}
        >
          <span role="img" aria-label="admin" style={{ marginRight: 8 }}>
            🛡️
          </span>
          Admin Dashboard
        </h2>
        <div
          className="form-title"
          style={{
            fontWeight: 700,
            color: "#2563eb",
            fontSize: "1.15rem",
            marginBottom: 18,
          }}
        >
          Pending NGO Applications
        </div>
        {msg && (
          <div
            className="text-success"
            style={{
              background: "#eafaf1",
              color: "#22c55e",
              borderRadius: 6,
              padding: "8px 0",
              textAlign: "center",
              fontWeight: 500,
              marginBottom: 10,
              fontSize: "1rem",
            }}
          >
            {msg}
          </div>
        )}
        {error && (
          <div
            className="text-error"
            style={{
              background: "#fbe9e7",
              color: "#d32f2f",
              borderRadius: 6,
              padding: "8px 0",
              textAlign: "center",
              fontWeight: 500,
              marginBottom: 10,
              fontSize: "1rem",
            }}
          >
            {error}
          </div>
        )}
        {pendingNgos.length === 0 ? (
          <div style={{ color: "#6b7280", textAlign: "center" }}>
            No pending NGO applications.
          </div>
        ) : (
          <ul className="event-list" style={{ padding: 0, listStyle: "none" }}>
            {pendingNgos.map((ngo) => (
              <li key={ngo._id} className="event-card" style={ngoCardStyle}>
                <div>
                  <div
                    className="event-title"
                    style={{
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      color: "#0a66c2",
                    }}
                  >
                    {ngo.organization || ngo.name}
                  </div>
                  <div style={{ color: "#374151", fontSize: "1rem" }}>
                    {ngo.email}
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => handleAction(ngo._id, "approve")}
                    disabled={loading}
                    style={btnPrimary}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(ngo._id, "reject")}
                    disabled={loading}
                    style={btnDanger}
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DashboardAdmin;
