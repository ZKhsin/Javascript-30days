const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const items = JSON.parse(localStorage.getItem("items")) || [];
// ADD
const all = document.querySelector(".all");

function addItem(e) {
  e.preventDefault();
  const text = this.querySelector("[name=item]").value;
  const item = {
    text,
    done: false,
  };

  items.push(item);
  populationList(items, itemsList);
  localStorage.setItem("items", JSON.stringify(items));
  this.reset();
}

function populationList(plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `
    <li>
    <input type="checkbox" data-index=${i} id="item${i}" ${
        plate.done ? "checked" : ""
      }>
    <label for="item${i}">${plate.text}</label>
    <button class="btn">delete</button>
    </li>
    `;
    })
    .join("");
}

// ADD
function toggleDone(e) {
  if (!e.target.matches("input") && !e.target.matches("button")) return;
  let saveData = false;
  const el = e.target;
  const index = el.dataset.index;
  if (e.target.matches("input")) {
    items[index].done = !items[index].done;
    saveData = true;
  } else if (e.target.matches("button")) {
    items.splice(index, 1);
    saveData = true;
  }
  if (saveData) {
    localStorage.setItem("items", JSON.stringify(items));
    populationList(items, itemsList);
  }
}

// ADD
function selectAll(e) {
  const checkAll = e.target.checked;
  items.forEach((index) => {
    index.done = checkAll;
  });
  localStorage.setItem("items", JSON.stringify(items));
  populationList(items, itemsList);
}

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);
// ADD
all.addEventListener("click", selectAll);

populationList(items, itemsList);
