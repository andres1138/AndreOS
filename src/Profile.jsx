import React from "react";
import "./Profile.css";

const Profile = () => {
    return (
        <div className="profile">

            {/* ── HERO ── */}
            <div className="profile-hero">
                <div className="profile-avatar">AS</div>

                <div className="profile-hero-text">
                    <h1>Andre Sarokhanian</h1>
                    <p className="profile-hero-subtitle">
                        Software Developer · Graphic Designer · 20+ Years in the Industry
                    </p>
                    <div className="profile-badges">
                        <span className="profile-badge design">Adobe Suite</span>
                        <span className="profile-badge dev">React · JS</span>
                        <span className="profile-badge dev">Swift</span>
                        <span className="profile-badge graphics">Graphics</span>
                    </div>
                </div>
            </div>

            {/* ── SCROLLABLE BODY ── */}
            <div className="profile-body">

                {/* Contact strip */}
                <div className="profile-contact-strip">
                    <a className="profile-contact-item" href="mailto:andres1983@icloud.com">
                        <span className="ci-icon">✉</span>
                        andres1983@icloud.com
                    </a>
                    <span className="profile-contact-item">
                        <span className="ci-icon">📞</span>
                        424-421-4343
                    </span>
                </div>

                {/* About */}
                <div className="profile-card">
                    <div className="profile-card-header">
                        <span className="card-icon">👤</span>
                        <h2>About</h2>
                    </div>
                    <div className="profile-card-body profile-about">
                        <p>
                            Over 20 years in the industry, starting in <span className="highlight">graphic design</span> — Adobe Illustrator and Photoshop from the ground up, back when you actually had to know what you were doing.
                            Eventually that wasn't enough, so I learned to build the software too.
                        </p>
                        <p>
                            These days I split my time between <span className="highlight">design and development</span> — JavaScript, React, Swift, HTML/CSS, C/C++. I don't follow trends; I pick up whatever the problem calls for and figure it out.
                        </p>
                        <p>
                            This site is a side project — a <span className="highlight">Windows 95 desktop</span> built with modern web tech, mostly because I thought it would be fun and I still had something to prove to myself.
                        </p>
                    </div>
                </div>

                {/* Tools & Tech */}
                <div className="profile-card">
                    <div className="profile-card-header">
                        <span className="card-icon">🛠</span>
                        <h2>Tools &amp; Tech</h2>
                    </div>
                    <div className="profile-card-body">
                        <div className="skill-columns">
                            <div className="skill-group">
                                <h3>Design</h3>
                                <ul className="tool-list">
                                    <li>Adobe Illustrator</li>
                                    <li>Adobe Photoshop</li>
                                    <li>UI &amp; Visual Design</li>
                                    <li>Print &amp; Digital Graphics</li>
                                </ul>
                            </div>
                            <div className="skill-group">
                                <h3>Development</h3>
                                <ul className="tool-list">
                                    <li>JavaScript &amp; React</li>
                                    <li>HTML &amp; CSS</li>
                                    <li>Swift</li>
                                    <li>C / C++</li>
                                </ul>
                            </div>
                        </div>
                        <p className="skills-note">No percentage bars — I either know something well enough to use it or I don't.</p>
                    </div>
                </div>

                {/* Currently Exploring */}
                <div className="profile-card">
                    <div className="profile-card-header">
                        <span className="card-icon">🔭</span>
                        <h2>Currently Exploring</h2>
                    </div>
                    <div className="profile-card-body">
                        <div className="exploring-tags">
                            {[
                                "Computer Graphics",
                                "Simulation",
                                "Game Development",
                                "Systems Programming",
                                "Low-level Programming",
                            ].map((tag) => (
                                <span className="exploring-tag" key={tag}>
                                    <span className="tag-dot" />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Profile;