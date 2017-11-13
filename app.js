console.log("app.js");

var config = {
    apiKey: "AIzaSyBXrw1rJ9cTo8yVBoALon8Y5BAQ6rBua6Q",
    authDomain: "contactform-60e1f.firebaseapp.com",
    databaseURL: "https://contactform-60e1f.firebaseio.com",
    projectId: "contactform-60e1f",
    storageBucket: "",
    messagingSenderId: "64916309835"
};
firebase.initializeApp(config);
const messageRef = firebase.database().ref("messages");

const getValueById = (id) => document.getElementById(id).value;


const saveForm = (name,company,phone,email,message) => {
    let contactObj = messageRef.push();
    contactObj.set({
        name:name,
        company:company,
        phone:phone,
        email:email,
        message:message,
    }).then((data)=>{
        document.querySelector(".alert").style.display = "block";
        return true;
    },(error)=>{
        console.log(error);
        throw error;
    });    
}

const resetForm = () =>{
    setTimeout(()=>{
        document.querySelector(".alert").style.display = "none";
        document.getElementById("contactForm").reset();
    },3000);
}

const formSubmit = (event) => {
    console.log("*******FormSubmitted*******");
    
    event.preventDefault();
    const name = getValueById("name");
    const company = getValueById("company");
    const phone = getValueById("phone");
    const email = getValueById("email");
    const message = getValueById("message");

    //save form
    try {
        const status = saveForm(name,company,phone,email,message);
        if(status)
          showAlert();
          resetForm();
    } catch (error) {
        console.log(error);
    }
}

document.getElementById("contactForm").addEventListener('submit',formSubmit);


