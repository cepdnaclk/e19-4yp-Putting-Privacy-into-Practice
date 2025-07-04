import { useState } from "react";
import FormField from "./FormField";
import Button from "./Button";
import axios from "axios";

export default function QuestionForm({ onCloseForm, defaultPrinciple }) {
  const [question, setQuestion] = useState("");
  const [type, setType] = useState("mcq");
  const [complexity, setComplexity] = useState("easy");
  const [mcqOptions, setMcqOptions] = useState({
    A: "",
    B: "",
    C: "",
    D: "",
  });
  const [error, setError] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("A");

  async function handleSave() {
    if (!question.trim()) {
      setError("Please enter the question.");
      return;
    }
    if (!complexity) {
      setError("Please select a complexity level.");
      return;
    }
    if (type === "mcq") {
      for (let key of ["A", "B", "C", "D"]) {
        if (!mcqOptions[key].trim()) {
          setError(`Please fill Option ${key}.`);
          return;
        }
      }
      if (!correctAnswer) {
        setError("Please select the correct answer for MCQ.");
        return;
      }
    } else if (type === "essay") {
      if (!correctAnswer || !correctAnswer.trim()) {
        setError(
          "Please enter the correct answer for the short answer question."
        );
        return;
      }
    }
    const payload = {
      question,
      type,
      complexity,
      options: type === "mcq" ? mcqOptions : {},
      correctAnswer,
      principle: defaultPrinciple,
    };

    try {
      await axios.post("/api/questions", payload);
      onCloseForm(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Error saving question");
    }
  }

  function closeQuestionForm() {
    onCloseForm(false);
  }

  return (
    <div className="border border-gray-300 p-4 rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-20 gap-y-10">
        <FormField
          label="Type"
          type="select"
          options={["mcq", "essay"]}
          labelSize="m"
          onSelect={(val) => {
            setType(val);
            if (val === "mcq") {
              setCorrectAnswer("A");
            } else {
              setCorrectAnswer("");
            }
          }}
          value={type}
        />
        <FormField
          label="Question"
          type="text"
          labelSize="m"
          onChange={setQuestion}
        />
        {type === "mcq" && (
          <>
            <FormField
              label="Option A"
              type="text"
              labelSize="m"
              onChange={(val) => setMcqOptions({ ...mcqOptions, A: val })}
              value={mcqOptions.A}
            />
            <FormField
              label="Option B"
              type="text"
              labelSize="m"
              onChange={(val) => setMcqOptions({ ...mcqOptions, B: val })}
              value={mcqOptions.B}
            />
            <FormField
              label="Option C"
              type="text"
              labelSize="m"
              onChange={(val) => setMcqOptions({ ...mcqOptions, C: val })}
              value={mcqOptions.C}
            />
            <FormField
              label="Option D"
              type="text"
              labelSize="m"
              onChange={(val) => setMcqOptions({ ...mcqOptions, D: val })}
              value={mcqOptions.D}
            />
            <FormField
              label="Correct Answer"
              type="select"
              options={["A", "B", "C", "D"]}
              labelSize="m"
              onSelect={setCorrectAnswer}
              value={correctAnswer}
            />
            <FormField
              label="Complexity"
              type="select"
              options={["easy", "medium", "hard"]}
              labelSize="m"
              onSelect={setComplexity}
              value={complexity}
            />
          </>
        )}
      </div>
      {type === "essay" && (
        <FormField
          label="Correct Answer"
          type="textarea"
          labelSize="m"
          placeholder="Write the correct answer"
          onChange={setCorrectAnswer}
          value={correctAnswer}
        />
      )}
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <div className="flex space-x-4 mt-4">
        <Button onClick={handleSave}>Save</Button>
        <Button color="white" onClick={closeQuestionForm}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
