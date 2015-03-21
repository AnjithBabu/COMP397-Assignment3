module objects {
    // LOGO Class ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    export class Logo extends createjs.Bitmap {
        // CONSTRUCTOR
        constructor(labelName: string, x: number, y:number) {
            super(assetLoader.getResult(labelName)); // set the logo image
            this.x = x;
            this.y = y;
        }
    }
}  