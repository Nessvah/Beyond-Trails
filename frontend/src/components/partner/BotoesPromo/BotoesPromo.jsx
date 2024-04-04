import ButtonLaranja from "../../BotaoLaranja/ButtonLaranja";

const Style = {
  MenuPromo: {
    display: "flex",
    justifyContent: "center"
  }
};

function BotoesPromo() {
  return (
    <section className='container col-8 mx-auto'>
      <section
        className='menuPromo mt-4 mx-5 text-center'
        style={Style.MenuPromo}>
        <ButtonLaranja label='Criar Promoção' />
        <ButtonLaranja label='Atualizar Promoção' />
        <ButtonLaranja label='Apagar Promoção' />
        <ButtonLaranja label='Todas' />
      </section>
    </section>
  );
}

export default BotoesPromo;
