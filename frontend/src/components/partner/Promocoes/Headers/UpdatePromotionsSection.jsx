import image1 from "../../../../assets/images/promocoes/promo-Updat.png";
import image2 from "../../../../assets/images/promocoes/3updateProm.png";
import InfoSection from "../../InfoSection/InfoSection";

function UpdatePromotionsSection() {
  const title = "Que Promoção desejaria atualizar";

  return <InfoSection imgUrl1={image1} imgUrl2={image2} title={title} />;
}

export default UpdatePromotionsSection;
