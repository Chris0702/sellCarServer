console.log("js init");
var selectCompany = "";
$(document).ready(function() {
   getTestDriveAll();
});

function getTestDriveAll() {
    $.ajax({
        url: '/testDrive/getTestDriveAll',
        type: 'GET',
        data: {},
        error: function(xhr) {
            console.log('error')
            console.log(xhr)
        },
        success: function(result) {
            console.log('success')
            result = JSON.parse(result);
            console.log(result)
            $('#content').children().remove();
            // addTestDrive()
            if (result.resStatus == 0) {
                displayTestDrive(result.resString)
            }
        }
    });
}


//     address
// :
// ""
// car_color
// :
// "白"
// car_company
// :
// "NISSAN"
// car_name
// :
// "ALL NEW LIVINA"
// car_version
// :
// ""
// company
// :
// "呃呃哦哦"
// hopeTime
// :
// " 請選擇時段"
// name
// :
// "是全球情況"
// payment_type
// :
// "現金"
// phone
// :
// "97456"
// status
// :
// "receive"
// _id
// :
// "5b8906af4f379004a088ff89"


function displayTestDrive(testDrives) {
    
    addTestDrive()
    if (testDrives.length > 0) {
        for (var i = testDrives.length -1; i > 0; i--) {
            createTestDrive(testDrives[i])
        }
    }
}

//saveTestDriveInfo(null, name, company, phone,address,payment_type, car_name,car_company ,car_version,car_color, hopeTime, null,

