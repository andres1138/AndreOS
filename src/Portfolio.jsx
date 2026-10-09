import React from "react";
import "./Portfolio.css";

const PhoneIcon = () => (
    <svg viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.01-.24c1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.24 1.01l-2.2 2.21z" /></svg>
);
const MailIcon = () => (
    <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
);
const GlobeIcon = () => (
    <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
);

const designTools = ["Illustrator", "Photoshop", "InDesign"];
const designSkills = [
    "Branding", "Print Design", "Layout", "Typography", "Menus & Signage",
    "Apparel Graphics", "Screen Print Prep", "Sublimation", "Prepress",
];
const additionalSkills = ["HTML", "CSS", "JavaScript", "Illustrator Scripting", "Git"];

const experience = [
    {
        company: "BSN Sports",
        dates: "2019 – 2026",
        role: "Production Artist",
        bullets: [
            "Prepared and set up artwork for team uniforms and sports apparel.",
            "Checked files for accuracy before production and helped resolve artwork issues.",
            "Worked with production staff to keep orders moving and meet deadlines.",
            "Wrote small Illustrator scripts to help the team handle repetitive tasks, such as setting up custom player names and numbers.",
        ],
    },
    {
        company: "Digital Solutions LLC",
        dates: "2018 – 2019",
        role: "Graphic & Web Designer",
        location: "Washington, DC",
        bullets: [
            "Designed websites and visual assets for small-business clients, then built the designs as static web pages using HTML and CSS.",
            "Met with clients to understand their goals and revised designs based on their feedback.",
        ],
    },
    {
        company: "Fan Cloth",
        dates: "2016 – 2018",
        role: "Film Separation Artist",
        location: "Arlington, TX",
        bullets: [
            "Prepared customer artwork for screen printing and sublimation.",
            "Handled around 18–22 orders a day while keeping files accurate and on schedule.",
            "Created color separations and print-ready files.",
        ],
    },
    {
        company: "Mendocino Farms",
        dates: "2011 – 2016",
        role: "Graphic Designer",
        location: "Los Angeles, CA",
        bullets: [
            "Designed menus, signage, advertising, and marketing materials for multiple restaurant locations.",
            "Helped develop and maintain a consistent brand look across locations.",
            "Worked directly with the company founders on creative projects from concept to print.",
        ],
    },
];

const Tags = ({ items }) => (
    <div className="pf-tags">
        {items.map((t) => <span key={t} className="pf-tag">{t}</span>)}
    </div>
);

const Portfolio = () => {
    return (
        <div className="portfolio">
            <aside className="pf-sidebar">
                <div className="pf-profile">
                    <h1 className="pf-name">André<br />Sarokhanian</h1>
                    <div className="pf-tagline">Graphic Designer</div>
                    <div className="pf-divider" />
                </div>

                <div className="pf-side-section">
                    <h3>Contact</h3>
                    <ul className="pf-contact">
                        <li><span className="pf-icon"><PhoneIcon /></span>424-421-4343</li>
                        <li>
                            <span className="pf-icon"><MailIcon /></span>
                            <a href="mailto:andres1983@icloud.com">andres1983@icloud.com</a>
                        </li>
                        <li>
                            <span className="pf-icon"><GlobeIcon /></span>
                            <a href="https://andres1138.github.io" target="_blank" rel="noreferrer">andres1138.github.io</a>
                        </li>
                    </ul>
                </div>

                <div className="pf-side-section">
                    <h3>Design Tools</h3>
                    <Tags items={designTools} />
                </div>

                <div className="pf-side-section">
                    <h3>Design Skills</h3>
                    <Tags items={designSkills} />
                </div>

                <div className="pf-side-section">
                    <h3>Additional Skills</h3>
                    <Tags items={additionalSkills} />
                </div>

                <div className="pf-side-section">
                    <h3>Education</h3>
                    <div className="pf-edu">
                        <div className="pf-degree">B.S. Graphic Design</div>
                        <div className="pf-school">Radford University — Radford, VA</div>
                    </div>
                    <div className="pf-edu">
                        <div className="pf-degree">iOS Development Tech Degree</div>
                        <div className="pf-school">Treehouse</div>
                    </div>
                </div>
            </aside>

            <main className="pf-main">
                <section>
                    <h2 className="pf-section-title">Profile</h2>
                    <p className="pf-summary">
                        Graphic designer with a background in branding, print, and apparel production. I've spent
                        most of my career preparing artwork for print and creating marketing materials, and I enjoy
                        working closely with people to turn their ideas into finished pieces. I also have some web
                        and scripting experience, which has helped me build simple websites and speed up repetitive
                        production tasks.
                    </p>
                </section>

                <section>
                    <h2 className="pf-section-title">Experience</h2>
                    {experience.map((job) => (
                        <div className="pf-entry" key={job.company}>
                            <div className="pf-entry-top">
                                <span className="pf-company">{job.company}</span>
                                <span className="pf-date">{job.dates}</span>
                            </div>
                            <div className="pf-role">
                                {job.role}
                                {job.location && <span className="pf-location"> · {job.location}</span>}
                            </div>
                            <ul className="pf-bullets">
                                {job.bullets.map((b) => <li key={b}>{b}</li>)}
                            </ul>
                        </div>
                    ))}
                </section>

                <section>
                    <h2 className="pf-section-title">Portfolio</h2>
                    <div className="pf-entry">
                        <div className="pf-entry-top">
                            <span className="pf-company">AndreOS</span>
                            <span className="pf-date">andres1138.github.io</span>
                        </div>
                        <ul className="pf-bullets">
                            <li>
                                A personal portfolio designed as a retro desktop interface, which I designed and
                                built myself. It showcases my design work along with a few small interactive projects.
                            </li>
                        </ul>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Portfolio;
