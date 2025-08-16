import Logo from "./assets/tulis-logo.png";

function App() {
  return (
    <div className="container mx-auto mt-5">
      {/* <!-- Navbar Start --> */}
      <div className="flex gap-3 items-center">
        <img width={100} src={Logo} alt="Tulis Logo" className="theme-logo" />
        <div className="flex gap-3 ml-auto">
          <a
            href="/"
            className="text-sky-700 px-4 py-2 rounded-full font-semibold"
          >
            Home
          </a>
          <a
            href="/"
            className="text-sky-700 px-4 py-2 rounded-full font-semibold"
          >
            Register
          </a>
          <a
            href="/"
            className="text-sky-700 px-4 py-2 rounded-full font-semibold"
          >
            Login
          </a>
          <button className="text-sky-700 px-4 py-2 rounded-full font-semibold">
            Logout
          </button>
        </div>
      </div>
      <hr className="mt-5 border-gray-300" />
      {/* <!-- Navbar End --> */}

      {/* <!-- Admin Page Start --> */}
      <main className="my-5 max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold mt-5">Welcome, Admin</h1>
      </main>
      {/* <!-- Admin Page End --> */}

      {/* <!-- Home Page Start --> */}
      <main className="my-5 max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold mt-5">Alat Tulis</h1>
        <div className="grid grid-cols-7 gap-3 mt-10">
          <div className="border border-gray-300 rounded-lg p-4">
            <img
              src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/634/1163412_PE890172_S4.webp"
              alt="Kupu-kupu"
              className="w-full h-64 object-cover rounded-md"
            />
            <h2 className="mt-3 font-semibold">KUPU-KUPU</h2>
            <p className="text-gray-600">Colored Pencil</p>
            <p className="font-bold mt-2">Rp 129.000 / 24pcs</p>
          </div>

          <div className="border border-gray-300 rounded-lg p-4">
            <img
              src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/102/0710242_PE727421_S4.webp"
              alt="IKEA 365+ bowl"
              className="w-full h-64 object-cover rounded-md"
            />
            <h2 className="mt-3 font-semibold">LANGIT</h2>
            <p className="text-gray-600">Brush</p>
            <p className="font-bold mt-2">Rp 49900 / 6pcs</p>
          </div>

          <div className="border border-gray-300 rounded-lg p-4">
            <img
              src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/102/0710244_PE727426_S4.webp"
              alt="TITTA DJUR finger puppet"
              className="w-full h-64 object-cover rounded-md"
            />
            <h2 className="mt-3 font-semibold">CORAK</h2>
            <p className="text-gray-600">Colored Pen</p>
            <p className="font-bold mt-2">Rp 49900 / 12pcs</p>
          </div>

          <div className="border border-gray-300 rounded-lg p-4">
            <img
              src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/641/1164184_PE890453_S4.webp"
              alt="ISTAD resealable bag"
              className="w-full h-64 object-cover rounded-md"
            />
            <h2 className="mt-3 font-semibold">GULIR</h2>
            <p className="text-gray-600">Roll Up Pencil Case</p>
            <p className="font-bold mt-2">Rp 99.900</p>
          </div>

          <div className="border border-gray-300 rounded-lg p-4">
            <img
              src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/641/1164184_PE890453_S4.webp"
              alt="ISTAD resealable bag"
              className="w-full h-64 object-cover rounded-md"
            />
            <h2 className="mt-3 font-semibold">GULIR</h2>
            <p className="text-gray-600">Roll Up Pencil Case</p>
            <p className="font-bold mt-2">Rp 99.900</p>
          </div>

          <div className="border border-gray-300 rounded-lg p-4">
            <img
              src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/641/1164184_PE890453_S4.webp"
              alt="ISTAD resealable bag"
              className="w-full h-64 object-cover rounded-md"
            />
            <h2 className="mt-3 font-semibold">GULIR</h2>
            <p className="text-gray-600">Roll Up Pencil Case</p>
            <p className="font-bold mt-2">Rp 99.900</p>
          </div>

          <div className="border border-gray-300 rounded-lg p-4">
            <img
              src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/641/1164184_PE890453_S4.webp"
              alt="ISTAD resealable bag"
              className="w-full h-64 object-cover rounded-md"
            />
            <h2 className="mt-3 font-semibold">GULIR</h2>
            <p className="text-gray-600">Roll Up Pencil Case</p>
            <p className="font-bold mt-2">Rp 99.900</p>
          </div>
        </div>
      </main>
      {/* <!-- Home Page End --> */}

      {/* <!-- Login Page Start --> */}
      <div className="grid grid-cols-6 gap-5 max-w-screen-xl mx-auto">
        <div className="col-span-3 flex justify-center items-center">
          <h1 className="text-5xl font-bold">Login</h1>
        </div>
        <div className="col-span-3 px-20 min-h-[calc(100vh-200px)] flex flex-col justify-center">
          <form className="w-full">
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Email"
                className="p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex flex-col mt-5">
              <input
                type="password"
                placeholder="Password"
                className="p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <button
              className=" bg-sky-700 rounded-lg py-3 px-2 w-full text-white font-bold mt-5"
              type="submit"
            >
              Login
            </button>
          </form>

          <div className="justify-center mt-3 text-center">
            Don't have an account?
            <a href="/register" className="underline hover:text-sky-700">
              Register here
            </a>
          </div>
        </div>
      </div>
      {/* <!-- Login Page End --> */}

      {/* <!-- Register Page Start --> */}
      <div className="grid grid-cols-6 gap-5 mt-5 max-w-screen-xl mx-auto">
        <div className="col-span-3 flex justify-center items-center">
          <h1 className="text-5xl font-bold leading-normal">
            Register Account
          </h1>
        </div>
        <div className="col-span-3 px-20 min-h-[calc(100vh-200px)] flex flex-col justify-center">
          <form className="w-full">
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Email"
                className="p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col mt-5">
              <input
                type="password"
                placeholder="Password"
                className="p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col mt-5">
              <input
                type="text"
                placeholder="Confirm Password"
                className="p-3 border border-gray-300 rounded-md"
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
            <a href="/login" className="underline hover:text-sky-700">
              Login here
            </a>
          </div>
        </div>
      </div>
      {/* <!-- Register Page End --> */}
    </div>
  );
}

export default App;
