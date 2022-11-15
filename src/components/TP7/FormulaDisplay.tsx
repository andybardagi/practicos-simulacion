import React from 'react';
import Latex from 'react-latex';
import { string } from 'yup/lib/locale';


export default function FormulaDisplay() {
    const text = '$\\frac{d^{2}D}{dt^{2}} = 4\\cdot (\\frac{dD}{dt})^{2} + 6\\cdot D + 8t$'
    return <Latex displayMode={true}>{text}</Latex>;
}
