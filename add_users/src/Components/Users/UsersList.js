import React from "react";
import './UsersList.css';
import UserItem from "./UserItem";

const UsersList = props => {
    return (
        <ul className="users-list">
            {props.items.map(user => (
                <UserItem
                    key={user.id}
                    id={user.id}
                    onDelete={props.onDeleteItem}
                >
                    {user.name} ({user.age} years old)
                </UserItem>
            ))}
        </ul>
    );
};

export default UsersList;