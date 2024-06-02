CREATE TABLE IF NOT EXISTS department
(
    id   INTEGER PRIMARY KEY,
    name TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS employee
(
    id            INTEGER PRIMARY KEY,
    name          TEXT,
    surname       TEXT,
    department_id INTEGER,
    FOREIGN KEY (department_id) REFERENCES department (id)
);

CREATE TABLE IF NOT EXISTS salary
(
    id          INTEGER PRIMARY KEY,
    employee_id INTEGER,
    amount      REAL,
    date        TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employee (id)
);

CREATE TABLE IF NOT EXISTS donation
(
    id          INTEGER PRIMARY KEY,
    employee_id INTEGER,
    date        TIMESTAMP,
    amount      REAL,
    sign  TEXT,
    FOREIGN KEY (employee_id) REFERENCES employee (id)
);

CREATE TABLE IF NOT EXISTS rate
(
    id    INTEGER PRIMARY KEY,
    date  TIMESTAMP,
    sign  TEXT,
    value REAL
);
