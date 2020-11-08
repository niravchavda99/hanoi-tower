const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");
const rect = canvas.getBoundingClientRect();
const p1 = new HanoiTower.Point(150, 400);
const p2 = new HanoiTower.Point(450, 400);
const p3 = new HanoiTower.Point(750, 400);
const towers = [
    new HanoiTower.Tower(p1, 7, 7, context, "Tower 1", 3),
    new HanoiTower.Tower(p2, 7, 7, context, "Tower 2"),
    new HanoiTower.Tower(p3, 7, 7, context, "Tower 3")
];
const draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < towers.length; i++)
        towers[i].draw();
};
draw();
let count = 0;
let steps = [];
const solution = (n, from, to, aux) => {
    if (n === 1) {
        // console.log(`Move disk 1 from Tower ${from} to Tower ${to}`);
        steps.push({ disk: 1, from, to });
        return;
    }
    solution((n - 1), from, aux, to);
    steps.push({ disk: n, from, to });
    // console.log(`Move disk ${n} from Tower ${from} to Tower ${to}`);
    solution((n - 1), aux, to, from);
};
solution(3, 1, 3, 2);
console.log(steps);
const nextStep = () => {
    if (count >= steps.length) {
        console.log("Problem Solved!");
        document.getElementById("nextstep").style.display = "none";
        return;
    }
    const { disk, from, to } = steps[count++];
    console.log(`Moving disk ${disk} from Tower ${from} to Tower ${to}`);
    towers[from - 1].move(towers[to - 1]);
    towers[to - 1].add(towers[from - 1].remove());
    draw();
};
//# sourceMappingURL=app.js.map