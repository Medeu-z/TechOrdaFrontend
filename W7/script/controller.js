import { getPosts, getPost, getComments} from "./model.js";
import { openPosts, openPost, createPagination} from "./view.js";
let data;
const postNumber = 10;
function showPosts() {
    getPosts().then(posts => {
       data = posts;
       createPagination(posts.length/postNumber);
       showTenPosts(1);
    });
}
showPosts();
export async function showPost(id) {
    Promise.all([getPost(id), getComments(id)]).then(values => {
        openPost(values[0], values[1]);
    })
}
export function showTenPosts(id){
    let start = id * postNumber - postNumber;
    let end = id * postNumber;
    let posts = [];
    for(const [index, element] of data.entries()){
        if(index >= start && index < end){
            posts.push(element);
        }
        if(index == end)break;
    }
    openPosts(posts, id);
}



