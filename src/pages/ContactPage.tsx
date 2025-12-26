import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { HeroBanner } from '../components/HeroBanner';

export function ContactPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      details: ['123 Beauty Street', 'Downtown, City 12345'],
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['(555) 123-4567', '(555) 987-6543'],
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@aicompos.com', 'support@aicompos.com'],
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon - Fri: 9:00 AM - 8:00 PM', 'Sat - Sun: 10:00 AM - 6:00 PM'],
    },
  ];

  return (
    <div className='min-h-screen w-full bg-nature-main flex flex-col font-sans text-nature-text-primary'>
      {/* Hero Banner */}
      <HeroBanner
        imageUrl='https://picsum.photos/seed/contact/1920/800'
        imageAlt='Contact Banner'
        title='Get in Touch<br />With Us'
        subtitle="We'd love to hear from you. Reach out to us for any questions or inquiries."
        activeNav='contact'
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className='flex-grow w-full max-w-7xl mx-auto p-6 md:py-12 relative overflow-hidden'>
        {/* Background decoration */}
        <div className='absolute top-0 right-0 w-[600px] h-[600px] bg-nature-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none' />
        <div className='absolute bottom-0 left-0 w-[500px] h-[500px] bg-nature-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none' />

        <div className='relative z-10 min-h-[600px]'>
          {/* Contact Information Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className='bg-white rounded-soft p-6 shadow-soft hover:shadow-lg transition-shadow'
              >
                <div className='w-12 h-12 rounded-full bg-nature-primary/10 flex items-center justify-center mb-4'>
                  <info.icon className='w-6 h-6 text-nature-primary' />
                </div>
                <h3 className='text-lg font-semibold text-nature-text-primary mb-3'>{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className='text-nature-text-secondary text-sm mb-1'>
                    {detail}
                  </p>
                ))}
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='bg-white rounded-soft p-8 shadow-soft'
          >
            <h2 className='text-2xl sm:text-3xl font-display font-semibold text-nature-text-primary mb-6'>Send Us a Message</h2>
            <form className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label htmlFor='name' className='block text-sm font-medium text-nature-text-primary mb-2'>
                    Your Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    className='w-full px-4 py-3 rounded-soft border border-nature-divider focus:outline-none focus:ring-2 focus:ring-nature-primary focus:border-transparent transition-all'
                    placeholder='John Doe'
                  />
                </div>
                <div>
                  <label htmlFor='email' className='block text-sm font-medium text-nature-text-primary mb-2'>
                    Email Address
                  </label>
                  <input
                    type='email'
                    id='email'
                    className='w-full px-4 py-3 rounded-soft border border-nature-divider focus:outline-none focus:ring-2 focus:ring-nature-primary focus:border-transparent transition-all'
                    placeholder='john@example.com'
                  />
                </div>
              </div>

              <div>
                <label htmlFor='phone' className='block text-sm font-medium text-nature-text-primary mb-2'>
                  Phone Number
                </label>
                <input
                  type='tel'
                  id='phone'
                  className='w-full px-4 py-3 rounded-soft border border-nature-divider focus:outline-none focus:ring-2 focus:ring-nature-primary focus:border-transparent transition-all'
                  placeholder='(555) 123-4567'
                />
              </div>

              <div>
                <label htmlFor='subject' className='block text-sm font-medium text-nature-text-primary mb-2'>
                  Subject
                </label>
                <input
                  type='text'
                  id='subject'
                  className='w-full px-4 py-3 rounded-soft border border-nature-divider focus:outline-none focus:ring-2 focus:ring-nature-primary focus:border-transparent transition-all'
                  placeholder='How can we help you?'
                />
              </div>

              <div>
                <label htmlFor='message' className='block text-sm font-medium text-nature-text-primary mb-2'>
                  Message
                </label>
                <textarea
                  id='message'
                  rows={4}
                  className='w-full px-4 py-3 rounded-soft border border-nature-divider focus:outline-none focus:ring-2 focus:ring-nature-primary focus:border-transparent transition-all resize-none'
                  placeholder='Tell us more about your inquiry...'
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type='submit'
                className='w-full md:w-auto px-8 py-4 bg-nature-primary text-white rounded-soft font-medium hover:bg-nature-primary/90 transition-all shadow-soft'
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className='mt-12 bg-white rounded-soft p-8 shadow-soft'
          >
            <h2 className='text-2xl sm:text-3xl font-display font-semibold text-nature-text-primary mb-6'>Find Us</h2>
            <div className='w-full h-[250px] sm:h-[350px] md:h-[400px] bg-nature-surface rounded-soft flex items-center justify-center'>
              <p className='text-nature-text-tertiary'>Map integration goes here</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className='w-full border-t border-nature-divider py-8 px-6 mt-auto bg-white/50 backdrop-blur-sm'>
        <div className='max-w-[1400px] mx-auto flex justify-between items-center text-xs text-nature-text-tertiary font-light tracking-wide'>
          <div>Copyright © 2024 AICOMPOS</div>
          <div>Contact Us</div>
        </div>
      </footer>
    </div>
  );
}
