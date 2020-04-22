URL for project deployed on AWS: http://ec2-3-120-34-253.eu-central-1.compute.amazonaws.com:4200

====================HOSPITAL-DOCS==================

UNIT =====================================================
GET /unit
this method is used for receiving all of the units in the hospital. Later they are displayed in the main page.

GET /unit/:id
this method is used for displaying all the doctors in the current unit. req.params.id is actually id of the unit.

AUTH ===================================================
POST /patient/logIn BODY - {email:STRING, password:STRING}
this method is used for loggin in the patient

GET /patient/verify HEADERS: Authorization: TOKEN
this method is used for verifying the patient

DOCTOR ========================================================
GET /doctor/:id
this method is used for receiving the details about the doctor. req.params.id corresponds to the doctor id in the table

GET /doctor/?name=
this method is used when patients need to search for a doctor by name. req.query corresponds to the doctor name

PATIENT ========================================================
POST /patient BODY - {name:STRING, lastName:STRING, email:STRING, password:STRING, passwordConfirm:STRING, gender:STRING}
this method is used for signing up the patient

POST /patient/appreciate BODY - {doctor_id: NUMBER, mark: NUMBER}. HEADERS: Authorization: TOKEN
this method is used for appreciating the doctor. mark corresponds to the evaluation degree of the patient.

POST /patient/comment BODY - {doctor_id: NUMBER, comment: STRING}. HEADERS: Authorization: TOKEN
This method is used for posting a new comment for the doctor.

DELETE /patient/comment/:comment_id/:patient_id HEADERS: Authorization: TOKEN
this method is used for deleting the comment of the patient

PUT /patient/comment BODY - {comment_id:NUMBER, patient_id:NUMBER, comment:STRING}. HEADERS: Authorization: TOKEN
this method is used for updating the patient's comment


==================================================================
====================== MIGRATIONS ======================
==================================================================
create schema if not exists hospital;

use hospital;

create table if not exists hospital.days
(
id int auto_increment
primary key,
day varchar(20) not null
);

create table if not exists hospital.units
(
id int auto_increment
primary key,
unit varchar(100) not null
);

create table if not exists hospital.patients
(
id int auto_increment
primary key,
name varchar(50) not null,
lastName varchar(50) not null,
email varchar(50) not null,
password varchar(50) not null,
gender varchar(10) not null
);

create table if not exists hospital.doctors
(
id int auto_increment
primary key,
name varchar(50) not null,
lastName varchar(50) not null,
occupation varchar(100) not null,
period_of_service int not null,
phone_number int not null,
floor int not null,
office int not null,
email varchar(60) not null,
unit_id int not null,
constraint doctors_units_id_fk
foreign key (unit_id) references hospital.units (id)
on update cascade on delete cascade
);

create table if not exists hospital.appreciation
(
id int auto_increment
primary key,
patient_id int not null,
doctor_id int not null,
appreciation int not null,
constraint appreciation_doctors_id_fk
foreign key (doctor_id) references hospital.doctors (id)
on update cascade on delete cascade,
constraint appreciation_patients_id_fk
foreign key (patient_id) references hospital.patients (id)
on update cascade on delete cascade
);

create table if not exists hospital.comments
(
id int auto_increment
primary key,
patient_id int not null,
doctor_id int not null,
comment varchar(300) not null,
constraint comments_doctors_id_fk
foreign key (doctor_id) references hospital.doctors (id)
on update cascade on delete cascade,
constraint comments_patients_id_fk
foreign key (patient_id) references hospital.patients (id)
on update cascade on delete cascade
);

create table if not exists hospital.days_to_doctor
(
id int auto_increment
primary key,
doctor_id int not null,
day_id int not null,
constraint days_to_doctor_days_id_fk
foreign key (day_id) references hospital.days (id)
on update cascade on delete cascade,
constraint days_to_doctor_doctors_id_fk
foreign key (doctor_id) references hospital.doctors (id)
on update cascade on delete cascade
);

