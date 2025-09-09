import Header from "../components/Header/Header";

export default function Home(){
  const buttonFunction = () => {
    console.log("Hello World")
  }
  return(
    <>
      <Header btnFunc={buttonFunction}/>
      <div className="p-2">
        {/* Seu conteúdo aqui */}
      </div>
    </>
  )
}