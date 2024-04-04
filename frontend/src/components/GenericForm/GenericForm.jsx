import Form from "react-bootstrap/Form";

function GenericForm({ formTitle, inputType, options = [] }) {
  return (
    <Form.Group className='pt-5 nt-5'>
      <Form.Label>{formTitle}:</Form.Label>
      {inputType === "select" ? (
        <Form.Control as='select' className='pt-3 fs-1.7'>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Control>
      ) : (
        <Form.Control
          type={inputType}
          className='pt-3 fs-1.7'
          placeholder={`Enter your ${formTitle.toLowerCase()}`}
        />
      )}
    </Form.Group>
  );
}

export default GenericForm;
