// app/error.tsx
"use client";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorPageProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#f5f5f5",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          textAlign: "center",
          background: "#fff",
          padding: "40px 30px",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          maxWidth: "400px",
          width: "90%",
        }}
      >
        <h1 style={{ fontSize: "28px", color: "#ff4d4f", marginBottom: "15px" }}>
          Oops! Something went wrong
        </h1>
        <p style={{ color: "#555", marginBottom: "25px" }}>
          {error.message || "We encountered an unexpected error. Please try again."}
        </p>
        <button
          onClick={() => reset()}
          style={{
            backgroundColor: "#0070f3",
            color: "#fff",
            padding: "10px 25px",
            borderRadius: "8px",
            border: "none",
            fontSize: "16px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "background 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#005bb5")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#0070f3")}
        >
          Retry
        </button>
      </div>
    </div>
  );
}
