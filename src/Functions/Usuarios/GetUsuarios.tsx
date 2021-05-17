import axios from "axios";
import { useState, useEffect } from "react";

export function GetUsuarios() {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const url = "http://localhost/proyecto/clientes.php";

  async function peticionGet() {
    await axios
      .get(url)
      .then(response => {
        setUsuarios(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    peticionGet();
  }, []);

  return usuarios;
}
