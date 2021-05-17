import "bootstrap/dist/css/bootstrap.min.css";
import "../css/coches-card.css";
import { Link } from "react-router-dom";
import { GetCoches } from "../Functions/Coches/GetCoches";

export default function Home() {
  const coches: any[] = GetCoches();

  function maleta(maletas: any) {
    const tamañoMaletero: string[] = maletas.split(",");
    return (
      tamañoMaletero[0] +
      " maletas pequeñas, " +
      tamañoMaletero[1] +
      " maletas grandes"
    );
  }

  return (
    <div className="card-group mt-4">
      {coches.map(coche => (
        <Link to={`/coche/${coche.id}`}>
          <div className="card coche-background">
            <div className="card-img-top">
              <img
                src={coche.imgUrl}
                alt="Imagen de coche"
                className="img-coche"
              />
            </div>
            <div className="card-body ">
              <h5 className="card-title">{coche.marca + " " + coche.modelo}</h5>
              <p className="card-text">KM/L: {coche.kilometrosDia}</p>
              <p className="card-text">Precio por día: {coche.precioDia}€</p>
              <p className="card-text">
                Numero de pasajeros: {coche.pasajeros}
              </p>
              <p className="card-text">
                Tamaño de maletero: {maleta(coche.maleta)}
              </p>
              <p className="card-text">Transmision: {coche.transmision}</p>
              <p className="card-text">Extra: {coche.extra}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
