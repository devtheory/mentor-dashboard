import React from 'react';
import NotesTile from './notes/notes-tile';
import StudentsTile from './students/students-tile';
import BlocNotesTile from './notes/bloc-notes-tile';
import WeeklyNotesTile from './notes/weekly-notes-tile';

import $ from 'jquery';
import Uri from 'jsuri';

export default class MentorDashboard extends React.Component{
  constructor(){
    super();
    this.state = {
      currentStudent: '',
      currentStudentId: '',
      signedIn: false,
      currentUser: {handle: ''}
    }
    this.updateCurrentStudent = this.updateCurrentStudent.bind(this);
  }
  static get defaultProps() {
    return {
      origin: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '',
    };
  }

  componentWillMount(){
    let jwt = new Uri(location.search).getQueryParamValue('jwt');
    if(!!jwt){ //if there is a jwt present in url, grab and set it
      sessionStorage.setItem('jwt', jwt);
    } //else, there is nobody signed in
  }

  componentDidMount(){
    if(!!sessionStorage.getItem('jwt')) {
      this.currentUserFromAPI();
    }
  }

  handleSignOutLink(){
    sessionStorage.setItem('jwt', ''); //unset the token and go back to root
    location = '/';
  }

  // read operations
  readFromAPI(url, successFn){
    $.ajax({
      url: url,
      type: 'json',
      method: 'get',
      headers: {'Authorization': sessionStorage.getItem('jwt')}, //send token with request
      contentType: 'application/json',
      success: successFn,
      error: error => {console.error(url, error['response'])
                      location = '/'
      }
    })
  }

  currentUserFromAPI(){ //if successful, set current user
    this.readFromAPI(this.props.origin + '/current_user', user =>
                     this.setState({signedIn: true, currentUser: user})
    )
  }

  // write operations
  writeToAPI(method, url, data, successFn){
    $.ajax({
      url: url,
      data: data,
      type: 'json',
      method: method,
      contentType: 'application/json',
      headers: {'Authorization': sessionStorage.getItem('jwt')},
      success: successFn,
      error: error => {console.error(url, error['response'])
                      location = '/'
      }
    })
  }
  render(){
    let signingLink;
    let greeting;
    if(this.state.signedIn){
      signingLink = <a href="#" onClick={this.handleSignOutLink}>Sign Out</a>;
      greeting = 'Hello, ' + this.state.currentUser.handle;
    } else {
      signingLink = <a href={this.props.origin + '/request_token'}>Sign In</a>;
      greeting = 'You are not signed in';
    }
    return (
      <div className="wrapper">
        <header className="header">
          <h6>{greeting} - {signingLink}</h6>
        </header>
        <article className="main">
          <BlocNotesTile origin={this.props.origin}
                  readFromAPI={this.readFromAPI}
                  writeToAPI={this.writeToAPI}
                  signedIn={this.state.signedIn}
                  currentUser={this.state.currentUser}
                  currentStudent={this.state.currentStudent}
                  currentStudentId={this.state.currentStudentId}/>
        </article>
        <aside className="aside aside-1">
          <StudentsTile origin={this.props.origin}
                  readFromAPI={this.readFromAPI}
                  signedIn={this.state.signedIn}
                  currentUser={this.state.currentUser}
                  handleStudentClick={this.handleStudentClick.bind(this)}/>
        </aside>
        <aside className="aside aside-2">
          <WeeklyNotesTile origin={this.props.origin}
                  readFromAPI={this.readFromAPI}
                  signedIn={this.state.signedIn}
                  currentUser={this.state.currentUser}/>
        </aside>

      </div>

    )
  }
  handleStudentClick(studentCard){
    this.updateCurrentStudent(studentCard.currentTarget.getAttribute('data-slug'), studentCard.currentTarget.id);
  }

  updateCurrentStudent(slug, id){
    this.setState({currentStudent: slug, currentStudentId: id})
  }
}
