import { useQuery, gql } from "@apollo/client";
import React from "react";

// The query filter by genre
const ALL_BOOKS = gql`
    query allBooks($genre: String) {
        allBooks(genre: $genre) {
            title
            author {
                name
            }
            published
        }
    }
`;

const Recommend = ({ show }) => {
    if (!show) {
        return null;
    }

    // Get the favorite genre from the localStorage
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    const favoriteGenre = loggedUser?.favoriteGenre || "";

    // The query by genre
    const { loading, error, data } = useQuery(ALL_BOOKS, {
        variables: { genre: favoriteGenre },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h2>Recommendations</h2>
            <p>
                books in your favorite genre <b>{favoriteGenre}</b>
            </p>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Published</th>
                    </tr>
                </thead>
                <tbody>
                    {data.allBooks.map((book) => (
                        <tr key={book.title}>
                            <td>{book.title}</td>
                            <td>{book.author.name}</td>
                            <td>{book.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Recommend;
