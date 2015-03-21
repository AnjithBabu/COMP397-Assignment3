module objects {
    // SHARK CLASS
    export class Shark extends objects.GameObject {

        // CONSTRUCTOR
        constructor() {
            super("shark");
            this.sound = "life";
            this.reset();
        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        public update() {
            this.y += this._dy;
            this.x += this._dx;

            this._checkBounds();
        }

        // Reset position of shark to the left
        public reset() {
            this.x = -this.width;
            this.y = Math.floor(Math.random() * 640);
            this._dx = Math.floor(Math.random() * 5) + 5;
            this._dy = Math.floor(Math.random() * 4) - 2;
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++
        private _checkBounds() {
            // check if shark has left the far right end of the screen
            if (this.x >= (480 + this.width)) {
                this.reset();
            }
        }
    }
}  