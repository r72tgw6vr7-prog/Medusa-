#!/usr/bin/env python3
import os
import re
import json
from pathlib import Path

def extract_components(file_path):
    """Extract component information from a TypeScript React file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except:
        return []
    
    components = []
    
    # Find all exports
    export_pattern = r'export\s+(?:default\s+)?(?:function|const|class)\s+([A-Z]\w+)'
    default_pattern = r'export\s+default\s+(?:function\s+)?(\w+)'
    
    default_match = re.search(default_pattern, content)
    default_export = default_match.group(1) if default_match else None
    
    for match in re.finditer(export_pattern, content):
        component_name = match.group(1)
        
        # Extract props interface
        props = []
        props_pattern = rf'(?:interface|type)\s+{component_name}Props\s*(?:extends[^{{]*)?{{([^}}]+)}}'
        props_match = re.search(props_pattern, content, re.DOTALL)
        
        if props_match:
            props_body = props_match.group(1)
            props = [
                p.strip() 
                for p in props_body.split(';') 
                if p.strip() and not p.strip().startswith('//') and not p.strip().startswith('/*')
            ]
        
        # Extract description
        description = f"{component_name} component"
        lines = content[:match.start()].split('\n')
        
        for i in range(len(lines) - 1, max(0, len(lines) - 15), -1):
            line = lines[i].strip()
            if 'PURPOSE:' in line:
                description = line.split('PURPOSE:')[1].strip()
                break
            if line.startswith('*') and not line.startswith('*/') and not line.startswith('/**'):
                cleaned = re.sub(r'^\*\s*', '', line).strip()
                if len(cleaned) > 10 and not cleaned.startswith('@'):
                    description = cleaned
                    break
        
        components.append({
            'name': component_name,
            'filePath': file_path,
            'exportType': 'default' if component_name == default_export else 'named',
            'props': props,
            'description': description
        })
    
    return components

def main():
    base_path = '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa'
    directories = [
        'src/components',
        'src/sections',
        'src/pages',
        'src/app'
    ]
    
    all_components = []
    
    for dir_name in directories:
        dir_path = os.path.join(base_path, dir_name)
        
        if not os.path.exists(dir_path):
            continue
        
        for root, dirs, files in os.walk(dir_path):
            # Skip template files
            if 'templates/blade' in root:
                continue
            
            for file in files:
                if file.endswith('.tsx') and '.test.' not in file and '.example.' not in file:
                    file_path = os.path.join(root, file)
                    components = extract_components(file_path)
                    all_components.extend(components)
    
    print(json.dumps(all_components, indent=2))

if __name__ == '__main__':
    main()
