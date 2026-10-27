"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle, ArrowRight, ArrowLeft, ShieldCheck, SpinnerGap, Sparkle } from "@phosphor-icons/react";
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
    specialRequirements: "Verify broken percentage, milling degree and export grade classification.",
  });

  useEffect(() => {
    if (injectedParams) {
      setFormData((prev) => ({
        ...prev,
        specialRequirements: `Calibrated Specs: Broken &le; ${injectedParams.broken}%, Purity &ge; ${injectedParams.purity}%, Length &ge; ${injectedParams.averageGrainLength}mm, Milling: ${injectedParams.millingDegree}, Live Insects: ${injectedParams.liveInsects}.`,
      }));
    }
  }, [injectedParams]);

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
    }, 1000);
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setStep(1);
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        backgroundColor: "var(--modal-backdrop)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="card-shell"
        style={{
          width: "100%",
          maxWidth: "640px",
          maxHeight: "90vh",
          overflowY: "auto",
          backgroundColor: "var(--bg-card)",
          boxShadow: "var(--shadow-xl)",
          padding: "28px",
          position: "relative",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <h3 className="font-heading" style={{ fontSize: "20px", fontWeight: 700, color: "var(--text-main)" }}>
                Book Cargo Inspection
              </h3>
              {injectedParams && (
                <span className="badge-pill" style={{ backgroundColor: "var(--accent-light)", color: "var(--accent-text)", fontSize: "11px" }}>
                  <Sparkle size={12} weight="fill" />
                  Specs Linked
                </span>
              )}
            </div>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "2px" }}>
              Dispatch accredited surveyors to loading ports or silos
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "var(--bg-subtle)",
              color: "var(--text-muted)",
              border: "1px solid var(--border-main)",
            }}
          >
            <X size={16} />
          </button>
        </div>

        {submittedRef ? (
          /* Confirmation State */
          <div style={{ textAlign: "center", padding: "32px 16px" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                backgroundColor: "var(--success-bg)",
                color: "var(--success)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 18px",
              }}
            >
              <CheckCircle size={32} weight="fill" />
            </div>

            <h4 className="font-heading" style={{ fontSize: "22px", fontWeight: 700, color: "var(--text-main)", marginBottom: "8px" }}>
              Inspection Order Submitted!
            </h4>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "20px" }}>
              Surveyor dispatch assigned. An accredited marine inspector will mobilize to{" "}
              <strong>{formData.inspectionLocation}</strong>.
            </p>

            <div
              style={{
                backgroundColor: "var(--bg-subtle)",
                border: "1px solid var(--border-main)",
                borderRadius: "10px",
                padding: "16px",
                maxWidth: "340px",
                margin: "0 auto 24px",
              }}
            >
              <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "4px" }}>
                Official Reference ID
              </div>
              <div className="font-mono" style={{ fontSize: "20px", fontWeight: 700, color: "var(--accent-primary)" }}>
                {submittedRef}
              </div>
            </div>

            <button onClick={handleReset} className="btn-primary" style={{ padding: "10px 24px" }}>
              Done & Return
            </button>
          </div>
        ) : (
          /* Multi-step Form */
          <div>
            {/* Steps Indicator */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  style={{
                    flex: 1,
                    height: "4px",
                    borderRadius: "9999px",
                    backgroundColor: s <= step ? "var(--accent-primary)" : "var(--border-main)",
                    transition: "all 0.2s ease",
                  }}
                />
              ))}
            </div>

            {/* Step 1: Location & Commodity */}
            {step === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-main)", display: "block", marginBottom: "6px" }}>
                    Inspection Location / Port Terminal
                  </label>
                  <input
                    type="text"
                    value={formData.inspectionLocation}
                    onChange={(e) => setFormData({ ...formData, inspectionLocation: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid var(--border-main)",
                      backgroundColor: "var(--bg-card)",
                      color: "var(--text-main)",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-main)", display: "block", marginBottom: "6px" }}>
                      Country
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        border: "1px solid var(--border-main)",
                        backgroundColor: "var(--bg-card)",
                        color: "var(--text-main)",
                        fontSize: "14px",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-main)", display: "block", marginBottom: "6px" }}>
                      Urgency Level
                    </label>
                    <select
                      value={formData.urgencyLevel}
                      onChange={(e) => setFormData({ ...formData, urgencyLevel: e.target.value as any })}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        border: "1px solid var(--border-main)",
                        backgroundColor: "var(--bg-card)",
                        color: "var(--text-main)",
                        fontSize: "14px",
                      }}
                    >
                      <option value="Low">Low (&gt; 7 days)</option>
                      <option value="Medium">Medium (3-7 days)</option>
                      <option value="High">High (&lt; 48 hours)</option>
                      <option value="Critical">Critical (&lt; 24 hours)</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-main)", display: "block", marginBottom: "6px" }}>
                      Commodity
                    </label>
                    <input
                      type="text"
                      value={formData.riceType}
                      onChange={(e) => setFormData({ ...formData, riceType: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        border: "1px solid var(--border-main)",
                        backgroundColor: "var(--bg-card)",
                        color: "var(--text-main)",
                        fontSize: "14px",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-main)", display: "block", marginBottom: "6px" }}>
                      Volume (Metric Tons)
                    </label>
                    <input
                      type="number"
                      value={formData.volume}
                      onChange={(e) => setFormData({ ...formData, volume: parseFloat(e.target.value) || 0 })}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        border: "1px solid var(--border-main)",
                        backgroundColor: "var(--bg-card)",
                        color: "var(--text-main)",
                        fontSize: "14px",
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "12px" }}>
                  <button onClick={() => setStep(2)} className="btn-primary" style={{ padding: "10px 20px" }}>
                    <span>Next: Testing Scope</span>
                    <ArrowRight size={14} weight="bold" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Verification Scope */}
            {step === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-main)", display: "block", marginBottom: "8px" }}>
                    Required Inspection Modes
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <div
                      onClick={() => setFormData({ ...formData, physicalInspection: !formData.physicalInspection })}
                      style={{
                        padding: "12px 14px",
                        borderRadius: "8px",
                        border: `1px solid ${formData.physicalInspection ? "var(--accent-primary)" : "var(--border-main)"}`,
                        backgroundColor: formData.physicalInspection ? "var(--accent-light)" : "var(--bg-card)",
                        cursor: "pointer",
                      }}
                    >
                      <strong style={{ fontSize: "13px", color: "var(--text-main)", display: "block" }}>
                        Physical On-Dock
                      </strong>
                      <span style={{ fontSize: "11.5px", color: "var(--text-muted)" }}>
                        Caliper, broken %, moisture, hold cleanliness
                      </span>
                    </div>

                    <div
                      onClick={() => setFormData({ ...formData, chemicalTesting: !formData.chemicalTesting })}
                      style={{
                        padding: "12px 14px",
                        borderRadius: "8px",
                        border: `1px solid ${formData.chemicalTesting ? "var(--accent-primary)" : "var(--border-main)"}`,
                        backgroundColor: formData.chemicalTesting ? "var(--accent-light)" : "var(--bg-card)",
                        cursor: "pointer",
                      }}
                    >
                      <strong style={{ fontSize: "13px", color: "var(--text-main)", display: "block" }}>
                        Chemical Lab Assay
                      </strong>
                      <span style={{ fontSize: "11.5px", color: "var(--text-muted)" }}>
                        Pesticides, aflatoxins, heavy metals
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-main)", display: "block", marginBottom: "8px" }}>
                    Accredited Standards Required
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {["GAFTA", "FOSFA", "NABL", "ISO", "COC"].map((cert) => {
                      const isSelected = formData.certificates.includes(cert);
                      return (
                        <button
                          key={cert}
                          type="button"
                          onClick={() => handleCertToggle(cert)}
                          style={{
                            padding: "6px 14px",
                            borderRadius: "9999px",
                            fontSize: "12.5px",
                            fontWeight: 600,
                            backgroundColor: isSelected ? "var(--accent-primary)" : "var(--bg-subtle)",
                            color: isSelected ? "#FFFFFF" : "var(--text-secondary)",
                            border: `1px solid ${isSelected ? "var(--accent-primary)" : "var(--border-main)"}`,
                            cursor: "pointer",
                          }}
                        >
                          {cert}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-main)", display: "block", marginBottom: "6px" }}>
                    Special Testing Instructions / Calibrated Parameters
                  </label>
                  <textarea
                    rows={3}
                    value={formData.specialRequirements}
                    onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid var(--border-main)",
                      backgroundColor: "var(--bg-card)",
                      color: "var(--text-main)",
                      fontSize: "13px",
                      resize: "vertical",
                    }}
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px" }}>
                  <button onClick={() => setStep(1)} className="btn-secondary" style={{ padding: "10px 18px" }}>
                    <ArrowLeft size={14} weight="bold" />
                    <span>Back</span>
                  </button>

                  <button onClick={() => setStep(3)} className="btn-primary" style={{ padding: "10px 20px" }}>
                    <span>Next: Contact Details</span>
                    <ArrowRight size={14} weight="bold" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Contact & Submission */}
            {step === 3 && (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-main)", display: "block", marginBottom: "6px" }}>
                    Company / Trading House Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid var(--border-main)",
                      backgroundColor: "var(--bg-card)",
                      color: "var(--text-main)",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-main)", display: "block", marginBottom: "6px" }}>
                      Contact Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactPersonName}
                      onChange={(e) => setFormData({ ...formData, contactPersonName: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        border: "1px solid var(--border-main)",
                        backgroundColor: "var(--bg-card)",
                        color: "var(--text-main)",
                        fontSize: "14px",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-main)", display: "block", marginBottom: "6px" }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.emailAddress}
                      onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        border: "1px solid var(--border-main)",
                        backgroundColor: "var(--bg-card)",
                        color: "var(--text-main)",
                        fontSize: "14px",
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-main)", display: "block", marginBottom: "6px" }}>
                      Mobile / WhatsApp
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        border: "1px solid var(--border-main)",
                        backgroundColor: "var(--bg-card)",
                        color: "var(--text-main)",
                        fontSize: "14px",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-main)", display: "block", marginBottom: "6px" }}>
                      Estimated Budget (USD)
                    </label>
                    <input
                      type="number"
                      value={formData.expectedBudgetUSD}
                      onChange={(e) => setFormData({ ...formData, expectedBudgetUSD: parseFloat(e.target.value) || 0 })}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        border: "1px solid var(--border-main)",
                        backgroundColor: "var(--bg-card)",
                        color: "var(--text-main)",
                        fontSize: "14px",
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "14px" }}>
                  <button type="button" onClick={() => setStep(2)} className="btn-secondary" style={{ padding: "10px 18px" }}>
                    <ArrowLeft size={14} weight="bold" />
                    <span>Back</span>
                  </button>

                  <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ padding: "10px 22px" }}>
                    {isSubmitting ? (
                      <>
                        <SpinnerGap size={16} className="animate-spin" />
                        <span>Dispatching Surveyor...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck size={16} weight="bold" />
                        <span>Confirm & Dispatch Surveyor</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
