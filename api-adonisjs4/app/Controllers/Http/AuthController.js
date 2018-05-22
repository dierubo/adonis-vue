'use strict'

const User = use('App/Models/User'); // Forma que se accede a un modelo desde un controlador

class AuthController {

    // Todos los métodos tiene que comenzar por async. Desestructuramos el objeto para acceder a sus variables. Visto en ES6
    async login({request, response, auth}) {
        //Para enviar el cliente enviaremos el objeto usuario
        const { user } = request.all();
        // El usuario inicia sesión o no correctamente
        const logged = await auth.attempt(user.email, user.password, true ); // Mirar en base de datos si existe el usuario con ese email y password. El password que 
                                                                    // mete el usuario, que es texto plano, lo cifra y compara con el de base de datos
                                                                    // Con el true nos va a devolver toda la información en un token
        return response.json(logged); // Esto al utilizar el método de autenticación a través de JWT automáticamente va a devolver un TOKEN válido que vamos a recuperar en el cliente.
                                    // Este token es un token que va a tener la marca del tiempo e información del usuario
    }

    // Registramos usuarios
    async register({ request, response }) {
        const userInstance = new User();
        const { user } = request.all(); //Se recibe via POST los datos del usuario y lo desestructuramos

        // Definir los datos del usuario desde el modelo
        userInstance.username = user.email;
        userInstance.email = user.email;
        userInstance.password = user.password; // En el modelo del usuario tiene la opción de que antes de que se cree el usuario cifra el password

        await userInstance.save(); // Guardamos el usuario que acabamos de generar

        return response.json(userInstance)
    }

    async register({ request, response, auth}) {
        let user = await auth.getUser(); // Devuelve el usuario identificado con el token que nos han pasado
        const userInput = request.input('user'); // Se coge los datos que vienen vía POST en vez de usar request.all() y devuelve un array con 'email' y 'username'
        user.email = userInput['email'];
        user.username = userInput['username'];
        await user.save();

        const logged = await auth.generate(user, true); // Se genera un token pasando un usuario
        return response.json(logged);
    }

}

module.exports = AuthController
