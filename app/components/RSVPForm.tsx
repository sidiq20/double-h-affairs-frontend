import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUsers, faEnvelope, faPhone, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

interface RSVPFormProps {
  className?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  guests: string;
  attending: string;
  dietaryRequirements: string;
  message: string;
}

export default function RSVPForm({ className = "" }: RSVPFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    guests: '1',
    attending: '',
    dietaryRequirements: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.attending) {
      newErrors.attending = 'Please let us know if you can attend';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Here you would typically send the data to your API
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      setIsSubmitted(true);
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        guests: '1',
        attending: '',
        dietaryRequirements: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting RSVP:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  if (isSubmitted) {
    return (
      <section className={`py-20 bg-gradient-to-br from-wedding-50 to-rose-50 ${className}`}>
        <div className="max-w-lg mx-auto px-6 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faCheck} className="text-3xl text-green-600" />
            </div>
            <h2 className="text-3xl font-light text-gray-900 font-serif mb-4">Thank You!</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Your RSVP has been received. We're so excited to celebrate with you on our special day!
            </p>
            <div className="flex items-center justify-center space-x-2">
              <FontAwesomeIcon icon={faHeart} className="text-wedding-500 text-xl" />
              <p className="text-wedding-600 font-medium">— Hummulkhair & Abdul-Hafeez </p>
              <FontAwesomeIcon icon={faHeart} className="text-wedding-500 text-xl" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-20 bg-gradient-to-br from-wedding-50 to-rose-50 ${className}`}>
      <div className="max-w-3xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-wedding-300"></div>
            <FontAwesomeIcon icon={faEnvelope} className="text-2xl text-wedding-500" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-wedding-300"></div>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-light text-gray-900 font-serif mb-6 relative">
            RSVP
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-px bg-gradient-to-r from-wedding-300 to-rose-300"></div>
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto leading-relaxed">
            We would be honored by your presence at our wedding celebration. Please let us know if you can join us.
          </p>
        </div>

        {/* RSVP Form */}
        <div className="bg-white shadow-xl border border-wedding-100/50 overflow-hidden" style={{ borderRadius: '12px' }}>
          <div className="p-8 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name and Email Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <span>Full Name</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 focus:ring-2 focus:ring-wedding-500/20 focus:border-wedding-500 transition-colors duration-200 ${
                      errors.name ? 'border-red-300' : 'border-gray-200'
                    }`}
                    style={{ borderRadius: '8px' }}
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <span>Email Address</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 focus:ring-2 focus:ring-wedding-500/20 focus:border-wedding-500 transition-colors duration-200 ${
                      errors.email ? 'border-red-300' : 'border-gray-200'
                    }`}
                    style={{ borderRadius: '8px' }}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
              </div>

              {/* Phone and Guests Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 focus:ring-2 focus:ring-wedding-500/20 focus:border-wedding-500 transition-colors duration-200"
                    style={{ borderRadius: '8px' }}
                    placeholder="+234 xxx xxx xxxx"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="guests" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <FontAwesomeIcon icon={faUsers} className="text-wedding-500" />
                    <span>Number of Guests</span>
                  </label>
                  <select
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 focus:ring-2 focus:ring-wedding-500/20 focus:border-wedding-500 transition-colors duration-200"
                    style={{ borderRadius: '8px' }}
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5+">5+ Guests</option>
                  </select>
                </div>
              </div>

              {/* Attendance */}
              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <span>Will you be attending?</span>
                  <span className="text-red-500">*</span>
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  <label className={`flex items-center p-4 border-2 cursor-pointer transition-colors duration-200 ${
                    formData.attending === 'yes' ? 'border-wedding-500 bg-wedding-50' : 'border-gray-200 hover:border-wedding-300'
                  }`} style={{ borderRadius: '8px' }}>
                    <input
                      type="radio"
                      name="attending"
                      value="yes"
                      checked={formData.attending === 'yes'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-wedding-600 focus:ring-wedding-500"
                    />
                    <span className="ml-3 text-gray-700 font-medium">Yes, we'll be there! 🎉</span>
                  </label>

                  <label className={`flex items-center p-4 border-2 cursor-pointer transition-colors duration-200 ${
                    formData.attending === 'no' ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-red-200'
                  }`} style={{ borderRadius: '8px' }}>
                    <input
                      type="radio"
                      name="attending"
                      value="no"
                      checked={formData.attending === 'no'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-red-600 focus:ring-red-500"
                    />
                    <span className="ml-3 text-gray-700 font-medium">Sorry, can't make it 😢</span>
                  </label>
                </div>
                {errors.attending && <p className="text-red-500 text-sm">{errors.attending}</p>}
              </div>

              {/* Dietary Requirements */}
              <div className="space-y-2">
                <label htmlFor="dietaryRequirements" className="text-sm font-medium text-gray-700">
                  Dietary Requirements (Optional)
                </label>
                <input
                  type="text"
                  id="dietaryRequirements"
                  name="dietaryRequirements"
                  value={formData.dietaryRequirements}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 focus:ring-2 focus:ring-wedding-500/20 focus:border-wedding-500 transition-colors duration-200"
                  style={{ borderRadius: '8px' }}
                  placeholder="Vegetarian, allergies, etc."
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">
                  Special Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 focus:ring-2 focus:ring-wedding-500/20 focus:border-wedding-500 transition-colors duration-200"
                  style={{ borderRadius: '8px' }}
                  placeholder="Share your well wishes or any special notes..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-wedding-500 to-wedding-600 text-white py-4 px-8 font-medium text-lg hover:from-wedding-600 hover:to-wedding-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  style={{ borderRadius: '8px' }}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin" style={{ borderRadius: '50%' }}></div>
                      <span>Sending RSVP...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <FontAwesomeIcon icon={faHeart} />
                      <span>Send RSVP</span>
                      <FontAwesomeIcon icon={faHeart} />
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Please RSVP by <strong>October 25, 2025</strong> so we can prepare accordingly.
          </p>
        </div>
      </div>

      <style jsx>{`
        .font-serif {
          font-family: 'Georgia', 'Times New Roman', serif;
        }
      `}</style>
    </section>
  );
}
