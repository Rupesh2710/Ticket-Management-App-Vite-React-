export default function TicketReducer(state,action){

    switch(action.type){
        case "ADD_TICKET":
            return {...state, tickets: [...state.tickets,action.payload]}

        case "UPDATE_TICKET":
            return {
                ...state, tickets: state.tickets.map((ticket)=>ticket.id===action.payload.id?action.payload:ticket),
                editingticket:null
            }

        case "DELETE_TICKET":
            if (state.editingticket && state.editingticket.id === action.payload.id) {
                return {
                  ...state,
                  tickets: state.tickets.filter(
                    (ticket) => ticket.id !== action.payload.id
                  ),
                  editingticket: null,
                };
              } else{
            return {
                ...state,tickets: state.tickets.filter((ticket)=>ticket.id!==action.payload.id)
            }
        }

        case "SET_EDITING_TICKET":
            return {
                    ...state,editingticket : action.payload
            }

        case "CLEAR_EDITING_TICKET":
            return{
                ...state,editingticket : null
            }

        case "SET_SORTING":
            return{
                ...state,sortPreference: action.payload
            }
            
        default:
            return state;
    }
}