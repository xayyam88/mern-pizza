import React from 'react';
import ContentLoader from 'react-content-loader';

const LoadingBoxMob = (props) => (
    <ContentLoader
        speed={2}
        width={376}
        height={124}
        viewBox="0 0 476 124"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="128" y="81" rx="15" ry="15" width="87" height="32" />
        <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
        <rect x="124" y="24" rx="3" ry="3" width="286" height="5" />
        <rect x="125" y="37" rx="3" ry="3" width="281" height="4" />
        <rect x="128" y="50" rx="3" ry="3" width="282" height="3" />
        <circle cx="60" cy="65" r="57" />
    </ContentLoader>
);

export default LoadingBoxMob;
