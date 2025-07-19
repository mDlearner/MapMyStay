barba.init({
  transitions: [
    {
      name: 'fade-transition',
      async leave(data) {
        await gsap.to(data.current.container, {
          opacity: 0,
          duration: 0.5
        });
      },
      enter(data) {
        gsap.from(data.next.container, {
          opacity: 0,
          duration: 0.5
        });
      }
    }
  ]
});