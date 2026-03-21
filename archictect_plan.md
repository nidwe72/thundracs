# Architecture Plan: TreeDemo with Far-Right Title Bar Icons

## Task Description
1. Make TreeDemo component generic with configuration capabilities
2. Add configuration object to control component behavior
3. Move "Expand All" and "Collapse All" from buttons to icons in Panel title bar
4. Position icons at **far right** of title bar with title text on left and empty space between
5. Add plus/minus icons for expand/collapse toggles in tree nodes
6. Configuration should control visibility of title bar icons
7. **Default: `showExpandAllIcon: false`** (Expand All icon hidden by default)

## Overview
Transform TreeDemo into a configurable component with improved UI:
- Move expand/collapse controls from content area to Panel title bar
- Use icons instead of text buttons
- **Position icons at far right** of title bar with proper spacing
- Title text on left → empty space → icons on far right
- Add plus/minus icons for tree node toggles
- Make all features configurable
- **Default behavior: Only "Collapse All" icon visible**

## Key Requirements
1. **Far Right Positioning**: Icons positioned at absolute far right of title bar
2. **Empty Space**: Title text on left, empty space between title and icons
3. **Icon Alignment**: Icons grouped together at far right edge
4. **Configuration Interface**: Clear configuration for icon visibility
5. **Default Configuration**: `showExpandAllIcon: false` (Expand icon hidden by default)
6. **Icon Customization**: Plus/minus icons for tree node toggles
7. **Backward Compatibility**: Existing usage works unchanged
8. **Extensibility**: Easy to add future configuration

## Current Analysis
1. **Current Layout**:
   - Panel with "Config tree" header text
   - Buttons in content area: "Expand All" (text + pi-plus), "Collapse All" (text + pi-minus)
   
2. **Panel Component**: PrimeReact `Panel` with simple text header
3. **Goal Layout**:
   ```
   [Config tree]                               [-]   (Expand icon hidden by default)
   ^ Title text    ^ Empty space    ^ Only collapse icon visible
   ```

## Architecture Design

### Configuration Interface
```typescript
interface TreeDemoConfig {
  // Title bar icon controls
  showExpandAllIcon?: boolean;    // Show expand icon in title bar (default: false)
  showCollapseAllIcon?: boolean;  // Show collapse icon in title bar (default: true)
  
  // Tree node icon configuration
  usePlusMinusIcons?: boolean;    // Use plus/minus for node toggles
  
  // UI configuration
  showFilter?: boolean;
  showNodeDetails?: boolean;
  showRandomMessage?: boolean;
  
  // Title configuration
  title?: string;                 // Custom panel title
  
  // Icon styling (future)
  iconSize?: 'small' | 'medium' | 'large';
  iconColor?: string;
  iconSpacing?: number;          // Space between icons
}
```

### Component Props
```typescript
interface TreeDemoProps {
  onNodeSelect?: (nodeKey: string, nodeLabel: string) => void;
  config?: TreeDemoConfig | Partial<TreeDemoConfig>;
  nodes?: TreeNode[]; // Optional custom data
}
```

### Default Configuration
```typescript
const defaultConfig: TreeDemoConfig = {
  showExpandAllIcon: false,      // Expand icon HIDDEN by default
  showCollapseAllIcon: true,     // Collapse icon VISIBLE by default
  usePlusMinusIcons: true,
  showFilter: true,
  showNodeDetails: true,
  showRandomMessage: true,
  title: 'Config tree',
  iconSpacing: 8 // pixels between icons
};
```

## Implementation Steps

### Phase 1: Configuration Infrastructure
1. **Define Configuration Interface**
   - Create `TreeDemoConfig` with icon visibility controls
   - Set `showExpandAllIcon: false` as default
   - Include title and spacing options

2. **Update Component Props**
   - Add `config` prop accepting partial/full config
   - Create `mergeConfig()` helper function

3. **Configuration Helper**
   - Merge user config with defaults
   - Handle undefined/partial configurations
   - Ensure `showExpandAllIcon` defaults to `false`

### Phase 2: Far-Right Title Bar Icons
1. **Custom Title Bar Component**
   - Create `TitleBarWithFarRightIcons` component
   - Accepts: title, showExpandIcon, showCollapseIcon, onExpandAll, onCollapseAll
   - Implements: title left → flex space → icons far right
   - **By default: Only shows collapse icon**

2. **Layout Implementation**
   - Use flexbox with `justify-content: space-between`
   - Title on left with `flex: 1` or `flex-grow: 1`
   - Icons container on right with `flex-shrink: 0`
   - Ensure icons stay at far right regardless of title length

