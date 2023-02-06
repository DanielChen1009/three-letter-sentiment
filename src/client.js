const addData = require("./index.js");

function handleClick() {
    // import {addData} from "./index.js";
    console.log("CLICKED")
    addData("tester", 1, 1).then(r => {
    })
}

