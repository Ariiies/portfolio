import React, { useState, useRef } from 'react';
import '../../styles/Modal.css';

const MIN_ZOOM = 1;
const MAX_ZOOM = 2.5;
const ZOOM_STEP = 0.2;

const ImageModal = ({ src, alt, onClose }) => {
  const [zoom, setZoom] = useState(1);
  const imgRef = useRef(null);

  if (!src) return null;

  // Zoom con rueda del mouse
  const handleWheel = (e) => {
    e.preventDefault();
    let newZoom = zoom - Math.sign(e.deltaY) * ZOOM_STEP;
    newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoom));
    setZoom(newZoom);
  };

  // Zoom con click/tap (opcional)
  const handleClick = () => {
    setZoom(zoom === 1 ? 1.4 : 1);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="image-modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close image-modal-close" onClick={onClose} aria-label="Cerrar imagen">×</button>
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className="modal-image"
          style={{ transform: `scale(${zoom})`, cursor: zoom > 1 ? 'zoom-out' : 'zoom-in' }}
          onWheel={handleWheel}
          onClick={handleClick}
          title="Usa la rueda del mouse para acercar/alejar"
        />
      </div>
    </div>
  );
};

export default ImageModal;