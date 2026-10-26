"use client";

import React, { useState } from "react";
import { CheckCircle, Warning, XCircle, Sliders, ArrowRight } from "@phosphor-icons/react";

export interface GrainParams {
  broken: number;
  purity: number;
  yellowKernel: number;
  damageKernel: number;
  redKernel: number;
  paddyKernel: number;
  chalkyRice: number;
  liveInsects: number;
  millingDegree: "Under Milled" | "Well Milled" | "Over Milled";
  averageGrainLength: number;
}

const PRESETS: Record<string, { label: string; commodity: string; params: GrainParams }> = {
  basmati1121: {
    label: "1121 Basmati (Export Extra Long)",
    commodity: "Rice",
    params: {
      broken: 2.0,
      purity: 98.5,
      yellowKernel: 0.5,
      damageKernel: 0.5,
      redKernel: 0.2,
      paddyKernel: 0.1,
      chalkyRice: 2.0,
      liveInsects: 0,
      millingDegree: "Well Milled",
      averageGrainLength: 8.35,
    },
  },
  ir64: {
    label: "IR-64 Non-Basmati Raw 5%",
    commodity: "Rice",
    params: {
      broken: 4.8,
      purity: 96.0,
      yellowKernel: 1.2,
      damageKernel: 1.0,
      redKernel: 0.8,
      paddyKernel: 0.4,
      chalkyRice: 4.5,
      liveInsects: 0,
      millingDegree: "Well Milled",
      averageGrainLength: 6.2,
    },
  },
  sonaMasoori: {
    label: "Sona Masoori Raw Premium",
    commodity: "Rice",
    params: {
      broken: 1.5,
      purity: 99.0,
      yellowKernel: 0.3,
      damageKernel: 0.4,
      redKernel: 0.1,
      paddyKernel: 0.1,
      chalkyRice: 1.8,
      liveInsects: 0,
      millingDegree: "Well Milled",
      averageGrainLength: 5.4,
    },
  },
  rejectionTest: {
    label: "High Defect Stress Test (Rejection)",
    commodity: "Rice",
    params: {
      broken: 14.5,
      purity: 88.0,
      yellowKernel: 4.2,
      damageKernel: 3.5,
      redKernel: 2.8,
      paddyKernel: 1.5,
      chalkyRice: 11.0,
      liveInsects: 1,
      millingDegree: "Under Milled",
      averageGrainLength: 5.8,
    },
  },
};

interface GrainSpecSimulatorProps {
  onInjectIntoEnquiry: (params: GrainParams) => void;
}

