console.log("js init");
var selectCompany = "";
var selectPosters = [];
var clickColor = "#aaaaaa";
var normalColor = "#ffffff";
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

function displayPosters(posters) {
    $('#content').children().remove();
    addPoster()
    // addCar()
    if (posters.length > 0) {
        for (var i = 0; i < posters.length; i++) {
            // createCar(cars[i])
            console.log(i)
            console.log(posters[i])
            createImgBlock(posters[i],i)
        }
    }
    imageClickInit()
}

function createImgBlock(imgSrc, blockIndex) {
    imgBlockId = 'imgBlock' + blockIndex;
    var div = $('<div/>', {
        id: imgBlockId,
        class: 'thumbnail col-md-2'
    }).appendTo($('#content'));;
    // console.log(imgBlockId);
    // console.log(imgSrc)
    var img = $('<img />', {
        id: imgSrc,
        src: '/' + imgSrc,
        class: 'posterImage',
        value: ''
    }).appendTo($('#' + imgBlockId));

}

function imageClickInit() {
    $('.posterImage').click(function(e) {
        var imgId = jQuery(this).attr("id");
        if (jQuery(this).attr('value') == '') {
            jQuery(this).attr('value', 'click');
            jQuery(this).parent().css('background-color', clickColor);
        } else {
            jQuery(this).attr('value', '');
            jQuery(this).parent().css('background-color', normalColor);
        }
        var isPush = false;
        for (var i = 0; i < selectPosters.length; i++) {
            if (selectPosters[i] == imgId) {
                selectPosters.splice(i, 1)
                isPush = true;
                break;
            }
        }
        if (isPush == false) {
            selectPosters.push(imgId);
        }
        console.log(selectPosters);
    })
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

function setRemoveClick(remove) {
    remove.click(function(e) {
        $.ajax({
            url: '/file/removeFiles',
            type: 'DELETE',
            data: {
                'filesPath':selectPosters
            },
            error: function(xhr) {
                console.log('error')
                console.log(xhr)
            },
            success: function(result) {
                console.log('success')
                console.log(result)
                result = JSON.parse(result);
                if (result.resStatus == 0) {
                    selectPosters = [];
                    getPoster()
                } else {
                    alert(JSON.stringify(result));
                }
            }
        });
    });
}

