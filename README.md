# React Star Rating Component

A highly customizable, accessible, and lightweight star rating component for React applications. Supports both full and half-star ratings with extensive customization options.

## 🚀 Features

- ⭐ Configurable number of stars
- 🌟 Support for half-star ratings
- ✨ Interactive hover effects
- 🔒 Read-only mode support
- 🎨 Customizable star colors
- 📐 Adjustable star sizes
- ♿ Fully accessible (ARIA-compliant)
- 🎯 TypeScript support
- 🪶 Lightweight (~3KB gzipped)

## 📦 Installation

Using npm:
```bash
npm install @scope/react-star-rating
```

Using pnpm:
```bash
pnpm add @scope/react-star-rating
```

Using yarn:
```bash
yarn add @scope/react-star-rating
```

## 💻 Basic Usage

```tsx
import { StarRating } from '@scope/react-star-rating';

function App() {
  const handleRatingChange = (rating: number) => {
    console.log(`New rating: ${rating}`);
  };

  return (
    <StarRating
      initialRating={3.5}
      onRatingChange={handleRatingChange}
    />
  );
}
```

## ⚙️ Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `starsLength` | `number` | `5` | Number of stars to display |
| `isHalfRatingEnabled` | `boolean` | `false` | Enable half-star ratings |
| `isHoverEnabled` | `boolean` | `true` | Enable hover effects |
| `isReadOnly` | `boolean` | `false` | Make the rating read-only |
| `initialRating` | `number` | `0` | Initial rating value |
| `dimension` | `number` | `24` | Size of stars in pixels |
| `color` | `string` | `"#FFD700"` | Star color in HEX format |
| `onRatingChange` | `(rating: number) => void` | - | Rating change callback |

## 📝 Examples

### Basic Star Rating
```tsx
<StarRating
  starsLength={5}
  initialRating={0}
  onRatingChange={(rating) => console.log(rating)}
/>
```

### Half-Star Rating
```tsx
<StarRating
  starsLength={5}
  initialRating={3.5}
  isHalfRatingEnabled={true}
  onRatingChange={(rating) => console.log(rating)}
/>
```

### Read-only Rating Display
```tsx
<StarRating
  starsLength={5}
  initialRating={4}
  isReadOnly={true}
/>
```

### Custom Styled Rating
```tsx
<StarRating
  starsLength={5}
  initialRating={5}
  dimension={40}
  color="#FF5733"
  isHoverEnabled={true}
/>
```

### Disabled Hover Effects
```tsx
<StarRating
  starsLength={5}
  initialRating={3}
  isHoverEnabled={false}
/>
```

## 🎯 Advanced Usage

### With Form Integration
```tsx
import { useState } from 'react';
import { StarRating } from '@scope/react-star-rating';

function ReviewForm() {
  const [rating, setRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted rating:', rating);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Your Rating:</label>
        <StarRating
          initialRating={rating}
          onRatingChange={setRating}
          isHalfRatingEnabled={true}
        />
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );
}
```

### With Dynamic Updates
```tsx
function DynamicRating() {
  const [rating, setRating] = useState(0);

  return (
    <div>
      <StarRating
        initialRating={rating}
        onRatingChange={setRating}
      />
      <p>Current rating: {rating}</p>
      <button onClick={() => setRating(0)}>Reset</button>
    </div>
  );
}
```

## 🔍 API Details

### Rating Validation
- When `isHalfRatingEnabled` is `true`, ratings can be in increments of 0.5
- When `isHalfRatingEnabled` is `false`, only integer ratings are allowed
- `initialRating` must be between 0 and `starsLength`

### Accessibility
The component implements ARIA attributes for accessibility:
- `aria-label` for rating description
- `aria-valuemin` and `aria-valuemax` for range
- `aria-valuenow` for current rating
- Keyboard navigation support

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/your-username/react-star-rating.git

# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build the package
pnpm build

# Run tests
pnpm test
```

## 📄 License

Apache 2.0

## 💖 Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) to get started.

---

<small> Süha Tanrıverdi, 2025 </small>