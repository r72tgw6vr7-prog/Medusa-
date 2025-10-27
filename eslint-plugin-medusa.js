/**
 * eslint-plugin-medusa
 * Custom ESLint rules to enforce Medusa Design System.
 *
 * Rules:
 * - enforce-8px-spacing
 * - enforce-card-layout
 * - enforce-transitions
 *
 * Fixers:
 * - 8px spacing: rounds simple numeric spacing tokens to nearest 8 (safe-ish heuristic).
 * - card layout: appends "flex flex-col h-full" when missing.
 * - transitions: appends "transition duration-200 ease-out" when missing.
 */

/**
 * Utility: Extract class string from JSXAttribute value (Literal or TemplateLiteral).
 * Returns { text, isTemplate, node } where text is the raw content.
 */
function getClassTextFromAttribute(attr) {
  const v = attr && attr.value;
  if (!v) return null;

  if (v.type === "Literal" && typeof v.value === "string") {
    return { text: v.value, isTemplate: false, node: v };
  }

  if (v.type === "JSXExpressionContainer" && v.expression) {
    const expr = v.expression;
    if (expr.type === "Literal" && typeof expr.value === "string") {
      return { text: expr.value, isTemplate: false, node: expr };
    }
    if (expr.type === "TemplateLiteral" && expr.quasis && expr.quasis.length === 1) {
      // Only one quasi → no dynamic parts → safe to autofix
      return { text: expr.quasis[0].value.cooked || "", isTemplate: true, node: expr };
    }
  }

  return null; // dynamic/complex → don't attempt modification
}

/**
 * Utility: Replace the attribute value with a given class string.
 */
function makeClassFix(context, attr, newClassText) {
  const v = attr.value;

  if (v.type === "Literal" && typeof v.value === "string") {
    // Replace the string literal entirely
    return (fixer) => fixer.replaceText(v, JSON.stringify(newClassText));
  }

  if (v.type === "JSXExpressionContainer") {
    const expr = v.expression;
    if (expr.type === "Literal" && typeof expr.value === "string") {
      return (fixer) => fixer.replaceText(expr, JSON.stringify(newClassText));
    }
    if (expr.type === "TemplateLiteral" && expr.quasis && expr.quasis.length === 1) {
      // Replace with a string literal for simplicity
      return (fixer) => fixer.replaceText(v, JSON.stringify(newClassText));
    }
  }

  // Fallback: do not fix if shape is complex
  return null;
}

/**
 * Utility: Tokenize Tailwind class string sensibly.
 */
function splitClasses(text) {
  return text
    .split(/\s+/g)
    .map((t) => t.trim())
    .filter(Boolean);
}

/**
 * Utility: re-join class tokens (preserve simple spacing).
 */
function joinClasses(tokens) {
  return tokens.join(" ");
}

/**
 * Spacing rule helpers
 */
const SPACING_PREFIXES = [
  "p", "px", "py", "pt", "pr", "pb", "pl",
  "m", "mx", "my", "mt", "mr", "mb", "ml",
  "gap", "space-x", "space-y"
];
function isSpacingToken(tok) {
  const core = tok.split(":").pop() || tok;
  return SPACING_PREFIXES.some((p) => core === p || core.startsWith(p + "-"));
}
function isArbitraryValueToken(tok) {
  return /\[[^\]]+\]/.test(tok);
}
function numericSuffix(tok) {
  const core = tok.split(":").pop() || tok;
  const m = core.match(/-(\d+)(?![a-zA-Z])/);
  return m ? parseInt(m[1], 10) : null;
}
function isMultipleOf8(n) {
  return n % 8 === 0;
}
function replaceNumericSuffix(tok, newNum) {
  // replace last -<num> with -<newNum>
  return tok.replace(/-(\d+)(?![a-zA-Z])/, `-${newNum}`);
}

/**
 * Card rule helpers
 */
const CARD_CUES = ["rounded", "border", "shadow", "bg-"];
const REQUIRED_CARD_CLASSES = ["flex", "flex-col", "h-full"];

function looksLikeCard(text) {
  return CARD_CUES.some((cue) => text.includes(cue));
}
function hasAllRequiredCardClasses(text) {
  return REQUIRED_CARD_CLASSES.every((cls) => text.includes(cls));
}

/**
 * Determine whether a JSXElement has 'grid' class in its className/class attribute.
 */
function elementHasGridClass(context, node) {
  let classAttr = null;
  if (!node || !node.openingElement) return false;
  for (const attr of node.openingElement.attributes || []) {
    if (attr.type !== "JSXAttribute") continue;
    if (!attr.name || (attr.name.name !== "className" && attr.name.name !== "class")) continue;
    classAttr = attr;
    const classInfo = getClassTextFromAttribute(classAttr);
    if (!classInfo) continue;
    const text = classInfo.text;
    if (/\bgrid\b/.test(text) || /\bgrid-cols-\d+/.test(text)) {
      return true;
    }
  }
  return false;
}

