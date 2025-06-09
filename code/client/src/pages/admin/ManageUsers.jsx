import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import useFetch from "../../hooks/useFetch";
import Table from "../../components/Table";

export default function ManageUsers() {
  const { data: userData, loading, error } = useFetch("/api/auth/users");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (userData && Array.isArray(userData)) {
      setUsers(userData); // No need to add isActive
    }
  }, [userData]);

  const handleDeleteClick = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/auth/users/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (err) {
      console.error(err);
      alert("An error occurred while deleting the user.");
    }
  };

  const columns = [
    { field: "username", headerName: "Username" },
    { field: "email", headerName: "E-mail" },
    { field: "role", headerName: "Role" },
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
      <div className="p-6 ml-20 mr-20 w-full">
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
