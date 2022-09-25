# CREATE DATABASE mibase

# USE mibase;
# CREATE TABLE usuarios (nombre VARCHAR(20) NOT NULL, apellido VARCHAR(20) NOT NULL, edad INT UNSIGNED, email VARCHAR(20) NOT NULL, id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY (id) );
# INSERT INTO usuarios (nombre, apellido, edad, email) VALUES ("Juan", "Perez", 23, "jp@gmail.com");
# INSERT INTO usuarios (nombre, apellido, edad, email) VALUES ("Pedro", "Mei", 21, "pm@gmail.com");
# INSERT INTO usuarios (nombre, apellido, edad, email) VALUES ("Juana", "Suarez", 25, "js@gmail.com");



# DELETE FROM usuarios WHERE id=2;
UPDATE usuarios SET edad=35 WHERE id=1;
SELECT * FROM usuarios;