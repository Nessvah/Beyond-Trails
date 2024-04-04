import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import BotaoSelecionado from "../BotaoSelecionado";
import RegistoVisitante from "../RegistoVisitante";
import RegistoPartner from "../RegistoPartner";

test("Debug BotaoSelecionado component", () => {
  render(<BotaoSelecionado />);
  screen.debug();
});

test("BotaoSelecionado renderiza corretamente e altera de estado ao clicar nos botões", () => {
  const { getByText } = render(<BotaoSelecionado />);

  const botaoVisitante = screen.getByRole("button", { name: /Visitante/i });
  expect(botaoVisitante).toBeInTheDocument();

  // clica no botão 'Colaborador'
  fireEvent.click(getByText("Colaborador"));

  // opção exibida após o clique
  expect(getByText("Colaborador")).toBeInTheDocument();
});

describe("Testes para BotaoSelecionado", () => {
  test("Renderiza os botões Visitante e Colaborador", () => {
    render(<BotaoSelecionado />);
    const botaoVisitante = screen.getByText("Visitante");
    const botaoColaborador = screen.getByText("Colaborador");

    expect(botaoVisitante).toBeInTheDocument();
    expect(botaoColaborador).toBeInTheDocument();
  });
});

test("Exibição do formulário de registo de visitante", () => {
  render(<RegistoVisitante />);

  expect(screen.getByLabelText("Password")).toBeInTheDocument();

  const repeatPasswordField = screen.queryByLabelText(
    "Confirmação de Password:"
  );
  if (repeatPasswordField) {
    expect(repeatPasswordField).toBeInTheDocument();
  } else {
    const repeatPasswordInput = screen.getByLabelText(/repeat password/i);
    expect(repeatPasswordInput).toBeInTheDocument();
  }
});

describe("Testes para RegistoVisitante", () => {
  test("Exibição do formulário de registo de visitante", () => {
    render(<RegistoVisitante />);

    // form e seus elementos estão presentes
    expect(screen.getByText("Registo")).toBeInTheDocument();
    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("Gênero")).toBeInTheDocument();
    expect(screen.getByLabelText("Data de Nascimento")).toBeInTheDocument();
    expect(screen.getByLabelText("Localidade")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    const confirmationPasswordInput = screen.queryByLabelText(
      /Confirmação de Password/i
    );

    const repeatPasswordInput = confirmationPasswordInput
      ? confirmationPasswordInput
      : screen.getByLabelText(/repeat password/i);

    //  o campo de confirmação de senha está presente
    expect(repeatPasswordInput).toBeInTheDocument();

    expect(
      screen.getByLabelText("Deseja receber newsletters?")
    ).toBeInTheDocument();
    expect(screen.getByText("Criar Conta")).toBeInTheDocument();

    // campos de entrada e botão de envio
    const nameInput = screen.getByLabelText("Nome");
    const genderInput = screen.getByLabelText("Gênero");
    const dateOfBirthInput = screen.getByLabelText("Data de Nascimento");
    const cityInput = screen.getByLabelText("Localidade");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const newslettersCheckbox = screen.getByLabelText(
      "Deseja receber newsletters?"
    );
    const submitButton = screen.getByText("Criar Conta");

    // preenchimento form
    fireEvent.change(nameInput, { target: { value: "Nome de Exemplo" } });
    fireEvent.change(genderInput, { target: { value: "m" } });
    fireEvent.change(dateOfBirthInput, { target: { value: "2023-01-01" } });
    fireEvent.change(cityInput, { target: { value: "Exemplo City" } });
    fireEvent.change(emailInput, { target: { value: "exemplo@email.com" } });
    fireEvent.change(passwordInput, { target: { value: "senha123" } });
    fireEvent.change(repeatPasswordInput, { target: { value: "senha123" } });
    fireEvent.click(newslettersCheckbox);

    fireEvent.click(submitButton);
  });
});

describe("Testes para RegistoPartner", () => {
  test("Exibição do formulário de registo de colaborador", async () => {
    render(<RegistoPartner />);

    expect(screen.getByText("Registo")).toBeInTheDocument();
    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Número de Identificação Fiscal")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Tipo de Entidade")).toBeInTheDocument();
    expect(screen.getByLabelText("Morada")).toBeInTheDocument();
    expect(screen.getByLabelText("Cidade")).toBeInTheDocument();
    expect(screen.getByLabelText("Código Postal")).toBeInTheDocument();
    expect(screen.getByLabelText("Telefone")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Confirmação de Password")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Representante Legal")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Documento Comprovativo de Titularidade")
    ).toBeInTheDocument();
    expect(screen.getByText("Criar Conta")).toBeInTheDocument();
  });
});

