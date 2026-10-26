"use client";

import React, { useState } from "react";
import { Terminal, Copy, Check, Code } from "@phosphor-icons/react";

export default function ApiExplorer() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<"raiseEnquiry" | "phyParam" | "customer">("raiseEnquiry");
  const [copied, setCopied] = useState<boolean>(false);

  const snippets = {
    raiseEnquiry: {
      method: "POST",
      path: "/v1/api/raiseenquiry",
      desc: "Submit a new bulk/container cargo inspection enquiry with parameters.",
      curl: `curl -X POST https://api.qualty.ai/v1/api/raiseenquiry \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <JWT_TOKEN>" \\
  -d '{
    "inspectionLocation": "Mundra Port Terminal 2",
    "country": "India",
    "urgencyLevel": "High",
    "commodityCategory": "Food & Beverages",
    "subCommodity": "Rice",
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
    "emailAddress": "trade@cargofirst.com",
    "expectedBudgetUSD": 4500
  }'`,
      response: `{
  "success": true,
  "enquiryId": "QE-2026-9842",
  "status": "ASSIGNING_SURVEYOR",
  "commodity": "Rice (1121 Basmati)",
  "volume": "2500 ton",
  "inspectionLocation": "Mundra Port Terminal 2",
  "allocatedInspectors": 2,
  "dispatchETA": "2026-11-04T06:00:00.000Z",
  "createdAt": "2026-10-27T01:30:00.000Z"
}`,
    },
    phyParam: {
      method: "POST",
      path: "/v1/api/Phyinspectionparam",
      desc: "Record measured physical laboratory metrics (grain dimensions, defects).",
      curl: `curl -X POST https://api.qualty.ai/v1/api/Phyinspectionparam \\
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
    "yellow_kernel": 0.4,
    "damage_kernel": 0.5,
    "red_kernel": 0.2,
    "paddy_kernel": 0.1,
    "chalky_rice": 1.9,
    "live_insects": 0,
    "milling_degree": "Well Milled",
    "average_grain_length": 8.42,
    "createdAt": "2026-10-27T01:30:00.000Z"
  }
}`,
    },
    customer: {
      method: "POST",
      path: "/v1/api/customers",
      desc: "Register a trader or corporate buyer account with trade license proof.",
      curl: `curl -X POST https://api.qualty.ai/v1/api/customers \\
  -H "Content-Type: application/json" \\
  -d '{
    "country_code": "IND",
    "full_name": "CargoFirst Maritime Trading Ltd",
    "email_address": "ops@cargofirst.com",
    "mobile_number": "+91-9876543210",
    "trade_license_or_legal_document_photo_url": "https://storage.qualty.ai/docs/license-cargofirst.pdf"
  }'`,
      response: `{
  "customer_id": 104,
  "country_code": "IND",
  "full_name": "CargoFirst Maritime Trading Ltd",
  "email_address": "ops@cargofirst.com",
  "status": "KYC_VERIFIED",
  "createdAt": "2026-10-27T01:30:00.000Z"
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
    <section id="api" className="border-hair-b" style={{ background: "var(--black)" }}>
      {/* Header */}
      <div className="border-hair-b" style={{ display: "flex", alignItems: "stretch", flexWrap: "wrap" }}>
        <div className="border-hair-r" style={{ padding: "18px var(--gut)", display: "flex", alignItems: "center", gap: "10px" }}>
          <span className="mono" style={{ color: "var(--accent-lit)" }}>SECTION 04</span>
          <span className="mono" style={{ color: "var(--paper)" }}>/ REST API DEVELOPER GATEWAY</span>
        </div>
        <div style={{ padding: "18px var(--gut)", flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", color: "var(--on-dark)" }}>
          <span className="mono" style={{ fontSize: "10.5px" }}>
            EXPRESS 4.21 · POSTGRESQL · PORT: 3214
          </span>
        </div>
      </div>

      {/* Endpoint Tabs */}
      <div className="border-hair-b" style={{ display: "flex", alignItems: "stretch", flexWrap: "wrap", background: "#060606" }}>
        <button
          onClick={() => setSelectedEndpoint("raiseEnquiry")}
          className="border-hair-r cell-interactive"
          style={{
            padding: "14px 20px",
            background: selectedEndpoint === "raiseEnquiry" ? "var(--accent)" : "transparent",
            color: selectedEndpoint === "raiseEnquiry" ? "var(--paper)" : "var(--on-dark)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span className="mono" style={{ fontSize: "10px", background: "rgba(255,255,255,0.2)", padding: "2px 6px" }}>POST</span>
          <span className="mono" style={{ fontSize: "11px" }}>/v1/api/raiseenquiry</span>
        </button>

        <button
          onClick={() => setSelectedEndpoint("phyParam")}
          className="border-hair-r cell-interactive"
          style={{
            padding: "14px 20px",
            background: selectedEndpoint === "phyParam" ? "var(--accent)" : "transparent",
            color: selectedEndpoint === "phyParam" ? "var(--paper)" : "var(--on-dark)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span className="mono" style={{ fontSize: "10px", background: "rgba(255,255,255,0.2)", padding: "2px 6px" }}>POST</span>
          <span className="mono" style={{ fontSize: "11px" }}>/v1/api/Phyinspectionparam</span>
        </button>

        <button
          onClick={() => setSelectedEndpoint("customer")}
          className="border-hair-r cell-interactive"
          style={{
            padding: "14px 20px",
            background: selectedEndpoint === "customer" ? "var(--accent)" : "transparent",
            color: selectedEndpoint === "customer" ? "var(--paper)" : "var(--on-dark)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span className="mono" style={{ fontSize: "10px", background: "rgba(255,255,255,0.2)", padding: "2px 6px" }}>POST</span>
          <span className="mono" style={{ fontSize: "11px" }}>/v1/api/customers</span>
        </button>
      </div>

      {/* Code Display Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))" }}>
        {/* Left: Request Snippet */}
        <div className="border-hair-r" style={{ padding: "clamp(20px, 3.5vw, 36px) var(--gut)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <span className="mono" style={{ color: "var(--footer)", fontSize: "11px" }}>
              HTTP REQUEST SPECIFICATION
            </span>
            <button
              onClick={handleCopy}
              className="mono border-hair cell-interactive"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                fontSize: "10.5px",
                color: "var(--paper)",
              }}
            >
              {copied ? <Check size={14} color="#00FF66" /> : <Copy size={14} />}
              <span>{copied ? "COPIED" : "COPY CURL"}</span>
            </button>
          </div>

          <pre
            style={{
              background: "#050505",
              border: "1px solid var(--hair-dark)",
              padding: "18px",
              fontFamily: "var(--mono)",
              fontSize: "12px",
              color: "#E2E8F0",
              overflowX: "auto",
              lineHeight: 1.55,
            }}
          >
            <code>{current.curl}</code>
          </pre>
        </div>

        {/* Right: Response Payload */}
        <div style={{ padding: "clamp(20px, 3.5vw, 36px) var(--gut)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <span className="mono" style={{ color: "var(--footer)", fontSize: "11px" }}>
              200 OK — JSON RESPONSE
            </span>
            <span className="mono" style={{ color: "var(--accent-lit)", fontSize: "10.5px" }}>
              APPLICATION/JSON
            </span>
          </div>

          <pre
            style={{
              background: "#050505",
              border: "1px solid var(--hair-dark)",
              padding: "18px",
              fontFamily: "var(--mono)",
              fontSize: "12px",
              color: "#60A5FA",
              overflowX: "auto",
              lineHeight: 1.55,
            }}
          >
            <code>{current.response}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
