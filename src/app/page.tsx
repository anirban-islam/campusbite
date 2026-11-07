export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center bg-background text-foreground">
      <div className="max-w-xl mx-auto space-y-6">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-subtle text-primary border border-primary-200">
          Campus Food Platform
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground">
          Welcome to <span className="text-primary">CampusBite</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Your full color schema is configured with brand primary{" "}
          <code className="px-2 py-0.5 rounded bg-muted text-primary font-mono text-sm">
            #c34e31
          </code>
          . Dark mode has been completely removed.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button className="px-5 py-2.5 rounded-lg font-medium bg-primary text-primary-foreground hover:bg-primary-hover transition-colors shadow-sm">
            Primary Action
          </button>
          <button className="px-5 py-2.5 rounded-lg font-medium bg-secondary text-secondary-foreground hover:bg-secondary-hover transition-colors shadow-sm">
            Secondary Action
          </button>
          <button className="px-5 py-2.5 rounded-lg font-medium bg-card text-foreground border border-border hover:bg-muted transition-colors shadow-sm">
            Outline Action
          </button>
        </div>
      </div>
    </main>
  );
}