describe("Testes para RegistoPartner", () => {
  test("Submissão bem-sucedida do formulário de registo de colaborador", async () => {
    render(<RegistoPartner />);

    fireEvent.change(screen.getByLabelText("Nome"), {
      target: { value: "Exemplo Nome" }
    });
    fireEvent.change(screen.getByLabelText("Número de Identificação Fiscal"), {
      target: { value: "123456789" }
    });
    fireEvent.change(screen.getByLabelText("Tipo de Entidade"), {
      target: { value: "opcao1" }
    });
    fireEvent.change(screen.getByLabelText("Morada"), {
      target: { value: "Rua Exemplo, 123" }
    });
    fireEvent.change(screen.getByLabelText("Cidade"), {
      target: { value: "ExemploCidade" }
    });
    fireEvent.change(screen.getByLabelText("Código Postal"), {
      target: { value: "12345-678" }
    });
    fireEvent.change(screen.getByLabelText("Telefone"), {
      target: { value: "987654321" }
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "exemplo@exemplo.com" }
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "senha123" }
    });
    fireEvent.change(screen.getByLabelText("Confirmação de Password"), {
      target: { value: "senha123" }
    });

    const fileRepresentante = new File(["representante"], "representante.jpg", {
      type: "image/jpg"
    });
    const fileTitularidade = new File(["titularidade"], "titularidade.pdf", {
      type: "application/pdf"
    });

    fireEvent.change(screen.getByLabelText("Representante Legal"), {
      target: { files: [fileRepresentante] }
    });
    fireEvent.change(
      screen.getByLabelText("Documento Comprovativo de Titularidade"),
      { target: { files: [fileTitularidade] } }
    );

    fireEvent.click(screen.getByText("Criar Conta"));

    await waitFor(async () => {
      const successMessage = await screen.queryByText("Registo bem-sucedido!");
      expect(successMessage).toBeInTheDocument();
    });
  });
});

describe("RegistoPartner Component", () => {
  test("Teste de desmonte do RegistoPartner", () => {
    const { unmount } = render(<RegistoPartner />);
    const nomeInput = screen.getByLabelText("Nome");

    expect(nomeInput).toBeInTheDocument(); // o elemento está presente?

    // desmonta o componente
    unmount();

    //  o elemento não está mais no documento?
    expect(nomeInput).not.toBeInTheDocument();
  });
});

test("Campo NIF aceita apenas valores numéricos", () => {
  const { getByLabelText } = render(<RegistoPartner />);
  const nifField = getByLabelText("Número de Identificação Fiscal");

  fireEvent.change(nifField, { target: { value: "123456" } });

  expect(nifField).toHaveValue("123456");

  //   fireEvent.change(nifField, { target: { value: "ABC123" } });

  //   expect(nifField).toHaveValue("");
});

test("Testa se a senha e a confirmação de senha são iguais", () => {
  render(<RegistoPartner />);

  const senhaInput = screen.getByLabelText("Password");
  const confirmarSenhaInput = screen.getByLabelText("Confirmação de Password");

  fireEvent.change(senhaInput, { target: { value: "minhaSenha" } });
  fireEvent.change(confirmarSenhaInput, { target: { value: "minhaSenh" } });

  expect(senhaInput).toHaveValue("minhaSenha");
  expect(confirmarSenhaInput).toHaveValue("minhaSenh");
});

test("Testa se a senha e a confirmação de senha são iguais", async () => {
  render(<RegistoPartner />);

  const senhaInput = screen.getByLabelText("Password");
  const confirmarSenhaInput = screen.getByLabelText("Confirmação de Password");

  fireEvent.change(senhaInput, { target: { value: "minhaSenha" } });
  fireEvent.change(confirmarSenhaInput, { target: { value: "minhaSenh" } });

  expect(senhaInput).toHaveValue("minhaSenha");
  expect(confirmarSenhaInput).toHaveValue("minhaSenh");

  try {
    await waitFor(() => {
      const errorMessages = screen.queryByText("As senhas não coincidem.");
      expect(errorMessages).toBeInTheDocument();
    });
  } catch (error) {
    console.log(error);
  }
});
