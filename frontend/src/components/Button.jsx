function Button({ text, btnStyle, isBtnActive, onClick, topic }) {
  // give it the styles and the active default state by props
  let classname = `btn btn-${btnStyle} bg-white  promo-section__btn`;

  function changeActiveColor() {
    classname = `btn btn-${btnStyle} text-white promo-section__btn active`;
  }

  if (isBtnActive) {
    changeActiveColor();
  }

  return (
    <button className={classname} onClick={onClick} data-topic={topic}>
      {text}
    </button>
  );
}

export default Button;
