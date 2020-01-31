import React, { Component } from 'react'
import {index, destroy} from './api'

class NoteIndex extends Component {
    state = {
        notes: []
      }
    componentDidMount(){
        const user = this.props.user
        index(user)
        .then((response) => {
            console.log(response);
            const notes = response.data.notes
            this.setState({notes})
        })
        .catch(err => console.log(err)
        )
    }

destroy = (id) => {
    const user = this.props.user
    destroy(user, id)
    .then(() => alert('Deleted!'))
    .then(() => {
        const notes = this.state.notes.filter((note) => note._id !== id)
        this.setState({
            notes: notes
        })
    })
    .catch(err => console.log(err))
    
}

    render() { 
        return ( 
            <div>
                {this.state.notes.map((note, index) => (
                    <div key={index}>
                    <h5>Note: {note.note}</h5>
                    <h5>Parent: {note.parent}</h5>
                    <h5>Order: {note.order}</h5>
                    {/* <h5>Passenger: {note.passenger}</h5> */}
                    <h5>Id: {note._id}</h5>
                    <button onClick={() => this.destroy(note._id)}>Delete</button>
                    </div>
                ))}
                Hello
            </div>
         );
    }
}
export default NoteIndex;