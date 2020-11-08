const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("myCanvas");
const context: CanvasRenderingContext2D = canvas.getContext("2d");
let numberofdisks: number = +(<HTMLInputElement>document.getElementById("numberofdisks")).value;
const rect = canvas.getBoundingClientRect();

const p1: HanoiTower.Point = new HanoiTower.Point(150, 400);
const p2: HanoiTower.Point = new HanoiTower.Point(450, 400);
const p3: HanoiTower.Point = new HanoiTower.Point(750, 400);

let towers: HanoiTower.Tower[] = [];
let count: number;
let steps: {disk: number, from: number, to: number}[];

const draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < towers.length; i++) towers[i].draw();
};

const solution = (n: number, from: number, to: number, aux: number) => {
    if(n === 1) {
        // console.log(`Move disk 1 from Tower ${from} to Tower ${to}`);
        steps.push({disk: 1, from, to});
        return;
    }
    
    solution((n - 1), from, aux, to);
    steps.push({disk: n, from, to});
    // console.log(`Move disk ${n} from Tower ${from} to Tower ${to}`);
    solution((n - 1), aux, to, from);
};

function load() {
    numberofdisks = +(<HTMLInputElement>document.getElementById("numberofdisks")).value;

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

const move = (tower: HanoiTower.Tower, disk: HanoiTower.Disk, to: HanoiTower.Point) => {

    let move = "up";
    const side = tower.origin.x > to.x ? "left" : "right";

    const animate = () => {
        const p = disk.originPoint;
        
        if(move === "none") return;

        if(move === "up") {
            disk.originPoint = new HanoiTower.Point(p.x, p.y - 3);
            if(disk.originPoint.y <= tower.top().y) move = side;
        }

        if(move === "right") {
            disk.originPoint = new HanoiTower.Point(p.x + 4, p.y);
            if(disk.originPoint.x >= to.x) {
                disk.originPoint = new HanoiTower.Point(to.x, p.y);
                move = "down";
            }
        }
        
        if(move === "left") {
            disk.originPoint = new HanoiTower.Point(p.x - 4, p.y);
            if(disk.originPoint.x <= to.x) {
                disk.originPoint = new HanoiTower.Point(to.x, p.y);
                move = "down";
            }
        }

        if(move === "down") {
            disk.originPoint = new HanoiTower.Point(to.x, p.y + 3);
            if(disk.originPoint.y >= to.y) {
                move = "none";
                disk.originPoint = to;
            }
        }

        draw();
        window.requestAnimationFrame(animate);
    };
    animate();
};

const nextStep = () => {
    
    const {disk, from, to} = steps[count++];
    console.log(`Moving disk ${disk} from Tower ${from} to Tower ${to}`);
    const removed = towers[from - 1].move(towers[to - 1]);
    console.log("Removed: ", removed);
    move(towers[from - 1], removed, towers[to - 1].getNextDiskPoint());
    draw();

    if(count >= steps.length) {
        setTimeout(() => alert("Problem Solved!"), 500);
        document.getElementById("nextstep").style.display = "none";
        return;
    }
};
        