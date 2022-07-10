////////// CREACION DE CLASE

class Usuario  {
    
    constructor (nombre, apellido, libros, mascotas) {
        this.name = nombre,
        this.apellido = apellido,
        this.libros = libros,
        this.mascotas = mascotas
    }

    getFullName() {
        console.log(`${this.name}  ${this.apellido}`)
    }

    addMascota(mascota) {
        this.mascotas.push(mascota)
        console.log(`Se añadio la mascota. Las mascotas ahora son: ${this.mascotas}`)
    }

    countMascotas() {
        console.log(`La cantidad de mascotas es: ${this.mascotas.length}`)
    }

    addBook(x, y) {
        this.libros.push({nombre: x, autor: y})
        console.log(this.libros)
    }

    getBookNames() {
    let arrAux= []
    this.libros.map((element)=>{
        arrAux.push(element.nombre)
    })    
    console.log(arrAux)
    }

}

////////// CREACION DE USUARIO

const usuario1 = new  Usuario (
    "Francisco",
     "Lagorio", 
     [
        {
         nombre: "El principito", 
         autor: "Antoine de Saint-Exupéry"
        },
        {
            nombre: "El código Da Vinci",
            autor: "Dan Brown"
        }
    ], 
    ["Perro", "Gato"]
    )


////////// LLAMADO DE METODOS

    usuario1.getFullName()
    usuario1.addMascota("Caballo")
    usuario1.countMascotas()
    usuario1.addBook("La Batalla del Futuro", "Mateo Salvatto")
    usuario1.getBookNames()





 