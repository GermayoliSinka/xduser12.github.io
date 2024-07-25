import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './../../assets/scss/stylePages/CommentList.css';

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
        <div className="comments-list" style={{ maxHeight: 'calc(100vh - 150px)', overflowY: 'auto', padding: '0 10px' }}>
            {comments.length === 0 ? (
                <p className="text-center">No comments available</p>
            ) : (
                <ul className="list-unstyled">
                    {comments.map(comment => (
                        <li key={comment.id} className="mb-3 p-3 border rounded comment-item">
                            <div className="d-flex align-items-start">
                                <div className="avatar me-3">
                                    <i className="bi bi-person"></i>
                                </div>
                                <div className="w-100">
                                    <div className="d-flex justify-content-between mb-2">
                                        <h5>{comment.name}</h5>
                                        <div className="d-flex align-items-center">
                                            <button className="btn btn-sm btn-outline-success me-2">
                                                <i className="bi bi-hand-thumbs-up" style={{ color: 'blue' }}></i>
                                            </button>
                                            <button className="btn btn-sm btn-outline-danger">
                                                <i className="bi bi-hand-thumbs-down" style={{ color: 'red' }}></i>
                                            </button>
                                        </div>
                                    </div>
                                    <p>{comment.body}</p>
                                    <small style={{ borderTop: '1px solid #dee2e6', paddingTop: '5px', display: 'block', color: 'navy' }}>
                                        {comment.email}
                                    </small>
                                </div>
                            </div>
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
