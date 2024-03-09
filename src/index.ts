function helloWorld(): void {
  console.log(`Hello, ${process.env.GREETING}!`);
}

export function testFunction(): string {
  return "hello, world!"
}

helloWorld();