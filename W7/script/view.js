import { showPost, showTenPosts } from "./controller.js";
let posts_container;
let post_container;
let post_title;
let post_description;
let comments_container;
let pagination;
function declare(){
    posts_container = document.querySelector(".posts");
    post_container = document.querySelector(".post");
    post_title = document.querySelector(".post .card__title");
    post_description = document.querySelector(".post .card__description");
    comments_container = document.querySelector(".comments");
    pagination = document.querySelector(".pagination");
}
declare();
function getElement(elm, className){
    let element = document.createElement(elm);
    element.classList.add(className);
    return element;
}
function deleteElementChild(e){
    var child = e.lastElementChild; 
    while (child) {
        e.removeChild(child);
        child = e.lastElementChild;
    }
}
export function createPagination(n){
    for(let i = 0; i < n; i++){
        let div = (i === 0 )? getElement('div', 'active') : document.createElement('div');
        div.innerText = i + 1;
        div.id = i + 1;
        div.onclick = () => {showTenPosts(div.id)}
        pagination.append(div);
    }
}
function changeClass(elements, id, className){
    for (const elm of elements.children){ 
       elm.classList.toggle(className, id == elm.id);
    }
}
function createPost(post){
    let card = getElement('div', 'card');
    let header = getElement('div', 'card__header');
    let user = getElement('div', 'user');
    let user_name = getElement('div', 'user__name');
    let icon = getElement('i', 'bi-person-circle');
    let data = getElement('div', 'card__date');
    let body = getElement('div', 'card__body');
    let title = getElement('div', 'card__title');
    let footer = getElement('div', 'card__footer');
    let btn = getElement('button', 'card__button');
    user_name.innerText = 'Author';
    data.innerText = '12.11.2022';
    title.innerText = post.title;
    btn.innerText = 'Read More';
    btn.id = post.id;
    btn.onclick = () => {showPost(btn.id)};
    user.append(icon, user_name);
    header.append(user, data);
    body.append(title);
    footer.append(btn);
    card.append(header,body,footer);          
    posts_container.appendChild(card);
}
function createComment(data){
    let comment = getElement('div', 'comment');
    let user = getElement('div', 'user');
    let user_name = getElement('div', 'user__name');
    let icon = getElement('i', 'bi-person-circle');
    let text = getElement('div', 'text');
    user_name.innerText = data.email;
    text.innerText = data.body;
    user.append(icon, user_name);
    comment.append(user, text);
    comments_container.append(comment);
}
export function openPost(post, comments){
    pagination.style.display = 'none';
    posts_container.style.display = 'none';
    post_container.style.display = 'block';
    post_title.innerText = post.title;
    post_description.innerText = post.body;
    deleteElementChild(comments_container)
    comments.forEach(comment => {
        createComment(comment);
    });
}
export function openPosts(posts, id) {
    deleteElementChild(posts_container);
    posts.forEach(post=> {
        createPost(post);
    });
    changeClass(pagination, id, 'active');
}
window.back = () => {
    posts_container.style.display = 'block';
    pagination.style.display = 'flex';
    post_container.style.display = 'none';
}