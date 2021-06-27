import React from 'react';
import ContentLoader from 'react-content-loader';

const LoadingBox = (props) => (
    <ContentLoader
        speed={2}
        width={368}
        height={447}
        viewBox="0 0 368 447"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="184" cy="284" r="127" />
        <rect x="69" y="257" rx="0" ry="0" width="0" height="1" />

        <rect x="160" y="312" rx="0" ry="0" width="1" height="0" />
        <rect x="171" y="313" rx="0" ry="0" width="14" height="2" />
        <rect x="54" y="358" rx="0" ry="0" width="262" height="63" />
    </ContentLoader>
);

export default LoadingBox;
