import React, { useRef, useState } from 'react';
import { UploadCloud } from 'lucide-react';

interface KYCUploadProps {
  onUploadSuccess: (url: string) => void;
  tenantId?: string; // 'new' for new tenants
}

export const KYCUpload: React.FC<KYCUploadProps> = ({ onUploadSuccess, tenantId = 'new' }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('document', file);

      // In a real app we'd get the auth token from context/storage
      const token = ''; // Normally extracted from context

      const res = await fetch(`http://localhost:3001/api/tenants/${tenantId}/kyc`, {
        method: 'POST',
        headers: {
          // 'Authorization': `Bearer ${token}` 
        },
        body: formData
      });

      if (!res.ok) {
        throw new Error('Upload failed');
      }

      const data = await res.json();
      onUploadSuccess(data.url);
    } catch (err) {
      console.error(err);
      setError('Failed to upload document');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*,.pdf"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="w-full flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 rounded-xl hover:bg-slate-50 hover:border-[#009cde] transition-colors"
      >
        <UploadCloud className="w-6 h-6 text-slate-400 mb-2" />
        <span className="text-xs font-extrabold text-[#012169]">
          {uploading ? 'Uploading...' : 'Upload KYC Document (Aadhaar)'}
        </span>
        <span className="text-[10px] font-semibold text-slate-500 mt-1">JPEG, PNG, or PDF up to 5MB</span>
      </button>
      {error && <p className="text-red-500 text-xs mt-2 font-semibold">{error}</p>}
    </div>
  );
};
