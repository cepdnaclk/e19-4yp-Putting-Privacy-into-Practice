import Layout from "../../../components/Layout";
import { useNavigate } from "react-router-dom";
import PrincipleCard from "../../../components/PrincipleCard";
import slugify from "../../../utils/slugify";
import { GDPR_PRINCIPLES } from "../../../constants/gdprPrinciples";

export default function ResourcesGroup() {
  const navigate = useNavigate();

  function showResources(principle) {
    navigate(`/admin/resources/${slugify(principle.value)}`, {
      state: {
        title: principle.label,
        principle: principle.value,
      },
    });
  }

  return (
    <Layout>
      <div className="w-full p-6">
        <h1 className="text-3xl font-bold text-[#252d5c] mt-2 text-left mb-6">
          Resources
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-10">
          {GDPR_PRINCIPLES.map((principle) => (
            <PrincipleCard
              key={principle.value}
              title={principle.label}
              description={principle.description}
              onClick={() => showResources(principle)}
              Icon={principle.icon}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
