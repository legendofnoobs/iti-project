import { useEffect, useState } from 'react';
import './about.css';

const About = () => {
    const [founders, setFounders] = useState([]);
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        fetch('/about.json')
            .then(response => response.json())
            .then(data => {
                setFounders(data.founders);
                setTestimonials(data.testimonials);
            });
    }, []);

    return (
        <div>
            <header className="about-header">
                <h1>ABOUT NORTHSTAR</h1>
            </header>

            <section className="container-about section-py">
                <div className="hero-images-container">
                    <div className="hero-image-card">
                        <img src="../../assets/images/about1.png" alt="Woman Model" />
                        <div className="buy-now-button-container">
                            <button className="buy-now-button">BUY NOW</button>
                        </div>
                    </div>
                    <div className="hero-image-card">
                        <img src="../../assets/images/about2.png" alt="Man Model" />
                        <div className="buy-now-button-container">
                            <button className="buy-now-button">BUY NOW</button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container section-py founders-section">
                <h2>The Founders</h2>
                <div className="founders-grid">
                    {founders.map((founder, index) => (
                        <div className="founder-card" key={index}>
                            <img src={founder.image} alt={founder.name} />
                            <p>{founder.name}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="testimonials-section section-py">
                <h2>Testimonials</h2>
                <div className="testimonial-list">
                    {testimonials.map((testimonial, index) => (
                        <div className="testimonial-item" key={index}>
                            <img src={testimonial.image} alt={testimonial.author} />
                            <div className="testimonial-content">
                                <p className="testimonial-quote">{testimonial.quote}</p>
                                <p className="testimonial-author">- {testimonial.author}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default About;
