import React, { useState, useRef, useEffect } from 'react';
import src from './loaderImage.gif';

const registerObserver = (ref, setShowImage) => {
    const observer = new IntersectionObserver((enteries, observer) => {
        enteries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }
            setTimeout(function () {
                setShowImage(true);
                observer.disconnect();
            }, 1000);
        });
    });
    observer.observe(ref);
};

export default function LazyLoadİmg({ imageUrl }) {
    const [showImage, setShowImage] = useState(false);
    const imageRef = useRef(null);

    useEffect(() => {
        registerObserver(imageRef.current, setShowImage);
    }, []);

    if (showImage) {
        return (
            <img
                src={imageUrl}
                className="attachment-shop_catalog size-shop_catalog wp-post-image"
                alt=""
                title="product-3"
                sizes="(max-width: 300px) 100vw, 300px"
                width="300"
                height="300"
            />
        );
    }
    return (
        <img
            src={src}
            className="attachment-shop_catalog size-shop_catalog wp-post-image"
            alt=""
            title="product-3"
            sizes="(max-width: 300px) 100vw, 300px"
            width="300"
            height="300"
            ref={imageRef}
        />
    );
}
