const loadForm = () => {
  const form = document.querySelector('form');
  const inputs = form.querySelectorAll('input, textarea, select');
  inputs.forEach((input) => {
    if (localStorage.getItem(input.name)) {
      input.value = localStorage.getItem(input.name);

    }
    handleValidation(input);
  });

}



const handleChange = (event) => {
  event.target.parentElement.querySelectorAll('.error').forEach((error) => error.remove());
  handleValidation(event.target);
  if (event.target.dataset.valid === 'true' && event.target.type !== 'password') {
    localStorage.setItem(event.target.name, event.target.value);
  } else {
    localStorage.removeItem(event.target.name);
  }
  checkValidation();
}

const checkValidation = () => {
  let state = true;
  const inputs = document.querySelectorAll('[data-valid]');
  inputs.forEach((input) => {
    if (input.dataset.valid === 'false') {
      state = false;
    }
  });
  const button = document.querySelector('button[type="submit"]');
  if (state) {
    button.removeAttribute('disabled');
  } else {
    button.setAttribute('disabled', 'disabled');
  }
}

const handleSubmit = (event) => {
  event.preventDefault();
  let isValid = true;
  const inputs = event.target.querySelectorAll('[data-valid]');
  inputs.forEach((input) => {
    if (input.dataset.valid === 'false') {
      isValid = false;
    }
  });
  if (isValid) {
    fetch('https://mocktarget.apigee.net/echo', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(
        {
          nombre: event.target.nombre.value,
          apodo: event.target.apodo.value,
          biografia: event.target.biografia.value,
          password: event.target.contrasena.value,
        }
      ),
    }).then((response) => response.json())
      .then((data) => {
        const div = document.querySelector('.form__response');
        div.innerHTML = '';
        const pre = document.createElement('pre');
        pre.classList.add('form--response__pre');
        const code = document.createElement('code');
        code.classList.add('form--response__code');
        code.textContent = JSON.stringify(data, null, 2);
        pre.appendChild(code);
        div.appendChild(pre);
      });
    resetForm();
  }
}

const resetForm = () => {
  localStorage.clear();
  document.querySelector('form').reset();
  const button = document.querySelector('button[type="submit"]');
  button.setAttribute('disabled', 'disabled');
}

const handleValidation = (target) => {
  const validationMessages = {
    required: () => 'Este campo es requerido',
    alphanumeric: () => 'Este campo solo puede contener letras y números',
    min: (min) => `Este campo debe tener al menos ${min} caracteres`,
    max: (max) => `Este campo debe tener como máximo ${max} caracteres`,
    minmax: (min, max) => `Este campo debe tener entre ${min} y ${max} caracteres`,
    one: (message) => `${oneMessages[message]()}`,
  }

  const oneMessages = {
    mayus: () => 'Este campo debe tener al menos una letra mayúscula',
    number: () => 'Este campo debe tener al menos un número',
  }
  let hasErrors = false;
  const rules = target.getAttribute('validation-rules').split('|');

  rules.forEach((rule, index) => {
    const newRule = rule.split(':');
    if (!validate(newRule[0], target.value, newRule[1], newRule[2])) {
      target.parentElement.appendChild(errorSpan(validationMessages[newRule[0]], target, index, newRule[1], newRule[2]));
      hasErrors = true;
    } else {
      if (target.parentElement.querySelector(`#error-${target.name}-${index}`)) {
        target.parentElement.querySelector(`#error-${target.name}-${index}`).remove();
      }
    }
  });
  target.dataset.valid = !hasErrors;
}

const errorSpan = (message, target, index, min, max) => {
  const span = document.createElement('span');
  span.className = 'error';
  span.textContent = message(min, max);
  span.id = `error-${target.name}-${index}`;
  return span;
}

const validate = (rule, value, min, max) => {
  switch (rule) {
    case 'required':
      if (!value) {
        return false;
      }
      return true;
    case 'alphanumeric':
      if (!isAlphanumeric(value)) {
        return false;
      }
      return true;
    case 'min':
      if (value.length < min && value !== '') {
        return false;
      }
      return true;
    case 'max':
      if (value.length > max) {
        return false;
      }
      return true;
    case 'minmax':
      if (value.length < min || value.length > max) {
        return false;
      }
      return true;
    case 'one':
      return oneValidations(min, value);
    default:
      return false;
  }
}

const oneValidations = (action, value) => {
  switch (action) {
    case 'mayus': {
      caracteres = value.split('');
      for (let i = 0; i < caracteres.length; i++) {
        if (isLetter(caracteres[i]) && caracteres[i] === caracteres[i].toUpperCase()) {
          return true;
        }
      }
      return false;
    }
    case 'number': {
      caracteres = value.split('');
      for (let i = 0; i < caracteres.length; i++) {
        if (isNumeric(caracteres[i])) {
          return true;
        }
      }
      return false;
    }
  }
}

const isAlphanumeric = (value) => {
  const caracteres = value.split('');
  for (let i = 0; i < caracteres.length; i++) {
    if (!isLetter(caracteres[i]) && !isNumeric(caracteres[i])) {
      return false;
    }
  }
  return true;
}

const isLetter = (caracter) => {
  const codigoAscii = caracter.charCodeAt(0);
  if ((codigoAscii >= 65 && codigoAscii <= 90) || (codigoAscii >= 97 && codigoAscii <= 122)) {
    return true;
  }
  return false;
}

const isNumeric = (caracter) => {
  const codigoAscii = caracter.charCodeAt(0);
  if (codigoAscii >= 48 && codigoAscii <= 57) {
    return true;
  }
  return false;
}
loadForm();