import placeholderImg from "../../assets/images/avatar-placeholder.png";
import { useAuth } from "../../hook/useAuth";
import { UserActions } from "../../context/AuthContext";

export const UserDropMenu = () => {
  const { userName, dispatch } = useAuth();
  return (
    <div className='dropdown mb-3 '>
      <a
        href='#'
        className='d-flex align-items-center text-white text-decoration-none dropdown-toggle'
        data-bs-toggle='dropdown'
        aria-expanded='false'>
        <img
          src={placeholderImg}
          alt=''
          width='32'
          height='32'
          className='rounded-circle me-2 '
        />
        <strong className='ps-3'>{userName}</strong>
      </a>

      <ul className='dropdown-menu dropdown-menu-dark shadow mb-3 bg-dark text-white fs-4'>
        <li>
          <a className='dropdown-item' href='#'>
            Settings
          </a>
        </li>
        <li>
          <a className='dropdown-item' href='#'>
            Profile
          </a>
        </li>

        <li>
          <a
            href='#'
            className='dropdown-item'
            onClick={() => dispatch({ type: UserActions.LOGOUT })}>
            Sign out
          </a>
        </li>
      </ul>
    </div>
  );
};
