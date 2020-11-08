const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");
let numberofdisks = +document.getElementById("numberofdisks").value;
const rect = canvas.getBoundingClientRect();
const p1 = new HanoiTower.Point(150, 400);
const p2 = new HanoiTower.Point(450, 400);
const p3 = new HanoiTower.Point(750, 400);
let towers = [];
let count;
let steps;
const draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < towers.length; i++)
        towers[i].draw();
};
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
function load() {
    numberofdisks = +document.getElementById("numberofdisks").value;
    towers = [
        new HanoiTower.Tower(p1, 7, 7, context, "Tower 1", numberofdisks),
        new HanoiTower.Tower(p2, 7, 7, context, "Tower 2"),
        new HanoiTower.Tower(p3, 7, 7, context, "Tower 3")
    ];
    draw();
    count = 0;
    steps = [];
    solution(numberofdisks, 1, 3, 2);
    document.getElementById("nextstep").style.display = "block";
}
load();
draw();
// solution(numberofdisks, 1, 3, 2);
// console.log(steps);
const nextStep = () => {
    const { disk, from, to } = steps[count++];
    console.log(`Moving disk ${disk} from Tower ${from} to Tower ${to}`);
    towers[from - 1].move(towers[to - 1]);
    towers[to - 1].add(towers[from - 1].remove());
    draw();
    if (count >= steps.length) {
        setTimeout(() => alert("Problem Solved!"), 500);
        document.getElementById("nextstep").style.display = "none";
        return;
    }
};
//# sourceMappingURL=app.js.map