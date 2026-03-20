import { useState, useEffect } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './TreeTableDemo.css';

interface TreeNode {
  key: string;
  data: {
    name: string;
    type: 'year' | 'book' | 'author';
    published?: string;
    genre?: string;
    nationality?: string;
    awards?: number;
  };
  children?: TreeNode[];
}

interface TreeTableDemoProps {
  onNodeSelect?: (nodeKey: string, nodeData: any) => void;
}

const TreeTableDemo: React.FC<TreeTableDemoProps> = ({ onNodeSelect }) => {
  const [nodes, setNodes] = useState<TreeNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNodeKey, setSelectedNodeKey] = useState<string | null>(null);
  
  // Debug logging
  useEffect(() => {
    console.log('TreeTableDemo component mounted');
    return () => {
      console.log('TreeTableDemo component unmounted');
    };
  }, []);

  // Generate dummy data with 100 nodes
  const generateDummyData = (): TreeNode[] => {
    console.log('Generating dummy data...');
    const years: TreeNode[] = [];
    let nodeCount = 0;
    
    // Generate 5 years
    for (let year = 2020; year <= 2024; year++) {
      const yearNode: TreeNode = {
        key: `year-${year}`,
        data: {
          name: `Year ${year}`,
          type: 'year',
          published: `${year}`,
        },
        children: [],
      };
      
      // Generate 5 books per year (total 25 books)
      for (let bookNum = 1; bookNum <= 5; bookNum++) {
        const bookNode: TreeNode = {
          key: `year-${year}-book-${bookNum}`,
          data: {
            name: `Book ${bookNum} (${year})`,
            type: 'book',
            genre: ['Fiction', 'Non-Fiction', 'Science', 'History', 'Biography'][bookNum % 5],
          },
          children: [],
        };
        
        // Generate 4 authors per book (total 100 nodes: 5 years * 5 books * 4 authors = 100)
        for (let authorNum = 1; authorNum <= 4; authorNum++) {
          const authorNode: TreeNode = {
            key: `year-${year}-book-${bookNum}-author-${authorNum}`,
            data: {
              name: `Author ${authorNum} of Book ${bookNum}`,
              type: 'author',
              nationality: ['American', 'British', 'French', 'German', 'Japanese'][authorNum % 5],
              awards: (authorNum * 2) % 7,
            },
          };
          bookNode.children!.push(authorNode);
          nodeCount++;
        }
        
        yearNode.children!.push(bookNode);
        nodeCount++;
      }
      
      years.push(yearNode);
      nodeCount++;
    }
    
    console.log(`Generated ${nodeCount} total nodes`);
    return years;
  };

  useEffect(() => {
    // Simulate loading data
    console.log('Starting data generation...');
    setTimeout(() => {
      const data = generateDummyData();
      setNodes(data);
      setLoading(false);
      console.log('Data loaded, loading set to false');
    }, 500);
  }, []);

  // Type-specific templates for different node types
  const typeTemplate = (node: TreeNode) => {
    const typeColors = {
      year: 'bg-blue-100 text-blue-800',
      book: 'bg-green-100 text-green-800',
      author: 'bg-purple-100 text-purple-800',
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-semibold ${typeColors[node.data.type]}`} style={{ borderRadius: '0' }}>
        {node.data.type.toUpperCase()}
      </span>
    );
  };

  const detailsTemplate = (node: TreeNode) => {
    switch (node.data.type) {
      case 'year':
        return <span>Published in {node.data.published}</span>;
      case 'book':
        return <span>Genre: {node.data.genre}</span>;
      case 'author':
        return (
          <span>
            {node.data.nationality} • {node.data.awards} awards
          </span>
        );
      default:
        return null;
    }
  };

  console.log('TreeTableDemo rendering, loading:', loading);

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">PrimeReact TreeTable Demo</h2>
        <p className="text-gray-600">
          A tree table showing hierarchical data with 100 nodes (5 years × 5 books × 4 authors).
          Click the plus/minus icons to expand/collapse nodes.
        </p>
      </div>

      <div className="card custom-treetable-icons" style={{ border: '2px solid #e0e0e0', padding: '20px', borderRadius: '0' }}>
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <div className="flex flex-col items-center">
              <i className="pi pi-spin pi-spinner text-4xl text-blue-500 mb-2"></i>
              <p className="text-gray-600">Loading tree data...</p>
            </div>
          </div>
        ) : (
          <div>
            <TreeTable 
              value={nodes} 
              scrollable 
              scrollHeight="300px"
              selectionMode="single"
              selectionKeys={selectedNodeKey}
              onSelectionChange={(e) => {
                const selectedKey = e.value as string;
                setSelectedNodeKey(selectedKey);
                if (selectedKey && onNodeSelect) {
                  // Find the selected node to get its data
                  const findNode = (nodeList: TreeNode[]): TreeNode | null => {
                    for (const node of nodeList) {
                      if (node.key === selectedKey) return node;
                      if (node.children) {
                        const found = findNode(node.children);
                        if (found) return found;
                      }
                    }
                    return null;
                  };
                  
                  const selectedNode = findNode(nodes);
                  if (selectedNode) {
                    onNodeSelect(selectedKey, selectedNode.data);
                  }
                }
              }}
            >
              <Column 
                field="name" 
                header="Name" 
                expander 
                style={{ width: '250px' }}
              />
              <Column 
                field="data.type" 
                header="Type" 
                body={typeTemplate}
                style={{ width: '100px' }}
              />
              <Column 
                header="Details" 
                body={detailsTemplate}
                style={{ width: '200px' }}
              />
              <Column 
                field="key" 
                header="Node ID" 
                style={{ width: '300px' }}
              />
            </TreeTable>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-gray-50" style={{ borderRadius: '0' }}>
        <h3 className="font-semibold text-gray-700 mb-2">Tree Structure:</h3>
        <ul className="list-disc pl-5 text-gray-600">
          <li><span className="font-semibold">Years</span> (Level 1): 5 nodes</li>
          <li><span className="font-semibold">Books</span> (Level 2): 25 nodes (5 per year)</li>
          <li><span className="font-semibold">Authors</span> (Level 3): 100 nodes (4 per book)</li>
          <li><span className="font-semibold">Total</span>: 130 nodes in the tree structure</li>
          <li><span className="font-semibold">Icons</span>: 
            <span style={{ color: '#424242', fontWeight: 'bold', margin: '0 4px' }}>+</span> to expand, 
            <span style={{ color: '#212121', fontWeight: 'bold', margin: '0 4px' }}>−</span> to collapse
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TreeTableDemo;