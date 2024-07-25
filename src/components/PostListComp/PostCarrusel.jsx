import { useState, useEffect } from 'react';

const PostCarousel = () => {
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

    const carouselContainerStyle = {
        marginTop: '20px', // Ajusta la posición vertical del carrusel
        marginBottom: '20px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    };

    const carouselStyle = {
        maxWidth: '1200px', // Ajusta el ancho máximo del carrusel
        width: '100%',
    };

    const imageStyle = {
        objectFit: 'cover',
        height: '500px',
        width: '100%'
    };

    return (
        <div style={carouselContainerStyle}>
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" style={carouselStyle}>
                <div className="carousel-indicators">
                    {photos.map((photo, index) => (
                        <button 
                            key={`indicator-${photo.id}`}
                            type="button"
                            data-bs-target="#carouselExampleIndicators" 
                            data-bs-slide-to={index} 
                            className={index === 0 ? "active" : ""}
                            aria-current={index === 0 ? "true" : "false"}
                            aria-label={`Slide ${index + 1}`}
                        ></button>
                    ))}
                </div>
                <div className="carousel-inner">
                    {photos.map((photo, index) => (
                        <div key={photo.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                            <img style={imageStyle} src={photo.url} alt={photo.title} />
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                </button>
            </div>
        </div>
    );
};

export default PostCarousel;
