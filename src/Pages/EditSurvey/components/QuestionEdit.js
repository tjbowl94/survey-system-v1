import React, { useState } from 'react';
import { dataCall } from '../../../core/DataService';
import { ADD_QUESTION_OPTION, DELETE_QUESTION_OPTION } from '../../../core/queries';


export default function QuestionEdit(props) {
    const [questionText, setQuestionText] = useState(props.question.text);
    const [questionType, setQuestionType] = useState(props.question.answerType);
    const [questionRequired, setQuestionRequired] = useState(props.question.required);
    const [questionOptions, setQuestionOptions] = useState(props.question.questionoptionSet);

    function saveEdit() {
        props.updateQuestion(questionText, questionType, questionRequired, questionOptions, props.question.id);
    }

    function addNewOption() {
        dataCall(ADD_QUESTION_OPTION
            .replace('$questionId', props.question.id))
            .then(r => {
                setQuestionOptions([
                    ...questionOptions,
                    r.data.data.createQuestionOption.QuestionOption
                ]);
            });
    }

    function deleteOption(id) {
        let copiedOptions = [...questionOptions];

        let index = copiedOptions.findIndex(o => o.id === id);

        dataCall(DELETE_QUESTION_OPTION
            .replace('$optionId', copiedOptions[index].id));

        copiedOptions.splice(index, 1);

        setQuestionOptions(copiedOptions);
    }

    function editOption(text, id) {
        let copiedOptions = [...questionOptions];

        let index = copiedOptions.findIndex(o => o.id === id);

        copiedOptions[index] = {
            ...copiedOptions[index],
            text: text
        };

        setQuestionOptions(copiedOptions);
    }

    let optionEditing = null;
    if (questionType === "radio" || questionType === "dropdown") {
        optionEditing = (
            <div>
                {questionOptions.map(o => (
                    <div key={o.id}>
                        <input type="text" value={o.text} onChange={(e) => editOption(e.target.value, o.id)} />
                        <button onClick={() => deleteOption(o.id)}>Delete Option</button>
                    </div>
                ))}
                <button onClick={() => addNewOption()}>Add Option</button>
            </div>
        );
    }

    return (
        <div>
            <h3>Editing Question</h3>
            <p>Question Text: <input type="text" value={questionText} onChange={(e) => setQuestionText(e.target.value)} /></p>
            <p>
                Question Type: 
                <select name="question-type" value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
                    <option value="text">Text</option>
                    <option value="multi-line">Multi-line Text</option>
                    <option value="radio">Radio</option>
                    <option value="dropdown">Dropdown</option>
                </select>
            </p>
            <p>Order: {props.question.order}</p>
            <p>
                Required:
                <input type="checkbox" checked={questionRequired} onChange={(e) => setQuestionRequired(e.target.checked)} />
            </p>
            {optionEditing}
            <button onClick={() => saveEdit()}>Edit Question</button>
        </div>
    );
}
