import {createContext, ReactNode, useState} from 'react';

interface CpfContextType {
  cpf: string;
  setCpf: (cpf: string) => void;
}

const CpfContext = createContext<CpfContextType | undefined>(undefined);

export const CpfProvider = ({ children }: { children: ReactNode }) => {
  const [cpf, setCpf] = useState('');

  return (
    <CpfContext.Provider value={{ cpf, setCpf }}>
      {children}
    </CpfContext.Provider>
  );
};

export default CpfContext; // Exporta o contexto padrão
