import React, { useState } from 'react';


export default function QuestionDisplay(props) {
    let optionsDisplay = null;
    if (props.question.type === "radio" || props.question.type === "dropdown") {
        optionsDisplay = props.question.options.map(o => (
            <div key={o.id}>
                <p>option - {o.text}</p>
            </div>
        ));
    }

    return (
        <div>
            <h3>Viewing Question</h3>
            <p>Question Text: {props.question.text}</p>
            <p>Question Type: {props.question.type}</p>
            <p>Order: {props.question.order}</p>
            <p>Required: {props.question.required ? "Yes" : "No"}</p>
            {optionsDisplay}
            <button onClick={() => props.toggleEditing()}>Edit Question</button>
        </div>
    );
}
