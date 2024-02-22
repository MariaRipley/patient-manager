import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <Link to="/">
        <h1 className="texr-2xl font-bold">Task Manager</h1>
      </Link>
      <ul className="flex gap-x-2">
        <li>
          <Link to={"/login"}>Login</Link>
        </li>
        <li>
          <Link to={"/register"}>Register</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
