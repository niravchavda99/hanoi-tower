var HanoiTower;
(function (HanoiTower) {
    // Point class
    class Point {
        constructor(x, y) {
            this._x = x;
            this._y = y;
        }
        // Getter & Setter for x-ref
        get x() {
            return this._x;
        }
        set x(x) {
            this._x = x;
        }
        // Getter & Setter for y-ref
        get y() {
            return this._y;
        }
        set y(y) {
            this._y = y;
        }
    }
    HanoiTower.Point = Point;
    // Class to store utility methods
    class Utils {
    }
    // Some colors
    Utils.colors = ["red", "blue", "lime", "cyan", "gold", "magenta", "darkorchid"];
    // returns a color from the list
    Utils.getColor = n => Utils.colors[n % 7];
    // generates a random hex color code
    Utils.getRandomHexColor = () => "#" + Math.floor(Math.random() * 16777215).toString(16);
    HanoiTower.Utils = Utils;
    class Tower {
        constructor(originPoint, height, width, context, label = "Tower", initialDisks = 0) {
            this.originPoint = originPoint;
            this.height = height;
            this.width = width;
            this.context = context;
            this.label = label;
            this.initialDisks = initialDisks;
            this.gap = 18;
            this.top = () => new Point(this.originPoint.x, this.originPoint.y - this.height - 50);
            this.getNextDiskPoint = () => new Point(this.originPoint.x, this.originPoint.y - this.disks.length * this.gap);
            this.getDisks = () => [...this.disks];
            // add/remove a disk to/from the top of the tower
            this.add = (disk) => this.disks.push(disk);
            this.remove = () => this.disks.pop();
            this.height *= 22;
            this.width *= 18;
            this.disks = [];
        }
        draw() {
            const thickness = 3; // thickness of tower
            const color = "#444"; // color of tower
            const path = new Path2D();
            this.context.lineWidth = 2;
            this.context.fillStyle = color;
            this.context.strokeStyle = color;
            // bottom part of tower
            path.moveTo(this.originPoint.x - this.width, this.originPoint.y);
            path.lineTo(this.originPoint.x + this.width, this.originPoint.y);
            path.arc(this.originPoint.x + this.width, this.originPoint.y + thickness, thickness, 1.5 * Math.PI, Math.PI * 0.5);
            path.lineTo(this.originPoint.x - this.width, this.originPoint.y + thickness * 2);
            path.arc(this.originPoint.x - this.width, this.originPoint.y + thickness, thickness, 0.5 * Math.PI, Math.PI * 1.5);
            // tower vertical part
            path.moveTo(this.originPoint.x - thickness, this.originPoint.y);
            path.lineTo(this.originPoint.x - thickness, this.originPoint.y - this.height);
            path.arc(this.originPoint.x, this.originPoint.y - this.height, thickness, Math.PI, 0);
            path.lineTo(this.originPoint.x + thickness, this.originPoint.y);
            this.context.stroke(path);
            this.context.fill(path);
            this.context.font = "15px Verdana";
            this.context.fillStyle = "black";
            this.context.fillText(this.label, this.originPoint.x - this.label.length * 4, this.originPoint.y + thickness * 2 + 20);
            // Draw Initial Disks if any...
            for (let i = this.initialDisks - 1; i >= 0; i--) {
                const p = new Point(this.originPoint.x, this.originPoint.y - ((this.initialDisks - i) * this.gap));
                const d = new Disk(p, i + 1, this.context, "" + (i + 1), Utils.getColor(this.initialDisks - i - 1));
                this.add(d);
            }
            this.initialDisks = 0;
            this.drawDisks();
        }
        drawDisks() {
            for (let i = 0; i < this.disks.length; i++)
                this.disks[i].draw();
        }
        get origin() { return this.originPoint; }
        move(to) {
            if (this.disks.length < 1)
                return;
            // const toPoint: Point = to.getNextDiskPoint();
            // const disk: Disk = this.disks[this.disks.length - 1];
            // disk.originPoint = toPoint;
            const removed = this.remove();
            to.add(removed);
            return removed;
        }
    }
    HanoiTower.Tower = Tower;
    class Disk {
        constructor(originPoint, size, context, label, color = Utils.getRandomHexColor()) {
            this.originPoint = originPoint;
            this.size = size;
            this.context = context;
            this.label = label;
            this.color = color;
            this.isInside = (point) => this.context.isPointInPath(this.path, point.x, point.y);
            this.size *= 15;
        }
        draw() {
            const thickness = 7; // thickness of disk
            this.path = new Path2D();
            // draw the disk
            this.path.moveTo(this.originPoint.x - this.size, this.originPoint.y);
            this.path.lineTo(this.originPoint.x + this.size, this.originPoint.y);
            this.path.arc(this.originPoint.x + this.size, this.originPoint.y + thickness, thickness, 1.5 * Math.PI, Math.PI * 0.5);
            this.path.lineTo(this.originPoint.x - this.size, this.originPoint.y + thickness * 2);
            this.path.arc(this.originPoint.x - this.size, this.originPoint.y + thickness, thickness, 0.5 * Math.PI, Math.PI * 1.5);
            this.context.lineWidth = 2;
            this.context.strokeStyle = this.color;
            this.context.fillStyle = this.color;
            this.context.stroke(this.path);
            this.context.fill(this.path);
            this.context.fillStyle = "black";
            this.context.font = "bold 15px monospace";
            this.context.fillText(this.label, this.originPoint.x - this.label.length * 3, this.originPoint.y + thickness * 1.7);
        }
    }
    HanoiTower.Disk = Disk;
})(HanoiTower || (HanoiTower = {}));
//# sourceMappingURL=HanoiTower.js.map