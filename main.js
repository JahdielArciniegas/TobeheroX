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
  let rank = currentSection.querySelector(".slide__rank");
  let currentBg = currentSection.querySelector(".slide__content");

  let nextSection = section[index];
  let nextTitle = nextSection.querySelector(".slide__title");
  let nextRank = nextSection.querySelector(".slide__rank");
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
      xPercent: 0,
    },
    0
  )
    .fromTo(
      nextBg,
      {
        xPercent: 100 * direction,
      },
      {
        xPercent: 0,
      },
      0
    )
    .to(
      title,
      {
        "--width": 800,
        xPercent: 400 * direction,
      },
      0
    )
    .fromTo(
      nextTitle,
      {
        opacity: 0,
        "--width": 800,
        xPercent: -400 * direction,
      },
      {
        opacity: 1,
        "--width": 200,
        xPercent: 0,
      },
      0
    )
    .to(
      rank,
      {
        "--width": 800,
        xPercent: -200 * direction,
      },
      0
    )
    .fromTo(
      nextRank,
      {
        opacity: 0,
        "--width": 800,
        xPercent: 400 * direction,
        delay: 0.5,
      },
      {
        opacity: 1,
        "--width": 200,
        xPercent: 0,
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
