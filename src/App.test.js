import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import App from "./App";

const mocks = [];

test("renders learn react link", () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );
  expect(screen.queryByText(/Loading/i)).toBeInTheDocument();
});
