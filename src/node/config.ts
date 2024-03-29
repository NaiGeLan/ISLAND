import { resolve } from 'path';
import fs from 'fs-extra';
import { loadConfigFromFile } from 'vite';
import { UserConfig, SiteConfig } from '../shared/types';

export function defineConfig(config: UserConfig) {
  return config;
}

export function resolveSiteData(userConfig: UserConfig): UserConfig {
  return {
    title: userConfig.title || 'Island.js',
    description: userConfig.description || 'SSG ',
    themeConfig: userConfig.themeConfig || {},
    vite: userConfig.vite || {}
  };
}
function getUserConfigPath(root: string) {
  try {
    const supportConfigFiles = ['config.ts', 'config.js'];
    const configPath = supportConfigFiles
      .map((file) => resolve(root, file))
      .find(fs.pathExistsSync);
    return configPath;
  } catch (e) {
    console.error(`Failed to load user config: ${e}`);
    throw e;
  }
}

type RawConfig =
  | UserConfig
  | Promise<UserConfig>
  | (() => UserConfig | Promise<UserConfig>);

export async function resolveUserConfig(
  root: string,
  command: 'serve' | 'build',
  mode: 'development' | 'production'
) {
  // 获取配置文件路径
  const configPath = getUserConfigPath(root);
  // 读取配置文件的内容

  const result = await loadConfigFromFile(
    {
      command,
      mode
    },
    configPath,
    root
  );

  if (result) {
    const { config: rawConfig = {} as RawConfig } = result;
    const userConfig = await (typeof rawConfig === 'function'
      ? rawConfig()
      : rawConfig);
    return [configPath, userConfig] as const;
  } else {
    return [configPath, {} as UserConfig] as const;
  }
}

export async function resolveConfig(
  root: string,
  command: 'serve' | 'build',
  mode: 'development' | 'production'
): Promise<SiteConfig> {
  // console.log(root, command, mode);

  const [configPath, userConfig] = await resolveUserConfig(root, command, mode);
  // console.log([configPath, userConfig]);

  const siteConfig: SiteConfig = {
    root,
    configPath,
    siteData: resolveSiteData(userConfig as UserConfig)
  };
  return siteConfig;
}
