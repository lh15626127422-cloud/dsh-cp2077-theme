/**
 * Cyberpunk 2077 theme — browser half.
 *
 * Strategy: stack a token override layer (ctx.theme.overrideTokens) instead of
 * registering a new selectable theme. The user's light/dark preference is left
 * untouched: the 2077 palette replaces the dark palette and a light-on-paper
 * variant replaces the light palette, so switching modes never strands the UI
 * on tokens nobody renders.
 */
window.__ModuleLoader__.load({
  id: '@local/cp2077-theme',
  factory(require) {
    const SOURCE = '@local/cp2077-theme';

    /* ---------- Night City (dark) ---------- */
    const DARK = {
      '--cy-yellow': '#FCEE0A',
      '--cy-cyan': '#00E5FF',
      '--cy-magenta': '#FF2E9A',
      '--cy-red': '#FF2E63',
      '--cy-ink': '#0A0910',

      '--dsw-alias-bg-base': '#0A0910',
      '--dsw-alias-bg-layer-1': '#121019',
      '--dsw-alias-bg-layer-2': '#16121E',
      '--dsw-alias-bg-layer-3': '#232030',
      '--dsw-alias-bg-layer-4': '#2A2638',
      '--dsw-alias-bg-overlay': '#232030',
      '--dsw-alias-bg-mask-1': 'rgba(4, 3, 8, 0.72)',
      '--dsw-alias-bg-module-platform': '#191623',
      '--dsw-specific-sidebar-fill': '#100C18',

      '--dsw-alias-border-l1': 'rgba(0, 229, 255, 0.12)',
      '--dsw-alias-border-l2': 'rgba(0, 229, 255, 0.24)',
      '--dsw-alias-border-l2-darkmode-thin': 'rgba(0, 229, 255, 0.15)',
      '--dsw-alias-border-l3': 'rgba(0, 229, 255, 0.32)',
      '--dsw-alias-border-l4': 'rgba(0, 229, 255, 0.42)',

      '--dsw-alias-brand-primary': '#FCEE0A',
      '--dsw-alias-button-primary-fill': '#FCEE0A',
      '--dsw-alias-button-primary-hover': '#FFF03D',
      '--dsw-alias-label-primary-foreground': '#0A0910',
      '--dsw-alias-button-tool-bar-fill': 'rgba(0, 229, 255, 0.10)',
      '--dsw-alias-button-tool-bar-hover': 'rgba(0, 229, 255, 0.18)',
      '--dsw-alias-button-ghost-active-fill': 'rgba(252, 238, 10, 0.12)',
      '--dsw-alias-button-ghost-active-border': 'rgba(252, 238, 10, 0.45)',
      '--dsw-alias-link': '#FCEE0A',

      '--dsw-alias-label-primary': '#F2F0F5',
      '--dsw-alias-label-secondary': '#9C93AE',
      '--dsw-alias-label-tertiary': '#8F87A2',
      '--dsw-alias-label-caption': '#8F87A2',
      '--dsw-alias-label-dimmed': '#57516E',
      '--dsw-alias-label-error': '#FF2E63',
      '--dsw-alias-label-shimmer': '#FFFFFF',

      '--dsw-alias-state-error-primary': '#FF2E63',
      '--dsw-alias-state-success-primary': '#3BF0A8',
      '--dsw-alias-state-success-tertiary': 'rgba(59, 240, 168, 0.35)',
      '--dsw-alias-state-warn-primary': '#FFB300',
      '--dsw-alias-state-warn-tertiary': 'rgba(255, 179, 0, 0.35)',
      '--dsw-alias-state-idle-primary': '#8A849C',
      '--dsw-alias-state-business-primary': '#00E5FF',

      '--dsw-alias-markdown-code-block': '#0E0C15',
      '--dsw-alias-markdown-code-block-banner': '#171325',
      '--dsw-alias-markdown-inline-code': 'rgba(0, 229, 255, 0.10)',
      '--dsw-alias-markdown-tag': 'rgba(0, 229, 255, 0.16)',
      '--dsw-alias-code-diff-added': 'rgba(59, 240, 168, 0.14)',
      '--dsw-alias-code-diff-deleted': 'rgba(255, 46, 99, 0.14)',

      '--dsw-alias-interactive-bg-hover': 'rgba(0, 229, 255, 0.07)',
      '--dsw-alias-interactive-bg-active': 'rgba(0, 229, 255, 0.13)',
      '--dsw-alias-interactive-bg-hover-danger': 'rgba(255, 46, 99, 0.12)',

      '--dsw-alias-scrollbar-bg-l1': 'rgba(0, 229, 255, 0.32)',
      '--dsw-alias-scrollbar-hover-l1': 'rgba(0, 229, 255, 0.58)',
      '--dsw-alias-scrollbar-bg-l2': 'rgba(0, 229, 255, 0.32)',
      '--dsw-alias-scrollbar-hover-l2': 'rgba(0, 229, 255, 0.58)',

      '--dsw-alias-menu-group-header-fill': 'rgba(0, 229, 255, 0.08)',
      '--dsw-alias-menu-icon': '#9C93AE',

      '--dsw-alias-switch-thumb': '#0A0910',
      '--dsw-alias-toast-bg': '#232030',
      '--dsw-alias-toast-label': '#F2F0F5',
      '--dsw-alias-tooltip-bg': '#232030',
      '--dsw-alias-tooltip-key-bg': '#2A2638',

      /* --- 补齐基座实际引用、但早期版本未覆盖的别名 --- */
      '--dsw-alias-bg-elevated': '#232030',
      '--dsw-alias-bg-l1': '#121019',
      '--dsw-alias-surface-tinted': '#14111C',
      '--dsw-alias-bg-skeleton': 'rgba(0, 229, 255, 0.08)',
      '--dsw-alias-bg-multi-select': 'rgba(0, 229, 255, 0.16)',
      '--dsw-alias-bg-mask-2': 'rgba(4, 3, 8, 0.82)',
      '--dsw-alias-bg-mask-3': 'rgba(4, 3, 8, 0.90)',

      '--dsw-alias-fill-l1': '#191623',
      '--dsw-alias-fill-l2': '#232030',
      '--dsw-alias-fill-tertiary': 'rgba(0, 229, 255, 0.12)',
      '--dsw-alias-fill-hover': 'rgba(0, 229, 255, 0.07)',
      '--dsw-alias-fill-tsp-secondary': 'rgba(255, 255, 255, 0.06)',

      '--dsw-alias-border': 'rgba(0, 229, 255, 0.24)',
      '--dsw-alias-border-weak': 'rgba(0, 229, 255, 0.12)',
      '--dsw-alias-border-focus': '#00E5FF',
      '--dsw-alias-hairline': 'rgba(0, 229, 255, 0.16)',
      '--dsw-alias-separator-primary': 'rgba(0, 229, 255, 0.20)',
      '--dsw-alias-line-secondary': 'rgba(0, 229, 255, 0.24)',

      '--dsw-alias-label': '#9C93AE',
      '--dsw-alias-text-secondary': '#9C93AE',
      '--dsw-alias-label-primary-dimmed': '#57516E',
      '--dsw-alias-label-primary-inverted': '#0A0910',
      '--dsw-alias-label-primary-bluish': '#E6F7FF',
      '--dsw-alias-label-quaternary': '#6B6480',

      '--dsw-alias-accent': '#FCEE0A',
      '--dsw-alias-accent-ink': '#0A0910',
      '--dsw-alias-accent-soft': 'rgba(252, 238, 10, 0.14)',
      '--dsw-alias-brand-text': '#FCEE0A',
      '--dsw-alias-brand-primary-invert': '#0A0910',

      '--dsw-alias-button-elevated-fill': 'rgba(252, 238, 10, 0.12)',
      '--dsw-alias-button-contrast-fill': '#FCEE0A',
      '--dsw-alias-button-floating-fill': '#232030',
      '--dsw-alias-button-floating-hover': '#2A2638',
      '--dsw-alias-button-info-fill': 'rgba(0, 229, 255, 0.14)',
      '--dsw-alias-button-info-hover': 'rgba(0, 229, 255, 0.26)',
      '--dsw-alias-button-info-label': '#00E5FF',
      '--dsw-alias-button-primary-dimmed': 'rgba(252, 238, 10, 0.28)',
      '--dsw-alias-button-ghost-active-hover': 'rgba(252, 238, 10, 0.18)',
      '--dsw-alias-button-tool-bar-fill-invisible': 'transparent',

      '--dsw-alias-interactive-bg-hover-accent': 'rgba(0, 229, 255, 0.10)',
      '--dsw-alias-interactive-bg-hover-solid': '#232030',

      '--dsw-alias-markdown-citation': 'rgba(0, 229, 255, 0.12)',
      '--dsw-alias-markdown-hr': 'rgba(0, 229, 255, 0.24)',
      '--dsw-alias-markdown-placeholder': '#7E7791',
      '--dsw-alias-markdown-code-segment-selected': 'rgba(252, 238, 10, 0.18)',
      '--dsw-alias-markdown-code-segment-unselected': 'rgba(255, 46, 154, 0.14)',

      '--dsw-alias-settings-card-fill': '#191623',
      '--dsw-alias-settings-card-stroke': 'rgba(0, 229, 255, 0.24)',
      '--dsw-alias-turn-trigger-bg': '#191623',
      '--dsw-alias-turn-trigger-bg-hover': '#232030',

      '--dsw-alias-danger': '#FF2E63',
      '--dsw-alias-state-danger-primary': '#FF2E63',
      '--dsw-alias-state-warning-primary': '#FFB300',
      '--dsw-alias-state-warn-secondary': '#FFC933',
      '--dsw-alias-state-error-tertiary': 'rgba(255, 46, 99, 0.14)',
      '--dsw-alias-state-business-tertiary': 'rgba(0, 229, 255, 0.14)',

      '--dsw-focus-ring-color': '#00E5FF',

      '--dsw-radius-xs': '0px',
      '--dsw-radius-sm': '2px',
      '--dsw-radius-md': '2px',
      '--dsw-radius-lg': '3px',
      '--dsw-radius-xl': '3px',
      '--dsw-radius-panel': '4px',

      '--dsh-scrollbar-width': '10px',

      '--shiki-token-constant': '#00E5FF',
      '--shiki-token-string': '#3BF0A8',
      '--shiki-token-string-expression': '#3BF0A8',
      '--shiki-token-comment': '#8F87A2',
      '--shiki-token-keyword': '#FF2E9A',
      '--shiki-token-parameter': '#FFB300',
      '--shiki-token-function': '#FCEE0A',
      '--shiki-token-punctuation': '#9C93AE',
      '--shiki-token-link': '#00E5FF',
    };

    /* ---------- Dataterm on paper (light) ---------- */
    const LIGHT = {
      '--cy-yellow': '#8A6400',
      '--cy-cyan': '#007A8C',
      '--cy-magenta': '#A3136B',
      '--cy-red': '#C4123F',
      '--cy-ink': '#12101A',

      '--dsw-alias-bg-base': '#EFEBE1',
      '--dsw-alias-bg-layer-1': '#F7F4EC',
      '--dsw-alias-bg-layer-2': '#FFFFFF',
      '--dsw-alias-bg-layer-3': '#FFFFFF',
      '--dsw-alias-bg-layer-4': '#FBF8F1',
      '--dsw-alias-bg-overlay': '#FFFFFF',
      '--dsw-alias-bg-mask-1': 'rgba(20, 18, 26, 0.42)',
      '--dsw-alias-bg-module-platform': '#F7F4EC',
      '--dsw-specific-sidebar-fill': '#F4F0E6',

      '--dsw-alias-border-l1': 'rgba(0, 120, 140, 0.18)',
      '--dsw-alias-border-l2': 'rgba(0, 120, 140, 0.30)',
      '--dsw-alias-border-l2-darkmode-thin': 'rgba(0, 120, 140, 0.18)',
      '--dsw-alias-border-l3': 'rgba(0, 120, 140, 0.45)',
      '--dsw-alias-border-l4': 'rgba(0, 120, 140, 0.58)',

      '--dsw-alias-brand-primary': '#8A6400',
      '--dsw-alias-button-primary-fill': '#FCEE0A',
      '--dsw-alias-button-primary-hover': '#FFF03D',
      '--dsw-alias-label-primary-foreground': '#0A0910',
      '--dsw-alias-button-tool-bar-fill': 'rgba(0, 120, 140, 0.10)',
      '--dsw-alias-button-tool-bar-hover': 'rgba(0, 120, 140, 0.16)',
      '--dsw-alias-button-ghost-active-fill': 'rgba(138, 100, 0, 0.12)',
      '--dsw-alias-button-ghost-active-border': 'rgba(138, 100, 0, 0.45)',
      '--dsw-alias-link': '#8A6400',

      '--dsw-alias-label-primary': '#14121B',
      '--dsw-alias-label-secondary': '#4C4658',
      '--dsw-alias-label-tertiary': '#635D74',
      '--dsw-alias-label-caption': '#736D84',
      '--dsw-alias-label-dimmed': '#8B8598',
      '--dsw-alias-label-error': '#C4123F',
      '--dsw-alias-label-shimmer': '#12101A',

      '--dsw-alias-state-error-primary': '#C4123F',
      '--dsw-alias-state-error-secondary': '#A80F35',
      '--dsw-alias-state-success-primary': '#08704C',
      '--dsw-alias-state-success-secondary': '#075F42',
      '--dsw-alias-state-success-tertiary': 'rgba(8, 112, 76, 0.24)',
      '--dsw-alias-state-warn-primary': '#8A5A00',
      '--dsw-alias-state-warn-label': '#8A5A00',
      '--dsw-alias-state-warn-tertiary': 'rgba(138, 90, 0, 0.24)',
      '--dsw-alias-state-idle-primary': '#6B6580',
      '--dsw-alias-state-business-primary': '#007A8C',

      '--dsw-alias-markdown-code-block': '#F4F1E8',
      '--dsw-alias-markdown-code-block-banner': '#EAE5D8',
      '--dsw-alias-markdown-inline-code': 'rgba(0, 120, 140, 0.10)',
      '--dsw-alias-markdown-tag': 'rgba(0, 120, 140, 0.12)',
      '--dsw-alias-code-diff-added': 'rgba(8, 112, 76, 0.12)',
      '--dsw-alias-code-diff-deleted': 'rgba(196, 18, 63, 0.10)',

      '--dsw-alias-interactive-bg-hover': 'rgba(0, 120, 140, 0.07)',
      '--dsw-alias-interactive-bg-active': 'rgba(0, 120, 140, 0.12)',
      '--dsw-alias-interactive-bg-hover-danger': 'rgba(196, 18, 63, 0.09)',

      '--dsw-alias-scrollbar-bg-l1': 'rgba(0, 120, 140, 0.45)',
      '--dsw-alias-scrollbar-hover-l1': 'rgba(0, 120, 140, 0.62)',
      '--dsw-alias-scrollbar-bg-l2': 'rgba(0, 120, 140, 0.45)',
      '--dsw-alias-scrollbar-hover-l2': 'rgba(0, 120, 140, 0.62)',

      '--dsw-alias-menu-group-header-fill': 'rgba(0, 120, 140, 0.07)',
      '--dsw-alias-menu-icon': '#4C4658',

      '--dsw-alias-switch-thumb': '#FFFFFF',
      '--dsw-alias-toast-bg': '#1A1822',
      '--dsw-alias-toast-label': '#F2F0F5',
      '--dsw-alias-tooltip-bg': '#1A1822',
      '--dsw-alias-tooltip-key-bg': '#2A2638',

      /* --- 补齐基座实际引用、但早期版本未覆盖的别名 --- */
      '--dsw-alias-bg-elevated': '#FFFFFF',
      '--dsw-alias-bg-l1': '#F7F4EC',
      '--dsw-alias-surface-tinted': '#F4F1E8',
      '--dsw-alias-bg-skeleton': 'rgba(0, 120, 140, 0.10)',
      '--dsw-alias-bg-multi-select': 'rgba(0, 120, 140, 0.16)',
      '--dsw-alias-bg-mask-2': 'rgba(20, 18, 26, 0.55)',
      '--dsw-alias-bg-mask-3': 'rgba(20, 18, 26, 0.68)',

      '--dsw-alias-fill-l1': '#F4F1E8',
      '--dsw-alias-fill-l2': '#FFFFFF',
      '--dsw-alias-fill-tertiary': 'rgba(0, 120, 140, 0.12)',
      '--dsw-alias-fill-hover': 'rgba(0, 120, 140, 0.07)',
      '--dsw-alias-fill-tsp-secondary': 'rgba(0, 0, 0, 0.05)',

      '--dsw-alias-border': 'rgba(0, 120, 140, 0.30)',
      '--dsw-alias-border-weak': 'rgba(0, 120, 140, 0.18)',
      '--dsw-alias-border-focus': '#007A8C',
      '--dsw-alias-hairline': 'rgba(0, 120, 140, 0.22)',
      '--dsw-alias-separator-primary': 'rgba(0, 120, 140, 0.24)',
      '--dsw-alias-line-secondary': 'rgba(0, 120, 140, 0.30)',

      '--dsw-alias-label': '#4C4658',
      '--dsw-alias-text-secondary': '#4C4658',
      '--dsw-alias-label-primary-dimmed': '#8B8598',
      '--dsw-alias-label-primary-inverted': '#FFFFFF',
      '--dsw-alias-label-primary-bluish': '#0E2B33',
      '--dsw-alias-label-quaternary': '#7A7488',

      '--dsw-alias-accent': '#8A6400',
      '--dsw-alias-accent-ink': '#FFFFFF',
      '--dsw-alias-accent-soft': 'rgba(252, 238, 10, 0.35)',
      '--dsw-alias-brand-text': '#8A6400',
      '--dsw-alias-brand-primary-invert': '#FFFFFF',

      '--dsw-alias-button-elevated-fill': 'rgba(252, 238, 10, 0.45)',
      '--dsw-alias-button-contrast-fill': '#14121B',
      '--dsw-alias-button-floating-fill': '#FFFFFF',
      '--dsw-alias-button-floating-hover': '#F4F1E8',
      '--dsw-alias-button-info-fill': 'rgba(0, 122, 140, 0.12)',
      '--dsw-alias-button-info-hover': 'rgba(0, 122, 140, 0.20)',
      '--dsw-alias-button-info-label': '#007A8C',
      '--dsw-alias-button-primary-dimmed': 'rgba(252, 238, 10, 0.45)',
      '--dsw-alias-button-ghost-active-hover': 'rgba(138, 100, 0, 0.18)',
      '--dsw-alias-button-tool-bar-fill-invisible': 'transparent',

      '--dsw-alias-interactive-bg-hover-accent': 'rgba(0, 122, 140, 0.10)',
      '--dsw-alias-interactive-bg-hover-solid': '#F4F1E8',

      '--dsw-alias-markdown-citation': 'rgba(0, 122, 140, 0.10)',
      '--dsw-alias-markdown-hr': 'rgba(0, 120, 140, 0.30)',
      '--dsw-alias-markdown-placeholder': '#7A7488',
      '--dsw-alias-markdown-code-segment-selected': 'rgba(252, 238, 10, 0.40)',
      '--dsw-alias-markdown-code-segment-unselected': 'rgba(196, 18, 63, 0.12)',

      '--dsw-alias-settings-card-fill': '#FFFFFF',
      '--dsw-alias-settings-card-stroke': 'rgba(0, 120, 140, 0.30)',
      '--dsw-alias-turn-trigger-bg': '#F7F4EC',
      '--dsw-alias-turn-trigger-bg-hover': '#F4F1E8',

      '--dsw-alias-danger': '#C4123F',
      '--dsw-alias-state-danger-primary': '#C4123F',
      '--dsw-alias-state-warning-primary': '#8A5A00',
      '--dsw-alias-state-warn-secondary': '#9A6B00',
      '--dsw-alias-state-error-tertiary': 'rgba(196, 18, 63, 0.12)',
      '--dsw-alias-state-business-tertiary': 'rgba(0, 122, 140, 0.12)',

      '--dsw-focus-ring-color': '#007A8C',

      '--shiki-token-constant': '#007A8C',
      '--shiki-token-string': '#08704C',
      '--shiki-token-string-expression': '#08704C',
      '--shiki-token-comment': '#6F6880',
      '--shiki-token-keyword': '#C4123F',
      '--shiki-token-parameter': '#8A5A00',
      '--shiki-token-function': '#8A6400',
      '--shiki-token-punctuation': '#635D74',
      '--shiki-token-link': '#007A8C',
    };

    const WASH_TARGETS = {
      '--dsw-alias-bg-base': { dark: '10, 9, 16', light: '239, 235, 225' },
      '--dsw-specific-sidebar-fill': { dark: '16, 12, 24', light: '244, 240, 230' },
    };

    /* The app shells paint var(--dsw-alias-bg-base) on every opaque level, so a
       translucent value for that single token is what actually lets a backdrop
       show through. Cards keep their own solid fill, so text stays readable. */
    function washOverrides(alpha) {
      const base = buildOverrides();
      if (alpha === null || alpha === undefined) return base;
      const a = Math.max(0.2, Math.min(1, Number(alpha)));
      /* The content column may stay translucent: that is where the photo is
         meant to show. The sidebar must stay solid, because DSH also renders
         floating sidebar-derived surfaces (session search, workspace peek) and
         any alpha there lets the list behind them bleed through the text. */
      for (const name of Object.keys(WASH_TARGETS)) {
        const solid = name === '--dsw-specific-sidebar-fill';
        const alpha = solid ? 1 : a;
        base[name] = {
          dark: 'rgba(' + WASH_TARGETS[name].dark + ', ' + alpha + ')',
          light: 'rgba(' + WASH_TARGETS[name].light + ', ' + alpha + ')',
        };
      }
      return base;
    }

    function buildOverrides() {
      const merged = {};
      for (const name of Object.keys(DARK)) {
        merged[name] = { dark: DARK[name], light: LIGHT[name] || DARK[name] };
      }
      for (const name of Object.keys(LIGHT)) {
        if (!merged[name]) merged[name] = { dark: DARK[name] || LIGHT[name], light: LIGHT[name] };
      }
      return merged;
    }

    const CSS = `
/* ── 0. local helper variables ─────────────────────────────── */
:root {
  /* live knobs written by the settings panel; 1 = as shipped */
  --cp-opt-grid: 1;
  --cp-opt-scan: 1;
  --cp-opt-floor: 1;
  --cp-opt-chamfer: 10px;
  --cp-grid-line: rgba(0, 120, 140, calc(.075 * var(--cp-opt-grid)));
  --cp-floor-line: rgba(0, 120, 140, calc(.16 * var(--cp-opt-floor)));
  --cp-chamfer: var(--cp-opt-chamfer);
  --cp-rail: color-mix(in srgb, var(--cy-yellow) 80%, transparent);
  --cp-rail-soft: color-mix(in srgb, var(--cy-yellow) 26%, transparent);
}
body[data-ds-dark-theme] {
  --cp-grid-line: rgba(0, 229, 255, calc(.060 * var(--cp-opt-grid)));
  --cp-floor-line: rgba(0, 229, 255, calc(.320 * var(--cp-opt-floor)));
}
body {
  --cp-hud-deco: #C4123F;
  --cp-hazard: repeating-linear-gradient(-45deg, #FCEE0A 0 6px, #0A0910 6px 12px);
  --cp-cut-br: polygon(0 0, 100% 0, 100% calc(100% - var(--cp-chamfer)), calc(100% - var(--cp-chamfer)) 100%, 0 100%);
  --cp-hud-line: color-mix(in srgb, var(--cy-cyan) 42%, transparent);
  --cp-hud-line-strong: color-mix(in srgb, var(--cy-cyan) 76%, transparent);
}

/* ── 1. typography ─────────────────────────────────────────── */
body {
  --dsh-font-family-text: "Bahnschrift", "Segoe UI Variable Text", "Segoe UI", "Microsoft YaHei UI", "PingFang SC", sans-serif;
  --dsh-font-family-code: "Cascadia Mono", Consolas, "JetBrains Mono", "Microsoft YaHei UI", monospace;
  --dsh-font-family-terminal: "Cascadia Mono", Consolas, "Microsoft YaHei UI", monospace;
  --dsw-font-family-brand: "Bahnschrift SemiCondensed", "Bahnschrift", "Segoe UI Semibold", "Microsoft YaHei UI", sans-serif;
  --dsh-scrollbar-width: 10px;
  --dsw-focus-ring-width: 2px;
}
body[data-ds-dark-theme] { --cp-hud-deco: #FF003C; }
body[data-ds-dark-theme] {
  background-image:
    linear-gradient(180deg, rgba(10, 9, 16, .58), rgba(10, 9, 16, .80)),
    var(--cp-wallpaper-image, url("/cp2077-wallpaper/file/2872291185")),
    radial-gradient(1100px 720px at 50% -26%, rgba(0, 229, 255, .065), transparent 68%),
    radial-gradient(900px 600px at 100% 14%, rgba(255, 46, 154, .040), transparent 66%);
  background-size: cover, cover, auto, auto;
  background-position: center, center, 0 0, 0 0;
  background-attachment: fixed, fixed, fixed, fixed;
  background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
}
body:not([data-ds-dark-theme]) {
  background-image:
    linear-gradient(180deg, rgba(239, 235, 225, .76), rgba(239, 235, 225, .88)),
    var(--cp-wallpaper-image, url("/cp2077-wallpaper/file/2872291185"));
  background-size: cover, cover;
  background-position: center, center;
  background-attachment: fixed, fixed;
  background-repeat: no-repeat, no-repeat;
}

body h1, body h2, body h3, body h4 {
  font-family: var(--dsw-font-family-brand);
  letter-spacing: .01em;
}
body h1 { color: var(--cy-yellow); }
body[data-ds-dark-theme] h1 {
  text-shadow: -1px 0 0 rgba(255, 0, 60, .55), 1px 0 0 rgba(0, 229, 255, .45), 0 0 16px rgba(252, 238, 10, .22);
}
body code, body pre, body kbd, body textarea {
  font-feature-settings: "zero" 1, "calt" 0;
}

/* ── 2. selection / links / rules ──────────────────────────── */
body ::selection { background: #FCEE0A; color: #0A0910; }
body a {
  color: var(--dsw-alias-link);
  text-decoration: none;
  border-bottom: 1px solid color-mix(in srgb, var(--dsw-alias-link) 45%, transparent);
}
body a:hover {
  color: var(--dsw-alias-state-business-primary);
  border-bottom-color: var(--dsw-alias-state-business-primary);
  text-shadow: 0 0 10px color-mix(in srgb, var(--dsw-alias-state-business-primary) 55%, transparent);
}
body hr {
  border: 0 !important;
  height: 1px !important;
  background: linear-gradient(90deg, transparent, var(--dsw-alias-border-l3) 18%, var(--dsw-alias-border-l3) 82%, transparent) !important;
}

/* ── 3. code ───────────────────────────────────────────────── */
body pre {
  border: 1px solid var(--dsw-alias-border-l2) !important;
  border-left: 3px solid var(--cy-yellow) !important;
  border-radius: 0 !important;
  background: var(--dsw-alias-markdown-code-block) !important;
  clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
}
body code:not(pre code) {
  background: var(--dsw-alias-markdown-inline-code) !important;
  border: 1px solid var(--dsw-alias-border-l1) !important;
  border-radius: 2px !important;
  color: var(--dsw-alias-state-business-primary);
  padding: .06em .32em;
}

/* ── 4. tables ─────────────────────────────────────────────── */
body table {
  border: 1px solid var(--dsw-alias-border-l2) !important;
  border-radius: 0 !important;
  border-collapse: collapse !important;
}
body th {
  background: var(--dsw-alias-menu-group-header-fill) !important;
  color: var(--dsw-alias-label-primary) !important;
  font-family: var(--dsw-font-family-brand);
  text-transform: uppercase;
  letter-spacing: .06em;
  font-weight: 600;
}
body td { border-top: 1px solid var(--dsw-alias-border-l1) !important; }
body tbody tr:hover td { background: var(--dsw-alias-interactive-bg-hover); }

/* ── 5. quotes / disclosure ────────────────────────────────── */
body blockquote {
  border-left: 2px solid var(--cy-yellow) !important;
  background: linear-gradient(90deg, var(--dsw-alias-interactive-bg-hover), transparent 72%) !important;
  border-radius: 0 !important;
}
body details {
  border-left: 2px solid var(--dsw-alias-border-l3);
  padding-left: .7em;
}

/* ── 6. controls ───────────────────────────────────────────── */
body textarea, body input[type="text"], body input[type="search"] {
  border-radius: 0 !important;
  box-shadow: inset 0 0 0 1px var(--dsw-alias-border-l2);
}
body textarea {
  caret-color: var(--cy-yellow);
}
body [data-composer-input] {
  caret-color: var(--cy-yellow);
}
body textarea::placeholder {
  letter-spacing: .02em;
}
body textarea:focus, body input:focus, body [contenteditable="true"]:focus {
  border-color: var(--dsw-alias-state-business-primary) !important;
  box-shadow: 0 0 0 1px var(--dsw-alias-state-business-primary),
              0 0 18px color-mix(in srgb, var(--dsw-alias-state-business-primary) 30%, transparent) !important;
}
body button { border-radius: 0 !important; }
body :focus-visible {
  outline-color: var(--dsw-focus-ring-color);
  outline-offset: 2px;
}

/* ── 6b. chrome accents ────────────────────────────────────── */
body[data-ds-dark-theme] header {
  box-shadow: inset 0 -1px 0 color-mix(in srgb, var(--cy-yellow) 30%, transparent),
              inset 0 -9px 22px -14px rgba(0, 229, 255, .60);
}
body button:not(:disabled):not([aria-disabled="true"]):hover {
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--cy-cyan) 45%, transparent);
}
body nav button:hover,
body [class*="iconButton"]:hover {
  color: var(--cy-yellow) !important;
}

/* ── 6c. brand buttons (send / primary CTA) ────────────────── */
body button[class*="_primary"]:not(:disabled):not([aria-disabled="true"]) {
  background-color: var(--cy-yellow) !important;
  color: var(--cy-ink) !important;
  border-color: var(--cy-yellow) !important;
  border-radius: 0 !important;
  clip-path: var(--cp-cut-br);
  box-shadow: 0 0 0 1px rgba(252, 238, 10, .30),
              0 0 16px rgba(252, 238, 10, .28) !important;
  transition: background-color .16s ease, box-shadow .16s ease, transform .12s ease;
}
body button[class*="_primary"]:not(:disabled):not([aria-disabled="true"]):hover {
  background-color: #FFF03D !important;
  box-shadow: 0 0 0 1px rgba(252, 238, 10, .55),
              0 0 26px rgba(252, 238, 10, .48) !important;
}
body button[class*="_primary"]:not(:disabled):not([aria-disabled="true"]):active {
  transform: translateY(1px);
}
body button[class*="_primary"]:disabled,
body button[class*="_primary"][aria-disabled="true"] {
  background-color: var(--dsw-alias-fill-l2) !important;
  color: var(--dsw-alias-label-dimmed) !important;
  border-color: var(--dsw-alias-border-l2) !important;
  box-shadow: none !important;
  clip-path: none;
}

/* ── 6d. sidebar session rows ──────────────────────────────── */
body [class*="sessionRow"] {
  position: relative;
  border-radius: 0 !important;
  transition: background-color .12s ease;
}
body [class*="sessionRow"]::before {
  content: "";
  position: absolute;
  left: 0;
  top: 4px;
  bottom: 4px;
  width: 2px;
  background: var(--cy-yellow);
  opacity: 0;
  transition: opacity .12s ease, box-shadow .12s ease;
  pointer-events: none;
}
body [class*="sessionRow"]:hover::before {
  opacity: .75;
}
body [class*="sessionRow"]:hover {
  background-color: var(--dsw-alias-interactive-bg-hover) !important;
}
body [class*="sessionRow"][aria-selected="true"]::before {
  opacity: 1;
  width: 3px;
  box-shadow: 0 0 12px var(--cp-rail-soft);
}
body [class*="sessionRow"][aria-selected="true"] {
  background-color: var(--dsw-alias-interactive-bg-active) !important;
}
body [class*="sessionRow"] [class*="title"] {
  letter-spacing: .005em;
}

/* ── 6e. side rail ─────────────────────────────────────────── */
body[data-ds-dark-theme] [class*="sidebar"] {
  box-shadow: inset -1px 0 0 color-mix(in srgb, var(--cy-cyan) 22%, transparent),
              inset -12px 0 26px -24px rgba(0, 229, 255, .55);
}

/* ── 6f. user message bubble ───────────────────────────────── */
body [class*="_bubble"] {
  border-radius: 0 !important;
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--cy-yellow) 14%, transparent) 0%, transparent 46%),
    var(--dsw-specific-bubble) !important;
  box-shadow: inset 2px 0 0 var(--cy-yellow),
              0 0 0 1px color-mix(in srgb, var(--dsw-alias-border-l2) 70%, transparent) !important;
  clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
}

/* ── 7. floating panels ────────────────────────────────────── */
body [data-menu-material] {
  border: 1px solid var(--dsw-alias-border-l3) !important;
  border-radius: 0 !important;
  box-shadow: 0 6px 24px rgba(4, 3, 8, .42);
}

/* ── 8. keycaps ────────────────────────────────────────────────
   DSH renders every token of a shortcut as its own kbd, including the "+"
   separators. Boxing each one turned "Ctrl + Alt + N" into five competing
   tiles in every hint row, so the keycaps read as quiet mono text instead. */
body kbd {
  background: transparent !important;
  background-image: none !important;
  color: var(--cy-yellow) !important;
  border: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  font-family: var(--dsh-font-family-code) !important;
  font-size: 11px !important;
  font-weight: 600 !important;
  letter-spacing: .04em !important;
  padding: 0 1px !important;
  min-width: 0 !important;
}
body:not([data-ds-dark-theme]) kbd {
  color: #7A5C00 !important;
}

/* ── 9. scrollbars ─────────────────────────────────────────── */
body ::-webkit-scrollbar { width: 10px; height: 10px; }
body ::-webkit-scrollbar-track { background: transparent; }
body ::-webkit-scrollbar-thumb { background: var(--dsw-alias-scrollbar-bg-l2); border-radius: 0; }
body ::-webkit-scrollbar-thumb:hover { background: var(--cy-yellow); }
body ::-webkit-scrollbar-corner { background: transparent; }

/* ── 10. neon overlay ──────────────────────────────────────── */
.cp2077-layer {
  display: block;
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 2147482000;
}
.cp2077-layer::before {
  content: "";
  position: absolute;
  left: 0; right: 0; top: 0;
  height: 2px;
  background: linear-gradient(90deg, #FCEE0A 0%, #FCEE0A 30%, transparent 30%, transparent 31%, #FF003C 31%, #FF003C 34%, transparent 34%, transparent 35%, #00E5FF 35%, #00E5FF 100%);
  opacity: .72;
}
.cp2077-scan,
.cp2077-beam,
.cp2077-floor,
.cp2077-horizon {
  display: none;
}
body[data-ds-dark-theme] .cp2077-scan,
body[data-ds-dark-theme] .cp2077-beam,
body[data-ds-dark-theme] .cp2077-floor,
body[data-ds-dark-theme] .cp2077-horizon {
  display: block;
}
.cp2077-scan {
  position: absolute;
  inset: -12%;
  background-image: repeating-linear-gradient(0deg, rgba(0, 229, 255, calc(.022 * var(--cp-opt-scan))) 0 1px, transparent 1px 3px);
}
.cp2077-grid {
  position: absolute;
  inset: 0;
  height: 100vh;
  background-image:
    linear-gradient(var(--cp-grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--cp-grid-line) 1px, transparent 1px);
  background-size: 56px 56px;
  -webkit-mask-image: linear-gradient(180deg, #000 0%, rgba(0, 0, 0, .50) 34%, transparent 64%);
  mask-image: linear-gradient(180deg, #000 0%, rgba(0, 0, 0, .50) 34%, transparent 64%);
}
.cp2077-floor {
  position: absolute;
  left: -22%;
  right: -22%;
  bottom: 0;
  height: 16vh;
  background-image:
    linear-gradient(var(--cp-floor-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--cp-floor-line) 1px, transparent 1px);
  background-size: 64px 64px;
  transform: perspective(280px) rotateX(72deg);
  transform-origin: bottom center;
  -webkit-mask-image: linear-gradient(0deg, rgba(0, 0, 0, .85) 0%, rgba(0, 0, 0, .40) 42%, transparent 88%);
  mask-image: linear-gradient(0deg, rgba(0, 0, 0, .85) 0%, rgba(0, 0, 0, .40) 42%, transparent 88%);
  opacity: .55;
}
/* horizon removed in 1.2.1: the 1px line cut across the composer */
.cp2077-hud {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: .42;
}
body:not([data-ds-dark-theme]) .cp2077-hud {
  opacity: .30;
}
.cp2077-hud::before {
  content: "";
  position: absolute;
  top: 12px; left: 12px; right: 12px; bottom: 12px;
  background:
    linear-gradient(var(--cp-hud-deco), var(--cp-hud-deco)) left top / 22px 1px no-repeat,
    linear-gradient(var(--cp-hud-deco), var(--cp-hud-deco)) left top / 1px 22px no-repeat,
    linear-gradient(var(--cp-hud-deco), var(--cp-hud-deco)) right top / 22px 1px no-repeat,
    linear-gradient(var(--cp-hud-deco), var(--cp-hud-deco)) right top / 1px 22px no-repeat,
    linear-gradient(var(--cp-hud-deco), var(--cp-hud-deco)) left bottom / 22px 1px no-repeat,
    linear-gradient(var(--cp-hud-deco), var(--cp-hud-deco)) left bottom / 1px 22px no-repeat,
    linear-gradient(var(--cp-hud-deco), var(--cp-hud-deco)) right bottom / 22px 1px no-repeat,
    linear-gradient(var(--cp-hud-deco), var(--cp-hud-deco)) right bottom / 1px 22px no-repeat;
}
.cp2077-beam {
  position: absolute;
  left: 0; right: 0;
  top: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(0, 229, 255, .22) 30%, rgba(0, 229, 255, .30) 50%, rgba(0, 229, 255, .22) 70%, transparent 100%);
  box-shadow: 0 0 6px rgba(0, 229, 255, .10);
  opacity: 0;
  animation: cp2077-beam 32s cubic-bezier(.45, 0, .55, 1) infinite;
  animation-delay: 6s;
}
@keyframes cp2077-scan { to { background-position: 0 3px; } }
@keyframes cp2077-beam {
  0%   { transform: translateY(-4px); opacity: 0; }
  2%   { opacity: .9; }
  20%  { opacity: .9; }
  22%  { transform: translateY(100vh); opacity: 0; }
  100% { transform: translateY(100vh); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .cp2077-layer { display: none !important; }
}

/* ── 11. v1.2 research pass: poster + in-game menu language ── */
/* hazard tag on the active session rail (2077 key-art yellow/black) */
body[data-ds-dark-theme] [class*="sessionRow"][aria-selected="true"]::after {
  content: "";
  position: absolute;
  right: 6px; top: 50%;
  width: 14px; height: 4px;
  margin-top: -2px;
  background: var(--cp-hazard);
  opacity: .55;
  pointer-events: none;
}
/* tables: in-game list header = red tick */
body th:first-child { box-shadow: inset 2px 0 0 var(--cp-hud-deco); }
/* blockquote reads like a shard/datapad entry */
body blockquote { position: relative; }
body[data-ds-dark-theme] blockquote::before {
  content: "// DATA";
  display: block;
  font: 600 10px/1.6 var(--dsh-font-family-code);
  letter-spacing: .18em;
  color: var(--cy-cyan);
  opacity: .7;
}
/* primary hover: no glitch animation. The composer primary button becomes the
   stop control while a turn streams, and React re-renders it per chunk — any
   animation there restarts constantly and reads as flicker. */
/* inline code: Edgerunners pink for contrast against yellow */
body[data-ds-dark-theme] code:not(pre code) { color: #FF5FA8; }
@media (prefers-reduced-motion: reduce) {
  body button[class*="_primary"] { animation: none !important; }
}


/* ── 12. composer strip: no hard edge above the input ────── */
body [data-composer-seat] {
  background: linear-gradient(180deg, transparent 0px,
    color-mix(in srgb, var(--dsw-alias-bg-base) 34%, transparent) 46px,
    color-mix(in srgb, var(--dsw-alias-bg-base) 74%, transparent) 92px,
    var(--dsw-alias-bg-base) 132px) !important;
}


/* ── 13. turn process rollup: kill the stray .5px divider ─── */
/* DSH draws border-bottom:.5px on the "duration" disclosure button;
   users read that full-width hairline as a bar covering the composer. */
body button:has([class*="durationNumber"]) {
  border-bottom-color: transparent !important;
}
body button:has([class*="durationNumber"]) [class*="label"] {
  font-family: var(--dsh-font-family-code);
  letter-spacing: .02em;
}


/* ── 14. running indicator divider = the stray line ──────── */
/* ui-chat ChatView .runningDivider: a 100%-wide .5px bar sitting right
   above the "深度求索中，用时 …" row, which reads as a line covering the composer. */
[class*="runningDivider"] {
  display: none !important;
}
[class*="running"] > [class*="runningContent"] {
  opacity: .92;
}


/* ── 15. light-mode calibration ─────────────────────────────── */
/* Light token --cy-yellow is #8A6400 (muddy brown-gold) so the send
   button read as dirty brass instead of the 2077 poster yellow. */
body { --cy-yellow-fill: #F9E300; }
body[data-ds-dark-theme] { --cy-yellow-fill: #FCEE0A; }

/* light paper: stronger grid so the backdrop is not blank */
:root { --cp-grid-line: rgba(0, 110, 130, .095); }

body button[class*="_primary"]:not(:disabled):not([aria-disabled="true"]) {
  background-color: var(--cy-yellow-fill) !important;
  color: #0A0910 !important;
  border-color: #0A0910 !important;
}
body:not([data-ds-dark-theme]) button[class*="_primary"]:not(:disabled):not([aria-disabled="true"]) {
  border: 1px solid #0A0910 !important;
  box-shadow: 2px 2px 0 0 rgba(10, 9, 16, .85) !important;
}
body:not([data-ds-dark-theme]) button[class*="_primary"]:not(:disabled):not([aria-disabled="true"]):hover {
  background-color: #FFEE35 !important;
  box-shadow: 3px 3px 0 0 rgba(10, 9, 16, .90) !important;
}

/* top neon rule: on paper white a 2px tri-colour ribbon reads as a stripe
   across the tab bar, so light mode gets a 1px hairline without the yellow */
body:not([data-ds-dark-theme]) .cp2077-layer::before {
  height: 1px;
  opacity: .34;
  background: linear-gradient(90deg,
    #007A8C 0%, #007A8C 10%, transparent 10%, transparent 62%,
    #C4123F 62%, #C4123F 64%, transparent 64%, transparent 90%,
    #007A8C 90%, #007A8C 100%);
}

body:not([data-ds-dark-theme]) .cp2077-grid {
  background-size: 48px 48px;
  -webkit-mask-image: linear-gradient(180deg, #000 0%, rgba(0, 0, 0, .40) 30%, transparent 58%);
  mask-image: linear-gradient(180deg, #000 0%, rgba(0, 0, 0, .40) 30%, transparent 58%);
}

/* ── 16. composer card: chamfered corners + edge accent ──── */
body {
  --cp-cut-accent: #C9A200;
}
body[data-ds-dark-theme] {
  --cp-cut-accent: var(--cy-yellow);
}

body [data-composer-seat] [class*="_card"]:not([class*="Workspace"]),
body [data-slot*="input.dock"] [class*="_card"]:not([class*="Workspace"]) {
  border-radius: 0 !important;
  clip-path: polygon(
    var(--cp-chamfer) 0,
    100% 0,
    100% calc(100% - var(--cp-chamfer)),
    calc(100% - var(--cp-chamfer)) 100%,
    0 100%,
    0 var(--cp-chamfer)
  );
  background-color: var(--dsw-specific-input-major) !important;
  background-image:
    linear-gradient(135deg,
      transparent calc(50% - .9px),
      var(--cp-cut-accent) calc(50% - .9px),
      var(--cp-cut-accent) calc(50% + .9px),
      transparent calc(50% + .9px)),
    linear-gradient(135deg,
      transparent calc(50% - .9px),
      var(--cp-cut-accent) calc(50% - .9px),
      var(--cp-cut-accent) calc(50% + .9px),
      transparent calc(50% + .9px));
  background-position: left top, right bottom;
  background-size:
    calc(var(--cp-chamfer) * 1.3) calc(var(--cp-chamfer) * 1.3),
    calc(var(--cp-chamfer) * 1.5) calc(var(--cp-chamfer) * 1.5);
  background-repeat: no-repeat;
  box-shadow: inset 0 0 0 1px var(--dsw-alias-border-l2) !important;
}

body[data-ds-dark-theme] [data-composer-seat] [class*="_card"]:not([class*="Workspace"]),
body[data-ds-dark-theme] [data-slot*="input.dock"] [class*="_card"]:not([class*="Workspace"]) {
  box-shadow:
    inset 0 0 0 1px color-mix(in srgb, var(--cy-cyan) 30%, transparent),
    0 0 26px rgba(0, 229, 255, .10) !important;
}

body:not([data-ds-dark-theme]) [data-composer-seat] [class*="_card"]:not([class*="Workspace"]),
body:not([data-ds-dark-theme]) [data-slot*="input.dock"] [class*="_card"]:not([class*="Workspace"]) {
  box-shadow:
    inset 0 0 0 1px rgba(10, 9, 16, .22),
    2px 2px 0 0 rgba(10, 9, 16, .10) !important;
}
/* ── 17. horizon glow: removed ───────────────────────────────
   用户连续两轮反馈城市与地平线都干扰阅读，对话区回到完全干净的背景。
   氛围改由不占正文的位置承担：网格、四角角标、顶部渐变条、32s 一次的细扫光。 */

/* ── 18. sidebar brand: cyberpunk treatment ───────────────── */
[class*="brandIdentity"] {
  position: relative;
  padding-left: 8px;
}

[class*="brandIdentity"]::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  width: 3px;
  height: 24px;
  transform: translateY(-50%);
  background: var(--cy-yellow);
  clip-path: polygon(0 0, 100% 5px, 100% 100%, 0 calc(100% - 5px));
  box-shadow: 0 0 10px rgba(252, 238, 10, .55);
}

[class*="brandMark"] svg,
[class*="railMark"] svg {
  color: var(--cy-cyan) !important;
  filter: drop-shadow(0 0 5px rgba(0, 229, 255, .6));
  transition: filter .18s ease;
}

[class*="brandName"] svg {
  filter:
    drop-shadow(-1.1px 0 0 rgba(255, 0, 60, .42))
    drop-shadow(1.1px 0 0 rgba(0, 229, 255, .40));
  transition: filter .18s ease;
}

[class*="brandIdentity"] {
  transition: background .18s ease;
}

[class*="brandIdentity"]::after {
  content: "";
  position: absolute;
  inset: -2px -4px;
  pointer-events: none;
  background: repeating-linear-gradient(0deg, rgba(6, 5, 12, .34) 0 1px, transparent 1px 3px);
  opacity: .55;
}

[class*="logoRow"]:hover [class*="brandIdentity"] {
  background: rgba(252, 238, 10, .06);
}

[class*="logoRow"]:hover [class*="brandMark"] svg,
[class*="logoRow"]:hover [class*="railMark"] svg {
  filter: drop-shadow(0 0 9px rgba(0, 229, 255, .95));
}

[class*="logoRow"]:hover [class*="brandName"] svg {
  filter:
    drop-shadow(-1.2px 0 0 rgba(255, 0, 60, .6))
    drop-shadow(1.2px 0 0 rgba(0, 229, 255, .58))
    drop-shadow(0 0 7px rgba(252, 238, 10, .3));
}

body:not([data-ds-dark-theme]) [class*="brandName"] svg {
  filter: none;
}

body:not([data-ds-dark-theme]) [class*="brandMark"] svg,
body:not([data-ds-dark-theme]) [class*="railMark"] svg {
  color: var(--cy-cyan) !important;
  filter: none;
}

/* ── 18b. brand motion: live glitch + breathing mark ──────── */
@keyframes cp2077-brand-scan {
  0%, 39.7% { opacity: .55; }
  40%, 45%  { opacity: .10; }
  45.1%, 65.7% { opacity: .55; }
  66%, 71%  { opacity: .10; }
  71.1%, 100% { opacity: .55; }
}

@keyframes cp2077-mark-breathe {
  0%, 100% { filter: drop-shadow(0 0 4px rgba(0, 229, 255, .45)); }
  50%      { filter: drop-shadow(0 0 11px rgba(0, 229, 255, .95)); }
}

/* 常驻：与 SVG filter 的 6s 周期同拍，只在撕裂帧上补一点整体平移 */
@keyframes cp2077-brand-live {
  0%, 39.7% { transform: translate3d(0, 0, 0); }
  40%       { transform: translate3d(-1.3px, 0, 0); }
  41.6%     { transform: translate3d(1.5px, 0, 0); }
  43.2%     { transform: translate3d(-.6px, 0, 0); }
  45%       { transform: translate3d(0, 0, 0); }
  65.7%     { transform: translate3d(0, 0, 0); }
  66%       { transform: translate3d(1.2px, 0, 0); }
  67.6%     { transform: translate3d(-1.4px, 0, 0); }
  69.2%     { transform: translate3d(.5px, 0, 0); }
  71%       { transform: translate3d(0, 0, 0); }
  100%      { transform: translate3d(0, 0, 0); }
}

[class*="brandMark"] svg,
[class*="railMark"] svg {
  animation: cp2077-mark-breathe 6.5s ease-in-out infinite;
}

/* 暗色下给 wordmark 挂像素级撕裂 filter：feTurbulence 的横向条带，
   由 feDisplacementMap 把每一行像素横向推开，字号不变、笔画内部错位 */
body[data-ds-dark-theme] [class*="brandName"] svg {
  filter: url(#cp2077-glitch)
          drop-shadow(-1.1px 0 0 rgba(255, 0, 60, .42))
          drop-shadow(1.1px 0 0 rgba(0, 229, 255, .40));
  animation: cp2077-brand-live 6s steps(1, end) infinite;
  will-change: transform;
}

/* 关闭动作时回退成纯色差：不能让元素继续引用不存在的 filter */
html[data-cp2077-glitch="off"] body[data-ds-dark-theme] [class*="brandName"] svg {
  filter: drop-shadow(-1.1px 0 0 rgba(255, 0, 60, .42))
          drop-shadow(1.1px 0 0 rgba(0, 229, 255, .40));
  animation: none;
  will-change: auto;
}

[class*="logoRow"]:hover [class*="brandMark"] svg,
[class*="logoRow"]:hover [class*="railMark"] svg {
  animation: none;
  filter: drop-shadow(0 0 9px rgba(0, 229, 255, .95));
}

body:not([data-ds-dark-theme]) [class*="brandMark"] svg,
body:not([data-ds-dark-theme]) [class*="railMark"] svg {
  animation: none;
  filter: none;
}

@media (prefers-reduced-motion: reduce) {
  [class*="brandMark"] svg,
  [class*="railMark"] svg,
  body[data-ds-dark-theme] [class*="brandName"] svg {
    animation: none !important;
  }
}

/* ── 20. motion master switch ──────────────────────────────── */
/* The panel writes data-cp2077-motion="off" to opt out of every looping
   animation at once; the glitch filter has its own attribute so it can also
   be disabled on its own for performance. */
html[data-cp2077-motion="off"] .cp2077-beam,
html[data-cp2077-motion="off"] .cp2077-hud,
html[data-cp2077-motion="off"] .cp2077-layer::before,
html[data-cp2077-motion="off"] [class*="brandIdentity"]::after,
html[data-cp2077-motion="off"] [class*="brandMark"] svg,
html[data-cp2077-motion="off"] [class*="railMark"] svg,
html[data-cp2077-motion="off"] [class*="brandName"] svg {
  animation: none !important;
}

html[data-cp2077-motion="off"] body[data-ds-dark-theme] [class*="brandName"] svg {
  filter: drop-shadow(-1.1px 0 0 rgba(255, 0, 60, .42))
          drop-shadow(1.1px 0 0 rgba(0, 229, 255, .40)) !important;
  will-change: auto;
}
/* ── 21. settings panel ──────────────────────────────────── */
/* Rendered into the host's settings.section slot. Every selector is a real
   class, so it outranks the generic body button / body input rules. */
.cp2077-panel {
  display: flex;
  flex-direction: column;
  max-width: 620px;
  font-family: var(--dsh-font-family-text);
}

.cp2077-panel-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 10px;
  margin-bottom: 2px;
  border-bottom: 1px solid var(--dsw-alias-border-l2);
}

.cp2077-panel-title {
  font-family: var(--dsw-font-family-brand);
  font-size: 12px;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--cy-yellow);
}

.cp2077-panel-ver {
  font-family: var(--dsh-font-family-code);
  font-size: 11px;
  letter-spacing: .06em;
  color: var(--dsw-alias-label-tertiary);
}

.cp2077-row {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 13px 0;
  border-bottom: 1px dashed color-mix(in srgb, var(--dsw-alias-border-l2) 55%, transparent);
}

.cp2077-row:last-of-type {
  border-bottom: 0;
}

.cp2077-row-text {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.cp2077-row-label {
  font-size: 13px;
  line-height: 1.35;
  color: var(--dsw-alias-label-primary);
}

.cp2077-row-hint {
  font-size: 11.5px;
  line-height: 1.45;
  color: var(--dsw-alias-label-tertiary);
}

.cp2077-row-control {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 150px;
}

.cp2077-slider {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cp2077-row-value {
  min-width: 44px;
  text-align: right;
  font-family: var(--dsh-font-family-code);
  font-size: 11.5px;
  color: var(--cy-cyan);
}

.cp2077-range {
  appearance: none;
  -webkit-appearance: none;
  width: 132px;
  height: 3px;
  background: color-mix(in srgb, var(--cy-cyan) 26%, transparent);
  outline: none;
  cursor: pointer;
}

.cp2077-range::-webkit-slider-thumb {
  appearance: none;
  -webkit-appearance: none;
  width: 12px;
  height: 16px;
  background: var(--cy-yellow-fill);
  border: 1px solid var(--cy-ink);
  clip-path: polygon(0 0, 100% 4px, 100% 100%, 0 calc(100% - 4px));
  box-shadow: 0 0 8px color-mix(in srgb, var(--cy-yellow-fill) 45%, transparent);
}

.cp2077-switch {
  appearance: none;
  -webkit-appearance: none;
  position: relative;
  width: 40px;
  height: 20px;
  margin: 0;
  border: 1px solid var(--dsw-alias-border-l2);
  background: var(--dsw-alias-bg-layer-3);
  cursor: pointer;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%);
  transition: background .14s ease, border-color .14s ease;
}

.cp2077-switch::after {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  width: 12px;
  height: 12px;
  background: var(--dsw-alias-label-tertiary);
  transition: left .14s ease, background .14s ease;
}

.cp2077-switch:checked {
  background: var(--cy-yellow-fill);
  border-color: var(--cy-yellow-fill);
}

.cp2077-switch:checked::after {
  left: calc(100% - 15px);
  background: var(--cy-ink);
}

.cp2077-switch:focus-visible {
  outline: 2px solid var(--dsw-focus-ring-color);
  outline-offset: 2px;
}

.cp2077-panel-foot {
  display: flex;
  justify-content: flex-end;
  padding-top: 14px;
  margin-top: 4px;
}

.cp2077-reset {
  font-family: var(--dsh-font-family-text);
  font-size: 12px;
  letter-spacing: .1em;
  padding: 7px 16px;
  color: var(--dsw-alias-label-secondary);
  background: transparent;
  border: 1px solid var(--dsw-alias-border-l2);
  cursor: pointer;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%);
  transition: color .14s ease, border-color .14s ease, background .14s ease;
}

.cp2077-reset:hover {
  color: var(--cy-yellow);
  border-color: var(--cy-yellow);
  background: color-mix(in srgb, var(--cy-yellow) 8%, transparent);
}

/* ── 22. wallpaper backdrop ─────────────────────────────── */
.cp2077-wallpaper {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  display: none;
  background-color: transparent;
}
html[data-cp2077-wallpaper="on"] .cp2077-wallpaper { display: block; }

/* the backdrop image is painted on the container itself (see section 25);
   an extra blurred pseudo-element here only served to soften it */

/* veil keeps body copy readable over a bright wallpaper */
.cp2077-wallpaper::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(10, 9, 16, .08), rgba(10, 9, 16, .26));
}
body:not([data-ds-dark-theme]) .cp2077-wallpaper::after {
  background: linear-gradient(180deg, rgba(239, 235, 225, .10), rgba(239, 235, 225, .26));
}

/* picker controls */
.cp2077-row-block {
  flex-direction: column;
  align-items: stretch !important;
  gap: 8px;
}
.cp2077-row-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}
.cp2077-row-pick {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.cp2077-select {
  -webkit-appearance: none;
  appearance: none;
  min-width: 210px;
  max-width: 280px;
  padding: 7px 11px;
  background-color: var(--dsw-alias-bg-layer-3);
  color: var(--dsw-alias-label-primary);
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 0;
  clip-path: var(--cp-cut-br);
  font: inherit;
  font-size: 12px;
}
.cp2077-select:focus-visible {
  outline: none;
  box-shadow: inset 0 0 0 1px var(--cy-cyan);
}
.cp2077-wallpaper-preview {
  display: block;
  width: 220px;
  height: 124px;
  object-fit: cover;
  border: 1px solid var(--dsw-alias-border-l2);
}
.cp2077-row-note {
  font-size: 11px;
  color: var(--dsw-alias-label-tertiary);
  letter-spacing: .02em;
}

/* ── 23. lay the shell open so the wallpaper shows through ─── */
/* .pI_x6G_frame / _centerCol / _rightbarCol / _bottomRow / .wSkVaW_root
   all paint an opaque --dsw-alias-bg-base, which used to hide the body
   background completely. Clearing them lets the veiled wallpaper show. */
body > #root,
body [class*="_frame"],
body [class*="centerCol"],
body [class*="rightbarCol"],
body [class*="bottomRow"],
body [class*="embeddedBody"],
body [class*="_page"] {
  background: transparent !important;
  background-color: transparent !important;
}

/* 23b */
body [class*="centerCol"] > [class*="_root"],
body [class*="centerCol"] > [class*="_root"] > [class*="scrollBody"],
body [class*="centerCol"] > [class*="_root"] > [class*="content"] {
  background: transparent !important;
  background-color: transparent !important;
}

/* ── 24. video wallpaper layer ─────────────────────────────── */
/* A <video> is injected as the first child of the backdrop host and put
   behind the content with a negative z-index inside an isolated stacking
   context, so it paints over the host background but under every child. */
.cp2077-wallpaper-video {
  /* absolute inside the anchored chat column: fixed would resolve against a
     transformed ancestor (the shell applies page-level transforms) and land
     in the wrong place, and it would also escape the column and cover the sidebar. */
  position: absolute !important;
  inset: 0 !important;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  z-index: -1 !important;
  pointer-events: none !important;
  /* Deliberately no fill: while the clip is still buffering this element
     must stay transparent so the static cover painted on the host shows
     through instead of a black plate. */
  background: transparent !important;
}
.cp2077-wallpaper-veil {
  position: absolute !important;
  inset: 0 !important;
  z-index: -1 !important;
  pointer-events: none !important;
  background: linear-gradient(180deg, rgba(10,9,16,.46), rgba(10,9,16,.78));
  /* Held back until the clip renders its first frame, so a slow 100MB+
     video never turns the whole column into a black plate. */
  opacity: 0;
  transition: opacity .45s ease;
}
body:not([data-ds-dark-theme]) .cp2077-wallpaper-veil {
  background: linear-gradient(180deg, rgba(239,235,225,.66), rgba(239,235,225,.84));
}
.cp2077-wallpaper-motion {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--dsw-alias-label-secondary);
}

/* ── 25. wallpaper: a fixed layer under a translucent shell ─── */
html,
body {
  background: transparent !important;
  background-image: none !important;
}
.cp2077-wallpaper {
  position: fixed;
  inset: 0;
  z-index: -1;
  display: none;
  pointer-events: none;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}
html[data-cp2077-wallpaper="on"] .cp2077-wallpaper {
  display: block;
}
.cp2077-wallpaper::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(10, 9, 16, .24), rgba(10, 9, 16, .52));
}
body:not([data-ds-dark-theme]) .cp2077-wallpaper::after {
  background: linear-gradient(180deg, rgba(239, 235, 225, .26), rgba(239, 235, 225, .56));
}
/* ── 26. keep the wallpaper sharp under dialogs and menus ───── */
/* the settings mask ships backdrop-filter: blur(10px); over a photo backdrop
   that reads as 'the wallpaper went blurry', so swap blur for a heavy scrim */
body {
  --dsw-mask-blur: none;
  /* keep a real blur on floating glass surfaces (session search, workspace
     peek): with the wash token translucent, dropping the blur entirely let the
     list behind them read straight through the panel. */
  --dsw-menu-backdrop-filter: blur(20px) saturate(140%);
  --dsw-alias-bg-mask-drop: rgba(10, 9, 16, .82);
}
body:not([data-ds-dark-theme]) {
  --dsw-alias-bg-mask-drop: rgba(239, 235, 225, .88);
}
body [class*="_mask"],
body [class*="mask"] {
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}
/* ── 27. wallpaper picker ──────────────────────────────────── */
.cp2077-search {
  box-sizing: border-box;
  width: 100%;
  margin: 10px 0 12px;
  padding: 7px 10px;
  font: inherit;
  font-size: 12px;
  color: var(--dsw-alias-label-primary);
  background-color: rgba(255, 255, 255, .04);
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 0;
  clip-path: var(--cp-cut-br);
  outline: none;
}
body:not([data-ds-dark-theme]) .cp2077-search {
  background-color: rgba(10, 9, 16, .04);
}
.cp2077-search::placeholder { color: var(--dsw-alias-label-tertiary); }
.cp2077-search:focus { border-color: var(--cp-cut-accent); }

.cp2077-row-block .cp2077-wallpaper-grid { margin-top: 2px; }
.cp2077-wallpaper-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(112px, 1fr));
  gap: 8px;
  max-height: 352px;
  overflow-y: auto;
  padding: 2px;
}
.cp2077-wallpaper-thumb {
  position: relative;
  display: block;
  padding: 0;
  margin: 0;
  height: 76px;
  overflow: hidden;
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 0;
  background-color: rgba(255, 255, 255, .04);
  cursor: pointer;
  transition: border-color .12s ease, transform .12s ease;
}
.cp2077-wallpaper-thumb img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.cp2077-wallpaper-thumb:hover {
  border-color: var(--cp-cut-accent);
  transform: translateY(-1px);
}
.cp2077-wallpaper-thumb.is-active {
  border-color: var(--cp-cut-accent);
  box-shadow: inset 0 0 0 1px var(--cp-cut-accent), 0 0 14px rgba(252, 238, 10, .26);
}
.cp2077-thumb-tag {
  position: absolute;
  top: 3px;
  left: 3px;
  padding: 1px 4px;
  font-size: 9px;
  letter-spacing: .06em;
  color: #0A0910;
  background: var(--cp-cut-accent);
}
.cp2077-thumb-title {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 12px 5px 3px;
  font-size: 10px;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #F2F0E6;
  background: linear-gradient(180deg, transparent, rgba(10, 9, 16, .88));
}

/* block rows own the full width so the picker grid can breathe */
.cp2077-row-block > * {
  width: 100%;
}
.cp2077-wallpaper-grid {
  width: 100%;
}

/* the picker row stacks: label above, grid across the full width */
.cp2077-row:has(.cp2077-wallpaper-grid) {
  flex-direction: column;
  align-items: stretch;
  gap: 10px;
}
.cp2077-row:has(.cp2077-wallpaper-grid) .cp2077-row-text {
  width: 100%;
}
.cp2077-row:has(.cp2077-wallpaper-grid) .cp2077-row-body {
  width: 100%;
}
.cp2077-wallpaper-grid {
  grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
}

/* ── 28. wallpaper mode: keep the photo, keep the text readable ── */
/* A photo backdrop is far busier than a flat surface, so in wallpaper
   mode the decorative layer steps back and the reading layer steps up. */
html[data-cp2077-wallpaper="on"] .cp2077-grid { opacity: .38; }
html[data-cp2077-wallpaper="on"] .cp2077-scan { opacity: .40; }
html[data-cp2077-wallpaper="on"] .cp2077-floor { opacity: .20; }
html[data-cp2077-wallpaper="on"] .cp2077-beam { opacity: .50; }
html[data-cp2077-wallpaper="on"] .cp2077-hud { opacity: .46; }

/* vignette toward the middle: darkens where the prose sits, keeps the
   edges of the photo clean so it still reads as a photograph */
html[data-cp2077-wallpaper="on"] .cp2077-wallpaper::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(130% 80% at 50% 44%, rgba(10, 9, 16, .42), rgba(10, 9, 16, .12) 64%, rgba(10, 9, 16, 0) 84%);
}
body:not([data-ds-dark-theme]) html[data-cp2077-wallpaper="on"] .cp2077-wallpaper::before,
html[data-cp2077-wallpaper="on"] body:not([data-ds-dark-theme]) .cp2077-wallpaper::before {
  background: radial-gradient(130% 80% at 50% 44%, rgba(239, 235, 225, .46), rgba(239, 235, 225, .16) 64%, rgba(239, 235, 225, 0) 84%);
}

/* text shadows are the cheapest way to hold contrast over arbitrary photos;
   they inherit, so one rule covers prose, tables and list markers alike */
html[data-cp2077-wallpaper="on"] [class*="centerCol"] {
  text-shadow: 0 1px 2px rgba(0, 0, 0, .58), 0 0 12px rgba(0, 0, 0, .34);
}
html[data-cp2077-wallpaper="on"] body:not([data-ds-dark-theme]) [class*="centerCol"] {
  text-shadow: 0 1px 2px rgba(255, 255, 255, .92), 0 0 12px rgba(255, 255, 255, .60);
}
html[data-cp2077-wallpaper="on"] .cp2077-wallpaper { filter: saturate(1.02); }

/* solid surfaces stay solid: the composer and code blocks must not turn
   into windows onto the photo, or the input caret disappears into it */
html[data-cp2077-wallpaper="on"] [data-slot*="input.dock"] [class*="_card"] {
  background-color: rgba(10, 9, 16, .88) !important;
}
html[data-cp2077-wallpaper="on"] body:not([data-ds-dark-theme]) [data-slot*="input.dock"] [class*="_card"] {
  background-color: rgba(250, 247, 240, .93) !important;
}
html[data-cp2077-wallpaper="on"] body pre {
  background-color: rgba(6, 5, 12, .84) !important;
}
html[data-cp2077-wallpaper="on"] body:not([data-ds-dark-theme]) pre {
  background-color: rgba(255, 255, 255, .95) !important;
}
html[data-cp2077-wallpaper="on"] body [class*="_bubble"] {
  box-shadow: 0 2px 14px rgba(0, 0, 0, .42);
}
html[data-cp2077-wallpaper="on"] body table th {
  background-color: rgba(10, 9, 16, .72);
}
html[data-cp2077-wallpaper="on"] body:not([data-ds-dark-theme]) table th {
  background-color: rgba(244, 240, 230, .92);
}

html[data-cp2077-wallpaper="on"] .cp2077-wallpaper { filter: none !important; }

/* ── 29. wallpaper on the canvas ─────────────────────────────
   Painting the photo on a negative-z-index child proved fragile: what shows
   through depends on how many ancestors decided to paint an opaque fill and
   on which of them opened a stacking context. The document canvas is the one
   surface that is always behind everything, so the photo goes there instead.
   body carries it and, because html stays transparent, CSS propagates the
   body background to the canvas. */
html[data-cp2077-wallpaper="on"] body {
  background-color: #0A0910 !important;
  background-image:
    radial-gradient(130% 80% at 50% 44%, rgba(10, 9, 16, .42), rgba(10, 9, 16, .12) 64%, rgba(10, 9, 16, 0) 84%),
    linear-gradient(180deg, rgba(10, 9, 16, .22), rgba(10, 9, 16, .52)),
    var(--cp-wallpaper-image, none) !important;
  background-size: auto, auto, cover !important;
  background-position: center center, center center, center center !important;
  background-repeat: no-repeat, no-repeat, no-repeat !important;
  background-attachment: fixed, fixed, fixed !important;
}
html[data-cp2077-wallpaper="on"] body:not([data-ds-dark-theme]) {
  background-color: #EFEBE1 !important;
  background-image:
    radial-gradient(130% 80% at 50% 44%, rgba(239, 235, 225, .54), rgba(239, 235, 225, .18) 64%, rgba(239, 235, 225, 0) 84%),
    linear-gradient(180deg, rgba(239, 235, 225, .32), rgba(239, 235, 225, .62)),
    var(--cp-wallpaper-image, none) !important;
}
/* the old holder div stays in the DOM only for cleanup compatibility */
html[data-cp2077-wallpaper="on"] .cp2077-wallpaper { display: none !important; }

/* ── 30. picker layout ───────────────────────────────────────
   .cp2077-row-pick is a horizontal flex by design (it normally holds a
   control and a value). The wallpaper picker drops a grid in there, so the
   grid and the search box ended up side by side and the grid overflowed the
   panel. Stack them and let them fill the row instead. */
.cp2077-row-pick:has(.cp2077-wallpaper-grid) {
  flex-direction: column;
  align-items: stretch;
  gap: 10px;
  width: 100%;
}
.cp2077-row-pick:has(.cp2077-wallpaper-grid) > * {
  width: 100%;
  min-width: 0;
}
.cp2077-wallpaper-motion {
  align-self: flex-start;
  width: auto !important;
}

/* ── 31. magazine measure + top fade ─────────────────────────
   Two moves that make the photo read as a backdrop rather than wallpaper
   peeling out of the chrome:
   1) the message measure is narrowed and centred, so the photo keeps a margin
      of its own on both sides instead of being sliced by the text column;
   2) the top of the canvas gets a short fade, so the photo emerges out of the
      header bar instead of colliding with it. */
html[data-cp2077-wallpaper="on"] {
  --dsh-chat-content-width: min(calc(100% - 76px), 840px);
  --dsh-composer-card-max-width: min(calc(100% - 76px), 840px);
}
html[data-cp2077-wallpaper="on"] body {
  background-image:
    linear-gradient(180deg, rgba(10, 9, 16, .94) 0, rgba(10, 9, 16, .88) 54px, rgba(10, 9, 16, 0) 170px),
    radial-gradient(130% 80% at 50% 44%, rgba(10, 9, 16, .42), rgba(10, 9, 16, .12) 64%, rgba(10, 9, 16, 0) 84%),
    linear-gradient(180deg, rgba(10, 9, 16, .22), rgba(10, 9, 16, .52)),
    var(--cp-wallpaper-image, none) !important;
  background-size: auto, auto, auto, cover !important;
  background-position: center center, center center, center center, center center !important;
  background-repeat: no-repeat, no-repeat, no-repeat, no-repeat !important;
  /* 「fixed」 attachment on a full-viewport photo forces WebView2 to keep a
     separate composited layer for the canvas; combined with the blurred glass
     panels that left stale tiles floating above the page. The chat scrolls in
     an inner container, so 「scroll」 looks identical and costs nothing. */
  background-attachment: scroll, scroll, scroll, scroll !important;
}
html[data-cp2077-wallpaper="on"] body:not([data-ds-dark-theme]) {
  background-image:
    linear-gradient(180deg, rgba(239, 235, 225, .95) 0, rgba(239, 235, 225, .90) 54px, rgba(239, 235, 225, 0) 170px),
    radial-gradient(130% 80% at 50% 44%, rgba(239, 235, 225, .54), rgba(239, 235, 225, .18) 64%, rgba(239, 235, 225, 0) 84%),
    linear-gradient(180deg, rgba(239, 235, 225, .32), rgba(239, 235, 225, .62)),
    var(--cp-wallpaper-image, none) !important;
}

/* ── 32. opaque menus ────────────────────────────────────────
   The same wash that lets the photo through the app shells also thinned every
   popover, so a menu over the wallpaper showed the list behind it straight
   through the labels. Menus are reading surfaces, not atmosphere: they stay
   solid, keep a hairline frame, and drop the blur that used to hide the seam. */
body [data-menu-material] {
  background-color: #12101A !important;
  background-image: none !important;
  -webkit-backdrop-filter: none !important;
  backdrop-filter: none !important;
  border: 1px solid var(--dsw-alias-border-l2) !important;
  box-shadow: 0 12px 34px rgba(0, 0, 0, .55), inset 0 0 0 1px rgba(0, 229, 255, .10) !important;
}
body:not([data-ds-dark-theme]) [data-menu-material] {
  background-color: #FFFFFF !important;
  box-shadow: 0 12px 30px rgba(10, 9, 16, .16), inset 0 0 0 1px rgba(10, 9, 16, .06) !important;
}

/* ── 33. wallpaper cache row ------------------------------- */
body .cp2077-cache-row { align-items: center; }

body .cp2077-cache-text {
  flex: 0 1 auto;
  min-width: 0;
  margin-left: auto;
  font-family: var(--dsh-font-family-code);
  font-size: 11px;
  letter-spacing: .02em;
  color: var(--dsw-alias-label-tertiary);
  white-space: nowrap;
}

body .cp2077-cache-btn {
  flex: 0 0 auto;
  padding: 4px 12px;
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .04em;
  cursor: inherit;
  color: var(--cp-cut-accent, var(--cy-yellow));
  background: transparent;
  border: 1px solid color-mix(in srgb, var(--cp-cut-accent, var(--cy-yellow)) 46%, transparent);
  clip-path: var(--cp-cut-br, none);
  transition: background .14s ease, border-color .14s ease, color .14s ease;
}

body .cp2077-cache-btn:hover:not(:disabled) {
  background: var(--cp-cut-accent, var(--cy-yellow));
  border-color: var(--cp-cut-accent, var(--cy-yellow));
  color: var(--cy-ink);
}

body .cp2077-cache-btn:disabled {
  opacity: .38;
  border-color: var(--dsw-alias-border-l2);
  color: var(--dsw-alias-label-dimmed);
}

body:not([data-ds-dark-theme]) .cp2077-cache-btn {
  color: var(--dsw-alias-label-primary);
  border-color: rgba(10, 9, 16, .28);
}

body:not([data-ds-dark-theme]) .cp2077-cache-btn:hover:not(:disabled) {
  background: #12101A;
  border-color: #12101A;
  color: #FFFFFF;
}

/* ── 34. portability hints ──────────────────────────────────── */
.cp2077-row-path {
  font-family: var(--dsh-font-family-code);
  font-size: 11px;
  line-height: 1.5;
  color: var(--dsw-alias-label-tertiary);
  word-break: break-all;
}
body:not([data-ds-dark-theme]) .cp2077-row-path {
  color: var(--dsw-alias-label-secondary);
}
.cp2077-wallpaper-motion.is-disabled {
  opacity: .55;
  cursor: not-allowed;
}
.cp2077-wallpaper-motion.is-disabled input {
  cursor: not-allowed;
}
`;

    /* ---------- mount helpers ---------- */

    /* ---------- user options ---------- */
    /* The settings panel writes these; the stylesheet reads them through
       --cp-opt-* variables, and the cursor style is rebuilt because its size
       lives inside the SVG data URI rather than in a CSS variable. */
    const OPTIONS_KEY = 'cp2077-theme:options';
    const CURSOR_ATTR = 'data-cp2077-cursor';
    const OPTIONS_DEFAULTS = {
      cursor: true,
      cursorSize: 24,
      grid: 100,
      scanlines: 100,
      chamfer: 10,
      motion: true,
      wallpaperOn: true,
      wallpaperId: '',
      wallpaperMotion: true,
      wallpaperOpacity: 72,
    };
    let themeOptions = Object.assign({}, OPTIONS_DEFAULTS);

    function clampNumber(value, min, max, fallback) {
      const n = Number(value);
      if (!Number.isFinite(n)) return fallback;
      return Math.min(max, Math.max(min, n));
    }

    function normalizeOptions(raw) {
      const next = Object.assign({}, OPTIONS_DEFAULTS);
      if (!raw || typeof raw !== 'object') return next;
      if (typeof raw.cursor === 'boolean') next.cursor = raw.cursor;
      if (typeof raw.motion === 'boolean') next.motion = raw.motion;
      next.cursorSize = clampNumber(raw.cursorSize, 14, 40, next.cursorSize);
      next.chamfer = clampNumber(raw.chamfer, 0, 20, next.chamfer);
      next.grid = clampNumber(raw.grid, 0, 200, next.grid);
      next.scanlines = clampNumber(raw.scanlines, 0, 200, next.scanlines);
      if (typeof raw.wallpaperOn === 'boolean') next.wallpaperOn = raw.wallpaperOn;
      if (typeof raw.wallpaperId === 'string' && /^[A-Za-z0-9_-]*$/.test(raw.wallpaperId)) {
        next.wallpaperId = raw.wallpaperId;
      }
      /* 1.7.x stored `wallpaperMotion: false` because video never composited in this
         shell. Playback now works through an animated WebP, so that stale value is
         ignored once and the flag is rewritten with a schema marker. */
      if (raw.wallpaperMotionV2 === true) {
        if (typeof raw.wallpaperMotion === 'boolean') next.wallpaperMotion = raw.wallpaperMotion;
      }
      next.wallpaperMotionV2 = true;
      next.wallpaperOpacity = clampNumber(raw.wallpaperOpacity, 0, 100, next.wallpaperOpacity);
      return next;
    }

    function readOptions() {
      try {
        const raw = window.localStorage.getItem(OPTIONS_KEY);
        if (raw) themeOptions = normalizeOptions(JSON.parse(raw));
      } catch (error) { /* private mode or corrupt JSON: keep defaults */ }
    }

    function saveOptions() {
      try {
        window.localStorage.setItem(OPTIONS_KEY, JSON.stringify(themeOptions));
      } catch (error) { /* storage may be unavailable */ }
    }

    function cursorUri(svg) {
      return 'data:image/svg+xml,'
        + encodeURIComponent(svg.replace(/\s+/g, ' ').trim()).replace(/'/g, '%27');
    }

    function arrowSvg(size) {
      const d = 'M4 3 L4 24.5 L9.8 18.8 L13.4 26.4 L16.8 24.8 L13.4 17.4 L20.4 16.8 Z';
      return "<svg xmlns='http://www.w3.org/2000/svg' width='" + size + "' height='" + size + "' viewBox='0 0 32 32'>"
        + "<path d='" + d + "' fill='none' stroke='#00E5FF' stroke-opacity='.45' stroke-width='3.6' stroke-linejoin='miter'/>"
        + "<path d='" + d + "' fill='#0A0910' stroke='#FCEE0A' stroke-width='1.7' stroke-linejoin='miter'/>"
        + '</svg>';
    }

    function pointerSvg(size) {
      const ring = "<circle cx='16' cy='16' r='7.5' fill='none'/>";
      const ticks = "<path d='M16 3.5 v5 M16 23.5 v5 M3.5 16 h5 M23.5 16 h5'/>";
      return "<svg xmlns='http://www.w3.org/2000/svg' width='" + size + "' height='" + size + "' viewBox='0 0 32 32'>"
        + "<g stroke='#0A0910' stroke-width='3.2' fill='none'>" + ring + ticks + "</g>"
        + "<g stroke='#FCEE0A' stroke-width='1.6' fill='none'>" + ring + ticks + "</g>"
        + "<circle cx='16' cy='16' r='1.9' fill='#00E5FF' stroke='#0A0910' stroke-width='.9'/>"
        + '</svg>';
    }

    function textSvg(size) {
      const beam = "<path d='M12 3.5 v17 M7.5 3.5 h9 M7.5 20.5 h9' fill='none'/>";
      return "<svg xmlns='http://www.w3.org/2000/svg' width='" + size + "' height='" + size + "' viewBox='0 0 24 24'>"
        + "<g stroke='#0A0910' stroke-width='3'>" + beam + "</g>"
        + "<g stroke='#FCEE0A' stroke-width='1.4'>" + beam + "</g>"
        + '</svg>';
    }

    function buildCursorCss(arrowSize, textSize) {
      const arrow = cursorUri(arrowSvg(arrowSize));
      const pointer = cursorUri(pointerSvg(arrowSize));
      const editor = cursorUri(textSvg(textSize));
      const hotX = Math.round(arrowSize * 0.125);
      const hotY = Math.round(arrowSize * 0.094);
      const mid = Math.round(arrowSize / 2);
      const textMid = Math.round(textSize / 2);
      return [
        'body{cursor:url("' + arrow + '") ' + hotX + ' ' + hotY + ',auto}',
        'body a[href],body button:not(:disabled),body [role="button"]:not([aria-disabled="true"]),'
          + 'body [role="tab"],body [role="treeitem"],body [role="menuitem"],body summary,'
          + 'body label[for],body select:not(:disabled),body input[type="checkbox"],'
          + 'body input[type="radio"]{cursor:url("' + pointer + '") ' + mid + ' ' + mid + ',pointer}',
        'body button:disabled,body select:disabled,body [aria-disabled="true"]{cursor:not-allowed}',
        'body input:not([type="checkbox"]):not([type="radio"]),body textarea,'
          + 'body [contenteditable="true"],body [contenteditable=""],body [data-composer-input]'
          + '{cursor:url("' + editor + '") ' + textMid + ' ' + textMid + ',text}',
      ].join('\n');
    }

    function ensureCursorStyle() {
      if (!active) return;
      try {
        if (document.body) document.body.setAttribute(CURSOR_ATTR + '-active', themeOptions.cursor ? 'on' : 'off');
      } catch (error) { /* no body yet */ }
      let style = null;
      try {
        style = document.querySelector('style[' + CURSOR_ATTR + ']');
      } catch (error) { /* head may be gone */ }
      if (!themeOptions.cursor) {
        try {
          if (style) style.remove();
        } catch (error) { /* already gone */ }
        return;
      }
      try {
        /* Patched into <body> rather than <head>: a body rebuild then wipes the
           cursor along with the rest of the mount, and the self-heal pass puts
           it straight back, so the style can never outlive the mount. */
        const anchor = document.body || document.head;
        if (!anchor) return;
        if (!style) {
          style = document.createElement('style');
          style.setAttribute(CURSOR_ATTR, '1');
          anchor.appendChild(style);
        }
        const arrowSize = Math.round(themeOptions.cursorSize);
        const textSize = Math.max(12, Math.round(themeOptions.cursorSize * 0.75));
        const css = buildCursorCss(arrowSize, textSize);
        /* Re-assigning the same text still invalidates the stylesheet, and the
           self-heal pass runs on every frame while a reply streams in. */
        if (style.textContent !== css) style.textContent = css;
      } catch (error) {
        console.warn('[cp2077-theme] cursor style skipped', error);
      }
    }

    let optionsKey = '';

    function optionsSignature() {
      return [
        themeOptions.cursor ? 1 : 0,
        Math.round(themeOptions.cursorSize),
        themeOptions.grid,
        themeOptions.scanlines,
        themeOptions.chamfer,
        themeOptions.motion ? 1 : 0,
      ].join('|');
    }

    function applyOptions(force) {
      if (!active) return;
      const root = document.documentElement;
      if (!root) return;
      const key = optionsSignature();
      let cursorMissing = false;
      if (themeOptions.cursor) {
        try { cursorMissing = !document.querySelector('style[' + CURSOR_ATTR + ']'); } catch (error) { cursorMissing = false; }
      }
      /* Writing identical custom properties every frame forces a full style
         recalc of the document, so the whole pass is keyed off the option
         values and re-runs only when they change or a node went missing. */
      if (force || key !== optionsKey || cursorMissing) {
        optionsKey = key;
        try {
          root.style.setProperty('--cp-opt-grid', String(themeOptions.grid / 100));
          root.style.setProperty('--cp-opt-scan', String(themeOptions.scanlines / 100));
          root.style.setProperty('--cp-opt-floor', String(themeOptions.grid / 100));
          root.style.setProperty('--cp-opt-chamfer', themeOptions.chamfer + 'px');
          if (themeOptions.motion) root.removeAttribute('data-cp2077-motion');
          else root.setAttribute('data-cp2077-motion', 'off');
        } catch (error) {
          warnOnce('options', 'option apply failed', error);
        }
        ensureCursorStyle();
      }
      ensureWallpaper();
    }
    /* ---------- settings panel ---------- */
    let React = null;
    try {
      React = require('react');
    } catch (error) {
      React = null;
    }

    function ThemePanel() {
      if (!React || typeof React.useState !== 'function') return null;
      const [state, setState] = React.useState(Object.assign({}, themeOptions));
      const [library, setLibrary] = React.useState(null);
      const [libraryNote, setLibraryNote] = React.useState('');
      const [searchQuery, setSearchQuery] = React.useState('');
      const [libraryMeta, setLibraryMeta] = React.useState(null);

      React.useEffect(() => {
        let cancelled = false;
        if (typeof fetch !== 'function') {
          setLibraryNote('当前环境不支持读取壁纸库');
          return () => { cancelled = true; };
        }
        fetch('/cp2077-wallpaper/index', { credentials: 'same-origin' })
          .then((response) => response.json())
          .then((payload) => {
            if (cancelled) return;
            const items = payload && Array.isArray(payload.items) ? payload.items : [];
            const rootText = payload && typeof payload.root === "string" ? payload.root : "";
            const source = payload && typeof payload.rootSource === "string" ? payload.rootSource : "";
            setLibrary(items);
            setLibraryMeta({ root: rootText, source, ffmpeg: !(payload && payload.ffmpeg === false) });
            if (!items.length) {
              if (source === "config-missing") setLibraryNote("配置里的 workshopRoot 不存在：" + rootText);
              else if (source === "env-missing") setLibraryNote("CP2077_WORKSHOP_ROOT 指向的目录不存在：" + rootText);
              else if (source === "fallback") setLibraryNote("未检测到 Wallpaper Engine 创意工坊目录");
              else setLibraryNote("这个目录里没有带封面的壁纸：" + rootText);
            }
          })
          .catch(() => {
            if (!cancelled) setLibraryNote('壁纸路由未就绪：重启 DSH 后可用');
          });
        return () => { cancelled = true; };
      }, []);

      const update = (patch) => {
        themeOptions = normalizeOptions(Object.assign({}, themeOptions, patch));
        setState(Object.assign({}, themeOptions));
        applyOptions();
        saveOptions();
      };

      const row = (key, label, hint, control) => React.createElement('div', { className: 'cp2077-row', key },
        React.createElement('div', { className: 'cp2077-row-text' },
          React.createElement('span', { className: 'cp2077-row-label' }, label),
          React.createElement('span', { className: 'cp2077-row-hint' }, hint),
        ),
        React.createElement('div', { className: 'cp2077-row-control' }, control),
      );

      const toggle = (key, label, hint) => row(key, label, hint,
        React.createElement('input', {
          type: 'checkbox',
          className: 'cp2077-switch',
          checked: !!state[key],
          onChange: (event) => update({ [key]: event.target.checked }),
        }),
      );

      const slider = (key, label, hint, min, max, step, unit) => row(key, label, hint,
        React.createElement('div', { className: 'cp2077-slider' },
          React.createElement('input', {
            type: 'range',
            className: 'cp2077-range',
            min, max, step,
            value: state[key],
            onChange: (event) => update({ [key]: Number(event.target.value) }),
          }),
          React.createElement('span', { className: 'cp2077-row-value' }, String(state[key]) + unit),
        ),
      );

      const picker = () => {
        const list = library || [];
        const query = String(searchQuery || '').trim().toLowerCase();
        const matched = query
          ? list.filter((item) => String(item.title || '').toLowerCase().indexOf(query) !== -1)
          : list;
        const shown = matched.slice(0, 240);
        const picked = list.filter((entry) => String(entry.id) === String(state.wallpaperId))[0];
        const grid = React.createElement('div', { className: 'cp2077-wallpaper-grid' },
          shown.length
            ? shown.map((item) => React.createElement('button', {
              key: String(item.id),
              type: 'button',
              title: String(item.title || item.id),
              className: 'cp2077-wallpaper-thumb' + (String(state.wallpaperId) === String(item.id) ? ' is-active' : ''),
              onClick: () => update({ wallpaperId: String(item.id), wallpaperOn: true }),
            },
              React.createElement('img', {
                src: '/cp2077-wallpaper/file/' + encodeURIComponent(item.id),
                alt: '',
                loading: 'lazy',
              }),
              item.hasVideo ? React.createElement('span', { className: 'cp2077-thumb-tag' }, 'VIDEO') : null,
              React.createElement('span', { className: 'cp2077-thumb-title' }, String(item.title || item.id)),
            ))
            : React.createElement('span', { className: 'cp2077-row-note' }, '没有匹配的壁纸'),
        );
        const controls = [
          React.createElement('input', {
            key: 'search',
            type: 'search',
            className: 'cp2077-search',
            placeholder: '搜索壁纸标题…',
            value: searchQuery,
            onChange: (event) => setSearchQuery(event.target.value),
          }),
          grid,
        ];
        if (picked && picked.hasVideo) {
          const noFfmpeg = Boolean(libraryMeta) && libraryMeta.ffmpeg === false;
          controls.push(React.createElement('label', {
            key: 'motion',
            className: 'cp2077-wallpaper-motion' + (noFfmpeg ? ' is-disabled' : ''),
            title: noFfmpeg ? '没有检测到 ffmpeg，视频壁纸只能显示封面' : '',
          },
            React.createElement('input', {
              type: 'checkbox',
              className: 'cp2077-switch',
              disabled: noFfmpeg,
              checked: !!state.wallpaperMotion && !noFfmpeg,
              onChange: (event) => update({ wallpaperMotion: event.target.checked }),
            }),
            React.createElement('span', null, noFfmpeg ? '动态播放 · 需要 ffmpeg' : '动态播放'),
          ));
        }
        const note = libraryNote
          ? React.createElement('span', { className: 'cp2077-row-note' }, libraryNote)
          : (library
            ? React.createElement('span', { className: 'cp2077-row-note' },
              '共 ' + library.length + ' 张'
              + (query ? ' · 匹配 ' + shown.length : '')
              + (picked ? ' · 当前 ' + String(picked.title || picked.id).slice(0, 28) : ''))
            : null);
        return React.createElement('div', { className: 'cp2077-row-body' },
          React.createElement('div', { className: 'cp2077-row-pick' }, controls),
          note,
          libraryMeta && libraryMeta.root && libraryMeta.source !== 'detected'
            ? React.createElement('span', { className: 'cp2077-row-path' }, '库目录：' + libraryMeta.root)
            : null,
        );
      };
      const [cacheInfo, setCacheInfo] = React.useState(null);
      const [cacheBusy, setCacheBusy] = React.useState(false);
      const readCache = () => {
        fetch(WALLPAPER_ROUTE + '/cache', { credentials: 'same-origin' })
          .then((response) => response.json())
          .then((payload) => {
            setCacheInfo({
              bytes: typeof payload.bytes === "number" ? payload.bytes : 0,
              files: typeof payload.files === "number" ? payload.files : 0,
              cap: typeof payload.cap === "number" ? payload.cap : 0,
              note: payload && payload.ok ? "" : "路由不可用",
            });
          })
          .catch(() => setCacheInfo({ bytes: 0, files: 0, cap: 0, note: "重启 DSH 后可用" }));
      };
      React.useEffect(() => {
        readCache();
      }, []);
      const wipeCache = () => {
        if (cacheBusy) return;
        setCacheBusy(true);
        fetch(WALLPAPER_ROUTE + '/cache', { method: 'POST', credentials: 'same-origin' })
          .then((response) => response.json())
          .then((payload) => {
            setCacheInfo({
              bytes: typeof payload.bytes === "number" ? payload.bytes : 0,
              files: typeof payload.files === "number" ? payload.files : 0,
              cap: typeof payload.cap === "number" ? payload.cap : 0,
              note: payload && payload.ok ? "" : "清理失败",
            });
          })
          .catch(() => setCacheInfo({ bytes: 0, files: 0, cap: 0, note: "清理失败" }))
          .then(() => setCacheBusy(false));
      };
      const mbytes = (value) => {
        const mb = (typeof value === "number" ? value : 0) / (1024 * 1024);
        return (mb >= 10 ? mb.toFixed(0) : mb.toFixed(1)) + " MB";
      };
      const cacheRow = () => {
        const info = cacheInfo;
        const text = info
          ? (info.note
            ? info.note
            : '已用 ' + mbytes(info.bytes) + ' · ' + info.files + ' 个文件 · 上限 ' + mbytes(info.cap))
          : '统计中…';
        return React.createElement('div', { className: 'cp2077-row cp2077-cache-row', key: 'cache' },
          React.createElement('div', { className: 'cp2077-row-text' },
            React.createElement('span', { className: 'cp2077-row-label' }, '壁纸缓存'),
            React.createElement('span', { className: 'cp2077-row-hint' }, '抽帧与动态 WebP 存在系统临时目录；超过上限自动删最旧的'),
          ),
          React.createElement('span', { className: 'cp2077-cache-text' }, text),
          React.createElement('button', {
            type: 'button',
            className: 'cp2077-cache-btn',
            disabled: cacheBusy || !info || info.bytes <= 0,
            onClick: wipeCache,
          }, cacheBusy ? '清理中…' : '清理'),
        );
      };

      const reset = () => {
        themeOptions = Object.assign({}, OPTIONS_DEFAULTS);
        setState(Object.assign({}, themeOptions));
        applyOptions();
        saveOptions();
      };

      return React.createElement('div', { className: 'cp2077-panel' },
        React.createElement('div', { className: 'cp2077-panel-head' },
          React.createElement('span', { className: 'cp2077-panel-title' }, 'Night City / UI'),
          React.createElement('span', { className: 'cp2077-panel-ver' }, VERSION),
        ),
        slider('cursorSize', '光标大小', '箭头与准星的像素尺寸，输入光标按 75% 自动跟随', 14, 40, 1, 'px'),
        toggle('cursor', '赛博朋克光标', '关掉退回系统默认指针'),
        slider('grid', '网格强度', '背景网格与地面网格的明暗，100% 为默认', 0, 200, 5, '%'),
        slider('scanlines', '扫描线', 'CRT 行条纹的浓淡', 0, 200, 5, '%'),
        slider('chamfer', '切角', '面板、气泡、输入框的斜切尺寸', 0, 20, 1, 'px'),
        toggle('motion', '动画', '扫描光束、logo 抖动与呼吸；关闭后静止'),
        React.createElement('div', { className: 'cp2077-row cp2077-row-block', key: 'wallpaper' },
          React.createElement('div', { className: 'cp2077-row-text' },
            React.createElement('span', { className: 'cp2077-row-label' }, '壁纸背景'),
            React.createElement('span', { className: 'cp2077-row-hint' }, '取 Wallpaper Engine 创意工坊项目；视频类可开「动态播放」'),
          ),
          picker(),
          React.createElement('div', { className: 'cp2077-row-control' },
            React.createElement('input', {
              type: 'checkbox',
              className: 'cp2077-switch',
              checked: !!state.wallpaperOn,
              disabled: !state.wallpaperId,
              onChange: (event) => update({ wallpaperOn: event.target.checked }),
            }),
          ),
        ),
        slider('wallpaperOpacity', '壁纸透明度', '数值越低壁纸越暗、正文越清楚；100% 为最清晰', 0, 100, 5, '%'),
        cacheRow(),
        React.createElement('div', { className: 'cp2077-panel-foot' },
          React.createElement('button', { type: 'button', className: 'cp2077-reset', onClick: reset }, '恢复默认'),
        ),
      );
    }

    const VERSION = '2.0.1';

    const STYLE_ATTR = 'data-cp2077-theme';
    const LAYER_CLASS = 'cp2077-layer';

    /* Gate for every mount path: once apply() is disposed, a late
       MutationObserver callback must not resurrect the decorations. */
    let active = true;

    /* ---------- lifecycle bookkeeping ----------
       Anything that outlives a single call goes through here, so a kernel
       switch or a plugin reload drops it in one place: pending timers, DOM
       listeners and repeated warnings (which would otherwise flood the
       console while the page is still warming up). */
    const pendingTimers = new Map();
    const liveListeners = [];
    const warnedOnce = new Set();

    function warnOnce(key, message, error) {
      if (warnedOnce.has(key)) return;
      warnedOnce.add(key);
      try {
        console.warn('[cp2077-theme] ' + message, error && error.message ? error.message : error);
      } catch (failure) { /* no console available */ }
    }

    function later(fn, ms) {
      if (!active) return null;
      const token = {};
      const run = () => {
        pendingTimers.delete(token);
        if (!active) return;
        try { fn(); } catch (error) { warnOnce('deferred', 'deferred task failed', error); }
      };
      let id = 0;
      try { id = window.setTimeout(run, ms); } catch (error) { return null; }
      pendingTimers.set(token, id);
      return token;
    }

    function on(target, type, fn, options) {
      if (!target || typeof target.addEventListener !== 'function') return () => {};
      const entry = [target, type, fn, options];
      try {
        target.addEventListener(type, fn, options);
        liveListeners.push(entry);
      } catch (error) { /* detached target */ }
      return () => {
        const index = liveListeners.indexOf(entry);
        if (index >= 0) liveListeners.splice(index, 1);
        try { target.removeEventListener(type, fn, options); } catch (failure) { /* already gone */ }
      };
    }

    function cancelPending() {
      pendingTimers.forEach((id) => {
        try { window.clearTimeout(id); } catch (error) { /* already fired */ }
      });
      pendingTimers.clear();
      while (liveListeners.length) {
        const entry = liveListeners.pop();
        try { entry[0].removeEventListener(entry[1], entry[2], entry[3]); } catch (error) { /* already gone */ }
      }
    }

    /*
     * Both DOM nodes are created lazily and found by identity, so a second
     * apply() — kernel / agent-preset switch, hot reload, plugin re-enable —
     * re-uses them instead of stacking duplicates. Every step is guarded: this
     * plugin must never throw during a kernel switch, because an exception on
     * that path can abort the whole client-side bring-up.
     */
    function ensureStyle() {
      if (!active) return;
      try {
        if (document.querySelector('style[' + STYLE_ATTR + ']')) return;
        const style = document.createElement('style');
        style.setAttribute(STYLE_ATTR, '');
        style.textContent = CSS;
        const host = document.head || document.documentElement;
        if (host) host.appendChild(style);
      } catch (error) {
        console.warn('[cp2077-theme] style mount skipped', error);
      }
    }

    const WALLPAPER_CLASS = 'cp2077-wallpaper';
    const WALLPAPER_ATTR = 'data-cp2077-wallpaper';
    const WALLPAPER_ROUTE = '/cp2077-wallpaper';

    /* The backdrop is a fixed layer behind everything. It is cheap to keep
       around: hiding is a single attribute on <html>, so switching wallpapers
       never rebuilds the node and never re-downloads. */
    let wallpaperAutoPick = false;

    /* The CSS-variable route depends on a rule winning the cascade. Writing the
       body style directly with !important is unconditional: whatever layer the
       page uses for its own paint, this wins on the element that owns it. */
    /* The page owns several opaque containers whose class names cannot be
       predicted (Tailwind utility classes such as flex-1 / fixed show up in
       the shell). Body paint alone is always covered, so we locate the
       outermost opaque element under the pointer and paint the wallpaper
       directly onto it. */
    let backdropHost = null;
    let backdropHosts = [];
    let backdropProbeAt = 0;
    let backdropImgKey = '';
    let backdropVideo = null;
    let backdropVeilNode = null;
    let videoIds = null;

    /* A host is only worth keeping while it still covers most of the
       viewport. A conversation switch can leave the old node attached but
       zero-sized or hidden, which silently blanks the wallpaper. */
    function hostHealthy(el) {
      try {
        if (!el || !document.documentElement.contains(el)) return false;
        const rect = el.getBoundingClientRect();
        return rect.width >= window.innerWidth * 0.8 && rect.height >= window.innerHeight * 0.8;
      } catch (error) {
        return false;
      }
    }

    /* Pick the INNERMOST large opaque box under the probe, not the
       outermost one. The outermost opaque node is usually a shell whose
       own children are opaque too, so anything painted on it is covered.
       The innermost large opaque node is the thing the user actually sees
       through. */
    function findBackdropHost() {
      try {
        /* heal() runs on every DOM mutation, so walk the ancestor chain only
           when the host we own stops being usable or a short window lapses. */
        const now = Date.now();
        if (now - backdropProbeAt < 120) return backdropHost || null;
        backdropProbeAt = now;
        if (hostHealthy(backdropHost)) return backdropHost;
        const probes = [[0.5, 0.5], [0.5, 0.2], [0.5, 0.85]];
        let best = null;
        for (const pair of probes) {
          let node = document.elementFromPoint(
            Math.round(window.innerWidth * pair[0]),
            Math.round(window.innerHeight * pair[1]),
          );
          while (node && node !== document.body && node !== document.documentElement) {
            const rect = node.getBoundingClientRect();
            if (rect.width >= window.innerWidth * 0.8 && rect.height >= window.innerHeight * 0.8) {
              const bg = window.getComputedStyle(node).backgroundColor || '';
              const clear = bg === 'transparent' || /rgba\(\s*0,\s*0,\s*0,\s*0\s*\)/.test(bg);
              if (!clear) {
                best = node;
                break;
              }
            }
            node = node.parentElement;
          }
          if (best) break;
        }
        if (best) return best;
        /* Nothing opaque covered the probe: keep the host we own while it
           stays healthy, otherwise fall back to the app root. */
        if (hostHealthy(backdropHost)) return backdropHost;
        return document.getElementById('root') || backdropHost || null;
      } catch (error) {
        return backdropHost || null;
      }
    }

    function applyBackdrop(el, veil, url) {
      const style = el.style;
      style.setProperty('background-image', veil + ', url("' + url + '")', 'important');
      style.setProperty('background-size', 'cover, cover', 'important');
      style.setProperty('background-position', 'center, center', 'important');
      style.setProperty('background-attachment', 'fixed, fixed', 'important');
      style.setProperty('background-repeat', 'no-repeat, no-repeat', 'important');
    }

    function releaseBackdrop(el) {
      if (!el) return;
      try {
        for (const prop of ['background-image', 'background-size', 'background-position', 'background-repeat', 'background-attachment']) {
          el.style.removeProperty(prop);
        }
      } catch (error) { /* nothing to clean */ }
    }

    function wallpaperVeil() {
      const dark = document.body && document.body.hasAttribute('data-ds-dark-theme');
      const drop = 1 - clampNumber(themeOptions.wallpaperOpacity, 0, 100, 100) / 100;
      if (dark) {
        const top = (0.46 + drop * 0.54).toFixed(2);
        const bottom = (0.78 + drop * 0.22).toFixed(2);
        return 'linear-gradient(180deg, rgba(10,9,16,' + top + '), rgba(10,9,16,' + bottom + '))';
      }
      const top = (0.66 + drop * 0.34).toFixed(2);
      const bottom = (0.84 + drop * 0.16).toFixed(2);
      return 'linear-gradient(180deg, rgba(239,235,225,' + top + '), rgba(239,235,225,' + bottom + '))';
    }

    function removeBackdropVideo() {
      try {
        if (backdropVideo && backdropVideo.parentNode) backdropVideo.parentNode.removeChild(backdropVideo);
        if (backdropVeilNode && backdropVeilNode.parentNode) backdropVeilNode.parentNode.removeChild(backdropVeilNode);
      } catch (error) { /* nothing to remove */ }
      backdropVideo = null;
      backdropVeilNode = null;
    }

    function loadVideoIds() {
      if (videoIds) return Promise.resolve(videoIds);
      return fetch(WALLPAPER_ROUTE + '/index', { credentials: 'same-origin' })
        .then((response) => response.json())
        .then((payload) => {
          const items = (payload && payload.items) || [];
          videoIds = new Set(items.filter((item) => item && item.hasVideo).map((item) => String(item.id)));
          return videoIds;
        })
        .catch(() => {
          /* A transient failure must stay retryable; caching an empty set
             would silently kill the video wallpaper until reload. */
          videoIds = null;
          return null;
        });
    }

    /* A position:fixed layer escapes overflow clipping, so a fullscreen
       one paints over every sibling of the host (the sidebar included).
       Pin it to the host rectangle instead: fixed means no scrolling, the
       explicit rect keeps it inside the content column. */
    /* The wallpaper lives inside the anchored chat column and is positioned
       with inset:0, so there is no geometry to compute. All this function has
       to do is keep the host stackable and hide the layer while the column is
       still 0-sized (first paint before layout settles). */
    function syncVideoRect() {
      try {
        if (!backdropHost || !document.documentElement.contains(backdropHost)) return;
        const column = document.querySelector('[class*="centerCol"]') || backdropHost;
        const rect = column.getBoundingClientRect();
        if (rect.width < 2 || rect.height < 2) {
          if (backdropVideo) backdropVideo.style.setProperty('display', 'none', 'important');
          if (backdropVeilNode) backdropVeilNode.style.setProperty('display', 'none', 'important');
          if (!syncVideoRect.pending) {
            syncVideoRect.pending = true;
            requestAnimationFrame(() => {
              syncVideoRect.pending = false;
              syncVideoRect();
            });
          }
          return;
        }
        for (const el of [backdropVideo, backdropVeilNode]) {
          if (!el) continue;
          el.style.removeProperty('display');
          for (const prop of ['left', 'top', 'width', 'height', 'right', 'bottom']) el.style.removeProperty(prop);
        }
        if (window.getComputedStyle(backdropHost).position === 'static') {
          backdropHost.style.setProperty('position', 'relative', 'important');
        }
        backdropHost.style.setProperty('isolation', 'isolate', 'important');
        punchThrough(backdropHost);
        if (backdropVideo) {
          const vr = backdropVideo.getBoundingClientRect();
        }
      } catch (error) { /* never throw from a layout pass */ }
    }

    /* Layout shells paint an opaque background colour on every large
       container, so a backdrop drawn on an ancestor is always covered by
       its own descendants. Instead of guessing class names, walk the
       subtree and knock out the background colour of every element that
       spans most of the host width. The previous value is recorded so the
       change can be undone when the wallpaper is switched off. */
    let punchRestore = [];
    let punchSeen = new WeakSet();

    function punchThrough(host) {
      try {
        if (!host) return;
        const width = host.getBoundingClientRect().width;
        if (width < 2) return;
        const nodes = host.querySelectorAll('div,section,main,article,aside');
        for (const el of nodes) {
          if (el === backdropVideo || el === backdropVeilNode) continue;
          if (punchSeen.has(el)) continue;
          const rect = el.getBoundingClientRect();
          if (rect.width < width * 0.8) continue;
          const bg = window.getComputedStyle(el).backgroundColor || '';
          if (bg === 'transparent' || /rgba(s*0,s*0,s*0,s*0s*)/.test(bg)) { punchSeen.add(el); continue; }
          punchRestore.push({
            el,
            value: el.style.getPropertyValue('background-color'),
            priority: el.style.getPropertyPriority('background-color'),
          });
          el.style.setProperty('background-color', 'transparent', 'important');
          punchSeen.add(el);
        }
      } catch (error) { /* layout walk is best effort */ }
    }

    function restorePunch() {
      try {
        for (const entry of punchRestore) {
          if (!entry || !entry.el) continue;
          if (entry.value) entry.el.style.setProperty('background-color', entry.value, entry.priority || '');
          else entry.el.style.removeProperty('background-color');
        }
      } catch (error) { /* ignore */ }
      punchRestore = [];
      punchSeen = new WeakSet();
    }

    function kickBackdropVideo() {
      const video = backdropVideo;
      if (!video || !video.parentNode) return;
      try {
        const attempt = video.play();
        if (attempt && typeof attempt.catch === 'function') attempt.catch(() => {});
      } catch (error) { /* retried on the next gesture */ }
    }

    /* Anchor on the composer dock: its ancestors are exactly the chat
       surface, so the lookup never depends on how wide the main column
       happens to be (panels open, sidebar collapsed, window resized). */

    function anchorHost() {
      try {
        /* [data-composer-input] is the Lexical editor itself, which survives
           every layout reshuffle; the data-slot anchor has proven unstable. */
        const dock = document.querySelector('[data-composer-input]')
          || document.querySelector('[data-slot="conversation.input.dock"]')
          || document.querySelector('[data-slot*="input.dock"]');
        if (!dock) return null;
        let node = dock.parentElement;
        let last = null;
        while (node && node !== document.body && node !== document.documentElement) {
          const cls = node.getAttribute('class') || '';
          /* The window frame spans the sidebar too, so stop right below it:
             everything below the frame is chat surface. */
          if (/frame/i.test(cls)) break;
          last = node;
          node = node.parentElement;
        }
        return last;
      } catch (error) { return null; }
    }

    function paintBackdropVideo(url) {
      try {
        /* Re-evaluate every time instead of trusting a cached host: a
           conversation switch reuses the container node but can leave it
           empty, so a cached host paints onto something invisible. */
        const host = anchorHost();
        if (!host) return;
        const hr = host.getBoundingClientRect();
        const veil = wallpaperVeil();
        const key = url + '|' + veil;
        if (backdropVideo && backdropVideo.getAttribute('data-cp-url') === url) {
          /* Reuse the live element. Only re-home it when the host changed,
             otherwise a conversation switch would restart the clip. */
          /* Always refresh the cached host: the node may already live in
             the right place while the cache still points at an older,
             larger container, and syncVideoRect() reads that cache. */
          backdropHost = host;
          if (backdropVideo.parentNode !== host) {
            if (window.getComputedStyle(host).position === 'static') {
              host.style.setProperty('position', 'relative', 'important');
            }
            host.style.setProperty('isolation', 'isolate', 'important');
            host.insertBefore(backdropVideo, host.firstChild);
            if (backdropVeilNode) host.insertBefore(backdropVeilNode, backdropVideo.nextSibling);
          }
          if (backdropVideo.getAttribute('data-cp-key') !== key) {
            backdropVideo.setAttribute('data-cp-key', key);
            if (backdropVeilNode && backdropVeilNode.parentNode) {
              backdropVeilNode.style.setProperty('background', veil, 'important');
            }
          }
          syncVideoRect();
          kickBackdropVideo();
          return;
        }
        removeBackdropVideo();
        if (window.getComputedStyle(host).position === 'static') {
          host.style.setProperty('position', 'relative', 'important');
        }
        host.style.setProperty('isolation', 'isolate', 'important');
        const video = document.createElement('video');
        video.className = 'cp2077-wallpaper-video';
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.setAttribute('playsinline', '');
        video.setAttribute('muted', '');
        video.setAttribute('aria-hidden', 'true');
        video.setAttribute('data-cp-url', url);
        video.setAttribute('data-cp-key', key);
        video.preload = 'auto';
        video.src = url;
        host.insertBefore(video, host.firstChild);
        const veilNode = document.createElement('div');
        veilNode.className = 'cp2077-wallpaper-veil';
        veilNode.setAttribute('aria-hidden', 'true');
        veilNode.style.setProperty('background', veil, 'important');
        host.insertBefore(veilNode, video.nextSibling);
        backdropHost = host;
        backdropVideo = video;
        backdropVeilNode = veilNode;
        /* Browsers pause offscreen or throttled media; nudge it back. */
        video.addEventListener('pause', () => {
          if (!active || !themeOptions.wallpaperOn || !themeOptions.wallpaperMotion) return;
          setTimeout(kickBackdropVideo, 150);
        });
        video.addEventListener('stalled', () => setTimeout(kickBackdropVideo, 400));
        video.addEventListener('error', () => {
          /* No playable stream (scene project, missing file): keep the
             static cover that is already painted on the host. */
          removeBackdropVideo();
        });
        syncVideoRect();
        kickBackdropVideo();
        if (typeof document.addEventListener === 'function' && !paintBackdropVideo.gestureBound) {
          paintBackdropVideo.gestureBound = true;
          document.addEventListener('pointerdown', kickBackdropVideo);
          window.addEventListener('resize', syncVideoRect);
          document.addEventListener('visibilitychange', () => {
            if (!document.hidden) kickBackdropVideo();
          });
        }
      } catch (error) {
        console.warn('[cp2077-theme] wallpaper video skipped', error);
      }
    }
    /* Paint on EVERY large translucent-or-opaque ancestor under the probes,
       not on a single guess. Content trees get rebuilt on a conversation
       switch, and whichever layer ends up visible differs each time; the
       only reliable rule is that one of those ancestors is on screen. */
    function collectHosts() {
      const unique = [];
      const push = (el) => { if (el && unique.indexOf(el) < 0) unique.push(el); };
      const probes = [[0.5, 0.5], [0.5, 0.2], [0.5, 0.85]];
      for (const pair of probes) {
        let node = document.elementFromPoint(
          Math.round(window.innerWidth * pair[0]),
          Math.round(window.innerHeight * pair[1]),
        );
        while (node && node !== document.body && node !== document.documentElement) {
          const rect = node.getBoundingClientRect();
          if (rect.width >= window.innerWidth * 0.8 && rect.height >= window.innerHeight * 0.8) {
            push(node);
          }
          node = node.parentElement;
        }
      }
      return unique.slice(0, 10);
    }

    /* A wall of paint on every ancestor looked fine on the settings page
       but bled onto the header and the message column. Keep exactly one
       host: the innermost candidate that is actually visible. */
    function hostUsable(el) {
      try {
        if (!el || !document.documentElement.contains(el)) return false;
        const rect = el.getBoundingClientRect();
        if (rect.width < window.innerWidth * 0.8 || rect.height < window.innerHeight * 0.8) return false;
        const cs = window.getComputedStyle(el);
        if (cs.display === 'none' || cs.visibility === 'hidden' || cs.visibility === 'collapse') return false;
        if (parseFloat(cs.opacity || '1') < 0.05) return false;
        return true;
      } catch (error) {
        return false;
      }
    }

    function paintWallpaper(url) {
      try {
        if (!document.body) return;
        const veil = wallpaperVeil();
        const key = url + '|' + veil;
        const candidates = collectHosts();
        let host = hostUsable(backdropHost) ? backdropHost : null;
        if (!host) {
          for (const el of candidates) {
            if (hostUsable(el)) { host = el; break; }
          }
        }
        if (!host) host = candidates[candidates.length - 1] || document.getElementById('root') || document.body;
        if (backdropImgKey === key && backdropHost === host) return;
        for (const el of backdropHosts) releaseBackdrop(el);
        backdropHosts = [host];
        applyBackdrop(host, veil, url);
        backdropHost = host;
        backdropImgKey = key;
      } catch (error) {
        console.warn('[cp2077-theme] wallpaper paint skipped', error);
      }
    }

    function clearWallpaperPaint() {
      try {
        removeBackdropVideo();
        for (const el of backdropHosts) releaseBackdrop(el);
        restorePunch();
        backdropHosts = [];
        releaseBackdrop(backdropHost);
        if (document.body) releaseBackdrop(document.body);
        backdropHost = null;
        backdropImgKey = '';
      } catch (error) { /* nothing to clean */ }
    }

    function autoPickWallpaper() {
      if (wallpaperAutoPick) return;
      wallpaperAutoPick = true;
      fetch(WALLPAPER_ROUTE + '/index', { credentials: 'same-origin' })
        .then((response) => response.json())
        .then((payload) => {
          const items = (payload && payload.items) || [];
          if (!active || !items.length || themeOptions.wallpaperId) return;
          const first = String(items[0].id || '');
          if (!first) return;
          themeOptions.wallpaperId = first;
          saveOptions();
          ensureWallpaper();
        })
        .catch(() => { wallpaperAutoPick = false; });
    }

    function ensureWallpaperLegacy() {
      if (!active) return;
      try {
        if (themeOptions.wallpaperOn && !themeOptions.wallpaperId) autoPickWallpaper();
        const root = document.documentElement;
        /* The painted backdrop is a body pseudo-element (see CSS section 22),
           so there is no node to create here. With no id we leave the
           attribute alone and the hard-coded fallback cover stays visible. */
        if (root && themeOptions.wallpaperId) {
          if (themeOptions.wallpaperOn) {
            const url = WALLPAPER_ROUTE + '/file/' + encodeURIComponent(themeOptions.wallpaperId);
            root.style.setProperty('--cp-wallpaper-image', 'url("' + url + '")');
            root.setAttribute(WALLPAPER_ATTR, 'on');
            paintWallpaper(url);
            if (themeOptions.wallpaperMotion) {
              paintBackdropVideo(WALLPAPER_ROUTE + '/video/' + encodeURIComponent(themeOptions.wallpaperId));
            } else {
              removeBackdropVideo();
            }
          } else {
            root.style.setProperty('--cp-wallpaper-image', 'none');
            root.setAttribute(WALLPAPER_ATTR, 'off');
            clearWallpaperPaint();
          }
        }
      } catch (error) {
        console.warn('[cp2077-theme] wallpaper mount skipped', error);
      }
    }

    let themeRef = null;
    let washDispose = null;
    let lastWashKey = null;
    let wallpaperNode = null;

    /* transparency slider: 100 = background clearly visible, 0 = nearly hidden */
    function washAlpha() {
      const t = Number(themeOptions.wallpaperOpacity);
      const pct = Number.isFinite(t) ? Math.min(100, Math.max(0, t)) : 72;
      return 0.92 - (pct / 100) * 0.58;
    }

    let washTries = 0;

    function applyWash(on, retry) {
      if (!active) return;
      if (!themeRef || typeof themeRef.overrideTokens !== 'function') {
        if (retry !== false && washTries < 6) {
          washTries += 1;
          later(() => { applyWash(on, true); }, 320);
        }
        return;
      }
      washTries = 0;
      const key = on ? washAlpha().toFixed(3) : 'off';
      if (key === lastWashKey) return;
      lastWashKey = key;
      try {
        if (washDispose) { try { washDispose(); } catch (error) { /* already gone */ } washDispose = null; }
        washDispose = themeRef.overrideTokens(SOURCE, washOverrides(on ? washAlpha() : null));
      } catch (error) {
        console.warn('[cp2077-theme] surface wash skipped', error);
      }
    }

    function wallpaperLayerNode() {
      if (!document.body) return null;
      if (wallpaperNode && wallpaperNode.isConnected) return wallpaperNode;
      let node = document.querySelector('.cp2077-wallpaper');
      if (!node) {
        node = document.createElement('div');
        node.className = 'cp2077-wallpaper';
        node.setAttribute('aria-hidden', 'true');
        document.body.insertBefore(node, document.body.firstChild);
      }
      wallpaperNode = node;
      return node;
    }

    let stillKickAt = 0;

    function kickVideoIndex() {
      if (videoIds) return;
      const now = Date.now();
      if (now - stillKickAt < 10000) return;
      stillKickAt = now;
      loadVideoIds().then(
        (ids) => {
          if (!active || !ids || !ids.size) return;
          ensureWallpaper();
        },
        () => {
          /* library index unavailable: cover images stay in use */
        },
      );
    }



    let wallpaperImageKey = '';
    let wallpaperRenderedNode = null;

    function ensureWallpaper() {
      if (!active) return;
      try {
        kickVideoIndex();
        if (themeOptions.wallpaperOn && !themeOptions.wallpaperId) autoPickWallpaper();
        const on = Boolean(themeOptions.wallpaperOn) && Boolean(themeOptions.wallpaperId);
        const root = document.documentElement;
        if (!root) return;
        const id = on ? String(themeOptions.wallpaperId) : '';
        const isVideo = Boolean(on && videoIds && videoIds.has(id));
        const moving = isVideo && themeOptions.wallpaperMotion;
        const url = on
          ? WALLPAPER_ROUTE + (moving ? '/anim/' : isVideo ? '/still/' : '/file/') + encodeURIComponent(id)
          : '';
        const key = on ? (moving ? 'a:' : 's:') + id : 'off';
        /* The photo is painted on the document canvas (CSS section 29), so no
           stacking context or opaque shell can cover it. The holder node is
           kept only so older builds can still clean themselves up. */
        const node = wallpaperLayerNode();
        /* A body rebuild hands back a fresh holder node; it needs the paint
           again even though the chosen image did not change. */
        const nodeIsNew = Boolean(node) && node !== wallpaperRenderedNode;
        if (key !== wallpaperImageKey || nodeIsNew) {
          wallpaperImageKey = key;
          wallpaperRenderedNode = node;
          if (on) {
            root.style.setProperty('--cp-wallpaper-image', 'url("' + url + '")');
            root.setAttribute(WALLPAPER_ATTR, 'on');
            if (node) {
              node.style.setProperty('background-image', 'url("' + url + '")');
              node.style.setProperty('display', 'block');
            }
          } else {
            root.style.removeProperty('--cp-wallpaper-image');
            root.setAttribute(WALLPAPER_ATTR, 'off');
            if (node) {
              node.style.removeProperty('background-image');
              node.style.setProperty('display', 'none');
            }
          }
          applyWash(on);
          return;
        }
        /* Same image: only restore markers a body rebuild may have dropped. */
        const wanted = on ? 'on' : 'off';
        if (root.getAttribute(WALLPAPER_ATTR) !== wanted) root.setAttribute(WALLPAPER_ATTR, wanted);
      } catch (error) {
        warnOnce('wallpaper', 'wallpaper mount skipped', error);
      }
    }    function ensureLayer() {
      if (!active) return;
      ensureWallpaper();
      try {
        if (!document.body) return;
        if (document.querySelector('.' + LAYER_CLASS)) return;
        const layer = document.createElement('div');
        layer.className = LAYER_CLASS;
        layer.setAttribute('aria-hidden', 'true');
        layer.innerHTML = '<div class="cp2077-scan"></div>'
          + '<div class="cp2077-grid"></div>'
          + '<div class="cp2077-floor"></div>'
          + '<div class="cp2077-horizon"></div>'
          + '<div class="cp2077-hud"></div>'
          + '<div class="cp2077-beam"></div>';
        document.body.appendChild(layer);
      } catch (error) {
        console.warn('[cp2077-theme] decoration mount skipped', error);
      }
    }

    const GLITCH_HOST_ID = 'cp2077-glitch-host';

    function ensureGlitchFilter() {
      if (!active) return;
      try {
        if (!document.body) return;
        const root = document.documentElement;
        const existing = document.getElementById(GLITCH_HOST_ID);
        /* re-evaluated on every heal, so toggling the OS motion setting or
           plugging a weaker machine in later still lands on the cheap path */
        let off = false;
        try {
          if (typeof window.matchMedia === 'function'
            && window.matchMedia('(prefers-reduced-motion: reduce)').matches) off = true;
          const cores = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency : 0;
          if (typeof cores === 'number' && cores > 0 && cores <= 2) off = true;
        } catch (error) { off = false; }
        if (off) {
          if (existing) existing.remove();
          if (root) root.setAttribute('data-cp2077-glitch', 'off');
          return;
        }
        if (root) root.removeAttribute('data-cp2077-glitch');
        if (existing) return;
        const host = document.createElement('div');
        host.id = GLITCH_HOST_ID;
        host.setAttribute('aria-hidden', 'true');
        host.style.cssText = 'position:fixed;left:-9999px;top:0;width:0;height:0;overflow:hidden;pointer-events:none;';
        host.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">'
          + '<filter id="cp2077-glitch" x="-16%" y="-40%" width="132%" height="180%" color-interpolation-filters="sRGB">'
          + '<feTurbulence type="fractalNoise" baseFrequency="0.014 0.34" numOctaves="1" seed="9" result="noise">'
          + '<animate attributeName="seed" values="9;3;14;6;11" dur="0.85s" repeatCount="indefinite" calcMode="discrete"/>'
          + '</feTurbulence>'
          + '<feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G">'
          + '<animate attributeName="scale" values="0;0;6.2;0;0;4.2;0;0" keyTimes="0;0.33;0.40;0.45;0.60;0.66;0.71;1" dur="6s" repeatCount="indefinite" calcMode="discrete"/>'
          + '</feDisplacementMap>'
          + '</filter>'
          + '</svg>';
        document.body.appendChild(host);
      } catch (error) {
        console.warn('[cp2077-theme] glitch filter mount skipped', error);
      }
    }

    function removeMounted() {
      cancelPending();
      optionsKey = '';
      wallpaperImageKey = '';
      wallpaperRenderedNode = null;
      try {
        const style = document.querySelector('style[' + STYLE_ATTR + ']');
        if (style) style.remove();
      } catch (error) { /* already gone */ }
      try {
        const layer = document.querySelector('.' + LAYER_CLASS);
        if (layer) layer.remove();
      } catch (error) { /* already gone */ }
      try {
        const glitch = document.getElementById(GLITCH_HOST_ID);
        if (glitch) glitch.remove();
      } catch (error) { /* already gone */ }
      try {
        const cursor = document.querySelector('style[' + CURSOR_ATTR + ']');
        if (cursor) cursor.remove();
      } catch (error) { /* already gone */ }
      try {
        const wallpaper = document.querySelector('.' + WALLPAPER_CLASS);
        if (wallpaper) wallpaper.remove();
      } catch (error) { /* already gone */ }
      try {
        document.documentElement.removeAttribute('data-cp2077-glitch');
        document.documentElement.removeAttribute(WALLPAPER_ATTR);
        if (wallpaperNode && wallpaperNode.parentNode) wallpaperNode.parentNode.removeChild(wallpaperNode);
        wallpaperNode = null;
        lastWashKey = null;
        if (washDispose) { try { washDispose(); } catch (error) { /* already gone */ } washDispose = null; }
        document.documentElement.removeAttribute('data-cp2077-motion');
        document.documentElement.removeAttribute(WALLPAPER_ATTR);
        clearWallpaperPaint();
        document.documentElement.style.removeProperty('--cp-wallpaper-image');
      } catch (error) { /* no-op */ }
    }

    return {
      inject: ['theme', 'slots'],
      apply(ctx) {
        readOptions();

        if (!ctx || typeof ctx.effect !== 'function') {
          console.warn('[cp2077-theme] apply skipped: context has no effect()');
          return;
        }

        /* Registering each scope through this guard keeps a failure inside
           the plugin: a throw here would abort the client bring-up that is
           still in flight and blank the whole page. */
        const step = (fn) => {
          try {
            return ctx.effect(fn);
          } catch (error) {
            console.warn('[cp2077-theme] effect registration failed', error);
            return undefined;
          }
        };

        /* 1. palette override — never let a missing/partial theme service throw. */
        step(() => {
          let dispose = () => {};
          try {
            themeRef = ctx.theme;
            dispose = ctx.theme.overrideTokens(SOURCE, washOverrides(
              themeOptions.wallpaperOn && themeOptions.wallpaperId ? washAlpha() : null,
            ));
            lastWashKey = themeOptions.wallpaperOn && themeOptions.wallpaperId ? washAlpha().toFixed(3) : 'off';
          } catch (error) {
            console.warn('[cp2077-theme] token override failed', error);
          }
          return () => {
            try {
              if (typeof dispose === 'function') dispose();
            } catch (error) { /* already released */ }
          };
        });

        /* 2. stylesheet + decoration, re-mounted once the document is ready. */
        step(() => {
          ensureStyle();
          ensureLayer();
          ensureGlitchFilter();
          applyOptions();

          [220, 700, 1600, 3200].forEach((ms) => {
            later(() => { ensureWallpaper(); }, ms);
          });

          const retry = () => {
            ensureStyle();
            ensureLayer();
            ensureGlitchFilter();
          };

          try {
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', retry, { once: true });
            }
            window.addEventListener('load', retry, { once: true });
          } catch (error) { /* no-op */ }

          return () => {
            active = false;
            try {
              document.removeEventListener('DOMContentLoaded', retry);
              window.removeEventListener('load', retry);
            } catch (error) { /* no-op */ }
            cancelPending();
            removeMounted();
          };
        });

        /* 3. self-heal: a kernel switch may rebuild <body>, dropping our nodes. */
        step(() => {
          let frame = 0;
          let observedRoot = null;
          let observedHead = null;
          let observedBody = null;
          let alive = true;

          const heal = () => {
            frame = 0;
            if (!alive || !active) return;
            ensureStyle();
            ensureLayer();
            ensureGlitchFilter();
            applyOptions();
            attach();
          };

          const schedule = () => {
            if (!alive || frame) return;
            try {
              frame = requestAnimationFrame(heal);
            } catch (error) {
              heal();
            }
          };

          let observer = null;

          const attach = () => {
            if (!observer) return;
            try {
              if (document.documentElement && observedRoot !== document.documentElement) {
                if (observedRoot) observer.unobserve(observedRoot);
                observer.observe(document.documentElement, { childList: true });
                observedRoot = document.documentElement;
              }
              if (document.head && observedHead !== document.head) {
                if (observedHead) observer.unobserve(observedHead);
                observer.observe(document.head, { childList: true });
                observedHead = document.head;
              }
              if (document.body && observedBody !== document.body) {
                if (observedBody) observer.unobserve(observedBody);
                observer.observe(document.body, { childList: true });
                observedBody = document.body;
              }
            } catch (error) { /* no-op */ }
          };

          try {
            observer = new MutationObserver(schedule);
            attach();
            schedule();
          } catch (error) {
            console.warn('[cp2077-theme] self-heal disabled', error);
          }

          return () => {
            alive = false;
            try {
              if (observer) observer.disconnect();
            } catch (error) { /* no-op */ }
            try {
              if (frame) cancelAnimationFrame(frame);
            } catch (error) { /* no-op */ }
          };
        });

        /* 4. settings page: registered against the host slot registry. */
        step(() => {
          if (!ctx.slots || typeof ctx.slots.inject !== 'function' || typeof ctx.slots.register !== 'function') {
            console.warn('[cp2077-theme] slot registry unavailable; panel not mounted');
            return undefined;
          }
          try {
            return ctx.slots.inject('settings.section', () => ctx.slots.register({
              name: 'settings.section',
              id: 'cp2077-theme',
              order: 100,
              label: '赛博朋克主题',
            }, ThemePanel));
          } catch (error) {
            console.warn('[cp2077-theme] panel registration failed', error);
            return undefined;
          }
        });
      },
    };
  },
});