import { useParams, useLocation } from "react-router-dom";
import Layout from "../../components/Layout";

export default function UserDetails() {
  const { id } = useParams();
  const location = useLocation();
  const username = location.state?.username;

  return (
    <Layout>
      <div className="p-6 w-full">
        <h1 className="text-3xl font-bold text-[#252d5c] mt-2 mb-6">
          User Details
        </h1>
        <p>
          <strong>User ID:</strong> {id}
        </p>
        <p>
          <strong>Username:</strong> {username || "N/A"}
        </p>
      </div>
    </Layout>
  );
}
