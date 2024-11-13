import React from 'react';
import { Exame } from '../../types/Exame.ts';
import { Button } from '@mui/material'; 

interface ExameDetailProps {
  exame: Exame | null;
}

const ExameDetail: React.FC<ExameDetailProps> = ({ exame }) => {
  if (!exame) return <div className="text-center text-gray-500">Selecione um exame para ver os detalhes</div>;

  return (
    <div className="exame-detail p-6 bg-white shadow-md rounded-lg w-full">
      <h2 className="text-2xl font-bold text-yaleBlue mb-4">{exame.nome}</h2>
      <p className="text-sm text-gray-400 mb-2">Consultório: {exame.consultorio}</p>
      <p className="text-sm text-gray-400 mb-4">Data: {exame.data} · {exame.horario}</p>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Resumo:</h3>
        <p className="text-gray-600">{exame.resumo}</p>
      </div>
      
      <div className="flex space-x-4">
        <Button variant="contained" style={{ backgroundColor: '#05D2FF' }} className="font-medium">
          Ver Laudo Completo
        </Button>
        <Button variant="outlined" style={{ color: '#05D2FF', borderColor: '#05D2FF' }} className="font-medium">
          Compartilhar
        </Button>
      </div>
    </div>
  );
};

export default ExameDetail;
