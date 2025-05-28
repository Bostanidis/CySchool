CREATE TABLE IF NOT EXISTS schools (
    id INT NOT NULL PRIMARY KEY,
    greek_name TEXT NOT NULL,
    english_name TEXT NOT NULL,
    students UUID[] DEFAULT '{}'
);

-- INSERT INTO schools (id, greek_name, english_name, students) VALUES
-- (1, 'Α ΤΕΣΕΚ Λεμεσού', 'A TESEK Limassol', '{}'),
-- (2, 'ΑΘΗΝΑΪΔΕΙΟ ΓΥΜΝΑΣΙΟ ΚΑΘΟΛΙΚΗΣ', 'Athenaideio Catholic Gymnasium', '{}'),
-- (3, 'Απεήτειο Γυμνάσιο', 'Apeiteio Gymnasium', '{}'),
-- (4, 'Γ΄ ΤΕΣΕΚ ΛΕΜΕΣΟΥ', 'C TESEK Limassol', '{}'),
-- (5, 'Γυμνάσιο Α Αγίου Θεοδώρου Πάφου', 'A Gymnasium of Saint Theodoros Paphos', '{}'),
-- (6, 'Γυμνάσιο Αγίας Βαρβάρας Κ. Πολεμιδιών', 'Gymnasium of Agia Varvara Kato Polemidia', '{}'),
-- (7, 'Γυμνάσιο Αγίας Παρασκευής Γεροσκήπου', 'Gymnasium of Agia Paraskevi Geroskipou', '{}'),
-- (8, 'ΓΥΜΝΑΣΙΟ ΑΓΙΑΣ ΦΥΛΑΞΕΩΣ', 'Gymnasium of Agia Fylaxeos', '{}'),
-- (9, 'Γυμνάσιο Αγίου Αθανασίου', 'Gymnasium of Agios Athanasios', '{}'),
-- (10, 'Γυμνάσιο Αγίου Αντωνίου', 'Gymnasium of Agios Antonios', '{}'),
-- (11, 'ΓΥΜΝΑΣΙΟ ΑΓΙΟΥ ΙΩΑΝΝΗ ΚΑΤΩ ΠΟΛΕΜΙΔΙΩΝ', 'Gymnasium of Agios Ioannis Kato Polemidia', '{}'),
-- (12, 'ΓΥΜΝΑΣΙΟ ΑΓΙΟΥ ΝΕΟΦΥΤΟΥ', 'Gymnasium of Agios Neophytos', '{}'),
-- (13, 'ΓΥΜΝΑΣΙΟ ΑΠΟΣΤΟΛΟΥ ΑΝΔΡΕΑ ΕΜΠΑΣ', 'Apostolos Andreas Gymnasium of Empa', '{}'),
-- (14, 'ΓΥΜΝΑΣΙΟ ΑΠΟΣΤΟΛΟΥ ΠΑΥΛΟΥ', 'Apostle Paul Gymnasium', '{}'),
-- (15, 'ΓΥΜΝΑΣΙΟ ΔΡΟΣΙΑΣ', 'Drosia Gymnasium', '{}'),
-- (16, 'ΓΥΜΝΑΣΙΟ ΕΠΙΣΚΟΠΗΣ', 'Episkopi Gymnasium', '{}'),
-- (17, 'ΓΥΜΝΑΣΙΟ ΖΑΚΑΚΙΟΥ', 'Zakaki Gymnasium', '{}'),
-- (18, 'Γυμνάσιο Λύκειο Πολεμίου', 'Polemi Gymnasium-Lyceum', '{}'),
-- (19, 'ΓΥΜΝΑΣΙΟ ΝΕΑΠΟΛΗΣ', 'Neapolis Gymnasium', '{}'),
-- (20, 'ΓΥΜΝΑΣΙΟ ΠΑΝΑΓΙΑΣ ΘΕΟΣΚΕΠΑΣΤΗΣ', 'Panagia Theoskepasti Gymnasium', '{}'),
-- (21, 'Γυμνάσιο Παραλιμνίου', 'Paralimni Gymnasium', '{}'),
-- (22, 'ΓΥΜΝΑΣΙΟ ΠΟΛΕΜΙΔΙΩΝ', 'Polemidia Gymnasium', '{}'),
-- (23, 'ΓΥΜΝΑΣΙΟ ΠΟΛΕΩΣ ΧΡΥΣΟΧΟΥΣ', 'Gymnasium of Polis Chrysochous', '{}'),
-- (24, 'ΓΥΜΝΑΣΙΟ ΤΡΑΧΩΝΙΟΥ', 'Trachoni Gymnasium', '{}'),
-- (25, 'ΓΥΜΝΑΣΙΟ ΥΨΩΝΑ', 'Ypsonas Gymnasium', '{}'),
-- (26, 'Γυμνάσιο-Λύκειο Ειρήνης και Ελευθερίας Δερύνειας-Σωτήρας', 'Gymnasium-Lyceum of Peace & Freedom Deryneia-Sotira', '{}'),
-- (27, 'Γυμνασίου Καλογερόπουλου', 'Kalogeropoulos Gymnasium', '{}'),
-- (28, 'ΘΕΚΛΕΙΟ ΓΥΜΝΑΣΙΟ', 'Thekleio Gymnasium', '{}'),
-- (29, 'Λανίτειο Γυμνάσιο', 'Laniteio Gymnasium', '{}'),
-- (30, 'Λανίτειο Λύκειο', 'Laniteio Lyceum', '{}'),
-- (31, 'ΛΥΚΕΙΟ Α΄ ΑΡΧ. ΜΑΚΑΡΙΟΥ Γ΄ ΠΑΦΟΥ', 'Arch. Makarios III A'' Lyceum of Paphos', '{}'),
-- (32, 'Λύκειο Αγίας Φυλάξεως', 'Lyceum of Agia Fylaxeos', '{}'),
-- (33, 'Λύκειο Αγίου Αντωνίου', 'Lyceum of Agios Antonios', '{}'),
-- (34, 'Λύκειο Αγίου Νεοφύτου', 'Lyceum of Agios Neophytos', '{}'),
-- (35, 'Λύκειο Αγίου Ιωάννη', 'Lyceum of Agios Ioannis', '{}'),
-- (36, 'Λύκειο Αγίου Νικολάου', 'Lyceum of Agios Nikolaos', '{}'),
-- (37, 'Λύκειο Αγίου Σπυρίδωνα', 'Lyceum of Agios Spyridonas', '{}'),
-- (38, 'Λύκειο Απ. Βαρνάβα', 'Lyceum of Apostle Barnabas', '{}'),
-- (39, 'ΛΥΚΕΙΟ ΑΠ. ΠΕΤΡΟΥ ΚΑΙ ΠΑΥΛΟΥ', 'Lyceum of Apostles Peter and Paul', '{}'),
-- (40, 'ΛΥΚΕΙΟ Γ. ΤΑΛΙΩΤΗ ΓΕΡΟΣΚΗΠΟΥ', 'Lyceum of G. Taliotis Geroskipou', '{}'),
-- (41, 'ΛΥΚΕΙΟ ΚΑΙ ΤΕΣΕΚ ΕΜΠΑΣ', 'Lyceum & TESEK Empa', '{}'),
-- (42, 'ΛΥΚΕΙΟ ΚΑΙ ΤΕΣΕΚ ΠΟΛΗΣ ΧΡΥΣΟΧΟΥΣ', 'Lyceum & TESEK Polis Chrysochous', '{}'),
-- (43, 'Λύκειο Κοκκινοχωρίων', 'Lyceum of Kokkinokhoria', '{}'),
-- (44, 'Λύκειο Κολοσσίου', 'Lyceum of Kolossi', '{}'),
-- (45, 'ΛΥΚΕΙΟ ΚΥΚΚΟΥ', 'Kykkos Lyceum', '{}'),
-- (46, 'Λύκειο Λινόπετρας', 'Lyceum of Linopetra', '{}'),
-- (47, 'Λύκειο Παραλιμνίου', 'Lyceum of Paralimni', '{}'),
-- (48, 'ΛΥΚΕΙΟ ΠΟΛΕΜΙΔΙΩΝ', 'Lyceum of Polemidia', '{}'),
-- (49, 'ΝΙΚΟΛΑΪΔΕΙΟ ΓΥΜΝΑΣΙΟ', 'Nikolaideio Gymnasium', '{}'),
-- (50, 'Περιφερειακό Γυμνάσιο και Λύκειο Λευκάρων', 'Regional Gymnasium and Lyceum of Lefkara', '{}'),
-- (51, 'ΣΧΟΛΗ ΟΜΟΔΟΥΣ', 'Omodos School', '{}'),
-- (52, 'ΤΕΣΕΚ ΑΥΓΟΡΟΥ', 'TESEK Avgorou', '{}'),
-- (53, 'ΤΕΣΕΚ ΠΑΦΟΥ', 'TESEK Paphos', '{}'),
-- (54, 'ΤΣΙΡΕΙΟ ΓΥΜΝΑΣΙΟ', 'Tsireio Gymnasium', '{}');

