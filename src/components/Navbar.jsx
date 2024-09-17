import React from "react";

const Navbar = ({ setPage, user, onLogout }) => {
    return (
        <div>
            <button onClick={() => setPage("authors")}>Authors</button>
            <button onClick={() => setPage("books")}>Books</button>
            {user ? (
                <>
                    <button onClick={() => setPage("add")}>Add Book</button>
                    <button onClick={() => setPage("recommend")}>Recommend</button>
                    <button onClick={onLogout}>Logout</button>
                </>
            ) : (
                <button onClick={() => setPage("login")}>Login</button>
            )}
        </div>
    );
};

export default Navbar;
