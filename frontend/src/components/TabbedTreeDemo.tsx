import { useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import TreeTableDemo from './TreeTableDemo';
import TreeDemo from './TreeDemo';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const TabbedTreeDemo = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [randomMessage, setRandomMessage] = useState<string>('');
  const [selectedNodeInfo, setSelectedNodeInfo] = useState<{
    type: 'tree' | 'treetable';
    key: string;
    label?: string;
    details?: string;
  } | null>(null);

  // Function to generate a random message
  const generateRandomMessage = (): string => {
    const messages = [
      "Great choice! This node looks interesting.",
      "You've selected a node with unique properties.",
      "This node has special characteristics worth exploring.",
      "Selection noted! This node contains valuable data.",
      "Excellent pick! This node is part of an important hierarchy.",
      "Node selected successfully! It has a unique coding identifier.",
      "You've chosen a node with interesting hierarchical relationships.",
      "This selection reveals insights about the tree structure.",
      "Well done! This node represents meaningful data in the system.",
      "Selection confirmed! Analyzing node properties now...",
      "Node activated! Processing its unique coding identifier.",
      "You've discovered an important node in the hierarchy.",
      "This node selection unlocks new insights.",
      "Selection recorded! Node data is being analyzed.",
      "Great find! This node has special significance.",
      "Node selected! Examining its position in the tree.",
      "You've picked a node with interesting connections.",
      "Selection processed! Node details are now available.",
      "Excellent discovery! This node has unique attributes.",
      "Node chosen! Exploring its hierarchical context."
    ];
    
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  };

  // Handle node selection from TreeDemo
  const handleTreeNodeSelect = (nodeKey: string, nodeLabel?: string) => {
    setSelectedNodeInfo({
      type: 'tree',
      key: nodeKey,
      label: nodeLabel,
      details: `Tree node selected: ${nodeKey}`
    });
    setRandomMessage(generateRandomMessage());
  };

  // Handle node selection from TreeTableDemo
  const handleTreeTableNodeSelect = (nodeKey: string, nodeData?: any) => {
    setSelectedNodeInfo({
      type: 'treetable',
      key: nodeKey,
      label: nodeData?.name,
      details: `TreeTable node selected: ${nodeKey}`
    });
    setRandomMessage(generateRandomMessage());
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Tree Components Demo</h2>
        <p className="text-gray-600">
          A tabbed interface showing both TreeTable and Tree components with hierarchical data.
          Select any node in either component to see a random message in the right panel.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main content area with tabs - takes 3 columns */}
        <div className="lg:col-span-3">
          <div className="card" style={{ border: '2px solid #e0e0e0', borderRadius: '0' }}>
            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
              <TabPanel header="Tree Component">
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-4">Tree Demo</h3>
                  <p className="text-gray-600 mb-4">
                    A tree component showing hierarchical data with exactly 100 nodes across 3 levels.
                    Each node has only one property: <code>coding</code> containing a unique ID.
                  </p>
                  <TreeDemo onNodeSelect={handleTreeNodeSelect} />
                </div>
              </TabPanel>
              <TabPanel header="TreeTable Component">
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-4">TreeTable Demo</h3>
                  <p className="text-gray-600 mb-4">
                    A tree table showing hierarchical data with 100 nodes (5 years × 5 books × 4 authors).
                    Click the plus/minus icons to expand/collapse nodes.
                  </p>
                  <TreeTableDemo onNodeSelect={handleTreeTableNodeSelect} />
                </div>
              </TabPanel>
            </TabView>
          </div>
        </div>

        {/* Right panel for random messages - takes 1 column */}
        <div className="lg:col-span-1">
          <div className="card p-4" style={{ border: '2px solid #e0e0e0', borderRadius: '0', height: '100%' }}>
            <h3 className="font-bold text-lg mb-4">Selection Panel</h3>
            
            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-2">Active Tab:</h4>
              <div className="p-3 bg-blue-50 rounded">
                <div className="flex items-center">
                  <i className={`pi ${activeIndex === 0 ? 'pi-sitemap' : 'pi-table'} mr-2 text-blue-500`}></i>
                  <span className="font-medium">
                    {activeIndex === 0 ? 'Tree Component' : 'TreeTable Component'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Switch tabs to view different tree components
                </p>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-2">Selected Node:</h4>
              {selectedNodeInfo ? (
                <div className="p-3 bg-blue-50 rounded">
                  <div className="flex items-center mb-2">
                    <i className={`pi ${selectedNodeInfo.type === 'tree' ? 'pi-sitemap' : 'pi-table'} mr-2 text-blue-500`}></i>
                    <span className="text-sm font-medium">
                      {selectedNodeInfo.type === 'tree' ? 'Tree Node' : 'TreeTable Node'}
                    </span>
                  </div>
                  <p className="font-mono text-sm break-all mb-1">{selectedNodeInfo.key}</p>
                  {selectedNodeInfo.label && (
                    <p className="text-sm text-gray-700 mb-1">Label: {selectedNodeInfo.label}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    {selectedNodeInfo.details}
                  </p>
                </div>
              ) : (
                <div className="p-3 bg-gray-50 rounded text-gray-500">
                  <div className="flex items-center">
                    <i className="pi pi-info-circle mr-2"></i>
                    <span>No node selected yet</span>
                  </div>
                  <p className="text-xs mt-1">Select a node in either component to see details here</p>
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-2">Random Message:</h4>
              {randomMessage ? (
                <div className="p-3 bg-green-50 rounded border border-green-200">
                  <div className="flex items-start">
                    <i className="pi pi-info-circle mr-2 mt-0.5 text-green-500"></i>
                    <div>
                      <p className="text-sm text-gray-700">{randomMessage}</p>
                      <p className="text-xs text-gray-500 mt-2 italic">
                        A new random message appears each time you select a node
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-gray-50 rounded text-gray-500">
                  <div className="flex items-center">
                    <i className="pi pi-comment mr-2"></i>
                    <span>No message yet</span>
                  </div>
                  <p className="text-xs mt-1">Select a node to generate a random message</p>
                </div>
              )}
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">How to Use:</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <i className="pi pi-arrow-right mr-2 mt-0.5 text-gray-400"></i>
                  <span>Switch between <strong>TreeTable</strong> and <strong>Tree</strong> tabs</span>
                </li>
                <li className="flex items-start">
                  <i className="pi pi-mouse mr-2 mt-0.5 text-gray-400"></i>
                  <span>Click on any node in either component to select it</span>
                </li>
                <li className="flex items-start">
                  <i className="pi pi-comment mr-2 mt-0.5 text-gray-400"></i>
                  <span>A random message will appear in this panel</span>
                </li>
                <li className="flex items-start">
                  <i className="pi pi-info-circle mr-2 mt-0.5 text-gray-400"></i>
                  <span>Node details will be shown in the Selected Node section</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50" style={{ borderRadius: '0' }}>
        <h3 className="font-semibold text-gray-700 mb-2">Component Comparison:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Tree Component</h4>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Traditional tree visualization</li>
              <li>Customizable node templates</li>
              <li>Better for hierarchical navigation</li>
              <li>More visual hierarchy cues</li>
              <li>Built-in search/filter functionality</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-2">TreeTable Component</h4>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Table-like structure with columns</li>
              <li>Supports sorting and filtering</li>
              <li>Better for displaying multiple properties</li>
              <li>Built-in expand/collapse icons</li>
              <li>Scrollable with fixed headers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabbedTreeDemo;