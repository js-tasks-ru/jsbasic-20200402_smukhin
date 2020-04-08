/**
 * Эту функцию трогать не нужно
 */
function print(text) {
  console.log(text);
}

/**
 * Эту функцию нужно поменять так,
 * чтобы функция sayHello работала корректно
 */
 function isValid(name) {
   if (name.length > 3 && name != null) {
     let i = 0;
     for (i; i < name.length; i++) {
       if (name[i] == ' ') {
         return false;
       }
     }
   } else {
     return false;
   }
   return true;
 }

 
function sayHello() {
  const userName = prompt('Введите ваше имя');

  if (isValid(userName)) {
    print(`Welcome back, ${userName}!`);
  } else {
    print('Некорректное имя');
  }
}
