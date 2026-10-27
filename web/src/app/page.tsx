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
    <main id="top" style={{ minHeight: "100vh", backgroundColor: "var(--bg-page)", color: "var(--text-main)" }}>
      {/* Header Navbar with Theme Toggle */}
      <Navbar onOpenEnquiry={handleOpenEnquiry} />

      {/* Hero Section */}
      <Hero onOpenEnquiry={handleOpenEnquiry} />

      {/* Accreditations Strip */}
      <StandardsStrip />

      {/* Section 01: Physical Grain Calibrator */}
      <GrainSpecSimulator onInjectIntoEnquiry={handleInjectIntoEnquiry} />

      {/* Section 02: Dual Verification Pipeline (Physical vs Chemical) */}
      <DualPipeline />

      {/* Section 03: Surveyor & Inspector Directory */}
      <SurveyorNetwork />

      {/* Section 04: REST API Developer Gateway */}
      <ApiExplorer />

      {/* Footer */}
      <Footer />

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={handleCloseEnquiry}
        injectedParams={injectedParams}
      />
    </main>
  );
}
