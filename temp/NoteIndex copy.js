import React, { Component } from 'react'
import {index, destroy} from './api'

import SortableTree, { changeNodeAtPath } from 'react-sortable-tree'
import 'react-sortable-tree//style.css' // This only needs to be imported once in your app


class NoteIndex extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          treeData: [
              { title: 'Chicken', subtitle: 'Chicken Chicken Chicken Chicken Chicken Chicken Chicken Chicken Chicken Chicken Chicken Chicken Chicken Chicken Chicken Chicken Chicken Chicken Chicken Chicken Chicken Chicken Chicken Chicken Chicken Chicken Chicken Chicken Chicken Chicken Chicken Chicken Chicken Chicken Chicken Chicken Chicken Chicken Chicken Chicken Chicken Chicken ', children: [{ title: 'Many' }] },
              { title: 'Book', children: [{ title: 'Section1' }, { title: 'Section2' }] }
          ],
          notes: []
        };
      }

    // state = {
    //     treeData: [],
    //     notes: []
    //   }
    componentDidMount(){
        // this.setState({treeData: [{ title: 'Chicken', children: [{ title: 'Egg' }] }]})

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
        const getNodeKey = ({ treeIndex }) => treeIndex;
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
                <div style={{ height: 400 }} >
                <SortableTree
                    treeData={this.state.treeData}
                    onChange={treeData => this.setState({ treeData })}
                    rowHeight={100}
                          />
                        ),
                      })}

                />
                </div>
                <button onClick={() => console.log(this.state.treeData)}>Show treeData</button>

                Hello
            </div>
         );
    }
}
export default NoteIndex;