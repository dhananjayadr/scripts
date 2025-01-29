const answers = [1, 2, 4, 2, 2, 2, 2, 1, 4, 1];

function selectAnswers() {
    const questions = document.querySelectorAll('div[data-automation-id="questionItem"]');
    questions.forEach((question, index) => {
        if (index < answers.length) {
            const answerIndex = answers[index];
            const options = question.querySelectorAll('span[data-automation-id="radio"]');

            if (answerIndex <= options.length) {
                options[answerIndex - 1].click();
            } else {
                console.error(`${answerIndex} out of range for question ${index + 1}`);
            }
        }
    });
}

selectAnswers();
