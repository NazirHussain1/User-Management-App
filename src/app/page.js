"use client";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", age: "" });
  const [loading, setLoading] = useState(false);
  const [editUser, setEditUser] = useState(null); // User currently being edited

  // Fetch all users
  const getUsers = async () => {
    setLoading(true);
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Create User
  const createUser = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;

    await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });
    setForm({ name: "", email: "", age: "" });
    getUsers();
  };

  // Delete User
  const deleteUser = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (res.ok) setUsers(users.filter(u => u._id !== id));
    else alert(data.message);
  };

  // Open Edit Modal
  const openEditModal = (user) => {
    setEditUser({ ...user });
  };

  // Handle Edit Form Change
  const handleEditChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  // Save Edited User
  const saveEdit = async () => {
    const res = await fetch(`/api/users/${editUser._id}`, {
      method: "PUT",
      body: JSON.stringify(editUser),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (res.ok) {
      setUsers(users.map(u => u._id === editUser._id ? editUser : u));
      setEditUser(null); // Close modal
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">User Management</h1>

      {/* Create User Form */}
      <form className="card p-4 mb-5" onSubmit={createUser}>
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Age"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">
              Add User
            </button>
          </div>
        </div>
      </form>

      {/* Users List */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="row g-3">
          {users.map(u => (
            <div className="col-md-4" key={u._id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{u.name}</h5>
                    <p className="card-text">{u.email}</p>
                    <p className="card-text">Age: {u.age}</p>
                  </div>
                  <div className="mt-3 d-flex justify-content-between">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => openEditModal(u)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteUser(u._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editUser && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit User</h5>
                <button className="btn-close" onClick={() => setEditUser(null)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  name="name"
                  className="form-control mb-2"
                  placeholder="Name"
                  value={editUser.name}
                  onChange={handleEditChange}
                />
                <input
                  type="email"
                  name="email"
                  className="form-control mb-2"
                  placeholder="Email"
                  value={editUser.email}
                  onChange={handleEditChange}
                />
                <input
                  type="number"
                  name="age"
                  className="form-control mb-2"
                  placeholder="Age"
                  value={editUser.age}
                  onChange={handleEditChange}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setEditUser(null)}>Cancel</button>
                <button className="btn btn-primary" onClick={saveEdit}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
