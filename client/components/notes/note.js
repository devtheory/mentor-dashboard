import React from 'react';

export default class Note extends React.Component {
  render(){
    return(
      <section className="post">
        <header className="post-header">
          <h2 className="post-title">{this.props.title} <a href="#" onClick={this.props.onDelete.bind(this, this.props.note_id)}>x</a></h2>
          <p className="post-meta">{this.props.author}</p>
        </header>
        <div className="post-description">{this.props.body}</div>
      </section>
    )
  }
}
