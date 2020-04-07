
import React from 'react';

import './index.css'
//components
import Heading from './components/Heading'
import Board from './components/Board';
import ScoreBoard from './components/ScoreBoard'

import {GlobalProvider} from './context/GlobalState'
// ========================================

function App(){
    return( 
        <GlobalProvider>
            <Heading/>
            <Board/>
            <ScoreBoard/>
        </GlobalProvider>
    );
}
export default App;