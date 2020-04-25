## **Day17 Note**

### `本日主要內容 --`

#### 1. 運用正則運算式排除某些部份進行陣列排序

---

### `解析 --`

```js
const bands = [
  "The Plot in You",
  "The Devil Wears Prada",
  "Pierce the Veil",
  "Norma Jean",
  "The Bled",
  "Say Anything",
  "The Midway State",
  "We Came as Romans",
  "Counterparts",
  "Oh, Sleeper",
  "A Skylit Drive",
  "Anywhere But Here",
  "An Old Dog",
];

// 運用正則將陣列內容開頭為a、the、an用空白替換掉,並且運用trim()將a、the、an後面跟著的空格過濾掉
function strip(bandName) {
  return bandName.replace(/^(a |the |an )/i, "").trim();
}

// 運用sort()將陣列內容一一比對排序
const sortedBands = bands.sort((a, b) => (strip(a) > strip(b) ? 1 : -1));

// 將排序完的陣列放入li中於頁面顯示, 避免陣列內容連接的","一併顯示故運用join將連接改為""
document.querySelector("#bands").innerHTML = sortedBands
  .map((band) => `<li>${band}</li>`)
  .join("");
```

---

### **`補充 --`**

- trim()
  - 刪除字串兩端的空白
  - [MDN--String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
