import React from 'react';
import toast from 'react-hot-toast';
import JSZip from 'jszip';
import { saveAs } from 'file-saver'; // We'll need to install this small helper library

// --- ICONS ---
const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
);
const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
);
const ShareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
);

export default function ThumbnailGrid({ images, onReset, queryData }) {

  // --- DOWNLOAD & COPY LOGIC ---

  const handleDownload = (imageUrl, imageId) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    // Create a descriptive filename
    const fileName = `thumbnail-${queryData.title.substring(0, 10).replace(/\s+/g, '_')}-${imageId}.png`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Download started!');
  };

  const handleCopyToClipboard = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      toast.success('Image copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy image:', error);
      toast.error('Failed to copy image.');
    }
  };

  const handleDownloadAllAsZip = async () => {
    const zip = new JSZip();
    const folder = zip.folder("ai-thumbnails");

    // Await all the image fetches
    await Promise.all(
      images.map(async (image, index) => {
        const response = await fetch(image.url);
        const blob = await response.blob();
        const fileName = `thumbnail-${queryData.title.substring(0, 10).replace(/\s+/g, '_')}-${index + 1}.png`;
        folder.file(fileName, blob);
      })
    );

    // Generate the zip and trigger download
    zip.generateAsync({ type: "blob" }).then(content => {
      saveAs(content, "thumbnails.zip");
    });

    toast.success("Zipping files... Download will start shortly.");
  };

  return (
    <div className="animate-fadeIn w-full max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div>
           <h1 className="text-3xl font-bold text-slate-800">Your Results Are Ready!</h1>
           <p className="text-slate-600 mt-1">Here are the options based on your creative direction. Download your favorites!</p>
        </div>
        <div className="flex gap-2">
            <button
              onClick={handleDownloadAllAsZip}
              className="px-4 py-2 bg-slate-200 text-slate-700 rounded-md font-semibold hover:bg-slate-300 transition-colors"
            >
              Download All (.zip)
            </button>
            <button
              onClick={onReset}
              className="px-6 py-2 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition-colors"
            >
              Create New
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {images.map(image => (
          <div key={image.id} className="group relative border rounded-lg overflow-hidden shadow-lg transition-shadow hover:shadow-2xl">
            <img src={image.url} alt={`Generated thumbnail ${image.id}`} className="w-full h-auto aspect-video object-cover" />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 p-4">
              <button onClick={() => handleDownload(image.url, image.id)} className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-800 rounded-md text-sm font-bold hover:bg-white transition-transform hover:scale-105">
                <DownloadIcon /> Download
              </button>
              <button onClick={() => handleCopyToClipboard(image.url)} className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-800 rounded-md text-sm font-bold hover:bg-white transition-transform hover:scale-105">
                <CopyIcon /> Copy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

