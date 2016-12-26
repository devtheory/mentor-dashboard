import React from 'react';
import BlocNote from './bloc-note';

export default class BlocNotesList extends React.Component{
  render(){
    let notes = this.props.data.map(note =>
      <BlocNote key={note.id || note.title} note_id={note.id} title={note.source ? note.source.headline : ''}
            body={note.source ? note.source.body : ''} author={note.admin ? note.admin.name : ''}
            created_at={note.created_at} onDelete={this.props.onDelete}/>
    )

    return(
      <div className="posts">
        {notes}
      </div>
    )
  }
}
