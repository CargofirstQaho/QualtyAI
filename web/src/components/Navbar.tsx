"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Crosshair, ShieldCheck } from "@phosphor-icons/react";

interface NavbarProps {
  onOpenEnquiry: () => void;
}

export default function Navbar({ onOpenEnquiry }: NavbarProps) {
  const [utcTime, setUtcTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(
        now.toISOString().replace("T", " ").substring(0, 19) + " UTC"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="border-hair-b" style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)" }}>
      <div style={{ display: "flex", alignItems: "stretch", width: "100%" }}>
        {/* Brand Cell */}
        <a
          href="#top"
          className="border-hair-r"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "16px var(--gut)",
            fontSize: "clamp(16px, 1.4vw, 19px)",
            fontWeight: 600,
            letterSpacing: "-0.035em",
            whiteSpace: "nowrap",
          }}
        >
          <div
            style={{
              width: "22px",
              height: "22px",
              border: "1px solid var(--paper)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                background: "var(--accent)",
              }}
            />
          </div>
          <span>
            QUALTY<span style={{ color: "var(--accent-lit)", marginLeft: "2px" }}>.AI</span>
          </span>
        </a>

        {/* Live System Status Strip (Provision-style) */}
        <div
          className="border-hair-r"
          style={{
            display: "none",
            alignItems: "center",
            gap: "12px",
            padding: "0 24px",
            color: "var(--on-dark)",
          }}
          id="desktop-status"
        >
          <span className="status-dot" />
          <span className="mono" style={{ fontSize: "10.5px" }}>
            GAFTA & NABL ALIGNED · UTC: {utcTime || "SYNCING..."}
          </span>
        </div>

        {/* Center / Navigation Links */}
        <nav
          style={{
            display: "flex",
            flex: 1,
            alignItems: "stretch",
            justifyContent: "flex-end",
          }}
        >
          <a
            href="#spec-simulator"
            className="border-hair-l cell-interactive mono"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0 20px",
              fontSize: "11px",
              color: "var(--on-dark)",
            }}
          >
            GRAIN SPECS
          </a>
          <a
            href="#pipeline"
            className="border-hair-l cell-interactive mono"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0 20px",
              fontSize: "11px",
              color: "var(--on-dark)",
            }}
          >
            VERIFICATION
          </a>
          <a
            href="#surveyors"
            className="border-hair-l cell-interactive mono"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0 20px",
              fontSize: "11px",
              color: "var(--on-dark)",
            }}
          >
            SURVEYORS
          </a>
          <a
            href="#api"
            className="border-hair-l cell-interactive mono"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0 20px",
              fontSize: "11px",
              color: "var(--on-dark)",
            }}
          >
            API
          </a>

          {/* Primary Action Button */}
          <button
            onClick={onOpenEnquiry}
            className="border-hair-l"
            style={{
              background: "var(--accent)",
              color: "var(--paper)",
              padding: "0 24px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              transition: "background 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--accent)")}
          >
            <span className="mono" style={{ fontSize: "11px" }}>RAISE ENQUIRY</span>
            <ArrowRight size={14} weight="bold" />
          </button>
        </nav>
      </div>

      <style jsx>{`
        @media (min-width: 900px) {
          #desktop-status {
            display: flex !important;
          }
        }
        @media (max-width: 640px) {
          nav a {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
