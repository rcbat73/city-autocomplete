import { styled } from "@mui/system";

const RowsContainer = styled("ul")({
  padding: 0,
  listStyle: "none",
});

const Row = styled("li")({
  display: "flex",
  "&:nth-of-type(1)": {
    backgroundColor: "#bfeefb",
    borderRadius: "3px",
  },
});

const Cell = styled("span")(({ props }) => ({
  padding: "0 4px",
  width: "90px",
  textAlign: props,
  fontSize: "0.7em",
  "@media (min-width: 425px)": {
    width: "120px",
  },
  "@media (min-width: 640px)": {
    width: "200px",
  },
}));

const CityData = ({ data, selectedOption }) => {
  return (
    <RowsContainer>
      <Row align="center">
        <Cell>COUNTRY</Cell>
        <Cell>SUBCOUNTRY</Cell>
        <Cell>GEONAMEID</Cell>
      </Row>
      {data
        .filter(({ name }) => name === selectedOption)
        .map(({ country, subcountry, geonameid }) => {
          return (
            <Row key={geonameid} align="left">
              <Cell>{country}</Cell>
              <Cell>{subcountry}</Cell>
              <Cell>{geonameid}</Cell>
            </Row>
          );
        })}
    </RowsContainer>
  );
};

export default CityData;
