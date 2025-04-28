declare module "randomstring" {
  interface RandomStringOptions {
    length?: number;
    charset?: string;
    capitalization?: "lowercase" | "uppercase";
    readable?: boolean;
  }

  function generate(options?: RandomStringOptions): string;

  export default generate;
}
