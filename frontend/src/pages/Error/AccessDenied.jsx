import { Container, Row, Col, Image } from "react-bootstrap";
import accessDenied from "../../assets/images/access-denied.jpg";
import { useNavigate } from "react-router-dom";

export const AccessDenied = () => {
  const navigate = useNavigate();

  // this allow the user to go back to the previous page
  //! in strict mode, we need to click twice to go back
  const goBack = () => {
    navigate(-1);
  };

  /**
   * This simple function will allow to set a cursor pointer when
   * hovering the span element to go back one page.
   * This is just to help the user know that it's a clickable elemnt.
   * @param {event} e
   */
  const showCursorPointer = (e) => {
    e.target.style.cursor = "pointer";
  };

  return (
    <Container className='my-4'>
      <Row className='text-secondary text-center gap-2'>
        <h1 className='text-secondary'>403</h1>
        <h2>Acesso Negado</h2>

        <p className='text-dark fs-3'>
          Desculpe mas não tem permissões para aceder a esta página. Você pode
          voltar para a{" "}
          <span
            className='underline text-secondary'
            onMouseEnter={showCursorPointer}
            onClick={goBack}>
            página anterior.
          </span>
        </p>

        <Image src={accessDenied} className='w-50 mx-auto' width={"250px"} />
      </Row>
    </Container>
  );
};
