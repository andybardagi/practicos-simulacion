import React from 'react';
import Latex from 'react-latex';

type Props = {
    formula: 'combined' | 'multiplicative' | 'linear';
};

export default function FormulaDisplay({ formula }: Props) {
    const strFormulas = {
        combined: '$$x_{i+1} = (ax_i + c) \\ \\text{mod} \\ M$$',
        multiplicative: '$x_{i+1} = ax_i \\  \\text{mod} \\ M$',
        linear: '$x_{i+1} = (x_i + x_{i-1}) \\  \\text{mod} \\ M$',
    };

    return <Latex displayMode={true}>{strFormulas[formula]}</Latex>;
}
