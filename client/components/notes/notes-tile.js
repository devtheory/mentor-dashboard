import React from 'react';
import NoteList from './note-list.js';
import NoteForm from './note-form';

export default class NotesTile extends React.Component {
  constructor(){
    super();
    this.state = {
      data: []
    };
  }
  componentDidMount(){
    if(!!sessionStorage.getItem('jwt')){ //if jwt, there is a user
      this.readNotesFromAPI();
    }
  }
  readNotesFromAPI(){
    this.props.readFromAPI(this.props.origin + '/notes',
                          notes => this.setState({data: notes}))
  }
  writeNoteToAPI(data){
    this.props.writeToAPI('post', this.props.origin + '/notes', data, note => {
      let notes = this.state.data;
      notes.shift();
      notes.unshift(note);
      this.setState({data: notes});
    })
  }
  deleteNoteFromAPI(id){
    this.props.writeToAPI('DELETE', this.props.origin + '/notes/' + id, id, () => {
      let remainingNotes = this.state.data.filter((cNote) => cNote.id != id);
      this.setState({data: remainingNotes});
    })
  }
  optimisticUpdate(note){
    let notes = this.state.data;
    notes.unshift(note);
    this.setState({data: notes});
  }
  render(){
    return(
      <div className="notes-view">
        <NoteForm writeNoteToAPI={this.writeNoteToAPI.bind(this)}
                  optimisticUpdate={this.optimisticUpdate.bind(this)}
                  signedIn={this.props.signedIn}
                  currentUser={this.props.currentUser}/>
                <NoteList data={this.state.data}
                          writeToAPI={this.props.writeToAPI}
                          onDelete={this.deleteNoteFromAPI.bind(this)}/>
      </div>
    )
  }
}
