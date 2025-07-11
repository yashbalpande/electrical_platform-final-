// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

/**
 * @typedef {Object} Problem
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} [hint]
 * @property {string} diagram
 * @property {string} simulationLink
 */

// Default equipment lists for known problems
// const equipmentMap = {
//   "rc-timer": [
//     "1x 330Ω Resistor",
//     "1x 1000μF Capacitor",
//     "1x LED",
//     "1x Arduino Uno",
//     "Jumper wires"
//   ],
//   "rlc-filter": [
//     "1x R (Resistor)",
//     "1x L (Inductor)",
//     "1x C (Capacitor)",
//     "1x Arduino Uno",
//     "Speaker or Buzzer",
//     "Jumper wires"
//   ]
//   // Add more as needed
// };

function ProblemDetail() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/api/problems/${id}`)
      .then((res) => res.json())
      .then(setProblem);
  }, [id]);

  if (!problem) return <div style={{ padding: 32 }}>Loading...</div>;

  return (
    <div style={{ padding: 32 }}>
      <Link to="/">← Back to Problems</Link>
      <h1 style={{ fontSize: 32, fontWeight: 700, margin: '24px 0 12px 0' }}>{problem.title}</h1>
      {problem.diagram && (
        <img src={problem.diagram} alt={problem.title} style={{ maxWidth: 400, borderRadius: 12, margin: '16px 0' }} />
      )}
      <pre style={{ whiteSpace: "pre-wrap", background: "#222", padding: 16, borderRadius: 8, fontSize: 18 }}>{problem.description}</pre>
      {problem.hint && (
        <details style={{ margin: '16px 0' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Hint</summary>
          <pre style={{ whiteSpace: "pre-wrap", background: "#333", padding: 12, borderRadius: 6 }}>{problem.hint}</pre>
        </details>
      )}
      {problem.equipment && (
        <div style={{ margin: '24px 0', background: '#181818', padding: 16, borderRadius: 8 }}>
          <h2>Required Equipment</h2>
          <ul>
            {problem.equipment.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      {problem.simulationLink ? (
        <div style={{ marginTop: 24 }}>
          <h2>Simulator</h2>
          <iframe
            src={problem.simulationLink}
            width="800"
            height="400"
            title="Circuit Simulator"
            style={{ border: "1px solid #ccc", background: '#fff' }}
            allowFullScreen
          />
          <div>
            <a href={problem.simulationLink} target="_blank" rel="noopener noreferrer">
              Open Simulation in New Tab
            </a>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: 24, color: '#aaa' }}>
          <em>No simulator available for this question.</em>
        </div>
      )}
    </div>
  );
}

export default ProblemDetail;