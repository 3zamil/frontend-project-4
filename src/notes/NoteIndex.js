import React, { Component } from 'react'
import {index, destroy, update} from './api'

const resetTimeout = (id, newID) => {	
	clearTimeout(id)
	return newID	
}

const SaveMessage = ({visible}) => <div className={'saved' + (visible ? ' saved-visible' : '')}><p>Saved Successfully</p></div>

class NoteIndex extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
          notes: [],
          timeout: null,
          value: '',
          saved: false
        }
      }

    componentDidMount(){

        const user = this.props.user
        index(user)
        .then((response) => {
            console.log(response)
            const notes = response.data.notes
            this.setState({notes})

        })
        .catch(err => console.log(err)
        )
    }

	editValue = notes => {		
        this.setState({timeout: resetTimeout(this.state.timeout, setTimeout(this.saveValue, 400)), value: notes})
        console.log(notes)

	};
	
	saveValue = () => {		
		this.setState({...this.state, saved: true})		
		setTimeout(() => {
            this.setState({...this.state, saved: false})
            console.log(this.state.notes)
            // update()
        }, 1000)
	};

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
                <button onClick={() => console.log(this.state)}>+</button>
                {/* <div className="list-group"> */}
                {this.state.notes.map((note, index) => (
                    <div key={index} className="one-note">
                        <button type="button" className="close" onClick={() => this.destroy(note._id)}><span aria-hidden="true">✖</span><span className="sr-only">Close alert</span></button>
                        {/* <div  contenteditable="TRUE" onKeyUp={this.autoSave}> {note.note} </div> */}
                        {/* <div  contenteditable="TRUE" onChange={ e => this.editValue(e.currentTarget.value)} placeholder="Start typing..." > {note.note} </div>  */}
                        <p key={index} contentEditable="TRUE" onInput={e => this.editValue(note._id)} suppressContentEditableWarning={true} > {note.note} </p>
                        
                    {/* <button onClick={() => this.destroy(note._id)}>✖×</button> */}
                    </div>
                ))}
                {/* </div> */}
                <SaveMessage visible={this.state.saved} />
            </div>
         );
    }
}

export default NoteIndex;