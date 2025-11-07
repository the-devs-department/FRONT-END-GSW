import React from 'react';
import googleLogo from '../../assets/googlelogo.png';

interface GoogleCalendarSyncProps {
  onClick?: () => void;
  disabled?: boolean;
}

const GoogleCalendarSync: React.FC<GoogleCalendarSyncProps> = ({ 
  onClick, 
  disabled = false 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-2 px-5 py-2.5 bg-gray-700 text-white rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 shadow-sm hover:bg-gray-600 hover:shadow-md hover:-translate-y-0.5 active:bg-gray-800 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-700 disabled:hover:translate-y-0"
      aria-label="Sincronizar com Google Calendar"
    >
      <img 
        src={googleLogo} 
        alt="Google" 
        className="w-5 h-5 object-contain"
      />
      <span className="whitespace-nowrap">Sincronizar</span>
    </button>
  );
};

export default GoogleCalendarSync;
