# SIGHTLINE — Design System

**CS profile analytics for Steam + FACEIT** · Dark theme · Liquid Glass · v1.0

---

## Быстрый старт (VSCode)

### 1. Подключи CSS-файлы

```html
<!-- В <head> каждой страницы -->
<link rel="stylesheet" href="path/to/tokens.css">
<link rel="stylesheet" href="path/to/components.css">
```

Порядок важен: `tokens.css` всегда первый — `components.css` зависит от его переменных.

### 2. Подключи шрифты (Google Fonts)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
```

### 3. Базовый HTML-шаблон

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- шрифты Google Fonts -->
  <link rel="stylesheet" href="tokens.css">
  <link rel="stylesheet" href="components.css">
</head>
<body>
  <!-- Контент -->
</body>
</html>
```

---

## Файлы

| Файл | Назначение |
|---|---|
| `tokens.css` | CSS Custom Properties — единый источник правды. Цвета, типографика, spacing, радиусы, тени, motion, Liquid Glass. |
| `components.css` | Готовые классы компонентов. Использует только переменные из `tokens.css`. |
| `figma-tokens.json` | Tokens Studio / W3C DTCG формат для импорта в Figma. |
| `README.md` | Этот файл. |

---

## Компоненты

### Кнопки
```html
<button class="btn btn--primary">Анализировать</button>
<button class="btn btn--secondary">Отмена</button>
<button class="btn btn--ghost">Войти</button>
<button class="btn btn--outline">Подробнее</button>
<button class="btn btn--danger">Удалить</button>

<!-- Размеры -->
<button class="btn btn--primary btn--lg">Большая</button>
<button class="btn btn--primary btn--sm">Маленькая</button>

<!-- Иконка -->
<button class="btn btn--primary">
  <svg class="icon"><!-- SVG --></svg>
  С иконкой
</button>
<button class="btn btn--primary btn--icon"><!-- только иконка --></button>

<!-- Liquid Glass -->
<button class="btn btn--glass">Glass кнопка</button>
```

### Поля ввода
```html
<!-- Простое поле -->
<input class="input" placeholder="Steam URL или ник">

<!-- С иконкой -->
<div class="input-group">
  <svg class="icon"><!-- иконка поиска --></svg>
  <input placeholder="Поиск игрока">
</div>

<!-- Поле с лейблом -->
<div class="field">
  <label class="field__label">Никнейм</label>
  <input class="input" placeholder="m0rfeu5">
  <span class="field__hint">Steam или FACEIT никнейм</span>
</div>

<!-- Большой размер -->
<div class="input-group input-group--lg">
  <svg class="icon"><!-- --></svg>
  <input placeholder="Большой поиск">
</div>
```

### Бейджи и теги
```html
<span class="badge">Нейтральный</span>
<span class="badge badge--accent"><span class="dot"></span>MVP</span>
<span class="badge badge--positive"><span class="dot"></span>Доверенный</span>
<span class="badge badge--warning"><span class="dot"></span>Осторожно</span>
<span class="badge badge--danger"><span class="dot"></span>Бан</span>
<span class="badge badge--info">Информация</span>
<span class="badge badge--outline">Контур</span>

<!-- Liquid Glass бейдж -->
<span class="badge badge--glass">Glass</span>

<!-- Теги и чипы -->
<span class="tag">CS2</span>
<span class="chip">Competitive</span>
<span class="chip chip--active">Faceit</span>

<!-- Интеграции -->
<span class="intg intg--steam">Steam</span>
<span class="intg intg--faceit">FACEIT</span>
```

### Карточки
```html
<!-- Базовая -->
<div class="card">Контент</div>

<!-- Кликабельная -->
<a class="card card--hover">Hover-эффект</a>

<!-- С акцентом -->
<div class="card card--accent">Подсвечена</div>

<!-- Liquid Glass (нужен цветной фон за карточкой) -->
<div class="card card--glass">Glass карточка</div>
```

### Аватар
```html
<div class="avatar avatar--md">s1</div>
<div class="avatar avatar--md avatar--ring">
  s1
  <span class="avatar__status"></span>
</div>
<!-- Размеры: avatar--xs, avatar--sm, avatar--md, avatar--lg, avatar--xl -->
```

### Trust Ring (круговой индикатор)
```html
<!-- --val 0-100, --ring-color задаёт цвет -->
<div class="ring" style="--val:82;--ring-color:var(--c-trust-high)">
  <div class="ring__bg"></div>
  <div class="ring__label">
    <span class="ring__num">82</span>
    <span class="ring__cap">Trust</span>
  </div>
</div>
```

### Trust Meter (полосовой)
```html
<div class="meter">
  <div class="meter__track">
    <!-- маска: right = 100 - score % -->
    <div class="meter__mask" style="width:18%"></div>
  </div>
  <div class="meter__scale">
    <span>0</span><span>Риск</span><span>Доверие</span><span>100</span>
  </div>
</div>
```

### Статистика (Stat tile)
```html
<div class="stat">
  <div class="stat__label">K/D Ratio</div>
  <div class="stat__value">1.27</div>
  <div class="stat__foot">
    <span class="delta delta--up">↑ +0.08</span>
    <span>за 30 дней</span>
  </div>
</div>
```

