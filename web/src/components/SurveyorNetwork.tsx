"use client";

import React, { useState } from "react";
import { Globe, MapPin, ShieldCheck, UserCheck, Buildings } from "@phosphor-icons/react";

export default function SurveyorNetwork() {
  const [activeTab, setActiveTab] = useState<"india" | "international">("india");

  const indianHubs = [
    { name: "Mundra Port (Gujarat)", role: "Container & Bulk Agro", surveyors: "148 Certified", sla: "2.5 hrs", badge: "PORT CLEARANCE" },
    { name: "Kakinada Anchorage (A.P.)", role: "Primary Rice Export Hub", surveyors: "210 Certified", sla: "1.8 hrs", badge: "GRAIN SPECIALIST" },
    { name: "Kandla / Deendayal Port", role: "Dry Bulk & Wheat Terminal", surveyors: "115 Certified", sla: "3.0 hrs", badge: "BULK DRAFT SURVEY" },
    { name: "JNPT / Nhava Sheva (Mumbai)", role: "Container Freight Stations", surveyors: "185 Certified", sla: "2.0 hrs", badge: "CFS AUDIT" },
    { name: "Visakhapatnam (Vizag)", role: "East Coast Multi-Cargo", surveyors: "92 Certified", sla: "3.5 hrs", badge: "HOLD CLEANLINESS" },
    { name: "Karnal / Taraori Mandi Hub", role: "Inland Basmati Processing", surveyors: "134 Certified", sla: "1.5 hrs", badge: "MILLING SAMPLING" },
  ];

  const internationalHubs = [
    { name: "Jebel Ali & Dubai (UAE)", role: "GCC Import Hub & Transshipment", surveyors: "78 Certified", sla: "3.0 hrs", badge: "GAFTA ACCREDITED" },
    { name: "Port of Rotterdam (NL)", role: "European Union Entry Point", surveyors: "64 Certified", sla: "4.0 hrs", badge: "EU MRL PROTOCOL" },
    { name: "Port of Singapore (SG)", role: "East Asia Trade Corridor", surveyors: "52 Certified", sla: "3.0 hrs", badge: "SGS/BIVAC SYNC" },
    { name: "Chittagong Port (BD)", role: "Non-Basmati Parboiled Terminal", surveyors: "86 Certified", sla: "2.5 hrs", badge: "WEIGHT/TALLY" },
    { name: "Mombasa Port (KE)", role: "East Africa Grain Corridor", surveyors: "44 Certified", sla: "4.5 hrs", badge: "PRE-SHIPMENT PVOC" },
    { name: "Dammam / Jubail (KSA)", role: "Saudi Food & Drug Authority", surveyors: "58 Certified", sla: "3.5 hrs", badge: "SFDA COMPLIANT" },
  ];

  const currentHubs = activeTab === "india" ? indianHubs : internationalHubs;

  return (
    <section id="surveyors" className="border-hair-b" style={{ background: "var(--black)" }}>
      {/* Header Strip */}
      <div className="border-hair-b" style={{ display: "flex", alignItems: "stretch", flexWrap: "wrap" }}>
        <div className="border-hair-r" style={{ padding: "18px var(--gut)", display: "flex", alignItems: "center", gap: "10px" }}>
          <span className="mono" style={{ color: "var(--accent-lit)" }}>SECTION 03</span>
          <span className="mono" style={{ color: "var(--paper)" }}>/ SURVEYOR & INSPECTOR NETWORK</span>
        </div>
        <div style={{ padding: "18px var(--gut)", flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", color: "var(--on-dark)" }}>
          <span className="mono" style={{ fontSize: "10.5px" }}>
            MODELS: IndianInspector & InternationalInspector
          </span>
        </div>
      </div>

      {/* Region Switcher Tab Bar */}
      <div className="border-hair-b" style={{ display: "flex", alignItems: "stretch", background: "#060606" }}>
        <button
          onClick={() => setActiveTab("india")}
          className="border-hair-r"
          style={{
            padding: "16px var(--gut)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: activeTab === "india" ? "var(--accent)" : "transparent",
            color: activeTab === "india" ? "var(--paper)" : "var(--on-dark)",
            fontWeight: activeTab === "india" ? 500 : 400,
            cursor: "pointer",
          }}
        >
          <Buildings size={16} />
          <span className="mono" style={{ fontSize: "11px" }}>DOMESTIC INDIAN PORTS & MANDIS (1,400+)</span>
        </button>

        <button
          onClick={() => setActiveTab("international")}
          className="border-hair-r"
          style={{
            padding: "16px var(--gut)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: activeTab === "international" ? "var(--accent)" : "transparent",
            color: activeTab === "international" ? "var(--paper)" : "var(--on-dark)",
            fontWeight: activeTab === "international" ? 500 : 400,
            cursor: "pointer",
          }}
        >
          <Globe size={16} />
          <span className="mono" style={{ fontSize: "11px" }}>INTERNATIONAL TRADE DESTINATIONS (480+)</span>
        </button>
      </div>

      {/* Hubs Grid — Provision Cell Structure */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
        {currentHubs.map((hub, index) => (
          <div
            key={hub.name}
            className="border-hair-r border-hair-b cell-interactive"
            style={{
              padding: "clamp(24px, 3.2vw, 36px) var(--gut)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "190px",
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span className="mono" style={{ color: "var(--footer)", fontSize: "10.5px" }}>
                  HUB {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className="mono"
                  style={{
                    fontSize: "9.5px",
                    background: "rgba(14, 0, 255, 0.15)",
                    color: "var(--accent-lit)",
                    padding: "3px 8px",
                    border: "1px solid var(--accent)",
                  }}
                >
                  {hub.badge}
                </span>
              </div>

              <h4 style={{ fontSize: "19px", fontWeight: 500, letterSpacing: "-0.02em", marginBottom: "6px" }}>
                {hub.name}
              </h4>
              <p style={{ fontSize: "13px", color: "var(--on-dark)" }}>
                {hub.role}
              </p>
            </div>

            <div
              className="border-hair-t"
              style={{
                marginTop: "20px",
                paddingTop: "12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <UserCheck size={14} color="var(--on-dark)" />
                <span className="mono-sm" style={{ color: "var(--on-dark)" }}>{hub.surveyors}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span className="status-dot" style={{ width: "5px", height: "5px" }} />
                <span className="mono-sm" style={{ color: "var(--footer)" }}>SLA: {hub.sla}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
