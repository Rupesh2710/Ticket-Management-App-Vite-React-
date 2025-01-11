import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './styles.css'
import TicketForm from './components/TicketForm'
import { useReducer } from 'react'
import TicketReducer from './reducers/TicketReducer'
import TicketList from './components/TicketList'
import { sortTickets } from './utilities/sortingUtilities'
function App() {
  
  const initialstate={tickets:[],editingticket:null, sortPreference: "High to Low",}

  

  const [state,dispatch]=useReducer(TicketReducer,initialstate);
  const sortedtickets= sortTickets(state.tickets,state.sortPreference)
  return (
    <>
     <div className='container'>
        <h1>Bug Blaster</h1>
        <TicketForm dispatch={dispatch} editingticket={state.editingticket}></TicketForm>
        {
          state.tickets.length >0 && (
          <div>
          <h2>All Tickets</h2>
          
          <select
              value={state.sortPreference}
              onChange={(e) =>
                dispatch({ type: "SET_SORTING", payload: e.target.value })
              }
            >
              <option value="High to Low">High to Low</option>
              <option value="Low to High">Low to High</option>
            </select>
        
          <TicketList tickets={sortedtickets} dispatch={dispatch}></TicketList>
          </div>
          )

          
        }
     </div>
    </>
  )
}

export default App
