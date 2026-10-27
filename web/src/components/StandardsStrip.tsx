"use client";

import React from "react";
import { Certificate, ShieldCheck } from "@phosphor-icons/react";

export default function StandardsStrip() {
  const standards = [
    { name: "GAFTA", full: "Grain & Feed Trade Assoc.", desc: "Contract Sampling & Rules" },
    { name: "FOSFA", full: "Federation of Oils, Seeds & Fats", desc: "Oilseed & Fat Standards" },
    { name: "NABL", full: "ISO/IEC 17025 Certified", desc: "Chemical & Physical Lab Assays" },
    { name: "NABCB", full: "Inspection Body Accreditation", desc: "Quality System Compliance" },
    { name: "ISO 9001", full: "Quality Management", desc: "Traceable Chain of Custody" },
    { name: "COC", full: "Certificate of Conformity", desc: "Port Customs & Trade Clearance" },
  ];

  return (
    <section
      id="standards"
      style={{
        borderTop: "1px solid var(--border-main)",
        borderBottom: "1px solid var(--border-main)",
        backgroundColor: "var(--bg-card)",
        padding: "32px 20px",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Certificate size={18} color="var(--accent-primary)" weight="bold" />
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--text-muted)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Certified & Accredited Standards
            </span>
          </div>
          <span style={{ fontSize: "12.5px", color: "var(--text-muted)" }}>
            Surveyors adhere to international standard inspection protocols
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
            gap: "12px",
          }}
        >
          {standards.map((s) => (
            <div
              key={s.name}
              style={{
                padding: "14px 16px",
                borderRadius: "12px",
                backgroundColor: "var(--bg-subtle)",
                border: "1px solid var(--border-main)",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-strong)";
                e.currentTarget.style.backgroundColor = "var(--bg-card)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-main)";
                e.currentTarget.style.backgroundColor = "var(--bg-subtle)";
              }}
            >
              <div
                className="font-heading"
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "var(--text-main)",
                  marginBottom: "2px",
                }}
              >
                {s.name}
              </div>
              <div style={{ fontSize: "11.5px", fontWeight: 600, color: "var(--text-secondary)" }}>
                {s.full}
              </div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
