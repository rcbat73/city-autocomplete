import React from "react";
import { render, screen } from "@testing-library/react";
import CityData from "./CityData";
import { optionsMock } from "../../testMocks/mocks";

describe("CityData", () => {
  test("should display the correct number of rows", async () => {
    const selectedOption = "city 1";
    const cities = optionsMock.filter(({ name }) => name === selectedOption);
    render(<CityData data={optionsMock} selectedOption={selectedOption} />);
    const table = screen.getAllByRole("listitem");

    expect(cities.length).toEqual(table.length - 1);
  });
});
