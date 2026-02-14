"use client";

import React from "react";
import './index.scss';

export default function Modal({ open, onClose, children }: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}){
  if(!open) return null;

  return (
    <div className="app-modal-overlay" onClick={onClose}>
      <div className="app-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Fechar">×</button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  )
}
