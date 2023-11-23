export const getCorrectPageName = (pageName) => {
  switch (pageName) {
    case "orders": {
      return "Заказы";
    }
    case "product": {
      return "Товар";
    }
    case "cart": {
      return "Корзина";
    }
    case "order": {
      return "Оформление заказа";
    }
    case "cabinet": {
      return "Личный кабинет";
    }
    case "my-profile": {
      return "Мой профиль";
    }
    case "my-orders": {
      return "История заказов";
    }
    case "administrate": {
      return "Кабинет администратора";
    }
    case "categories": {
      return "Категории";
    }
    case "authorize": {
      return "Авторизация";
    }
    case "registration": {
      return "Регистрация";
    }
    case "best": {
      return "Лучшее";
    }
    case "discounts": {
      return "Скидки";
    }
    case "newest": {
      return "Новинки";
    }
    default:
      return pageName;
  }
};
