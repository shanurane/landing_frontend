import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-3 px-6">
      <div>
        <a href="/">
          <img src="imgs/logo.svg" alt="logo" className="w-32" />
        </a>
      </div>
      <div>
        <ul className="flex gap-10 items-center">
          <li className="hidden md:block">
            <a href="/">HOME</a>
          </li>
          <li className="hidden md:block">SERVICES</li>
          <li className="hidden md:block">ABOUT PROJECTS</li>
          <li className="hidden md:block">ESSENTIALS</li>
          <li>
            <button className="bg-orange-500 p-2 px-7 rounded-md">
              <a href="/admin">ADMIN</a>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
