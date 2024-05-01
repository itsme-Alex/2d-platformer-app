import { GameSettings } from './GameSettings';
import { TileMap } from './TileMap';

export class Character {
    position: { x: number, y: number };
    size: { width: number, height: number };
    color: string;
    velocity: { x: number, y: number };
    tileMap: TileMap;
    onGround: boolean = false;

    constructor(x: number, y: number, width: number, height: number, color: string = 'red', tileMap: TileMap) {
        this.position = { x, y };
        this.size = { width, height };
        this.color = color;
        this.velocity = { x: 0, y: 0 };
        this.tileMap = tileMap;
        this.onGround = false;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    }

    update() {
        this.position.x += this.velocity.x;
        this.checkHorizontalCollision();
        this.applyGravity();
        this.checkVerticalCollision();
        this.checkPlatformCollision();
    }

    applyGravity() {
        this.position.y += this.velocity.y;
        this.velocity.y += GameSettings.gravity;
    }

    checkVerticalCollision() {
        const collisionLayer = this.tileMap.getLayer('Ground Layer');
        if (!collisionLayer) return Error("No collision layer found");
        for (let i = 0; i < collisionLayer.data?.length; i++) {
            // si la tuile est une collision, on vérifie si le personnage est en collision avec, si oui on arrête le mouvement
            if (collisionLayer.data[i] > 0) {
                const x = (i % collisionLayer.width) * this.tileMap.tileWidth;
                const tileRow = Math.floor(i / collisionLayer.width);
                const y = GameSettings.canvasHeight - (collisionLayer.height - tileRow) * this.tileMap.tileHeight + 150;
                if (this.position.x < x + this.tileMap.tileWidth &&
                    this.position.x + this.size.width > x &&
                    this.position.y < y + this.tileMap.tileHeight &&
                    this.position.y + this.size.height > y) {
                    this.onGround = true;
                    if (this.velocity.y > 0) {
                        this.velocity.y = 0;
                        this.position.y = y - this.size.height;
                        break;
                    }
                }
            }
        }
    }

    checkPlatformCollision() {
        const platformLayer = this.tileMap.getLayer('Platform Layer');
        if (!platformLayer) return Error("No platform layer found");

        for (let i = 0; i < platformLayer.data?.length; i++) {
            if (platformLayer.data[i] > 0) {  // Assurez-vous que la tuile est solide
                const x = (i % platformLayer.width) * this.tileMap.tileWidth;
                const tileRow = Math.floor(i / platformLayer.width);
                const y = GameSettings.canvasHeight - (platformLayer.height - tileRow) * this.tileMap.tileHeight + 150;

                // Vérifier si le personnage est juste au-dessus de la plateforme et se déplace vers le bas
                if (this.position.x < x + this.tileMap.tileWidth &&
                    this.position.x + this.size.width > x &&
                    this.position.y + this.size.height <= y &&
                    this.position.y + this.size.height + this.velocity.y > y) {

                    this.velocity.y = 0;  // Arrêter la chute
                    this.position.y = y - this.size.height;  // Placer le personnage sur la plateforme
                    this.onGround = true;  // Marquer le personnage comme étant sur le sol
                }
            }
        }
    }

    checkHorizontalCollision() {
        const collisionLayer = this.tileMap.getLayer('Ground Layer');
        if (!collisionLayer) return Error("No collision layer found");
        for (let i = 0; i < collisionLayer.data?.length; i++) {
            // si la tuile est une collision, on vérifie si le personnage est en collision avec, si oui on arrête le mouvement
            if (collisionLayer.data[i] > 0) {
                const x = (i % collisionLayer.width) * this.tileMap.tileWidth;
                const tileRow = Math.floor(i / collisionLayer.width);
                const y = GameSettings.canvasHeight - (collisionLayer.height - tileRow) * this.tileMap.tileHeight + 150;
                if (this.position.x < x + this.tileMap.tileWidth &&
                    this.position.x + this.size.width > x &&
                    this.position.y < y + this.tileMap.tileHeight &&
                    this.position.y + this.size.height > y) {

                    if (this.velocity.x > 0) {
                        this.velocity.x = 0;
                        this.position.x = x - this.size.width;
                        break;
                    } else if (this.velocity.x < 0) {
                        this.velocity.x = 0;
                        this.position.x = x + this.tileMap.tileWidth;
                        break;
                    }
                }
            }
        }
    }
}
