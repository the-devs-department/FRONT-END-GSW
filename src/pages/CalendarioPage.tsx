import React, { useState, useEffect } from 'react';
import Calendar from '../components/Calendar/Calendar';
import type Tarefa from '../Interface/TarefaInterface';
import CalendarioService from '../Service/CalendarioService';
import taskIcon from '../assets/taskweb.png';
import userIcon from '../assets/userWhite.png';

const CalendarPage: React.FC = () => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [selectedDateTarefas, setSelectedDateTarefas] = useState<Tarefa[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarTarefas();
  }, []);

  const carregarTarefas = async () => {
    try {
      setLoading(true);
      const userInfos = localStorage.getItem('authData');
      const userInfosParsed = userInfos ? JSON.parse(userInfos) : null;
      const usuarioId = userInfosParsed?.userId;

      if (!usuarioId) {
        console.error('UsuarioId não encontrado');
        return;
      }

      const data = await CalendarioService.listarPorUsuario(usuarioId);
      setTarefas(data);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskClick = async (tarefa: Tarefa) => {
    const day = new Date(tarefa.dataEntrega).toLocaleDateString('pt-BR');
    const dia = new Date(tarefa.dataEntrega).toISOString().split('T')[0];

    try {
      const userInfos = localStorage.getItem('authData');
      const userInfosParsed = userInfos ? JSON.parse(userInfos) : null;
      const usuarioId = userInfosParsed?.userId;

      if (!usuarioId) {
        console.error('UsuarioId não encontrado');
        return;
      }

      const tarefasDoDia = await CalendarioService.tarefasDoDia(usuarioId, dia);
      setSelectedDateTarefas(tarefasDoDia);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Erro ao carregar tarefas do dia:', error);

      const tarefasDoDia = tarefas.filter(
        t => new Date(t.dataEntrega).toLocaleDateString('pt-BR') === day
      );
      setSelectedDateTarefas(tarefasDoDia);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDateTarefas([]);
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
      />
      
      {isModalOpen && selectedDateTarefas.length > 0 && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-slate-700 rounded-xl shadow-2xl max-w-sm w-full text-white overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center bg-slate-700 px-4 pt-3">
              <div>
                <span className="text-sm font-medium text-[#A4C0E3]">
                  {new Date(selectedDateTarefas[0].dataEntrega).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-[#A4C0E3] hover:text-white text-xl"
              >
                ×
              </button>
            </div>

            <div className="flex justify-between items-center px-4 pt-3 pb-1 bg-slate-700">
              <div className="flex items-center">
                <img src={taskIcon} alt="Tarefas" className="h-5 w-5" />
                <span className="ml-2 text-base text-white font-semibold">Tarefas</span>
              </div>
              {selectedDateTarefas.find(t => t.responsavel)?.responsavel && (
                <div className="flex items-center">
                  <img src={userIcon} alt="Usuario" className="h-5 w-5" />
                  <span className="ml-2 text-base text-white font-semibold">
                    {selectedDateTarefas.find(t => t.responsavel)?.responsavel?.nome}
                  </span>
                </div>
              )}
            </div>
              <div className="px-4 pt-3 pb-2">
                <div className="flex flex-col gap-2 h-64 overflow-y-auto pr-2 border border-white rounded-md p-2">
                  {selectedDateTarefas.map(tarefa => {
                    const hora = new Date(tarefa.dataEntrega).toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    });
                    return (
                      <div key={tarefa.id} className="rounded-md px-2 py-2 text-white text-[15px] flex items-center justify-between flex-shrink-0">
                        <span className="whitespace-nowrap overflow-hidden text-ellipsis">{tarefa.descricao} - {hora}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-center mt-2">
                <span className="text-sm text-slate-500 font-light">Clique para ser direcionado à tarefa</span>
              </div>
              </div>    
          </div>
        </div>
        
      )}
    </div>
  );
};

export default CalendarPage;
