document.addEventListener("DOMContentLoaded", function() {

  function waitForMathJax() {
    if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
      MathJax.typesetPromise().then(() => {
        initialize();
      });
    } else {
      setTimeout(waitForMathJax, 50);
    }
  }

  waitForMathJax();

  function initialize() {
    const subTopics = {
      algebra: ["Algèbre linéaire", "Polynomes"],
      calculus: ["Dérivés", "Limites et continuités", "Intégrales", "Espaces vectoriels", "Développements limités"]
    };

    const subTopicContainers = {};

    const subTopicElements = document.querySelectorAll('.sub-topic');
    subTopicElements.forEach(element => {
      element.addEventListener('mouseover', showSubTopics);
    });

    function showSubTopics(event) {
      const target = event.target.closest('.sub-topic');
      if (!target) return;

      const topic = target.dataset.topic;
      const subTopicList = subTopics[topic];
      if (!subTopicList) return;

      let subTopicHTML = '';
      subTopicList.forEach(subTopic => {
        const subTopicLink = `${subTopic.toLowerCase().replace(/\s/g, '-')}.html`;
        subTopicHTML += `<li><a href="${subTopicLink}">${subTopic}</a></li>`;
      });

      const subTopicContainer = getSubTopicContainer(topic);
      subTopicContainer.innerHTML = `<ul>${subTopicHTML}</ul>`;

      const rect = target.getBoundingClientRect();
      subTopicContainer.style.top = `${rect.top + window.pageYOffset}px`;
      subTopicContainer.style.left = `${rect.left + rect.width}px`;
      subTopicContainer.style.display = 'block';
    }

    document.addEventListener('mouseout', function(event) {
      const relatedTarget = event.relatedTarget;
      if (!relatedTarget || relatedTarget.closest('.sub-topic-container')) return;

      Object.values(subTopicContainers).forEach(container => {
        container.style.display = 'none';
      });
    });

    function getSubTopicContainer(topic) {
      if (!subTopicContainers[topic]) {
        const container = document.createElement('div');
        container.classList.add('sub-topic-container');
        document.body.appendChild(container);
        subTopicContainers[topic] = container;
      }
      return subTopicContainers[topic];
    }

    const toggleButtons = document.querySelectorAll('.toggle-correction');

    toggleButtons.forEach(button => {
      button.addEventListener('click', function() {
        const correction = this.parentElement.nextElementSibling;
        correction.classList.toggle('hidden');
        if (!correction.classList.contains('hidden')) {
          correction.style.display = 'block';
          correction.style.animation = 'slideIn 0.5s forwards';
        } else {
          correction.style.display = 'none';
          correction.style.animation = '';
        }
      });
    });
  }
});
