import { useState } from "react";
import "../css/login.css";
import { Link, Redirect } from "react-router-dom";
import { GetUsuarios } from "../Functions/Usuarios/GetUsuarios";

export default function Login(props: any) {
  const [logIn, setLogIn] = useState(false);
  const usuarios: any[] = GetUsuarios();
  const comprobacion = {
    correo: false,
    contraseña: false
  };
  const [loginUser, setLoginUser] = useState({
    correo: "",
    contraseña: ""
  });
  let error: string = "";
  let id: string = "0";

  function comprobarErrores() {
    usuarios.forEach(usuario => {
      if (usuario.correo === loginUser.correo) {
        comprobacion.correo = true;
        id = usuario.id;
      }
      if (usuario.contraseña === loginUser.contraseña) {
        comprobacion.contraseña = true;
      }
    });
    return comprobacion;
  }

  function sacarError() {
    comprobarErrores();
    error = "";

    if (!comprobacion.contraseña) {
      error = "La contraseña es incorrecta";
    }

    if (!comprobacion.correo) {
      error = "Ese correo no existe";
    }

    if (error === "") {
      setLogIn(true);
    }

    const rootElement = document.getElementById("error");

    // @ts-ignore: Object is possibly 'null'.
    rootElement.innerHTML = error;
  }

  function enviarData(event: any) {
    event.preventDefault();
    sacarError();

    props.getId(id);
  }

  function handleChange(event: any) {
    const { name, value } = event.target;
    setLoginUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  if (logIn) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="login">
        <div className="row mx-0">
          <div className="col-6 offset-3 mt-5">
            <div className="card pt-5">
              <div className="card-header text-center">
                <h3>Iniciar Sesion</h3>
              </div>
              <div className="card-body">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    📧
                  </span>
                  <input
                    id="idCorreo"
                    type="email"
                    onChange={handleChange}
                    name="correo"
                    className="form-control"
                    placeholder="Correo"
                    aria-label="Correo"
                    aria-describedby="basic-addon1"
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    🔒
                  </span>
                  <input
                    id="idContraseña"
                    type="password"
                    onChange={handleChange}
                    name="contraseña"
                    className="form-control"
                    placeholder="Contraseña"
                    aria-label="Contraseña"
                    aria-describedby="basic-addon1"
                    required
                  />
                </div>

                <div className="text-center pb-3">
                  <button
                    onClick={enviarData}
                    className="btn btn-info btn-lg btn-block"
                  >
                    Iniciar Sesion
                  </button>
                </div>

                <div
                  id="error"
                  className="alerrt alert-danger text-center ptb-2"
                ></div>

                <div className="card-footer text-center">
                  <span>¿Has olvidado la contraseña?</span>
                  <br />
                  <a href="/">Recuperar</a>
                  <br />
                  <span>¿No tienes cuenta todavía? Create una </span>
                  <Link to={`/Registrarse`}>
                    <span>aquí</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
