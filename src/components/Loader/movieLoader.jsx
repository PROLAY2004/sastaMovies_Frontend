import '../../styles/loader.scss';

function MovieLoader({ loading }) {
    if (!loading) return null;

    return (
        <>
            <div className="home-skeleton">
                {[1, 2].map((sectionIndex) => (
                    <div className="container px-4 py-4" key={sectionIndex}>

                        <div className="row g-4">
                            {[...Array(6)].map((_, index) => (
                                <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={index}>
                                    <div style={{ aspectRatio: '2/3', background: '#111', borderRadius: '8px', marginBottom: '12px' }} className="skeleton"></div>
                                    <div className="skeleton mb-2" style={{ width: '80%', height: '14px' }}></div>
                                    <div className="skeleton" style={{ width: '40%', height: '12px' }}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default MovieLoader;