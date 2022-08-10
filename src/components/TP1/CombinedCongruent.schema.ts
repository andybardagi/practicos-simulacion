import { number, object, ref } from 'yup';

export const CombinedCongruentValidationSchema = object().shape({
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
    m: number()
        .integer()
        .typeError('El valor de M debe ser un número entero')
        .min(1, 'El valor de M no puede ser menor a 1')
        .required('Debe ingresar un valor para m'),
    x0: number()
        .integer()
        .typeError('El valor de X0 debe ser un número entero')
        .min(0, 'El valor de la semilla no puede ser negativo')
        .required('Debe ingresar un valor para la semilla (x0)')
        .lessThan(ref('m'), 'El valor de la semilla no puede ser mayor a m'),
    quantity: number()
        .integer()
        .typeError(
            'El valor de la cantidad de números a generar debe ser un número entero',
        )
        .min(1, 'La cantidad de valores a generar debe ser mayor a 0')
        .required('Debe ingresar un valor para la cantidad'),
    intervalQuantity: number()
        .integer()
        .typeError(
            'El valor de la cantidad de intervalos debe ser un número entero',
        )
        .min(1, 'La cantidad de intervalos debe ser mayor a 0')
        .required('Debe ingresar un valor para la cantidad de intervalos'),
});
