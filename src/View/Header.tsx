import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Header.css";
import Logo from "../img/Logo1.svg";

export default function HeaderView() {
  return (
    <div className="header d-flex container-fluid mx-0 px-0">
      <div className="logo col-4"></div>
      <div className="titulo col-4 text-center">
        <picture>
          <source srcSet={Logo} type="image/svg+xml" />
          <Link to="/">
            <img className="img-fluid" src={Logo} alt="Logo" />
          </Link>
        </picture>
      </div>

      <div className="col-2 offset-2 btn-group">
        <Link to={`/Registrarse`}>
          <button className="btn btn-secondary">Registrarse</button>
        </Link>
        <Link to={`/Login`}>
          <button className="btn btn-primary">Iniciar Sesion</button>
        </Link>
      </div>
    </div>
  );
}
