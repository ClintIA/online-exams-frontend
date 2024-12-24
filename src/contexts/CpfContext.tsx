import {createContext, ReactNode, useEffect, useState} from 'react';
import Cookies from "js-cookie";

interface CpfContextType {
  cpf: string;
  setCpf: (cpf: string) => void;
  logout: () => void
}

const CpfContext = createContext<CpfContextType | undefined>(undefined);

export const CpfProvider = ({ children }: { children: ReactNode }) => {
  const [cpf, setCpf] = useState('');
  useEffect(() => {
    const checkCpf = async () => {
      const cpf = Cookies.get('cpf');
      if (cpf) {
        setCpf(cpf);
      }
    }
    checkCpf().then()
  },[])
  const logout = () => {
    setCpf('')
    Cookies.remove('cpf')
  }
  return (
    <CpfContext.Provider value={{ cpf, setCpf, logout}}>
      {children}
    </CpfContext.Provider>
  );
};

export default CpfContext;
