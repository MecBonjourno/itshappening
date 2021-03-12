import React, { Component } from 'react';
// import DatePicker from 'react-datepicker'
import axios from 'axios';

// import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component{

  constructor(props){
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeInsta = this.onChangeInsta.bind(this);
    this.onChangeTwitter = this.onChangeTwitter.bind(this);
    // this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

      this.state = {
        username: '',
        description: '',
        insta: '',
        twitter: '',
        // duration: 0,
        // date: new Date(),
        users: []
      }
  }

  componentDidMount(){
    axios.get('http://localhost:5000/users/')
    .then(response => {
      if (response.data.length > 0){
        this.setState({
          users: response.data.map(user => user.username),
          username: response.data[0].username
        })
      }
    })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  // onChangeDuration(e) {
  //   this.setState({
  //     duration: e.target.value
  //   })
  // }

  // onChangeDate(date) {
  //   this.setState({
  //     date: date
  //   })
  // }

  onChangeInsta(e) {
    this.setState({
      insta: e.target.value
    })
  }
  
  onChangeTwitter(e) {
    this.setState({
      twitter: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      insta: this.state.insta,
      twitter: this.state.twitter,
    }

    console.log(exercise)

    axios.post('http://localhost:5000/exercises/add', exercise)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))

    window.location = '/';
  }

  render(){
    return (
      <div>
        <h3>Create New Exercise Log</h3> 
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
              <select 
                // ref="userInput"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
              >
              {
                this.state.users.map(function(user){
                  return<option
                      key={user}
                      value={user}
                      > {user}
                     </option>
                })
              }
              </select>
              <div className="form-group">
                <label>Descrition: </label>
                <input 
                  type="text"
                  required
                  className="form-control"
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              </div>
              <div className="form-group">
                <label>Insta: </label>
                <input 
                  type="text"
                  required
                  className="form-control"
                  value={this.state.insta}
                  onChange={this.onChangeInsta}
                />
              </div>
              <div className="form-group">
                <label>Twitter: </label>
                <input 
                  type="text"
                  required
                  className="form-control"
                  value={this.state.twitter}
                  onChange={this.onChangeTwitter}
                />
              </div>
          <div className="form-group">
            <input type="submit" value="Create Exercise Log" className="btn btn-primary"/>
          </div>
        </form>
      </div>
    );
  }
}

// export default CreateExercise;
