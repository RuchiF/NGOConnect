import React, { useEffect, useState } from "react";
import api from "../api";
import { getUser } from "../utils";
import styles from "./DashboardNgo.module.css";
import Sidebar from "../components/Sidebar";
import AnalyticsChart from "../components/AnalyticsChart";
import Leaderboard from "../components/Leaderboard"; // <-- Import Leaderboard

// DashboardCard component for analytics
const DashboardCard = ({ label, value }) => (
  <div
    style={{
      background: "#fff",
      borderRadius: 10,
      boxShadow: "0 2px 8px rgba(10,102,194,0.08)",
      padding: 20,
      minWidth: 180,
      flex: 1,
      marginRight: 16,
      marginBottom: 16,
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      maxWidth: 260,
    }}
  >
    <div
      style={{
        fontSize: 28,
        color: "#0A66C2",
        fontWeight: 700,
        minHeight: 34,
        wordBreak: "break-word",
      }}
    >
      {value !== undefined && value !== null && value !== "" ? value : "N/A"}
    </div>
    <div
      style={{
        color: "#6b7280",
        fontWeight: 500,
        marginTop: 4,
      }}
    >
      {label}
    </div>
  </div>
);

const DashboardNgo = () => {
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalVolunteers: 0,
    mostPopularEvent: null,
  });
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const user = getUser();

  // Fetch analytics
  const fetchStats = async () => {
    try {
      const res = await api.get(`/analytics/ngo/${user._id}`);
      setStats(res.data);
    } catch (err) {
      setStats({ totalEvents: 0, totalVolunteers: 0, mostPopularEvent: null });
    }
  };

  // Fetch events
  const fetchEvents = async () => {
    try {
      const res = await api.get("/ngo/events");
      setEvents(res.data.events || []);
    } catch (err) {
      setEvents([]);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchStats();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    setError("");
    try {
      await api.post("/ngo/events", form);
      setMsg("Event created successfully!");
      setForm({ title: "", description: "", date: "", location: "" });
      fetchEvents();
      fetchStats();
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to create event. Try again."
      );
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: 200, minHeight: "100vh" }}>
        <main className={styles.container}>
          <h2 className={styles.header}>NGO Dashboard</h2>

          {/* Analytics Cards */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "stretch",
              marginBottom: 32,
              gap: 0,
            }}
          >
            <DashboardCard
              label="Total Events"
              value={
                typeof stats.totalEvents === "number" ? stats.totalEvents : 0
              }
            />
            <DashboardCard
              label="Total Volunteers"
              value={
                typeof stats.totalVolunteers === "number"
                  ? stats.totalVolunteers
                  : 0
              }
            />
            <DashboardCard
              label="Most Popular Event"
              value={
                stats.mostPopularEvent && stats.mostPopularEvent.title
                  ? stats.mostPopularEvent.title
                  : "N/A"
              }
            />
          </div>

          {/* Leaderboard */}
          <Leaderboard />

          {/* Analytics Chart */}
          <AnalyticsChart events={events} />

          <div className={styles.formSection}>
            <div className={styles.formTitle}>Create New Event</div>
            <form onSubmit={handleSubmit}>
              <input
                className={styles.input}
                type="text"
                name="title"
                placeholder="Event Title"
                value={form.title}
                onChange={handleChange}
                required
              />
              <textarea
                className={styles.textarea}
                name="description"
                placeholder="Event Description"
                value={form.description}
                onChange={handleChange}
                required
              />
              <input
                className={styles.input}
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
              <input
                className={styles.input}
                type="text"
                name="location"
                placeholder="Location"
                value={form.location}
                onChange={handleChange}
                required
              />
              {msg && <div className={styles.textSuccess}>{msg}</div>}
              {error && <div className={styles.textError}>{error}</div>}
              <button
                type="submit"
                disabled={loading}
                className={styles.btnPrimary}
              >
                {loading ? "Creating..." : "Create Event"}
              </button>
            </form>
          </div>
          <div>
            <div className={styles.formTitle}>Your Events</div>
            {events.length === 0 ? (
              <div style={{ color: "#6b7280" }}>No events created yet.</div>
            ) : (
              <ul className={styles.eventList}>
                {events.map((event) => (
                  <li key={event._id} className={styles.eventCard}>
                    <div className={styles.eventTitle}>{event.title}</div>
                    <div>{event.description}</div>
                    <div className={styles.eventMeta}>
                      {new Date(event.date).toLocaleDateString()} |{" "}
                      {event.location}
                    </div>
                    <div style={{ marginTop: 12 }}>
                      <strong>Registered Volunteers:</strong>
                      <ul className={styles.volList}>
                        {event.registeredVolunteers &&
                        event.registeredVolunteers.length > 0 ? (
                          event.registeredVolunteers.map((vol) => (
                            <li key={vol._id}>
                              {vol.name} ({vol.email})
                            </li>
                          ))
                        ) : (
                          <li style={{ color: "#6b7280" }}>
                            No volunteers registered yet.
                          </li>
                        )}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardNgo;
