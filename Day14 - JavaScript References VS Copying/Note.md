## **Day14 Note**

---

### `本日主要內容 --`

#### 1. 練習 JS 的引用和複製

---

### `解析 --`

### **_Call By Value_**

---

```js
// Call By Value中操作是不會互相影響的, 兩者雖畫上等號,但實際上只是把值拷貝給對方, 兩者存在的記憶體位置不同, 故不會受對方干擾
let age = 100;
let age2 = age;
console.log(age, age2); // 100 100
age = 200;
console.log(age, age2); // 200 100

let name = "Wes";
let name2 = name;
console.log(name, name2); // Wes Wes
name = "Wesley";
console.log(name, name2); // Wesley Wes
```

### **_Call By Reference_**

---

```js
// Call By Reference中物件會相互影響, 以此處陣列範例來說明, 當players被宣告時會在記憶體中建立一個物件的位置,並將players指向物件, 當宣告team和players相同時會將記憶體中的物件傳給team,所以players和team都會指向同樣一個物件,此時如果操作其中一個物件則會兩者都受影響
const players = ["Wes", "Sarah", "Ryan", "Poppy"];

const team = players;

console.log(players, team);
// ['Wes', 'Sarah', 'Ryan', 'Poppy'], ['Wes', 'Sarah', 'Ryan', 'Poppy']

// 當改變team裡面的物件時會發現輸出結果中players內的物件也產生變化
team[3] = "Lux";
console.log(players, team);
// ['Wes', 'Sarah', 'Ryan', 'Lux'], ['Wes', 'Sarah', 'Ryan', 'Lux']

// 如果想避免相互影響的狀況發生,可以複製產生一個新陣列來使用, 如此兩者物件會存放在不同記憶體中, 便不會相互干擾, 而在陣列中有以下常用四種方法可以使用

// 1. 運用slice()來切割出新的陣列(無賦值等於複製整個陣列)
const team2 = players.slice();

// 2. 用一個空陣列搭配concat()來合併出一個新陣列
const team3 = [].concat(players);
// 3. 運用spread直接使用複製成新陣列
const team4 = [...players];
team4[3] = "heeee hawwww";
console.log(team4);
// 4. 運用Array.from()亦可達到複製新陣列效果
const team5 = Array.from(players);

// 接下來是物件的Call By Reference, 跟陣列一樣必須複製產生一個新物件, 如此才不會相互影響, 以下為常用兩種方法
const person = {
  name: "Wes Bos",
  age: 80,
};

// 1. 使用Object.assign()指定一個空物件並放入目標物件
const cap2 = Object.assign({}, person, { number: 99, age: 12 });
console.log(cap2);

// 2. 與陣列相同,運用spread直接使用複製
const cap3 = { ...person };
```

### **_Call By Sharing_**

---

```js
// Call By Sharing是一個稍微在進階一點的概念, 簡單來說就是當在物件中存在小物件(b)時, 即使是已經運用複製產生新物件的方式去操作, 但複製來的新物件中的小物件(c)與原物件存在的小物件(b)為相同物件, 此時當改變小物件(c)的值時, 原物件的小物件(b)亦會改變

const wes = {
  name: "Wes",
  age: 100,
  social: {
    twitter: "@wesbos",
    facebook: "wesbos.developer",
  },
};

// 當dev改變facebook的內容時, 會發現wes的facebook內容亦同時改變, 如想避免此狀況, 除非於複製過去的同時進行social的改變讓兩者成為不同的東西時(dev2), 便不會相互影響, 但現實情況有時是無法在複製過去的同時就產生變化
const dev = Object.assign({}, wes);
dev.social.facebook = "hello.developer";

const dev2 = Object.assign({}, wes, {
  social: { twitter: "@hello", facebook: "hello.world" },
});

// 再來另外一種方式就是運用JSON來轉換使用, 首先先使用JSON.stringify將物件打包序列化成JSON字串, 再使用JSON.parse將序列化的字串解析成新物件, 此時兩個物件已全是不同物件, 即使dev3內的social內容改變也不會影響到wes
const dev3 = JSON.parse(JSON.stringify(wes));
```

---

### **`補充 --`**

- JSON(JavaScript Object Notation)

  - 將結構化資料呈現為物件的標準格式，常用於網站上的資料呈現、傳輸等，較易於人理解、閱讀及編寫，同時也易於機器解析和生成
  - [MDN--JSON](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON)

- Object.assign(target, ...sources)

  - 用來複製一個或多個物件自身所有可數的屬性到另一個目標物件，並回傳合併目標物件及(多個)來源物件所得到的最終物件
  - [MDN--Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
