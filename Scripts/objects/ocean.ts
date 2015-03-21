module objects {
    // OCEAN CLASS
    export class Ocean extends createjs.Bitmap {
        // PUBLIC INSTANCE VARIABLES
        private _dx: number = 5;

        // CONSTRUCTOR
        constructor() {
            super(assetLoader.getResult("ocean"));
            this.reset();
        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        public update() {
            this.x += this._dx;

            this._checkBounds();
        }

        // Reset position of ocean to the left
        public reset() {
            this.x = -960
            this.y = 0;
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++
        private _checkBounds() {
            // check if ocean has left the far right side of screen
            if (this.x === 0) {
                this.reset();
            }
        }

    }

}  