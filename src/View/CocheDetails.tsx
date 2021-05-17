import { useParams } from "react-router-dom";
import { GetCoches } from "../Functions/Coches/GetCoches";
import { Calendario } from "./Calendario";

export default function CocheDetails(props: any) {
  const coches: any[] = GetCoches();
  const { id }: any = useParams();
  let cocheId: any;

  function getIdUsuario() {
    return props.Children;
  }

  function maleta(maletas: any) {
    const tamañoMaletero: string[] = maletas.split(",");
    return (
      tamañoMaletero[0] +
      " maletas pequeñas, " +
      tamañoMaletero[1] +
      " maletas grandes"
    );
  }

  function cocheSeleccionado(coche: any) {
    if (coche.id === id) {
      cocheId = (
        <div className="card-img">
          <img
            src={coche.imgUrl}
            className="imagen-coche-detalles"
            alt="Imagen de coche"
          />
          <div>
            <h1 className="card-title">{coche.marca + " " + coche.modelo}</h1>
            <p className="card-text">KM/L: {coche.kilometrosDia}</p>
            <p className="card-text">Precio por día: {coche.precioDia}€</p>
            <p className="card-text">Numero de pasajeros: {coche.pasajeros}</p>
            <p className="card-text">
              Tamaño de maletero: {maleta(coche.maleta)}
            </p>
            <p className="card-text">Transmision: {coche.transmision}</p>
            <p className="card-text">Extra: {coche.extra}</p>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="card coche-seleccionado">
      {coches.forEach(coche => {
        cocheSeleccionado(coche);
      })}

      {cocheId}

      <div>
        <Calendario Children={id} getId={getIdUsuario()}></Calendario>
      </div>
    </div>
  );
}
