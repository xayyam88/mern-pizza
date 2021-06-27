/* eslint-disable jsx-a11y/alt-text */
const LocationInfoBox = ({ info }) => {
    return (
        <article className="location-info eh81ri-1 gmeiQE">
            <img
                className="image"
                src="https://bakuguide.com/images/places/220/qoc-et-2.jpg"
            />
            <h1 className="title">{info.id}</h1>
            <div className="description">
                <p>{info.title}</p>
            </div>
        </article>
    );
};

export default LocationInfoBox;
