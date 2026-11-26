import React, { useState } from 'react';

function formatSrtTime(seconds) {
  const ms = Math.max(0, Math.round(seconds * 1000));
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const milli = ms % 1000;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')},${String(milli).padStart(3, '0')}`;
}

export function captionsToSrt(captions = []) {
  return captions.map((caption, index) => {
    const start = Number(caption.start ?? caption.from ?? 0);
    const end = Number(caption.end ?? caption.to ?? start);
    const text = String(caption.text ?? caption.word ?? '').trim();
    return text ? `${index + 1}\n${formatSrtTime(start)} --> ${formatSrtTime(end)}\n${text}` : null;
  }).filter(Boolean).join('\n\n') + (captions.length ? '\n' : '');
}

export default function ExportDialog({ state, onCancel, onClose, onShow }) {
  const [copied, setCopied] = useState(false);
  const copyPath = async () => {
    if (!state.srt) return;
    await window.api.copyText(state.srt);
    setCopied(true);
  };
  const downloadSrt = () => {
    if (!state.srt) return;
    const blob = new Blob([state.srt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'captions.srt';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        {state.error ? (
          <>
            <h3>Export failed</h3>
            <pre className="error">{state.error}</pre>
            <button onClick={onClose}>Close</button>
          </>
        ) : state.done ? (
          <>
            <h3>Export complete ✅</h3>
            <p className="dim">{state.file}</p>
            {state.srt && <div className="modal-actions">
              <button onClick={downloadSrt}>Download captions (.srt)</button>
              <button onClick={copyPath}>{copied ? 'Copied!' : 'Copy captions'}</button>
            </div>}
            <div className="modal-actions">
              <button onClick={onShow}>Show in folder</button>
              <button className="primary" onClick={onClose}>OK</button>
            </div>
          </>
        ) : (
          <>
            <h3>Exporting MP4…</h3>
            <div className="progress"><div style={{ width: `${(state.progress * 100).toFixed(1)}%` }} /></div>
            <p>{(state.progress * 100).toFixed(0)}%</p>
            <button onClick={onCancel}>Cancel</button>
          </>
        )}
      </div>
    </div>
  );
}
