import Sidebar from "../../components/Sidebar";
import FormField from "../../components/FormField";
import { useState } from "react";

export default function Create() {
  const [questionType, setQuestionType] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(Array(4).fill(""));

  const handleQuestionTypeSelection = (value) => {
    setQuestionType(value);
    if (value !== "Multiple Choice") {
      setOptions(Array(4).fill(""));
    }
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const renderOptions = () =>
    options.map((opt, idx) => (
      <FormField
        key={idx}
        label={`Option ${idx + 1}`}
        type="text"
        value={opt}
        onChange={(value) => handleOptionChange(idx, value)}
        required
      />
    ));

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-300 ml-64 mr-64">
        <h1 className="mb-4 text-xl font-bold">Create a New Question</h1>

        <FormField
          label="Please select the type of question you want to create"
          type="select"
          value={questionType}
          options={["Short Answer", "Multiple Choice"]}
          onChange={handleQuestionTypeSelection}
          required
        />

        {questionType && (
          <FormField
            label="Question"
            type="text"
            value={question}
            onChange={setQuestion}
            required
          />
        )}

        {questionType === "Multiple Choice" && renderOptions()}
      </div>
    </div>
  );
}
