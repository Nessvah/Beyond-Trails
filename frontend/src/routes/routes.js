import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";

/**
 * Import components and pages to render routes
 */

import Template from "../pages/Template/Template";
import HomePage from "../pages/Homepage";
import Login from "../components/Login/Login";
import HistoricoPontos from "../pages/HistoricoPontos";
import InformacaoUtil from "../pages/InformacaoUtil/InformacaoUtil";
import Alojamento from "../pages/ServicosTuristicos/Alojamento";
import Artesanato from "../pages/ServicosTuristicos/Artesanato";
import Restauracao from "../pages/ServicosTuristicos/Restauracao";
import Eventos from "../pages/PaginaEventos";
import ErrorPage from "../pages/Error/NotFound";
import ErrorBoundary from "../pages/Error/ErrorPage";
import Evento from "../pages/Evento";
import DigitalPassport from "../pages/Visitor/DigitalPassport";
import TemplateParceiro from "../pages/TemplateParceiro/TemplateParceiro";
import HomePageParceiro from "../pages/partner/Home/HomepageParceiro";
import QrCode from "../pages/partner/QrCodePage/QrCode";
import ListPromotionsComp from "../components/partner/Promocoes/ListManagerPromo/ListPromotionsComp";
import FeedbackPage from "../pages/partner/FeedPage/FeedbackPage";
import ListManagersComp from "../components/AdminComp/ListManagersComp/ListManagersComp";
import { Sidebar } from "../components/AdminComp/Sidebar";
import { UpdateManagerForm } from "../components/AdminComp/ListManagersComp/UpdateManagerForm";
import TemplateGestor from "../pages/TemplateGestor/TemplateGestor";
import HomepageGestor from "../pages/HomepageGestor";
import ListPontos from "../components/gestor/PontosTuristicos/ListPontos";
import { Rewards } from "../pages/Rewards";
import PontosTuristicos from "../pages/PontosTuristicos/PontosTurísticos";
import PontoTuristicoUnico from "../pages/PontosTuristicos/PontoTuristicoUnico";

/**
 * Import actions and loaders for each route needed
 */

import { ProtectedRoute } from "./ProtectedRoute";
import { UserRole } from "../helpers/enums";
import ResetPassword from "../components/ResetPassword";
import BotaoSelecionado from "../components/Registo/BotaoSelecionado";
import InfoPartnerPage from "../pages/partner/InformacoesPage/InfoPage";
import HistoricoRegisto from "../components/partner/Beneficios/HistoricoRegisto";
import ConsultarDesempenho from "../components/partner/ConsultarDesempenho/Consultar";
import PerfilVisitante from "../components/PerfilVisitante/PerfilVisitante";
import UpdatePromotionForm from "../components/partner/Promocoes/ListManagerPromo/Update";
import DesempenhoPage from "../pages/partner/ConsultarDesempenho.jsx/ConsultarDesempenho";
import TeamComponent from "../components/TeamComponent/TeamComponent";
import UserProfileForm from "../components/partner/Informacoes/Update";

import ListEventsComp from "../components/gestor/Eventos/ListGestorEvents/ListEventsComp";
import UpdateEventForm from "../components/gestor/Eventos/ListGestorEvents/Update";
import { UpdatePtForm } from "../components/gestor/PontosTuristicos/UpdatePtForm";
import ListServicos from "../components/gestor/ServicosTuristicos/ListServicos";
import Galeria from "../components/Galeria";
import ImageGallery from "../components/Galeria/Galeria";

