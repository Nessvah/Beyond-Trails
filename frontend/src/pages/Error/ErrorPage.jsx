import { useRouteError, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function ErrorBoundary() {
  const error = useRouteError();
  // convert the obj into an array
  const result = Object.values(error);

  return (
    <div className='d-flex flex-column justify-content-center align-items-center min-vh-100 bg-dark text-white fs-2'>
      <h1 className='mb-5'>
        <i
          className='bi bi-exclamation-diamond-fill pe-4 '
          style={{ color: "#cb2424" }}
        />
        Dang!
      </h1>

      <p>
        {result[1]}: {result[2]}
      </p>

      <small>{result[0]}</small>

      <Button
        style={{ backgroundColor: "#c8e7ff" }}
        size='lg'
        className='mt-5 main-btn'>
        <Link to='/'>Refresh page</Link>
      </Button>
    </div>
  );
}

export default ErrorBoundary;
