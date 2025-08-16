import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { successAlert, errorAlert } from "../utils/Swal";
import { AuthContext } from "../context/AuthContext";
import loginUser from "../hooks/useLogin";
import { useGoogleLogin as googleLogin } from "../hooks/useGooglelogin";
// import GoogleLogo from '../assets/google-logo.svg';

function LoginPage() {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      setEmail("");
      setPassword("");
      successAlert("Success!", "Logged in");
      navigate("/admin");
    } catch (err) {
      setPassword("");
      errorAlert("Error!", err.customMessage);
    }
  };

  const handleGoolgeLogin = async () => {
    try {
      await googleLogin();
      navigate("/admin");
    } catch (err) {
      errorAlert("Error!", err.customMessage);
    }
  };

  useEffect(() => {
    if (user && !loading) {
      navigate("/admin");
    }
  }, [navigate, user, loading]);

  if (loading) <h1>Loading, please wait..</h1>;

  return (
    <>
      {/* <!-- Login Page Start --> */}
      <div className="grid grid-cols-6 gap-5 max-w-screen-xl mx-auto">
        <div className="col-span-3 flex justify-center items-center">
          <h1 className="text-5xl font-bold">Login</h1>
        </div>
        <div className="col-span-3 px-20 min-h-[calc(100vh-200px)] flex flex-col justify-center">
          <form className="w-full" onSubmit={handleLogin}>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Email"
                className="p-3 border border-gray-300 rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col mt-5">
              <input
                type="password"
                placeholder="Password"
                className="p-3 border border-gray-300 rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              className=" bg-sky-700 rounded-lg py-3 px-2 w-full text-white font-bold mt-5 cursor-pointer"
              type="submit"
            >
              Login
            </button>
          </form>
          <div className="flex items-center mt-5">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-gray-300">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          <button
            className="bg-white border border-gray-300 rounded-lg py-3 px-2 w-full text-black font-bold mt-5 cursor-pointer"
            type="submit"
            onClick={handleGoolgeLogin}
          >
            Sign In with Google
          </button>

          <div className="justify-center mt-3 text-center">
            Don't have an account?
            <Link to="/register" className="underline hover:text-sky-700">
              Register here
            </Link>
          </div>
        </div>
      </div>
      {/* <!-- Login Page End --> */}
    </>
  );
}

export default LoginPage;
