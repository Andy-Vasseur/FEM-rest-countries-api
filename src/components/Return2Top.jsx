import { useEffect, useState } from "react";

// Icons
import { BsArrowUpShort } from 'react-icons/bs';

function Return2Top() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className={`Return2Top ${showButton ? 'visible' : ''}`}>
            <button onClick={scrollToTop}>
                <BsArrowUpShort />
            </button>
        </div>
    );
}

export default Return2Top;