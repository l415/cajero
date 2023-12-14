var sesionIniciada = false;
var cuentas = [
  { nombre: "Lals", saldo: 200 },
  { nombre: "Tona", saldo: 290 },
  { nombre: "Dolores", saldo: 67 }
];

function showFullScreenCard() {
  document.getElementById('fullScreenCard').style.display = 'block';
  updateBalance();
}

function hideFullScreenCard() {
  document.getElementById('fullScreenCard').style.display = 'none';
  clearFields();
}

function authenticate() {
  var username = document.getElementById('userSelect').value;
  var password = document.getElementById('password').value;
  var resultElement = document.getElementById('result');

  if (username && password) {
    if (checkCredentials(username, password)) {
      resultElement.innerHTML = '¡Autenticación exitosa, ' + username + '!';
      sesionIniciada = true;
      document.getElementById('userSelect').disabled = true;
      document.getElementById('balance').style.display = 'block';
      updateBalance();
    } else {
      resultElement.innerHTML = 'Credenciales incorrectas. Inténtelo nuevamente.';
    }
  } else {
    resultElement.innerHTML = 'Ingrese nombre de usuario y contraseña.';
  }
}

function checkCredentials(username, password) {
  if (username === 'Lals' && password === '123') {
    return true;
  } else if (username === 'Tona' && password === '456') {
    return true;
  } else if (username === 'Dolores' && password === '789') {
    return true;
  } else {
    return false;
  }
}

function clearFields() {
  document.getElementById('password').value = '';
  document.getElementById('amount').value = '';
  document.getElementById('result').innerHTML = '';
  sesionIniciada = false;
  document.getElementById('userSelect').disabled = false;
  document.getElementById('balance').style.display = 'none';
}

function updateBalance() {
  var username = document.getElementById('userSelect').value;
  var balanceField = document.getElementById('balance');
  if (username && sesionIniciada) {
    var saldo = getBalance(username);
    balanceField.innerHTML = 'Saldo actual: ' + saldo;
    balanceField.style.display = 'block';
  } else {
    balanceField.style.display = 'none';
  }
}

function getBalance(username) {
  var account = cuentas.find(account => account.nombre === username);
  return account ? account.saldo : 'No disponible';
}

function deposit() {
  var username = document.getElementById('userSelect').value;
  var amount = parseFloat(document.getElementById('amount').value);
  var resultElement = document.getElementById('result');

  if (!isNaN(amount) && amount > 0 && sesionIniciada) {
    var currentBalance = getBalance(username);
    if (currentBalance !== 'No disponible') {
      var newBalance = currentBalance + amount;

      // Validar si el nuevo saldo cumple con la regla de negocio
      if (newBalance <= 990) {
        resultElement.innerHTML = '¡Depósito exitoso! Nuevo saldo: ' + newBalance;
        updateBalance();
      } else {
        resultElement.innerHTML = 'El depósito excede el límite permitido de $990.';
      }
    } else {
      resultElement.innerHTML = 'Error al realizar el depósito. Vuelva a iniciar sesión.';
    }
  } else {
    resultElement.innerHTML = 'Ingrese un monto válido para depositar.';
  }
}

function withdraw() {
  var username = document.getElementById('userSelect').value;
  var amount = parseFloat(document.getElementById('amount').value);
  var resultElement = document.getElementById('result');

  if (!isNaN(amount) && amount > 0 && sesionIniciada) {
    var currentBalance = getBalance(username);
    if (currentBalance !== 'No disponible') {
      // Validar si hay suficientes fondos para el retiro
      if (amount <= currentBalance) {
        var newBalance = currentBalance - amount;

        // Validar si el nuevo saldo cumple con la regla de negocio
        if (newBalance >= 10) {
          resultElement.innerHTML = '¡Retiro exitoso! Nuevo saldo: ' + newBalance;
          updateBalance();
        } else {
          resultElement.innerHTML = 'El retiro dejaría un saldo inferior al límite permitido de $10.';
        }
      } else {
        resultElement.innerHTML = 'Fondos insuficientes para realizar el retiro.';
      }
    } else {
      resultElement.innerHTML = 'Error al realizar el retiro. Vuelva a iniciar sesión.';
    }
  } else {
    resultElement.innerHTML = 'Ingrese un monto válido para retirar.';
  }
}

function checkBalance() {
  var username = document.getElementById('userSelect').value;
  var balanceField = document.getElementById('balance');
  var resultElement = document.getElementById('result');

  if (username && sesionIniciada) {
    var saldo = getBalance(username);
    resultElement.innerHTML = 'Saldo actual de ' + username + ': ' + saldo;
    resultElement.style.display = 'block';
  } else {
    resultElement.innerHTML = 'Inicie sesión para consultar el saldo.';
    resultElement.style.display = 'block';
  }
}
