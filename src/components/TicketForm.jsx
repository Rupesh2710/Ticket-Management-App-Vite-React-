import React, { useState , useEffect} from "react";


export default function TicketForm({dispatch,editingticket}) {

    const [title, setTitle] = useState('')
    const [discription, setDiscription] = useState('')
    const [priority, setPriority] = useState('1')

    useEffect(()=>{
        if(editingticket){

            setTitle(editingticket.title)
            setDiscription(editingticket.discription)
            setPriority(editingticket.priority)
        } else {
            clearform();
        }
    },[editingticket])

    const prioritylabels = {
        1: "Low",
        2: "Medium",
        3: "High"
    }

    const clearform = () => {
        setTitle('');
        setDiscription('');
        setPriority('1');

    }

    const handlesubmit = (e) => {
        e.preventDefault();

        const ticketdata={
            id: editingticket ? editingticket.id : new Date().toISOString(),
            title,
            discription,
            priority
        };

        console.log(ticketdata)
    
        dispatch({
            type: editingticket? "UPDATE_TICKET":"ADD_TICKET",
            payload: ticketdata
        })
    
        clearform();
    }

    const handleCancel = () => {
        dispatch({ type: "CLEAR_EDITING_TICKET" });
        clearform();
      };

 
    return (<>
        <form onSubmit={handlesubmit} className="ticket-form">
            <div>
                <label>Title</label>
                <input type="text" value={title} className="form-input" onChange={e => setTitle(e.target.value)}></input>
            </div>
            <div>
                <label>discription</label>
                <textarea type="text" value={discription} className="form-input" onChange={e => setDiscription(e.target.value)}></textarea>
            </div>

            <fieldset className="priority-fieldset">
                <legend>Priority</legend>
                {
                    Object.entries(prioritylabels).map(([value, label]) => (
                        <label key={value} className="priority-label">
                            <input type="radio" value={value} checked={priority === value} className="priority-input" onChange={e => setPriority(e.target.value)}></input>
                            {label}
                        </label>
                    ))
                }
            </fieldset>
            <button type="submit" className="button">Submit</button>

            {editingticket && (
        <button className="button" onClick={handleCancel}>
          Cancel Edit
        </button>
      )}
        </form>
    </>)
}