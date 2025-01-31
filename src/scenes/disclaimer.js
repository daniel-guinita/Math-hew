export default function disclaimer(k) {
  k.add([
    k.text(
      `
        This is inspired by Nintendo platformers.
        This is a fangame made by the Math-hew Capstone team using inspired assets from Nintendo.
      `,
      { font: "mania", size: 32 }
    ),
  ]);

  k.add([
    k.text("Press Space/Click/Touch to Start The Game", {
      font: "mania",
      size: 64,
    }),
    k.anchor("center"),
    k.pos(k.center()),
  ]);

  k.onButtonPress("jump", () => k.go("main-menu"));
}