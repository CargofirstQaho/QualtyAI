"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="border-hair-t" style={{ background: "var(--black)" }}>
      {/* Metrics Row */}
      <div
        className="border-hair-b"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        }}
      >
        <div className="border-hair-r" style={{ padding: "18px var(--gut)" }}>
          <span className="mono" style={{ fontSize: "10px", color: "var(--footer)", display: "block" }}>
            ENGINE STATUS
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
            <span className="status-dot" style={{ width: "6px", height: "6px" }} />
            <span className="mono" style={{ fontSize: "12px", color: "var(--paper)" }}>99.98% DISPATCH UPTIME</span>
          </div>
        </div>

        <div className="border-hair-r" style={{ padding: "18px var(--gut)" }}>
          <span className="mono" style={{ fontSize: "10px", color: "var(--footer)", display: "block" }}>
            PROCESS TIMEZONE
          </span>
          <div style={{ marginTop: "4px" }}>
            <span className="mono" style={{ fontSize: "12px", color: "var(--paper)" }}>UTC (UNIVERSAL TIME)</span>
          </div>
        </div>

        <div className="border-hair-r" style={{ padding: "18px var(--gut)" }}>
          <span className="mono" style={{ fontSize: "10px", color: "var(--footer)", display: "block" }}>
            SERVICE COMPLIANCE
          </span>
          <div style={{ marginTop: "4px" }}>
            <span className="mono" style={{ fontSize: "12px", color: "var(--paper)" }}>GAFTA 124 / ISO 24333</span>
          </div>
        </div>

        <div style={{ padding: "18px var(--gut)" }}>
          <span className="mono" style={{ fontSize: "10px", color: "var(--footer)", display: "block" }}>
            API BACKEND PORT
          </span>
          <div style={{ marginTop: "4px" }}>
            <span className="mono" style={{ fontSize: "12px", color: "var(--paper)" }}>POSTGRESQL // PORT 3214</span>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Copyright Strip */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          padding: "24px var(--gut)",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "14px",
              height: "14px",
              border: "1px solid var(--paper)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "4px", height: "4px", background: "var(--accent)" }} />
          </div>
          <span className="mono" style={{ fontSize: "11px", color: "var(--on-dark)" }}>
            QUALTY.AI &copy; 2026 CARGOFIRST PRODUCT ECOSYSTEM
          </span>
        </div>

        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          <a href="#spec-simulator" className="mono" style={{ fontSize: "10.5px", color: "var(--footer)" }}>
            GRAIN ENGINE
          </a>
          <a href="#pipeline" className="mono" style={{ fontSize: "10.5px", color: "var(--footer)" }}>
            PIPELINE
          </a>
          <a href="#surveyors" className="mono" style={{ fontSize: "10.5px", color: "var(--footer)" }}>
            SURVEYORS
          </a>
          <a href="#api" className="mono" style={{ fontSize: "10.5px", color: "var(--footer)" }}>
            API SPECS
          </a>
          <a href="mailto:ops@cargofirst.com" className="mono" style={{ fontSize: "10.5px", color: "var(--accent-lit)" }}>
            SUPPORT &rarr;
          </a>
        </div>
      </div>
    </footer>
  );
}
