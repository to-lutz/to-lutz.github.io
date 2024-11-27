/*! `markdown` grammar compiled for Highlight.js 11.10.0 */
var hljsGrammar=(()=>{"use strict";return e=>{const n={begin:/<\/?[A-Za-z_]/,
    end:">",subLanguage:"xml",relevance:0},a={variants:[{begin:/\[.+?\]\[.*?\]/,
    relevance:0},{
    begin:/\[.+?\]\(((data|javascript|mailto):|(?:http|ftp)s?:\/\/).*?\)/,
    relevance:2},{
    begin:e.regex.concat(/\[.+?\]\(/,/[A-Za-z][A-Za-z0-9+.-]*/,/:\/\/.*?\)/),
    relevance:2},{begin:/\[.+?\]\([./?&#].*?\)/,relevance:1},{
    begin:/\[.*?\]\(.*?\)/,relevance:0}],returnBegin:!0,contains:[{match:/\[(?=\])/
    },{className:"string",relevance:0,begin:"\\[",end:"\\]",excludeBegin:!0,
    returnEnd:!0},{className:"link",relevance:0,begin:"\\]\\(",end:"\\)",
    excludeBegin:!0,excludeEnd:!0},{className:"symbol",relevance:0,begin:"\\]\\[",
    end:"\\]",excludeBegin:!0,excludeEnd:!0}]},i={className:"strong",contains:[],
    variants:[{begin:/_{2}(?!\s)/,end:/_{2}/},{begin:/\*{2}(?!\s)/,end:/\*{2}/}]
    },s={className:"emphasis",contains:[],variants:[{begin:/\*(?![*\s])/,end:/\*/},{
    begin:/_(?![_\s])/,end:/_/,relevance:0}]},c=e.inherit(i,{contains:[]
    }),t=e.inherit(s,{contains:[]});i.contains.push(t),s.contains.push(c)
    ;let l=[n,a];return[i,s,c,t].forEach((e=>{e.contains=e.contains.concat(l)
    })),l=l.concat(i,s),{name:"Markdown",aliases:["md","mkdown","mkd"],contains:[{
    className:"section",variants:[{begin:"^#{1,6}",end:"$",contains:l},{
    begin:"(?=^.+?\\n[=-]{2,}$)",contains:[{begin:"^[=-]*$"},{begin:"^",end:"\\n",
    contains:l}]}]},n,{className:"bullet",begin:"^[ \t]*([*+-]|(\\d+\\.))(?=\\s+)",
    end:"\\s+",excludeEnd:!0},i,s,{className:"quote",begin:"^>\\s+",contains:l,
    end:"$"},{className:"code",variants:[{begin:"(`{3,})[^`](.|\\n)*?\\1`*[ ]*"},{
    begin:"(~{3,})[^~](.|\\n)*?\\1~*[ ]*"},{begin:"```",end:"```+[ ]*$"},{
    begin:"~~~",end:"~~~+[ ]*$"},{begin:"`.+?`"},{begin:"(?=^( {4}|\\t))",
    contains:[{begin:"^( {4}|\\t)",end:"(\\n)$"}],relevance:0}]},{
    begin:"^[-\\*]{3,}",end:"$"},a,{begin:/^\[[^\n]+\]:/,returnBegin:!0,contains:[{
    className:"symbol",begin:/\[/,end:/\]/,excludeBegin:!0,excludeEnd:!0},{
    className:"link",begin:/:\s*/,end:/$/,excludeBegin:!0}]},{scope:"literal",
    match:/&([a-zA-Z0-9]+|#[0-9]{1,7}|#[Xx][0-9a-fA-F]{1,6});/}]}}})()
    ;export default hljsGrammar;