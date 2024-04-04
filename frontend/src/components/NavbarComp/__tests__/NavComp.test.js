import NavComponent from "../NavComp";
import "@testing-library/jest-dom";
import { userEvent } from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { UserRole } from "../../../helpers/enums";
import { BrowserRouter } from "react-router-dom";

describe("Navbar Component", () => {
  it("Clicking the user icon should reveal the login link and redirect us to the login page", async () => {
    const user = userEvent.setup();

    // we need to wrap our component in the browserrouter since we are
    // using it for Links
    render(
      <BrowserRouter>
        <NavComponent role={UserRole.NotAuthenticated} />
      </BrowserRouter>
    );
    screen.debug();

    // first see if the login is null / don't appear initially on the page
    // thats why I use query and not get, get would throw an error if it was null
    const loginLink = screen.queryByText("Login");
    expect(loginLink).toBeNull();

    // we need to find the icon first that leads to the Login
    // I gave a aria-label for my icon so that it's testable and helps
    // with accessibility for impaired users
    const loginIcon = screen.getByLabelText("press for login");

    // simulate the click of a user
    await user.click(loginIcon);

    // after the user clicks it, the link needs to be visible
    const visibleLoginLink = screen.getByText("Login");
    expect(visibleLoginLink).toBeInTheDocument();

    // now we simulate a click on the 'Login' link and
    // asssert if it navigate to another page
    await user.click(visibleLoginLink);
    expect(window.location.pathname).toBe("/login");
  });

  it('should only reveal the "como funciona" link for not authenticated users', async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <NavComponent role={UserRole.NotAuthenticated} />
      </BrowserRouter>
    );
    screen.debug();

    
    // the passaporte button (a tag with role of button) needs to be present in the document
    const passaporteLink = screen.getByRole("button", {
      name: /passaporte digital/i
    });
    expect(passaporteLink).toBeInTheDocument();

    // simulate click
    await user.click(passaporteLink);

    // test the two links that can't appear to unauthenticated users
    const passaporteDigitalLink = screen.queryByRole("button", {
      name: /minha pontuação/i
    });
    const rewardsLink = screen.queryByRole("button", {
      name: /histórico de pontos/i
    });
    expect(passaporteDigitalLink).not.toBeInTheDocument();
    expect(rewardsLink).not.toBeInTheDocument();
  });
});
