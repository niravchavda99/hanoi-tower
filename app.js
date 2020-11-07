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
const solution = (n, from, to, aux) => {
    setTimeout(() => {
        if (n == 1) {
            console.log(`Move disk 1 from rod ${from} to rod ${to}`);
            towers[from - 1].move(towers[to - 1]);
            towers[to - 1].add(towers[from - 1].remove());
            draw();
            return;
        }
        solution(n - 1, from, aux, to);
        console.log(`Move disk ${n} from rod ${from} to rod ${to}`);
        towers[from - 1].move(towers[to - 1]);
        towers[to - 1].add(towers[from - 1].remove());
        draw();
        solution(n - 1, aux, to, from);
    }, 2000);
};
// canvas.addEventListener("click", (e: MouseEvent) => {
//     const point: HanoiTower.Point = new HanoiTower.Point(e.clientX - rect.left, e.clientY - rect.top);
//     for(let i = 0; i < disks.length; i++) {
//         if(disks[i].isInside(point)) console.log(disks[i]);
//     }    
// });
solution(3, 1, 3, 2);
//# sourceMappingURL=app.js.map