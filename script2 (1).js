document.addEventListener('DOMContentLoaded', function() {
    // Get references to the starting screen and quiz divs
    const startScreen = document.getElementById("start-screen");
    const quizDiv = document.getElementById("quiz");
    
    // Get a reference to the start button
    const startButton = document.getElementById("start-button");
    
    // Add a click event listener to the start button
    startButton.addEventListener("click", startQuiz);
    
    // Function to start the quiz
    function startQuiz() {
        // Hide the starting screen
        startScreen.style.display = "none";
        
        // Show the quiz
        quizDiv.style.display = "block";
    
        // Call a function to load quiz questions and start the quiz logic
        loadQuiz();
    }
    
    // Function to load quiz questions and logic
    function loadQuiz() {
        // Your quiz logic goes here
        // Define the quiz questions, options, and correct answers
        const questions = [
            {
                question: "Question 1: What would you do if someone invites you to their house?",
                options: [
                    { text: "A: Accept the invitaion", imageSrc: "hi.jpg" },
                    { text: "B: Decline and inform your parents immediately", imageSrc: "no.jpg" },
                    { text: "C: Agree but inform your parents later", imageSrc: "agree.jpg" }
                ],
                correctAnswer: "B: Decline and inform your parents immediately"
            },
            {
                question: "Question 2: What should you do if someone threatens you to not tell your parents or anybody about a bad touch?",
                options: [
                    { text: "A: Keep it a secret to avoid trouble", imageSrc: "mysecret.jpg" },
                    { text: "B: Tell a trusted adult despite the threat", imageSrc: "inform.jpg" },
                    { text: "C: Try to handle the situation on our own", imageSrc: "handle.jpg" }
                ],
                correctAnswer: "B: Tell a trusted adult despite the threat"
            }
        ];
        
        // Initialize quiz variables
        let currentQuestionIndex = 0;
        let score = 0;
        
        // DOM elements
        const questionElement = document.getElementById("question");
        const optionImages = document.querySelectorAll(".optionimage");
        const optionsElements = document.querySelectorAll(".option");
        const resultElement = document.getElementById("result");
        const nextButton = document.getElementById("next-button");
        const correct = document.getElementById("correct");
        const wrong = document.getElementById("wrong");
        const prob = document.getElementById("problem");
        const video = document.querySelector('video');
        wrong.style.display = "none";
        correct.style.display = "none";
        nextButton.style.display = "none";

         // Play the video
        function playVideo() {
            video.play();
        }

        // Pause the video
        function pauseVideo() {
            video.pause();
        }

        
        // Function to display the current question and options
        function displayQuestion() {
            const currentQuestion = questions[currentQuestionIndex];
            questionElement.innerHTML = currentQuestion.question;
            optionsElements.forEach((option, index) => {
                option.innerHTML = currentQuestion.options[index].text;
                optionImages[index].setAttribute("src", currentQuestion.options[index].imageSrc);
            });
        }
        
        // Event listener for clicking an option
        optionsElements.forEach((option, index) => {
            option.addEventListener("click", () => {
                const selectedOption = option.textContent;
                const currentQuestion = questions[currentQuestionIndex];
                console.log(selectedOption);
                console.log(currentQuestion.correctAnswer);
        
                if (selectedOption === currentQuestion.correctAnswer) {
                    correct.style.display = "block";
                    console.log("Correct");
                    //resultElement.textContent = "Correct!";
                    score++;
                } else {
                    wrong.style.display ="block";
                    console.log("Wrong");
                    //resultElement.textContent = "Wrong!";
                }
        
                // Disable options after selecting one
                optionsElements.forEach((opt) => {
                    opt.style.pointerEvents = "none";
                });
        
                // Show the Next button
                nextButton.style.display = "block";
            });
        });
        
        // Event listener for the Next button
        nextButton.addEventListener("click", () => {
            // Move to the next question
            currentQuestionIndex++;
            wrong.style.display = "none";
            correct.style.display = "none";
            prob.setAttribute("src", "secret.jpg");
        
        
            // Check if the quiz is finished
            if (currentQuestionIndex < questions.length) {
                // Reset result message and options
                resultElement.textContent = "";
                optionsElements.forEach((opt) => {
                    opt.style.pointerEvents = "auto";
                });
                nextButton.style.display = "none";
        
                // Display the next question
                displayQuestion();
            } else {
                // Quiz is finished, display the score
                questionElement.textContent = `Quiz Finished! Your Score: ${score} out of ${questions.length}`;
                optionsElements.forEach((opt) => {
                    opt.style.display = "none";
                });
                nextButton.style.display = "none";
                prob.style.display = "none";
                // Displaying the video
                if (score < questions.length) {
                    // Display the video
                    video.style.display = "block";
                }
            }
        });
        
        // Initial display of the first question
        displayQuestion();
    }
});
