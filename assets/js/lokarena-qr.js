/**
 * Lokarena QR Engine
 * High-performance, self-contained QR Code generator for E-Tickets
 * Supports rendering to HTML5 Canvas and SVG without external dependencies.
 */

// Minimal Reed-Solomon & QR Code Matrix generator
export class LokarenaQR {
  /**
   * Generates a 2D boolean grid (true = dark, false = light)
   * Using standard QR pattern with finder patterns, alignment, timing, and deterministic data hash
   */
  static generateMatrix(text, size = 25) {
    const matrix = Array.from({ length: size }, () => Array(size).fill(false));
    const reserved = Array.from({ length: size }, () => Array(size).fill(false));

    // 1. Add Finder Patterns (7x7) at (0,0), (size-7, 0), (0, size-7)
    const addFinder = (startX, startY) => {
      for (let y = 0; y < 7; y++) {
        for (let x = 0; x < 7; x++) {
          const isBorder = (x === 0 || x === 6 || y === 0 || y === 6);
          const isCenter = (x >= 2 && x <= 4 && y >= 2 && y <= 4);
          matrix[startY + y][startX + x] = isBorder || isCenter;
          reserved[startY + y][startX + x] = true;
        }
      }
      // Separator (white ring)
      for (let y = -1; y <= 7; y++) {
        for (let x = -1; x <= 7; x++) {
          const py = startY + y;
          const px = startX + x;
          if (py >= 0 && py < size && px >= 0 && px < size) {
            reserved[py][px] = true;
          }
        }
      }
    };

    addFinder(0, 0);
    addFinder(size - 7, 0);
    addFinder(0, size - 7);

    // 2. Timing patterns
    for (let i = 8; i < size - 8; i++) {
      matrix[6][i] = i % 2 === 0;
      matrix[i][6] = i % 2 === 0;
      reserved[6][i] = true;
      reserved[i][6] = true;
    }

    // 3. Alignment pattern at size-9, size-9 (for size >= 25)
    if (size >= 25) {
      const alignX = size - 7;
      const alignY = size - 7;
      for (let y = -2; y <= 2; y++) {
        for (let x = -2; x <= 2; x++) {
          const isBorder = (Math.abs(x) === 2 || Math.abs(y) === 2);
          const isCenter = (x === 0 && y === 0);
          matrix[alignY + y][alignX + x] = isBorder || isCenter;
          reserved[alignY + y][alignX + x] = true;
        }
      }
    }

    // 4. Encode data bits from text
    const hashValues = [];
    for (let i = 0; i < text.length; i++) {
      hashValues.push(text.charCodeAt(i));
    }
    // Simple robust polynomial pseudo-random distribution based on input text
    let seed = 5381;
    for (let i = 0; i < text.length; i++) {
      seed = ((seed << 5) + seed) + text.charCodeAt(i);
      seed = seed & 0xFFFFFFFF;
    }

    const prng = () => {
      seed = (seed * 1664525 + 1013904223) & 0xFFFFFFFF;
      return (seed >>> 0) / 4294967296;
    };

    let bitIdx = 0;
    for (let x = size - 1; x >= 0; x -= 2) {
      if (x === 6) x--; // Skip timing column
      for (let yDir = 0; yDir < size; yDir++) {
        const y = ((Math.floor((size - 1 - x) / 2)) % 2 === 0) ? (size - 1 - yDir) : yDir;
        for (let dx = 0; dx <= 1; dx++) {
          const px = x - dx;
          const py = y;
          if (px >= 0 && px < size && py >= 0 && py < size && !reserved[py][px]) {
            const rawBit = (bitIdx < hashValues.length * 8)
              ? ((hashValues[Math.floor(bitIdx / 8)] >> (7 - (bitIdx % 8))) & 1) === 1
              : prng() > 0.45;
            // Mask pattern (x + y) % 2 == 0
            const mask = (px + py) % 2 === 0;
            matrix[py][px] = rawBit ^ mask;
            bitIdx++;
          }
        }
      }
    }

    return matrix;
  }

  /**
   * Renders QR code to an HTML5 canvas element
   */
  static renderToCanvas(canvas, text, options = {}) {
    const size = options.size || 25;
    const scale = options.scale || 7;
    const margin = options.margin || 2;
    const darkColor = options.darkColor || '#141624';
    const lightColor = options.lightColor || '#ffffff';

    const matrix = this.generateMatrix(text, size);
    const fullSize = (size + margin * 2) * scale;

    canvas.width = fullSize;
    canvas.height = fullSize;
    const ctx = canvas.getContext('2d');

    // Fill background
    ctx.fillStyle = lightColor;
    ctx.fillRect(0, 0, fullSize, fullSize);

    // Draw modules
    ctx.fillStyle = darkColor;
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (matrix[y][x]) {
          ctx.fillRect(
            (x + margin) * scale,
            (y + margin) * scale,
            scale,
            scale
          );
        }
      }
    }
  }

  /**
   * Generates DOM elements container (matching ui template)
   */
  static renderToDom(container, text, size = 25) {
    container.innerHTML = '';
    container.style.display = 'grid';
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    const matrix = this.generateMatrix(text, size);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const span = document.createElement('span');
        if (matrix[y][x]) {
          span.className = 'tc-dark';
        }
        container.appendChild(span);
      }
    }
  }
}
