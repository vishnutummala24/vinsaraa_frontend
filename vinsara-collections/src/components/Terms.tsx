import React from 'react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-serif text-center mb-12 mt-6 text-gray-900">
          Terms & Conditions – Vinsaraa
        </h1>

        {/* Content */}
        <div className="space-y-8 text-gray-700 text-base font-light leading-relaxed">

          {/* Intro */}
          <p>
            Welcome to Vinsaraa. By accessing or using our website and purchasing our products, you agree to the following Terms & Conditions. Please read them carefully.
          </p>

          <p>
            These Terms & Conditions govern your use of the Vinsaraa website and any purchases made through it. By using this website, you accept these terms in full.
          </p>

          {/* Product Information */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Product Information</h2>
            <p>We make every effort to display product colours, prints, and details accurately.</p>
            <p>
              Slight variations in colour, print placement, or texture may occur due to lighting, screen resolution,
              and handmade processes. Such variations shall not be considered defects.
            </p>
          </div>

          {/* Order & Payment */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Order & Payment</h2>
            <p>All orders placed on www.vinsaraa.in are processed only after successful payment.</p>
            <p>
              We reserve the right to cancel or refuse any order due to incorrect pricing, technical issues, or suspicious activity.
            </p>
            <p>Prices may change without prior notice.</p>
          </div>

          {/* Shipping & Delivery */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Shipping & Delivery</h2>
            <p>Standard shipping timelines will be mentioned during checkout.</p>
            <p>
              Delivery delays caused by courier partners, weather conditions, or national holidays are beyond our control.
            </p>
            <p>
              Customers must provide accurate delivery information. We are not responsible for failed deliveries due to incorrect details.
            </p>
          </div>

          {/* No Return No Refund */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-900">No Return & No Refund Policy</h2>
            <p>
              At Vinsaraa, we follow a strict No Return and No Refund policy.
              Once an order is placed and delivered, it cannot be returned or refunded for reasons including personal preference, colour mismatch, or print variation.
            </p>
          </div>

          {/* Exchange Policy */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Exchange Policy (Size Exchange Only)</h2>

            <h3 className="font-semibold mt-4">1 Eligibility for Size Exchange</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>The product delivered is unused, unwashed, and in original condition.</li>
              <li>Tags, labels, and packaging are intact.</li>
              <li>The exchange request is raised within 48 hours of delivery.</li>
            </ul>

            <h3 className="font-semibold mt-4">2 Non-Eligible Cases</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>The product is used, washed, or damaged after delivery.</li>
              <li>Any fragrance, makeup, stains, or wear marks are present.</li>
              <li>The requested size is unavailable in stock.</li>
            </ul>

            <h3 className="font-semibold mt-4">3 Exchange Process</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Customers must contact us at <span className="font-medium">customercare.vinsaraa@gmail.com</span> with their order ID and size issue.</li>
              <li>Once the request is approved, the customer must ship the product back to us.</li>
              <li>Reverse pickup may or may not be available depending on the pincode.</li>
              <li>Shipping charges for sending the product back may be borne by the customer.</li>
              <li>After inspection, the correct size will be shipped.</li>
            </ul>
          </div>

          {/* Cancellation */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Cancellation Policy</h2>
            <p>Orders once placed cannot be cancelled after they are processed or shipped.</p>
            <p>If cancellation is requested before processing, it may be accepted at our discretion.</p>
          </div>

          {/* Intellectual Property */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Intellectual Property</h2>
            <p>
              All content on this website, including logos, images, text, and designs, is owned by Vinsaraa.
              Unauthorized use or reproduction is strictly prohibited.
            </p>
          </div>

          {/* Privacy */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Privacy</h2>
            <p>
              Your personal information is protected and used only for order processing and communication.
              We do not share your details with third parties except for essential logistics partners.
            </p>
          </div>

          {/* Limitation of Liability */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Limitation of Liability</h2>
            <p>
              Vinsaraa is not liable for any indirect, incidental, or consequential damages arising from website use or product purchase.
            </p>
            <p>Our maximum liability is limited to the value of the product purchased.</p>
          </div>

          {/* Changes to Terms */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Changes to Terms</h2>
            <p>
              Vinsaraa reserves the right to modify or update these Terms & Conditions at any time.
              Continued use of the website implies acceptance of the updated terms.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Contact Information</h2>
            <p>For queries, support, or exchange requests, contact us at:</p>
            <p>Email: customercare.vinsaraa@gmail.com</p>
          </div>

        </div>
      </div>
    </div>
  );
}
