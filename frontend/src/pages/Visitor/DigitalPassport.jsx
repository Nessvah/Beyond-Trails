import { useEffect, useState } from "react";
import DigitalPassHeader from "../../components/DigitalPassHeader/DigitalPassHeader";
import FullScreenColored from "../../components/FullScreenColored";
import Button from "../../components/Button";
import "../Visitor/digital.scss";

function DigitalPassport() {
  // keep track of btns active state
  // this component will handle the state of the buttons and
  // pass it down to children trough props

  const [activeBtnIndex, setActiveBtnIndex] = useState("Todas");
  const [data, setData] = useState([]);

  useEffect(() => {
    const wrap = async () => {
      const result = await getData(activeBtnIndex);
      setData(result);
    };
    wrap();
  }, [activeBtnIndex]);

  async function getData(service) {
    if (service !== "Todas") {
      const resp = await fetch(
        `http://${process.env.REACT_APP_API}/api/users/services?service=${service}`
      );
      return resp.json();
    } else {
      return { msg: "frontend" };
      // const resp = await fetch(
      //   `http://${process.env.REACT_APP_API}/api/users/services?service=hotelaria`
      // );
      // return resp.json();
    }
  }

  const renderButtons = () => {
    const services = [
      "Todas",
      "Artesanato",
      "Hotelaria",
      "Restauração",
      "Pesca"
    ];
    const btns = [];

    for (let i = 0; i < services.length; i++) {
      btns.push(
        <Button
          text={services[i]}
          btnStyle={"outline-secondary"}
          key={i}
          isBtnActive={activeBtnIndex === services[i]}
          onClick={() => {
            setActiveBtnIndex(services[i]);
            getData(services[i]);
          }}
          topic={services[i]}
        />
      );
    }

    return btns;
  };

  return (
    <main className='mt-5'>
      <DigitalPassHeader />
      <FullScreenColored bgColor={"primary"}>
        <div className='container px-4'>
          <div className='mb-5 promo-section__heading'>
            <h3 className='text-white'>Troca os teus pontos por promoções</h3>
          </div>
          <div className='d-flex flex-column gap-4 flex-sm-row promo-section__btns'>
            {renderButtons()}
          </div>

          {/* Rendering data here */}
          <section
            id='cards-section'
            className='position-relative mt-5 d-flex flex-column justify-content-start align-items-center flex-sm-row flex-wrap gap-sm-5 cards-section'>
            {/* Iterate through objects */}
            {Object.keys(data).map((key, index) => {
              return (
                <div key={index}>
                  <h4 className='text-white'>
                    {key}: {data[key]}
                  </h4>
                </div>
              );
            })}

            {/* iterate throught array avoiding map is not a function error */}
            {/* {Array.isArray(data) && data.length > 0 ? (
              <p className='text-white' key={data._id}>
                {data.tipoEntidade}
              </p>
            ) : (
              <p className='text-white'>Still no data</p>
            )} */}
          </section>

          {/* Pagination ?? */}
          <div className='d-flex gap-3 ps-4 ps-sm-0 text-secondary cards__see-more'>
            <p>Pág. 1/1</p>
            <a href='#' className='text-decoration-underline text-secondary'>
              Ver mais <i className='bi bi-arrow-right' />
            </a>
          </div>
        </div>
      </FullScreenColored>
    </main>
  );
}

export default DigitalPassport;
