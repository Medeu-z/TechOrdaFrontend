let open__container;
let upload__container;
let close__container;
let uploaded__file;
let upload__file__btn;
let files__name__div;
let msg__div;
let uploadedFilesName = [];
const messages = {
    success: "file uploaded successfully.",
    error: "Can't upload file!"
}
function declare(){
    open__container = document.querySelector("#open__container");
    close__container = document.querySelector("#close__container");
    upload__container = document.querySelector(".upload__container");
    uploaded__file = document.querySelector("#file");
    upload__file__btn = document.querySelector("#file__upload");
    msg__div = document.querySelector(".msg");
    files__name__div = document.querySelector(".body");
}
declare();
function showFilesName(parent, texts, index){
    if(texts.length !== 0){
        texts.map(item => {
            index++;
            const div = document.createElement("div");
            div.innerText = index + ". " + item;
            parent.appendChild(div);
        })
    }
}
function deleteElementChild(e){
    var child = e.lastElementChild; 
        while (child) {
            e.removeChild(child);
            child = e.lastElementChild;
        }
}
function closeContainer(){
    upload__container.style.display = "none";
    msg__div.innerText = "";
    if(uploaded__file.files.length === 1){
        uploaded__file.value = "";
        deleteElementChild(files__name__div);
        showFilesName(files__name__div, uploadedFilesName, 0);
    }
}
function checkFile(files) {
    return new Promise(((resolve, reject) => {
        files.length !== 0 ? resolve(files) : reject(messages.error);
    }));
}
function events(){
    open__container.addEventListener('click', () => {
        if(uploadedFilesName.length === 3){
            index = 0;
            uploadedFilesName = [];
            msg__div.innerText = "";
            deleteElementChild(files__name__div);
        }
        upload__container.style.display = "flex";
    });
    close__container.addEventListener('click', closeContainer);
    upload__file__btn.addEventListener('click', async () => {
            await checkFile(uploaded__file.files)
                .then((files) => {
                    uploadedFilesName.push(files[0].name);
                    msg__div.style.color = "green";
                    msg__div.innerText = uploadedFilesName.length + " " + messages.success;
                    if(uploadedFilesName.length === 3){
                        closeContainer();
                    }
                })
                .catch((msg) => {
                   msg__div.style.color = "darkred";
                   msg__div.innerText = msg;
                });
    });
}
events();

