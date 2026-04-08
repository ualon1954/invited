var form = document.getElementById("myForm"),
    // imgInput = document.querySelector(".img"),
    // file = document.getElementById("imgInput"),
    vphone = document.getElementById("phone"),
    vid = document.getElementById("id"),
    vinvname = document.getElementById("invname"),
    vstatus = document.getElementById("status"),
    vqynt = document.getElementById("qynt"),
    vtable1 = document.getElementById("table1"),
    vqynt1 = document.getElementById("qynt1"),
    vtable2 = document.getElementById("table2"),
    vqynt2 = document.getElementById("qynt2"),
    // sDate = document.getElementById("sDate"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser")
    let tbody = document.querySelector("tbody");
let api = "https://script.google.com/macros/s/AKfycbyhXb7EKkJOAie1ZYGzM-WAsYvR2PSuIGnCOUs3ux3cFWE_mdMxB2dJpCdS8x2X77H4hw/exec";

// let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []

let isEdit = false, editId
//showInfo()

// newUserBtn.addEventListener('click', ()=> {
//     submitBtn.innerText = 'Submit',
//     modalTitle.innerText = "Fill the Form"
//     isEdit = false
//     imgInput.src = "./image/Profile Icon.webp"
//     form.reset()
// })


// file.onchange = function(){
//     if(file.files[0].size < 1000000){  // 1MB = 1000000
//         var fileReader = new FileReader();

//         fileReader.onload = function(e){
//             imgUrl = e.target.result
//             imgInput.src = imgUrl
//         }

//         fileReader.readAsDataURL(file.files[0])
//     }
//     else{
//         alert("This file is too large!")
//     }
// }


function showInfo() {
    fetch(api)
    .then(res=>res.json())
    .then(data=> {
        let tbodyHTML = "";
        

       data.forEach(g => {
        
        tbodyHTML += `<tr>
          <td>${g["Name"]}</td>
          <td>${g["Status"] || "ממתין"}</td>
          <td>${g["Qynt"] || 0}</td>
          
          <td>
              <button class="btn btn-success" onclick="readInfo('${g["ID"]}', '${g["Name"]}', '${g["Phone"]}', '${g["Status"]}', '${g["Qynt"]}', '${g["Table1"]}', '${g["Qynt1"]}',
              '${g["Table2"]}', '${g["Qynt2"]}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>
          </td>
        </tr>`;
      });
  

  document.querySelector("#guestTable tbody").innerHTML = tbodyHTML;
  table_rows = document.querySelectorAll("tbody tr");
  document.getElementById("total").value = document.querySelector('tbody').rows.length;
  document.getElementById("records").value = document.querySelector('tbody').rows.length;
  getYes(document.querySelector('tbody').rows.length);
  getNo(document.querySelector('tbody').rows.length);
  getNoRsp(document.querySelector('tbody').rows.length);
  getUniqueValuesFromColumn();
  });
}
showInfo()

function getYes(len) {
    //alert(len);
    var table1 = document.getElementById("guestTable");
   
   
    var count = 0;
    for (var i=1;i<len+1;i++) {

        
        if (table1.rows[i].cells[1].innerText === "מגיע") {
            count++;
        }
        
    }
   
    document.getElementById("yes").value  = count;
}

function getNo(len) {
    //alert(len);
    var table1 = document.getElementById("guestTable");
   
   
    var count = 0;
    for (var i=1;i<len+1;i++) {

        
        if (table1.rows[i].cells[1].innerText === "לא מגיע") {
            count++;
        }
        
    }
   
    document.getElementById("no").value  = count;
}

