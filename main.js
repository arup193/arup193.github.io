var typeCommand = true;
var lastCommand = "";

function doLoad() {
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
    var loaderIntervalTime = 50, loaderFadeTime = 1250, loaderTotalTime = (Math.ceil(width / fontSize) * (loaderIntervalTime * 1.5)) + loaderFadeTime + 750, loaderTime = loaderTotalTime - loaderFadeTime;

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

                    if (navigationAnchors.length == 6) {
                        navigationAnchors[0].addEventListener("click", function() {
                            if (this.className.indexOf("active") >= 0) {
                                return;
                            }
                            typeText("<span style='margin-left: 5vw;'>Welcome, my name is Arup. I am a software developer who loves to write software to build great products and help business succeed with ther goals. I have been working  professionally in Software development since 2015 in the desktop and web application spaces. I have also had academic experience in mobile application development.</span><br/><br/><span style='margin-left: 5vw;'>Even though, I love to write to code in any language; my favourite programming language is C++. I am interested in learning technologies and love to solve problems. My all time favourite problem is to play with prime numbers and keep trying to improvise Sieving algorithms. I believe there is always a scope to learn and improve myself in my field of work. So I keep trying to learn everyday as much as I can.</span><br/><br/><span style='margin-left: 5vw;'>Please feel free to explore. :)</span>",
                            15, 50, this);
                        });

                        navigationAnchors[1].addEventListener("click", function() {
                            if (this.className.indexOf("active") >= 0) {
                                return;
                            }
                            typeText("<h3>Programming Languages</h3><span>: C, C++, Objective C, Java, JavaScript, C#, Unix Scripting</span><br/><br/><h3>Web Skills and Markup Languages</h3><span>: HTML, XML, JSP, CSS</span><br/><br/><h3>Skills on Mobile Platform</h3><span>: Android app development using Java, iOS app development using Objective C</span><br/><br/><h3>Database and Servers</h3><span>: MySQL, SQL Server, Oracle, SQLite, Apache Tomcat, JBoss, Windows Server</span><br/><br/><h3>Web Services</h3><span>: RESTful</span><br/><br/><h3>Third-party Frameworks and Libraries</h3><span>: Boost, Chromium Embedded Framework, Electron, libudev, Selenium</span><br/><br/><h3>IDEs and Tools</h3><span>: Xcode, NetBeans, Eclipse, Visual Studio, Xamarin Studio, Android Studio, Instruments</span><br/><br/><h3>Version Control and Defect Management</h3><span>: Perforce, GitHub, Bitbucket. Jira, Rally, TeamTrack</span><br/><br/><h3>Operating Systems</h3><span>: Windows XP/7/8/10, Mac OS X, Ubuntu 16.04</span><br/><br/>",
                            15, 50, this);
                        });

                        navigationAnchors[2].addEventListener("click", function() {
                            if (this.className.indexOf("active") >= 0) {
                                return;
                            }
                            typeText("<span><h3>Masters</h3> in <h3>Computer Science</h3> from <h3>University of Houston Clear Lake</h3></span><br/><br/><span><h3>Bachelors</h3> in <h3>Computer Science</h3> from <h3>DRK Institute of Science and Technology</h3></span>",
                            15, 100, this);
                        });

                        navigationAnchors[3].addEventListener("click", function() {
                            if (this.className.indexOf("active") >= 0) {
                                return;
                            }
                            typeText("<div><h3>Plantronics Inc: Mac Application Developer (July 2016 - Present)</h3><br/><ul><li>Worked on cross platform apllication that interacts with large set of Human Interface Device.</li><li>Designed native libraries for Mac and Linux platforms, integrated them with cross-platform code.</li><li>C++ was used heavily to write cross-platform code.</li><li>Maintained build scripts for multiple platforms.</li></ul></div><div><h3>Tietronix Software Inc: Software Development Engineer - Intern (Jan 2016 - June 2016)</h3><br/><ul><li>Developed a mobile application using Xamarin for iOS and Android platforms that used bluetooth and location to register users to meetings.</li><li>Used SQLite.NET to develop the database connectivity layer as a cross-platform module.</li><li>Designed a web-based dashboard using JSP to show statistical data from XML files that are generated when software interacts with machinery working in space.</li></ul></div><div><h3>Mindagile LLC : Software Development Engineer - Intern (Jul 2015 - Dec 2015)</h3><br/><ul><li>Used WPF and C# under Windows platform to develop an application Red Point Application for a bio-medical organization.</li><li>Integrated SciChart library with the application to create charts from input data.</li><li>Implemented the MV VM architectural pattern to bind data to different views such as grid view and list view; added pagination and sorting capabilities to each view.</li></ul></div><div><h3>University of Houston Clear Lake : Research Assistant and Independent Study (Jan 2015 - Aug 2015)</h3><br/><ul><li>Developed an Android application, which runs parallel algorithm on the GPU of the mobile device using OpenCL library and Java NDK to compare computational speed of serial processing on CPU and parallel processing on GPU.</li><li>Designed a web crawler to fetch data from a social networking site Pinterest and determine relation between multiple users.</li></ul></div>",
                            15, 30, this);
                        });

                        navigationAnchors[4].addEventListener("click", function() {
                            if (this.className.indexOf("active") >= 0) {
                                return;
                            }
                            typeText("<div style='margin-bottom: 4vw;'><h2>University of Houston Clear Lake</h2><div style='margin-bottom: 2vw;'><h3>Powered by Science Mobile Application</h3><br/><span style='margin-left: 5vw'>A useful classroom tool to support instructions in science, math and reading comprehension. Worked on Unity to convert a web-based application into a mobile gaming application compatible with both iOS and Android platforms. Worked on its performance by removing redundant UI renderings.</span></div><div><h3>Photo Puzzle</h3><br/><span style='margin-left: 5vw'>An iOS gaming application to transform a scrambled image into a meaningful big picture based on three ideal factors: the total amount of time taken to arrange the picture, total scores and the number of moves made.</span></div></div><div><h2>DRK Institute of Science and Technology</h2><div style='margin-bottom: 2vw;'><h3>Client Server Based Data Encryption System using DES and AES</h3><br/><span style='margin-left: 5vw'>The application provided secure message transfer between authorized and authenticated users. The concept of cryptography was implemented to ensure secure and efficient message transfers.</span></div><div><h3>Packet-Hiding Methods for Preventing Selective Jamming Attack</h3><br/><span style='margin-left: 5vw'>Secure data transmission through a wireless network between source and destination using techniques such as Encryption, Hiding Commitment Scheme and Puzzle Hiding Scheme.</span></div></div>",
                            15, 30, this);
                        });

                        navigationAnchors[5].addEventListener("click", function() {
                            if (this.className.indexOf("active") >= 0) {
                                return;
                            }
                            typeText("<ul><li>Successfully wrote an implementation paper on Face detection using Image Processing during my Masters and developed a small application using MATLAB implementing the algorithm.</li><li>Won first prize in technical competitions like C-Debugging and Web Designs continuously for three years during Bachelor's.</li></ul>",
                            15, 100, this);
                        });
                    }
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

var resizeListener;
var didLoaderRun = false;

function init() {
    if (didLoaderRun == false) {
        clearTimeout(resizeListener);
        resizeListener = setTimeout(function() {
            didLoaderRun = true;
            doLoad();
        }, 500);
    }
}

// This method is needed because, sometimes the browser is resizing after onload - mostly when you open a new window and run
function resize() {
    if (didLoaderRun == false) {
        clearTimeout(resizeListener);
        resizeListener = setTimeout(function() {
            didLoaderRun = true;
            doLoad();
        }, 500);
    }
}
