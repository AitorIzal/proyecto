import axios from "axios";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "../css/login.css";
import { GetUsuarios } from "../Functions/Usuarios/GetUsuarios";

export default function Registrarse(props: any) {
  const url = "http://localhost/proyecto/clientes.php";
  const [data, setData] = useState([]);
  const usuarios: any[] = GetUsuarios();
  const [crearCuenta, setCrearCuenta] = useState(false);
  let error: string = "";
  const [user, setUser] = useState({
    id: "",
    correo: "",
    contraseña: "",
    contraseñaRepetida: "",
    nombre: "",
    apellido: "",
    pregunta: "",
    respuesta: ""
  });

  console.log(props);

  const sumbitData = async (event: any) => {
    event.preventDefault();
    comprobarErrores();
    console.log("let error:", error);

    if (!error) {
      let form = new FormData();
      form.append("correo", user.correo);
      form.append("contraseña", user.contraseña);
      form.append("nombre", user.nombre);
      form.append("apellido", user.apellido);
      form.append("pregunta", user.pregunta);
      form.append("respuesta", user.respuesta);
      form.append("METHOD", "POST");
      await axios
        .post(url, form)
        .then(response => {
          setData(data.concat(response.data));
        })
        .catch(error => {
          console.log(error);
        });
      setCrearCuenta(true);

      props.getId("-1");
    } else {
      const rootElement = document.getElementById("error");

      // @ts-ignore: Object is possibly 'null'.
      rootElement.innerHTML = error;
    }
  };

  function handleChange(event: any) {
    console.log("esta cambaindo datos");

    const { name, value } = event.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
    console.log(user);
  }

  function comprobarErrores() {
    error = "";

    if (user.contraseña !== user.contraseñaRepetida) {
      error = "Las contraseña deben ser iguales";
    }
    usuarios.forEach(usuario => {
      if (user.correo === usuario.correo) {
        console.log("error en correo, esta repetido");

        error = "El correo indicado ya existe";
      }
    });
  }

  if (crearCuenta) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="login">
        <div className="row mx-0">
          <div className="col-6 offset-3 mt-5">
            <div className="card pt-5">
              <form onSubmit={sumbitData}>
                <div className="card-header text-center">
                  <h3>Registrarse</h3>
                </div>
                <div className="card-body">
                  <div className="input-group mb-3">
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
                  <div className="input-group mb-3">
                    <input
                      id="idContraseñaRepetida"
                      type="password"
                      onChange={handleChange}
                      name="contraseñaRepetida"
                      className="form-control"
                      placeholder="Repita la contraseña"
                      aria-label="Repita la contraseña"
                      aria-describedby="basic-addon1"
                      required
                    />
                  </div>
                  <div className="input-group mb-3">
                    <input
                      id="idNombre"
                      type="text"
                      onChange={handleChange}
                      name="nombre"
                      className="form-control"
                      placeholder="Nombre"
                      aria-label="Nombre"
                      aria-describedby="basic-addon1"
                      required
                    />
                  </div>
                  <div className="input-group mb-3">
                    <input
                      id="idApellido"
                      type="text"
                      onChange={handleChange}
                      name="apellido"
                      className="form-control"
                      placeholder="Apellidos"
                      aria-label="Apellidos"
                      aria-describedby="basic-addon1"
                      required
                    />
                  </div>
                  <div className="input-group mb-3">
                    <select
                      className="form-select"
                      name="pregunta"
                      id="idPregunta"
                      onChange={handleChange}
                      required
                    >
                      <option value="">Seleccione una pregunta</option>
                      <option value={1}>
                        ¿Cual es el nombre de tu primera mascota?
                      </option>
                      <option value={2}>
                        ¿Cual es el nombre de tu jugador favorito?
                      </option>
                      <option value={3}>
                        ¿Cual es el nombre de la ciudad en la que naciste?
                      </option>
                      <option value={4}>¿Cual es tu color favorito?</option>
                    </select>
                  </div>

                  <div className="input-group mb-3">
                    <input
                      id="idRespuesta"
                      type="text"
                      onChange={handleChange}
                      name="respuesta"
                      className="form-control"
                      placeholder="Respuesta"
                      aria-label="Respuesta"
                      aria-describedby="basic-addon1"
                      required
                    />
                  </div>

                  <div
                    id="error"
                    className="alerrt alert-danger text-center ptb-2"
                  ></div>

                  <div className="text-center pb-3">
                    <button className="btn btn-info btn-lg btn-block">
                      Registrarse
                    </button>
                  </div>
                  <div className="card-footer text-center">
                    <span>¿Ya tienes una cuenta?</span>
                    <br />
                    <span>Inicia sesion </span>
                    <Link to={`/LogIn`}>
                      <span>aquí</span>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
