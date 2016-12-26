import React from 'react';
import Note from './note';

export default class NoteList extends React.Component{
  render(){

    let notes = this.props.data.map(note =>
      <Note key={note.id} note_id={note.id} title={note.title} body={note.body} author={note.user.handle}
            onDelete={this.props.onDelete}/>
    )

    return(
      <div className="posts">
        {notes}
      </div>
    )
  }
}
