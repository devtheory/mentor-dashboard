import React from 'react';

export default class NoteForm extends React.Component{
  handleSubmit(e){
    e.preventDefault();

    let title = this.refs.title.value.trim();
    let body = this.refs.body.value.trim();

    if(!title || !body){return;}
    if(this.props.signedIn){
      this.props.optimisticUpdate({id: 'fake-id', title: title, body: body, user: this.props.currentUser})
      this.props.writeNoteToAPI(JSON.stringify({note: {title: title, body: body}}))
      this.refs.title.value = '';
      this.refs.body.value = '';
    } else {
      alert('You must be signed in');
    }
  }
  render(){
    return(
      <form className="note-form pure-form" onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" placeholder="Note title" ref="title" />
        <input type="text" placeholder="Note body" ref="body" />
        <button type="submit" className="pure-button pure-button-primary">create</button>
      </form>
    )
  }
}