3. **Panel Integration**
   - Replace `header="Config tree"` with custom component
   - Pass configuration and handler functions
   - Maintain Panel styling and functionality

4. **Remove Old Buttons**
   - Remove button group from content area
   - Update any button-related logic

### Phase 3: Tree Node Plus/Minus Icons
1. **Enhanced Node Template**
   - Modify `nodeTemplate` to use plus/minus icons based on config
   - Render `pi-plus` for collapsed, `pi-minus` for expanded
   - Only for nodes with children

2. **CSS Updates**
   - Adjust styling if needed for new icons
   - Ensure visual consistency

### Phase 4: Integration and Testing
1. **Update Expand/Collapse Logic**
   - Ensure functions work with new icon triggers
   - Test expand/collapse all functionality

2. **Test Layout and Responsiveness**
   - Icons remain at far right on all screen sizes
   - Empty space between title and icons
   - **Default: Only collapse icon visible**
   - Proper alignment and spacing

## Component Structure

### Title Bar with Far-Right Icons (Default: Only Collapse Icon)
```typescript
interface TitleBarProps {
  title: string;
  showExpandIcon: boolean;
  showCollapseIcon: boolean;
  onExpandAll: () => void;
  onCollapseAll: () => void;
  iconSpacing?: number;
}

const TitleBarWithFarRightIcons: React.FC<TitleBarProps> = ({
  title,
  showExpandIcon,
  showCollapseIcon,
  onExpandAll,
  onCollapseAll,
  iconSpacing = 8
}) => {
  // Only render icons container if at least one icon is visible
  const hasVisibleIcons = showExpandIcon || showCollapseIcon;
  
  return (
    <div className="flex justify-between items-center w-full">
      {/* Title on left - takes available space */}
      <div className="flex-1 min-w-0">
        <span className="font-semibold truncate">{title}</span>
      </div>
      
      {/* Empty flex space between title and icons (only if icons exist) */}
      {hasVisibleIcons && <div className="flex-1" />}
      
      {/* Icons container on far right - doesn't shrink */}
      {hasVisibleIcons && (
        <div className="flex-shrink-0 flex items-center" style={{ gap: `${iconSpacing}px` }}>
          {showExpandIcon && (
            <button
              onClick={onExpandAll}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
              title="Expand All"
            >
              <i className="pi pi-plus text-gray-600 hover:text-gray-800 text-sm"></i>
            </button>
          )}
          
          {showCollapseIcon && (
            <button
              onClick={onCollapseAll}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
              title="Collapse All"
            >
              <i className="pi pi-minus text-gray-600 hover:text-gray-800 text-sm"></i>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
```

### Updated TreeDemo Component with Default Configuration
```typescript
const TreeDemo: React.FC<TreeDemoProps> = ({ 
  onNodeSelect, 
  config: userConfig 
}) => {
  // Merge configuration with defaults (showExpandAllIcon: false)
  const config = useMemo(() => mergeConfig(userConfig), [userConfig]);
  
  // State
  const [nodes, setNodes] = useState<TreeNode[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<{ [key: string]: boolean }>({});
  
  // Expand/Collapse handlers
  const handleExpandAll = useCallback(() => {
    const allKeys: { [key: string]: boolean } = {};
    const expandAll = (nodeList: TreeNode[]) => {
      nodeList.forEach(node => {
        allKeys[node.key] = true;
        if (node.children) expandAll(node.children);
      });
    };
    expandAll(nodes);
    setExpandedKeys(allKeys);
  }, [nodes]);
  
  const handleCollapseAll = useCallback(() => {
    setExpandedKeys({});
  }, []);
  
  // Enhanced node template
  const nodeTemplate = useCallback((node: TreeNode) => {
    const isExpanded = expandedKeys[node.key];
    const hasChildren = node.children && node.children.length > 0;
    
    return (
      <div className="flex items-center">
        {/* Toggle icon for nodes with children */}
        {hasChildren && config.usePlusMinusIcons && (
          <i className={`pi ${isExpanded ? 'pi-minus' : 'pi-plus'} mr-2 text-gray-500`} />
        )}
        
        {/* Node content */}
        <div className="font-mono text-sm">
          {node.coding}
        </div>
      </div>
    );
  }, [expandedKeys, config.usePlusMinusIcons]);
  
  return (
    <Panel
      header={
        <TitleBarWithFarRightIcons
          title={config.title}
          showExpandIcon={config.showExpandAllIcon} // Default: false
          showCollapseIcon={config.showCollapseAllIcon} // Default: true
          onExpandAll={handleExpandAll}
          onCollapseAll={handleCollapseAll}
          iconSpacing={config.iconSpacing}
        />
      }
      className="h-full"
    >
      {/* Tree without buttons in content */}
      <Tree
        value={nodes}
        expandedKeys={expandedKeys}
        onToggle={(e) => setExpandedKeys(e.value)}
        nodeTemplate={nodeTemplate}
        selectionMode="single"
        filter={config.showFilter}
        filterPlaceholder="Search nodes..."
      />
    </Panel>
  );
};
```

