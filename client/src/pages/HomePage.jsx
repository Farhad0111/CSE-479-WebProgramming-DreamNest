import Categories from "../components/Categories";
import Listings from "../components/Listings";
import Navbar from "../components/Navbar";
import Slide from "../components/Slide";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <div>
      <Navbar />
      <Slide />
      <Categories />
      <Listings />
      <Footer />
    </div>
  );
}

export default HomePage;
