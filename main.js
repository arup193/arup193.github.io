var typeCommand = true;
var lastCommand = "";

function init() {
    // Loader - Creating a canvas and appending to the body
    var loader = document.createElement("canvas");
    document.body.appendChild(loader);
    var width = loader.width = window.innerWidth;
    var height = loader.height = window.innerHeight;
    var fontSize = Math.ceil(0.02 * width);
    var n = Math.ceil(width / fontSize);
    var seperatorHeight = height;
    var letters = Array(n);
    for (var i = 0; i < n; i++) {
        letters[i] = 0;
    }
    var stop = false, runLoader = true, runLoaderFade = false;
    var loaderTotalTime = 5000, loaderFadeTime = 1250, loaderTime = loaderTotalTime - loaderFadeTime, loaderIntervalTime = 50;

    /*
     * stop : Completely stops the whole loader animation
     * runLoader : Start/Stop the actual loader animation. After this is set to false, set runLoaderFade to true to start the fading effect
     * runLoaderFade : Start/Stop the fading effect. Set this to true to start the fading effect, set runLoaderFade to false to stop the fading effect before completely stopping
     * 
     * loaderTotalTime : Total time of loading effect = actual loading + loader fading time
     * loaderFadeTime : Time for the loader fading
     * loaderTime : Time for actual loader run time
     * loaderIntervalTime : How fast the loader should run
    */

    var ctx = loader.getContext('2d');
    ctx.font = fontSize + "px Arial";
    var interval = setInterval(function() {
        if (runLoader) { // For the actual loader to run
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = '#0F0';
            letters.map(function(y_pos, index) {
                text = String.fromCharCode(3e4 + Math.random() * 33);
                x_pos = index * fontSize;
                ctx.fillText(text, x_pos, y_pos);
                if (y_pos > height) {
                    seperatorHeight = Math.ceil(0.5 * height);
                }
                letters[index] = (y_pos > seperatorHeight + Math.random() * 1e4) ? 0 : y_pos + fontSize;
            });
        } else if (runLoaderFade) { // After the loader is run, we slowly fade it to have a smooth effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, width, height);
        } else if (stop) { // After the fading is done, we stop the loader completely.
            clearInterval(interval);
        }
    }, loaderIntervalTime);

    // Timeout to stop the loader animation and start the fading
    setTimeout(function() {
        runLoaderFade = true;
        runLoader = false;
    }, loaderTime);

    // Timeout to stop the loader completely (actual loader animation and fading) and setup navigation menus
    setTimeout(function() {
        runLoaderFade = false;
        stop = true;
        document.body.removeChild(loader);
        document.getElementById("pageContent").removeAttribute("style");

        /*
         * Setup the animation event handler for supported animation types
            - Remove the listeners once the event is triggered
            - Perform actions for the event
         * Register/Add listeners for supported animation types for an element
         * Start the animation by adding appropriate animations directly or via css selector
        */
        var animations = [ "animationend", "oAnimationEnd", "webkitAnimationEnd" ]; // Animation types that we will support
        function footerAnimationHandler() { // Animation event handler for the footer
            for (a in animations) { // When the event is triggered, we remove the event listeners - Cleanup
                this.removeEventListener(animations[a], footerAnimationHandler, false);
            }
            
            function headerAnimationHandler() {  // Animation event handler for the header
                for (a in animations) { // When the event is triggered, we remove the event listeners - Cleanup
                    this.removeEventListener(animations[a], headerAnimationHandler, false);
                }
                document.getElementById("terminalCommand").innerHTML = "";
                document.getElementsByClassName("terminal_cursor_loading")[0].className = "terminal_cursor";
                
                // Once the header is loaded, set up the navigation styles and adding appropriate event listeners
                var navigationAnchors = document.querySelectorAll(".pageHeader span");
                for (var i = 0; i < navigationAnchors.length; i++) {
                    navigationAnchors[i].className = "default"
                    navigationAnchors[i].onmouseover = function() {
                        if (this.className.indexOf("active") >= 0) {
                            return;
                        }
                        lastCommand = this.innerHTML.toLowerCase();
                        if (typeCommand) {
                            document.getElementById("terminalCommand").innerHTML = lastCommand;
                        }
                    }
                    navigationAnchors[i].onmouseout = function() {
                        lastCommand = "";
                        if (typeCommand) {
                            document.getElementById("terminalCommand").innerHTML = "";
                        }
                    }

                    navigationAnchors[i].addEventListener("click", function() {
                        if (this.className.indexOf("active") >= 0) {
                            return;
                        }
                        typeText("<span>roy@dhanwal</span>:<span>~</span><span>$</span><br/><br/>Hi, Im Roy.<p>I majored in Computer Science. I graduated from University of Houston.</p><p>I'm a Mac Application Dev in <a href='https://www.plantronics.com/'>Plantronics</a>.</p><p>I love to code, listen to music, and travel.</p>If you would like to get in touch with me, whether it be for tech support, a business venture, or to just say hi, feel free to send me an email. My email address is: <a href='mailto:roy@gmail.com'>roy@gmail.com</a>.<ul><li>Option 1</li><li>Option 2</li><li>Option 3</li><li>Option 4</li><li>Option 5</li></ul>",
                        15, 100, this);
                    });
                }
                // Once the navigation is set, make a click on the first navigation menu to show default content
                if (navigationAnchors.length > 0) {
                    document.getElementById("terminalCommand").innerHTML = navigationAnchors[0].innerHTML.toLowerCase();
                    navigationAnchors[0].click();
                }
            }

            var header = document.getElementsByClassName("pageHeader")[0];
            for (a in animations) { // Setting up event listeners for the supported animation types for the header
                header.addEventListener(animations[a], headerAnimationHandler, false);
            }
            document.getElementById("terminalCommand").innerHTML = "load menu";
            document.getElementsByClassName("terminal_cursor")[0].className = "terminal_cursor_loading";
            header.className += " pageHeader_animate"; // Start the header animation
        }
        // Animate footer
        var footer = document.getElementsByClassName("pageFooter")[0];
        for (a in animations) { // Setting up event listeners for the supported animation types for the footer
            footer.addEventListener(animations[a], footerAnimationHandler, false);
        }
        footer.className += " pageFooter_animate"; // Start the footer animation
    }, loaderTotalTime);
}

