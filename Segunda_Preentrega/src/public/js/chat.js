const socket = io();
const user = prompt("Introduce tu nombre de usuario")

socket.on("loadMessages", (data) => {

    const container = document.getElementById("container");
    container.innerHTML = " "

    data.map((element)=>{

        const text = document.createElement("p");
        text.innerHTML = `${element.user}: ${element.message}`;
        container.appendChild(text);

    });

});

const sendMessage = () => {

    const input = document.getElementById("input-msj");

    socket.emit("saveMessage",{
        user:user,
        message:input.value
    });

}






