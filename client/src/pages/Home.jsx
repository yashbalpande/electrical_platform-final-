// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function getBookmarks() {
  return JSON.parse(localStorage.getItem("bookmarked_questions") || "[]");
}
function setBookmarks(arr) {
  localStorage.setItem("bookmarked_questions", JSON.stringify(arr));
}

function getNotes(id) {
  return localStorage.getItem(`notes_${id}`) || "";
}
function setNotes(id, note) {
  localStorage.setItem(`notes_${id}`, note);
}

function Home() {
  const [problems, setProblems] = useState([]);
  const [bookmarks, setBookmarksState] = useState(getBookmarks());
  const [showNotes, setShowNotes] = useState(null); // id or null
  const [noteText, setNoteText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/api/problems")
      .then((res) => res.json())
      .then((data) => setProblems(data))
      .catch((err) => console.error("Error fetching problems:", err));
  }, []);

  const toggleBookmark = (id) => {
    let updated;
    if (bookmarks.includes(id)) {
      updated = bookmarks.filter((b) => b !== id);
    } else {
      updated = [...bookmarks, id];
    }
    setBookmarksState(updated);
    setBookmarks(updated);
  };

  const openNotes = (id) => {
    setShowNotes(id);
    setNoteText(getNotes(id));
  };
  const saveNotes = () => {
    setNotes(showNotes, noteText);
    setShowNotes(null);
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#222', paddingBottom: 64 }}>
      {/* Hero Section */}
      <section style={{ width: '100%', padding: '48px 0 32px 0', background: 'linear-gradient(90deg, #646cff 0%, #24243e 100%)', color: '#fff', textAlign: 'center' }}>
        <h1 style={{ fontSize: 56, fontWeight: 800, margin: 0 }}>Welcome to Circuit Solver</h1>
        <p style={{ fontSize: 22, margin: '24px auto', maxWidth: 700 }}>
          The interactive platform for learning, designing, and simulating electronic circuits. Solve real-world challenges, experiment with virtual components, and master electronics hands-on!
        </p>
        {/* Animated Coding Hero Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '32px 0' }}>
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ animation: 'spin 3s linear infinite' }}>
            <circle cx="60" cy="60" r="54" stroke="#ffe066" strokeWidth="8" fill="#23234a" />
            <path d="M40 80 Q60 40 80 80" stroke="#646cff" strokeWidth="6" fill="none"/>
            <circle cx="60" cy="60" r="10" fill="#646cff" stroke="#fff" strokeWidth="3"/>
            <rect x="52" y="30" width="16" height="8" rx="4" fill="#ffe066"/>
            <rect x="52" y="82" width="16" height="8" rx="4" fill="#ffe066"/>
            <rect x="30" y="52" width="8" height="16" rx="4" fill="#ffe066"/>
            <rect x="82" y="52" width="8" height="16" rx="4" fill="#ffe066"/>
          </svg>
          <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
        </div>
      </section>
      {/* All Questions Table Section */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 16px' }}>
        <h2 style={{ fontSize: 40, fontWeight: 700, marginBottom: 32, textAlign: 'center' }}>All Questions</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#181818', color: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 12px #0006' }}>
            <thead>
              <tr style={{ background: '#23234a', color: '#ffe066', fontSize: 20 }}>
                <th style={{ padding: 16, textAlign: 'left' }}>#</th>
                <th style={{ padding: 16, textAlign: 'left' }}>Title</th>
                <th style={{ padding: 16, textAlign: 'left' }}>Short Description</th>
                <th style={{ padding: 16, textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {problems.map((q, idx) => (
                <tr key={q.id} style={{ borderBottom: '1px solid #333' }}>
                  <td style={{ padding: 12, fontWeight: 600 }}>{idx + 1}</td>
                  <td style={{ padding: 12, fontWeight: 600 }}>{q.title}</td>
                  <td style={{ padding: 12, color: '#bbb', fontSize: 15 }}>{q.description.split('\n')[0].replace('Challenge:', '').slice(0, 90)}...</td>
                  <td style={{ padding: 12, textAlign: 'center' }}>
                    <Link to={`/problems/${q.id}`} style={{ background: '#646cff', color: '#fff', borderRadius: 8, padding: '6px 16px', textDecoration: 'none', fontWeight: 600, marginRight: 8 }}>Solve</Link>
                    <button onClick={() => navigate(`/solutions/${q.id}`)} style={{ background: '#ffe066', color: '#222', borderRadius: 8, padding: '6px 16px', fontWeight: 600, border: 'none', marginRight: 8 }}>Solution</button>
                    <button onClick={() => openNotes(q.id)} style={{ background: '#23234a', color: '#ffe066', borderRadius: 8, padding: '6px 16px', fontWeight: 600, border: 'none', marginRight: 8 }}>Notes</button>
                    <button onClick={() => toggleBookmark(q.id)} style={{ background: bookmarks.includes(q.id) ? '#ffe066' : '#23234a', color: bookmarks.includes(q.id) ? '#222' : '#ffe066', borderRadius: 8, padding: '6px 16px', fontWeight: 600, border: 'none' }}>{bookmarks.includes(q.id) ? 'Bookmarked' : 'Bookmark'}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {/* Notes Modal */}
      {showNotes && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#000a', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#23234a', padding: 32, borderRadius: 12, minWidth: 320, maxWidth: 400 }}>
            <h2 style={{ color: '#ffe066', marginBottom: 16 }}>Notes for {problems.find(p => p.id === showNotes)?.title}</h2>
            <textarea
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
              style={{ width: '100%', height: 120, background: '#1e1e1e', color: '#fff', fontSize: 16, borderRadius: 6, padding: 8 }}
              placeholder="Write your notes here..."
            />
            <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button onClick={saveNotes} style={{ background: '#ffe066', color: '#222', borderRadius: 8, padding: '8px 24px', fontWeight: 700, border: 'none' }}>Save</button>
              <button onClick={() => setShowNotes(null)} style={{ background: '#23234a', color: '#ffe066', borderRadius: 8, padding: '8px 24px', fontWeight: 700, border: 'none' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
