import { useState } from "react";
import { gql, useQuery } from "@apollo/client";

const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            author {
                name
            }
            published
            genres
        }
    }
`;

const Books = ({ show }) => {
    const [genre, setGenre] = useState(null); // Estado para el género seleccionado
    const { loading, error, data } = useQuery(ALL_BOOKS);

    if (!show) {
        return null;
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const genres = ["programming", "design", "crime", "classics"]; // Lista de géneros
    const books = data.allBooks;

    // Filtrar libros en función del género seleccionado
    const filteredBooks = genre ? books.filter((book) => book.genres.includes(genre)) : books;

    return (
        <div>
            <h2>Books</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Published</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBooks.map((book) => (
                        <tr key={book.title}>
                            <td>{book.title}</td>
                            <td>{book.author.name}</td>
                            <td>{book.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                {genres.map((g) => (
                    <button key={g} onClick={() => setGenre(g)}>
                        {g.charAt(0).toUpperCase() + g.slice(1)}
                    </button>
                ))}
                <button onClick={() => setGenre(null)}>All Genres</button>
            </div>
        </div>
    );
};

export default Books;
