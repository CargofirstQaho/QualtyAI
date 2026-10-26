"use client";

import React, { useState } from "react";
import { X, CheckCircle, ArrowRight, ArrowLeft, ShieldCheck, SpinnerGap } from "@phosphor-icons/react";
import { GrainParams } from "./GrainSpecSimulator";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  injectedParams?: GrainParams | null;
}

export default function EnquiryModal({ isOpen, onClose, injectedParams }: EnquiryModalProps) {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  // Form State matching Raiseenquiry model exactly
  const [formData, setFormData] = useState({
    inspectionLocation: "Mundra Port, Gujarat, Berth 04",
    country: "India",
    urgencyLevel: "High" as "Low" | "Medium" | "High" | "Critical",
    commodityCategory: "food & beverages",
    subCommodity: "rice",
    riceType: "1121 Basmati",
    volume: 2500,
    siUnits: "ton",
    expectedBudgetUSD: 3800,
    inspectionType: "single_day" as "single_day" | "multi_day",
    singleDayInspectionDate: "2026-11-04",
    multiDayInspectionStartDate: "",
    multiDayInspectionEndDate: "",
    physicalInspection: true,
    chemicalTesting: true,
    certificates: ["GAFTA", "NABL", "ISO"],
    companyName: "CargoFirst Global Trading FZE",
    contactPersonName: "Saunak Ghosh",
    emailAddress: "ops@cargofirst.com",
    phoneNumber: "+91 98765 43210",
    specialRequirements: "Verify broken percentage, milling degree and export grade A classification.",
  });

  if (!isOpen) return null;

  const handleCertToggle = (cert: string) => {
    setFormData((prev) => ({
      ...prev,
      certificates: prev.certificates.includes(cert)
        ? prev.certificates.filter((c) => c !== cert)
        : [...prev.certificates, cert],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedId = `QE-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedRef(generatedId);
    }, 1200);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(0, 0, 0, 0.88)",
        backdropFilter: "blur(16px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        className="border-hair"
        style={{
          width: "100%",
          maxWidth: "760px",
          background: "var(--black)",
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 20px 60px rgba(0,0,0,0.9)",
        }}
      >
        {/* Modal Top Bar */}
        <div
          className="border-hair-b"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "stretch",
            background: "#060606",
          }}
        >
          <div style={{ padding: "16px var(--gut)", display: "flex", alignItems: "center", gap: "12px" }}>
            <span className="status-dot-blue" />
            <span className="mono" style={{ fontSize: "11px", color: "var(--paper)" }}>
              NEW CARGO INSPECTION ENQUIRY / /v1/api/raiseenquiry
            </span>
          </div>

          <button
            onClick={onClose}
            className="border-hair-l cell-interactive"
            style={{
              padding: "0 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--on-dark)",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "clamp(24px, 4vw, 36px) var(--gut)" }}>
          {submittedRef ? (
            /* Success confirmation */
            <div style={{ textAlign: "center", padding: "32px 16px" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  background: "rgba(14, 0, 255, 0.15)",
                  border: "1px solid var(--accent)",
                  margin: "0 auto 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CheckCircle size={32} color="var(--accent-lit)" weight="fill" />
              </div>

              <span className="mono" style={{ color: "var(--accent-lit)", fontSize: "12px", display: "block", marginBottom: "8px" }}>
                TRANSACTION EXECUTED SUCCESSFULLY
              </span>
              <h2 style={{ fontSize: "28px", fontWeight: 500, letterSpacing: "-0.03em", marginBottom: "12px" }}>
                Enquiry Reference: {submittedRef}
              </h2>
              <p style={{ color: "var(--on-dark)", fontSize: "14px", lineHeight: 1.6, maxWidth: "48ch", margin: "0 auto 24px" }}>
                Your enquiry for <strong style={{ color: "var(--paper)" }}>{formData.volume} {formData.siUnits} of {formData.riceType || formData.subCommodity}</strong> at <strong style={{ color: "var(--paper)" }}>{formData.inspectionLocation}</strong> has been received. On-dock surveyor dispatch is scheduled.
              </p>

              {injectedParams && (
                <div
                  className="border-hair"
                  style={{
                    background: "#070707",
                    padding: "16px",
                    textAlign: "left",
                    marginBottom: "24px",
                    fontFamily: "var(--mono)",
                    fontSize: "11px",
                    color: "var(--on-dark)",
                  }}
                >
                  <div style={{ color: "var(--paper)", marginBottom: "6px" }}>ATTACHED PHYSICAL PARAMETER SET:</div>
                  <div>Broken: {injectedParams.broken}% · Purity: {injectedParams.purity}% · Chalky: {injectedParams.chalkyRice}% · Length: {injectedParams.averageGrainLength}mm</div>
                </div>
              )}

              <button
                onClick={() => {
                  setSubmittedRef(null);
                  onClose();
                }}
                className="cta-btn"
                style={{ margin: "0 auto" }}
              >
                RETURN TO OVERVIEW
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Stepper Header */}
              <div
                className="border-hair-b"
                style={{
                  display: "flex",
                  marginBottom: "28px",
                  paddingBottom: "16px",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", gap: "20px" }}>
                  <span
                    className="mono"
                    style={{
                      color: step === 1 ? "var(--accent-lit)" : "var(--footer)",
                      fontSize: "11px",
                    }}
                  >
                    01 / CARGO SPEC
                  </span>
                  <span
                    className="mono"
                    style={{
                      color: step === 2 ? "var(--accent-lit)" : "var(--footer)",
                      fontSize: "11px",
                    }}
                  >
                    02 / AUDIT SCOPE
                  </span>
                  <span
                    className="mono"
                    style={{
                      color: step === 3 ? "var(--accent-lit)" : "var(--footer)",
                      fontSize: "11px",
                    }}
                  >
                    03 / COMMERCIALS
                  </span>
                </div>
                <span className="mono" style={{ fontSize: "11px", color: "var(--footer)" }}>
                  STEP {step} OF 3
                </span>
              </div>

              {/* STEP 1: Commodity & Location */}
              {step === 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div>
                    <label className="mono" style={{ display: "block", fontSize: "10.5px", color: "var(--footer)", marginBottom: "6px" }}>
                      INSPECTION LOCATION & PORT / SILO BERTH
                    </label>
                    <input
                      type="text"
                      className="cell-input"
                      value={formData.inspectionLocation}
                      onChange={(e) => setFormData({ ...formData, inspectionLocation: e.target.value })}
                      required
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                      <label className="mono" style={{ display: "block", fontSize: "10.5px", color: "var(--footer)", marginBottom: "6px" }}>
                        DESTINATION / ORIGIN COUNTRY
                      </label>
                      <input
                        type="text"
                        className="cell-input"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="mono" style={{ display: "block", fontSize: "10.5px", color: "var(--footer)", marginBottom: "6px" }}>
                        URGENCY LEVEL
                      </label>
                      <select
                        className="cell-input"
                        value={formData.urgencyLevel}
                        onChange={(e) => setFormData({ ...formData, urgencyLevel: e.target.value as any })}
                      >
                        <option value="Low">Low (Standard 48h)</option>
                        <option value="Medium">Medium (24h)</option>
                        <option value="High">High (Same-Day Express)</option>
                        <option value="Critical">Critical (Immediate On-Dock)</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                      <label className="mono" style={{ display: "block", fontSize: "10.5px", color: "var(--footer)", marginBottom: "6px" }}>
                        COMMODITY CATEGORY
                      </label>
                      <select
                        className="cell-input"
                        value={formData.commodityCategory}
                        onChange={(e) => setFormData({ ...formData, commodityCategory: e.target.value })}
                      >
                        <option value="food & beverages">Food & Beverages</option>
                        <option value="textiles & garments">Textiles & Garments</option>
                        <option value="chemicals">Chemicals</option>
                        <option value="pharmaceuticals">Pharmaceuticals</option>
                        <option value="other">Other Industrial</option>
                      </select>
                    </div>

                    <div>
                      <label className="mono" style={{ display: "block", fontSize: "10.5px", color: "var(--footer)", marginBottom: "6px" }}>
                        SUB-COMMODITY
                      </label>
                      <select
                        className="cell-input"
                        value={formData.subCommodity}
                        onChange={(e) => setFormData({ ...formData, subCommodity: e.target.value })}
                      >
                        <option value="rice">Rice</option>
                        <option value="wheat">Wheat</option>
                        <option value="pulses">Pulses</option>
                        <option value="spices">Spices</option>
                        <option value="oil and seeds">Oil & Seeds</option>
                      </select>
                    </div>
                  </div>

                  {formData.subCommodity === "rice" && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      <div>
                        <label className="mono" style={{ display: "block", fontSize: "10.5px", color: "var(--footer)", marginBottom: "6px" }}>
                          RICE VARIETAL TYPE (riceType)
                        </label>
                        <input
                          type="text"
                          className="cell-input"
                          value={formData.riceType}
                          onChange={(e) => setFormData({ ...formData, riceType: e.target.value })}
                          placeholder="e.g. 1121 Basmati, IR 64"
                        />
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "8px" }}>
                        <div>
                          <label className="mono" style={{ display: "block", fontSize: "10.5px", color: "var(--footer)", marginBottom: "6px" }}>
                            VOLUME
                          </label>
                          <input
                            type="number"
                            className="cell-input"
                            value={formData.volume}
                            onChange={(e) => setFormData({ ...formData, volume: parseFloat(e.target.value) || 0 })}
                            required
                          />
                        </div>
                        <div>
                          <label className="mono" style={{ display: "block", fontSize: "10.5px", color: "var(--footer)", marginBottom: "6px" }}>
                            UNIT
                          </label>
                          <select
                            className="cell-input"
                            value={formData.siUnits}
                            onChange={(e) => setFormData({ ...formData, siUnits: e.target.value })}
                          >
                            <option value="ton">Ton</option>
                            <option value="kg">Kg</option>
                            <option value="pieces">Bags</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 2: Audit Scope & Dates */}
              {step === 2 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                      <label className="mono" style={{ display: "block", fontSize: "10.5px", color: "var(--footer)", marginBottom: "6px" }}>
                        INSPECTION TIMEFRAME
                      </label>
                      <select
                        className="cell-input"
                        value={formData.inspectionType}
                        onChange={(e) => setFormData({ ...formData, inspectionType: e.target.value as any })}
                      >
                        <option value="single_day">Single Day Inspection</option>
                        <option value="multi_day">Multi-Day Continuous Survey</option>
                      </select>
                    </div>

                    <div>
                      <label className="mono" style={{ display: "block", fontSize: "10.5px", color: "var(--footer)", marginBottom: "6px" }}>
                        TARGET DATE
                      </label>
                      <input
                        type="date"
                        className="cell-input"
                        value={formData.singleDayInspectionDate}
                        onChange={(e) => setFormData({ ...formData, singleDayInspectionDate: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {/* Service toggles */}
                  <div>
                    <label className="mono" style={{ display: "block", fontSize: "10.5px", color: "var(--footer)", marginBottom: "10px" }}>
                      REQUIRED VERIFICATION SERVICES
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div
                        onClick={() => setFormData({ ...formData, physicalInspection: !formData.physicalInspection })}
                        className="border-hair cell-interactive"
                        style={{
                          padding: "14px",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          cursor: "pointer",
                          background: formData.physicalInspection ? "rgba(14,0,255,0.12)" : "transparent",
                          borderColor: formData.physicalInspection ? "var(--accent)" : "var(--hair-dark)",
                        }}
                      >
                        <div
                          style={{
                            width: "16px",
                            height: "16px",
                            border: "1px solid var(--paper)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: formData.physicalInspection ? "var(--accent)" : "transparent",
                          }}
                        >
                          {formData.physicalInspection && <span style={{ fontSize: "10px" }}>✓</span>}
                        </div>
                        <div>
                          <div style={{ fontSize: "13px", fontWeight: 500 }}>Physical Cargo Inspection</div>
                          <div style={{ fontSize: "11px", color: "var(--footer)" }}>Grain dimension, defect count, draft survey</div>
                        </div>
                      </div>

                      <div
                        onClick={() => setFormData({ ...formData, chemicalTesting: !formData.chemicalTesting })}
                        className="border-hair cell-interactive"
                        style={{
                          padding: "14px",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          cursor: "pointer",
                          background: formData.chemicalTesting ? "rgba(14,0,255,0.12)" : "transparent",
                          borderColor: formData.chemicalTesting ? "var(--accent)" : "var(--hair-dark)",
                        }}
                      >
                        <div
                          style={{
                            width: "16px",
                            height: "16px",
                            border: "1px solid var(--paper)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: formData.chemicalTesting ? "var(--accent)" : "transparent",
                          }}
                        >
                          {formData.chemicalTesting && <span style={{ fontSize: "10px" }}>✓</span>}
                        </div>
                        <div>
                          <div style={{ fontSize: "13px", fontWeight: 500 }}>Chemical Lab Testing</div>
                          <div style={{ fontSize: "11px", color: "var(--footer)" }}>Pesticide MRL, Aflatoxins, ICP-MS metals</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Certificate Selection */}
                  <div>
                    <label className="mono" style={{ display: "block", fontSize: "10.5px", color: "var(--footer)", marginBottom: "8px" }}>
                      MANDATORY ACCREDITATIONS & CERTIFICATES
                    </label>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {["GAFTA", "NABL", "ISO", "NABCB", "COC", "FOFSE"].map((cert) => {
                        const isIncluded = formData.certificates.includes(cert);
                        return (
                          <button
                            type="button"
                            key={cert}
                            onClick={() => handleCertToggle(cert)}
                            className="border-hair cell-interactive"
                            style={{
                              padding: "8px 14px",
                              fontSize: "11px",
                              fontFamily: "var(--mono)",
                              background: isIncluded ? "var(--accent)" : "transparent",
                              color: isIncluded ? "var(--paper)" : "var(--on-dark)",
                              borderColor: isIncluded ? "var(--accent)" : "var(--hair-dark)",
                            }}
                          >
                            {cert}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Company & Commercials */}
              {step === 3 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                      <label className="mono" style={{ display: "block", fontSize: "10.5px", color: "var(--footer)", marginBottom: "6px" }}>
                        COMPANY NAME
                      </label>
                      <input
                        type="text"
                        className="cell-input"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="mono" style={{ display: "block", fontSize: "10.5px", color: "var(--footer)", marginBottom: "6px" }}>
                        CONTACT PERSON
                      </label>
                      <input
                        type="text"
                        className="cell-input"
                        value={formData.contactPersonName}
                        onChange={(e) => setFormData({ ...formData, contactPersonName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                      <label className="mono" style={{ display: "block", fontSize: "10.5px", color: "var(--footer)", marginBottom: "6px" }}>
                        OFFICIAL EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        className="cell-input"
                        value={formData.emailAddress}
                        onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="mono" style={{ display: "block", fontSize: "10.5px", color: "var(--footer)", marginBottom: "6px" }}>
                        EXPECTED BUDGET (USD)
                      </label>
                      <input
                        type="number"
                        className="cell-input"
                        value={formData.expectedBudgetUSD}
                        onChange={(e) => setFormData({ ...formData, expectedBudgetUSD: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mono" style={{ display: "block", fontSize: "10.5px", color: "var(--footer)", marginBottom: "6px" }}>
                      SPECIAL INSTRUCTIONS / SAMPLING MANDATE
                    </label>
                    <textarea
                      className="cell-input"
                      rows={3}
                      value={formData.specialRequirements}
                      onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {/* Navigation Actions */}
              <div
                className="border-hair-t"
                style={{
                  marginTop: "32px",
                  paddingTop: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="cta-secondary"
                  >
                    <ArrowLeft size={14} />
                    <span>PREVIOUS</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="cta-btn"
                  >
                    <span>CONTINUE TO STEP 0{step + 1}</span>
                    <ArrowRight size={14} weight="bold" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cta-btn"
                    style={{ background: "var(--accent)" }}
                  >
                    {isSubmitting ? (
                      <>
                        <SpinnerGap size={14} className="animate-spin" />
                        <span>ALLOCATING SURVEYOR...</span>
                      </>
                    ) : (
                      <>
                        <span>SUBMIT INSPECTION TRANSACTION</span>
                        <ArrowRight size={14} weight="bold" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
