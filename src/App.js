import logo from './logo.svg';
import './App.css';
import { useState } from 'react'; 
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { useEffect } from 'react'; 
import { app } from './firebase'; 

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // State to track if user is in registration mode
  const [user, setUser] = useState(null); 
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="form-container">
          <h2>{isRegistering ? 'Register' : 'Login'}</h2>
          <form onSubmit={isRegistering ? handleEmailSignUp : handleEmailLogin}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className="primary-button">{isRegistering ? 'Register' : 'Login'}</button>
          </form>
          {!isRegistering && <button onClick={handleGoogleLogin} className="google-button">Login with Google</button>}
          <button onClick={() => setIsRegistering(!isRegistering)} className="switch-button">
            {isRegistering ? 'Already have an account? Login' : 'New user? Register'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
