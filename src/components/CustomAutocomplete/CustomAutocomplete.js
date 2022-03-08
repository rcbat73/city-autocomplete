import React from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import Autocomplete from "@mui/material/Autocomplete";

const OptionItem = styled("li")({
  textAlign: "left",
});

const CustomAutocomplete = React.forwardRef(
  (
    {
      name,
      label,
      placeholder,
      required,
      onAutocompleteChange,
      onAutocompleteInputChange,
      onInputChange,
      options,
      size,
      width,
      loadingText,
      ...remainingProps
    },
    ref
  ) => {
    return (
      <Autocomplete
        disablePortal
        options={options}
        getOptionLabel={(option) => option.name}
        sx={{ width }}
        loading
        loadingText={loadingText}
        onChange={onAutocompleteChange}
        onInputChange={onAutocompleteInputChange}
        renderOption={(props, option) => {
          return <OptionItem {...props}>{option.name}</OptionItem>;
        }}
        {...remainingProps}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            name={name}
            onChange={onInputChange}
            placeholder={placeholder}
            required={required}
            size={size}
          />
        )}
      />
    );
  }
);

export default React.memo(CustomAutocomplete);
