import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import useFetch from "../../hooks/useFetch";
import Table from "../../components/Table";

export default function ManageUsers() {
  const { data: userData, loading, error } = useFetch("/api/auth/users");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (userData && Array.isArray(userData)) {
      const initializedUsers = userData.map((user) => ({
        ...user,
        isActive: user.isActive ?? true,
      }));
      setUsers(initializedUsers);
    }
  }, [userData]);

  const toggleActive = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === id ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

  const handleDeleteClick = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
  };

  const columns = [
    { field: "username", headerName: "Username" },
    { field: "email", headerName: "E-mail" },
    { field: "role", headerName: "Role" },
    {
      field: "active",
      headerName: "Active",
      render: (row) => (
        <input
          type="checkbox"
          checked={row.isActive}
          onChange={() => toggleActive(row._id)}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
      ),
    },
    {
      field: "actions",
      headerName: "Delete",
      render: (row) => (
        <button
          onClick={() => handleDeleteClick(row._id)}
          className="text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-50 transition"
        >
          DELETE
        </button>
      ),
    },
  ];

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-[#252d5c] mb-6">Manage Users</h1>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-red-500">Error fetching users.</p>
        ) : (
          <Table columns={columns} data={users} getRowId={(row) => row._id} />
        )}
      </div>
    </Layout>
  );
}
