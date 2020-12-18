CREATE database herbizzle;

USE herbizzle;

CREATE TABLE Strains
(
    id integer auto_increment not null,
    name varchar(100),
    race varchar(50),
    flavors TEXT,
    medical TEXT,
<<<<<<< HEAD
    primary key(id)
=======
    primary key (id)
>>>>>>> main
)