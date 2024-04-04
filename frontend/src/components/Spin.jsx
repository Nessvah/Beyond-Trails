import Spinner from "react-bootstrap/Spinner";

function Spin({ text = "Loading records..." }) {
  return (
    <div className='text-center mt-3 bg-transparent'>
      <Spinner animation='border' role='status' variant='secondary'>
        <span className='visually-hidden '>Loading...</span>
      </Spinner>
      <h4>{text}</h4>
    </div>
  );
}

export default Spin;
