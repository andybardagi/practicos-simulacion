import { number, object } from 'yup';

export const LanguageGeneratorSchema = object().shape({
    max: number()
        .integer()
        .typeError('El valor de la cantidad a generar debe ser un número entero')
        .min(1, 'El valor de la cantidad a generar no puede ser menor a 1')
        .required('Debe ingresar un valor para la cantidad a generar'),
});
