(async function(){
  const id = 'joke-script';
  const oldStyleEl = document.getElementById(id);
  if (oldStyleEl) {
    oldStyleEl.remove();
  }
  await new Promise((resolve) => setTimeout(resolve, 300));

  const styleEl = document.createElement('style');
  styleEl.id = id;
  document.head.append(styleEl);
  return styleEl;
})()

  .then(async (styleEl) => {
    const n = 5;
    styleEl.innerHTML = `
    body {
      overflow: hidden;
      height: 100vh!important;
    }

    body:after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: black;
      z-index: 99999;
      opacity: 0;
      background-position: center;
      background-repeat: no-repeat;
}
    `
    await new Promise((resolve) => {
      setTimeout(() => {
        styleEl.innerHTML += `
    body {
      transition:${4 + n}s;
      transform:rotate(${n}turn);
    }
`;
      });
      resolve();
    });
    return new Promise((resolve) => {
      const transitionendHandler = () => {
        document.body.removeEventListener('transitionend', transitionendHandler);
        resolve(styleEl)
      };
      document.body.addEventListener('transitionend', transitionendHandler);
    })
  })

  .then((styleEl) => {
    console.log('opacity: 1;');
    styleEl.innerHTML += `
    body:after {
        opacity: 1;
        transition: opacity 1s ease-out; 
    }
    `;
    return new Promise((resolve) => {
      const transitionendHandler = () => {
        document.body.removeEventListener('transitionend', transitionendHandler);
        resolve(styleEl)
      };
      document.body.addEventListener('transitionend', transitionendHandler);
    })
  })
  .then((styleEl) => {
    const end = () => {
      styleEl.remove();
      document.removeEventListener('click', end);
    }
    document.addEventListener('click', end);
  })
