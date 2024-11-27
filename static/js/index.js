let currentLine = 1;
let currentLineElem = document.querySelector(".editor-line-text-selected");
let lineNumElem = document.querySelector(".editor-line-numbers");
let textAreaElem = document.querySelector(".editor-text-input");

textAreaElem.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        currentLineElem.classList.remove("editor-line-text-selected");

        let lineNum = document.createElement("div");
        lineNum.classList.add("editor-line-text");
        lineNum.id = "lineNum" + (currentLine + 1);
        lineNum.innerHTML = currentLine + 1;
        lineNumElem.appendChild(lineNum);

        currentLineElem = lineNum;
        currentLine++;

        // Refresh all Line Numbers
        refreshLineNumbers();
    }
});

textAreaElem.addEventListener("keydown", (e) => {
    if (e.key === "Backspace") {
        if (getTextAtLine(currentLine) <= 1 && currentLine > 1) {
            document.querySelector("#lineNum" + currentLine).remove();
            currentLineElem = document.querySelector("#lineNum" + (currentLine - 1));
            currentLine--;

            // Refresh all Line Numbers
            refreshLineNumbers();
        }
    }
});

textAreaElem.addEventListener("click", (e) => { // Click change cursor
    currentLineElem.classList.remove("editor-line-text-selected");

    currentLine = getCurrentLineNumber();
    currentLineElem = document.querySelector("#lineNum" + currentLine);
    refreshLineNumbers();
});

function getCurrentLineNumber() {
    let cursorPosition = textAreaElem.selectionStart;
    let text = textAreaElem.value;
    let lines = text.slice(0, cursorPosition).split("\n");
    return lines.length;
}

function getTextAtLine(line) {
    let cursorPosition = textAreaElem.selectionStart;
    let text = textAreaElem.value;
    let lines = text.slice(0, cursorPosition).split("\n");
    return lines[line - 1];
}

function refreshLineNumbers() {
    document.querySelectorAll(".editor-line-text").forEach((e, index) => {
        e.id = "lineNum" + (index + 1);
        e.innerHTML = (index + 1);

        if (index + 1 == currentLine) {
            e.classList.add("editor-line-text-selected");
        } else {
            e.classList.remove("editor-line-text-selected");
        }
    });
}

function getUrlParameter(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

const fileId = getUrlParameter('fileId');

if (fileId) {
    document.querySelectorAll('.editor-file').forEach(element => {
        if (element.dataset.id === fileId) {
            element.classList.add('editor-file-selected');
        } else {
            element.classList.remove('editor-file-selected');
        }
    });
}