import React, { useEffect, useState } from "react";
import api from "../api";
import { getUser } from "../utils";

// Sidebar navigation items
const SIDEBAR_ITEMS = [
  { label: "All Events", key: "events" },
  { label: "Registered Events", key: "registered" },
  { label: "Profile", key: "profile" },
];

const DashboardVolunteer = () => {
  const [events, setEvents] = useState([]);
  const [registered, setRegistered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [page, setPage] = useState("events");
  const user = getUser();

  const fetchEvents = async () => {
    try {
      const res = await api.get("/volunteer/events");
      setEvents(res.data.events || []);
    } catch (err) {
      setEvents([]);
    }
  };

  const fetchRegistered = async () => {
    try {
      const res = await api.get("/volunteer/registered-events");
      setRegistered(res.data.events || []);
    } catch (err) {
      setRegistered([]);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchRegistered();
    // eslint-disable-next-line
  }, []);

  const handleRegister = async (eventId) => {
    setLoading(true);
    setMsg("");
    setError("");
    try {
      await api.post(`/volunteer/register/${eventId}`);
      setMsg("Registered successfully!");
      fetchRegistered();
    } catch (err) {
      setError(
        err?.response?.data?.message || "Registration failed. Try again."
      );
    }
    setLoading(false);
  };

  const isRegistered = (eventId) =>
    registered.some((e) => e._id === eventId);

  // Sidebar styles
  const sidebarStyle = {
    width: 220,
    minHeight: "100vh",
    background: "#f3f6f9",
    borderRight: "1px solid #e5e7eb",
    padding: "32px 0 0 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "sticky",
    top: 0,
    overflow: "hidden",
  };

  const sidebarBtnStyle = (active) => ({
    width: "90%",
    background: active ? "#eaf1fb" : "transparent",
    color: active ? "#0a66c2" : "#374151",
    border: "none",
    borderLeft: active ? "4px solid #0a66c2" : "4px solid transparent",
    borderRadius: "0 8px 8px 0",
    fontWeight: 600,
    fontSize: "1.08rem",
    padding: "12px 18px",
    marginBottom: 8,
    textAlign: "left",
    cursor: "pointer",
    transition: "all 0.2s",
  });

  // Main content styles
  const mainStyle = {
    flex: 1,
    padding: "40px 32px",
    minHeight: "100vh",
    background: "#fff",
    overflow: "visible", // Remove unnecessary vertical scrolling
  };

  // Enhanced Profile section
  const Profile = () => (
    <div style={{
      maxWidth: 480,
      margin: "0 auto",
      background: "#f3f6f9",
      borderRadius: 16,
      boxShadow: "0 4px 24px rgba(10,102,194,0.08)",
      padding: "36px 32px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <div style={{
        width: 110,
        height: 110,
        borderRadius: "50%",
        background: "linear-gradient(135deg, #eaf1fb 60%, #0a66c2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 18,
        boxShadow: "0 2px 12px rgba(10,102,194,0.10)"
      }}>
        <span style={{ fontSize: 54, color: "#0a66c2" }}>
          {user?.name ? user.name[0].toUpperCase() : "V"}
        </span>
      </div>
      <h2 style={{
        fontSize: "2rem",
        color: "#0a66c2",
        fontWeight: 800,
        marginBottom: 8,
        textAlign: "center"
      }}>
        {user?.name || "Volunteer"}
      </h2>
      <div style={{
        color: "#374151",
        fontSize: "1.1rem",
        marginBottom: 6,
        textAlign: "center"
      }}>
        <span style={{ fontWeight: 500 }}>Email:</span> {user?.email}
      </div>
      <div style={{
        color: "#374151",
        fontSize: "1.1rem",
        marginBottom: 6,
        textAlign: "center"
      }}>
        <span style={{ fontWeight: 500 }}>Role:</span> {user?.role}
      </div>
      <div style={{
        marginTop: 18,
        color: "#0a66c2",
        fontWeight: 600,
        fontSize: "1.08rem",
        background: "#eaf1fb",
        borderRadius: 8,
        padding: "10px 20px",
        boxShadow: "0 1px 4px rgba(10,102,194,0.06)"
      }}>
        Thank you for volunteering!
      </div>
    </div>
  );

  // All Events section
  const AllEvents = () => (
    <div>
      <h2 style={{ fontSize: "2rem", color: "#2563eb", fontWeight: 700, marginBottom: 24 }}>
        All Events
      </h2>
      {msg && <div className="text-success">{msg}</div>}
      {error && <div className="text-error">{error}</div>}
      {events.length === 0 ? (
        <div style={{ color: "#6b7280" }}>No events available.</div>
      ) : (
        <ul className="event-list">
          {events.map((event) => (
            <li
              key={event._id}
              className="event-card"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 18,
                background: "#f3f6f9",
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(10,102,194,0.06)",
                padding: "20px 24px"
              }}
            >
              <div>
                <div className="event-title" style={{ fontWeight: 700, fontSize: "1.15rem", color: "#0a66c2" }}>{event.title}</div>
                <div style={{ color: "#374151", marginBottom: 4 }}>{event.description}</div>
                <div className="event-meta" style={{ color: "#2563eb", fontSize: "0.98rem" }}>
                  {new Date(event.date).toLocaleDateString()} | {event.location}
                </div>
              </div>
              <div>
                {isRegistered(event._id) ? (
                  <span
                    style={{
                      background: "#22c55e",
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      padding: "10px 22px",
                      fontWeight: 700,
                      fontSize: "1rem",
                      boxShadow: "0 1px 4px rgba(34,197,94,0.08)"
                    }}
                  >
                    Registered
                  </span>
                ) : (
                  <button
                    onClick={() => handleRegister(event._id)}
                    disabled={loading}
                    style={{
                      background: "#0a66c2",
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      padding: "10px 22px",
                      fontWeight: 700,
                      fontSize: "1rem",
                      cursor: loading ? "not-allowed" : "pointer",
                      opacity: loading ? 0.7 : 1,
                      boxShadow: "0 1px 4px rgba(10,102,194,0.08)",
                      transition: "background 0.2s"
                    }}
                  >
                    {loading ? "Registering..." : "Register"}
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  // Registered Events section
  const RegisteredEvents = () => (
    <div>
      <h2 style={{ fontSize: "2rem", color: "#2563eb", fontWeight: 700, marginBottom: 24 }}>
        Your Registered Events
      </h2>
      {registered.length === 0 ? (
        <div style={{ color: "#6b7280" }}>
          You have not registered for any events yet.
        </div>
      ) : (
        <ul className="event-list">
          {registered.map((event) => (
            <li key={event._id} className="event-card" style={{
              marginBottom: 18,
              background: "#f3f6f9",
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(10,102,194,0.06)",
              padding: "20px 24px"
            }}>
              <div className="event-title" style={{ fontWeight: 700, fontSize: "1.15rem", color: "#0a66c2" }}>{event.title}</div>
              <div style={{ color: "#374151", marginBottom: 4 }}>{event.description}</div>
              <div className="event-meta" style={{ color: "#2563eb", fontSize: "0.98rem" }}>
                {new Date(event.date).toLocaleDateString()} | {event.location}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f3f6f9", overflow: "hidden" }}>
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        <div style={{ fontWeight: 700, color: "#0a66c2", fontSize: "1.3rem", marginBottom: 32 }}>
          <span role="img" aria-label="volunteer" style={{ marginRight: 8 }}>🙋‍♂️</span>
          Volunteer
        </div>
        {SIDEBAR_ITEMS.map((item) => (
          <button
            key={item.key}
            style={sidebarBtnStyle(page === item.key)}
            onClick={() => setPage(item.key)}
          >
            {item.label}
          </button>
        ))}
      </aside>
      {/* Main Content */}
      <main style={mainStyle}>
        {page === "events" && <AllEvents />}
        {page === "registered" && <RegisteredEvents />}
        {page === "profile" && <Profile />}
      </main>
    </div>
  );
};

export default DashboardVolunteer;