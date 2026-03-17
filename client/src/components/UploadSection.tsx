'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

export default function UploadSection({ onUploadSuccess }: { onUploadSuccess: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'audio' | 'text'>('audio');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    setError('');
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'audio/*': ['.mp3', '.wav', '.m4a', '.mpga', '.ogg'] },
    multiple: false
  });

  const handleProcess = async () => {
    if (mode === 'audio' && !file) return setError('Please upload an audio file');
    if (mode === 'text' && !text) return setError('Please paste meeting transcript');
    if (!title) return setError('Please add a meeting title');

    setUploading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('title', title);
      
      if (mode === 'audio' && file) {
        formData.append('audio', file);
      } else {
        formData.append('transcript', text);
      }

      await axios.post('http://localhost:5001/api/ai/process', formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });

      onUploadSuccess();
      setFile(null);
      setText('');
      setTitle('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Processing failed. Please check your API key.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[32px] p-8 border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side: Inputs */}
        <div className="flex-grow space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2 ml-1">Meeting Title</label>
            <input
              type="text"
              placeholder="e.g. Weekly Sync / Project Kickoff"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl w-fit">
            <button
              onClick={() => setMode('audio')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${mode === 'audio' ? 'bg-white dark:bg-slate-800 shadow-sm' : 'text-slate-500'}`}
            >
              Audio Upload
            </button>
            <button
              onClick={() => setMode('text')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${mode === 'text' ? 'bg-white dark:bg-slate-800 shadow-sm' : 'text-slate-500'}`}
            >
              Paste Transcript
            </button>
          </div>

          {mode === 'audio' ? (
            <div 
              {...getRootProps()} 
              className={`relative border-2 border-dashed rounded-3xl p-12 transition-all cursor-pointer flex flex-col items-center justify-center text-center ${
                isDragActive ? 'border-primary-500 bg-primary-50/50' : 'border-slate-200 dark:border-slate-800 hover:border-primary-400'
              }`}
            >
              <input {...getInputProps()} />
              <div className="bg-primary-50 dark:bg-primary-900/10 p-4 rounded-2xl mb-4">
                <Upload className="w-8 h-8 text-primary-600" />
              </div>
              {file ? (
                <div className="flex items-center gap-2 text-primary-600 font-bold">
                  <CheckCircle className="w-4 h-4" />
                  <span>{file.name}</span>
                </div>
              ) : (
                <>
                  <p className="text-lg font-bold mb-1">Drag & drop meeting audio</p>
                  <p className="text-sm text-slate-500">MP3, WAV, M4A up to 25MB</p>
                </>
              )}
            </div>
          ) : (
            <textarea
              placeholder="Paste your meeting transcript here..."
              className="w-full h-48 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-sm resize-none"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          )}
        </div>

        {/* Right Side: Action */}
        <div className="w-full md:w-72 flex flex-col justify-end">
          {error && (
            <div className="flex items-start gap-2 text-xs text-red-500 bg-red-50 dark:bg-red-900/10 p-3 rounded-xl mb-4">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
          <button
            onClick={handleProcess}
            disabled={uploading}
            className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl ${
              uploading 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-primary-600 text-white hover:bg-primary-700 shadow-primary-500/25 active:scale-95'
            }`}
          >
            {uploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing AI...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                <span>Generate Summary</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
