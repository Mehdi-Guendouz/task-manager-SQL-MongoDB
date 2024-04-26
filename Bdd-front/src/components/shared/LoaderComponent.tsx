const LoaderComponent = () => {
  return (
    <div className="flex items-center justify-center h-[200px]">
      <div className="h-20 w-20 ">
        <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
          <circle
            className="spin h-5 w-5"
            cx="400"
            cy="400"
            fill="none"
            r="200"
            strokeWidth="50"
            stroke="#060606"
            strokeDasharray="836 1400"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default LoaderComponent;
