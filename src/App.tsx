import "./App.css";
import Navbar from "./components/NavBar";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
    return (
        <>
            <div>
                {/* <LoginPage /> */}
                <RegisterPage />
                <LoginPage />
                <Navbar />
                <LandingPage />
                <div>

                </div>
            </div>
        </>
    );
}

export default App;
