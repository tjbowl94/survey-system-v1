import React from 'react';
import QuestionDisplay from './QuestionDisplay';
import QuestionEdit from './QuestionEdit';
import { Draggable } from 'react-beautiful-dnd';


export default function Question(props) {
    let q = null;
    if (props.question.editing) {
        q = (<QuestionEdit question={props.question} toggleEditing={() => props.toggleEditing(props.question.id)} updateQuestion={props.updateQuestion} />);
    } else {
        q = (<QuestionDisplay question={props.question} toggleEditing={() => props.toggleEditing(props.question.id)} />);
    }

    return (
        <Draggable draggableId={"draggable-" + props.question.id} index={props.question.order}>
            {provided => (
                <div style={{marginBottom: 40, border: "1px solid black"}} 
                    className="Container"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    {q}
                    <button onClick={() => props.deleteQuestion(props.question.id)}>Delete Question</button>
                </div>
            )}
        </Draggable>
        
    );
}
