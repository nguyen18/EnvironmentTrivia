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
    question: 'How does Co2 affect our environment?',
    answers: [
      { text: 'Increase greenhouse gasses, raising earth temperature.', correct: true },
      { text: 'Helps the environment by providing more Co2 for plants', correct: false },
      { text: 'Helps people by providing more Co2 fuel', correct: false },
      { text: 'Decreases Earth\'s temperature', correct: false },
    ]
  },
  {
    question: 'How much Co2 is produced globally?',
    answers: [
      { text: '10 billion metric tons', correct: false },
      { text: '20.2 billion metric tons', correct: false },
      { text: '36.7 billion metric tons', correct: true },
      { text: '49.8 billion metric tons', correct: false }
    ]
  },
  {
    question: ' How much has the global temperature increased since 1880?',
    answers: [
      { text: '2 celsius or 4.2 degrees fahrenheit', correct: false },
      { text: '0.8 Celsius or 1.4 degrees fahrenheit', correct: true }
    ]
  },
  {
    question: 'Which livestock causes the most pollution',
    answers: [
      { text: 'chickens', correct: false },
      { text: 'cows', correct: true },
      { text: 'goats', correct: false },
      { text: 'pigs', correct: false }
    ]
  },
  {
    question: 'Which industry creates the most Co2 emissions',
    answers: [
      { text: 'Tech', correct: false },
      { text: 'Fashion', correct: false },
      { text: 'Food', correct: false },
      { text: 'Energy', correct: true}
    ]
  }
]