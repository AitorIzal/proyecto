import { useState } from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/calendario.css";
import { GetReservas } from "../Functions/Reservas/GetReservas";
import axios from "axios";

export function Calendario(props: any) {
  const url = "http://localhost/proyecto/alquilerCoches.php";
  const [data, setData] = useState("");
  const [state, setState] = useState(getInitialState());
  const { from, to } = state;
  const modifiers = { start: from, end: to };
  const today: Date = new Date();
  let form = new FormData();
  let error: string = "";

  function getInitialState() {
    return {
      from: undefined,
      to: undefined
    };
  }

  function handleDayClick(day: any) {
    const range: any = DateUtils.addDayToRange(day, state);
    setState(range);
  }

  async function reservar() {
    await axios
      .post(url, form)
      .then(response => {
        setData(data.concat(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  }

  function comprobarReserva() {
    if (
      from === undefined ||
      from === null ||
      to === undefined ||
      to === null
    ) {
      error = "Seleccione la fecha de recogida y de devuelta del coche";
    } else {
      if (props.getId === "0") {
        error = "Deves iniciar sesion para poder hacer una reserva";
      } else {
        const inicio: any = from;
        let fechaEntrega: any;
        if (inicio.getMonth() + 1 < 10) {
          fechaEntrega =
            inicio.getFullYear() +
            "-0" +
            (inicio.getMonth() + 1) +
            "-" +
            inicio.getDate();
        } else {
          fechaEntrega =
            inicio.getFullYear() +
            "-" +
            (inicio.getMonth() + 1) +
            "-" +
            inicio.getDate();
        }

        const final: any = to;
        let fechaDevuelta: any;
        if (final.getMonth() + 1 < 10) {
          fechaDevuelta =
            final.getFullYear() +
            "-0" +
            (final.getMonth() + 1) +
            "-" +
            final.getDate();
        } else {
          fechaDevuelta =
            final.getFullYear() +
            "-" +
            (final.getMonth() + 1) +
            "-" +
            final.getDate();
        }

        form.append("idCoche", props.Children);
        form.append("idUsuario", props.getId);
        form.append("fechaEntrega", fechaEntrega);
        form.append("fechaDevuelta", fechaDevuelta);
        form.append("METHOD", "POST");

        reservar();
      }
    }
    const rootElement = document.getElementById("error");

    // @ts-ignore: Object is possibly 'null'.
    rootElement.innerHTML = error;
  }

  return (
    <div>
      <DayPicker
        className="Selectable"
        numberOfMonths={1}
        selectedDays={[from, { from, to }]}
        modifiers={modifiers}
        disabledDays={{ before: today }}
        onDayClick={handleDayClick}
      />
      <br />
      <button className="btn btn-primary" onClick={comprobarReserva}>
        Realizar Reserva
      </button>
      <div id="error" className="alerrt alert-danger text-center ptb-2"></div>
    </div>
  );
}
