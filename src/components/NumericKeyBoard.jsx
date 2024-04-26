import { useContext } from "react";
import { SudokuContext } from "../store/sudoku-context";

export default function NumericKeyBoard({PasaElValor}){

    const {number: num, square: celda, cambiaNumero} = useContext(SudokuContext);
    const [x, y] = celda;
    let numeroActivo = 0;
    function SetNumeroElegido(x, y, numero){
        console.log('Keyboard interno, previo update: ', {x}, {y}, {numero});
        cambiaNumero(numero);
        numeroActivo = numero;
        // PasaElValor(x, y, numero);
    }

    return(
        <ol id="numeric-board">
            <li key="fila1">
                <ol className='highlight-player'>
                    <li className={ numeroActivo===1 ? 'player active' : undefined } key="1"><button onClick={() => SetNumeroElegido(x, y, 1)} >1</button></li>
                    <li className={ numeroActivo===2 ? 'player active' : undefined } key="2"><button onClick={() => SetNumeroElegido(x, y, 2)} >2</button></li>
                    <li className={ numeroActivo===3 ? 'player active' : undefined } key="3"><button onClick={() => SetNumeroElegido(x, y, 3)} >3</button></li>
                </ol>
            </li>
            <li key="fila2">
                <ol>
                    <li key="4"><button onClick={() => SetNumeroElegido(x, y, 4)}>4</button></li>
                    <li key="5"><button onClick={() => SetNumeroElegido(x, y, 5)}>5</button></li>
                    <li key="6"><button onClick={() => SetNumeroElegido(x, y, 6)}>6</button></li>
                </ol>
            </li>
            <li key="fila3">
                <ol>
                    <li key="7"><button onClick={() => SetNumeroElegido(x, y, 7)}>7</button></li>
                    <li key="8"><button onClick={() => SetNumeroElegido(x, y, 8)}>8</button></li>
                    <li key="9"><button onClick={() => SetNumeroElegido(x, y, 9)}>9</button></li>
                </ol>
            </li>
            <div>NumericKeyboard numero = {num}</div>
            <div>Celda: {x}, {y}</div>
        </ol>
    );
}