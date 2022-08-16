import { number, object, ref } from 'yup';

export const LinearCongruentValidationSchema = object().shape({
    a: number()
        .integer()
        .typeError('El valor de A debe ser un número entero')
        .min(1, 'El valor de A no puede ser menor a 1')
        .required('Debe ingresar un valor para a'),
    c: number()
        .integer()
        .typeError('El valor de C debe ser un número entero')
        .min(1, 'El valor de C no puede ser menor a 1')
        .required('Debe ingresar un valor para c'),
    x0: number()
        .integer()
        .typeError('El valor de X0 debe ser un número entero')
        .min(0, 'El valor de la semilla no puede ser negativo')
        .required('Debe ingresar un valor para la semilla (x0)'),
    
    x1: number()
        .integer()
        .typeError('El valor de X1 debe ser un número entero')
        .min(0, 'El valor de la semilla no puede ser negativo')
        .required('Debe ingresar un valor para la semilla (x1)'),
});