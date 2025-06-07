import { useState } from "react";
import FormField from "./FormField";
import Button from "./Button";

export default function QuestionForm() {
  const [question, setQuestion] = useState("");
  const [type, setType] = useState("mcq");
  const [complexity, setComplexity] = useState("easy");
  const [mcqOptions, setMcqOptions] = useState({});
  return (
    <div className="border border-gray-300 p-4 rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-10">
        <FormField
          label="Question"
          type="text"
          labelSize="m"
          onChange={setQuestion}
        />
        <FormField
          label="Type"
          type="select"
          options={["mcq", "essay"]}
          labelSize="m"
          onSelect={setType}
        />
        <FormField
          label="Complexity"
          type="select"
          options={["easy", "medium", "hard"]}
          labelSize="m"
          onSelect={setComplexity}
        />
        {type === "mcq" && (
          <>
            <FormField label="Option A." type="text" labelSize="m" />
            <FormField label="Option B." type="text" labelSize="m" />
            <FormField label="Option C." type="text" labelSize="m" />
            <FormField label="Option D." type="text" labelSize="m" />
            <FormField
              label="Correct Answer"
              type="select"
              options={["A", "B", "C", "D"]}
              labelSize="m"
            />
          </>
        )}
      </div>
      {type == "essay" && (
        <FormField
          label="Correct Answer"
          type="textarea"
          labelSize="m"
          placeholder="Write the correct answer"
        />
      )}
      <div className="flex space-x-4">
        <Button>Save</Button>
        <Button color="white">Cancel</Button>
      </div>
    </div>
  );
}
