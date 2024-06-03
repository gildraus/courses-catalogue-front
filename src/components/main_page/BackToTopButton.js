import { useState, useEffect } from "react";
import "../../styles/BackToTopButton.css";



const BackToTopButton = () => {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true);
        } else if (scrolled <= 300) {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    useEffect(() => {
        window.addEventListener('scroll', toggleVisible);
        return () => {
            window.removeEventListener('scroll', toggleVisible);
        };
    }, []);

    return (
        <div className="back-to-top">
            <button onClick={scrollToTop} style={{ display: visible ? 'inline' : 'none' }}><img src={"./images/up-arrow.svg"} className="arrow-icon" alt="Arrow Icon" />
            </button>
        </div>
    );
}

export default BackToTopButton;
