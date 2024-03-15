import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-primary-custom">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="jumbotron bg-white p-5 rounded">
              <h1 className="display-4 text-black">Bienvenue sur MyObjectifs!</h1>
              <p className="lead text-black">Ceci est une simple page d&apos;accueil pour notre application MyObjectifs.</p>
              <hr className="my-4 text-black" />
              <p className="text-black">Utilisez cette application pour gérer vos objectifs, connectez-vous, ou si c&apos;est pour la première fois, inscrivez-vous.</p>
              <div className="d-flex flex-column flex-md-row justify-content-center">
                <Link className="btn btn-primary btn-lg mb-2 mb-md-0" to="/login" role="button">Se connecter</Link>
                <Link className="btn btn-secondary btn-lg ms-md-2 mb-2 mb-md-0" to="/register" role="button">S&apos;inscrire</Link>
                <Link className="btn btn-success btn-lg ms-md-2" to="/goals" role="button">Ajouter ou Voir les Objectifs</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
