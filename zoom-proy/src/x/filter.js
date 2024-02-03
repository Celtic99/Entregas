const usuarios = [

    {
        id:1,
        nombre:"Carlos",
        edad:20
    },
    {
        id:2,
        nombre:"Maria",
        edad: 18
    },
    {
        id:3,
        nombre:"Torcuato",
        edad:15
    }

];

//el metodo de array filter, como su nombre lo dice, filtra los elementos de un array en base a una condicion

const usuarioFiltrados = usuarios.filter( usuario => usuario.id !== 2 );

//en este caso todos los usuario cuya propiedad id (usuario.id) no sea igual a 2

console.log(usuarioFiltrados);