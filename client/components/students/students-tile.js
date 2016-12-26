import React from 'react';
import StudentList from './student-list';

export default class StudentsTile extends React.Component {
  constructor(){
    super();
    this.state = {
      students: []
    }
  }
  readStudentsFromBloc(){
    this.props.readFromAPI(this.props.origin + '/get_students',
                    students => this.setState({students: students}))
  }
  componentDidMount(){
    if(!!sessionStorage.getItem('jwt')) { //if jwt, there is a user
      this.readStudentsFromBloc();
    }
  }
  render(){
    return(
      <section className="students-view">
        <StudentList students={this.state.students} handleStudentClick={this.props.handleStudentClick}/>
      </section>
    )
  }
}
