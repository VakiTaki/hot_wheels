import React from "react";

function Navigation() {
  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between">
      <a href="/pl" className=" font-semibold leading-6 m-2">
        Путевые листы
      </a>
      <a href="/repair" className="font-semibold leading-6  m-2">
        Заявки на ремонт
      </a>
      <a href="/finace" className="font-semibold leading-6  m-2">
        Финансы
      </a>
    </nav>
  );
}

export default Navigation;
