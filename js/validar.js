//criando os objetos dos elementos de texto do form
var nome = document.querySelector("#inputName");
var nomeHelp = document.querySelector("#inputNameHelp");
var ano = document.querySelector("#inputYear");
var anoHelp = document.querySelector("#inputYearHelp");
var email = document.querySelector("#inputEmail");
var emailHelp = document.querySelector("#inputEmailHelp");
var senha = document.querySelector("#inputPassword");
var passStrengthMeter = document.querySelector("#passStrengthMeter");
var senhaHelp = document.querySelector("#inputPasswordHelp");
var result = document.querySelector("#inputResult");

/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco do campo inputName mude, será chamada a função validarNome*/
nome.addEventListener("focusout", validarNome);

/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco seja mudado, será chamada a função validarNome*/

//declaração de função de forma anônima usando uma expressão de função de seta =>
ano.addEventListener("focusout", (e) => validarAno(e));

email.addEventListener("focusout", validarEmail);

senha.addEventListener("input", validarSenha);

document.getElementById("singleForm").addEventListener("submit", cadastrarUsuario);

/*declaração tradicional de função validarNome(e)
'e' é o objeto do tipo evento que contém, alpem de outras propriedades, o objeto que iniciou o evento,
neste caso o objeto 'nome'
*/
function validarNome(e) {
  //declaração da expressão regular para definir o formato de um nome válido
  const regexNome = /^[A-Z][a-z]+$/;

  const value = e.target.value.trim();
  console.log(e); //impressão em console do objeto evento e
  console.log(value); //impressão em console do valor do objeto 'nome' que originou o evento

  if (!value.match(regexNome) || value.length < 6) {
    //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputNameHelp
    nomeHelp.textContent = "Formato de nome inválido";
    nomeHelp.style.color = "red";
  } else {
    nomeHelp.textContent = "";
  }
}
const MAX_YEAR = 2022; // Ano máximo permitido no PDF
function validarAno(e) {
  //declaração da expressão regular para definir o formato de um ano válido
  const regexAno = /^[0-9]{4}$/;
  //tirar (trim) espaços em branco antes e depois da string
  const anoTrimado = ano.value.trim();
  console.log(ano.value);

  if (anoTrimado.match(regexAno) == null) {
    //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
    anoHelp.textContent = "Formato de ano inválido";
    anoHelp.style.color = "red";
  } else {
    //objeto Date
    var date = new Date();
    //obtem o ano atual
    console.log(date.getFullYear());

    if (parseInt(anoTrimado) > MAX_YEAR) {
      anoHelp.textContent = `Ano inválido. O ano não pode ser maior que ${MAX_YEAR}.`;
      anoHelp.style.color = "red";
    } else if (parseInt(anoTrimado) > parseInt(date.getFullYear())) {
      //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
      anoHelp.textContent = `Ano inválido. O ano não pode ser maior que ${date.getFullYear()}.`;
      anoHelp.style.color = "red";
    } else if (parseInt(anoTrimado) < parseInt(date.getFullYear()) - 120) {
      //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
      anoHelp.textContent = `Ano inválido. O ano não pode ser menor que ${date.getFullYear() - 120}.`;
      anoHelp.style.color = "red";
    } else {
      anoHelp.textContent = "";
    }
  }
}

function validarEmail(e) {
  const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!email.value.trim().match(regexEmail)) {
    emailHelp.textContent = "Formato de email inválido";
    emailHelp.style.color = "red";
  } else {
    emailHelp.textContent = "";
  }
}

function validarSenha(e) {
  const regexSpecial = /[@#%&!+]/;
  const regexNumber = /[0-9]/;
  const regexLetter = /[a-zA-Z]/;
  const password = senha.value.trim();

  let errors = [];
  let forca = 0;

  if (password.length < 6 || password.length > 20) {
    errors.push("Senha deve ter entre 6 e 20 caracteres.");
  }

  if (!regexSpecial.test(password)) {
    errors.push("Senha deve conter pelo menos um caractere especial.");
  } else {
    forca += 10;
  }

  if (!regexNumber.test(password)) {
    errors.push("Senha deve conter pelo menos um número.");
  } else {
    forca += 10;
  }

  if (!regexLetter.test(password)) {
    errors.push("Senha deve conter letras.");
  } else {
    forca += 10;
  }

  // Permite verificar se a senha possui o nome do usuário independente se possui caracteres Maiusculos ou Minusculos
  const cleanNome = (nome.value ?? "").trim().toLowerCase();
  const cleanAno = (ano.value ?? "").trim().toLowerCase();
  const cleanPassword = (password ?? "").trim().toLowerCase();
  console.log("cleanNome: ", cleanNome);
  console.log("cleanPassword: ", cleanPassword);
  if (cleanNome !== "" && cleanAno !== "") {
    // Verifica se a senha possui o nome do usuário ou sua data de nascimento
    if (cleanPassword.includes(cleanNome) || cleanPassword.includes(cleanAno)) {
      errors.push("Senha não pode conter seu nome ou ano de nascimento.");
    }
  }

  if (errors.length > 0) {
    const errorsString = `* ${errors.join("\n* ")}`;
    senhaHelp.textContent = errorsString;
    senhaHelp.style.color = "red";
    senhaHelp.style.whiteSpace = "pre-wrap";

    if (password.length >= 8) forca += 5;
    if (password.length >= 12) forca += 5;

    passStrengthMeter.value = forca;

    if (forca <= 20) {
      result.textContent = "Força da Senha: Fraca";
      result.style.color = "red";
    } else if (forca > 20 && forca <= 30) {
      result.textContent = "Força da Senha: Moderada";
      result.style.color = "orenge";
    } else {
      result.textContent = "Força da Senha: Forte";
      result.style.color = "green";
    }

    return false;
  } else {
    senhaHelp.textContent = "";
    senhaHelp.style.color = "green";
    senhaHelp.style.whiteSpace = "normal";

    if (password.length >= 8) forca += 5;
    if (password.length >= 12) forca += 5;

    passStrengthMeter.value = forca;

    if (forca <= 20) {
      result.textContent = "Força da Senha: Fraca";
      result.style.color = "red";
    } else if (forca > 20 && forca <= 30) {
      result.textContent = "Força da Senha: Moderada";
      result.style.color = "orenge";
    } else {
      result.textContent = "Força da Senha: Forte";
      result.style.color = "green";
    }

    return true;
  }
}

function cadastrarUsuario(e) {
  event.preventDefault();

  validarNome({target: nome});
  validarAno(e);
  validarEmail(e);
  validarSenha(e);

  var isNameValid = nomeHelp.textContent === "";
  var isYearValid = anoHelp.textContent === "";
  var isEmailValid = emailHelp.textContent === "";
  var isPasswordValid = senhaHelp.textContent === "";
  console.log("isNameValid: ", isNameValid)
  if (!isNameValid) console.log(" - nomeHelp: ", nomeHelp.textContent)
  console.log("isPasswordValid: ", isPasswordValid)
  if (!isPasswordValid) console.log(" - senhaHelp: ", senhaHelp).textContent
    console.log("isEmailValid: ", isEmailValid)
  if (!isEmailValid) console.log(" - emailHelp: ", emailHelp.textContent)
  console.log("isYearValid", isYearValid)
  if (!isYearValid) console.log(" - anoHelp: ", anoHelp.textContent)
  if (isNameValid && isYearValid && isEmailValid && isPasswordValid) {
    console.log("Todas as Validações foram passadas");
  } else {
    console.log("Validação falhou");
  }
}
