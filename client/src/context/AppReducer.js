export default (state,action) => {

    switch(action.type){
        case 'UPDATE_TURNS':
            return{
                ...state,
                turns: (state.turns+1%2)
            }
        case 'UPDATE_SQUARES':
            const turn = (state.turns%2) === 0? 'X':'O' 
            return {
                ...state,
                squares: state.squares.map((values,index)=>{
                    return (values=== null && action.payload === index)? turn: values
                })
            }
        case 'GET_SQUARES':
            return{
                ...state,
                squares: action.payload
            }
        case 'UPDATE_WINNERS':
            return{
                ...state,
                winner: action.payload
            }
        case 'GET_WINNERS':
            return{
                ...state,
                winner: action.payload
            }
        case 'GET_PREDICTION':            
            return{
                ...state,
                xPredict: action.payload["x"],
                yPredict: action.payload["o"],
            }
        case 'TRANSACTION_ERROR':
            return{
                ...state
            }
            
        default:
            return state
        
    }
}