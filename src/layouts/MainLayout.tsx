import { Outlet, Link } from "react-router"
import defaultClass from "./mainLayout.module.css";

function MainLayout() {
  return (
    <div className={defaultClass.layout}>
      <header className={defaultClass.header}>
        <h1 className={defaultClass.title}>Pokedex</h1>
      </header>
      <nav className={defaultClass.nav}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add">Add Pokemon</Link>
          </li>
        </ul>
      </nav>
      <main className={defaultClass.container}>
        <Outlet></Outlet>
      </main>
      <footer className={defaultClass.footer}>
        <p>Supinfo</p>
      </footer>
    </div>
  )
}

export default MainLayout