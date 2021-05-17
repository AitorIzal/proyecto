import { Link } from "react-router-dom";
import { GetUsuarios } from "../Functions/Usuarios/GetUsuarios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Header.css";
import Logo from "../img/Logo1.svg";

export function HeaderUsuario(props: any) {
  const usuario = {
    id: props.Children,
    nombre: "",
    apellidos: ""
  };

  function cerrarSesion() {
    props.getId("0");
  }

  if (usuario.id !== "-1") {
    const usuarios: any[] = GetUsuarios();
    usuarios.forEach(usuarioData => {
      if (usuario.id === usuarioData.id) {
        usuario.nombre = usuarioData.nombre;
        usuario.apellidos = usuarioData.apellidos;
      }
    });
  } else {
    const usuarios: any[] = GetUsuarios();
    usuario.id = usuarios[usuarios.length - 1].id;
    usuario.nombre = usuarios[usuarios.length - 1].nombre;
    usuario.apellidos = usuarios[usuarios.length - 1].apellidos;
  }

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

      <div className="col-2 offset-2 usuario">
        <span className="nombre-usuario">{usuario.nombre}</span>
        <button className="btn btn-primary" onClick={cerrarSesion}>
          Cerrar Sesion
        </button>
      </div>
    </div>
  );
}
