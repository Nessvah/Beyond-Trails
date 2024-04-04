import { render, screen } from "@testing-library/react"; //para renderizar componentes e selecionar elementos na tela durante os testes
import userEvent from "@testing-library/user-event"; //para simular eventos
import { MemoryRouter } from "react-router-dom"; //envolver o componente FormEvents para simular a navegação
import FormEvents from "../FormEvent";

//verificar se o componente FormEvents é renderizado corretamente.
test("Renderiza o componente FormEvents corretamente", () => {
  render(
    <MemoryRouter>
      <FormEvents />
    </MemoryRouter>
  );
});

//verificar se o formulário pode ser preenchido e enviado corretamente.
test("Permite o envio do formulário", () => {
  render(
    <MemoryRouter>
      <FormEvents />
    </MemoryRouter>
  );

  //  seleciona um campo de entrada e um botão
  const nomeInput = screen.getByLabelText("Nome");
  const submitButton = screen.getByText("Criar");

  //usada para simular a digitação de "Nome do Evento" no campo de entrada e o clique no botão "Criar"
  userEvent.type(nomeInput, "Nome do Evento");
  userEvent.click(submitButton);
});
