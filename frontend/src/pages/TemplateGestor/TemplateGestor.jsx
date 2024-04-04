import { Outlet } from "react-router-dom";
import { UserRole } from "../../helpers/enums";
import NavComponent from "../../components/NavbarComp/NavComp";
import Footer from "../../components/FooterComp/Footer";

function TemplateGestor() {
  return (
    <div className='App'>
      <NavComponent role={[UserRole.Manager]} />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default TemplateGestor;
