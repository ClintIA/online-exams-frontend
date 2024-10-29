import React, { useState, useEffect } from 'react';
import ExameList from '../components/ExameList';
import ExameDetail from '../components/ExameDetail';
import { Exame } from '../types/Exame';
import Loading from "@/components/Loading.tsx";

const Home: React.FC = () => {

  const [exames, setExames] = useState<Exame[]>([]);
  const [selectedExame, setSelectedExame] = useState<Exame | null>(null);
  const [usuario, setUsuario] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      setTimeout(() => {
        const mockExames: Exame[] = [
          { id: '1', nome: 'Hemograma Completo', consultorio: 'Laboratório A', data: '13/02/2023', horario: '07:57', resultado: 'Normal', resumo: 'Resumo do exame Hemograma Completo' },
          { id: '2', nome: 'Glicose', consultorio: 'Laboratório B', data: '08/08/2017', horario: '09:55', resultado: 'Elevado', resumo: 'Resumo do exame Glicose' },
        ];

        const mockUsuario = 'Joao Bejarano';
        setExames(mockExames);
        setUsuario(mockUsuario);
        setLoading(false);
      }, 2000);
    };

    fetchData().then();
  }, []);

  const handleSelectExame = (id: string) => {
    const exame = exames.find(e => e.id === id) || null;
    setSelectedExame(exame);
  };

  if (loading) {
    return <Loading />
  }

  return (
        <div className="content flex-1 ml-0 md:ml-6">
          <ExameList exames={exames} onSelect={handleSelectExame} usuario={usuario} />
          <ExameDetail exame={selectedExame} />
        </div>
  );
};

export default Home;