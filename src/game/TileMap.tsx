import { GameSettings } from "./GameSettings";

interface TileMapData {
    height: number;
    width: number;
    tileheight: number;
    tilewidth: number;
    layers: Layer[];
}

interface Layer {
    name: string;
    type: string;
    data: number[];
    width: number;
    height: number;
    visible: boolean;
}

export class TileMap {
    mapData: TileMapData;
    tileWidth: number;
    tileHeight: number;

    constructor(mapData: TileMapData) {
        this.mapData = mapData;
        this.tileWidth = mapData.tilewidth;
        this.tileHeight = mapData.tileheight;
    }

    getLayer(layerName: string): Layer | undefined {
        return this.mapData.layers.find(layer => layer.name === layerName && layer.visible);
    }


    draw(context: CanvasRenderingContext2D, layerName: string): void {
        const collisionLayer = this.getLayer(layerName);
        if (!collisionLayer) return;

        const tiles = collisionLayer.data;
        const width = collisionLayer.width;
        const mapHeightTiles = collisionLayer.height;
        tiles.forEach((tile, index) => {
            if (tile > 0) {
                const x = (index % width) * this.tileWidth;
                const tileRow = Math.floor(index / width);
                const y = GameSettings.canvasHeight - (mapHeightTiles - tileRow) * this.tileHeight + 150;
                context.fillStyle = 'rgba(255, 0, 0, 0)';
                context.fillRect(x, y, this.tileWidth, this.tileHeight);
            }
        });
    }
}
