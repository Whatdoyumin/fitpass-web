import { ReactNode } from "react";

export function useFormattedPolicyContent() {
  const format = (content: string): ReactNode => {
    const lines = content.split("\n");

    const isNumberedList = lines.every((line) => /^\d+\.\s/.test(line));
    const isBulletedList = lines.every((line) => /^[-·]\s?/.test(line));

    if (isNumberedList) {
      return (
        <ol className="pl-5 list-decimal text-gray-500 text-14px">
          {lines.map((line, idx) => (
            <li key={idx} className="leading-6">
              {line.replace(/^\d+\.\s/, "")}
            </li>
          ))}
        </ol>
      );
    }

    if (isBulletedList) {
      return (
        <ul className="pl-5 list-disc text-gray-500 text-14px">
          {lines.map((line, idx) => (
            <li key={idx} className="leading-6">
              {line.replace(/^[-·]\s?/, "")}
            </li>
          ))}
        </ul>
      );
    }

    return <div className="text-gray-500 text-14px leading-6 whitespace-pre-line">{content}</div>;
  };

  return { format };
}
