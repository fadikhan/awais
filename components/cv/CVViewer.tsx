"use client";

interface CVViewerProps {
  cvHTML: string;
  userId: string;
}

export default function CVViewer({ cvHTML, userId }: CVViewerProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Action Buttons */}
        <div className="mb-6 flex justify-center gap-4 no-print">
          <button
            onClick={handlePrint}
            className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition font-semibold shadow-lg"
          >
            Download as PDF
          </button>
          <a
            href={`/portfolio/${userId}`}
            className="px-6 py-3 bg-white text-violet-600 border-2 border-violet-600 rounded-lg hover:bg-violet-50 transition font-semibold"
          >
            Back to Portfolio
          </a>
        </div>

        {/* CV Content */}
        <div 
          className="bg-white rounded-2xl shadow-xl p-8 print:shadow-none"
          dangerouslySetInnerHTML={{ __html: cvHTML }}
        />
      </div>

      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            margin: 0;
            padding: 0;
          }
        }
      `}</style>
    </div>
  );
}
