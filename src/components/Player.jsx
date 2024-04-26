import { useState } from "react";

import { useContext } from "react";
import { SudokuContext } from "../store/sudoku-context";

export default function Player( { initialName, symbol, isActive, onChangeName } ){

    const[playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);
    
    let editablePlayerName = <span className="player-name">{playerName}</span>;
    // let btnCaption = "Edit";

    if(isEditing) {
        editablePlayerName = (
            <input type="text" required value={playerName} onChange={handleChange} />
        );
        // btnCaption = "Save";
    }

    function handleEditClick(){                
        setIsEditing((editing) => !editing);
        if(isEditing){
            onChangeName(symbol, playerName);
        }
    }

    function handleChange(event){
        // console.log(event);
        setPlayerName(event.target.value);
    }
    

    const {number: num, square: celda, cambiaNumero} = useContext(SudokuContext);
    const [x, y] = celda;
    function SetNumeroElegido(x, y, numero){
        console.log('Keyboard interno, previo update: ', {x}, {y}, {numero});
        cambiaNumero(numero);
        // PasaElValor(x, y, numero);
    }



    return (
        
        <li className={ isActive ? 'active' : undefined }>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
        
    );
}