import React, { useState } from 'react';
import { useNotifications } from '../../context/NotificationContext'; 
import { useNavigate } from 'react-router-dom';
import { FaBell } from 'react-icons/fa'; 

export const NotificationBell = () => {
    const { notifications, unreadCount, markAsRead } = useNotifications();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleNotificationClick = (notification: INotification) => {
        setIsOpen(false);
        

        if (!notification.read) {
            markAsRead(notification.id);
        }
        
        navigate(notification.link);
    };

    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="relative p-2">
                <FaBell size={24} className="text-gray-700" />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 max-h-[70vh] overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <div className="p-4 font-semibold border-b">Notificações</div>
                    <ul className="divide-y">
                        {notifications.length === 0 ? (
                            <li className="p-4 text-sm text-gray-500">
                                Nenhuma notificação.
                            </li>
                        ) : (
                            notifications.map(notif => (
                                <li 
                                    key={notif.id}
                                    onClick={() => handleNotificationClick(notif)}
                                    className={`p-4 hover:bg-gray-100 cursor-pointer ${
                                        !notif.read ? 'bg-blue-50' : ''
                                    }`}
                                >
                                    <p className={`text-sm ${!notif.read ? 'font-bold text-gray-900' : 'text-gray-700'}`}>
                                        {notif.message}
                                    </p>
                                    <span className="text-xs text-gray-400">
                                        {new Date(notif.createdAt).toLocaleString('pt-BR')}
                                    </span>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};