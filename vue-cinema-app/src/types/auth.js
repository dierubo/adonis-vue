// Para manejar los tipos en la autenticación
import namespace from '@/utils/namespace';

export default namespace('auth', {
    getters: [
        'user', // Usuario al que podamos acceder
        'logged' // Saber si el usuario está logged o no
    ],
    actions: [
        'login', // Petición para iniciar sesión
        'register',
        'logout',
        'updateProfile', // Actualizar el perfil  y realizar una petición PUT a la API
    ],
    mutations: [
        'setUser', // Establecer el usuario una vez logeado
        'setLogged' // Si es true es que el usuario está logeado
    ]
})