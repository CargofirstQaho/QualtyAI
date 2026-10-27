"use client";

import React from "react";
import { Cube, Flask, CheckCircle, ShieldCheck, Clock } from "@phosphor-icons/react";

export default function DualPipeline() {
  return (
    <section
      id="pipeline"
      style={{
        padding: "clamp(48px, 7vw, 80px) 20px",
        maxWidth: "1280px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 40px" }}>
        <div
          className="badge-pill"
          style={{
            backgroundColor: "var(--accent-light)",
            color: "var(--accent-text)",
            border: "1px solid var(--accent-border)",
            marginBottom: "14px",
          }}
        >
          <ShieldCheck size={13} weight="bold" />
          <span>SECTION 02 / DUAL VERIFICATION</span>
        </div>
        <h2
          className="font-heading"
          style={{
            fontSize: "clamp(26px, 3.4vw, 36px)",
            fontWeight: 700,
            color: "var(--text-main)",
            marginBottom: "12px",
            letterSpacing: "-0.03em",
          }}
        >
          Dual Verification Pipeline
        </h2>
        <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
          Comprehensive cargo validation combining fast on-dock physical inspections with certified laboratory chemical assays.
        </p>
      </div>

      {/* Two Comparative Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "24px",
        }}
      >
        {/* Mode A: Physical Inspection */}
        <div className="card-shell" style={{ padding: "32px", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "10px",
                backgroundColor: "var(--accent-light)",
                color: "var(--accent-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Cube size={22} weight="bold" />
            </div>
            <div>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Mode A / On-Site
              </span>
              <h3 className="font-heading" style={{ fontSize: "20px", fontWeight: 700, color: "var(--text-main)" }}>
                Physical Cargo Inspection
              </h3>
            </div>
          </div>

          <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "24px" }}>
            Conducted directly at ports, container freight stations (CFS), and loading terminals under GAFTA 124 and ISO 24333 sampling protocols.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <CheckCircle size={18} color="var(--success)" weight="fill" style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>
                <strong style={{ fontSize: "13.5px", color: "var(--text-main)" }}>Grain Dimension & Caliper Sizing</strong>
                <div style={{ fontSize: "12.5px", color: "var(--text-muted)" }}>
                  Broken %, foreign matter, chalkiness, and optical average length measurement.
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <CheckCircle size={18} color="var(--success)" weight="fill" style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>
                <strong style={{ fontSize: "13.5px", color: "var(--text-main)" }}>Vessel Hold & Container Cleanliness</strong>
                <div style={{ fontSize: "12.5px", color: "var(--text-muted)" }}>
                  Pre-loading survey verifying zero rust, moisture, odors, or prior residue contamination.
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <CheckCircle size={18} color="var(--success)" weight="fill" style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>
                <strong style={{ fontSize: "13.5px", color: "var(--text-main)" }}>Moisture & Temperature Tally</strong>
                <div style={{ fontSize: "12.5px", color: "var(--text-muted)" }}>
                  Calibrated dielectric moisture meters to ensure safe transit stability below critical levels.
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "28px",
              paddingTop: "16px",
              borderTop: "1px solid var(--border-main)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "12.5px",
            }}
          >
            <span style={{ color: "var(--text-muted)" }}>Turnaround Time:</span>
            <span className="badge-pill" style={{ backgroundColor: "var(--accent-light)", color: "var(--accent-text)" }}>
              <Clock size={12} weight="bold" />
              <span>Same-Day Clearance</span>
            </span>
          </div>
        </div>

        {/* Mode B: Chemical Laboratory Assay */}
        <div className="card-shell" style={{ padding: "32px", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "10px",
                backgroundColor: "var(--bg-subtle)",
                color: "var(--accent-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Flask size={22} weight="bold" />
            </div>
            <div>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Mode B / Laboratory
              </span>
              <h3 className="font-heading" style={{ fontSize: "20px", fontWeight: 700, color: "var(--text-main)" }}>
                Chemical & Residue Testing
              </h3>
            </div>
          </div>

          <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "24px" }}>
            Certified ISO/IEC 17025 accredited laboratory assays ensuring strict compliance with importing nation MRLs and safety standards.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <CheckCircle size={18} color="var(--success)" weight="fill" style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>
                <strong style={{ fontSize: "13.5px", color: "var(--text-main)" }}>Pesticide Multi-Residue (GC-MS/MS & LC-MS/MS)</strong>
                <div style={{ fontSize: "12.5px", color: "var(--text-muted)" }}>
                  Screening for 300+ compounds against EU, US FDA, and Gulf MRL standards.
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <CheckCircle size={18} color="var(--success)" weight="fill" style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>
                <strong style={{ fontSize: "13.5px", color: "var(--text-main)" }}>Aflatoxins & Mycotoxins (HPLC Analysis)</strong>
                <div style={{ fontSize: "12.5px", color: "var(--text-muted)" }}>
                  Quantitative detection of B1, B2, G1, G2 and Total Ochratoxin A down to 0.1 ppb.
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <CheckCircle size={18} color="var(--success)" weight="fill" style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>
                <strong style={{ fontSize: "13.5px", color: "var(--text-main)" }}>Heavy Metals & Contaminants (ICP-MS)</strong>
                <div style={{ fontSize: "12.5px", color: "var(--text-muted)" }}>
                  Detection of Lead (Pb), Cadmium (Cd), Arsenic (As), and Mercury (Hg) levels.
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "28px",
              paddingTop: "16px",
              borderTop: "1px solid var(--border-main)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "12.5px",
            }}
          >
            <span style={{ color: "var(--text-muted)" }}>Accreditation:</span>
            <span className="badge-pill" style={{ backgroundColor: "var(--bg-subtle)", color: "var(--text-secondary)" }}>
              <ShieldCheck size={12} weight="bold" />
              <span>NABL / ISO 17025</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