/**
 * Find the nearest ancestor JSXElement and check if it has grid class.
 */
function isInsideGrid(context) {
  const ancestors = context.getAncestors();
  for (let i = ancestors.length - 1; i >= 0; i--) {
    const a = ancestors[i];
    if (a && a.type === "JSXElement") {
      if (elementHasGridClass(context, a)) return true;
    }
  }
  return false;
}

export default {
  rules: {
    "enforce-8px-spacing": {
      meta: {
        type: "problem",
        docs: {
          description: "Disallow Tailwind spacing classes not on 8px scale or arbitrary spacing.",
          recommended: true
        },
        fixable: "code",
        messages: {
          arbitrary: "Arbitrary spacing value '{{token}}' is forbidden. Use multiples of 8.",
          non8: "Spacing '{{token}}' is not an 8px multiple. Consider '{{suggest}}'."
        },
        schema: []
      },
      create(context) {
        return {
          JSXAttribute(node) {
            if (!node.name || (node.name.name !== "className" && node.name.name !== "class")) return;
            const classInfo = getClassTextFromAttribute(node);
            if (!classInfo) return;

            const tokens = splitClasses(classInfo.text);
            let mutated = false;

            tokens.forEach((tok, idx) => {
              if (!isSpacingToken(tok)) return;

              const core = tok.split(":").pop() || tok;

              if (/-?(auto|px)$/.test(core)) return; // ignore auto/px tailwind keywords

              if (isArbitraryValueToken(core)) {
                context.report({
                  node,
                  messageId: "arbitrary",
                  data: { token: tok }
                });
                return;
              }

              const n = numericSuffix(core);
              if (n == null) return;
              if (!isMultipleOf8(n)) {
                const rounded = Math.max(0, Math.round(n / 8) * 8);
                const suggest = replaceNumericSuffix(core, rounded);
                context.report({
                  node,
                  messageId: "non8",
                  data: { token: tok, suggest },
                  fix: classInfo.isTemplate
                    ? null // avoid fixing dynamic template literal usage if it might be unsafe
                    : makeClassFix(context, node, (() => {
                        const newTok = replaceNumericSuffix(tok, rounded);
                        const copy = tokens.slice();
                        copy[idx] = newTok;
                        mutated = true;
                        return joinClasses(copy);
                      })())
                });
              }
            });

            // If we built fixers above, they're attached per-report; no bulk action needed here.
          }
        };
      }
    },

    "enforce-card-layout": {
      meta: {
        type: "problem",
        docs: {
          description: "Require 'flex flex-col h-full' on card-like elements inside a grid.",
          recommended: true
        },
        fixable: "code",
        messages: {
          missing: "Card-like element in a grid must include 'flex flex-col h-full'."
        },
        schema: []
      },
      create(context) {
        return {
          JSXOpeningElement(node) {
            // Extract its class
            let classAttr = null;
            for (const attr of node.attributes || []) {
              if (attr.type === "JSXAttribute" && attr.name && (attr.name.name === "className" || attr.name.name === "class")) {
                classAttr = attr;
                break;
              }
            }
            if (!classAttr) return;

            const classInfo = getClassTextFromAttribute(classAttr);
            if (!classInfo) return;

            const text = classInfo.text;
            // Must be inside a grid AND look like a card
            if (!isInsideGrid(context)) return;
            if (!looksLikeCard(text)) return;
            if (hasAllRequiredCardClasses(text)) return;

            const toAppend = REQUIRED_CARD_CLASSES.filter((cls) => !text.includes(cls));
            context.report({
              node: classAttr,
              messageId: "missing",
              fix: classInfo.isTemplate
                ? null
                : makeClassFix(context, classAttr, (text + " " + toAppend.join(" ")).trim())
            });
          }
        };
      }
    },

    "enforce-transitions": {
      meta: {
        type: "problem",
        docs: {
          description: "Elements with hover: classes must include transition and duration.",
          recommended: true
        },
        fixable: "code",
        messages: {
          missing: "Element has hover: styles but is missing transition and/or duration classes."
        },
        schema: []
      },
      create(context) {
        return {
          JSXOpeningElement(node) {
            let classAttr = null;
            for (const attr of node.attributes || []) {
              if (attr.type === "JSXAttribute" && attr.name && (attr.name.name === "className" || attr.name.name === "class")) {
                classAttr = attr;
                break;
              }
            }
            if (!classAttr) return;
            const classInfo = getClassTextFromAttribute(classAttr);
            if (!classInfo) return;

            const text = classInfo.text;
            if (!text.includes("hover:")) return;

            const hasTransition = /\btransition(-all)?\b/.test(text);
            const hasDuration = /\bduration-\d+\b/.test(text);

            if (hasTransition && hasDuration) return;

            // Default fixer adds standard, safe defaults
            context.report({
              node: classAttr,
              messageId: "missing",
              fix: classInfo.isTemplate
                ? null
                : makeClassFix(context, classAttr, (text + " transition duration-200 ease-out").trim())
            });
          }
        };
      }
    }
  }
};
