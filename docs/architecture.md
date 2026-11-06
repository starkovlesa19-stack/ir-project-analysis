# Архитектура

## Тип
Монолит + MVC + слоистая

## Обоснование
– Масштаб: ≤ 500 польз./день
– Команда: 1 разработчик
– Сроки: 4 недели

## Слои
1. Presentation — Jinja2
2. Controller — Flask
3. Business Logic — сервисы
4. Data Access — SQLAlchemy
5. Database — PostgreSQL