INSERT INTO days(day) VALUE ('Sunday');
INSERT INTO days(day) VALUE ('Monday');
INSERT INTO days(day) VALUE ('Tuesday');
INSERT INTO days(day) VALUE ('Wednesday');
INSERT INTO days(day) VALUE ('Thursday');
INSERT INTO days(day) VALUE ('Friday');
INSERT INTO days(day) VALUE ('Saturday');

INSERT INTO units(unit) VALUE ('Oncology');
INSERT INTO units(unit) VALUE ('Cardiology');
INSERT INTO units(unit) VALUE ('Critical care');
INSERT INTO units(unit) VALUE ('Ear nose and throat (ENT)');
INSERT INTO units(unit) VALUE ('Gastroenterology');
INSERT INTO units(unit) VALUE ('General surgery');
INSERT INTO units(unit) VALUE ('Neurology');

INSERT INTO patients(name, lastName, email, password, gender) VALUE ('Stephan', 'Kirimovich', 'steph@gmail.com', '1', 'male');
INSERT INTO patients(name, lastName, email, password, gender) VALUE ('Oleg', 'Price', 'goga@gmail.com', '12345', 'male');
INSERT INTO patients(name, lastName, email, password, gender) VALUE ('Fibi', 'Modius', 'fibs@gmail.com', '12345', 'female');
INSERT INTO patients(name, lastName, email, password, gender) VALUE ('Dorian', 'Gray', 'dorik@gmail.com', '12345', 'male');
INSERT INTO patients(name, lastName, email, password, gender) VALUE ('Mary', 'Jordan', 'Mary@gmail.com', '12345', 'female');
INSERT INTO patients(name, lastName, email, password, gender) VALUE ('Dima', 'Kombi', 'dimasik@mail.ru', '1', 'male');

INSERT INTO doctors(name, lastName, period_of_service, occupation, phone_number, email, floor, office, unit_id) VALUE ('King', 'Robert', 5, 'Cardiologist', 066552411, 'alex@gmail.com', 4, 512, 1);
INSERT INTO doctors(name, lastName, period_of_service, occupation, phone_number, email, floor, office, unit_id) VALUE ('King', 'Robert', 5, 'Cardiologist', 066552411, 'alex22@gmail.com', 4, 412, 1);
INSERT INTO doctors(name, lastName, period_of_service, occupation, phone_number, email, floor, office, unit_id) VALUE ('John', 'Snow', 7, 'Cardiologist', 066552411, 'john@gmail.com', 5, 518, 3);
INSERT INTO doctors(name, lastName, period_of_service, occupation, phone_number, email, floor, office, unit_id) VALUE ('Aria', 'Stark', 8, 'Endocrinologist', 066543411, 'aria@gmail.com', 1, 103, 5);
INSERT INTO doctors(name, lastName, period_of_service, occupation, phone_number, email, floor, office, unit_id) VALUE ('Neomi', 'Kambel', 2, 'Gastroenterologist', 0665598211, 'Neomi22@gmail.com', 7, 201, 1);
INSERT INTO doctors(name, lastName, period_of_service, occupation, phone_number, email, floor, office, unit_id) VALUE ('Sansa', 'Stark', 15, 'Anesthesiologist', 066552522, 'sansa@gmail.com', 2, 251, 4);
INSERT INTO doctors(name, lastName, period_of_service, occupation, phone_number, email, floor, office, unit_id) VALUE ('Steve', 'Mobs', 7, 'Immunologist', 0665598677, 'Steve@gmail.com', 3, 371, 1);
INSERT INTO doctors(name, lastName, period_of_service, occupation, phone_number, email, floor, office, unit_id) VALUE ('Bran', 'Stark', 7, 'Neurologist', 0665598900, 'John@gmail.com', 2, 221, 6);
INSERT INTO doctors(name, lastName, period_of_service, occupation, phone_number, email, floor, office, unit_id) VALUE ('Dayneris', 'Targarien', 4, 'Cardiologist', 0665598702, 'karisha@gmail.com', 6, 609, 7);
INSERT INTO doctors(name, lastName, period_of_service, occupation, phone_number, email, floor, office, unit_id) VALUE ('Bred', 'Pitt', 6, 'Oncologists', 0665598333, 'bred@gmail.com', 3, 304, 3);

