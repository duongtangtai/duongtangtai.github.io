var glassArr = [];
var tpArr = [];
var glassNum = 0;
var newRow;
var allGlassOptions = ''
var allTpOptions = ''
var currentToppings =[];
var adjustToppingPrice = 0;
var currentGlass;
var toppingMap = new Map(); //glassId - array topping Ids
var totalOrders;

$(document).ready(function () {
    //how to inject inside the fucking body
    glassArr = [
        {
            id: 'ts_tt_m',
            description: 'TT M',
            price: '17',
            type: 'ly'
        },
        {
            id: 'ts_tt_l',
            description: 'TT L',
            price: '22',
            type: 'ly'
        },
        {
            id: 'ts_nh_m',
            description: 'NH ÔL M',
            price: '18',
            type: 'ly'
        },
        {
            id: 'ts_nh_l',
            description: 'NH ÔL L',
            price: '23',
            type: 'ly'
        },
        {
            id: 'cc_pm_m',
            description: 'CC PM M',
            price: '20',
            type: 'ly'
        },
        {
            id: 'cc_pm_l',
            description: 'CC PM L',
            price: '25',
            type: 'ly'
        },
        {
            id: 'ts_tt_pm_m',
            description: 'TT PM M',
            price: '22',
            type: 'ly'
        },
        {
            id: 'ts_tt_pm_l',
            description: 'TT PM L',
            price: '27',
            type: 'ly'
        },
        {
            id: 'ts_nh_pm_m',
            description: 'NH PM M',
            price: '23',
            type: 'ly'
        },
        {
            id: 'ts_nh_pm_m',
            description: 'NH PM L',
            price: '28',
            type: 'ly'
        },
        {
            id: 'tra_chanh_m',
            description: 'CHANH M',
            price: '15',
            type: 'ly'
        },
        {
            id: 'tra_chanh_l',
            description: 'CHANH L',
            price: '20',
            type: 'ly'
        },
        {
            id: 'tra_tac_m',
            description: 'TẮC M',
            price: '15',
            type: 'ly'
        },
        {
            id: 'tra_tac_l',
            description: 'TẮC L',
            price: '20',
            type: 'ly'
        },
        {
            id: 'tra_dao_m',
            description: 'ĐÀO M',
            price: '25',
            type: 'ly'
        },
        {
            id: 'tra_dao_l',
            description: 'ĐÀO L',
            price: '30',
            type: 'ly'
        },
        {
            id: 'tra_vai_m',
            description: 'VẢI M',
            price: '25',
            type: 'ly'
        },
        {
            id: 'tra_vai_l',
            description: 'VẢI L',
            price: '30',
            type: 'ly'
        },
        {
            id: 'tra_nhan_m',
            description: 'NHÃN M',
            price: '25',
            type: 'ly'
        },
        {
            id: 'tra_nhan_l',
            description: 'NHÃN L',
            price: '30',
            type: 'ly'
        }
    ]
    tpArr = [
        {
            id: 'thach_vai',
            description: 'THẠCH VẢI',
            price: '5',
            type: 'topping'
        },
        {
            id: 'thach_dao',
            description: 'THẠCH ĐÀO',
            price: '5',
            type: 'topping'
        },
        {
            id: 'tc_den',
            description: 'TC ĐEN',
            price: '5',
            type: 'topping'
        },
        {
            id: 'tc_trang',
            description: 'TC TRẮNG',
            price: '5',
            type: 'topping'
        },
        {
            id: 'pm_vien',
            description: 'PM VIÊN',
            price: '5',
            type: 'topping'
        },
        {
            id: 'pd_trung_scl',
            description: 'PD TRỨNG/SCL',
            price: '5',
            type: 'topping'
        },
        {
            id: 'kb_pm',
            description: 'Khúc Bạch PM',
            price: '7',
            type: 'topping'
        },
        {
            id: 'full_top',
            description: 'FULL TOPPING',
            price: '8',
            type: 'topping'
        },
        {
            id: 'vai_nhan_dao_them',
            description: 'VẢI/NHÃN/ĐÀO THÊM',
            price: '5',
            type: 'topping'
        }
    ]



    //init all glass types
    for (var i = 0 ; i < glassArr.length ; i++) {
        allGlassOptions = allGlassOptions.concat(`
        <option value="${glassArr[i].id}|${glassArr[i].price}" ${i == 0 ? "selected" : ""}>
                ${glassArr[i].description}</option>
        `)
    }

    //init all topping types
    for (var i = 0 ; i < tpArr.length ; i++) {
        allTpOptions = allTpOptions.concat(`
            <input class="form-check-input" type="checkbox" value="${tpArr[i].id}|${tpArr[i].price}"
                id="${tpArr[i].id}" onclick=checkTopping(value)>
            <label class="form-check-label">${tpArr[i].description}</label>
        `)
    }
    //init modal
    document.getElementById("my-modal").innerHTML = allTpOptions
    addNewGlass()

})

