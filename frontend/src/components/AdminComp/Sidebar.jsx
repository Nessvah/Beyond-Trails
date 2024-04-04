import { Link, Outlet } from "react-router-dom";
import { UserDropMenu } from "../UserDropMenuComp/UserDropMenu";

export const Sidebar = () => {
  return (
    <div className='row flex-row'>
      <div className='d-flex flex-column flex-shrink-0 p-3 bg-primary text-white min-vh-100 gap-5 col-2'>
        <header className='pt-5'>
          <Link to='/'>
            <h3 className='text-white'>
              Beyond <span className='text-secondary'>Trails</span>
            </h3>
          </Link>
        </header>

        <ul className='nav nav-pills flex-column mb-auto pt-5'>
          <li className='py-2'>
            <Link
              to='/admin'
              className='nav-link text-white bg-white rounded text-dark '>
              <p className='fs-2'>Gestores</p>
            </Link>
          </li>
          <li>
            <a href='#' className='nav-link text-white'>
              <p className='fs-2'>Serviços</p>
            </a>
          </li>
          <li>
            <a href='#' className='nav-link text-white'>
              <p className='fs-2'>Visitantes</p>
            </a>
          </li>
          <li>
            <a href='#' className='nav-link text-white'>
              <p className='fs-2'>Desempenho</p>
            </a>
          </li>
        </ul>

        <UserDropMenu />
      </div>

      <Outlet />
    </div>
  );
};
