## Сущность: Employee

**Назначение:** сотрудник предприятия
**Первичный ключ:** id (INT)

| Атрибут | Тип | Обяз. | Описание |
|---|---|---|---|
| id | INT | Да | PK |
| full_name | VARCHAR(150) | Да | ФИО |
| birth_date | DATE | Нет | Дата рождения |
| phone | VARCHAR(20) | Нет | Телефон |
| email | VARCHAR(100) | Нет | Email |
| department_id | INT | Да | FK на Department |
| position_id | INT | Да | FK на Position |
| hire_date | DATE | Да | Дата приёма |
| status | VARCHAR(30) | Да | Статус |