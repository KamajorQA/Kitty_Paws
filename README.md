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

## В проекте настроен CI/CD через GitHub Actions.

![kitty status badge](https://github.com/KamajorQA/Kitty_Paws/actions/workflows/github-actions-kitty-paws.yml/badge.svg)

**_Деплой реализован через Netlify._**
**_Ссылка на продакшн стенд: [kitty-paws](https://kitty-paws.netlify.app/)_**

### Автоформатирование и проверка кода реализованы через Prettier и ESLint.

Для запуска линтинга можно использовать команду:

```sh
npm run lint
```

Для запуска автоисправления линтинга можно использовать команду:

```sh
npm run lint:fix
```

## В проекте использованы библиотеки

- [x] Typescript;
- [x] Redux Toolkit;
- [x] React Router;
- [x] Ant Design;
- [x] react-icons;
- [x] prettier;

React Router использован для навигации между страницами **Home** / **Contacts** / **Not Found**
Рендер вложенных страниц реализован через компонент `<Outlet />` библиотеки `react-router-dom`

Работа с **SVG** организована и с использованием иконок библиотеки `react-icons`, и с использованием локальных файлов из директории `assets/icons`.

Описан кастомный хук **useControlNavigation** для совместной навигации в боковом меню (по ссылкам) и хедере (на лого) _(5ая версия AntD вынуждает использовать `useNavigation` вместо компонентов Link и NavLink из react-router-dom)_.

Также использован React **Context** (хуки `createContext` и `useContext`) для управления отображением Sider'а.

---

Любые замечания по работе приложения приветствуются 😊
