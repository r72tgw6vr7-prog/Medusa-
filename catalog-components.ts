import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

interface Component {
  name: string;
  filePath: string;
  exportType: 'named' | 'default';
  props: string[];
  description: string;
}

function getAllTsxFiles(dir: string, baseDir: string = dir): string[] {
  const files: string[] = [];
  const items = readdirSync(dir);
  
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getAllTsxFiles(fullPath, baseDir));
    } else if (item.endsWith('.tsx') && !item.includes('.test.') && !item.includes('.example.')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function extractComponents(filePath: string): Component[] {
  const content = readFileSync(filePath, 'utf-8');
  const components: Component[] = [];
  
  // Find all component exports (function, const, class)
  const exportRegex = /export\s+(?:default\s+)?(?:function|const|class)\s+(\w+)/g;
  const defaultExportRegex = /export\s+default\s+(?:function\s+)?(\w+)/;
  
  const defaultMatch = content.match(defaultExportRegex);
  const defaultExport = defaultMatch ? defaultMatch[1] : null;
  
  let match;
  const seenComponents = new Set<string>();
  
  while ((match = exportRegex.exec(content)) !== null) {
    const componentName = match[1];
    
    // Skip if already added or if it's a type/interface
    if (seenComponents.has(componentName)) continue;
    seenComponents.add(componentName);
    
    // Check if it's a component (starts with capital letter)
    if (!/^[A-Z]/.test(componentName)) continue;
    
    // Extract props
    const propsInterfaceRegex = new RegExp(
      `(?:interface|type)\\s+${componentName}Props\\s*(?:extends[^{]*)?\\{([^}]+)\\}`,
      's'
    );
    const propsMatch = content.match(propsInterfaceRegex);
    
    let props: string[] = [];
    if (propsMatch && propsMatch[1]) {
      props = propsMatch[1]
        .split(';')
        .map(p => p.trim())
        .filter(p => p && !p.startsWith('//') && !p.startsWith('/*') && !p.includes('*/'))
        .map(p => p.replace(/\/\*.*?\*\//g, '').replace(/\/\/.*$/gm, '').trim())
        .filter(p => p.length > 0);
    }
    
    // Extract description from JSDoc comments or PURPOSE comments
    let description = '';
    const lines = content.substring(0, match.index).split('\n');
    
    // Look backwards for description
    for (let i = lines.length - 1; i >= Math.max(0, lines.length - 15); i--) {
      const line = lines[i].trim();
      
      if (line.includes('PURPOSE:')) {
        description = line.split('PURPOSE:')[1].trim();
        break;
      }
      
      if (line.startsWith('*') && !line.startsWith('*/') && !line.startsWith('/**')) {
        const cleaned = line.replace(/^\*\s*/, '').trim();
        if (cleaned.length > 10 && !cleaned.startsWith('@')) {
          description = cleaned;
          break;
        }
      }
    }
    
    if (!description) {
      description = `${componentName} component`;
    }
    
    components.push({
      name: componentName,
      filePath,
      exportType: componentName === defaultExport ? 'default' : 'named',
      props,
      description
    });
  }
  
  return components;
}

function main() {
  const basePath = '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa';
  const directories = [
    join(basePath, 'src/components'),
    join(basePath, 'src/sections'),
    join(basePath, 'src/pages'),
  ];
  
  // Also check for src/app (excluding templates)
  const appDir = join(basePath, 'src/app');
  try {
    statSync(appDir);
    directories.push(appDir);
  } catch {
    // Directory doesn't exist, skip
  }
  
  const allComponents: Component[] = [];
  
  for (const dir of directories) {
    try {
      const files = getAllTsxFiles(dir);
      
      for (const file of files) {
        // Skip template files
        if (file.includes('templates/blade')) continue;
        
        try {
          const components = extractComponents(file);
          allComponents.push(...components);
        } catch (error) {
          console.error(`Error processing ${file}:`, error);
        }
      }
    } catch (error) {
      console.error(`Error processing directory ${dir}:`, error);
    }
  }
  
  // Output as JSON
  console.log(JSON.stringify(allComponents, null, 2));
}

main();
