import { render, screen, waitFor, act } from "@testing-library/react";
import ListServicos from "../ListServicos";

// Mock the API function needed for testing
jest.mock("../../../../utils/servicosApiCalls.mjs", () => ({
  getVerifiedPartners: jest.fn(() => Promise.resolve([]))
}));

describe("ListServicos Component", () => {
  it("renders without errors", async () => {
    await act(async () => {
      render(<ListServicos />);
    });

    // Check if the component renders without errors
    expect(
      screen.getByText("Gestão de registos de Serviços Turísticos")
    ).toBeInTheDocument();
  });

  it("fetches and displays data", async () => {
    const fakeSTData = [
      {
        _id: "1",
        name: "Test Service 1"
      },
      {
        _id: "2",
        name: "Test Service 2"
      }
    ];

    // Mock the API function to return fake data
    require("../../../../utils/servicosApiCalls.mjs").getVerifiedPartners.mockResolvedValue(
      fakeSTData
    );

    render(<ListServicos />);

    // Wait for the component to fetch and display data
    waitFor(() => {
      expect(screen.getByText("Test Service 1")).toBeInTheDocument();
      expect(screen.getByText("Test Service 2")).toBeInTheDocument();
    });
  });
});
