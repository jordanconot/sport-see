const NavBar = () => {
  return (
    <>
      <nav className="container_nav_vertical">
        <div className="container_column">
          <img className="logo_nav_vertical" src="../src/assets/svg/logo_nav_zen.svg"></img>
          <img className="logo_nav_vertical" src="../src/assets/svg/logo_nav_swim.svg"></img>
          <img className="logo_nav_vertical" src="../src/assets/svg/logo_nav_bike.svg"></img>
          <img className="logo_nav_vertical" src="../src/assets/svg/logo_nav_pull_up.svg"></img>

        </div>
          <p className="cp">Copiryght, SportSee 2020</p>
      </nav>
      <header className="container_nav_horizontal">
        <div className="container_row">
          <img
            className="logo_sport_see"
            src="../src/assets/svg/logo_nav_sport_see.svg" alt="SportSee"
          />
          <a href="#" className="nav_link">Accueil</a>
          <a href="#" className="nav_link">Profil</a>
          <a href="#" className="nav_link">Réglage</a>
          <a href="#" className="nav_link">Communauté</a>
        </div>
      </header>
    </>
  );
};

export default NavBar;