function addNewGlass() {
    glassNum++;
    var a = `
        <tr id="${glassNum}" style="width:5%">
        <th>${glassNum}</th>
            <td style="width:45%">
                <select class="form-select" name="${glassNum}"
                    aria-label="Default select example" onchange="glassOnChange(name, value)">
    `
    //all glass here
    var b = `
                </select>
            </td>
            <td name="price" style="width:10%">${glassArr[0].price}</td>
            <td style="width:40%">
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                    onclick=openModal(${glassNum})>
                    Add
                </button>
                <button type=button class="btn btn-danger" onclick="removeGlass(${glassNum})">Xóa</button>
            </td>
        </tr>
        <div class="collapse" id="collapse${glassNum}" style="display:flex">
            `
    var c =
          `
        </div>
    `;
    document.getElementById("table-body").innerHTML = document.getElementById("table-body").innerHTML + 
        a + allGlassOptions + b + c;
    calculateTotalPrice()
}

function removeGlass(glassId) {
    document.getElementById(glassId).remove() 
    toppingMap.delete(glassId) //delete from current glasses
    calculateTotalPrice();
}

function saveOrder() {
    //store all the glasses in localhost
    localStorage.setItem("test", "OK")
}


function glassOnChange(glassId, value) {
    document.getElementById(glassId).querySelector(`option[selected]`).removeAttribute("selected")
    document.getElementById(glassId).querySelector(`option[value='${value}']`).setAttribute("selected",'')
    var glassPrice = value.substring(value.indexOf("|") + 1);
    var toppingPrice = 0;
    var toppings = (toppingMap.get(parseInt(glassId)) == undefined ? [] : toppingMap.get(parseInt(glassId)));
    for (var i = 0 ; i < toppings.length ; i++) {
        var value = document.getElementById(toppings[i]).value;
        toppingPrice += parseInt(parseInt(value.substring(value.indexOf("|") + 1)));
    }

    if (value != '') { //if not empty => get the glass money + toppings money
        document.getElementById(glassId).querySelector("td[name='price']").innerHTML = 
            parseInt(glassPrice) + parseInt(toppingPrice);
    } else { //if empty just topping money
        document.getElementById(glassId).querySelector("td[name='price']").innerHTML = toppingPrice;
    }
    calculateTotalPrice()
}

function openModal(glassId) {
    currentGlass = glassId;
    //init toppings
    if (toppingMap.get(currentGlass) != undefined) { //if this glass has toppings already
        currentToppings = toppingMap.get(currentGlass);
        //loop to checked toppings
        for (var i = 0 ; i < currentToppings.length ; i++) {
            document.getElementById(currentToppings[i]).setAttribute("checked",'');
        }
    }
}

function saveModal() {
    console.log("save modal")
    //save toppings belonging to the glass
    toppingMap.set(currentGlass, currentToppings);
    //adjust the price of the glass 
    var currentPrice = document.getElementById(currentGlass).querySelector("td[name='price']").innerHTML;
    document.getElementById(currentGlass).querySelector("td[name='price']").innerHTML
        = parseInt(currentPrice == '' ? 0 : currentPrice) 
        + parseInt(adjustToppingPrice);
    console.log("set adjust topping price 0")
    adjustToppingPrice = 0;
    alert("Thêm topping thành công!")
    $('#exampleModal').modal('toggle')
    calculateTotalPrice()
}

function closeModal() {
    console.log("close modal")
    document.getElementById("my-modal").innerHTML = allTpOptions
    currentToppings = [];
    adjustToppingPrice = 0;
    calculateTotalPrice()
}


function checkTopping(value) {
    var toppingId = value.substring(0, value.indexOf("|"));
    var toppingPrice = value.substring(value.indexOf("|") + 1);
    //check whether it's checked or unchecked
    if (document.getElementById(toppingId).checked) { //if checked => add topping to current toppings
        currentToppings.push(toppingId);
        adjustToppingPrice += parseInt(toppingPrice)
        console.log("add more price! adjust topping price: " + adjustToppingPrice)
    } else { //remove topping from current toppings
        currentToppings = currentToppings.filter(e => e != toppingId);
        adjustToppingPrice -= parseInt(toppingPrice)
        console.log("decrease price! adjust topping price: " + adjustToppingPrice)
    }
}

