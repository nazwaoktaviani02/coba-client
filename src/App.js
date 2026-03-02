import { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  //GET
  const fetchNotes = async () => {
    const res = await fetch("http://localhost:5000/notes");
    const data = await res.json();
    setNotes(data);
  };


  //POST
  const addNote = async () => {
    if (!title || !content) return;

    await fetch("http://localhost:5000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, author }),
    });

    setTitle("");
    setContent("");
    setAuthor("");
    fetchNotes();
  };

  //UPDATE
  const handleEdit = (note) => {
    setTitle(note.title);
    setAuthor(note.author);
    setContent(note.content);
    setEditingId(note._id)
  };

  const updateNote = async () => {
    if (!title || !content) return;
    await fetch(`http://localhost:5000/notes/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, author }),
    });

    setTitle("");
    setContent("");
    setAuthor("");
    setEditingId(null);
    fetchNotes();

  };

  //DELETE
  const deleteNote = async (id) => {
    await fetch(`http://localhost:5000/notes/${id}`, {
      method: "DELETE",
    });

    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6f9",
        padding: "60px 20px",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            marginBottom: "30px",
            fontSize: "32px",
            fontWeight: "700",
            color: "#222",
          }}
        >
          My Reading Tracker
        </h1>

        {/* FORM */}
        <div
          style={{
            background: "#ffffff",
            padding: "80px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
            marginBottom: "30px",
          }}
        >
          <input
            placeholder="Book's Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              fontSize: "14px",
            }}
          />

          <input
            placeholder="Book's Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              fontSize: "14px",
            }}
          />

          <textarea
            placeholder="Your notes here!"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              fontSize: "14px",
              minHeight: "80px",
            }}
          />

          <button
            onClick={editingId ? updateNote : addNote}
            style={{
              background: "#4f46e5",
              color: "white",
              padding: "10px 18px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
            }}
          > {editingId ? "Update Note" : "Create New"}
          </button>
        </div>

        {/* NOTES */}
        {notes.map((note) => (
          <div
            key={note._id}
            style={{
              background: "#ffffff",
              padding: "20px",
              borderRadius: "16px",
              boxShadow: "0 6px 15px rgba(0,0,0,0.04)",
              marginBottom: "20px",
              transition: "0.2s",
            }}
          >

            <h3 style={{ marginBottom: "8px", color: "#222" }}>
              Title: {note.title}
            </h3>

            <p style={{ marginBottom: "8px", color: "#222" }}>
              Author: {note.author}
            </p>

            <p style={{ marginBottom: "10px", color: "#555" }}>
              Notes: {note.content}
            </p>

            <small style={{ color: "#888" }}>
              📅 Created: {new Date(note.createdAt).toLocaleString()}
            </small>

            <div style={{ marginTop: "12px" }}>
              <button
                onClick={() => handleEdit(note)}
                style={{
                  background: "orange",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "12px",
                  marginRight: "10px",
                }}
              >
                Edit
              </button>

              <button
                onClick={() => deleteNote(note._id)}
                style={{
                  background: "#ef4444",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

};
export default App;