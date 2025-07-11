// @ts-nocheck
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

const embeddedQuestions = {
  "embedded-q1": {
    title: "Embedded Systems: LED Blinking",
    description: "Write a program to blink an LED connected to a microcontroller at 1Hz frequency. Use timer interrupts to achieve accurate timing. Show your code and explain how the timer is configured.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    simulationLink: "https://wokwi.com/projects/new?template=arduino"
  }
};

function getSubmissions(questionId) {
  const data = localStorage.getItem(`embedded_submissions_${questionId}`);
  return data ? JSON.parse(data) : [];
}

function saveSubmission(questionId, code) {
  const submissions = getSubmissions(questionId);
  const newSubmission = {
    code,
    timestamp: new Date().toLocaleString()
  };
  submissions.unshift(newSubmission);
  localStorage.setItem(`embedded_submissions_${questionId}`, JSON.stringify(submissions));
}

export default function EmbeddedQuestionDetail() {
  const { id } = useParams();
  const question = embeddedQuestions[id];
  const [code, setCode] = useState("");
  const [submissions, setSubmissions] = useState(getSubmissions(id));
  const [message, setMessage] = useState("");

  if (!question) return <div style={{ padding: 32 }}>Question not found.</div>;

  const handleSubmit = () => {
    saveSubmission(id, code);
    setSubmissions(getSubmissions(id));
    setMessage("Submission saved!");
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div style={{ padding: 32 }}>
      <Link to="/">← Back to Home</Link>
      <h1 style={{ fontSize: 32, fontWeight: 700, margin: '24px 0 12px 0' }}>{question.title}</h1>
      <img src={question.image} alt={question.title} style={{ maxWidth: 400, borderRadius: 12, margin: '16px 0' }} />
      <pre style={{ whiteSpace: "pre-wrap", background: "#222", padding: 16, borderRadius: 8, fontSize: 18 }}>{question.description}</pre>
      <div style={{ margin: '24px 0', background: '#222', padding: 16, borderRadius: 8 }}>
        <strong>Instructions:</strong>
        <div style={{ marginTop: 8 }}>
          Write your code below and submit it. If a simulator is available, use it to test your code. Otherwise, test on your hardware and upload a screenshot or video if required.<br />
          <span style={{ color: '#aaa' }}>
            (Optional: You may share your code or a video of the working circuit if asked by an instructor.)
          </span>
        </div>
      </div>
      {/* Code Editor and Submission */}
      <div style={{ marginTop: 32, background: '#181818', padding: 16, borderRadius: 8 }}>
        <h2>Code Editor</h2>
        <textarea
          value={code}
          onChange={e => setCode(e.target.value)}
          style={{ width: '100%', height: 120, background: '#1e1e1e', color: '#fff', fontSize: 16, borderRadius: 6, padding: 8 }}
          placeholder="Write your embedded C/Arduino code here..."
        />
        <div style={{ marginTop: 12 }}>
          <button onClick={handleSubmit} style={{ background: '#ffe066', color: '#222', borderRadius: 8, padding: '10px 32px', fontWeight: 700, fontSize: 18, border: 'none' }}>Submit</button>
          {message && <span style={{ marginLeft: 16, color: '#0f0' }}>{message}</span>}
        </div>
      </div>
      {/* Previous Submissions */}
      <div style={{ marginTop: 32, background: '#222', padding: 16, borderRadius: 8 }}>
        <h2>Previous Submissions</h2>
        {submissions.length === 0 ? (
          <div>No submissions yet.</div>
        ) : (
          <ul>
            {submissions.map((sub, idx) => (
              <li key={idx} style={{ marginBottom: 12 }}>
                <div><strong>{sub.timestamp}</strong></div>
                <div><strong>Code:</strong> <pre style={{ display: 'inline', whiteSpace: 'pre-wrap', color: '#fff' }}>{sub.code}</pre></div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Simulator if available */}
      {question.simulationLink && (
        <div style={{ marginTop: 32 }}>
          <h2>Simulator</h2>
          <iframe
            src={question.simulationLink}
            width="800"
            height="400"
            title="Embedded Simulator"
            style={{ border: "1px solid #ccc", background: '#fff' }}
            allowFullScreen
          />
          <div>
            <a href={question.simulationLink} target="_blank" rel="noopener noreferrer">
              Open Simulation in New Tab
            </a>
          </div>
        </div>
      )}
      {/* Upload instructions if no simulator */}
      {!question.simulationLink && (
        <div style={{ marginTop: 32, background: '#222', padding: 16, borderRadius: 8 }}>
          <strong>No online simulator available for this question.</strong>
          <div style={{ marginTop: 8 }}>
            Please test your code on your hardware and upload a screenshot or video as proof of completion if required.
          </div>
        </div>
      )}
    </div>
  );
} 