import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const CommentList = ({ postId }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
            setComments(response.data);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
        };

        fetchComments();
    }, [postId]);

    return (
        <div>
        <h4>Comments</h4>
        {comments.length === 0 ? (
            <p>No comments available</p>
        ) : (
            <ul>
            {comments.map(comment => (
                <li key={comment.id}>
                <h5>{comment.name}</h5>
                <p>{comment.body}</p>
                <small>{comment.email}</small>
                </li>
            ))}
            </ul>
        )}
        </div>
    );
};

CommentList.propTypes = {
    postId: PropTypes.string.isRequired,
};

export default CommentList;
