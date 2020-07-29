import React, { useState } from 'react';


export default function QuestionEdit(props) {
    const [questionText, setQuestionText] = useState(props.question.text);
    const [questionType, setQuestionType] = useState(props.question.type);
    const [questionRequired, setQuestionRequired] = useState(props.question.required);
    const [questionOptions, setQuestionOptions] = useState(props.question.options);

    function saveEdit() {
        props.updateQuestion(questionText, questionType, questionRequired, questionOptions, props.question.id);
    }

    function addNewOption() {
        let order = Math.max.apply(Math, questionOptions.map((o) => o.order)) + 1;
        let id = Math.max.apply(Math, questionOptions.map((o) => o.id)) + 1;

        setQuestionOptions([
            ...questionOptions,
            {
                "text": "",
                order: order,
                id: id
            }
        ]);
    }

    function deleteOption(id) {
        let copiedOptions = [...questionOptions];

        let index = copiedOptions.findIndex(o => o.id === id);

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
