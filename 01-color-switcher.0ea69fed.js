!function(){var t=document.querySelector("button[data-start]"),n=document.querySelector("button[data-stop]"),o=null;function e(){return"#".concat(Math.floor(16777215*Math.random()).toString(16))}function d(o,e){t.disabled=o,n.disabled=e}n.disabled=!0,t.addEventListener("click",(function(){document.body.style.backgroundColor=e(),d(!0,!1),o=setInterval((function(){document.body.style.backgroundColor=e()}),1e3)})),n.addEventListener("click",(function(){d(!1,!0),document.body.style.backgroundColor="#fff",clearInterval(o)}))}();
//# sourceMappingURL=01-color-switcher.0ea69fed.js.map
