import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const ADD_BOOK = gql`
    mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(title: $title, author: $author, published: $published, genres: $genres) {
            title
            author {
                name
            }
            published
            genres
        }
    }
`;

const NewBook = (props) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [published, setPublished] = useState("");
    const [genre, setGenre] = useState("");
    const [genres, setGenres] = useState([]);

    const [addBook] = useMutation(ADD_BOOK, {
        onCompleted: () => {
            props.onBookAdded();
        },
        onError: (error) => {
            console.error("Error adding book:", error.message);
        },
    });

    if (!props.show) {
        return null;
    }

    const submit = async (event) => {
        event.preventDefault();
        try {
            await addBook({
                variables: {
                    title,
                    author,
                    published: parseInt(published, 10),
                    genres,
                },
            });

            // Cleaning fields
            setTitle("");
            setPublished("");
            setAuthor("");
            setGenres([]);
            setGenre("");
        } catch (error) {
            console.error("Error adding book:", error.message);
        }
    };

    const addGenre = () => {
        if (genre && !genres.includes(genre)) {
            setGenres(genres.concat(genre));
            setGenre("");
        }
    };

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    <label>Title</label>
                    <input value={title} onChange={({ target }) => setTitle(target.value)} />
                </div>
                <div>
                    <label>Author</label>
                    <input value={author} onChange={({ target }) => setAuthor(target.value)} />
                </div>
                <div>
                    <label>Published</label>
                    <input type="number" value={published} onChange={({ target }) => setPublished(target.value)} />
                </div>
                <div>
                    <label>Genre</label>
                    <input value={genre} onChange={({ target }) => setGenre(target.value)} />
                    <button onClick={addGenre} type="button">
                        Add Genre
                    </button>
                </div>
                <div>Genres: {genres.join(", ")}</div>
                <button type="submit">Create Book</button>
            </form>
        </div>
    );
};

export default NewBook;