## Default Behavior

### Visual Result (Default Configuration)
```
┌─────────────────────────────────────────────────────┐
│ Config tree                                    [-]   │
├─────────────────────────────────────────────────────┤
│ • Root Node 1                                      │
│   ∟ Child 1                                        │
│   ∟ Child 2                                        │
│ • Root Node 2                                      │
└─────────────────────────────────────────────────────┘
```

**Default Configuration:**
- `showExpandAllIcon: false` → `[+]` icon **HIDDEN**
- `showCollapseAllIcon: true` → `[-]` icon **VISIBLE**
- Title: "Config tree" on left
- Empty space between title and collapse icon
- Collapse icon at far right

## Usage Examples

### Default Usage (No Config)
```typescript
<TreeDemo onNodeSelect={handleSelect} />
```
**Result:** Only collapse icon `[-]` visible at far right

### Show Both Icons
```typescript
<TreeDemo 
  onNodeSelect={handleSelect}
  config={{
    showExpandAllIcon: true,  // Explicitly show expand icon
    showCollapseAllIcon: true // Show collapse icon (default)
  }}
/>
```
**Result:** Both `[+]` and `[-]` icons visible at far right

### Show Only Expand Icon
```typescript
<TreeDemo 
  config={{
    showExpandAllIcon: true,   // Show expand icon
    showCollapseAllIcon: false // Hide collapse icon
  }}
/>
```
**Result:** Only `[+]` icon visible at far right

### Hide All Icons
```typescript
<TreeDemo 
  config={{
    showExpandAllIcon: false,  // Hide expand icon (default)
    showCollapseAllIcon: false // Hide collapse icon
  }}
/>
```
**Result:** No icons, only title text

## CSS Implementation

### Title Bar Styling for Single Icon (Default)
```css
/* When only one icon is visible */
.tree-demo-single-icon {
  margin-left: auto; /* Push single icon to far right */
}

/* Adjust empty space when only one icon */
.tree-demo-title-spacer {
  flex: 1;
  min-width: 1rem; /* Less space for single icon */
}
```

## Testing Strategy

### Default Configuration Tests
1. **Expand Icon Hidden**: `[+]` icon not visible by default
2. **Collapse Icon Visible**: `[-]` icon visible by default
3. **Positioning**: Collapse icon at far right of title bar
4. **Empty Space**: Proper space between title and single icon

### Configuration Override Tests
1. **Show Expand Icon**: Can override default to show `[+]`
2. **Hide Collapse Icon**: Can hide default `[-]` icon
3. **Both Icons**: Can show both icons when configured
4. **No Icons**: Can hide all icons

### Layout Tests
1. **Single Icon Layout**: Proper spacing for single icon at far right
2. **Two Icon Layout**: Proper spacing between two icons at far right
3. **Responsive**: Icons stay at far right on all screen sizes
4. **Title Truncation**: Long titles don't affect icon positioning

## Migration Considerations

### Backward Compatibility
1. **Existing Code**: Works unchanged (collapse icon visible by default)
2. **New Default**: `showExpandAllIcon: false` is new default behavior
3. **Explicit Override**: Users must explicitly set `showExpandAllIcon: true` to show expand icon

### User Experience
1. **Default State**: Most users will only see collapse icon
2. **Cleaner UI**: Less visual clutter by default
3. **Intentional Expansion**: Users must explicitly enable expand icon if needed
4. **Common Use Case**: Collapsing tree is more common than expanding all

### Example Migration
```typescript
// Before (implicit behavior): Both buttons in content area
<TreeDemo onNodeSelect={handleSelect} />

// After (default): Only collapse icon in title bar
<TreeDemo onNodeSelect={handleSelect} />

// After (explicit both icons): Both icons in title bar
<TreeDemo 
  onNodeSelect={handleSelect}
  config={{ showExpandAllIcon: true }}
/>
```