INSERT INTO appreciation(patient_id, doctor_id, appreciation) VALUE (2, 4, 2);
INSERT INTO appreciation(patient_id, doctor_id, appreciation) VALUE (1, 5, 4);
INSERT INTO appreciation(patient_id, doctor_id, appreciation) VALUE (6, 5, 5);
INSERT INTO appreciation(patient_id, doctor_id, appreciation) VALUE (1, 3, 5);
INSERT INTO appreciation(patient_id, doctor_id, appreciation) VALUE (6, 5, 4);
INSERT INTO appreciation(patient_id, doctor_id, appreciation) VALUE (1, 2, 5);
INSERT INTO appreciation(patient_id, doctor_id, appreciation) VALUE (6, 5, 5);
INSERT INTO appreciation(patient_id, doctor_id, appreciation) VALUE (1, 7, 3);
INSERT INTO appreciation(patient_id, doctor_id, appreciation) VALUE (2, 5, 5);
INSERT INTO appreciation(patient_id, doctor_id, appreciation) VALUE (1, 8, 5);

INSERT INTO comments(patient_id, doctor_id, comment) VALUE (2, 4, 'true doctor');
INSERT INTO comments(patient_id, doctor_id, comment) VALUE (1, 5, 'i like him');
INSERT INTO comments(patient_id, doctor_id, comment) VALUE (6, 5, 'funny guy');
INSERT INTO comments(patient_id, doctor_id, comment) VALUE (1, 3, 'knows a lot=))');
INSERT INTO comments(patient_id, doctor_id, comment) VALUE (6, 5, 'never seen somebody like him');
INSERT INTO comments(patient_id, doctor_id, comment) VALUE (1, 2, 'very cleaver');
INSERT INTO comments(patient_id, doctor_id, comment) VALUE (6, 5, 'very smart');
INSERT INTO comments(patient_id, doctor_id, comment) VALUE (1, 7, 'very intelligent');
INSERT INTO comments(patient_id, doctor_id, comment) VALUE (2, 5, 'no way');
INSERT INTO comments(patient_id, doctor_id, comment) VALUE (1, 8, 'any comment you want');
INSERT INTO comments(patient_id, doctor_id, comment) VALUE (1, 8, 'thx bro u 2=))');

INSERT INTO days_to_doctor(doctor_id, day_id) VALUE (1, 2);
INSERT INTO days_to_doctor(doctor_id, day_id) VALUE (1, 4);
INSERT INTO days_to_doctor(doctor_id, day_id) VALUE (2, 2);
INSERT INTO days_to_doctor(doctor_id, day_id) VALUE (2, 3);
INSERT INTO days_to_doctor(doctor_id, day_id) VALUE (2, 4);
INSERT INTO days_to_doctor(doctor_id, day_id) VALUE (3, 5);
INSERT INTO days_to_doctor(doctor_id, day_id) VALUE (3, 4);
INSERT INTO days_to_doctor(doctor_id, day_id) VALUE (4, 2);
INSERT INTO days_to_doctor(doctor_id, day_id) VALUE (4, 3);
INSERT INTO days_to_doctor(doctor_id, day_id) VALUE (5, 2);
INSERT INTO days_to_doctor(doctor_id, day_id) VALUE (5, 3);
INSERT INTO days_to_doctor(doctor_id, day_id) VALUE (6, 2);
INSERT INTO days_to_doctor(doctor_id, day_id) VALUE (6, 3);
INSERT INTO days_to_doctor(doctor_id, day_id) VALUE (7, 3);
INSERT INTO days_to_doctor(doctor_id, day_id) VALUE (7, 4);
INSERT INTO days_to_doctor(doctor_id, day_id) VALUE (8, 3);
INSERT INTO days_to_doctor(doctor_id, day_id) VALUE (8, 4);
INSERT INTO days_to_doctor(doctor_id, day_id) VALUE (9, 2);
INSERT INTO days_to_doctor(doctor_id, day_id) VALUE (9, 4);
INSERT INTO days_to_doctor(doctor_id, day_id) VALUE (10, 4);
INSERT INTO days_to_doctor(doctor_id, day_id) VALUE (10, 5);