function typeText(typingText, typeSpeed, typeInterval, clickedElement) {
    typeCommand = false;
    var activeElements = document.querySelectorAll("span.active");
    // If there is an active element, make it a normal by setting its class to default
    if (activeElements.length > 0) {
        activeElements[0].className = "default";
    }
    var navAnchors = document.querySelectorAll("span.default");
    // Disable all navigation menus, so that we don't have a click on another navigation menu while processing this function
    for (var j = 0; j < navAnchors.length; j++) {
        navAnchors[j].className = "disable";
    }
    // Show the clicked navigation menu as active
    clickedElement.className = "active";
    var cursor = document.getElementsByClassName("terminal_cursor")[0];
    cursor.className = "terminal_cursor_loading";

    var Typer = {
        text: typingText,
        index: 0,
        speed: typeSpeed,
        element: document.getElementById("contentHolder"),
    
        addText: function() {
            this.index += this.speed;
            this.element.innerHTML = this.text.substring(0, this.index);
        }
    }
    
    var timer = setInterval(function () {
        Typer.addText();
        if (Typer.index >= Typer.text.length) {
            clearInterval(timer);
            // Once the typing is completed, set all navigation menus to normal state by setting the class to default
            for (var j = 0; j < navAnchors.length; j++) {
                navAnchors[j].className = "default";
            }
            // Show the clicked navigation menu as active
            clickedElement.className = "active";
            document.getElementById("terminalCommand").innerHTML = lastCommand;
            cursor.className = "terminal_cursor";
            typeCommand = true;
        }
    }, typeInterval);
}
