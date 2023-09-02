import React from "react";
import ReactDOM from "react-dom";
import "./home.css";
import { Link } from "react-router-dom";
import Footer from "../../components/TestComponent/Footer/Footer";


function Home() {
  return (
    <>
      <header className="homeheader">
     
        <h1 className="headline">Meal-Sharing</h1>
      </header>
      <div className="content">
        <p className="intro">
        The hope is that as more and more people start food sharing and leaving reviews, 
        they’ll help separate the good from the bad.
         It’s important to be aware, though, that many contributors might not be compliant with food regulations.  <br />
          Book your table now that the exprience will leave you with cherished
          memories. creating an extraordinary dining experience for you and your
          loved ones. <br />
          <button className="to-meals">
            <Link to={"/meal"}>
               Go to Meals
            </Link>
          </button>
        </p>
      </div>
      <Footer />
    </>
  );
}

export default Home;