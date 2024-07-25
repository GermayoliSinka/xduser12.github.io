import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './../../assets/scss/stylePages/UserFilter.css';

const UserFilter = ({ selectedUser, handleUserChange }) => {
    const [users, setUsers] = useState([]);
    const [userPage, setUserPage] = useState(1);
    const usersPerPage = 5;

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const startIndex = (userPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const paginatedUsers = users.slice(startIndex, endIndex);

    const hasPrevUser = startIndex > 0;
    const hasNextUser = endIndex < users.length;

    const handlePrevUser = () => {
        if (hasPrevUser) {
            setUserPage(userPage - 1);
        }
    };

    const handleNextUser = () => {
        if (hasNextUser) {
            setUserPage(userPage + 1);
        }
    };

    return (
        <div className="user-filter-wrapper">
            <div className="user-filter-container">
                <button
                    className={`nav-button ${hasPrevUser ? 'enabled' : 'disabled'}`}
                    onClick={handlePrevUser}
                    disabled={!hasPrevUser}
                >
                    <i className="bi bi-chevron-left"></i>
                </button>
                <div className="user-badges-container">
                    <span
                        className={`user-badge ${selectedUser === '' ? 'selected' : ''}`}
                        onClick={() => handleUserChange('')}
                    >
                        <img className="user-avatar" src="https://github.com/mdo.png" alt="" />
                        Todos
                    </span>
                    {paginatedUsers.map(user => (
                        <span
                            key={user.id}
                            className={`user-badge ${selectedUser === user.id.toString() ? 'selected' : ''}`}
                            onClick={() => handleUserChange(user.id.toString())}
                        >
                            <img className="user-avatar" src={`https://robohash.org/${user.id}?set=set2&size=24x24`} alt="" />
                            {user.name}
                        </span>
                    ))}
                </div>
                <button
                    className={`nav-button ${hasNextUser ? 'enabled' : 'disabled'}`}
                    onClick={handleNextUser}
                    disabled={!hasNextUser}
                >
                    <i className="bi bi-chevron-right"></i>
                </button>
            </div>
        </div>
    );
};

UserFilter.propTypes = {
    selectedUser: PropTypes.string.isRequired,
    handleUserChange: PropTypes.func.isRequired,
};

export default UserFilter;