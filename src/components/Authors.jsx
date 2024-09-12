import { gql, useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
//For the author select
import Select from "react-select";

const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`;

const EDIT_AUTHOR = gql`
    mutation editAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            name
            born
            bookCount
        }
    }
`;

const Authors = ({ show }) => {
    const { loading, error, data } = useQuery(ALL_AUTHORS);
    const [selectedAuthor, setSelectedAuthor] = useState(null);
    const [born, setBorn] = useState("");

    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
        onError: (error) => {
            console.error(error.message);
        },
    });

    if (!show) {
        return null;
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const authorOptions = data.allAuthors.map((author) => ({
        value: author.name,
        label: author.name,
    }));

    const submit = (event) => {
        event.preventDefault();

        if (!selectedAuthor) {
            console.log("No author selected");
            return;
        }

        editAuthor({
            variables: {
                name: selectedAuthor.value,
                setBornTo: parseInt(born),
            },
        });

        setSelectedAuthor(null);
        setBorn("");
    };

    return (
        <div>
            <h2>Authors</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Born</th>
                        <th>Books</th>
                    </tr>
                </thead>
                <tbody>
                    {data.allAuthors.map((author) => (
                        <tr key={author.name}>
                            <td>{author.name}</td>
                            <td>{author.born ? author.born : "Unknown"}</td>
                            <td>{author.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>Set birthyear</h3>
            <form onSubmit={submit}>
                <div style={{ display: "flex", gap: "10px", alignItems: "baseline" }}>
                    <p>Select author</p>
                    <Select value={selectedAuthor} onChange={setSelectedAuthor} options={authorOptions} />
                </div>
                <div style={{ display: "flex", gap: "10px", alignItems: "baseline" }}>
                    <p>Born</p>
                    <input type="number" value={born} onChange={({ target }) => setBorn(target.value)} />
                </div>
                <button type="submit">Update author</button>
            </form>
        </div>
    );
};

export default Authors;