-- DELETE FROM schools WHERE id=1; 
-- DELETE FROM schools WHERE id=4; 
-- DELETE FROM schools WHERE id=49; 
-- DELETE FROM schools WHERE id=54; 
-- DELETE FROM schools WHERE id=50; 
-- DELETE FROM schools WHERE id=51; 

-- DELETE FROM schools WHERE id=30;

-- INSERT INTO schools (id, greek_name, english_name, students) VALUES 
-- (1, 'ΝΙΚΟΛΑΪΔΕΙΟ ΓΥΜΝΑΣΙΟ', 'Nikolaideio Gymnasium', '{}'),
-- (4, 'Περιφερειακό Γυμνάσιο και Λύκειο Λευκάρων', 'Regional Gymnasium and Lyceum of Lefkara', '{}'),
-- (30, 'ΤΣΙΡΕΙΟ ΓΥΜΝΑΣΙΟ', 'Tsireio Gymnasium', '{}'),
-- (54, 'ΣΧΟΛΗ ΟΜΟΔΟΥΣ', 'Omodos School', '{}'),
-- (50, 'Α ΤΕΣΕΚ Λεμεσού', 'A TESEK Limassol', '{}'),
-- (51, 'Γ΄ ΤΕΣΕΚ ΛΕΜΕΣΟΥ', 'C TESEK Limassol', '{}'),
-- (49, 'Λανίτειο Λύκειο', 'Laniteio Lyceum', '{}');

-- Create a new temporary table with the same structure
-- CREATE TABLE schools_sorted (LIKE schools INCLUDING ALL);

-- Insert data in the desired order
-- INSERT INTO schools_sorted 
-- SELECT * FROM schools ORDER BY id;

-- Drop the original table
-- DROP TABLE schools;

-- Rename the new table
-- ALTER TABLE schools_sorted RENAME TO schools;

SELECT * FROM schools;

