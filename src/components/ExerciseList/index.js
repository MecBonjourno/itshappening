import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    {/* <td>{props.exercise.duration}</td> */}
    <td>{props.exercise.insta}</td>
    <td>{props.exercise.twitter}</td>
    {/* <td>{props.exercise.date.substring(0,10)}</td> */}
    <td>
      <Link to={"/edit/"+props.exercise._id}> Edit </Link> | <a href="#" onClick={() => {props.deleteExercise(props.exercise._id)}} >Delete</a>
    </td>
  </tr>
)

export default class ExerciseList extends Component{
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = {exercise: []}
  }

  componentDidMount(){
    axios.get('http://localhost:5000/exercises/')
    .then(response => {
      this.setState({exercise: response.data})
    })
    .catch((error) => {
      console.error(error)
    })
  }

  deleteExercise(id) {
    axios.delete('http://localhost:5000/exercises/'+id)
    .then(response => console.log(response.data))
    this.setState({exercise: this.state.exercise.filter(el => el._id !== id)})
  }

  exerciseList(){
    return this.state.exercise.map(currentExercise =>{
      return <Exercise exercise={currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id}/>
    })
  }

  render() {
  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Insta</th>
            <th>Twitter</th>
            {/* <th>Duration</th> */}
            {/* <th>Date</th> */}
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
            {this.exerciseList()}
          </tbody>
      </table>
    </div>
    );
  }
}

