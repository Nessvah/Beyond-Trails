import { Outlet } from "react-router-dom";
import NavComponent from "../../components/NavbarComp/NavComp";
import Footer from "../../components/FooterComp/Footer";
import { UserRole } from "../../helpers/enums";
function Template() {
  return (
    <div className='App'>
      <NavComponent role={[UserRole.NotAuthenticated]} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Template;
