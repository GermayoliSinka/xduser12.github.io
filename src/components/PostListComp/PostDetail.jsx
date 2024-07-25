import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CommentList from './CommentList'; // Asegúrate de importar el componente CommentList

const PostDetails = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPostAndDetails = async () => {
            try {
                setLoading(true);

                // Fetch post details
                const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
                const postData = await postResponse.json();
                setPost(postData);

                // Fija una imagen si no se encuentra ninguna
                const defaultPhoto = {
                    url: 'https://via.placeholder.com/600/000000',
                    title: 'No image available'
                };
                setPhoto(defaultPhoto);

            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPostAndDetails();
    }, [postId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="container-fluid d-flex flex-column vh-100 m-5">
            <div className="row flex-grow-1">
                <div className="col-md-6 d-flex flex-column p-5 ">
                    {post && (
                        <>
                            <h1>{post.title}</h1>
                            <p>{post.body}</p>
                            {photo && (
                                <img 
                                    src={photo.url} 
                                    alt={photo.title} 
                                    className="img-fluid" 
                                    style={{ maxHeight: '50vh', objectFit: 'contain' }} 
                                />
                            )}
                        </>
                    )}
                </div>
                <div className="col-md-6 d-flex flex-column p-5">
                    <div className="border rounded p-3 d-flex flex-column" style={{ height: '100%', overflow: 'hidden' }}>
                        <h2>Comments</h2>
                        <div className="comments-container" style={{ flexGrow: 1, overflowY: 'auto' }}>
                            <CommentList postId={postId} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;
