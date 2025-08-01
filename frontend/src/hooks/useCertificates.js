import { useState } from 'react';

export function useCertificate() {
  const [selected, setSelected] = useState(null);

  const selectCertificate = (index) => setSelected(index);
  const clearSelection = () => setSelected(null);

  return { selected, selectCertificate, clearSelection };
}