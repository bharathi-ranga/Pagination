let data = "";
let val = 0;
var table = document.createElement("table");
var tableDiv = document.querySelector(".tableDiv");
table.setAttribute("class", "table");
tableDiv.append(table);
table.style.border = "2px solid black";
table.style.width = "100%";

var thead = document.createElement("thead");
table.append(thead);
thead.style.fontWeight = "bold";
thead.style.fontSize = "1.5rem";

var tbody = document.createElement("tbody");
table.append(tbody);

function createRow(elementName, val) {
  var td = document.createElement(elementName);
  td.innerHTML = val;
  return td;
}
function appendtoTable(elem, dest) {
  dest.append(elem);
  return dest;
}
tr1 = createRow("tr", "");
appendtoTable(tr1, thead);
td1 = createRow("td", "email");
td2 = createRow("td", "id");
td3 = createRow("td", "name");
tr1.append(td1, td2, td3);

function displayData(val) {
  fetch(
    "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json"
  )
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      data = result;
      let k = 10;
      for (i = val; k > 0; k--) {
        j = val * 10 - k;

        tr = createRow("tr", "");
        appendtoTable(tr, tbody);

        td1 = createRow("td", data[j].email);
        td2 = createRow("td", data[j].id);
        td3 = createRow("td", data[j].name);

        tr.append(td1, td2, td3);
        td1.style.width = "30%";
        td2.style.width = "30%";
        td3.style.width = "30%";
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function clickExecute(elem, temp = 0) {
  if (temp == 0) val = Number(elem.value);
  else {
    val = temp;
    temp = 0;
  }
  tbody.innerHTML = "";
  displayData(val);
}

function clickNext(elem) {
  console.log(val);
  if (val == 0) {
    val = 1;
    elem.value = 1;
    clickExecute(elem);
  } else if (val != 10) {
    val = val + 1;
    clickExecute(elem, val);
  } else if (val == 10) {
    alert("You are already on last page, No next page exits");
  }
}

function clickPrev(elem) {
  console.log(val);
  if (val == 0 || val == 1) {
    alert("You are already on First page, No previous page exits");
  } else {
    val = val - 1;
    clickExecute(elem, val);
  }
}
