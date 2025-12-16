/**
 * Next.js plugin to fix path separators in generated .source/server.ts
 * This ensures cross-platform compatibility by converting backslashes to forward slashes
 */

import { readFileSync, writeFileSync, watchFile } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function fixSourcePaths() {
  const serverTsPath = join(__dirname, '..', '.source', 'server.ts');
  
  function fixPaths() {
    try {
      let content = readFileSync(serverTsPath, 'utf-8');
      const originalContent = content;
      
      // Replace backslashes in path strings with forward slashes
      content = content.replace(/"content\\/g, '"content/');
      
      if (content !== originalContent) {
        writeFileSync(serverTsPath, content, 'utf-8');
        console.log('✓ Fixed path separators in .source/server.ts');
      }
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.error('Error fixing paths:', error.message);
      }
    }
  }
  
  // Fix immediately
  fixPaths();
  
  // Watch for changes (useful during dev)
  try {
    watchFile(serverTsPath, { interval: 1000 }, () => {
      fixPaths();
    });
  } catch (error) {
    // File doesn't exist yet, that's okay
  }
  
  return (nextConfig) => {
    return {
      ...nextConfig,
      webpack: (config, options) => {
        // Fix paths during webpack compilation
        if (options.isServer) {
          const originalEntry = config.entry;
          config.entry = async () => {
            const entries = await originalEntry();
            fixPaths();
            return entries;
          };
        }
        
        // Call original webpack config if it exists
        if (nextConfig.webpack) {
          return nextConfig.webpack(config, options);
        }
        return config;
      },
    };
  };
}

export default fixSourcePaths;

