// export const blogData = {
//     title: "ATLP Journey",
//     author: "Jacqueline",
//     content: "blog content"
// };

// export const signUpData = {
//     fullName: "jacky",
//     email: "jackie2002@gmail",
//     password: "Jacki123",
//     confirmPassword: "Jacki123",
//     role: "Admin"
// };

// export const loginData = {
//     fullName: "jacky",
//     email: "jackie2002@gmail"
// };
import path from "path";

const imagePath = path.resolve(__dirname, "test.jpg")

export const blogData = {
    title: "ATLP Journey",
    author: "Jacqueline",
    content: "blog content",
    imageUrl: path.resolve(__dirname, "test.jpg")
};

export const secondBlogData = {
    title: "Journey",
    author: "Jacky",
    content: "content",
    imageUrl: imagePath
};


export const updatedData = {
    title: "Updated Title",
    author: "Updated Author",
    content: "Updated Content",
    imageUrl: path.resolve(__dirname, "test.jpg")
};