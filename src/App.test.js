/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from "react";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import { useWeatherData } from "./hooks/useWeatherData";
import "@testing-library/jest-dom";

jest.mock("./hooks/useWeatherData");
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
  ToastContainer: () => <div>ToastContainer</div>,
}));

useWeatherData.mockImplementation(() => ({
  data: null,
  error: null,
  isLoading: true,
}));

test("shows a loader when weather data is loading", () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
  expect(screen.getByTestId("app-loader")).toBeInTheDocument();
});
