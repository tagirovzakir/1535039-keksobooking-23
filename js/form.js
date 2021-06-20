export const deactivateForms = function (forms) {
  forms.forEach((form) => {
    const hidingClass = `${form.dataset.hidingClass}--disabled`;
    if (!form.classList.contains(hidingClass)) {form.classList.add(hidingClass);}
    Array.from(form.children).forEach((formElement) => formElement.disabled = 'true');
  });
};
export const activateForms = function (forms) {
  forms.forEach((form) => {
    const hidingClass = `${form.dataset.hidingClass}--disabled`;
    if (form.classList.contains(hidingClass)) {form.classList.remove(hidingClass);}
    Array.from(form.children).forEach((formElement) => formElement.disabled = '');
  });
};
