const questions = document.querySelectorAll(".faq-question");

questions.forEach(question => {

    question.addEventListener("click", () => {

        const item = question.parentElement;

        // סגירת כל השאלות האחרות
        document.querySelectorAll("#faq-item").forEach(faq => {

            if(faq !== item){
                faq.classList.remove("active");
                faq.querySelector(".faq-answer").style.maxHeight = null;
            }

        });

        item.classList.toggle("active");

        const answer = item.querySelector(".faq-answer");

        if(item.classList.contains("active")){
            answer.style.maxHeight = answer.scrollHeight + "px";
        }else{
            answer.style.maxHeight = null;
        }

    });

});