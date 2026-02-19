import React from 'react';
import '../styles/components.scss';

const UserList = ({ users }) => {
    return (
        <div className="user-list">
            <h3 className="user-list__title">EN LIGNE — {users.length}</h3>
            <div className="user-list__content">
                {users.map((user, idx) => (
                    <div key={idx} className="user-list__item">
                        <div className="user-list__avatar" />
                        <span className="user-list__name">{user}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserList;
