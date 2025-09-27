import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCopy, faGift, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

interface DonationSectionProps {
  className?: string;
}

export default function DonationSection({ className = "" }: DonationSectionProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  const accountDetails = {
    accountName: "hummulkhair olanrewaju",
    accountNumber: "0344521215",
    bankName: "GTBank"
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const CopyableField = ({ label, value, field, isBold = false, isLarge = false }: {
    label: string;
    value: string;
    field: string;
    isBold?: boolean;
    isLarge?: boolean;
  }) => {
    const isCopied = copiedField === field;
    
    return (
      <div className="wedding-card p-6 hover:shadow-dreamy transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-amber-600 mb-2 font-serif">{label}</p>
            <p className={`text-gray-900 select-all ${
              isLarge ? 'text-2xl font-bold tracking-wide' : 'text-lg'
            } ${isBold ? 'font-semibold' : 'font-medium'}`}>
              {value}
            </p>
          </div>
          <button
            onClick={() => copyToClipboard(value, field)}
            className={`ml-4 p-3 rounded-xl border-2 transition-all duration-200 transform hover:scale-105 ${
              isCopied
                ? 'bg-green-50 border-green-200 text-green-600'
                : 'bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-100 hover:border-amber-300'
            }`}
            title={`Copy ${label.toLowerCase()}`}
          >
            <FontAwesomeIcon 
              icon={isCopied ? faCheck : faCopy} 
              className={`text-lg transition-all duration-200 ${isCopied ? 'animate-bounce' : ''}`} 
            />
          </button>
        </div>
        
        {/* Copy confirmation */}
        {isCopied && (
          <div className="mt-3 text-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 animate-fade-in">
              <FontAwesomeIcon icon={faCheck} className="mr-2" />
              {label} copied successfully!
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className={`py-16 bg-gradient-to-br from-orange-50/50 to-amber-50/30 ${className}`}>
      <div className="max-w-3xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-amber-300 rounded-full"></div>
            <div className="p-3 bg-gradient-to-r from-amber-100 to-rose-100 rounded-2xl">
              <FontAwesomeIcon icon={faGift} className="text-2xl text-amber-600" />
            </div>
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-amber-300 rounded-full"></div>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-elegant font-medium text-amber-800 mb-4 relative">
            Wedding Gift
          </h2>
          <p className="text-amber-700 text-lg max-w-xl mx-auto leading-relaxed font-serif font-light">
            no physicial gits allowed, kindly send your gifts to our account details below
          </p>
        </div>

        {/* Account Details */}
        <div className="space-y-4 mb-8">
          {/* Account Name - No Copy */}
          <div className="wedding-card p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-amber-600 mb-2 font-serif">Account Name</p>
                <p className="text-lg font-medium text-gray-900">
                  {accountDetails.accountName}
                </p>
              </div>
            </div>
          </div>
          
          <CopyableField 
            label="Account Number" 
            value={accountDetails.accountNumber} 
            field="accountNumber"
            isBold={true}
            isLarge={true}
          />
          
          <CopyableField 
            label="Bank Name" 
            value={accountDetails.bankName} 
            field="bankName" 
          />
        </div>

        {/* Thank You Message */}
        <div className="wedding-card p-8 text-center bg-gradient-to-r from-amber-50/80 to-rose-50/80 border-amber-200/50">
          <div className="p-4 bg-gradient-to-r from-amber-100/50 to-rose-100/50 rounded-2xl inline-flex mb-4">
            <FontAwesomeIcon icon={faHeart} className="text-3xl text-pink-500" />
          </div>
          <h3 className="text-xl font-serif font-medium text-amber-800 mb-3">From Our Hearts</h3>
          <p className="text-amber-700 font-serif font-light leading-relaxed italic">
            "Your kindness and generosity mean the world to us. May Allah bless you abundantly for your love and thoughtfulness."
          </p>
          <p className="text-pink-600 font-script text-lg mt-4">— Abdul-Hafeez & Hummulkhair</p>
        </div>

        {/* Decorative Bottom */}
        <div className="flex items-center justify-center space-x-3 mt-8">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-300/40 rounded-full"></div>
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-amber-300 rounded-full opacity-60"></div>
            <div className="w-2 h-2 bg-rose-300 rounded-full opacity-60"></div>
            <div className="w-2 h-2 bg-pink-300 rounded-full opacity-60"></div>
          </div>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-300/40 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
