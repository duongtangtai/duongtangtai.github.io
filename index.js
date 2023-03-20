var glassArr = [];
var tpArr = [];
var glassNum = 0;
var newRow;
var allGlassOptions = ''
var allTpOptions = ''
var currentToppings = [];
var adjustToppingPrice = 0;
var currentGlass;
var toppingMap = new Map(); //glassId - array topping Ids
var totalOrders;

$(document).ready(function () {
    //how to inject inside the fucking body
    glassArr = [
        {
            id: 'tt_m',
            description: 'TT M',
            price: '17',
            type: 'ly'
        },
        {
            id: 'tt_l',
            description: 'TT L',
            price: '22',
            type: 'ly'
        },
        {
            id: 'nh_m',
            description: 'NH M',
            price: '18',
            type: 'ly'
        },
        {
            id: 'nh_l',
            description: 'NH L',
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
            id: 'tt_pm_m',
            description: 'TT PM M',
            price: '22',
            type: 'ly'
        },
        {
            id: 'tt_pm_l',
            description: 'TT PM L',
            price: '27',
            type: 'ly'
        },
        {
            id: 'nh_pm_m',
            description: 'NH PM M',
            price: '23',
            type: 'ly'
        },
        {
            id: 'nh_pm_l',
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
        },
        {
            id: 'st_dd_m',
            description: 'ĐĐ M',
            price: '25',
            type: 'ly'
        },
        {
            id: 'st_dd_l',
            description: 'ĐĐ L',
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
    for (var i = 0; i < glassArr.length; i++) {
        allGlassOptions = allGlassOptions.concat(`
        <option value="${glassArr[i].id}|${glassArr[i].price}" ${i == 0 ? "selected" : ""}>
                ${glassArr[i].description}</option>
        `)
    }

    //init all topping types
    for (var i = 0; i < tpArr.length; i++) {
        allTpOptions = allTpOptions.concat(`
            <div style="font-size:20px;margin:5px;" id="${tpArr[i].id}">
            <button type=button class="btn btn-info" style="width:50%">
                ${tpArr[i].description}</button>
            <span style="width:5%"> x </span>
            <span name="tp_quantity" style="width:15%"> 0 </span>
            <button type=button class="btn btn-info" style="width:15%;" 
                onclick=addTopping('${tpArr[i].id}|${tpArr[i].price}')>+</button>
            <button type=button class="btn btn-danger" style="width:15%;"
                onclick=removeTopping('${tpArr[i].id}|${tpArr[i].price}')>-</button>
            </div>
        `)
    }
    //init modal
    document.getElementById("modalBody").innerHTML = allTpOptions
    //init order => if there's no current order => create new order
    localStorage.getItem("currentOrder") == undefined ? newOrder() : initCurrentOrder();
})

function initCurrentOrder() {
    console.log("INIT CURRENT ORDER:")
    var order = JSON.parse(localStorage.getItem("currentOrder"));
    console.log(order)
    var glassData = '';
    var additionalPriceMap = new Map();
    for (var i = 0; i < order.length; i++) { //for each glass
        var id = order[i].id; //id of the glass
        var glass = order[i].glass; // id|price
        var toppings = order[i].toppings; // id|price|quantity
        //store in toppingMap like (id, toppingId|toppingPrice|toppingQuantity)
        var toppingValues = [];
        var toppingPrices = 0;
        for (var j = 0; j < toppings.length; j++) {
            toppingValues.push(toppings[j]);
            var arr = toppings[j].split("|")
            toppingPrices += parseInt(arr[1]) * parseInt(arr[2]);
        }
        toppingMap.set(id, toppingValues)
        console.log("toppingMap after map " + id + ":")
        console.log(toppingMap)
        additionalPriceMap.set(id, toppingPrices) //set id of the glass with addtional price;
        //with each glass => get data and store in a string to put in the table
        glassData = glassData.concat(getGlassData(id, glass.substring(glass.indexOf("|") + 1)))
    }
    //the next glass will have the next number
    glassNum = order[order.length - 1] == undefined ? 0 : order[order.length - 1].id;
    //put data in table
    document.getElementById("table-body").innerHTML = glassData;
    //set selected glass and add more price of toppings
    console.log("START!")
    console.log("order:")
    console.log(order)
    console.log("additional price map:")
    console.log(additionalPriceMap)
    for (var i = 0; i < order.length; i++) {
        var id = order[i].id;
        var glass = order[i].glass;
        var glassElement = document.getElementById(id);
        //remove default selection
        glassElement.querySelector("option[selected]").removeAttribute("selected");
        //set new selection
        glassElement.querySelector(`option[value='${glass}']`).setAttribute("selected", '');
        //add more price of toppings
        glassElement.querySelector(`td[name='price']`).innerHTML =
            parseInt(glassElement.querySelector(`td[name='price']`).innerHTML)
            + parseInt(additionalPriceMap.get(id));
    }
    calculateTotalPrice();
}

function getGlassData(glassNum, glassPrice) {
    var a = `
        <tr id="${glassNum}" style="width:5%">
        <th>${glassNum}</th>
            <td style="width:45%">
                <select class="form-select" name="${glassNum}"
                    aria-label="Default select example" onchange="glassOnChange(name, value)">
    `
    //glass options right here
    var b = `
        </select>
            </td>   
            <td name="price" style="width:10%">${glassPrice}</td>
            <td style="width:40%">
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal1"
                    onclick=openModal(${glassNum})>
                    Add
                </button>
                <button type=button class="btn btn-danger" onclick="removeGlass(${glassNum})">Xóa</button>
            </td>
        </tr>
    `;
    return a + allGlassOptions + b;
}


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
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal1"
                    onclick=openModal(${glassNum})>
                    Add
                </button>
                <button type=button class="btn btn-danger" onclick="removeGlass(${glassNum})">Xóa</button>
            </td>
        </tr>
    `;
    document.getElementById("table-body").innerHTML = document.getElementById("table-body").innerHTML +
        a + allGlassOptions + b;
    calculateTotalPrice()
    saveCurrentOrder();
}

function removeGlass(glassId) {
    if (confirm("Xóa ly này?")) {
        document.getElementById(glassId).remove()
        toppingMap.delete(glassId) //delete from current glasses
        calculateTotalPrice();
        saveCurrentOrder();
    }
}

function glassOnChange(glassId, value) {
    console.log("GLASS ON CHANGE WITH GLASS ID: " + glassId + " and value: " + value)
    document.getElementById(glassId).querySelector(`option[selected]`).removeAttribute("selected")
    document.getElementById(glassId).querySelector(`option[value='${value}']`).setAttribute("selected", '')
    var glassPrice = value.substring(value.indexOf("|") + 1);
    var toppingPrice = 0;
    var toppings = (toppingMap.get(parseInt(glassId)) == undefined ? [] : toppingMap.get(parseInt(glassId)));
    console.log("toppings for glass id: " + glassId);
    console.log("toppings before get inside the loop: " + toppings)
    for (var i = 0; i < toppings.length; i++) {
        var arr = toppings[i].split("|")
        toppingPrice += parseInt(arr[1]) * parseInt(arr[2]);
    }
    if (value != '') { //if not empty => get the glass money + toppings money
        document.getElementById(glassId).querySelector("td[name='price']").innerHTML =
            parseInt(glassPrice) + parseInt(toppingPrice);
    } else { //if empty just topping money
        document.getElementById(glassId).querySelector("td[name='price']").innerHTML = toppingPrice;
    }
    calculateTotalPrice();
    saveCurrentOrder();
}

function openModal(glassId) {
    console.log("OPEN MODAL!")
    currentGlass = glassId;
    var description = document.getElementById(currentGlass)
        .querySelector("option[selected='']").innerHTML;
    document.getElementById("myModalTitle").innerHTML = `
        <h3>Thêm Topping cho ly số ${currentGlass}</h3>
        <span>(${description} )</span>
    `;
    //init toppings
    if (toppingMap.get(glassId) != undefined) { //if this glass has toppings already
        currentToppings = toppingMap.get(glassId);
        console.log("currentToppings: ")
        console.log(currentToppings); //id|price|quantity
        //loop to init topping & quantity
        for (var i = 0; i < currentToppings.length; i++) {
            var id = currentToppings[i].substring(0, currentToppings[i].indexOf("|"));
            var quantity = currentToppings[i].substring(currentToppings[i].lastIndexOf("|") + 1);
            document.getElementById(id).querySelector("span[name='tp_quantity']").innerText = quantity;
        }
    }
}

function saveModal() {
    //save toppings belonging to the glass (glassId, [(toppingId|toppingPrice|toppingQuantity)])
    toppingMap.set(currentGlass, currentToppings);
    //adjust the price of the glass 
    var currentPrice = document.getElementById(currentGlass).querySelector("td[name='price']").innerHTML;
    document.getElementById(currentGlass).querySelector("td[name='price']").innerHTML
        = parseInt(currentPrice == '' ? 0 : currentPrice)
        + parseInt(adjustToppingPrice);
    adjustToppingPrice = 0;
    alert("Thêm topping thành công!")
}

function closeModal() {
    document.getElementById("modalBody").innerHTML = allTpOptions
    currentToppings = [];
    adjustToppingPrice = 0;
    calculateTotalPrice();
    saveCurrentOrder();
}


function addTopping(value) {
    console.log("addTopping")
    console.log("value: " + value)
    var toppingId = value.substring(0, value.indexOf("|"));
    var toppingPrice = value.substring(value.indexOf("|") + 1);
    console.log("toppingId: " + toppingId)
    console.log("toppingPrice: " + toppingPrice)
    //=> plus 1 in quantity
    var quantity = document.getElementById(toppingId).querySelector("span[name='tp_quantity']").innerText;
    console.log(document.getElementById(toppingId).querySelector("span[name='tp_quantity']"))
    document.getElementById(toppingId).querySelector("span[name='tp_quantity']").innerHTML =
        parseInt(quantity) + 1;

    //=> add more to adjustToppingPrice
    adjustToppingPrice += parseInt(toppingPrice)
    console.log("adjustToppingPrice: " + adjustToppingPrice)

    //=> add the topping to currentToppings. 
    //if the currentToppings already has this topping => increase 1, otherwise => set 1
    console.log("currentToppings before get in the loop:")
    console.log(currentToppings)
    if (currentToppings.length == 0) { //topping length = 0
        console.log("toppings length: 0 => create a new topping")
        currentToppings.push(value + "|" + "1")
    } else { //topping length != 0
        for (var i = 0; i < currentToppings.length; i++) { //value|quantity OR id|price|quantity
            console.log("GET INSIDE currentTopping loop")
            if (currentToppings[i].substring(0, currentToppings[i].lastIndexOf("|")) == value) {
                console.log("currentTopping[i] == value");
                console.log("currentTopping[i]:" + currentToppings[i])
                console.log("value: " + value);
                var temp = currentToppings[i]
                currentToppings.splice(i, 1); //splice 1 element out
                //return the element with quantity plus 1
                var newQuantity = parseInt(temp.substring(temp.lastIndexOf("|") + 1)) + 1;
                console.log("oldQuantity : " + parseInt(temp.substring(temp.lastIndexOf("|") + 1)))
                console.log("newQuantity : " + newQuantity);
                currentToppings.push(value + "|" + newQuantity);
                console.log("currentToppings: ");
                console.log(currentToppings)
                break;
            }
            if (i == currentToppings.length - 1) {
                console.log("dont have topping => create a new topping")
                currentToppings.push(value + "|" + "1")
                break;
            }
        }
    }
    console.log("currentToppings after the loop: ");
    console.log(currentToppings)
}

function removeTopping(value) {
    console.log("removeTopping")
    console.log("value: " + value)
    var toppingId = value.substring(0, value.indexOf("|"));
    var toppingPrice = value.substring(value.indexOf("|") + 1);
    console.log("toppingId: " + toppingId)
    console.log("toppingPrice: " + toppingPrice)
    //when this button is click 
    //=> minus 1 in quantity
    var quantity = document.getElementById(toppingId).querySelector("span[name='tp_quantity']").innerText;
    if (quantity == 0) {
        return;//if quantity = 0 => skip
    } else {
        document.getElementById(toppingId).querySelector("span[name='tp_quantity']").innerText = parseInt(quantity) - 1;
    }

    //=> decrease more to adjustToppingPrice
    adjustToppingPrice -= parseInt(toppingPrice)
    console.log("adjustToppingPrice: " + adjustToppingPrice)

    //=> remove the topping from currentToppings. 
    //if the currentToppings already has this topping => decrease 1, otherwise => return
    console.log("currentToppings before get in the loop:")
    console.log(currentToppings)
    if (currentToppings.length == 0) { //topping length = 0
        console.log("toppings length: 0 => skip")
        return;
    } else { //topping length != 0
        for (var i = 0; i < currentToppings.length; i++) { //value|quantity OR id|price|quantity
            console.log("GET INSIDE currentTopping loop")
            if (currentToppings[i].substring(0, currentToppings[i].lastIndexOf("|")) == value) {
                console.log("currentTopping[i] == value");
                console.log("currentTopping[i]:" + currentToppings[i])
                console.log("value: " + value);
                var temp = currentToppings[i]
                currentToppings.splice(i, 1); //splice 1 element out
                //return the element with quantity minus
                var newQuantity = parseInt(temp.substring(temp.lastIndexOf("|") + 1)) - 1;
                console.log("oldQuantity : " + parseInt(temp.substring(temp.lastIndexOf("|") + 1)))
                console.log("newQuantity : " + newQuantity);
                if (newQuantity > 0) { //if > 0 => still in the current toppings
                    currentToppings.push(value + "|" + newQuantity);
                } //otherwise => nope
                console.log("currentToppings: ");
                console.log(currentToppings)
                break;
            }
            if (i == currentToppings.length - 1) {
                return;
            }
        }
    }
    console.log("currentToppings after the loop: ");
    console.log(currentToppings)
}


function calculateTotalPrice() {
    var prices = document.querySelectorAll("td[name='price']");
    var totalPrice = 0;
    for (var i = 0; i < prices.length; i++) {
        totalPrice += parseInt(prices[i].innerHTML);
    }
    document.getElementById("totalPrice").innerHTML = totalPrice
    document.getElementById("totalQuantity").innerHTML = prices.length
}

function saveCurrentOrder() {
    console.log("SAVE CURRENT ORDER:")
    var order = [];
    for (var i = 1; i <= glassNum; i++) { //with each glass => save toppings value (id&price) and quantity
        if (document.getElementById(i) == undefined) {
            continue;
        }
        var toppings = toppingMap.get(i) == undefined ? [] : toppingMap.get(i)
        var glassObj = {
            id: i,
            glass: document.getElementById(i).querySelector("option[selected]").value,
            toppings: toppings
        }
        order.push(glassObj)
    }
    localStorage.setItem("currentOrder", JSON.stringify(order))
    console.log("save current order successfully")
    console.log("current order:")
    console.log(order)
}

function saveOrder() {
    if (confirm("Bạn có muốn lưu đơn hàng?")) {
        var order = [];
        //fetch all glasses by querySelectAll
        for (var i = 1; i <= glassNum; i++) {
            if (document.getElementById(i) == undefined) {
                continue;
            }
            var toppings = toppingMap.get(i) == undefined ? [] : toppingMap.get(i);
            var glassObj = {
                id: i,
                glass: document.getElementById(i).querySelector("option[selected]").value,
                toppings: toppings
            }
            order.push(glassObj)
        }
        if (localStorage.getItem("totalOrders") == undefined) {
            localStorage.setItem("totalOrders", JSON.stringify([order]))
        } else {
            totalOrders = JSON.parse(localStorage.getItem("totalOrders"));
            totalOrders.push(order)
            localStorage.setItem("totalOrders", JSON.stringify(totalOrders))
            alert("Lưu đơn hàng thành công!")
        }
    }
}

function newOrder() {
    document.getElementById("title").innerHTML = "Đơn hàng"
    document.getElementById("table-body").innerHTML = '';
    document.getElementById("column2").innerHTML = 'Tên';
    document.getElementById("addNewGlassBtn").removeAttribute("hidden")
    document.getElementById("saveOrderBtn").removeAttribute("hidden")
    document.getElementById("removeAllOrdersBtn").setAttribute("hidden", '');
    glassNum = 0;
    currentToppings = [];
    toppingMap.clear();
    addNewGlass();
}

function currentOrder() {
    document.getElementById("title").innerHTML = "Đơn hàng"
    document.getElementById("table-body").innerHTML = '';
    document.getElementById("column2").innerHTML = 'Tên';
    document.getElementById("addNewGlassBtn").removeAttribute("hidden")
    document.getElementById("saveOrderBtn").removeAttribute("hidden")
    document.getElementById("removeAllOrdersBtn").setAttribute("hidden", '');
    initCurrentOrder();
}

function allOrders() {
    document.getElementById("title").innerHTML = "Tổng Đơn Hàng"
    document.getElementById("table-body").innerHTML = '';
    document.getElementById("column2").innerHTML = 'Số Ly';
    document.getElementById("addNewGlassBtn").setAttribute("hidden", '')
    document.getElementById("saveOrderBtn").setAttribute("hidden", '')
    document.getElementById("removeAllOrdersBtn").removeAttribute("hidden");
    //fetch local to get orders
    totalOrders = localStorage.getItem("totalOrders") == undefined ? [] :
        JSON.parse(localStorage.getItem("totalOrders"));
    //loop to put in the table body
    var tableBody = '';
    var totalGlass = 0;
    var totalPrice = 0;
    for (var i = 0; i < totalOrders.length; i++) { //loop every order
        var numOfGlass = 0;
        var orderPrice = 0;
        var currentOrder = totalOrders[i];
        for (var j = 0; j < currentOrder.length; j++) {
            numOfGlass++;
            var glass = currentOrder[j].glass
            orderPrice += parseInt(glass.substring(glass.indexOf("|") + 1));
            //loop topping
            var currentToppings = currentOrder[j].toppings;
            for (var a = 0; a < currentToppings.length; a++) {
                var arr = currentToppings[a].split("|")
                orderPrice += parseInt(arr[1]) * parseInt(arr[2]);
            }
        }
        totalGlass += numOfGlass;
        totalPrice += orderPrice;
        //put them in the table
        var orderRow = `
        <tr>
            <th>${i + 1}</th>
            <td>
                ${numOfGlass}
            </td>
            <td>
                ${orderPrice}
            </td>
            <td>
                <button type=button class="btn btn-success" onclick="orderDetail(${i + 1})"
                data-bs-toggle="modal" data-bs-target="#modal2">Xem</button>
                <button type=button class="btn btn-danger" onclick="removeOrder(${i + 1})">Xóa</button>
            </td>
        </tr>
        `;
        tableBody = tableBody.concat(orderRow);
    }
    document.getElementById("table-body").innerHTML = tableBody
    document.getElementById("totalQuantity").innerHTML = totalGlass
    document.getElementById("totalPrice").innerHTML = totalPrice
}

function removeOrder(orderNum) {
    if (confirm("Xóa đơn hàng này?")) {
        //take all orders out, remove the orderNum, save, fetch data again
        if (totalOrders.length == 1) {
            localStorage.setItem("totalOrders", JSON.stringify([]))
        } else {
            totalOrders.splice(orderNum - 1, 1)
            localStorage.setItem("totalOrders", JSON.stringify(totalOrders))
        }
        allOrders()
    }
}

function removeAllOrders() {
    if (confirm("Xóa tất cả đơn hàng?")) {
        localStorage.setItem("totalOrders", JSON.stringify([]));
        document.getElementById("table-body").innerHTML = '';
        document.getElementById("totalQuantity").innerHTML = 0
        document.getElementById("totalPrice").innerHTML = 0
    }
}

function orderDetail(orderNum) {
    document.getElementById("myModalTitle2").innerHTML = `
        <h2>Chi tiết đơn hàng ${orderNum}</h2>
    `;
    console.log("total Orders:")
    console.log(totalOrders)
    var order = totalOrders[orderNum - 1];
    var detailBody = ``;
    var totalPrice = 0;
    for (var i = 0; i < order.length; i++) { //for each glass => loop the fill the table
        var glassArr = order[i].glass.split("|");
        var glassId = glassArr[0];
        var glassPrice = glassArr[1];
        var toppingIdAndQuantity = ``;
        var toppingPrices = ``;
        var totalGlassPrice = parseInt(glassPrice);
        for (var j = 0 ; j < order[i].toppings.length ; j++) {
            var toppingArr = order[i].toppings[j].split("|");
            var toppingId = toppingArr[0];
            var toppingQuantity = parseInt(toppingArr[1]);
            var toppingPrice = parseInt(toppingArr[2]);
            totalGlassPrice += toppingQuantity*toppingPrice //show at the bottom of the glass
            toppingIdAndQuantity = toppingIdAndQuantity.concat(`
                <p> ${toppingId} <span style="color:rgb(28, 4, 209);"> x </span> ${toppingPrice} </p>
            `);
            toppingPrices = toppingPrices.concat(`
                <p> ${toppingQuantity*toppingPrice} </p>
            `);
            console.log("totalPrice: " + totalPrice)
        }
        totalPrice +=  totalGlassPrice; //show at the bottom of the bill
        detailBody = detailBody.concat(`
            <tr>
                <th>${i + 1}</th>
                <td>${glassId}</td>
                <td>
                    <p>&nbsp;</p>
                    ${toppingIdAndQuantity}
                    <p>&nbsp;</p>
                </td>
                <td>
                    <p>${glassPrice}</p>
                    ${toppingPrices}
                    <p class="custom_pink">${totalGlassPrice}</p>
                <td>
            </tr>
        `)
    }
    document.getElementById("modalBody2").innerHTML = detailBody
    document.getElementById("mobalBottom2").innerHTML = `
        <h2>TỔNG TIỀN: ${totalPrice}</h2>
    `;
}

