# Architecture Plan: Add Plus/Minus Icons to TreeDemo Component

## Task Description
Add plus (+) icons for expandable nodes and minus (-) icons for collapsed nodes in the TreeDemo.tsx component.

## Overview
The TreeDemo component currently uses PrimeReact's Tree component with default toggle icons. We need to customize the toggle icons to show plus (+) for collapsed/expandable nodes and minus (-) for expanded nodes.

## Key Requirements
1. Replace default toggle icons with plus/minus icons
2. Plus icon (+) for collapsed nodes (nodes that can be expanded)
3. Minus icon (-) for expanded nodes (nodes that can be collapsed)
4. Maintain existing functionality (expand/collapse all buttons, selection, filtering)
5. Ensure visual consistency with existing styling

## Current Analysis
1. **Component**: TreeDemo.tsx uses PrimeReact Tree component
2. **Current Toggle**: Default PrimeReact toggle (likely chevron icons)
3. **Styling**: TreeDemo.css has custom styling for `.p-tree-toggler`
4. **Icons Available**: PrimeIcons library (already imported via primeicons.css)
5. **Relevant PrimeIcons**: 
   - `pi-plus` for plus icon
   - `pi-minus` for minus icon
   - `pi-chevron-right` (current collapsed)
   - `pi-chevron-down` (current expanded)

## Architecture Design

### Approach 1: Custom Node Template with Conditional Icons
- Create a custom `nodeTemplate` that includes conditional plus/minus icons
- Use `expandedKeys` prop to determine if node is expanded
- Render `pi-plus` when collapsed, `pi-minus` when expanded
- Only show icons for nodes with children

### Approach 2: CSS-Based Icon Replacement
- Override PrimeReact's default toggle icons via CSS
- Use CSS pseudo-elements or background images
- Less flexible but simpler implementation

### Recommended Approach: Approach 1
- More control over icon rendering
- Can conditionally show/hide icons based on node properties
- Easier to maintain and debug
- Consistent with existing `nodeTemplate` pattern

## Implementation Steps

### Step 1: Analyze Current Node Template
- Current `nodeTemplate` only shows `coding` property
- Need to modify to include toggle icons

### Step 2: Create Enhanced Node Template
- Add conditional icon rendering based on `expandedKeys` state
- Only show icons for nodes with `children` property
- Use `pi-plus` for collapsed, `pi-minus` for expanded

### Step 3: Update CSS for New Icons
- Adjust `.p-tree-toggler` styling if needed
- Ensure proper spacing and alignment
- Maintain hover states

### Step 4: Hide Default Toggle Icons
- Option 1: Set `togglerTemplate` to empty/override
- Option 2: Hide default toggler via CSS
- Option 3: Use PrimeReact's `togglerTemplate` prop

### Step 5: Test Implementation
- Verify plus/minus icons appear correctly
- Test expand/collapse functionality
- Ensure "Expand All"/"Collapse All" buttons still work
- Verify selection and filtering still functional

## Considerations

### Edge Cases
1. Nodes without children should not show toggle icons
2. Root-level nodes with children should show icons
3. Icons should update immediately when expanding/collapsing
4. "Expand All"/"Collapse All" should update all icons

### Performance
- Icon rendering should not impact tree performance
- Conditional rendering based on `expandedKeys` is efficient

### Visual Consistency
- Icons should match existing color scheme (#6b7280 for normal, #374151 on hover)
- Proper spacing between icon and node content
- Responsive design maintained

### PrimeReact Version Compatibility
- Ensure approach works with current PrimeReact version
- Check if `togglerTemplate` prop is available/supported

## Testing Strategy

### Functional Testing
1. Click plus icon → node expands, icon changes to minus
2. Click minus icon → node collapses, icon changes to plus
3. "Expand All" button → all icons show as minus
4. "Collapse All" button → all icons show as plus
5. Nodes without children → no toggle icons

### Visual Testing
1. Icons properly aligned with node content
2. Hover states work correctly
3. Selected node styling unaffected
4. Responsive behavior on different screen sizes

### Integration Testing
1. Search/filter functionality still works
2. Node selection still works
3. Random message generation on selection
4. Split panel layout unaffected