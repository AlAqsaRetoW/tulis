import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import registerUser from "../hooks/useRegister";

function RegisterPage() {
  const { user, loading } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (confirmPassword == password) {
        await registerUser(name, email, password);
        Swal.fire({
          title: "Congrats!",
          text: "User successfully created",
          icon: "success",
        });
        navigate("/login");
      } else {
        Swal.fire({
          title: "Try again!",
          text: "Password did not match",
          icon: "error",
        });
      }
    } catch (err) {
      console.error(err);

      let errorMessage;

      if (
        err.message ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        errorMessage = "Password should be at least 6 characters";
      } else if (
        err.message === "Firebase: Error (auth/email-already-in-use)."
      ) {
        errorMessage = "Email is already in use, please use another email";
      } else {
        errorMessage = err.message;
      }
      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
      });
    } finally {
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
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
      {/* <!-- Register Page Start --> */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-5 mt-5 max-w-screen-xl mx-auto px-4">
        <div className="lg:col-span-3 flex justify-center items-center py-10 lg:py-0">
          <h1 className="text-4xl lg:text-5xl font-bold leading-normal theme-text text-center">
            Register Account
          </h1>
        </div>
        <div className="lg:col-span-3 lg:px-20 min-h-[calc(100vh-200px)] flex flex-col justify-center">
          <form className="w-full" onSubmit={handleRegister}>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Name"
                className="p-3 theme-border theme-bg-surface theme-text border rounded-lg hover:theme-border-hover focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                value={name}
                minLength={2}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col mt-5">
              <input
                type="email"
                placeholder="Email"
                className="p-3 theme-border theme-bg-surface theme-text border rounded-lg hover:theme-border-hover focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                value={email}
                pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col mt-5">
              <input
                type="password"
                placeholder="Password"
                className="p-3 theme-border theme-bg-surface theme-text border rounded-lg hover:theme-border-hover focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                value={password}
                minLength={6}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col mt-5">
              <input
                type="password"
                placeholder="Confirm Password"
                className="p-3 theme-border theme-bg-surface theme-text border rounded-lg hover:theme-border-hover focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              className="theme-accent-bg theme-accent-hover rounded-lg py-3 px-2 w-full text-white font-bold mt-5 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02]"
              type="submit"
            >
              Register
            </button>
          </form>
          <div className="justify-center mt-3 text-center theme-text-secondary">
            Already have an account?{" "}
            <Link
              to="/login"
              className="theme-accent underline hover:no-underline transition-all duration-300"
            >
              Login here
            </Link>
          </div>
        </div>
      </div>
      {/* <!-- Register Page End --> */}
    </>
  );
}

export default RegisterPage;