function calculateTotalPrice() {
    var prices = document.querySelectorAll("td[name='price']");
    var totalPrice = 0;
    for (var i = 0 ; i < prices.length ; i++) {
        totalPrice += parseInt(prices[i].innerHTML);
    }
    document.getElementById("totalPrice").innerHTML = totalPrice
    document.getElementById("totalQuantity").innerHTML = prices.length
}

function newOrder() {
    console.log("new order!")
    document.getElementById("table-body").innerHTML = '';
    glassNum = 0;
    addNewGlass();
}

function saveOrder() {
    if (confirm("Bạn có muốn lưu đơn hàng?")) {
        var order = [];
        //fetch all glasses by querySelectAll
        for (var i = 1 ; i <= glassNum ; i++) {
            if (document.getElementById(i) == undefined) {
                continue;
            }
            var toppings = toppingMap.get(i) == undefined ? [] : toppingMap.get(i)
            // toppingID => toppingID|Price
            toppings.forEach((e, index) => {
                toppings[index] = document.getElementById(e).value
            })
            var glassObj = {
                id : i,
                glass : document.getElementById(i).querySelector("option[selected]").value,
                toppings : toppings
            }
            order.push(glassObj)
        }
        if (localStorage.getItem("totalOrders") == undefined) {
            console.log("no storage found=>create new one")
            localStorage.setItem("totalOrders", JSON.stringify([order]))
        } else {
            totalOrders = JSON.parse(localStorage.getItem("totalOrders"));
            console.log("found storage")
            console.log(totalOrders)
            totalOrders.push(order)
            localStorage.setItem("totalOrders", JSON.stringify(totalOrders))
        }
    }
}

function newOrder() {
    document.getElementById("title").innerHTML = "Đơn hàng mới"
    document.getElementById("table-body").innerHTML = '';
    document.getElementById("column2").innerHTML = 'Tên';
    document.getElementById("addNewGlassBtn").removeAttribute("hidden")
    document.getElementById("saveOrderBtn").removeAttribute("hidden")
    glassNum = 0;
    currentToppings = [];
    toppingMap.clear();
    addNewGlass();
}

function allOrders() {
    console.log("all orders")
    document.getElementById("title").innerHTML = "Tổng Đơn Hàng"
    document.getElementById("table-body").innerHTML = '';
    document.getElementById("column2").innerHTML = 'Số Ly';
    document.getElementById("addNewGlassBtn").setAttribute("hidden",'')
    document.getElementById("saveOrderBtn").setAttribute("hidden",'')
    //fetch local to get orders
    totalOrders = localStorage.getItem("totalOrders") == undefined ? [] : 
        JSON.parse(localStorage.getItem("totalOrders"));
    //loop to put in the table body
    console.log(totalOrders)
    var tableBody = '';
    var totalGlass = 0;
    var totalPrice = 0;
    for (var i = 0 ; i < totalOrders.length ; i++) { //loop every order
        console.log("loop each order")
        var numOfGlass = 0;
        var orderPrice = 0;
        var currentOrder = totalOrders[i];
        for (var j = 0 ; j < currentOrder.length ; j++) {
            numOfGlass++;
            var glass = currentOrder[j].glass
            orderPrice += parseInt(glass.substring(glass.indexOf("|") + 1));
            //loop topping
            var currentToppings = currentOrder[j].toppings;
            for (var a = 0 ; a < currentToppings.length ; a ++) {
                console.log("loop top")
                orderPrice += parseInt(currentToppings[a].substring(currentToppings[a].indexOf("|") + 1));
            }
        }
        console.log("numOfGlass: " + numOfGlass)
        console.log("orderPrice: " + orderPrice)
        totalGlass += numOfGlass;
        totalPrice += orderPrice;
        //put them in the table
        var orderRow = `
        <tr>
            <th>${i+1}</th>
            <td>
                ${numOfGlass}
            </td>
            <td>
                ${orderPrice}
            </td>
            <td>
                <button type=button class="btn btn-success" onclick="orderDetail(${glassNum})">Xem</button>
                <button type=button class="btn btn-danger" onclick="removeOrder(${glassNum})">Xóa</button>
            </td>
        </tr>
        `;
        tableBody = tableBody.concat(orderRow);
    }
    document.getElementById("table-body").innerHTML = tableBody
    document.getElementById("totalQuantity").innerHTML = totalGlass
    document.getElementById("totalPrice").innerHTML = totalPrice
}