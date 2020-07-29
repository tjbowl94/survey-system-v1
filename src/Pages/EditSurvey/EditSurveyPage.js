import React, { useState } from 'react';
import Question from './components/Question';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';


export default function EditSurveyPage() {

    const [questions, setQuestions] = useState([
        {
            id: 1,
            order: 1,
            text: 'What\'s up?',
            required: true,
            type: 'text',
            editing: false
        },
        {
            id: 2,
            order: 2,
            text: 'How are you doing?',
            required: false,
            type: 'dropdown',
            editing: false,
            options: [
                {
                    id: 1,
                    text: 'Great!'
                },
                {
                    id: 2,
                    text: 'Fantastic!'
                }
            ]
        }
    ]);

    function updateQuestion(text, type, required, options, id) {
        // find the question that needs updating
        let copiedQuestions = [...questions];

        let index = copiedQuestions.findIndex(q => q.id === id);

        copiedQuestions[index] = {
            ...copiedQuestions[index],
            text: text,
            type: type,
            required: required,
            options: options,
            editing: !copiedQuestions[index].editing
        };

        setQuestions(copiedQuestions);
    }

    function toggleQuestionEditing(id) {
        let copiedQuestions = [...questions];

        let index = copiedQuestions.findIndex(q => q.id === id);

        copiedQuestions[index] = {
            ...copiedQuestions[index],
            editing: !copiedQuestions[index].editing
        };

        setQuestions(copiedQuestions);
    }

    function addNewQuestion() {
        let order = Math.max.apply(Math, questions.map((q) => q.order)) + 1;
        let id = Math.max.apply(Math, questions.map((q) => q.order)) + 1;

        setQuestions([
            ...questions,
            {
                "type": "text",
                "text": "",
                order: order,
                id: id
            }
        ]);
    }

    function deleteQuestion(id) {
        let copiedQuestions = [...questions];

        let index = copiedQuestions.findIndex(q => q.id === id);

        copiedQuestions.splice(index, 1);

        setQuestions(copiedQuestions);
    }

    function onDragEnd(result) {
        const {destination, source, draggableId} = result;

        if (!destination) {
            return;
        } 

        if (destination.index === source.index) {
            return;
        }

        let questionId = Number(draggableId.split('-')[1]);

        let copiedQuestions = [...questions];

        let index = copiedQuestions.findIndex(q => q.id === questionId);

        let q = copiedQuestions.splice(index, 1)[0];

        copiedQuestions.splice(destination.index - 1, 0, q);

        copiedQuestions.forEach((e, i) => {
            e.order = i + 1;
        });

        setQuestions(copiedQuestions);
    }

    let questionsDisplay = questions.map(q => (
        <div key={q.id}>
            {<Question question={q} toggleEditing={toggleQuestionEditing} updateQuestion={updateQuestion} deleteQuestion={deleteQuestion} />}
        </div>
    ));

    return (
        <div>
            <h2>Edit Survey Page</h2>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable-1">
                    {provided => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            {questionsDisplay}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <button onClick={(r) => addNewQuestion(r)}>Add New Question</button>
        </div>
    );
}
