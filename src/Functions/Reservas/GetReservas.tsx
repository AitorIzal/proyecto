import axios from "axios";
import { useState, useEffect } from "react";

export function GetReservas() {
  const [coches, setCoches] = useState<any[]>([]);
  const url = "http://localhost/proyecto/alquilerCoches.php";

  async function peticionGet() {
    await axios
      .get(url)
      .then(response => {
        setCoches(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    peticionGet();
  }, []);

  return coches;
}
