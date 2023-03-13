import type {
  Archetype,
  Component,
  ComponentFunction,
  ComponentLoader,
  Components,
  ComponentsOptions,
  Content,
  Data,
  DataLoader,
  DeepPartial,
  DenoConfig,
  DenoConfigResult,
  Dest,
  Directory,
  DirEntry,
  Engine,
  ErrorData,
  Event,
  EventListener,
  EventOptions,
  Events,
  Exception,
  Extensions,
  FileInfo,
  Format,
  Formats,
  Helper,
  HelperOptions,
  ImportMap,
  IncludesLoader,
  Loader,
  Logger,
  Middleware,
  MultiProcessor,
  Page,
  PageData,
  PageHelpers,
  PageLoader,
  PagePreparer,
  Plugin,
  PluginSetup,
  Processor,
  Processors,
  ProxyComponents,
  Reader,
  Renderer,
  RequestHandler,
  ScopeFilter,
  Scopes,
  ScriptOptions,
  ScriptOrFunction,
  Scripts,
  Server,
  ServerEvent,
  ServerEventType,
  ServerOptions,
  Site,
  SiteEvent,
  SiteEventType,
  SiteOptions,
  Source,
  SourceMap,
  Src,
  StaticFile,
  Watcher,
  WatcherOptions,
  WatchEvent,
  WatchEventType,
  Writer,
} from "./core.ts";

declare global {
  namespace Lume {
    export type PartialSiteOptions = DeepPartial<SiteOptions>;
    export type {
      Archetype,
      Component,
      ComponentFunction,
      ComponentLoader,
      Components,
      ComponentsOptions,
      Content,
      Data,
      DataLoader,
      DeepPartial,
      DenoConfig,
      DenoConfigResult,
      Dest,
      Directory,
      DirEntry,
      Engine,
      ErrorData,
      Event,
      EventListener,
      EventOptions,
      Events,
      Exception,
      Extensions,
      FileInfo,
      Format,
      Formats,
      Helper,
      HelperOptions,
      ImportMap,
      IncludesLoader,
      Loader,
      Logger,
      Middleware,
      MultiProcessor,
      Page,
      PageData,
      PageHelpers,
      PageLoader,
      PagePreparer,
      Plugin,
      PluginSetup,
      Processor,
      Processors,
      ProxyComponents,
      Reader,
      Renderer,
      RequestHandler,
      ScopeFilter,
      Scopes,
      ScriptOptions,
      ScriptOrFunction,
      Scripts,
      Server,
      ServerEvent,
      ServerEventType,
      ServerOptions,
      Site,
      SiteEvent,
      SiteEventType,
      SiteOptions,
      Source,
      SourceMap,
      Src,
      StaticFile,
      Watcher,
      WatcherOptions,
      WatchEvent,
      WatchEventType,
      Writer,
    };
  }
}
