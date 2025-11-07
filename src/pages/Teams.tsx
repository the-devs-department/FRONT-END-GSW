import TeamCard from "../components/TeamCard/TeamCard";

export default function Teams() {
  return(
    <>
      <div className="w-full h-auto flex items-center pb-6 justify-evenly gap-y-10 flex-wrap">
        <TeamCard
        abreviation="GSW"
        name="GSW Desenvolvimento"
        />
        <TeamCard
        abreviation="RH"
        name="RH - Sistema de Comunicação"
        />
        <TeamCard
        abreviation="EF"
        name="Equipe Financeiro"
        />
      </div>
    </>
  )
}