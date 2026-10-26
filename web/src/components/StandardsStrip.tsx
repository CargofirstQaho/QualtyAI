"use client";

import React from "react";

export default function StandardsStrip() {
  const standards = [
    { name: "GAFTA", desc: "Grain & Feed Trade Assoc." },
    { name: "FOSFA", desc: "Federation of Oils, Seeds & Fats" },
    { name: "NABL", desc: "ISO/IEC 17025 Accredited" },
    { name: "NABCB", desc: "Inspection Body Accreditation" },
    { name: "ISO 9001", desc: "Quality Management Standard" },
    { name: "COC", desc: "Certificate of Conformity" },
  ];

  return (
    <div
      className="border-hair-b"
      style={{
        display: "flex",
        alignItems: "stretch",
        flexWrap: "wrap",
        background: "var(--black)",
      }}
    >
      {/* Label Cell */}
      <div
        className="border-hair-r"
        style={{
          padding: "16px var(--gut)",
          color: "var(--footer)",
          whiteSpace: "nowrap",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span className="mono" style={{ fontSize: "11px", letterSpacing: "0.14em" }}>
          ACCREDITATION & STANDARDS
        </span>
      </div>

      {/* Grid of standard bodies */}
      <ul
        style={{
          flex: 1,
          display: "flex",
          alignItems: "stretch",
          flexWrap: "wrap",
          listStyle: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {standards.map((std, i) => (
          <li
            key={std.name}
            className="border-hair-r cell-interactive"
            style={{
              flex: "1 0 auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "62px",
              padding: "12px 28px",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontSize: "15px",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "var(--paper)",
              }}
            >
              {std.name}
            </span>
            <span
              className="mono-sm"
              style={{
                color: "var(--footer)",
                marginTop: "2px",
                fontSize: "9.5px",
                letterSpacing: "0.08em",
              }}
            >
              {std.desc}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
