import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-serif text-center mb-12 text-gray-900 mt-8">
          About Vinsaraa – Our Story
        </h1>

        {/* Main Content Container */}
        <div className="max-w-5xl mx-auto">

          {/* Image Section */}
          <div className="w-full mb-10">
            <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[450px] overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&h=600&fit=crop"
                alt="Vinsaraa Collection"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6 text-gray-700 leading-relaxed text-base md:text-lg font-light">
            <p>
              India holds a thousand stories—woven, printed, and block-carved into fabrics that have travelled through generations. Yet, in a world full of fashion labels, we noticed one missing piece: 
              a brand dedicated solely to the beauty of kurtis.
            </p>

            <p>
              Vinsaraa was born from a simple realisation—no single brand celebrated kurtis as their identity, and no wardrobe essential deserved that spotlight more. A kurti is comfort, tradition, versatility, and everyday elegance wrapped into one. But for us, it is also a canvas where India’s cultural prints find new life.
            </p>

            <p>
              Across India, every state carries a unique textile legacy—Ajrakh from Kutch, Bagru from Rajasthan, Kalamkari from Andhra Pradesh, Dabu, Pochampally, Sanganeri, and countless more. These prints carry the fingerprints of artisans, the rhythm of handlooms, and the pride of generations. 
              Yet finding them all in one place was never easy—for the customer or the craftsperson.
            </p>

            <p>
              So we created Vinsaraa with a vision to bridge this gap.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6">A Home for Every Indian Print</h2>
            <p>
              Vinsaraa brings together traditional prints from every corner of India and turns them into effortless, everyday kurtis—designed for the modern woman, without losing the soul of the fabric.
            </p>

            <p>
              We believe in giving heritage a contemporary voice. That’s why we craft our pieces in premium linen, blending long-lasting comfort with breathable elegance—making each kurti not just beautiful, but wearable every single day.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6">Empowering Artisans, Preserving Culture</h2>
            <p>
              At the heart of Vinsaraa lies a purpose: to honour the artisans, block printers, and weavers who keep our heritage alive. When you wear Vinsaraa, you wear the stories of their hands, their villages, and their traditions.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6">Made for the Woman Who Loves India, Her Way</h2>
            <p>
              Vinsaraa is for the woman who chooses style with meaning—who wants her everyday wear to carry a touch of culture, crafted thoughtfully and responsibly. 
              A kurti that feels like home, yet looks like today.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6">Vinsaraa — A Thread Between Tradition and Today</h2>
            <p>
              Our journey has just begun, but our vision is timeless:  
              to make the kurti a celebrated symbol of India’s craft,  
              to bring every regional print under one roof,  
              and to make heritage effortlessly wearable.
            </p>

            <p className="font-medium text-gray-900">
              Welcome to Vinsaraa.  
              Where every print has a story.  
              And every story becomes yours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
