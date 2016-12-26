import React from 'react';

export default class BlocNoteForm extends React.Component{
  constructor(){
    super();
    this.state = {
      isDisabled: true
    }
  }
  handleChange(){
    let title = this.refs.title.value.trim();
    let body = this.refs.body.value.trim();

    if(title && body && this.props.currentStudent){
      this.setState({isDisabled: false})
    } else {
      this.setState({isDisabled: true})
    }
  }
  handleSubmit(e){
    e.preventDefault();

    let title = this.refs.title.value.trim();
    let body = this.refs.body.value.trim();

    if(!title || !body){return;}
    if(this.props.signedIn){
      this.props.writeNoteToAPI(JSON.stringify({note: {title: title, body: body}}))
      this.refs.title.value = '';
      this.refs.body.value = '';
    } else {
      alert('You must be signed in');
    }
  }
  render(){
    return(
      <form className="note-form pure-form" onSubmit={this.handleSubmit.bind(this)} onChange={this.handleChange.bind(this)}>
        <input type="text" disabled={!this.props.currentStudent} placeholder="Note title" ref="title" />
        <textarea type="text" disabled={!this.props.currentStudent} placeholder="Note body" ref="body"/>
        <button type="submit" disabled={this.state.isDisabled} className="pure-button pure-button-primary">create</button>
      </form>
    )
  }
}
