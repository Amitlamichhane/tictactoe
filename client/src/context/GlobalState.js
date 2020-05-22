import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer'
import calculateWinner from '../utils/Winner'

//initial state 
const initialState = {
    turns: 0 , 
    winner: "",
    squares: Array(9).fill(null),
    xPredict: 0,
    yPredict: 0,
    status:"",  
}

export const GlobalContext = createContext(initialState);

//Provider component 
export const GlobalProvider = ({children}) =>{
    const [state,dispatch] = useReducer(AppReducer,initialState);
    
    //actions 
    function updateTurns(){
        dispatch({
            type: 'UPDATE_TURNS',
            payload:state
        })

    }

    //update squares with X or O 
    function updateSquares(id){
        dispatch({
            type: 'UPDATE_SQUARES',
            payload:id
        })
    }

    //function get squares
    function getSquares(){
        dispatch({
            type:'GET_SQUARES',
            payload: state.squares
        })
    }

    function checkWinner(sq){
        const isWinner = calculateWinner(sq )
        dispatch({
            type: 'UPDATE_WINNERS',
            payload: isWinner
        })
    }
    function getWinner(){
        dispatch({
            type:'GET_WINNERS',
            payload:state.winner
        })
    }

    async function getPrediction(){
        console.log(state.squares)

        fetch("http://localhost:5000/getPrediction", {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: 
            JSON.stringify({
            "top_left_square": `${state.squares[0]}`,
            "top_middle_square": `${state.squares[1]}`,
            "top_right_square": `${state.squares[2]}`,
            "middle_left_square": `${state.squares[3]}`,
            "middle_middle_square": `${state.squares[4]}`,
            "middle_right_square": `${state.squares[5]}`,
            "bottom_left_square": `${state.squares[6]}`,
            "bottom_middle_square": `${state.squares[7]}`,
            "bottom_right_square": `${state.squares[8]}`
            })
        }).then((res)=>{
            return res.json();
        }).then((jsonRes)=>{
            dispatch({
                type:'GET_PREDICTION',
                payload:jsonRes
            })
        }).catch((err)=>{
            throw err;
        })    
        
    }

    
    return (
        <GlobalContext.Provider value ={{
            turns: state.turns,
            winner: state.winner,
            squares: state.squares,
            xPredict: state.xPredict,
            yPredict: state.yPredict,
            updateTurns,
            updateSquares,
            getSquares,
            checkWinner,
            getWinner,
            getPrediction
        }}>
        {children}
        </GlobalContext.Provider>
    )
}