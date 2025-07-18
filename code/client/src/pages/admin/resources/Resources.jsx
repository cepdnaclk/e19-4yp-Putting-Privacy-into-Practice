import Layout from "../../../components/Layout";
import { useLocation } from "react-router-dom";
import Button from "../../../components/Button";
import { useState } from "react";
import AddResourceModal from "./AddResourceModal";
import VideoGallery from "./VideoGallery";

export default function Resources() {
  const location = useLocation();
  const { title, principle: principleValue } = location.state || {};
  const principle = principleValue;
  const [showAddResourceModal, setShowAddResourceModal] = useState(false);

  return (
    <Layout>
      <div className="flex flex-col space-y-8 p-6 w-full">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-[#252d5c] mt-2 text-left mb-6">
                {title}
              </h1>
            </div>
            <Button
              fullSpan={false}
              onClick={() => setShowAddResourceModal((state) => !state)}
            >
              Add Resource
            </Button>
          </div>

          <div className="flex justify-center items-center">
            <div className="w-[900px] h-[500px] bg-gray-100">
              <VideoGallery principle={principle} />
            </div>
          </div>
        </div>

        {showAddResourceModal && (
          <AddResourceModal
            onCloseForm={() => setShowAddResourceModal(false)}
            defaultPrinciple={principle}
          />
        )}
      </div>
    </Layout>
  );
}
