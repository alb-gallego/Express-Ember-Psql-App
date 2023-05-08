CREATE TABLE IF NOT EXISTS rental (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR(255),
  owner VARCHAR(255),
  city VARCHAR(255),
  category VARCHAR(255),
  bedrooms INT,
  image VARCHAR(1000),
  description VARCHAR(255),
  creation_date TIMESTAMP NOT NULL DEFAULT NOW()

);

-- INSERT INTO rental ( title,owner,city,category,bedrooms,image,description) VALUES 
INSERT INTO rental ( title,owner,city,category,bedrooms,image,description, creation_date) VALUES 
('Prueba','Alberto','Sevilla','Community',5,'https://media.istockphoto.com/id/1398625179/es/foto/edificio-glass-window-de-nuevo-espacio-de-oficinas.jpg?s=612x612&w=0&k=20&c=VDoZEoCMfmzlviw-l8Jobsy5gtcGUGIigpgC3AWcZ1k=','descripcion', NOW()); 

