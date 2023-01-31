let open__container;
let upload__container;
let close__container;
let uploaded__file;
let upload__file__btn;
let files__name__div;
let msg__div;
let uploadedFilesName = [];
const messages = {
    success: "All files uploaded!",
    error: "You did not select a file to upload."
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
function showMsg(text, err = false){
    msg__div.style.color = err ? "darkred" : "green";
    msg__div.innerText = text;
}
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
    uploaded__file.value = "";
    showFilesName(files__name__div, uploadedFilesName, 0);
}
const wait = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 1000);
    });
}
const uploadFile = async (file, i) => {
    await wait();
    uploadedFilesName.push(file.name); 
    showMsg(`Uploaded files number: ${i + 1}`);
    await wait();
    showMsg("");
}
Promise.all = (promisesArr) => {
    const resolvedPromises = [];
    let promiseCount = promisesArr.length;
    return new Promise((resolve, reject) => {
    if (promiseCount === 0) {
      resolve(null);
      return;
    }
    for (const promise of promisesArr) {
      promise
        .then((value) => {
            resolvedPromises.push(value);
          if (resolvedPromises.length === promiseCount) {
            resolve(resolvedPromises);
          }
        })
        .catch((e) => {
          reject(e);
        });
    }
  });
};
const uploadFiles = async (files) => {
    try {
      const fileToUpload = files.map((file, i) => uploadFile(file, i));
      await Promise.all(fileToUpload);
      showMsg(messages.success);
      await wait();
      showMsg("");
    } catch (e) {
      showMsg(e, true);
    }
  }
function events(){
    open__container.addEventListener('click', () => {
        uploadedFilesName = [];
        deleteElementChild(files__name__div);
        upload__container.style.display = "flex";
        close__container.style.display = "none";
    });
    close__container.addEventListener('click', closeContainer);
    upload__file__btn.addEventListener('click', async () => {
        if(uploaded__file.files.length === 0){
            showMsg(messages.error, true);
            await wait();
            showMsg("");
        }else{
            let img = document.createElement('img');
            img.src = './images/loading-gif.gif';
            img.alt = 'Loading...';
            msg__div.appendChild(img);
            await uploadFiles(Object.values(uploaded__file.files));
            if(uploadedFilesName.length >= 3){
                close__container.style.display = "inline";
            }
        }
    });
}
events();