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

            {/* Header */}
            <div className="contact-header">
                <div className="contact-header-icon">✉</div>
                <div>
                    <h1 className="contact-title">Send a Message</h1>
                    <p className="contact-subtitle">I'd love to hear from you — reach out any time.</p>
                </div>
            </div>

            {/* Info strip */}
            <div className="contact-info-strip">
                <span className="contact-info-item">
                    <span className="cii-icon">📧</span>
                    andres1983@icloud.com
                </span>
                <span className="contact-info-item">
                    <span className="cii-icon">📞</span>
                    424-421-4343
                </span>
                <span className="contact-info-item">
                    <span className="cii-icon">⚡</span>
                    Usually responds quickly
                </span>
            </div>

            {/* Form area */}
            <div className="contact-body">

                {status === "sent" ? (
                    <div className="contact-success">
                        <div className="success-icon">✓</div>
                        <h2>Message Sent!</h2>
                        <p>Your mail client should have opened. If it didn't, email me directly at <strong>andres1983@icloud.com</strong>.</p>
                        <button className="contact-btn" onClick={handleReset}>Send Another</button>
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
                                placeholder="What's this about?"
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
                                🔒 Opens your mail client — nothing sent to any server.
                            </span>
                            <button
                                className={`contact-btn ${status === "sending" ? "sending" : ""}`}
                                type="submit"
                                disabled={status === "sending"}
                            >
                                {status === "sending" ? "Opening…" : "Send Message →"}
                            </button>
                        </div>

                    </form>
                )}
            </div>
        </div>
    );
};

export default Contact;