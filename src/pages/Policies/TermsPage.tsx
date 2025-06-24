import { TERMS_OF_SERVICE } from "../../constants/policies";
import { useFormattedPolicyContent } from "../../hooks/useFormattedPolicyContent";

function TermsPage() {
  const { format } = useFormattedPolicyContent();

  return (
    <div className="flex flex-col gap-6 p-6">
      {TERMS_OF_SERVICE.map((policy, index) => (
        <div className="flex flex-col gap-2" key={index}>
          <h2 className="text-gray-600 text-18px font-bold">{policy.title}</h2>
          {format(policy.content)}
        </div>
      ))}
    </div>
  );
}

export default TermsPage;
