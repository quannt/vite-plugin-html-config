import { Plugin, HtmlTagDescriptor, normalizePath, ResolvedConfig } from 'vite';
import { join as _join } from 'path'
import path from 'path'

function join(...args: string[]) {
  return _join(...args).replace(/\\/g, '/')
}

export interface IHTMLTag {
  [key: string]: string;
}

export interface Options {
  favicon?: string;
  metas?: IHTMLTag[];
  links?: IHTMLTag[];
  style?: string;
  headScripts?: IHTMLTag[];
  scripts?: IHTMLTag[];
}
export default function HtmlPlugin(rawOptions: Options): Plugin {
  const {
    favicon,
    headScripts = [],
    metas = [],
    links = [],
    style,
    scripts = [],
  } = rawOptions;

  const getScriptContent = (
    script: IHTMLTag,
    injectTo: 'head' | 'body' | 'head-prepend' | 'body-prepend'
  ) => {
    console.log('getScriptContent', { script })
    let result = {} as HtmlTagDescriptor;
    if (typeof script === 'object' && script.src) {
      result = {
        tag: 'script',
        injectTo,
        attrs: { ...script },
      };
    } else if (typeof script === 'object' && script.content) {
      const { content, ...attr } = script;
      result = {
        tag: 'script',
        injectTo,
        attrs: { ...attr },
        children: `${content}`,
      };
    } else {
      result = {
        tag: 'script',
        injectTo,
        children: `${script}`,
      };
    }
    return result;
  };

  let currentConfig: ResolvedConfig
  return {
    name: 'html-plugin',
    configResolved(config) {
      currentConfig = config
    },
    transformIndexHtml(html, ctx) {
      const htmlResult = [] as HtmlTagDescriptor[];

      const VITE_PLUGIN_ENTRY = normalizePath(
        path.resolve(process.cwd(), 'node_modules/vite-plugin-html-config/dist/')
      );
      console.log('transformIndexHtml')
      console.log({ ctx, currentConfig })
 
      htmlResult.push(getScriptContent({ src: join(VITE_PLUGIN_ENTRY, 'observer.global.js') }, 'body'))
      return htmlResult;
    },
  };
}

// overwrite for cjs require('...')() usage
module.exports = HtmlPlugin;
HtmlPlugin['default'] = HtmlPlugin;

export { observer } from './observer'
