import CardGeralPT from "../CardComp/CardGeralPT";
import FullScreenColored from "../FullScreenColored";

function CardSectionGeralPT({ data }) {
  return (
    <FullScreenColored bgColor={"primary"} txtColor={"white"}>
      <CardGeralPT data={data} />
    </FullScreenColored>
  );
}

export default CardSectionGeralPT;
