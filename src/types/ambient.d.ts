// Minimal ambient type declarations for third-party packages that ship no types
// and have no maintained, version-matching @types package on npm.

declare module 'markdown-pdf' {
  interface MarkdownPdfRemarkableOptions {
    html?: boolean;
    breaks?: boolean;
    plugins?: unknown[];
  }

  interface MarkdownPdfOptions {
    cssPath?: string | null;
    paperBorder?: string;
    paperOrientation?: string;
    remarkable?: MarkdownPdfRemarkableOptions;
    preProcessMd?: () => NodeJS.ReadWriteStream;
  }

  interface MarkdownPdf {
    from(source: string): {
      to(target: string, cb: (err: Error | null) => void): void;
    };
  }

  function markdownpdf(options?: MarkdownPdfOptions): MarkdownPdf;

  export = markdownpdf;
}

declare module 'through' {
  interface ThroughStream extends NodeJS.ReadWriteStream {
    queue(data: unknown): void;
  }

  function through(
    write?: (this: ThroughStream, data: string) => void,
    end?: (this: ThroughStream) => void,
  ): ThroughStream;

  export = through;
}

declare module 'split' {
  function split(matcher?: unknown): NodeJS.ReadWriteStream;

  export = split;
}

declare module 'duplexer' {
  function duplexer(
    writable: NodeJS.WritableStream,
    readable: NodeJS.ReadableStream,
  ): NodeJS.ReadWriteStream;

  export = duplexer;
}

declare module 'remarkable/linkify' {
  export const linkify: unknown;
}
