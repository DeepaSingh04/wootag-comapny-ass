$(document).ready(function() {
    // Initialize GSAP timeline
    const tl = gsap.timeline();
    function showFeedback(isCorrect) {
        const feedbackClass = isCorrect ? '.correct' : '.incorrect';
        const feedback = $(feedbackClass);
        
        feedback.show();
        tl.to(feedback, {
            opacity: 1,
            duration: 0.3,
            onComplete: () => {
                setTimeout(() => {
                    tl.to(feedback, {
                        opacity: 0,
                        duration: 0.3,
                        onComplete: () => {
                            feedback.hide();
                        }
                    });
                }, 1000);
            }
        });
    }

    // Function to move to next stage
    function moveToNextStage(currentStage, nextStage) {
        $(`#${currentStage}`).fadeOut(500, function() {
            $(`#${nextStage}`).fadeIn(500);
        });
    }

    // Handle pin clicks for Question 1
    $('#question1 .pin').click(function() {
        const isCorrect = $(this).data('correct');
        showFeedback(isCorrect);
        
        if (isCorrect) {
            setTimeout(() => {
                moveToNextStage('question1', 'question2');
            }, 1500);
        }
    });

    // Handle pin clicks for Question 2
    $('#question2 .pin').click(function() {
        const isCorrect = $(this).data('correct');
        showFeedback(isCorrect);
        
        if (isCorrect) {
            setTimeout(() => {
                moveToNextStage('question2', 'final');
            }, 1500);
        }
    });

    // Handle unmute button
    $('#unmuteBtn').click(function() {
        const video = document.getElementById('finalVideo');
        video.muted = !video.muted;
        $(this).text(video.muted ? 'Unmute' : 'Mute');
    });

    // Initialize video
    const video = document.getElementById('finalVideo');
    video.play().catch(function(error) {
        console.log("Video autoplay failed:", error);
    });
}); 