import { createContext } from 'react';

export const SudokuContext = createContext({
    number: 0,
    square: [0, 0],
    cambiaNumero: () => {},
    cambiaCelda: () => {}
});