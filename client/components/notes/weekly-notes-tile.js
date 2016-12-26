import React from 'react';
import WeeklyNotesList from './weekly-notes-list';
import WeeklyNoteForm from './weekly-note-form';


export default class WeeklyNotesTile extends React.Component {
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
      <div className="bloc-notes-view">
        <WeeklyNoteForm writeNoteToAPI={this.writeNoteToAPI.bind(this)}
                  optimisticUpdate={this.optimisticUpdate.bind(this)}
                  signedIn={this.props.signedIn}
                  currentUser={this.props.currentUser}/>
                <WeeklyNotesList data={this.state.data}
                          writeToAPI={this.props.writeToAPI}
                          onDelete={this.deleteNoteFromAPI.bind(this)}/>
      </div>
    )
  }
}