export default function GrainSpecSimulator({ onInjectIntoEnquiry }: GrainSpecSimulatorProps) {
  const [selectedPreset, setSelectedPreset] = useState<string>("basmati1121");
  const [params, setParams] = useState<GrainParams>(PRESETS.basmati1121.params);

  const handlePresetChange = (presetKey: string) => {
    setSelectedPreset(presetKey);
    setParams({ ...PRESETS[presetKey].params });
  };

  const updateParam = <K extends keyof GrainParams>(field: K, val: GrainParams[K]) => {
    setParams((prev) => ({ ...prev, [field]: val }));
  };

  // Evaluation logic based on standard export thresholds
  const isInsectBreach = params.liveInsects > 0;
  const isPurityLow = params.purity < 95.0;
  const isBrokenHigh = params.broken > 5.0;
  const isDamageHigh = params.damageKernel > 2.0;
  const isChalkyHigh = params.chalkyRice > 6.0;

  let gradeStatus: "PASS" | "WARNING" | "FAIL" = "PASS";
  let gradeTitle = "EXPORT GRADE A — CLEARED";
  let gradeSub = "All parameters meet Codex / GAFTA international export standards.";

  if (isInsectBreach || params.damageKernel > 4.0 || params.purity < 90.0) {
    gradeStatus = "FAIL";
    gradeTitle = "CARGO REJECTION ALERT — ACTION REQUIRED";
    gradeSub = isInsectBreach
      ? "Immediate fumigation quarantine: Live insect infestation detected."
      : "Severe defect breach exceeds standard shipment tolerance.";
  } else if (isBrokenHigh || isDamageHigh || isChalkyHigh || isPurityLow) {
    gradeStatus = "WARNING";
    gradeTitle = "COMMERCIAL GRADE B — CONDITIONAL";
    gradeSub = "Secondary export grade. Subject to commercial price adjustment.";
  }

  return (
    <section id="spec-simulator" className="border-hair-b" style={{ background: "var(--black)" }}>
      {/* Section Header Strip */}
      <div className="border-hair-b" style={{ display: "flex", alignItems: "stretch", flexWrap: "wrap" }}>
        <div className="border-hair-r" style={{ padding: "18px var(--gut)", display: "flex", alignItems: "center", gap: "10px" }}>
          <span className="mono" style={{ color: "var(--accent-lit)" }}>SECTION 01</span>
          <span className="mono" style={{ color: "var(--paper)" }}>/ PHYSICAL INSPECTION ASSAY ENGINE</span>
        </div>
        <div style={{ padding: "18px var(--gut)", flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", color: "var(--on-dark)" }}>
          <span className="mono" style={{ fontSize: "10.5px" }}>
            CONNECTED TO: /v1/api/Phyinspectionparam
          </span>
        </div>
      </div>

      {/* Preset Selector Strip */}
      <div className="border-hair-b" style={{ display: "flex", alignItems: "stretch", flexWrap: "wrap", background: "#060606" }}>
        <div className="border-hair-r" style={{ padding: "14px var(--gut)", display: "flex", alignItems: "center", color: "var(--footer)" }}>
          <span className="mono" style={{ fontSize: "11px" }}>COMMODITY PRESETS:</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", flex: 1 }}>
          {Object.entries(PRESETS).map(([key, item]) => {
            const isSelected = selectedPreset === key;
            return (
              <button
                key={key}
                onClick={() => handlePresetChange(key)}
                className="border-hair-r cell-interactive"
                style={{
                  padding: "12px 20px",
                  fontSize: "12.5px",
                  color: isSelected ? "var(--paper)" : "var(--on-dark)",
                  background: isSelected ? "var(--accent)" : "transparent",
                  fontWeight: isSelected ? 500 : 400,
                  transition: "all 0.15s ease",
                  textAlign: "left",
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Two-Column Architectural Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))" }}>
        {/* Left Column: Interactive Param Sliders */}
        <div className="border-hair-r" style={{ padding: "clamp(24px, 4vw, 44px) var(--gut)" }}>
          <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <span className="mono" style={{ color: "var(--footer)", display: "block", marginBottom: "4px" }}>
                LAB TESTING METRICS (0-100%)
              </span>
              <h2 style={{ fontSize: "22px", fontWeight: 500, letterSpacing: "-0.025em" }}>
                Physical Assay Calibrator
              </h2>
            </div>
            <span className="mono" style={{ fontSize: "11px", color: "var(--accent-lit)" }}>
              LIVE REACTIVE
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            {/* Broken Rice Slider */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span className="mono" style={{ fontSize: "11px", color: "var(--on-dark)" }}>Broken Kernels (broken %)</span>
                <span className="mono" style={{ color: params.broken > 5 ? "#FFA500" : "var(--paper)" }}>
                  {params.broken.toFixed(1)}% <span style={{ color: "var(--footer)" }}>[Max 5%]</span>
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                step="0.1"
                value={params.broken}
                onChange={(e) => updateParam("broken", parseFloat(e.target.value))}
              />
            </div>

            {/* Purity Slider */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span className="mono" style={{ fontSize: "11px", color: "var(--on-dark)" }}>Varietal Purity (purity %)</span>
                <span className="mono" style={{ color: params.purity < 95 ? "#FFA500" : "var(--paper)" }}>
                  {params.purity.toFixed(1)}% <span style={{ color: "var(--footer)" }}>[Min 95%]</span>
                </span>
              </div>
              <input
                type="range"
                min="75"
                max="100"
                step="0.1"
                value={params.purity}
                onChange={(e) => updateParam("purity", parseFloat(e.target.value))}
              />
            </div>

            {/* Grain Length */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span className="mono" style={{ fontSize: "11px", color: "var(--on-dark)" }}>Average Grain Length (mm)</span>
                <span className="mono" style={{ color: "var(--paper)" }}>
                  {params.averageGrainLength.toFixed(2)} mm
                </span>
              </div>
              <input
                type="range"
                min="4.0"
                max="9.0"
                step="0.05"
                value={params.averageGrainLength}
                onChange={(e) => updateParam("averageGrainLength", parseFloat(e.target.value))}
              />
            </div>

            {/* Grid of Sub-Parameters */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "4px" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span className="mono" style={{ fontSize: "10px", color: "var(--footer)" }}>Yellow Kernel %</span>
                  <span className="mono" style={{ fontSize: "10px" }}>{params.yellowKernel.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={params.yellowKernel}
                  onChange={(e) => updateParam("yellowKernel", parseFloat(e.target.value))}
                />
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span className="mono" style={{ fontSize: "10px", color: "var(--footer)" }}>Damage Kernel %</span>
                  <span className="mono" style={{ fontSize: "10px", color: params.damageKernel > 2 ? "#FF5555" : "inherit" }}>
                    {params.damageKernel.toFixed(1)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="8"
                  step="0.1"
                  value={params.damageKernel}
                  onChange={(e) => updateParam("damageKernel", parseFloat(e.target.value))}
                />
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span className="mono" style={{ fontSize: "10px", color: "var(--footer)" }}>Chalky Rice %</span>
                  <span className="mono" style={{ fontSize: "10px" }}>{params.chalkyRice.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  step="0.1"
                  value={params.chalkyRice}
                  onChange={(e) => updateParam("chalkyRice", parseFloat(e.target.value))}
                />
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span className="mono" style={{ fontSize: "10px", color: "var(--footer)" }}>Red Kernel %</span>
                  <span className="mono" style={{ fontSize: "10px" }}>{params.redKernel.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="6"
                  step="0.1"
                  value={params.redKernel}
                  onChange={(e) => updateParam("redKernel", parseFloat(e.target.value))}
                />
              </div>
            </div>

            {/* Live Insects & Milling Degree row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", paddingTop: "8px" }}>
              <div className="border-hair" style={{ padding: "12px", background: params.liveInsects > 0 ? "rgba(255, 0, 0, 0.15)" : "#070707" }}>
                <span className="mono" style={{ fontSize: "10px", color: "var(--footer)", display: "block", marginBottom: "6px" }}>
                  LIVE INSECTS (COUNT)
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button
                    onClick={() => updateParam("liveInsects", Math.max(0, params.liveInsects - 1))}
                    className="border-hair mono"
                    style={{ width: "28px", height: "28px" }}
                  >
                    -
                  </button>
                  <span className="mono" style={{ fontSize: "16px", fontWeight: 600, color: params.liveInsects > 0 ? "#FF5555" : "#00FF66" }}>
                    {params.liveInsects}
                  </span>
                  <button
                    onClick={() => updateParam("liveInsects", params.liveInsects + 1)}
                    className="border-hair mono"
                    style={{ width: "28px", height: "28px" }}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="border-hair" style={{ padding: "12px", background: "#070707" }}>
                <span className="mono" style={{ fontSize: "10px", color: "var(--footer)", display: "block", marginBottom: "6px" }}>
                  MILLING DEGREE
                </span>
                <select
                  value={params.millingDegree}
                  onChange={(e) => updateParam("millingDegree", e.target.value as any)}
                  className="cell-input"
                  style={{ padding: "4px 8px", fontSize: "11px" }}
                >
                  <option value="Under Milled">Under Milled</option>
                  <option value="Well Milled">Well Milled</option>
                  <option value="Over Milled">Over Milled</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Grade Diagnostics & Action */}
        <div style={{ padding: "clamp(24px, 4vw, 44px) var(--gut)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <span className="mono" style={{ color: "var(--footer)", display: "block", marginBottom: "4px" }}>
              COMPLIANCE AUDIT
            </span>
            <h3 style={{ fontSize: "22px", fontWeight: 500, letterSpacing: "-0.025em", marginBottom: "20px" }}>
              Automated Grade Verdict
            </h3>

            {/* Verdict Box */}
            <div
              style={{
                border: "1px solid",
                borderColor:
                  gradeStatus === "PASS"
                    ? "var(--accent)"
                    : gradeStatus === "WARNING"
                    ? "#FFA500"
                    : "#FF3333",
                padding: "24px",
                background:
                  gradeStatus === "PASS"
                    ? "rgba(14, 0, 255, 0.08)"
                    : gradeStatus === "WARNING"
                    ? "rgba(255, 165, 0, 0.08)"
                    : "rgba(255, 51, 51, 0.12)",
                marginBottom: "24px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                {gradeStatus === "PASS" ? (
                  <CheckCircle size={22} color="var(--accent-lit)" weight="fill" />
                ) : gradeStatus === "WARNING" ? (
                  <Warning size={22} color="#FFA500" weight="fill" />
                ) : (
                  <XCircle size={22} color="#FF5555" weight="fill" />
                )}
                <span className="mono" style={{ fontSize: "12px", fontWeight: 600 }}>
                  {gradeTitle}
                </span>
              </div>
              <p style={{ fontSize: "13px", color: "var(--on-dark)", lineHeight: 1.45 }}>
                {gradeSub}
              </p>
            </div>

            {/* Checklist of Trade Compliance */}
            <div className="border-hair" style={{ background: "var(--cell-bg)" }}>
              <div className="border-hair-b" style={{ padding: "10px 16px" }}>
                <span className="mono" style={{ fontSize: "10.5px", color: "var(--footer)" }}>
                  TOLERANCE COMPLIANCE MATRIX
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="border-hair-b" style={{ display: "flex", justifyContent: "space-between", padding: "10px 16px", fontSize: "12px" }}>
                  <span>Broken Grain Tolerance (&le; 5.0%)</span>
                  <span className="mono" style={{ color: params.broken <= 5 ? "#00FF66" : "#FFA500" }}>
                    {params.broken <= 5 ? "PASSED" : "EXCEEDED"}
                  </span>
                </div>
                <div className="border-hair-b" style={{ display: "flex", justifyContent: "space-between", padding: "10px 16px", fontSize: "12px" }}>
                  <span>Purity Threshold (&ge; 95.0%)</span>
                  <span className="mono" style={{ color: params.purity >= 95 ? "#00FF66" : "#FFA500" }}>
                    {params.purity >= 95 ? "PASSED" : "LOW PURITY"}
                  </span>
                </div>
                <div className="border-hair-b" style={{ display: "flex", justifyContent: "space-between", padding: "10px 16px", fontSize: "12px" }}>
                  <span>Phytosanitary (Live Insects = 0)</span>
                  <span className="mono" style={{ color: params.liveInsects === 0 ? "#00FF66" : "#FF5555" }}>
                    {params.liveInsects === 0 ? "PASSED" : "FAILED (QUARANTINE)"}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 16px", fontSize: "12px" }}>
                  <span>Minimum Grain Length (&ge; 6.0 mm)</span>
                  <span className="mono" style={{ color: params.averageGrainLength >= 6.0 ? "#00FF66" : "var(--on-dark)" }}>
                    {params.averageGrainLength >= 6.0 ? "LONG GRAIN" : "MEDIUM GRAIN"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <button
              onClick={() => onInjectIntoEnquiry(params)}
              className="cta-btn"
              style={{ width: "100%" }}
            >
              <span>INJECT SPECS INTO INSPECTION ENQUIRY</span>
              <ArrowRight size={14} weight="bold" />
            </button>
            <span className="mono-sm" style={{ color: "var(--footer)", textAlign: "center" }}>
              CARRIES MEASUREMENTS OVER TO /v1/api/raiseenquiry TRANSACTION
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
