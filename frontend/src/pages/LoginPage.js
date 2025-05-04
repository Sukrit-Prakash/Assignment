import AuthForm from '../components/AuthForm';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const onSubmit = async (_, email, pw) => {
    await login(email, pw);
    nav('/wishlists');
  };
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Please sign in to continue</p>
        </div>
        <form className="auth-form">
          <AuthForm onSubmit={onSubmit} submitLabel="Login" />
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
