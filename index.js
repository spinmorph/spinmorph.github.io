$(document).ready(function() {
    // Update header style on scroll and resize
    function updateHeaderStyle() {
        var width = $(window).width();
        if (width >= 1000) {
            if ($(document).scrollTop() > 80) {
                $("#header").css({
                    "background": "#fff",
                    "color": "#000",
                    "box-shadow": "0px 0px 20px rgba(0,0,0,0.09)",
                    "padding": "4vh 4vw"
                });
            } else {
                $("#header").css({
                    "background": "transparent",
                    "color": "#fff",
                    "box-shadow": "0px 0px 0px rgba(0,0,0,0)",
                    "padding": "6vh 4vw"
                });
            }
        }
    }

    // Scroll and resize events
    $(window).on("scroll", updateHeaderStyle);
    $(window).on("resize", updateHeaderStyle);

    // Hover effect on navigation links
    $("#navigation a").hover(
        function() { $(this).css("border-bottom", "2px solid rgb(255, 44, 90)"); },
        function() { $(this).css("border-bottom", "2px solid transparent"); }
    );

    // Magnify image
    window.magnify = function(imglink) {
        $("#img_here").css("background", `url('${imglink}') center center`);
        $("#magnify").css("display", "flex").addClass("animated fadeIn");
        setTimeout(() => $("#magnify").removeClass("animated fadeIn"), 800);
    };

    // Close magnify
    window.closemagnify = function() {
        $("#magnify").addClass("animated fadeOut");
        setTimeout(() => {
            $("#magnify").css("display", "none").removeClass("animated fadeOut");
            $("#img_here").css("background", `url('') center center`);
        }, 800);
    };

    // Hide loading screen after 1.65s
    setTimeout(() => {
        $("#loading").addClass("animated fadeOut");
        setTimeout(() => {
            $("#loading").css("display", "none").removeClass("animated fadeOut");
        }, 800);
    }, 1650);

    // Smooth scrolling
    $("a").on("click", function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $("html, body").animate({ scrollTop: $(hash).offset().top }, 1800, function() {
                window.location.hash = hash;
            });
        }
    });

    // Initialize header style
    updateHeaderStyle();

    // Initialize EmailJS
    emailjs.init("jh9nb1Dhj2u0JR7Oh");

    // Form submission for email
    $("form").on("submit", function(event) {
        event.preventDefault();
        var name = $("input[type='text']").val();
        var email = $("input[type='email']").val();
        var message = $("textarea").val();

        if (name && email && message) {
            emailjs.send("service_i2fbv87", "template_2oukhfc", {
                from_name: name,
                from_email: email,
                message: message
            }).then(function(response) {
                console.log("Message sent successfully:", response);
                alert("Message sent successfully!");
            }, function(error) {
                console.error("Error sending message:", error);
                alert("Failed to send message. Please try again.");
            });
        } else {
            alert("Please fill in all fields.");
        }
    });

});

// ── Disable right-click context menu (native — runs outside jQuery) ──
document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
}, true); // true = capture phase, fires before anything else

// ── Block inspect/save/source shortcuts ─────────────────────────────
document.addEventListener("keydown", function(e) {
    // F12
    if (e.keyCode === 123) {
        e.preventDefault();
        return false;
    }
    // Ctrl+U, Ctrl+S, Ctrl+P
    if (e.ctrlKey && [85, 83, 80].includes(e.keyCode)) {
        e.preventDefault();
        return false;
    }
    // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
    if (e.ctrlKey && e.shiftKey && [73, 74, 67].includes(e.keyCode)) {
        e.preventDefault();
        return false;
    }
}, true); // capture phase

// ── Disable image drag ───────────────────────────────────────────────
document.addEventListener("dragstart", function(e) {
    if (e.target.tagName === "IMG") {
        e.preventDefault();
        return false;
    }
}, true);
