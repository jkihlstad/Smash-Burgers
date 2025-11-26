'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Mail, Send } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

// Note: metadata export doesn't work in client components
// SEO is handled by parent layout

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface LocationCardProps {
  title: string;
  address: string;
  hours: string;
  phone: string;
}

const LocationCard = ({ title, address, hours, phone }: LocationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-glass-border",
        "bg-glass-clear backdrop-blur-xl backdrop-saturate-150",
        "shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]",
        "p-8 group transition-all duration-500 ease-out hover:scale-[1.02]"
      )}
    >
      {/* Specular Highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

      {/* Magma Glow on Hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />

      {/* Noise Texture */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <div className="relative z-10 space-y-6">
        <h3 className="font-display text-3xl font-bold uppercase tracking-wide text-white">
          {title}
        </h3>

        <div className="border-t border-glass-border" />

        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-bold text-white/90 text-sm uppercase tracking-wider mb-1">Location</p>
              <p className="text-white/70">{address}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-bold text-white/90 text-sm uppercase tracking-wider mb-1">Hours</p>
              <p className="text-white/70">{hours}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-bold text-white/90 text-sm uppercase tracking-wider mb-1">Phone</p>
              <a href={`tel:${phone}`} className="text-white/70 hover:text-primary transition-colors">
                {phone}
              </a>
            </div>
          </div>
        </div>

        <motion.a
          href={title === "Albany" ? "https://maps.google.com/?q=123+Burger+Lane+Albany+OR+97321" : "https://maps.google.com/?q=456+Patty+Place+Salem+OR+97301"}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "inline-flex items-center justify-center gap-2",
            "rounded-full px-8 py-3",
            "bg-primary text-white font-bold uppercase tracking-widest text-sm",
            "transition-all duration-300",
            "hover:shadow-[0_0_30px_rgba(255,94,15,0.5)]"
          )}
        >
          <MapPin className="w-4 h-4" />
          Get Directions
        </motion.a>
      </div>
    </motion.div>
  );
};

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');

    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <main className="min-h-screen bg-dark-bg">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/IMG_6463.JPG"
            alt="Delicious smash burger with melted cheese"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-dark-bg" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-6"
          >
            <h1 className="font-display text-5xl md:text-7xl uppercase tracking-wider text-white">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl max-w-2xl text-white/90 font-body">
              Have questions? Want to share feedback? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24 px-4 bg-dark-surface">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl md:text-5xl uppercase tracking-wider text-white mb-4">
              Send us a <span className="text-primary">Message</span>
            </h2>
            <p className="text-white/70 text-lg">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={cn(
              "relative overflow-hidden rounded-2xl border border-glass-border",
              "bg-glass-clear backdrop-blur-xl backdrop-saturate-150",
              "shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]",
              "p-8 md:p-12"
            )}
          >
            {/* Specular Highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50" />

            {/* Noise Texture */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-bold uppercase tracking-wider text-white/90 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={cn(
                    "w-full px-4 py-3 rounded-lg",
                    "bg-dark-surface/50 border border-glass-border",
                    "text-white placeholder:text-white/40",
                    "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
                    "transition-all duration-300"
                  )}
                  placeholder="John Doe"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold uppercase tracking-wider text-white/90 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={cn(
                    "w-full px-4 py-3 rounded-lg",
                    "bg-dark-surface/50 border border-glass-border",
                    "text-white placeholder:text-white/40",
                    "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
                    "transition-all duration-300"
                  )}
                  placeholder="john@example.com"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-bold uppercase tracking-wider text-white/90 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg resize-none",
                    "bg-dark-surface/50 border border-glass-border",
                    "text-white placeholder:text-white/40",
                    "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
                    "transition-all duration-300"
                  )}
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "w-full flex items-center justify-center gap-3",
                  "rounded-full px-8 py-4",
                  "bg-primary text-white font-bold uppercase tracking-widest",
                  "transition-all duration-300",
                  "hover:shadow-[0_0_40px_rgba(255,94,15,0.6)]",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-16 md:py-24 px-4 bg-dark-bg">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl md:text-5xl uppercase tracking-wider text-white mb-4">
              Visit Us <span className="text-primary">In Person</span>
            </h2>
            <p className="text-white/70 text-lg">
              Stop by one of our two Oregon locations for the best smash burgers around.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <LocationCard
              title="Albany"
              address="520 Pacific Blvd SW, Albany, OR 97321"
              hours="Tuesday - Sunday: 11:00 AM - 8:00 PM (Closed Mondays)"
              phone="(541) 971-5056"
            />
            <LocationCard
              title="Salem (Coming Soon)"
              address="Location Coming Soon"
              hours="Opening Soon - Stay Tuned!"
              phone="Phone Coming Soon"
            />
          </div>
        </div>
      </section>

      {/* Additional Contact Info Section */}
      <section className="py-16 px-4 bg-dark-surface border-t border-glass-border">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className={cn(
              "relative overflow-hidden rounded-2xl border border-glass-border",
              "bg-glass-clear backdrop-blur-xl backdrop-saturate-150",
              "shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]",
              "p-8 md:p-12 text-center"
            )}
          >
            {/* Specular Highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50" />

            {/* Noise Texture */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

            <div className="relative z-10">
              <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-display text-2xl md:text-3xl uppercase tracking-wide text-white mb-4">
                Email Us Directly
              </h3>
              <p className="text-white/70 mb-6">
                Prefer email? Send us a message and we'll respond within 24 hours.
              </p>
              <a
                href="mailto:info@smashburgers.com"
                className="text-primary hover:text-primary-glow transition-colors text-lg font-bold"
              >
                info@smashburgers.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
