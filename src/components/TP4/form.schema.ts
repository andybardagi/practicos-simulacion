import { number, object, ref } from 'yup';

export const tp4FormSchema = object().shape({
    min: number()
        .typeError('El valor del mínimo de muestreo del vector de estado debe ser un número entero ')
        .moreThan(0, 'El valor del mínimo de muestreo del vector de estado debe ser mayor a 0')
        .required('Debe ingresar un valor para el mínimo de muestreo del vector de estado'),
    max: number()
        .typeError('El valor del máximo de muestreo del vector de estado debe ser un número entero ')
        .moreThan(0, 'El valor del máximo de muestreo del vector de estado debe ser mayor a 0')
        .moreThan(ref("min"), 'El valor del máximo debe ser mayor al mínimo de muestreo del vector de estado')
        .required('Debe ingresar un valor para el máximo de muestreo del vector de estado'),
    n: number()
        .typeError('El valor del mínimo de muestreo del vector de estado debe ser un número entero ')
        .moreThan(0, 'El valor del mínimo de muestreo del vector de estado debe ser mayor a 0')
        .required('Debe ingresar un valor para el mínimo de muestreo del vector de estado'),
});
