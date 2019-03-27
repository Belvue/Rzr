var inputs = document.querySelectorAll('.file-input')

for (var i = 0, len = inputs.length; i < len; i++) {
    customInput(inputs[i])
}

function customInput(el) {
    const fileInput = el.querySelector('[type="file"]')
    const label = el.querySelector('[data-js-label]')

    fileInput.onchange = fileInput.onmouseout = function () {
        if (!fileInput.value) return

        var value = fileInput.value.replace(/^.*[\\\/]/, '')
        el.className += ' -chosen'
        label.innerText = value
        var resize = document.getElementById('resize');
        resize.classList.remove('hide');
        var download = document.getElementById('download');
        download.classList.add('hide');
        var preview = document.getElementById('preview');
        preview.setAttribute('src', '');
    }
}

function runResize() {
    var file = document.querySelector('[type="file"]');
    fr = new FileReader();
    fr.readAsDataURL(file.files[0]);
    fr.onload = function () {
        return new Promise((res, rej) => {
            var arrayBuffer = fr.result;
            res(arrayBuffer);
        }).then((arrayBuffer) => {
            fetch('/resize', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    stream: arrayBuffer,
                    width: parseInt(rangeLabel.innerHTML) || 500,
                    height: parseInt(rangeLabel2.innerHTML) || 500
                })
            }).then(function (response) {
                return response.json();
            }).then((data) => {
                var resize = document.getElementById('resize');
                resize.classList.add('hide');
                document.getElementById('preview').setAttribute('src', data);
                var label = document.querySelector('[data-js-label]');
                var download = document.getElementById('download');
                download.setAttribute('onclick', `downloadFile("${data}", "${label.innerText}")`);
                download.classList.remove('hide');
            });
        })
    }
}

/* Range Slider */
var rangeSlider = document.getElementById("range-slider");

var rangeLabel = document.getElementById("range-label");

rangeSlider.addEventListener("input", showSliderValue, false);

function showSliderValue() {
    rangeLabel.innerHTML = rangeSlider.value;
    var labelPosition = (rangeSlider.value / rangeSlider.max);

    if (rangeSlider.value === rangeSlider.min) {
        rangeLabel.style.left = ((labelPosition * 100) + 2) + "%";
    } else if (rangeSlider.value === rangeSlider.max) {
        rangeLabel.style.left = ((labelPosition * 100) - 2) + "%";
    } else {
        rangeLabel.style.left = (labelPosition * 100) + "%";
    }
}

var rangeSlider2 = document.getElementById("range-slider2");

var rangeLabel2 = document.getElementById("range-label2");

rangeSlider2.addEventListener("input", showSliderValue2, false);

function showSliderValue2() {
    rangeLabel2.innerHTML = rangeSlider2.value;
    var labelPosition = (rangeSlider2.value / rangeSlider2.max);

    if (rangeSlider2.value === rangeSlider2.min) {
        rangeLabel2.style.left = ((labelPosition * 100) + 2) + "%";
    } else if (rangeSlider2.value === rangeSlider2.max) {
        rangeLabel2.style.left = ((labelPosition * 100) - 2) + "%";
    } else {
        rangeLabel2.style.left = (labelPosition * 100) + "%";
    }
}


/* Download File */

function downloadFile(dataurl, filename) {
    var a = document.createElement("a");
    a.href = dataurl;
    a.setAttribute("download", filename);
    a.click();
    return false;
}


document.getElementById('twitter_tgt').setAttribute('href', "https://twitter.com/home?status=Resize%20Your%20Images%20quick%20and%20Easy!%20" + location.href);