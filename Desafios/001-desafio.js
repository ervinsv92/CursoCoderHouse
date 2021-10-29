class Usuario{
	constructor(nombre, apellido, libros, mascotas){
		this.nombre = nombre;
		this.apellido = apellido;
		this.libros = libros;
		this.mascotas = mascotas;
	}
	
	getFullName = () => `${this.nombre} ${this.apellido}`;
	addMascota = (mascota) => this.mascotas.push(mascota);
	countMascota = () => this.mascotas.length;
	addBook = (nombre, autor) => this.libros.push({nombre, autor});
	getBookNames = () => this.libros.map(libro => libro.nombre);
}

const usuario = new Usuario("Ervin", "Solano", [], []);

//getFullName
console.log("getFullName: ",usuario.getFullName());

//addMascota
usuario.addMascota("Perro");
usuario.addMascota("Gato");

//countMascota
console.log("countMascota: ", usuario.countMascota());

//addBook
usuario.addBook({nombre:'Cien años de soledad', autor:'Gabriel García Márquez'});
usuario.addBook({nombre:'El extranjero', autor:'Albert Camus'});
usuario.addBook({nombre:'Nostromo', autor:'Joseph Conrad'});

//getBookNames
console.log("getBookNames: ", usuario.getBookNames())

let lista = [{
    nombre:'Ervin',
    apellido:'Solano'
},
{
    nombre:'Carmen',
    apellido:'Vargas'
}]

let listaRes = lista.map(li => li.nombre);
console.log(listaRes)