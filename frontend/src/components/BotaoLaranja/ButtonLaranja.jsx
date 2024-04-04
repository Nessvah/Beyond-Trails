const btnPrimaryStyles = {
  fontSize: "1.5rem",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: "0.5rem",
  position: "relative"
  // marginTop: "3rem"
};

const ButtonLaranja = ({ label, onClick, className }) => {
  const buttonClass = className
    ? className
    : "btn btn-secondary text-color: white";

  return (
    <button
      type='submit'
      className={buttonClass}
      style={btnPrimaryStyles}
      onClick={onClick}>
      {label}
    </button>
  );
};

export default ButtonLaranja;
