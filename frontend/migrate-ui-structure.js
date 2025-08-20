#!/usr/bin/env node

/**
 * Migration script to reorganize UI components into a better folder structure
 * Run with: node migrate-ui-structure.js
 */

const fs = require('fs');
const path = require('path');

const UI_PATH = './src/lib/components/ui';

// Define the new structure mapping
const COMPONENT_MAPPING = {
  // Primitives (basic building blocks)
  primitives: [
    'button',
    'input', 
    'label',
    'checkbox',
    'separator',
    'skeleton'
  ],
  
  // Forms (form-related components)
  forms: [
    'select'
  ],
  
  // Layout (containers and layout)
  layout: [
    'card',
    'sheet', 
    'dialog',
    'sidebar',
    'collapsible'
  ],
  
  // Navigation (navigation components)
  navigation: [
    'breadcrumb',
    'dropdown-menu',
    'tabs',
    'popover'
  ],
  
  // Data Display (data presentation)
  'data-display': [
    'table',
    'data-table',
    'avatar',
    'chart',
    'tooltip'
  ],
  
  // Temporal (date/time)
  temporal: [
    'calendar',
    'range-calendar'
  ]
};

/**
 * Create directory if it doesn't exist
 */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
}

/**
 * Copy directory recursively
 */
function copyDir(src, dest) {
  ensureDir(dest);
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Create category index file
 */
function createCategoryIndex(category, components) {
  const indexPath = path.join(UI_PATH, category, 'index.ts');
  const exports = components
    .map(comp => {
      const pascalCase = comp.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join('');
      return `export * as ${pascalCase} from './${comp}';`;
    })
    .join('\n');
    
  const content = `// ${category.charAt(0).toUpperCase() + category.slice(1)} Components
${exports}
`;

  fs.writeFileSync(indexPath, content);
  console.log(`✅ Created category index: ${indexPath}`);
}

/**
 * Create main UI index file
 */
function createMainIndex() {
  const categories = Object.keys(COMPONENT_MAPPING);
  const exports = categories
    .map(category => `export * from './${category}';`)
    .join('\n');
    
  const content = `// UI Components Library
// Organized by functionality for better developer experience

${exports}

// Direct exports for backward compatibility (temporary)
// TODO: Remove these after migration is complete
${Object.values(COMPONENT_MAPPING).flat()
  .map(comp => `export * from './${comp}'; // Legacy`)
  .join('\n')}
`;

  const indexPath = path.join(UI_PATH, 'index.ts');
  fs.writeFileSync(indexPath, content);
  console.log(`✅ Created main index: ${indexPath}`);
}

/**
 * Main migration function
 */
function migrate() {
  console.log('🚀 Starting UI structure migration...\n');
  
  // Check if UI directory exists
  if (!fs.existsSync(UI_PATH)) {
    console.error(`❌ UI directory not found: ${UI_PATH}`);
    return;
  }
  
  // Create new category structure
  for (const [category, components] of Object.entries(COMPONENT_MAPPING)) {
    console.log(`📁 Processing category: ${category}`);
    
    // Create category directory
    const categoryPath = path.join(UI_PATH, category);
    ensureDir(categoryPath);
    
    // Move components to category
    for (const component of components) {
      const srcPath = path.join(UI_PATH, component);
      const destPath = path.join(categoryPath, component);
      
      if (fs.existsSync(srcPath)) {
        if (!fs.existsSync(destPath)) {
          copyDir(srcPath, destPath);
          console.log(`  ✅ Copied ${component} to ${category}/`);
        } else {
          console.log(`  ⚠️  ${component} already exists in ${category}/`);
        }
      } else {
        console.log(`  ⚠️  Component not found: ${component}`);
      }
    }
    
    // Create category index
    createCategoryIndex(category, components.filter(comp => 
      fs.existsSync(path.join(UI_PATH, category, comp))
    ));
    
    console.log();
  }
  
  // Create main index
  createMainIndex();
  
  console.log('✅ Migration completed!');
  console.log('\n📋 Next steps:');
  console.log('1. Test the new structure');
  console.log('2. Update imports in your components');
  console.log('3. Remove old component directories when ready');
  console.log('4. Update the main index.ts to remove legacy exports');
}

/**
 * Generate import update script
 */
function generateImportUpdates() {
  console.log('\n📝 Import update examples:\n');
  
  for (const [category, components] of Object.entries(COMPONENT_MAPPING)) {
    console.log(`// ${category} components:`);
    
    for (const component of components) {
      const oldImport = `"$lib/components/ui/${component}/index.js"`;
      const newImport = `"$lib/components/ui/${category}/${component}"`;
      
      console.log(`// ${oldImport} → ${newImport}`);
    }
    console.log();
  }
}

// Run migration
if (require.main === module) {
  migrate();
  generateImportUpdates();
}