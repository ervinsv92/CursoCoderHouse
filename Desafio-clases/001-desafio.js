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
console.log("countMascotas: ", usuario.countMascota());

//addBook
usuario.addBook('Cien años de soledad', 'Gabriel García Márquez');
usuario.addBook('El extranjero', 'Albert Camus');
usuario.addBook('Nostromo', 'Joseph Conrad');

//getBookNames
console.log("getBookNames: ", usuario.getBookNames());
