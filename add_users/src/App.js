import React, { useState, Fragment } from 'react';
import AddUser from './Components/Users/AddUser';
import UsersList from './Components/Users/UsersList';

function App() {
  const [users, updateUsers] = useState('');

  const appendNewUser = newUser => {
    updateUsers((currentUsers) => {
      return [newUser, ...currentUsers];
    });
  };

  let content = (
    <p style={{ color: 'white', textAlign: 'center' }}> empty...</p >
  );

  const deleteUserData = userId => {
    updateUsers((currentUsers) => {
      return currentUsers.filter(user => user.id !== userId)
    });
  }

  if (users.length > 0) {
    content = (
      <UsersList items={users} onDeleteItem={deleteUserData} />
    );
  }

  return (
    <Fragment>
      <AddUser onSubmitAddUser={appendNewUser} />
      {content}
    </Fragment>
  );
};

export default App;
