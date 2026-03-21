import React from 'react';
import TreeDemo from './TreeDemo';

const TreeDemoConfigExample: React.FC = () => {
  const handleNodeSelect = (nodeKey: string, nodeLabel: string) => {
    console.log('Node selected:', nodeKey, nodeLabel);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">TreeDemo Configuration Examples</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Example 1: Default configuration (backward compatibility) */}
        <div className="border border-gray-300 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Example 1: Default Configuration</h3>
          <p className="text-gray-600 mb-4">
            Using TreeDemo without any configuration - should work exactly as before.
          </p>
          <div className="border border-gray-200 rounded p-2" style={{ height: '400px', overflow: 'auto' }}>
            <TreeDemo onNodeSelect={handleNodeSelect} />
          </div>
          <div className="mt-3 p-3 bg-gray-50 rounded">
            <code className="text-sm">
              {`<TreeDemo onNodeSelect={handleNodeSelect} />`}
            </code>
          </div>
        </div>

        {/* Example 2: Custom configuration */}
        <div className="border border-gray-300 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Example 2: Custom Configuration</h3>
          <p className="text-gray-600 mb-4">
            Using TreeDemo with custom configuration - hiding buttons, using default icons.
          </p>
          <div className="border border-gray-200 rounded p-2" style={{ height: '400px', overflow: 'auto' }}>
            <TreeDemo 
              onNodeSelect={handleNodeSelect}
              config={{
                showExpandAllButton: false,
                showCollapseAllButton: false,
                usePlusMinusIcons: false,
                showFilter: true,
                showNodeDetails: false,
                showRandomMessage: true
              }}
            />
          </div>
          <div className="mt-3 p-3 bg-gray-50 rounded">
            <code className="text-sm">
              {`<TreeDemo \n  onNodeSelect={handleNodeSelect}\n  config={{\n    showExpandAllButton: false,\n    showCollapseAllButton: false,\n    usePlusMinusIcons: false,\n    showFilter: true,\n    showNodeDetails: false,\n    showRandomMessage: true\n  }}\n/>`}
            </code>
          </div>
        </div>

        {/* Example 3: Minimal configuration */}
        <div className="border border-gray-300 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Example 3: Minimal Configuration</h3>
          <p className="text-gray-600 mb-4">
            Using TreeDemo with minimal UI - only tree with filter.
          </p>
          <div className="border border-gray-200 rounded p-2" style={{ height: '400px', overflow: 'auto' }}>
            <TreeDemo 
              onNodeSelect={handleNodeSelect}
              config={{
                showExpandAllButton: false,
                showCollapseAllButton: false,
                usePlusMinusIcons: true,
                showFilter: true,
                showNodeDetails: false,
                showRandomMessage: false
              }}
            />
          </div>
          <div className="mt-3 p-3 bg-gray-50 rounded">
            <code className="text-sm">
              {`<TreeDemo \n  onNodeSelect={handleNodeSelect}\n  config={{\n    showExpandAllButton: false,\n    showCollapseAllButton: false,\n    usePlusMinusIcons: true,\n    showFilter: true,\n    showNodeDetails: false,\n    showRandomMessage: false\n  }}\n/>`}
            </code>
          </div>
        </div>

        {/* Example 4: Partial configuration */}
        <div className="border border-gray-300 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Example 4: Partial Configuration</h3>
          <p className="text-gray-600 mb-4">
            Using TreeDemo with partial configuration - only overriding specific settings.
          </p>
          <div className="border border-gray-200 rounded p-2" style={{ height: '400px', overflow: 'auto' }}>
            <TreeDemo 
              onNodeSelect={handleNodeSelect}
              config={{
                showExpandAllButton: false, // Only hide expand all button
                usePlusMinusIcons: false,   // Use default chevron icons
              }}
            />
          </div>
          <div className="mt-3 p-3 bg-gray-50 rounded">
            <code className="text-sm">
              {`<TreeDemo \n  onNodeSelect={handleNodeSelect}\n  config={{\n    showExpandAllButton: false,\n    usePlusMinusIcons: false\n  }}\n/>`}
            </code>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded">
        <h3 className="font-semibold text-blue-800 mb-2">Configuration Options Summary:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-blue-700 mb-1">Button Controls:</h4>
            <ul className="text-sm text-blue-600 space-y-1">
              <li><code>showExpandAllButton</code>: Show/hide "Expand All" button (default: true)</li>
              <li><code>showCollapseAllButton</code>: Show/hide "Collapse All" button (default: true)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-700 mb-1">Icon Configuration:</h4>
            <ul className="text-sm text-blue-600 space-y-1">
              <li><code>usePlusMinusIcons</code>: Use plus/minus icons instead of chevrons (default: true)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-700 mb-1">UI Controls:</h4>
            <ul className="text-sm text-blue-600 space-y-1">
              <li><code>showFilter</code>: Show/hide search filter (default: true)</li>
              <li><code>showNodeDetails</code>: Show/hide node details panel (default: true)</li>
              <li><code>showRandomMessage</code>: Show/hide random message panel (default: true)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-700 mb-1">Data Configuration (future):</h4>
            <ul className="text-sm text-blue-600 space-y-1">
              <li><code>maxNodes</code>: Maximum number of nodes to generate</li>
              <li><code>levels</code>: Number of tree levels</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeDemoConfigExample;