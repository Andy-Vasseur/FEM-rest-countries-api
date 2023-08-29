import { useEffect } from 'react';
import PropTypes from 'prop-types';

const LazyImage = ({ src, alt }) => {
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const callback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        };

        const observer = new IntersectionObserver(callback, options);
        const img = document.querySelector(`[data-src="${src}"]`);

        if (img) {
            observer.observe(img);
        }

        return () => {
            if (img) {
                observer.unobserve(img);
            }
        };
    }, [src]);

    return <img data-src={src} alt={alt} />;

};

export default LazyImage;

LazyImage.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
};