import image1 from "../../../../assets/images/promocoes/image2DeletePromo.png";
import image2 from "../../../../assets/images/promocoes/deletePromo.png";
import InfoSection from "../../InfoSection/InfoSection";

function DeletePromotionsSection() {
  const title = "Apagar Promoções";
  const description = "Aqui poderá eliminar as suas promoções disponíveis.";

  return (
    <InfoSection
      imgUrl1={image1}
      imgUrl2={image2}
      title={title}
      description={description}
    />
  );
}

export default DeletePromotionsSection;
