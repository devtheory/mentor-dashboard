import React from 'react';

export default class Student extends React.Component {

  handleCardClick(e){
    e.preventDefault();
    console.log(e);
    console.log(e.currentTarget);
    $(e.currentTarget).find('figure').toggleClass('selected');
  }

  render(){
    let s = this.props;
    let links = [];
    function buildLink(url, name){
      return <li key={name}><a target="_blank" href={url}>{name}</a></li>
    }

    if(s.github)
      links.push(buildLink(s.github_handle, 'github'));
    if(s.linkedin)
      links.push(buildLink(s.linkedin, 'linkedin'));
    if(s.codewars_handle)
      links.push(buildLink(s.codewars_handle, 'codewars'));
    if(s.user_path)
      links.push(buildLink(s.user_path, 'profile'));
    if(s.checkpoints_path)
      links.push(buildLink(s.checkpoints_path, 'roadmap'));

    let nextApp = s.next_appointment ? 'scheduled' : 'unscheduled';
    let jobSeeking = s.job_seeking_grad ? 'yes' : 'no';
    return(
      <section className="card" id={s.student_id} data-slug={s.slug} onClick={this.props.handleStudentClick}>
        <figure className={"panel meta " + (s.status == 'frozen' ? 'frozen' : '')}>
          <picture>
            <img className="avatar" src={s.profile_photo} width="128" height="128" />
          </picture>
          <figcaption>
            <ul className="social">
              <li><a href={"mailto:" + s.email}>email</a></li>
              {links}
            </ul>
            <h3 className="name">{s.name}</h3>
            <p>{s.course_name}</p>
            <p>Next call: {s.next_appointment || 'unscheduled'}</p>
            <p>Zone: {s.time_zone}</p>
            <p>Behind: {s.percent_behind}%</p>
          </figcaption>
        </figure>
      </section>
    )
  }
}
