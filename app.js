function updateTIME() {
    var currentTime = new Date().toLocaleString();
    var timeText = document.querySelector("#timeElement");
    timeText.innerHTML = currentTime;
}

setInterval(updateTIME, 1000);

// Make the DIV element draggable:
dragElement(document.getElementById("welcome"));
dragElement(document.getElementById("notes"));

// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
  // Step 2: Set up variables to keep track of the element's position.
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  // Step 3: Check if there is a special header element associated with the draggable element.
  if (document.getElementById(element.id + "header")) {
    // Step 4: If present, assign the `dragMouseDown` function to the header's `onmousedown` event.
    // This allows you to drag the window around by its header.
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    // Step 5: If not present, assign the function directly to the draggable element's `onmousedown` event.
    // This allows you to drag the window by holding down anywhere on the window.
    element.onmousedown = startDragging;
  }

  // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
  function startDragging(e) {
    document.getElementById("welcomeheader").classList.add("grabbing");
    e = e || window.event;
    e.preventDefault();
    // Step 7: Get the mouse cursor position at startup.
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDragElement`).
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }

  // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 10: Calculate the new cursor position.
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
  function stopDragging() {
    document.getElementById("welcomeheader").classList.remove("grabbing");
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

var welcomescreen = document.getElementById("welcome");
var welcomeclose = document.getElementById("welcomeclose");
var welcomeopen = document.getElementById("name");

var notesscreen = document.getElementById("notes");
var notesclose = document.getElementById("notes-close");

var topBar = document.getElementById("top");

var biggestZIndex = 1;

function closeWindow(element) {
    element.style.display = "none";
}

function openWindow(element) {
  element.style.display = "flex";
  biggestZIndex++;
  element.style.zIndex = biggestZIndex;
  if (topBar) topBar.style.zIndex = biggestZIndex + 1;
}

welcomeclose.addEventListener("click", function() {
  closeWindow(welcomescreen);
});

welcomeopen.addEventListener("click", function() {
  openWindow(welcomescreen);
});

notesclose.addEventListener("click", function() {
  closeWindow(notesscreen);
});

var selectedIcon = undefined;

function selectIcon(element) {
    element.classList.add("selected");
    selectedIcon = element;
}

function deselectIcon(element) {
    element.classList.remove("selected");
    selectedIcon = undefined;
}

function handleIconTap(element) {
  var isVisible = window.getComputedStyle(notesscreen).display !== 'none';
  if (isVisible) {
    closeWindow(notesscreen);
    if (element.classList.contains('selected')) deselectIcon(element);
  } else {
    selectIcon(element);
    openWindow(notesscreen);
  }
}

var notesAppIcon = document.getElementById("notes-app");
if (notesAppIcon) {
  notesAppIcon.addEventListener("click", function() {
    handleIconTap(notesAppIcon);
  });
}

function addWindowTapHandling(element) {
    element.addEventListener("mousedown", () =>
        handleWindowTap(element)
    );
}

function handleWindowTap(element) {
      biggestZIndex++;
  element.style.zIndex = biggestZIndex;
  if (topBar) topBar.style.zIndex = biggestZIndex + 1;
  if (selectedIcon) deselectIcon(selectedIcon);
}

if (typeof addWindowTapHandling === 'function') {
  document.querySelectorAll('.window').forEach(function(el) {
    addWindowTapHandling(el);
  });
}

function initializeIcon(name) {
    var icon = document.querySelector("#" + name + "Icon");
    var screen = document.querySelector("#" + name);
    icon.addEventListener("click", function() {
        handleIconTap(icon, screen);
    });
}

function initializeWindow(elementName) {
    var screen = document.querySelector("#" + elementName);
    addWindowTapHandling(screen);
    makeCLosable(elementName);
    dragElement(screen);
    if(elementName != "welcome") {
        initializeIcon(elementName);
    }
}

initializeWindow("welcome");
initializeWindow("notes");