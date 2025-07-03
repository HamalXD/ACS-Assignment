import React from "react";

interface PasswordStrengthProps {
  strength: {
    score: number;
    feedback: string[];
    suggestions: string[];
  } | null;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ strength }) => {
  if (!strength) return null;

  const getStrengthColor = () => {
    const colors = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#16a34a"];
    return colors[strength.score];
  };

  const getStrengthText = () => {
    const texts = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    return texts[strength.score];
  };

  return (
    <div className="mt-4 space-y-3">
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-300 ease-in-out"
          style={{
            width: `${(strength.score + 1) * 20}%`,
            backgroundColor: getStrengthColor(),
          }}
        ></div>
      </div>

      <div className="text-sm font-medium">
        Strength: <span className="font-semibold">{getStrengthText()}</span>
      </div>

      <div className="space-y-1">
        {strength.feedback.map((msg, index) => (
          <div key={index} className="text-sm text-red-600 flex items-center">
            <span className="mr-2">•</span> {msg}
          </div>
        ))}
      </div>

      {strength.suggestions.length > 0 && (
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="text-sm font-medium text-blue-800 mb-2">
            Suggestions:
          </div>
          {strength.suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="text-sm text-blue-700 flex items-center"
            >
              <span className="mr-2">•</span> {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PasswordStrength;
