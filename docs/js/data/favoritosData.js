const CLAVE = "favoritosCountryApp";

export function obtenerFavoritos() {
  const guardados = localStorage.getItem(CLAVE);
  return guardados ? JSON.parse(guardados) : [];
}

export function esFavorito(codigo) {
  return obtenerFavoritos().includes(codigo);
}

export function alternarFavorito(codigo) {
  let favoritos = obtenerFavoritos();
  if (favoritos.includes(codigo)) {
    favoritos = favoritos.filter(c => c !== codigo);
  } else {
    favoritos.push(codigo);
  }
  localStorage.setItem(CLAVE, JSON.stringify(favoritos));
}