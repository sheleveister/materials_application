--NEW TABLE WITH JSON
create database users_nodejs;
use users_nodejs;


CREATE TABLE `materials_courses` (
`id` int(50) unsigned NOT NULL AUTO_INCREMENT,
`data` JSON,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET = latin1;


INSERT INTO materials_courses VALUES
(null,
'[ { "id": "1", 
     "course": "NodeJS", 
     "name": "ER-моделирование", 
     "material": "2_tamplate.pdf", 
     "tasks": "index.js" 
   }, 
   { "id": "2", 
     "course": "NodeJS", 
     "name": "Express", 
     "material": "3_exercise_3_object.pdf", 
     "tasks": "app.js" 
   },
   { "id": "3",
     "course": "NodeJS", 
     "name": "Mustache", 
     "material": "4_exercise_4_npm_express.pdf", 
     "tasks": "server.js"
   } ]'
);

INSERT INTO materials_courses VALUES
(null,
'[ { "id": "1", 
      "course": "Python", 
      "name": "Простые (скалярные) типы данных", 
      "material": "lesson-01.py", 
      "tasks": "task.py" 
    }, 
    { "id": "2", 
      "course": "Python", 
      "name": "Область видимости и время жизни переменной", 
      "material": "lesson-02.py", 
      "tasks": "task.py"
    },
    { "id": "3", 
      "course": "Python", 
      "name": "Каррирование", 
      "material": "lesson-03.py", 
      "tasks": "task.py"
    },  
    { "id": "4", 
      "course": "Python", 
      "name": "Исключения", 
      "material": "lesson-04.py", 
      "tasks": "task.py"
    } ]'
),
(null,
'[ { "id": "1", 
     "course": "Java", 
     "name": "Многомерные массивы", 
     "material": "2_tamplate.pdf", 
     "tasks": "task.java" 
   }, 
   { "id": "2", 
     "course": "Java", 
     "name": "Абстрактные классы и методы", 
     "material": "3_exercise_3_object.pdf", 
     "tasks": "task.java" 
   },
   { "id": "3",
     "course": "Java", 
     "name": "Executor, Collable, Future, FutereTask", 
     "material": "4_exercise_4_npm_express.pdf", 
     "tasks": "task.java"
   } ]'
);


UPDATE materials_courses SET id = 1 WHERE id = 2;

UPDATE materials_courses
SET `data` = '[ { "id": "1", 
                  "course": "NodeJS", 
                  "name": "ER-моделирование", 
                  "material": "2_tamplate.pdf", 
                  "tasks": "index.js" 
                }, 
                { "id": "2", 
                  "course": "NodeJS", 
                  "name": "Express", 
                  "material": "3_exercise_3_object.pdf", 
                  "tasks": "app.js" 
                },
                { "id": "3",
                  "course": "NodeJS", 
                  "name": "Mustache", 
                  "material": "4_exercise_4_npm_express.pdf", 
                  "tasks": "server.js"
                } ]' WHERE id = 1; 
                
UPDATE materials_courses
SET `data` = '[ { "id": "1", 
                  "course": "Python", 
                  "name": "Простые (скалярные) типы данных", 
                  "material": "lesson-01.py", 
                  "tasks": "task.py" 
                }, 
                { "id": "2", 
                  "course": "Python", 
                  "name": "Область видимости и время жизни переменной", 
                  "material": "lesson-02.py", 
                  "tasks": "task.py"
                },
                { "id": "3", 
                  "course": "Python", 
                  "name": "Каррирование", 
                  "material": "lesson-03.py", 
                  "tasks": "task.py"
                },  
                { "id": "4", 
                  "course": "Python", 
                  "name": "Исключения", 
                  "material": "lesson-04.py", 
                  "tasks": "task.py"
                } ]' WHERE id = 2; 


UPDATE materials_courses
SET `data` = '[ { "id": "1", 
                  "course": "Java", 
                  "name": "Многомерные массивы", 
                  "material": "2_tamplate.pdf", 
                  "tasks": "index.js" 
                }, 
                { "id": "2", 
                  "course": "Java", 
                  "name": "Абстрактные классы и методы", 
                  "material": "3_exercise_3_object.pdf", 
                  "tasks": "app.js" 
                },
                { "id": "3",
                  "course": "Java", 
                  "name": "Executor, Collable, Future, FutereTask", 
                  "material": "4_exercise_4_npm_express.pdf", 
                  "tasks": "server.js"
                } ]' WHERE id = 3; 
                 

select * from materials_courses;

DELETE FROM materials_courses WHERE id = 2;
