// src/components/PdfOpener.js
import { useEffect } from "react";

const PdfOpener = ({ file }) => {
  useEffect(() => {
    if (file && file.uri) {
      // Opens the PDF in a new browser tab/window.
      window.open(file.uri, "_blank", "noopener,noreferrer");
    }
  }, [file]);

  return (
    <div className="p-4">
      <p>Opening PDF in a new browser tab...</p>
    </div>
  );
};

export default PdfOpener;
