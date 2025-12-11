import React from 'react';

export default function Shipping() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-serif text-center mb-12 mt-6 text-gray-900">
          Shipping Policy
        </h1>

        {/* Content */}
        <div className="space-y-8 text-gray-700 text-base font-light leading-relaxed">

          {/* Shipping Timelines */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Shipping Timelines</h2>
            <p>Orders are processed within 1–3 business days after payment confirmation.</p>
            <p>Delivery time depends on your location, usually 3–7 business days after dispatch.</p>
            <p>During festivals, sales, or unavoidable delays, shipping may take longer.</p>
          </div>

          {/* Shipping Charges */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Shipping Charges</h2>
            <p>Standard shipping charges are displayed at checkout.</p>
            <p>Free shipping may be offered during special promotions.</p>
          </div>

          {/* Order Tracking */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Order Tracking</h2>
            <p>Once your order is shipped, you will receive a tracking link via SMS or email.</p>
            <p>Tracking updates depend on the courier partner’s system.</p>
          </div>

          {/* Delivery Issues */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Delivery Issues</h2>
            <p>Vinsaraa is not responsible for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Delays caused by courier services, weather, or uncontrollable circumstances.</li>
              <li>Incorrect address provided by the customer.</li>
              <li>If a delivery attempt fails due to wrong contact information, re-shipping charges may apply.</li>
              <li>Order may be cancelled if delivery attempt fails 3 times.</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
