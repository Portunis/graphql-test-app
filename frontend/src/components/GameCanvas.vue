<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";

const props = defineProps({
  nickname: {
    type: String,
    required: true,
  }})

const canvas = ref<HTMLCanvasElement | null>(null);
const context = ref<CanvasRenderingContext2D | null>(null);

// Размер игрового мира
const world = { width: 5000, height: 5000 };

// Игрок
const player = ref({
  x: 2500, // Начальная позиция
  y: 2500,
  size: 40,
  color: '#007bff',
  speed: 5,
});

// Камера
const camera = ref({
  x: 0,
  y: 0,
  width: window.innerWidth,
  height: window.innerHeight,
});

// Состояние нажатия клавиш
const keys = ref({
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
});

// Отрисовка фона
const drawBackground = () => {
  if (!context.value) return;

  const ctx = context.value;
  const tileSize = 100; // Размер одной плитки
  const colors = ['#eaeaea', '#c8c8c8']; // Цвета для плиток

  for (let x = 0; x < world.width; x += tileSize) {
    for (let y = 0; y < world.height; y += tileSize) {
      ctx.fillStyle = colors[(Math.floor(x / tileSize) + Math.floor(y / tileSize)) % 2];
      ctx.fillRect(x, y, tileSize, tileSize);
    }
  }
};

// Обновление позиции игрока
const updatePosition = () => {
  const { x, y, size, speed } = player.value;

  // Перемещение игрока
  if (keys.value.ArrowUp && y > 0) player.value.y -= speed;
  if (keys.value.ArrowDown && y + size < world.height) player.value.y += speed;
  if (keys.value.ArrowLeft && x > 0) player.value.x -= speed;
  if (keys.value.ArrowRight && x + size < world.width) player.value.x += speed;

  // Обновление камеры, если игрок выходит за "границы камеры"
  const buffer = 150; // Расстояние от края экрана до начала смещения камеры

  if (x - camera.value.x < buffer) camera.value.x = Math.max(0, x - buffer);
  if (y - camera.value.y < buffer) camera.value.y = Math.max(0, y - buffer);
  if (x + size - (camera.value.x + camera.value.width) > -buffer)
    camera.value.x = Math.min(world.width - camera.value.width, x + size - camera.value.width + buffer);
  if (y + size - (camera.value.y + camera.value.height) > -buffer)
    camera.value.y = Math.min(world.height - camera.value.height, y + size - camera.value.height + buffer);
};

// Игровой цикл
const gameLoop = () => {
  if (!context.value || !canvas.value) return;

  const ctx = context.value;

  // Очистка холста
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

  // Смещение камеры
  ctx.setTransform(1, 0, 0, 1, -camera.value.x, -camera.value.y);

  // Отрисовка фона
  drawBackground();

  // Отрисовка игрока
  const { x, y, size, color } = player.value;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);

  // Отрисовка ника
  ctx.fillStyle = '#000';
  ctx.font = '16px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(props.nickname, x + size / 2, y - 10);

  // Сбрасываем трансформацию
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  // Обновляем позицию
  updatePosition();

  // Следующий кадр
  requestAnimationFrame(gameLoop);
};

// Обработка событий клавиатуры
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key in keys.value) keys.value[e.key as keyof typeof keys.value] = true;
};

const handleKeyUp = (e: KeyboardEvent) => {
  if (e.key in keys.value) keys.value[e.key as keyof typeof keys.value] = false;
};

onMounted(() => {
  if (!canvas.value) return;

  // Настройка холста
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
  context.value = canvas.value.getContext('2d')!;

  // Настройка камеры
  camera.value.width = canvas.value.width;
  camera.value.height = canvas.value.height;

  // Слушаем события клавиатуры
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);

  // Запускаем игровой цикл
  gameLoop();
});

onUnmounted(() => {
  // Удаляем обработчики при размонтировании
  window.removeEventListener('keydown', handleKeyDown);
  window.removeEventListener('keyup', handleKeyUp);
});

</script>

<template>
  <canvas ref="canvas" class="game-canvas"></canvas>
</template>

<style scoped>
.game-canvas {
  display: block;
  margin: 0;
  padding: 0;
  background-color: #bc1616;
}
</style>
