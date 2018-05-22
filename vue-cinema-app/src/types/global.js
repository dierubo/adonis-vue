// Definir todos los tipos, pero de forma separada para cada uno de los módulos - carpeta types
// Store global - global.js

import namespace from '@/utils/namespace';

export default namespace('global', {
    // Las acciones normalmente ejecutan peticiones HTTP aunque no tiene porqué. también se puede usar para aplicar cierta lógica y después ejecutar una mutación
    actions: [
        'changeLanguage'
    ],
    getters: [ // Devolver información
        'processing',
        'language'
    ],
    mutations: [ // Para establecer los datos
        'startProcessing',
        'stopProcessing',
        'setLanguage'
    ]
});