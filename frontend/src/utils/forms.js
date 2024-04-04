export function getFormDataToObj(form) {
  // grab all the data from the form and convert into json to send to the server.
  const currentForm = new FormData(form);
  return Object.fromEntries(currentForm);
}
