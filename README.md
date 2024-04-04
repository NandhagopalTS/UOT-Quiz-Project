    <h1>Radio Button Quiz</h1>
    <form id="quizForm">
        <p>Question 1: What is the capital of France?</p>
        <input type="radio" name="q1" value="Paris"> Paris<br>
        <input type="radio" name="q1" value="London"> London<br>
        <input type="radio" name="q1" value="Berlin"> Berlin<br>
        <input type="radio" name="q1" value="Madrid"> Madrid<br>

        <p>Question 2: What is the capital of Japan?</p>
        <input type="radio" name="q2" value="Beijing"> Beijing<br>
        <input type="radio" name="q2" value="Seoul"> Seoul<br>
        <input type="radio" name="q2" value="Tokyo"> Tokyo<br>
        <input type="radio" name="q2" value="Bangkok"> Bangkok<br>

        <button type="button" onclick="submitQuiz()">Submit</button>
    </form>

    <script>
        function submitQuiz() {
            var userAnswers = [];
            var correctAnswers = ["Paris", "Tokyo"];
            
            // Getting user answers for question 1 and question 2
            var q1Answer = document.querySelector('input[name="q1"]:checked');
            var q2Answer = document.querySelector('input[name="q2"]:checked');

            // Checking if both questions are answered
            if (q1Answer && q2Answer) {
                // Pushing user answers into array
                userAnswers.push(q1Answer.value);
                userAnswers.push(q2Answer.value);

                // Comparing user answers with correct answers
                var correct = true;
                for (var i = 0; i < correctAnswers.length; i++) {
                    if (userAnswers[i] !== correctAnswers[i]) {
                        correct = false;
                        break;
                    }
                }

                // Displaying result
                if (correct) {
                    alert("Congratulations! All answers are correct!");
                } else {
                    alert("Oops! Some answers are incorrect.");
                }
            } else {
                alert("Please answer all questions.");
            }
        }
    </script>


<!--  -->
<!-- https://freefrontend.com/bootstrap-search-boxes/ -->