declare module 'markdown-pdf' {
  export interface MarkdownPdfOptions {
    cssPath?: string | null;
    paperBorder?: string;
    paperOrientation?: string;
    remarkable?: {
      html?: boolean;
      breaks?: boolean;
      plugins?: unknown[];
    };
    preProcessMd?: () => NodeJS.ReadWriteStream;
  }

  interface MarkdownPdf {
    from(source: string): MarkdownPdf;
    to(target: string, callback?: (err: Error | null) => void): void;
  }

  function markdownpdf(options?: MarkdownPdfOptions): MarkdownPdf;
  export = markdownpdf;
}

declare module 'through' {
  interface ThroughStream extends NodeJS.ReadWriteStream {
    queue(data: string): void;
  }

  function through(
    write?: (this: ThroughStream, data: string) => void,
    end?: (this: ThroughStream) => void
  ): ThroughStream;

  export = through;
}

declare module 'split' {
  function split(
    matcher?: RegExp | string,
    mapper?: (line: string) => string
  ): NodeJS.ReadWriteStream;
  export = split;
}

declare module 'duplexer' {
  function duplexer(
    writable: NodeJS.WritableStream,
    readable: NodeJS.ReadableStream
  ): NodeJS.ReadWriteStream;
  export = duplexer;
}

declare module 'remarkable/linkify' {
  export function linkify(md: unknown): void;
}
