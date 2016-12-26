import React from 'react';
import BlocNoteForm from './bloc-note-form';
import BlocNotesList from './bloc-notes-list';

export default class BlocNotesTile extends React.Component {
  constructor(){
    super();
    this.state = {
      data: []
    };
  }
  componentWillReceiveProps(nextProps){
    let slug = nextProps.currentStudent;
    if(!!sessionStorage.getItem('jwt') && slug !== ''){
      this.readNotesFromAPI(slug);
    }
  }
  readNotesFromAPI(slug){
    if(slug){ //check if there is a student before making API call
      this.props.readFromAPI(this.props.origin + '/bloc_notes?slug=' + slug,
                          notes => this.setState({data: notes}))
    }
  }
  writeNoteToAPI(data){
    this.props.writeToAPI('post', this.props.origin + '/bloc_notes?slug=' + this.props.currentStudent, data, note => {
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
        <BlocNoteForm writeNoteToAPI={this.writeNoteToAPI.bind(this)}
                  optimisticUpdate={this.optimisticUpdate.bind(this)}
                  signedIn={this.props.signedIn}
                  currentUser={this.props.currentUser}
                  currentStudent={this.props.currentStudent}/>

        <h3>{this.props.currentStudent}</h3>

        <BlocNotesList data={this.state.data}
                  writeToAPI={this.props.writeToAPI}
                  onDelete={this.deleteNoteFromAPI.bind(this)}/>
      </div>
    )
  }
}
