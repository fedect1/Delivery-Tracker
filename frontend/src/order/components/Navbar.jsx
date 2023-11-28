import { useAuthStore } from "../../hooks/useAuthStore"

export const Navbar = () => {

  const {user, startLogout} = useAuthStore();
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
        <span className="navbar-brand mb-0 h1"><i className="fas fa-solid fa-user"></i>
        &nbsp;
        {user?.name}
        </span>

        <button className="btn btn-outline-danger" onClick={ startLogout }>
            <i className="fas fa-solid fa-sign-out-alt"></i>
            &nbsp;
            Logout
        </button>
    </div>
  )
}