function getNoRsp(len) {
    //alert(len);
    var table1 = document.getElementById("guestTable");
   
   
    var count = 0;
    for (var i=1;i<len+1;i++) {

        
        if (table1.rows[i].cells[1].innerText === "ממתין") {
            count++;
        }
        
    }
   
    document.getElementById("norsp").value  = count;
}
function readInfo(id, invname, phone, status, qynt, table1, qynt1, table2, qynt2){
    document.querySelector('#showId').value = id,
    document.querySelector('#showInvname').value = invname,
    document.querySelector('#showPhone').value = phone,
    document.querySelector("#showStatus").value = status,
    document.querySelector("#showQynt").value = qynt,
    document.querySelector("#showTable1").value = table1,
    document.querySelector("#showQynt1").value = qynt1,
    document.querySelector("#showTable2").value = table1,
    document.querySelector("#showQynt2").value = qynt2
}


function editInfo(invname, status, qynt, table1, qynt1, table2, qynt2){
    // isEdit = true
    // editId = index
    // imgInput.src = pic
    vinvname.value = invname,
    vstatus.value = status,
    vqynt.value =qynt,
    vtable1.value = table1,
    vqynt1.value = qynt1,
    vtable2.value = table2,
    vqynt2.value=qynt2
    
    submitBtn.innerText = "עדכון"
    modalTitle.innerText = "עדכון פרטים"
}


function deleteInfo(index){
    if(confirm("Are you sure want to delete?")){
        getData.splice(index, 1)
        localStorage.setItem("userProfile", JSON.stringify(getData))
        showInfo()
    }
}


form.addEventListener('submit', (e)=> {
    e.preventDefault()

    const information = {
        picture: imgInput.src == undefined ? "./image/Profile Icon.webp" : imgInput.src,
        employeeName: userName.value,
        employeeAge: age.value,
        employeeCity: city.value,
        employeeEmail: email.value,
        employeePhone: phone.value,
        employeePost: post.value,
        startDate: sDate.value
    }

    if(!isEdit){
        getData.push(information)
    }
    else{
        isEdit = false
        getData[editId] = information
    }

    localStorage.setItem('userProfile', JSON.stringify(getData))

    submitBtn.innerText = "Submit"
    modalTitle.innerHTML = "Fill The Form"

    //showInfo()

    form.reset()

    imgInput.src = "./image/Profile Icon.webp"  

    // modal.style.display = "none"
    // document.querySelector(".modal-backdrop").remove()
})


// 1. Searching for specific data of HTML table
//const search = document.querySelector('.input-group input');
//const search = document.querySelector('.name-filter');

//search.addEventListener('input', onchange);

function searchTable() {
       table_rows.forEach((row, i) => {
        console.log(i);
        let table_data = row.textContent.toLowerCase();
        search_data = search.value.toLowerCase();
        row.classList.toggle('hide', table_data.indexOf(search_data) < 0);
        row.style.setProperty('--delay', i / 25 + 's');
        })
    console.log(document.querySelectorAll('tbody tr:not(.hide)'));
    document.querySelectorAll('tbody tr:not(.hide)').forEach((visible_row, i) => {
        visible_row.style.backgroundColor = (i % 2 == 0) ? 'transparent' : '#0000000b';
    });
}

