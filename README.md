# Star Wars Character Search

## Descripcion del proyecto

Star Wars Character Search es una aplicacion web de ejemplo que permite buscar personajes del universo de Star Wars. El usuario escribe el nombre de un personaje en una interfaz web construida con React, y la aplicacion consulta un backend en Node.js que filtra y devuelve los resultados correspondientes. Cada personaje se muestra en una tarjeta con su imagen e informacion relevante.

---

## Objetivo del proyecto

El objetivo de este proyecto es demostrar la integracion entre un frontend moderno (React) y un backend RESTful (Node.js + Express), aplicando una arquitectura cliente-servidor clara y desacoplada. Sirve como ejercicio practico para comprender el flujo de datos entre capas de una aplicacion web.

---

## Arquitectura del sistema

La aplicacion sigue una arquitectura de tres capas:

```
[Navegador del usuario]
        |
        | HTTP (peticion de busqueda)
        v
[Frontend - React - Puerto 3000]
        |
        | HTTP (llamada a la API interna)
        v
[Backend - Node.js + Express - Puerto 3001]
        |
        | HTTP (consulta a API publica)
        v
[API externa - akabab.github.io/starwars-api]
```

**Flujo de la peticion:**

1. El usuario escribe el nombre de un personaje en el campo de busqueda del frontend.
2. React realiza una peticion HTTP al backend (`http://localhost:3001/api/characters?name=...`).
3. El backend consulta la API publica: `https://akabab.github.io/starwars-api/api/all.json`
4. El backend filtra los personajes cuyo nombre coincide con el termino de busqueda.
5. El backend responde al frontend con la lista de personajes filtrada.
6. React renderiza los resultados en tarjetas con imagen e informacion del personaje.

---

## Estructura del repositorio

```
starwars-search/
|
|-- frontend/
|   |-- src/              # Componentes y logica de React
|   |-- public/           # Archivos estaticos (index.html, favicon, etc.)
|   |-- package.json      # Dependencias y scripts del frontend
|
|-- backend/
|   |-- routes/           # Definicion de rutas Express
|   |-- services/         # Logica de negocio y llamadas a la API externa
|   |-- server.js         # Punto de entrada del servidor
|   |-- package.json      # Dependencias y scripts del backend
|
|-- README.md             # Documentacion del proyecto
|-- .gitignore            # Archivos y carpetas ignorados por Git
```

---

## Requisitos previos

Antes de ejecutar el proyecto, asegurate de tener instalado lo siguiente en tu computadora:

| Herramienta | Version minima recomendada |
| ----------- | -------------------------- |
| Node.js     | 18.x o superior            |
| npm         | 9.x o superior             |
| Git         | 2.x o superior             |

Para verificar las versiones instaladas, ejecuta:

```bash
node --version
npm --version
git --version
```

---

## Instalacion paso a paso

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd starwars-search
```

### 2. Instalar dependencias del backend

```bash
cd backend
npm install
```

### 3. Instalar dependencias del frontend

```bash
cd ../frontend
npm install
```

---

## Como ejecutar el backend

Desde la carpeta `backend/`, ejecuta:

```bash
cd backend
node server.js
```

El servidor estara disponible en: `http://localhost:3001`

Para ejecutarlo con recarga automatica al guardar cambios, puedes usar `nodemon`:

```bash
npm install -g nodemon
nodemon server.js
```

---

## Como ejecutar el frontend

Desde la carpeta `frontend/`, ejecuta:

```bash
cd frontend
npm start
```

La aplicacion estara disponible en el navegador en: `http://localhost:3000`

> Nota: el backend debe estar en ejecucion antes de iniciar el frontend para que las busquedas funcionen correctamente.

---

## Endpoint del backend

| Metodo | Ruta                       | Descripcion                                   |
| ------ | -------------------------- | --------------------------------------------- |
| GET    | `/api/characters?name=...` | Busca personajes por nombre (parcial o total) |

**Ejemplo de peticion:**

```
GET http://localhost:3001/api/characters?name=luke
```

**Ejemplo de respuesta:**

```json
[
  {
    "id": 1,
    "name": "Luke Skywalker",
    "image": "https://akabab.github.io/starwars-api/api/pics/1.jpg",
    "species": "Human",
    "homeworld": "Tatooine"
  }
]
```

---

## Flujo de trabajo con Git

Este proyecto utiliza un flujo de trabajo basado en ramas por responsabilidad. Cada integrante del equipo trabaja en su propia rama y los cambios se integran mediante pull requests a la rama principal.

### Pasos para contribuir

1. Asegurate de estar en la rama correcta antes de comenzar:

```bash
git checkout <nombre-de-tu-rama>
```

2. Realiza tus cambios y confirmalos con un mensaje descriptivo:

```bash
git add .
git commit -m "descripcion clara del cambio realizado"
```

3. Sube tus cambios al repositorio remoto:

```bash
git push origin <nombre-de-tu-rama>
```

4. Abre un pull request hacia `main` desde la interfaz del repositorio remoto.

---

## Ramas del proyecto

| Rama              | Descripcion                                         |
| ----------------- | --------------------------------------------------- |
| `main`            | Rama principal con el codigo estable e integrado    |
| `frontend-ui`     | Desarrollo de la interfaz de usuario con React      |
| `frontend-logic`  | Logica de consumo de la API desde el frontend       |
| `backend-api`     | Definicion de rutas y controladores del backend     |
| `backend-service` | Servicio de consulta y filtrado de la API externa   |
| `devops`          | Configuracion del proyecto, scripts y documentacion |

---

## Resultado esperado

Al ejecutar correctamente la aplicacion, el usuario vera una pagina web con un campo de busqueda. Al escribir el nombre de un personaje (por ejemplo, "Vader", "Yoda" o "Luke"), la aplicacion mostrara una lista de tarjetas con:

- Nombre del personaje
- Imagen del personaje
- Informacion adicional (especie, planeta de origen, entre otros)

Si no se encuentran resultados para el termino buscado, la aplicacion mostrara un mensaje indicando que no se encontraron coincidencias.

---

## Notas adicionales

- La aplicacion no requiere base de datos. Todos los datos provienen de la API publica de Star Wars.
- El proyecto esta pensado para correr completamente en entorno local.
- No es necesario configurar variables de entorno para ejecutarlo en modo desarrollo.
