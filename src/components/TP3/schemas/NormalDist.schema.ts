import { number, object } from 'yup';

export const NormalDistSchema = object().shape({
    average: number()
        .typeError('El valor de la media debe ser un número entero')
        .required('Debe ingresar un valor para la media'),
    standardDeviation: number()
        .typeError('El valor de la desviación estandar debe ser un número entero')
        .moreThan(0, 'EL valor de la desviación estandar debe ser mayor a 0')
        .required('Debe ingresar un valor para la desviación estandar'),
    quantity: number()
        .integer()
        .typeError('La cantidad a generar debe ser un número entero')
        .min(1, 'El valor de N no puede ser menor a 1')
        .required('Debe ingresar un valor para la cantidad a generar'),
});
