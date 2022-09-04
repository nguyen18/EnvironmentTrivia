const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'How much plastic waste is produced a year?',
    answers: [
      { text: '400 million Tons', correct: true },
      { text: '300 million Tons', correct: false },
      { text: '200 million Tons', correct: false },
      { text: '100 million Tons', correct: false },
    ]
  },
  {
    question: 'What is the most littered item on Earth?',
    answers: [
      { text: 'Plastic Straws', correct: false },
      { text: 'Water Bottles', correct: false },
      { text: 'Cigarette Butts', correct: true },
      { text: 'Take-out containers', correct: false }
    ]
  },
  {
    question: 'Which type of plastic is never recycled?',
    answers: [
      { text: 'Polyethylene terephthalate', correct: false },
      { text: 'Polystyrene', correct: true }
    ]
  },
  {
    question: 'Should you remove caps off of bottles before recycling?',
    answers: [
      { text: 'True', correct: false },
      { text: 'False', correct: true }
    ]
  },
  {
    question: 'Which animal is affected the most from plastic waste?',
    answers: [
      { text: 'Whales', correct: false },
      { text: 'Birds', correct: false },
      { text: 'Fish', correct: false },
      { text: 'Sea Turtles', correct: true}
    ]
  }
]