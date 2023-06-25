import { Component } from 'react';
import classes from './User.module.css';

class User extends Component {
  // this will be called everytime when USER is removed or "unmounted"
  componentWillUnmount() {
    console.log('USER WILL UNMOUNT');
  }

  render() {
    return <li className={classes.user}>{this.props.name}</li>;
  }
}

// const User = (props) => {
//   return <li className={classes.user}>{props.name}</li>;
// };

export default User;
