import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [status, setStatus] = useState(null); // null | 'sending' | 'sent' | 'error'
    const [errors, setErrors] = useState({});

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = "Name is required";
        if (!form.email.trim()) e.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
        if (!form.subject.trim()) e.subject = "Subject is required";
        if (!form.message.trim()) e.message = "Message is required";
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
        const to = "andres1983@icloud.com";
        const subject = encodeURIComponent(`[AndreOS Contact] ${form.subject}`);
        const body = encodeURIComponent(
            `Name: ${form.name}\nFrom: ${form.email}\n\n${form.message}`
        );
        window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

        // Optimistically show sent state
        setTimeout(() => {
            setStatus("sent");
            setForm({ name: "", email: "", subject: "", message: "" });
        }, 800);
    };

    const handleReset = () => { setStatus(null); setErrors({}); };

    return (
        <div className="contact-wrap">

            {/* ── HERO HEADER ── */}
            <div className="contact-hero">
                <div className="contact-hero-icon">
                    <span>✉</span>
                </div>

                <div className="contact-hero-text">
                    <h1>Get In Touch</h1>
                    <p className="contact-hero-subtitle">
                        Send a direct message or connect across the channels below
                    </p>
                    <div className="contact-badges">
                        <span className="contact-badge email">Direct Email</span>
                        <span className="contact-badge available">Open to Opportunities</span>
                        <span className="contact-badge quick">Fast Response</span>
                    </div>
                </div>
            </div>

            {/* ── SCROLLABLE BODY ── */}
            <div className="contact-body">

                {/* Quick Contact Strip */}
                <div className="contact-strip">
                    <a className="contact-chip" href="mailto:andres1983@icloud.com">
                        <span className="chip-icon">✉</span>
                        andres1983@icloud.com
                    </a>
                    <a className="contact-chip" href="tel:424-421-4343">
                        <span className="chip-icon">📞</span>
                        424-421-4343
                    </a>
                    <a
                        className="contact-chip"
                        href="https://andres1138.github.io"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className="chip-icon">🌐</span>
                        andres1138.github.io
                    </a>
                    <a
                        className="contact-chip"
                        href="https://github.com/andres1138"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className="chip-icon">💻</span>
                        github.com/andres1138
                    </a>
                </div>

                {/* Form Card */}
                <div className="contact-card">
                    <div className="contact-card-header">
                        <span className="card-icon">💬</span>
                        <h2>Send a Message</h2>
                    </div>

                    <div className="contact-card-body">
                        {status === "sent" ? (
                            <div className="contact-success">
                                <div className="success-icon">✓</div>
                                <h2>Message Dispatched!</h2>
                                <p>
                                    Your default email client has been prepared. If it didn't open automatically, feel free to email me directly at <strong>andres1983@icloud.com</strong>.
                                </p>
                                <button className="contact-btn" onClick={handleReset}>
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <form className="contact-form" onSubmit={handleSubmit} noValidate>
                                <div className="form-row form-row-2">
                                    <div className={`form-group ${errors.name ? "has-error" : ""}`}>
                                        <label htmlFor="cf-name">Your Name</label>
                                        <input
                                            id="cf-name"
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Andre Sarokhanian"
                                            autoComplete="name"
                                        />
                                        {errors.name && <span className="field-error">{errors.name}</span>}
                                    </div>

                                    <div className={`form-group ${errors.email ? "has-error" : ""}`}>
                                        <label htmlFor="cf-email">Your Email</label>
                                        <input
                                            id="cf-email"
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            autoComplete="email"
                                        />
                                        {errors.email && <span className="field-error">{errors.email}</span>}
                                    </div>
                                </div>

                                <div className={`form-group ${errors.subject ? "has-error" : ""}`}>
                                    <label htmlFor="cf-subject">Subject</label>
                                    <input
                                        id="cf-subject"
                                        type="text"
                                        name="subject"
                                        value={form.subject}
                                        onChange={handleChange}
                                        placeholder="What's this regarding?"
                                    />
                                    {errors.subject && <span className="field-error">{errors.subject}</span>}
                                </div>

                                <div className={`form-group ${errors.message ? "has-error" : ""}`}>
                                    <label htmlFor="cf-message">Message</label>
                                    <textarea
                                        id="cf-message"
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="Write your message here..."
                                        rows={6}
                                    />
                                    {errors.message && <span className="field-error">{errors.message}</span>}
                                </div>

                                <div className="form-footer">
                                    <span className="form-note">
                                        🔒 Launches your email app — no third-party tracker or intermediate server.
                                    </span>
                                    <button
                                        className={`contact-btn ${status === "sending" ? "sending" : ""}`}
                                        type="submit"
                                        disabled={status === "sending"}
                                    >
                                        {status === "sending" ? "Preparing Mail…" : "Send Message →"}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Contact;