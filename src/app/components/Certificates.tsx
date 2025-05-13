"use client";
import { motion } from "framer-motion";
import { FiDownload, FiX } from "react-icons/fi";
import { Document, Page, pdfjs } from "react-pdf";
import Image from "next/image";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useEffect, useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

type Certificate = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  pdfUrl?: string;
  thumbnail: string;
  inProgress?: boolean;
};

export default function Certificates() {
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageWidth, setPageWidth] = useState(800);

  useEffect(() => {
    setPageWidth(Math.min(800, window.innerWidth - 64));
  }, []);

  const certificates: Certificate[] = [
    {
      id: "cv",
      title: "Curriculum Vitae",
      issuer: "Richard A.",
      date: "",
      pdfUrl: "/certs/richard-cv.pdf",
      thumbnail: "/certs/richard-cv-thumb.webp",
    },
    {
      id: "frontend-cert",
      title: "Google UX Design Certificate",
      issuer: "Coursera",
      date: "2025 (Upcoming)",
      thumbnail: "/certs/frontend-pro-thumb.webp",
      inProgress: true,
    },
  ];

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <section
      id="certificates"
      className="relative py-28 px-4 max-w-7xl mx-auto"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/0 via-primary/50 to-primary" />

      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-4xl font-orbitron mb-6"
          initial={{ x: -20 }}
          whileInView={{ x: 0 }}
          viewport={{ once: true }}
        >
          <span className="font-mono text-accent mr-2">{"//"}</span>
          My <span className="text-accent">Credentials</span>
        </motion.h2>
        <motion.div
          className="h-0.5 bg-gradient-to-r from-accent/0 via-accent to-accent/0 w-1/2"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />
      </motion.div>

      <div className="relative">
        <div className="absolute left-4 top-14 h-0.5 w-[calc(100%-2rem)] bg-accent/20 z-0" />

        <div className="relative overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide">
          <div className="flex gap-8 w-max px-4">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                className="snap-center shrink-0 w-80"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="relative group">
                  <div
                    className={`absolute -left-4 top-14 w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                      cert.inProgress
                        ? "border-2 border-accent border-dashed animate-spin-slow"
                        : "bg-accent"
                    }`}
                  >
                    {!cert.inProgress && (
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    )}
                  </div>

                  <div
                    onClick={() => {
                      if (!cert.inProgress) {
                        if (cert.id === "cv") {
                          window.open(cert.pdfUrl, "_blank");
                        } else {
                          setActiveCert(cert);
                        }
                      }
                    }}
                    className={`relative bg-primary/20 border border-gray-800/50 rounded-xl p-6 backdrop-blur-sm transition-all ${
                      cert.inProgress
                        ? "cursor-not-allowed opacity-60"
                        : "cursor-pointer hover:border-accent/30 hover:bg-primary/30"
                    }`}
                  >
                    <div className="aspect-[4/3] bg-primary/10 rounded-lg overflow-hidden mb-4 relative">
                      <Image
                        src={cert.thumbnail}
                        alt={cert.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                      {cert.id === "cv" && (
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white font-orbitron text-lg">
                          View My CV
                        </div>
                      )}
                      {cert.inProgress && (
                        <div className="absolute inset-0 bg-primary/80 flex items-center justify-center">
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="text-accent text-lg font-orbitron"
                          >
                            In Progress
                          </motion.div>
                        </div>
                      )}
                    </div>
                    <h3 className="font-orbitron text-xl mb-1">
                      {cert.title}
                      {cert.id === "cv" && (
                        <span className="ml-2 text-sm text-accent font-medium">
                          (CV)
                        </span>
                      )}
                    </h3>
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>{cert.issuer}</span>
                      <span>{cert.date}</span>
                    </div>
                    {!cert.inProgress && cert.id !== "cv" && (
                      <div className="text-accent text-sm font-medium group-hover:underline">
                        View Certificate
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {activeCert && !activeCert.inProgress && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <motion.div
            className="bg-primary border border-gray-700 rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-primary/90">
              <h3 className="font-orbitron text-xl">
                {activeCert.title} <span className="text-accent">·</span>{" "}
                {activeCert.issuer}
              </h3>
              <button
                onClick={() => setActiveCert(null)}
                className="text-gray-400 hover:text-accent p-1 rounded-full hover:bg-gray-800/50 transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-2 bg-gray-900/20">
              <Document
                file={activeCert.pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <div className="flex items-center justify-center h-64">
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="text-gray-400"
                    >
                      Loading certificate...
                    </motion.div>
                  </div>
                }
              >
                {Array.from(new Array(numPages), (_, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    width={pageWidth}
                    renderTextLayer={false}
                    className="mb-4 last:mb-0 bg-white shadow-sm"
                    loading={
                      <div className="h-[1100px] bg-gray-800/20 animate-pulse"></div>
                    }
                  />
                ))}
              </Document>
            </div>

            <div className="p-4 border-t border-gray-700 bg-primary/90 flex justify-between items-center">
              <div className="text-sm text-gray-400">
                {numPages ? `1 of ${numPages}` : "Loading..."}
              </div>
              <motion.a
                href={activeCert.pdfUrl}
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors"
              >
                <FiDownload />
                Download PDF
              </motion.a>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
