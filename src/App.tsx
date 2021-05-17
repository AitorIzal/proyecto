import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./View/ListadoCoches";
import CocheDetails from "./View/CocheDetails";
import Registrarse from "./View/Registrarse";
import HeaderView from "./View/Header";
import Login from "./View/LogIn";
import { useState } from "react";
import { HeaderUsuario } from "./View/HeaderUsuario";
import "./css/body.css";
import { Footer } from "./View/Footer";

function App() {
  const [id, setId] = useState("0");

  const getId = (idData: any) => {
    setId(idData);
    console.log("this is id", id);
  };

  return (
    <div className="container-fluid px-0 mx-0">
      <Router>
        {id !== "0" ? (
          <HeaderUsuario getId={getId} Children={id} />
        ) : (
          <HeaderView />
        )}
        <Switch>
          <Route path="/coche/:id">
            <CocheDetails Children={id}></CocheDetails>
          </Route>
          <Route path="/Registrarse">
            <Registrarse getId={getId} />
          </Route>
          <Route path="/login">
            <Login getId={getId} />
          </Route>
          <Route path="/" exact component={Home}></Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
