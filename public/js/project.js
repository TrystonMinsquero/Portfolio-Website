// get a copy because we add to the list during iteration
const content = Array.from(document.getElementById("showdown-content").children);

console.log(content.length);

var divWrapper;
var lastHTagIndex = -1;
for(var i = 0; i < content.length; i++){
    if(content[i].tagName === "H2" || content[i].tagName === "H3"){
        if(lastHTagIndex >= 0) {
            // have to add 1 to not include H
            for(var j = lastHTagIndex + 1; j < i; j++){
                console.log(content[j]);
                divWrapper.appendChild(content[j]);
            }
        }
        divWrapper = document.createElement('div');
        //divWrapper.classList.add("content-wrap");
        divWrapper.classList.add("showdown-box");
        content[i].after(divWrapper);
        lastHTagIndex = i;
    }
}

for(var j = lastHTagIndex + 1; j < content.length; j++){
    console.log(content[j]);
    divWrapper.appendChild(content[j]);
}

