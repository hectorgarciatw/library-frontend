import { gql, useQuery } from "@apollo/client";

const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            author {
                name
            }
            published
        }
    }
`;

const Books = ({ show }) => {
    const { loading, error, data } = useQuery(ALL_BOOKS);

    if (!show) {
        return null;
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

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

export default Books;
