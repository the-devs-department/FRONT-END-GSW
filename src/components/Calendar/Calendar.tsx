import React, { useState } from 'react';
import type Tarefa from '../../Interface/TarefaInterface';

interface CalendarProps {
  tarefas: Tarefa[];
  onTaskClick?: (tarefa: Tarefa) => void;
  syncButton?: React.ReactNode;
}

const Calendar: React.FC<CalendarProps> = ({ tarefas, onTaskClick, syncButton }) => {
  const [dataAtual, setDataAtual] = useState(new Date());

  const nomesMeses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const diasSemana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  const obterMesAno = () => {
    const mes = nomesMeses[dataAtual.getMonth()];
    const ano = dataAtual.getFullYear();
    return { mes, ano };
  };

  const obterDiasDoMes = () => {
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth();
    return new Date(ano, mes + 1, 0).getDate();
  };

  const obterPrimeiroDiaDoMes = () => {
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth();
    return new Date(ano, mes, 1).getDay();
  };

  const getTarefasForDay = (day: number) => {
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth();
    const dateStr = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    return tarefas.filter(tarefa => {
      if (!tarefa.dataEntrega) return false;
      const tarefaDate = new Date(tarefa.dataEntrega);
      const tarefaDateStr = `${tarefaDate.getFullYear()}-${String(tarefaDate.getMonth() + 1).padStart(2, '0')}-${String(tarefaDate.getDate()).padStart(2, '0')}`;
      return tarefaDateStr === dateStr;
    });
  };

  const changeMonth = (direction: 'prev' | 'next') => {
    const novaData = new Date(dataAtual);
    if (direction === 'prev') {
      novaData.setMonth(novaData.getMonth() - 1);
    } else {
      novaData.setMonth(novaData.getMonth() + 1);
    }
    setDataAtual(novaData);
  };

  const renderCalendarDays = () => {
    const diasDoMes = obterDiasDoMes();
    const primeiroDia = obterPrimeiroDiaDoMes();
    const dias = [];

    for (let i = 0; i < primeiroDia; i++) {
      dias.push(
        <div 
          key={`empty-${i}`} 
          className="bg-white border-dashed border border-slate-200 aspect-square p-1 sm:p-1.5 md:p-2"
        />
      );
    }

    // Dias do mês
    for (let dia = 1; dia <= diasDoMes; dia++) {
      const tarefasDay = getTarefasForDay(dia);

      dias.push(
        <div 
          key={dia} 
          className="aspect-square border-dashed border border-slate-200 bg-white relative transition-all overflow-hidden min-h-[60px] sm:min-h-[80px] md:min-h-[100px]"
        >
          {tarefasDay.length > 0 ? (
            <div
              className="bg-slate-600 hover:shadow-lg w-full h-full flex items-center justify-center cursor-pointer transition-all hover:opacity-90 relative"
              onClick={() => onTaskClick && onTaskClick(tarefasDay[0])}
            >
              <div className="absolute top-1 left-1 sm:top-1.5 sm:left-1.5 md:top-2 md:left-2 text-[0.625rem] sm:text-xs md:text-sm font-medium text-white/50">
                {String(dia).padStart(2, '0')}
              </div>
              <div className="flex items-center justify-center px-1 sm:px-1.5 md:px-2">
                <span className="block overflow-hidden text-ellipsis text-center text-[0.625rem] sm:text-[0.688rem] md:text-xs lg:text-[0.813rem] font-medium text-white leading-tight break-words line-clamp-2 sm:line-clamp-3">
                  {tarefasDay[0].titulo}
                  {tarefasDay.length > 1 && (
                    <span className="block mt-1">
                      +{tarefasDay.length - 1}
                    </span>
                  )}
                </span>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col p-1 sm:p-1.5 md:p-2">
              <div className="text-[0.625rem] sm:text-xs md:text-sm font-medium text-slate-500/50">
                {String(dia).padStart(2, '0')}
              </div>
            </div>
          )}
        </div>
      );
    }

    return dias;
  };

  const { mes, ano } = obterMesAno();

  return (
    <div className="bg-white p-3 sm:p-4 md:p-6 max-w-full mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 md:gap-6 w-full sm:w-auto">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 m-0">Calendário</h2>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <span className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
              {mes} <span className="text-red-500">{ano}</span>
            </span>
            <div className="flex items-center gap-1 sm:gap-2">
              <button 
                onClick={() => changeMonth('prev')} 
                className="bg-transparent border-none cursor-pointer p-1.5 sm:p-2 text-slate-500 hover:text-slate-700 transition-colors flex items-center justify-center"
              >
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                  <path d="M7 1L1 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                onClick={() => changeMonth('next')} 
                className="bg-transparent border-none cursor-pointer p-1.5 sm:p-2 text-slate-500 hover:text-slate-700 transition-colors flex items-center justify-center"
              >
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                  <path d="M1 13L7 7L1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        {syncButton && (
          <div className="w-full sm:w-auto flex justify-end">
            {syncButton}
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-7 mb-2">
          {diasSemana.map((dia, index) => (
            <div key={index} className="text-center text-xs sm:text-sm font-semibold text-slate-500 py-1 sm:py-2">
              {dia}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {renderCalendarDays()}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
