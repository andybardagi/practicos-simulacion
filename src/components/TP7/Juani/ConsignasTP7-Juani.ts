export const activities = [
    'A0 - Llegada: Distribución exponencial con media de 10 minutos',
    'A1 - Quitar alfombras (QA): 2 minutos',
    'A2 - Área de aspirado (AA): U(3;5) minutos',
    'A3 - Lavado (L): U(6;12) minutos',
    'A4 - Secado (S): dH/dt = -5*t^2 + 2*H - 200',
    'A5 - Pone alfombras (PA): 3 minutos',
];

"Cuando los autos llegan, un empleado quita las alfombras (QA) y las deriva al área de aspirado (AA). "
"Llegan autos a un lavadero con una distribución exponencial negativa de media 10 minutos."
"Si el operario QA ya está ocupado quitando alfombras, los autos deben esperar a que se desocupe. "
"Las carrocerías son derivadas al área de lavado (L) y secado (S), la cual tiene lugar para lavar dos autos a la vez, "
"pero solo puede secar uno a la vez. Esto quiere decir que si una carrocería termina su lavado, y la secadora está ocupada, "
"deberá esperar. Una vez en la secadora, la tasa de pérdida de humedad responde a la siguiente ecuación:"

"dH/dt = -5*t^2 + 2*H - 200"

"Se considera una unidad de integración igual a 1 minuto. Una carrocería está seca, cuando su humedad llega al 0,0%. "
"Los espacios para lavado, no se liberan hasta que la carrocería este completamente seca. "
"Las carrocerías que son derivadas a LS deben esperar si los dos lugares están ocupados. "
"Lo mismo sucede con las alfombras si el AA está ocupada. Una vez que la carrocería ha sido lavada y secada, "
"un operario (PA) coloca las alfombras correspondientes si es que ya han sido aspiradas, sino espera a que la operación se realice. "
"Las alfombras que han sido aspiradas antes que su correspondiente carrocería haya sido lavada y secada, "
"deben esperar a que esto ocurra. Los tiempos de proceso de cada sección son:"

"Quitar alfombras (QA): 2 minutos"
"Área de aspirado (AA): U(3;5) minutos"
"Lavado (L): U(6;12) minutos"
"Pone alfombras (PA): 3 minutos"