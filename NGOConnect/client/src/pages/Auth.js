import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const roles = [
  { label: "NGO", value: "ngo" },
  { label: "Volunteer", value: "volunteer" },
  { label: "Admin", value: "admin" },
];

const initialForm = {
  name: "",
  email: "",
  password: "",
  organization: "",
};

const Auth = () => {
  const [tab, setTab] = useState("ngo");
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleTab = (role) => {
    setTab(role);
    setForm(initialForm);
    setError("");
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      let res;
      if (isSignup) {
        res = await api.post("/auth/signup", {
          ...form,
          role: tab,
        });
      } else {
        res = await api.post("/auth/login", {
          email: form.email,
          password: form.password,
          role: tab,
        });
      }
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      if (tab === "ngo") navigate("/ngo");
      else if (tab === "volunteer") navigate("/volunteer");
      else navigate("/admin");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Authentication failed. Please try again."
      );
    }
    setLoading(false);
  };

  return (
    <>
      {/* Prevent vertical scroll on html/body */}
      <style>
        {`
          html, body, #root {
            height: 100vh !important;
            min-height: 100vh !important;
            margin: 0;
            padding: 0;
            overflow: hidden;
          }
        `}
      </style>
      <div
        style={{
          minHeight: "100vh",
          height: "100vh",
          background: "linear-gradient(120deg, #eaf1fb 60%, #f3f6f9 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 4px 24px rgba(10,102,194,0.10)",
            padding: "40px 32px 32px 32px",
            width: "100%",
            maxWidth: 400,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 24,
              gap: 12,
            }}
          >
            {roles.map((r) => (
              <button
                key={r.value}
                onClick={() => handleTab(r.value)}
                style={{
                  background: tab === r.value ? "#eaf1fb" : "#f3f6f9",
                  color: tab === r.value ? "#0a66c2" : "#374151",
                  border: "none",
                  borderBottom: tab === r.value ? "3px solid #0a66c2" : "3px solid transparent",
                  fontWeight: 600,
                  fontSize: "1.05rem",
                  padding: "10px 18px",
                  borderRadius: "8px 8px 0 0",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {r.label}
              </button>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 20,
              gap: 8,
            }}
          >
            <button
              style={{
                background: isSignup ? "#0a66c2" : "#f3f6f9",
                color: isSignup ? "#fff" : "#0a66c2",
                border: "none",
                fontWeight: 600,
                fontSize: "1.05rem",
                padding: "8px 20px",
                borderRadius: 6,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onClick={() => {
                setIsSignup(true);
                setError("");
              }}
            >
              Signup
            </button>
            <button
              style={{
                background: !isSignup ? "#0a66c2" : "#f3f6f9",
                color: !isSignup ? "#fff" : "#0a66c2",
                border: "none",
                fontWeight: 600,
                fontSize: "1.05rem",
                padding: "8px 20px",
                borderRadius: 6,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onClick={() => {
                setIsSignup(false);
                setError("");
              }}
            >
              Login
            </button>
          </div>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {isSignup && tab === "ngo" && (
              <input
                type="text"
                name="organization"
                placeholder="Organization Name"
                value={form.organization}
                onChange={handleChange}
                required
                style={{
                  padding: "12px",
                  borderRadius: 6,
                  border: "1px solid #cfd8dc",
                  fontSize: "1rem",
                  marginBottom: 2,
                }}
              />
            )}
            {isSignup && tab !== "admin" && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                style={{
                  padding: "12px",
                  borderRadius: 6,
                  border: "1px solid #cfd8dc",
                  fontSize: "1rem",
                  marginBottom: 2,
                }}
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              style={{
                padding: "12px",
                borderRadius: 6,
                border: "1px solid #cfd8dc",
                fontSize: "1rem",
                marginBottom: 2,
              }}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              style={{
                padding: "12px",
                borderRadius: 6,
                border: "1px solid #cfd8dc",
                fontSize: "1rem",
                marginBottom: 2,
              }}
            />
            {error && (
              <div
                style={{
                  color: "#d32f2f",
                  background: "#fbe9e7",
                  borderRadius: 6,
                  padding: "8px 0",
                  textAlign: "center",
                  fontWeight: 500,
                  marginBottom: 2,
                  fontSize: "0.98rem",
                }}
              >
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              style={{
                background: "#0a66c2",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "12px",
                fontWeight: 700,
                fontSize: "1.1rem",
                marginTop: 8,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                transition: "background 0.2s",
              }}
            >
              {loading
                ? isSignup
                  ? "Signing up..."
                  : "Logging in..."
                : isSignup
                ? "Signup"
                : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Auth;