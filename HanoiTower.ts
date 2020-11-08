namespace HanoiTower {
    // Point class
    export class Point {
        private _x: number;
        private _y: number;

        public constructor(x: number, y: number) {
            this._x = x;
            this._y = y;
        }

        // Getter & Setter for x-ref
        get x() {
            return this._x;
        }
        
        set x(x: number) {
            this._x = x;
        }

        // Getter & Setter for y-ref
        get y() {
            return this._y;
        } 

        set y(y: number) {
            this._y = y;
        }
    }

    // Class to store utility methods
    export class Utils {
        // Some colors
        private static colors = ["red", "blue", "lime", "cyan", "gold", "magenta", "darkorchid"];
        
        // returns a color from the list
        public static getColor = n => Utils.colors[n % 7];

        // generates a random hex color code
        public static getRandomHexColor = () => "#" + Math.floor(Math.random()*16777215).toString(16);
    }

    export class Tower {
        private disks: Disk[];  // list of disks in the tower
        private gap: number = 18;

        public constructor(
            private originPoint: Point, 
            private height: number, 
            private width: number, 
            private context: CanvasRenderingContext2D, 
            private label: string = "Tower",
            public initialDisks: number = 0
            ) {
                this.height *= 22;
                this.width *= 18;
                this.disks = [];
        }

        public draw ()  {
            const thickness = 3; // thickness of tower
            const color: string = "#444"; // color of tower
            const path: Path2D = new Path2D();

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
            for(let i = this.initialDisks - 1; i >= 0; i--) {
                const p: Point = new Point(this.originPoint.x, this.originPoint.y - ((this.initialDisks - i) * this.gap));
                const d: Disk = new Disk(p, i + 1, this.context, "" + (i + 1), Utils.getColor(this.initialDisks - i - 1));
                this.add(d);
            }
            this.initialDisks = 0;
            this.drawDisks();
        }

        public drawDisks() {
            for(let i = 0; i < this.disks.length; i++) this.disks[i].draw();
        }

        public getNextDiskPoint = () => new Point(this.originPoint.x, this.originPoint.y - (this.disks.length + 1) * this.gap);
        
        public getDisks = () => [...this.disks];

        // add/remove a disk to/from the top of the tower
        public add = (disk: Disk) => this.disks.push(disk);       
        public remove = () => this.disks.pop();

        public move(to: Tower) {
            if(this.disks.length < 1) return;

            const toPoint: Point = to.getNextDiskPoint();
            const disk: Disk = this.disks[this.disks.length - 1];
            disk.originPoint = toPoint;
        }
    }

    export class Disk {
        private path: Path2D;
        public constructor(
            public originPoint: Point, 
            private size: number, 
            private context: CanvasRenderingContext2D, 
            private label: string, 
            private color: string = Utils.getRandomHexColor()
        ) {
            this.size *= 15;
        }

        public draw() {
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

        public isInside = (point: Point) => this.context.isPointInPath(this.path, point.x, point.y);
    }
}
