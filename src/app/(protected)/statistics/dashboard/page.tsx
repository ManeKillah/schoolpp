import { OperationsTable } from "@/modules/operations/components/rental-table";
import { Button } from "@/shared/components/ui/button";
import { CardContent } from "@/shared/components/ui/card";
import { Label } from "@/shared/components/ui/label";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <div className="h-screen flex flex-col">
      <h2 className="text-3xl font-bold mb-8">Bienvenido</h2>
      <div className="flex flex-col md:flex-row">
        <CardContent className="md:mr-8 mb-8 rounded-xl overflow-hidden" style={{ border: "1px solid black", flex: "1" }}>
          <div className="flex">
            <img alt="Logo" src="/fondo.jpg" className="mr-4" style={{ maxWidth: "300px" }} />
            <div>
              <p className="text-xl font-semibold mb-4">Banner informativo</p>
              <Button>Ocultar</Button>
            </div>
          </div>
        </CardContent>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center space-x-4">
        <CardContent className="rounded-xl overflow-hidden" style={{ border: "1px solid black", flex: "1" }}>
          <div className="flex flex-col items-center">
            <p className="text-xl font-semibold mb-4">Total Alquileres</p>
            <div className="flex items-center">
              <div className="flex flex-col">
                <Label className="text-lg font-bold">5,567</Label>
                {/* <div style={{ marginTop: "8px" }}>{"Valor de la cifra"}</div> */}
              </div>
              <img alt="Logo" src="/area.png" className="mr-4" style={{ maxWidth: "150px" }} />
            </div>
          </div>
        </CardContent>
        <CardContent className="rounded-xl overflow-hidden" style={{ border: "1px solid black", flex: "1" }}>
          <div className="flex flex-col items-center">
            <p className="text-xl font-semibold mb-4">Total Equipos</p>
            <div className="flex items-center">
              <div className="flex flex-col">
                <Label className="text-lg font-bold">1,567</Label>
                {/* <div style={{ marginTop: "8px" }}>{"Valor de la cifra"}</div> */}
              </div>
              <img alt="Logo" src="/area2.png" className="mr-4" style={{ maxWidth: "150px" }} />
            </div>
          </div>
        </CardContent>
        <CardContent className="rounded-xl overflow-hidden" style={{ border: "1px solid black", flex: "1" }}>
          <div className="flex flex-col items-center">
            <p className="text-xl font-semibold mb-4">Total proyectos</p>
            <div className="flex items-center">
              <div className="flex flex-col">
                <Label className="text-lg font-bold">1,567</Label>
                {/* <div style={{ marginTop: "8px" }}>{"Valor de la cifra"}</div> */}
              </div>
              <img alt="Logo" src="/area.png" className="mr-4" style={{ maxWidth: "150px" }} />
            </div>
          </div>
        </CardContent>
      </div>
  <div>
    <p className="text-xl font-semibold mb-4">Operaciones</p>
  </div>
      <div className="flex flex-col md:flex-row">
  <div className="flex-1">
      <OperationsTable />
    {/* <Suspense fallback={<div>Loading...</div>}>
    </Suspense> */}
  </div>
</div>

    </div>
  );
}
