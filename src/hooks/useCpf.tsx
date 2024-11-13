import { useContext } from 'react';
import CpfContext from '../contexts/CpfContext'; // Importa o contexto

export const useCpf = () => {
  const context = useContext(CpfContext);
  if (!context) {
    throw new Error('useCpf must be used within a CpfProvider');
  }
  return context;
};
