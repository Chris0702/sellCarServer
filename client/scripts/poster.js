console.log("js init");
var selectCompany = "";
$(document).ready(function() {
    $('#search_car').click(function(e) {
        console.log('search_car');
        selectCompany = $('#car_company').val();
        getPoster()

    });
});

function getPoster() {
    console.log('getPoster')
    var req_url = '/file/getLocalPathAll?foldername=resource/company/'+selectCompany+'/image/poster'
    $.ajax({
        url: req_url,
        type: 'GET',
        data: {},
        error: function(xhr) {
            console.log('error')
            console.log(xhr)
        },
        success: function(result) {
            console.log('success')
            // console.log(result)
            // result = JSON.parse(result);
            console.log(result)
            displayPosters(result)
            // if (result.resStatus == 0) {
            //     displayCars(result.resString)
            // }
        }
    });
}

function displayPosters(Posters) {
    $('#content').children().remove();
    addPoster()
    // addCar()
    // if (cars.length > 0) {
    //     for (var i = 0; i < cars.length; i++) {
    //         createCar(cars[i])
    //     }
    // }
}

function addPoster() {

   var item2 = $('<div/>', {
        class: 'col-md-12 col-sm-12 col-xs-12 col-lg-12'
    }).appendTo($('#content'));
    item2.css('width', '100%');
    item2.css('margin-top', '1%');
    var titleUploadImg = $('<div/>', {
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item2);
    titleUploadImg.html("上傳海報:")
    var uploadImg = $('<input/>', {
        type: 'file',
        class: 'col-md-5 col-sm-5 col-xs-5 col-lg-5'
    }).appendTo(item2);
    var tab = $('<div/>', {
        class: 'col-md-4 col-sm-4 col-xs-4 col-lg-4'
    }).appendTo(item2);

    var upload = $('<button/>', {
        class: 'btn btn-info col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item2);
    upload.html("上傳圖片")

    setUploadClick(upload, uploadImg)


    var remove = $('<button/>', {
        class: 'btn btn-danger col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item2);
    remove.html("刪除選擇海報")
    setRemoveClick(remove)

}

function setAddClick(add, name, company, color, price, special_price, description) {
    add.click(function(e) {
        var sendColor = color.val();
        sendColor = sendColor.split(",");
        sendColor = JSON.stringify(sendColor);
        $.ajax({
            url: '/car/saveCarInfo',
            type: 'POST',
            data: {
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
                if (result.resStatus == 0) {
                    getCars()
                } else {
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
        src: car.imgPath + "?" + Math.random(),
        class: 'col-md-2 col-sm-2 col-xs-2 col-lg-2'
    }).appendTo(item2);

    var tab = $('<div/>', {
        id: car._id,
        class: 'col-md-2 col-sm-2 col-xs-2 col-lg-2'
    }).appendTo(item2);

    var titleUploadImg = $('<div/>', {
        class: 'col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item2);
    titleUploadImg.html("上傳圖片:")
    var uploadImg = $('<input/>', {
        type: 'file',
        class: 'col-md-3 col-sm-3 col-xs-3 col-lg-3'
    }).appendTo(item2);

    var upload = $('<button/>', {
        id: car._id,
        class: 'btn btn-info col-md-1 col-sm-1 col-xs-1 col-lg-1'
    }).appendTo(item2);
    upload.html("上傳圖片")

    setUploadClick(upload, uploadImg, car.company, car.name)

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

function uuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function setUploadClick(upload, file) {
    upload.click(function() {
        var files = file.get(0).files;
        if (files.length == 0) {
            alert('未選擇檔案')
            return
        }
        var formData = new FormData();
        var new_path = 'company/' + selectCompany + '/image/poster/' + uuid() + '.png';
        formData.append("uploadImage", files[0]);

        console.log(formData)
        console.log(new_path)

        $.ajax({
            url: '/file/uploadImage',
            headers: {
                'new_path': encodeURIComponent(new_path)
            },
            data: formData,
            dataType: "json",
            type: "POST",
            cache: false,
            contentType: false,
            processData: false,
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('upload error')
                console.log(jqXHR)
                console.log(textStatus)
                console.log(errorThrown)

                // alert('upload error')
            },
            success: function(json) {

                console.log('upload success')
                console.log(json)
                getPoster()
            },
            complete: function(json) {}
        });
    });


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
                if (result.resStatus == 0) {
                    getCars()
                } else {
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
                if (result.resStatus == 0) {
                    getCars()
                } else {
                    alert(result);
                }

            }
        });
    });
}