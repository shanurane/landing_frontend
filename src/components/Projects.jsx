import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/projects`)
      .then((response) => setProjects(response.data))
      .catch((error) => console.error(error));
    axios
      .get(`${import.meta.env.VITE_API_URL}/clients`)
      .then((response) => setClients(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <div className="h-fit bg-sky-500/5 p-12 flex flex-col items-center">
        <div className="flex flex-col items-center">
          <h1 className="text-sky-500 font-bold text-3xl text-center">
            Our Projects
          </h1>
          <p className="text-zinc-700 p-4 md:w-[50%] text-center text-base">
            We know what buyers are looking for and suggest projects that will
            bring clients top dollar for the sale of their home
          </p>
        </div>
        <div className="w-full h-full flex overflow-x-auto gap-4 p-4">
          {projects.length > 0 &&
            projects.map((project) => (
              <div
                key={project._id}
                className="min-w-56 w-56 h-full flex flex-col bg-white border rounded-lg shadow overflow-hidden"
              >
                <div className="h-48 w-full">
                  <img
                    className="rounded-t-lg min-w-full min-h-full object-cover"
                    src={project.image}
                    alt={project.name}
                  />
                </div>
                <div className="p-4">
                  <h5 className="text-md font-bold tracking-tight text-blue-500">
                    {project.name}
                  </h5>
                  <p className="font-normal text-gray-600 text-sm overflow-hidden py-4">
                    {project.description}
                  </p>
                  <div className="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-orange-700 rounded-md hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">
                    READ MORE
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="h-fit bg-gray-100 flex flex-col items-center">
        <div className="flex flex-col items-center">
          <h1 className="text-sky-500 font-bold text-3xl text-center p-8">
            Happy Clients
          </h1>
        </div>
        <div className="w-full flex overflow-x-auto gap-4 p-4">
          {clients.map((client) => (
            <div
              key={client._id}
              className="min-w-60 w-60 h-72 bg-white border border-gray-200 rounded-lg shadow dark:bg-white p-2 overflow-hidden"
            >
              <div className="flex flex-col items-center pb-10 py-4 p-2">
                <img
                  className="w-18 h-18 rounded-full shadow-lg"
                  src={client.image}
                  alt={client.name}
                />
                <p className="p-1 py-4 text-zinc-600 text-xs">
                  {client.description}
                </p>
                <div className="w-full pt-4">
                  <h2 className="text-xl font-medium text-sky-500">
                    {client.name}
                  </h2>
                  <span className="text-gray-500">{client.designation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
