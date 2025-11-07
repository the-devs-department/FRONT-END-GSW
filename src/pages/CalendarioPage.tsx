import React, { useState, useEffect } from 'react';
import Calendar from '../components/Calendar/Calendar';
import GoogleCalendarSync from '../components/GoogleCalendarSync/GoogleCalendarSync';
import type Tarefa from '../Interface/TarefaInterface';

// Mock data para fins demonstrativos
const MOCK_TAREFAS: Tarefa[] = [
  {
    id: '1',
    titulo: 'Marketing',
    descricao: 'Tarefas relacionadas ao marketing',
    tema: 'Marketing',
    status: 'em_andamento',
    responsavel: undefined,
    dataEntrega: '2025-10-02T10:00:00',
    ativo: true
  },
  {
    id: '2',
    titulo: 'Desenvolvimento',
    descricao: 'Atividades de desenvolvimento',
    tema: 'Desenvolvimento',
    status: 'em_andamento',
    responsavel: undefined,
    dataEntrega: '2025-10-03T14:00:00',
    ativo: true
  },
  {
    id: '3',
    titulo: 'Pagamento',
    descricao: 'Processar pagamentos',
    tema: 'Pagamento',
    status: 'pendente',
    responsavel: undefined,
    dataEntrega: '2025-10-08T09:00:00',
    ativo: true
  },
  {
    id: '4',
    titulo: 'Pagamento Marketing',
    descricao: 'Pagamento da equipe de marketing',
    tema: 'Pagamento',
    status: 'pendente',
    responsavel: undefined,
    dataEntrega: '2025-10-09T10:00:00',
    ativo: true
  },
  {
    id: '5',
    titulo: 'Design',
    descricao: 'Tarefas de design',
    tema: 'Design',
    status: 'em_andamento',
    responsavel: undefined,
    dataEntrega: '2025-10-09T15:00:00',
    ativo: true
  },
  {
    id: '6',
    titulo: 'Design',
    descricao: 'Continuação das tarefas de design',
    tema: 'Design',
    status: 'em_andamento',
    responsavel: undefined,
    dataEntrega: '2025-10-11T11:00:00',
    ativo: true
  },
  {
    id: '7',
    titulo: 'Desenvolvimento',
    descricao: 'Continuação do desenvolvimento',
    tema: 'Desenvolvimento',
    status: 'em_andamento',
    responsavel: undefined,
    dataEntrega: '2025-10-18T16:00:00',
    ativo: true
  },
  {
    id: '8',
    titulo: 'Pagamento',
    descricao: 'Pagamentos do mês',
    tema: 'Pagamento',
    status: 'pendente',
    responsavel: undefined,
    dataEntrega: '2025-10-18T10:00:00',
    ativo: true
  },
  {
    id: '9',
    titulo: 'Suporte',
    descricao: 'Atendimento ao cliente',
    tema: 'Suporte',
    status: 'pendente',
    responsavel: undefined,
    dataEntrega: '2025-10-22T13:00:00',
    ativo: true
  }
] as Tarefa[];

const CalendarPage: React.FC = () => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [selectedTarefa, setSelectedTarefa] = useState<Tarefa | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarTarefas();
  }, []);

  const carregarTarefas = async () => {
    try {
      setLoading(true);
    
      await new Promise(resolve => setTimeout(resolve, 500));
      const response = MOCK_TAREFAS;
      
      setTarefas(response);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskClick = (tarefa: Tarefa) => {
    setSelectedTarefa(tarefa);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTarefa(null);
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Carregando calendário...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Calendar 
        tarefas={tarefas} 
        onTaskClick={handleTaskClick}
        syncButton={
          <GoogleCalendarSync 
            onClick={() => console.log('Sincronizar com Google Calendar')}
          />
        }
      />
      
      {isModalOpen && selectedTarefa && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedTarefa.titulo}</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-1">Descrição</h3>
                  <p className="text-gray-800">{selectedTarefa.descricao}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-1">Tema</h3>
                  <p className="text-gray-800">{selectedTarefa.tema}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-1">Status</h3>
                  <p className="text-gray-800 capitalize">{selectedTarefa.status?.replace('_', ' ')}</p>
                </div>
                
                {selectedTarefa.responsavel && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-1">Responsável</h3>
                    <p className="text-gray-800">{selectedTarefa.responsavel.nome}</p>
                  </div>
                )}
                
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-1">Data de Entrega</h3>
                  <p className="text-gray-800">
                    {new Date(selectedTarefa.dataEntrega).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 font-medium"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarPage;
