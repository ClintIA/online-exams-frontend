import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ExameList from '../components/ExameList';
import ExameDetail from '../components/ExameDetail';
import { Exame } from '../types/Exame';
import MenuIcon from '@mui/icons-material/Menu'; // Importando o ícone de menu

const Home: React.FC = () => {

  const [exames, setExames] = useState<Exame[]>([]);
  const [selectedExame, setSelectedExame] = useState<Exame | null>(null);
  const [usuario, setUsuario] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [menuOpen, setMenuOpen] = useState<boolean>(false); // Estado para abrir/fechar o menu lateral em mobile

  // Simulação de requisição à API
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
    return <div className="text-center text-xl">Carregando...</div>;
  }

  return (
      <div className="home flex flex-col md:flex-row">
        {/* Botão de Menu para dispositivos móveis */}
        <button className="md:hidden text-blue p-4" onClick={() => setMenuOpen(!menuOpen)}>
          <MenuIcon />
        </button>

        {/* Sidebar visível em telas grandes e mobile quando menuOpen for true */}
        <div className={`md:block ${menuOpen ? 'block' : 'hidden'} w-60`}>
          <Sidebar />
        </div>

        <div className="content flex-1 ml-0 md:ml-6">
          <ExameList exames={exames} onSelect={handleSelectExame} usuario={usuario} />
          <ExameDetail exame={selectedExame} />
        </div>
      </div>
  );
};

export default Home;