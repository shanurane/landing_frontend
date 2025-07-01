import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [images, setImages] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [submitting_1, setSubmitting_1] = useState(false);
  const [submitting_2, setSubmitting_2] = useState(false);
  const [fileError_1, setFileError_1] = useState(
    "File Size should be less than 10MB"
  );
  const [fileError_2, setFileError_2] = useState(
    "File Size should be less than 10MB"
  );

  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
  });
  const [newClient, setNewClient] = useState({
    name: "",
    description: "",
    designation: "",
  });
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", images);
    formData.append("upload_preset", "preset1");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dnnnfrto3/image/upload",
        formData
      );
      return res.data.secure_url;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw new Error("Image upload failed");
    }
  };

  // Add Project
  const handleSubmitProject = async (e) => {
    e.preventDefault();
    setSubmitting_1(true);
    const formData = new FormData();
    formData.append("file", images);
    formData.append("upload_preset", "preset1");

    try {
      const imageUrl = await uploadImage();
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/projects`,
        {
          name: newProject.name,
          description: newProject.description,
          image: imageUrl,
        }
      );
      setNewProject({
        name: "",
        description: "",
      });
      // Handle success (e.g., update clients list or show a success message)
      console.log("Client added:", response.data);
    } catch (error) {
      setError("Image upload failed. Please try again.");
      console.error("Error adding client:", error);
    }
    setSubmitting_1(false);
  };

  // Add Client
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting_2(true);
    const formData = new FormData();
    formData.append("file", images);
    formData.append("upload_preset", "preset1");

    try {
      const imageUrl = await uploadImage();
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/clients`,
        {
          name: newClient.name,
          description: newClient.description,
          designation: newClient.designation,
          image: imageUrl,
        }
      );
      setNewClient({
        name: "",
        description: "",
        designation: "",
      });
      // console.log("Client added:", response.data);
    } catch (error) {
      setError("Image upload failed. Please try again.");
      console.error("Error adding client:", error);
    }
    setSubmitting_2(false);
  };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/contacts`).then((res) => {
      setContacts(res.data);
      console.log("data is", res);
    });
    // .catch((err) => {
    //   console.error("Server not available. Using fallback contacts.");
    //   setContacts([]);
    // });
    axios
      .get(`${import.meta.env.VITE_API_URL}/subscriptions`)
      .then((res) => setSubscriptions(res.data));
  }, []);

  return (
    <div className="text-center p-3">
      <h1 className="text-4xl text-sky-500 font-bold">Admin Panel</h1>
      <div className="md:flex">
        <div className="md:w-1/2 p-5">
          <h2 className="text-2xl font-bold">Project Management</h2>
          <form
            onSubmit={handleSubmitProject}
            className="bg-sky-400 flex flex-col gap-3 rounded-md p-6"
          >
            <input
              type="text"
              placeholder="name"
              value={newProject.name}
              onChange={(e) =>
                setNewProject({ ...newProject, name: e.target.value })
              }
              required
              className="p-1 border bg-transparent rounded-md text-black placeholder-zinc-600"
            />
            <input
              type="text"
              placeholder="Description"
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
              required
              className="p-1 border bg-transparent rounded-md text-black placeholder-zinc-600"
            />
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file && file.size > 1024 * 1024 * 10) {
                  setFileError_1("File size exceeds 10MB limit");
                  setImages(null);
                } else {
                  setFileError_1("File size should be less than 10MB");
                  setImages(e.target.files[0]);
                }
              }}
              // onChange={(e) => setImages(e.target.files[0])}
              className="p-1 border bg-transparent rounded-md text-black placeholder-zinc-600"
            />
            <h1 className="text-red-600">{fileError_1}</h1>
            <button
              type="submit"
              disabled={submitting_1}
              className={`p-1 border bg-orange-500 disabled:bg-orange-300 disabled:cursor-not-allowed rounded-md text-black `}
            >
              {submitting_1 ? "Adding..." : "Add Project"}
            </button>
          </form>
        </div>
        <div className="md:w-1/2 p-5">
          <h1 className="font-bold text-2xl">Client management</h1>
          <form
            onSubmit={handleSubmit}
            className="bg-sky-400 flex flex-col gap-3 rounded-md p-6"
          >
            <input
              type="text"
              placeholder="Name"
              value={newClient.name}
              onChange={(e) =>
                setNewClient({ ...newClient, name: e.target.value })
              }
              required
              className="p-1 border bg-transparent rounded-md text-black placeholder-zinc-600"
            />
            <input
              type="text"
              placeholder="Description"
              value={newClient.description}
              onChange={(e) =>
                setNewClient({ ...newClient, description: e.target.value })
              }
              required
              className="p-1 border bg-transparent rounded-md text-black placeholder-zinc-600"
            />
            <input
              type="text"
              placeholder="Designation"
              value={newClient.designation}
              onChange={(e) =>
                setNewClient({ ...newClient, designation: e.target.value })
              }
              required
              className="p-1 border bg-transparent rounded-md text-black placeholder-zinc-600"
            />
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file && file.size > 1024 * 1024 * 10) {
                  setFileError_2("File size exceeds 10MB limit");
                  setImages(null);
                } else {
                  setFileError_2("File size should be less than 10MB");
                  setImages(e.target.files[0]);
                }
              }}
              // onChange={(e) => setImages(e.target.files[0])}
              className="p-1 border bg-transparent rounded-md text-black placeholder-zinc-600"
            />
            <h1 className="text-red-600">{fileError_2}</h1>

            <button
              type="submit"
              disabled={submitting_2}
              className="p-1 border bg-orange-500 disabled:bg-orange-300 disabled:cursor-not-allowed rounded-md text-black"
            >
              {submitting_2 ? "Adding..." : "Add Client"}
            </button>
          </form>
        </div>
      </div>
      <section>
        <h1 className="font-bold text-2xl">Contact Form Details</h1>
        <div className="bg-sky-400 rounded-md p-6">
          <table
            border="1"
            style={{ width: "100%", borderCollapse: "collapse" }}
            className="bg-white/20 rounded-lg"
          >
            <thead className="">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr
                  key={contact._id}
                  className="bg-white/20 border-t  text-center rounded-lg w-full p-2"
                >
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-bold text-2xl">Subscribed Emails</h2>
        <div className="flex flex-col md:grid grid-cols-3  bg-sky-400 rounded-md p-6 overflow-hidden">
          {subscriptions.length > 0 ? (
            subscriptions.map((subscription) => (
              <div
                key={subscription._id}
                className="bg-white/20 rounded-lg w-ull p-1 border"
              >
                {subscription.email}
              </div>
            ))
          ) : (
            <div className="bg-white/20 rounded-lg w-fit p-2">
              <p>No Emails to show</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminPanel;
