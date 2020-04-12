## **Day4 Note**


---
### `本日主要內容 --`
#### 1. 練習Array的各種操作(共8題)
---


### `解析 --`


### ***Array.prototype.filter()***

1.找出於1500~1599年間出生的inventor

```js
  // 簡化的arrow function
  const fifteen = inventors.filter(inventor => inventor.year >= 1500 && inventor.year < 1600);
  // 運用filter()來篩選符合出生年介於1500~1599年的inventor,會將結果為true的資料組成陣列回傳

  // 未簡化的function
  const fifteen = inventors.filter(function(inventor) {
    if (inventor.year >= 1500 && inventor.year < 1600) {
      return true;
    }
  });

  console.table(fifteen);  // 於console輸出表格

```

---

### ***Array.prototype.map()***

2.將inventors內的first和last組合成陣列

```js

// 簡化的arrow function
const fullNames = inventors.map((inventor) => `${inventor.first} ${inventor.last}`);
// 運用map()來結合first和last並回傳一個陣列


// 未簡化的function
const fullNames = inventors.map(function(inventor) {
  return inventor.first + ' ' + inventor.last;
});

```

---

### ***Array.prototype.sort()***

3.依據生日排序inventor，由大至小

```js

// 簡化的arrow function
const ordered = inventors.sort((a, b) => a.year > b.year ? 1 : -1)
// 運用sort()將inventor兩兩比對及排序,如a大於b,b的index低於a,b會在a的前面, 如a小於b,b的index高於a,b會在a的後面


// 未簡化的function
const ordered = inventors.sort(function(a, b)) {
  if (a.year > b.year) {
    return 1;
  } else {
    return -1;
  }
}

```


5.依據年齡由大至小排序inventor

```js

const oldest = inventors.sort(function (a, b) {
      const lastInventor = a.passed - a.year; // 先計算出a年齡在進入sort()比對排序
      const nextInventor = b.passed - b.year; // 先計算出b年齡在進入sort()比對排序
      return lastInventor > nextInventor ? -1 : 1; 
});


```


---


### ***Array.prototype.reduce()***

4.加總所有inventor的年齡(passed - year)

```js

// 簡化的arrow function
const totalYear = inventors.reduce((total, inventor) => {
      return total + (inventor.passed - inventor.year);
    }, 0)  // 運用redece()進行年齡加總,total為累加器,將inventor的年齡累加進去,最後的0為初始值,即表示最初total=0

// 未簡化的function
let totalYears = 0;
for (let i = 0; i < inventors.length; i++) {
    let liveYear = inventors[i].passed - inventors[i].year;
    totalYears += liveYear;
}

```


8.分別計算data內每個種類的數量

```js

const transportation = data.reduce(function (obj, item) {
    if (!obj[item]) {
        obj[item] = 0;
    }
    obj[item]++;
        return obj;
}, {});
// 設定obj={}, 如果item尚未存在obj, 則新增進obj內並進行次數累加, 若以在obj內則直接進行累加

```

---

### ***Mixed***

6.列出提供網址中巴黎所有包含"de"的路名(map() + filter() & includes())

```js

const category = document.querySelector('.mw-category');  // 選取出className=mx-category
const links = Array.from(category.querySelectorAll('a')); // 選取出所有a標籤的物件, Array.fromr將nodeList轉為Array
const de = links
            .map(link => link.textContent)
            .filter(streetName => streetName.includes('de'));
// 將textContent用map()結合成陣列後,再使用filter()來篩選出streetNmae中有包含"de"的字串就加入陣列

```


7.依據lastName排序所有資料(sort() & split())

```js

// 由於poeplo的資料都是含有逗點的字串,故先需處理好資料
const alpha = people.sort((lastOne, nextOne) => {
    const [aLast, aFirst] = lastOne.split(', ');  // 運用split()切割出lastNme 
    const [bLast, bFirst] = nextOne.split(', ');  // 運用split()切割出lastNme 
    return aLast > bLast ? 1 : -1;  // 進行比對排序
});

```

---

### **`補充 --`**
* filter() -- 常使用於篩選符合條件物件並回傳新陣列
  * var newArray = arr.filter(callback(element[, *index[, *array]])[, *thisArg])  *:選擇性使用
  * filter會將所有陣列中的元素分別傳入至callback中,並檢核所有元素符合條件者(回傳值為true者)建構成一個新陣列
  * [MDN--filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)


* map() -- 常使用於將原始變數進行運算後回傳新陣列
  * let new_array = arr.map(function callback(currentValue[, *index[, *array]]) {// return element for new_array}[, *thisArg])
  * map會將原陣列的每個元素經由進行函式運算，將運算後的結果建構成一個新陣列
  * [MDN--map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

* sort() -- 常使用於重新排序陣列
  * arr.sort([*compareFunction])
  * compareFunction(a, b)，如回傳值小於0，則會把a排在小於b的索引位置；如回傳值為0，則a與b不改變彼此順序，但會與其他全部元素來排序；如回傳值大於0，則會把a牌在大於b的索引位置
  * **特別須注意sort會排序原陣列，並不會新增新陣列**
  * [MDN--sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)


* reduce() -- 常使用於累加數值
  * arr.reduce(callback[accumulator, currentValue, *currentIndex, *array], *initialValue)
  * reduce將一個累加器即陣列中的每項元素傳入函式，並將陣列化為單一值
  * callback四個參數分別為累加器、原陣列正在處理中的元素、原陣列正在處理的元素索引值、使用reduce的陣列
  * initialValue為設定累加器的初始值，默認值為原陣列第一個元素
  * [MDN--redure()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)


* includes()
  * arr.includes(searchElement[, *fromIndex])
  * 判斷陣列中是否包含特定元素，並以此回傳true或false
  * [MDN--includes()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)


* split()
  * str.split([separator[, limit]])
  * 使用指定分隔符來對物件進行分割並返回陣列
  * [MDN--split()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)