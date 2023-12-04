import React from "react";

export default function GlobalFilter({ filter, setFilter }) {
  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <p style={{ margin: 0, padding: "0 5px", fontWeight: 500 }}>Search</p>
      <input
        style={{
          border: "none",
          borderRadius: "4px",
          padding: "13px",
          fontSize: "12px",
          backgroundColor: "#f7f7f7",
          width: "200px",
        }}
        placeholder="Search here"
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
}
