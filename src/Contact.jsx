import React, { useState } from "react";
import "./Contact.css";

const EMAIL = "andres1983@icloud.com";

const PhoneIcon = () => (
    <svg viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.01-.24c1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.24 1.01l-2.2 2.21z" /></svg>
);
const MailIcon = () => (
    <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
);
const GlobeIcon = () => (
    <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
);

const emptyForm = { name: "", email: "", subject: "", message: "" };

const Contact = () => {
    const [form, setForm] = useState(emptyForm);
    const [status, setStatus] = useState(null); // null | 'sending' | 'sent'
    const [errors, setErrors] = useState({});

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = "Please enter your name";
        if (!form.email.trim()) e.email = "Please enter your email";
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Please enter a valid email";
        if (!form.subject.trim()) e.subject = "Please add a subject";
        if (!form.message.trim()) e.message = "Please write a message";
        return e;
    };

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        if (errors[e.target.name]) {
            setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }

        setStatus("sending");

        // Build mailto link and open it
        const subject = encodeURIComponent(`[AndreOS Contact] ${form.subject}`);
        const body = encodeURIComponent(
            `Name: ${form.name}\nFrom: ${form.email}\n\n${form.message}`
        );
        window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;

        // Optimistically show sent state
        setTimeout(() => {
            setStatus("sent");
            setForm(emptyForm);
        }, 800);
    };

    const handleReset = () => { setStatus(null); setErrors({}); };

    const field = (name) => `ct-field ${errors[name] ? "has-error" : ""}`;

    return (
        <div className="contact">
            {/* ── SIDEBAR ── */}
            <aside className="ct-sidebar">
                <div>
                    <h1 className="ct-name">André<br />Sarokhanian</h1>
                    <div className="ct-tagline">Graphic Designer</div>
                    <div className="ct-divider" />
                </div>

                <div className="ct-side-section">
                    <h3>Contact</h3>
                    <ul className="ct-contact">
                        <li>
                            <span className="ct-icon"><MailIcon /></span>
                            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                        </li>
                        <li>
                            <span className="ct-icon"><PhoneIcon /></span>
                            <a href="tel:424-421-4343">424-421-4343</a>
                        </li>
                        <li>
                            <span className="ct-icon"><GlobeIcon /></span>
                            <a href="https://andres1138.github.io" target="_blank" rel="noopener noreferrer">
                                andres1138.github.io
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="ct-side-section">
                    <h3>Availability</h3>
                    <p className="ct-side-text">
                        Currently looking for graphic design and production art roles, full-time or freelance.
                    </p>
                </div>
            </aside>

            {/* ── MAIN ── */}
            <main className="ct-main">
                <h2 className="ct-section-title">Send a Message</h2>

                {status === "sent" ? (
                    <div className="ct-success">
                        <div className="ct-success-icon">✓</div>
                        <h3>Thanks for reaching out</h3>
                        <p>
                            Your email app should have opened with your message. If it didn't, you can
                            email me directly at <strong>{EMAIL}</strong>.
                        </p>
                        <button className="ct-btn" onClick={handleReset}>Send another message</button>
                    </div>
                ) : (
                    <form className="ct-form" onSubmit={handleSubmit} noValidate>
                        <p className="ct-intro">
                            Thanks for stopping by. If you have a question or a project in mind, feel free to
                            send me a note and I'll get back to you.
                        </p>

                        <div className="ct-row-2">
                            <div className={field("name")}>
                                <label htmlFor="cf-name">Name</label>
                                <input id="cf-name" type="text" name="name" value={form.name}
                                    onChange={handleChange} placeholder="Your name" autoComplete="name" />
                                {errors.name && <span className="ct-error">{errors.name}</span>}
                            </div>

                            <div className={field("email")}>
                                <label htmlFor="cf-email">Email</label>
                                <input id="cf-email" type="email" name="email" value={form.email}
                                    onChange={handleChange} placeholder="you@example.com" autoComplete="email" />
                                {errors.email && <span className="ct-error">{errors.email}</span>}
                            </div>
                        </div>

                        <div className={field("subject")}>
                            <label htmlFor="cf-subject">Subject</label>
                            <input id="cf-subject" type="text" name="subject" value={form.subject}
                                onChange={handleChange} placeholder="What's this about?" />
                            {errors.subject && <span className="ct-error">{errors.subject}</span>}
                        </div>

                        <div className={field("message")}>
                            <label htmlFor="cf-message">Message</label>
                            <textarea id="cf-message" name="message" value={form.message}
                                onChange={handleChange} placeholder="Write your message here..." rows={6} />
                            {errors.message && <span className="ct-error">{errors.message}</span>}
                        </div>

                        <div className="ct-footer">
                            <span className="ct-note">This opens your email app to send the message.</span>
                            <button
                                className="ct-btn"
                                type="submit"
                                disabled={status === "sending"}
                            >
                                {status === "sending" ? "Opening email…" : "Send message"}
                            </button>
                        </div>
                    </form>
                )}
            </main>
        </div>
    );
};

export default Contact;