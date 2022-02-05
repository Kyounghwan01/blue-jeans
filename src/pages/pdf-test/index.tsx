import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import styled from "styled-components";
import useWindowSize from "hooks/useWindowSize";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Index = () => {
  const windowSize = useWindowSize();
  const [numPages, setNumPages] = useState(0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <PdfBlock onContextMenu={e => e.preventDefault()}>
      <div className="App">
        <div>
          <Document
            file="/static/doc/test.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            className="pdf-container"
          >
            {Array.from(new Array(numPages), (_, index) => (
              <Page
                width={windowSize.width}
                height={windowSize.height}
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                className="pdf-container"
                renderAnnotationLayer={false}
              />
            ))}
          </Document>
        </div>
      </div>
    </PdfBlock>
  );
};

const PdfBlock = styled.article`
  @media print {
    .pdf-container {
      display: none;
    }
  }
`;

export default Index;
