import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import CustomAutocomplete from "./CustomAutocomplete";
import { optionsMock } from "../../testMocks/mocks";

const textFieldTestId = "input";

const TestableAutocomplete = () => (
  <CustomAutocomplete name={textFieldTestId} options={optionsMock} />
);

const runBefore = () => {
  const typedValue = "city 1";
  const availableOptions = optionsMock
    .filter((option) => option.name.includes(typedValue))
    .map((option) => option.name);
  render(<TestableAutocomplete />);
  const autocomplete = screen.getByRole("textbox");
  autocomplete.focus();
  fireEvent.change(autocomplete, { target: { value: typedValue } });
  return { autocomplete, availableOptions };
};

describe("Autocomplete", () => {
  test("should display the correct number of options", async () => {
    const { availableOptions } = runBefore();
    const options = await screen.findAllByRole("option");

    expect(options.length).toEqual(availableOptions.length);
  });

  test("should select the the correct item from the options", async () => {
    const { autocomplete, availableOptions } = runBefore();
    fireEvent.keyDown(autocomplete, { key: "ArrowDown" });
    fireEvent.keyDown(autocomplete, { key: "Enter" });

    expect(autocomplete.value).toEqual(availableOptions[0]);
  });

  test("should clear the selected option if clear button is clicked", async () => {
    const { autocomplete, availableOptions } = runBefore();
    fireEvent.keyDown(autocomplete, { key: "ArrowDown" });
    fireEvent.keyDown(autocomplete, { key: "Enter" });

    expect(autocomplete.value).toEqual(availableOptions[0]);

    const clearButton = await screen.findByTitle("Clear");
    fireEvent.click(clearButton);

    expect(autocomplete.value).toEqual("");
  });
});
