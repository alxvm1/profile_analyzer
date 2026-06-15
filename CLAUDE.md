# Project Rules

## TypeScript — нейминг

- Типы (type alias) — префикс `T`: `TRiskTier`, `TPlayerResponse`
- Интерфейсы — префикс `I`: `IPlayerAnalysis`
- Классы и исключения — без префикса: `ApiError`
- Глобальные коды ошибок (`ApiErrorCode`) — без префикса, они часть публичного контракта между api и web

## TypeScript — API типы

- Типы в `apps/api/src/types/` повторяют структуру сырого ответа API **без маппинга**:
  - Steam: snake_case (как приходит с API)
  - Steam Bans: PascalCase (`VACBanned`, `DaysSinceLastBan`) — так возвращает Steam
  - FACEIT: snake_case
- Маппинг делается только когда API возвращает строковые ключи с пробелами (FACEIT lifetime stats)
- Строковые флаги и коды ошибок — только английский `SCREAMING_SNAKE_CASE`. Перевод на фронте.

## FSD — структура entities

```
entities/
  Player/
    api/       — функции вызова API (getPlayer)
    config/    — константы, ERROR_MESSAGES
    lib/       — вспомогательные функции
    model/     — Effector модели; index.ts экспортирует объект PlayerModel
    types/     — типы сущности (TPlayerResponse)
    ui/        — UI компоненты
    index.ts   — публичный barrel: только PlayerModel и типы
```

## FSD — структура pages

```
pages/
  home/
    assets/    — (если есть)
    model/     — локальная Effector логика страницы
    ui/        — компоненты страницы (HomePage/index.tsx + style.css)
    index.ts
    types.ts
```

## Effector — нейминг

- Сторы: префикс `$` — `$player`, `$error`, `$loading`. **Всегда через `$`**, без исключений.
- Булевы сторы: `$is...` или `$has...` — `$isAnalyzed`, `$isPageLoaded`, `$hasError`
- Эффекты: постфикс `Fx` — `fetchPlayerFx`
- Ивенты: прошедшее время глагола — `searchSubmitted`, `playerFetched`

## Effector — структура файла модели

Порядок внутри файла строго фиксирован:

1. **Сначала все `create*`** — `createEvent`, `createStore`, `createEffect`
2. **Потом логика** — только через `sample`, не через методы стора (`.on`, `.reset`)
3. **В конце один экспорт** — объект модели

Экспорты внутри объекта сортируются по типам: сначала events, потом stores, потом вложенные models.

```ts
// 1. create
const fetchPlayerFx = createEffect<string, TPlayerResponse, ApiError>(getPlayer)
export const searchSubmitted = createEvent<string>()
export const $player = createStore<TPlayerResponse | null>(null)
export const $error = createStore<ApiError | null>(null)

// 2. логика
sample({ clock: searchSubmitted, target: fetchPlayerFx })
sample({ clock: fetchPlayerFx.doneData, target: $player })
sample({ clock: fetchPlayerFx.failData, target: $error })
sample({ clock: searchSubmitted, fn: () => null, target: [$player, $error] })

// 3. экспорт
export const playerModel = {
  events: { searchSubmitted },
  stores: { $player, $error, $loading: fetchPlayerFx.pending },
}
```

## Effector — архитектурные ограничения

### Экспорт юнитов
- Из модели **нельзя** экспортировать эффекты (`createEffect`).
- Экспортировать разрешено только **сторы** и **ивенты**.
- Модель экспортирует один именованный объект: `export const playerModel = { ... }`

### Изоляция моделей
- Модели **не импортируют** друг друга напрямую.
- Связь между моделями описывается в `model/actions.ts`.
- В `pages` файл `actions.ts` можно не создавать — если связь с entity нужна только для импорта, wiring пишется прямо в файле модели страницы.

### Логика
- `sample` для связи юнитов — `watch` только для отладки
- Никогда `$store.getState()` — данные передавать через `source` в `sample`
- Все юниты создаются статически на уровне модуля, не в рантайме
- Бизнес-логика полностью вне React-компонентов
- В React только хук `useUnit` (не `useStore`, не `useEvent`)

### Эффекты
- Всегда типизировать тремя дженериками: `createEffect<Params, Result, Error>(fn)`
- Никогда не вызывать ивенты/эффекты внутри тела эффекта — использовать `sample`

### Тесты
- Fork API для изоляции тестов
- `handlers` для моков эффектов, `values` для начального состояния сторов

## Hono RPC

- На бэкенде — **chained синтаксис** (иначе TypeScript теряет тип):
  ```ts
  const app = new Hono().use('*', cors()).get('/health', ...).route('/api/player', playerRouter)
  export type AppType = typeof app
  ```
- На фронтенде клиент создаётся через `hc<AppType>(baseUrl)` — тип берётся от `app`, не от sub-router
- `AppType` экспортируется из `apps/api/src/app.ts` и импортируется на фронте через алиас `@api`

## Алиасы и пути

- `@api` → `../../apps/api/src` — прямой доступ к api-типам без переупаковки через shared-types
- `@cs/shared-types` — только по-настоящему общие типы: `ApiError`, `ApiErrorCode`, `TRiskTier`, `IPlayerAnalysis`
- `@shared` → `src/shared` (внутри web)

## Компоненты — UI

- `SearchBar` живёт в `shared/ui/SearchBar/` (index.tsx + style.css)
- Внутри `SearchBar` импортировать `Input` и `Button` напрямую (`'../Input'`, `'../Button'`), не через barrel `@shared/ui`
- Жидкое стекло (Liquid Glass): SVG-фильтр `#liquid-glass` объявлен глобально в `index.html`; применяется через `filter: url(#liquid-glass)` только для не-Safari (`@supports not (hanging-punctuation: first)`)

## Деплой

- `apps/api/vercel.json` обязателен — без него Vercel трактует проект как статику
- Билд через `@vercel/node`, entrypoint — `src/index.ts`
