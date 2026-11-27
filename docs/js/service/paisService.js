import { Pais } from "../model/Pais.js";

const URL_PAISES = "https://api.worldbank.org/v2/country?format=json&per_page=400";
const URL_POBLACION = "https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?format=json&date=2023&per_page=400";

export async function obtenerPaises() {
  const respPaises = await fetch(URL_PAISES);
  const datosPaises = await respPaises.json();

  const respPoblacion = await fetch(URL_POBLACION);
  const datosPoblacion = await respPoblacion.json();

  const listaPaises = [];

  for (const p of datosPaises[1]) {
    if (p.region.value === "Aggregates") {
      continue;
    }
    const dato = datosPoblacion[1].find(d => d.countryiso3code === p.id);
    const poblacion = dato ? dato.value : null;

    listaPaises.push(new Pais(p.id, p.name, p.region.value.trim(), p.capitalCity, p.incomeLevel.value, poblacion));
  }

  return listaPaises;
}

export async function obtenerHistorico(codigo) {
  const url = `https://api.worldbank.org/v2/country/${codigo}/indicator/SP.POP.TOTL?format=json&date=2014:2023`;
  const resp = await fetch(url);
  const datos = await resp.json();
  return datos[1].map(d => ({ anio: d.date, poblacion: d.value }));
}