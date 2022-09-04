export const factorial = (number: number): number => {
    if (number === 0 || number === 1) {
        return 1;
    }

    let factorial = number;
    while (number > 1) {
        number--;
        factorial *= number;
    }
    return factorial;
};
