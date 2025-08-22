import './about.css';

const About = () => {
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
                    <div className="founder-card">
                        <img src="../../assets/images/about4.png" alt="HM Jawwad" />
                        <p>HM Jawwad</p>
                    </div>
                    <div className="founder-card">
                        <img src="../../assets/images/about5.png" alt="Tufiqan Abid" />
                        <p>Tufiqan Abid</p>
                    </div>
                    <div className="founder-card">
                        <img src="/assets/images/about6.png" alt="Abdullah Ali" />
                        <p>Abdullah Ali</p>
                    </div>
                    <div className="founder-card">
                        <img src="../../assets/images/about7.png" alt="Akhtar Khan" />
                        <p>Akhtar Khan</p>
                    </div>
                </div>
            </section>

            <section className="testimonials-section section-py">
                <h2>Testimonials</h2>
                <div className="testimonial-list">
                    <div className="testimonial-item">
                        <img src="../../assets/images/about8.png" alt="Stacy" />
                        <div className="testimonial-content">
                            <p className="testimonial-quote">
                                We have ordered some accessories items and we got the products on
                                time. Also the customer support department was super helpful and
                                they answered all my queries.
                            </p>
                            <p className="testimonial-author">- Stacy</p>
                        </div>
                    </div>
                    <div className="testimonial-item">
                        <img src="../../assets/images/about9.png" alt="Tiffany" />
                        <div className="testimonial-content">
                            <p className="testimonial-quote">
                                I ordered 5 shirts from them and received them in no time. The
                                customer support was awesome.
                            </p>
                            <p className="testimonial-author">- Tiffany</p>
                        </div>
                    </div>
                    <div className="testimonial-item">
                        <img src="../../assets/images/about10.png" alt="James" />
                        <div className="testimonial-content">
                            <p className="testimonial-quote">
                                I got a wrong shirt so I contacted them and they happily offered
                                me a refund. I will surely shop from them again.
                            </p>
                            <p className="testimonial-author">- James</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
