## **Day12 Note**

<div align=center><img src="" width=800></div>

---
### `本日主要內容 --`
#### 1. 在網頁輸入特定密碼串時，會觸發特效

---


### `解析 --`

```js

  const pressed = []; // 空陣列用於保存輸入值
  const secretCode = "coding"; // 設定的隱藏密碼

  window.addEventListener("keyup", (e) => {
    // 監聽整個視窗的鍵盤動作
    pressed.push(e.key); // 將鍵盤輸入的值放入空陣列中
    pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length); // 透過splice()讓陣列長度始終與隱藏密碼長度相符, 以利於比對輸入內容是否與隱藏密碼相同
    if (pressed.join("").includes(secretCode)) {
      // 將陣列中的值轉為字串用includes()比對是否內有隱藏密碼,如存在則觸發效果
      cornify_add();
    }
  })

```


---

### **`補充 --`**
* Array.prototype.splice()
  * splice() 藉由切割陣列的方式增加新元素或刪除原元素等功能來改變陣列

* https://www.cornify.com
  * 本次圖片效果來自於cornify，內含數種獨角獸或彩虹的圖案，運用在輸入隱藏密碼成功後隨機生成一張圖片顯示於網頁中的效果
