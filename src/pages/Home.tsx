import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ExameList from '../components/ExameList';
import ExameDetail from '../components/ExameDetail';
import { Exame } from '../types/Exame';

const Home: React.FC = () => {
  const [exames, setExames] = useState<Exame[]>([]);
  const [selectedExame, setSelectedExame] = useState<Exame | null>(null);
  const [usuario, setUsuario] = useState<string>(''); // Estado para armazenar o nome do usuário
  const [loading, setLoading] = useState<boolean>(true); // Estado para controle de carregamento

  // Simulação de requisição à API
  useEffect(() => {
    // Simula uma chamada à API para buscar exames e usuário
    const fetchData = async () => {
      setLoading(true); // Inicia o carregamento

      // Exemplo de delay para simular tempo de resposta da API
      setTimeout(() => {
        // Dados mockados para exames e usuário
        const mockExames: Exame[] = [
          { id: '1', nome: 'Hemograma Completo', consultorio: 'Laboratório A', data: '13/02/2023', horario: '07:57', resultado: 'Normal', resumo: 'Resumo do exame Hemograma Completo' },
          { id: '2', nome: 'Glicose', consultorio: 'Laboratório B', data: '08/08/2017', horario: '09:55', resultado: 'Elevado', resumo: 'Resumo do exame Glicose' },
        ];

        const mockUsuario = 'Joao Bejarano';

        // Atualiza o estado com os dados recebidos
        setExames(mockExames);
        setUsuario(mockUsuario);
        setLoading(false); // Termina o carregamento
      }, 2000); // Simula uma resposta da API com 2 segundos de delay
    };

    fetchData();
  }, []);

  const handleSelectExame = (id: string) => {
    const exame = exames.find(e => e.id === id) || null;
    setSelectedExame(exame);
  };

  if (loading) {
    return <div className="text-center text-xl">Carregando...</div>;
  }

  return (
    <div className="home flex">
      <Sidebar />
      <div className="content flex-1 ml-6">
        <ExameList exames={exames} onSelect={handleSelectExame} usuario={usuario} /> {/* Passando o usuário para ExameList */}
        <ExameDetail exame={selectedExame} />
      </div>
    </div>
  );
};

export default Home;



// useEffect(() => {
//   const fetchData = async () => {
//     setLoading(true);
    
//     try {
//       const resExames = await fetch('/api/exames');
//       const examesData = await resExames.json();

//       const resUsuario = await fetch('/api/usuario');
//       const usuarioData = await resUsuario.json();

//       setExames(examesData);
//       setUsuario(usuarioData.nome);
//     } catch (error) {
//       console.error('Erro ao buscar dados', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchData();
// }, []);
