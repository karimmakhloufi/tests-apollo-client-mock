import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { GET_LAUNCHES } from "./App";
import App from "./App";

test("loading", () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <App />
    </MockedProvider>
  );
  expect(screen.queryByText(/Loading/i)).toBeInTheDocument();
});

test("date", async () => {
  render(
    <MockedProvider
      mocks={[
        {
          request: {
            query: GET_LAUNCHES,
          },
          result: {
            data: {
              launches: [
                {
                  launch_date_utc: "Tuesday, November 23, 2021",
                  launch_success: true,
                  details: "details",
                },
              ],
            },
          },
        },
      ]}
      addTypename={false}
    >
      <App />
    </MockedProvider>
  );

  const element = await waitFor(() =>
    screen.getByText("Tuesday, November 23, 2021")
  );
  expect(element).toBeInTheDocument();
});

test("error", async () => {
  render(
    <MockedProvider
      mocks={[
        {
          request: {
            query: GET_LAUNCHES,
          },
          result: {
            errors: [new Error("Error!")],
          },
        },
      ]}
      addTypename={false}
    >
      <App />
    </MockedProvider>
  );

  const element = await waitFor(() => screen.getByText("Error :("));
  expect(element).toBeInTheDocument();
});
