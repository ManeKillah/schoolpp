import React from "react";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <h3 className="mb-4">Configuraciones</h3>
      <div className="px-2">{children}</div>
    </>
  );
}
