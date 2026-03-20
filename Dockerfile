# ===== ЭТАП 1: СБОРКА ПРИЛОЖЕНИЯ =====
FROM node:18-alpine AS builder

WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./

# ЗАМЕНИТЕ npm ci НА npm install (более устойчиво)
RUN npm install

# Копируем исходный код
COPY . .

# Собираем проект
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]