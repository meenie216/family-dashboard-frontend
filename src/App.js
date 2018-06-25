import React, { Component } from 'react';

import './dashboard.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <FamilyCalendar/>
      </div>
    );
  }
}

class FamilyCalendar extends Component {
  constructor() {
    super();
    this.state = {
      calendars: [],
    }
  }

  timerLoop

  updateCalendars() {
    console.log("Updating Calendars");
    fetch('http://localhost:8080/json')
    .then(results => {
      return results.json();
    }).then(data=> {
      let calendars = data.memberCalendars.map((memCal) => {
        return (
          <PersonCalendar key={memCal.memberName} value={memCal} />
        );
      })
      this.setState({calendars:calendars})
    })
  }

  componentDidMount(){
    this.updateCalendars();
    this.timerLoop = 
      setInterval(
        () => this.updateCalendars(),
        300000 // refresh every 5 minutes
      );
  }

  componentWillUnmount(){
    clearInterval(this.timerLoop);
  }

  render() {
    return (
      <ul className='names'>
        <li className='name'>
          <ul className='days'>
            <li className='day dayHeader'>Sunday</li>
            <li className='day dayHeader'>Monday</li>
            <li className='day dayHeader'>Tuesday</li>
            <li className='day dayHeader'>Wednesday</li>
            <li className='day dayHeader'>Thursday</li>
            <li className='day dayHeader'>Friday</li>
            <li className='day dayHeader'>Saturday</li>
          </ul>
        </li>
        {this.state.calendars}
      </ul>
    )
  }
}

class PersonCalendar extends Component {
  render() {
    return (
      <li className='name'>
        <p className='calendar-name'>{this.props.value.memberName}</p>
        <ul className='days'>
          {this.props.value.days.map((day => <PersonDay key={day.dayName} day={day}/>))}
        </ul>
      </li>
    )
  }
}

class PersonDay extends Component {
  render() {
    return (
    <li className='day'>
      <p className='daylabel'>day.dayName</p>
      <ul className='events'>
        { (this.props.day.events || [] ).map((event) => <Event key={event.eventId} name={event.eventName}/>)}
      </ul>
    </li>
    )
  }
}

class Event extends Component {
  render() {
    return (<li className='event'>{this.props.name}</li>)
  }
}

export default App;
