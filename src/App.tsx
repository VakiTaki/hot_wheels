import React from "react";
import Navigation from "./components/navigation/navigation";
import Button from "./components/button/button";
import Imput from "./components/input/input";
import UserHeader from "./components/userHeader/userHeader";

function App() {
  return (
    <div className="flex flex-col h-screen ">
      <header className=" flex jus bg-sky-400  h-20">
        <div className="flex justify-between w-full items-center mx-5">
          <div className="  font-bold text-3xl uppercase">
            <span className="text-red-600">Hot</span>
            <span className="text-white ml-2">Wheels</span>
          </div>
          <div className=" text-myColor1">
            <Navigation />
          </div>
          <div className="self-center">
            <UserHeader />
          </div>
        </div>
      </header>
      <main className=" bg-slate-100 h-full overflow-scroll p-2">
        <Button />
        <Imput />
      </main>
      <footer className=" bg-sky-400 h-10">
        <p className="mx-2 my-1 text-center text-myColor1">
          2023 год, Родин Андрей
        </p>{" "}
      </footer>
    </div>
  );
}

export default App;
