import React from "react";

const Video = () => {
  return (
    <section className="w-full py-8 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="relative pb-[41.25%] h-0 overflow-hidden rounded-lg shadow-2xl">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/qNKKSujit94?autoplay=1&mute=1&loop=1&playlist=qNKKSujit94"
            title="YouTube video"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Video;