document.getElementById("searchInput").addEventListener("keyup", function () {
    let filter = this.value;
    let rows = document.querySelectorAll("#guestTable tbody tr");

    rows.forEach(row => {
        let cell = row.cells[1]; // column index (Name = 1)
        let text = cell.textContent;

        if (text.includes(filter)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});

//2. Sorting | Ordering data of HTML table

const table_headings = document.querySelectorAll('thead th');

table_headings.forEach((head, i) => {
  
    let sort_asc = true;
    head.onclick = () => {
        table_headings.forEach(head => head.classList.remove('active'));
        head.classList.add('active');

        document.querySelectorAll('td').forEach(td => td.classList.remove('active'));
        table_rows.forEach(row => {
            row.querySelectorAll('td')[i].classList.add('active');
        })

        head.classList.toggle('asc', sort_asc);
        sort_asc = head.classList.contains('asc') ? false : true;

        sortTable(i, sort_asc);
    }
})
  

function sortTable(column, sort_asc) {
       [...table_rows].sort((a, b) => {
        let first_row = a.querySelectorAll('td')[column].textContent.toLowerCase(),
            second_row = b.querySelectorAll('td')[column].textContent.toLowerCase();
       

        return sort_asc ? (first_row < second_row ? 1 : -1) : (first_row < second_row ? -1 : 1);
    })
        .map(sorted_row => document.querySelector('tbody').appendChild(sorted_row));
}

//3. Filtering| HTML table data

// Get unique values for the desired columns

// {2 : ["M", "F"], 3 : ["RnD", "Engineering", "Design"], 4 : [], 5 : []}

function getUniqueValuesFromColumn() {

    var unique_col_values_dict = {}

    allFilters = document.querySelectorAll(".table-filter")
    allFilters.forEach((filter_i) => {
        col_index = filter_i.parentElement.getAttribute("col-index");
        
        const rows = document.querySelectorAll("#guestTable tbody tr")
        //console.log(rows);
        rows.forEach((row) => {
            cell_value = row.querySelector("td:nth-child("+col_index+")").innerHTML;
            //console.log(cell_value);
            // if the col index is already present in the dict
            if (col_index in unique_col_values_dict) {

                // if the cell value is already present in the array
                if (unique_col_values_dict[col_index].includes(cell_value)) {
                    // alert(cell_value + " is already present in the array : " + unique_col_values_dict[col_index])

                } else {
                    unique_col_values_dict[col_index].push(cell_value)
                    // alert("Array after adding the cell value : " + unique_col_values_dict[col_index])

                }


            } else {
                unique_col_values_dict[col_index] = new Array(cell_value)
            }
        });

        
    });

    // for(i in unique_col_values_dict) {
    //     alert("Column index : " + i + " has Unique values : \n" + unique_col_values_dict[i]);
    // }

   updateSelectOptions(unique_col_values_dict)

};

//getUniqueValuesFromColumn();

// Add <option> tags to the desired columns based on the unique values

function updateSelectOptions(unique_col_values_dict) {
    allFilters = document.querySelectorAll(".table-filter")

    allFilters.forEach((filter_i) => {
        col_index = filter_i.parentElement.getAttribute('col-index')

        unique_col_values_dict[col_index].forEach((i) => {
            filter_i.innerHTML = filter_i.innerHTML + `\n<option value="${i}">${i}</option>`
        });

    });
};


// Create filter_rows() function

//Dashboard functions  
function totalInv() {
    document.getElementById('arrivalSelect').value = "";
    filter_rows();
   
}

function yes() {
    document.getElementById('arrivalSelect').value = "מגיע";
    filter_rows();
   
}
function no() {
    document.getElementById('arrivalSelect').value = "לא מגיע";
    filter_rows();
}

function norsp() {
    document.getElementById('arrivalSelect').value = "ממתין";
    filter_rows();
}

// filter_value_dict {2 : Value selected, 4:value, 5: value}

function filter_rows() {
    var total = 0;  
    allFilters = document.querySelectorAll(".table-filter")
    var filter_value_dict = {}

    allFilters.forEach((filter_i) => {
        col_index = filter_i.parentElement.getAttribute('col-index')

        value = filter_i.value
        if (value != "all") {
            filter_value_dict[col_index] = value;
        }
    });

    var col_cell_value_dict = {};

    const rows = document.querySelectorAll("#guestTable tbody tr");
    rows.forEach((row) => {
        var display_row = true;

        allFilters.forEach((filter_i) => {
            col_index = filter_i.parentElement.getAttribute('col-index')
            col_cell_value_dict[col_index] = row.querySelector("td:nth-child(" + col_index+ ")").innerHTML
        })

        for (var col_i in filter_value_dict) {
            filter_value = filter_value_dict[col_i]
            row_cell_value = col_cell_value_dict[col_i]
            
            //if (row_cell_value.indexOf(filter_value) == -1 && filter_value != "all") {

            if (row_cell_value != filter_value && filter_value != "all") {
                display_row = false;
                break;
            }


        }

        if (display_row == true) {
            row.style.display = "table-row"
            total = total + 1
           

        } else {
            row.style.display = "none"

        }

         

    })
    document.getElementById("records").value = total;

}
