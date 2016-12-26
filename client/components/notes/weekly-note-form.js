import React from 'react';

export default class WeeklyNoteForm extends React.Component{
  render(){
    return(
      <form className="note-form pure-form" >
        <input type="text" placeholder="Note title" ref="title" />
        <input type="text" placeholder="Note body" ref="body" />
        <button type="submit" className="pure-button pure-button-primary">create</button>
      </form>
    )
  }
}
