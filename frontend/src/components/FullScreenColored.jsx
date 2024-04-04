function FullScreenColored({ bgColor, txtColor, children }) {
  return (
    <div className={`bg-${bgColor} text-${txtColor} py-5 cards-section`}>
      <div className='container px-4'>{children}</div>
    </div>
  );
}

export default FullScreenColored;
