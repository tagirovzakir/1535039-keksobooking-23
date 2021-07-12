export const changeFormsState = function (disabled = true, forms) {
  Array.from(document.forms).forEach((form) => {
    if (forms.includes(form)) {
      const hidingClass = `${form.dataset.hidingClass}--disabled`;
      form.classList[disabled ? 'add' : 'remove'](hidingClass);
      Array.from(form.children).forEach((formElement) => formElement.disabled = disabled);
    }
  });
};
