import { number, object } from 'yup';

export const PoissonDistSchema = object().shape({
    lambda: number()
        .typeError('El valor de lambda debe ser un número entero')
        .min(1, 'El valor de lambda no puede ser menor a 1')
        .required('Debe ingresar un valor para a'),
    quantity: number()
        .integer()
        .typeError('La cantidad a generar debe ser un número entero')
        .min(1, 'El valor de N no puede ser menor a 1')
        .required('Debe ingresar un valor para la cantidad a generar'),
});
