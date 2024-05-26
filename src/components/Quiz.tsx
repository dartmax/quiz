import {FC, useState, MouseEvent, FormEventHandler, FormEvent} from "react";
import addPic from '../assets/add.svg';
import removePic from '../assets/remove.svg';
import { uuidv4 } from "../utils";


const Options = {
  SHORT_ANSWER: "Short Answer",
  PARAGRAPH: "Paragraph"
};

type Questionnaire = {
  id: string,
  question: string,
  answerType: string,
  answer: string
};

const Quiz: FC = () => {
  const [questions, setQuestions] = useState<Questionnaire[]>([]);

  const handleQuestionChange = (id: string, value: string) => {
    setQuestions(prev =>
      prev.map(q => (q.id === id ? { ...q, question: value } : q))
    );
  };

  const handleAnswerTypeChange = (id: string, value: string) => {
    setQuestions(prev =>
      prev.map(q => (q.id === id ? { ...q, answerType: value } : q))
    );
  };

  const handleAnswerChange = (id: string, value: string) => {
    setQuestions(prev =>
      prev.map(q => (q.id === id ? { ...q, answer: value } : q))
    );
  };

  const addQuestion = (e: MouseEvent) => {
    e.preventDefault();
    setQuestions([...questions, {
      id: uuidv4(),
      question: "",
      answerType: Options.SHORT_ANSWER,
      answer: ""
    }]);
  };

  const onSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(JSON.stringify(questions));
  };

  const renderQuestionInput = (question: Questionnaire) => {
    switch (question.answerType) {
      case Options.SHORT_ANSWER:
        return (
          <input
            type="text"
            placeholder="Short answer text"
            value={question.answer}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            aria-label="Short answer text"
            disabled
          />
        );
      case Options.PARAGRAPH:
        return (
          <textarea
            placeholder="Long answer text"
            rows={3}
            value={question.answer}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            aria-label="Long answer text"
            disabled
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="form">
      <form className="form-container" onSubmit={onSave}>
        {questions.map((question, index) => (
          <div className="form-content" key={question.id} aria-labelledby={`question-${question.id}`}>
            <label htmlFor={`question-input-${question.id}`} className="form-title">
              Question
            </label>
            <input
              id={`question-input-${question.id}`}
              type="text"
              placeholder="What do you want to ask?"
              value={question.question}
              onChange={(e) => handleQuestionChange(question.id, e.target.value)}
              aria-required="true"
            />
            <label htmlFor={`answer-type-select-${question.id}`} className="answer-title">
              <span>Answer Type</span>
            </label>
            <div className="form-select">
              <select
                id={`answer-type-select-${question.id}`}
                className="select-answer"
                value={question.answerType}
                onChange={(e) => handleAnswerTypeChange(question.id, e.target.value)}
                aria-required="true"
              >
                {Object.values(Options).map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            {renderQuestionInput(question)}
            <div className="form-pages">
              <span>{index + 1} of {questions.length}</span>
              <img className="remove" src={removePic} alt="Remove question" onClick={() => setQuestions(questions.filter(item => item.id !== question.id))}/>
            </div>
          </div>
        ))}
        <button type="button" className="add-question" onClick={addQuestion} aria-label="Add Question">
          <img src={addPic} alt="Add question" />
          <span>Add Question</span>
        </button>
        <button type="submit" className="on-save">
          <span>Save & Share</span>
        </button>
      </form>
    </div>
  );
};

export default Quiz;
