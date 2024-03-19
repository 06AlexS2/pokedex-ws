# PROYECTO: Pokédex Web Service con Node.js
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)

# Contenido

- [Arquitectura del proyecto](#architecture)
- [Instalación](#installation)
- [Pruebas Unitarias](#unit-tests)
- [Docker](#docker)
- [Endpoints](#endpoints)
- [Flujo de trabajo](#git-flow)

# <a name="architecture"></a>Arquitectura
Este código implementa una aplicación utilizando la arquitectura Domain-Driven Design (DDD).

El Domain-Driven Design es un enfoque de diseño de software que se centra en el dominio del problema y en la colaboración entre expertos en el dominio y desarrolladores. Esta arquitectura se basa en la idea de dividir la lógica de negocio en diferentes capas, como la capa de dominio, la capa de aplicación y la capa de infraestructura.

En este código, se sigue el enfoque DDD para organizar y estructurar la aplicación. La capa de dominio contiene las entidades, agregados, objetos de valor y servicios del dominio. La capa de aplicación se encarga de orquestar las operaciones del dominio y proporciona una interfaz para interactuar con el exterior. La capa de infraestructura se encarga de la persistencia de datos, la comunicación con servicios externos y otros aspectos técnicos.

El uso de la arquitectura Domain-Driven Design ayuda a crear aplicaciones más mantenibles, escalables y centradas en el dominio del problema.
La estructura de carpetas del proyecto va de la siguiente forma:
```
raiz_proyecto
|
├── src
    └── context             
        └── pokemon         
            └── application
                └── PokemonService.ts
            └── domain
                ├── value_objects
                    └── ...
                ├── MoveDamageClass.ts
                ├── Pokemon.ts
                ├── PokemonMove.ts
                ├── PokemonMoveEffect.ts
                └── PokemonType.ts
            └── infrastructure
                ├── express
                └── persistence
                    └── SQLite
                        ├──prisma
                           ├── dev.db
                           ├── DBRepository.ts
                           └── schema.prisma
                        └── PokemonRepository.ts
        └── shared
            └── ...
    ├── app.ts
    └── index.ts
├── Dockerfile
├── .env
└── docker-compose.yml

```

La estructura dada por DDD, confiere al directorio principal de tres secciones principales:
- 1. application: En este directorio, se encuentran los servicios de la aplicación, mismos que permiten utilizar objetos de dominio y requerir de los métodos de infraestructura
- 2. domain: Contiene la lógica de negocio y las entidades utilizadas por el mismo. Los objetos de valor, que son objetos únicos y cuyas propiedades son atribuibles a sí mismos, son implementados en el dominio.
- 3. infrastructure: En este directorio, se encuentra el código que facilita la comunicación con servicios externos, como bases de datos, esquemas de REST API, etc.



La ventaja de utilizar la arquitectura DDD, es que los proyectos se hacen escalables y mantenibles en el tiempo. Es decir, conforme el dominio crezca o cambie, resulta más sencillo reemplazar o actualizar la estructura de código tanto en diseño como en tecnologías implementadas.

Resulta complicado iniciar un proyecto con arquitectura DDD, pero a largo plazo, es una opción idonea si lo que se desea es persistir una aplicación indefinidamente.

# <a name="installation"></a>Instalación del proyecto
Para poder ejecutar el proyecto, primero es necesario tener el directorio en tu computadora. Para ello, se puede utilizar el comando: 
```bash
git clone https://github.com/06AlexS2/pokedex-ws.git
```
O descargando el archivo comprimido .zip en el repositorio.
Ya que el repositorio es público, cualquiera puede acceder a éste.

## Variables de entorno
Una vez descargado, y haciendo uso de un editor de código, crear un archivo `.env`. Las variables locales que deben ir son las siguientes:
```bash
#.env file
NODE_ENV=development
PORT=your_port
DEV_DATABASE_URL="file: dev.db"
```

Una vez configuradas las variables de entorno, el siguiente comando a implementar será `npm install`, para instalar todas las dependencias utilizadas.

## Dependencias
Las dependencias instaladas para el funcionamiento de este proyecto son:
 - prisma: ORM de base de datos que permite el fácil manejo de comandos e interacción directa con un sistema SQL/No SQL, que protege a su vez de vulnerabilidades como inyección SQL.
 - jest, supertest: Para automatizar las pruebas, estas dependencias estructuran los casos unitarios y los ejecutan por medio del comando `npm run test`
 - express: Framework de desarrollo backend para creación de REST API. Su facilidad de uso y la rapidez de construcción lo hacen un programa sencillo de implementar en aplicaciones con Node.js.
 - route-cache, node-fetch-cache: Para configurar el caché en peticiones GET, route-cache es una dependencia que facilita la implementación de registros por medio de caché a través de un sencillo middleware en cada ruta de la REST API. Por otro lado, node-fetch-cache es una alternativa al metodo fetch que permite asignar un tiempo de vida (TTL) de los datos obtenidos en una petición hacia algún servicio web.
 - sqlite3: manejador de node para la base de datos SQLite implementada en la infraestructura del dominio.
 - dotenv: para implementar las variables de entorno en el ambiente de Node, se utiliza esta sencilla dependencia.

 ## Base de datos SQLite
 Dado que prisma es el encargado de generar localmente la base de datos dentro de la carpeta `persistence`, el primer paso para esta tarea es ubicarse dentro de dicha carpeta, para ello, se utiliza el comando


```bash
cd src/context/pokemon-get/infrastructure/persistence/SQLite
```
Una vez se ubique en esta carpeta, se debe inicializar tanto la estructura de la base de datos como la migración del modelo. Para ello, se implementa el comando
```bash
npx prisma migrate dev --name init
```

Esto generará el archivo dev.db, donde se encuentra la base de datos con el esquema de la aplicación.
Esta base de datos sigue las tres formas normales de una base de datos, mismas que son:

 - 1. Primera Forma Normal: el objetivo es eliminar los grupos repetitivos de datos y garantizar que cada celda de la tabla contenga un solo valor.
 - 2. Segunda Forma Normal: La segunda forma normal se centra en la eliminación de dependencias parciales. Una tabla está en 2NF si está en 1NF y si todos sus atributos no clave dependen completamente de la clave primaria.
 - 3. Tercera Forma Normal: La tercera forma normal busca eliminar las dependencias transitivas. Una tabla está en 3NF si está en 2NF y si no hay ninguna dependencia transitiva de ningún atributo o clave sobre la clave primaria.

# <a name="unit-tests"></a> Pruebas Unitarias
En el directorio `tests`, se encuentran los moldes de pruebas unitarias para el modelo implementado.
Estas pruebas, realizadas y automatizadas con Jest, se evocan en lo siguiente: 

- Hacer test del endpoint para registrar un Pokémon
- Hacer test del endpoint para eliminar un Pokémon por su nombre
- Hacer test del endpoint para eliminar un Pokémon por su id
- Hacer test del endpoint para eliminar un Pokémon o más por su tipo
- Hacer test del endpoint para obtener todos los registros de Pokémon

Cada prueba tiene un caso de error, y estas pruebas pueden ser ejecutadas utilizando el comando `npm run test``

# <a name="docker"></a> Docker
En el directorio, se encuentran las configuraciones de los archivos Dockerfile y docker-compose.yml.

Para crear el contenedor y ejecutarlo, simplemente basta con tener instalado Docker y docker-compose en tu máquina de desarrollo, y ejecutar el comando:
```bash
docker-compose up
```

Donde el puerto de apertura para la aplicación es el 3001.

# <a name="endpoints"></a> URLs de la REST API

- 1. `POST /api/v1/catch/pokemon-name/:pokemon`: En este endpoint, se realiza una petición POST para registrar el Pokémon dado por el parámetro de la URL :pokemon
- 2. `DELETE /api/v1/set-free/pokemon-id/:id`: Para eliminar un Pokémon de la base de datos por su id, dando el parámetro en la URL
- 3. `DELETE /api/set-free/pokemon-name/:pokemon`: Para eliminar un Pokémon de la base de datos por su nombre, dando el parámetro en la URL
- 4. `DELETE /api/set-free/pokemon-type/:type`: Para eliminar uno o más Pokémon de la base de datos por su tipo, dando el parámetro en la URL
- 5. `GET /api/v1/pokedex`: Para obtener todos los registros de Pokémon en la base de datos.

# <a name="pokemon-json"></a> Estructura del Objeto Pokémon

Al crear u obtener los Pokémon, el Objeto en formato JSON que se obtiene está dado de la siguiente forma:
```json
[
    {
        "id": 185,
        "name": "sudowoodo",
        "types": [
            {
                "id": 6,
                "name": "rock"
            }
        ],
        "moves": [
            {
                "id": 5,
                "name": "mega-punch",
                "power": 80,
                "pp": 20,
                "priority": 0,
                "element_type": {
                    "id": 1,
                    "name": "normal"
                },
                "accuracy": 85,
                "effect": {
                    "chance": 0,
                    "short_effect": "Inflicts regular damage with no additional effect."
                },
                "damage_class": {
                    "name": "physical",
                    "id": 2
                }
            },
            {
                "id": 7,
                "name": "fire-punch",
                "power": 75,
                "pp": 15,
                "priority": 0,
                "element_type": {
                    "id": 10,
                    "name": "fire"
                },
                "accuracy": 100,
                "effect": {
                    "chance": 10,
                    "short_effect": "Has a 10% chance to burn the target."
                },
                "damage_class": {
                    "name": "physical",
                    "id": 2
                }
            },
            {
                "id": 8,
                "name": "ice-punch",
                "power": 75,
                "pp": 15,
                "priority": 0,
                "element_type": {
                    "id": 15,
                    "name": "ice"
                },
                "accuracy": 100,
                "effect": {
                    "chance": 10,
                    "short_effect": "Has a 10% chance to freeze the target."
                },
                "damage_class": {
                    "name": "physical",
                    "id": 2
                }
            },
            {
                "id": 9,
                "name": "thunder-punch",
                "power": 75,
                "pp": 15,
                "priority": 0,
                "element_type": {
                    "id": 13,
                    "name": "electric"
                },
                "accuracy": 100,
                "effect": {
                    "chance": 10,
                    "short_effect": "Has a 10% chance to paralyze the target."
                },
                "damage_class": {
                    "name": "physical",
                    "id": 2
                }
            }
        ]
    }
]
```

# <a name="git-flow"></a> Flujo de trabajo
Para mantener un control de versiones apropiado, en este repositorio, se maneja la siguiente estructura de ramas en Git:

```
main
└── develop             
    └── features         
        └── feature/your-new-feature
        └── ...
```