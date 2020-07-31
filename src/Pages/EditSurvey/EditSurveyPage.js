import React, { useEffect, useState } from 'react';
import Question from './components/Question';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { dataCall } from '../../core/DataService';
import { GET_ALL_QUESTIONS, ADD_NEW_QUESTION, DELETE_QUESTION, UPDATE_QUESTION, UPDATE_QUESTION_OPTION } from '../../core/queries';


export default function EditSurveyPage() {

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        dataCall(GET_ALL_QUESTIONS)
        .then(r => setQuestions(r.data.data.allQuestions));
    }, []);

    function updateQuestion(text, type, required, options, id) {
        // find the question that needs updating
        let copiedQuestions = [...questions];

        let index = copiedQuestions.findIndex(q => q.id === id);

        copiedQuestions[index] = {
            ...copiedQuestions[index],
            text: text,
            answerType: type,
            required: required,
            options: options,
            editing: !copiedQuestions[index].editing
        };

        let order = copiedQuestions[index].order;

        dataCall(UPDATE_QUESTION
            .replace("$id", id)
            .replace("$text", '"' + text +'"')
            .replace("$required", required)
            .replace("$answerType", '"' + type + '"')
            .replace("$order", order))

        if (type === "radio" || type === "dropdown") {
            options.forEach(o => {
                dataCall(UPDATE_QUESTION_OPTION
                    .replace('$optionId', o.id)
                    .replace('$text', '"' + o.text + '"'))
            });
        }

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
        dataCall(ADD_NEW_QUESTION)
        .then(r => {
            setQuestions([
                ...questions,
                r.data.data.createQuestion.question
            ]);
        });     
    }

    function deleteQuestion(id) {
        dataCall(DELETE_QUESTION.replace("$id", id));

        let copiedQuestions = [...questions];
        let index = copiedQuestions.findIndex(q => q.id === id);
        copiedQuestions.splice(index, 1);

        setQuestions(copiedQuestions);
    }

    function onDragEnd(result) {
        const {destination, source, draggableId} = result;

        console.log(destination);
        console.log(source);

        if (!destination) {
            return;
        } 

        if (destination.index === source.index) {
            return;
        }

        let questionId = Number(draggableId.split('-')[1]);

        console.log(questionId);

        let copiedQuestions = [...questions];

        console.log(copiedQuestions);

        let index = copiedQuestions.findIndex(q => Number(q.id) === questionId);

        console.log(index);

        let q = copiedQuestions.splice(index, 1)[0];

        console.log(copiedQuestions);

        copiedQuestions.splice(destination.index - 1, 0, q);

        console.log(copiedQuestions);

        copiedQuestions.forEach((e, i) => {
            let newOrder = i + 1;

            e.order = newOrder;
            dataCall(UPDATE_QUESTION
                .replace("$id", e.id)
                .replace("$text", '"' + e.text +'"')
                .replace("$required", e.required)
                .replace("$answerType", '"' + e.answerType + '"')
                .replace("$order", newOrder))
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
