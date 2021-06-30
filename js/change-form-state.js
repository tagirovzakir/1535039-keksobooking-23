export const changeFormsState = function (forms, disabled = true) {
  forms.forEach((form) => {
    const hidingClass = `${form.dataset.hidingClass}--disabled`;
    form.classList[disabled ? 'add' : 'remove'](hidingClass);
    Array.from(form.children).forEach((formElement) => formElement.disabled = disabled);
  });
};
