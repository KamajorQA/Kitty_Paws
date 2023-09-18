# Кошкотаблица на React, Typescript, RTK, AntD

**_SPA-проект получения с удаленного сервера и отображения в табличном виде списка карточек с CRUD-операциями_**

---

### Использован шаблон c-r-a --template typescript

Для первичной инициализации проекта в его директории сперва нужно установить зависимости с помощью команды:

```sh
npm install
```

Для локального запуска проекта нужно использовать команду

```sh
npm start
```

## В проекте использованы библиотеки

- [x] Typescript;
- [x] Redux Toolkit;
- [x] React Router;
- [x] Ant Design;
- [x] prettier;

React Router использован для навигации между страницами **Home** / **Contacts** / **Not Found**
Рендер вложенных страниц реализован через компонент `<Outlet />` библиотеки `react-router-dom`

## В проекте настроен CI/CD через GitHub Actions.![kitty status badge](https://github.com/KamajorQA/Kitty_Paws/actions/workflows/github-actions-kitty-paws.yml/badge.svg)

**_Деплой реализован через Netlify. Ссылка на продакшн стенд: [kitty-paws](https://kitty-paws.netlify.app/)_**

### Автоформатирование и проверка кода реализованы через Prettier и ESLint.

Для запуска линтинга нужно использовать команду:

```sh
npm run lint
```

Для запуска автоисправления линтинга нужно использовать команду:

```sh
npm run lint:fix
```

---

Любые замечания по работе приложения приветствуются 😊
