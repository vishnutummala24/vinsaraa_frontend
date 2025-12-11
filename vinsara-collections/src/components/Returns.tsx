import React from 'react';

export default function Returns() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-serif text-center mb-12 mt-6 text-gray-900">
          Payment Policy
        </h1>

        {/* Content */}
        <div className="space-y-8 text-gray-700 text-base font-light leading-relaxed">

          {/* Accepted Payment Methods */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Accepted Payment Methods</h2>
            <p>We offer secure online payment options:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>UPI (Google Pay, PhonePe, Paytm, BHIM, etc.)</li>
              <li>Debit & Credit Cards</li>
              <li>Net Banking</li>
            </ul>
          </div>

          {/* Payment Security */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Payment Security</h2>
            <p>All payments are processed through secure, encrypted gateways.</p>
            <p>Vinsaraa does not store or access your banking/card details.</p>
          </div>

          {/* Order Confirmation */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Order Confirmation</h2>
            <p>Orders are confirmed only after successful payment.</p>
            <p>If payment fails, the order will not be created.</p>
            <p>
              In case of duplicate payments or payment gateway glitches, customers can contact us
              for resolution.
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
