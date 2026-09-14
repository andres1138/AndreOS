import React from "react";
import "./Profile.css";

const Profile = () => {
    return (
        <div className="profile">

            <div className="picFrame">
                <div className="picPlaceholder">
                    PHOTO
                </div>
            </div>

            <div className="contactInfo">
                <div className="sectionTitle">CONTACT INFORMATION</div>

                <dl>
                    <dt>Name:</dt>
                    <dd>Andre Sarokhanian</dd>

                    <dt>Email:</dt>
                    <dd>andres1983@icloud.com</dd>

                    <dt>Tel:</dt>
                    <dd>424-421-4343</dd>
                </dl>
            </div>

            <div className="profileText">

                <h2>Andre Sarokhanian</h2>

                <p className="subtitle">
                    Programmer • Graphic Designer • Computer Enthusiast
                </p>

                <hr />

                <p>
                    I originally started out as a graphic designer, working
                    extensively with digital design and becoming highly
                    proficient with Adobe Illustrator and Photoshop.
                </p>

                <p>
                    Over time, my interest in computers grew beyond designing
                    things for them. I wanted to understand how the software
                    behind them worked, which eventually led me into
                    programming and web development.
                </p>

                <p>
                    Today I work across both design and programming, combining
                    the two wherever I can. I'm comfortable with JavaScript,
                    React, Swift, HTML, CSS, and other web technologies, and
                    I'm always experimenting with something new.
                </p>

                <p>
                    I'm particularly interested in computer graphics,
                    simulations, games, interactive applications, and
                    understanding how software works under the hood.
                </p>

                <p>
                    This website is one of those experiments.
                </p>

                <p>
                    I wanted to see if I could recreate the experience of
                    using an old Windows computer with modern web technologies.
                    Everything you're looking at is part of that experiment.
                </p>

                <div className="infoSection">
                    <div className="sectionTitle">SKILLS</div>

                    <div className="skillColumns">
                        <div>
                            <h3>DESIGN</h3>
                            <ul>
                                <li>Adobe Illustrator — Expert</li>
                                <li>Adobe Photoshop — Expert</li>
                                <li>Graphic Design</li>
                                <li>Digital Design</li>
                                <li>UI / Visual Design</li>
                            </ul>
                        </div>

                        <div>
                            <h3>PROGRAMMING &amp; WEB</h3>
                            <ul>
                                <li>JavaScript</li>
                                <li>React</li>
                                <li>Swift</li>
                                <li>HTML</li>
                                <li>CSS</li>
                                <li>C / C++</li>
                                <li>Web Development</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="infoSection">
                    <div className="sectionTitle">CURRENTLY EXPLORING</div>

                    <ul className="exploringList">
                        <li>Computer Graphics</li>
                        <li>Simulation</li>
                        <li>Game Development</li>
                        <li>Systems Programming</li>
                        <li>Low-level Programming</li>
                    </ul>
                </div>

            </div>

        </div>
    );
};

export default Profile;