## **Day9 Note**


---
### `本日主要內容 --`
#### 1. 練習chrome開發工具(DOM break on & 13種console方法)
---


### `解析 --`


### ***Regular***

```js
  console.log("Hello"); // 最常用的一般輸出
```

---

### ***Interpolated***

```js
  let word = "test";
  console.log("Hello I am a %s string!", word); // 加入%s即可於第二參數放入指定字串一同輸出
  console.log(`Hello I am a ${word} string!`); //或使用模版字符串(``)
```

---

### ***Style***

```js
  console.log("%c I am some great text", "font-size: 50px; background: red; text-shadow: 10px 10px 0 blue;")  // 字符串開頭加入%c可給該字符串帶入CSS樣式, 於第二參數放入欲加入之CSS樣式
```

---

### ***Warning***

```js
  console.warn("OH NOOOOOO!!");  // 顯示警告圖示
```

---

### ***Error***

```js
  console.error("ERRORRRRR!!!"); // 顯示錯誤圖示
```

---

### ***Info***

```js
  console.info("Here have some info..."); // 顯示資訊圖示
```

---

### ***Test***

```js
  console.assert(1 === 2, "That's impossible");

  const p = document.querySelector("p");
  console.assert(p.classList.contains("ouch"), "You did not select the right Element!");
  // 用於判斷是否為真, true不會回傳任何訊息, 若為false則會回傳對應的錯誤訊息(第二參數)
```

---

### ***Clear***

```js
  console.clear(); // 清除console所有訊息, window可用ctrl + L
```

---

### ***Viewing DOM Elements***

```js
  console.log(p);
  console.dir(p); // 可以顯示物件的所有屬性
```

---

### ***Group together***

```js
    dogs.forEach(dog => {
      // console.group(`${dog.name}`);
      console.groupCollapsed(`${dog.name}`);
      console.log(`This is ${dog.name}`);
      console.log(`${dog.name} is ${dog.age} years old`);
      console.log(`${dog.name} is ${dog.age * 7} dog years old`);
      console.groupEnd(`${dog.name}`);
    })
    // 把輸出的資訊利用group包起來,使用group()或groupCollapsed()為開頭,結尾為groupEnd()
```

---

### ***Count***

```js
    console.count("Wes");   // Wes: 1
    console.count("Steve");  // Steve: 1
    console.count("Wes");  // Wes: 2
    console.count("Steve"); // Steve: 2
    console.count("Wes");  // Wes: 3
    console.count("Steve");  // Steve: 3
    console.count("Wes");  // Wes: 4
    console.count("Wes");  // Wes: 5
    console.count("Wes");  // Wes: 6
    console.count("Steve");  // Steve: 4
    console.count("Steve");  // Steve: 5
    // 累加出現次數
```

---

### ***Time***

```js
  console.time("fetching data");
  fetch("http://api.github.com/users/wesbos")
    .then(data => data.json())
    .then(data => {
      console.timeEnd("fetching data");
      console.log(data);
    })
    // 用來計算區域內執行的時間(開始為time(),結束為timeEnd())
```

---

### ***Table***

```js    
  console.table(dogs);  // 將資料整理成table格式輸出
```

---

### **`補充 --`**

* DOM BREAK ON
  * DOM的中斷點模式可以用來鎖定目標並查看目標變化狀態，共有三種觸發模式可選(可複選)
  * subtree modifications 當子元素點發生變化時
  * arrtibute modifications 當元素發生變化時
  * node removal 當元素被移除時

* Google Dev Tool
  [開發者工具](https://developers.google.com/web/tools/chrome-devtools/)

