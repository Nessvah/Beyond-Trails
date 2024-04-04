import ImageLeftTextRight from "../../ImageLeftTextRight/ImageLeftTextRight";
import imagemAjuda from "../../../assets/images/home-parceiros/foto5.png";
function SeccaoAjuda() {
  return (
    <div>
      <ImageLeftTextRight
        title='Precisa de Ajuda?'
        text='Para suporte ou dúvidas, entre em contato conosco através do info@beyondtrails.pt ou +351 961 500 233. Estamos aqui para ajudar!'
        imgUrl={imagemAjuda}
      />
    </div>
  );
}

export default SeccaoAjuda;
