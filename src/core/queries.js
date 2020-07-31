export const GET_ALL_QUESTIONS = `query{
    allQuestions {
      id
      text
      order
      answerType
      required
      questionoptionSet {
          id
          text
      }
    }
  }`;

export const ADD_NEW_QUESTION = `mutation{
    createQuestion(answerType: "text") {
        question {
            id
            text
            order
            answerType
            required
            questionoptionSet {
                id
                text
            }
        }
    }
}`

export const DELETE_QUESTION = `mutation{
    deleteQuestion(id: $id) {
        question {
            text
        }
    }
}`

export const UPDATE_QUESTION = `mutation{
    updateQuestion(id: $id, answerType: $answerType, order: $order, required: $required, text: $text) {
        question {
            id
        }
    }
}`

export const ADD_QUESTION_OPTION = `mutation{
    createQuestionOption(questionId: $questionId) {
        QuestionOption {
            id
            text
        }
    }
}`

export const UPDATE_QUESTION_OPTION = `mutation{
    updateQuestionOption(optionId: $optionId, text: $text) {
        QuestionOption {
            id
        }
    }
}`

export const DELETE_QUESTION_OPTION = `mutation{
    deleteQuestionOption(optionId: $optionId) {
        QuestionOption {
            text
        }
    }
}`