function createTestDrive(testDrive){
    var item = $('<div/>', {
        class: 'col-md-12 col-sm-12 col-xs-12 col-lg-12'
    }).appendTo($('#content'));
    item.css('width', '100%');
    item.css('margin-top', '1%');
     var titleName = $('<div/>', {
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item);
    titleName.html("姓名: ")

    var name = $('<input/>', {
        type: 'text',
        value: testDrive.name,
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item);

     var titlePhone = $('<div/>', {
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item);
    titlePhone.html("電話: ")

    var phone = $('<input/>', {
        type: 'text',
        value: testDrive.phone,
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item);

    var titleCompany = $('<div/>', {
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item);
    titleCompany.html("公司&機構: ")

    var company = $('<input/>', {
        type: 'text',
        value: testDrive.company,
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item);

    var titleCarCompany = $('<div/>', {
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item);
    titleCarCompany.html("車廠: ")

    var carCompany = $('<input/>', {
        type: 'text',
        value: testDrive.car_company,
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item);

    var titleCarName = $('<div/>', {
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item);
    titleCarName.html("車型: ")

    var carName = $('<input/>', {
        type: 'text',
        value: testDrive.car_name,
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item);

    var titleColor = $('<div/>', {
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item);
    titleColor.html("車色: ")

    var color = $('<input/>', {
        type: 'text',
        value: testDrive.car_color,
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item);


    // paymentType.append($("<option></option>").attr("value", "刷卡").text("刷卡"));

    var item2 = $('<div/>', {
        class: 'col-md-12 col-sm-12 col-xs-12 col-lg-12'
    }).appendTo($('#content'));
    item2.css('width', '100%');
    item2.css('margin-top', '1%');

     var titlePaymentType = $('<div/>', {
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item2);
    titlePaymentType.html("付款方式: ")

    var paymentType = $('<select/>', {
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item2);

    paymentType.append($("<option></option>").attr("value", "現金").text("現金"));
    paymentType.append($("<option></option>").attr("value", "刷卡").text("刷卡"));

    var titleAddress = $('<div/>', {
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item2);
    titleAddress.html("地址: ")

    var address = $('<input/>', {
        type: 'text',
         value: testDrive.address,
        class: 'col-md-3 col-sm-3 col-xs-3 col-lg-3'
    }).appendTo(item2);

    // var titleHopeDate = $('<div/>', {
    //     class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    // }).appendTo(item2);
    // titleHopeDate.html("試乘日期: ")

    // var hopedate = $('<input/>', {
    //     type: 'date',
    //     class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    // }).appendTo(item2);

    var titleHopeTime = $('<div/>', {
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item2);
    titleHopeTime.html("試乘時間: ")

    var hopeTime = $('<input/>', {
        type: 'text',
        value: testDrive.hopeTime,
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item2);


    var titleStatus = $('<div/>', {
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item2);
    titleStatus.html("狀態: ")

    let orderReceive = 'receive';
    let orderPending = 'pending';
    let orderFailure = 'failure';
    let orderSuccess = 'success';
    var status = $('<select/>', {
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item2);

    status.append($("<option></option>").attr("value", "receive").text("receive"));
    status.append($("<option></option>").attr("value", "pending").text("pending"));
    status.append($("<option></option>").attr("value", "failure").text("failure"));
    status.append($("<option></option>").attr("value", "success").text("success"));
    var change = $('<button/>', {
        class: 'btn btn-success col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item2);
    change.html("修改")

    var remove = $('<button/>', {
        id: testDrive._id,
        class: 'btn btn-danger col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item2);
    remove.html("刪除")
    // setAddClick(add, name, company, color, price, special_price, description)
}

function addTestDrive(){
    var item = $('<div/>', {
        class: 'col-md-12 col-sm-12 col-xs-12 col-lg-12'
    }).appendTo($('#content'));
    item.css('width', '100%');
    item.css('margin-top', '1%');
     var titleName = $('<div/>', {
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item);
    titleName.html("姓名: ")

    var name = $('<input/>', {
        type: 'text',
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item);

     var titlePhone = $('<div/>', {
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item);
    titlePhone.html("電話: ")

    var phone = $('<input/>', {
        type: 'text',
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item);

    var titleCompany = $('<div/>', {
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item);
    titleCompany.html("公司&機構: ")

    var company = $('<input/>', {
        type: 'text',
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item);

     var titleCarCompany = $('<div/>', {
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item);
    titleCarCompany.html("車廠: ")

    var carCompany = $('<input/>', {
        type: 'text',
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item);

    var titleCarName = $('<div/>', {
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item);
    titleCarName.html("車型: ")

    var carName = $('<input/>', {
        type: 'text',
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item);

    var titleColor = $('<div/>', {
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item);
    titleColor.html("車色: ")

    var color = $('<input/>', {
        type: 'text',
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item);

    var item2 = $('<div/>', {
        class: 'col-md-12 col-sm-12 col-xs-12 col-lg-12'
    }).appendTo($('#content'));
    item2.css('width', '100%');
    item2.css('margin-top', '1%');

     var titlePaymentType = $('<div/>', {
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item2);
    titlePaymentType.html("付款方式: ")

    var paymentType = $('<select/>', {
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item2);

    paymentType.append($("<option></option>").attr("value", "現金").text("現金"));
    paymentType.append($("<option></option>").attr("value", "刷卡").text("刷卡"));

    var titleAddress = $('<div/>', {
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item2);
    titleAddress.html("地址: ")

    var address = $('<input/>', {
        type: 'text',
        class: 'col-md-3 col-sm-3 col-xs-3 col-lg-3'
    }).appendTo(item2);

    var titleHopeDate = $('<div/>', {
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item2);
    titleHopeDate.html("試乘日期: ")

    var hopeDate = $('<input/>', {
        type: 'date',
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item2);

    var titleHopeTime = $('<div/>', {
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item2);
    titleHopeTime.html("試乘時段: ")

    var hopeTime = $('<select/>', {
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item2);
    
    hopeTime.append($("<option></option>").attr("value", "早上").text("早上"));
    hopeTime.append($("<option></option>").attr("value", "中午").text("中午"));
    hopeTime.append($("<option></option>").attr("value", "晚上").text("晚上"));
    hopeTime.append($("<option></option>").attr("value", "半夜").text("半夜"));


    $('<div/>', {
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item2);

    var add = $('<button/>', {
        class: 'btn btn-primary col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item2);
    add.html("新增")
    setAddClick(add, name, phone, company,carCompany, carName, color, paymentType,address,hopeDate,hopeTime)
}



function setAddClick(add, name, phone, company,carCompany, carName, color, paymentType,address,hopeDate,hopeTime) {
    add.click(function(e) {
        var sendColor = color.val();
        sendColor = sendColor.split(",");
        sendColor = JSON.stringify(sendColor);
        var send = {
                'name': name.val(),
                'company': company.val(),
                'phone': phone.val(),
                'address': address.val(),
                'payment_type': paymentType.val(),
                'car_name': carName.val(),
                'car_company': carCompany.val(),
                'car_color': color.val(),
                'hopeTime': hopeDate.val()+" "+hopeTime.val()
            }
        $.ajax({
            url: '/testDrive/saveTestDriveInfo',
            type: 'POST',
            data: {
                'name': name.val(),
                'company': company.val(),
                'phone': phone.val(),
                'address': address.val(),
                'payment_type': paymentType.val(),
                'car_name': carName.val(),
                'car_company': carCompany.val(),
                'car_color': color.val(),
                'hopeTime': hopeDate.val()+" "+hopeTime.val()
            },
            error: function(xhr) {
                console.log('error')
                console.log(xhr)
                alert(xhr);
            },
            success: function(result) {
                console.log('success')
                console.log(send)
                console.log(result)
                result = JSON.parse(result);
                if (result.resStatus == 0){
                	getTestDriveAll()
                }else{
                	alert(result);
                }
                
            }
        });
    });
}


function createCar(car) {
    var item = $('<div/>', {
        id: car._id,
        class: 'col-md-12 col-sm-12 col-xs-12 col-lg-12'
    }).appendTo($('#content'));
    item.css('width', '100%');
    item.css('margin-top', '1%');
    var titleName = $('<div/>', {
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item);
    titleName.html("車型: ")

    var name = $('<input/>', {
        type: 'text',
        value: car.name,
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item);

    var titleCompany = $('<div/>', {
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item);
    titleCompany.html("車廠: ")

    var company = $('<input/>', {
        type: 'text',
        value: car.company,
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item);

    var titleColor = $('<div/>', {
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item);
    titleColor.html("顏色: ")

    var color = $('<input/>', {
        type: 'text',
        value: car.color,
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item);

    var titleDescription = $('<div/>', {
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item);
    titleDescription.html("描述: ")

    var description = $('<input/>', {
        type: 'text',
        value: car.description,
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item);

    var titleSpecial_price = $('<div/>', {
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item);
    titleSpecial_price.html("最低價(萬元): ")

    var special_price = $('<input/>', {
        type: 'text',
        value: car.special_price,
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item);

    var titlePrice = $('<div/>', {
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item);
    titlePrice.html("最高價(萬元): ")

    var price = $('<input/>', {
        type: 'text',
        value: car.price,
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item);

    var item2 = $('<div/>', {
        class: 'col-md-12 col-sm-12 col-xs-12 col-lg-12'
    }).appendTo($('#content'));
    item2.css('width', '100%');
    item2.css('margin-top', '1%');
    var titleImg = $('<div/>', {
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item2);

    titleImg.html("圖片:")

    var img = $('<img/>', {
        src: car.imgPath,
        class: 'col-md-2 col-sm-2 col-xs-2 col-lg-2'
    }).appendTo(item2);

    var tab = $('<div/>', {
        id: car._id,
        class: 'col-md-7 col-sm-7 col-xs-7 col-lg-7'
    }).appendTo(item2);

    var change = $('<button/>', {
        id: car._id,
        class: 'btn btn-success col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item2);
    change.html("修改")

    setChangeClick(change, car._id, name, company, color, price, special_price, description)

    var remove = $('<button/>', {
        id: car._id,
        class: 'btn btn-danger col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item2);
    remove.html("刪除")
    setRemoveClick(remove, car._id)
}

function setRemoveClick(remove, car_id) {
    remove.click(function(e) {
        $.ajax({
            url: '/car/removeCarInfo',
            type: 'DELETE',
            headers: {
                "car_id": car_id
            },
            data: {},
            error: function(xhr) {
                console.log('error')
                console.log(xhr)
            },
            success: function(result) {
                console.log('success')
                console.log(result)
                result = JSON.parse(result);
                if (result.resStatus == 0){
                	getCars()
                }else{
                	alert(result);
                }
            }
        });
    });
}

function setChangeClick(change, car_id, name, company, color, price, special_price, description) {
    change.click(function(e) {
        var sendColor = color.val();
        sendColor = sendColor.split(",");
        sendColor = JSON.stringify(sendColor);
        $.ajax({
            url: '/car/saveCarInfo',
            type: 'POST',
            data: {
                car_id: car_id,
                name: name.val(),
                company: company.val(),
                price: price.val(),
                special_price: special_price.val(),
                description: description.val(),
                color: sendColor
            },
            error: function(xhr) {
                console.log('error')
                console.log(xhr)
                alert(xhr);
            },
            success: function(result) {
                console.log('success')
                console.log(result)
                result = JSON.parse(result);
                if (result.resStatus == 0){
                	getCars()
                }else{
                	alert(result);
                }
                
            }
        });
    });
}