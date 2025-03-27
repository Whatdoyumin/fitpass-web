import { LOCATION_POLICY } from "../../constants/policies";

function LocationPolicyPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {LOCATION_POLICY.map((policy, index) => (
        <div className="flex flex-col gap-2" key={index}>
        <h2 className="text-gray-600 text-18px font-bold">{policy.title}</h2>
          <p className="whitespace-pre-line text-gray-500 text-14px">{policy.content}</p>
        </div>
      ))}
    </div>
  );
}

export default LocationPolicyPage;