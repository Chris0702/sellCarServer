console.log("js mergeImage init");

var mergeImgArr = [];
var targetImg = '';
var step = 0;
var clickColor = "#aaaaaa";
var normalColor = "#ffffff";
var resultPath = '';


$(document).ready(function() {
    initQuestion()
    initImage()
    initButton()
});

function initQuestion() {
    $('#question').html('請選擇多張圖片作為基底');
}

function initButton() {
    $('#nextStep').click(function(e) {
        $('.mergeImage').attr('value') == '';
        $('.mergeImage').parent().css('background-color', normalColor);
        // console.log('nextStep   click')
        if (step == 0) {
            if (mergeImgArr.length <= 0) {
                alert("請選擇自少一張圖片");
            } else {
                $('#question').html('請選擇欲合成的圖片');
                $('#nextStep').html('開始合併');
                step++;
            }
        } else if (step >= 1) {
            // console.log("send")
            // console.log(mergeImgArr)
            // console.log(targetImg)
            if (targetImg == '') {
                alert("請選擇欲合成的圖片");
            } else {
                $.ajax({
                    url: '/exe/mergeImage',
                    type: 'POST',
                    data: {
                        mergeImgArr: mergeImgArr,
                        targetImg: targetImg
                    },
                    error: function(xhr) {
                        alert('connect error');
                    },
                    success: function(res) {
                        res = JSON.parse(res);
                        if (res.resStatus == 0) {
                            showMergeImage(res.resString);
                            addDownloadBtn();
                        } else {
                            alert('merge error');
                        }
                    }
                });
                step = 0;
            }
        }
    })
}

function addDownloadBtn() {
    $('<div/>', {
        class: 'col-md-3'
    }).appendTo($('#content'));
    var button = $('<button/>', {
        id: 'downloadResult',
        class: 'col-md-6 btn btn-success'
    }).appendTo($('#content'));;
    $('#downloadResult').html('DOWNLOAD');
    $('#downloadResult').click(function(e) {
        downloadImage(resultPath);
    })
    $('<div/>', {
        class: 'col-md-3'
    }).appendTo($('#content'));
}

function downloadImage(src) {
    src = '/' + src;
    // console.log('============src=============');
    // console.log(src)
    // console.log('=========================');
    var $a = $("<a></a>").attr("href", src).attr("download", src);
    $a[0].click();
}

function showMergeImage(imgSrc) {
    resultPath = imgSrc;
    $('#content').children().remove();
    $('#question').remove();
    $('#next').remove();
    imgBlockId = 'mergeImageResultBlock';
    var div = $('<div/>', {
        id: imgBlockId,
        class: 'thumbnail col-md-12'
    }).appendTo($('#content'));;
    var img = $('<img />', {
        id: imgSrc,
        src: '/' + imgSrc,
        class: 'mergeImage',
        value: ''
    }).appendTo($('#' + imgBlockId));
}

function initImage() {
    $.ajax({
        url: '/file/getLocalPathAll',
        type: 'GET',
        data: {
            foldername: 'mergeImage'
        },
        error: function(xhr) {
            alert('圖片讀取錯誤，請重新載入');
        },
        success: function(imgArr) {
            // console.log('success       imgArr  ')
            // console.log(imgArr)
            for (i in imgArr) {
                createImgBlock(imgArr[i], i)

            }
            imageClickInit();
        }
    });
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
        width: '150px',
        height: '200px',
        class: 'mergeImage',
        value: ''
    }).appendTo($('#' + imgBlockId));

}

function imageClickInit() {
    $('.mergeImage').click(function(e) {
        var imgId = jQuery(this).attr("id");
        if (step == 0) {
            if (jQuery(this).attr('value') == '') {
                jQuery(this).attr('value', 'click');
                jQuery(this).parent().css('background-color', clickColor);
            } else {
                jQuery(this).attr('value', '');
                jQuery(this).parent().css('background-color', normalColor);
            }
            var isPush = false;
            for (var i = 0; i < mergeImgArr.length; i++) {
                if (mergeImgArr[i] == imgId) {
                    mergeImgArr.splice(i, 1)
                    isPush = true;
                    break;
                }
            }
            if (isPush == false) {
                mergeImgArr.push(imgId);
            }
        } else if (step == 1) {
            $('.mergeImage').parent().css('background-color', normalColor);
            jQuery(this).parent().css('background-color', clickColor);
            targetImg = imgId
        }
        // console.log(mergeImgArr)
        // console.log(targetImg)
    })
}