import { Routes, Route } from "react-router-dom";
import Template from "./Template/Template";
import HomePage from "./Homepage";
import HistoricoPontos from "./HistoricoPontos";

import CastelosEMuseus from "./PontosTuristicos/CastelosEMuseus";
import PatrimonioReligioso from "./PontosTuristicos/PatrimonioReligioso";
import PontosNaturais from "./PontosTuristicos/PontosNaturais";
import Alojamento from "./ServicosTuristicos/Alojamento";
import Artesanato from "./ServicosTuristicos/Artesanato";
import Restauracao from "./ServicosTuristicos/Restauracao";
import Eventos from "./PaginaEventos";
import ErrorPage from "./Error/ErrorPage";
import Evento from "./Evento";
import DigitalPassport from "./Visitor/DigitalPassport";
import TemplateParceiro from "./TemplateParceiro/TemplateParceiro";
import HomePageParceiro from "./partner/Home/HomepageParceiro";
import QrCode from "./partner/QrCodePage/QrCode";
import ListPromotionsComp from "../components/partner/Promocoes/ListManagerPromo/ListPromotionsComp";
import FeedbackPage from "./partner/FeedPage/FeedbackPage";
import { PontoTuristico } from "./PontosTuristicos/PontoTuristico";
import { PontoNatural } from "./PontosTuristicos/PontoNat";
import { Patrimonio } from "./PontosTuristicos/Patrimonio";
import { ArtesanatoEspecifico } from "./ServicosTuristicos/ArtesanatoEspecifico";
import { AlojamentoEspecifico } from "./ServicosTuristicos/AlojamentoEspecifico";
import { RestauracaoEspecifico } from "./ServicosTuristicos/RestauracaoEspecifico";
import ListManagersComp from "../components/AdminComp/ListManagersComp/ListManagersComp";
import { Sidebar } from "../components/AdminComp/Sidebar";
import UpdatePromotionForm from "../components/partner/Promocoes/ListManagerPromo/Update";
import InfoPartnerPage from "./partner/InformacoesPage/InfoPage";
import UpdateManagerForm from "../components/AdminComp/ListManagersComp/UpdateManagerForm";
/* import Beneficios from "./partner/BeneficiosPage/Beneficios"; */
/* import VerMaisPT from "./VerMaisPT/VerMaisPT"; */

import InformacaoUtil from "./InformacaoUtil/InformacaoUtil";
import ImageGallery from "../components/Galeria/Galeria";

import TemplateGestor from "./TemplateGestor/TemplateGestor";
import ListEventsComp from "../components/gestor/Eventos/ListGestorEvents/ListEventsComp";
import UpdateEventForm from "../components/gestor/Eventos/ListGestorEvents/Update";
import FormEvents from "../components/gestor/Eventos/ListGestorEvents/FormEvent";
/* import FormPontos from "../components/gestor/PontosTuristicos/FormPontos"; */
import FormServicos from "../components/gestor/ServicosTuristicos/FormServicos";
import HomepageGestor from "./HomepageGestor";
import BotaoSelecionado from "../components/Registo/BotaoSelecionado";

function MyRoot() {
  return (
    <Routes>
      {/* ROUTES PUBLIC ACCESS / NO AUTH NEEDED */}
      <Route path='/' element={<Template />}>
        <Route index element={<HomePage />} />

        {/* DIGITAL PASSPORT */}
        <Route
          path='/passaporte-digital/pontuacao'
          element={<DigitalPassport />}
        />
        <Route
          path='/passaporte-digital/historico-pontos'
          element={<HistoricoPontos />}
        />

        {/* TOURISM SITES */}
        <Route path='patrimonio-religioso' element={<PatrimonioReligioso />} />
        <Route path='patrimonio-religioso/:nome' element={<Patrimonio />} />
        <Route path='castelos-museus' element={<CastelosEMuseus />} />
        <Route path='castelos-museus/:nome' element={<PontoTuristico />} />
        <Route path='pontos-naturais' element={<PontosNaturais />} />
        <Route path='pontos-naturais/:nome' element={<PontoNatural />} />

        {/* SERVICES / PARTNERS */}
        <Route path='alojamento' element={<Alojamento />} />
        <Route path='alojamento/:nome' element={<AlojamentoEspecifico />} />
        <Route path='artesanato' element={<Artesanato />} />
        <Route path='artesanato/:nome' element={<ArtesanatoEspecifico />} />
        <Route path='restauracao' element={<Restauracao />} />
        <Route path='restauracao/:nome' element={<RestauracaoEspecifico />} />

        {/* EVENTS */}
        <Route path='eventos' element={<Eventos />} />
        <Route path='eventos/:id' element={<Evento />} />

        {/* FOOTER LINKS
            UTIL INFO,
            TERMS OF USE,
            ETC...      */}

        <Route path='/informacao-util' element={<InformacaoUtil />} />
        <Route path='/galeria' element={<ImageGallery />} />
        {/* ERROR PAGE IF THERE'S NO MATCH */}
        <Route path='*' element={<ErrorPage />} />
      </Route>

      {/* RESTRICTED ACCESS / NEED AUTH  */}
      {/* SERVICES / PARTNERS */}

      <Route path='/parceiro' element={<TemplateParceiro />}>
        <Route index element={<HomePageParceiro />}></Route>
        <Route path='promocoes' element={<ListPromotionsComp />}></Route>
        <Route path='promocoes/:id' element={<UpdatePromotionForm />}></Route>
        <Route path='/parceiro/feedbacks' element={<FeedbackPage />}></Route>
        <Route
          path='/parceiro/informacoes/:id'
          element={<InfoPartnerPage></InfoPartnerPage>}></Route>
        {/* <Route path='/parceiro/promocoes' element={<Promocoes />}></Route>
       
        */}
        <Route path='registo-codigo-visitante' element={<QrCode />}></Route>
        <Route
          path='/parceiro/desempenho'
          element={<BotaoSelecionado></BotaoSelecionado>}></Route>
        <Route path='*' element={<ErrorPage />}></Route>
      </Route>

      {/* RESTRICTED ACCESS / NEED AUTH  */}
      {/* ADMIN DASHBOARD */}

      <Route path='/admin' element={<Sidebar />}>
        <Route index element={<ListManagersComp />} />
        <Route path='edit/:id' element={<UpdateManagerForm />}></Route>

        {/* <Route path="desempenho" element={<></>}></Route> */}
      </Route>

      <Route path='*' element={<ErrorPage />}></Route>

      {/*GESTOR */}
      <Route path='/gestor' element={<TemplateGestor />}>
        <Route index element={<HomepageGestor />} />

        {/*route path para os eventos*/}

        <Route path='eventos' element={<ListEventsComp />}></Route>
        <Route path='eventos/edit' element={<UpdateEventForm />}></Route>

        <Route path='eventos' element={<FormEvents />}></Route>

        {/*route path para os pontos turisticos*/}
        <Route path='pontos-turisticos' element={<Alojamento />}></Route>

        {/*route path para os serviços turisticos*/}
        <Route path='servicos-turisticos' element={<FormServicos />}></Route>

        {/* <Route path="desempenho" element={<></>}></Route> */}
      </Route>
      <Route path='*' element={<ErrorPage />}></Route>
    </Routes>
  );
}

export default MyRoot;
