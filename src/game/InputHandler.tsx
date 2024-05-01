import React from 'react';
import { Character } from './Character';

enum Key {
    Left = "ArrowLeft",
    Right = "ArrowRight",
    Up = "ArrowUp"
}

export class InputHandler {
    characterRef: React.RefObject<Character>;
    keys: { [key in Key]?: { pressed: boolean } };

    constructor(characterRef: React.RefObject<Character>) {
        this.characterRef = characterRef;
        this.keys = {
            [Key.Left]: { pressed: false },
            [Key.Right]: { pressed: false },
            [Key.Up]: { pressed: false }
        };
    }

    attachEvents(): void {
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
    }

    detachEvents(): void {
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('keyup', this.handleKeyUp);
    }

    handleKeyDown = (event: KeyboardEvent): void => {
        const key = event.key as Key;
        if (key in this.keys) {
            this.keys[key]!.pressed = true;
        }
    };

    handleKeyUp = (event: KeyboardEvent): void => {
        const key = event.key as Key;
        if (key in this.keys) {
            this.keys[key]!.pressed = false;
        }
    };

    update(): void {
        if (!this.characterRef.current) return;
        this.updateHorizontalMovement();
        this.updateJump();
    }

    private updateHorizontalMovement(): void {
        const character = this.characterRef.current!;

        const speed = 4;
        character.velocity.x = 0;
        if (this.keys[Key.Left]?.pressed) {
            character.velocity.x -= speed;
        }
        if (this.keys[Key.Right]?.pressed) {
            character.velocity.x += speed;
        }
    }

    private updateJump(): void {
        const character = this.characterRef.current!;
        if (this.keys[Key.Up]?.pressed && character.velocity.y === 0 && character.onGround) {
            character.velocity.y = -12;
            character.onGround = false;
        }
    }
}
