import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ProblemDetail from "./pages/ProblemDetail";
import Blog from "./pages/Blog";
import SignIn from "./pages/SignIn";
import About from "./pages/About";
import EmbeddedQuestionDetail from "./pages/EmbeddedQuestionDetail";

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: '#222', color: '#fff', fontFamily: 'system-ui' }}>
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 48px', background: '#181818', borderBottom: '2px solid #333' }}>
          <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: 1 }}>Circuit Solver</div>
          <nav style={{ display: 'flex', gap: 32, fontSize: 18 }}>
            <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
            <Link to="/blog" style={{ color: '#fff', textDecoration: 'none' }}>Blog</Link>
            <Link to="/about" style={{ color: '#fff', textDecoration: 'none' }}>About</Link>
            <Link to="/signin" style={{ color: '#fff', textDecoration: 'none', border: '1px solid #fff', borderRadius: 6, padding: '4px 16px' }}>Sign In</Link>
          </nav>
        </header>
        <main style={{ maxWidth: 900, margin: '0 auto', padding: '32px 16px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/problems/:id" element={<ProblemDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/embedded/:id" element={<EmbeddedQuestionDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
