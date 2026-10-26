"use client";

import React from "react";
import { ArrowRight, ArrowDown } from "@phosphor-icons/react";

interface HeroProps {
  onOpenEnquiry: () => void;
}

export default function Hero({ onOpenEnquiry }: HeroProps) {
  return (
    <section
      className="grid-canvas border-hair-b"
      style={{
        position: "relative",
        minHeight: "calc(100vh - 58px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
      }}
    >
      {/* Stage: Centered high-impact typography */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "clamp(48px, 9vh, 96px) var(--gut)",
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Eyebrow Label */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            border: "1px solid var(--hair-dark)",
            background: "rgba(10, 10, 10, 0.8)",
            padding: "6px 14px",
            marginBottom: "clamp(20px, 3vh, 32px)",
          }}
        >
          <span className="status-dot-blue" />
          <span className="mono" style={{ fontSize: "11px", color: "var(--paper)" }}>
            PHYSICAL QUALITY VERIFICATION & SURVEYOR INFRASTRUCTURE
          </span>
        </div>

        {/* H1 Heading (Provision style: clamp font size, -0.042em tracking, text-wrap balance) */}
        <h1
          style={{
            margin: "0 0 clamp(18px, 2.4vh, 28px)",
            fontSize: "clamp(2.5rem, 5.8vw, 4.8rem)",
            fontWeight: 500,
            lineHeight: 1.04,
            letterSpacing: "-0.042em",
            maxWidth: "23ch",
            color: "var(--paper)",
          }}
        >
          Accelerating trust in global commodity trade.
        </h1>

        {/* Subtitle */}
        <p
          style={{
            margin: "0 0 clamp(28px, 4vh, 44px)",
            fontSize: "clamp(1.0rem, 1.25vw, 1.25rem)",
            fontWeight: 400,
            lineHeight: 1.5,
            letterSpacing: "-0.016em",
            color: "var(--on-dark)",
            maxWidth: "50ch",
          }}
        >
          Precision physical analysis, certified chemical parameter validation, and an accredited surveyor network for global freight, grain trade, and bulk cargo.
        </p>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          <button onClick={onOpenEnquiry} className="cta-btn">
            <span>RAISE INSPECTION ENQUIRY</span>
            <span className="arrow" aria-hidden="true">&rarr;</span>
          </button>

          <a href="#spec-simulator" className="cta-secondary">
            <span>EXPLORE SPEC ENGINE</span>
            <ArrowDown size={14} />
          </a>
        </div>
      </div>

      {/* Hero Metric Band: Provision-style border-separated cells */}
      <div
        className="border-hair-t"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          position: "relative",
          zIndex: 2,
          background: "var(--black)",
        }}
      >
        <div className="border-hair-r" style={{ padding: "20px var(--gut)" }}>
          <span className="mono" style={{ color: "var(--footer)", display: "block", marginBottom: "4px" }}>
            01 / PHYSICAL ASSAY
          </span>
          <div style={{ fontSize: "16px", fontWeight: 500, letterSpacing: "-0.02em" }}>
            10-Point Grain Metrics
          </div>
          <div className="mono-sm" style={{ color: "var(--on-dark)", marginTop: "2px" }}>
            Broken %, Purity %, Chalky, Milling
          </div>
        </div>

        <div className="border-hair-r" style={{ padding: "20px var(--gut)" }}>
          <span className="mono" style={{ color: "var(--footer)", display: "block", marginBottom: "4px" }}>
            02 / CHEMICAL SCREENING
          </span>
          <div style={{ fontSize: "16px", fontWeight: 500, letterSpacing: "-0.02em" }}>
            ISO / NABL Certified Labs
          </div>
          <div className="mono-sm" style={{ color: "var(--on-dark)", marginTop: "2px" }}>
            Pesticide MRLs, Heavy Metals, Aflatoxins
          </div>
        </div>

        <div className="border-hair-r" style={{ padding: "20px var(--gut)" }}>
          <span className="mono" style={{ color: "var(--footer)", display: "block", marginBottom: "4px" }}>
            03 / SURVEYOR NETWORK
          </span>
          <div style={{ fontSize: "16px", fontWeight: 500, letterSpacing: "-0.02em" }}>
            India & International Ports
          </div>
          <div className="mono-sm" style={{ color: "var(--on-dark)", marginTop: "2px" }}>
            Mundra, JNPT, Vizag, Rotterdam, Dubai
          </div>
        </div>

        <div style={{ padding: "20px var(--gut)" }}>
          <span className="mono" style={{ color: "var(--footer)", display: "block", marginBottom: "4px" }}>
            04 / DISPATCH LATENCY
          </span>
          <div style={{ fontSize: "16px", fontWeight: 500, letterSpacing: "-0.02em" }}>
            &lt; 4.0 Hours On-Dock
          </div>
          <div className="mono-sm" style={{ color: "var(--on-dark)", marginTop: "2px" }}>
            Single-day & Multi-day Audits
          </div>
        </div>
      </div>
    </section>
  );
}
