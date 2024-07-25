import PropTypes from 'prop-types';

const PostCard = ({ post }) => {
    return (
        <div className="col" key={post.id}>
        <div className="card shadow-sm">
            <img src="https://via.placeholder.com/150" className="bd-placeholder-img card-img-top" alt={post.title} />
            <div className="card-body">
            <p className="card-text">{post.title}</p>
            <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                </div>
                <small className="text-body-secondary">9 mins</small>
            </div>
            </div>
        </div>
        </div>
    );
};

// Definición de PropTypes para el componente PostCard
PostCard.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,  // Incluye otras propiedades que uses
    }).isRequired,
};

export default PostCard;
