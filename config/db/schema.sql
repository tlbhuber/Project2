CREATE database herbizzle;

USE herbizzle;

CREATE TABLE strains
(
    id integer auto_increment not null,
    name varchar(100),
    race varchar(50),
    flavors TEXT,
    medical TEXT,
    primary key (id)
)