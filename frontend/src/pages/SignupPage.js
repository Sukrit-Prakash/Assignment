import AuthForm from '../components/AuthForm';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function SignupPage() {
  const { signup } = useContext(AuthContext);
  const nav = useNavigate();
  const onSubmit = async (u, email, pw) => {
    await signup(u, email, pw);
    nav('/wishlists');
  };
  return (
    <div>
      <h2>Sign Up</h2>
      <AuthForm onSubmit={onSubmit} submitLabel="Sign Up" />
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
