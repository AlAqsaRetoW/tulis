import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';
import useRegister from '../hooks/useRegister';

function RegisterPage() {
  const { user, loading } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (confirmPassword == password) {
        await useRegister(name, email, password)
        Swal.fire({
          title: 'Congrats!',
          text: 'User successfully created',
          icon: 'success',
        });
        navigate('/login');
      }
      else {
        Swal.fire({
          title: 'Try again!',
          text: 'Password did not match',
          icon: "error",
        });
      }
    } catch (err) {
      console.error(err);

      let errorMessage;

      if (err.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
        errorMessage = 'Password should be at least 6 characters';
      } else if (err.message === 'Firebase: Error (auth/email-already-in-use).') {
        errorMessage = 'Email is already in use, please use another email';
      } else {
        errorMessage = err.message;
      }
      Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
      });
    } finally {
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  };

  useEffect(() => {
    if (user && !loading) {
      navigate('/admin');
    }
  }, [navigate, user, loading]);

  if (loading) (<h1>Loading, please wait..</h1>);

  return (
    <>
      {/* <!-- Register Page Start --> */}
      <div className="grid grid-cols-6 gap-5 mt-5 max-w-screen-xl mx-auto">
        <div className="col-span-3 flex justify-center items-center">
          <h1 className="text-5xl font-bold leading-normal">
            Register Account
          </h1>
        </div>
        <div className="col-span-3 px-20 min-h-[calc(100vh-200px)] flex flex-col justify-center">
          <form className="w-full" onSubmit={handleRegister}>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Name"
                className="p-3 border border-gray-300 rounded-md"
                value={name}
                minLength={2}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col mt-5">
              <input
                type="text"
                placeholder="Email"
                className="p-3 border border-gray-300 rounded-md"
                value={email}
                pattern='[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col mt-5">
              <input
                type="password"
                placeholder="Password"
                className="p-3 border border-gray-300 rounded-md"
                value={password}
                minLength={6}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col mt-5">
              <input
                type="password"
                placeholder="Confirm Password"
                className="p-3 border border-gray-300 rounded-md"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              className=" bg-sky-700 rounded-lg py-3 px-2 w-full text-white font-bold mt-5"
              type="submit"
            >
              Register
            </button>
          </form>
          <div className="justify-center mt-3 text-center">
            Already have an account?
            <Link
              to="/login"
              className="underline hover:text-sky-700">
              Login here
            </Link>
          </div>
        </div>
      </div>
      {/* <!-- Register Page End --> */}
    </>
  )
}

export default RegisterPage