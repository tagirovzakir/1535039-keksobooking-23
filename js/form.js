export const deactivateForms = function (forms) {
  forms.forEach((form) => {
    const formClassName = form.className;
    if (!form.classList.contains(`${formClassName}--disabled`)) { form.classList.add(`${formClassName}--disabled`); }
    Array.from(form.children).forEach((formElement) => {
      formElement.setAttribute('disabled', 'true');
    });
  });
};
export const activateForms = function (forms) {
  forms.forEach((form) => {
    form.classList.remove(`${form.classList[1]}`);
    Array.from(form.children).forEach((formElement) => {
      formElement.removeAttribute('disabled');
    });
  });
};
