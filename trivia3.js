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
    question: 'How many species will be lost by 2050',
    answers: [
      { text: 'More than one million', correct: true },
      { text: '100k', correct: false },
      { text: '500k', correct: false },
      { text: '10k', correct: false },
    ]
  },
  {
    question: 'What is the #1 cause of biodiversity loss',
    answers: [
      { text: 'plastic waste', correct: false },
      { text: 'climate change', correct: false },
      { text: 'Wildlife Poaching', correct: true },
      { text: 'tourism', correct: false }
    ]
  },
  {
    question: 'Is Britain one of the most biodiverse countries?',
    answers: [
      { text: 'True', correct: false },
      { text: 'False', correct: true }
    ]
  },
  {
    question: 'Where is the most biodiversity loss happening?',
    answers: [
      { text: 'Oceans', correct: false },
      { text: 'Islands', correct: true },
      { text: 'Major Continents', correct: false },
      { text: 'North or South Pole', correct: false }
    ]
  },
  {
    question: 'Which country supports 10% of the world’s biodiversity?',
    answers: [
      { text: 'Asia', correct: false },
      { text: 'Europe', correct: false },
      { text: 'North America', correct: false },
      { text: 'South Africa', correct: true}
    ]
  }
]