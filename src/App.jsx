import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const App = () => {
    const [page, setPage] = useState("authors");

    const handleBookAdded = () => {
        setPage("books");
    };

    return (
        <div>
            <div>
                <button onClick={() => setPage("authors")}>authors</button>
                <button onClick={() => setPage("books")}>books</button>
                <button onClick={() => setPage("add")}>add book</button>
            </div>

            <Authors show={page === "authors"} />

            <Books show={page === "books"} />

            <NewBook show={page === "add"} onBookAdded={handleBookAdded} />
        </div>
    );
};

export default App;
