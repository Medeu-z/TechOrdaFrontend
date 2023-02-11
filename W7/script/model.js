const API_URL = 'https://jsonplaceholder.typicode.com';
export const getPosts = async () => {
    const response = await fetch(`${API_URL}/posts`);
    const repos = await  response.json();
    return repos;
}
export const getPost = async (id) => {
    const response = await fetch(`${API_URL}/posts/${id}`);
    const repos = await  response.json();
    return repos;
}
export const getComments = async (id) => {
    const response = await fetch(`${API_URL}/comments/?postId=${id}`);
    const repos = await  response.json();
    return repos;
}