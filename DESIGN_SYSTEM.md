# ViDa Elite: Midnight & Magma Design System

## 1. Visual Philosophy
The **ViDa Elite** interface is designed to feel like a high-end financial terminal or a premium supercar cockpit. It uses extreme contrast between obsidian backgrounds and high-saturation lava accents.

### Core Principles:
- **Depth**: Layers are defined by varying levels of glass blur and surface transparency.
- **Vibrancy**: Use light only where it matters (Lava glow, progress bars, interactive states).
- **Precision**: Tight typography (Outfit for headers, Inter for data) and razor-sharp borders.

---

## 2. Color Palette

| Name | Hex | Usage |
| :--- | :--- | :--- |
| **Obsidian (BG)** | `#050505` | Main app background |
| **Deep Surface** | `#0F0F0F` | Main component backgrounds |
| **Raised Surface**| `#1A1A1A` | Floating elements / Inputs |
| **Hyper-Lava** | `#FF3B00` | Primary actions, branding |
| **Lava Glow** | `#FF8A00` | Secondary gradients, alerts |
| **Electric Cyan** | `#00E5FF` | Data accents, alternate states |
| **Silver Lining** | `#F2F2F2` | Primary text |
| **Ghost White** | `rgba(255,255,255,0.4)` | Secondary/muted text |

---

## 3. Typography
- **Headings**: `Outfit` (Weight 600-700) - Tight tracking (-0.02em)
- **Body/Data**: `Inter` (Weight 400-500) - Clean, neutral, high readability

---

## 4. Components Specification

### Elite Glass
- **Background**: `rgba(15, 15, 15, 0.7)`
- **Blur**: `24px`
- **Border**: `1px solid rgba(255, 255, 255, 0.08)`
- **Shadow**: `0 8px 32px 0 rgba(0, 0, 0, 0.8)`

### Primary Button
- **Lava Gradient**: `#FF3B00` to `#FF8A00`
- **Glow**: Subtle outer glow on hover
- **Transition**: `cubic-bezier(0.4, 0, 0.2, 1)`

### Status Indicators
- **Critical**: Pulsing Lava Glow
- **Safe**: Solid Electric Cyan
- **Neutral**: Dimmed White
