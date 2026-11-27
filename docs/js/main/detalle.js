import { obtenerPaises, obtenerHistorico } from "../service/paisService.js";

const titulo = document.getElementById("tituloPais");
const select = document.getElementById("selectComparar");
const btnOrden = document.getElementById("btnOrden");
const cuerpo = document.getElementById("cuerpoComparativa");
const colPais1 = document.getElementById("colPais1");
const colPais2 = document.getElementById("colPais2");

const parametros = new URLSearchParams(window.location.search);
const codigo = parametros.get("codigo");

let datosPais = [];
let datosComparado = [];
let ascendente = false;

async function iniciar() {
  const paises = await obtenerPaises();
  const pais = paises.find(p => p.codigo === codigo);
  titulo.textContent = `${pais.nombre} (${pais.region})`;
  colPais1.textContent = pais.nombre;

  paises.forEach(p => {
    if (p.codigo !== codigo) {
      const opcion = document.createElement("option");
      opcion.value = p.codigo;
      opcion.textContent = p.nombre;
      select.appendChild(opcion);
    }
  });

  datosPais = await obtenerHistorico(codigo);
  await cambiarComparado();
}

async function cambiarComparado() {
  datosComparado = await obtenerHistorico(select.value);
  colPais2.textContent = select.options[select.selectedIndex].text;
  pintarTabla();
}

function pintarTabla() {
  cuerpo.innerHTML = "";
  const filas = [...datosPais];
  filas.sort((a, b) => ascendente ? a.anio - b.anio : b.anio - a.anio);

  filas.forEach(fila => {
    const otro = datosComparado.find(d => d.anio === fila.anio);
    const diferencia = fila.poblacion - otro.poblacion;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${fila.anio}</td>
      <td>${fila.poblacion.toLocaleString("es-ES")}</td>
      <td>${otro.poblacion.toLocaleString("es-ES")}</td>
      <td>${diferencia.toLocaleString("es-ES")}</td>
    `;
    cuerpo.appendChild(tr);
  });
}

select.addEventListener("change", cambiarComparado);

btnOrden.addEventListener("click", () => {
  ascendente = !ascendente;
  pintarTabla();
});

iniciar();