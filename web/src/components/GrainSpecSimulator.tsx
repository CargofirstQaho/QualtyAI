"use client";

import React, { useState } from "react";
import { CheckCircle, Warning, XCircle, Sliders, ArrowRight, Sparkle } from "@phosphor-icons/react";

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
    label: "1121 Basmati Export Extra Long",
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
    label: "Defect Stress Test (Rejected)",
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

interface SimulatorProps {
  onInjectIntoEnquiry: (params: GrainParams) => void;
}

export default function GrainSpecSimulator({ onInjectIntoEnquiry }: SimulatorProps) {
  const [selectedPreset, setSelectedPreset] = useState<string>("basmati1121");
  const [params, setParams] = useState<GrainParams>(PRESETS.basmati1121.params);

  const handlePresetChange = (presetKey: string) => {
    setSelectedPreset(presetKey);
    setParams({ ...PRESETS[presetKey].params });
  };

  const updateParam = <K extends keyof GrainParams>(field: K, value: GrainParams[K]) => {
    setParams((prev) => ({ ...prev, [field]: value }));
  };

  // Evaluation logic
  const isInsectDisqualified = params.liveInsects > 0;
  const isPurityDisqualified = params.purity < 90.0;
  const isBrokenHigh = params.broken > 8.0;
  const totalDefects = (
    params.broken +
    params.yellowKernel +
    params.damageKernel +
    params.redKernel +
    params.paddyKernel +
    params.chalkyRice
  ).toFixed(1);

  let verdict: { status: "PASS" | "WARN" | "REJECT"; label: string; color: string; bg: string; border: string; reason: string } = {
    status: "PASS",
    label: "Export Grade A — Conforming",
    color: "var(--success)",
    bg: "var(--success-bg)",
    border: "var(--success-border)",
    reason: "Meets international export thresholds for bulk cargo clearance.",
  };

  if (isInsectDisqualified) {
    verdict = {
      status: "REJECT",
      label: "Zero-Tolerance Rejection",
      color: "var(--danger)",
      bg: "var(--danger-bg)",
      border: "var(--danger-border)",
      reason: "Live insect infestation detected. Automatic phytosanitary quarantine.",
    };
  } else if (isPurityDisqualified || isBrokenHigh) {
    verdict = {
      status: "REJECT",
      label: "Out of Export Spec",
      color: "var(--danger)",
      bg: "var(--danger-bg)",
      border: "var(--danger-border)",
      reason: "Excessive broken grain or foreign matter below minimum contract threshold.",
    };
  } else if (params.broken > 5.0 || params.damageKernel > 2.0 || params.chalkyRice > 6.0) {
    verdict = {
      status: "WARN",
      label: "Conditional Clearance (Grade B)",
      color: "var(--warning)",
      bg: "var(--warning-bg)",
      border: "var(--warning-border)",
      reason: "Elevated defect parameters. Secondary port inspection recommended.",
    };
  }

  return (
    <section id="simulator" style={{ padding: "clamp(48px, 7vw, 80px) 20px", maxWidth: "1280px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 36px" }}>
        <div
          className="badge-pill"
          style={{
            backgroundColor: "var(--accent-light)",
            color: "var(--accent-text)",
            border: "1px solid var(--accent-border)",
            marginBottom: "14px",
          }}
        >
          <Sliders size={13} weight="bold" />
          <span>SECTION 01 / SPECIFICATION ENGINE</span>
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
          Physical Grain Calibrator
        </h2>
        <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
          Calibrate physical grain quality parameters in real time against GAFTA and ISO inspection criteria before surveyor dispatch.
        </p>
      </div>

      {/* Preset Selectors */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          flexWrap: "wrap",
          marginBottom: "28px",
        }}
      >
        <span style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--text-muted)", marginRight: "4px" }}>
          Presets:
        </span>
        {Object.entries(PRESETS).map(([key, item]) => {
          const isActive = selectedPreset === key;
          return (
            <button
              key={key}
              onClick={() => handlePresetChange(key)}
              style={{
                padding: "8px 14px",
                borderRadius: "9999px",
                fontSize: "12.5px",
                fontWeight: 500,
                backgroundColor: isActive ? "var(--accent-primary)" : "var(--bg-card)",
                color: isActive ? "#FFFFFF" : "var(--text-secondary)",
                border: `1px solid ${isActive ? "var(--accent-primary)" : "var(--border-main)"}`,
                boxShadow: isActive ? "var(--shadow-sm)" : "none",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Interactive Main Two-Column Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "24px",
          alignItems: "start",
        }}
      >
        {/* Left Column: Parameter Sliders */}
        <div className="card-shell" style={{ padding: "24px 28px" }}>
          <h3
            className="font-heading"
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "var(--text-main)",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>Physical Parameters</span>
            <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 500 }}>
              Adjust with sliders
            </span>
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {/* Broken % */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-main)" }}>Broken Grain</span>
                <span className="font-mono" style={{ fontSize: "13px", fontWeight: 700, color: "var(--accent-primary)" }}>
                  {params.broken}%
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
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10.5px", color: "var(--text-muted)", marginTop: "2px" }}>
                <span>0% (Perfect)</span>
                <span>Max Export Limit: 5.0%</span>
                <span>25%</span>
              </div>
            </div>

            {/* Purity % */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-main)" }}>Purity / Foreign Matter</span>
                <span className="font-mono" style={{ fontSize: "13px", fontWeight: 700, color: "var(--accent-primary)" }}>
                  {params.purity}%
                </span>
              </div>
              <input
                type="range"
                min="80"
                max="100"
                step="0.1"
                value={params.purity}
                onChange={(e) => updateParam("purity", parseFloat(e.target.value))}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10.5px", color: "var(--text-muted)", marginTop: "2px" }}>
                <span>80%</span>
                <span>Target: &gt;95%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Average Grain Length */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-main)" }}>Average Grain Length</span>
                <span className="font-mono" style={{ fontSize: "13px", fontWeight: 700, color: "var(--accent-primary)" }}>
                  {params.averageGrainLength} mm
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
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10.5px", color: "var(--text-muted)", marginTop: "2px" }}>
                <span>4.0 mm</span>
                <span>Basmati 1121 &ge; 8.35mm</span>
                <span>9.0 mm</span>
              </div>
            </div>

            {/* Chalky Rice % */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-main)" }}>Chalky Kernels</span>
                <span className="font-mono" style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-secondary)" }}>
                  {params.chalkyRice}%
                </span>
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

            {/* Secondary Defects Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginTop: "4px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>
                  Damage Kernel: {params.damageKernel}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={params.damageKernel}
                  onChange={(e) => updateParam("damageKernel", parseFloat(e.target.value))}
                />
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>
                  Yellow Kernel: {params.yellowKernel}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={params.yellowKernel}
                  onChange={(e) => updateParam("yellowKernel", parseFloat(e.target.value))}
                />
              </div>
            </div>

            {/* Live Insects (Zero Tolerance) */}
            <div
              style={{
                padding: "12px 14px",
                borderRadius: "10px",
                backgroundColor: params.liveInsects > 0 ? "var(--danger-bg)" : "var(--bg-subtle)",
                border: `1px solid ${params.liveInsects > 0 ? "var(--danger-border)" : "var(--border-main)"}`,
                marginTop: "4px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--text-main)" }}>
                    Live Insects (Zero Tolerance)
                  </div>
                  <div style={{ fontSize: "11px", color: params.liveInsects > 0 ? "var(--danger)" : "var(--text-muted)" }}>
                    {params.liveInsects > 0 ? "Non-compliant for phytosanitary clearance" : "Compliant (0 insects detected)"}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "6px" }}>
                  <button
                    onClick={() => updateParam("liveInsects", 0)}
                    style={{
                      padding: "4px 10px",
                      borderRadius: "6px",
                      fontSize: "11px",
                      fontWeight: 600,
                      backgroundColor: params.liveInsects === 0 ? "var(--success)" : "var(--bg-card)",
                      color: params.liveInsects === 0 ? "#FFFFFF" : "var(--text-secondary)",
                      border: "1px solid var(--border-main)",
                    }}
                  >
                    0 (Pass)
                  </button>
                  <button
                    onClick={() => updateParam("liveInsects", 1)}
                    style={{
                      padding: "4px 10px",
                      borderRadius: "6px",
                      fontSize: "11px",
                      fontWeight: 600,
                      backgroundColor: params.liveInsects > 0 ? "var(--danger)" : "var(--bg-card)",
                      color: params.liveInsects > 0 ? "#FFFFFF" : "var(--text-secondary)",
                      border: "1px solid var(--border-main)",
                    }}
                  >
                    &gt;0 (Fail)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Verdict & Export Summary */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Main Verdict Card */}
          <div
            className="card-shell"
            style={{
              padding: "24px",
              backgroundColor: verdict.bg,
              borderColor: verdict.border,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              {verdict.status === "PASS" ? (
                <CheckCircle size={24} color={verdict.color} weight="fill" />
              ) : verdict.status === "WARN" ? (
                <Warning size={24} color={verdict.color} weight="fill" />
              ) : (
                <XCircle size={24} color={verdict.color} weight="fill" />
              )}
              <h4
                className="font-heading"
                style={{
                  fontSize: "19px",
                  fontWeight: 700,
                  color: "var(--text-main)",
                }}
              >
                {verdict.label}
              </h4>
            </div>

            <p style={{ fontSize: "13.5px", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "16px" }}>
              {verdict.reason}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "12px",
                borderRadius: "10px",
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-main)",
              }}
            >
              <div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Total Defects</div>
                <div className="font-mono" style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-main)" }}>
                  {totalDefects}%
                </div>
              </div>
              <div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Purity Score</div>
                <div className="font-mono" style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-main)" }}>
                  {params.purity}%
                </div>
              </div>
            </div>
          </div>

          {/* Quick Specifications Breakdown */}
          <div className="card-shell" style={{ padding: "22px 24px" }}>
            <h4
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--text-main)",
                marginBottom: "14px",
              }}
            >
              Calibrated Cargo Specifications
            </h4>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
                <span>Milling Degree:</span>
                <span style={{ fontWeight: 600, color: "var(--text-main)" }}>{params.millingDegree}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
                <span>Grain Length:</span>
                <span className="font-mono" style={{ fontWeight: 600, color: "var(--text-main)" }}>
                  {params.averageGrainLength} mm
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
                <span>Red & Paddy Kernels:</span>
                <span className="font-mono" style={{ fontWeight: 600, color: "var(--text-main)" }}>
                  {(params.redKernel + params.paddyKernel).toFixed(1)}%
                </span>
              </div>
            </div>

            <button
              onClick={() => onInjectIntoEnquiry(params)}
              className="btn-primary"
              style={{
                width: "100%",
                marginTop: "20px",
                padding: "12px",
                fontSize: "14px",
              }}
            >
              <Sparkle size={16} weight="fill" />
              <span>Use Specs in Inspection Order</span>
              <ArrowRight size={14} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
