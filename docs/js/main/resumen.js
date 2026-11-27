import { obtenerPaises } from "../service/paisService.js";
import { esFavorito, alternarFavorito } from "../data/favoritosData.js";

const cuerpo = document.getElementById("cuerpoRanking");
const cargando = document.getElementById("cargando");
const error = document.getElementById("error");

async function iniciar() {
  try {
    const paises = await obtenerPaises();
    const conPoblacion = paises.filter(p => p.poblacion !== null);
    conPoblacion.sort((a, b) => b.poblacion - a.poblacion);
    const total = conPoblacion.reduce((suma, p) => suma + p.poblacion, 0);

    conPoblacion.forEach((pais, i) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${i + 1}</td>
        <td>${pais.nombre}</td>
        <td>${pais.region}</td>
        <td>${pais.capital}</td>
        <td>${pais.poblacion.toLocaleString("es-ES")}</td>
        <td>${(pais.poblacion / total * 100).toFixed(2)} %</td>
        <td>${pais.ingresos}</td>
        <td><a href="views/detalle.html?codigo=${pais.codigo}">Comparar</a></td>
        <td><button class="btnFav" data-codigo="${pais.codigo}">${esFavorito(pais.codigo) ? "★" : "☆"}</button></td>

      `;
      cuerpo.appendChild(fila);
    });
  } catch (e) {
    error.textContent = "No se han podido cargar los datos. Inténtalo más tarde.";
  } finally {
    cargando.style.display = "none";
  }
}

cuerpo.addEventListener("click", (evento) => {
  if (evento.target.classList.contains("btnFav")) {
    const codigo = evento.target.dataset.codigo;
    alternarFavorito(codigo);
    evento.target.textContent = esFavorito(codigo) ? "★" : "☆";
  }
});

document.getElementById("buscador").addEventListener("input", (evento) => {
  const texto = evento.target.value.toLowerCase();
  const filas = cuerpo.querySelectorAll("tr");
  filas.forEach(fila => {
    const nombre = fila.children[1].textContent.toLowerCase();
    fila.style.display = nombre.includes(texto) ? "" : "none";
  });
});

iniciar();