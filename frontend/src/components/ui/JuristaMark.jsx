import { useThemeContext } from '../../contexts/ThemeContext';

const BRAND_DIR = '/brand';

/** Brand asset variants shipped in public/brand/ (light = for light theme). */
const BRAND_FILES = {
  logo: {
    light: `${BRAND_DIR}/jurista-logo-light.svg`,
    dark: `${BRAND_DIR}/jurista-logo-dark.svg`,
  },
  icon: {
    light: `${BRAND_DIR}/jurista-icon-light.svg`,
    dark: `${BRAND_DIR}/jurista-icon-dark.svg`,
  },
  mono: {
    light: `${BRAND_DIR}/jurista-icon-mono-light.svg`,
    dark: `${BRAND_DIR}/jurista-icon-mono-dark.svg`,
  },
};

/**
 * Jurista brand mark — renders the official SVG asset and switches between
 * the light/dark variant with the active theme (no CSS filters).
 */
export function JuristaMark({ type = 'mono', alt = '', className = '' }) {
  const { isDark } = useThemeContext();
  const variant = BRAND_FILES[type] ?? BRAND_FILES.mono;
  return (
    <img src={isDark ? variant.dark : variant.light} alt={alt} draggable={false} className={className} />
  );
}

export default JuristaMark;