/**
 * Convert Route Componentes into Route Data Api - new and recommended way for react router
 * react router dom - v6
 */

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* ROUTES PUBLIC ACCESS / NO AUTH NEEDED */}
      <Route path='/' element={<Template />} errorElement={<ErrorBoundary />}>
        <Route index element={<HomePage />} />
        <Route path='/segue-nos' element={<TeamComponent />}></Route>
        <Route path='/login' element={<Login />} />
        <Route path='/reset-password/:id/:token' element={<ResetPassword />} />
        <Route path='/registo' element={<BotaoSelecionado />} />
        {/* DIGITAL PASSPORT */}
        <Route element={<ProtectedRoute roles={[UserRole.Visitor]} />}>
          <Route
            path='/passaporte-digital/pontuacao'
            element={<DigitalPassport />}
          />
          <Route
            path='/passaporte-digital/historico-pontos'
            element={<HistoricoPontos />}
          />
          <Route path='/perfil' element={<PerfilVisitante />} />
        </Route>

        <Route path='como-funciona' element={<Rewards />} />

        {/* TOURISM SITES */}

        <Route path='pontos_turisticos' element={<PontosTuristicos />}></Route>
        <Route
          path='pontos_turisticos/:cardId'
          element={<PontoTuristicoUnico />}
        />

        {/* SERVICES / PARTNERS */}
        <Route path='/alojamento' element={<Alojamento />} />
        <Route path='/artesanato' element={<Artesanato />} />
        <Route path='/restauracao' element={<Restauracao />} />

        {/* EVENTS IN THE CITY */}
        <Route path='eventos' element={<Eventos />} />
        <Route path='/eventos/:id' element={<Evento />} />
        <Route path='/galeria' element={<ImageGallery />} />
        {/* FOOTER LINKS
            UTIL INFO,
            TERMS OF USE,
            ETC...      */}

        <Route path='/informacao-util' element={<InformacaoUtil />} />

        {/* ERROR PAGE IF THERE'S NO MATCH */}
        <Route path='*' element={<ErrorPage />} />
      </Route>

      {/* RESTRICTED ACCESS / NEED AUTH  */}
      {/* SERVICES / PARTNERS */}
      <Route element={<ProtectedRoute roles={[UserRole.Partner]} />}>
        <Route path='/parceiro' element={<TemplateParceiro />}>
          <Route index element={<HomePageParceiro />} />
          <Route path='promocoes' element={<ListPromotionsComp />} />
          <Route path='promocoes/:id' element={<UpdatePromotionForm />} />
          <Route path='feedbacks' element={<FeedbackPage />} />

          <Route
            path='/parceiro/informacoes'
            element={<UserProfileForm />}></Route>
          {/* <Route path='/parceiro/promocoes' element={<Promocoes />}></Route>
        <Route path="/parceiro/informacoes" element={<></>}></Route>
        */}
          <Route path='validar-codigo' element={<QrCode />} />
          {/* <Route
            path='/parceiro/desempenho'
            element={<PaginaPrincipal />}></Route> */}
          <Route
            path='/parceiro/desempenho'
            element={<DesempenhoPage />}></Route>
          <Route
            path='/parceiro/desempenho/:partnerId'
            element={<HistoricoRegisto />}></Route>
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Route>

      {/* RESTRICTED ACCESS / NEED AUTH  */}
      {/* ADMIN DASHBOARD */}

      <Route element={<ProtectedRoute roles={[UserRole.Admin]} />}>
        <Route path='/admin' element={<Sidebar />}>
          <Route index element={<ListManagersComp />} />
          <Route path='edit/:id' element={<UpdateManagerForm />} />

          {/* <Route path="desempenho" element={<></>}></Route> */}
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Route>

      <Route path='/gestor' element={<TemplateGestor />}>
        <Route index element={<HomepageGestor />} />

        {/*route path para os eventos*/}
        <Route path='eventos' element={<ListEventsComp />}></Route>
        <Route path='eventos/:id' element={<UpdateEventForm />}></Route>

        {/*route path para os pontos turisticos*/}
        <Route path='pontos-turisticos' element={<ListPontos />}></Route>
        <Route path='pontos_turisticos/:id' element={<UpdatePtForm />}></Route>

        {/*route path para os serviços turisticos*/}

        <Route path='servicos-turisticos' element={<ListServicos />}></Route>
      </Route>
    </>
  )
);
