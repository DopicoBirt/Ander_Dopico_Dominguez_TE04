import { obtenerPaises } from "../service/paisService.js";

const cuerpo = document.getElementById("cuerpoRanking");
const cargando = document.getElementById("cargando");
const error = document.getElementById("error");

async function iniciar() {
  try {
    const paises = await obtenerPaises();
    const conPoblacion = paises.filter(p => p.poblacion !== null);
    conPoblacion.sort((a, b) => b.poblacion - a.poblacion);

    conPoblacion.forEach((pais, i) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${i + 1}</td>
        <td>${pais.nombre}</td>
        <td>${pais.region}</td>
        <td>${pais.capital}</td>
        <td>${pais.poblacion.toLocaleString("es-ES")}</td>
      `;
      cuerpo.appendChild(fila);
    });
  } catch (e) {
    error.textContent = "No se han podido cargar los datos. Inténtalo más tarde.";
  } finally {
    cargando.style.display = "none";
  }
}

iniciar();