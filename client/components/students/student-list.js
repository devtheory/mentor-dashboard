import React from 'react';
import Student from './student';

function formatDate(date){
  var jsDate = new Date(date);
  var options = {
      weekday: "short", month: "short",
      day: "numeric", hour: "2-digit", minute: "2-digit"
  };

  return jsDate.toLocaleTimeString("en-us", options);
}

export default class StudentList extends React.Component {
  render(){

    let students = this.props.students.map(s =>
      <Student key={s.id} student_id={s.id} name={s.name} email={s.email} profile_photo={s.profile_photo.replace(/square/, 'medium')}
        checkpoints_path={'https://www.bloc.io' + s.checkpoints_path} user_path={'https://www.bloc.io' + s.user_path}
        next_appointment={s.next_appointment ? formatDate(s.next_appointment.starts_at) : ''} linkedin={s.linkedin}
        github_handle={s.github_handle} codewars_handle={s.codewars_handle}
        job_seeking_grad={s.job_seeking_grad} time_zone={s.time_zone.name}
        week_of_week={s.enrollment.current_week || null + '/' + s.enrollment.total_weeks || null}
        percent_behind={s.enrollment.percent_behind || null} status={s.enrollment.status || null}
        course_name={s.enrollment.course_name || null} appointments_per_week={s.enrollment.appointments_per_week || null}
        handleStudentClick={this.props.handleStudentClick} slug={s.slug}
      />
    )

    return(
      <div className="students">
        {students}
      </div>
    )
  }
}
