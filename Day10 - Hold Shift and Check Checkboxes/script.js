const checkboxes = document.querySelectorAll(".checkbox");
const checkAll = document.querySelector("#all");

let lastChecked;

// Modify
function handleCheck(e) {
  let inBetween = false;
  if (e.shiftKey && this.checked && lastChecked && lastChecked.checked) {
    checkboxes.forEach((checkbox) => {
      if (checkbox === this || checkbox === lastChecked) {
        inBetween = !inBetween;
      }

      if (inBetween && this !== lastChecked) {
        checkbox.checked = true;
      }
    });
  }
  lastChecked = this;
}

// ADD
function selectAll(e) {
  checkboxes.forEach((checkbox) => {
    if (e.target.checked) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
  });
}

checkboxes.forEach((checkbox) =>
  checkbox.addEventListener("click", handleCheck)
);

// ADD
checkAll.addEventListener("click", selectAll);
