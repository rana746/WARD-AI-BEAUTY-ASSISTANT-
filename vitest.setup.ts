import { vi } from "vitest";
import "@testing-library/jest-dom/vitest";

Object.defineProperty(HTMLElement.prototype, "scrollTo", {
  configurable: true,
  value: vi.fn(),
});
