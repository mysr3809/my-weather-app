/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";
import TemperatureDisplay from "./TemperatureDisplay";
import "@testing-library/jest-dom";

describe("TemperatureDisplay", () => {
  beforeAll(() => {
    const currentDate = new Date("2024-03-29T00:00:00Z");
    jest.useFakeTimers().setSystemTime(currentDate);
  });

  it("renders correctly and displays the correct date range and average temperature", () => {
    const averageTemperature = 23.5;

    const { getByText } = render(
      <TemperatureDisplay averageTemperature={averageTemperature} />
    );

    expect(getByText(/MARCH 29 - APRIL 8 2024/i)).toBeInTheDocument();
    expect(
      getByText(Math.round(averageTemperature).toString())
    ).toBeInTheDocument();
    expect(getByText("°C")).toBeInTheDocument();
  });
});
