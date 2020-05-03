## **Day25 Note**

### `本日主要內容 --`

#### 1. 探討 addEventListener 事件

---

### `解析 --`

```js
const divs = document.querySelectorAll("div");
const button = document.querySelector("button");

function logText(e) {
  console.log(this.classList.value);
  e.stopPropagation();
}

divs.forEach((div) =>
  div.addEventListener("click", logText, {
    // capture: true
    capture: false,
    once: true,
  })
);

button.addEventListener(
  "click",
  () => {
    console.log("Click!!");
  },
  {
    once: true,
  }
);
```

---

### **`補充 --`**

- EventTarget.addEventListener(type, function, capture);
  - type: 監聽類型
  - function: 監聽類型觸發後執行的功能
  - capture:
    1. capture: 預設為 false, 事件觸發時由內往外捕捉(bubbling phase)，設定為 true，事件觸發時由外往內捕捉(capture phase)，如要一有事件觸發就終止 capture，則須於 function 內加入 e.stopPropagation()，
    2. once: 設定為 true 時，表示事件只執行一次，事件觸發後直接遮蔽掉這個元素及事件
  - [W3C--Phase](https://www.w3.org/TR/2003/NOTE-DOM-Level-3-Events-20031107/events.html#Events-phases)
