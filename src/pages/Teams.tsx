import { useNavigate, useOutletContext } from "react-router-dom";
import TeamCard from "../components/TeamCard/TeamCard";
import type { RootLayoutContext } from "./RootLayout";
import { useState, useCallback, useEffect } from "react";
import TeamService from "../Service/TeamService";
import UserService from "../Service/UserService";
import type Team from "../Interface/TeamInterface";

type TeamsContext = RootLayoutContext

export default function Teams() {
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState<Team[]>([]);
  const { setCallbackRecarregarTarefas } = useOutletContext<TeamsContext>()
  const navigate = useNavigate();

  const carregarEquipes = useCallback(async () => {
    const userInfos = localStorage.getItem('authData');
    const userInfosParsed = userInfos ? JSON.parse(userInfos) : null;
    const id = userInfosParsed?.userId;
    const token = userInfosParsed?.token;

    if (!token || !id) {
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      const userData = await UserService.getUserInfos(id);
      const email = userData.email;
      const data = await TeamService.getUserTeams(email);
      setTeams(data || []);
    } catch (err) {
      console.error("Erro ao carregar equipes:", err);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    carregarEquipes();
  }, [carregarEquipes]);

  useEffect(() => {
    setCallbackRecarregarTarefas(carregarEquipes);
    return () => setCallbackRecarregarTarefas(null);
  }, [setCallbackRecarregarTarefas, carregarEquipes]);

  const abbrev = (name: string) => {
    if (!name) return "--";
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
  }

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-700 text-xl">Carregando equipes...</p>
      </div>
    )
  }

  return (
    <>
      <div className="w-full h-auto flex items-center pb-6 justify-evenly gap-y-10 flex-wrap">
        {teams.length === 0 ? (
          <p className="text-gray-700">Nenhuma equipe encontrada.</p>
        ) : (
          teams.map((t: any) => (
            <TeamCard
              key={t.id ?? t.nome}
              abreviation={abbrev(t.nome)}
              name={t.nome}
              team={t}
            />
          ))
        )}
      </div>
    </>
  )
}