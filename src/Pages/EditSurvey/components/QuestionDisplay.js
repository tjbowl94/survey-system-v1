import React, { useState } from 'react';


export default function QuestionDisplay(props) {
    let optionsDisplay = null;
    if (props.question.answerType === "radio" || props.question.answerType === "dropdown") {
        optionsDisplay = props.question.questionoptionSet.map(o => (
            <div key={o.id}>
                <p>option - {o.text}</p>
            </div>
        ));
    }

    return (
        <div>
            <h3>Viewing Question</h3>
            <p>Question Text: {props.question.text}</p>
            <p>Question Type: {props.question.answerType}</p>
            <p>Order: {props.question.order}</p>
            <p>Required: {props.question.required ? "Yes" : "No"}</p>
            {optionsDisplay}
            <button onClick={() => props.toggleEditing()}>Edit Question</button>
        </div>
    );
}
