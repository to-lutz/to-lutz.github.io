let currentLine = 1; // Current Line for Editor
let currentLineElem = document.querySelector(".editor-line-text-selected");
let lineNumElem = document.querySelector(".editor-line-numbers");

document.querySelector(".editor-text-input").addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        currentLineElem.classList.remove("editor-line-text-selected");

        let lineNum = document.createElement("div");
        lineNum.classList.add("editor-line-text");
        lineNum.classList.add("editor-line-text-selected");
        lineNum.innerHTML = currentLine+1;
        lineNumElem.appendChild(lineNum);

        currentLineElem = lineNum;

        currentLine++;
    }
});