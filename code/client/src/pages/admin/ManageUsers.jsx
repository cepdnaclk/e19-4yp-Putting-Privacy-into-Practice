import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import useFetch from "../../hooks/useFetch";
import Table from "../../components/Table";
import LoadingSpinner from "../../components/LoadingSpinner";
import ConfirmModal from "../../components/ConfirmModal";

export default function ManageUsers() {
  const {
    data: userData,
    loading,
    error,
    refetch,
  } = useFetch("/api/auth/users");
  const [users, setUsers] = useState([]);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (userData && Array.isArray(userData)) {
      setUsers(userData);
    }
  }, [userData]);

  const confirmDelete = (id) => {
    setDeleteTarget(id);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/auth/users/${deleteTarget}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete user");
      }
      // Refresh the list
      setUsers((prev) => prev.filter((u) => u._id !== deleteTarget));
      refetch?.();
    } catch (err) {
      console.error(err);
      alert("An error occurred while deleting the user.");
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
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
          onClick={() => confirmDelete(row._id)}
          className="text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-50 transition"
        >
          DELETE
        </button>
      ),
    },
  ];

  return (
    <Layout>
      <div className="p-6 w-full">
        <h1 className="text-3xl font-bold text-[#252d5c] mt-2 text-left mb-6">
          Manage Users
        </h1>

        {loading ? (
          <div className="flex justify-center py-10">
            <LoadingSpinner size="lg" />
          </div>
        ) : error ? (
          <p className="text-red-500">Error fetching users.</p>
        ) : (
          <Table columns={columns} data={users} getRowId={(row) => row._id} />
        )}

        {deleteTarget && (
          <ConfirmModal
            message="Are you sure you want to delete this user?"
            onConfirm={handleDeleteConfirm}
            onCancel={() => setDeleteTarget(null)}
            isLoading={isDeleting}
          />
        )}
      </div>
    </Layout>
  );
}
