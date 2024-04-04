import SeccaoSobre from "../components/SobreNos/SeccaoSobre";
import Galeria from "../components/Galeria";
import SeccaoDestaques from "../components/Destaques/SeccaoDestaques";
import Video from "../components/Video";
import SeccaoRoteiro from "../components/Roteiros/SeccaoRoteiros";

function HomePage() {
  return (
    <div className='HomePage'>
      <Video />
      <SeccaoSobre />
      <SeccaoDestaques />
      <SeccaoRoteiro />
      <Galeria />
    </div>
  );
}

export default HomePage;
