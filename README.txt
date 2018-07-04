//////////////////////////////
///// Instrucciones //////////
//////////////////////////////

CORS ---> Peticiones de un dominio a otro. Y hay que dar permisos

1) Para poder crear un API se usará el framework ADONIS para poder controlar la seguridad,  permitir CORS para el dominio que interesa, deshabilitar la protección CSRF para poder hacer peticiones POST desde fuera, pero no desde todo el mundo sino únicamente para ese dominio y solo para determinadas URL's. Se va a trabajar con el sistema de rutas añadiendo seguridad utilizando los middleware que sirve para filtrar las peticiones HTTP y que antes de que se procese lo que se tiene que procesar pase por una serie de filtros. Se va a trabajar con modelos con el ORM de adonis para que se pueda insertar y sacar información de forma sencilla.

Los primeros pasos del framework: https://adonisjs.com/docs/4.1/installation

Y cómo se verá en la página podremos instalar el CLI TOOL a través del comando:

	 npm i -g @adonisjs/cli

Ahora instalaremos un package 'mysql' porque vamos a trabajar con esa base de datos.
Para ello se ejecutará el comando:
	npm install --save sql

Para ver el sistema de base de datos que usa adonis ---> http://knexjs.org/#/Schema
Para crear un modelo de datos se ejecutará el comando MAKE de adonis y el modelo se llamará CINEMA y que añada una migración para este modelo

	adonis make:model Cinema --migration

Ahora toca para las Salas:

	adonis make:model Room --migration

Para poner la base de datos en funcionamiento, es decir crear todas las bases de datos y sus relaciones:
	
	adonis migration:refresh

Para poder ver todos los comandos de ADONIS se ejecutará en la terminal:

	adonis

El archivo factory.js es bastante útil para poder desarrollar factorías que son capaces de rellenar nuestras tablas con datos falsos

Para relacionar todos los modelos (carpeta Models) dentro de Adonis se llama LUCID. Este ORM nos permite trabajar con nuestra base de datos de una forma muy sencilla siempre a través de programación para realizar consultas complejas y cualquier tipo de operación que necesitemos de una forma muy sencilla. Además los ORM nos permite abstraer la base de datos, por lo tanto podemos trabajar con mysequence, sqlLite, postGradeSQL.......da igual la base datos por el ORM internamente dependiendo de lo que estemos haciendo va a realizar las operaciones de otra forma utilizando otro driver dependiendo de la base de datos que tengamos.


NOTA: ORM -----------
Object-Relational mapping, o lo que es lo mismo, mapeo de objeto-relacional, es un modelo de programación que consiste en la transformación de las tablas de una base de datos, en una serie de entidades que simplifiquen las tareas básicas de acceso a los datos para el programador.
Tres de las bases de datos más importantes, y como veis, para algo tan fácil vemos diferencias. Esto para el programador supone tener que conocer el lenguaje para cada Base de datos, y más importante aún, si en un futuro se desea migrar la aplicación, habría que reescribir gran número de las consultas.

Esto el ORM al tener un capa intermedia, abstrae al programador de la base de datos y le centra en el desarrollo de la aplicación.

Otro punto importante es la facilidad de trabajo, un ORM, nos facilita las labores básicas de cualquier acceso a datos , el CRUD (Create, Read, Update y Delete). Realizando todas estas labores a través de un lenguaje de alto nivel orientado a objetos

-----

En cada uno de los modelos se pondrán las funciones que sea FK. Los modelos se encuentran en la carpeta MODELS

Una vez creada la relación ejecutaremos el comando:
	
	adonis make:seed

Esto creará un archivo llamado databaseSeeder.js. Este archivo es el que nos ayudará a rellenar con datos falsos. 
Usaremos el método run().

Si sale errores de tipo ....TypeError: 'named' of undefined, será que en la factoría hay un error de sintaxis. Mirar en el factory.js para que todo esté bien escrito.

Una vez terminado hay que ejecutar en la terminal el comando:

	adonis seed

Para que nos rellene la base de datos.

Ahora crearemos las rutas en el archivo ROUTES.JS.
Una vez creado las rutas pasaremos a crear los controladores con el siguiente comando:

	adonis make:controller AuthController

y seleccionaremos la opción de HTTP request.

Luego para levantar el SERVIDOR CON ADONIS JS:
	
	adonis serve --dev

Levantará el servidor en http://127.0.0.1:3333 y escribiremos la ruta /api/v1/cinemas

Para cuando se hace un petición desde cliente y da error de CORS hay que mirar en el servidor en la carpeta:

	config/cors.js

y donde pone origin se puede poner varios valores que admitan el acceso a nuestra api. En nuestro caso se pondrá:

	origin: 'http://localhost:8080'

aunque hay muchas más acciones como '*' que permite el acceso a cualquier petición y dominio








