/* fetch("http://localhost:3000/weather?address=colombo").then((response)=>{
    response.json().then((data)=>{
        console.log(data);
    })
}) */

const weatherForm = document.querySelector(".weather-form")
const locationInput = document.getElementById("location")

weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault();

    const location = locationInput.value;
    const message1 = document.querySelector(".message-1")
    const message2 = document.querySelector(".message-2")

    message1.textContent = "Loading..."

    if(location.length === 0) {
        message1.textContent = "Please provide an address";
        message1.classList.add("error")
    }
    else {
        fetch("/weather?address=" + location).then((response)=>{
        response.json().then((data)=>{
            if(data.error) {
                message2.textContent = data.error;
                message2.classList.add("error")
            }else {
                message1.textContent = data.address;
                message2.textContent = data.forecast;
            }
        })
    });
    }
    
})

//SSH -- Secure shell //private key in my computer
//i send a public key to the machine that i want to communicate