// import Header from "../../../HeaderComp/Header";
import image1 from "../../../../assets/images/rewards/coupon.png";
import image2 from "../../../../assets/images/promocoes/deletePromo.png";
import InfoSection from "../../InfoSection/InfoSection";

function VerHeader() {
  const title = "Promoções";
  const description =
    "Aqui poderá visualizar as suas promoções com facilidade e rapidez";

  return (
    <InfoSection
      imgUrl1={image1}
      imgUrl2={image2}
      title={title}
      description={description}
    />
  );
}

export default VerHeader;
