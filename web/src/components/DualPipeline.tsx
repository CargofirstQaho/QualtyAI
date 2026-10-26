"use client";

import React from "react";
import { Check, ShieldCheck, Flask, Cube } from "@phosphor-icons/react";

export default function DualPipeline() {
  return (
    <section id="pipeline" className="border-hair-b" style={{ background: "var(--black)" }}>
      {/* Section Header */}
      <div className="border-hair-b" style={{ display: "flex", alignItems: "stretch", flexWrap: "wrap" }}>
        <div className="border-hair-r" style={{ padding: "18px var(--gut)", display: "flex", alignItems: "center", gap: "10px" }}>
          <span className="mono" style={{ color: "var(--accent-lit)" }}>SECTION 02</span>
          <span className="mono" style={{ color: "var(--paper)" }}>/ DUAL-VERIFICATION PIPELINE</span>
        </div>
        <div style={{ padding: "18px var(--gut)", flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", color: "var(--on-dark)" }}>
          <span className="mono" style={{ fontSize: "10.5px" }}>
            PHYSICAL + CHEMICAL VERIFICATION MODES
          </span>
        </div>
      </div>

      {/* Two Massive Architectural Cells */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))" }}>
        {/* Layer 1: Physical Inspection */}
        <div className="border-hair-r cell-interactive" style={{ padding: "clamp(32px, 5vw, 64px) var(--gut)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                border: "1px solid var(--hair-dark)",
                background: "#080808",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Cube size={20} color="var(--paper)" />
            </div>
            <div>
              <span className="mono" style={{ color: "var(--footer)", fontSize: "10px" }}>MODE A</span>
              <h3 style={{ fontSize: "24px", fontWeight: 500, letterSpacing: "-0.03em" }}>
                Physical Cargo Inspection
              </h3>
            </div>
          </div>

          <p style={{ color: "var(--on-dark)", fontSize: "14px", lineHeight: 1.6, marginBottom: "32px", maxWidth: "44ch" }}>
            Conducted on-dock, at loading ports, container freight stations (CFS), and inland silos. Follows strict GAFTA 124 and ISO 24333 sampling protocols.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }} className="border-hair">
            <div className="border-hair-b" style={{ padding: "14px 18px", display: "flex", gap: "12px" }}>
              <span className="mono" style={{ color: "var(--accent-lit)", fontSize: "11px" }}>01</span>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 500 }}>Grain Dimension & Caliper Profiling</div>
                <div style={{ fontSize: "12px", color: "var(--footer)", marginTop: "2px" }}>
                  Broken %, red/yellow streaks, chalkiness, and optical average length (mm).
                </div>
              </div>
            </div>

            <div className="border-hair-b" style={{ padding: "14px 18px", display: "flex", gap: "12px" }}>
              <span className="mono" style={{ color: "var(--accent-lit)", fontSize: "11px" }}>02</span>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 500 }}>Container Seal & Hatch Cleanliness</div>
                <div style={{ fontSize: "12px", color: "var(--footer)", marginTop: "2px" }}>
                  Pre-loading cargo hold inspection, odor check, moisture condensation audit.
                </div>
              </div>
            </div>

            <div className="border-hair-b" style={{ padding: "14px 18px", display: "flex", gap: "12px" }}>
              <span className="mono" style={{ color: "var(--accent-lit)", fontSize: "11px" }}>03</span>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 500 }}>Draft Survey & Weighbridge Tally</div>
                <div style={{ fontSize: "12px", color: "var(--footer)", marginTop: "2px" }}>
                  Displacement calculations for bulk carriers and certified 100% gross tare weighbridge tallies.
                </div>
              </div>
            </div>

            <div style={{ padding: "14px 18px", display: "flex", gap: "12px" }}>
              <span className="mono" style={{ color: "var(--accent-lit)", fontSize: "11px" }}>04</span>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 500 }}>Live Infestation & Quarantine Check</div>
                <div style={{ fontSize: "12px", color: "var(--footer)", marginTop: "2px" }}>
                  Zero-tolerance live weevil/insect detection with instant phytosanitary hold alerts.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Layer 2: Chemical Testing & Lab Assays */}
        <div className="cell-interactive" style={{ padding: "clamp(32px, 5vw, 64px) var(--gut)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                border: "1px solid var(--accent)",
                background: "rgba(14, 0, 255, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Flask size={20} color="var(--accent-lit)" />
            </div>
            <div>
              <span className="mono" style={{ color: "var(--accent-lit)", fontSize: "10px" }}>MODE B</span>
              <h3 style={{ fontSize: "24px", fontWeight: 500, letterSpacing: "-0.03em" }}>
                Chemical Lab Assay
              </h3>
            </div>
          </div>

          <p style={{ color: "var(--on-dark)", fontSize: "14px", lineHeight: 1.6, marginBottom: "32px", maxWidth: "44ch" }}>
            Processed via accredited NABL / ISO/IEC 17025 partner laboratories. Provides tamper-proof digital certificates of analysis for custom clearance worldwide.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }} className="border-hair">
            <div className="border-hair-b" style={{ padding: "14px 18px", display: "flex", gap: "12px" }}>
              <span className="mono" style={{ color: "var(--accent-lit)", fontSize: "11px" }}>01</span>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 500 }}>Pesticide Residue (GC-MS/MS & LC-MS/MS)</div>
                <div style={{ fontSize: "12px", color: "var(--footer)", marginTop: "2px" }}>
                  Multi-residue screening over 450+ chemical compounds against EU / GCC MRL limits.
                </div>
              </div>
            </div>

            <div className="border-hair-b" style={{ padding: "14px 18px", display: "flex", gap: "12px" }}>
              <span className="mono" style={{ color: "var(--accent-lit)", fontSize: "11px" }}>02</span>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 500 }}>Aflatoxins & Mycotoxin Screening</div>
                <div style={{ fontSize: "12px", color: "var(--footer)", marginTop: "2px" }}>
                  HPLC quantification for Total Aflatoxin (B1+B2+G1+G2) and Ochratoxin A.
                </div>
              </div>
            </div>

            <div className="border-hair-b" style={{ padding: "14px 18px", display: "flex", gap: "12px" }}>
              <span className="mono" style={{ color: "var(--accent-lit)", fontSize: "11px" }}>03</span>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 500 }}>Heavy Metal ICP-MS Analysis</div>
                <div style={{ fontSize: "12px", color: "var(--footer)", marginTop: "2px" }}>
                  Ultra-trace quantification of Lead (Pb), Cadmium (Cd), Arsenic (As), and Mercury (Hg).
                </div>
              </div>
            </div>

            <div style={{ padding: "14px 18px", display: "flex", gap: "12px" }}>
              <span className="mono" style={{ color: "var(--accent-lit)", fontSize: "11px" }}>04</span>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 500 }}>Moisture, Amylose & Nutritional Spec</div>
                <div style={{ fontSize: "12px", color: "var(--footer)", marginTop: "2px" }}>
                  Precise Karl Fischer moisture testing, amylose % for rice elongation, crude protein.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
