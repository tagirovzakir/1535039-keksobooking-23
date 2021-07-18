export const changeFormsState = function (disabled = true, ...forms) {
  if (!forms.length) { forms = Array.from(document.forms);}
  Array.from(document.forms).forEach((form) => {
    if (forms.includes(form)) {
      const hidingClass = `${form.dataset.hidingClass}--disabled`;
      form.classList[disabled ? 'add' : 'remove'](hidingClass);
      Array.from(form.children).forEach((formElement) => formElement.disabled = disabled);
    }
  });
};
