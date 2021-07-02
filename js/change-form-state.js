export const changeFormsState = function (disabled = true, ...exclusions) {
  Array.from(document.forms).forEach((form) => {
    if (form, !exclusions.includes(form)) {
      const hidingClass = `${form.dataset.hidingClass}--disabled`;
      form.classList[disabled ? 'add' : 'remove'](hidingClass);
      Array.from(form.children).forEach((formElement) => formElement.disabled = disabled);
    }
  });
};
