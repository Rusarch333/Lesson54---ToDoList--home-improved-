'use strict';

const tasks = [
  {
    id: 1,
    body: 'Прізвище І.І.',
    prioritet: false,
    options: [],
    worker: 'teamleed',
  },
];

const { 'my-form': myForm } = document.forms;
const { body: bodyInput } = myForm.elements;

const PATTERN_BODY_INPUT = /^[А-ЯІЇҐЄ][a-яіїґє']{3,15} ([А-ЯІЇҐЄ]\.){2}$/;

const bodyInputHandler = (PATTERN_BODY_INPUT) => {
  return ({ target }) => {
    if (PATTERN_BODY_INPUT.test(target.value.trim())) {
      target.style.setProperty('background-color', '');
    } else {
      target.style.setProperty('background-color', 'pink');
    }
  };
};
bodyInput.addEventListener('input', bodyInputHandler(PATTERN_BODY_INPUT));

const { prioritet } = myForm.elements;

const prioritetClickHandler = () => {
  let checked = null;

  return ({ target }) => {
    checked = checked === target.value ? null : target.value;
    target.checked = Boolean(checked);
  };
};

prioritet.addEventListener('click', prioritetClickHandler());

const renderTask = (task) => {
  const liTask = document.createElement('li');

  const strongElement = document.createElement('strong');
  strongElement.style.color = task.prioritet ? 'red' : 'blue';
  strongElement.innerText = task.body;

  const emElement = document.createElement('em');
  emElement.innerText = ' (' + task.worker + ')';

  liTask.append(strongElement);
  liTask.append(emElement);
  ulListTasks.append(liTask);
};

const ulListTasks = document.createElement('ul');

const myFormSubmitHandler = (PATTERN_BODY_INPUT, tasks, ulListTasks) => {
  return (event) => {
    event.preventDefault();

    const { body, prioritet, multiprop, worker } = event.target.elements;

    const optionsArray = [];
    for (const propElem of multiprop) {
      if (propElem.checked) {
        optionsArray.push(propElem.value);
      }
    }

    if (PATTERN_BODY_INPUT.test(bodyInput.value)) {
      const task = {
        id: tasks.length + 1,
        body: body.value,
        prioritet: prioritet.checked,
        options: [optionsArray],
        worker: worker.value,
      };

      renderTask(task);
    }
  };
};
myForm.addEventListener(
  'submit',
  myFormSubmitHandler(PATTERN_BODY_INPUT, tasks, ulListTasks)
);

tasks.forEach((task) => {
  renderTask(task);
});

myForm.insertAdjacentElement('afterend', ulListTasks);
