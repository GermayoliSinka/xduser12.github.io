import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const PostCarousel = ({ searchTerm, onSearchChange, onSearchSubmit }) => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://jsonplaceholder.typicode.com/photos');
                const data = await response.json();
                setPhotos(data.slice(0, 5));
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPhotos();
    }, []);

    useEffect(() => {
        if (!loading && photos.length > 0) {
            new window.bootstrap.Carousel(document.getElementById('carouselExampleIndicators'), {
                interval: 3000,
                wrap: true
            });
        }
    }, [loading, photos]);

    if (loading) return <p>Loading carousel...</p>;
    if (error) return <p>Error loading carousel: {error.message}</p>;

    const carouselStyle = {
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
    };

    const imageStyle = {
        objectFit: 'cover',
        width: '100%',
        height: '100%',
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const searchContainerStyle = {
        width: '80%',
        maxWidth: '600px',
    };

    const titleStyle = {
        color: 'white',
        fontSize: '1.0rem',
        marginBottom: '1rem',
        textAlign: 'center',
    };

    return (
        <div style={carouselStyle}>
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {photos.map((photo, index) => (
                        <div key={photo.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                            <img style={imageStyle} src={photo.url} alt={photo.title} />
                        </div>
                    ))}
                </div>
            </div>
            <div style={overlayStyle}>
                <h1 style={titleStyle}>Bienvenido a la pagina</h1>
                <h5 style={titleStyle}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis hic praesentium libero soluta ullam. Ea eum alias qui quidem sed, excepturi officiis est, dicta asperiores et, doloremque quo quis deleniti.</h5>
                <div style={searchContainerStyle}>
                    <form onSubmit={onSearchSubmit} className="d-flex justify-content-center align-items-center">
                        <input 
                            type="text" 
                            className="form-control me-2" 
                            placeholder="Buscar por título o contenido...:)" 
                            value={searchTerm} 
                            onChange={onSearchChange} 
                        />
                        <button type="submit" className="btn btn-outline-light">
                            <i className="bi bi-search"></i>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
PostCarousel.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    onSearchSubmit: PropTypes.func.isRequired,
};

export default PostCarousel;