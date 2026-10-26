"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StandardsStrip from "@/components/StandardsStrip";
import GrainSpecSimulator, { GrainParams } from "@/components/GrainSpecSimulator";
import DualPipeline from "@/components/DualPipeline";
import SurveyorNetwork from "@/components/SurveyorNetwork";
import ApiExplorer from "@/components/ApiExplorer";
import EnquiryModal from "@/components/EnquiryModal";
import Footer from "@/components/Footer";

export default function Home() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState<boolean>(false);
  const [injectedParams, setInjectedParams] = useState<GrainParams | null>(null);

  const handleOpenEnquiry = () => {
    setIsEnquiryOpen(true);
  };

  const handleCloseEnquiry = () => {
    setIsEnquiryOpen(false);
  };

  const handleInjectIntoEnquiry = (params: GrainParams) => {
    setInjectedParams(params);
    setIsEnquiryOpen(true);
  };

  return (
    <main id="top" style={{ minHeight: "100vh", background: "var(--black)", color: "var(--paper)" }}>
      {/* Provision Header Strip */}
      <Navbar onOpenEnquiry={handleOpenEnquiry} />

      {/* Hero Canvas with 120px hairline grid */}
      <Hero onOpenEnquiry={handleOpenEnquiry} />

      {/* Standards & Accreditation Strip (Backed-By Cell Row) */}
      <StandardsStrip />

      {/* Section 01: Interactive Physical Grain Specification Engine */}
      <GrainSpecSimulator onInjectIntoEnquiry={handleInjectIntoEnquiry} />

      {/* Section 02: Dual Verification Pipeline (Physical vs Chemical) */}
      <DualPipeline />

      {/* Section 03: Surveyor & Inspector Network Directory (Indian + International) */}
      <SurveyorNetwork />

      {/* Section 04: REST API Developer Gateway */}
      <ApiExplorer />

      {/* Global Architectural Footer */}
      <Footer />

      {/* Interactive Modal Workflow for Raising Enquiries */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={handleCloseEnquiry}
        injectedParams={injectedParams}
      />
    </main>
  );
}
