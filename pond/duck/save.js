function addSaveButton() {
  var editorBar = document.getElementById("editorBar");
  var tabs = editorBar && editorBar.querySelectorAll(".tab");
  if (!editorBar || !tabs || tabs.length < 2) {
    setTimeout(addSaveButton, 50);
    return;
  }

  var blocksTab = tabs[0];
  var javascriptTab = tabs[1];
  var saveButton = document.createElement("button");
  saveButton.id = "saveButton";
  saveButton.type = "button";
  saveButton.title = "Save the current code to a JavaScript file.";
  saveButton.textContent = "Save";
  editorBar.appendChild(saveButton);

  saveButton.addEventListener("click", function() {
    var wasBlocksSelected = blocksTab.classList.contains("tab-selected");
    if (wasBlocksSelected) {
      javascriptTab.click();
    }

    var code = window.ace.edit("editor").getValue();
    if (wasBlocksSelected) {
      blocksTab.click();
    }

    var file = new Blob([code], {type: "text/javascript;charset=utf-8"});
    var url = URL.createObjectURL(file);
    var link = document.createElement("a");
    link.href = url;
    link.download = "pond-duck.js";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(function() {
      URL.revokeObjectURL(url);
    }, 1000);
  });
}

window.addEventListener("load", addSaveButton);