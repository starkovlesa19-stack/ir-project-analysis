# Структура хранения

## Логическая модель
| Таблица | Атрибуты | PK | FK |
|---|---|---|---|
| employees | id, full_name, ... | id | department_id, position_id |
| departments | id, name, parent_id | id | parent_id |
| positions | id, title, base_salary | id | — |
| employment_contracts | id, employee_id, ... | id | employee_id |
| leaves | id, employee_id, ... | id | employee_id |
| timesheets | id, employee_id, ... | id | employee_id |
| salary_payments | id, employee_id, ... | id | employee_id |

## Физическая модель
– СУБД: PostgreSQL

| Таблица | Индексы | Ограничения |
|---|---|---|
| employees | PK, idx_department, idx_status | NOT NULL, UNIQUE(phone) |
| departments | PK | NOT NULL |
| positions | PK | NOT NULL |
| employment_contracts | PK, idx_employee | NOT NULL, UNIQUE(contract_number) |
| leaves | PK, idx_employee | NOT NULL |
| timesheets | PK, idx_date | NOT NULL |
| salary_payments | PK, idx_employee | NOT NULL |

## DDL
См. sql/schema.sql