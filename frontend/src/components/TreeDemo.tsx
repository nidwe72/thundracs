import { useState, useEffect } from 'react';
import { Tree } from 'primereact/tree';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Panel } from 'primereact/panel';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './TreeDemo.css';

interface TreeNode {
  key: string;
  label: string;
  coding: string; // Unique ID
  children?: TreeNode[];
  data?: any;
}

interface TreeDemoProps {
  onNodeSelect?: (nodeKey: string, nodeLabel: string) => void;
}



const TreeDemo: React.FC<TreeDemoProps> = ({ onNodeSelect }) => {
  const [nodes, setNodes] = useState<TreeNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNodeKey, setSelectedNodeKey] = useState<string | null>(null);
  const [expandedKeys, setExpandedKeys] = useState<{ [key: string]: boolean }>({});
  const [randomMessage, setRandomMessage] = useState<string>('');
  
  // Generate dummy data with exactly 100 nodes across 3 levels
  const generateTreeData = (): TreeNode[] => {
    console.log('Generating tree data...');
    const rootNodes: TreeNode[] = [];
    let nodeCount = 0;
    
    // Level 1: 10 root nodes
    for (let i = 1; i <= 10; i++) {
      const rootNode: TreeNode = {
        key: `root-${i}`,
        label: `Root Node ${i}`,
        coding: `ROOT-${i}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        children: [],
      };
      
      // Level 2: 3 child nodes per root (total 30 nodes)
      for (let j = 1; j <= 3; j++) {
        const childNode: TreeNode = {
          key: `root-${i}-child-${j}`,
          label: `Child ${j} of Root ${i}`,
          coding: `CHILD-${i}-${j}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          children: [],
        };
        
        // Level 3: 2 grandchild nodes per child (total 60 nodes)
        for (let k = 1; k <= 2; k++) {
          const grandchildNode: TreeNode = {
            key: `root-${i}-child-${j}-grandchild-${k}`,
            label: `Grandchild ${k} of Child ${j}`,
            coding: `GRANDCHILD-${i}-${j}-${k}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          };
          childNode.children!.push(grandchildNode);
          nodeCount++;
        }
        
        rootNode.children!.push(childNode);
        nodeCount++;
      }
      
      rootNodes.push(rootNode);
      nodeCount++;
    }
    
    console.log(`Generated ${nodeCount} total nodes`);
    console.log(`Structure: 10 root nodes × 3 children × 2 grandchildren = 10 + 30 + 60 = 100 nodes`);
    return rootNodes;
  };

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

  // Helper function to find a node by key
  const findNodeByKey = (key: string, nodeList: TreeNode[]): TreeNode | null => {
    for (const node of nodeList) {
      if (node.key === key) return node;
      if (node.children) {
        const found = findNodeByKey(key, node.children);
        if (found) return found;
      }
    }
    return null;
  };

  // Helper function to find parent of a node
  const findParentNode = (childKey: string, nodeList: TreeNode[], parent: TreeNode | null = null): TreeNode | null => {
    for (const node of nodeList) {
      if (node.key === childKey) return parent;
      if (node.children) {
        const found = findParentNode(childKey, node.children, node);
        if (found) return found;
      }
    }
    return null;
  };

  // Helper function to get the full path of codings from root to node
  const getNodePath = (nodeKey: string): { nodeCoding: string; parentCoding?: string; fullPath: string[] } | null => {
    const node = findNodeByKey(nodeKey, nodes);
    if (!node) return null;

    const parent = findParentNode(nodeKey, nodes);
    const fullPath: string[] = [];
    
    // Build path from root to node
    let currentKey = nodeKey;
    while (currentKey) {
      const currentNode = findNodeByKey(currentKey, nodes);
      if (currentNode) {
        fullPath.unshift(currentNode.coding);
        const currentParent = findParentNode(currentKey, nodes);
        currentKey = currentParent ? currentParent.key : '';
      } else {
        break;
      }
    }
    
    return {
      nodeCoding: node.coding,
      parentCoding: parent ? parent.coding : undefined,
      fullPath
    };
  };

  // Handle Enter key press on selected node
  const handleEnterKey = () => {
    if (selectedNodeKey) {
      const path = getNodePath(selectedNodeKey);
      console.log('Enter pressed on node:', selectedNodeKey);
      console.log('Node path:', path);
    }
  };

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && selectedNodeKey) {
        handleEnterKey();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedNodeKey, nodes]);

  useEffect(() => {
    // Simulate loading data
    console.log('Starting tree data generation...');
    setTimeout(() => {
      const data = generateTreeData();
      setNodes(data);
      
      // Expand all nodes by default
      const allKeys: { [key: string]: boolean } = {};
      const expandAllNodes = (nodeList: TreeNode[]) => {
        nodeList.forEach(node => {
          allKeys[node.key] = true;
          if (node.children && node.children.length > 0) {
            expandAllNodes(node.children);
          }
        });
      };
      expandAllNodes(data);
      setExpandedKeys(allKeys);
      
      setLoading(false);
      console.log('Tree data loaded');
    }, 500);
  }, []);

  const nodeTemplate = (node: any) => {
    const treeNode = node as TreeNode;
    const isSelected = selectedNodeKey === treeNode.key;
    
    return (
      <div 
        className={`p-1 ${isSelected ? 'bg-blue-100' : ''} hover:bg-gray-100 rounded cursor-pointer`}
        onClick={() => {
          setSelectedNodeKey(treeNode.key);
          setRandomMessage(generateRandomMessage());
          if (onNodeSelect) {
            onNodeSelect(treeNode.key, treeNode.label);
          }
        }}
      >
        <div className="font-mono text-sm" title={treeNode.coding}>
          {treeNode.coding}
        </div>
      </div>
    );
  };

  console.log('TreeDemo rendering, loading:', loading);

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">PrimeReact Tree Component</h2>
        <p className="text-gray-600">
          A tree component showing hierarchical data with exactly 100 nodes across 3 levels.
          Each node has only one property: <code>coding</code> containing a unique ID.
        </p>
        <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-sm text-yellow-800">
            <strong>Structure:</strong> 10 root nodes (Level 1) × 3 children each (Level 2) × 2 grandchildren each (Level 3) = 100 nodes total
          </p>
        </div>
      </div>

      <div className="border border-gray-300 rounded-lg overflow-hidden" style={{ minHeight: '500px' }}>
        <Splitter style={{ height: '100%' }}>
          {/* Left panel - Tree */}
          <SplitterPanel className="flex flex-col" size={60} minSize={30}>
            <Panel 
              header="Config tree" 
              className="h-full flex flex-column border-none"
              pt={{
                content: { className: 'flex-grow-1' }
              }}
            >
              <div className="h-full w-full flex flex-col p-4">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="flex flex-col items-center">
                      <i className="pi pi-spin pi-spinner text-4xl text-blue-500 mb-2"></i>
                      <p className="text-gray-600">Loading tree data...</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-4 flex justify-between items-center">
                      <div>
                        <button 
                          className="p-2 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600"
                          onClick={() => {
                            // Expand all
                            const allKeys: { [key: string]: boolean } = {};
                            const expandAll = (nodeList: TreeNode[]) => {
                              nodeList.forEach(node => {
                                allKeys[node.key] = true;
                                if (node.children && node.children.length > 0) {
                                  expandAll(node.children);
                                }
                              });
                            };
                            expandAll(nodes);
                            setExpandedKeys(allKeys);
                          }}
                        >
                          <i className="pi pi-plus mr-1"></i> Expand All
                        </button>
                        <button 
                          className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                          onClick={() => setExpandedKeys({})}
                        >
                          <i className="pi pi-minus mr-1"></i> Collapse All
                        </button>
                      </div>
                      <div className="text-sm text-gray-600">
                        {Object.keys(expandedKeys).length} nodes expanded
                      </div>
                    </div>
                    
                    <div className="flex-1 overflow-auto">
                      <Tree 
                        value={nodes}
                        selectionMode="single"
                        selectionKeys={selectedNodeKey}
                        onSelectionChange={(e) => {
                          const selectedKey = e.value as string;
                          setSelectedNodeKey(selectedKey);
                          if (selectedKey) {
                            setRandomMessage(generateRandomMessage());
                            // Find the selected node to get its label
                            const selectedNode = findNodeByKey(selectedKey, nodes);
                            if (selectedNode && onNodeSelect) {
                              onNodeSelect(selectedKey, selectedNode.label);
                            }
                          }
                        }}
                        expandedKeys={expandedKeys}
                        onToggle={(e) => setExpandedKeys(e.value)}
                        nodeTemplate={nodeTemplate}
                        className="w-full"
                        filter
                        filterPlaceholder="Search nodes..."
                      />
                    </div>
                  </>
                )}
              </div>
            </Panel>
          </SplitterPanel>
          
          {/* Right panel - Selected Node Info */}
          <SplitterPanel className="flex flex-col border-l border-gray-200" size={40} minSize={20}>
            <Panel 
              header="Config node" 
              className="h-full flex flex-column border-none"
              pt={{
                content: { className: 'flex-grow-1' }
              }}
            >
              <div className="h-full w-full p-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Selected Node:</h4>
                    {selectedNodeKey ? (
                      <div className="p-3 bg-blue-50 rounded">
                        <p className="font-mono text-sm break-all">{selectedNodeKey}</p>
                        <div className="mt-2 text-xs text-gray-500">
                          Click on any node to select it
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 bg-gray-50 rounded text-gray-500">
                        <div className="flex items-center">
                          <i className="pi pi-info-circle mr-2"></i>
                          <span>No node selected</span>
                        </div>
                        <p className="text-xs mt-1">Select a node in the tree to see details here</p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Random Message:</h4>
                    {randomMessage ? (
                      <div className="p-3 bg-green-50 rounded">
                        <p className="text-sm text-gray-700">{randomMessage}</p>
                        <p className="text-xs text-gray-500 mt-2 italic">
                          A new random message appears each time you select a node
                        </p>
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
                    <h4 className="font-semibold text-gray-700 mb-2">Simple Text Display:</h4>
                    <div className="p-4 bg-gray-50 rounded text-center">
                      <p className="text-3xl font-bold text-gray-800">foo</p>
                      <p className="text-xs text-gray-500 mt-1">This text is displayed to the right of the tree</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Node Details:</h4>
                    {selectedNodeKey ? (
                      <div className="p-3 bg-gray-50 rounded">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-gray-600">Node Key:</div>
                          <div className="font-mono text-right">{selectedNodeKey}</div>
                          
                          <div className="text-gray-600">Node Type:</div>
                          <div className="text-right">
                            {selectedNodeKey.includes('root-') && !selectedNodeKey.includes('child') ? (
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Root Node</span>
                            ) : selectedNodeKey.includes('child-') && !selectedNodeKey.includes('grandchild') ? (
                              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Child Node</span>
                            ) : (
                              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Grandchild Node</span>
                            )}
                          </div>
                          
                          <div className="text-gray-600">Level:</div>
                          <div className="text-right font-bold">
                            {selectedNodeKey.includes('root-') && !selectedNodeKey.includes('child') ? '1' : 
                             selectedNodeKey.includes('child-') && !selectedNodeKey.includes('grandchild') ? '2' : '3'}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 bg-gray-50 rounded text-gray-500 text-center">
                        Select a node to see detailed information
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Panel>
          </SplitterPanel>
        </Splitter>
      </div>
      
      <div className="mt-6 p-4 bg-gray-50" style={{ borderRadius: '0' }}>
        <h3 className="font-semibold text-gray-700 mb-2">Implementation Details:</h3>
        <ul className="list-disc pl-5 text-gray-600 space-y-1">
          <li>Uses PrimeReact <code>Tree</code> component (not TreeTable)</li>
          <li>Each node has exactly one property: <code>coding</code> containing a unique string ID</li>
          <li>Tree has exactly 3 levels (root → child → grandchild)</li>
          <li>Total of 100 nodes: 10 × 3 × 2 = 60 + 30 + 10 = 100</li>
          <li>Custom node template with icons and styling for each level</li>
          <li>Search/filter functionality built into the Tree component</li>
          <li>Expand/collapse all buttons for easy navigation</li>
          <li>Selection support with visual feedback</li>
          <li>Split pane layout: tree on left (3 columns), node info on right (1 column)</li>
        </ul>
      </div>
    </div>
  );
};

export default TreeDemo;