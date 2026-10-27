"use client";

import React, { useState } from "react";
import { Terminal, Copy, Check, Code } from "@phosphor-icons/react";

export default function ApiExplorer() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<"raiseEnquiry" | "phyParam" | "customer">("raiseEnquiry");
  const [copied, setCopied] = useState<boolean>(false);

  const snippets = {
    raiseEnquiry: {
      method: "POST",
      path: "/v1/api/raiseenquiry/inquiries",
      desc: "Submit a new cargo quality inspection request with required certifications and parameters.",
      curl: `curl -X POST https://api.qualty.ai/v1/api/raiseenquiry/inquiries \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <TOKEN>" \\
  -d '{
    "inspectionLocation": "Mundra Port, Berth 04",
    "country": "India",
    "urgencyLevel": "High",
    "commodityCategory": "food & beverages",
    "subCommodity": "rice",
    "riceType": "1121 Basmati",
    "volume": 2500,
    "siUnits": "ton",
    "inspectionType": "single_day",
    "singleDayInspectionDate": "2026-11-04",
    "physicalInspection": true,
    "chemicalTesting": true,
    "certificates": ["GAFTA", "NABL", "ISO"],
    "companyName": "CargoFirst Global Trading",
    "contactPersonName": "Saunak Ghosh",
    "emailAddress": "ops@cargofirst.com"
  }'`,
      response: `{
  "success": true,
  "enquiryId": "QE-2026-9842",
  "status": "ASSIGNING_SURVEYOR",
  "commodity": "Rice (1121 Basmati)",
  "volume": "2500 ton",
  "inspectionLocation": "Mundra Port, Berth 04",
  "allocatedInspectors": 2,
  "dispatchETA": "2026-11-04T06:00:00.000Z"
}`,
    },
    phyParam: {
      method: "POST",
      path: "/v1/api/Phyinspectionparam/save",
      desc: "Record measured physical laboratory metrics (grain dimensions, broken %, purity).",
      curl: `curl -X POST https://api.qualty.ai/v1/api/Phyinspectionparam/save \\
  -H "Content-Type: application/json" \\
  -d '{
    "broken": 2.1,
    "purity": 98.6,
    "yellowKernel": 0.4,
    "damageKernel": 0.5,
    "redKernel": 0.2,
    "paddyKernel": 0.1,
    "chalkyRice": 1.9,
    "liveInsects": 0,
    "millingDegree": "Well Milled",
    "averageGrainLength": 8.42
  }'`,
      response: `{
  "message": "Physical inspection parameter saved successfully!",
  "data": {
    "id": 482,
    "broken": 2.1,
    "purity": 98.6,
    "millingDegree": "Well Milled",
    "averageGrainLength": 8.42,
    "verdict": "Export Grade A"
  }
}`,
    },
    customer: {
      method: "POST",
      path: "/v1/api/customers",
      desc: "Register a trader or cargo owner profile with trade license proof.",
      curl: `curl -X POST https://api.qualty.ai/v1/api/customers \\
  -H "Content-Type: application/json" \\
  -d '{
    "country_code": "IND",
    "full_name": "CargoFirst Maritime Trading Ltd",
    "email_address": "ops@cargofirst.com",
    "mobile_number": "+91-9876543210",
    "trade_license_or_legal_document_photo_url": "https://docs.qualty.ai/license.pdf"
  }'`,
      response: `{
  "customer_id": 104,
  "country_code": "IND",
  "full_name": "CargoFirst Maritime Trading Ltd",
  "email_address": "ops@cargofirst.com",
  "status": "VERIFIED"
}`,
    },
  };

  const current = snippets[selectedEndpoint];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.curl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="api"
      style={{
        padding: "clamp(48px, 7vw, 80px) 20px",
        maxWidth: "1280px",
        margin: "0 auto",
      }}
    >
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
          <Code size={13} weight="bold" />
          <span>SECTION 04 / DEVELOPER GATEWAY</span>
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
          REST API Developer Integration
        </h2>
        <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
          Direct programmatic access for ERPs, commodity trading desks, and freight logistics platforms.
        </p>
      </div>

      {/* Main Terminal Card */}
      <div className="card-shell" style={{ overflow: "hidden" }}>
        {/* Endpoint Selector Tabs */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
            padding: "12px 20px",
            borderBottom: "1px solid var(--border-main)",
            backgroundColor: "var(--bg-subtle)",
          }}
        >
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button
              onClick={() => setSelectedEndpoint("raiseEnquiry")}
              style={{
                padding: "6px 14px",
                borderRadius: "9999px",
                fontSize: "12.5px",
                fontWeight: 600,
                backgroundColor: selectedEndpoint === "raiseEnquiry" ? "var(--bg-card)" : "transparent",
                color: selectedEndpoint === "raiseEnquiry" ? "var(--accent-primary)" : "var(--text-secondary)",
                border: `1px solid ${selectedEndpoint === "raiseEnquiry" ? "var(--border-strong)" : "transparent"}`,
                boxShadow: selectedEndpoint === "raiseEnquiry" ? "var(--shadow-sm)" : "none",
                cursor: "pointer",
              }}
            >
              Raise Enquiry
            </button>
            <button
              onClick={() => setSelectedEndpoint("phyParam")}
              style={{
                padding: "6px 14px",
                borderRadius: "9999px",
                fontSize: "12.5px",
                fontWeight: 600,
                backgroundColor: selectedEndpoint === "phyParam" ? "var(--bg-card)" : "transparent",
                color: selectedEndpoint === "phyParam" ? "var(--accent-primary)" : "var(--text-secondary)",
                border: `1px solid ${selectedEndpoint === "phyParam" ? "var(--border-strong)" : "transparent"}`,
                boxShadow: selectedEndpoint === "phyParam" ? "var(--shadow-sm)" : "none",
                cursor: "pointer",
              }}
            >
              Physical Specs
            </button>
            <button
              onClick={() => setSelectedEndpoint("customer")}
              style={{
                padding: "6px 14px",
                borderRadius: "9999px",
                fontSize: "12.5px",
                fontWeight: 600,
                backgroundColor: selectedEndpoint === "customer" ? "var(--bg-card)" : "transparent",
                color: selectedEndpoint === "customer" ? "var(--accent-primary)" : "var(--text-secondary)",
                border: `1px solid ${selectedEndpoint === "customer" ? "var(--border-strong)" : "transparent"}`,
                boxShadow: selectedEndpoint === "customer" ? "var(--shadow-sm)" : "none",
                cursor: "pointer",
              }}
            >
              Customer Onboarding
            </button>
          </div>

          <button
            onClick={handleCopy}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 600,
              backgroundColor: "var(--bg-card)",
              color: "var(--text-secondary)",
              border: "1px solid var(--border-main)",
              cursor: "pointer",
            }}
          >
            {copied ? <Check size={14} color="var(--success)" weight="bold" /> : <Copy size={14} />}
            <span>{copied ? "Copied" : "Copy cURL"}</span>
          </button>
        </div>

        {/* Endpoint Info Bar */}
        <div
          style={{
            padding: "12px 20px",
            borderBottom: "1px solid var(--border-main)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "13px",
            backgroundColor: "var(--bg-card)",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "#FFFFFF",
              backgroundColor: "var(--accent-primary)",
              padding: "2px 8px",
              borderRadius: "4px",
            }}
          >
            {current.method}
          </span>
          <span className="font-mono" style={{ fontWeight: 600, color: "var(--text-main)" }}>
            {current.path}
          </span>
          <span style={{ color: "var(--text-muted)", marginLeft: "auto", fontSize: "12px", display: "none" }} id="endpoint-desc">
            {current.desc}
          </span>
        </div>

        {/* Code Content Split */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            backgroundColor: "var(--bg-inset)",
          }}
        >
          {/* Request Block */}
          <div style={{ padding: "20px", borderRight: "1px solid var(--border-main)" }}>
            <div style={{ fontSize: "11.5px", fontWeight: 700, color: "var(--text-muted)", marginBottom: "8px", textTransform: "uppercase" }}>
              Request Payload (cURL)
            </div>
            <pre
              className="font-mono"
              style={{
                fontSize: "12.5px",
                lineHeight: 1.5,
                color: "var(--text-main)",
                overflowX: "auto",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {current.curl}
            </pre>
          </div>

          {/* Response Block */}
          <div style={{ padding: "20px" }}>
            <div style={{ fontSize: "11.5px", fontWeight: 700, color: "var(--text-muted)", marginBottom: "8px", textTransform: "uppercase" }}>
              JSON Response (200 OK)
            </div>
            <pre
              className="font-mono"
              style={{
                fontSize: "12.5px",
                lineHeight: 1.5,
                color: "var(--accent-text)",
                overflowX: "auto",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {current.response}
            </pre>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          #endpoint-desc {
            display: inline !important;
          }
        }
      `}</style>
    </section>
  );
}
