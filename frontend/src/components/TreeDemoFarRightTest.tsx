import React from 'react';
import TreeDemo from './TreeDemo';

const TreeDemoFarRightTest: React.FC = () => {
  const handleNodeSelect = (nodeKey: string, nodeLabel: string) => {
    console.log('Node selected:', nodeKey, nodeLabel);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">TreeDemo Far-Right Icons Test</h2>
      <p className="text-gray-600 mb-6">
        Testing the new far-right icon positioning with different configurations.
        The icons should be positioned at the absolute far right of the title bar,
        with empty space between the title text and icons.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Test 1: Default configuration with far-right icons */}
        <div className="border border-gray-300 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Test 1: Default Configuration</h3>
          <p className="text-gray-600 mb-4">
            Default config with both icons at far right, 8px spacing.
          </p>
          <div className="border border-gray-200 rounded p-2" style={{ height: '400px', overflow: 'auto' }}>
            <TreeDemo onNodeSelect={handleNodeSelect} />
          </div>
          <div className="mt-3 p-3 bg-gray-50 rounded">
            <code className="text-sm">
              {`<TreeDemo onNodeSelect={handleNodeSelect} />`}
            </code>
            <p className="text-xs text-gray-500 mt-2">
              Expected: Title "Config tree" on left, empty space, [+] [-] icons at far right
            </p>
          </div>
        </div>

        {/* Test 2: Custom title with increased spacing */}
        <div className="border border-gray-300 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Test 2: Custom Title & Spacing</h3>
          <p className="text-gray-600 mb-4">
            Custom title with 16px icon spacing (double default).
          </p>
          <div className="border border-gray-200 rounded p-2" style={{ height: '400px', overflow: 'auto' }}>
            <TreeDemo 
              onNodeSelect={handleNodeSelect}
              config={{
                title: 'Project Structure Tree View',
                iconSpacing: 16,
                showExpandAllIcon: true,
                showCollapseAllIcon: true
              }}
            />
          </div>
          <div className="mt-3 p-3 bg-gray-50 rounded">
            <code className="text-sm">
              {`<TreeDemo \n  onNodeSelect={handleNodeSelect}\n  config={{\n    title: 'Project Structure Tree View',\n    iconSpacing: 16\n  }}\n/>`}
            </code>
            <p className="text-xs text-gray-500 mt-2">
              Expected: Longer title on left, more space between icons (16px)
            </p>
          </div>
        </div>

        {/* Test 3: Only expand icon visible */}
        <div className="border border-gray-300 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Test 3: Only Expand Icon</h3>
          <p className="text-gray-600 mb-4">
            Showing only the expand icon at far right.
          </p>
          <div className="border border-gray-200 rounded p-2" style={{ height: '400px', overflow: 'auto' }}>
            <TreeDemo 
              onNodeSelect={handleNodeSelect}
              config={{
                title: 'Expand Only',
                showExpandAllIcon: true,
                showCollapseAllIcon: false,
                iconSpacing: 8
              }}
            />
          </div>
          <div className="mt-3 p-3 bg-gray-50 rounded">
            <code className="text-sm">
              {`<TreeDemo \n  onNodeSelect={handleNodeSelect}\n  config={{\n    title: 'Expand Only',\n    showExpandAllIcon: true,\n    showCollapseAllIcon: false\n  }}\n/>`}
            </code>
            <p className="text-xs text-gray-500 mt-2">
              Expected: Only [+] icon at far right
            </p>
          </div>
        </div>

        {/* Test 4: No title bar icons */}
        <div className="border border-gray-300 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Test 4: No Title Bar Icons</h3>
          <p className="text-gray-600 mb-4">
            Hiding both icons - only title text visible.
          </p>
          <div className="border border-gray-200 rounded p-2" style={{ height: '400px', overflow: 'auto' }}>
            <TreeDemo 
              onNodeSelect={handleNodeSelect}
              config={{
                title: 'Tree Without Icons',
                showExpandAllIcon: false,
                showCollapseAllIcon: false
              }}
            />
          </div>
          <div className="mt-3 p-3 bg-gray-50 rounded">
            <code className="text-sm">
              {`<TreeDemo \n  onNodeSelect={handleNodeSelect}\n  config={{\n    title: 'Tree Without Icons',\n    showExpandAllIcon: false,\n    showCollapseAllIcon: false\n  }}\n/>`}
            </code>
            <p className="text-xs text-gray-500 mt-2">
              Expected: Only title text, no icons at far right
            </p>
          </div>
        </div>

        {/* Test 5: Very long title */}
        <div className="border border-gray-300 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Test 5: Very Long Title</h3>
          <p className="text-gray-600 mb-4">
            Testing with a very long title that should truncate.
          </p>
          <div className="border border-gray-200 rounded p-2" style={{ height: '400px', overflow: 'auto' }}>
            <TreeDemo 
              onNodeSelect={handleNodeSelect}
              config={{
                title: 'This is a very long title for the tree component that should demonstrate text truncation with ellipsis when it gets too long',
                iconSpacing: 8
              }}
            />
          </div>
          <div className="mt-3 p-3 bg-gray-50 rounded">
            <code className="text-sm">
              {`<TreeDemo \n  onNodeSelect={handleNodeSelect}\n  config={{\n    title: 'This is a very long title...',\n    iconSpacing: 8\n  }}\n/>`}
            </code>
            <p className="text-xs text-gray-500 mt-2">
              Expected: Long title truncated with ellipsis, icons stay at far right
            </p>
          </div>
        </div>

        {/* Test 6: Plus/Minus icons disabled */}
        <div className="border border-gray-300 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Test 6: Chevron Icons (Not Plus/Minus)</h3>
          <p className="text-gray-600 mb-4">
            Using default chevron icons instead of plus/minus for tree nodes.
          </p>
          <div className="border border-gray-200 rounded p-2" style={{ height: '400px', overflow: 'auto' }}>
            <TreeDemo 
              onNodeSelect={handleNodeSelect}
              config={{
                title: 'Chevron Icons',
                usePlusMinusIcons: false,
                iconSpacing: 8
              }}
            />
          </div>
          <div className="mt-3 p-3 bg-gray-50 rounded">
            <code className="text-sm">
              {`<TreeDemo \n  onNodeSelect={handleNodeSelect}\n  config={{\n    title: 'Chevron Icons',\n    usePlusMinusIcons: false\n  }}\n/>`}
            </code>
            <p className="text-xs text-gray-500 mt-2">
              Expected: Tree nodes use chevron icons (→/↓) instead of plus/minus
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded">
        <h3 className="font-semibold text-blue-800 mb-2">Far-Right Icon Implementation Summary:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-blue-700 mb-1">Layout Features:</h4>
            <ul className="text-sm text-blue-600 space-y-1">
              <li>✓ Title text aligned to left side of title bar</li>
              <li>✓ Empty flex space between title and icons</li>
              <li>✓ Icons positioned at absolute far right</li>
              <li>✓ Icons stay at far right regardless of title length</li>
              <li>✓ Title truncates with ellipsis when too long</li>
              <li>✓ Icons remain visible on all screen sizes</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-700 mb-1">Configuration Options:</h4>
            <ul className="text-sm text-blue-600 space-y-1">
              <li><code>showExpandAllIcon</code>: Show/hide [+] icon (default: true)</li>
              <li><code>showCollapseAllIcon</code>: Show/hide [-] icon (default: true)</li>
              <li><code>iconSpacing</code>: Space between icons in pixels (default: 8)</li>
              <li><code>title</code>: Custom title text (default: 'Config tree')</li>
              <li><code>usePlusMinusIcons</code>: Tree node icons (default: true = plus/minus)</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-white border border-blue-300 rounded">
          <h4 className="font-medium text-blue-700 mb-1">Visual Layout:</h4>
          <div className="text-sm text-gray-700 font-mono bg-gray-100 p-2 rounded">
            <div className="flex justify-between items-center">
              <span className="truncate">[Title text]</span>
              <span className="text-gray-400">[Empty space]</span>
              <span>[+] [-]</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Title left → Empty flex space → Icons at far right
          </p>
        </div>
      </div>
    </div>
  );
};

export default TreeDemoFarRightTest;