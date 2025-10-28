import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = 'http://localhost:8080/notifications';

const getAuthData = (): { token: string; userId: string } | null => {
    const data = localStorage.getItem('authData');
    if (!data) return null;
    try {
        return JSON.parse(data); 
    } catch (e) {
        console.error("Falha ao parsear authData", e);
        return null;
    }
}

const fetchHistory = async () => {
    const auth = getAuthData();
    if (!auth || !auth.token) {
        throw new Error('Falha ao buscar histórico: Token não encontrado');
    }
    
    const response = await fetch(API_URL, {
        headers: { 'Authorization': `Bearer ${auth.token}` }
    });
    if (!response.ok) throw new Error('Falha ao buscar histórico de notificações');
    return response.json();
};

const markAsReadApi = async (notificationId: string) => {
    const auth = getAuthData();
    if (!auth || !auth.token) {
        throw new Error('Falha ao marcar como lida: Token não encontrado');
    }

    await fetch(`${API_URL}/${notificationId}/read`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${auth.token}` }
    });
};

interface INotification {
    id: string;
    message: string;
    link: string; 
    read: boolean;
    createdAt: string;
}

interface INotificationContext {
    notifications: INotification[];
    unreadCount: number;
    markAsRead: (id: string) => void;
}

const NotificationContext = createContext<INotificationContext | undefined>(undefined);

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications deve ser usado dentro de um NotificationProvider');
    }
    return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notifications, setNotifications] = useState<INotification[]>([]);
    const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(n => (n.id === id ? { ...n, read: true } : n))
        );
        markAsReadApi(id).catch(err => console.error("Falha ao marcar como lida:", err));
    };
    
    useEffect(() => {
        let client: Stomp.Client;

        const connect = () => {
            const auth = getAuthData();
            
            if (!auth || !auth.token || !auth.userId) {
                console.error("authData, token ou userId faltando. WebSocket não conectará.");
                return; 
            }
            
            const { token, userId } = auth;
            
            const socket = new SockJS('http://localhost:8080/ws');
            client = Stomp.over(socket);
            
            const headers = {
                'Authorization': `Bearer ${token}` 
            };

            client.connect(headers, 
                (frame) => { 
                    console.log('WebSocket Conectado: ' + frame);
                    setStompClient(client);

                    client.subscribe(`/user/${userId}/notifications`, (message) => { 
                        const newNotification: INotification = JSON.parse(message.body);

                        console.log("Nova notificação recebida:", newNotification);
                        toast.info(newNotification.message);
                        setNotifications(prev => [newNotification, ...prev]);
                    });
                },
                (error) => { 
                    console.error('Erro no WebSocket: ', error);
                    setTimeout(connect, 5000);
                }
            );
        };
        
        fetchHistory()
            .then(data => setNotifications(data))
            .catch(err => console.error(err.message)); 
            
        connect();

        return () => {
            if (client && client.connected) {
                client.disconnect(() => {
                    console.log('WebSocket Desconectado.');
                });
            }
        };
    }, []); 

    return (
        <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead }}>
            {children}
            <ToastContainer position="bottom-right" autoClose={5000} />
        </NotificationContext.Provider>
    );
};