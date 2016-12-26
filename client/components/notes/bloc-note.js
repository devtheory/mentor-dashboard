import React from 'react';

export default class BlocNote extends React.Component{
  render(){
    return(
      <section className="card panel">
        <header className="post-header">
          <h4 className="post-title">{this.props.title}</h4>
          <small className="date">{new Date(this.props.created_at).toDateString()} {this.props.author ? ' - ' + this.props.author : ''}</small>
        </header>
        <div className="post-description">{this.props.body}</div>
      </section>
    )
  }
}
