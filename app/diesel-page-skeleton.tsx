function PulseBlock({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-muted/60 ${className ?? ""}`}
      aria-hidden
    />
  )
}

export function DieselPageSkeleton() {
  return (
    <main>
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 space-y-8">
          <div className="max-w-3xl space-y-4">
            <PulseBlock className="h-4 w-48" />
            <PulseBlock className="h-14 w-full max-w-md" />
            <PulseBlock className="h-20 w-full max-w-xl" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <PulseBlock className="h-56 md:h-64" />
            <PulseBlock className="h-56 md:h-64" />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-6 space-y-8">
          <div className="space-y-3 max-w-xl">
            <PulseBlock className="h-9 w-64" />
            <PulseBlock className="h-16 w-full" />
            <PulseBlock className="h-4 w-72" />
          </div>
          <div className="grid lg:grid-cols-5 gap-6">
            <PulseBlock className="lg:col-span-3 h-[420px]" />
            <PulseBlock className="lg:col-span-2 h-[420px]" />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="max-w-6xl mx-auto px-6 space-y-8">
          <div className="space-y-3 max-w-xl">
            <PulseBlock className="h-9 w-48" />
            <PulseBlock className="h-14 w-full" />
          </div>
          <PulseBlock className="h-72 w-full max-w-4xl" />
        </div>
      </section>

      <section className="py-16 md:py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <PulseBlock className="h-96 w-full" />
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="max-w-3xl mx-auto px-6 space-y-4">
          <PulseBlock className="h-9 w-80" />
          <PulseBlock className="h-40 w-full" />
          <PulseBlock className="h-32 w-full" />
        </div>
      </section>
    </main>
  )
}
