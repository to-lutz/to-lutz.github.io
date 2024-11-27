import hljs from 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.10.0/build/es/highlight.min.js';
// import bash from 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.10.0/build/es/languages/bash.min.js';
// import cpp from 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.10.0/build/es/languages/cpp.min.js';
// import css from 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.10.0/build/es/languages/css.min.js';
// import http from 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.10.0/build/es/languages/http.min.js';
// import java from 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.10.0/build/es/languages/java.min.js';
import javascript from 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.10.0/build/es/languages/javascript.min.js';
// import json from 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.10.0/build/es/languages/json.min.js';
// import markdown from 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.10.0/build/es/languages/markdown.min.js';
// import php from 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.10.0/build/es/languages/php.min.js';
// import powershell from 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.10.0/build/es/languages/powershell.min.js';
// import python from 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.10.0/build/es/languages/python.min.js';
// import shell from 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.10.0/build/es/languages/shell.min.js';
// import sql from 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.10.0/build/es/languages/sql.min.js';
// import vbscripthtml from 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.10.0/build/es/languages/vbscript-html.min.js';
import xml from 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.10.0/build/es/languages/xml.min.js';

hljs.registerLanguage('html', xml);
hljs.registerLanguage('javascript', javascript)

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

function setLines(lineAmt) {
    lineNumElem.innerHTML = "";
    for (let i = 1; i <= lineAmt; i++) {
        let lineNum = document.createElement("div");
        lineNum.classList.add("editor-line-text");
        lineNum.id = "lineNum" + i;
        lineNum.innerHTML = i;
        lineNumElem.appendChild(lineNum);
    }
    currentLine = lineAmt;
    currentLineElem = lineNumElem.lastChild;
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

let curFileId = 1;

document.querySelectorAll(".editor-file").forEach(elem => elem.addEventListener("click", (e) => {
    curFileId = elem.dataset.id;
    refreshFiles();
}));

function refreshFiles() {
    document.querySelectorAll('.editor-file').forEach(element => {
        if (element.dataset.id === curFileId) {
            element.classList.add('editor-file-selected');

            fetch("./static/js/json/file" + curFileId + ".json").then((res) => res.json()).then((data) => {
                if (data.text.length > 0) {
                    textAreaElem.innerHTML = hljs.highlight(
                        data.text,
                        { language: data.lang }
                    ).value;
                    setLines(data.text.split("\n").length);
                }
            });
        } else {
            element.classList.remove('editor-file-selected');
        }
    });
}