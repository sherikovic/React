import React, { useState, useRef } from "react";
import styles from './AddUser.module.css';
import ErrorModal from "../UI/ErrorModal";

const AddUser = props => {
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredAge, setEnteredAge] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [error, setError] = useState();

    const nameRef = useRef();
    const ageRef = useRef();

    const usernameChangeHandler = event => {
        setEnteredUsername(event.target.value);
        setIsValid(true);
    }

    const ageChangeHandler = event => {
        setEnteredAge(event.target.value);
        setIsValid(true);
    }

    const formSubmitHandler = (event) => {
        event.preventDefault();
        if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
            setIsValid(false);
            setError({
                title: "Invalid data",
                message: "Make sure name and age are entered correct!"
            });
        } else {
            setIsValid(true);
            setError(null);
            const usernameFromRef = nameRef.current.value;
            const ageFromRef = ageRef.current.value;
            console.log(usernameFromRef, ageFromRef);

            const NewUser = {
                name: enteredUsername,
                age: enteredAge,
                id: Math.random().toString()
            };
            props.onSubmitAddUser(NewUser);
            setEnteredUsername('');
            setEnteredAge('');
        }
    }

    const deleteHandler = () => {
        setError(null);
    }

    return (
        <form className={`${styles["add-users"]} ${!isValid && styles.invalid}`} onSubmit={formSubmitHandler}>
            <div>
                {error && <ErrorModal title={error.title} message={error.message} onConfirm={deleteHandler} />}
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    value={enteredUsername}
                    onChange={usernameChangeHandler}
                    ref={nameRef}
                />
                <label htmlFor="age">Age(Years)</label>
                <input
                    id="age"
                    type="number"
                    min="1"
                    value={enteredAge}
                    onChange={ageChangeHandler}
                    ref={ageRef}
                />
            </div>
            <button type="submit">Add User</button>
        </form >
    );
}

export default AddUser;