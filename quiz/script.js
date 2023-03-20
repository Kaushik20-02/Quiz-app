const questions=[
    {
    question: ' Which of the following features must be supported by any programming language to become a pure object-oriented programming language?',
    answers:[
        {text: 'Encapsulation', correct: false},
        {text: 'Inheritance', correct: false},
        {text: 'Polymorphism', correct: false},
        {text: 'All of the above', correct: true},
    ]
},
{
    question: 'The C++ language is ______ object-oriented language.',
    answers:[
        {text: 'Pure Object oriented', correct: false},
        {text: 'Not Object oriented', correct: false},
        {text: 'Semi Object-oriented or Partial Object-oriented', correct: true},
        {text: 'None of the above', correct: false},
    ]
},
{
    question: 'C++ is a ___ type of language.',
    answers:[
        {text: 'High-level Language', correct: false},
        {text: 'Low-level language', correct: false},
        {text: 'Middle-level language', correct: true},
        {text: 'None of the above', correct: false},
    ]
},
{
    question: 'Which of the following is the correct syntax for declaring the array?',
    answers:[
        {text: 'init array []', correct: false},
        {text: 'int array [5];', correct: true},
        {text: 'Array[5];', correct: false},
        {text: 'None of the above', correct: false},
    ]
},
]

const questionElement= document.getElementById('question')
const answerButtons= document.getElementById('answer-buttons')
const nextButton= document.getElementById('next-btn')

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML= 'Next';
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion= questions[currentQuestionIndex];
    let questionNo= currentQuestionIndex+ 1;

    questionElement.innerHTML= questionNo+ '.'+ 
        currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button= document.createElement('button');
        button.innerHTML= answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);

        if(answer.correct)
            button.dataset.correct= answer.correct;
        
        button.addEventListener('click', selectAnswer);
    })
}

function resetState(){
    nextButton.style.display= 'none';
    while(answerButtons.firstChild)
        answerButtons.removeChild(answerButtons.firstChild);
}

function selectAnswer(e){
    const selectedBtn= e.target;
    const isCorrect= selectedBtn.dataset.correct==='true'
    
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    }
    else
        selectedBtn.classList.add('incorrect')

    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==='true')
            button.classList.add('correct')
        button.disabled= true;
    })
    nextButton.style.display= 'block';
}

function showScore(){
    resetState();
    questionElement.innerHTML= `U scored ${score} out of
    ${questions.length}!`;
    nextButton.innerHTML= 'Try Again';
    nextButton.style.display= 'block';
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length)
        showQuestion();
    else
        showScore();
}

nextButton.addEventListener('click',()=>{
    if(currentQuestionIndex < questions.length)
        handleNextButton();
    else
        startQuiz()
})
startQuiz();