### Таблица
```html
<div class="table-wrap">
  <table class="table">
    <thead>
      <tr>
        <th>Игрок</th>
        <th>K/D</th>
        <th>Trust</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="strong">s1mple_fan</td>
        <td class="num">1.27</td>
        <td><span class="badge badge--positive">82</span></td>
      </tr>
    </tbody>
  </table>
</div>
```

### Табы
```html
<!-- Pill-стиль -->
<div class="tabs">
  <button class="tab tab--active">Обзор</button>
  <button class="tab">Статистика</button>
  <button class="tab">История</button>
</div>

<!-- Underline-стиль -->
<div class="tabs tabs--line">
  <button class="tab tab--active">Обзор</button>
  <button class="tab">Карты</button>
</div>
```

### Навигация
```html
<nav class="topnav">
  <div class="topnav__links">
    <a class="navlink navlink--active" href="#">Поиск</a>
    <a class="navlink" href="#">Рейтинг</a>
  </div>
  <div class="grow"></div>
  <button class="btn btn--ghost btn--sm">Войти</button>
  <button class="btn btn--primary btn--sm">Аккаунт</button>
</nav>

<!-- Frosted Glass вариант (нужен backdrop-filter) -->
<nav class="topnav topnav--glass">...</nav>
```

### Liquid Glass панель
```html
<!-- Нужен родитель с position:relative + цветными блобами за стеклом -->
<div style="position:relative;background:#0a0f0d;overflow:hidden">
  <!-- Цветной блоб создаёт хроматику за стеклом -->
  <div style="position:absolute;width:300px;height:300px;border-radius:50%;
    background:var(--c-accent);filter:blur(80px);opacity:0.3;top:-50px;left:-50px"></div>

  <!-- Glass панель -->
  <div class="glass-panel" style="position:relative;z-index:1">
    <div class="glass-panel__head">
      <h3>Заголовок</h3>
    </div>
    <div style="padding:24px">
      Контент
    </div>
  </div>

  <!-- Glass pill -->
  <div class="glass-pill" style="position:relative;z-index:1">
    Контрол
  </div>
</div>
```

---

## Типографика

```html
<h1 class="t-h1">Заголовок 1</h1>
<h2 class="t-h2">Заголовок 2</h2>
<h3 class="t-h3">Заголовок 3</h3>
<p class="t-body">Основной текст</p>
<p class="t-body-sm t-secondary">Вторичный текст</p>
<span class="t-caption">Подпись</span>
<span class="t-overline">Overline надпись</span>
<span class="t-mono">1.27 K/D</span>

<!-- Большие числа -->
<div class="data-xl">82</div>
<div class="data-lg">3120</div>
```

---

## CSS-переменные

Все токены доступны через `var(--имя)` в любом CSS:

```css
.my-component {
  background: var(--c-surface-1);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  color: var(--c-text);
  padding: var(--space-5);
  transition: background var(--dur-fast) var(--ease-out);
}
.my-component:hover {
  background: var(--c-surface-2);
  border-color: var(--c-border-strong);
}
```

---

## Figma

Импортируй `figma-tokens.json` через плагин **Tokens Studio for Figma**:
1. Установи плагин [Tokens Studio](https://tokens.studio)
2. Plugins → Tokens Studio → Load tokens → выбери `figma-tokens.json`
3. Apply tokens → All tokens

**oklch → Hex:** токены уже конвертированы в Hex для совместимости с Figma.
Оригинальные oklch-значения сохранены в `tokens.css` для браузеров.

---

## Цветовая палитра (Hex Reference)

| Токен | Hex | Назначение |
|---|---|---|
| `--c-bg` | `#090d0b` | Фон приложения |
| `--c-surface-1` | `#0f1412` | Карточки, панели |
| `--c-surface-2` | `#181d1b` | Инпуты, hover |
| `--c-surface-3` | `#222825` | Поповеры |
| `--c-accent` | `#35e98d` | Основной зелёный |
| `--c-accent-bright` | `#43ff9d` | Hover акцента |
| `--c-accent-deep` | `#116f42` | Границы, темный тинт |
| `--c-text-bright` | `#f8fbf9` | Максимальный контраст |
| `--c-text` | `#e5ebe8` | Основной текст |
| `--c-text-secondary` | `#aab4af` | Вторичный текст |
| `--c-positive` | `#56dc85` | Позитивный статус |
| `--c-warning` | `#f7c243` | Предупреждение |
| `--c-danger` | `#f64e4d` | Опасность / бан |
| `--c-info` | `#64bced` | Информация |
| `--c-trust-low` | `#f14445` | Низкий trust |
| `--c-trust-mid` | `#f7c243` | Средний trust |
| `--c-trust-high` | `#4de586` | Высокий trust |
| `--c-steam` | `#72aecb` | Steam синий |
| `--c-faceit` | `#ff6800` | FACEIT оранжевый |

---

*SIGHTLINE Design System · MVP · 2026*
