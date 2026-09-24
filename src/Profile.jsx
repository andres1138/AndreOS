import React from "react";
import "./Profile.css";

const Profile = () => {
    return (
        <div className="profile">

            {/* ── HERO ── */}
            <div className="profile-hero">
                <div className="profile-avatar">AS</div>

                <div className="profile-hero-text">
                    <h1>André Sarokhanian</h1>
                    <p className="profile-hero-subtitle">
                        Software Developer · Automation &amp; Design · 19+ Years Experience
                    </p>
                    <div className="profile-badges">
                        <span className="profile-badge dev">JavaScript · JSX</span>
                        <span className="profile-badge dev">Svelte · PixiJS</span>
                        <span className="profile-badge graphics">Automation</span>
                        <span className="profile-badge design">Design</span>
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
                    <a className="profile-contact-item" href="tel:424-421-4343">
                        <span className="ci-icon">📞</span>
                        424-421-4343
                    </a>
                    <a
                        className="profile-contact-item"
                        href="https://andres1138.github.io"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className="ci-icon">🌐</span>
                        andres1138.github.io
                    </a>
                    <a
                        className="profile-contact-item"
                        href="https://github.com/andres1138"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className="ci-icon">💻</span>
                        github.com/andres1138
                    </a>
                </div>

                {/* About */}
                <div className="profile-card">
                    <div className="profile-card-header">
                        <span className="card-icon">👤</span>
                        <h2>About</h2>
                    </div>
                    <div className="profile-card-body profile-about">
                        <p>
                            Software developer with 7 years of production automation experience and a graphic design background. Built and deployed <span className="highlight">JavaScript/JSX automation tools for Adobe Illustrator</span> that replaced manual, per-item artist workflows with instant batch generation systems across high-volume sports-apparel production.
                        </p>
                        <p>
                            Actively developing with <span className="highlight">Svelte, PixiJS, and Node.js</span>. Strong foundation in <span className="highlight">JavaScript, HTML/CSS, Git</span>, and component-based architecture. 19+ years solving complex problems under tight deadlines.
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
                                <h3>Design &amp; Automation</h3>
                                <ul className="tool-list">
                                    <li>Adobe Illustrator &amp; Scripting</li>
                                    <li>Adobe Photoshop &amp; InDesign</li>
                                    <li>Workflow Automation</li>
                                    <li>Process Optimization</li>
                                </ul>
                            </div>
                            <div className="skill-group">
                                <h3>Development</h3>
                                <ul className="tool-list">
                                    <li>JavaScript &amp; JSX</li>
                                    <li>Svelte &amp; PixiJS</li>
                                    <li>HTML &amp; CSS / SASS</li>
                                    <li>Node.js, Git &amp; GitHub</li>
                                    <li>Swift &amp; Objective-C</li>
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
                                "Svelte",
                                "PixiJS",
                                "Interactive Web Applications",
                                "Workflow Automation",
                                "Adobe Illustrator Scripting",
                                "Node.js",
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