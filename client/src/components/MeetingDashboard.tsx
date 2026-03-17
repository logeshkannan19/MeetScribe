'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Clock, 
  FileText, 
  ChevronRight, 
  MoreVertical, 
  Trash2, 
  ExternalLink,
  Calendar,
  Tag,
  Zap,
  CheckCircle
} from 'lucide-react';
import UploadSection from './UploadSection';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * MeetingDashboard Component
 * The main nerve center for MeetScribe AI. 
 * Provides a searchable history of meetings and detailed AI-generated insights.
 */
export default function MeetingDashboard() {
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState<any>(null);

  /**
   * Fetch user's meeting history from the API
   */
  const fetchNotes = async () => {
    try {
      console.log('[Dashboard] Fetching meeting history...');
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5001/api/notes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  /**
   * Handle note deletion with confirmation
   */
  const deleteNote = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you certain you want to permanently delete this meeting note?')) return;
    try {
      console.log(`[Dashboard] Deleting note: ${id}`);
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5001/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchNotes();
      if (selectedNote?._id === id) setSelectedNote(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meeting Intelligence</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage and analyze your recent discussions.</p>
        </div>
        <div className="flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1">
          <button className="px-4 py-2 text-xs font-bold bg-slate-50 dark:bg-slate-800 rounded-lg">Recent</button>
          <button className="px-4 py-2 text-xs font-bold text-slate-500">Scheduled</button>
        </div>
      </header>

      <UploadSection onUploadSuccess={fetchNotes} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* History List */}
        <div className="lg:col-span-1 space-y-4 h-[calc(100vh-450px)] overflow-y-auto pr-2 custom-scrollbar">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">History</h3>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => <div key={i} className="h-24 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />)}
            </div>
          ) : notes.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-sm text-slate-500">No meetings processed yet.</p>
            </div>
          ) : (
            notes.map((note) => (
              <motion.div
                layoutId={note._id}
                key={note._id}
                onClick={() => setSelectedNote(note)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer group ${
                  selectedNote?._id === note._id 
                    ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-500/25' 
                    : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-primary-300'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold truncate pr-4">{note.title}</h4>
                  <button onClick={(e) => deleteNote(note._id, e)} className={`${selectedNote?._id === note._id ? 'text-white/70' : 'text-slate-400'} hover:text-red-500`}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-medium opacity-70">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    <span>{note.tags?.[0] || 'Uncategorized'}</span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Detailed View */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {!selectedNote ? (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-slate-100 dark:bg-slate-900/50 rounded-[40px] border border-slate-200 dark:border-slate-800">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm mb-6">
                  <Zap className="w-10 h-10 text-primary-500" />
                </div>
                <h2 className="text-xl font-bold mb-2">Select a meeting to view insights</h2>
                <p className="text-slate-500 max-w-sm">Detailed summaries, key points, and action items will appear here after processing.</p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 p-10 h-full shadow-sm"
              >
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h2 className="text-3xl font-extrabold mb-2">{selectedNote.title}</h2>
                    <div className="flex gap-2">
                      {selectedNote.tags?.map((tag: string) => (
                        <span key={tag} className="px-2.5 py-1 bg-primary-50 dark:bg-primary-900/10 text-primary-600 text-[10px] font-bold rounded-full uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-sm active:scale-95 transition-all">
                    <ExternalLink className="w-4 h-4" />
                    Export PDF
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-8">
                    <section>
                      <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">
                        <FileText className="w-4 h-4" />
                        Executive Summary
                      </h3>
                      <ul className="space-y-3">
                        {selectedNote.summary?.map((s: string, i: number) => (
                          <li key={i} className="flex gap-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 shrink-0" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>

                  <div className="space-y-8">
                    <section>
                      <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">
                        <CheckCircle className="w-4 h-4" />
                        Action Items
                      </h3>
                      <div className="space-y-3">
                        {selectedNote.actionItems?.map((item: any, i: number) => (
                          <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                            <p className="text-sm font-bold mb-1">{item.task}</p>
                            <p className="text-[10px] text-primary-600 font-bold uppercase tracking-tight">Responsibility: {item.responsibility}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

