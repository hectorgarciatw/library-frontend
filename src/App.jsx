import { useState, useEffect } from "react";
//Components
import Navbar from "./components/Navbar";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";

const App = () => {
    const [page, setPage] = useState("authors");
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Aquí puedes cargar el estado del usuario desde localStorage o un API
        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
        setUser(loggedUser);
    }, []);

    const handleBookAdded = () => {
        setPage("books");
    };

    const handleLogin = (userData) => {
        setUser(userData);
        localStorage.setItem("loggedUser", JSON.stringify(userData));
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("loggedUser");
    };

    return (
        <div>
            <Navbar setPage={setPage} user={user} onLogout={handleLogout} />
            {page === "login" ? (
                <LoginForm onLogin={handleLogin} />
            ) : user ? (
                <>
                    <NewBook show={page === "add"} onBookAdded={handleBookAdded} />
                </>
            ) : null}
            <>
                <Books show={page === "books"} />
                <Authors show={page === "authors"} />
            </>
        </div>
    );
};

export default App;
