const LoadingScreen = ({ title = "Preparing Your Material...", subtitle = "Analyzing your study material to create a custom quiz..." }) => {
  return (
    <div className="relative z-10 w-full max-w-2xl px-4 py-12 text-center mx-auto">
      <div className="flex flex-col items-center">
        {/* Main Visual Loading Asset */}
        <div className="relative mb-8 pulse-glow">
          {/* Spinning Outer Ring */}
          <div className="loader-ring"></div>
          
          {/* Inner Central Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center border border-outline-variant shadow-xl">
              <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
            </div>
          </div>
          
          {/* Small orbiting dots */}
          <div className="absolute top-0 left-0 w-full h-full animate-[spin_4s_linear_infinite]">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-secondary rounded-full shadow-[0_0_10px_#66d9cc]"></div>
          </div>
        </div>

        {/* Text */}
        <h3 className="font-headline-md text-on-surface mb-2 text-slide-up">{title}</h3>
        <p className="text-secondary text-sm shimmer text-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>{subtitle}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
