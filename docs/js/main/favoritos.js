import { obtenerPaises } from "../service/paisService.js";
import { obtenerFavoritos, alternarFavorito } from "../data/favoritosData.js";

const lista = document.getElementById("listaFavoritos");
let paises = [];

async function iniciar() {
  try {
    paises = await obtenerPaises();
    pintarFavoritos();
  } catch (error) {
    document.getElementById("error").textContent = "No se han podido cargar los datos. Inténtalo más tarde.";
  } finally {
    document.getElementById("cargando").style.display = "none";
  }
}

function pintarFavoritos() {
  const codigos = obtenerFavoritos();
  const favoritos = paises.filter(p => codigos.includes(p.codigo));
  lista.innerHTML = "";

  if (favoritos.length === 0) {
    document.getElementById("vacio").textContent = "Aún no tienes favoritos. Márcalos con ☆ en el ranking.";
    return;
  }

  favoritos.forEach(pais => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");
    tarjeta.innerHTML = `
      <h3>${pais.nombre}</h3>
      <p>Región: ${pais.region}</p>
      <p>Capital: ${pais.capital}</p>
      <p>Población: ${pais.poblacion ? pais.poblacion.toLocaleString("es-ES") : "Sin datos"}</p>
      <a href="detalle.html?codigo=${pais.codigo}">Comparar</a>
      <button class="btnQuitar" data-codigo="${pais.codigo}">Quitar</button>
    `;
    lista.appendChild(tarjeta);
  });
}

lista.addEventListener("click", (evento) => {
  if (evento.target.classList.contains("btnQuitar")) {
    alternarFavorito(evento.target.dataset.codigo);
    pintarFavoritos();
  }
});

iniciar();