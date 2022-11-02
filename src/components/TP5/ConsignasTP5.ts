export const activities = [
    'A1 - Distribución uniforme U [20, 30)',
    'A2 - Distribución uniforme U [30, 50)',
    'A3 - Distribución exponencial con media de 30',
    'A4 - Distribución uniforme U [10, 20)',
    'A5 - Distribución exponencial con media de 5',
];

export const estimators = [
    {
        text: 'Identifique las variables que deben ser definidas para el análisis. Deberán describir las fórmulas utilizadas en cada cálculo.',
        done: 1,
    },
    {
        text: 'Tiempo promedio de duración del ensamble (recordemos que cada ensamble finaliza cuando se realiza el encastre obteniendo el producto final)',
        done: 1,
    },
    { text: 'Calcule la proporción ensambles realizados en relación a los solicitados.', done: 1 },
    {
        text: 'Identificar la cantidad máxima de cada cola con productos en espera de ser procesados y la cola de realización del encastre final.',
        done: 1,
    },
    { text: 'Tiempo promedio de Permanencia en cola (para cada cola)', done: 1 },
    { text: 'Porcentaje de Ocupación del servidor (para todas las secciones) %', done: 1 },
    {
        text: 'Proporción de tiempo de bloqueo respecto del tiempo de ocupación en actividad 5, y para encastre final indicando el tiempo en que hay productos esperando el encastre discriminando la proporción que corresponde a los productos provenientes de A3 y los de A5.',
        done: 0,
    },
    { text: 'Cantidad de ensambles por hora y cantidad promedio de ensambles por hora.', done: 1 },
    {
        text: 'Indique cual es la probabilidad de haber completado 3 o más ensambles por hora.',
        done: 1,
    },
    { text: 'Debería poder simular al menos 10000 ensambles o 100000 eventos', done: 1 },
    {
        text: 'Identifique que tareas son cuellos de botella y probar con una reducción del tiempo de 20% y comparar con los estimadores originales. (este ítem puede estar en una impresión de pantalla preparada)',
        done: 0,
    },
];
