import { SiteConfig } from "../../shared/types";
import { Plugin } from "vite";
import { join, relative } from 'path';
import { PACKAGE_ROOT } from "node/constants";
const SITE_DATA_ID = 'island:site-data';
export function pluginConfig(
  config: SiteConfig,
  restartServer?: () => Promise<void>
  ) : Plugin {
  return {
    name: 'island:config',
    resolveId(id) {
      if(id === SITE_DATA_ID){
        return '\0' + SITE_DATA_ID
      }
    },
    load(id) {
      if (id === '\0' + SITE_DATA_ID) {
        return `export default ${JSON.stringify(config.siteData)}`;
      }
    },
    config() {
        return {
          root: PACKAGE_ROOT,
          resolve: {
            alias: {
              '@runtime': join(PACKAGE_ROOT, 'src','runtime','index.ts')
            }
          }
        }
    },
    async handleHotUpdate(ctx){
      const customWatchedFiles = [config.configPath]
      const include = (id: string) => customWatchedFiles.some((file) => id.includes(file))
      if(include(ctx.file)) {
        console.log(
          `\n${relative(config.root, ctx.file)} changed, restarting server...`
        );
        
      }
      console.log(await restartServer());
      
      await restartServer()
    }
  }
}
