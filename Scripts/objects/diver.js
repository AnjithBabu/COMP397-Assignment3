var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // Diver Class
    var Diver = (function (_super) {
        __extends(Diver, _super);
        // CONSTRUCTOR
        function Diver() {
            _super.call(this, assetLoader.getResult("diver"));
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.x = 640 - this.width;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            createjs.Sound.play("underwater", { loop: -1 }); // play background sound of swimming
        }
        // PUBLIC METHODS
        Diver.prototype.update = function () {
            this.y = stage.mouseY;
        };
        return Diver;
    })(createjs.Bitmap);
    objects.Diver = Diver;
})(objects || (objects = {}));
//# sourceMappingURL=diver.js.map