let camera;
let canvas;
let controll_btn;
let controll_icon;
let blur_btn;
let blur_icon;
let stop_img;
let stream;
function declare(){
    camera = document.querySelector("#camera");
    canvas = document.querySelector("#canvas");
    controll_btn = document.querySelector("#controll");
    controll_icon =  controll_btn.lastElementChild;
    stop_img = document.querySelector(".back__img");
    blur_btn = document.querySelector("#blur");
    blur_icon = blur_btn.lastElementChild;
    canvas.width = camera.width;
    canvas.height = camera.height;
}
declare();
function events(){
    controll_btn.addEventListener('click', () => {
        controll_btn.getAttribute('data-state') == 'stop' ? startVideo() : stopVideo();
    });
    blur_btn.addEventListener('click', () => {
        blur_btn.getAttribute('data-state') == 'none' ? startBlur() : stopBlur();
    });
}
events();
function setAttributes(elm1, elm2, att1, att2){
    elm1.setAttribute('class', att1)
    elm2.setAttribute('data-state', att2);
}
async function startVideo(){
    setAttributes(controll_icon, controll_btn, 'bi bi-camera-video-off-fill', 'start');
    stop_img.style.display = "none";
    blur_btn.disabled = false;
    stream = await navigator.mediaDevices.getUserMedia({video: true});
    camera.srcObject = stream;
    camera.play();   
}
function stopVideo(){
    stop_img.style.display = "flex";
    canvas.style.display = "none";
    blur_btn.disabled = true;
    stream.getTracks().forEach(track => track.stop());
    camera.srcObject = null;
    setAttributes(controll_icon, controll_btn, 'bi bi-camera-video-fill', 'stop');
    stopBlur();
}
function startBlur(){
    bodyPix.load()
        .then(async net => {
            while (stop_img.style.display === 'none') {
                const person = await net.segmentPerson(camera);
                const blurAmount = 10;
                bodyPix.drawBokehEffect(canvas, camera, person, blurAmount);
            }
        })
        .catch(err => console.error(err));
        camera.style.display = "none";
        canvas.style.display = "block";
        setAttributes(blur_icon, blur_btn, 'bi bi-person-square', 'blur');
}
function stopBlur(){
    camera.style.display = "block";
    canvas.style.display = "none";
    setAttributes(blur_icon, blur_btn, 'bi bi-person-fill', 'none');
}