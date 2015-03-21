module objects {
    // LABEL Class ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    export class Logo extends createjs.Bitmap {
        // CONSTRUCTOR
        constructor(labelName: string, x: number, y:number) {
            super(assetLoader.getResult(labelName));
            this.x = x;
            this.y = y;
        }
    }
}  