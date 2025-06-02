gsap.registerPlugin(ScrollTrigger);

const section = gsap.utils.toArray(".slide");
const wrap = gsap.utils.wrap(0, section.length);

let animating;
let currentIndex = 0;

console.log(section);

function gotoSection(index, direction) {
  animating = true;
  index = wrap(index);
  console.log(index);

  let tl = gsap.timeline({
    defaults: {
      ease: "expo.inOut",
      duration: 1,
    },
    onComplete: () => {
      animating = false;
    },
  });
  let currentSection = section[currentIndex];
  let title = currentSection.querySelector(".slide__title");
  let description = currentSection.querySelector(".slide__description");
  let currentBg = currentSection.querySelector(".slide__content");

  let nextSection = section[index];
  let nextTitle = nextSection.querySelector(".slide__title");
  let nextDescription = nextSection.querySelector(".slide__description");
  let nextBg = nextSection.querySelector(".slide__content");

  gsap.set([section], {
    zIndex: 0,
    autoAlpha: 0,
  });

  gsap.set([section[currentIndex]], {
    zIndex: 1,
    autoAlpha: 1,
  });

  gsap.set([section[index]], {
    zIndex: 2,
    autoAlpha: 1,
  });

  tl.to(
    currentBg,
    {
      x: 0,
    },
    0
  )
    .fromTo(
      nextBg,
      {
        x: 10000 * direction,
      },
      {
        x: 0,
      },
      0
    )
    .to(
      title,
      {
        x: -1000 * direction,
      },
      0
    )
    .fromTo(
      nextTitle,
      {
        opacity: 0,
        x: -1000 * direction,
      },
      {
        opacity: 1,
        x: 0,
      },
      0
    )
    .to(
      description,
      {
        x: -1000 * direction,
      },
      0
    )
    .fromTo(
      nextDescription,
      {
        opacity: 0,
        x: 1000 * direction,
        delay: 0.5,
      },
      {
        opacity: 1,
        x: 0,
      },
      0
    );

  currentIndex = index;
}

Observer.create({
  type: "whell,touch,pointer",
  preventDefault: true,
  wheelSpeed: -1,
  onDown: () => {
    console.log("down");
    if (animating) return;
    gotoSection(currentIndex + 1, +1);
  },
  onUp: () => {
    console.log("up");
    if (animating) return;
    gotoSection(currentIndex - 1, -1);
  },
  tolerance: 10,
});

document.addEventListener("keydown", logKey);

function logKey(e) {
  console.log(e.code);
  if (e.code === "ArrowUp" || (e.code === "ArrowLeft" && !animating)) {
    gotoSection(currentIndex - 1, -1);
  }
  if (e.code === "ArrowDown" || (e.code === "ArrowRight" && !animating)) {
    gotoSection(currentIndex + 1, +1);
  }
}
